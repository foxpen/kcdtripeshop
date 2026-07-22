"use client";

import { useState } from "react";
import { IconCheck, IconArrowRight } from "./Icons";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Zadej platnou e-mailovou adresu.");
      return;
    }
    setError(null);
    setDone(true);
  };

  if (done) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-line-gold bg-[rgba(198,161,91,0.08)] px-5 py-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-[#12100c]">
          <IconCheck className="h-5 w-5" />
        </span>
        <p className="text-[14px] text-ink">
          Vítej v družině! Potvrzení jsme poslali na <span className="text-gold">{email}</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            E-mailová adresa
          </label>
          <input
            id="newsletter-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="tvuj@email.cz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? "newsletter-error" : undefined}
            className="input"
          />
        </div>
        <button type="submit" className="btn-gold btn-md shrink-0">
          Přidat se <IconArrowRight className="h-4 w-4" />
        </button>
      </div>
      {error && (
        <p id="newsletter-error" role="alert" className="mt-2 text-[13px] text-danger">
          {error}
        </p>
      )}
      <p className="mt-2 text-[12px] text-faint">
        Novinky z družiny, žádný spam. Odhlásit se můžeš kdykoli.
      </p>
    </form>
  );
}
