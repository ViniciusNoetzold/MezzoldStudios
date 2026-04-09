'use client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon, PlusIcon } from 'lucide-react';
import { useAccent } from '../layout/AccentProvider';

type ContactInfoProps = React.ComponentProps<'div'> & {
	icon: LucideIcon;
	label: string;
	value: string;
	copyable?: boolean;
	href?: string;
};

type ContactCardProps = React.ComponentProps<'div'> & {
	title?: string;
	description?: string;
	contactInfo?: ContactInfoProps[];
	formSectionClassName?: string;
};

export function ContactCard({
	title = 'Entre em contato',
	description,
	contactInfo,
	className,
	formSectionClassName,
	children,
	...props
}: ContactCardProps) {
	const { accentRgb } = useAccent();

	return (
		<div
			className={cn(
				'relative w-full border border-white/10 bg-black/30 backdrop-blur-sm',
				// Desktop: side-by-side 2/3 columns. Mobile: single column.
				'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
				className,
			)}
			{...props}
		>
			{/* Corner decorators — hidden on mobile, visible md+ */}
			<PlusIcon className="absolute -top-3 -left-3 h-6 w-6 text-white/50 hidden md:block" />
			<PlusIcon className="absolute -top-3 -right-3 h-6 w-6 text-white/50 hidden md:block" />
			<PlusIcon className="absolute -bottom-3 -left-3 h-6 w-6 text-white/50 hidden md:block" />
			<PlusIcon className="absolute -right-3 -bottom-3 h-6 w-6 text-white/50 hidden md:block" />

			{/* ── Left / Top: Info panel ── */}
			<div className="flex flex-col justify-between lg:col-span-2">
				<div className="relative h-full space-y-4 px-5 py-6 md:p-8">

					{/* Accent top bar — mobile only */}
					<div 
            className="md:hidden w-10 h-[2px] mb-5 bg-white/20" 
          />

					<h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
						{title}
					</h2>
					{description && (
						<p className="text-white/50 text-sm md:text-base leading-relaxed max-w-xl">
							{description}
						</p>
					)}

					{/* Contact info — horizontal scroll chips on mobile, grid on desktop */}
					{contactInfo && contactInfo.length > 0 && (
						<>
							{/* Mobile: compact horizontal chips */}
							<div className="md:hidden flex flex-col gap-2 pt-2">
								{contactInfo.map((info, index) => (
									<MobileContactChip key={index} {...info} />
								))}
							</div>

							{/* Desktop: single column so items stack Email → Telefone → Endereço */}
							<div className="hidden md:flex md:flex-col gap-2">
								{contactInfo.map((info, index) => (
									<ContactInfo key={index} {...info} />
								))}
							</div>
						</>
					)}
				</div>
			</div>

			{/* ── Right / Bottom: Form panel ── */}
			<div
				className={cn(
					'flex h-full w-full items-start',
					// Mobile: top border separator. Desktop: left border.
					'border-t border-white/10 md:border-t-0 md:border-l',
					'bg-white/[0.02] p-5 md:p-6 md:col-span-1',
					formSectionClassName,
				)}
			>
				{children}
			</div>
		</div>
	);
}

/** Compact row chip used on mobile */
function MobileContactChip({ icon: Icon, label, value, copyable, href, className, ...props }: ContactInfoProps) {
	const [copied, setCopied] = useState(false);

	function handleClick() {
		if (href) {
			if (href.startsWith('mailto:')) {
				window.location.href = href;
			} else {
				window.open(href, '_blank', 'noopener,noreferrer');
			}
			return;
		}
		if (!copyable) return;
		navigator.clipboard.writeText(value).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	}

	return (
		<div
			className={cn(
				'flex items-center gap-3 px-3 py-2.5 rounded-lg border border-white/8 bg-white/[0.03]',
				(copyable || href) && 'cursor-pointer select-none active:scale-[0.98] transition-transform duration-100',
				className,
			)}
			onClick={handleClick}
			{...props}
		>
			<div className="shrink-0 rounded-md bg-white/5 p-2 text-white/60">
				<Icon className="h-4 w-4" />
			</div>
			<div className="min-w-0 flex-1">
				<p className="text-[10px] font-mono tracking-widest uppercase text-white/40">{label}</p>
				<p className="text-white text-xs font-medium truncate">{value}</p>
			</div>
			{copyable && (
				<span className="shrink-0 font-mono text-[9px] tracking-widest uppercase text-white/30 transition-colors duration-200">
					{copied ? 'Copiado!' : 'Copiar'}
				</span>
			)}
		</div>
	);
}

/** Full card used on desktop */
function ContactInfo({ icon: Icon, label, value, copyable, href, className, ...props }: ContactInfoProps) {
	const [copied, setCopied] = useState(false);

	function handleClick() {
		if (href) {
			if (href.startsWith('mailto:')) {
				window.location.href = href;
			} else {
				window.open(href, '_blank', 'noopener,noreferrer');
			}
			return;
		}
		if (!copyable) return;
		navigator.clipboard.writeText(value).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	}

	return (
		<div
			className={cn(
				'flex items-center gap-3 py-3',
				(copyable || href) && 'cursor-pointer select-none group/copy hover:bg-white/[0.02] rounded-xl px-2 -mx-2 transition-colors',
				className,
			)}
			onClick={handleClick}
			{...props}
		>
			<div className="bg-white/5 border border-white/10 rounded-lg p-3 text-white shrink-0">
				<Icon className="h-5 w-5" />
			</div>
			<div className="min-w-0 flex-1">
				<p className="font-medium text-white">{label}</p>
				<p className="text-white/60 text-xs truncate">{value}</p>
			</div>
			{copyable && (
				<span className="shrink-0 font-mono text-[9px] tracking-widest uppercase text-white/25 group-hover/copy:text-white/50 transition-colors duration-200">
					{copied ? 'Copiado!' : 'Copiar'}
				</span>
			)}
		</div>
	);
}
