import { Wrench, Compass, ShieldAlert, Award } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-[#0c0c0c] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Statement */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF6600] uppercase tracking-widest mb-4">
              <span className="w-2 h-0.5 bg-[#FF6600]" />
              <span>PHILOSOPHIE & ATELIER</span>
            </div>

            <h2 className="font-heading font-black text-5xl sm:text-7xl lg:text-8xl text-[#F5F5F2] uppercase tracking-tight leading-[0.9] mb-8">
              BUILT TO RIDE.
            </h2>

            <div className="space-y-6 text-base sm:text-lg text-[#A3A3A3] leading-relaxed">
              <p className="text-xl sm:text-2xl text-[#F5F5F2] font-heading font-semibold uppercase leading-snug">
                Ride Factory est né d'une passion simple :<br />
                rouler, entretenir et préparer des motos.
              </p>

              <p>
                Notre atelier de Mons est particulièrement orienté enduro, trail, motocross et adventure.
              </p>

              <p>
                Que ce soit pour une vidange, une remise en état, un train de pneus ou une préparation complète, notre objectif reste le même :
              </p>

              <p className="font-heading font-black text-2xl sm:text-3xl text-[#FF6600] uppercase tracking-wide">
                VOUS RENDRE UNE MOTO PRÊTE À ROULER.
              </p>
            </div>
          </div>

          {/* Pillars / Workshop credentials */}
          <div className="lg:col-span-5 bg-[#080808] border border-[#1A1A1A] p-8 space-y-6">
            <div className="border-b border-[#1A1A1A] pb-4">
              <span className="text-[11px] font-mono text-[#FF6600] uppercase block">ATELIER & GARAGE MOTO</span>
              <div className="font-heading font-black text-2xl text-[#F5F5F2] uppercase">
                RIDE FACTORY MONS
              </div>
              <div className="text-xs font-mono text-[#A3A3A3] mt-1">
                Petite Rue des Prés 1 · 7000 Mons
              </div>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-[#FF6600] mt-1 shrink-0" />
                <div>
                  <div className="text-[#F5F5F2] font-bold uppercase">OUTILLAGE SPÉCIALISÉ ENDURO & RALLYE</div>
                  <div className="text-[#737373] mt-0.5">Démonte-mousse, comparateurs d'alésage, valise diagnostic tout-terrain.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-[#FF6600] mt-1 shrink-0" />
                <div>
                  <div className="text-[#F5F5F2] font-bold uppercase">CONSEILS DE PILOTES DE TERRAIN</div>
                  <div className="text-[#737373] mt-0.5">Nous roulons chaque week-end sur les terrains que nous préparons.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-[#FF6600] mt-1 shrink-0" />
                <div>
                  <div className="text-[#F5F5F2] font-bold uppercase">TRANSPARENCE TOTALE DES INTERVENTIONS</div>
                  <div className="text-[#737373] mt-0.5">Pièces usées conservées et montrées au client lors de la remise des clés.</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1A1A1A] text-[11px] font-mono text-[#737373]">
              Atelier situé en plein cœur de Mons, accessible facilement depuis l'E19 et l'E42.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
