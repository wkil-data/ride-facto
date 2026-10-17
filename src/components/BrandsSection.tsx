import { MOTORCYCLE_BRANDS } from '../data/brands';

export function BrandsSection() {
  return (
    <section className="py-20 bg-[#080808] border-b border-[#1A1A1A] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#FF6600] uppercase tracking-widest mb-3">
            <span className="w-2 h-0.5 bg-[#FF6600]" />
            <span>EXPERTISE TECHNIQUE MULTIMARQUES</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#F5F5F2] uppercase tracking-tight">
            LES MARQUES QUE NOUS CONNAISSONS.
          </h2>

          <p className="text-xs sm:text-sm text-[#A3A3A3] mt-2">
            Moteurs 2-temps à injection TPI/TBI, monocylindres 4-temps poussés ou bicylindres d'aventure : nous maîtrisons les spécificités de chaque constructeur.
          </p>
        </div>

        {/* Clean Typographic Motorsport Grid (strictly typography, no copyrighted icons) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-px bg-[#1A1A1A] border border-[#1A1A1A]">
          {MOTORCYCLE_BRANDS.map((brand) => (
            <div
              key={brand.name}
              className="bg-[#0c0c0c] hover:bg-[#141414] p-5 sm:p-6 flex flex-col justify-between items-center text-center transition-colors group cursor-default"
            >
              <div className="text-[10px] font-mono text-[#737373] tracking-widest uppercase mb-4">
                {brand.origin}
              </div>

              <div className="font-heading font-black text-2xl sm:text-3xl text-[#F5F5F2] group-hover:text-[#FF6600] transition-colors tracking-wider uppercase">
                {brand.name}
              </div>

              <div className="text-[10px] font-mono text-[#737373] group-hover:text-[#A3A3A3] transition-colors mt-3">
                {brand.specialty}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
