import { HeadphonesIcon, MegaphoneIcon, StarIcon, EyeIcon, BookmarkIcon, GridIcon } from "./icons";

const NODES = [
  { icon: <HeadphonesIcon size={20} />, top: 8, left: 8, color: "var(--accent2)" },
  { icon: <MegaphoneIcon size={20} />, top: 118, left: -12, color: "var(--accent2)" },
  { icon: <StarIcon size={20} />, top: -6, left: 356, color: "var(--orange)" },
  { icon: <EyeIcon size={20} />, top: 100, left: 400, color: "var(--accent2)" },
  { icon: <BookmarkIcon size={20} />, top: 190, left: 380, color: "var(--purple)" },
  { icon: <GridIcon size={20} />, top: 258, left: 320, color: "var(--accent2)" },
];

export function CompleteBriefGraphic() {
  return (
    <div style={{ position: "relative", width: "100%", height: 340, maxWidth: 460, margin: "0 auto" }}>
      <svg
        viewBox="0 0 460 340"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
      >
        {NODES.map((n, i) => (
          <line
            key={i}
            x1={n.left + 20}
            y1={n.top + 20}
            x2={230}
            y2={150}
            stroke="rgba(255,255,255,.22)"
            strokeWidth={1}
            strokeDasharray="4 5"
          />
        ))}
      </svg>

      {NODES.map((n, i) => (
        <div
          key={i}
          className="float-slow icon-badge icon-glow"
          style={{
            position: "absolute",
            top: n.top,
            left: n.left,
            width: 40,
            height: 40,
            borderRadius: 12,
            background: "rgba(255,255,255,.1)",
            border: "1px solid rgba(255,255,255,.22)",
            color: n.color,
            animationDelay: `${i * 0.3}s`,
          }}
        >
          {n.icon}
        </div>
      ))}

      <div
        style={{
          position: "absolute",
          top: 70,
          left: 70,
          width: 320,
          borderRadius: 16,
          background: "rgba(255,255,255,.07)",
          border: "1px solid rgba(255,255,255,.18)",
          backdropFilter: "blur(2px)",
          padding: "20px 22px",
          boxShadow: "0 20px 60px rgba(0,0,0,.35)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "var(--accent2)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              flex: "none",
            }}
          >
            ▶
          </span>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 24, flex: 1 }}>
            {Array.from({ length: 22 }, (_, i) => (
              <span
                key={i}
                style={{
                  flex: 1,
                  borderRadius: 1,
                  background: "var(--accent2)",
                  height: `${20 + Math.round(60 * Math.abs(Math.sin(i * 0.8)))}%`,
                  opacity: 0.85,
                }}
              />
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
          <div style={{ height: 7, borderRadius: 4, background: "rgba(255,255,255,.16)", width: "80%" }} />
          <div style={{ height: 7, borderRadius: 4, background: "rgba(255,255,255,.16)", width: "62%" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 6 }}>
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", border: "1px solid rgba(255,255,255,.3)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}
