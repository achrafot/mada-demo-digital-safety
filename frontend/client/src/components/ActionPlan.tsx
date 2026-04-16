/**
 * ActionPlan Component - Qatar Digital Safety
 * Design: Modern Arabic Institutional
 * Colors: Qatar maroon (#8D1B3D) + gold (#C9A84C) + navy (#1C2B3A)
 * Source: نموذج التقييم - قرار مجلس الوزراء 38/2025
 *
 * Three phases: التأسيس (0-3m) → التفعيل (3-9m) → التمكين (9-12m)
 * Edit mode: inline slider + quick presets per KPI, persisted in localStorage
 * FIX: No nested <button> elements — lead link uses <span role="button">
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  CheckCircle, Clock, Target, Users, ArrowLeft,
  ChevronDown, ChevronUp, BarChart2, Layers, TrendingUp,
  Pencil, Save, RotateCcw, X,
} from 'lucide-react';

interface KPI {
  text: string;
  progress: number;
  status: 'completed' | 'in-progress' | 'pending';
}

interface Initiative {
  title: string;
  lead: string;
  leadId: string;
  kpis: KPI[];
}

interface PhaseData {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  period: string;
  color: string;
  bgColor: string;
  description: string;
  initiatives: Initiative[];
}

const defaultPhases: PhaseData[] = [
  {
    id: 'phase1',
    number: 1,
    title: 'التأسيس',
    subtitle: 'بناء الأساس المؤسسي',
    period: 'الأشهر 0 – 3',
    color: '#8D1B3D',
    bgColor: '#FDF2F5',
    description: 'تُركّز هذه المرحلة على وضع الأساس المؤسسي والتشريعي للمنظومة الوطنية للسلامة الرقمية، وتشمل اعتماد الإطار الوطني، وتقييم الوضع الراهن (Baseline)، وإعداد السياسة الوطنية الشاملة.',
    initiatives: [
      {
        title: 'اعتماد الإطار الوطني للسلامة الرقمية للأطفال',
        lead: 'وزارة التنمية الاجتماعية والأسرة',
        leadId: 'msf',
        kpis: [
          { text: 'صدور وثيقة الإطار الوطني المعتمدة', progress: 85, status: 'in-progress' },
          { text: 'توقيع مذكرات التفاهم بين الجهات', progress: 60, status: 'in-progress' },
          { text: 'تشكيل الأمانة الفنية الدائمة للجنة', progress: 100, status: 'completed' },
        ],
      },
      {
        title: 'تنفيذ تقييم الوضع الراهن (Baseline) لجميع الجهات',
        lead: 'جميع الجهات الأعضاء',
        leadId: 'msf',
        kpis: [
          { text: 'إتمام تقييم 13 جهة وفق النموذج الموحد', progress: 70, status: 'in-progress' },
          { text: 'رفع تقارير التقييم للجنة الوطنية', progress: 50, status: 'in-progress' },
          { text: 'تحديد الفجوات الأولوية لكل جهة', progress: 40, status: 'in-progress' },
        ],
      },
      {
        title: 'إعداد السياسة الوطنية الشاملة للسلامة الرقمية',
        lead: 'وزارة التنمية الاجتماعية + وزارة الاتصالات',
        leadId: 'mcit',
        kpis: [
          { text: 'إعداد مسودة السياسة الوطنية', progress: 75, status: 'in-progress' },
          { text: 'استشارة الجهات المعنية', progress: 55, status: 'in-progress' },
          { text: 'اعتماد السياسة من مجلس الوزراء', progress: 20, status: 'pending' },
        ],
      },
      {
        title: 'تطوير نموذج التقييم الموحد لجميع الجهات',
        lead: 'وزارة التنمية الاجتماعية والأسرة',
        leadId: 'msf',
        kpis: [
          { text: 'اعتماد النموذج الموحد من اللجنة', progress: 100, status: 'completed' },
          { text: 'تدريب مسؤولي التقييم في الجهات', progress: 80, status: 'in-progress' },
          { text: 'إطلاق منصة إلكترونية لإدارة التقييمات', progress: 35, status: 'pending' },
        ],
      },
    ],
  },
  {
    id: 'phase2',
    number: 2,
    title: 'التفعيل',
    subtitle: 'تشغيل البرامج والمبادرات',
    period: 'الأشهر 3 – 9',
    color: '#C9A84C',
    bgColor: '#FDFAF0',
    description: 'تُركّز هذه المرحلة على تشغيل البرامج والمبادرات الميدانية، وإطلاق قنوات الإبلاغ، وتفعيل برامج التوعية والتدريب، وإدماج السلامة الرقمية في المناهج الدراسية.',
    initiatives: [
      {
        title: 'إطلاق منصة التوعية الوطنية الرقمية',
        lead: 'وزارة الاتصالات + وزارة التنمية الاجتماعية',
        leadId: 'mcit',
        kpis: [
          { text: 'إطلاق المنصة الإلكترونية للتوعية', progress: 45, status: 'in-progress' },
          { text: 'الوصول إلى 50,000 مستخدم في الشهر الأول', progress: 20, status: 'pending' },
          { text: 'نشر 100 مادة توعوية مرخصة', progress: 30, status: 'pending' },
        ],
      },
      {
        title: 'تشغيل قنوات الإبلاغ عن الحوادث الرقمية',
        lead: 'وزارة الداخلية',
        leadId: 'moi',
        kpis: [
          { text: 'تفعيل خط ساخن مخصص للأطفال', progress: 65, status: 'in-progress' },
          { text: 'معالجة 90% من البلاغات خلال 48 ساعة', progress: 40, status: 'pending' },
          { text: 'تدريب 200 ضابط متخصص في الجرائم الرقمية', progress: 55, status: 'in-progress' },
        ],
      },
      {
        title: 'إطلاق برنامج التدريب الحكومي للكوادر',
        lead: 'الوكالة الوطنية للأمن السيبراني',
        leadId: 'ncsa',
        kpis: [
          { text: 'تدريب 500 موظف حكومي في المرحلة الأولى', progress: 50, status: 'in-progress' },
          { text: 'اعتماد 3 برامج تدريبية متخصصة', progress: 70, status: 'in-progress' },
          { text: 'إصدار شهادات كفاءة معتمدة', progress: 25, status: 'pending' },
        ],
      },
      {
        title: 'إدماج السلامة الرقمية في المناهج الدراسية (نسخة أولية)',
        lead: 'وزارة التربية والتعليم والتعليم العالي',
        leadId: 'moe',
        kpis: [
          { text: 'إدماج وحدات السلامة الرقمية في 3 مراحل دراسية', progress: 35, status: 'pending' },
          { text: 'تدريب 1,000 معلم على المحتوى الجديد', progress: 20, status: 'pending' },
          { text: 'تطوير أدوات تقييم الطلاب', progress: 15, status: 'pending' },
        ],
      },
      {
        title: 'إطلاق خدمات الدعم النفسي للأطفال المتضررين',
        lead: 'وزارة الصحة العامة',
        leadId: 'moph',
        kpis: [
          { text: 'فتح 5 عيادات متخصصة في الصحة النفسية الرقمية', progress: 30, status: 'pending' },
          { text: 'تدريب 100 معالج نفسي على الإدمان الرقمي', progress: 40, status: 'in-progress' },
          { text: 'تطوير بروتوكول الاستجابة للحوادث', progress: 55, status: 'in-progress' },
        ],
      },
      {
        title: 'تأسيس المركز الوطني للتبليغ عن المخاطر الرقمية',
        lead: 'وزارة الداخلية + وزارة التنمية الاجتماعية والأسرة',
        leadId: 'moi',
        kpis: [
          { text: 'إنشاء البنية التحتية التقنية للمركز (منصة، خوادم، نظام إدارة البلاغات)', progress: 20, status: 'pending' },
          { text: 'تفعيل رقم وطني موحد للتبليغ (مجاني ومتاح 24/7)', progress: 10, status: 'pending' },
          { text: 'إطلاق تطبيق جوال للتبليغ الفوري عن المخاطر الرقمية', progress: 5, status: 'pending' },
          { text: 'تدريب 150 متخصصاً في استقبال البلاغات ومعالجتها', progress: 15, status: 'pending' },
          { text: 'إبرام بروتوكولات تعاون مع منصات التواصل الاجتماعي الكبرى', progress: 8, status: 'pending' },
          { text: 'إصدار أول تقرير ربعي لإحصاءات البلاغات والحوادث', progress: 0, status: 'pending' },
        ],
      },
    ],
  },
  {
    id: 'phase3',
    number: 3,
    title: 'التمكين',
    subtitle: 'التكامل والاستدامة',
    period: 'الأشهر 9 – 12',
    color: '#1C2B3A',
    bgColor: '#F0F4F8',
    description: 'تُركّز هذه المرحلة على تحقيق التكامل الكامل بين الجهات، وإصدار أول تقرير وطني، وتفعيل منظومة القياس والمتابعة، وإطلاق برامج الشباب والتوعية المجتمعية.',
    initiatives: [
      {
        title: 'تطبيق منظومة التقييم والمتابعة على جميع الجهات',
        lead: 'وزارة التنمية الاجتماعية والأسرة',
        leadId: 'msf',
        kpis: [
          { text: 'تطبيق نظام المتابعة على 13 جهة', progress: 10, status: 'pending' },
          { text: 'إصدار تقارير أداء ربع سنوية', progress: 5, status: 'pending' },
          { text: 'رفع نسبة الامتثال إلى 80%', progress: 0, status: 'pending' },
        ],
      },
      {
        title: 'إصدار أول تقرير وطني للسلامة الرقمية للأطفال',
        lead: 'وزارة التنمية الاجتماعية والأسرة',
        leadId: 'msf',
        kpis: [
          { text: 'نشر التقرير الوطني الأول', progress: 5, status: 'pending' },
          { text: 'تضمين بيانات جميع الجهات الـ 13', progress: 0, status: 'pending' },
          { text: 'مشاركة التقرير مع الهيئات الدولية', progress: 0, status: 'pending' },
        ],
      },
      {
        title: 'تفعيل التنسيق المؤسسي الكامل بين جميع الجهات',
        lead: 'جميع الجهات الأعضاء',
        leadId: 'msf',
        kpis: [
          { text: 'عقد اجتماعات تنسيق شهرية منتظمة', progress: 15, status: 'pending' },
          { text: 'تفعيل منصة تبادل المعلومات بين الجهات', progress: 10, status: 'pending' },
          { text: 'حل 95% من التعارضات في الأدوار', progress: 0, status: 'pending' },
        ],
      },
      {
        title: 'إطلاق برامج الشباب والتوعية المجتمعية',
        lead: 'وزارة الشباب والرياضة + وزارة الثقافة',
        leadId: 'moys',
        kpis: [
          { text: 'إطلاق 10 برامج توعوية للشباب', progress: 5, status: 'pending' },
          { text: 'الوصول إلى 100,000 شاب وشابة', progress: 0, status: 'pending' },
          { text: 'إنتاج 50 محتوى رقمي وطني آمن', progress: 0, status: 'pending' },
        ],
      },
      {
        title: 'تحسين منظومة الاستجابة للحوادث الرقمية',
        lead: 'الوكالة الوطنية للأمن السيبراني + وزارة الداخلية',
        leadId: 'ncsa',
        kpis: [
          { text: 'تقليص زمن الاستجابة للحوادث إلى أقل من 24 ساعة', progress: 10, status: 'pending' },
          { text: 'ربط أنظمة الإبلاغ بين الجهات', progress: 5, status: 'pending' },
          { text: 'إصدار تقارير تحليل التهديدات شهرياً', progress: 0, status: 'pending' },
        ],
      },
    ],
  },
];

const STORAGE_KEY = 'qatar-action-plan-progress';
const STORAGE_TS_KEY = 'qatar-action-plan-progress-ts';

function deriveStatus(progress: number): KPI['status'] {
  if (progress >= 100) return 'completed';
  if (progress > 0) return 'in-progress';
  return 'pending';
}

function buildDefaultMap(): Record<string, { progress: number; status: KPI['status'] }> {
  const map: Record<string, { progress: number; status: KPI['status'] }> = {};
  defaultPhases.forEach(phase => {
    phase.initiatives.forEach((init, iIdx) => {
      init.kpis.forEach((kpi, kIdx) => {
        map[`${phase.id}-${iIdx}-${kIdx}`] = { progress: kpi.progress, status: kpi.status };
      });
    });
  });
  return map;
}

// ─── Animated progress bar ───────────────────────────────────────────────────
function AnimatedProgressBar({ value, color, status }: { value: number; color: string; status: KPI['status'] }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    animated.current = false;
    setDisplayValue(0);
  }, [value]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true;
          let start = 0;
          const duration = 800;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setDisplayValue(Math.floor(progress * value));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  const statusConfig = {
    completed: { label: 'مكتمل', bg: '#D1FAE5', text: '#065F46', dot: '#10B981' },
    'in-progress': { label: 'جارٍ', bg: '#FEF3C7', text: '#92400E', dot: '#F59E0B' },
    pending: { label: 'قادم', bg: '#F3F4F6', text: '#6B7280', dot: '#9CA3AF' },
  };
  const cfg = statusConfig[status];

  return (
    <div ref={ref} className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: cfg.bg, color: cfg.text }}>
          <span className="inline-block w-1.5 h-1.5 rounded-full mr-1" style={{ background: cfg.dot }} />
          {cfg.label}
        </span>
        <span className="text-xs font-bold tabular-nums" style={{ color }}>{displayValue}%</span>
      </div>
      <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${displayValue}%`,
            background: status === 'completed'
              ? 'linear-gradient(90deg, #10B981, #059669)'
              : status === 'in-progress'
              ? `linear-gradient(90deg, ${color}, ${color}99)`
              : '#D1D5DB',
          }}
        />
      </div>
    </div>
  );
}

// ─── KPI Edit Row (slider + quick presets) ────────────────────────────────────
function KpiEditRow({
  kpi,
  color,
  onUpdate,
}: {
  kpi: KPI;
  color: string;
  onUpdate: (progress: number, status: KPI['status']) => void;
}) {
  const [localProgress, setLocalProgress] = useState(kpi.progress);
  const localStatus = deriveStatus(localProgress);

  const statusConfig = {
    completed: { label: 'مكتمل', bg: '#D1FAE5', text: '#065F46' },
    'in-progress': { label: 'جارٍ', bg: '#FEF3C7', text: '#92400E' },
    pending: { label: 'قادم', bg: '#F3F4F6', text: '#6B7280' },
  };
  const cfg = statusConfig[localStatus];

  const handleChange = (val: number) => {
    setLocalProgress(val);
    onUpdate(val, deriveStatus(val));
  };

  return (
    <div className="bg-white rounded-xl px-4 py-3 border-2 border-dashed shadow-sm" style={{ borderColor: color + '55' }}>
      <p className="text-xs text-gray-800 font-medium mb-3 leading-relaxed">{kpi.text}</p>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: cfg.bg, color: cfg.text }}>
          {cfg.label}
        </span>
        <span className="text-sm font-bold tabular-nums flex-shrink-0 w-10 text-left" style={{ color }}>
          {localProgress}%
        </span>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={localProgress}
          onChange={(e) => handleChange(Number(e.target.value))}
          className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
          style={{ accentColor: color }}
        />
      </div>
      <div className="flex gap-1 flex-wrap">
        {[0, 25, 50, 75, 100].map(v => (
          <button
            key={v}
            type="button"
            onClick={() => handleChange(v)}
            className="text-[10px] px-2 py-0.5 rounded-full border transition-all"
            style={{
              borderColor: localProgress === v ? color : '#E5E7EB',
              background: localProgress === v ? color : 'white',
              color: localProgress === v ? 'white' : '#6B7280',
              fontWeight: localProgress === v ? 700 : 400,
            }}
          >
            {v}%
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ActionPlan() {
  const [activePhase, setActivePhase] = useState<string>('phase1');
  const [expandedInitiative, setExpandedInitiative] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // KPI progress state keyed by "phaseId-initiativeIdx-kpiIdx"
  const [kpiData, setKpiData] = useState<Record<string, { progress: number; status: KPI['status'] }>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch { /* ignore */ }
    return buildDefaultMap();
  });

  useEffect(() => {
    const ts = localStorage.getItem(STORAGE_TS_KEY);
    if (ts) setSavedAt(ts);
  }, []);

  const getKpi = useCallback((phaseId: string, iIdx: number, kIdx: number): KPI => {
    const key = `${phaseId}-${iIdx}-${kIdx}`;
    const stored = kpiData[key];
    const base = defaultPhases.find(p => p.id === phaseId)!.initiatives[iIdx].kpis[kIdx];
    return stored ? { ...base, progress: stored.progress, status: stored.status } : base;
  }, [kpiData]);

  const updateKpi = useCallback((phaseId: string, iIdx: number, kIdx: number, progress: number, status: KPI['status']) => {
    setKpiData(prev => ({ ...prev, [`${phaseId}-${iIdx}-${kIdx}`]: { progress, status } }));
  }, []);

  const handleSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(kpiData));
      const now = new Date().toLocaleString('ar-QA', { dateStyle: 'short', timeStyle: 'short' });
      localStorage.setItem(STORAGE_TS_KEY, now);
      setSavedAt(now);
    } catch { /* ignore */ }
    setEditMode(false);
  };

  const handleReset = () => {
    const map = buildDefaultMap();
    setKpiData(map);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_TS_KEY);
    setSavedAt(null);
    setShowResetConfirm(false);
    setEditMode(false);
  };

  const phaseProgress = useCallback((phaseId: string) => {
    const phase = defaultPhases.find(p => p.id === phaseId)!;
    const all = phase.initiatives.flatMap((_, iIdx) =>
      _.kpis.map((_k, kIdx) => getKpi(phaseId, iIdx, kIdx).progress)
    );
    return Math.round(all.reduce((s, v) => s + v, 0) / all.length);
  }, [getKpi]);

  const scrollToInstitution = (institutionId: string) => {
    const section = document.getElementById('institutions');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const cards = document.querySelectorAll('[data-institution-id]');
        cards.forEach(card => {
          if ((card as HTMLElement).dataset.institutionId === institutionId) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.classList.add('ring-2', 'ring-yellow-400');
            setTimeout(() => card.classList.remove('ring-2', 'ring-yellow-400'), 3000);
          }
        });
      }, 800);
    }
  };

  const currentPhase = defaultPhases.find(p => p.id === activePhase)!;

  const phaseIcon = (id: string) => {
    if (id === 'phase1') return <Layers size={22} />;
    if (id === 'phase2') return <Target size={22} />;
    return <CheckCircle size={22} />;
  };

  return (
    <div className="px-6 py-10 lg:px-12" dir="rtl" style={{ background: 'linear-gradient(135deg, #FAF8F5 0%, #F5F0E8 100%)' }}>
      <div className="max-w-5xl">

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-8 rounded-full" style={{ background: '#C9A84C' }} />
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#C9A84C' }}>
                خطة العمل التنفيذية
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#1C2B3A', fontFamily: 'Cairo, sans-serif' }}>
              خطة العمل الثلاثية (12 شهراً)
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">
              مستمدة من نموذج التقييم الموحد وقرار مجلس الوزراء رقم 38 لسنة 2025.
            </p>
            {savedAt && (
              <p className="text-xs text-green-700 mt-1 flex items-center gap-1">
                <CheckCircle size={12} />
                آخر حفظ: {savedAt}
              </p>
            )}
          </div>

          {/* Edit controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {!editMode ? (
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 shadow-sm"
                style={{ background: '#8D1B3D' }}
              >
                <Pencil size={14} />
                تحديث نسب الإنجاز
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-all"
                >
                  <RotateCcw size={13} />
                  إعادة تعيين
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-all"
                >
                  <X size={13} />
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90 shadow-sm"
                  style={{ background: '#10B981' }}
                >
                  <Save size={14} />
                  حفظ التغييرات
                </button>
              </>
            )}
          </div>
        </div>

        {/* Edit mode banner */}
        {editMode && (
          <div className="mb-6 rounded-xl px-5 py-3 flex items-center gap-3 border" style={{ background: '#FFF7ED', borderColor: '#C9A84C' }}>
            <Pencil size={16} style={{ color: '#C9A84C' }} />
            <p className="text-sm text-amber-800 font-medium">
              وضع التحديث مفعّل — افتح أي مبادرة واستخدم شريط التمرير لتعديل نسبة الإنجاز، ثم اضغط <strong>حفظ التغييرات</strong>.
            </p>
          </div>
        )}

        {/* Reset Confirm Modal */}
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowResetConfirm(false)}>
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4" dir="rtl" onClick={e => e.stopPropagation()}>
              <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>
                تأكيد إعادة التعيين
              </h3>
              <p className="text-sm text-gray-600 mb-5">
                سيتم حذف جميع التغييرات المحفوظة وإعادة نسب الإنجاز إلى القيم الافتراضية. هل تريد المتابعة؟
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 py-2 rounded-lg text-sm font-bold text-white"
                  style={{ background: '#8D1B3D' }}
                >
                  نعم، إعادة تعيين
                </button>
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-2 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Phase Timeline Tabs ─────────────────────────────────────────────── */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {defaultPhases.map((phase, idx) => {
            const prog = phaseProgress(phase.id);
            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => setActivePhase(phase.id)}
                className="flex-shrink-0 flex flex-col gap-2 px-5 py-3 rounded-xl border-2 transition-all duration-300 min-w-[160px]"
                style={{
                  borderColor: activePhase === phase.id ? phase.color : '#E5E7EB',
                  background: activePhase === phase.id ? phase.bgColor : 'white',
                  boxShadow: activePhase === phase.id ? `0 4px 12px ${phase.color}22` : 'none',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ background: activePhase === phase.id ? phase.color : '#9CA3AF' }}
                  >
                    {phase.number}
                  </div>
                  <div className="text-right flex-1">
                    <div className="font-bold text-sm" style={{ color: activePhase === phase.id ? phase.color : '#374151' }}>
                      {phase.title}
                    </div>
                    <div className="text-xs text-gray-500">{phase.period}</div>
                  </div>
                  {idx < defaultPhases.length - 1 && (
                    <ArrowLeft size={14} className="text-gray-300 flex-shrink-0 hidden md:block" />
                  )}
                </div>
                <div className="w-full">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-gray-500">الإنجاز الكلي</span>
                    <span className="text-[10px] font-bold" style={{ color: phase.color }}>{prog}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${prog}%`, background: phase.color }} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Active Phase Content ────────────────────────────────────────────── */}
        <div className="rounded-2xl border-2 overflow-hidden mb-8" style={{ borderColor: currentPhase.color }}>

          {/* Phase Header */}
          <div className="px-6 py-5 flex items-start gap-4" style={{ background: currentPhase.color }}>
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white flex-shrink-0">
              {phaseIcon(currentPhase.id)}
            </div>
            <div className="text-white flex-1">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <span className="text-xs font-medium bg-white/20 px-3 py-1 rounded-full">
                  المرحلة {currentPhase.number}
                </span>
                <span className="text-xs bg-white/20 px-3 py-1 rounded-full flex items-center gap-1">
                  <Clock size={11} />
                  {currentPhase.period}
                </span>
                <span className="text-xs bg-white/30 px-3 py-1 rounded-full flex items-center gap-1 font-bold">
                  <TrendingUp size={11} />
                  {phaseProgress(activePhase)}% إنجاز
                </span>
                {editMode && (
                  <span className="text-xs bg-yellow-400/80 text-yellow-900 px-3 py-1 rounded-full flex items-center gap-1 font-bold">
                    <Pencil size={10} />
                    وضع التحديث
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold" style={{ fontFamily: 'Cairo, sans-serif' }}>
                {currentPhase.title}: {currentPhase.subtitle}
              </h3>
              <p className="text-sm text-white/80 mt-1 leading-relaxed max-w-2xl">
                {currentPhase.description}
              </p>
            </div>
          </div>

          {/* Initiatives list */}
          <div className="divide-y divide-gray-100" style={{ background: currentPhase.bgColor }}>
            {currentPhase.initiatives.map((initiative, iIdx) => {
              const isExpanded = expandedInitiative === `${activePhase}-${iIdx}`;
              const avgProgress = Math.round(
                initiative.kpis.reduce((_s, _k, kIdx) => _s + getKpi(activePhase, iIdx, kIdx).progress, 0) / initiative.kpis.length
              );

              return (
                <div key={iIdx} className="transition-all duration-200">
                  {/*
                    IMPORTANT: The outer element is a <div> (not <button>) so that
                    the inner "lead" span[role=button] does NOT create nested buttons.
                    We use onClick + keyboard handler for accessibility.
                  */}
                  <div
                    role="button"
                    tabIndex={0}
                    className="w-full text-right px-6 py-4 flex items-start gap-4 hover:bg-white/60 transition-colors cursor-pointer"
                    onClick={() => setExpandedInitiative(isExpanded ? null : `${activePhase}-${iIdx}`)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setExpandedInitiative(isExpanded ? null : `${activePhase}-${iIdx}`);
                      }
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                      style={{ background: currentPhase.color }}
                    >
                      {iIdx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-gray-900 mb-1">{initiative.title}</div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Users size={12} className="text-gray-400 flex-shrink-0" />
                          {/* span[role=button] avoids nested <button> inside the outer div[role=button] */}
                          <span
                            role="button"
                            tabIndex={0}
                            className="text-xs font-medium hover:underline transition-colors cursor-pointer"
                            style={{ color: currentPhase.color }}
                            onClick={(e) => {
                              e.stopPropagation();
                              scrollToInstitution(initiative.leadId);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.stopPropagation();
                                scrollToInstitution(initiative.leadId);
                              }
                            }}
                          >
                            {initiative.lead}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-16 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${avgProgress}%`, background: currentPhase.color }} />
                          </div>
                          <span className="text-[10px] font-bold" style={{ color: currentPhase.color }}>{avgProgress}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-gray-400 mt-0.5">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {/* KPIs */}
                  {isExpanded && (
                    <div className="px-6 pb-5 mr-11">
                      <div className="flex items-center gap-2 mb-3">
                        <BarChart2 size={14} style={{ color: currentPhase.color }} />
                        <span className="text-xs font-semibold text-gray-700">
                          مؤشرات قياس الأداء (KPIs)
                          {editMode && <span className="mr-2 text-amber-600 font-normal">— وضع التحديث مفعّل</span>}
                        </span>
                      </div>
                      <div className="space-y-3">
                        {initiative.kpis.map((_kpi, kIdx) => {
                          const kpi = getKpi(activePhase, iIdx, kIdx);
                          return editMode ? (
                            <KpiEditRow
                              key={kIdx}
                              kpi={kpi}
                              color={currentPhase.color}
                              onUpdate={(progress, status) => updateKpi(activePhase, iIdx, kIdx, progress, status)}
                            />
                          ) : (
                            <div key={kIdx} className="bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm">
                              <p className="text-xs text-gray-800 font-medium mb-2 leading-relaxed">{kpi.text}</p>
                              <AnimatedProgressBar value={kpi.progress} color={currentPhase.color} status={kpi.status} />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Summary Table ───────────────────────────────────────────────────── */}
        <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
          <div className="px-5 py-4 border-b border-gray-100" style={{ background: '#1C2B3A' }}>
            <h4 className="text-sm font-bold text-white" style={{ fontFamily: 'Cairo, sans-serif' }}>
              ملخص الخطة الثلاثية — توزيع المبادرات والجهات القائدة
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-right px-4 py-3 font-semibold text-gray-700 text-xs">المرحلة</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-700 text-xs">الفترة</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-700 text-xs">عدد المبادرات</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-700 text-xs">نسبة الإنجاز</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-700 text-xs">الجهة القائدة الرئيسية</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {defaultPhases.map(phase => {
                  const prog = phaseProgress(phase.id);
                  return (
                    <tr
                      key={phase.id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setActivePhase(phase.id)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ background: phase.color }} />
                          <span className="font-semibold" style={{ color: phase.color }}>{phase.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-xs">{phase.period}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-bold" style={{ background: phase.color }}>
                          {phase.initiatives.length}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 rounded-full bg-gray-200 overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${prog}%`, background: phase.color }} />
                          </div>
                          <span className="text-xs font-bold" style={{ color: phase.color }}>{prog}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-700 text-xs">وزارة التنمية الاجتماعية والأسرة (MSDF)</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 bg-amber-50 border-t border-amber-100">
            <p className="text-xs text-amber-800">
              <strong>المصدر:</strong> نموذج التقييم الموحد المرفق — قرار مجلس الوزراء رقم 38 لسنة 2025 بشأن إنشاء لجنة السلامة الرقمية للأطفال والنشء
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
