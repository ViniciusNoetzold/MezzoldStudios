'use client';
import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { GlassButton } from '../ui/glass-button';
import { MenuToggleIcon } from '../ui/menu-toggle-icon';
import { useScroll } from '../ui/use-scroll';

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);

	const links = [
		{ label: 'Blog', href: '/blog' },
		{ label: 'Portfólio', href: '/cases' },
		{ label: 'Contato', href: '/#contact' },
	];

	React.useEffect(() => {
		if (open) {
			// position: fixed prevents iOS Safari scroll-position jump
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
					// Não scrollado: no topo, tela cheia, background sutil (ou transparente)
					'top-0 max-w-full rounded-none border-b border-transparent bg-transparent': !scrolled && !open,
					// Scrollado: desgruda do topo, forma de pílula no desktop
					'top-0 md:top-6 max-w-full md:max-w-4xl md:rounded-full border-b md:border border-transparent md:border-glass-border glass-panel shadow-lg': scrolled && !open,
					// Menu aberto
					'top-0 max-w-full glass-panel border-b border-glass-border rounded-none': open,
				}
			)}
		>
			<nav
				className={cn(
					'flex h-14 md:h-16 w-full items-center justify-between px-6 transition-all duration-500 ease-out',
					{
						// padding maior quando desgrutado pra dar respiro
						'md:px-8': scrolled,
						'md:px-10': !scrolled,
					}
				)}
			>
				<Link href="/" className="font-sans font-black text-xl tracking-tighter text-white" onClick={() => setOpen(false)}>
					MEZZOLD<span className="text-electric-red">.</span>
				</Link>
				
				<div className="hidden items-center gap-8 md:flex text-sm font-mono tracking-widest uppercase">
					{links.map((link, i) => (
						<Link key={i} className="hover:text-white transition-colors text-white/70" href={link.href}>
							{link.label}
						</Link>
					))}
				</div>
				
				{/* min 48px touch target per iOS HIG / Material 3 */}
				<button
					onClick={() => setOpen(!open)}
					aria-label={open ? 'Fechar menu' : 'Abrir menu'}
					aria-expanded={open}
					className="md:hidden flex items-center justify-center text-white h-12 w-12 rounded-full hover:bg-white/5 active:bg-white/10 transition-colors"
				>
					<MenuToggleIcon open={open} className="size-6" duration={300} />
				</button>
			</nav>

			<div
				className={cn(
					'fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-t border-glass-border bg-[#020202]/95 backdrop-blur-xl md:hidden transition-all duration-300',
					open ? 'opacity-100 translate-y-0 h-screen pointer-events-auto' : 'opacity-0 -translate-y-8 h-0 pointer-events-none',
				)}
			>
				<div
					className={cn(
						'flex h-full w-full flex-col p-6 font-mono tracking-widest uppercase text-lg',
					)}
				>
					<div className="grid gap-y-6 mt-8">
						{links.map((link) => (
							<Link
								key={link.label}
								className="text-white hover:text-electric-red active:text-electric-red transition-colors w-full border-b border-white/5 py-3 flex items-center min-h-[44px]"
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
