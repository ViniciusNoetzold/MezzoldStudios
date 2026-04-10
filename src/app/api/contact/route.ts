import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiter: max 3 requests per IP per 10 minutes.
// NOTE: On Vercel serverless each cold start gets a fresh Map, so this is
// best-effort defense. For hard enforcement, swap for Upstash Redis.
const rateMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_BODY_BYTES = 16_384; // 16 KB hard cap

// Purge expired entries to prevent unbounded memory growth
function purgeExpired() {
  const now = Date.now();
  for (const [key, entry] of rateMap) {
    if (now >= entry.reset) rateMap.delete(key);
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  // Startup guard: fail immediately with a clear log if secret key is missing
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!recaptchaSecretKey) {
    console.error('[CONFIG ERROR] RECAPTCHA_SECRET_KEY environment variable is not set.');
    return NextResponse.json({ error: 'Configuração do servidor inválida. Tente novamente mais tarde.' }, { status: 503 });
  }

  // Body size guard — reject oversized payloads before parsing
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Payload muito grande.' }, { status: 413 });
  }

  // Rate limiting (best-effort; purge stale entries first)
  purgeExpired();
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (entry) {
    if (now < entry.reset) {
      if (entry.count >= RATE_LIMIT) {
        return NextResponse.json(
          { error: 'Muitas tentativas. Tente novamente em alguns minutos.' },
          { status: 429 }
        );
      }
      entry.count++;
    } else {
      rateMap.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    }
  } else {
    rateMap.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
  }

  try {
    const body = await request.json();
    const { name, email, phone, message, companyName_fakeField, recaptchaToken } = body;

    // Honeypot anti-spam check
    if (companyName_fakeField) {
      console.warn('[Honeypot Triggered] Ignored spam bot submission.');
      // Return 200 to trick the bot into thinking the submission succeeded
      return NextResponse.json({ success: true, fake: true }, { status: 200 });
    }

    // ── Input validation FIRST (cheap, no network) ─────────────────────────
    // Presence validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nome, email e mensagem são obrigatórios.' },
        { status: 400 }
      );
    }

    // Strict type validation — reject arrays, objects, numbers, etc.
    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 });
    }
    if (phone !== undefined && phone !== null && typeof phone !== 'string') {
      return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 });
    }

    // Length limits
    if (name.length > 100 || email.length > 254 || message.length > 5000 || (phone && phone.length > 20)) {
      return NextResponse.json({ error: 'Dados excedem o tamanho permitido.' }, { status: 400 });
    }

    // Email format validation
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Email inválido.' }, { status: 400 });
    }
    // ── End input validation ────────────────────────────────────────────────

    // reCAPTCHA verification AFTER input validation (expensive network call)
    if (!recaptchaToken) {
      return NextResponse.json({ error: 'Falha na verificação anti-robô. Confirme o reCAPTCHA.' }, { status: 400 });
    }

    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: recaptchaSecretKey,
        response: recaptchaToken
      }).toString()
    });

    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      console.error('[reCAPTCHA Error]', verifyData['error-codes']);
      return NextResponse.json({ error: 'Falha no reCAPTCHA. Tente novamente.' }, { status: 400 });
    }

    // (Input validation was already performed above, before reCAPTCHA check)

    // Escape all user input before interpolating into HTML
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safePhone = phone ? escapeHtml(String(phone).trim()) : null;
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br/>');

    const { error } = await resend.emails.send({
      from: 'Mezzold Studio <onboarding@resend.dev>',
      to: ['mezzoldstudio@gmail.com'],
      replyTo: safeEmail,
      subject: `Nova proposta de ${safeName} — Mezzold Studio`,
      html: `
        <div style="font-family: monospace; background: #0a0a0a; color: #fff; padding: 32px; border-radius: 8px; max-width: 600px;">
          <div style="border-bottom: 1px solid #222; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="margin: 0; font-size: 20px; letter-spacing: 0.1em; text-transform: uppercase;">MEZZOLD STUDIO</h1>
            <p style="margin: 4px 0 0; color: #555; font-size: 12px; letter-spacing: 0.2em;">NOVA PROPOSTA RECEBIDA</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #555; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; width: 100px;">NOME</td>
              <td style="padding: 10px 0; color: #fff; font-size: 14px;">${safeName}</td>
            </tr>
            <tr style="border-top: 1px solid #1a1a1a;">
              <td style="padding: 10px 0; color: #555; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;">EMAIL</td>
              <td style="padding: 10px 0; color: #fff; font-size: 14px;"><a href="mailto:${safeEmail}" style="color: #fff;">${safeEmail}</a></td>
            </tr>
            ${safePhone ? `
            <tr style="border-top: 1px solid #1a1a1a;">
              <td style="padding: 10px 0; color: #555; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;">TELEFONE</td>
              <td style="padding: 10px 0; color: #fff; font-size: 14px;">${safePhone}</td>
            </tr>` : ''}
            <tr style="border-top: 1px solid #1a1a1a;">
              <td style="padding: 10px 0; color: #555; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; vertical-align: top;">MENSAGEM</td>
              <td style="padding: 10px 0; color: #fff; font-size: 14px; line-height: 1.6;">${safeMessage}</td>
            </tr>
          </table>

          <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #222; color: #333; font-size: 11px; letter-spacing: 0.1em;">
            © ${new Date().getFullYear()} MEZZOLD STUDIO — Responda diretamente a este email para entrar em contato com o cliente.
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('[Resend Error]', error);
      return NextResponse.json({ error: 'Falha ao enviar email.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Contact API Error]', err);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}
