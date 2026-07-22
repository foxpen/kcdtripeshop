"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatCZK } from "@/lib/format";
import { IconCheck, IconArrowRight, IconShield, IconBag } from "@/components/Icons";

const FREE_SHIPPING = 1500;

const DELIVERY = [
  { id: "zasilkovna", name: "Zásilkovna", note: "výdejní místo, 1-2 dny", price: 79 },
  { id: "dpd", name: "DPD kurýr", note: "na adresu, 1-2 dny", price: 99 },
  { id: "ppl", name: "PPL ParcelShop", note: "výdejní místo, 1-2 dny", price: 69 },
];

const PAYMENT = [
  { id: "karta", name: "Platební kartou", note: "Visa, Mastercard" },
  { id: "prevod", name: "Bankovní převod", note: "QR platba" },
  { id: "dobirka", name: "Dobírka", note: "+30 Kč" },
];

type Errors = Record<string, string>;

export default function CheckoutPage() {
  const { lines, subtotal, clear, count } = useCart();
  const [delivery, setDelivery] = useState(DELIVERY[0].id);
  const [payment, setPayment] = useState(PAYMENT[0].id);
  const [errors, setErrors] = useState<Errors>({});
  const [placed, setPlaced] = useState(false);

  const deliveryPrice = subtotal >= FREE_SHIPPING ? 0 : DELIVERY.find((d) => d.id === delivery)!.price;
  const codFee = payment === "dobirka" ? 30 : 0;
  const total = subtotal + deliveryPrice + codFee;

  const validate = (form: HTMLFormElement): Errors => {
    const data = new FormData(form);
    const next: Errors = {};
    const req = ["jmeno", "prijmeni", "email", "telefon", "ulice", "mesto", "psc"];
    for (const f of req) {
      if (!String(data.get(f) ?? "").trim()) next[f] = "Toto pole je povinné.";
    }
    const email = String(data.get("email") ?? "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Neplatný e-mail.";
    const psc = String(data.get("psc") ?? "").replace(/\s/g, "");
    if (psc && !/^\d{5}$/.test(psc)) next.psc = "PSČ musí mít 5 číslic.";
    return next;
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate(e.currentTarget);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = e.currentTarget.querySelector<HTMLInputElement>(`[name="${Object.keys(next)[0]}"]`);
      first?.focus();
      return;
    }
    clear();
    setPlaced(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (placed) {
    return (
      <div className="shell flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-gold text-[#12100c]">
          <IconCheck className="h-10 w-10" />
        </span>
        <p className="mt-6 eyebrow">Objednávka přijata</p>
        <h1 className="mt-3 font-display text-[30px] text-ink sm:text-[36px]">
          Vítej v družině!
        </h1>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
          Potvrzení jsme poslali na tvůj e-mail. Balíme tvou výbavu a brzy vyrazí na cestu.
          Ať tě provází štěstí. Audentes fortuna iuvat.
        </p>
        <p className="mt-6 font-display text-[13px] text-gold">
          Číslo objednávky: KCD-{Math.floor(100000 + Math.random() * 899999)}
        </p>
        <Link href="/obchod" className="btn-gold btn-lg mt-8">
          Pokračovat v nákupu <IconArrowRight className="h-5 w-5" />
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="shell flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full border border-line-gold text-gold">
          <IconBag className="h-9 w-9" />
        </span>
        <h1 className="mt-6 font-display text-[26px] text-ink">Košík je prázdný</h1>
        <p className="mt-2 text-[15px] text-muted">Přidej si výbavu a pak zamiř k pokladně.</p>
        <Link href="/obchod" className="btn-gold btn-lg mt-8">
          Do obchodu <IconArrowRight className="h-5 w-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="shell py-12 lg:py-16">
      <nav className="flex items-center gap-1.5 text-[12.5px] text-faint">
        <Link href="/kosik" className="hover:text-ink">Košík</Link>
        <span>/</span>
        <span className="text-muted">Pokladna</span>
      </nav>
      <h1 className="mt-4 font-display text-[30px] leading-tight text-ink sm:text-[36px]">Pokladna</h1>

      <form onSubmit={submit} noValidate className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-8">
          <Fieldset title="Kontaktní údaje" step={1}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="jmeno" label="Jméno" autoComplete="given-name" errors={errors} />
              <Field name="prijmeni" label="Příjmení" autoComplete="family-name" errors={errors} />
              <Field name="email" label="E-mail" type="email" autoComplete="email" errors={errors} />
              <Field name="telefon" label="Telefon" type="tel" autoComplete="tel" errors={errors} />
            </div>
          </Fieldset>

          <Fieldset title="Doručovací adresa" step={2}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field name="ulice" label="Ulice a číslo popisné" autoComplete="street-address" errors={errors} />
              </div>
              <Field name="mesto" label="Město" autoComplete="address-level2" errors={errors} />
              <Field name="psc" label="PSČ" autoComplete="postal-code" inputMode="numeric" errors={errors} />
            </div>
          </Fieldset>

          <Fieldset title="Způsob dopravy" step={3}>
            <div className="space-y-3">
              {DELIVERY.map((d) => (
                <RadioRow
                  key={d.id}
                  name="delivery"
                  checked={delivery === d.id}
                  onChange={() => setDelivery(d.id)}
                  title={d.name}
                  note={d.note}
                  price={subtotal >= FREE_SHIPPING ? "Zdarma" : formatCZK(d.price)}
                />
              ))}
            </div>
          </Fieldset>

          <Fieldset title="Platba" step={4}>
            <div className="space-y-3">
              {PAYMENT.map((p) => (
                <RadioRow
                  key={p.id}
                  name="payment"
                  checked={payment === p.id}
                  onChange={() => setPayment(p.id)}
                  title={p.name}
                  note={p.note}
                />
              ))}
            </div>
          </Fieldset>
        </div>

        {/* summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-line bg-surface p-6">
            <h2 className="font-display text-[16px] uppercase tracking-wide2 text-ink">
              Objednávka <span className="text-muted">({count})</span>
            </h2>
            <ul className="mt-5 space-y-3">
              {lines.map((l, i) => (
                <li key={i} className="flex justify-between gap-3 text-[13.5px]">
                  <span className="min-w-0 text-muted">
                    <span className="text-ink">{l.qty}×</span> {l.name}
                    {(l.color || l.size) && (
                      <span className="block text-[11.5px] text-faint">
                        {[l.color, l.size].filter(Boolean).join(" · ")}
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 text-ink">{formatCZK(l.price * l.qty)}</span>
                </li>
              ))}
            </ul>

            <div className="my-4 hairline" />
            <dl className="space-y-2.5 text-[14px]">
              <div className="flex justify-between">
                <dt className="text-muted">Mezisoučet</dt>
                <dd className="text-ink">{formatCZK(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Doprava</dt>
                <dd className={deliveryPrice === 0 ? "text-success" : "text-ink"}>
                  {deliveryPrice === 0 ? "Zdarma" : formatCZK(deliveryPrice)}
                </dd>
              </div>
              {codFee > 0 && (
                <div className="flex justify-between">
                  <dt className="text-muted">Dobírka</dt>
                  <dd className="text-ink">{formatCZK(codFee)}</dd>
                </div>
              )}
            </dl>
            <div className="my-4 hairline" />
            <div className="flex items-baseline justify-between">
              <span className="font-display text-[15px] text-ink">Celkem</span>
              <span className="font-display text-[24px] text-ink">{formatCZK(total)}</span>
            </div>

            <button type="submit" className="btn-gold btn-lg mt-6 w-full">
              Závazně objednat <IconArrowRight className="h-5 w-5" />
            </button>
            <p className="mt-4 flex items-center justify-center gap-2 text-center text-[12px] text-muted">
              <IconShield className="h-4 w-4 text-gold" /> Šifrovaná a bezpečná platba
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Fieldset({
  title,
  step,
  children,
}: {
  title: string;
  step: number;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="rounded-xl border border-line bg-surface p-6">
      <legend className="flex items-center gap-3 px-1">
        <span className="grid h-7 w-7 place-items-center rounded-full border border-line-gold font-display text-[12px] text-gold">
          {step}
        </span>
        <span className="font-display text-[15px] uppercase tracking-wide2 text-ink">{title}</span>
      </legend>
      <div className="mt-5">{children}</div>
    </fieldset>
  );
}

function Field({
  name,
  label,
  type = "text",
  autoComplete,
  inputMode,
  errors,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "email" | "tel" | "text";
  errors: Errors;
}) {
  const err = errors[name];
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-[13px] font-medium text-ink">
        {label} <span className="text-gold">*</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={!!err}
        aria-describedby={err ? `${name}-err` : undefined}
        className={`input ${err ? "border-danger focus:border-danger focus:ring-danger" : ""}`}
      />
      {err && (
        <p id={`${name}-err`} role="alert" className="mt-1.5 text-[12.5px] text-danger">
          {err}
        </p>
      )}
    </div>
  );
}

function RadioRow({
  name,
  checked,
  onChange,
  title,
  note,
  price,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  note: string;
  price?: string;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3.5 rounded-lg border px-4 py-3.5 transition-colors ${
        checked ? "border-gold bg-[rgba(198,161,91,0.08)]" : "border-line hover:border-line-gold"
      }`}
    >
      <span
        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-colors ${
          checked ? "border-gold" : "border-line"
        }`}
      >
        {checked && <span className="h-2.5 w-2.5 rounded-full bg-gold" />}
      </span>
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      <span className="flex flex-1 items-center justify-between gap-3">
        <span>
          <span className="block text-[14px] font-medium text-ink">{title}</span>
          <span className="block text-[12px] text-muted">{note}</span>
        </span>
        {price && <span className="font-display text-[14px] text-ink">{price}</span>}
      </span>
    </label>
  );
}
