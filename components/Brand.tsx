import Image from "next/image";
import Link from "next/link";

export function Brand({
  className = "",
  size = 40,
  withText = true,
}: {
  className?: string;
  size?: number;
  withText?: boolean;
}) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 ${className}`}
      aria-label="KCD TRIP — domů"
    >
      <Image
        src="/logo.png"
        alt=""
        width={size}
        height={size}
        priority
        className="h-auto w-auto transition-transform duration-300 ease-out-soft group-hover:scale-105"
        style={{ width: size, height: size, objectFit: "contain" }}
      />
      {withText && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[17px] font-bold tracking-wide2 text-ink">
            KCD TRIP
          </span>
          <span className="mt-1 font-display text-[8.5px] uppercase tracking-heraldic text-gold">
            Audentes fortuna iuvat
          </span>
        </span>
      )}
    </Link>
  );
}
