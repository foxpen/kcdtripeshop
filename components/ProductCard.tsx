import Link from "next/link";
import type { Product } from "@/lib/products";
import { categoryName } from "@/lib/products";
import { formatCZK } from "@/lib/format";
import { ProductMedia } from "./ProductMedia";
import { IconStar } from "./Icons";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/produkt/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-card
        transition-[transform,border-color,box-shadow] duration-300 ease-out-soft
        hover:-translate-y-1 hover:border-line-gold hover:shadow-card-hover
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      <div className="relative aspect-[4/5]">
        <ProductMedia category={product.category} name={product.name} className="h-full w-full" />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full border border-line-gold bg-bg/70 px-2.5 py-1 font-display text-[10px] uppercase tracking-wide2 text-gold backdrop-blur-sm">
            {product.badge}
          </span>
        )}
        {product.compareAt && (
          <span className="absolute right-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide2 text-[#12100c]">
            Akce
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[11px] uppercase tracking-wide2 text-faint">
          {categoryName(product.category)}
        </p>
        <h3 className="font-display text-[15px] leading-snug text-ink transition-colors group-hover:text-gold-bright">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-muted">{product.short}</p>

        <div className="mt-1 flex items-center gap-1.5 text-[12px] text-muted">
          <IconStar className="h-3.5 w-3.5 text-gold" />
          <span className="font-medium text-ink">{product.rating.toFixed(1)}</span>
          <span className="text-faint">({product.reviews})</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg text-ink">{formatCZK(product.price)}</span>
            {product.compareAt && (
              <span className="text-[13px] text-faint line-through">
                {formatCZK(product.compareAt)}
              </span>
            )}
          </div>
          <span className="font-display text-[11px] uppercase tracking-wide2 text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Detail →
          </span>
        </div>
      </div>
    </Link>
  );
}
