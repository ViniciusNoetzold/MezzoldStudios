'use client';
import { ContactCard } from "@/components/ui/contact-card";
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TunnelBackground } from '@/components/ui/tunnel-hero';

export function ContactSection() {
	return (
		<section id="contact" className="py-24 md:py-32 relative px-6 flex w-full items-center justify-center overflow-hidden bg-black">
			
			{/* Tunnel WebGL background */}
			<TunnelBackground />

			{/* Blur + dim overlay to soften the animation */}
			<div className="absolute inset-0 z-[1] backdrop-blur-[2px] bg-black/60" />

			{/* Subtle vignette to fade edges */}
			<div
				className="absolute inset-0 z-[2] pointer-events-none"
				style={{
					background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.75) 100%)',
				}}
			/>

			{/* Content */}
			<div className="container mx-auto max-w-6xl relative z-[3]">
				<ContactCard
					title="Entre em contato"
					description="Se você tem alguma dúvida sobre nossos serviços ou precisa de ajuda, preencha o formulário aqui. Faremos o possível para responder em até 1 dia útil."
					contactInfo={[
						{
							icon: MailIcon,
							label: 'Email',
							value: 'mezzoldstudio@outlook.com',
						},
						{
							icon: PhoneIcon,
							label: 'Telefone',
							value: 'ainda não disponivel',
						},
						{
							icon: MapPinIcon,
							label: 'Endereço',
							value: 'sarandi, rio grande do sul 99560-000',
							className: 'col-span-2',
						}
					]}
				>
					<form action="" onSubmit={(e) => e.preventDefault()} className="w-full space-y-4">
						<div className="flex flex-col gap-2">
							<Label className="text-white">Nome</Label>
							<Input type="text" className="bg-[#020202]/50 border-white/10 text-white focus-visible:border-cyan/50 focus-visible:ring-cyan/50" />
						</div>
						<div className="flex flex-col gap-2">
							<Label className="text-white">Email</Label>
							<Input type="email" className="bg-[#020202]/50 border-white/10 text-white focus-visible:border-cyan/50 focus-visible:ring-cyan/50" />
						</div>
						<div className="flex flex-col gap-2">
							<Label className="text-white">Telefone</Label>
							<Input type="tel" className="bg-[#020202]/50 border-white/10 text-white focus-visible:border-cyan/50 focus-visible:ring-cyan/50" />
						</div>
						<div className="flex flex-col gap-2">
							<Label className="text-white">Mensagem</Label>
							<Textarea className="bg-[#020202]/50 border-white/10 text-white resize-none focus-visible:border-cyan/50 focus-visible:ring-cyan/50" />
						</div>
						<Button className="w-full bg-white text-black hover:bg-cyan hover:text-black font-bold h-12 mt-2 transition-all" type="submit">
							Enviar Proposta
						</Button>
					</form>
				</ContactCard>
			</div>
		</section>
	);
}
