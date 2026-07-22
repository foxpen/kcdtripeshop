import Image from "next/image";
import type { CategoryId } from "@/lib/products";
import { IconLeaf, IconMap, IconUsers, IconMountain } from "./Icons";

const CATEGORY_MOTIF: Record<CategoryId, React.ComponentType<{ className?: string }>> = {
  obleceni: IconMap,
  deti: IconLeaf,
  mazlicci: IconUsers,
  doplnky: IconMountain,
};

export function ProductMedia({
  category,
  name,
  className = "",
  crestSize = 132,
}: {
  category: CategoryId;
  name: string;
  className?: string;
  crestSize?: number;
}) {
  const Motif = CATEGORY_MOTIF[category];
  return (
    <div className={`emblem-tile relative overflow-hidden ${className}`}>
      {/* faint category watermark */}
      <Motif className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 text-gold opacity-[0.06]" />
      <Motif className="pointer-events-none absolute -bottom-8 -left-6 h-32 w-32 text-gold opacity-[0.05]" />

      {/* thin inner gold frame */}
      <div className="pointer-events-none absolute inset-3 rounded-lg border border-line-gold/60" />
      <div className="pointer-events-none absolute inset-3 rounded-lg [box-shadow:inset_0_0_40px_rgba(0,0,0,0.6)]" />

      {/* crest */}
      <div className="absolute inset-0 grid place-items-center">
        <Image
          src="/logo.png"
          alt={name}
          width={crestSize}
          height={crestSize}
          className="h-auto w-[42%] max-w-[150px] opacity-90 drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-out-soft group-hover:scale-[1.05]"
        />
      </div>
    </div>
  );
}
