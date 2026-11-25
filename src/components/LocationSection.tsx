import { ArrowUpRight, Navigation } from 'lucide-react';

interface LocationSectionProps {
  onOpenBooking: () => void;
}

export function LocationSection({ onOpenBooking }: LocationSectionProps) {
  const addressUrl = 'https://www.google.com/maps/dir/?api=1&destination=Petite+Rue+des+Pr%C3%A9s+1+7000+Mons+Belgique';
  const openWazeUrl = 'https://waze.com/ul?q=Petite%20Rue%20des%20Pr%C3%A9s%201%207000%20Mons';

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white border-t border-[#E6E4DE]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Clean Contact Details */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="text-sm font-medium text-[#FF5A00] mb-3">
                Localisation & Accès
              </p>
              <h2
                className="font-heading font-extrabold text-[#141413] tracking-tight leading-[1.1] mb-8"
                style={{ fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)', textWrap: 'balance' }}
              >
                Nous retrouver à Mons.
              </h2>

              <div className="divide-y divide-[#E6E4DE] border-t border-[#E6E4DE] text-sm">
                <div className="py-4 flex justify-between gap-4">
                  <span className="text-[#6E6D6A]">Adresse</span>
                  <div className="text-right">
                    <div className="font-medium text-[#141413]">Petite Rue des Prés 1</div>
                    <div className="text-xs text-[#6E6D6A] mt-0.5">7000 Mons, Belgique (accès E19 / E42)</div>
                  </div>
                </div>
                <div className="py-4 flex justify-between gap-4">
                  <span className="text-[#6E6D6A]">Horaires</span>
                  <div className="text-right">
                    <div className="font-medium text-[#141413] tabular-nums">Lun – Sam · 09:00 – 18:00</div>
                    <div className="text-xs text-[#6E6D6A] mt-0.5">Fermé le dimanche</div>
                  </div>
                </div>
                <div className="py-4 flex justify-between gap-4">
                  <span className="text-[#6E6D6A]">Téléphone & WhatsApp</span>
                  <a
                    href="tel:+32470556696"
                    className="font-mono font-medium text-[#141413] hover:text-[#FF5A00] transition-colors tabular-nums"
                  >
                    0470/55.66.96
                  </a>
                </div>
                <div className="py-4 flex justify-between gap-4">
                  <span className="text-[#6E6D6A]">Email</span>
                  <a
                    href="mailto:info@ride-factory.be"
                    className="font-medium text-[#141413] hover:text-[#FF5A00] transition-colors"
                  >
                    info@ride-factory.be
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#FF5A00] hover:bg-[#E04E00] text-white text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Prendre rendez-vous</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={addressUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 bg-[#F2F1ED] hover:bg-[#E6E4DE] text-[#141413] text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <Navigation className="w-3.5 h-3.5 text-[#FF5A00]" />
                <span>Google Maps</span>
              </a>

              <a
                href={openWazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 bg-[#F2F1ED] hover:bg-[#E6E4DE] text-[#141413] text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <span>Waze</span>
              </a>
            </div>
          </div>

          {/* Right Column: Minimalist Architectural Map Card */}
          <div className="lg:col-span-6 bg-[#FAFAF8] border border-[#E6E4DE] rounded-2xl min-h-[340px] flex flex-col justify-between overflow-hidden">
            <div className="relative flex-1 flex items-center justify-center p-8">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    'radial-gradient(#D4D1C9 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
              <svg
                className="absolute inset-0 w-full h-full stroke-[#D8D5CD] fill-none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M-50,120 Q180,90 400,220 T800,260" strokeWidth="2.5" />
                <path d="M120,-20 L260,420" strokeWidth="2" />
                <path d="M-10,300 L600,100" strokeWidth="1.5" strokeDasharray="5 5" />
              </svg>

              <div className="relative z-10 bg-white border border-[#E6E4DE] rounded-xl p-6 text-center max-w-xs shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5A00] mx-auto mb-3" />
                <div className="font-heading font-bold text-lg text-[#141413]">
                  Ride Factory Atelier
                </div>
                <div className="text-sm text-[#6E6D6A] mt-1">
                  Petite Rue des Prés 1<br />
                  7000 Mons, Belgique
                </div>
                <div className="text-[11px] font-mono text-[#6E6D6A] mt-3 pt-3 border-t border-[#E6E4DE] tabular-nums">
                  50.4542° N, 3.9523° E
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-white border-t border-[#E6E4DE] flex items-center justify-between text-xs text-[#6E6D6A]">
              <span>Stationnement camionnette et remorque devant l’atelier</span>
              <a
                href={addressUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#141413] hover:text-[#FF5A00] font-medium inline-flex items-center gap-1 whitespace-nowrap shrink-0"
              >
                <span>Itinéraire</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
