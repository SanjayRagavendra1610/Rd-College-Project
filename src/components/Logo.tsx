import React from 'react';
import rdCollegeLogo from '../assets/images/rd_college_logo.jpg';

interface LogoProps {
  variant?: 'light' | 'dark' | 'crest-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  layout?: 'horizontal' | 'stacked';
  showAffiliation?: boolean;
}

/**
 * Exact RDCCPS Crest Emblem Component using the uploaded official logo image
 */
export const RdccpsShieldCrest: React.FC<{ size?: number | string; className?: string }> = ({ 
  size = 48, 
  className = '' 
}) => {
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <div 
      className={`inline-flex items-center justify-center flex-shrink-0 select-none ${className}`}
      style={{ width: pixelSize, height: pixelSize }}
    >
      <img
        src={rdCollegeLogo}
        alt="RDCCPS Crest Logo"
        className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-200"
        referrerPolicy="no-referrer"
        loading="eager"
      />
    </div>
  );
};

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'dark', 
  size = 'md', 
  className = '', 
  layout = 'horizontal',
  showAffiliation = true
}) => {
  const isLightModeText = variant === 'light'; // used when logo is on dark backgrounds (e.g. footer, hero, modals)
  
  // Sizing for the crest emblem
  const shieldSizes: Record<string, number> = {
    sm: 38,
    md: 48,
    lg: 60,
    xl: 78
  };

  const shieldPx = shieldSizes[size] || 48;

  if (variant === 'crest-only') {
    return <RdccpsShieldCrest size={shieldPx} className={className} />;
  }

  return (
    <div id="rdccps-official-logo" className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Official RDCCPS Logo Image */}
      <div 
        className="relative flex-shrink-0 flex items-center justify-center rounded-lg overflow-hidden bg-white/95 p-0.5 shadow-sm border border-amber-200/50"
        style={{ width: shieldPx + 4, height: shieldPx + 4 }}
      >
        <img 
          src={rdCollegeLogo}
          alt="RDCCPS - RD College of Commerce & Professional Studies" 
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Typography Identity Section */}
      {layout === 'horizontal' ? (
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span 
              className={`font-black tracking-wider uppercase leading-none ${
                size === 'sm' 
                  ? 'text-sm sm:text-base' 
                  : size === 'lg' 
                    ? 'text-lg sm:text-2xl' 
                    : size === 'xl'
                      ? 'text-xl sm:text-3xl'
                      : 'text-base sm:text-xl'
              } ${
                isLightModeText 
                  ? 'text-amber-300 drop-shadow-xs' 
                  : 'text-[#6A101F]'
              }`}
              style={{ 
                fontFamily: "'EB Garamond', 'Playfair Display', Georgia, 'Times New Roman', serif"
              }}
            >
              RD COLLEGE
            </span>
            <span 
              className={`font-semibold tracking-normal leading-none ${
                size === 'sm' 
                  ? 'text-[11px] sm:text-xs' 
                  : size === 'lg' 
                    ? 'text-sm sm:text-base' 
                    : size === 'xl'
                      ? 'text-base sm:text-lg'
                      : 'text-xs sm:text-sm'
              } ${
                isLightModeText ? 'text-slate-100' : 'text-[#0B2342]'
              }`}
              style={{ 
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}
            >
              OF COMMERCE
            </span>
          </div>

          <div className="flex items-center gap-1.5 mt-0.5">
            <span 
              className={`font-bold tracking-tight text-[10px] sm:text-[11px] ${
                isLightModeText ? 'text-amber-400 font-extrabold' : 'text-amber-700'
              }`}
            >
              &amp; PROFESSIONAL STUDIES
            </span>
            {showAffiliation && (
              <>
                <span className="text-slate-400 text-[10px] hidden sm:inline">•</span>
                <span 
                  className={`text-[9px] sm:text-[10px] font-medium hidden sm:inline ${
                    isLightModeText ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  Affiliated to Bharathiar University
                </span>
              </>
            )}
          </div>
        </div>
      ) : (
        /* Stacked Layout (Used in Footer & Hero Banners) */
        <div className="flex flex-col">
          <span 
            className={`font-extrabold tracking-wide uppercase leading-tight ${
              size === 'sm' 
                ? 'text-xs' 
                : size === 'lg' 
                  ? 'text-lg sm:text-xl' 
                  : size === 'xl'
                    ? 'text-xl sm:text-2xl'
                    : 'text-sm sm:text-base'
            } ${
              isLightModeText 
                ? 'text-amber-300 drop-shadow-xs' 
                : 'text-[#6A101F]'
            }`}
            style={{ 
              fontFamily: "'EB Garamond', 'Playfair Display', Georgia, 'Times New Roman', serif"
            }}
          >
            RD COLLEGE OF COMMERCE
          </span>
          <span 
            className={`font-bold tracking-normal leading-tight text-xs sm:text-sm ${
              isLightModeText ? 'text-slate-200' : 'text-[#0B2342]'
            }`}
            style={{ 
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}
          >
            &amp; PROFESSIONAL STUDIES
          </span>
          {showAffiliation && (
            <span 
              className={`font-medium tracking-normal mt-0.5 whitespace-nowrap ${
                size === 'sm' ? 'text-[8.5px] sm:text-[9.5px]' : size === 'lg' ? 'text-[11px] sm:text-xs' : 'text-[9.5px] sm:text-[10.5px]'
              } ${
                isLightModeText ? 'text-amber-200/90' : 'text-slate-500'
              }`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Affiliated to Bharathiar University, Coimbatore
            </span>
          )}
        </div>
      )}
    </div>
  );
};
