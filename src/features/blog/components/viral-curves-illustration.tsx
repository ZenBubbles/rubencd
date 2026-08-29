// Decorative K-factor curve fan for dark article cards; brighter greens than
// the in-article chart because these sit on a near-black panel.
export function ViralCurvesIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role="img"
      aria-label="Stylized growth curves: flat lines for K below 1, exponential curves for K above 1"
    >
      <line x1="36" y1="262" x2="372" y2="262" stroke="#2a2a2a" strokeWidth="1" />
      <line x1="36" y1="190" x2="372" y2="190" stroke="#1c1c1c" strokeWidth="1" />
      <line x1="36" y1="118" x2="372" y2="118" stroke="#1c1c1c" strokeWidth="1" />
      <line x1="36" y1="46" x2="372" y2="46" stroke="#1c1c1c" strokeWidth="1" />

      <path
        d="M36 260 C 160 259, 280 258, 364 257"
        fill="none"
        stroke="#4a4a46"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M36 260 C 160 258, 280 254, 364 250"
        fill="none"
        stroke="#5f5f5a"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M36 260 C 180 258, 300 250, 364 234"
        fill="none"
        stroke="#3f7a5c"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M36 260 C 190 258, 310 234, 364 186"
        fill="none"
        stroke="#4f9c74"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M36 260 C 200 258, 320 214, 364 110"
        fill="none"
        stroke="#6fc296"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M36 260 C 210 258, 330 196, 364 38"
        fill="none"
        stroke="#9be0ba"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <circle cx="364" cy="257" r="4" fill="#4a4a46" stroke="#0a0a0a" strokeWidth="2" />
      <circle cx="364" cy="250" r="4" fill="#5f5f5a" stroke="#0a0a0a" strokeWidth="2" />
      <circle cx="364" cy="234" r="4" fill="#3f7a5c" stroke="#0a0a0a" strokeWidth="2" />
      <circle cx="364" cy="186" r="4" fill="#4f9c74" stroke="#0a0a0a" strokeWidth="2" />
      <circle cx="364" cy="110" r="4.5" fill="#6fc296" stroke="#0a0a0a" strokeWidth="2" />
      <circle cx="364" cy="38" r="5" fill="#9be0ba" stroke="#0a0a0a" strokeWidth="2" />
    </svg>
  );
}
