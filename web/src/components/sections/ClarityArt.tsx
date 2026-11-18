/** Ilustraciones originales (solo colores de la marca) para el deslizador «de la confusión a la claridad». */

const lines = (x: number, y: number, widths: number[]) =>
  widths.map((w, i) => <rect key={i} x={x} y={y + i * 22} width={w} height={9} rx={4.5} className="fill-mist-200" />);

export function ConfusionArt() {
  return (
    <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden="true">
      <rect width="800" height="450" className="fill-navy-100" />
      <g className="stroke-line" strokeWidth="2">
        <g transform="rotate(-12 200 220)">
          <rect x="95" y="90" width="210" height="270" rx="12" className="fill-white" />
          {lines(120, 125, [150, 130, 160, 100, 140])}
        </g>
        <g transform="rotate(9 400 210)">
          <rect x="300" y="60" width="210" height="270" rx="12" className="fill-white" />
          {lines(325, 95, [160, 150, 110, 150])}
          <path d="M325 200 L475 200" className="stroke-gold-dark" strokeWidth="3" />
        </g>
        <g transform="rotate(-5 600 230)">
          <rect x="500" y="110" width="210" height="270" rx="12" className="fill-white" />
          {lines(525, 145, [140, 160, 120, 150, 90])}
        </g>
        <g transform="rotate(16 700 150)">
          <rect x="620" y="40" width="150" height="190" rx="12" className="fill-white" />
          {lines(640, 70, [100, 90, 110])}
        </g>
      </g>
      <path
        d="M30 395 C 170 290, 250 440, 390 340 S 600 300, 770 400"
        fill="none"
        strokeWidth="3"
        strokeDasharray="2 9"
        strokeLinecap="round"
        className="stroke-gold"
      />
      <g className="fill-navy" fontFamily="var(--font-fraunces), Georgia, serif" fontWeight="600">
        <text x="228" y="250" fontSize="130" transform="rotate(-10 228 250)" opacity="0.85">?</text>
        <text x="545" y="360" fontSize="96" transform="rotate(12 545 360)" opacity="0.7">?</text>
        <text x="690" y="150" fontSize="72" transform="rotate(-8 690 150)" opacity="0.55">?</text>
      </g>
    </svg>
  );
}

export function ClarityArt() {
  return (
    <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden="true">
      <rect width="800" height="450" className="fill-ivory" />
      <g fill="none" strokeWidth="2" className="stroke-gold" opacity="0.35">
        <circle cx="400" cy="225" r="230" />
        <circle cx="400" cy="225" r="300" />
      </g>

      <rect x="214" y="78" width="372" height="304" rx="20" className="fill-navy" opacity="0.07" />
      <rect x="206" y="68" width="372" height="304" rx="20" className="fill-white stroke-line" strokeWidth="2" />
      <rect x="240" y="100" width="150" height="14" rx="7" className="fill-navy" />
      {[150, 218, 286].map((y, i) => (
        <g key={y}>
          <circle cx="262" cy={y + 14} r="19" className="fill-gold" />
          <path d={`M253 ${y + 14} l7 7 l13 -14`} fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="300" y={y + 2} width={i === 1 ? 190 : 230} height="11" rx="5.5" className="fill-navy" opacity="0.8" />
          <rect x="300" y={y + 22} width={i === 2 ? 110 : 150} height="9" rx="4.5" className="fill-mist-200" />
        </g>
      ))}

      <g>
        <rect x="612" y="238" width="132" height="124" rx="16" className="fill-navy" />
        <rect x="612" y="238" width="132" height="34" rx="16" className="fill-gold" />
        <rect x="612" y="256" width="132" height="16" className="fill-gold" />
        {[0, 1, 2].flatMap((r) =>
          [0, 1, 2].map((c) => (
            <circle key={`${r}${c}`} cx={640 + c * 32} cy={296 + r * 22} r="6" className={r === 1 && c === 1 ? "fill-gold-light" : "fill-white"} opacity={r === 1 && c === 1 ? 1 : 0.35} />
          ))
        )}
      </g>

      <g className="stroke-gold" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M110 120 V330" strokeDasharray="2 9" />
      </g>
      {[120, 225, 330].map((y) => (
        <circle key={y} cx="110" cy={y} r="13" className="fill-white stroke-gold" strokeWidth="4" />
      ))}
    </svg>
  );
}
