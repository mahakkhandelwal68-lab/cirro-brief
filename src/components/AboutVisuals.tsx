import {
  HeadphonesIcon,
  DocumentIcon,
  ShareUpIcon,
  CodeIcon,
  GridIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  PlusIcon,
} from "./icons";

/* ---- Hero: "Your Newsletter" becomes five outputs ---- */

const HERO_OUTPUTS: [React.ReactNode, string, string, string][] = [
  [<HeadphonesIcon key="a" size={18} />, "Audio Brief", "A complete listening experience", "var(--accent2)"],
  [<DocumentIcon key="b" size={18} />, "Brief Summary", "Key ideas, easy to revisit", "var(--purple)"],
  [<ShareUpIcon key="c" size={18} />, "Ready-to-share Assets", "Promotional copy and visuals, prepared", "var(--orange)"],
  [<CodeIcon key="d" size={18} />, "Blog Audio Embed", "Add audio to your blog in one click", "var(--blue)"],
  [<GridIcon key="e" size={18} />, "QR Code to Share", "Let people listen in printable places", "var(--accent2)"],
];

export function AboutHeroGraphic() {
  const rowH = 68;
  const startY = 8;
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: 28, maxWidth: 560, margin: "0 auto" }}>
      <div style={{ flex: "none", width: 168, position: "sticky", top: 90 }}>
        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: 16,
            background: "var(--card)",
            boxShadow: "var(--shadow)",
            padding: "16px 16px 18px",
          }}
        >
          <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 10, fontWeight: 500 }}>Your Newsletter</div>
          <div
            style={{
              width: "100%",
              aspectRatio: "1.3",
              borderRadius: 9,
              background: "var(--tint)",
              color: "var(--accent2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 12,
            }}
          >
            <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 16l5-5 3 3 4-6 4 5" />
              <circle cx="8" cy="8" r="1.6" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[100, 82, 90, 60].map((w, i) => (
              <div key={i} style={{ height: 5, borderRadius: 3, width: `${w}%`, background: "var(--border2)" }} />
            ))}
          </div>
        </div>
      </div>

      <svg
        viewBox={`0 0 240 ${startY + HERO_OUTPUTS.length * rowH}`}
        style={{ position: "absolute", left: 84, top: 0, width: 240, height: "100%", overflow: "visible", pointerEvents: "none" }}
        preserveAspectRatio="none"
      >
        {HERO_OUTPUTS.map((_, i) => {
          const y = startY + i * rowH + 22;
          return <path key={i} d={`M0,54 C60,54 40,${y} 100,${y}`} stroke="var(--border)" strokeWidth={1.4} strokeDasharray="3 5" fill="none" />;
        })}
      </svg>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, position: "relative" }}>
        {HERO_OUTPUTS.map(([icon, title, body, color]) => (
          <div
            key={title}
            className="hover-pop"
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              border: "1px solid var(--border)",
              borderRadius: 13,
              background: "var(--card)",
              padding: "13px 15px",
            }}
          >
            <span className="icon-badge icon-glow" style={{ width: 34, height: 34, borderRadius: 10, background: "var(--tint)", color }}>
              {icon}
            </span>
            <div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14.5, marginBottom: 2 }}>{title}</div>
              <div style={{ fontSize: 12.5, color: "var(--text3)" }}>{body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Decorative QR code ---- */

function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export function QrCodeGraphic({ size = 132 }: { size?: number }) {
  const cells = 15;
  const cell = size / cells;
  const finder = (cx: number, cy: number) => (
    <g key={`${cx}-${cy}`}>
      <rect x={cx * cell} y={cy * cell} width={cell * 3} height={cell * 3} fill="none" stroke="var(--text)" strokeWidth={cell * 0.35} />
      <rect x={(cx + 1) * cell} y={(cy + 1) * cell} width={cell} height={cell} fill="var(--text)" />
    </g>
  );
  const finderZones = [
    [0, 0],
    [cells - 3, 0],
    [0, cells - 3],
  ];
  const inZone = (r: number, c: number) => finderZones.some(([zc, zr]) => c >= zc - 1 && c < zc + 4 && r >= zr - 1 && r < zr + 4);

  const modules: React.ReactNode[] = [];
  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      if (inZone(r, c)) continue;
      if (pseudoRandom(r * cells + c + 1) > 0.52) {
        modules.push(<rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill="var(--text)" />);
      }
    }
  }

  return (
    <div style={{ display: "inline-flex", padding: 12, background: "#fff", borderRadius: 12, border: "1px solid var(--border)" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ color: "#0b1512" }}>
        <rect width={size} height={size} fill="#fff" />
        {modules}
        {finderZones.map(([c, r]) => finder(c, r))}
        <circle cx={size / 2} cy={size / 2} r={size * 0.1} fill="#fff" stroke="#0b1512" strokeWidth={2} />
        <path
          d={`M${size / 2 - 6} ${size / 2 + 3} a6 6 0 1 1 1 -6 a4.5 4.5 0 1 1 0 9z`}
          fill="#0b1512"
          transform={`translate(0,0) scale(${size / 132})`}
        />
      </svg>
    </div>
  );
}

/* ---- "One edition, more ways to experience it" asset cards ---- */

function MiniWaveform({ bars = 24, color = "var(--accent2)" }: { bars?: number; color?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 22 }}>
      {Array.from({ length: bars }, (_, i) => (
        <span
          key={i}
          style={{ flex: 1, borderRadius: 1, background: color, height: `${18 + Math.round(70 * Math.abs(Math.sin(i * 0.9)))}%`, opacity: 0.85 }}
        />
      ))}
    </div>
  );
}

export function AudioBriefVisual() {
  return (
    <div>
      <div style={{ fontSize: 11.5, color: "var(--text3)", marginBottom: 10 }}>The Future of Work · June 12, 2024 · 12 min</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--accent2)", color: "var(--btn-text)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flex: "none" }}>▶</span>
        <div style={{ flex: 1 }}>
          <MiniWaveform />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: "var(--text3)", marginTop: 6 }}>
        <span>00:00</span>
        <span>12:34</span>
      </div>
    </div>
  );
}

export function BriefSummaryVisual() {
  const items = ["AI is reshaping how teams work", "Human skills are more important than ever", "Flexible work is here to stay", "Focus and deep work matter"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
      {items.map((t) => (
        <div key={t} style={{ display: "flex", gap: 8, fontSize: 12.5, color: "var(--text2)" }}>
          <span style={{ color: "var(--purple)", flex: "none" }}>
            <CheckCircleIcon size={14} />
          </span>
          {t}
        </div>
      ))}
    </div>
  );
}

export function ShareAssetsVisual() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ border: "1px solid var(--border2)", borderRadius: 10, background: "var(--tint-warm)", padding: "12px 14px" }}>
        <div style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: 13.5, color: "var(--text)" }}>
          &ldquo;The future of work is human.&rdquo;
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--border2)", borderRadius: 10, padding: "9px 12px" }}>
        <span style={{ width: 22, height: 22, borderRadius: 5, background: "var(--orange)", flex: "none" }} />
        <div style={{ fontSize: 11.5, color: "var(--text2)" }}>The future of work isn&apos;t just about tools. It&apos;s about people.</div>
      </div>
    </div>
  );
}

export function BlogEmbedVisual() {
  return (
    <div>
      <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 10 }}>The Future of Work</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
        {[100, 92, 70].map((w, i) => (
          <div key={i} style={{ height: 5, borderRadius: 3, width: `${w}%`, background: "var(--border2)" }} />
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, border: "1px solid var(--border2)", borderRadius: 10, padding: "8px 12px" }}>
        <span style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--blue)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, flex: "none" }}>▶</span>
        <div style={{ flex: 1 }}>
          <MiniWaveform bars={16} color="var(--blue)" />
        </div>
        <span style={{ fontSize: 10, color: "var(--text3)" }}>12:34</span>
      </div>
    </div>
  );
}

export function QrShareVisual() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <QrCodeGraphic size={96} />
      <div style={{ fontSize: 11.5, color: "var(--text3)", textAlign: "center" }}>Scan to hear this edition</div>
    </div>
  );
}

/* ---- "Powerful tools" workspace panels ---- */

export function BrandVoicePanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div>
        <div style={{ fontSize: 11.5, color: "var(--text3)", marginBottom: 5 }}>Tone</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid var(--border)", borderRadius: 9, padding: "8px 12px", fontSize: 13 }}>
          Conversational <ChevronDownIcon size={14} />
        </div>
      </div>
      <div>
        <div style={{ fontSize: 11.5, color: "var(--text3)", marginBottom: 5 }}>Style</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid var(--border)", borderRadius: 9, padding: "8px 12px", fontSize: 13 }}>
          Confident &amp; Clear <ChevronDownIcon size={14} />
        </div>
      </div>
    </div>
  );
}

export function PronunciationsPanel() {
  const rows: [string, string][] = [
    ["NVIDIA", "en-VID-ee-uh"],
    ["SaaS", "sass"],
    ["Kubernetes", "koo-ber-NET-eez"],
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
      {rows.map(([term, phon]) => (
        <div key={term} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5 }}>
          <span style={{ fontWeight: 600 }}>{term}</span>
          <span style={{ color: "var(--text3)" }}>{phon}</span>
        </div>
      ))}
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "var(--accent2)", marginTop: 2 }}>
        <PlusIcon size={13} /> Add new term
      </div>
    </div>
  );
}

export function PreviewEditionsPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ fontSize: 12.5, fontWeight: 600 }}>The Future of Work</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--accent2)", color: "var(--btn-text)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, flex: "none" }}>▶</span>
        <div style={{ flex: 1 }}>
          <MiniWaveform bars={16} />
        </div>
        <span style={{ fontSize: 10, color: "var(--text3)" }}>12:34</span>
      </div>
      <div style={{ textAlign: "center", border: "1px solid var(--border)", borderRadius: 9, padding: "7px", fontSize: 12, color: "var(--text2)" }}>Preview Full Brief</div>
    </div>
  );
}

export function DeliveryDashboardPanel() {
  const rows: [string, string, string][] = [
    ["The Future of Work", "Jun 12, 2024", "Published"],
    ["AI in Everyday Life", "Jun 05, 2024", "Published"],
    ["Digital Minimalism", "May 29, 2024", "Draft"],
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
      {rows.map(([title, date, status]) => (
        <div key={title} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12 }}>
          <div>
            <div style={{ fontWeight: 600 }}>{title}</div>
            <div style={{ color: "var(--text3)", fontSize: 10.5 }}>{date}</div>
          </div>
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              padding: "3px 9px",
              borderRadius: 999,
              background: status === "Published" ? "var(--tint)" : "var(--border2)",
              color: status === "Published" ? "var(--accent2)" : "var(--text3)",
            }}
          >
            {status}
          </span>
        </div>
      ))}
    </div>
  );
}
