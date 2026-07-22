"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/lib/products";

export type CartLine = {
  slug: string;
  name: string;
  price: number;
  qty: number;
  color?: string;
  size?: string;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (product: Product, opts?: { color?: string; size?: string; qty?: number }) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  keyOf: (line: Pick<CartLine, "slug" | "color" | "size">) => string;
  lastAdded: string | null;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "kcd-trip-cart:v1";

const lineKey = (line: Pick<CartLine, "slug" | "color" | "size">) =>
  [line.slug, line.color ?? "", line.size ?? ""].join("|");

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, hydrated]);

  const add: CartContextValue["add"] = useCallback((product, opts) => {
    const color = opts?.color;
    const size = opts?.size;
    const qty = opts?.qty ?? 1;
    const key = lineKey({ slug: product.slug, color, size });
    setLines((prev) => {
      const existing = prev.find((l) => lineKey(l) === key);
      if (existing) {
        return prev.map((l) =>
          lineKey(l) === key ? { ...l, qty: Math.min(l.qty + qty, 99) } : l,
        );
      }
      return [
        ...prev,
        { slug: product.slug, name: product.name, price: product.price, qty, color, size },
      ];
    });
    setLastAdded(key);
    window.setTimeout(() => setLastAdded(null), 1600);
  }, []);

  const remove = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => lineKey(l) !== key));
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      prev
        .map((l) => (lineKey(l) === key ? { ...l, qty: Math.max(0, Math.min(qty, 99)) } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const { count, subtotal } = useMemo(() => {
    return lines.reduce(
      (acc, l) => {
        acc.count += l.qty;
        acc.subtotal += l.qty * l.price;
        return acc;
      },
      { count: 0, subtotal: 0 },
    );
  }, [lines]);

  const value: CartContextValue = {
    lines,
    count,
    subtotal,
    add,
    remove,
    setQty,
    clear,
    keyOf: lineKey,
    lastAdded,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
