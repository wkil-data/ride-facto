import { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Navigation, Send, CheckCircle2, ArrowLeft, Calendar, FileCode, Upload, AlertCircle } from 'lucide-react';
import { AppointmentFormData } from '../data/types';

interface ContactViewProps {
  onOpenBooking: () => void;
  onNavigateHome: () => void;
  onNavigate?: (view: string, sectionId?: string) => void;
}

export function ContactView({ onOpenBooking, onNavigateHome, onNavigate }: ContactViewProps) {
  const [activeTab, setActiveTab] = useState<'rdv' | 'message'>('rdv');
  const [sentMessage, setSentMessage] = useState(false);
  const [messageForm, setMessageForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Demande d\'information',
    message: '',
  });

  // Dedicated in-page appointment state
  const [bookingData, setBookingData] = useState<AppointmentFormData>({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    motoMarque: '',
    motoModele: '',
    motoAnnee: '',
    kilometrage: '',
    heuresMoteur: '',
    typeIntervention: 'Entretien',
    description: '',
    dateSouhaitee: '',
    photos: [],
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [showOdoo, setShowOdoo] = useState(false);

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSentMessage(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.nom || !bookingData.telephone || !bookingData.email || !bookingData.motoMarque) {
      setBookingError('Veuillez remplir les champs obligatoires (Nom, Téléphone, Email, Marque moto).');
      return;
    }
    setBookingError('');
    setBookingSubmitted(true);
  };

  const addressUrl = 'https://www.google.com/maps/dir/?api=1&destination=Petite+Rue+des+Pr%C3%A9s+1+7000+Mons+Belgique';
  const openWazeUrl = 'https://waze.com/ul?q=Petite%20Rue%20des%20Pr%C3%A9s%201%207000%20Mons';

  return (
    <div className="pt-28 pb-24 bg-[#080808] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb & Back to Home Button */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#1A1A1A]">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#111111] hover:bg-[#1A1A1A] text-[#F5F5F2] hover:text-[#FF6600] border border-[#222222] text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#FF6600]" />
            <span>← RETOUR À LA PAGE D'ACCUEIL</span>
          </button>

          <span className="text-xs font-mono text-[#A3A3A3] hidden sm:inline">
            Atelier Ride Factory · Petite Rue des Prés 1, 7000 Mons
          </span>
        </div>

        {/* Quick Page Navigation Menu at the Top */}
        {onNavigate && (
          <div className="bg-[#111111] border border-[#1A1A1A] p-2.5 mb-8 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-mono text-[#737373] uppercase px-2 hidden lg:inline">ACCÈS DIRECT AUX AUTRES PAGES DU SITE :</span>
            <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
              {[
                { label: 'ACCUEIL', view: 'home' },
                { label: "L'ATELIER", view: 'home', sectionId: 'atelier' },
                { label: 'SERVICES', view: 'services' },
                { label: 'PNEUS & BIBS', view: 'pneus' },
                { label: 'MOTOS À VENDRE', view: 'motos' },
                { label: 'BLOG & GUIDES', view: 'blog' },
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

        {/* Section Header */}
        <div className="pb-8 border-b border-[#1A1A1A] mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-[#FF6600] uppercase tracking-widest mb-2">
            <span className="w-2 h-0.5 bg-[#FF6600]" />
            <span>ATELIER & COORDONNÉES</span>
          </div>
          <h1 className="font-heading font-black text-5xl sm:text-7xl text-[#F5F5F2] uppercase tracking-tight">
            CONTACT & RENDEZ-VOUS
          </h1>
          <p className="text-sm sm:text-base text-[#A3A3A3] mt-2 max-w-xl">
            Prenez rendez-vous directement pour votre moto ou contactez notre équipe technique pour un conseil ou une disponibilité pièce.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Coordinates & Map Access */}
          <div className="lg:col-span-5 bg-[#111111] border border-[#1A1A1A] p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="border-b border-[#1A1A1A] pb-4">
                <span className="text-[11px] font-mono text-[#FF6600] uppercase tracking-widest block mb-1">
                  ATELIER OFFICIEL
                </span>
                <h2 className="font-heading font-black text-3xl text-[#F5F5F2] uppercase">
                  RIDE FACTORY MONS
                </h2>
                <div className="text-xs font-mono text-[#737373] mt-1">
                  GARAGE & ATELIER MOTO TOUT-TERRAIN
                </div>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#FF6600] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-heading font-bold text-base text-[#F5F5F2]">Petite Rue des Prés 1</div>
                    <div className="text-[#A3A3A3] text-xs mt-0.5">7000 Mons, Belgique</div>
                    <div className="text-[11px] text-[#737373] mt-0.5">Accès camionnette / remorque aisé</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#FF6600] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[#F5F5F2] font-bold">LUNDI — SAMEDI</div>
                    <div className="text-[#FF6600] font-bold">09:00 — 18:00 non-stop</div>
                    <div className="text-[#737373] mt-0.5">Dimanche fermé</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#FF6600] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[#F5F5F2] font-bold">TÉLÉPHONE ATELIER</div>
                    <a href="tel:+32470556696" className="text-[#F5F5F2] hover:text-[#FF6600] font-semibold">
                      0470/55.66.96
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#FF6600] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[#F5F5F2] font-bold">EMAIL ATELIER</div>
                    <a href="mailto:contact@ridefactory.be" className="text-[#A3A3A3] hover:text-[#FF6600]">
                      contact@ridefactory.be
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#1A1A1A] space-y-3">
              <a
                href={addressUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#1A1A1A] hover:bg-[#222222] border border-[#262626] text-[#F5F5F2] font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-[#FF6600]" />
                <span>ITINÉRAIRE GOOGLE MAPS</span>
              </a>

              <a
                href={openWazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#141414] hover:bg-[#1c1c1c] border border-[#222222] text-[#A3A3A3] hover:text-[#F5F5F2] font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <span>OUVRIR DANS WAZE</span>
              </a>
            </div>
          </div>

          {/* Right Column: In-page Form with Tabs */}
          <div className="lg:col-span-7 bg-[#111111] border border-[#1A1A1A] p-6 sm:p-8">
            {/* Form Selection Tabs */}
            <div className="flex items-center gap-2 pb-4 mb-6 border-b border-[#1A1A1A]">
              <button
                type="button"
                onClick={() => setActiveTab('rdv')}
                className={`flex-1 py-3 px-4 font-heading font-black text-xs uppercase tracking-wider transition-colors border cursor-pointer ${
                  activeTab === 'rdv'
                    ? 'bg-[#FF6600] text-[#080808] border-[#FF6600]'
                    : 'bg-[#0c0c0c] text-[#A3A3A3] border-[#222222] hover:text-[#F5F5F2]'
                }`}
              >
                1. PRENDRE RENDEZ-VOUS ATELIER
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('message')}
                className={`flex-1 py-3 px-4 font-heading font-black text-xs uppercase tracking-wider transition-colors border cursor-pointer ${
                  activeTab === 'message'
                    ? 'bg-[#FF6600] text-[#080808] border-[#FF6600]'
                    : 'bg-[#0c0c0c] text-[#A3A3A3] border-[#222222] hover:text-[#F5F5F2]'
                }`}
              >
                2. SIMPLE MESSAGE / RENSEIGNEMENT
              </button>
            </div>

            {/* TAB 1: FULL IN-PAGE APPOINTMENT FORM */}
            {activeTab === 'rdv' && (
              <div>
                {bookingSubmitted ? (
                  <div className="py-8 text-center space-y-4 bg-[#080808] border border-[#1A1A1A] p-6">
                    <CheckCircle2 className="w-12 h-12 text-[#FF6600] mx-auto" />
                    <h3 className="font-heading font-black text-3xl text-[#F5F5F2] uppercase">
                      DEMANDE DE RENDEZ-VOUS TRANSMISE
                    </h3>
                    <p className="text-xs text-[#A3A3A3] max-w-md mx-auto leading-relaxed">
                      Merci <strong className="text-[#F5F5F2]">{bookingData.prenom} {bookingData.nom}</strong>. Votre demande pour votre <strong className="text-[#F5F5F2]">{bookingData.motoMarque} {bookingData.motoModele}</strong> est bien enregistrée. Nous vous contactons rapidement au {bookingData.telephone}.
                    </p>
                    <div className="pt-4 flex flex-wrap justify-center gap-3">
                      <button
                        onClick={() => {
                          setBookingSubmitted(false);
                          setBookingData({
                            nom: '',
                            prenom: '',
                            telephone: '',
                            email: '',
                            motoMarque: '',
                            motoModele: '',
                            motoAnnee: '',
                            kilometrage: '',
                            heuresMoteur: '',
                            typeIntervention: 'Entretien',
                            description: '',
                            dateSouhaitee: '',
                            photos: [],
                          });
                        }}
                        className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#222222] text-[#F5F5F2] text-xs font-mono"
                      >
                        Nouvelle demande
                      </button>
                      <button
                        onClick={onNavigateHome}
                        className="px-6 py-2 bg-[#FF6600] text-[#080808] font-heading font-black text-xs uppercase"
                      >
                        RETOURNER À L'ACCUEIL
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    {bookingError && (
                      <div className="p-3 bg-red-950/40 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                        <span>{bookingError}</span>
                      </div>
                    )}

                    {/* Pilote */}
                    <div>
                      <h4 className="font-heading font-bold text-xs text-[#F5F5F2] uppercase tracking-wider mb-2 flex items-center gap-2">
                        <span className="text-[#FF6600]">01.</span> COORDONNÉES
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Nom *"
                          value={bookingData.nom}
                          onChange={(e) => setBookingData({ ...bookingData, nom: e.target.value })}
                          className="bg-[#080808] border border-[#222222] focus:border-[#FF6600] text-[#F5F5F2] p-2.5 text-xs font-mono focus:outline-none"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Prénom *"
                          value={bookingData.prenom}
                          onChange={(e) => setBookingData({ ...bookingData, prenom: e.target.value })}
                          className="bg-[#080808] border border-[#222222] focus:border-[#FF6600] text-[#F5F5F2] p-2.5 text-xs font-mono focus:outline-none"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="Téléphone *"
                          value={bookingData.telephone}
                          onChange={(e) => setBookingData({ ...bookingData, telephone: e.target.value })}
                          className="bg-[#080808] border border-[#222222] focus:border-[#FF6600] text-[#F5F5F2] p-2.5 text-xs font-mono focus:outline-none"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Email *"
                          value={bookingData.email}
                          onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                          className="bg-[#080808] border border-[#222222] focus:border-[#FF6600] text-[#F5F5F2] p-2.5 text-xs font-mono focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Machine */}
                    <div className="pt-2 border-t border-[#1A1A1A]">
                      <h4 className="font-heading font-bold text-xs text-[#F5F5F2] uppercase tracking-wider mb-2 flex items-center gap-2">
                        <span className="text-[#FF6600]">02.</span> MACHINE
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Marque moto *"
                          value={bookingData.motoMarque}
                          onChange={(e) => setBookingData({ ...bookingData, motoMarque: e.target.value })}
                          className="bg-[#080808] border border-[#222222] focus:border-[#FF6600] text-[#F5F5F2] p-2.5 text-xs font-mono focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Modèle (ex: 300 EXC)"
                          value={bookingData.motoModele}
                          onChange={(e) => setBookingData({ ...bookingData, motoModele: e.target.value })}
                          className="bg-[#080808] border border-[#222222] focus:border-[#FF6600] text-[#F5F5F2] p-2.5 text-xs font-mono focus:outline-none"
                        />
                        <input
                          type="number"
                          placeholder="Année"
                          value={bookingData.motoAnnee}
                          onChange={(e) => setBookingData({ ...bookingData, motoAnnee: e.target.value })}
                          className="bg-[#080808] border border-[#222222] focus:border-[#FF6600] text-[#F5F5F2] p-2.5 text-xs font-mono focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Kilométrage"
                          value={bookingData.kilometrage}
                          onChange={(e) => setBookingData({ ...bookingData, kilometrage: e.target.value })}
                          className="bg-[#080808] border border-[#222222] focus:border-[#FF6600] text-[#F5F5F2] p-2.5 text-xs font-mono focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Heures moteur (si off-road)"
                          value={bookingData.heuresMoteur}
                          onChange={(e) => setBookingData({ ...bookingData, heuresMoteur: e.target.value })}
                          className="sm:col-span-2 bg-[#080808] border border-[#222222] focus:border-[#FF6600] text-[#F5F5F2] p-2.5 text-xs font-mono focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Intervention */}
                    <div className="pt-2 border-t border-[#1A1A1A]">
                      <h4 className="font-heading font-bold text-xs text-[#F5F5F2] uppercase tracking-wider mb-2 flex items-center gap-2">
                        <span className="text-[#FF6600]">03.</span> TYPE D'INTERVENTION
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {(['Entretien', 'Réparation', 'Pneus', 'Diagnostic', 'Préparation', 'Autre'] as const).map((t) => (
                          <button
                            type="button"
                            key={t}
                            onClick={() => setBookingData({ ...bookingData, typeIntervention: t })}
                            className={`p-2 text-xs font-heading font-bold uppercase tracking-wider border cursor-pointer transition-colors ${
                              bookingData.typeIntervention === t
                                ? 'bg-[#FF6600] text-[#080808] border-[#FF6600]'
                                : 'bg-[#080808] text-[#F5F5F2] border-[#222222] hover:border-[#333333]'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Description & Date */}
                    <div className="pt-2 border-t border-[#1A1A1A] space-y-3">
                      <textarea
                        rows={3}
                        placeholder="Description du problème ou intervention souhaitée..."
                        value={bookingData.description}
                        onChange={(e) => setBookingData({ ...bookingData, description: e.target.value })}
                        className="w-full bg-[#080808] border border-[#222222] focus:border-[#FF6600] text-[#F5F5F2] p-2.5 text-xs font-mono focus:outline-none"
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono text-[#737373] mb-1">DATE SOUHAITÉE :</label>
                          <input
                            type="date"
                            value={bookingData.dateSouhaitee}
                            onChange={(e) => setBookingData({ ...bookingData, dateSouhaitee: e.target.value })}
                            className="w-full bg-[#080808] border border-[#222222] focus:border-[#FF6600] text-[#F5F5F2] p-2 text-xs font-mono focus:outline-none"
                          />
                        </div>
                        <div className="flex items-end">
                          <button
                            type="submit"
                            className="w-full py-3 bg-[#FF6600] text-[#080808] font-heading font-black text-xs uppercase tracking-wider hover:bg-[#E65C00] transition-colors cursor-pointer"
                          >
                            ENVOYER MA DEMANDE DE RENDEZ-VOUS
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 2: SIMPLE MESSAGE */}
            {activeTab === 'message' && (
              <div>
                {sentMessage ? (
                  <div className="py-8 text-center space-y-3 bg-[#080808] border border-[#1A1A1A] p-6">
                    <CheckCircle2 className="w-10 h-10 text-[#FF6600] mx-auto" />
                    <h3 className="font-heading font-black text-2xl text-[#F5F5F2] uppercase">
                      MESSAGE ENVOYÉ AVEC SUCCÈS
                    </h3>
                    <p className="text-xs text-[#A3A3A3]">
                      L'atelier vous répondra dans les plus brefs délais.
                    </p>
                    <button
                      onClick={() => setSentMessage(false)}
                      className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#FF6600] hover:text-[#080808] text-[#F5F5F2] text-xs font-mono"
                    >
                      Écrire un autre message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleMessageSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Votre nom *"
                        value={messageForm.name}
                        onChange={(e) => setMessageForm({ ...messageForm, name: e.target.value })}
                        className="bg-[#080808] border border-[#222222] focus:border-[#FF6600] text-[#F5F5F2] p-2.5 text-xs font-mono focus:outline-none"
                      />
                      <input
                        type="tel"
                        placeholder="Téléphone"
                        value={messageForm.phone}
                        onChange={(e) => setMessageForm({ ...messageForm, phone: e.target.value })}
                        className="bg-[#080808] border border-[#222222] focus:border-[#FF6600] text-[#F5F5F2] p-2.5 text-xs font-mono focus:outline-none"
                      />
                    </div>

                    <input
                      type="email"
                      required
                      placeholder="Email *"
                      value={messageForm.email}
                      onChange={(e) => setMessageForm({ ...messageForm, email: e.target.value })}
                      className="w-full bg-[#080808] border border-[#222222] focus:border-[#FF6600] text-[#F5F5F2] p-2.5 text-xs font-mono focus:outline-none"
                    />

                    <textarea
                      rows={4}
                      required
                      placeholder="Votre question..."
                      value={messageForm.message}
                      onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                      className="w-full bg-[#080808] border border-[#222222] focus:border-[#FF6600] text-[#F5F5F2] p-2.5 text-xs font-mono focus:outline-none"
                    />

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#FF6600] text-[#080808] font-heading font-black text-xs uppercase tracking-wider hover:bg-[#E65C00] transition-colors cursor-pointer"
                    >
                      TRANSMETTRE MON MESSAGE
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
