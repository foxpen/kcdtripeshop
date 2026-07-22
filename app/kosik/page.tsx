"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { ProductMedia } from "@/components/ProductMedia";
import { getProduct } from "@/lib/products";
import { formatCZK } from "@/lib/format";
import {
  IconMinus,
  IconPlus,
  IconTrash,
  IconBag,
  IconArrowRight,
  IconTruck,
  IconShield,
  IconCheck,
} from "@/components/Icons";

const FREE_SHIPPING = 1500;
const SHIPPING = 99;

export default function CartPage() {
  const { lines, subtotal, setQty, remove, keyOf, count } = useCart();

  if (lines.length === 0) {
    return (
      <div className="shell flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full border border-line-gold text-gold">
          <IconBag className="h-9 w-9" />
        </span>
        <h1 className="mt-6 font-display text-[26px] text-ink">Košík je zatím prázdný</h1>
        <p className="mt-2 max-w-sm text-[15px] text-muted">
          Každá výprava někde začíná. Vyber si výbavu a vyraž.
        </p>
        <Link href="/obchod" className="btn-gold btn-lg mt-8">
          Prohlédnout kolekci <IconArrowRight className="h-5 w-5" />
        </Link>
      </div>
    );
  }

  const remaining = Math.max(0, FREE_SHIPPING - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100);
  const shipping = subtotal >= FREE_SHIPPING ? 0 : SHIPPING;
  const total = subtotal + shipping;

  return (
    <div className="shell py-12 lg:py-16">
      <h1 className="font-display text-[30px] leading-tight text-ink sm:text-[36px]">
        Košík <span className="text-muted">({count})</span>
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        {/* lines */}
        <div>
          {/* free shipping progress */}
          <div className="mb-6 rounded-xl border border-line bg-surface p-5">
            <div className="flex items-center gap-2 text-[13.5px]">
              <IconTruck className="h-[18px] w-[18px] text-gold" />
              {remaining > 0 ? (
                <span className="text-muted">
                  Do dopravy zdarma ti chybí{" "}
                  <span className="font-semibold text-ink">{formatCZK(remaining)}</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 font-medium text-success">
                  <IconCheck className="h-4 w-4" /> Máš dopravu zdarma!
                </span>
              )}
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-bg-elev">
              <div
                className="h-full rounded-full bg-gold transition-[width] duration-500 ease-out-soft"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
            {lines.map((line) => {
              const key = keyOf(line);
              const product = getProduct(line.slug);
              return (
                <li key={key} className="flex gap-4 p-4 sm:p-5">
                  <Link
                    href={`/produkt/${line.slug}`}
                    className="group relative h-24 w-20 shrink-0 overflow-hidden rounded-lg border border-line"
                  >
                    {product && (
                      <ProductMedia
                        category={product.category}
                        name={line.name}
                        className="h-full w-full"
                        crestSize={48}
                      />
                    )}
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={`/produkt/${line.slug}`}
                          className="font-display text-[15px] text-ink hover:text-gold-bright"
                        >
                          {line.name}
                        </Link>
                        <p className="mt-1 text-[12.5px] text-muted">
                          {[line.color, line.size].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                      <button
                        onClick={() => remove(key)}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-faint transition-colors hover:bg-[rgba(192,80,62,0.1)] hover:text-danger"
                        aria-label={`Odebrat ${line.name}`}
                      >
                        <IconTrash className="h-[18px] w-[18px]" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex h-9 items-center rounded-md border border-line">
                        <button
                          onClick={() => setQty(key, line.qty - 1)}
                          className="grid h-full w-9 place-items-center text-muted transition-colors hover:text-ink"
                          aria-label="Ubrat kus"
                        >
                          <IconMinus className="h-4 w-4" />
                        </button>
                        <span className="grid w-8 place-items-center text-[14px] font-semibold text-ink">
                          {line.qty}
                        </span>
                        <button
                          onClick={() => setQty(key, line.qty + 1)}
                          className="grid h-full w-9 place-items-center text-muted transition-colors hover:text-ink"
                          aria-label="Přidat kus"
                        >
                          <IconPlus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="font-display text-[16px] text-ink">
                        {formatCZK(line.price * line.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <Link href="/obchod" className="mt-5 inline-flex items-center gap-2 text-[14px] text-gold hover:underline">
            ← Pokračovat v nákupu
          </Link>
        </div>

        {/* summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-line bg-surface p-6">
            <h2 className="font-display text-[16px] uppercase tracking-wide2 text-ink">Souhrn</h2>
            <dl className="mt-5 space-y-3 text-[14px]">
              <div className="flex justify-between">
                <dt className="text-muted">Mezisoučet</dt>
                <dd className="text-ink">{formatCZK(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Doprava</dt>
                <dd className={shipping === 0 ? "text-success" : "text-ink"}>
                  {shipping === 0 ? "Zdarma" : formatCZK(shipping)}
                </dd>
              </div>
              <div className="my-3 hairline" />
              <div className="flex items-baseline justify-between">
                <dt className="font-display text-[15px] text-ink">Celkem</dt>
                <dd className="font-display text-[22px] text-ink">{formatCZK(total)}</dd>
              </div>
              <p className="text-[11.5px] text-faint">Včetně DPH</p>
            </dl>

            <Link href="/pokladna" className="btn-gold btn-lg mt-6 w-full">
              Přejít k pokladně <IconArrowRight className="h-5 w-5" />
            </Link>

            <div className="mt-5 flex items-center justify-center gap-2 text-[12px] text-muted">
              <IconShield className="h-4 w-4 text-gold" /> Bezpečná platba · SSL
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
