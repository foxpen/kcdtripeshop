import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct, getRelated, categoryName } from "@/lib/products";
import { formatCZK } from "@/lib/format";
import { ProductMedia } from "@/components/ProductMedia";
import { ProductCard } from "@/components/ProductCard";
import { AddToCartForm } from "@/components/AddToCartForm";
import { SectionHeading } from "@/components/SectionHeading";
import {
  IconStar,
  IconCheck,
  IconTruck,
  IconShield,
  IconArrowRight,
} from "@/components/Icons";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct(params.slug);
  if (!product) return { title: "Produkt nenalezen" };
  return {
    title: product.name,
    description: product.short,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = getRelated(product);

  return (
    <div className="shell py-8 lg:py-12">
      {/* breadcrumb */}
      <nav aria-label="Drobečková navigace" className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-faint">
        <Link href="/" className="hover:text-ink">Domů</Link>
        <span>/</span>
        <Link href="/obchod" className="hover:text-ink">Obchod</Link>
        <span>/</span>
        <Link href={`/obchod?kategorie=${product.category}`} className="hover:text-ink">
          {categoryName(product.category)}
        </Link>
        <span>/</span>
        <span className="text-muted">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* media */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative">
            <ProductMedia
              category={product.category}
              name={product.name}
              className="group aspect-[4/5] w-full rounded-2xl border border-line shadow-card"
              crestSize={220}
            />
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full border border-line-gold bg-bg/70 px-3 py-1 font-display text-[11px] uppercase tracking-wide2 text-gold backdrop-blur-sm">
                {product.badge}
              </span>
            )}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="emblem-tile relative aspect-square overflow-hidden rounded-lg border border-line"
              >
                <div className="pointer-events-none absolute inset-2 rounded-md border border-line-gold/40" />
              </div>
            ))}
          </div>
        </div>

        {/* info */}
        <div>
          <p className="text-[12px] uppercase tracking-wide2 text-gold">
            {categoryName(product.category)}
          </p>
          <h1 className="mt-2 font-display text-[30px] leading-tight text-ink sm:text-[36px]">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <span className="flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <IconStar
                  key={i}
                  className={`h-4 w-4 ${i < Math.round(product.rating) ? "text-gold" : "text-line"}`}
                />
              ))}
            </span>
            <span className="text-[13px] text-muted">
              {product.rating.toFixed(1)} · {product.reviews} hodnocení
            </span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-[30px] text-ink">{formatCZK(product.price)}</span>
            {product.compareAt && (
              <>
                <span className="text-[16px] text-faint line-through">
                  {formatCZK(product.compareAt)}
                </span>
                <span className="rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide2 text-[#12100c]">
                  Ušetříš {formatCZK(product.compareAt - product.price)}
                </span>
              </>
            )}
          </div>
          <p className="mt-1 text-[12.5px] text-success">Skladem · odesíláme do 24 hodin</p>

          <p className="mt-6 text-[15px] leading-relaxed text-muted">{product.description}</p>

          <div className="mt-8">
            <AddToCartForm product={product} />
          </div>

          {/* shipping row */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3">
              <IconTruck className="h-5 w-5 shrink-0 text-gold" />
              <span className="text-[12.5px] leading-tight text-muted">
                Doprava zdarma<br />nad 1 500 Kč
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3">
              <IconShield className="h-5 w-5 shrink-0 text-gold" />
              <span className="text-[12.5px] leading-tight text-muted">
                30 dní<br />na vrácení
              </span>
            </div>
          </div>

          {/* features */}
          <div className="mt-8 rounded-xl border border-line bg-surface p-6">
            <h2 className="font-display text-[14px] uppercase tracking-wide2 text-ink">
              Specifikace
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[14px] text-muted">
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* related */}
      {related.length > 0 && (
        <section className="mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Patří k sobě" title="Doplň svou výbavu" />
            <Link href={`/obchod?kategorie=${product.category}`} className="btn-ghost btn-sm">
              Celá kategorie <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
