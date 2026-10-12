import type { Metadata } from "next";
import { BlogView } from "@/components/blog/blog-view";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "İmplant, ortodonti, estetik diş hekimliği, çocuk diş sağlığı ve sağlık turizmi üzerine Aureum hekimlerinden güncel yazılar.",
};

export default function BlogPage() {
  return <BlogView />;
}
