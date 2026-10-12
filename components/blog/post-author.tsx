"use client";

import Image from "next/image";
import { Mark } from "@/components/brand/mark";
import { useLocale } from "@/components/providers/locale-provider";
import type { BlogPost } from "@/lib/blog";
import { cn } from "@/lib/cn";
import { doctors, tx } from "@/lib/content";

export function usePostAuthor(post: BlogPost) {
  const { locale, t } = useLocale();
  const doctor = post.authorId ? doctors.find((item) => item.id === post.authorId) : undefined;
  return doctor
    ? { name: doctor.name, role: tx(doctor.role, locale), photo: doctor.photo }
    : { name: t.blogPost.editorial, role: t.blogPost.editorialRole, photo: null };
}

export function AuthorAvatar({ post, className }: { post: BlogPost; className?: string }) {
  const author = usePostAuthor(post);
  return (
    <span className={cn("relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-navy-950 text-gold-300", className)}>
      {author.photo ? (
        <Image src={author.photo} alt={author.name} fill sizes="64px" className="object-cover object-top" />
      ) : (
        <Mark className="h-1/2 w-1/2" />
      )}
    </span>
  );
}
