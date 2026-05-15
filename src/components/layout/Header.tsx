'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '../ui/menu-toggle-icon';
import { useScroll } from '../ui/use-scroll';
import { useTheme } from './ThemeProvider';

/* ── Theme toggle button ─────────────────────────────── */
function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();
	const isLight = theme === 'light';

	return (
		<button
			onClick={toggleTheme}
			aria-label={isLight ? 'Mudar para tema escuro' : 'Mudar para tema claro'}
			title={isLight ? 'Tema escuro' : 'Tema claro'}
			className={cn(
				'flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300',
				'hover:scale-105 active:scale-95',
				isLight
					? 'border-black/12 bg-black/5 text-black/60 hover:bg-black/10 hover:text-black/90'
					: 'border-white/12 bg-white/[0.04] text-white/50 hover:bg-white/[0.08] hover:text-white/90',
			)}
		>
			{isLight ? (
				/* Moon icon — click to go dark */
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
				</svg>
			) : (
				/* Sun icon — click to go light */
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<circle cx="12" cy="12" r="5" />
					<line x1="12" y1="1" x2="12" y2="3" />
					<line x1="12" y1="21" x2="12" y2="23" />
					<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
					<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
					<line x1="1" y1="12" x2="3" y2="12" />
					<line x1="21" y1="12" x2="23" y2="12" />
					<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
					<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
				</svg>
			)}
		</button>
	);
}

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);
	const pathname = usePathname();
	const isBlog = pathname?.startsWith('/blog') ?? false;

	const links = [
		{ label: 'Blog', href: '/blog' },
		{ label: 'Portfólio', href: '/cases' },
		{ label: 'Clientes', href: '/clientes' },
		{ label: 'Contato', href: '/#contact' },
	];

	React.useEffect(() => {
		if (open) {
			const scrollY = window.scrollY;
			document.body.style.position = 'fixed';
			document.body.style.top = `-${scrollY}px`;
			document.body.style.width = '100%';
		} else {
			const scrollY = document.body.style.top;
			document.body.style.position = '';
			document.body.style.top = '';
			document.body.style.width = '';
			if (scrollY) window.scrollTo(0, -parseInt(scrollY));
		}
		return () => {
			document.body.style.position = '';
			document.body.style.top = '';
			document.body.style.width = '';
		};
	}, [open]);

	return (
		<header
			className={cn(
				'fixed left-0 right-0 z-50 mx-auto w-full transition-all duration-500 ease-out flex flex-col items-center justify-center',
				{
					// Non-blog, top-of-page: keep elegant transparent hero overlap
					'top-0 max-w-full rounded-none border-b border-transparent bg-transparent': !isBlog && !scrolled && !open,
					// Non-blog, scrolled: floating capsule with premium solid bg
					'top-0 md:top-6 max-w-full md:max-w-4xl md:rounded-full border-b md:border border-transparent md:border-[rgba(255,255,255,0.10)] nav-solid shadow-lg': !isBlog && scrolled && !open,
					// Blog top-of-page OR mobile menu open: full-width solid bar so content never bleeds through
					'top-0 max-w-full rounded-none border-b border-[rgba(255,255,255,0.10)] nav-solid': open || (isBlog && !scrolled && !open),
					// Blog scrolled: solid floating capsule
					'top-0 md:top-6 max-w-full md:max-w-4xl md:rounded-full border-b md:border border-[rgba(255,255,255,0.10)] nav-solid shadow-lg': isBlog && scrolled && !open,
				}
			)}
		>
			<nav
				className={cn(
					'flex h-14 md:h-16 w-full items-center justify-between px-6 transition-all duration-500 ease-out',
					{
						'md:px-8': scrolled,
						'md:px-10': !scrolled,
					}
				)}
			>
				<Link href="/" className="font-sans font-black text-xl tracking-tighter text-foreground" onClick={() => setOpen(false)}>
					MEZZOLD<span className="text-electric-red">.</span>
				</Link>

				<div className="hidden items-center gap-8 md:flex text-sm font-mono tracking-widest uppercase">
					{links.map((link, i) => (
						<Link key={i} className="hover:text-foreground transition-colors text-foreground/70" href={link.href}>
							{link.label}
						</Link>
					))}
					<ThemeToggle />
				</div>

				{/* Mobile: theme toggle + hamburger */}
				<div className="md:hidden flex items-center gap-1">
					<ThemeToggle />
					<button
						onClick={() => setOpen(!open)}
						aria-label={open ? 'Fechar menu' : 'Abrir menu'}
						aria-expanded={open}
						className="flex items-center justify-center text-foreground h-12 w-12 rounded-full hover:bg-foreground/5 active:bg-foreground/10 transition-colors"
					>
						<MenuToggleIcon open={open} className="size-6" duration={300} />
					</button>
				</div>
			</nav>

			{/* Mobile menu overlay */}
			<div
				className={cn(
					'fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-t border-glass-border backdrop-blur-xl md:hidden transition-all duration-300',
					open ? 'opacity-100 translate-y-0 h-screen pointer-events-auto' : 'opacity-0 -translate-y-8 h-0 pointer-events-none',
				)}
				style={{ backgroundColor: 'color-mix(in srgb, var(--bg-primary) 95%, transparent)' }}
			>
				<div className="flex h-full w-full flex-col p-6 font-mono tracking-widest uppercase text-lg">
					<div className="grid gap-y-6 mt-8">
						{links.map((link) => (
							<Link
								key={link.label}
								className="text-foreground hover:text-electric-red active:text-electric-red transition-colors w-full border-b border-[var(--border)] py-3 flex items-center min-h-[44px]"
								href={link.href}
								onClick={() => setOpen(false)}
							>
								{link.label}
							</Link>
						))}
					</div>
				</div>
			</div>
		</header>
	);
}
