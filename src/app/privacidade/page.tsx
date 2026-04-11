import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Política de Privacidade | Mezzold Studio",
  description: "Nossa política de privacidade e compromisso com a confidencialidade e segurança dos dados das nossas empresas parceiras.",
};

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-surface text-foreground selection:bg-electric-red/30 flex flex-col justify-between">
      <Header />
      
      <div className="flex-1 pt-40 pb-24 px-6 md:px-12 max-w-4xl mx-auto w-full">
        <h1 className="font-sans text-4xl md:text-5xl font-black tracking-tight mb-4 text-foreground">
          Política de Privacidade
        </h1>
        
        <div className="w-16 h-1 bg-electric-red mb-12"></div>

        <div className="space-y-10 text-foreground/60 leading-relaxed font-sans text-sm md:text-base">
          <div>
            <p className="mb-4">
              O <strong>Mezzold Studio</strong> tem o compromisso inegociável de proteger a sua privacidade, as informações do seu negócio e os seus dados pessoais. Esta política explica como coletamos, usamos, compartilhamos e protegemos as suas informações, em total conformidade com a Lei Geral de Proteção de Dados (LGPD) e estritas práticas de segurança da informação.
            </p>
          </div>

          <section>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-4">1. Coleta de Dados</h2>
            <p className="mb-4">
              De forma a manter uma estética mínima e operações altamente focadas, nós coletamos informações estritamente essenciais para a formatação de nossas soluções de elite:
            </p>
            <ul className="list-none space-y-3">
              <li className="flex gap-2">
                <span className="text-electric-red">›</span> 
                <span><strong className="text-foreground">Informações de Contato:</strong> Captamos nome, e-mail e demais dados submetidos de modo voluntário por você nos formulários de interesse e nas interações diretas com as nossas interfaces de comunicação.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-electric-red">›</span> 
                <span><strong className="text-foreground">Dados Operacionais e Tecnológicos:</strong> Informações de metadados, endereço IP e métricas analíticas anonimizadas de UX para garantir que nossas plataformas estejam escalando com máxima performance e segurança.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-4">2. Como os Dados São Utilizados</h2>
            <p className="mb-4">
              Todo fragmento de dado coletado é retido com propósito funcional. A finalidade do processamento inclui:
            </p>
            <ul className="list-none space-y-3">
              <li className="flex gap-2"><span className="text-electric-red">›</span> Elaborar propostas técnicas, comerciais e responder contatos profissionais.</li>
              <li className="flex gap-2"><span className="text-electric-red">›</span> Otimizar o design interativo, estabilidade nativa e velocidade da navegação pelo nosso website.</li>
              <li className="flex gap-2"><span className="text-electric-red">›</span> Mitigar vetores de risco e assegurar proteção completa contra qualquer atividade anômala contra nossa infraestrutura.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-4">3. Sigilo e Compartilhamento</h2>
            <p>
              Em linha com o princípio do <em>Quiet Luxury</em>, a discrição é nosso pilar. O Mezzold Studio <strong>não comercializa, não aluga e não repassa</strong> qualquer dos seus dados para listas externas de data-brokers ou anunciantes terceiros inoportunos. A partilha de informações ocorrerá unicamente em processos operacionais inerentes aos nossos servidores de e-mail criptografado ou em requisições diretamente exigidas pelo âmbito jurídico.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-4">4. Direitos e Gerenciamento de Dados</h2>
            <p className="mb-4">
              Segundo a legislação aplicável, os seus direitos fundamentais garantem que você possa solicitar quando quiser:
            </p>
            <ul className="list-none space-y-3 mb-4">
              <li className="flex gap-2"><span className="text-electric-red">›</span> Confirmação ou visualização de informações sensíveis ou analíticas presentes conosco.</li>
              <li className="flex gap-2"><span className="text-electric-red">›</span> Alteração de qualquer dado impreciso e retificação em nossos pipelines.</li>
              <li className="flex gap-2"><span className="text-electric-red">›</span> Revogação permanente de armazenamento na nossa base (Erase/Right to be Forgotten).</li>
            </ul>
            <p>
              Para engatar qualquer uma dessas ordens, escreva diretamente para nosso canal de privacidade: <a href="mailto:mezzoldstudio@gmail.com" className="text-electric-red hover:underline underline-offset-4">mezzoldstudio@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
