export type CategoryId = "obleceni" | "deti" | "mazlicci" | "doplnky";

export type Category = {
  id: CategoryId;
  name: string;
  tagline: string;
};

export type Product = {
  slug: string;
  name: string;
  category: CategoryId;
  price: number;
  compareAt?: number;
  badge?: string;
  short: string;
  description: string;
  features: string[];
  colors: string[];
  sizes?: string[];
  rating: number;
  reviews: number;
  bestseller?: boolean;
};

export const CATEGORIES: Category[] = [
  { id: "obleceni", name: "Oblečení", tagline: "Trička, mikiny a čepice pro cestu" },
  { id: "deti", name: "Pro malé dobrodruhy", tagline: "Aby příběh pokračoval i v příští generaci" },
  { id: "mazlicci", name: "Pro psy & kočky", tagline: "Družina má i čtyřnohé členy" },
  { id: "doplnky", name: "Doplňky", tagline: "Detaily, které dělají rozdíl" },
];

export const categoryName = (id: CategoryId) =>
  CATEGORIES.find((c) => c.id === id)?.name ?? id;

const APPAREL_SIZES = ["S", "M", "L", "XL", "XXL"];

export const PRODUCTS: Product[] = [
  // ── Oblečení ──────────────────────────────────────────────
  {
    slug: "tricko-premium",
    name: "Tričko Premium",
    category: "obleceni",
    price: 699,
    badge: "Premium",
    bestseller: true,
    short: "100% česaná bavlna s výšivkou loga na hrudi.",
    description:
      "Prémiové tričko z česané bavlny, které vydrží každý výlet i jeho zasloužené oslavy u ohně. Vyšité logo KCD TRIP na hrudi, čistý střih a příjemný omak. Všude tam, kde příběhy pokračují.",
    features: ["100% česaná bavlna", "180 g/m²", "Výšivka loga na hrudi", "Unisex střih"],
    colors: ["Černá", "Písková"],
    sizes: APPAREL_SIZES,
    rating: 4.9,
    reviews: 214,
  },
  {
    slug: "tricko-mapa",
    name: "Tričko Mapa - Družina na tahu",
    category: "obleceni",
    price: 649,
    badge: "Limitovaná edice",
    bestseller: true,
    short: "Přední logo, zadní ručně kreslená mapa výpravy.",
    description:
      "Na zádech nese ručně kreslenou mapu s nápisem „Družina na tahu\". Každá cesta má svůj příběh a ten svůj si poneseš s sebou. Přední strana zdobená malým logem, měkká písková bavlna.",
    features: ["100% bavlna", "180 g/m²", "Potisk: přední logo / zadní mapa", "Unisex střih"],
    colors: ["Písková", "Černá"],
    sizes: APPAREL_SIZES,
    rating: 4.8,
    reviews: 168,
  },
  {
    slug: "mikina-premium",
    name: "Mikina Premium",
    category: "obleceni",
    price: 1299,
    compareAt: 1499,
    badge: "Bestseller",
    bestseller: true,
    short: "Teplá 320g mikina s klokaní kapsou a stahovací kapucí.",
    description:
      "Nejteplejší člen kolekce. Hustá 320g směs bavlny a polyesteru, stahovací kapuce a prostorná klokaní kapsa na zahřátí rukou u ohně. Vyšité logo na hrudi, mapa výpravy na zádech.",
    features: [
      "80% bavlna / 20% polyester",
      "320 g/m²",
      "Výšivka loga / zadní mapa",
      "Kapuce se stahováním, klokaní kapsa",
    ],
    colors: ["Černá", "Písková"],
    sizes: APPAREL_SIZES,
    rating: 5.0,
    reviews: 302,
  },
  {
    slug: "ksiltovka-premium",
    name: "Kšiltovka Premium",
    category: "obleceni",
    price: 599,
    short: "Pětipanelová kšiltovka s 3D výšivkou znaku.",
    description:
      "Klasická pětipanelová kšiltovka s plastickou 3D výšivkou znaku KCD TRIP. Nastavitelná velikost pásku, prodyšná bavlna. Stín na oči, když slunce stoupá nad hřebeny.",
    features: ["5 panelů", "3D výšivka", "Nastavitelná velikost", "100% bavlna"],
    colors: ["Černá", "Písková", "Khaki"],
    rating: 4.7,
    reviews: 96,
  },
  {
    slug: "bunda-vetrovka",
    name: "Bunda / Větrovka",
    category: "obleceni",
    price: 1199,
    badge: "Novinka",
    short: "Lehká voděodolná větrovka, kterou složíš do batohu.",
    description:
      "Když se počasí otočí, tahle lehká nylonová větrovka tě podrží. Voděodolná, skladná do vlastní kapsy a s decentní výšivkou loga. Ideální parťák do proměnlivého počasí.",
    features: ["100% nylon", "Voděodolná", "Lehká a skladná", "Výšivka loga"],
    colors: ["Černá"],
    sizes: APPAREL_SIZES,
    rating: 4.6,
    reviews: 41,
  },
  {
    slug: "ponozky",
    name: "Ponožky Družina",
    category: "obleceni",
    price: 199,
    short: "Vyšívané ponožky, které ujdou pár mil navíc.",
    description:
      "Pohodlné ponožky se špetkou elastanu pro dokonalé sezení a vyšitým detailem znaku. Balení, které potěší každého člena družiny.",
    features: ["80% bavlna / 17% polyamid / 3% elastan", "Velikosti 39-46", "Výšivka", "Zesílená pata a špička"],
    colors: ["Černá", "Písková"],
    rating: 4.8,
    reviews: 73,
  },

  // ── Pro malé dobrodruhy ───────────────────────────────────
  {
    slug: "body-detske",
    name: "Body pro nejmenší",
    category: "deti",
    price: 349,
    short: "Měkké bavlněné body s vyšitým znakem.",
    description:
      "Pro nejmladší členy družiny. Jemná bavlna šetrná k pokožce, praktické zapínání a vyšité logo KCD TRIP. Příběh začíná už v kolébce.",
    features: ["100% bavlna", "Velikosti 56-92", "Šetrné k pokožce", "Vyšité logo"],
    colors: ["Černá"],
    sizes: ["56", "62", "68", "74", "80", "86", "92"],
    rating: 4.9,
    reviews: 58,
  },
  {
    slug: "detska-mikina",
    name: "Dětská mikina s kapucí",
    category: "deti",
    price: 549,
    badge: "Oblíbené",
    short: "Zmenšená verze legendární mikiny pro malé dobrodruhy.",
    description:
      "Ta samá kvalita jako u velkých, jen v malém. Teplá kapuce, měkký vnitřek a písková barva, na které je vidět každé dobrodružství. Ať malý cestovatel nikdy neprochladne.",
    features: ["80% bavlna / 20% polyester", "Velikosti 74-98", "Kapuce", "Vyšité logo"],
    colors: ["Písková"],
    sizes: ["74", "80", "86", "92", "98"],
    rating: 4.9,
    reviews: 44,
  },
  {
    slug: "detska-cepice",
    name: "Dětská čepice",
    category: "deti",
    price: 249,
    short: "Hebká čepice, která zahřeje malou hlavu.",
    description:
      "Jemná bavlněná čepice pro nejmenší dobrodruhy s decentním znakem. Příjemná i na citlivou pokožku a akorát teplá na chladná rána.",
    features: ["100% bavlna", "Velikost 0-2 roky", "Hebký úplet", "Vyšitý detail"],
    colors: ["Písková"],
    rating: 4.7,
    reviews: 29,
  },

  // ── Pro psy & kočky ───────────────────────────────────────
  {
    slug: "bandana-psi",
    name: "Bandana / Šátek",
    category: "mazlicci",
    price: 249,
    short: "Celopotištěná bandana pro čtyřnohého parťáka.",
    description:
      "Aby ani pes nezůstal pozadu. Celoplošně potištěná bandana s motivem mapy a znaku, nastavitelná na krku. Družina má i chlupaté členy.",
    features: ["100% bavlna", "Celoplošný potisk", "Nastavitelná", "Rozměr 55 × 55 cm"],
    colors: ["Černá"],
    rating: 4.8,
    reviews: 37,
  },
  {
    slug: "obojek",
    name: "Obojek pro psy",
    category: "mazlicci",
    price: 599,
    badge: "Premium",
    short: "Odolný obojek s kovovými detaily a znakovou známkou.",
    description:
      "Robustní obojek z odolného materiálu s masivní kovovou přezkou a raženou známkou se znakem KCD TRIP. Vydrží bahno, vodu i divoké výpravy lesem.",
    features: ["Odolný materiál", "Kovové detaily", "Ražená známka", "Barva: černá / zlatá"],
    colors: ["Černá / zlatá"],
    sizes: ["S", "M", "L"],
    rating: 4.9,
    reviews: 52,
  },
  {
    slug: "mikina-pro-psy",
    name: "Mikina pro psy",
    category: "mazlicci",
    price: 649,
    short: "Teplá mikina, aby pes vydržel u ohně stejně dlouho jako ty.",
    description:
      "Když se ochladí, i pes ocení vrstvu navíc. Měkká mikina s kapucí a vyšitým logem, střih respektující pohyb. Pro parťáky, kteří nikdy nezůstávají v autě.",
    features: ["80% bavlna / 20% polyester", "Velikosti XS-XL", "Střih pro pohyb", "Vyšité logo"],
    colors: ["Černá"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.7,
    reviews: 24,
  },
  {
    slug: "obojek-pro-kocky",
    name: "Obojek pro kočky",
    category: "mazlicci",
    price: 299,
    short: "Lehký obojek s bezpečnostním zapínáním.",
    description:
      "Pro kočičí členy družiny. Lehký a odolný obojek s bezpečnostním rozepínáním, které povolí, kdyby se kočka někde zachytila. Malá známka se znakem v setu.",
    features: ["Lehký a odolný", "Bezpečnostní zapínání", "Známka se znakem", "Barva: černá / zlatá"],
    colors: ["Černá / zlatá"],
    rating: 4.8,
    reviews: 19,
  },

  // ── Doplňky ───────────────────────────────────────────────
  {
    slug: "hrnek",
    name: "Keramický hrnek",
    category: "doplnky",
    price: 299,
    bestseller: true,
    short: "Černý hrnek se zlatým znakem na ranní kávu.",
    description:
      "Ranní rituál každého dobrodruha. Kvalitní keramický hrnek s odolným potiskem znaku ve zlaté. Vhodný do myčky, aby vydržel tolik příběhů, kolik jich vypijete.",
    features: ["Keramika 330 ml", "Odolný potisk", "Vhodný do myčky", "Zlatý znak"],
    colors: ["Černá"],
    rating: 4.9,
    reviews: 141,
  },
  {
    slug: "termo-lahev",
    name: "Termo láhev",
    category: "doplnky",
    price: 699,
    badge: "Premium",
    short: "Nerezová láhev, která udrží teplotu celý den.",
    description:
      "Dvojitá nerezová stěna udrží nápoj teplý osm a studený dvanáct hodin. Odolný povrch, gravírovaný znak a objem akorát na celodenní výpravu.",
    features: ["Nerez, dvojitá stěna", "500 ml", "Udrží teplo 8 h / chlad 12 h", "Gravírovaný znak"],
    colors: ["Černá"],
    rating: 4.8,
    reviews: 88,
  },
  {
    slug: "plechacek",
    name: "Plecháček",
    category: "doplnky",
    price: 249,
    short: "Smaltovaný plecháček, který patří k ohni.",
    description:
      "Klasika, která nesmí chybět u žádného táboráku. Smaltovaný plecháček se znakem, odolný proti nárazům a stvořený pro kávu uvařenou na ohni.",
    features: ["Smaltovaný kov", "300 ml", "Odolný proti nárazům", "Znak KCD TRIP"],
    colors: ["Černá"],
    rating: 4.9,
    reviews: 67,
  },
  {
    slug: "klicenka",
    name: "Kožená klíčenka",
    category: "doplnky",
    price: 199,
    short: "Ražená klíčenka, která nese znak i mimo výpravu.",
    description:
      "Malý detail s velkým příběhem. Klíčenka s raženým znakem KCD TRIP, kterou máš u sebe každý den. Dárek, který potěší každého člena družiny.",
    features: ["Ražený znak", "Kovový kroužek", "Kompaktní rozměr", "Skvělý dárek"],
    colors: ["Černá / zlatá"],
    rating: 4.7,
    reviews: 34,
  },
  {
    slug: "batoh",
    name: "Batoh Dobrodruh",
    category: "doplnky",
    price: 1499,
    badge: "Novinka",
    short: "Prostorný batoh s vyšitým znakem na celý den v terénu.",
    description:
      "Vše, co potřebuješ na celodenní výpravu, na jednom místě. Prostorný hlavní oddíl, kapsa na notebook, odolná tkanina a vyšitý znak. Připraven na cestu, na kterou se nezapomíná.",
    features: ["Odolná tkanina", "Kapsa na notebook", "Objem 22 l", "Vyšitý znak"],
    colors: ["Černá"],
    rating: 4.8,
    reviews: 46,
  },
];

export const getProduct = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);

export const getRelated = (product: Product, limit = 4) =>
  PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, limit);

export const bestsellers = () => PRODUCTS.filter((p) => p.bestseller);
