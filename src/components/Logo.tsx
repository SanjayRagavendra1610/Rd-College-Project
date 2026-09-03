import React from 'react';
import rdCollegeFullLogo from '../assets/images/rd_college_logo_with_affiliated.png';
import rdCollegeCrest from '../assets/images/rd_college_crest.png';

interface LogoProps {
  variant?: 'light' | 'dark' | 'crest-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  layout?: 'horizontal' | 'stacked';
  showAffiliation?: boolean;
}

/**
 * Authentic RDCCPS Crest Emblem Component using the uploaded official logo
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
        src={rdCollegeCrest}
        alt="RDCCPS Crest Logo"
        className="w-full h-full object-contain filter drop-shadow-xs transition-transform duration-200"
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
}) => {
  if (variant === 'crest-only') {
    const shieldSizes: Record<string, number> = {
      sm: 44,
      md: 58,
      lg: 74,
      xl: 96
    };
    return <RdccpsShieldCrest size={shieldSizes[size] || 58} className={className} />;
  }

  // Exact height scales for the uploaded authentic logo image (aspect ratio ~ 2.41)
  const sizeClasses: Record<string, string> = {
    sm: 'h-11 sm:h-13',
    md: 'h-14 sm:h-16 md:h-18 lg:h-20',
    lg: 'h-18 sm:h-22 md:h-26',
    xl: 'h-24 sm:h-30 md:h-36'
  };

  const currentHeight = sizeClasses[size] || sizeClasses.md;

  // When placed on a dark background (like dark modals or dark footer), wrap in a clean light capsule
  if (variant === 'light') {
    return (
      <div className={`inline-flex items-center bg-white px-3.5 py-2 rounded-xl shadow-md border border-slate-200/40 select-none ${className}`}>
        <img
          src={rdCollegeFullLogo}
          alt="RD College of Commerce and Professional Studies - Affiliated to Bharathiar University"
          className={`${currentHeight} w-auto object-contain max-w-full`}
          referrerPolicy="no-referrer"
          loading="eager"
        />
      </div>
    );
  }

  return (
    <div id="rdccps-official-logo" className={`inline-flex items-center select-none ${className}`}>
      <img
        src={rdCollegeFullLogo}
        alt="RD College of Commerce and Professional Studies - Affiliated to Bharathiar University"
        className={`${currentHeight} w-auto object-contain max-w-full drop-shadow-xs`}
        referrerPolicy="no-referrer"
        loading="eager"
      />
    </div>
  );
};

