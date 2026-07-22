import { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogClient } from "@/components/CatalogClient";

export const metadata: Metadata = {
  title: "Obchod",
  description: "Celá kolekce KCD TRIP — oblečení, doplňky a výbava pro dobrodruhy.",
};

export default function ObchodPage() {
  return (
    <div className="shell py-12 lg:py-16">
      <header className="max-w-2xl">
        <div className="flex items-center gap-3">
          <span className="h-px w-6 bg-gold-deep" />
          <span className="eyebrow">Celá kolekce</span>
        </div>
        <h1 className="mt-3 font-display text-[32px] leading-tight text-ink sm:text-[40px]">
          Obchod
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          Výbava pro cesty, přátelství a příběhy, které se nezapomínají. Vyber si podle kategorie
          nebo si projdi vše.
        </p>
      </header>

      <div className="mt-10">
        <Suspense fallback={<div className="h-40" />}>
          <CatalogClient />
        </Suspense>
      </div>
    </div>
  );
}
