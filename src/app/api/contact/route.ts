import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nome, email e mensagem são obrigatórios.' },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: 'Mezzold Studio <onboarding@resend.dev>',
      to: ['mezzoldstudio@gmail.com'],
      replyTo: email,
      subject: `Nova proposta de ${name} — Mezzold Studio`,
      html: `
        <div style="font-family: monospace; background: #0a0a0a; color: #fff; padding: 32px; border-radius: 8px; max-width: 600px;">
          <div style="border-bottom: 1px solid #222; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="margin: 0; font-size: 20px; letter-spacing: 0.1em; text-transform: uppercase;">MEZZOLD STUDIO</h1>
            <p style="margin: 4px 0 0; color: #555; font-size: 12px; letter-spacing: 0.2em;">NOVA PROPOSTA RECEBIDA</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #555; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; width: 100px;">NOME</td>
              <td style="padding: 10px 0; color: #fff; font-size: 14px;">${name}</td>
            </tr>
            <tr style="border-top: 1px solid #1a1a1a;">
              <td style="padding: 10px 0; color: #555; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;">EMAIL</td>
              <td style="padding: 10px 0; color: #fff; font-size: 14px;"><a href="mailto:${email}" style="color: #fff;">${email}</a></td>
            </tr>
            ${phone ? `
            <tr style="border-top: 1px solid #1a1a1a;">
              <td style="padding: 10px 0; color: #555; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;">TELEFONE</td>
              <td style="padding: 10px 0; color: #fff; font-size: 14px;">${phone}</td>
            </tr>` : ''}
            <tr style="border-top: 1px solid #1a1a1a;">
              <td style="padding: 10px 0; color: #555; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; vertical-align: top;">MENSAGEM</td>
              <td style="padding: 10px 0; color: #fff; font-size: 14px; line-height: 1.6;">${message.replace(/\n/g, '<br/>')}</td>
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
