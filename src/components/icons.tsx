type IconProps = { size?: number };

const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function DocumentIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </svg>
  );
}
export function PencilIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );
}
export function MicIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0M12 19v3" />
    </svg>
  );
}
export function WaveformIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M3 12v0M7 8v8M11 4v16M15 8v8M19 12v0" />
    </svg>
  );
}
export function CarIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M3 13l1.5-5A2 2 0 0 1 6.4 6.5h11.2a2 2 0 0 1 1.9 1.5L21 13v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
      <circle cx="7" cy="17" r="1.4" /><circle cx="17" cy="17" r="1.4" />
    </svg>
  );
}
export function WalkIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <circle cx="13" cy="4" r="1.6" />
      <path d="M10 22l1.5-6-2-2 1-5 3 2 3 1M9 14l-3 2M14 10l3 1.5V17" />
    </svg>
  );
}
export function LaptopIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="4" y="4" width="16" height="11" rx="1.2" />
      <path d="M2 19h20" />
    </svg>
  );
}
export function DumbbellIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M4 9v6M2 10.5v3M20 9v6M22 10.5v3M7 12h10" />
      <rect x="5" y="8" width="3" height="8" rx="1" /><rect x="16" y="8" width="3" height="8" rx="1" />
    </svg>
  );
}
export function SparkleIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
    </svg>
  );
}
export function PlaneIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M3 12l18-7-7 18-2-8-8-3z" />
    </svg>
  );
}
export function HeadphonesIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="2" y="14" width="5" height="7" rx="1.5" /><rect x="17" y="14" width="5" height="7" rx="1.5" />
    </svg>
  );
}
export function MegaphoneIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M3 11v2a2 2 0 0 0 2 2h1l10 4V5L6 9H5a2 2 0 0 0-2 2z" />
      <path d="M8 15v4a2 2 0 0 0 4 0v-3" />
    </svg>
  );
}
export function StarIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.3 5.9 20.5l1.5-6.8-5.2-4.7 6.9-.7z" />
    </svg>
  );
}
export function BookmarkIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
    </svg>
  );
}
export function EyeIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
export function GridIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.2" /><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.2" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.2" /><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.2" />
    </svg>
  );
}
export function LightningIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
    </svg>
  );
}
export function CalendarIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="3" y="5" width="18" height="16" rx="1.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}
export function CrownIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M3 8l4 3 5-6 5 6 4-3-2 11H5z" />
    </svg>
  );
}
export function ChatIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M4 4h16v12H8l-4 4z" />
    </svg>
  );
}
export function LockIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="5" y="11" width="14" height="9" rx="1.5" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}
export function CheckCircleIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.5 2.5L16 9.5" />
    </svg>
  );
}
export function ClockIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}
export function ArrowDownIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M12 4v16M6 14l6 6 6-6" />
    </svg>
  );
}

export function GradientArrowDownIcon({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="cb-arrow-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--purple)" />
          <stop offset="100%" stopColor="var(--accent2)" />
        </linearGradient>
      </defs>
      <path d="M12 4v16M6 14l6 6 6-6" stroke="url(#cb-arrow-gradient)" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
