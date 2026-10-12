"use client";

import { ArrowLeft, ArrowUpRight, CalendarDays, Clock, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { useLocale } from "@/components/providers/locale-provider";
import { CtaLink } from "@/components/ui/cta-link";
import { OnlineBookingLink } from "@/components/ui/online-booking";
import { blogCategories, formatPostDate, getPost, readingMinutes, relatedPosts, type BlogPost } from "@/lib/blog";
import { tx } from "@/lib/content";
import { getTreatment } from "@/lib/treatments";
import { BlogCard } from "./blog-card";
import { AuthorAvatar, usePostAuthor } from "./post-author";

function Prose({ text, lead = false }: { text: string; lead?: boolean }) {
  return (
    <div className="space-y-5">
      {text.split("\n\n").map((paragraph, index) => (
        <p
          key={paragraph.slice(0, 48)}
          className={
            lead && index === 0
              ? "text-[1.2rem] leading-9 text-ink first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter:font-serif first-letter:text-[4.6rem] first-letter:leading-[0.8] first-letter:text-gold-600"
              : "text-[1.05rem] leading-8 text-ink/85"
          }
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export function PostView({ slug }: { slug: string }) {
  const post = getPost(slug);
  if (!post) return null;
  return <PostArticle post={post} />;
}

function PostArticle({ post }: { post: BlogPost }) {
  const { locale, t } = useLocale();
  const copy = t.blogPost;
  const author = usePostAuthor(post);
  const treatment = post.treatmentId ? getTreatment(post.treatmentId) : undefined;
  const related = relatedPosts(post);
  const minutes = readingMinutes(post, locale);

  return (
    <main>
      <header className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-48 right-[-12%] h-[520px] w-[520px] rounded-full bg-gold-300/25 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-5 pt-36 pb-12 sm:px-8">
          <FadeIn>
            <div className="flex flex-wrap items-center gap-4 text-[11px] tracking-[0.24em] uppercase">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-navy-950 transition-colors hover:text-gold-600"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                {copy.back}
              </Link>
              <span aria-hidden className="h-px w-8 bg-gold-500" />
              <span className="text-gold-600">{tx(blogCategories[post.category], locale)}</span>
            </div>
            <h1 className="mt-6 max-w-5xl font-serif text-[clamp(2.6rem,5.6vw,5rem)] leading-[1] text-navy-950">
              {tx(post.title, locale)}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{tx(post.excerpt, locale)}</p>

            <dl className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-line pt-6">
              <div className="flex items-center gap-3">
                <AuthorAvatar post={post} className="h-12 w-12" />
                <div>
                  <dt className="text-[10px] tracking-[0.22em] text-gold-600 uppercase">{copy.writtenBy}</dt>
                  <dd className="text-sm text-navy-950">
                    {author.name}
                    <span className="text-muted"> · {author.role}</span>
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CalendarDays className="h-4 w-4 text-gold-600" />
                <div>
                  <dt className="text-[10px] tracking-[0.22em] text-gold-600 uppercase">{copy.published}</dt>
                  <dd className="text-sm text-navy-950">
                    <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-gold-600" />
                <div>
                  <dt className="text-[10px] tracking-[0.22em] text-gold-600 uppercase">{copy.readTime}</dt>
                  <dd className="text-sm text-navy-950">
                    {minutes} {t.blogPage.minRead}
                  </dd>
                </div>
              </div>
            </dl>
          </FadeIn>
        </div>
      </header>

      <FadeIn className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative aspect-[16/10] overflow-hidden bg-navy-900 sm:aspect-[21/9]">
          <Image
            src={post.image}
            alt={tx(post.imageAlt, locale)}
            fill
            priority
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 ring-1 ring-line/60 ring-inset" />
        </div>
      </FadeIn>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <article className="lg:col-span-8 lg:pr-6">
          <FadeIn>
            <Prose text={tx(post.intro, locale)} lead />
          </FadeIn>

          <div className="mt-14 space-y-14">
            {post.sections.map((section, index) => (
              <section key={section.heading.tr} id={`bolum-${index + 1}`} className="scroll-mt-28">
                <FadeIn>
                  <p className="font-serif text-3xl text-gold-500">{String(index + 1).padStart(2, "0")}</p>
                  <h2 className="mt-2 font-serif text-[clamp(2rem,3.4vw,2.6rem)] leading-tight text-navy-950">
                    {tx(section.heading, locale)}
                  </h2>
                  <div className="mt-5">
                    <Prose text={tx(section.body, locale)} />
                  </div>
                </FadeIn>
              </section>
            ))}
          </div>

          <FadeIn>
            <aside className="relative mt-16 overflow-hidden bg-navy-950 px-7 py-9 text-foam sm:px-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -bottom-24 h-64 w-64 rounded-full bg-gold-500/20 blur-3xl"
              />
              <Quote className="relative h-8 w-8 text-gold-400" strokeWidth={1.4} />
              <p className="relative mt-4 font-serif text-[clamp(1.6rem,2.6vw,2.1rem)] leading-snug italic">
                {tx(post.takeaway, locale)}
              </p>
              <p className="relative mt-5 text-[11px] tracking-[0.26em] text-gold-300 uppercase">{copy.takeaway}</p>
            </aside>
          </FadeIn>

          <p className="mt-10 border-l-2 border-line pl-5 text-sm leading-7 text-muted">{copy.disclaimer}</p>
        </article>

        <aside className="lg:col-span-4">
          <div className="space-y-6 lg:sticky lg:top-28">
            <nav aria-label={copy.onThisPage} className="hidden bg-foam p-6 ring-1 ring-line/60 lg:block">
              <p className="text-[11px] tracking-[0.26em] text-gold-600 uppercase">{copy.onThisPage}</p>
              <ol className="mt-4 space-y-1">
                {post.sections.map((section, index) => (
                  <li key={section.heading.tr}>
                    <a
                      href={`#bolum-${index + 1}`}
                      className="group flex gap-3 py-1.5 text-sm leading-6 text-muted transition-colors hover:text-navy-950"
                    >
                      <span className="font-serif text-base text-gold-500">{String(index + 1).padStart(2, "0")}</span>
                      <span>{tx(section.heading, locale)}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {treatment ? (
              <div className="group overflow-hidden bg-foam ring-1 ring-line/60">
                <div className="relative aspect-[16/10] overflow-hidden bg-navy-900">
                  <Image
                    src={treatment.image}
                    alt={tx(treatment.imageAlt, locale)}
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
                  <div className="absolute inset-x-5 bottom-4 text-foam">
                    <p className="text-[10px] tracking-[0.26em] text-gold-300 uppercase">{copy.treatmentEyebrow}</p>
                    <p className="mt-1 font-serif text-3xl leading-tight">{tx(treatment.name, locale)}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-7 text-muted">{tx(treatment.summary, locale)}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    <OnlineBookingLink href={`/appointment?service=${treatment.id}`} surface="light">
                      {copy.bookCta}
                    </OnlineBookingLink>
                    <Link
                      href={`/tedaviler/${treatment.id}`}
                      className="group/link inline-flex items-center gap-1.5 text-[12px] tracking-[0.16em] text-navy-950 uppercase transition-colors hover:text-gold-600"
                    >
                      {copy.treatmentCta}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
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
            )}
          </div>
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="border-t border-line bg-foam/60">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
            <FadeIn>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="flex items-center gap-3 text-[11px] tracking-[0.32em] text-gold-600 uppercase">
                    <span aria-hidden className="h-px w-10 bg-gold-500" />
                    {copy.relatedEyebrow}
                  </p>
                  <h2 className="mt-4 font-serif text-[clamp(2.4rem,4.6vw,4rem)] leading-[0.95] text-navy-950">
                    {copy.related}
                  </h2>
                </div>
                <CtaLink href="/blog" className="shrink-0 self-start md:self-auto">
                  {copy.allPosts}
                </CtaLink>
              </div>
            </FadeIn>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <FadeIn key={item.slug} delay={index * 0.06} className="h-full">
                  <BlogCard post={item} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
