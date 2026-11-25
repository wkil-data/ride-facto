import { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { SERVICES_DATA } from '../data/services';
import { ServiceItem } from '../data/types';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceName: string) => void;
}

export function ServicesSection({ onSelectServiceForBooking }: ServicesSectionProps) {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  return (
    <section id="atelier" className="py-24 lg:py-32 bg-[#FAFAF8] border-t border-[#E6E4DE]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 lg:mb-20">
          <p className="text-sm font-medium text-[#FF5A00] mb-3">
            L’atelier
          </p>
          <h2
            className="font-heading font-extrabold text-[#141413] tracking-tight leading-[1.1] mb-4"
            style={{ fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)', textWrap: 'balance' }}
          >
            Tout ce qu’il faut. Rien de superflu.
          </h2>
          <p className="text-base text-[#6E6D6A] leading-relaxed">
            Chaque intervention mécanique est réalisée selon les tolérances constructeur, avec l’outillage spécifique tout-terrain et une transparence complète.
          </p>
        </div>

        {/* Clean 2x2 Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SERVICES_DATA.map((service) => (
            <article
              key={service.id}
              className="group bg-white border border-[#E6E4DE] rounded-2xl overflow-hidden flex flex-col justify-between transition-colors duration-200 hover:border-[#C9C6BE]"
            >
              <div>
                {/* Clean 16:10 Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#141413]">
                  <img
                    src={service.image}
                    alt={`Service ${service.title} - Ride Factory Mons`}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/hero_enduro_workshop.jpg';
                    }}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Body */}
                <div className="p-7 sm:p-8">
                  <div className="flex items-center justify-between gap-4 text-xs text-[#6E6D6A] mb-3">
                    <span className="font-mono font-medium text-[#FF5A00]">{service.number}</span>
                    <span>{service.leadTime}</span>
                  </div>

                  <h3 className="font-heading font-bold text-2xl text-[#141413] tracking-tight mb-3 capitalize">
                    {service.title.toLowerCase()}
                  </h3>

                  <p className="text-sm text-[#6E6D6A] leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Concise 3-line summary */}
                  <ul className="space-y-2 border-t border-[#E6E4DE] pt-5 text-sm text-[#141413]/85">
                    {service.items.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-[#FF5A00] select-none">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Clean Action Footer */}
              <div className="px-7 sm:px-8 pb-7 pt-2 flex items-center justify-between gap-4">
                <button
                  onClick={() => setActiveModalService(service)}
                  className="text-sm font-medium text-[#6E6D6A] hover:text-[#141413] transition-colors cursor-pointer py-2.5 min-h-[44px] whitespace-nowrap shrink-0"
                >
                  Détails techniques →
                </button>

                <button
                  onClick={() => onSelectServiceForBooking(service.title)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] bg-[#F2F1ED] hover:bg-[#FF5A00] text-[#141413] hover:text-white text-sm font-medium rounded-lg transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Réserver</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Minimalist Detail Modal */}
      {activeModalService && (
        <div
          className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveModalService(null)}
        >
          <div
            className="bg-white border border-[#E6E4DE] rounded-2xl max-w-2xl w-full p-6 sm:p-10 relative max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-6 border-b border-[#E6E4DE] mb-6">
              <div>
                <p className="text-xs font-mono text-[#FF5A00] mb-1">
                  {activeModalService.number} · {activeModalService.leadTime}
                </p>
                <h3 className="font-heading font-extrabold text-3xl text-[#141413] capitalize">
                  {activeModalService.title.toLowerCase()}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalService(null)}
                className="p-2 text-[#6E6D6A] hover:text-[#141413] hover:bg-[#F2F1ED] rounded-lg transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <p className="text-base text-[#141413] leading-relaxed">
                {activeModalService.fullDescription}
              </p>

              <div>
                <h4 className="text-sm font-semibold text-[#141413] mb-3">
                  Opérations incluses
                </h4>
                <ul className="space-y-2.5 text-sm text-[#6E6D6A]">
                  {activeModalService.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#FF5A00] select-none">—</span>
                      <span className="text-[#141413]/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#E6E4DE] text-xs text-[#6E6D6A]">
                Compatible : {activeModalService.recommendedFor.join(' · ')}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  onClick={() => setActiveModalService(null)}
                  className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-[#6E6D6A] hover:text-[#141413] cursor-pointer"
                >
                  Fermer
                </button>
                <button
                  onClick={() => {
                    const title = activeModalService.title;
                    setActiveModalService(null);
                    onSelectServiceForBooking(title);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#FF5A00] hover:bg-[#E04E00] text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Prendre rendez-vous
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
