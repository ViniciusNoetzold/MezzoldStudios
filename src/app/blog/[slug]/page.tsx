import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BlogPostContent } from '@/components/sections/BlogPostContent';
import { posts, getPostBySlug } from '@/lib/blog-posts';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Blog Mezzold`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const nextPost = posts[currentIndex + 1] ?? posts[0];

  return (
    <>
      <Header />
      <main className="flex-1 relative z-10">
        <BlogPostContent
          post={post}
          nextPost={nextPost}
          postNumber={currentIndex + 1}
        />
      </main>
      <Footer />
    </>
  );
}
