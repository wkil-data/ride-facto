export function BrandBanner() {
  return (
    <div className="bg-[#111111] border-y border-[#1A1A1A] py-4 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#FF6600]" />
            <span className="font-heading font-black text-xl tracking-wider text-[#F5F5F2] uppercase">
              RIDE <span className="text-[#FF6600]">FACTORY</span>
            </span>
            <span className="text-xs font-mono text-[#A3A3A3] ml-2 hidden sm:inline">
              · MONS ATELIER
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm font-heading font-semibold text-[#A3A3A3] uppercase tracking-wider">
            <span className="text-[#F5F5F2] hover:text-[#FF6600] transition-colors">ENTRETIEN</span>
            <span className="text-[#333333]">/</span>
            <span className="text-[#F5F5F2] hover:text-[#FF6600] transition-colors">RÉPARATION</span>
            <span className="text-[#333333]">/</span>
            <span className="text-[#F5F5F2] hover:text-[#FF6600] transition-colors">PRÉPARATION</span>
            <span className="text-[#333333]">/</span>
            <span className="text-[#F5F5F2] hover:text-[#FF6600] transition-colors">PNEUS</span>
            <span className="text-[#333333]">/</span>
            <span className="text-[#F5F5F2] hover:text-[#FF6600] transition-colors">PIÈCES</span>
          </div>
        </div>
      </div>
    </div>
  );
}
