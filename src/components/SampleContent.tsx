import Image from "next/image";

/* The fictional sample newsletter used across the site. The mountain is one
   master image (public/brand/newsletter-mountain.jpg), only ever cropped with
   CSS; never swapped for other imagery. */

export const SAMPLE = {
  publication: "The Daily Insight",
  tagline: "Your weekly dose of what matters",
  date: "Nov 12, 2024",
  categories: "Work / Technology / People",
  headline: "The future of work in a changing world",
  briefTitle: "The Future of Work in a Changing World",
  standfirst: "How people, technology and purpose are reshaping the way we work.",
  body: "From AI-powered tools to a renewed focus on meaningful work, the global workforce is in the middle of a major shift. In this edition, we explore what’s changing, what it means for individuals and businesses, and how to stay ahead in an increasingly dynamic world.",
  author: "Priya Sharma",
  authorRole: "Editor, The Daily Insight",
};

// object-position keeps the main peak (about 61% across, 24% down the master) in frame.
const CROPS = {
  "16/9": { ratio: "16 / 9", position: "50% 50%" },
  "3/2": { ratio: "3 / 2", position: "60% 50%" },
  "4/3": { ratio: "4 / 3", position: "75% 50%" },
  "1/1": { ratio: "1 / 1", position: "62% 50%" },
  "3/4": { ratio: "3 / 4", position: "70% 50%" },
} as const;

export type MountainCrop = keyof typeof CROPS;

export function MountainImage({
  crop = "3/2",
  sizes = "(max-width: 900px) 90vw, 400px",
  radius = 12,
  priority = false,
  style,
}: {
  crop?: MountainCrop;
  sizes?: string;
  radius?: number | string;
  priority?: boolean;
  style?: React.CSSProperties;
}) {
  const c = CROPS[crop];
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: c.ratio, borderRadius: radius, overflow: "hidden", ...style }}>
      <Image
        src="/brand/newsletter-mountain.jpg"
        alt="Sunlit green mountain range at golden hour, the cover image of the sample newsletter"
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover", objectPosition: c.position }}
      />
    </div>
  );
}

const SERIF = 'Georgia, "Times New Roman", serif';

function Sprig() {
  return (
    <svg width="58%" height="58%" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21c0-6 1.5-10 6-14" />
      <path d="M8 17c-3 0-4.6-2-4.6-4.6 3 0 4.6 2 4.6 4.6zM10.5 12.5c-.5-3 1-5.2 4.2-5.6.4 3-1.2 5.2-4.2 5.6zM14 8c1-2.2 3-3.4 6-3.2-.2 2.8-2.2 4-5 3.6z" />
    </svg>
  );
}

/* HTML/CSS recreation of the supplied newsletter card. All sizes are in
   container-query units, so it scales cleanly at any width. It is always a
   light "paper" card, like the reference, in both site themes. */
export function NewsletterCard({
  compact = false,
  sizes,
  style,
}: {
  compact?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ containerType: "inline-size", width: "100%", ...style }}>
      <article
        style={{
          background: "#f7f7f5",
          color: "#0d1714",
          borderRadius: "3.2cqw",
          padding: "5.4cqw",
          boxShadow: "0 1.6cqw 5cqw rgba(0,0,0,.28)",
          fontFamily: SERIF,
        }}
      >
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2cqw", paddingBottom: "3.2cqw", borderBottom: "1px solid #e1e5e2" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "2.6cqw", minWidth: 0 }}>
            <span style={{ width: "11.3cqw", height: "11.3cqw", flex: "none", borderRadius: "2cqw", background: "#22574d", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sprig />
            </span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: "max(11px, 4.5cqw)", fontWeight: 700, lineHeight: 1.1 }}>{SAMPLE.publication}</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "max(8px, 2.6cqw)", color: "#55605c", marginTop: "0.6cqw" }}>{SAMPLE.tagline}</div>
            </div>
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: "max(8px, 2.4cqw)", color: "#55605c", textAlign: "right", flex: "none", borderLeft: "1px solid #d6dbd8", paddingLeft: "2.4cqw", lineHeight: 1.5 }}>
            {SAMPLE.date}
            <br />
            Read online &rarr;
          </div>
        </header>

        <div style={{ fontFamily: "var(--font-body)", fontSize: "max(7px, 2.1cqw)", letterSpacing: ".16em", textTransform: "uppercase", color: "#5b6662", margin: "3.2cqw 0 1.4cqw" }}>
          {SAMPLE.categories}
        </div>
        <h3 style={{ margin: "0 0 3cqw", fontFamily: SERIF, fontSize: "max(15px, 9cqw)", fontWeight: 700, lineHeight: 1.06, letterSpacing: "-.02em" }}>
          {SAMPLE.headline}
        </h3>
        <MountainImage crop="3/2" radius="2cqw" sizes={sizes} />

        {!compact && (
          <>
            <p style={{ margin: "3.6cqw 0 1.6cqw", fontFamily: SERIF, fontSize: "max(12px, 4.4cqw)", lineHeight: 1.22 }}>{SAMPLE.standfirst}</p>
            <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: "max(9px, 2.7cqw)", lineHeight: 1.55, color: "#59635f" }}>{SAMPLE.body}</p>
            <footer style={{ marginTop: "3.6cqw", paddingTop: "3cqw", borderTop: "1px solid #e1e5e2", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2cqw" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "2.2cqw", minWidth: 0 }}>
                <Image src="/brand/priya-avatar.jpg" alt="" width={80} height={80} style={{ width: "9.2cqw", height: "9.2cqw", borderRadius: "50%", flex: "none" }} />
                <div style={{ fontFamily: "var(--font-body)", minWidth: 0 }}>
                  <div style={{ fontSize: "max(9px, 2.5cqw)", fontWeight: 600 }}>By {SAMPLE.author}</div>
                  <div style={{ fontSize: "max(8px, 2.3cqw)", color: "#66706c" }}>{SAMPLE.authorRole}</div>
                </div>
              </div>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "max(9px, 2.6cqw)", fontWeight: 500, background: "#e3eee8", borderRadius: 999, padding: "1.6cqw 3.4cqw", flex: "none", whiteSpace: "nowrap" }}>
                Read full story &rarr;
              </span>
            </footer>
          </>
        )}
      </article>
    </div>
  );
}
