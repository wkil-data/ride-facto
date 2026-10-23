import dirtOffroadImg from '../assets/images/dirt_offroad_action_1791293893287.jpg';

interface SpecialistOffroadSectionProps {
  onOpenBooking: () => void;
}

export function SpecialistOffroadSection({ onOpenBooking }: SpecialistOffroadSectionProps) {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-[#1A1A1A] select-none">
      {/* Full width dramatic photo */}
      <div className="absolute inset-0 z-0">
        <img
          src={dirtOffroadImg}
          alt="Enduro et tout-terrain - Ride Factory Mons"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/dirt_offroad_action.jpg';
          }}
          className="w-full h-full object-cover object-center filter contrast-[1.15] brightness-[0.55]"
        />
        {/* Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/40 to-[#080808]/75" />
        <div className="absolute inset-0 bg-[#080808]/30 backdrop-contrast-125" />
      </div>

      {/* Visual content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        {/* Sub-label */}
        <div className="inline-flex items-center gap-3 text-xs sm:text-sm font-heading font-bold text-[#FF6600] uppercase tracking-widest mb-6">
          <span>Enduro</span>
          <span className="text-[#A3A3A3]">·</span>
          <span>Trail</span>
          <span className="text-[#A3A3A3]">·</span>
          <span>MX</span>
          <span className="text-[#A3A3A3]">·</span>
          <span>Adventure</span>
        </div>

        {/* Huge bold statement */}
        <h2 className="font-heading font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] leading-[0.88] text-[#F5F5F2] uppercase tracking-tight mb-8">
          DIRT IS<br />
          <span className="text-[#FF6600]">PART OF</span><br />
          THE JOB.
        </h2>

        {/* Punchline */}
        <p className="font-heading font-bold text-xl sm:text-3xl lg:text-4xl text-[#F5F5F2] uppercase tracking-wide max-w-3xl mx-auto mb-10 leading-snug">
          Notre terrain de jeu commence là où la route s'arrête.
        </p>

        <p className="text-sm sm:text-base text-[#A3A3A3] max-w-xl mx-auto mb-10 leading-relaxed">
          Boue d'argile, cailloux roulants, dévers glissants ou pistes de sable d'Espagne : notre atelier prépare des motos faites pour encaisser la réalité du tout-terrain.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 bg-[#FF6600] text-[#080808] font-heading font-bold text-base uppercase tracking-wider hover:bg-[#E65C00] transition-colors cursor-pointer shadow-xl shadow-black/80"
          >
            CONFIEZ-NOUS VOTRE MOTO OFF-ROAD
          </button>
        </div>
      </div>
    </section>
  );
}
