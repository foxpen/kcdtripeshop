import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, PRODUCTS, bestsellers } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductMedia } from "@/components/ProductMedia";
import { SectionHeading } from "@/components/SectionHeading";
import { NewsletterForm } from "@/components/NewsletterForm";
import {
  IconShield,
  IconSparkle,
  IconLeaf,
  IconMap,
  IconUsers,
  IconMountain,
  IconArrowRight,
  IconStar,
  IconTruck,
} from "@/components/Icons";

const CATEGORY_ICON = {
  obleceni: IconMap,
  deti: IconLeaf,
  mazlicci: IconUsers,
  doplnky: IconMountain,
} as const;

const TRUST = [
  { icon: IconSparkle, label: "Prémiové materiály" },
  { icon: IconShield, label: "Výšivka premium" },
  { icon: IconStar, label: "Limitované kolekce" },
  { icon: IconLeaf, label: "Vyrobeno s respektem" },
];

export default function HomePage() {
  const featured = bestsellers().slice(0, 4);
  const fresh = PRODUCTS.filter((p) => p.badge === "Novinka" || p.badge === "Limitovaná edice").slice(0, 4);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 bg-hero-vignette" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gold-line opacity-40" />
        <div className="shell relative grid gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
          <div className="animate-fade-up">
            <span className="eyebrow">Kolekce oblečení pro dobrodruhy</span>
            <h1 className="mt-5 font-display text-[40px] font-bold leading-[1.05] text-ink sm:text-[54px] lg:text-[60px]">
              Vyraž.<br />
              Poznávej.<br />
              <span className="text-gold">Žij příběh.</span>
            </h1>
            <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-muted">
              Není to jen výlet. Je to příběh. Prémiová kolekce inspirovaná cestami,
              přátelstvím a ohni, u kterého vznikají ty nejlepší historky.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/obchod" className="btn-gold btn-lg">
                Prohlédnout kolekci <IconArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/pribeh" className="btn-outline btn-lg">
                Náš příběh
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="flex items-center gap-2 text-[13px] text-muted">
                <IconTruck className="h-[18px] w-[18px] text-gold" /> Doprava zdarma nad 1 500 Kč
              </span>
              <span className="flex items-center gap-2 text-[13px] text-muted">
                <IconShield className="h-[18px] w-[18px] text-gold" /> 30 dní na vrácení
              </span>
              <span className="flex items-center gap-2 text-[13px] text-muted">
                <IconStar className="h-[18px] w-[18px] text-gold" /> 4.9 / 5 od družiny
              </span>
            </div>
          </div>

          {/* crest showcase */}
          <div className="relative animate-fade-up [animation-delay:120ms]">
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(198,161,91,0.18),transparent_62%)]" />
              <div className="absolute inset-6 rounded-2xl border border-line-gold/50" />
              <div className="absolute inset-6 rounded-2xl [box-shadow:inset_0_0_80px_rgba(0,0,0,0.7)]" />
              <div className="absolute inset-0 grid place-items-center">
                <Image
                  src="/logo.png"
                  alt="Znak KCD TRIP"
                  width={420}
                  height={420}
                  priority
                  className="w-[74%] max-w-[340px] drop-shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
                />
              </div>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-[10px] uppercase tracking-heraldic text-gold">
                ✦ Audentes fortuna iuvat ✦
              </span>
            </div>
          </div>
        </div>

        {/* trust strip */}
        <div className="border-t border-line bg-bg-elev/60">
          <div className="shell grid grid-cols-2 gap-4 py-5 md:grid-cols-4">
            {TRUST.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center justify-center gap-2.5 text-center">
                <Icon className="h-[18px] w-[18px] shrink-0 text-gold" />
                <span className="text-[12.5px] font-medium uppercase tracking-wide2 text-muted">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────── */}
      <section className="shell py-16 lg:py-20">
        <SectionHeading
          title="Vyber si svou výbavu"
          intro="Od trička k ohni až po výbavu pro čtyřnohé členy družiny. Každý kus nese stejný znak."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => {
            const Icon = CATEGORY_ICON[c.id];
            const count = PRODUCTS.filter((p) => p.category === c.id).length;
            return (
              <Link
                key={c.id}
                href={`/obchod?kategorie=${c.id}`}
                className="group relative overflow-hidden rounded-xl border border-line bg-surface p-6 shadow-card transition-[transform,border-color,box-shadow] duration-300 ease-out-soft hover:-translate-y-1 hover:border-line-gold hover:shadow-card-hover"
              >
                <Icon className="absolute -right-4 -top-4 h-28 w-28 text-gold opacity-[0.06] transition-transform duration-500 group-hover:scale-110" />
                <span className="grid h-12 w-12 place-items-center rounded-lg border border-line-gold text-gold">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-[19px] text-ink group-hover:text-gold-bright">
                  {c.name}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{c.tagline}</p>
                <span className="mt-5 flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-wide2 text-gold">
                  {count} produktů <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── BESTSELLERS ──────────────────────────────────── */}
      <section className="border-y border-line bg-bg-elev/40">
        <div className="shell py-16 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading title="Co nosí celá družina" />
            <Link href="/obchod" className="btn-ghost btn-sm">
              Zobrazit vše <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── LOOKBOOK / STORY ─────────────────────────────── */}
      <section className="shell py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative overflow-hidden rounded-2xl border border-line shadow-card">
            <Image
              src="/story/parta-trosky.jpg"
              alt="Parta v mapových tričkách KCD TRIP u hradu Trosky"
              width={1170}
              height={1560}
              className="h-full max-h-[560px] w-full object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
          </div>
          <div>
            <SectionHeading
              eyebrow="Družina na tahu"
              title="Kolekce pro ty, kdo míří dál"
              intro="Přátelství. Příběhy. Cesta, na kterou se nezapomíná. Každé tričko nese ručně kreslenou mapu výpravy. A každá výprava svůj vlastní příběh."
            />
            <ul className="mt-7 space-y-4">
              {[
                { t: "Vyšívané, ne jen potištěné", d: "Plastická výšivka znaku, která vydrží roky výprav." },
                { t: "Materiály, co něco vydrží", d: "Česaná bavlna a husté 320g směsi na chladná rána." },
                { t: "Limitované kolekce", d: "Když je vyprodáno, je vyprodáno. Příběh se neopakuje." },
              ].map((item) => (
                <li key={item.t} className="flex gap-3.5">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line-gold text-gold">
                    <IconSparkle className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block font-display text-[15px] text-ink">{item.t}</span>
                    <span className="block text-[13.5px] leading-relaxed text-muted">{item.d}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/obchod?kategorie=obleceni" className="btn-gold btn-md mt-8">
              Prohlédnout oblečení <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ─────────────────────────────────── */}
      {fresh.length > 0 && (
        <section className="border-t border-line bg-bg-elev/40">
          <div className="shell py-16 lg:py-20">
            <SectionHeading title="Novinky a limitované kusy" align="center" />
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {fresh.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── QUOTE BAND ───────────────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute inset-0 bg-hero-vignette" />
        <div className="shell relative text-center">
          <ProductMedia
            category="obleceni"
            name="KCD TRIP"
            className="mx-auto mb-8 grid h-20 w-20 place-items-center rounded-full"
            crestSize={64}
          />
          <p className="mx-auto max-w-2xl text-balance font-display text-[24px] leading-snug text-ink sm:text-[30px]">
            „Nejde o cíl. Jde o družinu, se kterou tam dojdeš.&#34;
          </p>
          <p className="mt-5 font-display text-[11px] uppercase tracking-heraldic text-gold">
            ✦ Žij příběhem. Každý den. ✦
          </p>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────── */}
      <section className="shell pb-20">
        <div className="relative overflow-hidden rounded-2xl border border-line-gold bg-surface p-8 shadow-card sm:p-12">
          <div className="pointer-events-none absolute -right-10 -top-10 opacity-[0.05]">
            <IconMountain className="h-56 w-56 text-gold" />
          </div>
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow">Přidej se k družině</span>
              <h2 className="mt-3 font-display text-[26px] leading-tight text-ink sm:text-[30px]">
                Buď u toho, když vyrazíme dál
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
                Nové kolekce, příběhy z cest a exkluzivní nabídky rovnou do schránky.
                A 10% na první nákup jako pozdrav u ohně.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
