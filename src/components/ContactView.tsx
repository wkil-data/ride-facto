import { useState } from 'react';
import { Navigation, CheckCircle2, ArrowLeft, AlertCircle } from 'lucide-react';
import { AppointmentFormData } from '../data/types';

interface ContactViewProps {
  onNavigateHome: () => void;
}

export function ContactView({ onNavigateHome }: ContactViewProps) {
  const [activeTab, setActiveTab] = useState<'rdv' | 'message'>('rdv');
  const [sentMessage, setSentMessage] = useState(false);
  const [messageForm, setMessageForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: "Demande d'information",
    message: '',
  });

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
    <div className="pt-28 pb-24 bg-[#FAFAF8] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6E6D6A] hover:text-[#141413] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l’accueil</span>
          </button>
        </div>

        <div className="max-w-2xl mb-12">
          <p className="text-sm font-medium text-[#FF5A00] mb-3">
            Contact & Atelier
          </p>
          <h1
            className="font-heading font-extrabold text-[#141413] tracking-tight leading-[1.08] mb-4"
            style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', textWrap: 'balance' }}
          >
            Prendre rendez-vous à Mons.
          </h1>
          <p className="text-base text-[#6E6D6A] leading-relaxed">
            Planifiez l’entretien de votre moto ou posez-nous directement vos questions techniques.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Clean Atelier Coordinates */}
          <div className="lg:col-span-5 space-y-8">
            <div className="divide-y divide-[#E6E4DE] border-y border-[#E6E4DE] text-sm">
              <div className="py-4 flex justify-between gap-4">
                <span className="text-[#6E6D6A]">Adresse</span>
                <div className="text-right">
                  <div className="font-medium text-[#141413]">Petite Rue des Prés 1</div>
                  <div className="text-xs text-[#6E6D6A] mt-0.5">7000 Mons, Belgique</div>
                </div>
              </div>
              <div className="py-4 flex justify-between gap-4">
                <span className="text-[#6E6D6A]">Horaires</span>
                <div className="text-right">
                  <div className="font-medium text-[#141413] tabular-nums">Lun – Sam · 09:00 – 18:00</div>
                  <div className="text-xs text-[#6E6D6A] mt-0.5">Dimanche fermé</div>
                </div>
              </div>
              <div className="py-4 flex justify-between gap-4">
                <span className="text-[#6E6D6A]">Téléphone</span>
                <a href="tel:+32470556696" className="font-mono font-medium text-[#141413] hover:text-[#FF5A00] tabular-nums">
                  0470/55.66.96
                </a>
              </div>
              <div className="py-4 flex justify-between gap-4">
                <span className="text-[#6E6D6A]">Email</span>
                <a href="mailto:info@ride-factory.be" className="font-medium text-[#141413] hover:text-[#FF5A00] transition-colors">
                  info@ride-factory.be
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={addressUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E6E4DE] hover:border-[#141413] text-[#141413] text-sm font-medium rounded-lg transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-[#FF5A00]" />
                <span>Google Maps</span>
              </a>

              <a
                href={openWazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E6E4DE] hover:border-[#141413] text-[#141413] text-sm font-medium rounded-lg transition-colors"
              >
                <span>Waze</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean Form Card */}
          <div className="lg:col-span-7 bg-white border border-[#E6E4DE] rounded-2xl p-6 sm:p-10">
            {/* Segmented Mode Tabs */}
            <div className="inline-flex p-1 bg-[#F2F1ED] rounded-xl mb-8 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab('rdv')}
                className={`flex-1 sm:flex-none px-5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'rdv'
                    ? 'bg-white text-[#141413] shadow-xs'
                    : 'text-[#6E6D6A] hover:text-[#141413]'
                }`}
              >
                Demande de rendez-vous
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('message')}
                className={`flex-1 sm:flex-none px-5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'message'
                    ? 'bg-white text-[#141413] shadow-xs'
                    : 'text-[#6E6D6A] hover:text-[#141413]'
                }`}
              >
                Simple message
              </button>
            </div>

            {activeTab === 'rdv' && (
              <div>
                {bookingSubmitted ? (
                  <div className="py-10 text-center space-y-4">
                    <CheckCircle2 className="w-10 h-10 text-[#FF5A00] mx-auto" />
                    <h3 className="font-heading font-bold text-2xl text-[#141413]">
                      Demande transmise
                    </h3>
                    <p className="text-sm text-[#6E6D6A] max-w-md mx-auto leading-relaxed">
                      Merci <strong className="text-[#141413]">{bookingData.prenom} {bookingData.nom}</strong>. Votre demande pour votre <strong className="text-[#141413]">{bookingData.motoMarque} {bookingData.motoModele}</strong> est enregistrée. Nous vous recontactons rapidement au {bookingData.telephone}.
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
                        className="px-4 py-2 bg-[#F2F1ED] hover:bg-[#E6E4DE] text-[#141413] text-sm font-medium rounded-lg cursor-pointer"
                      >
                        Nouvelle demande
                      </button>
                      <button
                        onClick={onNavigateHome}
                        className="px-5 py-2 bg-[#141413] hover:bg-[#FF5A00] text-white text-sm font-medium rounded-lg cursor-pointer transition-colors"
                      >
                        Retour à l’accueil
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    {bookingError && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{bookingError}</span>
                      </div>
                    )}

                    <div>
                      <h4 className="text-xs font-semibold text-[#141413] mb-3">
                        01. Coordonnées
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Nom *"
                          value={bookingData.nom}
                          onChange={(e) => setBookingData({ ...bookingData, nom: e.target.value })}
                          className="bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg text-[#141413] px-3.5 py-2.5 text-sm focus:outline-none"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Prénom *"
                          value={bookingData.prenom}
                          onChange={(e) => setBookingData({ ...bookingData, prenom: e.target.value })}
                          className="bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg text-[#141413] px-3.5 py-2.5 text-sm focus:outline-none"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="Téléphone *"
                          value={bookingData.telephone}
                          onChange={(e) => setBookingData({ ...bookingData, telephone: e.target.value })}
                          className="bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg text-[#141413] px-3.5 py-2.5 text-sm focus:outline-none"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Email *"
                          value={bookingData.email}
                          onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                          className="bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg text-[#141413] px-3.5 py-2.5 text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#E6E4DE]">
                      <h4 className="text-xs font-semibold text-[#141413] mb-3">
                        02. Machine
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Marque *"
                          value={bookingData.motoMarque}
                          onChange={(e) => setBookingData({ ...bookingData, motoMarque: e.target.value })}
                          className="bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg text-[#141413] px-3.5 py-2.5 text-sm focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Modèle (ex: 300 EXC)"
                          value={bookingData.motoModele}
                          onChange={(e) => setBookingData({ ...bookingData, motoModele: e.target.value })}
                          className="bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg text-[#141413] px-3.5 py-2.5 text-sm focus:outline-none"
                        />
                        <input
                          type="number"
                          placeholder="Année"
                          value={bookingData.motoAnnee}
                          onChange={(e) => setBookingData({ ...bookingData, motoAnnee: e.target.value })}
                          className="bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg text-[#141413] px-3.5 py-2.5 text-sm focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Kilométrage"
                          value={bookingData.kilometrage}
                          onChange={(e) => setBookingData({ ...bookingData, kilometrage: e.target.value })}
                          className="bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg text-[#141413] px-3.5 py-2.5 text-sm focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Heures moteur (optionnel)"
                          value={bookingData.heuresMoteur}
                          onChange={(e) => setBookingData({ ...bookingData, heuresMoteur: e.target.value })}
                          className="sm:col-span-2 bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg text-[#141413] px-3.5 py-2.5 text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#E6E4DE]">
                      <h4 className="text-xs font-semibold text-[#141413] mb-3">
                        03. Intervention souhaitée
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {(['Entretien', 'Réparation', 'Pneus', 'Diagnostic', 'Préparation', 'Autre'] as const).map((t) => (
                          <button
                            type="button"
                            key={t}
                            onClick={() => setBookingData({ ...bookingData, typeIntervention: t })}
                            className={`px-3 py-2 text-xs font-medium rounded-lg border cursor-pointer transition-colors ${
                              bookingData.typeIntervention === t
                                ? 'bg-[#141413] text-white border-[#141413]'
                                : 'bg-[#FAFAF8] text-[#6E6D6A] border-[#E6E4DE] hover:text-[#141413]'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#E6E4DE] space-y-4">
                      <textarea
                        rows={3}
                        placeholder="Précisez votre besoin ou les travaux souhaités..."
                        value={bookingData.description}
                        onChange={(e) => setBookingData({ ...bookingData, description: e.target.value })}
                        className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg text-[#141413] p-3 text-sm focus:outline-none"
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                        <div>
                          <label className="block text-xs text-[#6E6D6A] mb-1.5">Date souhaitée</label>
                          <input
                            type="date"
                            value={bookingData.dateSouhaitee}
                            onChange={(e) => setBookingData({ ...bookingData, dateSouhaitee: e.target.value })}
                            className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg text-[#141413] px-3.5 py-2.5 text-sm focus:outline-none"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-3 bg-[#FF5A00] hover:bg-[#E04E00] text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
                        >
                          Envoyer la demande
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            )}

            {activeTab === 'message' && (
              <div>
                {sentMessage ? (
                  <div className="py-10 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-[#FF5A00] mx-auto" />
                    <h3 className="font-heading font-bold text-2xl text-[#141413]">
                      Message envoyé
                    </h3>
                    <p className="text-sm text-[#6E6D6A]">
                      L’atelier vous répondra dans les plus brefs délais.
                    </p>
                    <button
                      onClick={() => setSentMessage(false)}
                      className="mt-2 px-4 py-2 bg-[#F2F1ED] hover:bg-[#E6E4DE] text-[#141413] text-sm font-medium rounded-lg cursor-pointer"
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
                        className="bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg text-[#141413] px-3.5 py-2.5 text-sm focus:outline-none"
                      />
                      <input
                        type="tel"
                        placeholder="Téléphone"
                        value={messageForm.phone}
                        onChange={(e) => setMessageForm({ ...messageForm, phone: e.target.value })}
                        className="bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg text-[#141413] px-3.5 py-2.5 text-sm focus:outline-none"
                      />
                    </div>

                    <input
                      type="email"
                      required
                      placeholder="Email *"
                      value={messageForm.email}
                      onChange={(e) => setMessageForm({ ...messageForm, email: e.target.value })}
                      className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg text-[#141413] px-3.5 py-2.5 text-sm focus:outline-none"
                    />

                    <textarea
                      rows={4}
                      required
                      placeholder="Votre question..."
                      value={messageForm.message}
                      onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                      className="w-full bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#FF5A00] rounded-lg text-[#141413] p-3.5 text-sm focus:outline-none"
                    />

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#FF5A00] hover:bg-[#E04E00] text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
                    >
                      Envoyer le message
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
