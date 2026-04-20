import React from "react";
import Link from "next/link";
import {
  FaInstagram,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

interface Footer7Props {
  logo?: {
    url: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Produto",
    links: [
      { name: "Portfólio", href: "/cases" },
      { name: "Stack Tech", href: "/stack" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "Documentação", href: "/docs" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { name: "Contato", href: "/#contact" },
    ],
  },
];

const defaultSocialLinks = [
  {
    icon: <FaWhatsapp className="size-5" />,
    href: "https://wa.me/5554997131399?text=Ol%C3%A1!%20Tenho%20interesse%20nos%20servi%C3%A7os%20da%20Mezzold%20Studio%20e%20gostaria%20de%20saber%20mais%20sobre%20como%20podem%20me%20ajudar.",
    label: "WhatsApp",
  },
  {
    icon: <FaInstagram className="size-5" />,
    href: "https://www.instagram.com/mezzoldstudio?igsh=MjE3OHljZjRjZ3I1",
    label: "Instagram",
  },
  {
    icon: <FaFacebook className="size-5" />,
    href: "/404",
    label: "Facebook",
  },
  {
    icon: <FaGithub className="size-5" />,
    href: "/404",
    label: "GitHub",
  },
  {
    icon: <FaLinkedin className="size-5" />,
    href: "/404",
    label: "LinkedIn",
  },
]; // End social links

const defaultLegalLinks = [
  { name: "Política de Privacidade", href: "/privacidade" },
];

export const Footer7 = ({
  logo = {
    url: "/",
    title: "MEZZOLD STUDIO",
  },
  sections = defaultSections,
  description = "Engenharia de soluções digitais de alta performance. Construímos plataformas inovadoras para marcas SaaS e digital-first.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2026 Mezzold Studio. Todos os direitos reservados.",
  legalLinks = defaultLegalLinks,
}: Footer7Props) => {
  return (
    <section className="py-16 bg-surface">
      <div className="container mx-auto px-6">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            <div className="flex items-center gap-2 lg:justify-start">
              <a href={logo.url}>
                <h2 className="font-sans font-black text-xl tracking-tighter text-foreground">
                  {logo.title}
                </h2>
              </a>
            </div>
            <p className="max-w-[70%] text-sm text-foreground/60">
              {description}
            </p>
            <ul className="flex items-center space-x-6 text-foreground/50">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-foreground transition-colors">
                  <Link
                    href={social.href}
                    prefetch={social.href === "/404" ? false : undefined}
                    aria-label={social.label}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {social.icon}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-mono tracking-widest text-xs uppercase text-foreground/40">
                  {section.title}
                </h3>
                <ul className="space-y-3 text-sm text-foreground/60">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="font-medium hover:text-foreground transition-colors">
                      <Link href={link.href}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-[var(--border)] py-8 text-xs font-mono text-foreground/40 md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-foreground transition-colors">
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
