import { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  X,
  ArrowLeft,
  Unlock,
  Plus,
  Edit,
  Trash2,
  RotateCcw,
  AlertCircle,
} from 'lucide-react';
import { MOTORBIKES_DATA } from '../data/bikes';
import { Motorbike } from '../data/types';
import { BikeAdminModal } from './BikeAdminModal';

interface BikesViewProps {
  isAdmin: boolean;
  onAdminLogout: () => void;
  onOpenBookingForBike: (bikeName: string) => void;
  onNavigateHome?: () => void;
}

const STORAGE_KEY = 'ride_factory_motorbikes_catalog_v5';

export function BikesView({
  isAdmin,
  onAdminLogout,
  onOpenBookingForBike,
  onNavigateHome,
}: BikesViewProps) {
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

  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [bikeToEdit, setBikeToEdit] = useState<Motorbike | null>(null);
  const [selectedBike, setSelectedBike] = useState<Motorbike | null>(null);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const [categoryFilter, setCategoryFilter] = useState<string>('TOUS');
  const [conditionFilter, setConditionFilter] = useState<string>('TOUS');
  const [statusFilter, setStatusFilter] = useState<string>('TOUS');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bikes));
    } catch (err) {
      console.error('Error saving bikes to localStorage:', err);
    }
  }, [bikes]);

  useEffect(() => {
    if (feedbackToast) {
      const timer = setTimeout(() => setFeedbackToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [feedbackToast]);

  const showToast = (msg: string) => {
    setFeedbackToast(msg);
  };

  const handleAdminLogout = () => {
    onAdminLogout();
    showToast('Déconnexion effectuée');
  };

  const handleSaveBike = (savedBike: Motorbike) => {
    setBikes((prev) => {
      const exists = prev.some((b) => b.id === savedBike.id);
      if (exists) {
        return prev.map((b) => (b.id === savedBike.id ? savedBike : b));
      } else {
        return [savedBike, ...prev];
      }
    });

    if (selectedBike && selectedBike.id === savedBike.id) {
      setSelectedBike(savedBike);
    }

    setAdminModalOpen(false);
    setBikeToEdit(null);
    showToast(`Fiche "${savedBike.brand} ${savedBike.model}" enregistrée.`);
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
    showToast(`Statut mis à jour : ${newStatus}`);
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
      showToast('Catalogue réinitialisé.');
    }
  };

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

  const availableCount = bikes.filter((b) => b.status === 'disponible' || !b.status).length;

  return (
    <div className="pt-28 pb-24 bg-[#FAFAF8] min-h-screen text-[#141413]">
      {feedbackToast && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#141413] text-white px-4 py-3 rounded-xl text-xs font-medium shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#FF5A00]" />
          <span>{feedbackToast}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Admin session indicator */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {onNavigateHome ? (
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#6E6D6A] hover:text-[#141413] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à l’accueil</span>
            </button>
          ) : (
            <span />
          )}

          {isAdmin && (
            <div className="flex items-center gap-3 text-xs">
              <span className="font-medium text-emerald-700">Administration active</span>
              <button
                onClick={handleAdminLogout}
                className="px-3 py-1.5 bg-white border border-[#E6E4DE] hover:border-red-300 text-[#6E6D6A] hover:text-red-600 rounded-lg transition-colors cursor-pointer"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>

        {/* Admin Management Command Bar */}
        {isAdmin && (
          <div className="mb-10 bg-white border border-[#FF5A00]/40 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#FF5A00] mb-1">
                <Unlock className="w-3.5 h-3.5" />
                <span>Gestion du parc motos</span>
              </div>
              <p className="text-xs text-[#6E6D6A]">
                Ajoutez, modifiez ou supprimez les fiches motos, tarifs et disponibilités en direct.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => {
                  setBikeToEdit(null);
                  setAdminModalOpen(true);
                }}
                className="px-4 py-2 bg-[#FF5A00] hover:bg-[#E04E00] text-white text-xs font-medium rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter une moto</span>
              </button>

              <button
                onClick={handleResetToDefaults}
                className="px-3.5 py-2 bg-[#F2F1ED] hover:bg-[#E6E4DE] text-[#141413] text-xs font-medium rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Réinitialiser</span>
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#E6E4DE] mb-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#FF5A00] mb-3">
              Showroom atelier · Mons
            </p>
            <h1
              className="font-heading font-extrabold text-[#141413] tracking-tight leading-[1.08] mb-3"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', textWrap: 'balance' }}
            >
              Motos à vendre.
            </h1>
            <p className="text-base text-[#6E6D6A] leading-relaxed">
              Chaque machine est révisée sur 32 points dans notre atelier avec historique vérifié et consommables prêts pour rouler.
            </p>
          </div>

          <div className="text-sm text-[#6E6D6A] tabular-nums shrink-0">
            <span className="font-semibold text-[#141413]">{availableCount} disponibles</span>
            <span className="mx-2">·</span>
            <span>{bikes.length} au catalogue</span>
          </div>
        </div>

        {/* Clean Filter Bars */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
          {/* Discipline filter */}
          <div className="inline-flex flex-wrap gap-1.5 p-1 bg-[#F2F1ED] rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  categoryFilter === cat
                    ? 'bg-white text-[#141413] shadow-xs'
                    : 'text-[#6E6D6A] hover:text-[#141413]'
                }`}
              >
                {cat === 'TOUS' ? 'Toutes' : cat}
              </button>
            ))}
          </div>

          {/* Status & Condition filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex gap-1 p-1 bg-[#F2F1ED] rounded-xl">
              {['TOUS', 'DISPONIBLES', 'RÉSERVÉES', 'VENDUES'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    statusFilter === st
                      ? 'bg-white text-[#141413] shadow-xs'
                      : 'text-[#6E6D6A] hover:text-[#141413]'
                  }`}
                >
                  {st === 'TOUS'
                    ? 'Tous statuts'
                    : st === 'DISPONIBLES'
                    ? 'Disponibles'
                    : st === 'RÉSERVÉES'
                    ? 'Réservées'
                    : 'Vendues'}
                </button>
              ))}
            </div>

            <select
              value={conditionFilter}
              onChange={(e) => setConditionFilter(e.target.value)}
              aria-label="Filtrer par état"
              className="bg-white border border-[#E6E4DE] rounded-xl px-3 py-2 text-xs text-[#141413] focus:outline-none focus:border-[#FF5A00]"
            >
              {conditions.map((cond) => (
                <option key={cond} value={cond}>
                  {cond === 'TOUS' ? 'Tous états' : cond}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Empty State */}
        {filteredBikes.length === 0 && (
          <div className="bg-white border border-[#E6E4DE] rounded-2xl p-14 text-center my-8">
            <AlertCircle className="w-8 h-8 text-[#FF5A00] mx-auto mb-3" />
            <h3 className="font-heading font-bold text-lg text-[#141413] mb-2">
              Aucune moto ne correspond à ces critères
            </h3>
            <p className="text-sm text-[#6E6D6A] max-w-md mx-auto mb-6">
              Élargissez vos filtres ou contactez l’atelier pour connaître les prochains arrivages.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setCategoryFilter('TOUS');
                  setConditionFilter('TOUS');
                  setStatusFilter('TOUS');
                }}
                className="px-4 py-2 bg-[#F2F1ED] hover:bg-[#E6E4DE] text-xs font-medium text-[#141413] rounded-lg cursor-pointer"
              >
                Réinitialiser les filtres
              </button>
              {isAdmin && (
                <button
                  onClick={() => {
                    setBikeToEdit(null);
                    setAdminModalOpen(true);
                  }}
                  className="px-4 py-2 bg-[#FF5A00] text-white text-xs font-medium rounded-lg cursor-pointer"
                >
                  Ajouter une moto
                </button>
              )}
            </div>
          </div>
        )}

        {/* Clean 2 or 3 Column Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBikes.map((bike) => {
            const isSold = bike.status === 'vendue';
            const isReserved = bike.status === 'reservee';

            return (
              <article
                key={bike.id}
                className="bg-white border border-[#E6E4DE] rounded-2xl overflow-hidden flex flex-col justify-between group transition-colors hover:border-[#C9C6BE]"
              >
                <div>
                  {/* Clean Photo Frame */}
                  <div className="relative aspect-[16/10] w-full bg-[#141413] overflow-hidden">
                    {bike.imageUrl ? (
                      <img
                        src={bike.imageUrl}
                        alt={`${bike.brand} ${bike.model}`}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
                          isSold ? 'grayscale opacity-70' : ''
                        }`}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/bikes/ktm_300_exc.jpg';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-6 text-white/60 font-heading font-bold text-2xl">
                        {bike.brand}
                      </div>
                    )}
                  </div>

                  {/* Admin Quick Controls */}
                  {isAdmin && (
                    <div className="bg-[#F2F1ED] border-b border-[#E6E4DE] px-4 py-2.5 flex items-center justify-between gap-2 text-xs">
                      <select
                        value={bike.status || 'disponible'}
                        onChange={(e) => handleUpdateStatus(bike.id, e.target.value as any)}
                        className="bg-white border border-[#E6E4DE] rounded-md text-xs font-medium text-[#141413] px-2 py-1 focus:outline-none"
                      >
                        <option value="disponible">Disponible</option>
                        <option value="reservee">Réservée</option>
                        <option value="vendue">Vendue</option>
                      </select>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setBikeToEdit(bike);
                            setAdminModalOpen(true);
                          }}
                          className="p-1.5 bg-white hover:bg-[#141413] hover:text-white text-[#141413] border border-[#E6E4DE] rounded-md transition-colors cursor-pointer"
                          title="Modifier cette fiche"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteBike(bike.id, `${bike.brand} ${bike.model}`)}
                          className="p-1.5 bg-white hover:bg-red-600 hover:text-white text-red-600 border border-[#E6E4DE] rounded-md transition-colors cursor-pointer"
                          title="Supprimer cette fiche"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Card Body with Unboxed Metadata */}
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 text-xs text-[#6E6D6A] mb-2">
                      <span>
                        {bike.brand} · {bike.year} · {bike.category}
                      </span>
                      <span
                        className={`font-medium ${
                          isSold
                            ? 'text-red-600'
                            : isReserved
                            ? 'text-amber-600'
                            : 'text-emerald-700'
                        }`}
                      >
                        {isSold ? 'Vendue' : isReserved ? 'Réservée' : 'Disponible'}
                      </span>
                    </div>

                    <h2 className="font-heading font-bold text-xl text-[#141413] group-hover:text-[#FF5A00] transition-colors mb-2 line-clamp-1">
                      {bike.model}
                    </h2>

                    <div className="text-xs font-mono text-[#6E6D6A] mb-4 tabular-nums">
                      {bike.displacement} · {bike.mileageOrHours}
                    </div>

                    <p className="text-sm text-[#6E6D6A] line-clamp-2 leading-relaxed">
                      {bike.description}
                    </p>
                  </div>
                </div>

                {/* Clean Card Footer */}
                <div className="px-6 pb-6 pt-4 border-t border-[#E6E4DE] flex items-center justify-between gap-3">
                  <span className="font-heading font-extrabold text-xl text-[#141413] tabular-nums">
                    {bike.price.toLocaleString('fr-BE')} €
                  </span>

                  <button
                    onClick={() => setSelectedBike(bike)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F2F1ED] hover:bg-[#141413] text-[#141413] hover:text-white text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Voir la fiche</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bike Details Modal */}
        {selectedBike && (
          <div
            className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedBike(null)}
          >
            <div
              className="bg-white border border-[#E6E4DE] rounded-2xl max-w-3xl w-full p-6 sm:p-10 relative my-auto max-h-[92vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedBike(null)}
                className="absolute top-6 right-6 p-1.5 text-[#6E6D6A] hover:text-[#141413] hover:bg-[#F2F1ED] rounded-lg cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-xs text-[#6E6D6A] mb-2 pr-10">
                <span className="text-[#FF5A00] font-medium">{selectedBike.brand}</span>
                <span className="mx-2">·</span>
                <span>{selectedBike.category}</span>
                <span className="mx-2">·</span>
                <span>{selectedBike.condition}</span>
                <span className="mx-2">·</span>
                <span
                  className={
                    selectedBike.status === 'vendue'
                      ? 'text-red-600 font-medium'
                      : selectedBike.status === 'reservee'
                      ? 'text-amber-600 font-medium'
                      : 'text-emerald-700 font-medium'
                  }
                >
                  {selectedBike.status === 'vendue'
                    ? 'Vendue'
                    : selectedBike.status === 'reservee'
                    ? 'Réservée'
                    : 'Disponible à Mons'}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 mb-6 border-b border-[#E6E4DE]">
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#141413]">
                  {selectedBike.model} ({selectedBike.year})
                </h2>
                <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#FF5A00] tabular-nums shrink-0">
                  {selectedBike.price.toLocaleString('fr-BE')} €
                </div>
              </div>

              {selectedBike.imageUrl && (
                <div className="aspect-[16/10] bg-[#141413] rounded-xl overflow-hidden mb-6">
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

              <div className="divide-y divide-[#E6E4DE] border-y border-[#E6E4DE] text-sm mb-6">
                <div className="py-3 flex justify-between gap-4">
                  <span className="text-[#6E6D6A]">Cylindrée</span>
                  <span className="font-medium text-[#141413]">{selectedBike.displacement}</span>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <span className="text-[#6E6D6A]">Kilométrage / Heures</span>
                  <span className="font-medium text-[#141413] tabular-nums">{selectedBike.mileageOrHours}</span>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <span className="text-[#6E6D6A]">Contrôle atelier</span>
                  <span className="font-medium text-emerald-700 text-right">{selectedBike.inspectionStatus}</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-[#141413] mb-2">
                  Description atelier
                </h4>
                <p className="text-sm text-[#6E6D6A] leading-relaxed whitespace-pre-line">
                  {selectedBike.description}
                </p>
              </div>

              <div className="mb-8">
                <h4 className="text-sm font-semibold text-[#141413] mb-3">
                  Équipements & points clés
                </h4>
                <ul className="space-y-2 text-sm text-[#141413]/90">
                  {selectedBike.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-[#FF5A00] select-none">—</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#E6E4DE] flex flex-col sm:flex-row gap-3">
                {selectedBike.status !== 'vendue' ? (
                  <button
                    onClick={() => {
                      const bikeName = `${selectedBike.brand} ${selectedBike.model}`;
                      setSelectedBike(null);
                      onOpenBookingForBike(bikeName);
                    }}
                    className="flex-1 py-3 bg-[#FF5A00] hover:bg-[#E04E00] text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    Prendre rendez-vous pour cette moto
                  </button>
                ) : (
                  <div className="flex-1 py-3 bg-[#F2F1ED] text-center text-sm text-[#6E6D6A] rounded-lg">
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
                    className="px-5 py-3 bg-[#141413] hover:bg-[#2c2c2a] text-white text-sm font-medium rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Modifier</span>
                  </button>
                )}

                <button
                  onClick={() => setSelectedBike(null)}
                  className="px-5 py-3 bg-[#F2F1ED] hover:bg-[#E6E4DE] text-[#141413] text-sm font-medium rounded-lg cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}

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
