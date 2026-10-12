import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PostView } from "@/components/blog/post-view";
import { blogPosts, getPost } from "@/lib/blog";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Blog" };
  return {
    title: post.title.tr,
    description: post.excerpt.tr,
    openGraph: {
      type: "article",
      title: post.title.tr,
      description: post.excerpt.tr,
      publishedTime: post.date,
      images: [post.image],
    },
  };
}

function PostFallback() {
  return <main className="min-h-[100svh] bg-paper" />;
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<PostFallback />}>
      <PostContent params={params} />
    </Suspense>
  );
}

async function PostContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return <PostView slug={post.slug} />;
}
