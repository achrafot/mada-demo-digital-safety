/**
 * Qatar Digital Safety for Children - Home Page
 * Design: Modern Arabic Institutional
 * Colors: Qatar maroon (#8D1B3D) + gold (#C9A84C) + cream (#FAF8F5) + dark navy (#1C2B3A)
 * Typography: Cairo (headings) + Noto Sans Arabic (body)
 * Layout: RTL with sticky sidebar navigation
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import AdvancedSearch from '@/components/AdvancedSearch';
import RelationshipMap from '@/components/RelationshipMap';
import ReferencesSection from '@/components/ReferencesSection';
import ComparativeStudy from '@/components/ComparativeStudy';
import ActionPlan from '@/components/ActionPlan';
import GlossarySection from '@/components/GlossarySection';
import CommitteeSection from '@/components/CommitteeSection';
import ResearchStudiesSection from '@/components/ResearchStudiesSection';
import { laws, institutions, initiatives, timelineEvents, stats } from '@/lib/data';
import {
  Scale, Target, Building2, Lightbulb, Calendar, Globe,
  ChevronDown, ChevronUp, Shield, BookOpen, Users, Gavel,
  FileText, Star, ExternalLink, Menu, X, ArrowUp, Search,
  Phone, Mail, MapPin, Link
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663558513650/2mRyU4TUq6Sz4NVXiPsFb6/hero-qatar-digital-safety-k6xNZZTEc7Gw7YKrHESknB.webp";

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

const timelineTypeColors: Record<string, string> = {
  law: '#8D1B3D',
  strategy: '#C9A84C',
  institution: '#1C2B3A',
  initiative: '#2E7D32',
  international: '#0277BD',
};

const statIcons: Record<string, React.ReactNode> = {
  scale: <Scale size={28} />,
  target: <Target size={28} />,
  building: <Building2 size={28} />,
  lightbulb: <Lightbulb size={28} />,
  calendar: <Calendar size={28} />,
  globe: <Globe size={28} />,
};

const navItems = [
  { id: 'overview', label: 'نظرة عامة', icon: <Shield size={18} /> },
  { id: 'committee', label: 'اللجنة الوطنية', icon: <Users size={18} /> },
  { id: 'laws', label: 'التشريعات والقوانين', icon: <Scale size={18} /> },
  { id: 'institutions', label: 'المؤسسات والهيئات', icon: <Building2 size={18} /> },
  { id: 'initiatives', label: 'المبادرات والبرامج', icon: <Lightbulb size={18} /> },
  { id: 'timeline', label: 'الخط الزمني', icon: <Calendar size={18} /> },
  { id: 'charts', label: 'الرسوم البيانية', icon: <Target size={18} /> },
  { id: 'study', label: 'الدراسة التحليلية', icon: <FileText size={18} /> },
  { id: 'actionplan', label: 'خطة العمل', icon: <Target size={18} /> },
  { id: 'glossary', label: 'مسرد المصطلحات', icon: <BookOpen size={18} /> },
  { id: 'research', label: 'الدراسات والأبحاث', icon: <BookOpen size={18} /> },
  { id: 'references', label: 'المراجع والمصادر', icon: <BookOpen size={18} /> },
];

function useIntersectionObserver(ref: React.RefObject<Element>, options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsIntersecting(true);
    }, { threshold: 0.1, ...options });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return isIntersecting;
}

function AnimatedCounter({ value, duration = 1500 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isVisible = useIntersectionObserver(ref as React.RefObject<Element>);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, value, duration]);

  return <span ref={ref}>{count}</span>;
}

function LawCard({ law }: { law: typeof laws[0] }) {
  const [expanded, setExpanded] = useState(false);
  const borderColor = typeColors[law.type] || '#8D1B3D';

  return (
    <div
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
      style={{ borderRight: `4px solid ${borderColor}` }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span
                className="text-xs font-semibold px-2 py-1 rounded-full text-white"
                style={{ backgroundColor: borderColor }}
              >
                {typeLabels[law.type]}
              </span>
              <span className="text-xs text-gray-500 font-medium">{law.number}</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{law.year}</span>
            </div>
            <h3 className="text-base font-bold text-gray-900 leading-snug">{law.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{law.authority}</p>
          </div>
          {law.importance === 'high' && (
            <Star size={16} className="text-yellow-500 fill-yellow-500 flex-shrink-0 mt-1" />
          )}
        </div>

        <p className="text-sm text-gray-600 leading-relaxed mb-3">{law.summary}</p>

        {law.penalties && (
          <div className="bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-3">
            <p className="text-xs text-red-700 font-medium">
              <Gavel size={12} className="inline ml-1" />
              العقوبة: {law.penalties}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-1 mb-3">
          {law.tags.map(tag => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs font-semibold transition-colors"
          style={{ color: borderColor }}
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {expanded ? 'إخفاء المواد' : `عرض المواد (${law.articles.length})`}
        </button>

        {expanded && (
          <div className="mt-3 space-y-2 border-t pt-3">
            {law.articles.map((article, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-bold mb-1" style={{ color: borderColor }}>{article.number}</p>
                <p className="text-xs text-gray-700 leading-relaxed">{article.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function InstitutionCard({ inst }: { inst: typeof institutions[0] }) {
  const [expanded, setExpanded] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const isPrimary = inst.tier === 'primary';
  const hasContact = inst.website || inst.email || inst.phone || inst.address;
  return (
    <div
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5 relative overflow-hidden flex flex-col"
      style={{ borderTop: `3px solid ${inst.color}` }}
      data-institution-id={inst.id}
    >
      {/* Tier badge */}
      <div className="absolute top-3 left-3">
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            isPrimary
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-blue-50 text-blue-700 border border-blue-200'
          }`}
        >
          {isPrimary ? 'جهة رئيسية' : 'جهة داعمة'}
        </span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-3 mt-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
          style={{ backgroundColor: inst.color }}
        >
          {inst.shortName}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-gray-900 leading-snug">{inst.name}</h3>
          <p className="text-xs text-gray-500 leading-snug mt-0.5 line-clamp-2">{inst.role}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={() => { setExpanded(!expanded); setShowContact(false); }}
          className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg transition-colors"
          style={expanded ? { backgroundColor: inst.color + '15', color: inst.color } : { color: inst.color }}
        >
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          {expanded ? 'إخفاء' : `البرامج (${inst.programs.length})`}
        </button>
        {hasContact && (
          <button
            onClick={() => { setShowContact(!showContact); setExpanded(false); }}
            className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg transition-colors"
            style={showContact ? { backgroundColor: '#1C2B3A15', color: '#1C2B3A' } : { color: '#6B7280' }}
          >
            <Phone size={12} />
            {showContact ? 'إخفاء' : 'معلومات الاتصال'}
          </button>
        )}
      </div>

      {/* Programs list */}
      {expanded && (
        <ul className="space-y-1.5 border-t pt-3 mb-2">
          {inst.programs.map((p, i) => {
            const item = typeof p === 'string' ? { text: p, source: 'inferred' as const } : p;
            const srcIcon = item.source === 'law'
              ? { icon: '⚖️', label: item.sourceRef || 'قانون', color: '#1C2B3A' }
              : item.source === 'decree'
              ? { icon: '📜', label: item.sourceRef || 'قرار رسمي', color: '#8D1B3D' }
              : item.source === 'official'
              ? { icon: '🌐', label: item.sourceRef || 'موقع رسمي', color: '#2E7D32' }
              : { icon: '💡', label: 'استنتاج تحليلي', color: '#B45309' };
            return (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: inst.color }} />
                <span className="flex-1">{item.text}</span>
                {item.sourceUrl ? (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`مصدر: ${srcIcon.label} — اضغط لفتح المصدر`}
                    className="flex-shrink-0 text-[10px] px-1.5 py-0.5 rounded-full font-medium hover:opacity-80 transition-opacity underline decoration-dotted"
                    style={{ backgroundColor: `${srcIcon.color}15`, color: srcIcon.color }}
                  >
                    {srcIcon.icon} {srcIcon.label}
                  </a>
                ) : (
                  <span
                    title={srcIcon.label}
                    className="flex-shrink-0 text-[10px] px-1.5 py-0.5 rounded-full font-medium cursor-help"
                    style={{ backgroundColor: `${srcIcon.color}15`, color: srcIcon.color }}
                  >
                    {srcIcon.icon} {srcIcon.label}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {/* Contact info */}
      {showContact && hasContact && (
        <div className="border-t pt-3 mt-1 space-y-2">
          {inst.website && (
            <a
              href={`https://${inst.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs group"
              style={{ color: inst.color }}
            >
              <Link size={12} className="flex-shrink-0" />
              <span className="group-hover:underline truncate">{inst.website}</span>
            </a>
          )}
          {inst.email && (
            <a
              href={`mailto:${inst.email}`}
              className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900"
            >
              <Mail size={12} className="flex-shrink-0" style={{ color: inst.color }} />
              <span className="truncate">{inst.email}</span>
            </a>
          )}
          {inst.phone && (
            <a
              href={`tel:${inst.phone}`}
              className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900"
            >
              <Phone size={12} className="flex-shrink-0" style={{ color: inst.color }} />
              <span>{inst.phone}</span>
            </a>
          )}
          {inst.address && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <MapPin size={12} className="flex-shrink-0" style={{ color: inst.color }} />
              <span>{inst.address}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('overview');
  const [filterType, setFilterType] = useState<string>('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      const sections = navItems.map(n => n.id);
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setSidebarOpen(false);
  };

  const filteredLaws = filterType === 'all' ? laws : laws.filter(l => l.type === filterType);

  // Chart data
  const lawsByYear = [
    { year: '1994', count: 1 },
    { year: '2004', count: 1 },
    { year: '2008', count: 1 },
    { year: '2014', count: 2 },
    { year: '2016', count: 1 },
    { year: '2019', count: 1 },
    { year: '2025', count: 1 },
  ];

  const typeDistribution = [
    { name: 'قوانين وطنية', value: 3, color: '#1C2B3A' },
    { name: 'استراتيجيات', value: 3, color: '#C9A84C' },
    { name: 'دستور', value: 1, color: '#8D1B3D' },
    { name: 'اتفاقيات دولية', value: 1, color: '#2E7D32' },
    { name: 'قرارات وزارية', value: 1, color: '#7B1FA2' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]" dir="rtl">

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 z-50 flex flex-col transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          lg:translate-x-0`}
        style={{ backgroundColor: '#1C2B3A' }}
      >
        {/* Sidebar header */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#8D1B3D' }}>
                <Shield size={16} className="text-white" />
              </div>
              <div>
                <p className="text-white text-xs font-bold leading-tight">لجنة السلامة الرقمية</p>
                <p className="text-white/60 text-xs">للأطفال والنشء</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white/60 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-right
                ${activeSection === item.id
                  ? 'text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              style={activeSection === item.id ? { backgroundColor: '#8D1B3D' } : {}}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Search button in sidebar */}
        <div className="px-4 pb-4">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white transition-all duration-200 border border-white/10 hover:border-white/20 hover:bg-white/5"
          >
            <Search size={16} />
            <span className="flex-1 text-right">بحث متقدم...</span>
            <kbd className="text-white/30 text-xs font-mono bg-white/10 px-1.5 py-0.5 rounded">⌃K</kbd>
          </button>
        </div>

        {/* Sidebar footer */}
        <div className="p-4 border-t border-white/10">
          <div className="text-center">
            <p className="text-white/40 text-xs">تحديث: أبريل 2026</p>
            <p className="text-white/40 text-xs mt-0.5">مصادر رسمية قطرية</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:mr-64">

        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-sm font-bold text-gray-900">لجنة السلامة الرقمية للأطفال والنشء</h1>
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Search size={20} className="text-gray-600" />
          </button>
        </header>

        {/* Hero Section */}
        <section id="overview" className="relative overflow-hidden">
          <div
            className="relative min-h-[420px] flex items-end"
            style={{
              backgroundImage: `url(${HERO_IMAGE})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,43,58,0.95) 0%, rgba(28,43,58,0.6) 50%, rgba(28,43,58,0.2) 100%)' }} />
            <div className="relative z-10 p-8 lg:p-12 w-full">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-0.5 w-8" style={{ backgroundColor: '#C9A84C' }} />
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#C9A84C' }}>
                    دولة قطر — الإطار التشريعي
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-4">
                  لجنة السلامة الرقمية للأطفال والنشء
                </h1>
                <p className="text-white/80 text-base leading-relaxed max-w-2xl">
                  دليل شامل للقوانين والمرجعيات التشريعية والمؤسسية التي تحمي الأطفال والناشئة في الفضاء الرقمي بدولة قطر، من الدستور الدائم حتى أحدث القرارات الوزارية لعام 2025.
                </p>
                <button
                  onClick={() => setSearchOpen(true)}
                  className="mt-5 flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5 transition-all duration-200 group"
                >
                  <Search size={16} className="text-white/70 group-hover:text-white" />
                  <span className="text-white/70 group-hover:text-white text-sm">ابحث في التشريعات والمواد...</span>
                  <span className="mr-auto flex items-center gap-1">
                    <kbd className="bg-white/10 text-white/50 text-xs font-mono px-1.5 py-0.5 rounded">Ctrl</kbd>
                    <kbd className="bg-white/10 text-white/50 text-xs font-mono px-1.5 py-0.5 rounded">K</kbd>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="bg-white border-b border-gray-100 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-x-reverse divide-gray-100">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center py-5 px-3 text-center">
                  <div className="mb-2" style={{ color: stat.color }}>
                    {statIcons[stat.icon]}
                  </div>
                  <div className="text-2xl font-black" style={{ color: stat.color }}>
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Digital Safety Definition */}
          <div className="px-6 py-8 lg:px-12" style={{ background: 'linear-gradient(135deg, #1C2B3A 0%, #2D3F52 100%)' }}>
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Shield size={22} className="text-white" />
                </div>
                <h2 className="text-lg font-black text-white">تعريف السلامة الرقمية</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                  <p className="text-xs font-bold text-amber-300 mb-2 uppercase tracking-widest">التعريف الأكاديمي</p>
                  <p className="text-white/90 text-sm leading-relaxed">
                    <span className="font-black text-white">السلامة الرقمية</span> هي منظومة متكاملة من الممارسات والسياسات والتقنيات التي تهدف إلى حماية الأفراد — ولا سيما الأطفال والناشئة — من المخاطر والتهديدات في الفضاء الرقمي، وتمكينهم من استخدام التكنولوجيا بأمان ومسؤولية وثقة.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                  <p className="text-xs font-bold text-green-300 mb-2 uppercase tracking-widest">الإطار القطري</p>
                  <p className="text-white/90 text-sm leading-relaxed">
                    في السياق القطري، تشمل السلامة الرقمية للأطفال: <span className="font-semibold text-white">الحماية من التنمر الإلكتروني والاستغلال الرقمي</span>، وصون الخصوصية وحماية البيانات الشخصية، وتعزيز محو الأمية الرقمية والمواطنة الرقمية المسؤولة.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
                {[
                  { label: 'الحماية', desc: 'من المخاطر الرقمية', color: '#F87171' },
                  { label: 'التمكين', desc: 'باستخدام آمن ومسؤول', color: '#34D399' },
                  { label: 'الخصوصية', desc: 'وحماية البيانات', color: '#60A5FA' },
                  { label: 'الوعي', desc: 'والتثقيف الرقمي', color: '#FBBF24' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
                    <div className="text-sm font-black mb-0.5" style={{ color: item.color }}>{item.label}</div>
                    <div className="text-[11px] text-white/60">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Intro text */}
          <div className="bg-white px-6 py-8 lg:px-12">
            <div className="max-w-4xl">
              <div className="section-divider mb-6 w-16" />
              <h2 className="text-xl font-bold text-gray-900 mb-4">مقدمة: لماذا السلامة الرقمية للأطفال؟</h2>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700 leading-relaxed">
                <p>
                  أصبحت التكنولوجيا الرقمية جزءاً لا يتجزأ من حياة الأطفال اليومية، مما يجعلهم عرضة لمخاطر متعددة كالتنمر الإلكتروني والاستغلال الرقمي وانتهاك الخصوصية. وتُدرك دولة قطر هذه التحديات وتتصدى لها بمنظومة تشريعية ومؤسسية متكاملة.
                </p>
                <p>
                  يستعرض هذا التقرير الإطار التشريعي الشامل الذي أرسته قطر لحماية أطفالها في الفضاء الرقمي، بدءاً من الدستور الدائم مروراً بالقوانين الوطنية والاستراتيجيات المتخصصة وصولاً إلى أحدث القرارات المؤسسية لعام 2025.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Committee Section */}
        <section id="committee" className="border-t border-gray-100">
          <CommitteeSection />
        </section>

        {/* Laws Section */}
        <section id="laws" className="px-6 py-10 lg:px-12">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-2">
              <Scale size={22} style={{ color: '#8D1B3D' }} />
              <h2 className="text-2xl font-black text-gray-900">التشريعات والقوانين</h2>
            </div>
            <div className="section-divider mb-6 w-16" />

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { value: 'all', label: 'الكل' },
                { value: 'constitution', label: 'الدستور' },
                { value: 'national', label: 'قوانين وطنية' },
                { value: 'strategy', label: 'استراتيجيات' },
                { value: 'international', label: 'اتفاقيات دولية' },
                { value: 'decree', label: 'قرارات وزارية' },
              ].map(f => (
                <button
                  key={f.value}
                  onClick={() => setFilterType(f.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    filterType === f.value
                      ? 'text-white shadow-sm'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                  style={filterType === f.value ? { backgroundColor: '#8D1B3D' } : {}}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {filteredLaws.map(law => (
                <LawCard key={law.id} law={law} />
              ))}
            </div>
          </div>
        </section>

        {/* Institutions Section */}
        <section id="institutions" className="px-6 py-10 lg:px-12 bg-white">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-2">
              <Building2 size={22} style={{ color: '#8D1B3D' }} />
              <h2 className="text-2xl font-black text-gray-900">المؤسسات والهيئات التنظيمية</h2>
            </div>
            <div className="section-divider mb-6 w-16" />
            <p className="text-sm text-gray-600 mb-6 leading-relaxed max-w-3xl">
              تتبنى قطر نهجاً متعدد الأطراف في حماية الأطفال رقمياً، إذ تتعاون منظومة متكاملة من المؤسسات الحكومية والأكاديمية والمجتمعية لضمان بيئة رقمية آمنة.
            </p>

            {/* Legend */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">جهة رئيسية</span>
                <span className="text-xs text-gray-500">جهات محورية بصلاحيات مباشرة</span>
              </div>
              <div className="w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">جهة داعمة</span>
                <span className="text-xs text-gray-500">جهات مساندة وشريكة</span>
              </div>
            </div>

            {/* Primary institutions */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-0.5 flex-1" style={{ backgroundColor: '#8D1B3D', opacity: 0.2 }} />
                <h3 className="text-sm font-black uppercase tracking-widest" style={{ color: '#8D1B3D' }}>الجهات الرئيسية</h3>
                <div className="h-0.5 flex-1" style={{ backgroundColor: '#8D1B3D', opacity: 0.2 }} />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {institutions.filter(i => i.tier === 'primary').map(inst => (
                  <InstitutionCard key={inst.id} inst={inst} />
                ))}
              </div>
            </div>

            {/* Supporting institutions */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-0.5 flex-1 bg-blue-200" />
                <h3 className="text-sm font-black uppercase tracking-widest text-blue-700">الجهات الداعمة</h3>
                <div className="h-0.5 flex-1 bg-blue-200" />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {institutions.filter(i => i.tier === 'supporting').map(inst => (
                  <InstitutionCard key={inst.id} inst={inst} />
                ))}
              </div>
            </div>

            {/* Relationship Map */}
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: '#8D1B3D' }} />
                <h3 className="text-lg font-black text-gray-900">خريطة العلاقات والتنسيق المؤسسي</h3>
              </div>
              <p className="text-xs text-gray-500 mb-4 mr-4">
                تصور بصري تفاعلي لشبكة التنسيق بين المؤسسات الـ 13 تحت مظلة اللجنة الوطنية
              </p>
              <RelationshipMap />
            </div>
          </div>
        </section>

        {/* Initiatives Section */}
        <section id="initiatives" className="px-6 py-10 lg:px-12">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-2">
              <Lightbulb size={22} style={{ color: '#8D1B3D' }} />
              <h2 className="text-2xl font-black text-gray-900">المبادرات والبرامج التوعوية</h2>
            </div>
            <div className="section-divider mb-6 w-16" />
            <div className="space-y-5">
              {initiatives.map((init, i) => (
                <div
                  key={init.id}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300"
                  style={{ borderRight: `4px solid ${['#8D1B3D', '#C9A84C', '#1C2B3A'][i % 3]}` }}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-base font-bold text-gray-900">{init.name}</h3>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{init.year}</span>
                      </div>
                      <p className="text-xs text-gray-500">{init.operator}</p>
                    </div>
                    {init.website && (
                      <a
                        href={`https://${init.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-medium hover:underline flex-shrink-0"
                        style={{ color: '#8D1B3D' }}
                      >
                        <ExternalLink size={12} />
                        {init.website}
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">{init.description}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">المكونات الرئيسية</p>
                      <ul className="space-y-1">
                        {init.components.map((c, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-gray-700">
                            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: ['#8D1B3D', '#C9A84C', '#1C2B3A'][i % 3] }} />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">الفئات المستهدفة</p>
                      <div className="flex flex-wrap gap-1.5">
                        {init.targets.map((t, j) => (
                          <span
                            key={j}
                            className="text-xs px-2 py-1 rounded-full text-white"
                            style={{ backgroundColor: ['#8D1B3D', '#C9A84C', '#1C2B3A'][i % 3] }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section id="timeline" className="px-6 py-10 lg:px-12 bg-white">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <Calendar size={22} style={{ color: '#8D1B3D' }} />
              <h2 className="text-2xl font-black text-gray-900">الخط الزمني للتشريعات</h2>
            </div>
            <div className="section-divider mb-6 w-16" />
            <p className="text-sm text-gray-600 mb-8 leading-relaxed">
              تطور المنظومة التشريعية والمؤسسية لحماية الأطفال رقمياً في دولة قطر عبر الزمن.
            </p>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute right-[7px] top-0 bottom-0 w-0.5 bg-gray-200" />

              <div className="space-y-4">
                {timelineEvents.map((event, i) => (
                  <div key={i} className="relative flex items-start gap-4 pr-6">
                    {/* Dot */}
                    <div
                      className={`absolute right-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm flex-shrink-0 ${event.importance === 'major' ? 'w-4 h-4' : ''}`}
                      style={{ backgroundColor: timelineTypeColors[event.type] }}
                    />

                    {/* Content */}
                    <div className={`flex-1 pb-2 ${event.importance === 'major' ? '' : 'opacity-80'}`}>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span
                          className="text-xs font-black px-2 py-0.5 rounded text-white"
                          style={{ backgroundColor: timelineTypeColors[event.type] }}
                        >
                          {event.year}
                        </span>
                        <h4 className={`font-bold text-gray-900 ${event.importance === 'major' ? 'text-sm' : 'text-xs'}`}>
                          {event.title}
                        </h4>
                        {event.importance === 'major' && (
                          <Star size={12} className="text-yellow-500 fill-yellow-500" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section id="charts" className="px-6 py-10 lg:px-12">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-2">
              <Target size={22} style={{ color: '#8D1B3D' }} />
              <h2 className="text-2xl font-black text-gray-900">الرسوم البيانية والتحليلات</h2>
            </div>
            <div className="section-divider mb-6 w-16" />

            <div className="grid md:grid-cols-2 gap-6">
              {/* Bar chart */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-4">التشريعات حسب السنة</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={lawsByYear} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" tick={{ fontSize: 11, fontFamily: 'Lusail' }} />
                    <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                    <Tooltip
                      formatter={(v) => [`${v} تشريع`, 'العدد']}
                      contentStyle={{ fontFamily: 'Lusail', fontSize: 12, direction: 'rtl' }}
                    />
                    <Bar dataKey="count" fill="#8D1B3D" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie chart */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-4">توزيع التشريعات حسب النوع</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={typeDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {typeDistribution.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v, name) => [`${v}`, name]}
                      contentStyle={{ fontFamily: 'Lusail', fontSize: 12, direction: 'rtl' }}
                    />
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      formatter={(value) => <span style={{ fontSize: 11, fontFamily: 'Lusail' }}>{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Summary table */}
              <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-4">ملخص الإطار التشريعي</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-right py-2 px-3 font-bold text-gray-700">المرجع</th>
                        <th className="text-right py-2 px-3 font-bold text-gray-700">النوع</th>
                        <th className="text-right py-2 px-3 font-bold text-gray-700">السنة</th>
                        <th className="text-right py-2 px-3 font-bold text-gray-700">الجهة</th>
                        <th className="text-right py-2 px-3 font-bold text-gray-700">الأهمية</th>
                      </tr>
                    </thead>
                    <tbody>
                      {laws.map((law, i) => (
                        <tr key={law.id} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-gray-50/50' : ''}`}>
                          <td className="py-2 px-3 font-medium text-gray-900">{law.title}</td>
                          <td className="py-2 px-3">
                            <span
                              className="px-2 py-0.5 rounded-full text-white text-xs"
                              style={{ backgroundColor: typeColors[law.type] }}
                            >
                              {typeLabels[law.type]}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-gray-600">{law.year}</td>
                          <td className="py-2 px-3 text-gray-600">{law.authority}</td>
                          <td className="py-2 px-3">
                            {law.importance === 'high' ? (
                              <span className="flex items-center gap-1 text-yellow-600 font-semibold">
                                <Star size={12} className="fill-yellow-500" /> عالية
                              </span>
                            ) : (
                              <span className="text-gray-400">متوسطة</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparative Study Section */}
        <section id="study" className="border-t border-gray-100">
          <ComparativeStudy />
        </section>

        {/* Action Plan Section */}
        <section id="actionplan" className="border-t border-gray-100">
          <ActionPlan />
        </section>

        {/* Glossary Section */}
        <section id="glossary" className="border-t border-gray-100">
          <GlossarySection />
        </section>

        {/* Research Studies Section */}
        <section id="research" className="border-t border-gray-100 bg-[#071525]">
          <ResearchStudiesSection />
        </section>

        {/* References Section */}
        <section id="references" className="px-6 py-10 lg:px-12 bg-gray-50/50 border-t border-gray-100">
          <div className="max-w-5xl">
            <ReferencesSection />
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-8 lg:px-12 border-t border-gray-200 bg-white">
          <div className="max-w-5xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Shield size={16} style={{ color: '#8D1B3D' }} />
                  <span className="text-sm font-bold text-gray-900">لجنة السلامة الرقمية للأطفال والنشء</span>
                </div>
                <p className="text-xs text-gray-500">
                  تقرير بحثي يستند إلى المصادر الرسمية القطرية والمراجع الأكاديمية المحكّمة
                </p>
              </div>
              <div className="text-xs text-gray-400 text-left md:text-right">
                <p>المصادر: البوابة القانونية القطرية، الوكالة الوطنية للأمن السيبراني،</p>
                <p>وزارة الاتصالات وتكنولوجيا المعلومات، الأمم المتحدة</p>
                <p className="mt-1 font-medium" style={{ color: '#8D1B3D' }}>آخر تحديث: أبريل 2026</p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Advanced Search Modal */}
      <AdvancedSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-50 w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          style={{ backgroundColor: '#8D1B3D' }}
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}
