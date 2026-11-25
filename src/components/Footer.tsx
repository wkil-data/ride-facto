import { useState } from 'react';
import { Logo } from './Logo';
import { Lock, Unlock, Eye, EyeOff, AlertCircle, X } from 'lucide-react';

interface FooterProps {
  isAdmin: boolean;
  onAdminLoginSuccess: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
  onOpenBooking: () => void;
}

const ADMIN_PASSWORD = 'Ride_F10';

export function Footer({ isAdmin, onAdminLoginSuccess, onNavigate, onOpenBooking }: FooterProps) {
  const [legalModal, setLegalModal] = useState<string | null>(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [adminError, setAdminError] = useState('');

  const handlePadlockClick = () => {
    if (isAdmin) {
      onNavigate('motos');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setShowAdminModal(true);
    setAdminError('');
    setAdminPassword('');
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === ADMIN_PASSWORD) {
      onAdminLoginSuccess();
      setShowAdminModal(false);
      setAdminPassword('');
      setAdminError('');
      onNavigate('motos');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setAdminError('Mot de passe incorrect.');
    }
  };

  return (
    <footer className="bg-[#F2F1ED] border-t border-[#E6E4DE] pt-16 pb-12 text-[#6E6D6A] select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-[#E6E4DE]">
          {/* Col 1: Brand & Address */}
          <div className="md:col-span-5 space-y-4">
            <Logo size="md" showSubtitle />
            <p className="text-sm text-[#6E6D6A] max-w-sm leading-relaxed">
              Atelier moto indépendant dédié à l’entretien, la réparation, les pneumatiques et la préparation tout-terrain à Mons.
            </p>
            <div className="text-xs text-[#6E6D6A] space-y-1.5 pt-1">
              <div>Petite Rue des Prés 1, 7000 Mons</div>
              <div className="tabular-nums">Lun – Sam · 09:00 – 18:00 · 0470/55.66.96</div>
              <div>
                <a
                  href="mailto:info@ride-factory.be"
                  className="text-[#141413] hover:text-[#FF5A00] transition-colors font-medium"
                >
                  info@ride-factory.be
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3">
            <h4 className="font-heading font-semibold text-sm text-[#141413] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home', 'atelier')}
                  className="hover:text-[#141413] transition-colors cursor-pointer"
                >
                  L’atelier
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#141413] transition-colors cursor-pointer"
                >
                  Services & Tarifs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('motos')}
                  className="hover:text-[#141413] transition-colors cursor-pointer"
                >
                  Motos à vendre
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="hover:text-[#141413] transition-colors cursor-pointer"
                >
                  Guides techniques
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#141413] transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Action & Socials */}
          <div className="md:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <h4 className="font-heading font-semibold text-sm text-[#141413] mb-4">
                Réseaux & Rendez-vous
              </h4>
              <div className="flex flex-col space-y-2 text-sm mb-5">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#141413] transition-colors"
                >
                  Instagram @ridefactory
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#141413] transition-colors"
                >
                  Facebook /ridefactorymons
                </a>
              </div>
              <button
                onClick={onOpenBooking}
                className="px-5 py-2.5 bg-[#141413] hover:bg-[#FF5A00] text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
              >
                Prendre rendez-vous
              </button>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6E6D6A]">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} Ride Factory Mons</span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-[#141413]">Work. Ride. Repeat.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setLegalModal('mentions')}
              className="hover:text-[#141413] transition-colors cursor-pointer"
            >
              Mentions légales
            </button>
            <button
              onClick={() => setLegalModal('cgv')}
              className="hover:text-[#141413] transition-colors cursor-pointer"
            >
              Conditions générales
            </button>
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-[#141413] transition-colors cursor-pointer"
            >
              Confidentialité
            </button>
            {/* Discreet padlock icon for admin access */}
            <button
              onClick={handlePadlockClick}
              aria-label="Administration"
              className="text-[#C8C5BD] opacity-60 hover:opacity-100 hover:text-[#6E6D6A] transition-opacity p-1 rounded cursor-pointer"
            >
              <Lock className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Legal Modal */}
      {legalModal && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setLegalModal(null)}
        >
          <div
            className="bg-white border border-[#E6E4DE] rounded-2xl max-w-lg w-full p-6 sm:p-8 relative max-h-[80vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-5 right-5 p-1.5 text-[#6E6D6A] hover:text-[#141413] rounded-lg hover:bg-[#F2F1ED] cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-heading font-bold text-xl text-[#141413] mb-4">
              {legalModal === 'mentions'
                ? 'Mentions légales'
                : legalModal === 'cgv'
                ? 'Conditions générales'
                : 'Politique de confidentialité'}
            </h3>

            <div className="space-y-4 text-sm text-[#6E6D6A] leading-relaxed">
              {legalModal === 'mentions' && (
                <>
                  <p>
                    <strong className="text-[#141413]">Éditeur du site :</strong> Ride Factory, Petite Rue des Prés 1, 7000 Mons, Belgique.
                  </p>
                  <p>
                    <strong className="text-[#141413]">Contact :</strong>{' '}
                    <a href="mailto:info@ride-factory.be" className="text-[#FF5A00] hover:underline">
                      info@ride-factory.be
                    </a>{' '}
                    · 0470/55.66.96
                  </p>
                  <p>
                    <strong className="text-[#141413]">Activité :</strong> Atelier de réparation, entretien et préparation de motocycles, vente de pièces et véhicules.
                  </p>
                </>
              )}

              {legalModal === 'cgv' && (
                <>
                  <p>
                    Toute intervention mécanique fait l’objet d’un ordre de réparation préalable ou d’un devis validé par le client.
                  </p>
                  <p>
                    Les pièces d’usure remplacées sont tenues à disposition du propriétaire lors de la restitution du véhicule.
                  </p>
                </>
              )}

              {legalModal === 'privacy' && (
                <>
                  <p>
                    Les données recueillies dans le cadre des demandes de rendez-vous sont exclusivement destinées au suivi technique de votre dossier par Ride Factory.
                  </p>
                  <p>
                    Conformément au RGPD, vous disposez d’un droit d’accès, de rectification et d’effacement en nous contactant à l’adresse{' '}
                    <a href="mailto:info@ride-factory.be" className="text-[#FF5A00] hover:underline">
                      info@ride-factory.be
                    </a>.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Discreet Admin Login Modal */}
      {showAdminModal && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => {
            setShowAdminModal(false);
            setAdminError('');
            setAdminPassword('');
          }}
        >
          <div
            className="bg-white border border-[#E6E4DE] rounded-2xl max-w-sm w-full p-6 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setShowAdminModal(false);
                setAdminError('');
                setAdminPassword('');
              }}
              className="absolute top-4 right-4 p-1.5 text-[#6E6D6A] hover:text-[#141413] rounded-lg hover:bg-[#F2F1ED] cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-5">
              <div className="w-9 h-9 bg-[#F2F1ED] rounded-full flex items-center justify-center mb-3">
                <Lock className="w-4 h-4 text-[#FF5A00]" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#141413]">
                Accès gestion
              </h3>
              <p className="text-xs text-[#6E6D6A] mt-0.5">
                Espace réservé à l’équipe Ride Factory
              </p>
            </div>

            {adminError && (
              <div className="mb-4 p-2.5 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{adminError}</span>
              </div>
            )}

            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#6E6D6A] mb-1.5">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPasswordText ? 'text' : 'password'}
                    autoFocus
                    required
                    placeholder="••••••••"
                    value={adminPassword}
                    onChange={(e) => {
                      setAdminPassword(e.target.value);
                      setAdminError('');
                    }}
                    className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg px-3.5 py-2.5 text-sm text-[#141413] font-mono focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordText(!showPasswordText)}
                    className="absolute right-2.5 top-2.5 text-[#6E6D6A] hover:text-[#141413] cursor-pointer"
                    aria-label="Afficher le mot de passe"
                  >
                    {showPasswordText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-1 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAdminModal(false);
                    setAdminError('');
                    setAdminPassword('');
                  }}
                  className="w-1/3 py-2.5 bg-[#F2F1ED] text-[#6E6D6A] hover:text-[#141413] text-xs font-medium rounded-lg cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 bg-[#141413] hover:bg-[#FF5A00] text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Connexion</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
}
