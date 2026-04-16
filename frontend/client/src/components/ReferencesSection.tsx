// Design: Modern Arabic Institutional (Qatar maroon + gold palette)
// Component: ReferencesSection — قسم المراجع والمصادر الموحد

import { useState } from 'react';
import { ExternalLink, BookOpen, Scale, FileText, Globe, FlaskConical, Landmark, ScrollText } from 'lucide-react';
import { references, type ReferenceItem } from '@/lib/data';

const typeConfig: Record<ReferenceItem['type'], { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  constitution: { label: 'دستور', icon: <Landmark size={14} />, color: '#7B1FA2', bg: '#F3E5F5' },
  law:          { label: 'قانون وطني', icon: <Scale size={14} />, color: '#1C2B3A', bg: '#E3F2FD' },
  decree:       { label: 'قرار رسمي', icon: <ScrollText size={14} />, color: '#8D1B3D', bg: '#FCE4EC' },
  strategy:     { label: 'استراتيجية', icon: <FileText size={14} />, color: '#C9A84C', bg: '#FFF8E1' },
  international:{ label: 'مرجع دولي', icon: <Globe size={14} />, color: '#00838F', bg: '#E0F7FA' },
  website:      { label: 'موقع رسمي', icon: <Globe size={14} />, color: '#2E7D32', bg: '#E8F5E9' },
  research:     { label: 'بحث وتقارير', icon: <FlaskConical size={14} />, color: '#E65100', bg: '#FFF3E0' },
};

const ALL_TYPES = 'all';
type FilterType = ReferenceItem['type'] | typeof ALL_TYPES;

const typeOrder: ReferenceItem['type'][] = [
  'constitution', 'law', 'decree', 'strategy', 'international', 'website', 'research',
];

function ReferenceCard({ ref: item }: { ref: ReferenceItem }) {
  const cfg = typeConfig[item.type];
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-4 flex flex-col gap-2">
      {/* Type badge + year */}
      <div className="flex items-center justify-between gap-2">
        <span
          className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: cfg.bg, color: cfg.color }}
        >
          {cfg.icon}
          {cfg.label}
        </span>
        {item.year && (
          <span className="text-[11px] text-gray-400 font-medium">{item.year}</span>
        )}
      </div>

      {/* Title */}
      <div>
        <h4 className="text-sm font-bold text-gray-900 leading-snug">{item.title}</h4>
        {item.subtitle && (
          <p className="text-xs text-gray-500 mt-0.5 leading-snug">{item.subtitle}</p>
        )}
      </div>

      {/* Authority */}
      {item.authority && (
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <BookOpen size={11} className="flex-shrink-0" />
          {item.authority}
        </p>
      )}

      {/* Description */}
      <p className="text-xs text-gray-600 leading-relaxed flex-1">{item.description}</p>

      {/* Link */}
      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold mt-1 transition-opacity hover:opacity-75"
          style={{ color: cfg.color }}
        >
          <ExternalLink size={12} />
          فتح المصدر
        </a>
      )}
    </div>
  );
}

export default function ReferencesSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>(ALL_TYPES);

  // Count per type
  const counts = references.reduce<Record<string, number>>((acc, r) => {
    acc[r.type] = (acc[r.type] || 0) + 1;
    return acc;
  }, {});

  const filtered = activeFilter === ALL_TYPES
    ? references
    : references.filter(r => r.type === activeFilter);

  // Group by type for display
  const grouped = typeOrder.reduce<Record<string, ReferenceItem[]>>((acc, t) => {
    const items = filtered.filter(r => r.type === t);
    if (items.length) acc[t] = items;
    return acc;
  }, {});

  return (
    <section id="references" className="py-10">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 rounded-full" style={{ backgroundColor: '#8D1B3D' }} />
        <div>
          <h2 className="text-xl font-bold text-gray-900">المراجع والمصادر</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            جميع المصادر الموثقة المستخدمة في هذا التقرير — {references.length} مرجعاً
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveFilter(ALL_TYPES)}
          className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
            activeFilter === ALL_TYPES
              ? 'text-white border-transparent'
              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
          }`}
          style={activeFilter === ALL_TYPES ? { backgroundColor: '#8D1B3D', borderColor: '#8D1B3D' } : {}}
        >
          الكل ({references.length})
        </button>
        {typeOrder.map(t => {
          if (!counts[t]) return null;
          const cfg = typeConfig[t];
          const isActive = activeFilter === t;
          return (
            <button
              key={t}
              onClick={() => setActiveFilter(t)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all"
              style={isActive
                ? { backgroundColor: cfg.color, color: '#fff', borderColor: cfg.color }
                : { backgroundColor: cfg.bg, color: cfg.color, borderColor: 'transparent' }
              }
            >
              {cfg.icon}
              {cfg.label} ({counts[t]})
            </button>
          );
        })}
      </div>

      {/* References grouped by type */}
      <div className="space-y-8">
        {Object.entries(grouped).map(([type, items]) => {
          const cfg = typeConfig[type as ReferenceItem['type']];
          return (
            <div key={type}>
              {/* Group header */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: cfg.bg, color: cfg.color }}
                >
                  {cfg.icon}
                  {cfg.label}
                </span>
                <div className="h-px flex-1" style={{ backgroundColor: cfg.color + '30' }} />
                <span className="text-xs text-gray-400">{items.length} مصدر</span>
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {items.map(item => (
                  <ReferenceCard key={item.id} ref={item} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 leading-relaxed">
        <strong>ملاحظة منهجية:</strong> تستند المعلومات الواردة في هذا التقرير إلى المصادر الرسمية المدرجة أعلاه.
        البنود المُشار إليها بأيقونة 💡 هي استنتاجات تحليلية مستمدة من السياق التشريعي العام وليست نصوصاً رسمية منقولة حرفياً.
        يُنصح بمراجعة المصادر الأصلية للتحقق من أي معلومة قبل الاستشهاد بها في وثائق رسمية.
      </div>
    </section>
  );
}
