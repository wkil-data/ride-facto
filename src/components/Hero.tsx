import { ArrowRight } from 'lucide-react';
import heroEnduroImg from '../assets/images/hero_enduro_workshop_1791293882530.jpg';

interface HeroProps {
  onOpenBooking: () => void;
  onScrollToAtelier: () => void;
}

export function Hero({ onOpenBooking, onScrollToAtelier }: HeroProps) {
  return (
    <section className="pt-28 pb-20 lg:pt-40 lg:pb-28 bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Intro Block */}
        <div className="max-w-3xl mb-14 lg:mb-16">
          <p className="text-sm font-medium text-[#FF5A00] mb-4">
            Atelier moto indépendant · Mons, Belgique
          </p>

          <h1
            className="font-heading font-extrabold text-[#141413] tracking-tight leading-[1.06] mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', textWrap: 'balance' }}
          >
            Entretien, réparation et préparation moto de précision.
          </h1>

          <p className="text-base sm:text-lg text-[#6E6D6A] leading-relaxed max-w-2xl mb-9">
            Ride Factory prend en charge votre machine avec une rigueur d’atelier dédiée aux passionnés d’enduro, de trail, de motocross et d’adventure.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#FF5A00] hover:bg-[#E04E00] text-white font-medium text-sm rounded-lg transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A00] focus-visible:ring-offset-2"
            >
              <span>Prendre rendez-vous</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onScrollToAtelier}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#141413] hover:text-[#FF5A00] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 py-2"
            >
              <span>Découvrir les prestations</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {/* Clean Framed 16:9 Workshop Visual */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#141413]">
          <img
            src={heroEnduroImg}
            alt="Atelier moto Ride Factory à Mons - Préparation et mécanique enduro"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/hero_enduro_workshop.jpg';
            }}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Quiet Factual Strip Underneath */}
        <div className="mt-8 pt-6 border-t border-[#E6E4DE] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <div>
            <div className="text-[#6E6D6A] text-xs mb-1">Adresse</div>
            <div className="font-medium text-[#141413]">Petite Rue des Prés 1, 7000 Mons</div>
          </div>
          <div>
            <div className="text-[#6E6D6A] text-xs mb-1">Horaires d’ouverture</div>
            <div className="font-medium text-[#141413] tabular-nums">Lun – Sam · 09:00 – 18:00</div>
          </div>
          <div>
            <div className="text-[#6E6D6A] text-xs mb-1">Téléphone & WhatsApp</div>
            <a
              href="tel:+32470556696"
              className="font-medium text-[#141413] hover:text-[#FF5A00] transition-colors tabular-nums"
            >
              0470/55.66.96
            </a>
          </div>
          <div>
            <div className="text-[#6E6D6A] text-xs mb-1">Email</div>
            <a
              href="mailto:info@ride-factory.be"
              className="font-medium text-[#141413] hover:text-[#FF5A00] transition-colors"
            >
              info@ride-factory.be
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
