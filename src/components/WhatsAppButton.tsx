import { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  displayPhone?: string;
}

export function WhatsAppButton({
  phoneNumber = '32470556696',
  displayPhone = '0470/55.66.96',
}: WhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

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
      label: 'Montage pneus & bib mousse',
      text: 'Bonjour Ride Factory, j’aimerais réserver un créneau pour le montage de pneus / bib mousse.',
    },
    {
      label: 'Entretien & révision moto',
      text: 'Bonjour, je souhaite prendre rendez-vous pour l’entretien de ma moto à l’atelier.',
    },
    {
      label: 'Préparation tout-terrain',
      text: 'Bonjour, je souhaite échanger avec vous pour une préparation tout-terrain.',
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
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end select-none font-sans" ref={cardRef}>
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2.5rem)] sm:w-80 bg-white border border-[#E6E4DE] rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-[#141413] px-4 py-3 text-white flex items-center justify-between">
            <div>
              <div className="font-heading font-bold text-sm">Ride Factory · WhatsApp</div>
              <div className="text-[11px] text-[#A3A3A3] tabular-nums">{displayPhone}</div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#A3A3A3] hover:text-white p-1 rounded-lg cursor-pointer"
              aria-label="Fermer WhatsApp"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3">
            <p className="text-xs text-[#6E6D6A] leading-relaxed">
              Écrivez directement à l’atelier pour vos pneus, entretiens ou motos à vendre.
            </p>

            <div className="space-y-1.5">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q.text)}
                  className="w-full text-left px-3 py-2 bg-[#FAFAF8] hover:bg-[#F2F1ED] border border-[#E6E4DE] rounded-lg text-xs text-[#141413] transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="truncate pr-2">{q.label}</span>
                  <Send className="w-3 h-3 text-[#25D366] shrink-0" />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
                placeholder="Votre message..."
                className="flex-1 bg-[#FAFAF8] border border-[#E6E4DE] focus:border-[#25D366] rounded-lg text-xs text-[#141413] px-3 py-2 focus:outline-none"
              />
              <button
                onClick={() => handleSend()}
                className="bg-[#25D366] hover:bg-[#20ba59] text-white p-2 rounded-lg transition-colors cursor-pointer shrink-0"
                aria-label="Envoyer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-lg transition-transform duration-150 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
        aria-label="Contacter Ride Factory sur WhatsApp"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <svg viewBox="0 0 32 32" fill="currentColor" className="w-6 h-6" aria-hidden="true">
            <path d="M16.01 2.003c-7.732 0-14 6.268-14 14 0 2.474.646 4.887 1.873 7.013l-1.99 7.266 7.437-1.951c2.052 1.118 4.385 1.708 6.68 1.708 7.732 0 14-6.268 14-14s-6.268-14-14-14zm0 25.592c-2.102 0-4.161-.565-5.961-1.634l-.427-.254-4.434 1.163 1.183-4.321-.278-.443c-1.173-1.867-1.792-4.025-1.792-6.236 0-6.425 5.228-11.653 11.709-11.653 6.48 0 11.709 5.228 11.709 11.653 0 6.425-5.229 11.725-11.709 11.725zm6.417-8.769c-.352-.176-2.083-1.028-2.406-1.145-.324-.118-.559-.176-.795.176-.235.353-.912 1.146-1.117 1.381-.206.235-.412.265-.764.088-.353-.176-1.489-.548-2.836-1.749-1.049-.935-1.758-2.09-1.964-2.443-.206-.353-.022-.544.154-.72.159-.158.353-.412.529-.618.176-.206.235-.353.353-.588.118-.235.059-.441-.029-.617-.088-.176-.795-1.916-1.089-2.623-.287-.689-.578-.596-.795-.607-.206-.011-.441-.013-.676-.013-.235 0-.618.088-.941.441-.324.353-1.235 1.206-1.235 2.941 0 1.735 1.265 3.412 1.441 3.647.176.235 2.489 3.8 6.029 5.329.842.364 1.5.582 2.013.745.846.269 1.616.231 2.224.14.678-.101 2.083-.852 2.377-1.674.294-.823.294-1.528.206-1.674-.088-.147-.324-.235-.676-.412z" />
          </svg>
        )}
      </button>
    </div>
  );
}
