import Link from "next/link";
import { Brand } from "./Brand";
import { CATEGORIES } from "@/lib/products";
import {
  IconInstagram,
  IconFacebook,
  IconYoutube,
  IconDiscord,
  IconUsers,
  IconFlame,
  IconMap,
  IconSparkle,
} from "./Icons";

const VALUES = [
  { icon: IconUsers, title: "Přátelství", note: "na prvním místě" },
  { icon: IconFlame, title: "Pivo & oheň", note: "poctivě zasloužené" },
  { icon: IconMap, title: "Příběhy", note: "co spojují" },
  { icon: IconSparkle, title: "Zážitky", note: "na které se nezapomíná" },
];

const SOCIALS = [
  { icon: IconInstagram, label: "Instagram", href: "https://instagram.com" },
  { icon: IconFacebook, label: "Facebook", href: "https://facebook.com" },
  { icon: IconYoutube, label: "YouTube", href: "https://youtube.com" },
  { icon: IconDiscord, label: "Discord", href: "https://discord.com" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-bg-elev">
      {/* values strip */}
      <div className="border-b border-line">
        <div className="shell grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
          {VALUES.map(({ icon: Icon, title, note }) => (
            <div key={title} className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line-gold text-gold">
                <Icon className="h-5 w-5" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-display text-[13px] uppercase tracking-wide2 text-ink">
                  {title}
                </span>
                <span className="text-[12px] text-muted">{note}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="shell grid grid-cols-2 gap-10 py-14 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <Brand size={48} />
          <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-muted">
            Kolekce inspirovaná cestami, přátelstvím a příběhy, které se nezapomínají.
          </p>
          <div className="mt-5 flex gap-2">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-md border border-line text-muted transition-colors hover:border-line-gold hover:text-gold"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-[12px] uppercase tracking-wide2 text-gold">Kolekce</h4>
          <ul className="mt-4 space-y-2.5 text-[13.5px]">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link href={`/obchod?kategorie=${c.id}`} className="link-underline">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-[12px] uppercase tracking-wide2 text-gold">Informace</h4>
          <ul className="mt-4 space-y-2.5 text-[13.5px]">
            <li><Link href="/pribeh" className="link-underline">Náš příběh</Link></li>
            <li><Link href="/obchod" className="link-underline">Doprava a platba</Link></li>
            <li><Link href="/obchod" className="link-underline">Vrácení zboží</Link></li>
            <li><Link href="/obchod" className="link-underline">Tabulka velikostí</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-[12px] uppercase tracking-wide2 text-gold">Kontakt</h4>
          <ul className="mt-4 space-y-2.5 text-[13.5px] text-muted">
            <li>ahoj@kcdtrip.cz</li>
            <li>www.kcdtrip.cz</li>
            <li className="pt-1 text-[12px] text-faint">#kcdtrip</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-[12px] text-faint">
            © {new Date().getFullYear()} KCD TRIP · Všechna práva vyhrazena
          </p>
          <p className="font-display text-[11px] uppercase tracking-heraldic text-gold">
            ✦ Audentes fortuna iuvat ✦
          </p>
        </div>
      </div>
    </footer>
  );
}
