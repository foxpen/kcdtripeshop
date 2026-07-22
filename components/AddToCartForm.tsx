"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { useCart } from "./CartProvider";
import { IconMinus, IconPlus, IconBag, IconCheck } from "./Icons";

export function AddToCartForm({ product }: { product: Product }) {
  const { add } = useCart();
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes?.[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(product, { color, size, qty });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* colors */}
      <fieldset>
        <legend className="mb-2 flex items-center justify-between text-[13px]">
          <span className="font-medium text-ink">Barva</span>
          <span className="text-muted">{color}</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              aria-pressed={color === c}
              className={`h-10 rounded-md border px-4 text-[13px] transition-colors ${
                color === c
                  ? "border-gold bg-[rgba(198,161,91,0.1)] text-ink"
                  : "border-line text-muted hover:border-line-gold hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </fieldset>

      {/* sizes */}
      {product.sizes && (
        <fieldset>
          <legend className="mb-2 flex items-center justify-between text-[13px]">
            <span className="font-medium text-ink">Velikost</span>
            <Link href="/obchod" className="text-[12px] text-gold hover:underline">
              Tabulka velikostí
            </Link>
          </legend>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                aria-pressed={size === s}
                className={`grid h-11 min-w-[3rem] place-items-center rounded-md border px-3 text-[13px] font-medium transition-colors ${
                  size === s
                    ? "border-gold bg-[rgba(198,161,91,0.1)] text-ink"
                    : "border-line text-muted hover:border-line-gold hover:text-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {/* qty + add */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex h-12 items-center rounded-md border border-line">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid h-full w-12 place-items-center text-muted transition-colors hover:text-ink"
            aria-label="Ubrat kus"
          >
            <IconMinus className="h-4 w-4" />
          </button>
          <span className="grid w-10 place-items-center text-[15px] font-semibold text-ink" aria-live="polite">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            className="grid h-full w-12 place-items-center text-muted transition-colors hover:text-ink"
            aria-label="Přidat kus"
          >
            <IconPlus className="h-4 w-4" />
          </button>
        </div>

        <button type="button" onClick={handleAdd} className="btn-gold btn-lg flex-1">
          {added ? (
            <>
              <IconCheck className="h-5 w-5" /> Přidáno do košíku
            </>
          ) : (
            <>
              <IconBag className="h-5 w-5" /> Přidat do košíku
            </>
          )}
        </button>
      </div>

      <Link href="/kosik" className="btn-outline btn-md">
        Přejít do košíku
      </Link>
    </div>
  );
}
