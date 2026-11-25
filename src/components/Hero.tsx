import { ArrowRight } from 'lucide-react';
import heroWorkshopImg from '../assets/images/hero_enduro_workshop_1791293882530.jpg';

interface HeroProps {
  onOpenBooking: () => void;
  onScrollToAtelier: () => void;
}

export function Hero({ onOpenBooking, onScrollToAtelier }: HeroProps) {
  return (
    <section className="pt-28 pb-20 lg:pt-36 lg:pb-24 bg-[#FAFAF8] text-[#141413]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Editorial Typographic Statement on Clean Light Canvas */}
        <div className="max-w-4xl mx-auto text-center mb-14 lg:mb-16">
          {/* Unboxed Discipline Kicker */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-heading font-bold text-[#FF5A00] uppercase tracking-[0.2em] mb-5 sm:mb-6">
            <span>Enduro</span>
            <span className="text-[#C9C6BE]" aria-hidden="true">·</span>
            <span>Trail</span>
            <span className="text-[#C9C6BE]" aria-hidden="true">·</span>
            <span>MX</span>
            <span className="text-[#C9C6BE]" aria-hidden="true">·</span>
            <span>Adventure</span>
          </div>

          {/* Bold Stacked Headline */}
          <h1
            className="font-heading font-extrabold uppercase tracking-[-0.03em] leading-[0.9] select-none mb-6 sm:mb-7"
            style={{ fontSize: 'clamp(3rem, 8vw, 6.75rem)', textWrap: 'balance' }}
          >
            <span className="block text-[#141413]">DIRT IS</span>
            <span className="block text-[#FF5A00]">PART OF</span>
            <span className="block text-[#141413]">THE JOB.</span>
          </h1>

          {/* Adapted Atelier Punchline */}
          <p className="font-heading font-bold text-lg sm:text-2xl text-[#141413] tracking-tight max-w-2xl mx-auto mb-3 leading-snug">
            Notre terrain de jeu commence là où la route s’arrête.
          </p>

          <p className="text-sm sm:text-base text-[#6E6D6A] max-w-xl mx-auto mb-9 leading-relaxed">
            Atelier moto indépendant à Mons — entretien, réparation, montage pneus et préparation de précision toutes marques.
          </p>

          {/* Primary & Secondary Actions */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 min-h-[44px] bg-[#FF5A00] hover:bg-[#E04E00] text-white font-medium text-sm rounded-lg transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A00] focus-visible:ring-offset-2"
            >
              <span>Prendre rendez-vous</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onScrollToAtelier}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#141413] hover:text-[#FF5A00] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 py-3 min-h-[44px]"
            >
              <span>Découvrir l’atelier</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {/* Clean Framed 16:9 Workshop Visual */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#141413] border border-[#E6E4DE]">
          <img
            src={heroWorkshopImg}
            alt="Atelier moto Ride Factory à Mons - Préparation et mécanique enduro"
            width={1200}
            height={630}
            fetchPriority="high"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/hero_enduro_workshop.jpg';
            }}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}

