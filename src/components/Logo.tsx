interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  tone?: 'dark' | 'light';
}

export function Logo({
  className = '',
  size = 'md',
  showSubtitle = false,
  tone = 'dark',
}: LogoProps) {
  const sizeMap = {
    sm: {
      icon: 'w-7 h-7',
      text: 'text-lg',
      sub: 'text-[11px]',
      gap: 'gap-2.5',
    },
    md: {
      icon: 'w-8 h-8',
      text: 'text-xl',
      sub: 'text-xs',
      gap: 'gap-3',
    },
    lg: {
      icon: 'w-10 h-10',
      text: 'text-2xl',
      sub: 'text-xs',
      gap: 'gap-3',
    },
  };

  const current = sizeMap[size];
  const primaryText = tone === 'light' ? 'text-[#FAFAF8]' : 'text-[#141413]';
  const subtitleText = tone === 'light' ? 'text-[#A3A3A3]' : 'text-[#6E6D6A]';

  return (
    <div className={`inline-flex items-center ${current.gap} select-none whitespace-nowrap shrink-0 ${className}`}>
      <div
        className={`relative ${current.icon} shrink-0 rounded-lg overflow-hidden bg-[#141413] flex items-center justify-center transition-transform duration-200 group-hover:scale-[1.03]`}
      >
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="logo-rf-orange-clean" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF7A1A" />
              <stop offset="100%" stopColor="#FF5A00" />
            </linearGradient>
          </defs>
          <path
            d="M14 49L21 15H36C42.5 15 46.5 18.5 45.5 24C44.8 28 41.5 30.5 37 31.5L46 49H36.5L29 33.5H23.5L20.5 49H14Z"
            fill="#FAFAF8"
          />
          <path
            d="M25 21L23.5 28H33C35.5 28 37 26.8 37.5 24.5C38 22.2 36.8 21 34.2 21H25Z"
            fill="#141413"
          />
          <path
            d="M37 15L33.5 28L43 28L44.5 23H49L51 15H37Z"
            fill="url(#logo-rf-orange-clean)"
          />
          <polygon
            points="12,51 52,51 50,47 10,47"
            fill="url(#logo-rf-orange-clean)"
          />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span className={`font-heading font-extrabold tracking-tight ${primaryText} ${current.text} whitespace-nowrap`}>
          Ride <span className="text-[#FF5A00]">Factory</span>
        </span>
        {showSubtitle && (
          <span className={`font-sans font-medium ${subtitleText} mt-1 ${current.sub}`}>
            Atelier moto · Mons
          </span>
        )}
      </div>
    </div>
  );
}
