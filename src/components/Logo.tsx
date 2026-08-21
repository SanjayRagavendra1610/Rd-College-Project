import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'crest-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showAffiliation?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'dark', 
  size = 'md', 
  className = '',
  showAffiliation = true
}) => {
  const isLightModeText = variant === 'light'; // used when logo is on dark backgrounds (e.g. footer, hero, dark banners)
  
  // Height sizing for the crest emblem
  const shieldHeights = {
    sm: 32,
    md: 40,
    lg: 50,
    xl: 64
  };

  const shieldHeight = shieldHeights[size] || 54;
  const shieldWidth = Math.round(shieldHeight * 0.88);

  return (
    <div id="rdccps-official-logo" className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official RDCCPS Heraldic Crest Emblem */}
      <div 
        className="relative flex-shrink-0 flex items-center justify-center filter drop-shadow-sm"
        style={{ width: shieldWidth, height: shieldHeight }}
      >
        <svg 
          viewBox="0 0 170 196" 
          className="w-full h-full"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Definitions for Gradients & Clips */}
          <defs>
            {/* Outer Shield Clip Path */}
            <clipPath id="rdccps-shield-clip">
              <path d="M12 12 H158 V105 C158 148 85 186 85 186 C85 186 12 148 12 105 Z" />
            </clipPath>

            {/* Gold Metallic Linear Gradient */}
            <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ECC94B" />
              <stop offset="35%" stopColor="#D69E2E" />
              <stop offset="70%" stopColor="#ECC94B" />
              <stop offset="100%" stopColor="#B7791F" />
            </linearGradient>

            {/* Gold Stroke Gradient */}
            <linearGradient id="gold-border-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F6E05E" />
              <stop offset="50%" stopColor="#D69E2E" />
              <stop offset="100%" stopColor="#B7791F" />
            </linearGradient>
          </defs>

          {/* Outer Shield Shadow / Border */}
          <path 
            d="M10 10 H160 V106 C160 151 85 190 85 190 C85 190 10 151 10 106 Z" 
            fill="#B7791F" 
            stroke="url(#gold-border-gradient)" 
            strokeWidth="4" 
            strokeLinejoin="round"
          />

          {/* Main Shield Body clipped to shape */}
          <g clipPath="url(#rdccps-shield-clip)">
            {/* Lower Quadrants Background: Deep Navy Blue */}
            <rect x="12" y="70" width="146" height="120" fill="#0A2342" />

            {/* Top Banner: Rich Burgundy / Crimson Maroon */}
            <rect x="12" y="12" width="146" height="60" fill="#6B1226" />
            
            {/* Top Banner Inner Accent Line */}
            <rect x="16" y="16" width="138" height="52" fill="none" stroke="#8C1D36" strokeWidth="1" />

            {/* "RDCCPS" Golden Text */}
            <text
              x="85"
              y="53"
              textAnchor="middle"
              fill="url(#gold-gradient)"
              fontFamily="Georgia, 'Times New Roman', serif"
              fontWeight="900"
              fontSize="24"
              letterSpacing="3"
              style={{ filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.5))' }}
            >
              RDCCPS
            </text>

            {/* Grid Dividers in Gold */}
            {/* Horizontal divider under top banner */}
            <rect x="12" y="70" width="146" height="5" fill="url(#gold-gradient)" />
            {/* Horizontal divider between top & bottom quadrants */}
            <line x1="12" y1="126" x2="158" y2="126" stroke="url(#gold-gradient)" strokeWidth="4" />
            {/* Vertical center divider */}
            <line x1="85" y1="70" x2="85" y2="186" stroke="url(#gold-gradient)" strokeWidth="4" />

            {/* ======================================================== */}
            {/* QUADRANT 1 (Top Left): Open Knowledge Book & Quill Pen */}
            {/* ======================================================== */}
            <g transform="translate(24, 82) scale(0.85)">
              {/* Open Book Left & Right Pages */}
              <path
                d="M34 29 C24 25 10 25 3 28 V43 C10 40 24 40 34 44 C44 40 58 40 65 43 V28 C58 25 44 25 34 29 Z"
                fill="#0A2342"
                stroke="url(#gold-gradient)"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {/* Book Spine */}
              <line x1="34" y1="29" x2="34" y2="44" stroke="url(#gold-gradient)" strokeWidth="2.5" />
              {/* Book Page Lines */}
              <path d="M10 32 C17 30 25 30 30 33" stroke="url(#gold-gradient)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M10 36 C17 34 25 34 30 37" stroke="url(#gold-gradient)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M38 33 C43 30 51 30 58 32" stroke="url(#gold-gradient)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M38 37 C43 34 51 34 58 36" stroke="url(#gold-gradient)" strokeWidth="1.5" strokeLinecap="round" />

              {/* Feather Quill Pen (diagonally crossing) */}
              <path
                d="M58 8 C52 14 46 22 40 32 L38 35 L42 34 C48 26 55 17 62 10 C62 9 60 7 58 8 Z"
                fill="url(#gold-gradient)"
              />
              <path
                d="M40 32 L36 38 L41 35"
                stroke="url(#gold-gradient)"
                strokeWidth="1.5"
                fill="none"
              />
            </g>

            {/* ======================================================== */}
            {/* QUADRANT 2 (Top Right): Bar Chart & Rising Trend Arrow */}
            {/* ======================================================== */}
            <g transform="translate(98, 81) scale(0.9)">
              {/* Base Axis */}
              <line x1="4" y1="44" x2="52" y2="44" stroke="url(#gold-gradient)" strokeWidth="2.5" strokeLinecap="round" />
              
              {/* Bar 1 (Short) */}
              <rect x="8" y="30" width="8" height="14" fill="#0A2342" stroke="url(#gold-gradient)" strokeWidth="2" />
              {/* Bar 2 (Medium) */}
              <rect x="22" y="20" width="8" height="24" fill="#0A2342" stroke="url(#gold-gradient)" strokeWidth="2" />
              {/* Bar 3 (Tall) */}
              <rect x="36" y="10" width="8" height="34" fill="#0A2342" stroke="url(#gold-gradient)" strokeWidth="2" />

              {/* Upward Growth Arrow Line */}
              <path
                d="M6 34 L18 24 L30 16 L48 6"
                stroke="url(#gold-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              {/* Arrow Head */}
              <path
                d="M40 6 H48 V14"
                stroke="url(#gold-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>

            {/* ======================================================== */}
            {/* QUADRANT 3 (Bottom Left): Classical Pillar / Column */}
            {/* ======================================================== */}
            <g transform="translate(32, 134) scale(0.85)">
              {/* Column Capital (Top Abacus & Volute scrolls) */}
              <rect x="6" y="2" width="36" height="4" rx="1" fill="url(#gold-gradient)" />
              <path
                d="M8 6 C5 6 4 9 7 10 C12 10 14 6 18 6 H30 C34 6 36 10 41 10 C44 9 43 6 40 6"
                stroke="url(#gold-gradient)"
                strokeWidth="2"
                fill="none"
              />
              {/* Shaft Flutes */}
              <rect x="11" y="10" width="26" height="26" fill="#0A2342" stroke="url(#gold-gradient)" strokeWidth="2" />
              <line x1="17" y1="10" x2="17" y2="36" stroke="url(#gold-gradient)" strokeWidth="1.5" />
              <line x1="24" y1="10" x2="24" y2="36" stroke="url(#gold-gradient)" strokeWidth="1.5" />
              <line x1="31" y1="10" x2="31" y2="36" stroke="url(#gold-gradient)" strokeWidth="1.5" />
              {/* Base Plinth (Bottom steps) */}
              <rect x="9" y="36" width="30" height="4" fill="url(#gold-gradient)" />
              <rect x="6" y="40" width="36" height="4" rx="1" fill="url(#gold-gradient)" />
            </g>

            {/* ======================================================== */}
            {/* QUADRANT 4 (Bottom Right): Scales of Justice */}
            {/* ======================================================== */}
            <g transform="translate(98, 134) scale(0.85)">
              {/* Center Pillar */}
              <line x1="28" y1="4" x2="28" y2="42" stroke="url(#gold-gradient)" strokeWidth="2.5" />
              {/* Top Ring / Finial */}
              <circle cx="28" cy="5" r="3" fill="#0A2342" stroke="url(#gold-gradient)" strokeWidth="2" />
              
              {/* Balance Beam */}
              <line x1="8" y1="12" x2="48" y2="12" stroke="url(#gold-gradient)" strokeWidth="2.5" strokeLinecap="round" />
              
              {/* Left Pan Suspension Cords */}
              <path d="M9 12 L4 26 L14 26 Z" stroke="url(#gold-gradient)" strokeWidth="1.2" fill="none" />
              {/* Left Scale Pan */}
              <path d="M3 26 Q9 31 15 26 Z" fill="url(#gold-gradient)" />

              {/* Right Pan Suspension Cords */}
              <path d="M47 12 L42 26 L52 26 Z" stroke="url(#gold-gradient)" strokeWidth="1.2" fill="none" />
              {/* Right Scale Pan */}
              <path d="M41 26 Q47 31 53 26 Z" fill="url(#gold-gradient)" />

              {/* Pedestal Base */}
              <path d="M21 42 H35 L38 46 H18 Z" fill="url(#gold-gradient)" />
            </g>
          </g>

          {/* Inner Inset Gold Line along Shield Border */}
          <path 
            d="M16 16 H154 V104 C154 144 85 180 85 180 C85 180 16 144 16 104 Z" 
            fill="none" 
            stroke="url(#gold-gradient)" 
            strokeWidth="1.5" 
          />
        </svg>
      </div>

      {/* Typography Identity Section */}
      {variant !== 'crest-only' && (
        <div className="flex flex-col justify-center leading-none">
          {/* Main Title in a single line: RD College of Commerce & Professional Studies */}
          <div className="flex items-baseline flex-wrap gap-x-1.5 leading-tight">
            <span 
              className={`font-serif tracking-tight font-extrabold transition-colors whitespace-nowrap ${
                size === 'sm' 
                  ? 'text-sm sm:text-base' 
                  : size === 'lg' 
                    ? 'text-lg sm:text-2xl' 
                    : size === 'xl' 
                      ? 'text-2xl sm:text-3xl' 
                      : 'text-base sm:text-xl'
              } ${
                isLightModeText 
                  ? 'text-rose-200 drop-shadow-xs' 
                  : 'text-[#741527]'
              }`}
              style={{ 
                fontFamily: "'Cinzel', 'Playfair Display', Georgia, 'Times New Roman', serif"
              }}
            >
              RD College
            </span>

            <span 
              className={`font-serif font-bold tracking-tight whitespace-nowrap ${
                size === 'sm' 
                  ? 'text-xs sm:text-sm' 
                  : size === 'lg' 
                    ? 'text-sm sm:text-lg' 
                    : size === 'xl' 
                      ? 'text-base sm:text-xl' 
                      : 'text-xs sm:text-base'
              } ${
                isLightModeText ? 'text-slate-100' : 'text-[#0A2342]'
              }`}
              style={{ 
                fontFamily: "'Outfit', 'Plus Jakarta Sans', Georgia, sans-serif"
              }}
            >
              of Commerce &amp; Professional Studies
            </span>
          </div>

          {/* Affiliation tagline */}
          {showAffiliation && (
            <span 
              className={`text-[9.5px] sm:text-[10.5px] font-medium tracking-normal mt-0.5 whitespace-nowrap ${
                isLightModeText ? 'text-slate-300' : 'text-slate-500'
              }`}
            >
              Affiliated to Bharathiar University
            </span>
          )}
        </div>
      )}
    </div>
  );
};
