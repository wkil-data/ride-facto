import { MOTORCYCLE_BRANDS } from '../data/brands';

export function BrandsSection() {
  return (
    <section className="py-20 lg:py-24 bg-[#FAFAF8] border-t border-[#E6E4DE] select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-medium text-[#FF5A00] mb-2">
              Expertise multimarques
            </p>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#141413] tracking-tight">
              Toutes les marques, sans exception.
            </h2>
          </div>
          <p className="text-sm text-[#6E6D6A] max-w-md">
            Spécialistes KTM, Husqvarna, GasGas, Sherco, Beta et constructeurs japonais, nous entretenons et réparons également toutes les autres marques à l’atelier.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          {MOTORCYCLE_BRANDS.map((brand) => (
            <div
              key={brand.name}
              className="py-5 px-3 bg-white border border-[#E6E4DE] rounded-xl flex flex-col items-center justify-center text-center transition-colors hover:border-[#FF5A00]/50"
            >
              <span className="font-heading font-bold text-base text-[#141413] tracking-tight">
                {brand.name}
              </span>
              <span className="text-[11px] text-[#6E6D6A] mt-1">
                {brand.origin}
              </span>
            </div>
          ))}

          <div className="py-5 px-3 bg-[#F2F1ED] border border-dashed border-[#C9C6BE] rounded-xl flex flex-col items-center justify-center text-center">
            <span className="font-heading font-bold text-base text-[#FF5A00] tracking-tight">
              + Toutes autres
            </span>
            <span className="text-[11px] text-[#6E6D6A] mt-1">
              BMW, Ducati, TM, Fantic…
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
