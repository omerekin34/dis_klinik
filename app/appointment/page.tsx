import type { Metadata } from "next";
import { Suspense } from "react";
import { AppointmentFallback, AppointmentWizard } from "@/components/appointment/appointment-wizard";

export const metadata: Metadata = {
  title: "Randevu",
  description: "İmplant, zirkonyum ve gülüş tasarımı için üç adımlı randevu talebi.",
};

export default function AppointmentPage() {
  return (
    <Suspense fallback={<AppointmentFallback />}>
      <AppointmentWizard />
    </Suspense>
  );
}
