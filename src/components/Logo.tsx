import React from 'react';

export function Logo({ className = '' }: { className?: string }) {
  const bg = "#1B422B";
  const fg = "#F8FAF7";

  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="100" height="100" fill={bg} rx="20"/>
      {/* Separator Lines */}
      <line x1="48" y1="12" x2="48" y2="88" stroke={fg} strokeWidth="3" strokeLinecap="round" />
      <line x1="12" y1="48" x2="44" y2="48" stroke={fg} strokeWidth="3" strokeLinecap="round" />
      <line x1="52" y1="48" x2="88" y2="48" stroke={fg} strokeWidth="3" strokeLinecap="round" />

      {/* Top Left: Circle with droplet */}
      <circle cx="30" cy="28" r="10" stroke={fg} strokeWidth="2.5" />
      <path d="M30 23.5 C30 23.5 27.5 27 27.5 29 C27.5 30.5 28.5 31.5 30 31.5 C31.5 31.5 32.5 30.5 32.5 29 C32.5 27 30 23.5 30 23.5 Z" fill={fg} />

      {/* Bottom Left: 4 Lines */}
      <line x1="18" y1="60" x2="40" y2="60" stroke={fg} strokeWidth="3.5" strokeLinecap="round" />
      <line x1="18" y1="68" x2="40" y2="68" stroke={fg} strokeWidth="3.5" strokeLinecap="round" />
      <line x1="18" y1="76" x2="40" y2="76" stroke={fg} strokeWidth="3.5" strokeLinecap="round" />
      <line x1="18" y1="84" x2="40" y2="84" stroke={fg} strokeWidth="3.5" strokeLinecap="round" />

      {/* Top Right: Leaves */}
      {/* We'll use simple ellipses that are rotated */}
      <g fill={fg}>
        <ellipse cx="60" cy="24" rx="4" ry="7" transform="rotate(45 60 24)" />
        <ellipse cx="78" cy="26" rx="4" ry="7" transform="rotate(-30 78 26)" />
        <ellipse cx="68" cy="36" rx="4" ry="7" transform="rotate(-60 68 36)" />
      </g>
      
      {/* Bottom Right: circles and coffee bean */}
      <circle cx="62" cy="62" r="4.5" fill={fg} />
      <circle cx="78" cy="62" r="4.5" fill={fg} />
      <circle cx="62" cy="78" r="4.5" fill={fg} />
      
      {/* Bean */}
      <g transform="translate(78, 78) rotate(-30)">
        <ellipse cx="0" cy="0" rx="3.5" ry="5.5" fill={fg} />
        <path d="M-1,-4 C 1,-2 1,2 -1,4" stroke={bg} strokeWidth="1" fill="none" />
      </g>
    </svg>
  );
}
