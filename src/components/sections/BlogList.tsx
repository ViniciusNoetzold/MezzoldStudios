'use client';
import { IconHover3D } from '@/components/ui/icon-3d-hover';
import CpuIcon from '@/components/ui/icons/cpu-icon';
import ShieldCheck from '@/components/ui/icons/shield-check';
import PaintIcon from '@/components/ui/icons/paint-icon';
import UsersGroupIcon from '@/components/ui/icons/users-group-icon';
import Link from 'next/link';
import { posts } from '@/lib/blog-posts';

const iconProps = { size: 32, strokeWidth: 1.5, color: 'rgba(255,255,255,0.9)' };

const categoryIcon: Record<string, React.ReactNode> = {
  PERFORMANCE: <CpuIcon {...iconProps} />,
  PRODUTO: <ShieldCheck {...iconProps} />,
  DESIGN: <PaintIcon {...iconProps} />,
  'AUTOMAÇÃO': <UsersGroupIcon {...iconProps} />,
};

export function BlogList() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
          <IconHover3D
            heading={post.title}
            text={post.excerpt}
            icon={categoryIcon[post.category] ?? <CpuIcon {...iconProps} />}
            date={post.date}
            readTime={post.readTime}
            category={post.category}
          />
        </Link>
      ))}
    </div>
  );
}
