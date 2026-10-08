export default function Logo({ size = 56 }: { size?: number }) {
  const h = size * (140 / 120);
  return (
    <svg
      viewBox="0 0 120 140"
      width={size}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      <defs>
        <linearGradient id="shieldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f3d2e" />
          <stop offset="100%" stopColor="#061a10" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7c948" />
          <stop offset="50%" stopColor="#f0b429" />
          <stop offset="100%" stopColor="#cb6e17" />
        </linearGradient>
        <linearGradient id="innerShield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a5f43" />
          <stop offset="100%" stopColor="#0a2a1e" />
        </linearGradient>
      </defs>
      {/* Outer shield */}
      <path
        d="M60 3 L116 20 L116 72 Q116 116 60 137 Q4 116 4 72 L4 20 Z"
        fill="url(#shieldGrad)"
        stroke="url(#goldGrad)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Inner shield line */}
      <path
        d="M60 12 L108 26 L108 71 Q108 108 60 127 Q12 108 12 71 L12 26 Z"
        fill="url(#innerShield)"
        stroke="url(#goldGrad)"
        strokeWidth="1.2"
        opacity="0.9"
      />
      {/* Sun rays */}
      <g stroke="url(#goldGrad)" strokeWidth="2" strokeLinecap="round" opacity="0.95">
        <line x1="60" y1="28" x2="60" y2="20" />
        <line x1="44" y1="32" x2="36" y2="24" />
        <line x1="76" y1="32" x2="84" y2="24" />
        <line x1="32" y1="44" x2="22" y2="38" />
        <line x1="88" y1="44" x2="98" y2="38" />
        <line x1="26" y1="60" x2="16" y2="58" />
        <line x1="94" y1="60" x2="104" y2="58" />
      </g>
      {/* Central sun disc */}
      <circle cx="60" cy="52" r="10" fill="url(#goldGrad)" opacity="0.35" />
      {/* Crossed bats */}
      <g>
        <g transform="rotate(-38 60 68)">
          <rect x="55" y="42" width="10" height="48" rx="2" fill="url(#goldGrad)" stroke="#061428" strokeWidth="0.8" />
          <rect x="53" y="82" width="14" height="4" rx="1" fill="#061428" opacity="0.7" />
        </g>
        <g transform="rotate(38 60 68)">
          <rect x="55" y="42" width="10" height="48" rx="2" fill="url(#goldGrad)" stroke="#061428" strokeWidth="0.8" />
          <rect x="53" y="82" width="14" height="4" rx="1" fill="#061428" opacity="0.7" />
        </g>
      </g>
      {/* Wicket stumps behind bats */}
      <g fill="url(#goldGrad)" opacity="0.9">
        <rect x="56" y="70" width="1.8" height="14" rx="0.9" />
        <rect x="59" y="70" width="1.8" height="14" rx="0.9" />
        <rect x="62" y="70" width="1.8" height="14" rx="0.9" />
      </g>
      {/* Ribbon */}
      <path
        d="M22 96 Q60 108 98 96 L98 104 Q60 116 22 104 Z"
        fill="url(#goldGrad)"
      />
      <text x="60" y="92" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="18" fontWeight="900" fill="url(#goldGrad)" letterSpacing="1">DAWN</text>
      <text x="60" y="107" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="8" fontWeight="800" fill="#061428" letterSpacing="2">CRICKET CLUB</text>
      {/* Cricket ball accent */}
      <circle cx="60" cy="120" r="4" fill="#d42a2a" stroke="url(#goldGrad)" strokeWidth="0.8" />
      <path d="M56.5 119.5 Q60 122.5 63.5 119.5" stroke="#f5e5b8" strokeWidth="0.6" fill="none" />
    </svg>
  );
}