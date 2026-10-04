import Image from "next/image";

/* Transparent cutouts of the Cirro Cloud character (public/brand/cloud-*.webp),
   supplied artwork, never redrawn. They float free on any background; `size`
   is the longest edge, the aspect ratio is kept. */

const VARIANTS = {
  primary: { file: "cloud-primary.webp", w: 508, h: 327, alt: "Cirro Cloud mascot wearing headphones next to a glowing audio player" },
  emotional: { file: "cloud-emotional.webp", w: 339, h: 252, alt: "Cirro Cloud mascot hugging a heart" },
  idea: { file: "cloud-idea.webp", w: 223, h: 216, alt: "Cirro Cloud mascot under a glowing lightbulb, thinking" },
  success: { file: "cloud-success.webp", w: 270, h: 194, alt: "Cirro Cloud mascot with a checkmark, celebrating with confetti" },
  guidance: { file: "cloud-guidance.webp", w: 278, h: 163, alt: "Cirro Cloud mascot gesturing toward a checklist" },
  support: { file: "cloud-support.webp", w: 245, h: 194, alt: "Cirro Cloud mascot beside a chat bubble" },
} as const;

export type CloudVariant = keyof typeof VARIANTS;

export function CloudMascot({
  variant,
  size = 64,
  glow = false,
  style,
}: {
  variant: CloudVariant;
  size?: number;
  glow?: boolean;
  style?: React.CSSProperties;
}) {
  const v = VARIANTS[variant];
  const ratio = v.w / v.h;
  const width = ratio >= 1 ? size : Math.round(size * ratio);
  const height = ratio >= 1 ? Math.round(size / ratio) : size;
  return (
    <Image
      src={`/brand/${v.file}`}
      alt={v.alt}
      width={v.w}
      height={v.h}
      style={{
        width,
        height,
        flex: "none",
        objectFit: "contain",
        filter: glow ? "drop-shadow(0 6px 16px color-mix(in srgb, var(--accent2) 45%, transparent))" : "drop-shadow(0 4px 10px rgba(0,0,0,.28))",
        ...style,
      }}
    />
  );
}
