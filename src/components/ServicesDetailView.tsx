import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../data/services';

interface ServicesDetailViewProps {
  onSelectServiceForBooking: (serviceName: string) => void;
  onNavigateHome?: () => void;
}

export function ServicesDetailView({ onSelectServiceForBooking, onNavigateHome }: ServicesDetailViewProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('entretien');

  const currentService = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];

  return (
    <div className="pt-28 pb-24 bg-[#FAFAF8] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {onNavigateHome && (
          <div className="mb-8">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#6E6D6A] hover:text-[#141413] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à l’accueil</span>
            </button>
          </div>
        )}

        <div className="max-w-2xl mb-12">
          <p className="text-sm font-medium text-[#FF5A00] mb-3">
            Services & Protocoles
          </p>
          <h1
            className="font-heading font-extrabold text-[#141413] tracking-tight leading-[1.08] mb-4"
            style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', textWrap: 'balance' }}
          >
            Nos prestations d’atelier.
          </h1>
          <p className="text-base text-[#6E6D6A] leading-relaxed">
            Sélectionnez un pôle technique pour consulter la liste complète des opérations réalisées à Mons.
          </p>
        </div>

        {/* Clean Segmented Tabs */}
        <div className="inline-flex flex-wrap gap-1.5 p-1.5 bg-[#F2F1ED] rounded-xl mb-12">
          {SERVICES_DATA.map((srv) => {
            const isSelected = srv.id === selectedServiceId;
            return (
              <button
                key={srv.id}
                onClick={() => setSelectedServiceId(srv.id)}
                className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-white text-[#141413] shadow-xs'
                    : 'text-[#6E6D6A] hover:text-[#141413]'
                }`}
              >
                <span className="font-mono text-xs text-[#FF5A00] mr-2">{srv.number}</span>
                <span className="capitalize">{srv.title.toLowerCase()}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Service Editorial Layout */}
        <div className="bg-white border border-[#E6E4DE] rounded-2xl p-7 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-[#6E6D6A] mb-3">
                <span className="text-[#FF5A00] font-semibold">{currentService.number}</span>
                <span className="mx-2">·</span>
                <span>Délai estimé : {currentService.leadTime}</span>
              </div>

              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#141413] mb-4 capitalize">
                {currentService.title.toLowerCase()}
              </h2>

              <p className="text-base text-[#141413] leading-relaxed mb-4">
                {currentService.shortDesc}
              </p>

              <p className="text-sm text-[#6E6D6A] leading-relaxed mb-8">
                {currentService.fullDescription}
              </p>

              <div className="border-t border-[#E6E4DE] pt-6 mb-8">
                <h3 className="text-sm font-semibold text-[#141413] mb-4">
                  Opérations réalisées à l’atelier
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#6E6D6A]">
                  {currentService.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#FF5A00] select-none">—</span>
                      <span className="text-[#141413]/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E6E4DE] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-[#6E6D6A]">
                {currentService.recommendedFor.join(' · ')}
              </div>
              <button
                onClick={() => onSelectServiceForBooking(currentService.title)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FF5A00] hover:bg-[#E04E00] text-white text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Réserver cette prestation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[280px] lg:h-full rounded-xl overflow-hidden bg-[#141413]">
            <img
              src={currentService.image}
              alt={currentService.title}
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/engine_preparation_detail.jpg';
              }}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
