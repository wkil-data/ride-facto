/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandBanner } from './components/BrandBanner';
import { ServicesSection } from './components/ServicesSection';
import { SpecialistOffroadSection } from './components/SpecialistOffroadSection';
import { TiresFocusSection } from './components/TiresFocusSection';
import { BrandsSection } from './components/BrandsSection';
import { AboutSection } from './components/AboutSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { BikesView } from './components/BikesView';
import { ServicesDetailView } from './components/ServicesDetailView';
import { ContactView } from './components/ContactView';
import { BlogView } from './components/BlogView';
import { WhatsAppButton } from './components/WhatsAppButton';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'services' | 'pneus' | 'motos' | 'contact' | 'blog'>('home');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedBookingService, setPreselectedBookingService] = useState<string | undefined>(undefined);

  // SEO View Title & Description synchronization
  useEffect(() => {
    const seoMap: Record<string, { title: string; desc: string }> = {
      home: {
        title: 'RIDE FACTORY — Atelier & Garage Moto Mons | Petite Rue des Prés 1',
        desc: 'Atelier moto d’exception à Mons (Belgique) : Entretien, réparation, pneumatiques & bib mousse, préparation off-road et rally raid. Petite Rue des Prés 1, 7000 Mons.',
      },
      services: {
        title: 'Services & Entretien Moto à Mons | RIDE FACTORY',
        desc: 'Prestations d’entretien, révision moteur, suspensions et diagnostic moto tout-terrain à Mons chez RIDE FACTORY.',
      },
      pneus: {
        title: 'Montage Pneus & Bib Mousse Moto Mons | RIDE FACTORY',
        desc: 'Spécialiste montage pneumatiques, bib mousse, tubliss et équilibrage moto enduro, cross, trail et adventure à Mons.',
      },
      motos: {
        title: 'Motos Disponibles & Préparations Atelier | RIDE FACTORY Mons',
        desc: 'Découvrez les motos d’occasion révisées et projets préparés par l’atelier RIDE FACTORY à Mons.',
      },
      contact: {
        title: 'Contact & Rendez-Vous Atelier Moto Mons | RIDE FACTORY (0470/55.66.96)',
        desc: 'Contactez l’atelier RIDE FACTORY à Mons : Petite Rue des Prés 1, 7000 Mons. Téléphone & WhatsApp 0470/55.66.96.',
      },
      blog: {
        title: 'Guides & Conseils Mécanique Moto Tout-Terrain | Blog RIDE FACTORY Mons',
        desc: 'Articles techniques et conseils de mécaniciens : montage bib mousse, entretien suspensions, préparation rallye raid à Mons.',
      },
    };

    const currentSeo = seoMap[currentView] || seoMap.home;
    document.title = currentSeo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', currentSeo.desc);
    }
  }, [currentView]);

  const handleNavigate = (view: string, sectionId?: string) => {
    setCurrentView(view as any);
    window.scrollTo({ top: 0, behavior: 'instant' });

    if (view === 'home' && sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  const handleOpenBooking = (service?: string) => {
    setPreselectedBookingService(service);
    setBookingModalOpen(true);
  };

  const handleScrollToAtelier = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById('atelier');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      const el = document.getElementById('atelier');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F2] flex flex-col font-sans selection:bg-[#FF6600] selection:text-[#080808]">
      {/* Universal Motorsport Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero
              onOpenBooking={() => handleOpenBooking()}
              onScrollToAtelier={handleScrollToAtelier}
            />

            <BrandBanner />

            <ServicesSection
              onSelectServiceForBooking={(srv) => handleOpenBooking(srv)}
            />

            <SpecialistOffroadSection
              onOpenBooking={() => handleOpenBooking('Préparation')}
            />

            <TiresFocusSection
              onOpenBookingForTires={() => handleOpenBooking('Pneumatiques / Bib Mousse')}
            />

            <BrandsSection />

            <AboutSection />

            <LocationSection
              onOpenBooking={() => handleOpenBooking()}
            />
          </>
        )}

        {currentView === 'services' && (
          <ServicesDetailView
            onSelectServiceForBooking={(srv) => handleOpenBooking(srv)}
            onNavigateHome={() => handleNavigate('home')}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'pneus' && (
          <div className="pt-24 bg-[#080808]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
              <button
                onClick={() => handleNavigate('home')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#111111] hover:bg-[#1A1A1A] text-[#F5F5F2] hover:text-[#FF6600] border border-[#222222] text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
              >
                <span>← RETOUR À LA PAGE D'ACCUEIL</span>
              </button>
            </div>
            <TiresFocusSection
              onOpenBookingForTires={() => handleOpenBooking('Pneumatiques / Bib Mousse')}
            />
            <ServicesSection
              onSelectServiceForBooking={(srv) => handleOpenBooking(srv)}
            />
          </div>
        )}

        {currentView === 'motos' && (
          <BikesView
            onOpenBookingForBike={(bike) => handleOpenBooking(`Visite moto : ${bike}`)}
            onNavigateHome={() => handleNavigate('home')}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'contact' && (
          <ContactView
            onOpenBooking={() => handleOpenBooking()}
            onNavigateHome={() => handleNavigate('home')}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'blog' && (
          <BlogView
            onOpenBooking={(srv) => handleOpenBooking(srv)}
            onNavigateHome={() => handleNavigate('home')}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Global Motorsport Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Floating Round WhatsApp Chat Widget */}
      <WhatsAppButton phoneNumber="32470556696" displayPhone="0470/55.66.96" />

      {/* Interactive Booking Modal / Odoo Connector */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedService={preselectedBookingService}
      />
    </div>
  );
}
