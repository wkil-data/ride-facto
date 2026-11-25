import { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Upload, FileCode } from 'lucide-react';
import { AppointmentFormData } from '../data/types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export function BookingModal({ isOpen, onClose, preselectedService }: BookingModalProps) {
  const [formData, setFormData] = useState<AppointmentFormData>({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    motoMarque: '',
    motoModele: '',
    motoAnnee: '',
    kilometrage: '',
    heuresMoteur: '',
    typeIntervention: (preselectedService?.includes('PNEU') || preselectedService?.includes('Pneu')
      ? 'Pneus'
      : preselectedService?.includes('PRÉPAR') || preselectedService?.includes('Prépar')
      ? 'Préparation'
      : preselectedService?.includes('RÉPAR') || preselectedService?.includes('Répar')
      ? 'Réparation'
      : 'Entretien') as any,
    description: '',
    dateSouhaitee: '',
    photos: [],
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showOdooPayload, setShowOdooPayload] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nom || !formData.telephone || !formData.email || !formData.motoMarque) {
      setErrorMsg('Veuillez remplir les champs obligatoires (Nom, Téléphone, Email, Marque moto).');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  const handleSimulatePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileNames = Array.from(e.target.files).map((f) => f.name);
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...fileNames],
      }));
    }
  };

  const odooPayload = {
    odoo_target_model: 'repair.order',
    partner: {
      name: `${formData.prenom} ${formData.nom}`.trim(),
      phone: formData.telephone,
      email: formData.email,
      company_id: 'RIDE FACTORY MONS',
    },
    vehicle: {
      brand: formData.motoMarque,
      model: formData.motoModele,
      year: formData.motoAnnee ? parseInt(formData.motoAnnee) : null,
      odometer_km: formData.kilometrage ? parseFloat(formData.kilometrage) : null,
      engine_hours: formData.heuresMoteur ? parseFloat(formData.heuresMoteur) : null,
    },
    service_request: {
      type: formData.typeIntervention,
      description: formData.description,
      requested_date: formData.dateSouhaitee,
      attachments_count: formData.photos.length,
      location: 'Petite Rue des Prés 1, 7000 Mons',
    },
    meta: {
      source: 'ride-factory-web',
      created_at: new Date().toISOString(),
    },
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/45 backdrop-blur-xs overflow-y-auto p-3 sm:p-6 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative bg-white border border-[#E6E4DE] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Clean Sticky Header */}
        <div className="shrink-0 border-b border-[#E6E4DE] px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-[#FF5A00]">Ride Factory · Mons</p>
            <h2 className="font-heading font-bold text-lg text-[#141413]">
              Prendre rendez-vous
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#6E6D6A] hover:text-[#141413] hover:bg-[#F2F1ED] rounded-lg transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 overscroll-contain">
          {submitted ? (
            <div className="py-6 text-center space-y-5">
              <CheckCircle2 className="w-10 h-10 text-[#FF5A00] mx-auto" />

              <div>
                <h3 className="font-heading font-bold text-2xl text-[#141413]">
                  Votre demande est enregistrée
                </h3>
                <p className="text-sm text-[#6E6D6A] max-w-md mx-auto mt-2 leading-relaxed">
                  Merci <strong className="text-[#141413]">{formData.prenom} {formData.nom}</strong>. Nous examinons votre demande pour votre <strong className="text-[#141413]">{formData.motoMarque} {formData.motoModele}</strong> et vous recontactons rapidement au <strong className="text-[#141413]">{formData.telephone}</strong>.
                </p>
              </div>

              <div className="bg-[#FAFAF8] border border-[#E6E4DE] rounded-xl p-4 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#6E6D6A]">Référence</span>
                  <span className="font-mono font-semibold text-[#141413]">RF-{Date.now().toString().slice(-6)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6E6D6A]">Intervention</span>
                  <span className="font-medium text-[#FF5A00]">{formData.typeIntervention}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6E6D6A]">Date souhaitée</span>
                  <span className="text-[#141413]">{formData.dateSouhaitee || 'Dès que possible'}</span>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setShowOdooPayload(!showOdooPayload)}
                  className="text-xs text-[#6E6D6A] hover:text-[#141413] inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>{showOdooPayload ? 'Masquer payload Odoo' : 'Aperçu connecteur Odoo'}</span>
                </button>

                {showOdooPayload && (
                  <div className="mt-3 text-left bg-[#FAFAF8] border border-[#E6E4DE] rounded-xl p-4 text-[11px] font-mono text-[#6E6D6A] overflow-x-auto max-h-44">
                    <pre>{JSON.stringify(odooPayload, null, 2)}</pre>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-[#141413] hover:bg-[#FF5A00] text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form id="booking-modal-form" onSubmit={handleSubmit} className="space-y-7">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Coordonnées */}
              <div>
                <h3 className="text-xs font-semibold text-[#141413] mb-3">
                  01. Coordonnées
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs text-[#6E6D6A] mb-1">Nom *</label>
                    <input
                      type="text"
                      required
                      placeholder="Dupont"
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg text-[#141413] px-3.5 py-2.5 text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#6E6D6A] mb-1">Prénom *</label>
                    <input
                      type="text"
                      required
                      placeholder="Thomas"
                      value={formData.prenom}
                      onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                      className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg text-[#141413] px-3.5 py-2.5 text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#6E6D6A] mb-1">Téléphone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+32 470 00 00 00"
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                      className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg text-[#141413] px-3.5 py-2.5 text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#6E6D6A] mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="contact@exemple.be"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg text-[#141413] px-3.5 py-2.5 text-sm focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Moto */}
              <div className="pt-5 border-t border-[#E6E4DE]">
                <h3 className="text-xs font-semibold text-[#141413] mb-3">
                  02. Votre moto
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-xs text-[#6E6D6A] mb-1">Marque *</label>
                    <input
                      type="text"
                      required
                      placeholder="KTM, Husqvarna..."
                      value={formData.motoMarque}
                      onChange={(e) => setFormData({ ...formData, motoMarque: e.target.value })}
                      className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg text-[#141413] px-3.5 py-2.5 text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#6E6D6A] mb-1">Modèle</label>
                    <input
                      type="text"
                      placeholder="300 EXC, Ténéré..."
                      value={formData.motoModele}
                      onChange={(e) => setFormData({ ...formData, motoModele: e.target.value })}
                      className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg text-[#141413] px-3.5 py-2.5 text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#6E6D6A] mb-1">Année</label>
                    <input
                      type="number"
                      placeholder="2023"
                      min="1970"
                      max="2027"
                      value={formData.motoAnnee}
                      onChange={(e) => setFormData({ ...formData, motoAnnee: e.target.value })}
                      className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg text-[#141413] px-3.5 py-2.5 text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#6E6D6A] mb-1">Kilométrage</label>
                    <input
                      type="text"
                      placeholder="4 500 km"
                      value={formData.kilometrage}
                      onChange={(e) => setFormData({ ...formData, kilometrage: e.target.value })}
                      className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg text-[#141413] px-3.5 py-2.5 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-[#6E6D6A] mb-1">Heures moteur (optionnel)</label>
                    <input
                      type="text"
                      placeholder="35 h"
                      value={formData.heuresMoteur}
                      onChange={(e) => setFormData({ ...formData, heuresMoteur: e.target.value })}
                      className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg text-[#141413] px-3.5 py-2.5 text-sm focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Type intervention */}
              <div className="pt-5 border-t border-[#E6E4DE]">
                <h3 className="text-xs font-semibold text-[#141413] mb-3">
                  03. Intervention souhaitée
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(['Entretien', 'Réparation', 'Pneus', 'Diagnostic', 'Préparation', 'Autre'] as const).map((type) => {
                    const isSelected = formData.typeIntervention === type;
                    return (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setFormData({ ...formData, typeIntervention: type })}
                        className={`px-3 py-2 text-xs font-medium rounded-lg border cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#141413] text-white border-[#141413]'
                            : 'bg-[#FAFAF8] text-[#6E6D6A] border-[#E6E4DE] hover:text-[#141413]'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description & Date & Photos */}
              <div className="pt-5 border-t border-[#E6E4DE] space-y-4">
                <div>
                  <label className="block text-xs text-[#6E6D6A] mb-1">Détails ou symptômes</label>
                  <textarea
                    rows={3}
                    placeholder="Précisez les travaux souhaités, accessoires ou pneus..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg text-[#141413] p-3 text-sm focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#6E6D6A] mb-1">Date souhaitée</label>
                    <input
                      type="date"
                      value={formData.dateSouhaitee}
                      onChange={(e) => setFormData({ ...formData, dateSouhaitee: e.target.value })}
                      className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg text-[#141413] px-3.5 py-2.5 text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#6E6D6A] mb-1">Photos (optionnel)</label>
                    <label className="flex items-center gap-2 px-3.5 py-2.5 bg-[#FAFAF8] border border-dashed border-[#D4D1C9] hover:border-[#FF5A00] rounded-lg cursor-pointer text-xs text-[#6E6D6A] transition-colors">
                      <Upload className="w-4 h-4 text-[#FF5A00]" />
                      <span>{formData.photos.length > 0 ? `${formData.photos.length} photo(s)` : 'Ajouter des photos'}</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleSimulatePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {formData.photos.length > 0 && (
                  <div className="flex flex-wrap gap-2 text-xs text-[#6E6D6A]">
                    {formData.photos.map((name, i) => (
                      <span key={i} className="bg-[#F2F1ED] px-2.5 py-1 rounded text-[11px] text-[#141413]">
                        {name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Footer CTA */}
        {!submitted && (
          <div className="shrink-0 bg-[#FAFAF8] border-t border-[#E6E4DE] px-6 py-4 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-medium text-[#6E6D6A] hover:text-[#141413] cursor-pointer"
            >
              Annuler
            </button>

            <button
              type="submit"
              form="booking-modal-form"
              className="px-6 py-2.5 bg-[#FF5A00] hover:bg-[#E04E00] text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
            >
              Envoyer la demande
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
