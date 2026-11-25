import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, sectionId?: string) => void;
  onOpenBooking: () => void;
}

export function Header({ currentView, onNavigate, onOpenBooking }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', view: 'services', sectionId: undefined },
    { label: 'Motos', view: 'motos', sectionId: undefined },
    { label: 'Blog', view: 'blog', sectionId: undefined },
    { label: 'Contact', view: 'contact', sectionId: undefined },
  ];

  const handleLinkClick = (view: string, sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(view, sectionId);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 border-b ${
        isScrolled
          ? 'bg-[#FAFAF8]/92 backdrop-blur-md border-[#E6E4DE]'
          : 'bg-[#FAFAF8]/80 backdrop-blur-sm border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleLinkClick('home')}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A00] rounded-lg group cursor-pointer whitespace-nowrap shrink-0"
          aria-label="Ride Factory Accueil"
        >
          <Logo size="sm" />
        </button>

        {/* Zone 2: 5 Clean Single-Line Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = currentView === link.view;
            return (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.view, link.sectionId)}
                className={`text-sm font-medium transition-colors duration-150 relative py-1 cursor-pointer whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A00] rounded ${
                  isActive
                    ? 'text-[#141413] font-semibold'
                    : 'text-[#6E6D6A] hover:text-[#141413]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-[#FF5A00]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="hidden md:flex items-center shrink-0">
          <button
            onClick={onOpenBooking}
            className="px-4 py-2 bg-[#141413] hover:bg-[#FF5A00] text-[#FAFAF8] text-sm font-medium rounded-lg transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A00] focus-visible:ring-offset-2"
          >
            Prendre rendez-vous
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center gap-2 shrink-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#141413] hover:bg-[#F2F1ED] rounded-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A00]"
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Minimalist Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAFAF8] border-b border-[#E6E4DE] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-1">
            <button
              onClick={() => handleLinkClick('home')}
              className={`text-left py-2.5 text-base font-medium border-b border-[#E6E4DE]/60 cursor-pointer ${
                currentView === 'home' ? 'text-[#FF5A00]' : 'text-[#141413]'
              }`}
            >
              Accueil
            </button>
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.view, link.sectionId)}
                  className={`text-left py-2.5 text-base font-medium border-b border-[#E6E4DE]/60 cursor-pointer ${
                    isActive ? 'text-[#FF5A00]' : 'text-[#141413]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 bg-[#FF5A00] hover:bg-[#E04E00] text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
            >
              Prendre rendez-vous
            </button>
            <div className="text-xs text-[#6E6D6A] flex flex-wrap items-center justify-between gap-2 pt-1">
              <span>Petite Rue des Prés 1, Mons</span>
              <div className="flex items-center gap-3">
                <a href="mailto:info@ride-factory.be" className="text-[#141413] hover:text-[#FF5A00]">
                  info@ride-factory.be
                </a>
                <a href="tel:+32470556696" className="font-mono text-[#141413]">
                  0470/55.66.96
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
