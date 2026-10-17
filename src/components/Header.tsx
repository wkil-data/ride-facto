import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone, MapPin, Clock, Calendar } from 'lucide-react';
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
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'ACCUEIL', view: 'home', sectionId: undefined },
    { label: 'ATELIER', view: 'home', sectionId: 'atelier' },
    { label: 'SERVICES & TARIFS', view: 'services', sectionId: undefined },
    { label: 'PNEUS & BIB', view: 'pneus', sectionId: undefined },
    { label: 'MOTOS', view: 'motos', sectionId: undefined },
    { label: 'BLOG', view: 'blog', sectionId: undefined },
    { label: 'CONTACT', view: 'contact', sectionId: undefined },
  ];

  const handleLinkClick = (view: string, sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(view, sectionId);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Utility Strip (visible on large screens, compact on small) */}
      <div className="bg-[#050505] border-b border-[#1A1A1A] py-1.5 px-4 text-[11px] font-mono text-[#888888] hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 hover:text-[#F5F5F2] transition-colors">
              <MapPin className="w-3 h-3 text-[#FF6600]" />
              <span>Petite Rue des Prés 1, 7000 Mons</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-[#FF6600]" />
              <span>Lun – Sam : 09h00 – 18h00</span>
            </span>
            <span className="hidden lg:inline text-[#FF6600] font-semibold">
              Atelier Spécialiste Tout-Terrain & Adventure
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+32470556696"
              className="flex items-center gap-1.5 text-[#F5F5F2] hover:text-[#FF6600] font-bold transition-colors"
            >
              <Phone className="w-3 h-3 text-[#FF6600]" />
              <span>0470/55.66.96</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080808]/98 backdrop-blur-md border-b border-[#1E1E1E] py-3 shadow-2xl shadow-black/90'
            : 'bg-[#080808]/90 backdrop-blur-sm border-b border-[#1A1A1A]/60 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo Zone */}
          <button
            onClick={() => handleLinkClick('home')}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] group transition-transform hover:opacity-95 text-left"
            aria-label="Ride Factory Accueil"
          >
            <Logo size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => {
              const isActive =
                currentView === link.view &&
                (!link.sectionId || (link.sectionId === 'atelier' && currentView === 'home'));
              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.view, link.sectionId)}
                  className={`text-xs font-bold tracking-wider font-heading uppercase transition-colors relative py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF6600] ${
                    isActive
                      ? 'text-[#FF6600]'
                      : 'text-[#C5C5C2] hover:text-[#F5F5F2]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FF6600] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+32470556696"
              className="flex items-center gap-2 text-xs font-mono text-[#C5C5C2] hover:text-[#FF6600] transition-colors px-2 py-1 rounded border border-[#222222] bg-[#101010]"
              title="Téléphone atelier Mons"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF6600]" />
              <span className="font-semibold">0470/55.66.96</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6600] text-[#080808] font-heading font-black text-xs uppercase tracking-wider hover:bg-[#E65C00] transition-colors cursor-pointer select-none active:scale-[0.98] shadow-lg shadow-[#FF6600]/20"
            >
              <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>PRENDRE RENDEZ-VOUS</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Tablet & Mobile Menu Toggle Bar */}
          <div className="flex lg:hidden items-center gap-2.5">
            <a
              href="tel:+32470556696"
              className="p-2 border border-[#262626] bg-[#121212] text-[#FF6600] hover:border-[#FF6600] transition-colors"
              aria-label="Appeler 0470/55.66.96"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenBooking}
              className="px-3 py-2 bg-[#FF6600] text-[#080808] font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#E65C00] transition-colors"
            >
              RDV
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#2A2A2A] bg-[#141414] text-[#F5F5F2] hover:border-[#FF6600] hover:text-[#FF6600] transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu de navigation'}
            >
              {mobileMenuOpen ? (
                <>
                  <X className="w-5 h-5 text-[#FF6600]" />
                  <span className="text-xs font-heading font-bold uppercase tracking-wider">FERMER</span>
                </>
              ) : (
                <>
                  <Menu className="w-5 h-5 text-[#FF6600]" />
                  <span className="text-xs font-heading font-bold uppercase tracking-wider">MENU</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Mobile / Tablet Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0A]/98 backdrop-blur-xl border-b border-[#222222] p-5 sm:p-6 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
          <div className="text-[11px] text-[#A3A3A3] font-mono uppercase tracking-widest pb-3 border-b border-[#1E1E1E] flex flex-wrap justify-between items-center gap-2">
            <span className="text-[#F5F5F2] font-semibold flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#FF6600]" /> Petite Rue des Prés 1, 7000 Mons
            </span>
            <span className="text-[#FF6600]">Lun–Sam 09:00–18:00</span>
          </div>

          {/* Navigation Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-2">
            {navLinks.map((link) => {
              const isActive =
                currentView === link.view &&
                (!link.sectionId || (link.sectionId === 'atelier' && currentView === 'home'));
              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.view, link.sectionId)}
                  className={`text-left font-heading text-base font-bold py-2.5 px-3 border transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-[#FF6600]/10 border-[#FF6600] text-[#FF6600]'
                      : 'bg-[#121212] border-[#1E1E1E] text-[#F5F5F2] hover:border-[#333333] hover:text-[#FF6600]'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono text-[#888888]">→</span>
                </button>
              );
            })}
          </div>

          {/* Quick Actions in Mobile Drawer */}
          <div className="pt-3 border-t border-[#1E1E1E] flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="flex-1 py-3 bg-[#FF6600] text-[#080808] font-heading font-black text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#E65C00] transition-colors"
            >
              <Calendar className="w-4 h-4 stroke-[2.5]" />
              <span>PRENDRE RENDEZ-VOUS EN LIGNE</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <a
              href="tel:+32470556696"
              className="py-3 px-4 border border-[#2A2A2A] bg-[#121212] text-[#F5F5F2] font-heading text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:border-[#FF6600] hover:text-[#FF6600] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#FF6600]" />
              <span>0470/55.66.96</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
