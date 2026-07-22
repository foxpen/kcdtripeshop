import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps): IconProps => ({
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  ...props,
});

export const IconMenu = (p: IconProps) => (
  <svg {...base(p)}><path d="M3 6h18M3 12h18M3 18h18" /></svg>
);
export const IconClose = (p: IconProps) => (
  <svg {...base(p)}><path d="M18 6 6 18M6 6l12 12" /></svg>
);
export const IconBag = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 8h12l-.8 11.2A2 2 0 0 1 15.2 21H8.8a2 2 0 0 1-2-1.8L6 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);
export const IconSearch = (p: IconProps) => (
  <svg {...base(p)}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" /></svg>
);
export const IconStar = (p: IconProps) => (
  <svg {...base({ fill: "currentColor", stroke: "none", ...p })}>
    <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17.9 6.8 20.6l1-5.8-4.3-4.1 5.9-.9L12 3.5Z" />
  </svg>
);
export const IconCheck = (p: IconProps) => (
  <svg {...base(p)}><path d="m20 6-11 11-5-5" /></svg>
);
export const IconArrowRight = (p: IconProps) => (
  <svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const IconChevronDown = (p: IconProps) => (
  <svg {...base(p)}><path d="m6 9 6 6 6-6" /></svg>
);
export const IconMinus = (p: IconProps) => (
  <svg {...base(p)}><path d="M5 12h14" /></svg>
);
export const IconPlus = (p: IconProps) => (
  <svg {...base(p)}><path d="M12 5v14M5 12h14" /></svg>
);
export const IconTrash = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0-.7 12.1A2 2 0 0 1 15.3 21H8.7a2 2 0 0 1-2-1.9L6 7" />
    <path d="M10 11v6M14 11v6" />
  </svg>
);
export const IconTruck = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" />
    <circle cx="7" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" />
  </svg>
);
export const IconShield = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
export const IconFlame = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3c1 2.5-.5 4-1.7 5.4C9 10 8 11.2 8 13a4 4 0 0 0 8 0c0-1.6-.7-2.8-1.4-3.8C15.6 11 16.5 12 16.5 12S18 9.5 16 6c-.6 2-2 2.5-2 2.5S14 5 12 3Z" />
  </svg>
);
export const IconUsers = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" />
    <path d="M16 6a3 3 0 0 1 0 6M17 20a6 6 0 0 0-2-4.5" />
  </svg>
);
export const IconSparkle = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
    <path d="M12 8c.6 2.4 1.6 3.4 4 4-2.4.6-3.4 1.6-4 4-.6-2.4-1.6-3.4-4-4 2.4-.6 3.4-1.6 4-4Z" fill="currentColor" stroke="none" />
  </svg>
);
export const IconLeaf = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 4C9 4 4 9 4 18c0 0 5 1 9-3s5-11 7-11Z" />
    <path d="M4 20c4-8 8-10 12-11" />
  </svg>
);
export const IconMap = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 5 3 7v12l6-2 6 2 6-2V5l-6 2-6-2Z" />
    <path d="M9 5v12M15 7v12" />
  </svg>
);
export const IconMountain = (p: IconProps) => (
  <svg {...base(p)}><path d="m3 19 6-11 4 6 2-3 6 8H3Z" /></svg>
);

// Brand / social
export const IconInstagram = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4" y="4" width="16" height="16" rx="4.5" />
    <circle cx="12" cy="12" r="3.5" /><circle cx="17" cy="7" r="0.6" fill="currentColor" />
  </svg>
);
export const IconFacebook = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2l.5-3H14V8a1 1 0 0 1 0-.5Z" />
  </svg>
);
export const IconYoutube = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="6" width="18" height="12" rx="3.5" />
    <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
  </svg>
);
export const IconDiscord = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 7.5A13 13 0 0 1 12 6.7a13 13 0 0 1 5 .8c1.8 2 2.6 4.6 2.8 7.5a12 12 0 0 1-3.7 1.8l-.8-1.3M8.7 15.5A12 12 0 0 1 5 13.7C5.2 10.8 6 8.2 7.8 6.2" />
    <circle cx="9.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="14.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
    <path d="M8 17c2.5 1.3 5.5 1.3 8 0" />
  </svg>
);
