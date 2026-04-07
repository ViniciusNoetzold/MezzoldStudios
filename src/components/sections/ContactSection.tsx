'use client';
import { ContactCard } from "@/components/ui/contact-card";
import { useAccent } from '../layout/AccentProvider';
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const inputClass =
  'bg-white/[0.04] border border-white/10 text-white text-base md:text-sm rounded-lg px-3 ' +
  // 48px height = proper touch target on iOS & Android
  'h-12 ' +
  'placeholder:text-white/20 ' +
  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan/50 focus-visible:border-cyan/50 ' +
  'transition-colors duration-200 w-full';

export function ContactSection() {
  const { accentRgb } = useAccent();

  return (
    <section
      id="contact"
      className="relative px-4 md:px-6 pt-8 pb-16 md:py-32 flex w-full items-center justify-center overflow-hidden bg-[#030303]"
    >
      {/* ── Mobile: CSS gradient background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 100% 100%, rgba(6,182,212,0.06) 0%, transparent 60%),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 39px,
              rgba(255,255,255,0.015) 39px,
              rgba(255,255,255,0.015) 40px
            )
          `,
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.75) 100%)',
        }}
      />

      {/* ── Seamless Blending Layers ── */}
      {/* Top transition from Portfolio (#030303) */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#030303] via-[#030303]/80 to-transparent z-[3] pointer-events-none" />
      <div 
        className="absolute top-0 left-0 right-0 h-64 pointer-events-none z-[3]" 
        style={{ background: `linear-gradient(to bottom, rgba(255,255,255, 0.03) 0%, transparent 100%)` }} 
      />

      {/* Bottom transition to Footer (#020202) */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent z-[3] pointer-events-none" />
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-[3]" 
        style={{ background: `linear-gradient(to top, rgba(255,255,255, 0.02) 0%, transparent 100%)` }} 
      />

      {/* Content */}
      <div className="container mx-auto max-w-6xl relative z-[3] w-full">
        <ContactCard
          title="Entre em contato"
          description="Se você tem alguma dúvida sobre nossos serviços ou precisa de ajuda, preencha o formulário aqui. Faremos o possível para responder em até 1 dia útil."
          contactInfo={[
            {
              icon: MailIcon,
              label: 'Email',
              value: 'mezzoldstudio@gmail.com',
            },
            {
              icon: PhoneIcon,
              label: 'Telefone',
              value: '+55 (54) 99713-1399',
              copyable: true,
            },
            {
              icon: MapPinIcon,
              label: 'Endereço',
              value: 'Sarandi, Rio Grande do Sul',
            },
          ]}
        >
          <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-xl w-full" />}>
            <ContactForm />
          </Suspense>
        </ContactCard>
      </div>
    </section>
  );
}

function ContactForm() {
  const searchParams = useSearchParams();
  const msg = searchParams.get('msg');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (msg === 'website') {
      setMessage("Olá, quero saber mais sobre o Desenvolvimento de Sites.");
    } else if (msg === 'saas') {
      setMessage("Olá, quero saber mais sobre Micro SaaS.");
    } else if (msg === 'dashboards') {
      setMessage("Olá, quero saber mais sobre Dashboards e Automação.");
    }
  }, [msg]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMsg("Por favor, preencha nome, email e mensagem.");
      setStatus('error');
      return;
    }
    setStatus('loading');
    setErrorMsg("");
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erro desconhecido.');
      }
      setStatus('success');
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Erro ao enviar. Tente novamente.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-5 py-10 text-center">

        {/* Check icon */}
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        </div>

        {/* Status text */}
        <div className="flex flex-col gap-1">
          <p className="text-white font-black text-sm tracking-[0.2em] uppercase">Proposta Enviada</p>
          <p className="text-white/40 text-xs font-mono">Respondemos em até 1 dia útil.</p>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-white/[0.06]" />

        {/* Return channels */}
        <div className="w-full flex flex-col gap-2 text-left">
          <p className="text-center text-[10px] font-mono tracking-[0.18em] uppercase text-white/30 mb-1">
            Nossa equipe retornará via
          </p>
          <div className="flex flex-col gap-2">
            {/* WhatsApp */}
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02]">
              <div className="shrink-0 w-7 h-7 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white/70" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.559 4.122 1.525 5.855L.057 23.57a.75.75 0 00.912.912l5.716-1.468A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.722 9.722 0 01-4.958-1.356l-.355-.211-3.677.944.963-3.558-.232-.368A9.721 9.721 0 012.25 12C2.25 6.616 6.616 2.25 12 2.25S21.75 6.616 21.75 12 17.384 21.75 12 21.75z"/>
                </svg>
              </div>
              <div>
                <p className="text-[9px] font-mono tracking-widest uppercase text-white/30">WhatsApp</p>
                <p className="text-white/80 text-xs font-medium">Resposta rápida</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02]">
              <div className="shrink-0 w-7 h-7 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <p className="text-[9px] font-mono tracking-widest uppercase text-white/30">Email</p>
                <p className="text-white/80 text-xs font-medium truncate">mezzoldstudio@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => { setStatus('idle'); setName(""); setEmail(""); setPhone(""); setMessage(""); }}
          className="text-[10px] font-mono tracking-widest uppercase text-white/20 hover:text-white/50 transition-colors"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-name" className="text-white/70 text-xs font-mono tracking-widest uppercase">Nome</Label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="Seu nome"
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-email" className="text-white/70 text-xs font-mono tracking-widest uppercase">Email</Label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="seu@email.com"
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-phone" className="text-white/70 text-xs font-mono tracking-widest uppercase">Telefone</Label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
          placeholder="(00) 00000-0000"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-message" className="text-white/70 text-xs font-mono tracking-widest uppercase">Mensagem</Label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} h-auto py-3 resize-none`}
          placeholder="Descreva seu projeto..."
          required
        />
      </div>

      {status === 'error' && (
        <p className="text-red-400/80 text-xs font-mono">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full h-12 mt-1 rounded-lg bg-white text-black text-xs font-extrabold uppercase tracking-[0.2em] transition-all duration-200 hover:bg-white/90 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Enviando...' : 'Enviar Proposta'}
      </button>
    </form>
  );
}

