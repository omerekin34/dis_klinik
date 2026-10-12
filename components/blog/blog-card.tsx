"use client";

import { ArrowUpRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/components/providers/locale-provider";
import { blogCategories, formatPostDate, readingMinutes, type BlogPost } from "@/lib/blog";
import { tx } from "@/lib/content";

export function BlogCard({ post }: { post: BlogPost }) {
  const { locale, t } = useLocale();

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex h-full flex-col overflow-hidden bg-foam shadow-[0_1px_0_rgba(7,17,31,0.04)] ring-1 ring-line/60 transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[0_40px_70px_-35px_rgba(7,17,31,0.45)] hover:ring-gold-400/60 focus-visible:ring-gold-400"
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-navy-900">
        <Image
          src={post.image}
          alt={tx(post.imageAlt, locale)}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-[transform,filter] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:saturate-[1.1]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy-950/70 via-navy-950/5 to-transparent opacity-50 transition-opacity duration-700 group-hover:opacity-100" />
        <span className="absolute top-4 left-4 bg-foam/92 px-3 py-1.5 text-[10px] font-medium tracking-[0.2em] text-navy-950 uppercase shadow-sm backdrop-blur-md">
          {tx(blogCategories[post.category], locale)}
        </span>
        <span className="absolute right-4 bottom-4 grid h-10 w-10 place-items-center rounded-full border border-foam/40 bg-navy-950/25 text-foam backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:border-gold-300 group-hover:bg-gold-400 group-hover:text-navy-950">
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
        </span>
      </div>

      <div className="relative flex flex-1 flex-col p-6">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] tracking-[0.18em] text-muted uppercase">
          <time dateTime={post.date} className="text-gold-600">
            {formatPostDate(post.date, locale)}
          </time>
          <span aria-hidden className="h-1 w-1 rounded-full bg-gold-500" />
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3 w-3" />
            {readingMinutes(post, locale)} {t.blogPage.minRead}
          </span>
        </p>
        <h3 className="mt-3 font-serif text-[1.7rem] leading-[1.15] text-navy-950">
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[length:100%_1px]">
            {tx(post.title, locale)}
          </span>
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-7 text-muted transition-colors duration-500 group-hover:text-ink">
          {tx(post.excerpt, locale)}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
          <span className="text-[12px] tracking-[0.16em] text-navy-950 uppercase transition-[letter-spacing] duration-500 group-hover:tracking-[0.24em]">
            {t.blogPage.readMore}
          </span>
          <span className="relative h-4 w-4 overflow-hidden text-gold-600">
            <ArrowUpRight className="absolute inset-0 h-4 w-4 transition-transform duration-500 group-hover:translate-x-4 group-hover:-translate-y-4" />
            <ArrowUpRight className="absolute inset-0 h-4 w-4 -translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
          </span>
        </div>
      </div>

      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-linear-to-r from-gold-500 via-gold-300 to-gold-600 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
      />
    </Link>
  );
}
