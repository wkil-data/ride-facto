import { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, ChevronRight, Gauge, Shield, Wrench, Sparkles, Layers } from 'lucide-react';
import { SERVICES_DATA } from '../data/services';

interface ServicesDetailViewProps {
  onSelectServiceForBooking: (serviceName: string) => void;
  onNavigateHome?: () => void;
  onNavigate?: (view: string, sectionId?: string) => void;
}

export function ServicesDetailView({ onSelectServiceForBooking, onNavigateHome, onNavigate }: ServicesDetailViewProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('entretien');

  const currentService = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];

  return (
    <div className="pt-28 pb-24 bg-[#080808] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb & Back to Home Button */}
        {onNavigateHome && (
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#1A1A1A]">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#111111] hover:bg-[#1A1A1A] text-[#F5F5F2] hover:text-[#FF6600] border border-[#222222] text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#FF6600]" />
              <span>← RETOUR À LA PAGE D'ACCUEIL</span>
            </button>
            <span className="text-xs font-mono text-[#A3A3A3] hidden sm:inline">
              Services & Protocoles · Ride Factory Mons
            </span>
          </div>
        )}

        {/* Quick Page Navigation Menu at the Top */}
        {onNavigate && (
          <div className="bg-[#111111] border border-[#1A1A1A] p-2.5 mb-8 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-mono text-[#737373] uppercase px-2 hidden lg:inline">ACCÈS DIRECT AUX AUTRES PAGES DU SITE :</span>
            <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
              {[
                { label: 'ACCUEIL', view: 'home' },
                { label: "L'ATELIER", view: 'home', sectionId: 'atelier' },
                { label: 'PNEUS & BIBS', view: 'pneus' },
                { label: 'MOTOS À VENDRE', view: 'motos' },
                { label: 'BLOG & GUIDES', view: 'blog' },
                { label: 'CONTACT', view: 'contact' },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => onNavigate(link.view, link.sectionId)}
                  className="px-3 py-1.5 bg-[#161616] hover:bg-[#FF6600] text-[#A3A3A3] hover:text-[#080808] border border-[#222222] text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Header */}
        <div className="pb-10 border-b border-[#1A1A1A] mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#FF6600] uppercase tracking-widest mb-2">
            <span className="w-2 h-0.5 bg-[#FF6600]" />
            <span>PROTOCOLES TECHNIQUES ATELIER</span>
          </div>
          <h1 className="font-heading font-black text-5xl sm:text-7xl text-[#F5F5F2] uppercase tracking-tight">
            SERVICES & EXPERTISE
          </h1>
          <p className="text-sm sm:text-base text-[#A3A3A3] mt-2 max-w-2xl leading-relaxed">
            Chez Ride Factory, aucune intervention n'est laissée au hasard. Découvrez le détail de nos 4 domaines d'intervention mécanique pour motos off-road et tous types de motos à Mons.
          </p>
        </div>

        {/* Tab Selectors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {SERVICES_DATA.map((srv) => {
            const isSelected = srv.id === selectedServiceId;
            return (
              <button
                key={srv.id}
                onClick={() => setSelectedServiceId(srv.id)}
                className={`p-4 text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#141414] border-[#FF6600] text-[#F5F5F2]'
                    : 'bg-[#0e0e0e] border-[#1A1A1A] text-[#A3A3A3] hover:border-[#333333]'
                }`}
              >
                <div className="text-xs font-mono text-[#FF6600] mb-1">{srv.number}</div>
                <div className="font-heading font-black text-xl uppercase tracking-wide">
                  {srv.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Service Detailed View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-[#111111] border border-[#1A1A1A] p-6 sm:p-10">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-xs font-mono text-[#A3A3A3] mb-3">
                <span className="text-[#FF6600] font-bold">{currentService.number}</span>
                <span>/</span>
                <span>DÉLAI ESTIMÉ : {currentService.leadTime}</span>
              </div>

              <h2 className="font-heading font-black text-4xl sm:text-5xl text-[#F5F5F2] uppercase mb-4">
                {currentService.title}
              </h2>

              <p className="text-base text-[#F5F5F2] leading-relaxed mb-6 font-medium">
                {currentService.shortDesc}
              </p>

              <p className="text-sm text-[#A3A3A3] leading-relaxed mb-8">
                {currentService.fullDescription}
              </p>

              <div className="border-t border-[#1A1A1A] pt-6 mb-8">
                <h3 className="font-heading font-bold text-base text-[#F5F5F2] uppercase mb-4">
                  CHECKLIST DES OPÉRATIONS ATELIER :
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  {currentService.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[#A3A3A3]">
                      <span className="w-1.5 h-1.5 bg-[#FF6600] mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#1A1A1A] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-[#737373]">
                Machines éligibles : {currentService.recommendedFor.join(' · ')}
              </div>
              <button
                onClick={() => onSelectServiceForBooking(currentService.title)}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#FF6600] text-[#080808] font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#E65C00] transition-colors"
              >
                RÉSERVER CETTE PRESTATION
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[300px] overflow-hidden bg-[#1A1A1A]">
            <img
              src={currentService.image}
              alt={currentService.title}
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/engine_preparation_detail.jpg';
              }}
              className="w-full h-full object-cover object-center filter contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 bg-[#080808]/90 p-3 border border-[#222222] text-xs font-mono text-[#A3A3A3]">
              Atelier Ride Factory · Petite Rue des Prés 1, 7000 Mons
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
