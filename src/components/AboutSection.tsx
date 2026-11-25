import { ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onOpenBooking?: () => void;
  onNavigateMotos?: () => void;
}

export function AboutSection({ onOpenBooking, onNavigateMotos }: AboutSectionProps) {
  const pillars = [
    {
      title: 'Prise en charge rapide à Mons',
      desc: 'Déposez votre moto à deux pas des grands axes (E19 / E42) avec accès direct pour remorque et camionnette.',
    },
    {
      title: 'Devis clair avant intervention',
      desc: 'Aucun frais imprévu : diagnostic précis, validation préalable et présentation des pièces remplacées.',
    },
    {
      title: 'Expérience directe du terrain',
      desc: 'Des réglages et contrôles éprouvés chaque week-end en enduro, trail, rallye raid et motocross.',
    },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-white border-t border-[#E6E4DE]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Editorial Story */}
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-[#FF5A00] mb-3">
              Pourquoi choisir Ride Factory
            </p>
            <h2
              className="font-heading font-extrabold text-[#141413] tracking-tight leading-[1.1] mb-6"
              style={{ fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)', textWrap: 'balance' }}
            >
              Built to Ride.
            </h2>

            <div className="space-y-5 text-base sm:text-lg text-[#6E6D6A] leading-relaxed max-w-2xl mb-9">
              <p className="text-[#141413] font-medium">
                Un atelier indépendant pensé pour vous remettre en selle rapidement, avec une mécanique fiable et sans compromis.
              </p>
              <p>
                Installé au cœur de Mons, Ride Factory accueille votre machine du lundi au samedi. Qu’il s’agisse d’un entretien courant, d’une panne ou d’une préparation complète, passez nous voir ou bloquez votre créneau en ligne.
              </p>
            </div>

            {(onOpenBooking || onNavigateMotos) && (
              <div className="flex flex-wrap items-center gap-5">
                {onOpenBooking && (
                  <button
                    onClick={onOpenBooking}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#141413] hover:bg-[#FF5A00] text-white text-sm font-medium rounded-lg transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Réserver un créneau atelier</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                {onNavigateMotos && (
                  <button
                    onClick={onNavigateMotos}
                    className="text-sm font-medium text-[#141413] hover:text-[#FF5A00] transition-colors cursor-pointer py-2 whitespace-nowrap shrink-0"
                  >
                    Voir les motos à vendre →
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Unboxed Hairline Pillars */}
          <div className="lg:col-span-5 divide-y divide-[#E6E4DE] border-y border-[#E6E4DE]">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="py-5">
                <h3 className="font-heading font-bold text-base text-[#141413] mb-1">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#6E6D6A] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
