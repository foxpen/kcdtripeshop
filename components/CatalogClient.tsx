"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CATEGORIES, PRODUCTS, type CategoryId } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { IconChevronDown, IconSearch } from "./Icons";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

const SORT_LABEL: Record<SortKey, string> = {
  featured: "Doporučené",
  "price-asc": "Cena: od nejnižší",
  "price-desc": "Cena: od nejvyšší",
  rating: "Nejlépe hodnocené",
};

export function CatalogClient() {
  const params = useSearchParams();
  const initial = (params.get("kategorie") as CategoryId | null) ?? "vse";
  const [active, setActive] = useState<CategoryId | "vse">(initial);
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    let list = active === "vse" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);
    list = [...list];
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => Number(!!b.bestseller) - Number(!!a.bestseller));
    }
    return list;
  }, [active, sort]);

  const tabs: { id: CategoryId | "vse"; name: string }[] = [
    { id: "vse", name: "Vše" },
    ...CATEGORIES.map((c) => ({ id: c.id, name: c.name })),
  ];

  return (
    <div>
      {/* controls */}
      <div className="sticky top-[68px] z-30 -mx-5 border-b border-line bg-bg/85 px-5 py-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Kategorie"
          >
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={active === t.id}
                onClick={() => setActive(t.id)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                  active === t.id
                    ? "border-gold bg-gold text-[#12100c]"
                    : "border-line text-muted hover:border-line-gold hover:text-ink"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-[13px] text-muted">
              {filtered.length}{" "}
              {filtered.length === 1 ? "produkt" : filtered.length < 5 ? "produkty" : "produktů"}
            </span>
            <label className="relative flex items-center">
              <span className="sr-only">Seřadit podle</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-10 cursor-pointer appearance-none rounded-md border border-line bg-bg-elev pl-3.5 pr-9 text-[13px] text-ink transition-colors hover:border-line-gold focus:border-gold focus:outline-none"
              >
                {(Object.keys(SORT_LABEL) as SortKey[]).map((k) => (
                  <option key={k} value={k}>
                    {SORT_LABEL[k]}
                  </option>
                ))}
              </select>
              <IconChevronDown className="pointer-events-none absolute right-2.5 h-4 w-4 text-muted" />
            </label>
          </div>
        </div>
      </div>

      {/* grid */}
      {filtered.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full border border-line text-muted">
            <IconSearch className="h-6 w-6" />
          </span>
          <p className="mt-4 font-display text-lg text-ink">Zatím nic v této kategorii</p>
          <p className="mt-1 text-[14px] text-muted">Zkus jinou kategorii — družina roste každý týden.</p>
          <button onClick={() => setActive("vse")} className="btn-outline btn-sm mt-5">
            Zobrazit vše
          </button>
        </div>
      )}
    </div>
  );
}
