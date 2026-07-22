export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && (
        <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
          <span className="h-px w-6 bg-gold-deep" />
          <span className="eyebrow">{eyebrow}</span>
          <span className="h-px w-6 bg-gold-deep" />
        </div>
      )}
      <h2 className="mt-3 text-balance font-display text-[26px] leading-tight text-ink sm:text-[32px]">
        {title}
      </h2>
      {intro && <p className="mt-3 text-[15px] leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}
