import { useState } from 'react';
import { Logo } from './Logo';
import {
  ArrowUp,
  Instagram,
  Facebook,
  ShieldCheck,
  FileText,
  Phone,
  Mail,
  MapPin,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  AlertCircle,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, sectionId?: string) => void;
  onOpenBooking: () => void;
}

const ADMIN_PASSWORD = 'Ride_F10';
const ADMIN_AUTH_KEY = 'ride_factory_admin_auth';

export function Footer({ onNavigate, onOpenBooking }: FooterProps) {
  const [legalModal, setLegalModal] = useState<string | null>(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [adminError, setAdminError] = useState('');

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === ADMIN_PASSWORD) {
      try {
        sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      } catch (err) {
        console.warn(err);
      }
      setShowAdminModal(false);
      setAdminPassword('');
      setAdminError('');
      // Navigate to 'motos' page where admin management is active
      onNavigate('motos');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setAdminError('Mot de passe incorrect.');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080808] border-t border-[#1A1A1A] pt-16 pb-12 text-[#A3A3A3] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#1A1A1A]">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Logo size="md" />
            </div>
            <p className="text-xs text-[#A3A3A3] max-w-sm leading-relaxed">
              Atelier moto indépendant spécialisé en entretien, préparation, pneumatiques et réfection mécanique. Spécialiste Enduro, Trail, Motocross et Adventure à Mons.
            </p>

            <div className="pt-2 text-xs font-mono text-[#737373] space-y-1">
              <div><strong className="text-[#F5F5F2]">RIDE FACTORY</strong></div>
              <div>Atelier & Garage Moto Tout-Terrain · Mons, Belgique</div>
              <div>Petite Rue des Prés 1, 7000 Mons</div>
            </div>
          </div>

          {/* Col 2: Navigation Atelier */}
          <div>
            <h4 className="font-heading font-bold text-sm text-[#F5F5F2] uppercase tracking-wider mb-4">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button
                  onClick={() => onNavigate('home', 'atelier')}
                  className="hover:text-[#FF6600] transition-colors"
                >
                  L'Atelier
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#FF6600] transition-colors"
                >
                  Tous nos Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pneus')}
                  className="hover:text-[#FF6600] transition-colors"
                >
                  Pneus & Bib Mousse
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('motos')}
                  className="hover:text-[#FF6600] transition-colors"
                >
                  Motos à Vendre
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="text-[#FF6600] font-bold hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span>Blog & Guides Techniques</span>
                  <span className="text-[10px] bg-[#1A1A1A] text-[#F5F5F2] px-1.5 py-0.2 border border-[#333333]">10 guides</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'about')}
                  className="hover:text-[#FF6600] transition-colors"
                >
                  À Propos / Built to Ride
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services Clés */}
          <div>
            <h4 className="font-heading font-bold text-sm text-[#F5F5F2] uppercase tracking-wider mb-4">
              INTERVENTIONS
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>Vidange & Révision périodique</li>
              <li>Montage Bib Mousse & Pneus</li>
              <li>Diagnostic & Électricité moto</li>
              <li>Préparation Suspensions</li>
              <li>Échappement & Cartographie</li>
              <li>Partie cycle & Biellettes</li>
            </ul>
          </div>

          {/* Col 4: Réseaux & Contact */}
          <div>
            <h4 className="font-heading font-bold text-sm text-[#F5F5F2] uppercase tracking-wider mb-4">
              COMMUNAUTÉ
            </h4>
            <div className="space-y-3 text-xs font-mono mb-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#FF6600] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#FF6600]" />
                <span>Instagram @ridefactory</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#FF6600] transition-colors"
              >
                <Facebook className="w-4 h-4 text-[#FF6600]" />
                <span>Facebook /ridefactorymons</span>
              </a>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-2.5 bg-[#FF6600] text-[#080808] font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#E65C00] transition-colors"
            >
              PRENDRE RENDEZ-VOUS
            </button>
          </div>
        </div>

        {/* Blog Highlight Box in Footer */}
        <div className="my-10 bg-[#111111] border border-[#1A1A1A] hover:border-[#333333] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-colors">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF6600] uppercase tracking-widest">
              <span className="w-2 h-0.5 bg-[#FF6600]" />
              <span>BLOG & GUIDES TECHNIQUES DE L'ATELIER · MONS</span>
            </div>
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#F5F5F2] uppercase tracking-wide">
              10 DOSSIERS MÉCANIQUES & CONSEILS OFF-ROAD
            </h3>
            <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
              Entretien enduro 2T/4T, montage bib mousse sans pincer, préparation trail TET, réfection motocross et métrologie d'atelier à Mons. Des articles complets de plus de 900 mots rédigés par nos mécaniciens.
            </p>
          </div>

          <button
            onClick={() => onNavigate('blog')}
            className="px-6 py-3.5 bg-[#FF6600] hover:bg-[#E65C00] text-[#080808] font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shrink-0"
          >
            <span>ACCÉDER AU BLOG TECHNIQUE</span>
            <span className="text-sm">→</span>
          </button>
        </div>

        {/* Bottom Bar with Final Punchline */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Final Requested Punchline */}
          <div className="font-heading font-black text-2xl sm:text-3xl text-[#F5F5F2] tracking-wider uppercase flex items-center gap-3">
            <span>WORK.</span>
            <span className="text-[#FF6600]">RIDE.</span>
            <span>REPEAT.</span>
          </div>

          {/* Legal links */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#737373]">
            <button
              onClick={() => setLegalModal('mentions')}
              className="hover:text-[#F5F5F2] transition-colors"
            >
              Mentions Légales
            </button>
            <span>·</span>
            <button
              onClick={() => setLegalModal('cgv')}
              className="hover:text-[#F5F5F2] transition-colors"
            >
              Conditions Générales
            </button>
            <span>·</span>
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-[#F5F5F2] transition-colors"
            >
              Politique de Confidentialité
            </button>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="p-2.5 bg-[#111111] hover:bg-[#1A1A1A] border border-[#222222] text-[#F5F5F2] transition-colors cursor-pointer"
            aria-label="Remonter en haut de page"
          >
            <ArrowUp className="w-4 h-4 text-[#FF6600]" />
          </button>
        </div>

        <div className="text-[11px] font-mono text-[#555555] mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            © {new Date().getFullYear()} RIDE FACTORY · Tous droits réservés. Garage moto Mons, Belgique (Petite Rue des Prés 1, 7000 Mons).
          </div>
          {/* Discret padlock for admin access - no password displayed */}
          <button
            onClick={() => {
              setShowAdminModal(true);
              setAdminError('');
            }}
            aria-label="Accès sécurisé"
            className="text-[#333333] hover:text-[#777777] transition-colors p-1 rounded cursor-pointer"
            title="Espace sécurisé"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Legal Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[#222222] max-w-xl w-full p-6 sm:p-8 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-5 right-5 text-[#A3A3A3] hover:text-[#F5F5F2]"
            >
              ✕
            </button>

            <h3 className="font-heading font-black text-2xl text-[#F5F5F2] uppercase mb-4">
              {legalModal === 'mentions'
                ? 'MENTIONS LÉGALES'
                : legalModal === 'cgv'
                ? 'CONDITIONS GÉNÉRALES'
                : 'POLITIQUE DE CONFIDENTIALITÉ'}
            </h3>

            <div className="space-y-4 text-xs font-mono text-[#A3A3A3] leading-relaxed">
              {legalModal === 'mentions' && (
                <>
                  <p>
                    <strong className="text-[#F5F5F2]">Éditeur du site :</strong><br />
                    RIDE FACTORY<br />
                    Petite Rue des Prés 1, 7000 Mons, Belgique
                  </p>
                  <p>
                    <strong className="text-[#F5F5F2]">Activité :</strong> Atelier de réparation, entretien et préparation de motocycles, vente de pièces détachées, consommables et équipements.
                  </p>
                  <p>
                    <strong className="text-[#F5F5F2]">Responsable de publication :</strong> Direction RIDE FACTORY Mons.
                  </p>
                </>
              )}

              {legalModal === 'cgv' && (
                <>
                  <p>
                    Toute intervention mécanique fait l'objet d'un ordre de réparation préalable ou d'un devis validé par le client.
                  </p>
                  <p>
                    Les pièces d'usure remplacées sont tenues à disposition du propriétaire lors de la restitution du véhicule.
                  </p>
                  <p>
                    Les machines doivent être retirées dans un délai de 5 jours ouvrés suivant la notification d'achèvement des travaux.
                  </p>
                </>
              )}

              {legalModal === 'privacy' && (
                <>
                  <p>
                    Les données personnelles recueillies dans le cadre des demandes de rendez-vous (nom, prénom, téléphone, email, caractéristiques du véhicule) sont uniquement destinées au traitement technique et commercial de votre dossier par RIDE FACTORY.
                  </p>
                  <p>
                    Aucune donnée n'est cédée à des tiers. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et d'effacement en nous contactant directement à l'atelier.
                  </p>
                </>
              )}
            </div>

            <div className="pt-6 mt-6 border-t border-[#1A1A1A]">
              <button
                onClick={() => setLegalModal(null)}
                className="w-full py-2.5 bg-[#1A1A1A] hover:bg-[#FF6600] hover:text-[#080808] text-[#F5F5F2] font-heading font-bold text-xs uppercase tracking-wider transition-colors"
              >
                FERMER
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discreet Admin Login Modal (Triggered exclusively by footer lock icon) */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[#222222] max-w-sm w-full p-6 relative">
            <button
              onClick={() => {
                setShowAdminModal(false);
                setAdminError('');
                setAdminPassword('');
              }}
              className="absolute top-4 right-4 text-[#737373] hover:text-[#F5F5F2]"
              aria-label="Fermer"
            >
              ✕
            </button>

            <div className="text-center mb-5">
              <div className="w-10 h-10 bg-[#1A1A1A] border border-[#333333] rounded-full flex items-center justify-center mx-auto mb-2 text-[#A3A3A3]">
                <Lock className="w-4 h-4 text-[#FF6600]" />
              </div>
              <h3 className="font-heading font-black text-lg text-[#F5F5F2] uppercase">
                ACCÈS GESTION
              </h3>
              <p className="text-[11px] text-[#737373] font-mono mt-0.5">
                Espace réservé à l'équipe Ride Factory
              </p>
            </div>

            {adminError && (
              <div className="mb-4 p-2.5 bg-red-950/70 border border-red-500/80 text-red-200 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{adminError}</span>
              </div>
            )}

            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-[#A3A3A3] uppercase mb-1">
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
                    className="w-full bg-[#080808] border border-[#333333] focus:border-[#FF6600] px-3.5 py-2.5 text-sm text-[#F5F5F2] font-mono focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordText(!showPasswordText)}
                    className="absolute right-2.5 top-2.5 text-[#737373] hover:text-[#F5F5F2]"
                  >
                    {showPasswordText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAdminModal(false);
                    setAdminError('');
                    setAdminPassword('');
                  }}
                  className="w-1/3 py-2.5 bg-[#1F1F1F] text-[#A3A3A3] hover:text-[#F5F5F2] text-xs font-mono uppercase"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 bg-[#FF6600] hover:bg-[#E65C00] text-[#080808] font-heading font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>CONNEXION</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
}
