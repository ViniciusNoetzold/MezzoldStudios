import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BlogList } from '@/components/sections/BlogList';

export const metadata = {
  title: 'Blog | Mezzold Studio',
  description:
    'Ideias, estratégias e bastidores da Mezzold Studio sobre performance, design, automação, SaaS e engenharia digital.',
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="flex-1 relative z-10">
        <BlogList />
      </main>
      <Footer />
    </>
  );
}
