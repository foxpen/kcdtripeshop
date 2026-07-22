"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Brand } from "./Brand";
import { useCart } from "./CartProvider";
import { CATEGORIES } from "@/lib/products";
import { IconBag, IconMenu, IconClose } from "./Icons";

const NAV = [
  { href: "/obchod", label: "Obchod" },
  ...CATEGORIES.map((c) => ({ href: `/obchod?kategorie=${c.id}`, label: c.name })),
  { href: "/pribeh", label: "Náš příběh" },
];

export function Navbar() {
  const { count } = useCart();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {/* announcement bar */}
      <div className="border-b border-line bg-bg-elev">
        <div className="shell flex h-9 items-center justify-center gap-2 text-center">
          <span className="font-display text-[10px] uppercase tracking-heraldic text-gold">
            Doprava zdarma nad 1 500 Kč
          </span>
          <span className="text-faint">·</span>
          <span className="text-[11px] text-muted">Není to jen výlet. Je to příběh.</span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
          scrolled
            ? "border-line bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70"
            : "border-transparent bg-bg"
        }`}
      >
        <div className="shell flex h-[68px] items-center justify-between gap-4">
          <Brand size={44} />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Hlavní navigace">
            {NAV.map((item) => {
              const active = pathname === item.href.split("?")[0] && !item.href.includes("=")
                ? pathname === item.href
                : false;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-[13.5px] font-medium transition-colors hover:text-ink ${
                    active ? "text-ink" : "text-muted"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <Link
              href="/kosik"
              className="relative grid h-11 w-11 place-items-center rounded-md text-muted transition-colors hover:bg-[rgba(255,255,255,0.04)] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label={`Košík, ${count} položek`}
            >
              <IconBag className="h-[22px] w-[22px]" />
              {count > 0 && (
                <span className="absolute right-1 top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-[#12100c]">
                  {count}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-md text-muted transition-colors hover:bg-[rgba(255,255,255,0.04)] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold lg:hidden"
              aria-label={open ? "Zavřít menu" : "Otevřít menu"}
              aria-expanded={open}
            >
              {open ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* mobile menu */}
        {open && (
          <div className="animate-fade-up border-t border-line bg-bg lg:hidden">
            <nav className="shell flex flex-col py-3" aria-label="Mobilní navigace">
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-md px-2 py-3 text-[15px] text-muted transition-colors hover:bg-[rgba(255,255,255,0.04)] hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
