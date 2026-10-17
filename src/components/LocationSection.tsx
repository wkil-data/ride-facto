import { MapPin, Clock, Phone, Mail, Navigation, ArrowUpRight } from 'lucide-react';

interface LocationSectionProps {
  onOpenBooking: () => void;
}

export function LocationSection({ onOpenBooking }: LocationSectionProps) {
  const addressUrl = 'https://www.google.com/maps/dir/?api=1&destination=Petite+Rue+des+Pr%C3%A9s+1+7000+Mons+Belgique';
  const openWazeUrl = 'https://waze.com/ul?q=Petite%20Rue%20des%20Pr%C3%A9s%201%207000%20Mons';

  return (
    <section id="contact" className="py-24 bg-[#080808] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Info Card */}
          <div className="lg:col-span-6 bg-[#111111] border border-[#1A1A1A] p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF6600] uppercase tracking-widest mb-3">
                <span className="w-2 h-0.5 bg-[#FF6600]" />
                <span>LOCALISATION & ACCÈS</span>
              </div>

              <h2 className="font-heading font-black text-4xl sm:text-6xl text-[#F5F5F2] uppercase tracking-tight leading-[0.95] mb-6">
                RIDE FACTORY<br />
                <span className="text-[#FF6600]">MONS.</span>
              </h2>

              <div className="space-y-6 text-sm text-[#A3A3A3] mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#FF6600] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-heading font-bold text-lg text-[#F5F5F2] uppercase">
                       PETITE RUE DES PRÉS 1
                    </div>
                    <div className="font-mono text-xs text-[#FF6600] font-bold mt-0.5">
                      7000 MONS · BELGIQUE
                    </div>
                    <div className="text-[11px] font-mono text-[#737373] mt-1">
                      (Accès rapide via ring intérieur et autoroutes E19 / E42)
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#FF6600] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-heading font-bold text-lg text-[#F5F5F2] uppercase">
                      LUNDI — SAMEDI
                    </div>
                    <div className="font-mono text-sm text-[#FF6600] font-bold">
                      09:00 — 18:00
                    </div>
                    <div className="text-[11px] font-mono text-[#737373] mt-0.5">
                      Fermé le dimanche (sur les spéciales enduro & les pistes !)
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#FF6600] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-heading font-bold text-lg text-[#F5F5F2] uppercase">
                      TÉLÉPHONE & WHATSAPP ATELIER
                    </div>
                    <a
                      href="tel:+32470556696"
                      className="font-mono text-xs text-[#F5F5F2] hover:text-[#FF6600] transition-colors"
                    >
                      0470/55.66.96
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-6 border-t border-[#1A1A1A] flex flex-wrap gap-3">
              <a
                href={addressUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#1A1A1A] hover:bg-[#222222] border border-[#262626] text-[#F5F5F2] font-heading font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-[#FF6600]" />
                <span>ITINÉRAIRE GOOGLE MAPS</span>
              </a>

              <a
                href={openWazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#1A1A1A] hover:bg-[#222222] border border-[#262626] text-[#F5F5F2] font-heading font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <span>WAZE</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6600] text-[#080808] font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#E65C00] transition-colors cursor-pointer"
              >
                <span>PRENDRE RENDEZ-VOUS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Map Representation & Directions View */}
          <div className="lg:col-span-6 bg-[#0c0c0c] border border-[#1A1A1A] relative min-h-[380px] flex flex-col justify-between overflow-hidden">
            {/* Custom Styled High-Contrast Dark Map View */}
            <div className="relative flex-1 w-full bg-[#141414] overflow-hidden flex items-center justify-center p-6">
              {/* Stylized dark cartographic pattern */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'radial-gradient(#555 1px, transparent 1px), linear-gradient(to right, #222 1px, transparent 1px), linear-gradient(to bottom, #222 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />

              {/* Roads graphic mock */}
              <svg
                className="absolute inset-0 w-full h-full stroke-neutral-700/50 fill-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M-50,120 Q180,90 400,220 T800,260" strokeWidth="6" />
                <path d="M120,-20 L260,420" strokeWidth="4" />
                <path d="M-10,300 L600,100" strokeWidth="3" strokeDasharray="6 4" />
                <circle cx="240" cy="180" r="18" className="fill-[#FF6600]/20 stroke-[#FF6600]" strokeWidth="2" />
                <circle cx="240" cy="180" r="5" className="fill-[#FF6600]" />
              </svg>

              {/* Pin Callout */}
              <div className="relative z-10 bg-[#080808]/95 border border-[#FF6600] p-4 text-center max-w-xs shadow-2xl backdrop-blur-md">
                <div className="font-heading font-black text-xl text-[#F5F5F2] uppercase tracking-wide">
                  RIDE FACTORY ATELIER
                </div>
                <div className="text-xs font-mono text-[#FF6600] font-bold mt-1">
                  Petite Rue des Prés 1
                </div>
                <div className="text-xs font-mono text-[#F5F5F2] font-semibold mt-0.5">
                  7000 Mons, Belgique
                </div>
                <div className="text-[10px] font-mono text-[#737373] mt-2 border-t border-[#1A1A1A] pt-1.5">
                  Point GPS : 50.4542° N, 3.9523° E
                </div>
              </div>
            </div>

            {/* Map footer action */}
            <div className="p-4 bg-[#111111] border-t border-[#1A1A1A] flex items-center justify-between text-xs font-mono text-[#A3A3A3]">
              <span>Stationnement camionnette / remorque moto aisé devant l'atelier</span>
              <a
                href={addressUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF6600] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>OUVRIR DANS MAPS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
