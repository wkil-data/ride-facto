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
  { label: 'Trail Husqvarna 701', url: '/images/bikes/husqvarna_701.jpg' },
  { label: 'Adventure Ténéré 700', url: '/images/bikes/tenere_700.jpg' },
  { label: 'Enduro GASGAS 350F', url: '/images/bikes/gasgas_350f.jpg' },
  { label: 'Beta 300 Racing 2T', url: '/images/bikes/beta_300_rr.jpg' },
  { label: 'Honda CRF 450 Rally', url: '/images/bikes/honda_crf_450r.jpg' },
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
          'Contrôle partie-cycle et suspensions validé',
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
      setValidationError('La photo est trop volumineuse (max 5 Mo).');
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
    if (!formData.brand?.trim() || !formData.model?.trim() || !formData.price) {
      setValidationError('Veuillez renseigner au minimum la marque, le modèle et le prix.');
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
      keyFeatures:
        formData.keyFeatures && formData.keyFeatures.length > 0
          ? formData.keyFeatures
          : ['Entretien complet effectué', 'Certifiée Ride Factory'],
      inspectionStatus: formData.inspectionStatus || 'Certifié Ride Factory — 32 points validés',
      highlightBadge: formData.highlightBadge || '',
    };

    onSave(bikeFinal);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#E6E4DE] rounded-2xl w-full max-w-4xl p-6 sm:p-10 relative my-auto max-h-[92vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between pb-5 border-b border-[#E6E4DE] mb-6">
          <div>
            <p className="text-xs font-medium text-[#FF5A00] mb-1">
              Administration · Parc motos
            </p>
            <h2 className="font-heading font-bold text-2xl text-[#141413]">
              {bikeToEdit ? `Modifier : ${bikeToEdit.brand} ${bikeToEdit.model}` : 'Ajouter une moto à vendre'}
            </h2>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-2 text-[#6E6D6A] hover:text-[#141413] hover:bg-[#F2F1ED] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {validationError && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 1. Identification */}
          <div>
            <h3 className="text-xs font-semibold text-[#141413] mb-4">
              01. Identification & statut commercial
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-[#6E6D6A] mb-1.5">Marque *</label>
                <input
                  type="text"
                  required
                  placeholder="ex: KTM, YAMAHA..."
                  value={formData.brand || ''}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg px-3.5 py-2.5 text-sm text-[#141413] font-medium focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-[#6E6D6A] mb-1.5">Modèle exact *</label>
                <input
                  type="text"
                  required
                  placeholder="ex: 300 EXC HARDENDURO..."
                  value={formData.model || ''}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg px-3.5 py-2.5 text-sm text-[#141413] font-medium focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-[#6E6D6A] mb-1.5">Année</label>
                <input
                  type="number"
                  min="1980"
                  max="2030"
                  value={formData.year || 2024}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || 2024 })}
                  className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg px-3.5 py-2.5 text-sm text-[#141413] font-mono focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-xs text-[#6E6D6A] mb-1.5">Catégorie</label>
                <select
                  value={formData.category || 'Enduro'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none"
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
                <label className="block text-xs text-[#6E6D6A] mb-1.5">État</label>
                <select
                  value={formData.condition || 'Occasion Révisée'}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none"
                >
                  <option value="Occasion Révisée">Occasion Révisée</option>
                  <option value="Préparée Atelier">Préparée Atelier</option>
                  <option value="Neuf">Neuf</option>
                  <option value="Dépôt-Vente">Dépôt-Vente</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#FF5A00] mb-1.5">Statut de vente</label>
                <select
                  value={formData.status || 'disponible'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full bg-[#FAFAF8] border border-[#FF5A00] rounded-lg px-3.5 py-2.5 text-sm font-semibold text-[#141413] focus:outline-none"
                >
                  <option value="disponible">Disponible à Mons</option>
                  <option value="reservee">Réservée / Option</option>
                  <option value="vendue">Vendue</option>
                </select>
              </div>
            </div>
          </div>

          {/* 2. Tarification & Specs */}
          <div className="pt-6 border-t border-[#E6E4DE]">
            <h3 className="text-xs font-semibold text-[#141413] mb-4">
              02. Tarif & caractéristiques techniques
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-[#6E6D6A] mb-1.5">Prix (€) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="50"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg px-3.5 py-2.5 text-sm text-[#141413] font-mono font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-[#6E6D6A] mb-1.5">Cylindrée</label>
                <input
                  type="text"
                  placeholder="ex: 293 cc (2-Temps TBI)"
                  value={formData.displacement || ''}
                  onChange={(e) => setFormData({ ...formData, displacement: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-[#6E6D6A] mb-1.5">Compteur (Heures ou Km)</label>
                <input
                  type="text"
                  placeholder="ex: 24 h moteur ou 4 850 km"
                  value={formData.mileageOrHours || ''}
                  onChange={(e) => setFormData({ ...formData, mileageOrHours: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs text-[#6E6D6A] mb-1.5">Statut de révision</label>
                <input
                  type="text"
                  value={formData.inspectionStatus || ''}
                  onChange={(e) => setFormData({ ...formData, inspectionStatus: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-[#6E6D6A] mb-1.5">Mention courte (optionnel)</label>
                <input
                  type="text"
                  value={formData.highlightBadge || ''}
                  onChange={(e) => setFormData({ ...formData, highlightBadge: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 3. Photo */}
          <div className="pt-6 border-t border-[#E6E4DE]">
            <h3 className="text-xs font-semibold text-[#141413] mb-4">
              03. Photo de la moto
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <label className="block text-xs text-[#6E6D6A] mb-1.5">Lien URL ou chemin de l’image</label>
                  <input
                    type="text"
                    placeholder="https://... ou /images/bikes/..."
                    value={formData.imageUrl || ''}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg px-3.5 py-2.5 text-xs text-[#141413] font-mono focus:outline-none"
                  />
                </div>

                <div className="border border-dashed border-[#D4D1C9] hover:border-[#FF5A00] rounded-xl p-4 text-center bg-[#FAFAF8] transition-colors">
                  <Upload className="w-5 h-5 text-[#FF5A00] mx-auto mb-2" />
                  <label className="cursor-pointer inline-block bg-white border border-[#E6E4DE] hover:border-[#141413] text-[#141413] text-xs font-medium px-4 py-2 rounded-lg transition-colors">
                    <span>Charger depuis votre appareil</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[11px] text-[#6E6D6A] mt-2">
                    PNG, JPG ou WEBP jusqu’à 5 Mo.
                  </p>
                </div>

                <div>
                  <span className="text-xs text-[#6E6D6A] block mb-2">Ou choisir un visuel atelier :</span>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                        className="px-3 py-1.5 bg-[#F2F1ED] hover:bg-[#E6E4DE] text-xs text-[#141413] rounded-lg transition-colors cursor-pointer"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-[#FAFAF8] border border-[#E6E4DE] rounded-xl p-3">
                <span className="text-xs text-[#6E6D6A] block mb-2">Aperçu</span>
                <div className="aspect-[16/10] bg-[#141413] rounded-lg overflow-hidden flex items-center justify-center">
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
                    <ImageIcon className="w-7 h-7 text-white/40" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 4. Description & Équipements */}
          <div className="pt-6 border-t border-[#E6E4DE] space-y-4">
            <h3 className="text-xs font-semibold text-[#141413]">
              04. Description & équipements
            </h3>

            <div>
              <label className="block text-xs text-[#6E6D6A] mb-1.5">Description détaillée</label>
              <textarea
                rows={3}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-[#6E6D6A] mb-2">Équipements & pièces montées</label>

              <div className="space-y-2 mb-3 max-h-44 overflow-y-auto">
                {(formData.keyFeatures || []).map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-2 bg-[#FAFAF8] border border-[#E6E4DE] rounded-lg px-3 py-2 text-xs text-[#141413]"
                  >
                    <span>{feat}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(idx)}
                      className="text-[#6E6D6A] hover:text-red-600 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="ex: Bib mousse Michelin neufs, sabot AXP..."
                  value={newFeatureText}
                  onChange={(e) => setNewFeatureText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddFeature();
                    }
                  }}
                  className="flex-1 bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg px-3.5 py-2 text-xs text-[#141413] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-4 py-2 bg-[#F2F1ED] hover:bg-[#E6E4DE] text-[#141413] text-xs font-medium rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-5 border-t border-[#E6E4DE] flex flex-col sm:flex-row gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-[#F2F1ED] hover:bg-[#E6E4DE] text-[#141413] text-sm font-medium rounded-lg cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#FF5A00] hover:bg-[#E04E00] text-white text-sm font-medium rounded-lg inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{bikeToEdit ? 'Enregistrer' : 'Publier la fiche'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
