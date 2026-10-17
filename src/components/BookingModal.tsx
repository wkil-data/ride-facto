import { useState, useEffect } from 'react';
import { X, ArrowLeft, CheckCircle2, AlertCircle, Upload, FileCode, Calendar, ShieldCheck } from 'lucide-react';
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
    typeIntervention: (preselectedService?.includes('PNEU')
      ? 'Pneus'
      : preselectedService?.includes('PRÉPAR')
      ? 'Préparation'
      : preselectedService?.includes('RÉPAR')
      ? 'Réparation'
      : 'Entretien') as any,
    description: '',
    dateSouhaitee: '',
    photos: [],
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showOdooPayload, setShowOdooPayload] = useState(false);

  // Close on Escape key press & prevent background scroll
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
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md overflow-y-auto p-2 sm:p-4 md:p-6 flex items-start sm:items-center justify-center pt-16 sm:pt-16 pb-12 animate-in fade-in duration-150"
      onClick={(e) => {
        // Clicking directly on the backdrop closes the modal
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* FLOATING VIEWPORT ACTION BUTTONS - GUARANTEED NEVER TO BE LOST REGARDLESS OF ZOOM LEVEL */}
      <div className="fixed top-2.5 left-2.5 sm:top-4 sm:left-4 z-[120]">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-[#161616] hover:bg-[#222222] text-[#F5F5F2] hover:text-[#FF6600] border border-[#333333] font-mono font-bold text-xs uppercase tracking-wider shadow-2xl transition-all cursor-pointer active:scale-95"
          title="Retourner à la page d'accueil"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#FF6600]" />
          <span>← RETOUR ACCUEIL</span>
        </button>
      </div>

      <div className="fixed top-2.5 right-2.5 sm:top-4 sm:right-4 z-[120]">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#FF6600] hover:bg-[#E65C00] text-[#080808] font-heading font-black text-xs uppercase tracking-wider shadow-2xl transition-all cursor-pointer border border-[#FF6600] active:scale-95"
          title="Fermer la fenêtre (ou touche Échap)"
        >
          <span>FERMER</span>
          <X className="w-4 h-4 stroke-[3]" />
        </button>
      </div>

      <div className="relative bg-[#111111] border border-[#262626] w-full max-w-3xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 my-auto">
        {/* 1. PERMANENT STICKY HEADER - NEVER CUT OFF, VISIBLE AT ALL TIMES */}
        <div className="shrink-0 bg-[#161616] border-b border-[#222222] px-4 sm:px-6 py-3 flex items-center justify-between gap-3 z-20">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#222222] hover:bg-[#2e2e2e] text-[#F5F5F2] text-xs font-mono font-bold uppercase transition-colors border border-[#333333] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#FF6600]" />
            <span>← RETOUR À L'ACCUEIL</span>
          </button>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-[#A3A3A3]">
            <span className="text-[#FF6600]">RIDE FACTORY MONS</span>
            <span>·</span>
            <span>RENDEZ-VOUS ATELIER</span>
          </div>

          {/* High-visibility Close Button in Header */}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FF6600] hover:bg-[#E65C00] text-[#080808] font-heading font-black text-xs uppercase tracking-wider transition-colors cursor-pointer select-none"
            aria-label="Fermer la fenêtre"
          >
            <span>FERMER</span>
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* 2. SCROLLABLE INNER BODY */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 overscroll-contain">
          {submitted ? (
            /* Confirmation Screen */
            <div className="py-6 text-center space-y-6">
              <div className="w-16 h-16 bg-[#FF6600]/10 border border-[#FF6600] flex items-center justify-center mx-auto text-[#FF6600]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono text-[#FF6600] uppercase tracking-widest block mb-1">
                  DEMANDE ENREGISTRÉE · RIDE FACTORY MONS
                </span>
                <h3 className="font-heading font-black text-3xl sm:text-4xl text-[#F5F5F2] uppercase">
                  VOTRE DEMANDE EST BIEN REÇUE
                </h3>
              </div>

              <p className="text-sm text-[#A3A3A3] max-w-lg mx-auto leading-relaxed">
                Merci <strong className="text-[#F5F5F2]">{formData.prenom} {formData.nom}</strong>. L'équipe Ride Factory examine votre demande pour votre <strong className="text-[#F5F5F2]">{formData.motoMarque} {formData.motoModele}</strong>. Nous vous recontacterons au <strong className="text-[#F5F5F2]">{formData.telephone}</strong> dans les plus brefs délais pour confirmer le créneau.
              </p>

              <div className="bg-[#080808] border border-[#1A1A1A] p-4 max-w-md mx-auto text-left text-xs font-mono space-y-1.5">
                <div className="text-[#A3A3A3] flex justify-between">
                  <span>RÉFÉRENCE DOSSIER :</span>
                  <span className="text-[#F5F5F2] font-bold">RF-{Date.now().toString().slice(-6)}</span>
                </div>
                <div className="text-[#A3A3A3] flex justify-between">
                  <span>INTERVENTION :</span>
                  <span className="text-[#FF6600] font-bold uppercase">{formData.typeIntervention}</span>
                </div>
                <div className="text-[#A3A3A3] flex justify-between">
                  <span>DATE DEMANDÉE :</span>
                  <span className="text-[#F5F5F2]">{formData.dateSouhaitee || 'Dès que possible'}</span>
                </div>
                <div className="text-[#A3A3A3] flex justify-between">
                  <span>ATELIER :</span>
                  <span className="text-[#F5F5F2]">Petite Rue des Prés 1, 7000 Mons</span>
                </div>
              </div>

              {/* Odoo Architecture Inspection toggle */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowOdooPayload(!showOdooPayload)}
                  className="text-xs font-mono text-[#A3A3A3] hover:text-[#FF6600] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>{showOdooPayload ? 'Masquer connecteur Odoo' : 'Inspecter payload connecteur Odoo (Ride Factory)'}</span>
                </button>

                {showOdooPayload && (
                  <div className="mt-3 text-left bg-[#080808] border border-[#222222] p-4 text-[11px] font-mono text-[#A3A3A3] overflow-x-auto max-h-48">
                    <pre>{JSON.stringify(odooPayload, null, 2)}</pre>
                  </div>
                )}
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3.5 bg-[#FF6600] text-[#080808] font-heading font-black text-sm uppercase tracking-wider hover:bg-[#E65C00] transition-colors cursor-pointer"
                >
                  RETOURNER À L'ACCUEIL DU SITE
                </button>
              </div>
            </div>
          ) : (
            /* Form Screen */
            <div>
              <div className="mb-6 pb-4 border-b border-[#1A1A1A]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#FF6600] uppercase tracking-widest mb-1">
                  <span className="w-2 h-0.5 bg-[#FF6600]" />
                  <span>FORMULAIRE PRISE EN CHARGE MOTO · RIDE FACTORY MONS</span>
                </div>
                <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#F5F5F2] uppercase tracking-tight">
                  DEMANDE DE RENDEZ-VOUS ATELIER
                </h2>
                <p className="text-xs sm:text-sm text-[#A3A3A3] mt-1.5">
                  Remplissez ce formulaire pour planifier l'entretien, le montage pneus ou la préparation de votre moto à Mons.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-6 p-3 bg-red-950/40 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form id="booking-modal-form" onSubmit={handleSubmit} className="space-y-6">
                {/* Coordonnées */}
                <div>
                  <h3 className="font-heading font-bold text-sm text-[#F5F5F2] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="text-[#FF6600]">01.</span> COORDONNÉES DU PILOTE
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#A3A3A3] mb-1">NOM *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Dupont"
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        className="w-full bg-[#080808] border border-[#222222] focus:border-[#FF6600] text-[#F5F5F2] px-3.5 py-2.5 text-xs font-mono focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#A3A3A3] mb-1">PRÉNOM *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Thomas"
                        value={formData.prenom}
                        onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                        className="w-full bg-[#080808] border border-[#222222] focus:border-[#FF6600] text-[#F5F5F2] px-3.5 py-2.5 text-xs font-mono focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#A3A3A3] mb-1">TÉLÉPHONE *</label>
                      <input
                        type="tel"
                        required
                        placeholder="Ex: +32 470 00 00 00"
                        value={formData.telephone}
                        onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                        className="w-full bg-[#080808] border border-[#222222] focus:border-[#FF6600] text-[#F5F5F2] px-3.5 py-2.5 text-xs font-mono focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#A3A3A3] mb-1">EMAIL *</label>
                      <input
                        type="email"
                        required
                        placeholder="Ex: contact@exemple.be"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#080808] border border-[#222222] focus:border-[#FF6600] text-[#F5F5F2] px-3.5 py-2.5 text-xs font-mono focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Moto */}
                <div className="pt-2 border-t border-[#1A1A1A]">
                  <h3 className="font-heading font-bold text-sm text-[#F5F5F2] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="text-[#FF6600]">02.</span> VOTRE MOTO
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#A3A3A3] mb-1">MARQUE *</label>
                      <input
                        type="text"
                        required
                        placeholder="KTM, Husqvarna, Yamaha..."
                        value={formData.motoMarque}
                        onChange={(e) => setFormData({ ...formData, motoMarque: e.target.value })}
                        className="w-full bg-[#080808] border border-[#222222] focus:border-[#FF6600] text-[#F5F5F2] px-3.5 py-2.5 text-xs font-mono focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#A3A3A3] mb-1">MODÈLE</label>
                      <input
                        type="text"
                        placeholder="300 EXC, Ténéré 700, CRF..."
                        value={formData.motoModele}
                        onChange={(e) => setFormData({ ...formData, motoModele: e.target.value })}
                        className="w-full bg-[#080808] border border-[#222222] focus:border-[#FF6600] text-[#F5F5F2] px-3.5 py-2.5 text-xs font-mono focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#A3A3A3] mb-1">ANNÉE</label>
                      <input
                        type="number"
                        placeholder="Ex: 2023"
                        min="1970"
                        max="2026"
                        value={formData.motoAnnee}
                        onChange={(e) => setFormData({ ...formData, motoAnnee: e.target.value })}
                        className="w-full bg-[#080808] border border-[#222222] focus:border-[#FF6600] text-[#F5F5F2] px-3.5 py-2.5 text-xs font-mono focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#A3A3A3] mb-1">KILOMÉTRAGE</label>
                      <input
                        type="text"
                        placeholder="Ex: 4 500 km"
                        value={formData.kilometrage}
                        onChange={(e) => setFormData({ ...formData, kilometrage: e.target.value })}
                        className="w-full bg-[#080808] border border-[#222222] focus:border-[#FF6600] text-[#F5F5F2] px-3.5 py-2.5 text-xs font-mono focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-[#A3A3A3] mb-1">
                        HEURES MOTEUR <span className="text-[#737373]">(Facultatif - Enduro / MX)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: 35 h"
                        value={formData.heuresMoteur}
                        onChange={(e) => setFormData({ ...formData, heuresMoteur: e.target.value })}
                        className="w-full bg-[#080808] border border-[#222222] focus:border-[#FF6600] text-[#F5F5F2] px-3.5 py-2.5 text-xs font-mono focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Type intervention */}
                <div className="pt-2 border-t border-[#1A1A1A]">
                  <h3 className="font-heading font-bold text-sm text-[#F5F5F2] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="text-[#FF6600]">03.</span> TYPE D'INTERVENTION
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {(['Entretien', 'Réparation', 'Pneus', 'Diagnostic', 'Préparation', 'Autre'] as const).map((type) => {
                      const isSelected = formData.typeIntervention === type;
                      return (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setFormData({ ...formData, typeIntervention: type })}
                          className={`p-2.5 text-xs font-heading font-bold uppercase tracking-wider border cursor-pointer text-left transition-colors ${
                            isSelected
                              ? 'bg-[#FF6600] text-[#080808] border-[#FF6600]'
                              : 'bg-[#080808] text-[#F5F5F2] border-[#222222] hover:border-[#333333]'
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Description & Date & Photos */}
                <div className="pt-2 border-t border-[#1A1A1A] space-y-4">
                  <h3 className="font-heading font-bold text-sm text-[#F5F5F2] uppercase tracking-wider flex items-center gap-2">
                    <span className="text-[#FF6600]">04.</span> DÉTAILS DE L'INTERVENTION
                  </h3>

                  <div>
                    <label className="block text-xs font-mono text-[#A3A3A3] mb-1">
                      DESCRIPTION DU PROBLÈME / INTERVENTION SOUHAITÉE
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Précisez les symptômes, le type de révision, les accessoires à installer ou la monte de pneus désirée..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-[#080808] border border-[#222222] focus:border-[#FF6600] text-[#F5F5F2] p-3 text-xs font-mono focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#A3A3A3] mb-1">DATE SOUHAITÉE</label>
                      <input
                        type="date"
                        value={formData.dateSouhaitee}
                        onChange={(e) => setFormData({ ...formData, dateSouhaitee: e.target.value })}
                        className="w-full bg-[#080808] border border-[#222222] focus:border-[#FF6600] text-[#F5F5F2] px-3.5 py-2.5 text-xs font-mono focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#A3A3A3] mb-1">
                        PHOTOS DE LA MOTO <span className="text-[#737373]">(Facultatif)</span>
                      </label>
                      <label className="flex items-center gap-2 px-3.5 py-2.5 bg-[#080808] border border-dashed border-[#333333] hover:border-[#FF6600] cursor-pointer text-xs font-mono text-[#A3A3A3] transition-colors">
                        <Upload className="w-4 h-4 text-[#FF6600]" />
                        <span>{formData.photos.length > 0 ? `${formData.photos.length} photo(s) ajoutée(s)` : 'Ajouter des photos'}</span>
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
                    <div className="flex flex-wrap gap-2 text-xs font-mono text-[#FF6600]">
                      {formData.photos.map((name, i) => (
                        <span key={i} className="bg-[#1A1A1A] px-2 py-1 text-[11px] text-[#F5F5F2] border border-[#222222]">
                          {name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>

        {/* 3. PERMANENT STICKY FOOTER WITH CONFIRMATION & CANCEL BUTTONS */}
        {!submitted && (
          <div className="shrink-0 bg-[#0d0d0d] border-t border-[#1F1F1F] px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 z-10">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-mono text-[#A3A3A3] hover:text-[#F5F5F2] flex items-center gap-1.5 cursor-pointer py-1"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#FF6600]" />
              <span>Annuler et retourner au site</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="submit"
                form="booking-modal-form"
                className="w-full sm:w-auto px-8 py-3 bg-[#FF6600] hover:bg-[#E65C00] text-[#080808] font-heading font-black text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
              >
                ENVOYER MA DEMANDE DE RENDEZ-VOUS
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
