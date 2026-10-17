import { ArrowRight, Wrench, ShieldCheck, MapPin } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onScrollToAtelier: () => void;
}

export function Hero({ onOpenBooking, onScrollToAtelier }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-end pb-16 lg:pb-24 pt-28 sm:pt-36 overflow-hidden">
      {/* Background Image with Cinematic Dark Scrim */}
      <div className="absolute inset-0 z-0 select-none">
        <img
          src="/src/assets/images/hero_enduro_workshop_1791293882530.jpg"
          alt="Atelier moto Ride Factory à Mons - Préparation et mécanique enduro"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.62] contrast-[1.12]"
        />
        {/* Scrims & industrial lighting atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-[#080808]/30" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#080808]/30 to-[#080808]/85" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080808] to-transparent" />
      </div>

      {/* Grid texture overlay for subtle technical feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          {/* Subtle location & status badge */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#A3A3A3] uppercase tracking-wider mb-5">
            <span className="flex items-center gap-1.5 text-[#F5F5F2]">
              <span className="w-2 h-2 bg-[#FF6600]" />
              ATELIER MOTO · MONS
            </span>
            <span aria-hidden="true" className="text-[#333333]">/</span>
            <span className="text-[#A3A3A3]">PETITE RUE DES PRÉS 1</span>
            <span aria-hidden="true" className="text-[#333333]">/</span>
            <span className="text-[#A3A3A3]">7000 MONS · BELGIQUE</span>
          </div>

          {/* Huge motorsport title */}
          <h1 className="font-heading font-black text-5xl sm:text-7xl lg:text-8xl xl:text-9xl leading-[0.92] text-[#F5F5F2] uppercase tracking-tight mb-6 text-balance">
            ENTRETENIR.<br />
            RÉPARER.<br />
            PRÉPARER.<br />
            <span className="text-[#FF6600]">ROULER.</span>
          </h1>

          {/* Subtitle tag */}
          <div className="flex items-center gap-3 text-sm sm:text-base font-heading font-semibold text-[#FF6600] uppercase tracking-widest mb-4">
            <span>Enduro</span>
            <span className="text-[#333333]">·</span>
            <span>Trail</span>
            <span className="text-[#333333]">·</span>
            <span>Motocross</span>
            <span className="text-[#333333]">·</span>
            <span>Adventure</span>
          </div>

          {/* Concrete value proposition */}
          <p className="text-base sm:text-lg lg:text-xl text-[#A3A3A3] max-w-2xl leading-relaxed mb-8 font-normal">
            Ride Factory prend en charge l'entretien, la réparation et la préparation de votre moto.
            Un atelier rigoureux dédié aux passionnés de mécanique pure et de tout-terrain à Mons.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#FF6600] text-[#080808] font-heading font-bold text-base uppercase tracking-wider hover:bg-[#E65C00] transition-colors cursor-pointer select-none active:scale-[0.99] shadow-lg shadow-[#FF6600]/20"
            >
              <span>PRENDRE RENDEZ-VOUS</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              onClick={onScrollToAtelier}
              className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-transparent border border-[#333333] hover:border-[#F5F5F2] text-[#F5F5F2] font-heading font-semibold text-base uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>DÉCOUVRIR L'ATELIER</span>
            </button>
          </div>

          {/* Trust markers / Proof stats bar */}
          <div className="mt-12 pt-6 border-t border-[#1A1A1A] grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-xl text-left">
            <div>
              <div className="font-heading font-bold text-2xl text-[#F5F5F2] tabular-nums">09:00 — 18:00</div>
              <div className="text-[11px] font-mono text-[#A3A3A3] uppercase mt-0.5">Lun – Sam · Centre de Mons</div>
            </div>
            <div>
              <div className="font-heading font-bold text-2xl text-[#FF6600] tabular-nums">100% OFF-ROAD</div>
              <div className="text-[11px] font-mono text-[#A3A3A3] uppercase mt-0.5">Enduro · Trail · MX · Adv</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="font-heading font-bold text-2xl text-[#F5F5F2]">MONS CENTRE</div>
              <div className="text-[11px] font-mono text-[#A3A3A3] uppercase mt-0.5">Petite Rue des Prés 1</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
