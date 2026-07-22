import Link from "next/link";
import Image from "next/image";
import { IconArrowRight } from "@/components/Icons";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <Image
        src="/logo.png"
        alt=""
        width={120}
        height={120}
        className="w-[96px] opacity-80 drop-shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
      />
      <p className="mt-6 font-display text-[64px] leading-none text-gold">404</p>
      <h1 className="mt-3 font-display text-[24px] text-ink">Tahle cesta nikam nevede</h1>
      <p className="mt-2 max-w-sm text-[15px] text-muted">
        Zdá se, že jsme sešli z mapy. Vrať se k družině a vyraž znovu.
      </p>
      <Link href="/" className="btn-gold btn-lg mt-8">
        Zpět domů <IconArrowRight className="h-5 w-5" />
      </Link>
    </div>
  );
}
