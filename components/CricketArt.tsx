export default function CricketArt() {
  return (
    <svg
      viewBox="0 0 560 460"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: "100%", height: "auto", maxWidth: 620, display: "block" }}
    >
      <defs>
        <radialGradient id="heroGlow" cx="55%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#f0b429" stopOpacity="0.22" />
          <stop offset="60%" stopColor="#f0b429" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#f0b429" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="greenGlow" cx="30%" cy="70%" r="55%">
          <stop offset="0%" stopColor="#14a44d" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#14a44d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="grassGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d4a2a" />
          <stop offset="100%" stopColor="#041a0e" />
        </linearGradient>
        <linearGradient id="helmetGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1b5a42" />
          <stop offset="100%" stopColor="#0a2a1e" />
        </linearGradient>
        <linearGradient id="ballGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e33535" />
          <stop offset="60%" stopColor="#b01e1e" />
          <stop offset="100%" stopColor="#5a0808" />
        </linearGradient>
        <linearGradient id="batGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e0a75a" />
          <stop offset="100%" stopColor="#8a5a20" />
        </linearGradient>
        <linearGradient id="stumpGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0a75a" />
          <stop offset="100%" stopColor="#8a5a20" />
        </linearGradient>
      </defs>
      {/* Background glows */}
      <ellipse cx="300" cy="200" rx="280" ry="220" fill="url(#heroGlow)" />
      <ellipse cx="180" cy="320" rx="220" ry="160" fill="url(#greenGlow)" />
      {/* Grass mound / pitch */}
      <ellipse cx="280" cy="395" rx="270" ry="62" fill="url(#grassGrad)" opacity="0.95" />
      <ellipse cx="280" cy="392" rx="270" ry="55" fill="#0d4a2a" opacity="0.55" />
      {/* Stumps (far right) */}
      <g transform="translate(430 200)" stroke="url(#stumpGrad)" strokeLinecap="round">
        <line x1="0" y1="0" x2="0" y2="150" strokeWidth="6" />
        <line x1="22" y1="0" x2="22" y2="150" strokeWidth="6" />
        <line x1="44" y1="0" x2="44" y2="150" strokeWidth="6" />
        <line x1="-2" y1="2" x2="46" y2="2" strokeWidth="3" />
        <line x1="-2" y1="12" x2="46" y2="12" strokeWidth="3" />
      </g>
      {/* Helmet */}
      <g transform="translate(190 130)">
        <ellipse cx="80" cy="100" rx="100" ry="100" fill="url(#helmetGrad)" stroke="#f0b429" strokeWidth="2.5" />
        {/* Top shine */}
        <ellipse cx="55" cy="45" rx="28" ry="14" fill="#ffffff" opacity="0.08" />
        {/* Grill */}
        <g stroke="#c8d0d8" strokeWidth="3.2" fill="none" opacity="0.92">
          <path d="M15 110 Q80 200 145 110" />
          <line x1="28" y1="118" x2="132" y2="118" />
          <line x1="35" y1="134" x2="125" y2="134" />
          <line x1="46" y1="150" x2="114" y2="150" />
          <line x1="60" y1="166" x2="100" y2="166" />
        </g>
        {/* Helmet logo crest */}
        <g transform="translate(80 55)">
          <circle r="22" fill="#061428" stroke="#f0b429" strokeWidth="1.8" />
          <text y="7" textAnchor="middle" fontFamily="Georgia, serif" fontSize="22" fontWeight="900" fill="#f0b429">D</text>
        </g>
      </g>
      {/* Cricket ball */}
      <g transform="translate(150 290)">
        <circle cx="45" cy="45" r="45" fill="url(#ballGrad)" stroke="#3a0606" strokeWidth="2.5" />
        {/* Seam */}
        <path d="M14 26 Q45 66 76 26" stroke="#f5e5b8" strokeWidth="1.8" fill="none" strokeDasharray="3 4" opacity="0.9" />
        <path d="M14 64 Q45 104 76 64" stroke="#f5e5b8" strokeWidth="1.8" fill="none" strokeDasharray="3 4" opacity="0.9" />
        {/* Highlight */}
        <ellipse cx="30" cy="28" rx="12" ry="8" fill="#ffffff" opacity="0.22" />
      </g>
      {/* Bat */}
      <g transform="translate(320 260) rotate(-18)">
        <rect x="-8" y="-42" width="16" height="60" rx="4" fill="#6a3f10" />
        <rect x="-8" y="-42" width="16" height="60" rx="4" fill="#8a5a20" opacity="0.6" />
        <rect x="-14" y="14" width="28" height="96" rx="7" fill="url(#batGrad)" stroke="#4a2a0a" strokeWidth="2" />
        <rect x="-14" y="30" width="28" height="2" fill="#4a2a0a" opacity="0.6" />
        <rect x="-14" y="60" width="28" height="2" fill="#4a2a0a" opacity="0.6" />
        <rect x="-14" y="90" width="28" height="2" fill="#4a2a0a" opacity="0.6" />
        <rect x="-14" y="14" width="28" height="96" rx="7" fill="none" stroke="#f0b429" strokeWidth="0.8" opacity="0.5" />
      </g>
      {/* Small sparkles */}
      <g fill="#f0b429" opacity="0.65">
        <circle cx="120" cy="120" r="2" />
        <circle cx="480" cy="90" r="2.2" />
        <circle cx="500" cy="300" r="1.6" />
        <circle cx="70" cy="240" r="1.8" />
      </g>
    </svg>
  );
}