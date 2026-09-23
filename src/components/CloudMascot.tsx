import Image from "next/image";

/* Cropped straight from the supplied Cirro Cloud asset board (public/brand/
   cloud-*.webp) - never redrawn. Each crop keeps its own dark background
   (there's no way to lift clean alpha from a soft-glow 3D render here), so it
   is always shown inside a framed chip: that reads as a deliberate sticker/
   avatar treatment in both themes instead of a stray rectangle. */

const VARIANTS = {
  primary: { file: "cloud-primary.webp", w: 318, h: 345, alt: "Cirro Cloud mascot wearing headphones next to a glowing audio player" },
  emotional: { file: "cloud-emotional.webp", w: 284, h: 270, alt: "Cirro Cloud mascot hugging a heart" },
  idea: { file: "cloud-idea.webp", w: 165, h: 170, alt: "Cirro Cloud mascot under a glowing lightbulb, thinking" },
  success: { file: "cloud-success.webp", w: 172, h: 213, alt: "Cirro Cloud mascot with a checkmark, celebrating with confetti" },
  guidance: { file: "cloud-guidance.webp", w: 155, h: 212, alt: "Cirro Cloud mascot gesturing toward a checklist" },
  support: { file: "cloud-support.webp", w: 155, h: 211, alt: "Cirro Cloud mascot beside a chat bubble" },
} as const;

export type CloudVariant = keyof typeof VARIANTS;

export function CloudMascot({
  variant,
  size = 64,
  radius = "50%",
  glow = false,
  style,
}: {
  variant: CloudVariant;
  size?: number;
  radius?: number | string;
  glow?: boolean;
  style?: React.CSSProperties;
}) {
  const v = VARIANTS[variant];
  return (
    <span
      className={glow ? "icon-glow" : undefined}
      style={{
        display: "inline-flex",
        width: size,
        height: size,
        borderRadius: radius,
        overflow: "hidden",
        flex: "none",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow)",
        background: "#0a1513",
        ...style,
      }}
    >
      <Image src={`/brand/${v.file}`} alt={v.alt} width={v.w} height={v.h} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </span>
  );
}
