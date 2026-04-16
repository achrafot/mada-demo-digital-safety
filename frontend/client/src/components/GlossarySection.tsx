/**
 * GlossarySection — مسرد مصطلحات السلامة الرقمية
 * Design: Qatar Institutional — maroon (#8D1B3D) + navy (#1C2B3A) + cream (#FAF8F5)
 * Features: search, category filter, alphabetical index, expandable cards
 */

import { useState, useMemo, useRef } from 'react';
import { Search, BookOpen, X, ChevronDown, ChevronUp, Link2, Tag } from 'lucide-react';
import { glossaryTerms, categoryConfig, type GlossaryTerm } from '@/lib/glossary';

const ALL = 'all';
type Filter = GlossaryTerm['category'] | typeof ALL;

// Arabic alphabet groups for index
const ALPHA_GROUPS = [
  'أ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش',
  'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي',
];

function getFirstLetter(term: string): string {
  const ch = term.trim()[0];
  // Normalize alef variants
  if ('أإآا'.includes(ch)) return 'أ';
  return ch;
}

function highlight(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return parts.map((p, i) =>
    p.toLowerCase() === query.toLowerCase()
      ? <mark key={i} className="bg-yellow-200 text-yellow-900 rounded px-0.5">{p}</mark>
      : p
  );
}

function TermCard({ term, query, onRelatedClick }: {
  term: GlossaryTerm;
  query: string;
  onRelatedClick: (t: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const cfg = categoryConfig[term.category];

  return (
    <div
      className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
      style={{ borderRight: `4px solid ${cfg.borderColor}` }}
    >
      {/* Header */}
      <div
        role="button"
        tabIndex={0}
        className="w-full text-right p-4 flex items-start gap-3 cursor-pointer hover:bg-gray-50/60 transition-colors"
        onClick={() => setExpanded(!expanded)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(!expanded); } }}
      >
        {/* Category badge */}
        <span
          className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5"
          style={{ backgroundColor: cfg.bg, color: cfg.color }}
        >
          <Tag size={10} />
          {cfg.label}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-black text-gray-900 leading-snug">
              {highlight(term.term, query)}
            </h3>
            {term.termEn && (
              <span className="text-[11px] text-gray-400 font-medium italic ltr-text">{term.termEn}</span>
            )}
            {term.importance === 'high' && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                أساسي
              </span>
            )}
          </div>
          {/* Short preview when collapsed */}
          {!expanded && (
            <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
              {highlight(term.definition, query)}
            </p>
          )}
        </div>

        <div className="flex-shrink-0 text-gray-400 mt-0.5">
          {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-3">
          {/* Definition */}
          <p className="text-sm text-gray-700 leading-relaxed">
            {highlight(term.definition, query)}
          </p>

          {/* Example */}
          {term.example && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
              <p className="text-xs text-blue-800 leading-relaxed">
                <span className="font-bold">مثال: </span>
                {highlight(term.example, query)}
              </p>
            </div>
          )}

          {/* Source */}
          {term.source && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <BookOpen size={12} className="flex-shrink-0" style={{ color: cfg.color }} />
              <span className="font-medium">المصدر:</span>
              <span>{term.source}</span>
            </div>
          )}

          {/* Related terms */}
          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <div className="flex items-start gap-2 flex-wrap">
              <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0 mt-0.5">
                <Link2 size={12} style={{ color: cfg.color }} />
                <span className="font-medium">مصطلحات ذات صلة:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {term.relatedTerms.map(rt => (
                  <button
                    key={rt}
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onRelatedClick(rt); }}
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-full border transition-colors hover:opacity-80"
                    style={{ borderColor: cfg.borderColor + '60', color: cfg.color, backgroundColor: cfg.bg }}
                  >
                    {rt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function GlossarySection() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<Filter>(ALL);
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Filtered + searched terms
  const filtered = useMemo(() => {
    let terms = glossaryTerms;
    if (activeFilter !== ALL) terms = terms.filter(t => t.category === activeFilter);
    if (activeLetter) terms = terms.filter(t => getFirstLetter(t.term) === activeLetter);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      terms = terms.filter(t =>
        t.term.toLowerCase().includes(q) ||
        (t.termEn?.toLowerCase().includes(q)) ||
        t.definition.toLowerCase().includes(q) ||
        (t.example?.toLowerCase().includes(q)) ||
        (t.relatedTerms?.some(r => r.toLowerCase().includes(q)))
      );
    }
    // Sort alphabetically
    return [...terms].sort((a, b) => a.term.localeCompare(b.term, 'ar'));
  }, [query, activeFilter, activeLetter]);

  // Available letters in current filter
  const availableLetters = useMemo(() => {
    let terms = glossaryTerms;
    if (activeFilter !== ALL) terms = terms.filter(t => t.category === activeFilter);
    return new Set(terms.map(t => getFirstLetter(t.term)));
  }, [activeFilter]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: glossaryTerms.length };
    glossaryTerms.forEach(t => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return counts;
  }, []);

  const handleRelatedClick = (relatedTerm: string) => {
    setQuery(relatedTerm);
    setActiveFilter(ALL);
    setActiveLetter(null);
    searchRef.current?.focus();
  };

  const clearSearch = () => {
    setQuery('');
    setActiveLetter(null);
    searchRef.current?.focus();
  };

  return (
    <div className="px-6 py-10 lg:px-12" dir="rtl" style={{ background: 'linear-gradient(135deg, #FAF8F5 0%, #F5F0E8 100%)' }}>
      <div className="max-w-5xl">

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen size={22} style={{ color: '#8D1B3D' }} />
            <h2 className="text-2xl font-black text-gray-900">مسرد مصطلحات السلامة الرقمية</h2>
          </div>
          <div className="section-divider mb-4 w-16" />
          <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
            دليل مرجعي شامل يضم تعريفات دقيقة لأبرز المصطلحات المتعلقة بالسلامة الرقمية للأطفال، مُصنَّفة حسب المجال مع أمثلة تطبيقية ومراجع قانونية ومؤسسية.
          </p>
        </div>

        {/* ── Stats Bar ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8">
          {(Object.keys(categoryConfig) as GlossaryTerm['category'][]).map(cat => {
            const cfg = categoryConfig[cat];
            return (
              <div
                key={cat}
                className="rounded-xl p-3 text-center border"
                style={{ backgroundColor: cfg.bg, borderColor: cfg.borderColor + '40' }}
              >
                <div className="text-xl font-black" style={{ color: cfg.color }}>
                  {categoryCounts[cat] || 0}
                </div>
                <div className="text-xs font-semibold mt-0.5" style={{ color: cfg.color }}>
                  {cfg.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Search ─────────────────────────────────────────────────────────── */}
        <div className="relative mb-6">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            ref={searchRef}
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setActiveLetter(null); }}
            placeholder="ابحث في المصطلحات والتعريفات..."
            className="w-full pr-9 pl-9 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 shadow-sm transition-all"
            style={{ '--tw-ring-color': '#8D1B3D40' } as React.CSSProperties}
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* ── Category Filter ─────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-5">
          <button
            type="button"
            onClick={() => { setActiveFilter(ALL); setActiveLetter(null); }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
              activeFilter === ALL ? 'text-white shadow-sm' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
            style={activeFilter === ALL ? { backgroundColor: '#8D1B3D' } : {}}
          >
            الكل ({categoryCounts.all})
          </button>
          {(Object.keys(categoryConfig) as GlossaryTerm['category'][]).map(cat => {
            const cfg = categoryConfig[cat];
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => { setActiveFilter(cat); setActiveLetter(null); }}
                className="px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border"
                style={isActive
                  ? { backgroundColor: cfg.color, color: 'white', borderColor: cfg.color }
                  : { backgroundColor: cfg.bg, color: cfg.color, borderColor: cfg.borderColor + '50' }
                }
              >
                {cfg.label} ({categoryCounts[cat] || 0})
              </button>
            );
          })}
        </div>

        {/* ── Alphabetical Index ──────────────────────────────────────────────── */}
        {!query && (
          <div className="flex flex-wrap gap-1 mb-6 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveLetter(null)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                activeLetter === null ? 'text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100'
              }`}
              style={activeLetter === null ? { backgroundColor: '#8D1B3D' } : {}}
            >
              الكل
            </button>
            {ALPHA_GROUPS.filter(l => availableLetters.has(l)).map(letter => (
              <button
                key={letter}
                type="button"
                onClick={() => setActiveLetter(activeLetter === letter ? null : letter)}
                className="w-8 h-8 rounded-lg text-sm font-bold transition-all"
                style={activeLetter === letter
                  ? { backgroundColor: '#1C2B3A', color: 'white' }
                  : { color: '#1C2B3A', backgroundColor: '#F5F0E8' }
                }
              >
                {letter}
              </button>
            ))}
          </div>
        )}

        {/* ── Results count ──────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-gray-500">
            {filtered.length === 0
              ? 'لا توجد نتائج مطابقة'
              : `${filtered.length} مصطلح${filtered.length === 1 ? '' : ''}`
            }
            {query && <span className="font-semibold text-gray-700"> لـ "{query}"</span>}
          </p>
          {(query || activeLetter || activeFilter !== ALL) && (
            <button
              type="button"
              onClick={() => { setQuery(''); setActiveLetter(null); setActiveFilter(ALL); }}
              className="text-xs font-semibold flex items-center gap-1 transition-colors hover:opacity-80"
              style={{ color: '#8D1B3D' }}
            >
              <X size={12} />
              مسح الفلاتر
            </button>
          )}
        </div>

        {/* ── Terms Grid ─────────────────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <BookOpen size={40} className="mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500 font-medium">لا توجد مصطلحات مطابقة لبحثك</p>
            <p className="text-xs text-gray-400 mt-1">جرّب كلمات مختلفة أو امسح الفلاتر</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map(term => (
              <TermCard
                key={term.id}
                term={term}
                query={query}
                onRelatedClick={handleRelatedClick}
              />
            ))}
          </div>
        )}

        {/* ── Footer note ────────────────────────────────────────────────────── */}
        <div className="mt-8 p-4 bg-white rounded-xl border border-amber-100 shadow-sm">
          <p className="text-xs text-gray-600 leading-relaxed">
            <span className="font-bold text-amber-700">💡 ملاحظة: </span>
            التعريفات الواردة في هذا المسرد مستمدة من المصادر الرسمية القطرية والمراجع الأكاديمية المحكّمة والأطر الدولية لحماية الأطفال في الفضاء الرقمي. للاطلاع على التعريفات القانونية الرسمية يُرجى مراجعة النصوص التشريعية المذكورة في قسم التشريعات والقوانين.
          </p>
        </div>
      </div>
    </div>
  );
}
