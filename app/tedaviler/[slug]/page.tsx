import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { TreatmentView } from "@/components/treatments/treatment-view";
import { getTreatment, treatments } from "@/lib/treatments";

export function generateStaticParams() {
  return treatments.map((treatment) => ({ slug: treatment.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const treatment = getTreatment(slug);
  if (!treatment) return { title: "Tedavi" };
  return {
    title: treatment.name.tr,
    description: treatment.summary.tr,
  };
}

function TreatmentFallback() {
  return <main className="min-h-[100svh] bg-paper" />;
}

export default function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<TreatmentFallback />}>
      <TreatmentContent params={params} />
    </Suspense>
  );
}

async function TreatmentContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const treatment = getTreatment(slug);
  if (!treatment) notFound();
  return <TreatmentView id={treatment.id} />;
}
