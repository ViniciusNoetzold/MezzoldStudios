import React from "react";
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
    href: "https://w.app/mezzold",
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
    <section className="py-16 bg-[#020202]">
      <div className="container mx-auto px-6">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            <div className="flex items-center gap-2 lg:justify-start">
              <a href={logo.url}>
                <h2 className="font-sans font-black text-xl tracking-tighter text-white">
                  {logo.title}
                </h2>
              </a>
            </div>
            <p className="max-w-[70%] text-sm text-white/60">
              {description}
            </p>
            <ul className="flex items-center space-x-6 text-white/50">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-white transition-colors">
                  <a
                    href={social.href}
                    aria-label={social.label}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-mono tracking-widest text-xs uppercase text-white/40">
                  {section.title}
                </h3>
                <ul className="space-y-3 text-sm text-white/60">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="font-medium hover:text-white transition-colors">
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-white/5 py-8 text-xs font-mono text-white/40 md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-white transition-colors">
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
