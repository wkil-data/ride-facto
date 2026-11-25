import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Search, Share2, Check } from 'lucide-react';
import { BLOG_ARTICLES } from '../data/blogArticles';

interface BlogViewProps {
  onOpenBooking: (serviceName?: string) => void;
  onNavigateHome: () => void;
  initialArticleSlug?: string;
}

export function BlogView({ onOpenBooking, onNavigateHome, initialArticleSlug }: BlogViewProps) {
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(
    initialArticleSlug || null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('TOUS');
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = ['TOUS', 'Enduro', 'Pneumatiques', 'Trail & Adventure', 'Motocross', 'Mécanique & Atelier'];

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
    <div className="pt-28 pb-24 bg-[#FAFAF8] min-h-screen text-[#141413]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-4 mb-10">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6E6D6A] hover:text-[#141413] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l’accueil</span>
          </button>

          {currentArticle && (
            <>
              <span className="text-[#D4D1C9]">/</span>
              <button
                onClick={handleBackToList}
                className="text-sm font-medium text-[#6E6D6A] hover:text-[#141413] transition-colors cursor-pointer"
              >
                Tous les guides
              </button>
            </>
          )}
        </div>

        {currentArticle ? (
          <article className="max-w-3xl mx-auto">
            <header className="mb-10 pb-8 border-b border-[#E6E4DE]">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#6E6D6A] mb-4">
                <span className="font-medium text-[#FF5A00]">{currentArticle.category}</span>
                <span>·</span>
                <span>{currentArticle.publishedDate}</span>
                <span>·</span>
                <span>{currentArticle.readTime}</span>
              </div>

              <h1
                className="font-heading font-extrabold text-[#141413] tracking-tight leading-[1.1] mb-6"
                style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)', textWrap: 'balance' }}
              >
                {currentArticle.title}
              </h1>

              <p className="text-base sm:text-lg text-[#6E6D6A] leading-relaxed mb-6">
                {currentArticle.summary}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#6E6D6A]">
                <span>Par {currentArticle.author}</span>
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#141413] hover:text-[#FF5A00] transition-colors cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Lien copié' : 'Partager'}</span>
                </button>
              </div>
            </header>

            <div className="space-y-6 text-base text-[#141413]/85 leading-[1.7]">
              {currentArticle.content.split('\n\n').map((block, index) => {
                const trimmed = block.trim();
                if (!trimmed) return null;

                if (trimmed.startsWith('## ')) {
                  return (
                    <h2
                      key={index}
                      className="font-heading font-bold text-2xl text-[#141413] mt-12 mb-4 pt-6 border-t border-[#E6E4DE]"
                    >
                      {trimmed.replace('## ', '')}
                    </h2>
                  );
                }

                if (trimmed.startsWith('### ')) {
                  return (
                    <h3
                      key={index}
                      className="font-heading font-semibold text-xl text-[#FF5A00] mt-8 mb-2"
                    >
                      {trimmed.replace('### ', '')}
                    </h3>
                  );
                }

                if (trimmed === '---') {
                  return <hr key={index} className="border-[#E6E4DE] my-8" />;
                }

                if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                  const items = trimmed.split('\n').filter((l) => l.trim().length > 0);
                  return (
                    <ul key={index} className="space-y-2.5 my-4">
                      {items.map((it, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="text-[#FF5A00] select-none">—</span>
                          <span>{it.replace(/^[-*]\s+/, '')}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }

                if (trimmed.includes('|') && trimmed.includes('\n')) {
                  const lines = trimmed.split('\n').filter((l) => !l.includes('---'));
                  return (
                    <div key={index} className="overflow-x-auto my-6 border border-[#E6E4DE] rounded-xl bg-white">
                      <table className="w-full text-left text-xs font-mono">
                        <tbody>
                          {lines.map((line, rIdx) => {
                            const cells = line.split('|').filter((c) => c.trim().length > 0);
                            return (
                              <tr key={rIdx} className={rIdx === 0 ? 'bg-[#F2F1ED] font-semibold text-[#141413]' : 'border-t border-[#E6E4DE] text-[#6E6D6A]'}>
                                {cells.map((cell, cIdx) => (
                                  <td key={cIdx} className="p-3.5">
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

                return (
                  <p key={index}>
                    {trimmed}
                  </p>
                );
              })}
            </div>

            <div className="mt-14 bg-white border border-[#E6E4DE] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h3 className="font-heading font-bold text-lg text-[#141413]">
                  Besoin d’une intervention sur votre machine ?
                </h3>
                <p className="text-sm text-[#6E6D6A] mt-1">
                  Petite Rue des Prés 1, 7000 Mons · Lun – Sam, 09:00 – 18:00
                </p>
              </div>
              <button
                onClick={() => onOpenBooking(currentArticle.category)}
                className="px-5 py-2.5 bg-[#FF5A00] hover:bg-[#E04E00] text-white text-sm font-medium rounded-lg transition-colors cursor-pointer shrink-0"
              >
                Prendre rendez-vous
              </button>
            </div>

            <div className="mt-14 pt-8 border-t border-[#E6E4DE]">
              <h3 className="font-heading font-bold text-lg text-[#141413] mb-6">
                À lire également
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {BLOG_ARTICLES.filter((a) => a.id !== currentArticle.id)
                  .slice(0, 2)
                  .map((other) => (
                    <button
                      key={other.id}
                      onClick={() => handleSelectArticle(other.slug)}
                      className="bg-white border border-[#E6E4DE] hover:border-[#C9C6BE] rounded-2xl p-6 text-left transition-colors flex flex-col justify-between group cursor-pointer"
                    >
                      <div>
                        <span className="text-xs text-[#FF5A00] font-medium block mb-2">
                          {other.category} · {other.readTime}
                        </span>
                        <h4 className="font-heading font-bold text-base text-[#141413] group-hover:text-[#FF5A00] transition-colors leading-snug">
                          {other.title}
                        </h4>
                      </div>
                      <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[#6E6D6A]">
                        <span>Lire le guide</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </article>
        ) : (
          <div>
            <div className="max-w-2xl mb-12">
              <p className="text-sm font-medium text-[#FF5A00] mb-3">
                Guides techniques
              </p>
              <h1
                className="font-heading font-extrabold text-[#141413] tracking-tight leading-[1.08] mb-4"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', textWrap: 'balance' }}
              >
                Le carnet d’atelier.
              </h1>
              <p className="text-base text-[#6E6D6A] leading-relaxed">
                Conseils d’entretien, montage bib mousse et préparation tout-terrain rédigés par nos mécaniciens à Mons.
              </p>
            </div>

            {/* Clean Filters & Search */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 mb-8 border-b border-[#E6E4DE]">
              <div className="inline-flex flex-wrap gap-1.5 p-1 bg-[#F2F1ED] rounded-xl">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      selectedCategory === cat
                        ? 'bg-white text-[#141413] shadow-xs'
                        : 'text-[#6E6D6A] hover:text-[#141413]'
                    }`}
                  >
                    {cat === 'TOUS' ? 'Tous' : cat}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[260px]">
                <Search className="w-4 h-4 text-[#6E6D6A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher un guide..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-[#E6E4DE] focus:border-[#FF5A00] rounded-xl pl-10 pr-4 py-2 text-sm text-[#141413] focus:outline-none"
                />
              </div>
            </div>

            <div className="divide-y divide-[#E6E4DE]">
              {filteredArticles.length === 0 ? (
                <div className="text-center py-16">
                  <BookOpen className="w-8 h-8 text-[#6E6D6A] mx-auto mb-3" />
                  <p className="text-sm text-[#6E6D6A] mb-4">
                    Aucun guide ne correspond à votre recherche.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('TOUS');
                    }}
                    className="px-4 py-2 bg-[#F2F1ED] text-[#141413] text-xs font-medium rounded-lg cursor-pointer"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              ) : (
                filteredArticles.map((art) => (
                  <article key={art.id} className="py-8 first:pt-2 group">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#6E6D6A] mb-2">
                      <span className="font-medium text-[#FF5A00]">{art.category}</span>
                      <span>·</span>
                      <span>{art.publishedDate}</span>
                      <span>·</span>
                      <span>{art.readTime}</span>
                    </div>

                    <h2
                      onClick={() => handleSelectArticle(art.slug)}
                      className="font-heading font-bold text-xl sm:text-2xl text-[#141413] group-hover:text-[#FF5A00] transition-colors cursor-pointer mb-2.5"
                    >
                      {art.title}
                    </h2>

                    <p className="text-sm text-[#6E6D6A] leading-relaxed max-w-3xl mb-4">
                      {art.summary}
                    </p>

                    <div className="flex items-center gap-6 text-xs font-medium">
                      <button
                        onClick={() => handleSelectArticle(art.slug)}
                        className="inline-flex items-center gap-1.5 text-[#141413] hover:text-[#FF5A00] transition-colors cursor-pointer"
                      >
                        <span>Lire l’article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onOpenBooking(art.category)}
                        className="text-[#6E6D6A] hover:text-[#141413] transition-colors cursor-pointer"
                      >
                        Prendre rendez-vous
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
