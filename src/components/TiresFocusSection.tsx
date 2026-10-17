import { useState } from 'react';
import { ArrowRight, Check, Disc, HelpCircle, Layers, ShieldCheck, Wrench } from 'lucide-react';

interface TiresFocusSectionProps {
  onOpenBookingForTires: () => void;
}

export function TiresFocusSection({ onOpenBookingForTires }: TiresFocusSectionProps) {
  const [selectedDiscipline, setSelectedDiscipline] = useState<'enduro' | 'hard' | 'trail' | 'mx'>('enduro');

  const setups = {
    enduro: {
      title: 'ENDURO TRADITIONNEL & FIM',
      front: '90/90-21 (Michelin Enduro Medium ou Metzeler 6 Days)',
      rear: '140/80-18 Homologué FIM',
      mousse: 'Bib Mousse M14 ou M15 (pression équivalente 0.9 bar)',
      terrain: 'Sous-bois, chemins cassants, pierriers secs, passages herbeux',
      gripster: '1 gripster arrière renforcé usiné',
    },
    hard: {
      title: 'HARD ENDURO & EXTRÊME',
      front: '90/100-21 Gomme Super Soft / Gummy',
      rear: '140/80-18 Extra Soft / Carcasse souple (Mitas EF-07 double vert)',
      mousse: 'Mousse percée ou Soft Mousse (pression équivalente 0.5 - 0.7 bar)',
      terrain: 'Dalles humides, troncs gras, pierriers verticaux, franchissements extrêmes',
      gripster: 'Double gripster arrière pour empêcher tout glissement de jante',
    },
    trail: {
      title: 'TRAIL & MAXI-TRAIL ADVENTURE',
      front: '90/90-21 ou 110/80-19 50/50',
      rear: '140/80-18 ou 150/70-18 (Pirelli Rally STR / Motoz Tractionator / Dunlop D908RR)',
      mousse: 'Chambre à air renforcée 4mm ultra-heavy-duty ou Tubeless avec valve racing',
      terrain: 'Liaisons routières, pistes rapides, bivouacs, rallye raid transfrontalier (TET)',
      gripster: 'Équilibrage dynamique au plomb d\'atelier pour confort à 120 km/h',
    },
    mx: {
      title: 'MOTOCROSS & SABLE',
      front: '80/100-21 profil directionnel crampons agressifs',
      rear: '110/90-19 ou 120/80-19 selon cylindrée',
      mousse: 'Chambre à air renforcée 2.5mm ou Bib Mousse MX haute cadence',
      terrain: 'Pistes MX dures ou sablonneuses, tables, ornières profondes',
      gripster: 'Gripster aluminium léger',
    },
  };

  const currentSetup = setups[selectedDiscipline];

  return (
    <section id="pneus" className="py-24 lg:py-32 bg-[#080808] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Technical Context */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF6600] uppercase tracking-widest mb-3">
              <span className="w-2 h-0.5 bg-[#FF6600]" />
              <span>SPÉCIALITÉ ATELIER</span>
            </div>

            <h2 className="font-heading font-black text-4xl sm:text-6xl text-[#F5F5F2] uppercase tracking-tight leading-[0.95] mb-6">
              PNEUMATIQUES &<br />
              <span className="text-[#FF6600]">BIB MOUSSE.</span>
            </h2>

            <p className="text-base text-[#A3A3A3] leading-relaxed mb-6">
              Monter un pneu tout-terrain ou insérer un bib mousse sans abîmer les tringles ni massacrer les jantes demande une véritable technique et un outillage spécifique de compétition.
            </p>

            <div className="space-y-4 text-sm text-[#F5F5F2]/90 mb-8 border-y border-[#1A1A1A] py-6">
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-[#FF6600] mt-2 shrink-0" />
                <div>
                  <span className="font-heading font-bold uppercase text-[#F5F5F2]">Zéro crevaison garantie :</span>
                  <p className="text-xs text-[#A3A3A3] mt-0.5">Fourniture et insertion de bib mousses Michelin, Mitas et Gibson avec lubrification silicone abondante.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-[#FF6600] mt-2 shrink-0" />
                <div>
                  <span className="font-heading font-bold uppercase text-[#F5F5F2]">Machine & démonte-pneus dédiés :</span>
                  <p className="text-xs text-[#A3A3A3] mt-0.5">Aucune rayure sur vos cercles anodisés, respect total de la tension des rayons.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-[#FF6600] mt-2 shrink-0" />
                <div>
                  <span className="font-heading font-bold uppercase text-[#F5F5F2]">Stock immédiat à Mons :</span>
                  <p className="text-xs text-[#A3A3A3] mt-0.5">Pneus FIM, gommes gummy d'extrême, chambres 4mm ultra-renforcées et pneus aventure 50/50.</p>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenBookingForTires}
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#FF6600] text-[#080808] font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#E65C00] transition-colors cursor-pointer"
            >
              <span>PRENDRE RENDEZ-VOUS PNEUMATIQUES</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column: Interactive Setup Recommender */}
          <div className="lg:col-span-7 bg-[#111111] border border-[#1A1A1A] p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A] mb-6">
              <div>
                <span className="text-[11px] font-mono text-[#A3A3A3] uppercase">GUIDE CONFIGURATION</span>
                <h3 className="font-heading font-black text-2xl text-[#F5F5F2] uppercase">
                  QUELLE MONTE POUR VOTRE TERRAIN ?
                </h3>
              </div>
              <div className="hidden sm:block text-right">
                <span className="text-xs font-mono text-[#FF6600]">RIDE FACTORY MONS</span>
              </div>
            </div>

            {/* Selector tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {(['enduro', 'hard', 'trail', 'mx'] as const).map((key) => {
                const labels = {
                  enduro: 'ENDURO FIM',
                  hard: 'HARD ENDURO',
                  trail: 'TRAIL / ADVENTURE',
                  mx: 'MOTOCROSS',
                };
                const isSelected = selectedDiscipline === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedDiscipline(key)}
                    className={`py-2 px-3 text-xs font-heading font-bold tracking-wider uppercase transition-colors text-center border cursor-pointer ${
                      isSelected
                        ? 'bg-[#FF6600] text-[#080808] border-[#FF6600]'
                        : 'bg-[#1A1A1A] text-[#A3A3A3] border-[#222222] hover:text-[#F5F5F2]'
                    }`}
                  >
                    {labels[key]}
                  </button>
                );
              })}
            </div>

            {/* Setup specs card */}
            <div className="bg-[#080808] border border-[#222222] p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A]">
                <span className="font-heading font-bold text-lg text-[#F5F5F2] uppercase">
                  {currentSetup.title}
                </span>
                <span className="text-xs font-mono text-[#FF6600]">CONFIGURATION RECOMMANDÉE</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-[#A3A3A3] block mb-1">DIMENSION AVANT :</span>
                  <span className="text-[#F5F5F2] font-semibold">{currentSetup.front}</span>
                </div>
                <div>
                  <span className="text-[#A3A3A3] block mb-1">DIMENSION ARRIÈRE :</span>
                  <span className="text-[#F5F5F2] font-semibold">{currentSetup.rear}</span>
                </div>
                <div>
                  <span className="text-[#A3A3A3] block mb-1">TYPE DE MOUSSE / CHAMBRE :</span>
                  <span className="text-[#F5F5F2] font-semibold">{currentSetup.mousse}</span>
                </div>
                <div>
                  <span className="text-[#A3A3A3] block mb-1">GRIPSTER & SERRAGE :</span>
                  <span className="text-[#F5F5F2] font-semibold">{currentSetup.gripster}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#1A1A1A] text-xs text-[#A3A3A3]">
                <span className="text-[#FF6600] font-semibold font-mono">USAGE TYPE : </span>
                {currentSetup.terrain}
              </div>
            </div>

            {/* Quick pricing reassurance */}
            <div className="mt-6 pt-4 border-t border-[#1A1A1A] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#A3A3A3]">
              <div>Montage pneu : dès 20 € · Montage bib mousse : dès 30 €</div>
              <button
                onClick={onOpenBookingForTires}
                className="text-[#FF6600] hover:underline font-heading font-bold text-xs uppercase"
              >
                RÉSERVER MON MONTAGE PNEUS →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
