import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Clock, Search, Shield, Tag, ChevronRight, Wrench, Share2, Check } from 'lucide-react';
import { BLOG_ARTICLES, BlogArticle } from '../data/blogArticles';

interface BlogViewProps {
  onOpenBooking: (serviceName?: string) => void;
  onNavigateHome: () => void;
  onNavigate?: (view: string, sectionId?: string) => void;
  initialArticleSlug?: string;
}

export function BlogView({ onOpenBooking, onNavigateHome, onNavigate, initialArticleSlug }: BlogViewProps) {
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(
    initialArticleSlug || null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('TOUS');
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = ['TOUS', 'Enduro', 'Pneumatiques', 'Trail & Adventure', 'Motocross', 'Mécanique & Atelier'];

  const pageNavLinks = [
    { label: 'ACCUEIL', view: 'home' },
    { label: 'L\'ATELIER', view: 'home', sectionId: 'atelier' },
    { label: 'SERVICES', view: 'services' },
    { label: 'PNEUS & BIBS', view: 'pneus' },
    { label: 'MOTOS À VENDRE', view: 'motos' },
    { label: 'CONTACT', view: 'contact' },
  ];

  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter((art) => {
      const matchesCat = selectedCategory === 'TOUS' || art.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesQuery =
        art.title.toLowerCase().includes(q) ||
        art.summary.toLowerCase().includes(q) ||
        art.keywords.some((k) => k.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const currentArticle = useMemo(() => {
    if (!selectedArticleSlug) return null;
    return BLOG_ARTICLES.find((a) => a.slug === selectedArticleSlug) || null;
  }, [selectedArticleSlug]);

  const handleSelectArticle = (slug: string) => {
    setSelectedArticleSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedArticleSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="pt-28 pb-24 bg-[#080808] min-h-screen text-[#F5F5F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-[#1A1A1A]">
          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#111111] hover:bg-[#1A1A1A] text-[#F5F5F2] hover:text-[#FF6600] border border-[#222222] text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#FF6600]" />
              <span>← RETOUR À L'ACCUEIL</span>
            </button>

            {currentArticle && (
              <button
                onClick={handleBackToList}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#141414] hover:bg-[#1c1c1c] text-[#A3A3A3] hover:text-[#F5F5F2] border border-[#262626] text-xs font-mono transition-colors cursor-pointer"
              >
                <span>← TOUS LES ARTICLES</span>
              </button>
            )}
          </div>

          <div className="text-xs font-mono text-[#A3A3A3]">
            <span className="text-[#FF6600]">RIDE FACTORY MONS</span>
            <span className="mx-2">·</span>
            <span>BLOG & GUIDES TECHNIQUES OFF-ROAD</span>
          </div>
        </div>

        {/* Quick Page Navigation Menu at the Top */}
        {onNavigate && (
          <div className="bg-[#111111] border border-[#1A1A1A] p-2.5 mb-8 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-mono text-[#737373] uppercase px-2 hidden lg:inline">ACCÈS DIRECT AUX AUTRES PAGES DU SITE :</span>
            <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
              {pageNavLinks.map((link) => (
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

        {/* VIEW 1: FULL SINGLE ARTICLE VIEW */}
        {currentArticle ? (
          <article className="max-w-4xl mx-auto">
            {/* Article Header */}
            <div className="mb-10 pb-8 border-b border-[#1A1A1A]">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#A3A3A3] mb-4">
                <span className="text-[#080808] bg-[#FF6600] px-2.5 py-0.5 font-bold uppercase">
                  {currentArticle.category}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#FF6600]" />
                  {currentArticle.publishedDate}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#FF6600]" />
                  {currentArticle.readTime}
                </span>
                <span>·</span>
                <span className="text-[#F5F5F2] font-semibold">{currentArticle.author}</span>
              </div>

              <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[#F5F5F2] uppercase leading-[0.98] tracking-tight mb-6">
                {currentArticle.title}
              </h1>

              <p className="text-base sm:text-lg text-[#A3A3A3] leading-relaxed font-normal bg-[#111111] border-l-4 border-[#FF6600] p-4 sm:p-6 mb-6">
                {currentArticle.summary}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#1A1A1A]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono text-[#737373]">MOTS-CLÉS ATELIER :</span>
                  {currentArticle.keywords.slice(0, 4).map((kw, idx) => (
                    <span key={idx} className="text-[11px] font-mono text-[#A3A3A3] bg-[#141414] px-2 py-0.5 border border-[#222222]">
                      #{kw}
                    </span>
                  ))}
                </div>

                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A3A3A3] hover:text-[#FF6600] transition-colors"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Lien copié !' : 'Partager l\'article'}</span>
                </button>
              </div>
            </div>

            {/* Article Prose Content */}
            <div className="prose prose-invert max-w-none text-[#D4D4D4] leading-relaxed space-y-6 text-sm sm:text-base">
              {currentArticle.content.split('\n\n').map((block, index) => {
                const trimmed = block.trim();
                if (!trimmed) return null;

                // H2 Heading
                if (trimmed.startsWith('## ')) {
                  return (
                    <h2
                      key={index}
                      className="font-heading font-black text-2xl sm:text-3xl text-[#F5F5F2] uppercase tracking-wide mt-10 mb-4 pt-6 border-t border-[#1A1A1A] flex items-center gap-2"
                    >
                      <span className="w-2.5 h-2.5 bg-[#FF6600] shrink-0" />
                      <span>{trimmed.replace('## ', '')}</span>
                    </h2>
                  );
                }

                // H3 Heading
                if (trimmed.startsWith('### ')) {
                  return (
                    <h3
                      key={index}
                      className="font-heading font-bold text-xl sm:text-2xl text-[#FF6600] uppercase tracking-wide mt-6 mb-2"
                    >
                      {trimmed.replace('### ', '')}
                    </h3>
                  );
                }

                // Horizontal separator
                if (trimmed === '---') {
                  return <hr key={index} className="border-[#1A1A1A] my-8" />;
                }

                // Unordered list items
                if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                  const items = trimmed.split('\n').filter((l) => l.trim().length > 0);
                  return (
                    <ul key={index} className="space-y-2 my-4 pl-2 font-normal">
                      {items.map((it, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 bg-[#FF6600] mt-2 shrink-0" />
                          <span>{it.replace(/^[-*]\s+/, '')}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }

                // Markdown table approximation
                if (trimmed.includes('|') && trimmed.includes('\n')) {
                  const lines = trimmed.split('\n').filter((l) => !l.includes('---'));
                  return (
                    <div key={index} className="overflow-x-auto my-6 border border-[#222222] bg-[#111111]">
                      <table className="w-full text-left text-xs font-mono">
                        <tbody>
                          {lines.map((line, rIdx) => {
                            const cells = line.split('|').filter((c) => c.trim().length > 0);
                            return (
                              <tr key={rIdx} className={rIdx === 0 ? 'bg-[#1a1a1a] font-bold text-[#F5F5F2]' : 'border-t border-[#1a1a1a] text-[#A3A3A3]'}>
                                {cells.map((cell, cIdx) => (
                                  <td key={cIdx} className="p-3">
                                    {cell.trim()}
                                  </td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                }

                // Standard Paragraph
                return (
                  <p key={index} className="leading-relaxed">
                    {trimmed}
                  </p>
                );
              })}
            </div>

            {/* Author and Workshop Callout Box */}
            <div className="mt-14 bg-[#111111] border border-[#222222] p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1A1A1A]">
                <div>
                  <span className="text-[11px] font-mono text-[#FF6600] uppercase tracking-widest block">
                    ATELIER RIDE FACTORY · MONS
                  </span>
                  <div className="font-heading font-black text-2xl text-[#F5F5F2] uppercase">
                    RIDE FACTORY · ATELIER MOTO TOUT-TERRAIN
                  </div>
                  <div className="text-xs font-mono text-[#A3A3A3] mt-0.5">
                    Petite Rue des Prés 1, 7000 Mons, Belgique
                  </div>
                </div>

                <button
                  onClick={() => onOpenBooking(currentArticle.category)}
                  className="px-6 py-3 bg-[#FF6600] hover:bg-[#E65C00] text-[#080808] font-heading font-black text-xs uppercase tracking-wider transition-colors cursor-pointer shrink-0"
                >
                  PRENDRE RENDEZ-VOUS EN ATELIER
                </button>
              </div>

              <p className="text-xs text-[#A3A3A3] leading-relaxed">
                Vous avez besoin d'une intervention sur votre machine (vidange, réfection moteur, revalving suspension ou montage de bib mousse) ? Notre atelier de Mons est ouvert du lundi au samedi de 09:00 à 18:00.
              </p>

              {/* Full SEO Keywords cloud for search engine relevance */}
              <div className="pt-2">
                <span className="text-[10px] font-mono text-[#737373] uppercase block mb-1.5">
                  INDEXATION SEO LOCALE & THÉMATIQUE :
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentArticle.keywords.map((kw, i) => (
                    <span key={i} className="text-[10px] font-mono text-[#737373] bg-[#0c0c0c] px-2 py-0.5 border border-[#1a1a1a]">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Other Suggested Articles */}
            <div className="mt-14 pt-8 border-t border-[#1A1A1A]">
              <h3 className="font-heading font-black text-2xl text-[#F5F5F2] uppercase mb-6">
                AUTRES ARTICLES & GUIDES TECHNIQUES DE L'ATELIER
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BLOG_ARTICLES.filter((a) => a.id !== currentArticle.id)
                  .slice(0, 2)
                  .map((other) => (
                    <button
                      key={other.id}
                      onClick={() => handleSelectArticle(other.slug)}
                      className="bg-[#111111] hover:bg-[#161616] border border-[#1A1A1A] hover:border-[#333333] p-5 text-left transition-colors flex flex-col justify-between group cursor-pointer"
                    >
                      <div>
                        <span className="text-[11px] font-mono text-[#FF6600] block mb-1">
                          {other.category} · {other.readTime}
                        </span>
                        <h4 className="font-heading font-bold text-lg text-[#F5F5F2] group-hover:text-[#FF6600] transition-colors uppercase leading-snug">
                          {other.title}
                        </h4>
                      </div>
                      <div className="mt-4 flex items-center gap-1 text-xs font-mono text-[#A3A3A3]">
                        <span>Lire l'article</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#FF6600]" />
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </article>
        ) : (
          /* VIEW 2: ARTICLES DIRECTORY LIST */
          <div>
            {/* Header Directory */}
            <div className="pb-10 border-b border-[#1A1A1A] mb-10">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF6600] uppercase tracking-widest mb-2">
                <span className="w-2 h-0.5 bg-[#FF6600]" />
                <span>EXPERTISE TECHNIQUE & CONSEILS MOTO</span>
              </div>
              <h1 className="font-heading font-black text-5xl sm:text-7xl text-[#F5F5F2] uppercase tracking-tight">
                LE BLOG ATELIER
              </h1>
              <p className="text-sm sm:text-base text-[#A3A3A3] mt-2 max-w-2xl leading-relaxed">
                Guides d'entretien, protocoles de révision, comparatifs pneumatiques et conseils de préparation pour l'enduro, le trail, le motocross et l'aventure en Belgique. Rédigé par nos mécaniciens à Mons.
              </p>
            </div>

            {/* Filter Bar & Search */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
              {/* Category tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-2 text-xs font-heading font-bold uppercase tracking-wider whitespace-nowrap border cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#FF6600] text-[#080808] border-[#FF6600]'
                          : 'bg-[#111111] text-[#A3A3A3] border-[#1A1A1A] hover:text-[#F5F5F2]'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Search input */}
              <div className="relative min-w-[280px]">
                <Search className="w-4 h-4 text-[#A3A3A3] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher un guide, pneu, vidange..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#111111] border border-[#222222] focus:border-[#FF6600] pl-9 pr-3 py-2 text-xs font-mono text-[#F5F5F2] focus:outline-none"
                />
              </div>
            </div>

            {/* Articles List */}
            <div className="space-y-6">
              {filteredArticles.length === 0 ? (
                <div className="text-center py-16 bg-[#111111] border border-[#1A1A1A] p-8">
                  <BookOpen className="w-10 h-10 text-[#A3A3A3] mx-auto mb-3" />
                  <p className="text-sm font-mono text-[#A3A3A3]">
                    Aucun article ne correspond à votre recherche.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('TOUS');
                    }}
                    className="mt-4 px-4 py-2 bg-[#FF6600] text-[#080808] font-heading font-bold text-xs uppercase"
                  >
                    RÉINITIALISER LES FILTRES
                  </button>
                </div>
              ) : (
                filteredArticles.map((art) => (
                  <article
                    key={art.id}
                    className="bg-[#111111] border border-[#1A1A1A] hover:border-[#333333] p-6 sm:p-8 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      {/* Meta bar */}
                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#A3A3A3] mb-3">
                        <span className="text-[#080808] bg-[#FF6600] px-2 py-0.5 font-bold uppercase text-[11px]">
                          {art.category}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#FF6600]" />
                          {art.publishedDate}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#FF6600]" />
                          {art.readTime}
                        </span>
                        <span>·</span>
                        <span className="hidden sm:inline text-[#737373]">{art.author}</span>
                      </div>

                      {/* Title */}
                      <h2
                        onClick={() => handleSelectArticle(art.slug)}
                        className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#F5F5F2] uppercase group-hover:text-[#FF6600] transition-colors cursor-pointer mb-3 leading-tight"
                      >
                        {art.title}
                      </h2>

                      {/* Summary */}
                      <p className="text-sm text-[#A3A3A3] leading-relaxed mb-6 font-normal">
                        {art.summary}
                      </p>

                      {/* Keywords chips */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-6">
                        {art.keywords.slice(0, 5).map((kw, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-mono text-[#737373] bg-[#0a0a0a] px-2 py-0.5 border border-[#1a1a1a]"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-4 border-t border-[#1A1A1A] flex flex-wrap items-center justify-between gap-4">
                      <button
                        onClick={() => handleSelectArticle(art.slug)}
                        className="inline-flex items-center gap-2 text-xs font-heading font-black text-[#FF6600] uppercase tracking-wider group-hover:translate-x-1 transition-transform cursor-pointer"
                      >
                        <span>LIRE L'ARTICLE COMPLET (900+ MOTS)</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </button>

                      <button
                        onClick={() => onOpenBooking(art.category)}
                        className="text-xs font-mono text-[#A3A3A3] hover:text-[#F5F5F2] transition-colors"
                      >
                        Prendre rendez-vous en atelier →
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
