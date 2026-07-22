# KCD TRIP — E-shop

Prémiový e-shop pro značku **KCD TRIP** — kolekce oblečení a doplňků pro dobrodruhy.
_Audentes fortuna iuvat._

Postaveno na **Next.js 14 (App Router) + TypeScript + Tailwind CSS**.

## Spuštění

```bash
npm install
npm run dev      # vývojový server na http://localhost:3000
npm run build    # produkční build
npm run start    # produkční server
```

## Design

Tmavý „heraldický" vizuál odvozený z loga: teplá černá + starožitná zlatá, nadpisy
písmem **Cinzel**, běžný text **Inter**. Design tokeny jsou v [app/globals.css](app/globals.css)
a namapované v [tailwind.config.ts](tailwind.config.ts). Zdrojový návrhový systém je uložen
v `design-system/kcd-eshop/MASTER.md`.

## Struktura

| Cesta | Popis |
|-------|-------|
| `/` | Domovská stránka — hero, kategorie, bestsellery, lookbook, novinky, newsletter |
| `/obchod` | Katalog s filtrem podle kategorie a řazením (`?kategorie=obleceni` atd.) |
| `/produkt/[slug]` | Detail produktu — varianty, specifikace, přidání do košíku, související |
| `/kosik` | Košík — počty kusů, doprava zdarma nad 1 500 Kč, souhrn |
| `/pokladna` | Pokladna — formulář s validací, doprava, platba, potvrzení |
| `/pribeh` | Náš příběh — hodnoty značky |

- **Produkty a kategorie:** [lib/products.ts](lib/products.ts) (18 produktů, 4 kategorie)
- **Košík:** [components/CartProvider.tsx](components/CartProvider.tsx) — React Context + `localStorage`
- **Produktové vizuály:** [components/ProductMedia.tsx](components/ProductMedia.tsx) — stylizované
  „emblémové" dlaždice s logem (dodané obrázky jsou marketingové koláže, ne izolované produktové fotky).

## Značková aktiva

- `public/logo.png` — znak KCD TRIP (v navigaci, patičce, hero, produktech)
- `public/lookbook/*.png` — dodané vizualizace použité v lookbook a příběhu

## Poznámka k obrázkům

Dodané ChatGPT obrázky jsou kompozitní marketingové desky (více produktů + text). Používají se jako
atmosférické lookbook sekce. Pro jednotlivé produktové karty jsou generované tmavé emblémové dlaždice,
aby byl vzhled konzistentní. Jakmile budou k dispozici čisté produktové fotky, stačí je vložit do
`ProductMedia` / `ProductCard`.
