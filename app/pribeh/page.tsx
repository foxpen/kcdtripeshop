import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import {
  IconUsers,
  IconFlame,
  IconMap,
  IconSparkle,
  IconArrowRight,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Náš příběh",
  description:
    "Proč vznikla KCD TRIP: kolekce pro dobrodruhy, přátelství a příběhy, které se nezapomínají.",
};

const VALUES = [
  { icon: IconUsers, title: "Přátelství na prvním místě", d: "Nejlepší výbava je parta, se kterou vyrážíš." },
  { icon: IconFlame, title: "Pivo & oheň", d: "Poctivě zasloužené po dni na cestě." },
  { icon: IconMap, title: "Příběhy, co spojují", d: "Každá mapa na zádech je jedna společná historka." },
  { icon: IconSparkle, title: "Zážitky, na které se nezapomíná", d: "Vyrábíme kousky, které tam byly s tebou." },
];

export default function PribehPage() {
  return (
    <div>
      {/* hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 bg-hero-vignette" />
        <div className="shell relative py-16 text-center lg:py-24">
          <Image
            src="/logo.png"
            alt="Znak KCD TRIP"
            width={140}
            height={140}
            className="mx-auto w-[110px] drop-shadow-[0_16px_50px_rgba(0,0,0,0.6)]"
          />
          <p className="mt-6 eyebrow">Náš příběh</p>
          <h1 className="mx-auto mt-3 max-w-3xl text-balance font-display text-[34px] leading-tight text-ink sm:text-[46px]">
            Není to jen výlet. Je to příběh.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-muted">
            KCD TRIP se nezrodil ve vývojovém oddělení. Vznikl u ohně, mezi kamarády, kteří chtěli
            nosit něco, co ponese jejich společné cesty dál.
          </p>
        </div>
      </section>

      {/* narrative */}
      <section className="shell grid gap-12 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        <div className="relative overflow-hidden rounded-2xl border border-line shadow-card">
          <Image
            src="/story/parta-trosky.jpg"
            alt="Parta v mapových tričkách KCD TRIP u hradu Trosky"
            width={1170}
            height={1560}
            className="h-full max-h-[600px] w-full object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
        </div>
        <div>
          <SectionHeading
            title="Družina na tahu"
            intro="Začalo to jedním výletem, který se protáhl. Mapou nakreslenou na ubrousku a slibem, že příště zajdeme dál."
          />
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
            <p>
              Chtěli jsme oblečení, které vydrží déšť i oslavu, které si obléknete ráno na cestu a
              večer u ohně. Žádné jednorázové kousky. Prémiové materiály, poctivá výšivka a detaily,
              které dělají rozdíl.
            </p>
            <p>
              Každá kolekce je limitovaná. Když je vyprodáno, je vyprodáno. Protože ani ten stejný
              příběh se nikdy neopakuje úplně stejně.
            </p>
          </div>
          <Link href="/obchod" className="btn-gold btn-md mt-8">
            Prohlédnout kolekci <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* values */}
      <section className="border-y border-line bg-bg-elev/40">
        <div className="shell py-16 lg:py-20">
          <SectionHeading
            title="Na čem nám záleží"
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, d }) => (
              <div key={title} className="rounded-xl border border-line bg-surface p-6 text-center shadow-card">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-line-gold text-gold">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-[15px] leading-snug text-ink">{title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="shell py-20 text-center">
        <p className="mx-auto max-w-2xl text-balance font-display text-[26px] leading-snug text-ink sm:text-[32px]">
          Vyraž. Poznávej. <span className="text-gold">Žij příběh.</span>
        </p>
        <p className="mt-4 font-display text-[11px] uppercase tracking-heraldic text-gold">
          ✦ Audentes fortuna iuvat ✦
        </p>
        <Link href="/obchod" className="btn-gold btn-lg mt-8">
          Přidat se k družině <IconArrowRight className="h-5 w-5" />
        </Link>
      </section>
    </div>
  );
}
