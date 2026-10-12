"use client";

import { ArrowUpRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FadeIn } from "@/components/motion/fade-in";
import { useLocale } from "@/components/providers/locale-provider";
import { OnlineBookingLink } from "@/components/ui/online-booking";
import { blogCategories, blogPosts, formatPostDate, readingMinutes, type BlogCategory, type BlogPost } from "@/lib/blog";
import { cn } from "@/lib/cn";
import { tx } from "@/lib/content";
import { BlogCard } from "./blog-card";
import { AuthorAvatar, usePostAuthor } from "./post-author";

type Filter = BlogCategory | "all";

const categoryCounts = blogPosts.reduce<Partial<Record<BlogCategory, number>>>((counts, post) => {
  counts[post.category] = (counts[post.category] ?? 0) + 1;
  return counts;
}, {});

const usedCategories = (Object.keys(blogCategories) as BlogCategory[]).filter((category) => categoryCounts[category]);

export function BlogView() {
  const { locale, t } = useLocale();
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? blogPosts : blogPosts.filter((post) => post.category === filter);
  const [featured, ...rest] = visible;
  const recent = blogPosts.slice(0, 4);

  const chips: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: t.blogPage.all, count: blogPosts.length },
    ...usedCategories.map((category) => ({
      id: category,
      label: tx(blogCategories[category], locale),
      count: categoryCounts[category] ?? 0,
    })),
  ];

  return (
    <main>
      <header className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-48 right-[-12%] h-[560px] w-[560px] rounded-full bg-gold-300/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-24 left-[-18%] h-[420px] w-[420px] rounded-full bg-navy-700/[0.07] blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-5 pt-36 pb-12 sm:px-8">
          <FadeIn>
            <p className="flex items-center gap-3 text-[11px] tracking-[0.32em] text-gold-600 uppercase">
              <span aria-hidden className="h-px w-10 bg-gold-500" />
              {t.blogPage.eyebrow}
            </p>
            <div className="mt-5 grid gap-8 lg:grid-cols-12 lg:items-end">
              <h1 className="font-serif text-[clamp(3rem,6.4vw,5.8rem)] leading-[0.95] text-navy-950 lg:col-span-7">
                {t.blogPage.title}
                <span className="block text-gold-600 italic">{t.blogPage.titleAccent}</span>
              </h1>
              <div className="lg:col-span-5 lg:pb-3">
                <p className="border-l-2 border-gold-400/60 pl-5 text-lg leading-8 text-muted">{t.blogPage.lede}</p>
                <p className="mt-5 pl-5 text-[11px] tracking-[0.24em] text-navy-950 uppercase">
                  <span className="font-serif text-2xl tracking-normal text-gold-600">{blogPosts.length}</span>{" "}
                  {t.blogPage.posts} · {usedCategories.length} {t.blogPage.categoryCount}
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div
              role="group"
              aria-label={t.blogPage.filterLabel}
              className="-mx-5 mt-12 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
            >
              {chips.map((chip) => {
                const selected = filter === chip.id;
                return (
                  <button
                    key={chip.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setFilter(chip.id)}
                    className={cn(
                      "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[11px] tracking-[0.16em] uppercase transition-colors duration-300",
                      selected
                        ? "border-navy-950 bg-navy-950 text-foam"
                        : "border-line bg-foam/80 text-ink hover:border-gold-400 hover:text-navy-950",
                    )}
                  >
                    {chip.label}
                    <span className={cn("text-[10px]", selected ? "text-gold-300" : "text-muted")}>{chip.count}</span>
                  </button>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <section className="lg:col-span-8" aria-live="polite">
          {featured ? (
            <FadeIn key={`featured-${featured.slug}`}>
              <FeaturedPost post={featured} />
            </FadeIn>
          ) : null}

          {rest.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {rest.map((post, index) => (
                <FadeIn key={`${filter}-${post.slug}`} delay={(index % 2) * 0.06} className="h-full">
                  <BlogCard post={post} />
                </FadeIn>
              ))}
            </div>
          ) : null}
        </section>

        <aside className="lg:col-span-4">
          <div className="space-y-6 lg:sticky lg:top-28">
            <FadeIn delay={0.1}>
              <div className="bg-foam p-6 ring-1 ring-line/60">
                <h2 className="flex items-center gap-3 font-serif text-2xl text-navy-950">
                  <span aria-hidden className="h-px w-6 bg-gold-500" />
                  {t.blogPage.recent}
                </h2>
                <ul className="mt-5 divide-y divide-line">
                  {recent.map((post) => (
                    <li key={post.slug} className="py-4 first:pt-0 last:pb-0">
                      <Link href={`/blog/${post.slug}`} className="group flex gap-4">
                        <span className="relative h-[72px] w-[72px] shrink-0 overflow-hidden bg-navy-900">
                          <Image
                            src={post.image}
                            alt={tx(post.imageAlt, locale)}
                            fill
                            sizes="72px"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </span>
                        <span className="min-w-0">
                          <span className="line-clamp-2 font-serif text-lg leading-snug text-navy-950 transition-colors group-hover:text-gold-600">
                            {tx(post.title, locale)}
                          </span>
                          <time dateTime={post.date} className="mt-1.5 block text-[11px] tracking-[0.14em] text-muted uppercase">
                            {formatPostDate(post.date, locale)}
                          </time>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.14}>
              <div className="bg-foam p-6 ring-1 ring-line/60">
                <h2 className="flex items-center gap-3 font-serif text-2xl text-navy-950">
                  <span aria-hidden className="h-px w-6 bg-gold-500" />
                  {t.blogPage.categories}
                </h2>
                <ul className="mt-4">
                  {usedCategories.map((category) => {
                    const selected = filter === category;
                    return (
                      <li key={category}>
                        <button
                          type="button"
                          onClick={() => setFilter(selected ? "all" : category)}
                          aria-pressed={selected}
                          className={cn(
                            "group flex w-full items-center justify-between gap-3 border-b border-dotted border-line py-3 text-left text-sm transition-colors",
                            selected ? "text-gold-600" : "text-ink hover:text-navy-950",
                          )}
                        >
                          <span className="inline-flex items-center">
                            <span
                              className={cn(
                                "h-px bg-gold-500 transition-all duration-300",
                                selected ? "mr-2 w-3" : "w-0 group-hover:mr-2 group-hover:w-3",
                              )}
                            />
                            {tx(blogCategories[category], locale)}
                          </span>
                          <span className="grid h-6 min-w-6 place-items-center rounded-full bg-paper px-2 text-[11px] text-muted">
                            {categoryCounts[category]}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.18}>
              <div className="relative overflow-hidden bg-navy-950 p-7 text-foam">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-24 -right-20 h-56 w-56 rounded-full bg-gold-500/20 blur-3xl"
                />
                <p className="relative text-[11px] tracking-[0.28em] text-gold-300 uppercase">{t.blogPage.ctaEyebrow}</p>
                <p className="relative mt-3 font-serif text-3xl leading-tight">{t.blogPage.ctaTitle}</p>
                <p className="relative mt-3 text-sm leading-7 text-white/65">{t.blogPage.ctaBody}</p>
                <OnlineBookingLink href="/appointment" className="relative mt-6">
                  {t.blogPage.ctaButton}
                </OnlineBookingLink>
              </div>
            </FadeIn>
          </div>
        </aside>
      </div>
    </main>
  );
}

function FeaturedPost({ post }: { post: BlogPost }) {
  const { locale, t } = useLocale();
  const author = usePostAuthor(post);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative grid overflow-hidden bg-foam ring-1 ring-line/60 transition-[box-shadow] duration-500 hover:shadow-[0_40px_70px_-35px_rgba(7,17,31,0.45)] hover:ring-gold-400/60 md:grid-cols-2"
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-navy-900 md:aspect-auto md:min-h-[26rem]">
        <Image
          src={post.image}
          alt={tx(post.imageAlt, locale)}
          fill
          priority
          sizes="(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-linear-to-tr from-navy-950/60 via-transparent to-transparent" />
        <span className="absolute top-5 left-5 inline-flex items-center gap-2 bg-gold-400 px-3 py-1.5 text-[10px] font-medium tracking-[0.22em] text-navy-950 uppercase">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-navy-950" />
          {t.blogPage.featured}
        </span>
      </div>

      <div className="relative flex flex-col p-7 sm:p-9">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] tracking-[0.18em] uppercase">
          <span className="text-gold-600">{tx(blogCategories[post.category], locale)}</span>
          <span aria-hidden className="h-1 w-1 rounded-full bg-gold-500" />
          <time dateTime={post.date} className="text-muted">
            {formatPostDate(post.date, locale)}
          </time>
        </p>
        <h2 className="mt-4 font-serif text-[clamp(2rem,3.2vw,2.75rem)] leading-[1.05] text-navy-950">
          {tx(post.title, locale)}
        </h2>
        <p className="mt-4 flex-1 text-[15px] leading-7 text-muted">{tx(post.excerpt, locale)}</p>

        <div className="mt-8 flex items-center gap-3 border-t border-line pt-6">
          <AuthorAvatar post={post} className="h-11 w-11" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm text-navy-950">{author.name}</span>
            <span className="flex items-center gap-1.5 text-[11px] tracking-[0.12em] text-muted uppercase">
              <Clock className="h-3 w-3" />
              {readingMinutes(post, locale)} {t.blogPage.minRead}
            </span>
          </span>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy-950 text-gold-300 transition-all duration-500 group-hover:rotate-45 group-hover:bg-gold-400 group-hover:text-navy-950">
            <ArrowUpRight className="h-5 w-5" strokeWidth={1.6} />
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
