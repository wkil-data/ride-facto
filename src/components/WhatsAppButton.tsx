import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string; // Formatted without + or spaces for wa.me, e.g. "32470556696"
  displayPhone?: string; // Human readable, e.g. "0470/55.66.96"
}

export function WhatsAppButton({
  phoneNumber = '32470556696',
  displayPhone = '0470/55.66.96',
}: WhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [hasPrompted, setHasPrompted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Discreetly show tooltip after 3 seconds to encourage visitor engagement
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
      setHasPrompted(true);
    }, 3500);

    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 12000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Close card when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const quickQuestions = [
    {
      label: '🏍️ Montage Pneus & Bib Mousse',
      text: 'Bonjour Ride Factory, j’aimerais un devis ou réserver un créneau pour le montage de mes pneus / bib mousse.',
    },
    {
      label: '🔧 Révision & Entretien',
      text: 'Bonjour, je souhaite prendre rendez-vous pour l’entretien de ma moto à l’atelier.',
    },
    {
      label: '⚡ Préparation Tout-Terrain',
      text: 'Bonjour, je souhaite échanger avec vous pour une préparation moto tout-terrain / rallye.',
    },
    {
      label: '📍 Disponibilité atelier Mons',
      text: 'Bonjour, je souhaiterais savoir quand je peux passer à l’atelier Petite Rue des Prés 1.',
    },
  ];

  const handleSend = (customText?: string) => {
    const textToSend = customText || message.trim() || 'Bonjour Ride Factory, je souhaite un renseignement pour ma moto.';
    const encoded = encodeURIComponent(textToSend);
    const url = `https://wa.me/${phoneNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none font-sans" ref={cardRef}>
      {/* Floating Mini Chat Popup Card */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-2rem)] sm:w-96 max-w-sm bg-[#0D0D0D] border-2 border-[#25D366]/40 rounded-2xl shadow-2xl shadow-black/90 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Card Header with WhatsApp Green Accent */}
          <div className="bg-gradient-to-r from-[#1EBE5D] to-[#128C7E] px-4 py-3.5 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              {/* Workshop Avatar / RF Icon */}
              <div className="w-10 h-10 rounded-full bg-[#0D0D0D] border border-white/20 p-1 flex items-center justify-center shrink-0 shadow-inner">
                <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                  <path d="M14 49L21 15H36C42.5 15 46.5 18.5 45.5 24C44.8 28 41.5 30.5 37 31.5L46 49H36.5L29 33.5H23.5L20.5 49H14Z" fill="#F5F5F2" />
                  <path d="M37 15L33.5 28L43 28L44.5 23H49L51 15H37Z" fill="#FF6600" />
                </svg>
              </div>

              <div>
                <div className="flex items-center gap-1.5 font-heading font-black tracking-wide text-sm text-white">
                  <span>RIDE FACTORY</span>
                  <span className="text-[10px] font-mono bg-black/30 px-1.5 py-0.5 rounded text-white/90">MONS</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/90 font-mono">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>En ligne · Atelier direct</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-black/20 transition-colors cursor-pointer"
              aria-label="Fermer la fenêtre WhatsApp"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body & Quick Prompts */}
          <div className="p-4 bg-[#0A0A0A] space-y-3.5 max-h-[60vh] overflow-y-auto">
            {/* Introductory Workshop Message */}
            <div className="bg-[#141414] border border-[#222222] rounded-xl p-3 text-xs text-[#E5E5E0] leading-relaxed shadow-sm">
              <p className="font-medium text-[#F5F5F2] mb-1">
                👋 Bonjour ! Besoin d&apos;un renseignement rapide ?
              </p>
              <p className="text-[#A3A3A3]">
                Discutez directement avec l&apos;atelier par WhatsApp pour vos pneus, bib mousse, entretien ou réparations.
              </p>
              <div className="mt-2 pt-2 border-t border-[#222222] flex items-center justify-between text-[11px] font-mono text-[#888888]">
                <span>Tél : {displayPhone}</span>
                <span className="text-[#25D366]">Réponse rapide</span>
              </div>
            </div>

            {/* Quick Questions Chips */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777] block mb-2">
                Questions fréquentes en 1 clic :
              </span>
              <div className="space-y-1.5">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q.text)}
                    className="w-full text-left px-3 py-2 bg-[#121212] hover:bg-[#1A1A1A] border border-[#262626] hover:border-[#25D366]/50 rounded-lg text-xs text-[#D4D4D0] hover:text-white transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span className="truncate pr-2">{q.label}</span>
                    <Send className="w-3.5 h-3.5 text-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Message Input */}
            <div className="pt-1">
              <label htmlFor="wa-custom-msg" className="sr-only">Votre message</label>
              <div className="flex items-center gap-2 bg-[#121212] border border-[#2A2A2A] rounded-xl p-1.5 focus-within:border-[#25D366] transition-colors">
                <input
                  id="wa-custom-msg"
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSend();
                  }}
                  placeholder="Écrivez votre message..."
                  className="w-full bg-transparent text-xs text-white placeholder-[#666666] px-2 py-1 focus:outline-none"
                />
                <button
                  onClick={() => handleSend()}
                  className="bg-[#25D366] hover:bg-[#20ba59] text-[#080808] p-2 rounded-lg font-bold transition-transform hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
                  aria-label="Envoyer le message WhatsApp"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer Direct CTA */}
          <div className="bg-[#0D0D0D] px-4 py-2.5 border-t border-[#1C1C1C] flex items-center justify-between text-[11px] font-mono text-[#888888]">
            <span className="flex items-center gap-1 text-[#25D366]">
              <Sparkles className="w-3 h-3" />
              Chat WhatsApp officiel
            </span>
            <button
              onClick={() => handleSend()}
              className="text-[#F5F5F2] hover:text-[#25D366] underline transition-colors cursor-pointer"
            >
              Ouvrir directement →
            </button>
          </div>
        </div>
      )}

      {/* Floating Prompt Tooltip if closed */}
      {!isOpen && showTooltip && (
        <div className="mb-3 hidden sm:flex items-center gap-2 bg-[#0D0D0D]/95 text-[#F5F5F2] border border-[#25D366]/40 px-3.5 py-2 rounded-xl shadow-xl shadow-black/80 text-xs animate-in fade-in slide-in-from-right-4">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
          <span>Une question sur votre moto ? Écrivez-nous sur <strong>WhatsApp</strong> !</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#888888] hover:text-white ml-1 p-0.5"
            aria-label="Fermer l'infobulle"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* The Floating Round WhatsApp Button */}
      <div className="relative group">
        {/* Pulsing Green Radar Ping */}
        <span
          className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-75 pointer-events-none"
          aria-hidden="true"
        />

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className={`relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#22bf5b] text-white flex items-center justify-center shadow-xl shadow-[#25D366]/30 border-2 border-white/20 transition-all duration-300 transform group-hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 ${
            isOpen ? 'rotate-90 bg-[#1A1A1A] text-[#25D366] border-[#25D366]' : ''
          }`}
          aria-label="Discuter avec l'atelier Ride Factory sur WhatsApp"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="w-7 h-7 text-[#F5F5F2]" />
          ) : (
            <svg
              viewBox="0 0 32 32"
              fill="currentColor"
              className="w-7 h-7"
              aria-hidden="true"
            >
              <path d="M16.01 2.003c-7.732 0-14 6.268-14 14 0 2.474.646 4.887 1.873 7.013l-1.99 7.266 7.437-1.951c2.052 1.118 4.385 1.708 6.68 1.708 7.732 0 14-6.268 14-14s-6.268-14-14-14zm0 25.592c-2.102 0-4.161-.565-5.961-1.634l-.427-.254-4.434 1.163 1.183-4.321-.278-.443c-1.173-1.867-1.792-4.025-1.792-6.236 0-6.425 5.228-11.653 11.709-11.653 6.48 0 11.709 5.228 11.709 11.653 0 6.425-5.229 11.725-11.709 11.725zm6.417-8.769c-.352-.176-2.083-1.028-2.406-1.145-.324-.118-.559-.176-.795.176-.235.353-.912 1.146-1.117 1.381-.206.235-.412.265-.764.088-.353-.176-1.489-.548-2.836-1.749-1.049-.935-1.758-2.09-1.964-2.443-.206-.353-.022-.544.154-.72.159-.158.353-.412.529-.618.176-.206.235-.353.353-.588.118-.235.059-.441-.029-.617-.088-.176-.795-1.916-1.089-2.623-.287-.689-.578-.596-.795-.607-.206-.011-.441-.013-.676-.013-.235 0-.618.088-.941.441-.324.353-1.235 1.206-1.235 2.941 0 1.735 1.265 3.412 1.441 3.647.176.235 2.489 3.8 6.029 5.329.842.364 1.5.582 2.013.745.846.269 1.616.231 2.224.14.678-.101 2.083-.852 2.377-1.674.294-.823.294-1.528.206-1.674-.088-.147-.324-.235-.676-.412z" />
            </svg>
          )}

          {/* Active Online Notification Dot */}
          {!isOpen && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#FF6600] border-2 border-[#080808] rounded-full shadow" />
          )}
        </button>
      </div>
    </div>
  );
}
