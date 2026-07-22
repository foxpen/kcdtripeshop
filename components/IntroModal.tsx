"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconClose, IconArrowRight, IconMap } from "./Icons";

const STORAGE_KEY = "kcd-trip-intro-seen:v1";
const ROUTE = ["Malešov", "Velký rybník", "Kuttenberg", "Troskovice", "Vidlák", "Apolena", "Trosky"];

export function IntroModal() {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (!seen) {
      lastFocus.current = document.activeElement as HTMLElement;
      setOpen(true);
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
    lastFocus.current?.focus?.();
  };

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dismiss();
        return;
      }
      if (e.key === "Tab" && cardRef.current) {
        const focusable = cardRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="modal-backdrop fixed inset-0 z-[90] grid place-items-center overflow-y-auto bg-black/72 p-4 backdrop-blur-sm sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="intro-title"
        aria-describedby="intro-body"
        className="modal-card relative my-auto grid w-full max-w-4xl overflow-hidden rounded-2xl border border-line-gold bg-surface shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] md:grid-cols-[1.05fr_1fr]"
      >
        <button
          ref={closeBtnRef}
          onClick={dismiss}
          aria-label="Zavřít"
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full border border-line-gold bg-bg/60 text-ink backdrop-blur-sm transition-colors hover:bg-bg hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <IconClose className="h-5 w-5" />
        </button>

        {/* photo */}
        <div className="relative min-h-[240px] md:min-h-full">
          <Image
            src="/story/parta-trosky.jpg"
            alt="Parta v mapových tričkách KCD TRIP u hradu Trosky"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-surface" />
          <span className="absolute bottom-3 left-4 font-display text-[10px] uppercase tracking-heraldic text-sand/90 drop-shadow">
            Malešov → Trosky · Český ráj
          </span>
        </div>

        {/* story */}
        <div className="relative flex flex-col justify-center gap-4 p-7 sm:p-9">
          <span
            aria-hidden
            className="hare-mark pointer-events-none absolute -right-2 top-4 h-24 w-24 opacity-[0.07]"
          />
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="" width={40} height={40} className="w-9" />
            <span className="eyebrow">Vítej v družině</span>
          </div>

          <h2 id="intro-title" className="font-display text-[26px] leading-tight text-ink sm:text-[30px]">
            Není to jen výlet.<br />
            <span className="text-gold">Je to příběh.</span>
          </h2>

          <p id="intro-body" className="text-[14.5px] leading-relaxed text-muted">
            KCD TRIP se nezrodil v žádné kanceláři. Vznikl na cestě — parta kamarádů vyrazila
            napříč Českým rájem z Malešova až pod věže Trosek. Trasu jsme si nakreslili na záda
            triček, k tomu heslo, které nás táhlo dál: <em className="text-sand">Audentes fortuna iuvat</em>{" "}
            — štěstí přeje odvážným.
          </p>
          <p className="text-[14.5px] leading-relaxed text-muted">
            Dnes je z toho kolekce pro každého, kdo má rád přátelství, oheň a příběhy, které se
            nezapomínají. Vítej u nás.
          </p>

          {/* route */}
          <div className="flex items-start gap-2.5 rounded-lg border border-line bg-bg-elev/60 p-3">
            <IconMap className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <p className="text-[12px] leading-relaxed text-muted">
              {ROUTE.map((stop, i) => (
                <span key={stop}>
                  <span className={i === 0 || i === ROUTE.length - 1 ? "text-ink" : ""}>{stop}</span>
                  {i < ROUTE.length - 1 && <span className="text-gold-deep"> → </span>}
                </span>
              ))}
            </p>
          </div>

          <div className="mt-1 flex flex-col gap-2.5 sm:flex-row">
            <button onClick={dismiss} className="btn-gold btn-md flex-1">
              Vstoupit do obchodu <IconArrowRight className="h-4 w-4" />
            </button>
            <Link href="/pribeh" onClick={dismiss} className="btn-outline btn-md">
              Náš příběh
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
