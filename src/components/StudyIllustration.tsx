export function StudyIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration of a student reading a book next to a stack of books"
    >
      <ellipse cx="200" cy="330" rx="150" ry="18" fill="var(--brand-charcoal)" opacity="0.08" />

      {/* book stack */}
      <g>
        <rect x="60" y="270" width="90" height="20" rx="6" fill="var(--brand-orange)" />
        <rect x="68" y="248" width="78" height="20" rx="6" fill="var(--brand-gold)" />
        <rect x="60" y="226" width="90" height="20" rx="6" fill="var(--brand-charcoal-2)" />
      </g>

      {/* seated student */}
      <g>
        {/* crossed legs */}
        <path
          d="M170 300 Q200 330 230 300 Q245 315 260 300 L255 320 Q225 345 200 335 Q175 345 145 320 L170 300 Z"
          fill="var(--brand-charcoal)"
        />
        {/* torso */}
        <rect x="168" y="205" width="64" height="90" rx="26" fill="var(--brand-orange)" />
        {/* left arm to book */}
        <rect x="150" y="225" width="34" height="18" rx="9" fill="var(--brand-orange-dark)" />
        {/* right arm to book */}
        <rect x="216" y="225" width="34" height="18" rx="9" fill="var(--brand-orange-dark)" />
        {/* head */}
        <circle cx="200" cy="175" r="34" fill="#e7b78c" />
        {/* hair */}
        <path
          d="M166 168 Q166 132 200 130 Q234 132 234 168 Q220 152 200 152 Q180 152 166 168 Z"
          fill="var(--brand-charcoal)"
        />
        {/* open book */}
        <g transform="translate(200 236)">
          <path d="M-38 -6 L0 2 L0 26 L-38 20 Z" fill="#fdf8f0" stroke="var(--brand-charcoal)" strokeWidth="2" />
          <path d="M38 -6 L0 2 L0 26 L38 20 Z" fill="#fdf8f0" stroke="var(--brand-charcoal)" strokeWidth="2" />
          <line x1="-30" y1="2" x2="-6" y2="6" stroke="var(--brand-charcoal)" strokeOpacity="0.35" strokeWidth="2" />
          <line x1="-30" y1="9" x2="-6" y2="13" stroke="var(--brand-charcoal)" strokeOpacity="0.35" strokeWidth="2" />
          <line x1="30" y1="2" x2="6" y2="6" stroke="var(--brand-charcoal)" strokeOpacity="0.35" strokeWidth="2" />
          <line x1="30" y1="9" x2="6" y2="13" stroke="var(--brand-charcoal)" strokeOpacity="0.35" strokeWidth="2" />
        </g>
      </g>

      {/* floating pencil */}
      <g className="animate-float" style={{ transformOrigin: "320px 100px", animationDelay: "0.3s" }}>
        <g transform="translate(300 70) rotate(35)">
          <rect x="0" y="0" width="14" height="60" rx="4" fill="var(--brand-gold)" />
          <path d="M0 60 L14 60 L7 74 Z" fill="#8a6d1f" />
          <rect x="0" y="-10" width="14" height="12" rx="3" fill="var(--brand-charcoal)" />
        </g>
      </g>

      {/* floating star */}
      <g className="animate-float" style={{ transformOrigin: "80px 120px", animationDelay: "0.9s" }}>
        <path
          transform="translate(65 100)"
          d="M15 0 L19 11 L31 11 L21 18 L25 30 L15 22 L5 30 L9 18 L-1 11 L11 11 Z"
          fill="var(--brand-orange)"
        />
      </g>

      {/* floating lightbulb */}
      <g className="animate-float" style={{ transformOrigin: "330px 260px", animationDelay: "1.4s" }}>
        <g transform="translate(315 245)">
          <circle cx="12" cy="12" r="14" fill="var(--brand-gold-light)" />
          <rect x="7" y="24" width="10" height="8" rx="2" fill="var(--brand-charcoal)" />
        </g>
      </g>
    </svg>
  );
}
