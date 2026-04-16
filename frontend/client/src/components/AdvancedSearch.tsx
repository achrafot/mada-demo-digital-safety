/**
 * AdvancedSearch Component
 * Design: Modern Arabic Institutional (Qatar maroon + gold)
 * Features:
 *  - Full-text search across law titles, summaries, article texts, tags
 *  - Filter by type, year range, importance
 *  - Article number filter (direct lookup by article number e.g. "المادة 7" or just "7")
 *  - Highlighted match snippets
 *  - Keyboard shortcut (Ctrl+K / Cmd+K) to open
 *  - Animated results panel
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { laws, institutions, initiatives } from '@/lib/data';
import {
  Search, X, Scale, Building2, Lightbulb, FileText,
  Star, Filter, BookOpen, Hash, ListOrdered, ChevronRight
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SearchResult {
  id: string;
  category: 'law' | 'institution' | 'initiative';
  categoryLabel: string;
  title: string;
  subtitle: string;
  matchedIn: string;
  snippet: string;
  highlightedSnippet: string;
  articleNumber?: string;    // set when matched via article-number filter
  articleText?: string;      // full article text for article-mode display
  type?: string;
  year?: number;
  importance?: string;
  color: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlight(text: string, query: string): string {
  if (!query.trim()) return text;
  const terms = query.trim().split(/\s+/).map(escapeRegex);
  const regex = new RegExp(`(${terms.join('|')})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 text-yellow-900 rounded px-0.5">$1</mark>');
}

function excerpt(text: string, query: string, radius = 90): string {
  if (!query.trim()) return text.slice(0, 160) + (text.length > 160 ? '…' : '');
  const terms = query.trim().split(/\s+/).map(escapeRegex);
  const regex = new RegExp(terms.join('|'), 'i');
  const idx = text.search(regex);
  if (idx === -1) return text.slice(0, 160) + (text.length > 160 ? '…' : '');
  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + radius);
  return (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
}

/** Normalise an article number string for comparison.
 *  Accepts: "7", "١٧", "المادة 7", "المادة السابعة", "مادة 7", "17"
 *  Returns the numeric part as a string, or the full normalised string. */
function normaliseArticleInput(raw: string): string {
  // Arabic-Indic digits → Western
  const westernised = raw.replace(/[٠-٩]/g, d => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
  // Strip common prefixes
  const stripped = westernised
    .replace(/^(المادة|مادة|م\.?)\s*/i, '')
    .trim();
  return stripped;
}

/** Check whether an article's number field matches the user's article-number query. */
function articleMatches(articleNumber: string, needle: string): boolean {
  const normNeedle = normaliseArticleInput(needle).toLowerCase();
  const normArticle = normaliseArticleInput(articleNumber).toLowerCase();
  // Exact match or "contains" for partial inputs like "17" matching "17-21"
  return normArticle.includes(normNeedle) || normNeedle.includes(normArticle);
}

const typeColors: Record<string, string> = {
  constitution: '#8D1B3D',
  national: '#1C2B3A',
  strategy: '#C9A84C',
  international: '#2E7D32',
  decree: '#7B1FA2',
};

const typeLabels: Record<string, string> = {
  constitution: 'دستور',
  national: 'قانون وطني',
  strategy: 'استراتيجية',
  international: 'اتفاقية دولية',
  decree: 'قرار وزاري',
};

// ─── Search Engine ────────────────────────────────────────────────────────────

function runSearch(
  query: string,
  filters: {
    types: string[];
    minYear: number;
    maxYear: number;
    importance: string;
    articleMode: boolean;
    articleNumber: string;
  }
): SearchResult[] {
  const results: SearchResult[] = [];
  const q = query.trim().toLowerCase();

  // ── Article-number mode ──────────────────────────────────────────────────────
  if (filters.articleMode && filters.articleNumber.trim()) {
    const needle = filters.articleNumber.trim();
    for (const law of laws) {
      if (filters.types.length > 0 && !filters.types.includes(law.type)) continue;
      if (law.year < filters.minYear || law.year > filters.maxYear) continue;
      if (filters.importance !== 'all' && law.importance !== filters.importance) continue;

      const color = typeColors[law.type] || '#8D1B3D';

      for (const article of law.articles) {
        if (articleMatches(article.number, needle)) {
          const fullText = `${article.number}: ${article.text}`;
          results.push({
            id: `${law.id}-art-${article.number}`,
            category: 'law',
            categoryLabel: typeLabels[law.type] || law.type,
            title: law.title,
            subtitle: `${law.number} — ${law.year}`,
            matchedIn: article.number,
            snippet: fullText,
            highlightedSnippet: highlight(fullText, needle),
            articleNumber: article.number,
            articleText: article.text,
            type: law.type,
            year: law.year,
            importance: law.importance,
            color,
          });
        }
      }
    }

    // Deduplicate
    const seen = new Set<string>();
    return results.filter(r => { if (seen.has(r.id)) return false; seen.add(r.id); return true; });
  }

  // ── Normal full-text mode ────────────────────────────────────────────────────
  for (const law of laws) {
    if (filters.types.length > 0 && !filters.types.includes(law.type)) continue;
    if (law.year < filters.minYear || law.year > filters.maxYear) continue;
    if (filters.importance !== 'all' && law.importance !== filters.importance) continue;
    if (!q) continue;

    const color = typeColors[law.type] || '#8D1B3D';

    if (law.title.toLowerCase().includes(q)) {
      const snip = excerpt(law.title, query);
      results.push({ id: `${law.id}-title`, category: 'law', categoryLabel: typeLabels[law.type] || law.type, title: law.title, subtitle: `${law.number} — ${law.year}`, matchedIn: 'العنوان', snippet: snip, highlightedSnippet: highlight(snip, query), type: law.type, year: law.year, importance: law.importance, color });
      continue;
    }

    if (law.summary.toLowerCase().includes(q)) {
      const snip = excerpt(law.summary, query);
      results.push({ id: `${law.id}-summary`, category: 'law', categoryLabel: typeLabels[law.type] || law.type, title: law.title, subtitle: `${law.number} — ${law.year}`, matchedIn: 'الملخص', snippet: snip, highlightedSnippet: highlight(snip, query), type: law.type, year: law.year, importance: law.importance, color });
      continue;
    }

    for (const article of law.articles) {
      const combined = `${article.number} ${article.text}`;
      if (combined.toLowerCase().includes(q)) {
        const snip = excerpt(combined, query);
        results.push({ id: `${law.id}-${article.number}`, category: 'law', categoryLabel: typeLabels[law.type] || law.type, title: law.title, subtitle: `${law.number} — ${law.year}`, matchedIn: article.number, snippet: snip, highlightedSnippet: highlight(snip, query), articleNumber: article.number, articleText: article.text, type: law.type, year: law.year, importance: law.importance, color });
        break;
      }
    }

    if (law.tags.some(t => t.toLowerCase().includes(q))) {
      results.push({ id: `${law.id}-tag`, category: 'law', categoryLabel: typeLabels[law.type] || law.type, title: law.title, subtitle: `${law.number} — ${law.year}`, matchedIn: 'الكلمات المفتاحية', snippet: law.tags.join(' • '), highlightedSnippet: highlight(law.tags.join(' • '), query), type: law.type, year: law.year, importance: law.importance, color });
    }
  }

  if (q && filters.types.length === 0) {
    for (const inst of institutions) {
      const searchable = `${inst.name} ${inst.shortName} ${inst.role} ${inst.programs.join(' ')}`;
      if (searchable.toLowerCase().includes(q)) {
        const snip = excerpt(searchable, query);
        results.push({ id: `inst-${inst.id}`, category: 'institution', categoryLabel: 'مؤسسة', title: inst.name, subtitle: inst.shortName, matchedIn: inst.name.toLowerCase().includes(q) ? 'اسم المؤسسة' : 'البرامج والأدوار', snippet: snip, highlightedSnippet: highlight(snip, query), color: inst.color });
      }
    }
    for (const init of initiatives) {
      const searchable = `${init.name} ${init.description} ${init.components.join(' ')} ${init.targets.join(' ')}`;
      if (searchable.toLowerCase().includes(q)) {
        const snip = excerpt(searchable, query);
        results.push({ id: `init-${init.id}`, category: 'initiative', categoryLabel: 'مبادرة', title: init.name, subtitle: `${init.operator} — ${init.year}`, matchedIn: init.name.toLowerCase().includes(q) ? 'اسم المبادرة' : 'الوصف والمكونات', snippet: snip, highlightedSnippet: highlight(snip, query), color: '#2E7D32' });
      }
    }
  }

  const seen = new Set<string>();
  return results.filter(r => { if (seen.has(r.id)) return false; seen.add(r.id); return true; });
}

// ─── All articles index (for article-mode autocomplete) ───────────────────────

const allArticleNumbers: { lawTitle: string; articleNumber: string }[] = laws.flatMap(law =>
  law.articles.map(a => ({ lawTitle: law.title, articleNumber: a.number }))
);

// ─── Result Card ──────────────────────────────────────────────────────────────

function ResultCard({
  result,
  onScrollTo,
  articleMode,
}: {
  result: SearchResult;
  onScrollTo: (section: string) => void;
  articleMode: boolean;
}) {
  const sectionMap: Record<string, string> = { law: 'laws', institution: 'institutions', initiative: 'initiatives' };
  const categoryIcon = { law: <Scale size={14} />, institution: <Building2 size={14} />, initiative: <Lightbulb size={14} /> }[result.category];

  return (
    <button
      onClick={() => onScrollTo(sectionMap[result.category])}
      className="w-full text-right bg-white hover:bg-gray-50 border border-gray-100 rounded-xl p-4 transition-all duration-150 hover:shadow-sm group"
    >
      <div className="flex items-start gap-3">
        <div className="w-1 self-stretch rounded-full flex-shrink-0 min-h-[40px]" style={{ backgroundColor: result.color }} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: result.color }}>
              {categoryIcon}
              {result.categoryLabel}
            </span>
            {/* Article badge — prominent in article mode */}
            {result.articleNumber && (
              <span className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                <ListOrdered size={11} />
                {result.articleNumber}
              </span>
            )}
            {!result.articleNumber && (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <BookOpen size={11} />
                {result.matchedIn}
              </span>
            )}
            {result.importance === 'high' && <Star size={11} className="text-yellow-500 fill-yellow-500" />}
            {result.year && <span className="text-xs text-gray-400">{result.year}</span>}
          </div>

          <p className="text-sm font-bold text-gray-900 leading-snug mb-0.5 group-hover:text-[#8D1B3D] transition-colors">
            {result.title}
          </p>
          <p className="text-xs text-gray-500 mb-2">{result.subtitle}</p>

          {/* In article mode show the full article text in a styled box */}
          {articleMode && result.articleText ? (
            <div className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
              <p className="text-xs font-bold text-amber-700 mb-1">{result.articleNumber}</p>
              <p
                className="text-xs text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: highlight(result.articleText, result.articleNumber || '') }}
              />
            </div>
          ) : (
            <p
              className="text-xs text-gray-600 leading-relaxed line-clamp-3"
              dangerouslySetInnerHTML={{ __html: result.highlightedSnippet }}
            />
          )}
        </div>
        <ChevronRight size={14} className="text-gray-300 group-hover:text-[#8D1B3D] flex-shrink-0 mt-1 transition-colors" />
      </div>
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdvancedSearch({ isOpen, onClose }: AdvancedSearchProps) {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [minYear, setMinYear] = useState(1989);
  const [maxYear, setMaxYear] = useState(2025);
  const [importance, setImportance] = useState('all');

  // Article-number filter state
  const [articleMode, setArticleMode] = useState(false);
  const [articleNumber, setArticleNumber] = useState('');
  const [articleSuggestions, setArticleSuggestions] = useState<typeof allArticleNumbers>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const articleInputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
      setShowFilters(false);
      setArticleMode(false);
      setArticleNumber('');
      setArticleSuggestions([]);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Article number autocomplete
  useEffect(() => {
    if (!articleMode || !articleNumber.trim()) {
      setArticleSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const needle = normaliseArticleInput(articleNumber).toLowerCase();
    const matches = allArticleNumbers.filter(a =>
      normaliseArticleInput(a.articleNumber).toLowerCase().includes(needle)
    ).slice(0, 6);
    setArticleSuggestions(matches);
    setShowSuggestions(matches.length > 0);
  }, [articleNumber, articleMode]);

  // Debounced search
  useEffect(() => {
    const hasInput = articleMode ? articleNumber.trim().length > 0 : query.trim().length > 0;
    if (!hasInput && selectedTypes.length === 0) {
      setResults([]);
      return;
    }
    setIsSearching(true);
    const timer = setTimeout(() => {
      const r = runSearch(query, { types: selectedTypes, minYear, maxYear, importance, articleMode, articleNumber });
      setResults(r);
      setIsSearching(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [query, selectedTypes, minYear, maxYear, importance, articleMode, articleNumber]);

  const toggleType = (type: string) => {
    setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  const scrollTo = useCallback((sectionId: string) => {
    onClose();
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  }, [onClose]);

  const clearAll = () => {
    setQuery('');
    setSelectedTypes([]);
    setMinYear(1989);
    setMaxYear(2025);
    setImportance('all');
    setArticleNumber('');
    setResults([]);
    if (articleMode) articleInputRef.current?.focus();
    else inputRef.current?.focus();
  };

  const switchToArticleMode = () => {
    setArticleMode(true);
    setQuery('');
    setResults([]);
    setTimeout(() => articleInputRef.current?.focus(), 50);
  };

  const switchToTextMode = () => {
    setArticleMode(false);
    setArticleNumber('');
    setResults([]);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  if (!isOpen) return null;

  const hasActiveFilters = selectedTypes.length > 0 || minYear !== 1989 || maxYear !== 2025 || importance !== 'all';
  const hasInput = articleMode ? articleNumber.trim().length > 0 : query.trim().length > 0;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-start justify-center pt-16 px-4"
      style={{ backgroundColor: 'rgba(28,43,58,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{ maxHeight: 'calc(100vh - 8rem)' }}
      >
        {/* Mode tabs */}
        <div className="flex items-center gap-0 border-b border-gray-100 px-4 pt-3">
          <button
            onClick={switchToTextMode}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-t-lg transition-all duration-150 border-b-2 ${
              !articleMode
                ? 'border-[#8D1B3D] text-[#8D1B3D] bg-red-50/50'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            <Search size={13} />
            بحث نصي
          </button>
          <button
            onClick={switchToArticleMode}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-t-lg transition-all duration-150 border-b-2 ${
              articleMode
                ? 'border-amber-500 text-amber-700 bg-amber-50/50'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            <ListOrdered size={13} />
            بحث برقم المادة
          </button>
          <div className="mr-auto flex items-center gap-2 pb-1">
            {(hasInput || hasActiveFilters) && (
              <button onClick={clearAll} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                <X size={14} />
              </button>
            )}
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Search input bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
          {articleMode ? (
            <>
              <ListOrdered size={18} className="text-amber-500 flex-shrink-0" />
              <div className="flex-1 relative">
                <input
                  ref={articleInputRef}
                  type="text"
                  value={articleNumber}
                  onChange={e => { setArticleNumber(e.target.value); setShowSuggestions(true); }}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                  placeholder="أدخل رقم المادة... مثال: 7 أو المادة 17 أو 21"
                  className="w-full text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent font-medium"
                  dir="rtl"
                />
                {/* Autocomplete dropdown */}
                {showSuggestions && articleSuggestions.length > 0 && (
                  <div className="absolute top-full right-0 left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
                    {articleSuggestions.map((s, i) => (
                      <button
                        key={i}
                        onMouseDown={() => {
                          setArticleNumber(s.articleNumber);
                          setShowSuggestions(false);
                          articleInputRef.current?.focus();
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-right hover:bg-amber-50 transition-colors border-b border-gray-50 last:border-0"
                      >
                        <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex-shrink-0">
                          {s.articleNumber}
                        </span>
                        <span className="text-xs text-gray-600 truncate">{s.lawTitle}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Search size={18} className="text-gray-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="ابحث في القوانين والمواد والمؤسسات..."
                className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent font-medium"
                dir="rtl"
              />
            </>
          )}

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(f => !f)}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 flex-shrink-0 ${
              showFilters || hasActiveFilters ? 'text-white' : 'text-gray-500 bg-gray-100 hover:bg-gray-200'
            }`}
            style={showFilters || hasActiveFilters ? { backgroundColor: '#8D1B3D' } : {}}
          >
            <Filter size={13} />
            فلترة
            {hasActiveFilters && (
              <span className="bg-white text-[#8D1B3D] text-xs rounded-full w-4 h-4 flex items-center justify-center font-black text-[10px]">
                {selectedTypes.length + (minYear !== 1989 ? 1 : 0) + (maxYear !== 2025 ? 1 : 0) + (importance !== 'all' ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        {/* Article mode hint banner */}
        {articleMode && !articleNumber.trim() && (
          <div className="px-4 py-2 bg-amber-50 border-b border-amber-100 flex items-start gap-2">
            <ListOrdered size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-amber-800">وضع البحث برقم المادة</p>
              <p className="text-xs text-amber-700 mt-0.5">
                أدخل رقم المادة بأي صيغة: <span className="font-mono bg-amber-100 px-1 rounded">7</span> أو <span className="font-mono bg-amber-100 px-1 rounded">المادة 17</span> أو <span className="font-mono bg-amber-100 px-1 rounded">م. 21</span> — سيعرض النص الكامل للمادة من جميع القوانين.
              </p>
            </div>
          </div>
        )}

        {/* Filters panel */}
        {showFilters && (
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 space-y-3">
            <div>
              <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">نوع التشريع</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { value: 'constitution', label: 'دستور', color: '#8D1B3D' },
                  { value: 'national', label: 'قانون وطني', color: '#1C2B3A' },
                  { value: 'strategy', label: 'استراتيجية', color: '#C9A84C' },
                  { value: 'international', label: 'اتفاقية دولية', color: '#2E7D32' },
                  { value: 'decree', label: 'قرار وزاري', color: '#7B1FA2' },
                ].map(t => (
                  <button
                    key={t.value}
                    onClick={() => toggleType(t.value)}
                    className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-all duration-150 border ${
                      selectedTypes.includes(t.value) ? 'text-white border-transparent' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                    style={selectedTypes.includes(t.value) ? { backgroundColor: t.color, borderColor: t.color } : {}}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">من سنة</p>
                <select
                  value={minYear}
                  onChange={e => setMinYear(Number(e.target.value))}
                  className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-700 outline-none focus:border-[#8D1B3D]"
                >
                  {[1989, 1994, 2004, 2008, 2012, 2014, 2016, 2019, 2020, 2025].map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">إلى سنة</p>
                <select
                  value={maxYear}
                  onChange={e => setMaxYear(Number(e.target.value))}
                  className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-700 outline-none focus:border-[#8D1B3D]"
                >
                  {[1994, 2004, 2008, 2012, 2014, 2016, 2019, 2020, 2025].map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">الأهمية</p>
              <div className="flex gap-2">
                {[
                  { value: 'all', label: 'الكل' },
                  { value: 'high', label: 'عالية ★' },
                  { value: 'medium', label: 'متوسطة' },
                ].map(imp => (
                  <button
                    key={imp.value}
                    onClick={() => setImportance(imp.value)}
                    className={`text-xs px-3 py-1 rounded-full font-semibold transition-all duration-150 ${
                      importance === imp.value ? 'text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                    }`}
                    style={importance === imp.value ? { backgroundColor: '#8D1B3D' } : {}}
                  >
                    {imp.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results area */}
        <div className="overflow-y-auto" style={{ maxHeight: showFilters ? '300px' : '440px' }}>

          {/* Empty / idle state */}
          {!hasInput && !hasActiveFilters && (
            <div className="px-4 py-8 text-center">
              {articleMode ? (
                <>
                  <ListOrdered size={32} className="mx-auto text-amber-200 mb-3" />
                  <p className="text-sm text-gray-400 font-medium">أدخل رقم المادة للبحث المباشر</p>
                  <p className="text-xs text-gray-300 mt-1">يدعم الأرقام العربية والإنجليزية وصيغ متعددة</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {['7', '17', '21', '27', '34'].map(n => (
                      <button
                        key={n}
                        onClick={() => setArticleNumber(n)}
                        className="text-xs px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-full transition-colors flex items-center gap-1 border border-amber-200 font-mono font-bold"
                      >
                        م. {n}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <Search size={32} className="mx-auto text-gray-200 mb-3" />
                  <p className="text-sm text-gray-400 font-medium">ابدأ الكتابة للبحث في التشريعات</p>
                  <p className="text-xs text-gray-300 mt-1">يمكنك البحث في العناوين والمواد والملخصات والكلمات المفتاحية</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {['الطفل', 'الجرائم الإلكترونية', 'الخصوصية', 'العقوبة', 'البيانات', 'الاستغلال'].map(s => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors flex items-center gap-1"
                      >
                        <Hash size={10} />
                        {s}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Searching */}
          {isSearching && (
            <div className="px-4 py-4 text-center">
              <div className="inline-flex items-center gap-2 text-xs text-gray-400">
                <div className="w-3 h-3 rounded-full border-2 border-[#8D1B3D] border-t-transparent animate-spin" />
                جاري البحث...
              </div>
            </div>
          )}

          {/* No results */}
          {!isSearching && hasInput && results.length === 0 && (
            <div className="px-4 py-8 text-center">
              <FileText size={32} className="mx-auto text-gray-200 mb-3" />
              <p className="text-sm text-gray-500 font-medium">
                {articleMode
                  ? `لم يُعثر على مادة بالرقم "${articleNumber}"`
                  : `لم يُعثر على نتائج لـ "${query}"`}
              </p>
              <p className="text-xs text-gray-400 mt-1">حاول تغيير مصطلح البحث أو تعديل الفلاتر</p>
            </div>
          )}

          {/* Results list */}
          {!isSearching && results.length > 0 && (
            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between px-1 mb-1">
                <p className="text-xs text-gray-500">
                  <span className="font-bold" style={{ color: articleMode ? '#B45309' : '#8D1B3D' }}>{results.length}</span> نتيجة
                  {articleMode && articleNumber && (
                    <span> للمادة "<span className="font-semibold font-mono">{articleNumber}</span>"</span>
                  )}
                  {!articleMode && query && (
                    <span> لـ "<span className="font-semibold">{query}</span>"</span>
                  )}
                </p>
                <div className="flex gap-2 text-xs text-gray-400">
                  {results.filter(r => r.category === 'law').length > 0 && (
                    <span className="flex items-center gap-1"><Scale size={10} />{results.filter(r => r.category === 'law').length} قانون</span>
                  )}
                  {results.filter(r => r.category === 'institution').length > 0 && (
                    <span className="flex items-center gap-1"><Building2 size={10} />{results.filter(r => r.category === 'institution').length} مؤسسة</span>
                  )}
                  {results.filter(r => r.category === 'initiative').length > 0 && (
                    <span className="flex items-center gap-1"><Lightbulb size={10} />{results.filter(r => r.category === 'initiative').length} مبادرة</span>
                  )}
                </div>
              </div>

              {results.map(result => (
                <ResultCard key={result.id} result={result} onScrollTo={scrollTo} articleMode={articleMode} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            <kbd className="bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded text-xs font-mono">Esc</kbd> للإغلاق
          </p>
          <p className="text-xs text-gray-400">
            <kbd className="bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded text-xs font-mono">Ctrl</kbd>
            {' + '}
            <kbd className="bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded text-xs font-mono">K</kbd>
            {' للفتح'}
          </p>
        </div>
      </div>
    </div>
  );
}
