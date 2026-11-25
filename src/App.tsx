/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
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
  const [currentView, setCurrentView] = useState<'home' | 'services' | 'motos' | 'contact' | 'blog'>('home');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedBookingService, setPreselectedBookingService] = useState<string | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('ride_factory_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const handleAdminLoginSuccess = () => {
    setIsAdmin(true);
    try {
      sessionStorage.setItem('ride_factory_admin_auth', 'true');
    } catch (err) {
      console.warn(err);
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    try {
      sessionStorage.removeItem('ride_factory_admin_auth');
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    const seoMap: Record<string, { title: string; desc: string }> = {
      home: {
        title: 'Ride Factory Mons — Garage & Atelier Moto Multimarques',
        desc: 'Atelier et garage moto à Mons : entretien, réparation, pneus, préparation tout-terrain et vente de motos toutes marques. Prenez rendez-vous au 0470/55.66.96.',
      },
      services: {
        title: 'Entretien, Pneus & Réparation Moto à Mons | Ride Factory',
        desc: 'Découvrez nos prestations atelier à Mons : révision toutes marques, montage pneus & bib mousse, réparation moteur et préparation off-road.',
      },
      motos: {
        title: 'Motos d’Occasion Révisées à Mons | Ride Factory',
        desc: 'Consultez nos motos enduro, trail, motocross et adventure révisées sur 32 points et disponibles à Mons chez Ride Factory.',
      },
      contact: {
        title: 'Contact & Rendez-Vous Garage Moto Mons | Ride Factory',
        desc: 'Prenez rendez-vous à l’atelier Ride Factory à Mons (Petite Rue des Prés 1). Contact par téléphone 0470/55.66.96 ou par email à info@ride-factory.be.',
      },
      blog: {
        title: 'Conseils Mécanique Moto & Tout-Terrain | Blog Ride Factory',
        desc: 'Guides pratiques et astuces d’atelier par Ride Factory Mons : entretien enduro, montage bib mousse, suspensions et préparation rallye.',
      },
    };

    const currentSeo = seoMap[currentView] || seoMap.home;
    document.title = currentSeo.title;

    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', currentSeo.desc);
    setMeta('meta[property="og:title"]', currentSeo.title);
    setMeta('meta[property="og:description"]', currentSeo.desc);
    setMeta('meta[name="twitter:title"]', currentSeo.title);
    setMeta('meta[name="twitter:description"]', currentSeo.desc);
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
    <div className="min-h-screen bg-[#FAFAF8] text-[#141413] flex flex-col font-sans selection:bg-[#FF5A00] selection:text-white">
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero
              onOpenBooking={() => handleOpenBooking()}
              onScrollToAtelier={handleScrollToAtelier}
            />

            <ServicesSection
              onSelectServiceForBooking={(srv) => handleOpenBooking(srv)}
            />

            <AboutSection
              onOpenBooking={() => handleOpenBooking()}
              onNavigateMotos={() => handleNavigate('motos')}
            />

            <BrandsSection />

            <LocationSection
              onOpenBooking={() => handleOpenBooking()}
            />
          </>
        )}

        {currentView === 'services' && (
          <ServicesDetailView
            onSelectServiceForBooking={(srv) => handleOpenBooking(srv)}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentView === 'motos' && (
          <BikesView
            isAdmin={isAdmin}
            onAdminLogout={handleAdminLogout}
            onOpenBookingForBike={(bike) => handleOpenBooking(`Visite moto : ${bike}`)}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentView === 'contact' && (
          <ContactView
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentView === 'blog' && (
          <BlogView
            onOpenBooking={(srv) => handleOpenBooking(srv)}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}
      </main>

      <Footer
        isAdmin={isAdmin}
        onAdminLoginSuccess={handleAdminLoginSuccess}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      <WhatsAppButton phoneNumber="32470556696" displayPhone="0470/55.66.96" />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedService={preselectedBookingService}
      />
    </div>
  );
}
