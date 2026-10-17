import { useState, useEffect } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export function Logo({
  className = '',
  size = 'md',
  showSubtitle = false,
}: LogoProps) {
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [logoMode, setLogoMode] = useState<'full' | 'icon'>('full');

  useEffect(() => {
    const loadLogo = () => {
      const saved = localStorage.getItem('ride_factory_custom_logo');
      const mode = (localStorage.getItem('ride_factory_custom_logo_mode') as 'full' | 'icon') || 'full';
      setCustomLogo(saved);
      setLogoMode(mode);
    };

    loadLogo();
    window.addEventListener('ride-factory-logo-changed', loadLogo);
    window.addEventListener('storage', loadLogo);

    return () => {
      window.removeEventListener('ride-factory-logo-changed', loadLogo);
      window.removeEventListener('storage', loadLogo);
    };
  }, []);

  const sizeMap = {
    sm: {
      icon: 'w-7 h-7',
      imgHeight: 'h-7',
      text: 'text-xl',
      sub: 'text-[9px] tracking-[0.2em]',
      gap: 'gap-2.5',
    },
    md: {
      icon: 'w-9 h-9',
      imgHeight: 'h-9',
      text: 'text-2xl',
      sub: 'text-[10px] tracking-[0.25em]',
      gap: 'gap-3',
    },
    lg: {
      icon: 'w-12 h-12',
      imgHeight: 'h-12',
      text: 'text-3xl sm:text-4xl',
      sub: 'text-xs tracking-[0.3em]',
      gap: 'gap-3.5',
    },
    xl: {
      icon: 'w-16 h-16',
      imgHeight: 'h-16',
      text: 'text-4xl sm:text-5xl',
      sub: 'text-sm tracking-[0.35em]',
      gap: 'gap-4',
    },
  };

  const current = sizeMap[size];

  // If a full custom logo is stored and configured as complete logo
  if (customLogo && logoMode === 'full') {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src={customLogo}
          alt="Ride Factory Mons"
          className={`${current.imgHeight} w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]`}
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center ${current.gap} select-none ${className}`}>
      {/* Official Motorsport RF Crest Emblem / Custom Icon */}
      <div className={`relative ${current.icon} shrink-0 rounded-lg overflow-hidden border border-[#FF6600]/80 shadow-[0_0_15px_rgba(255,102,0,0.25)] bg-[#0A0A0A] flex items-center justify-center group-hover:border-[#FF6600] group-hover:shadow-[0_0_20px_rgba(255,102,0,0.45)] transition-all`}>
        {customLogo && logoMode === 'icon' ? (
          <img
            src={customLogo}
            alt="Ride Factory Emblem"
            className="w-full h-full object-contain p-1"
          />
        ) : (
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-0.5"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="logo-rf-orange" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF7A1A" />
                <stop offset="100%" stopColor="#FF5500" />
              </linearGradient>
            </defs>
            {/* Subtle speed hatch lines */}
            <path d="M48 8L56 16" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M52 8L58 14" stroke="#222222" strokeWidth="1" strokeLinecap="round" />

            {/* Motorsport RF Speed Geometry */}
            <path
              d="M14 49L21 15H36C42.5 15 46.5 18.5 45.5 24C44.8 28 41.5 30.5 37 31.5L46 49H36.5L29 33.5H23.5L20.5 49H14Z"
              fill="#F5F5F2"
            />
            <path
              d="M25 21L23.5 28H33C35.5 28 37 26.8 37.5 24.5C38 22.2 36.8 21 34.2 21H25Z"
              fill="#0A0A0A"
            />
            <path
              d="M37 15L33.5 28L43 28L44.5 23H49L51 15H37Z"
              fill="url(#logo-rf-orange)"
            />
            <polygon
              points="12,51 52,51 50,47 10,47"
              fill="url(#logo-rf-orange)"
            />
          </svg>
        )}
      </div>

      {/* Motorsport Typographic Lockup */}
      <div className="flex flex-col leading-none">
        <span className={`font-heading font-black italic text-[#F5F5F2] uppercase tracking-wider ${current.text}`}>
          RIDE <span className="text-[#FF6600]">FACTORY</span>
        </span>
        {showSubtitle && (
          <span className={`font-mono font-bold text-[#A3A3A3] uppercase mt-1 ${current.sub}`}>
            ATELIER MOTO · MONS
          </span>
        )}
      </div>
    </div>
  );
}
