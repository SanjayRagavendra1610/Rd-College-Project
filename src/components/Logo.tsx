import React from 'react';
import officialLogoImg from '../assets/images/rdccps_official_logo_1787533856457.jpg';

interface LogoProps {
  variant?: 'light' | 'dark' | 'crest-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  layout?: 'stacked' | 'inline';
  className?: string;
  showAffiliation?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'dark', 
  size = 'md', 
  layout = 'stacked',
  className = '',
  showAffiliation = true
}) => {
  const isLightModeText = variant === 'light'; // used when logo is on dark backgrounds (e.g. footer, hero, dark banners)
  
  // Height sizing for the crest emblem
  const shieldHeights = {
    sm: 38,
    md: 48,
    lg: 60,
    xl: 76
  };

  const shieldHeight = shieldHeights[size] || 48;
  const shieldWidth = Math.round(shieldHeight * (180 / 216));

  return (
    <div id="rdccps-official-logo" className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Official RDCCPS Heraldic Crest Emblem Image / Vector */}
      <div 
        className="relative flex-shrink-0 flex items-center justify-center filter drop-shadow-md rounded-lg overflow-hidden"
        style={{ width: shieldWidth, height: shieldHeight }}
      >
        <img 
          src={officialLogoImg}
          alt="RDCCPS Official Crest Logo" 
          className="w-full h-full object-contain filter drop-shadow-sm"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Typography Identity Section */}
      {variant !== 'crest-only' && (
        <div className="flex flex-col justify-center leading-none min-w-0">
          {layout === 'inline' ? (
            /* Inline Layout */
            <div className="flex items-baseline flex-wrap gap-x-1 sm:gap-x-1.5 leading-tight">
              <span 
                className={`font-serif tracking-tight font-black transition-colors whitespace-nowrap ${
                  size === 'sm' 
                    ? 'text-xs sm:text-base' 
                    : size === 'lg' 
                      ? 'text-base sm:text-2xl' 
                      : size === 'xl' 
                        ? 'text-xl sm:text-3xl' 
                        : 'text-sm sm:text-xl'
                } ${
                  isLightModeText 
                    ? 'text-rose-200 drop-shadow-xs' 
                    : 'text-[#7B1124]'
                }`}
                style={{ 
                  fontFamily: "'EB Garamond', 'Playfair Display', Georgia, 'Times New Roman', serif"
                }}
              >
                RD College
              </span>

              <span 
                className={`font-serif font-extrabold tracking-tight whitespace-nowrap ${
                  size === 'sm' 
                    ? 'text-[11px] sm:text-sm' 
                    : size === 'lg' 
                      ? 'text-xs sm:text-lg' 
                      : size === 'xl' 
                        ? 'text-sm sm:text-xl' 
                        : 'text-xs sm:text-base'
                } ${
                  isLightModeText ? 'text-slate-100' : 'text-[#0A2342]'
                }`}
                style={{ 
                  fontFamily: "'EB Garamond', 'Playfair Display', Georgia, 'Times New Roman', serif"
                }}
              >
                of Commerce &amp; Professional Studies
              </span>
            </div>
          ) : (
            /* Stacked Official Layout (Matching the official emblem typography) */
            <div className="flex flex-col justify-center">
              {/* Line 1: RD College */}
              <span 
                className={`font-serif tracking-tight font-black transition-colors leading-[1.05] ${
                  size === 'sm' 
                    ? 'text-sm sm:text-base' 
                    : size === 'lg' 
                      ? 'text-xl sm:text-2xl' 
                      : size === 'xl' 
                        ? 'text-2xl sm:text-3xl' 
                        : 'text-base sm:text-lg'
                } ${
                  isLightModeText 
                    ? 'text-rose-300 drop-shadow-xs' 
                    : 'text-[#7B1124]'
                }`}
                style={{ 
                  fontFamily: "'EB Garamond', 'Playfair Display', Georgia, 'Times New Roman', serif"
                }}
              >
                RD College
              </span>

              {/* Line 2: of Commerce and */}
              <span 
                className={`font-serif font-extrabold tracking-tight leading-[1.1] ${
                  size === 'sm' 
                    ? 'text-[10px] sm:text-xs' 
                    : size === 'lg' 
                      ? 'text-sm sm:text-base' 
                      : size === 'xl' 
                        ? 'text-base sm:text-lg' 
                        : 'text-xs sm:text-sm'
                } ${
                  isLightModeText ? 'text-slate-100' : 'text-[#0A2342]'
                }`}
                style={{ 
                  fontFamily: "'EB Garamond', 'Playfair Display', Georgia, 'Times New Roman', serif"
                }}
              >
                of Commerce and
              </span>

              {/* Line 3: Professional Studies */}
              <span 
                className={`font-serif font-extrabold tracking-tight leading-[1.1] ${
                  size === 'sm' 
                    ? 'text-[10px] sm:text-xs' 
                    : size === 'lg' 
                      ? 'text-sm sm:text-base' 
                      : size === 'xl' 
                        ? 'text-base sm:text-lg' 
                        : 'text-xs sm:text-sm'
                } ${
                  isLightModeText ? 'text-slate-100' : 'text-[#0A2342]'
                }`}
                style={{ 
                  fontFamily: "'EB Garamond', 'Playfair Display', Georgia, 'Times New Roman', serif"
                }}
              >
                Professional Studies
              </span>
            </div>
          )}

          {/* Affiliation tagline: Affiliated to Bharathiar University */}
          {showAffiliation && (
            <span 
              className={`font-medium tracking-normal mt-0.5 whitespace-nowrap ${
                size === 'sm' ? 'text-[8.5px] sm:text-[9.5px]' : size === 'lg' ? 'text-[11px] sm:text-xs' : 'text-[9.5px] sm:text-[10.5px]'
              } ${
                isLightModeText ? 'text-slate-300' : 'text-slate-600'
              }`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Affiliated to Bharathiar University
            </span>
          )}
        </div>
      )}
    </div>
  );
};

