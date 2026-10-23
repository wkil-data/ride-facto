import { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  X,
  ArrowLeft,
  Lock,
  Unlock,
  Plus,
  Edit,
  Trash2,
  RotateCcw,
  Eye,
  EyeOff,
  AlertCircle,
  Tag,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import { MOTORBIKES_DATA } from '../data/bikes';
import { Motorbike } from '../data/types';
import { BikeAdminModal } from './BikeAdminModal';

interface BikesViewProps {
  onOpenBookingForBike: (bikeName: string) => void;
  onNavigateHome?: () => void;
  onNavigate?: (view: string, sectionId?: string) => void;
}

const STORAGE_KEY = 'ride_factory_motorbikes_catalog_v3';
const ADMIN_AUTH_KEY = 'ride_factory_admin_auth';
const ADMIN_PASSWORD = 'Ride_F10';

export function BikesView({ onOpenBookingForBike, onNavigateHome, onNavigate }: BikesViewProps) {
  // Bikes catalogue state with localStorage persistence (v3 with local high-res assets)
  const [bikes, setBikes] = useState<Motorbike[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Error reading stored bikes:', err);
    }
    return MOTORBIKES_DATA;
  });

  // Admin authentication state
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Modals & UI states
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [bikeToEdit, setBikeToEdit] = useState<Motorbike | null>(null);
  const [selectedBike, setSelectedBike] = useState<Motorbike | null>(null);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  // Filters
  const [categoryFilter, setCategoryFilter] = useState<string>('TOUS');
  const [conditionFilter, setConditionFilter] = useState<string>('TOUS');
  const [statusFilter, setStatusFilter] = useState<string>('TOUS');

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bikes));
    } catch (err) {
      console.error('Error saving bikes to localStorage:', err);
    }
  }, [bikes]);

  // Toast auto-clear
  useEffect(() => {
    if (feedbackToast) {
      const timer = setTimeout(() => setFeedbackToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [feedbackToast]);

  const showToast = (msg: string) => {
    setFeedbackToast(msg);
  };

  // Admin Login Handler
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === ADMIN_PASSWORD) {
      setIsAdmin(true);
      try {
        sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      } catch (err) {
        console.warn(err);
      }
      setShowPasswordModal(false);
      setInputPassword('');
      setPasswordError('');
      showToast('Connexion Espace Admin réussie');
    } else {
      setPasswordError('Mot de passe incorrect. Veuillez vérifier la saisie.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    try {
      sessionStorage.removeItem(ADMIN_AUTH_KEY);
    } catch (err) {
      console.warn(err);
    }
    showToast('Déconnexion de l’Espace Admin effectuée');
  };

  // Bike CRUD operations
  const handleSaveBike = (savedBike: Motorbike) => {
    setBikes((prev) => {
      const exists = prev.some((b) => b.id === savedBike.id);
      if (exists) {
        return prev.map((b) => (b.id === savedBike.id ? savedBike : b));
      } else {
        return [savedBike, ...prev];
      }
    });

    // If modal open for this bike, update it
    if (selectedBike && selectedBike.id === savedBike.id) {
      setSelectedBike(savedBike);
    }

    setAdminModalOpen(false);
    setBikeToEdit(null);
    showToast(`Fiche "${savedBike.brand} ${savedBike.model}" enregistrée !`);
  };

  const handleDeleteBike = (bikeId: string, bikeName: string) => {
    if (window.confirm(`Confirmez-vous la suppression définitive de la fiche "${bikeName}" ?`)) {
      setBikes((prev) => prev.filter((b) => b.id !== bikeId));
      if (selectedBike?.id === bikeId) {
        setSelectedBike(null);
      }
      showToast(`Fiche "${bikeName}" supprimée.`);
    }
  };

  const handleUpdateStatus = (bikeId: string, newStatus: 'disponible' | 'reservee' | 'vendue') => {
    setBikes((prev) =>
      prev.map((b) => (b.id === bikeId ? { ...b, status: newStatus } : b))
    );
    showToast(`Statut mis à jour : ${newStatus.toUpperCase()}`);
  };

  const handleResetToDefaults = () => {
    if (
      window.confirm(
        'Voulez-vous restaurer les fiches motos d’origine du catalogue Ride Factory ? Vos modifications actuelles seront réinitialisées.'
      )
    ) {
      setBikes(MOTORBIKES_DATA);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(MOTORBIKES_DATA));
      } catch (err) {
        console.warn(err);
      }
      showToast('Catalogue réinitialisé avec succès');
    }
  };

  // Unique categories & conditions from current dataset
  const categories = ['TOUS', ...Array.from(new Set(bikes.map((b) => b.category)))];
  const conditions = ['TOUS', ...Array.from(new Set(bikes.map((b) => b.condition)))];

  const filteredBikes = bikes.filter((bike) => {
    const matchesCat = categoryFilter === 'TOUS' || bike.category === categoryFilter;
    const matchesCond = conditionFilter === 'TOUS' || bike.condition === conditionFilter;
    const matchesStatus =
      statusFilter === 'TOUS' ||
      (statusFilter === 'DISPONIBLES' && (bike.status === 'disponible' || !bike.status)) ||
      (statusFilter === 'RÉSERVÉES' && bike.status === 'reservee') ||
      (statusFilter === 'VENDUES' && bike.status === 'vendue');

    return matchesCat && matchesCond && matchesStatus;
  });

  return (
    <div className="pt-28 pb-24 bg-[#080808] min-h-screen text-[#F5F5F2]">
      {/* Toast Feedback */}
      {feedbackToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#FF6600] text-[#080808] px-5 py-3 font-mono font-bold text-xs uppercase shadow-2xl flex items-center gap-2 border-2 border-white">
          <CheckCircle2 className="w-4 h-4 text-[#080808]" />
          <span>{feedbackToast}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb & Back to Home */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#1A1A1A]">
          {onNavigateHome ? (
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#111111] hover:bg-[#1A1A1A] text-[#F5F5F2] hover:text-[#FF6600] border border-[#222222] text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#FF6600]" />
              <span>← RETOUR À LA PAGE D'ACCUEIL</span>
            </button>
          ) : (
            <span className="text-xs font-mono text-[#A3A3A3]">Ride Factory Mons</span>
          )}

          {/* Admin Status (if active) */}
          <div>
            {isAdmin && (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-mono font-bold uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  ADMIN CONNECTÉ
                </span>
                <button
                  onClick={handleAdminLogout}
                  className="px-3 py-1.5 bg-[#1F1F1F] hover:bg-red-950 hover:text-red-300 border border-[#333333] hover:border-red-600 text-xs font-mono uppercase text-[#A3A3A3] transition-colors cursor-pointer"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Page Navigation Menu (Cleaned of SHOP) */}
        {onNavigate && (
          <div className="bg-[#111111] border border-[#1A1A1A] p-2.5 mb-8 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-mono text-[#737373] uppercase px-2 hidden lg:inline">
              ACCÈS DIRECT AUX AUTRES SECTIONS :
            </span>
            <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
              {[
                { label: 'ACCUEIL', view: 'home' },
                { label: "L'ATELIER", view: 'home', sectionId: 'atelier' },
                { label: 'SERVICES & TARIFS', view: 'services' },
                { label: 'PNEUS & BIBS', view: 'pneus' },
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

        {/* Admin Management Command Bar (when logged in) */}
        {isAdmin && (
          <div className="mb-10 bg-gradient-to-r from-[#18110a] via-[#141414] to-[#101010] border-2 border-[#FF6600] p-4 sm:p-5 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#FF6600] uppercase font-bold tracking-wider">
                  <Unlock className="w-4 h-4 text-[#FF6600]" />
                  <span>PANNEAU D'ADMINISTRATION DES MOTOS À VENDRE</span>
                </div>
                <p className="text-xs text-[#A3A3A3] mt-1">
                  Vous avez les droits d'administration complets : ajouter de nouvelles motos, modifier n'importe quelle fiche technique, photos, tarifs, statuts (Disponible / Réservée / Vendue) ou supprimer des véhicules.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => {
                    setBikeToEdit(null);
                    setAdminModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-[#FF6600] hover:bg-[#E65C00] text-[#080808] font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ AJOUTER UNE MOTO</span>
                </button>

                <button
                  onClick={handleResetToDefaults}
                  className="px-3.5 py-2.5 bg-[#1A1A1A] hover:bg-[#252525] text-[#A3A3A3] hover:text-[#F5F5F2] border border-[#333333] text-xs font-mono uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Restaurer la liste initiale de démonstration"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">RÉINITIALISER CATALOGUE</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header Hero Section */}
        <div className="pb-8 border-b border-[#1A1A1A] mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#FF6600] uppercase tracking-widest mb-2">
            <span className="w-2 h-0.5 bg-[#FF6600]" />
            <span>SHOWROOM OCCASIONS & SÉLECTION ATELIER À MONS</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <h1 className="font-heading font-black text-4xl sm:text-6xl text-[#F5F5F2] uppercase tracking-tight">
                MOTOS À VENDRE
              </h1>
              <p className="text-sm text-[#A3A3A3] mt-2 max-w-2xl leading-relaxed">
                Chaque machine proposée par l'atelier Ride Factory à Mons bénéficie d'un contrôle rigoureux en 32 points. Historique certifié, consommables récents et préparation prête à rouler.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-[#111111] border border-[#222222] px-4 py-3 shrink-0">
              <Sparkles className="w-5 h-5 text-[#FF6600]" />
              <div className="text-xs font-mono">
                <span className="text-[#F5F5F2] font-bold block">{bikes.length} MOTOS RÉFÉRENCÉES</span>
                <span className="text-emerald-400">
                  {bikes.filter((b) => b.status === 'disponible' || !b.status).length} disponibles actuellement
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="space-y-4 pb-6 mb-8 border-b border-[#1A1A1A]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-[11px] font-mono text-[#737373] uppercase mr-1 shrink-0">
                DISCIPLINE :
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 text-xs font-heading font-bold uppercase tracking-wider whitespace-nowrap border cursor-pointer transition-colors ${
                    categoryFilter === cat
                      ? 'bg-[#FF6600] text-[#080808] border-[#FF6600]'
                      : 'bg-[#111111] text-[#A3A3A3] border-[#222222] hover:text-[#F5F5F2]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Status filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-[11px] font-mono text-[#737373] uppercase mr-1 shrink-0">
                STATUT :
              </span>
              {['TOUS', 'DISPONIBLES', 'RÉSERVÉES', 'VENDUES'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap border cursor-pointer transition-colors ${
                    statusFilter === st
                      ? 'bg-[#F5F5F2] text-[#080808] border-[#F5F5F2]'
                      : 'bg-[#111111] text-[#A3A3A3] border-[#222222] hover:text-[#F5F5F2]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Condition secondary filter */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[11px] font-mono text-[#737373] uppercase mr-1 shrink-0">
              ÉTAT :
            </span>
            {conditions.map((cond) => (
              <button
                key={cond}
                onClick={() => setConditionFilter(cond)}
                className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider whitespace-nowrap border cursor-pointer transition-colors ${
                  conditionFilter === cond
                    ? 'bg-[#2A2A2A] text-[#FF6600] border-[#FF6600]'
                    : 'bg-[#0E0E0E] text-[#888888] border-[#1F1F1F] hover:text-[#CCCCCC]'
                }`}
              >
                {cond}
              </button>
            ))}
          </div>
        </div>

        {/* Empty state */}
        {filteredBikes.length === 0 && (
          <div className="bg-[#111111] border border-[#222222] p-12 text-center my-8">
            <AlertCircle className="w-10 h-10 text-[#FF6600] mx-auto mb-3" />
            <h3 className="text-xl font-heading font-bold text-[#F5F5F2] uppercase mb-2">
              AUCUNE MOTO NE CORRESPOND AUX CRITÈRES
            </h3>
            <p className="text-xs text-[#A3A3A3] max-w-md mx-auto mb-6">
              Essayez d'élargir vos filtres ou contactez directement l'atelier pour connaître les arrivages et dépôts-ventes prévus cette semaine.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setCategoryFilter('TOUS');
                  setConditionFilter('TOUS');
                  setStatusFilter('TOUS');
                }}
                className="px-4 py-2 bg-[#1F1F1F] text-xs font-mono uppercase text-[#F5F5F2] border border-[#333333]"
              >
                Réinitialiser les filtres
              </button>
              {isAdmin && (
                <button
                  onClick={() => {
                    setBikeToEdit(null);
                    setAdminModalOpen(true);
                  }}
                  className="px-4 py-2 bg-[#FF6600] text-black font-heading font-bold text-xs uppercase"
                >
                  + Ajouter une moto
                </button>
              )}
            </div>
          </div>
        )}

        {/* Bikes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBikes.map((bike) => {
            const isSold = bike.status === 'vendue';
            const isReserved = bike.status === 'reservee';

            return (
              <div
                key={bike.id}
                className={`bg-[#111111] border transition-all flex flex-col justify-between group overflow-hidden ${
                  isAdmin ? 'border-[#333333]' : 'border-[#1A1A1A] hover:border-[#333333]'
                }`}
              >
                <div>
                  {/* Photo container */}
                  <div className="relative h-64 w-full bg-[#181818] overflow-hidden">
                    {bike.imageUrl ? (
                      <img
                        src={bike.imageUrl}
                        alt={`${bike.brand} ${bike.model}`}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                          isSold ? 'grayscale opacity-60' : ''
                        }`}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/bikes/ktm_300_exc.jpg';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-[#1c1c1c] to-[#0d0d0d]">
                        <div className="text-center">
                          <div className="font-heading font-black text-5xl text-neutral-800">
                            {bike.brand}
                          </div>
                          <div className="text-xs font-mono text-[#FF6600] mt-1">
                            {bike.displacement} · {bike.year}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                      <span className="bg-[#080808]/90 border border-[#222222] px-2.5 py-0.5 text-[11px] font-mono text-[#F5F5F2] uppercase">
                        {bike.category}
                      </span>
                      {bike.highlightBadge && (
                        <span className="bg-[#FF6600] text-[#080808] px-2 py-0.5 text-[10px] font-heading font-black uppercase tracking-wider">
                          {bike.highlightBadge}
                        </span>
                      )}
                    </div>

                    {/* Status Pill on Top Right */}
                    <div className="absolute top-3 right-3">
                      {isSold ? (
                        <span className="bg-red-600 text-white px-2.5 py-1 text-[11px] font-heading font-black uppercase tracking-wider shadow">
                          VENDUE
                        </span>
                      ) : isReserved ? (
                        <span className="bg-amber-500 text-black px-2.5 py-1 text-[11px] font-heading font-black uppercase tracking-wider shadow">
                          RÉSERVÉE
                        </span>
                      ) : (
                        <span className="bg-emerald-500 text-black px-2.5 py-1 text-[11px] font-heading font-black uppercase tracking-wider shadow">
                          DISPONIBLE
                        </span>
                      )}
                    </div>

                    {/* Bottom overlay in photo */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between pointer-events-none">
                      <span className="bg-[#080808]/85 text-[11px] font-mono text-[#F5F5F2] px-2 py-0.5 border border-[#222222]">
                        {bike.condition}
                      </span>
                      <span className="font-mono text-xl font-black text-[#FF6600] bg-[#080808]/90 px-2.5 py-0.5 border border-[#FF6600]/40">
                        {bike.price.toLocaleString('fr-BE')} €
                      </span>
                    </div>
                  </div>

                  {/* Admin Fast-Action Bar directly on card */}
                  {isAdmin && (
                    <div className="bg-[#181818] border-b border-[#2A2A2A] px-3 py-2 flex items-center justify-between gap-1 text-[11px] font-mono">
                      <div className="flex items-center gap-1">
                        <span className="text-[#737373] text-[10px] uppercase">Statut :</span>
                        <select
                          value={bike.status || 'disponible'}
                          onChange={(e) => handleUpdateStatus(bike.id, e.target.value as any)}
                          className="bg-[#0F0F0F] border border-[#333333] text-xs font-bold text-[#FF6600] px-1.5 py-0.5 focus:outline-none"
                        >
                          <option value="disponible">🟢 DISPONIBLE</option>
                          <option value="reservee">🟡 RÉSERVÉE</option>
                          <option value="vendue">🔴 VENDUE</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setBikeToEdit(bike);
                            setAdminModalOpen(true);
                          }}
                          className="p-1.5 bg-[#252525] hover:bg-[#FF6600] hover:text-black text-[#F5F5F2] border border-[#3A3A3A] transition-colors"
                          title="Modifier cette fiche"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteBike(bike.id, `${bike.brand} ${bike.model}`)}
                          className="p-1.5 bg-[#252525] hover:bg-red-600 hover:text-white text-red-400 border border-[#3A3A3A] transition-colors"
                          title="Supprimer cette fiche"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="text-xs font-mono text-[#A3A3A3] mb-1 flex items-center justify-between">
                      <span>{bike.brand} · ANNÉE {bike.year}</span>
                      <span className="text-[#737373] text-[11px]">{bike.mileageOrHours}</span>
                    </div>

                    <h3 className="font-heading font-black text-2xl text-[#F5F5F2] uppercase group-hover:text-[#FF6600] transition-colors mb-4 line-clamp-1">
                      {bike.model}
                    </h3>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-[#080808] border border-[#1A1A1A] p-3 mb-4">
                      <div>
                        <span className="text-[#737373] block text-[10px]">CYLINDRÉE</span>
                        <span className="text-[#F5F5F2] font-semibold">{bike.displacement}</span>
                      </div>
                      <div>
                        <span className="text-[#737373] block text-[10px]">COMPTEUR</span>
                        <span className="text-[#F5F5F2] font-semibold">{bike.mileageOrHours}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#A3A3A3] line-clamp-2 leading-relaxed mb-4">
                      {bike.description}
                    </p>

                    <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 mb-2">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="line-clamp-1">{bike.inspectionStatus}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 pt-0 border-t border-[#1A1A1A]">
                  <div className="pt-4 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedBike(bike)}
                      className="flex-1 py-3 bg-[#1A1A1A] hover:bg-[#FF6600] hover:text-[#080808] text-[#F5F5F2] font-heading font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>VOIR LA FICHE COMPLÈTE</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => {
                          setBikeToEdit(bike);
                          setAdminModalOpen(true);
                        }}
                        className="py-3 px-3 bg-[#222222] hover:bg-[#FF6600] hover:text-[#080808] text-[#A3A3A3] border border-[#333333] transition-colors cursor-pointer"
                        title="Éditer la moto"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bike Details Modal (Public view & Admin view) */}
        {selectedBike && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <div className="bg-[#111111] border-2 border-[#2A2A2A] max-w-3xl w-full p-6 sm:p-8 relative my-auto max-h-[92vh] overflow-y-auto shadow-2xl">
              <button
                onClick={() => setSelectedBike(null)}
                className="absolute top-5 right-5 text-[#A3A3A3] hover:text-[#F5F5F2] p-1"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Status Header */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#FF6600] mb-3">
                <span>{selectedBike.brand}</span>
                <span>/</span>
                <span>{selectedBike.category}</span>
                <span>/</span>
                <span>{selectedBike.condition}</span>

                <div className="ml-auto mr-8">
                  {selectedBike.status === 'vendue' ? (
                    <span className="bg-red-600 text-white px-2 py-0.5 text-[10px] font-heading font-bold uppercase">
                      VENDUE
                    </span>
                  ) : selectedBike.status === 'reservee' ? (
                    <span className="bg-amber-500 text-black px-2 py-0.5 text-[10px] font-heading font-bold uppercase">
                      OPTION EN COURS / RÉSERVÉE
                    </span>
                  ) : (
                    <span className="bg-emerald-500 text-black px-2 py-0.5 text-[10px] font-heading font-bold uppercase">
                      DISPONIBLE À MONS
                    </span>
                  )}
                </div>
              </div>

              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#F5F5F2] uppercase mb-2">
                {selectedBike.model} ({selectedBike.year})
              </h2>

              <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-[#222222]">
                <div className="font-mono text-3xl sm:text-4xl font-black text-[#FF6600] tabular-nums">
                  {selectedBike.price.toLocaleString('fr-BE')} €
                </div>
                <span className="text-xs font-mono text-[#888888]">
                  TVA / Régime de la marge ou particulier
                </span>
              </div>

              {/* Photo Display */}
              {selectedBike.imageUrl && (
                <div className="h-64 sm:h-80 bg-[#161616] border border-[#222222] overflow-hidden mb-6">
                  <img
                    src={selectedBike.imageUrl}
                    alt={`${selectedBike.brand} ${selectedBike.model}`}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/bikes/ktm_300_exc.jpg';
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#080808] border border-[#1A1A1A] p-4 text-xs font-mono mb-6">
                <div>
                  <span className="text-[#737373] block text-[10px]">CYLINDRÉE</span>
                  <span className="text-[#F5F5F2] font-bold">{selectedBike.displacement}</span>
                </div>
                <div>
                  <span className="text-[#737373] block text-[10px]">KILOMÉTRAGE / HEURES</span>
                  <span className="text-[#F5F5F2] font-bold">{selectedBike.mileageOrHours}</span>
                </div>
                <div>
                  <span className="text-[#737373] block text-[10px]">CONTRÔLE ATELIER</span>
                  <span className="text-emerald-400 font-bold">{selectedBike.inspectionStatus}</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-heading font-bold text-xs text-[#FF6600] uppercase mb-2 tracking-wider">
                  DESCRIPTION ATELIER :
                </h4>
                <p className="text-sm text-[#A3A3A3] leading-relaxed whitespace-pre-line">
                  {selectedBike.description}
                </p>
              </div>

              {/* Key features */}
              <div className="mb-8">
                <h4 className="font-heading font-bold text-sm text-[#F5F5F2] uppercase mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#FF6600]" />
                  <span>ÉQUIPEMENTS & POINTS CLÉS DE CETTE MACHINE :</span>
                </h4>
                <ul className="space-y-2 text-xs text-[#F5F5F2]/90">
                  {selectedBike.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[#FF6600] mt-1.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal Action Buttons */}
              <div className="pt-4 border-t border-[#1A1A1A] flex flex-col sm:flex-row gap-3">
                {selectedBike.status !== 'vendue' ? (
                  <button
                    onClick={() => {
                      const bikeName = `${selectedBike.brand} ${selectedBike.model}`;
                      setSelectedBike(null);
                      onOpenBookingForBike(bikeName);
                    }}
                    className="flex-1 py-3.5 bg-[#FF6600] text-[#080808] font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#E65C00] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>PRENDRE RENDEZ-VOUS POUR CETTE MOTO À MONS</span>
                  </button>
                ) : (
                  <div className="flex-1 py-3 bg-[#1C1C1C] text-center text-xs font-mono text-[#888888] border border-[#2A2A2A]">
                    Ce véhicule a été vendu par Ride Factory
                  </div>
                )}

                {isAdmin && (
                  <button
                    onClick={() => {
                      setBikeToEdit(selectedBike);
                      setSelectedBike(null);
                      setAdminModalOpen(true);
                    }}
                    className="px-5 py-3.5 bg-[#222222] hover:bg-[#FF6600] hover:text-[#080808] text-[#F5F5F2] text-xs font-mono font-bold uppercase transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>MODIFIER LA FICHE</span>
                  </button>
                )}

                <button
                  onClick={() => setSelectedBike(null)}
                  className="px-6 py-3.5 border border-[#222222] text-[#A3A3A3] hover:text-[#F5F5F2] text-xs font-mono cursor-pointer"
                >
                  FERMER
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Admin Password Prompt Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#121212] border-2 border-[#FF6600] max-w-md w-full p-6 sm:p-8 relative shadow-2xl shadow-orange-950/50">
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordError('');
                }}
                className="absolute top-4 right-4 text-[#A3A3A3] hover:text-[#F5F5F2]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-[#FF6600]/10 border border-[#FF6600] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-6 h-6 text-[#FF6600]" />
                </div>
                <h3 className="font-heading font-black text-2xl text-[#F5F5F2] uppercase">
                  ESPACE ADMINISTRATEUR
                </h3>
                <p className="text-xs text-[#A3A3A3] mt-1 font-mono">
                  Gestion intégrale des fiches des motos à vendre
                </p>
              </div>

              {passwordError && (
                <div className="mb-4 p-3 bg-red-950/70 border border-red-500 text-red-200 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{passwordError}</span>
                </div>
              )}

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1.5">
                    Mot de passe requis
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswordText ? 'text' : 'password'}
                      autoFocus
                      required
                      placeholder="Entrez le mot de passe..."
                      value={inputPassword}
                      onChange={(e) => {
                        setInputPassword(e.target.value);
                        setPasswordError('');
                      }}
                      className="w-full bg-[#080808] border border-[#333333] focus:border-[#FF6600] px-4 py-3 text-sm text-[#F5F5F2] font-mono focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordText(!showPasswordText)}
                      className="absolute right-3 top-3 text-[#737373] hover:text-[#F5F5F2]"
                    >
                      {showPasswordText ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPasswordError('');
                    }}
                    className="w-1/3 py-3 bg-[#1F1F1F] text-[#A3A3A3] hover:text-[#F5F5F2] text-xs font-mono uppercase"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3 bg-[#FF6600] hover:bg-[#E65C00] text-[#080808] font-heading font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>DÉVERROUILLER</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Bike Admin Edit / Create Modal */}
        <BikeAdminModal
          isOpen={adminModalOpen}
          onClose={() => {
            setAdminModalOpen(false);
            setBikeToEdit(null);
          }}
          bikeToEdit={bikeToEdit}
          onSave={handleSaveBike}
        />
      </div>
    </div>
  );
}
