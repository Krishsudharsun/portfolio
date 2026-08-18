import { useMemo } from "react";

type RuneCircleProps = {
  size?: number;
  spin?: boolean;
  className?: string;
};

/**
 * The signature motif of the site: a sigil that reads equally as an
 * occult diagram and a network/topology graph — glyph nodes on a ring,
 * connected like a system map. Reused (scaled down) as section
 * dividers so the motif recurs without repeating literally.
 */
export default function RuneCircle({ size = 420, spin = true, className = "" }: RuneCircleProps) {
  const nodes = useMemo(() => {
    const count = 9;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
      const r = 150;
      return {
        x: 200 + r * Math.cos(angle),
        y: 200 + r * Math.sin(angle),
      };
    });
  }, []);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      className={className}
      role="img"
      aria-label="Decorative network sigil"
    >
      <defs>
        <radialGradient id="rc-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="200" cy="200" r="190" fill="url(#rc-glow)" />

      <g style={{ transformOrigin: "200px 200px" }} className={spin ? "rc-spin-slow" : ""}>
        <circle cx="200" cy="200" r="150" fill="none" stroke="var(--line-bright)" strokeWidth="1" opacity="0.7" />
        <polygon
          points="200,60 322,132 322,268 200,340 78,268 78,132"
          fill="none"
          stroke="var(--accent-2)"
          strokeWidth="1"
          opacity="0.45"
        />
        {nodes.map((n, i) => (
          <g key={i}>
            {nodes.map((m, j) =>
              j > i && (i + j) % 3 === 0 ? (
                <line
                  key={j}
                  x1={n.x}
                  y1={n.y}
                  x2={m.x}
                  y2={m.y}
                  stroke="var(--accent)"
                  strokeWidth="0.6"
                  opacity="0.25"
                />
              ) : null
            )}
          </g>
        ))}
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={i % 3 === 0 ? 3.2 : 2} fill="var(--accent)" opacity="0.85" />
        ))}
      </g>

      <g style={{ transformOrigin: "200px 200px" }} className={spin ? "rc-spin-slow-reverse" : ""}>
        <circle cx="200" cy="200" r="100" fill="none" stroke="var(--gold)" strokeWidth="0.8" opacity="0.4" strokeDasharray="2 6" />
      </g>

      <circle cx="200" cy="200" r="4" fill="var(--accent)" />

      <style>{`
        .rc-spin-slow { animation: rc-rotate 60s linear infinite; }
        .rc-spin-slow-reverse { animation: rc-rotate-rev 40s linear infinite; }
        @keyframes rc-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes rc-rotate-rev { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @media (prefers-reduced-motion: reduce) {
          .rc-spin-slow, .rc-spin-slow-reverse { animation: none; }
        }
      `}</style>
    </svg>
  );
}
