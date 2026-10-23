import { useState, useEffect } from 'react';
import { X, Upload, Plus, Trash2, CheckCircle2, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { Motorbike } from '../data/types';

interface BikeAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  bikeToEdit: Motorbike | null;
  onSave: (bike: Motorbike) => void;
}

const PRESET_IMAGES = [
  { label: 'Enduro KTM Orange', url: '/images/bikes/ktm_300_exc.jpg' },
  { label: 'Trail / Expédition Husqvarna', url: '/images/bikes/husqvarna_701.jpg' },
  { label: 'Adventure Ténéré 700', url: '/images/bikes/tenere_700.jpg' },
  { label: 'Enduro GASGAS 350F Rouge', url: '/images/bikes/gasgas_350f.jpg' },
  { label: 'Beta 300 Racing 2T', url: '/images/bikes/beta_300_rr.jpg' },
];

export function BikeAdminModal({
  isOpen,
  onClose,
  bikeToEdit,
  onSave,
}: BikeAdminModalProps) {
  const [formData, setFormData] = useState<Partial<Motorbike>>({
    brand: 'KTM',
    model: '',
    year: new Date().getFullYear(),
    displacement: '300 cc (2-Temps)',
    mileageOrHours: '0 h moteur',
    price: 8500,
    category: 'Enduro',
    condition: 'Occasion Révisée',
    status: 'disponible',
    imageUrl: '',
    description: '',
    keyFeatures: [],
    inspectionStatus: 'Certifié Ride Factory — 32 points validés',
    highlightBadge: '',
  });

  const [newFeatureText, setNewFeatureText] = useState('');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (bikeToEdit) {
      setFormData({
        ...bikeToEdit,
        status: bikeToEdit.status || 'disponible',
        keyFeatures: [...(bikeToEdit.keyFeatures || [])],
      });
    } else {
      setFormData({
        id: `bike-${Date.now()}`,
        brand: 'KTM',
        model: '',
        year: new Date().getFullYear(),
        displacement: '300 cc',
        mileageOrHours: '0 h (Neuf ou révisé)',
        price: 9000,
        category: 'Enduro',
        condition: 'Occasion Révisée',
        status: 'disponible',
        imageUrl: '/images/bikes/ktm_300_exc.jpg',
        description: 'Moto entièrement contrôlée et révisée par l’atelier Ride Factory à Mons. Prête à rouler.',
        keyFeatures: [
          'Entretien complet à jour',
          'Pneus & freins en parfait état',
          'Contrôle partie-cycle et suspensions validé'
        ],
        inspectionStatus: 'Certifié Ride Factory — 32 points validés',
        highlightBadge: 'Disponible Atelier',
      });
    }
    setValidationError('');
  }, [bikeToEdit, isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setValidationError('La photo est trop volumineuse (max 5 Mo)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setFormData((prev) => ({ ...prev, imageUrl: result }));
      setValidationError('');
    };
    reader.readAsDataURL(file);
  };

  const handleAddFeature = () => {
    if (!newFeatureText.trim()) return;
    setFormData((prev) => ({
      ...prev,
      keyFeatures: [...(prev.keyFeatures || []), newFeatureText.trim()],
    }));
    setNewFeatureText('');
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      keyFeatures: (prev.keyFeatures || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.brand?.trim() || !formData.model?.trim()) {
      setValidationError('Veuillez renseigner la marque et le modèle');
      return;
    }
    if (!formData.price || formData.price <= 0) {
      setValidationError('Veuillez indiquer un prix valide');
      return;
    }

    const bikeFinal: Motorbike = {
      id: formData.id || `bike-${Date.now()}`,
      brand: formData.brand.trim().toUpperCase(),
      model: formData.model.trim().toUpperCase(),
      year: Number(formData.year) || new Date().getFullYear(),
      displacement: formData.displacement || 'Non spécifiée',
      mileageOrHours: formData.mileageOrHours || 'Non spécifié',
      price: Number(formData.price),
      category: formData.category || 'Enduro',
      condition: formData.condition || 'Occasion Révisée',
      status: formData.status || 'disponible',
      imageUrl: formData.imageUrl || '/images/bikes/ktm_300_exc.jpg',
      description: formData.description || 'Moto sélectionnée et révisée par Ride Factory Mons.',
      keyFeatures: formData.keyFeatures && formData.keyFeatures.length > 0
        ? formData.keyFeatures
        : ['Entretien complet effectué', 'Certifiée Ride Factory'],
      inspectionStatus: formData.inspectionStatus || 'Certifié Ride Factory — 32 points validés',
      highlightBadge: formData.highlightBadge || '',
    };

    onSave(bikeFinal);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#101010] border-2 border-[#FF6600]/80 w-full max-w-4xl p-6 sm:p-8 relative my-auto max-h-[92vh] overflow-y-auto shadow-2xl shadow-orange-950/40">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#222222] mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF6600] uppercase tracking-wider mb-1">
              <span className="w-2 h-2 bg-[#FF6600]" />
              <span>ESPACE ADMIN · GESTION DU PARC MOTOS</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#F5F5F2] uppercase">
              {bikeToEdit ? `MODIFIER LA FICHE : ${bikeToEdit.brand} ${bikeToEdit.model}` : 'AJOUTER UNE NOUVELLE MOTO À VENDRE'}
            </h2>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 text-[#A3A3A3] hover:text-[#F5F5F2] hover:bg-[#222222] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {validationError && (
          <div className="mb-6 p-3 bg-red-950/60 border border-red-500/60 text-red-200 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{validationError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Identification & Statut */}
          <div className="bg-[#141414] border border-[#222222] p-4 sm:p-5">
            <h3 className="text-xs font-mono text-[#FF6600] uppercase tracking-wider mb-4 font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#FF6600]" />
              1. IDENTITÉ DU VÉHICULE & STATUT COMMERCIAL
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1">
                  Marque *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: KTM, YAMAHA, HONDA..."
                  value={formData.brand || ''}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#FF6600] px-3 py-2 text-sm text-[#F5F5F2] uppercase font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1">
                  Modèle exact *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: 300 EXC HARDENDURO, TÉNÉRÉ 700..."
                  value={formData.model || ''}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#FF6600] px-3 py-2 text-sm text-[#F5F5F2] uppercase font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1">
                  Année (Millésime)
                </label>
                <input
                  type="number"
                  min="1980"
                  max="2030"
                  value={formData.year || 2024}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || 2024 })}
                  className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#FF6600] px-3 py-2 text-sm text-[#F5F5F2] font-mono focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1">
                  Discipline / Catégorie
                </label>
                <select
                  value={formData.category || 'Enduro'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#FF6600] px-3 py-2 text-sm text-[#F5F5F2] focus:outline-none"
                >
                  <option value="Enduro">Enduro</option>
                  <option value="Motocross">Motocross</option>
                  <option value="Trail">Trail</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Supermotard">Supermotard</option>
                  <option value="Trial">Trial</option>
                  <option value="Route">Route</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1">
                  État / Label
                </label>
                <select
                  value={formData.condition || 'Occasion Révisée'}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#FF6600] px-3 py-2 text-sm text-[#F5F5F2] focus:outline-none"
                >
                  <option value="Occasion Révisée">Occasion Révisée</option>
                  <option value="Préparée Atelier">Préparée Atelier</option>
                  <option value="Neuf">Neuf</option>
                  <option value="Dépôt-Vente">Dépôt-Vente</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#FF6600] uppercase mb-1 font-bold">
                  Statut de vente
                </label>
                <select
                  value={formData.status || 'disponible'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full bg-[#0A0A0A] border-2 border-[#FF6600] text-[#FF6600] font-bold px-3 py-2 text-sm focus:outline-none"
                >
                  <option value="disponible">🟢 DISPONIBLE À MONS</option>
                  <option value="reservee">🟡 OPTION / RÉSERVÉE</option>
                  <option value="vendue">🔴 VENDUE</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Tarification & Caractéristiques Techniques */}
          <div className="bg-[#141414] border border-[#222222] p-4 sm:p-5">
            <h3 className="text-xs font-mono text-[#FF6600] uppercase tracking-wider mb-4 font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#FF6600]" />
              2. TARIF, MOTORISATION & CERTIFICATION ATELIER
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1">
                  Prix de vente (€) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    min="0"
                    step="50"
                    placeholder="9500"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#FF6600] px-3 py-2 text-base text-[#F5F5F2] font-mono font-bold focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-[#737373] font-mono">€</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1">
                  Cylindrée & Type Moteur
                </label>
                <input
                  type="text"
                  placeholder="ex: 293 cc (2-Temps TBI)"
                  value={formData.displacement || ''}
                  onChange={(e) => setFormData({ ...formData, displacement: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#FF6600] px-3 py-2 text-sm text-[#F5F5F2] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1">
                  Usage / Compteur (Heures ou Km)
                </label>
                <input
                  type="text"
                  placeholder="ex: 24 h moteur OU 4 850 km"
                  value={formData.mileageOrHours || ''}
                  onChange={(e) => setFormData({ ...formData, mileageOrHours: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#FF6600] px-3 py-2 text-sm text-[#F5F5F2] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1">
                  Statut de révision / Contrôle
                </label>
                <input
                  type="text"
                  placeholder="ex: Certifié Ride Factory — 32 points validés"
                  value={formData.inspectionStatus || ''}
                  onChange={(e) => setFormData({ ...formData, inspectionStatus: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#FF6600] px-3 py-2 text-sm text-[#F5F5F2] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1">
                  Badge Spécial (Optionnel)
                </label>
                <input
                  type="text"
                  placeholder="ex: Coup de Cœur Atelier, Sortie Révision..."
                  value={formData.highlightBadge || ''}
                  onChange={(e) => setFormData({ ...formData, highlightBadge: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#FF6600] px-3 py-2 text-sm text-[#F5F5F2] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Photo du Véhicule */}
          <div className="bg-[#141414] border border-[#222222] p-4 sm:p-5">
            <h3 className="text-xs font-mono text-[#FF6600] uppercase tracking-wider mb-4 font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#FF6600]" />
              3. VISUEL & PHOTO DE LA MOTO
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1">
                    Lien / URL directe de l'image
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/... ou lien web de la photo"
                    value={formData.imageUrl || ''}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#FF6600] px-3 py-2 text-xs text-[#F5F5F2] font-mono focus:outline-none"
                  />
                </div>

                {/* Upload from computer */}
                <div className="border border-dashed border-[#333333] hover:border-[#FF6600] p-4 text-center bg-[#0C0C0C] transition-colors">
                  <Upload className="w-6 h-6 text-[#FF6600] mx-auto mb-2" />
                  <label className="cursor-pointer inline-block bg-[#1A1A1A] hover:bg-[#FF6600] hover:text-[#080808] text-[#F5F5F2] text-xs font-mono px-4 py-2 uppercase font-bold transition-colors">
                    <span>CHARGER UNE PHOTO DEPUIS VOTRE APPAREIL</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[11px] text-[#737373] mt-2 font-mono">
                    PNG, JPG, WEBP jusqu'à 5 Mo. Enregistrement direct dans le navigateur.
                  </p>
                </div>

                {/* Quick Presets */}
                <div>
                  <span className="text-[11px] font-mono text-[#737373] block mb-2 uppercase">
                    Ou sélectionner une photo pro prédéfinie :
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                        className="px-2.5 py-1 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[11px] font-mono text-[#A3A3A3] hover:text-[#F5F5F2] border border-[#2B2B2B] transition-colors"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-[#0A0A0A] border border-[#222222] p-3 text-center">
                <span className="text-[11px] font-mono text-[#737373] block mb-2 uppercase">
                  Aperçu de la fiche
                </span>
                <div className="h-40 bg-[#161616] border border-[#222222] overflow-hidden flex items-center justify-center relative">
                  {formData.imageUrl ? (
                    <img
                      src={formData.imageUrl}
                      alt="Aperçu moto"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/bikes/ktm_300_exc.jpg';
                      }}
                    />
                  ) : (
                    <div className="text-center p-4">
                      <ImageIcon className="w-8 h-8 text-[#444444] mx-auto mb-1" />
                      <span className="text-[11px] font-mono text-[#737373]">Aucune photo définie</span>
                    </div>
                  )}

                  {formData.status && (
                    <div className={`absolute top-2 right-2 text-[10px] font-mono font-bold px-2 py-0.5 uppercase ${
                      formData.status === 'disponible' ? 'bg-emerald-500 text-black' :
                      formData.status === 'reservee' ? 'bg-amber-500 text-black' :
                      'bg-red-500 text-white'
                    }`}>
                      {formData.status}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Description & Équipements */}
          <div className="bg-[#141414] border border-[#222222] p-4 sm:p-5">
            <h3 className="text-xs font-mono text-[#FF6600] uppercase tracking-wider mb-4 font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#FF6600]" />
              4. DESCRIPTION DÉTAILLÉE & ÉQUIPEMENTS / OPTIONS
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1">
                  Description détaillée du véhicule
                </label>
                <textarea
                  rows={3}
                  placeholder="Historique, utilisation précédente, révisions réalisées dans l'atelier, réglages suspensions..."
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#FF6600] px-3 py-2 text-sm text-[#F5F5F2] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-2">
                  Équipements & Pièces montées (Liste à puces)
                </label>

                {/* Existing features list */}
                <div className="space-y-2 mb-3 max-h-48 overflow-y-auto pr-1">
                  {(formData.keyFeatures || []).map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-2 bg-[#0C0C0C] border border-[#222222] px-3 py-1.5 text-xs text-[#F5F5F2]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#FF6600] shrink-0" />
                        <span>{feat}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-[#737373] hover:text-red-400 p-1"
                        title="Supprimer cet équipement"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add feature input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="ex: Bib mousse Michelin neufs, Sabot moteur AXP, Silencieux Akrapovic..."
                    value={newFeatureText}
                    onChange={(e) => setNewFeatureText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                    className="flex-1 bg-[#0A0A0A] border border-[#333333] focus:border-[#FF6600] px-3 py-2 text-xs text-[#F5F5F2] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 py-2 bg-[#222222] hover:bg-[#FF6600] hover:text-[#080808] text-[#F5F5F2] text-xs font-mono uppercase font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>AJOUTER</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-[#222222] flex flex-col sm:flex-row gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#252525] text-[#A3A3A3] hover:text-[#F5F5F2] text-xs font-mono uppercase transition-colors"
            >
              ANNULER
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-[#FF6600] hover:bg-[#E65C00] text-[#080808] font-heading font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-orange-950/50"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{bikeToEdit ? 'ENREGISTRER LES MODIFICATIONS' : 'PUBLIER LA FICHE MOTO'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
