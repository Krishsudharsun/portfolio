import { useId } from 'react';

/**
 * WardSeal — the site's signature glyph.
 * A rune-dial / magic-circle motif built from a network graph:
 * eight outer "ports" in an octagon (with selective cross-links,
 * like a traceroute) around an inner diamond hub, ringed by a
 * tick-marked dial. Reused at full size in the Hero and as a
 * small mark elsewhere, so the cyber and wizarding halves of the
 * brief read as one idea rather than two decorations stitched
 * together.
 */
export function WardSeal({
  size = 420,
  className = '',
  animated = true,
  pulse = false,
}: {
  size?: number;
  className?: string;
  animated?: boolean;
  pulse?: boolean;
}) {
  const uid = useId().replace(/:/g, '');
  return (
    <svg
      viewBox="0 0 400 400"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Decorative ward seal, a rune dial formed from a network graph"
    >
      <defs>
        <radialGradient id={`seal-glow-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--nl-accent)" stopOpacity="0.35" />
          <stop offset="60%" stopColor="var(--nl-accent-2)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--nl-accent-2)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="200" cy="200" r="190" fill={`url(#seal-glow-${uid})`} />

      <circle cx="200" cy="200" r="182" fill="none" stroke="var(--nl-border-strong)" strokeWidth="1" />
      <circle cx="200" cy="200" r="150" fill="none" stroke="var(--nl-accent-2)" strokeOpacity="0.45" strokeWidth="1" />

      <g stroke="var(--nl-ink-faint)" strokeWidth="1" opacity="0.5">
        <line x1="200.0" y1="40.0" x2="200.0" y2="26.0" />
<line x1="241.4" y1="45.5" x2="245.0" y2="31.9" />
<line x1="280.0" y1="61.4" x2="287.0" y2="49.3" />
<line x1="313.1" y1="86.9" x2="323.0" y2="77.0" />
<line x1="338.6" y1="120.0" x2="350.7" y2="113.0" />
<line x1="354.5" y1="158.6" x2="368.1" y2="155.0" />
<line x1="360.0" y1="200.0" x2="374.0" y2="200.0" />
<line x1="354.5" y1="241.4" x2="368.1" y2="245.0" />
<line x1="338.6" y1="280.0" x2="350.7" y2="287.0" />
<line x1="313.1" y1="313.1" x2="323.0" y2="323.0" />
<line x1="280.0" y1="338.6" x2="287.0" y2="350.7" />
<line x1="241.4" y1="354.5" x2="245.0" y2="368.1" />
<line x1="200.0" y1="360.0" x2="200.0" y2="374.0" />
<line x1="158.6" y1="354.5" x2="155.0" y2="368.1" />
<line x1="120.0" y1="338.6" x2="113.0" y2="350.7" />
<line x1="86.9" y1="313.1" x2="77.0" y2="323.0" />
<line x1="61.4" y1="280.0" x2="49.3" y2="287.0" />
<line x1="45.5" y1="241.4" x2="31.9" y2="245.0" />
<line x1="40.0" y1="200.0" x2="26.0" y2="200.0" />
<line x1="45.5" y1="158.6" x2="31.9" y2="155.0" />
<line x1="61.4" y1="120.0" x2="49.3" y2="113.0" />
<line x1="86.9" y1="86.9" x2="77.0" y2="77.0" />
<line x1="120.0" y1="61.4" x2="113.0" y2="49.3" />
<line x1="158.6" y1="45.5" x2="155.0" y2="31.9" />
      </g>

      <g className={animated ? 'ward-seal-rotate-rev' : ''} style={{ transformOrigin: '200px 200px' }}>
        <polygon
          points="200.0,50.0 350.0,200.0 200.0,350.0 50.0,200.0"
          fill="none"
          stroke="var(--nl-gold)"
          strokeOpacity="0.4"
          strokeWidth="1"
        />
      </g>

      <circle cx="200" cy="200" r="110" fill="none" stroke="var(--nl-border)" strokeWidth="1" strokeDasharray="2 6" />

      <g stroke="var(--nl-accent)" strokeOpacity="0.55" strokeWidth="1.1">
        <line x1="200.0" y1="50.0" x2="306.1" y2="93.9" />
<line x1="306.1" y1="93.9" x2="350.0" y2="200.0" />
<line x1="350.0" y1="200.0" x2="306.1" y2="306.1" />
<line x1="306.1" y1="306.1" x2="200.0" y2="350.0" />
<line x1="200.0" y1="350.0" x2="93.9" y2="306.1" />
<line x1="93.9" y1="306.1" x2="50.0" y2="200.0" />
<line x1="50.0" y1="200.0" x2="93.9" y2="93.9" />
<line x1="93.9" y1="93.9" x2="200.0" y2="50.0" />
      </g>
      <g stroke="var(--nl-accent-2)" strokeOpacity="0.4" strokeWidth="1">
        <line x1="200.0" y1="50.0" x2="306.1" y2="306.1" />
<line x1="350.0" y1="200.0" x2="93.9" y2="306.1" />
<line x1="200.0" y1="350.0" x2="93.9" y2="93.9" />
<line x1="50.0" y1="200.0" x2="306.1" y2="93.9" />
      </g>
      <g stroke="var(--nl-accent-3)" strokeOpacity="0.5" strokeWidth="1">
        <line x1="200.0" y1="128.0" x2="272.0" y2="200.0" />
<line x1="272.0" y1="200.0" x2="200.0" y2="272.0" />
<line x1="200.0" y1="272.0" x2="128.0" y2="200.0" />
<line x1="128.0" y1="200.0" x2="200.0" y2="128.0" />
        <line x1="200.0" y1="128.0" x2="93.9" y2="93.9" />
<line x1="200.0" y1="128.0" x2="200.0" y2="50.0" />
<line x1="272.0" y1="200.0" x2="306.1" y2="93.9" />
<line x1="272.0" y1="200.0" x2="350.0" y2="200.0" />
<line x1="200.0" y1="272.0" x2="306.1" y2="306.1" />
<line x1="200.0" y1="272.0" x2="200.0" y2="350.0" />
<line x1="128.0" y1="200.0" x2="93.9" y2="306.1" />
<line x1="128.0" y1="200.0" x2="50.0" y2="200.0" />
      </g>

      <g fill="var(--nl-accent)">
        <circle cx="200.0" cy="50.0" r="4.5" />
<circle cx="306.1" cy="93.9" r="4.5" />
<circle cx="350.0" cy="200.0" r="4.5" />
<circle cx="306.1" cy="306.1" r="4.5" />
<circle cx="200.0" cy="350.0" r="4.5" />
<circle cx="93.9" cy="306.1" r="4.5" />
<circle cx="50.0" cy="200.0" r="4.5" />
<circle cx="93.9" cy="93.9" r="4.5" />
      </g>
      <g fill="var(--nl-accent-3)">
        <circle cx="200.0" cy="128.0" r="3.5" />
<circle cx="272.0" cy="200.0" r="3.5" />
<circle cx="200.0" cy="272.0" r="3.5" />
<circle cx="128.0" cy="200.0" r="3.5" />
      </g>

      <rect
        x="192"
        y="192"
        width="16"
        height="16"
        fill="none"
        stroke="var(--nl-gold)"
        strokeWidth="1.4"
        transform="rotate(45 200 200)"
      />
      <rect x="197" y="197" width="6" height="6" fill="var(--nl-gold)" className={pulse ? 'ward-seal-blink' : ''} />
    </svg>
  );
}

