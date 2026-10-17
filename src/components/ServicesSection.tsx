import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, ChevronRight, Clock, Shield } from 'lucide-react';
import { SERVICES_DATA } from '../data/services';
import { ServiceItem } from '../data/types';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceName: string) => void;
}

export function ServicesSection({ onSelectServiceForBooking }: ServicesSectionProps) {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  return (
    <section id="atelier" className="py-24 lg:py-32 bg-[#080808] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-[#FF6600] uppercase tracking-widest mb-3">
            <span className="w-2 h-0.5 bg-[#FF6600]" />
            <span>SERVICES & EXPERTISE</span>
          </div>

          <h2 className="font-heading font-black text-5xl sm:text-7xl text-[#F5F5F2] uppercase tracking-tight leading-[0.95] mb-4">
            L'ATELIER
          </h2>

          <p className="font-heading font-bold text-2xl sm:text-3xl text-[#A3A3A3] uppercase tracking-normal">
            TOUT CE QU'IL FAUT.<br />
            <span className="text-[#F5F5F2]">RIEN DE SUPERFLU.</span>
          </p>

          <p className="text-sm sm:text-base text-[#A3A3A3] mt-4 leading-relaxed max-w-xl">
            Nous n'empilons pas les forfaits inutiles. Chaque opération mécanique est réalisée avec l'outillage adapté, les tolérances exactes et une exigence sans compromis.
          </p>
        </div>

        {/* 4 Large Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="group relative bg-[#111111] border border-[#1A1A1A] hover:border-[#333333] transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Photo top */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#1A1A1A]">
                <img
                  src={service.image}
                  alt={`Service ${service.title} - Ride Factory Mons`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />

                {/* Number Badge */}
                <div className="absolute top-4 left-4 font-heading font-black text-4xl sm:text-5xl text-[#F5F5F2]/90 tabular-nums">
                  <span className="text-[#FF6600]">{service.number}</span>
                </div>

                {/* Lead time badge */}
                <div className="absolute top-4 right-4 bg-[#080808]/85 backdrop-blur-sm border border-[#222222] px-2.5 py-1 text-[11px] font-mono text-[#A3A3A3]">
                  {service.leadTime}
                </div>
              </div>

              {/* Content body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-black text-3xl sm:text-4xl text-[#F5F5F2] uppercase tracking-tight mb-3 group-hover:text-[#FF6600] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-[#A3A3A3] mb-6 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Bullet list from brief */}
                  <div className="space-y-2 mb-8 border-t border-[#1A1A1A] pt-4">
                    {service.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#F5F5F2]/90">
                        <span className="w-1.5 h-1.5 bg-[#FF6600] mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Row */}
                <div className="pt-4 border-t border-[#1A1A1A] flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveModalService(service)}
                    className="text-xs font-mono text-[#A3A3A3] hover:text-[#F5F5F2] transition-colors flex items-center gap-1 cursor-pointer py-1"
                  >
                    <span>DÉTAILS TECHNIQUES</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onSelectServiceForBooking(service.title)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] hover:bg-[#FF6600] hover:text-[#080808] text-[#F5F5F2] font-heading font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>RÉSERVER CETTE INTERVENTION</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[#222222] max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-[#1A1A1A] mb-6">
              <div>
                <span className="text-xs font-mono text-[#FF6600]">{activeModalService.number} / PROTOCOLE</span>
                <h3 className="font-heading font-black text-3xl sm:text-4xl text-[#F5F5F2] uppercase">
                  {activeModalService.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalService(null)}
                className="text-[#A3A3A3] hover:text-[#F5F5F2] text-xl font-mono p-1"
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6 text-sm text-[#A3A3A3]">
              <p className="text-base text-[#F5F5F2] leading-relaxed">
                {activeModalService.fullDescription}
              </p>

              <div>
                <h4 className="font-heading font-bold text-base text-[#F5F5F2] uppercase mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#FF6600]" />
                  <span>OPÉRATIONS INCLUSES :</span>
                </h4>
                <ul className="space-y-2">
                  {activeModalService.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-[#F5F5F2]">
                      <span className="w-1.5 h-1.5 bg-[#FF6600]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#080808] p-4 border border-[#1A1A1A]">
                <div className="text-xs font-mono text-[#A3A3A3] mb-1">MACHINES & CONFIGURATIONS :</div>
                <div className="flex flex-wrap gap-2">
                  {activeModalService.recommendedFor.map((rec, i) => (
                    <span key={i} className="text-xs font-mono text-[#FF6600]">
                      #{rec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#1A1A1A] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs font-mono text-[#A3A3A3]">
                  Délai moyen constaté : <span className="text-[#F5F5F2]">{activeModalService.leadTime}</span>
                </div>
                <button
                  onClick={() => {
                    const title = activeModalService.title;
                    setActiveModalService(null);
                    onSelectServiceForBooking(title);
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-[#FF6600] text-[#080808] font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#E65C00] transition-colors"
                >
                  PRENDRE RENDEZ-VOUS POUR CE SERVICE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
