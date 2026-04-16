/**
 * CommitteeSection — لجنة السلامة الرقمية للأطفال والنشء
 * Design: Qatar Institutional — maroon (#8D1B3D) + navy (#1C2B3A) + gold (#C9A84C)
 * Content: قرار الإنشاء رقم (38) لسنة 2025 + أسماء الأعضاء + الاختصاصات
 */

import { useState } from 'react';
import {
  Shield, Users, FileText, ChevronDown, ChevronUp,
  Building2, Star, Calendar, Target, Award, ExternalLink,
  CheckCircle2, Gavel, Landmark
} from 'lucide-react';

// ── بيانات قرار الإنشاء ──────────────────────────────────────────────────────
const DECREE = {
  number: '38',
  year: '2025',
  date: 'مارس 2025',
  issuedBy: 'مجلس الوزراء',
  publishedIn: 'الجريدة الرسمية القطرية',
  title: 'قرار مجلس الوزراء رقم (38) لسنة 2025',
  subtitle: 'بشأن إنشاء لجنة السلامة الرقمية للأطفال والنشء',
  preamble:
    'استناداً إلى أحكام الدستور الدائم لدولة قطر، وإلى القانون رقم (14) لسنة 2014 بشأن مكافحة الجرائم الإلكترونية، والقانون رقم (13) لسنة 2016 بشأن حماية خصوصية البيانات الشخصية، وتحقيقاً لأهداف رؤية قطر الوطنية 2030 في محور التنمية البشرية وحماية الطفل.',
  articles: [
    {
      number: '1',
      title: 'الإنشاء والتسمية',
      text: 'تُنشأ لجنة وطنية متخصصة تُسمى "لجنة السلامة الرقمية للأطفال والنشء"، تتمتع بالشخصية الاعتبارية وتخضع لإشراف مجلس الوزراء.',
    },
    {
      number: '2',
      title: 'الرئاسة والنيابة',
      text: 'تترأس اللجنة وزارة التنمية الاجتماعية والأسرة، وتتولى نيابة الرئاسة الوكالة الوطنية للأمن السيبراني (NCSA).',
    },
    {
      number: '3',
      title: 'التشكيل',
      text: 'تتشكل اللجنة من ممثلين عن الوزارات والجهات الحكومية والمؤسسات الأكاديمية والمجتمعية المعنية بحماية الأطفال في الفضاء الرقمي، ويصدر بتحديد أعضائها قرار من رئيس مجلس الوزراء.',
    },
    {
      number: '4',
      title: 'الاجتماعات',
      text: 'تجتمع اللجنة بصفة دورية مرة على الأقل كل شهرين، وكلما دعت الحاجة بدعوة من رئيسها، وتُعقد اجتماعاتها بحضور أغلبية أعضائها.',
    },
    {
      number: '5',
      title: 'الأمانة العامة',
      text: 'تتولى وزارة التنمية الاجتماعية والأسرة الأمانة العامة للجنة، وتتولى إعداد جداول الأعمال وتوثيق القرارات ومتابعة تنفيذها.',
    },
    {
      number: '6',
      title: 'التمويل',
      text: 'تُخصص للجنة الاعتمادات المالية اللازمة لتنفيذ مهامها ضمن ميزانية وزارة التنمية الاجتماعية والأسرة، وفق الأنظمة المالية المعمول بها.',
    },
  ],
  mandates: [
    'وضع الاستراتيجية الوطنية لحماية الأطفال في الفضاء الرقمي وتحديثها دورياً',
    'تنسيق الجهود بين الجهات الحكومية والخاصة والمجتمعية لضمان بيئة رقمية آمنة للأطفال',
    'إعداد السياسات والتشريعات المتعلقة بالسلامة الرقمية للأطفال واقتراح تعديلاتها',
    'الإشراف على تنفيذ برامج التوعية والتثقيف الرقمي الموجهة للأطفال وأسرهم والمعلمين',
    'متابعة الالتزام بمعايير حماية بيانات الأطفال من قِبل مزودي الخدمات الرقمية',
    'التنسيق مع المنظمات الدولية المعنية بحماية الأطفال في الفضاء الرقمي',
    'رصد المستجدات التقنية والتشريعية الدولية ذات الصلة وتقديم التوصيات اللازمة',
    'إعداد التقارير الدورية ورفعها إلى مجلس الوزراء حول مستوى السلامة الرقمية للأطفال',
  ],
};

// ── أعضاء اللجنة ─────────────────────────────────────────────────────────────
const MEMBERS = [
  // الرئاسة
  {
    id: 'msdf-chair',
    name: 'وزير التنمية الاجتماعية والأسرة',
    role: 'رئيس اللجنة',
    institution: 'وزارة التنمية الاجتماعية والأسرة',
    shortName: 'MSDF',
    tier: 'leadership' as const,
    responsibilities: ['قيادة الاجتماعات', 'إصدار القرارات', 'التنسيق الاستراتيجي'],
  },
  {
    id: 'ncsa-vp',
    name: 'رئيس الوكالة الوطنية للأمن السيبراني',
    role: 'نائب رئيس اللجنة',
    institution: 'الوكالة الوطنية للأمن السيبراني',
    shortName: 'NCSA',
    tier: 'leadership' as const,
    responsibilities: ['الإشراف التقني', 'الأمن السيبراني', 'المعايير التقنية'],
  },
  // الأعضاء الحكوميون
  {
    id: 'mcit',
    name: 'ممثل وزارة الاتصالات وتكنولوجيا المعلومات',
    role: 'عضو',
    institution: 'وزارة الاتصالات وتكنولوجيا المعلومات',
    shortName: 'MCIT',
    tier: 'government' as const,
    responsibilities: ['السياسات الرقمية', 'تنظيم المحتوى', 'التوعية الرقمية'],
  },
  {
    id: 'moe',
    name: 'ممثل وزارة التعليم والتعليم العالي',
    role: 'عضو',
    institution: 'وزارة التعليم والتعليم العالي',
    shortName: 'MoE',
    tier: 'government' as const,
    responsibilities: ['المناهج الدراسية', 'التوعية المدرسية', 'تدريب المعلمين'],
  },
  {
    id: 'moi',
    name: 'ممثل وزارة الداخلية',
    role: 'عضو',
    institution: 'وزارة الداخلية',
    shortName: 'MoI',
    tier: 'government' as const,
    responsibilities: ['إنفاذ القانون', 'التحقيق في الجرائم الإلكترونية', 'الحماية الأمنية'],
  },
  {
    id: 'moj',
    name: 'ممثل وزارة العدل',
    role: 'عضو',
    institution: 'وزارة العدل',
    shortName: 'MoJ',
    tier: 'government' as const,
    responsibilities: ['الإطار القانوني', 'التشريعات', 'الملاحقة القضائية'],
  },
  {
    id: 'moph',
    name: 'ممثل وزارة الصحة العامة',
    role: 'عضو',
    institution: 'وزارة الصحة العامة',
    shortName: 'MoPH',
    tier: 'government' as const,
    responsibilities: ['الصحة النفسية الرقمية', 'الإدمان الرقمي', 'الدعم النفسي'],
  },
  {
    id: 'cra',
    name: 'ممثل هيئة تنظيم الاتصالات',
    role: 'عضو',
    institution: 'هيئة تنظيم الاتصالات',
    shortName: 'CRA',
    tier: 'government' as const,
    responsibilities: ['تنظيم مزودي الخدمات', 'الرقابة الأبوية', 'تصفية المحتوى'],
  },
  {
    id: 'ncsf',
    name: 'ممثل المجلس الوطني لشؤون الأسرة',
    role: 'عضو',
    institution: 'المجلس الوطني لشؤون الأسرة',
    shortName: 'NCSF',
    tier: 'government' as const,
    responsibilities: ['حماية الأسرة', 'الدعم الاجتماعي', 'برامج الوالدين'],
  },
  // الأعضاء الأكاديميون والمجتمعيون
  {
    id: 'qu',
    name: 'ممثل جامعة قطر',
    role: 'عضو',
    institution: 'جامعة قطر',
    shortName: 'QU',
    tier: 'academic' as const,
    responsibilities: ['البحث العلمي', 'الدراسات الأكاديمية', 'تطوير المناهج'],
  },
  {
    id: 'hmc',
    name: 'ممثل مؤسسة حمد الطبية',
    role: 'عضو',
    institution: 'مؤسسة حمد الطبية',
    shortName: 'HMC',
    tier: 'academic' as const,
    responsibilities: ['الدعم النفسي', 'علاج الإدمان الرقمي', 'الصحة النفسية'],
  },
  {
    id: 'qf',
    name: 'ممثل مؤسسة قطر',
    role: 'عضو',
    institution: 'مؤسسة قطر للتربية والعلوم وتنمية المجتمع',
    shortName: 'QF',
    tier: 'academic' as const,
    responsibilities: ['الابتكار التعليمي', 'البرامج التقنية', 'تمكين الشباب'],
  },
  {
    id: 'qrcs',
    name: 'ممثل الهلال الأحمر القطري',
    role: 'عضو',
    institution: 'الهلال الأحمر القطري',
    shortName: 'QRCS',
    tier: 'civil' as const,
    responsibilities: ['الدعم الإنساني', 'برامج المجتمع', 'التوعية الاجتماعية'],
  },
];

const tierConfig = {
  leadership: { label: 'القيادة', color: '#8D1B3D', bg: '#FCE4EC', icon: <Star size={14} /> },
  government:  { label: 'جهات حكومية', color: '#1C2B3A', bg: '#E8EAF6', icon: <Building2 size={14} /> },
  academic:    { label: 'أكاديمية وبحثية', color: '#1565C0', bg: '#E3F2FD', icon: <Award size={14} /> },
  civil:       { label: 'مجتمع مدني', color: '#2E7D32', bg: '#E8F5E9', icon: <Users size={14} /> },
};

// ── مكوّن بطاقة العضو ────────────────────────────────────────────────────────
function MemberCard({ member }: { member: typeof MEMBERS[0] }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = tierConfig[member.tier];

  return (
    <div
      className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
      style={{ borderRight: `3px solid ${cfg.color}` }}
    >
      <div
        role="button"
        tabIndex={0}
        className="p-4 flex items-start gap-3 cursor-pointer hover:bg-gray-50/60 transition-colors"
        onClick={() => setExpanded(!expanded)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(!expanded); } }}
      >
        {/* Tier badge */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-sm"
          style={{ backgroundColor: cfg.bg, color: cfg.color }}
        >
          {member.shortName.slice(0, 2)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span
              className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: cfg.bg, color: cfg.color }}
            >
              {cfg.icon}
              {member.role}
            </span>
          </div>
          <h4 className="text-sm font-bold text-gray-900 leading-snug">{member.name}</h4>
          <p className="text-xs text-gray-500 mt-0.5">{member.institution}</p>
        </div>

        <div className="flex-shrink-0 text-gray-400 mt-1">
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-3">
          <p className="text-xs font-semibold text-gray-600 mb-2">المهام والاختصاصات:</p>
          <div className="flex flex-wrap gap-1.5">
            {member.responsibilities.map((r, i) => (
              <span
                key={i}
                className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                style={{ backgroundColor: cfg.bg, color: cfg.color }}
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── مكوّن مادة القرار ────────────────────────────────────────────────────────
function ArticleCard({ article }: { article: typeof DECREE.articles[0] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div
        role="button"
        tabIndex={0}
        className="p-4 flex items-start gap-3 cursor-pointer hover:bg-gray-50/60 transition-colors"
        onClick={() => setExpanded(!expanded)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(!expanded); } }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-black text-sm text-white"
          style={{ backgroundColor: '#8D1B3D' }}
        >
          {article.number}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-gray-900">المادة {article.number}: {article.title}</h4>
          {!expanded && (
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{article.text}</p>
          )}
        </div>
        <div className="flex-shrink-0 text-gray-400 mt-1">
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </div>
      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-3">
          <p className="text-sm text-gray-700 leading-relaxed">{article.text}</p>
        </div>
      )}
    </div>
  );
}

// ── المكوّن الرئيسي ──────────────────────────────────────────────────────────
export default function CommitteeSection() {
  const [activeTab, setActiveTab] = useState<'decree' | 'members' | 'mandates'>('decree');

  const membersByTier = {
    leadership: MEMBERS.filter(m => m.tier === 'leadership'),
    government:  MEMBERS.filter(m => m.tier === 'government'),
    academic:    MEMBERS.filter(m => m.tier === 'academic'),
    civil:       MEMBERS.filter(m => m.tier === 'civil'),
  };

  return (
    <div className="px-6 py-10 lg:px-12 bg-white" dir="rtl">
      <div className="max-w-5xl">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield size={22} style={{ color: '#8D1B3D' }} />
            <h2 className="text-2xl font-black text-gray-900">لجنة السلامة الرقمية للأطفال والنشء</h2>
          </div>
          <div className="section-divider mb-4 w-16" />
          <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
            لجنة وطنية متخصصة أُنشئت بموجب قرار مجلس الوزراء رقم (38) لسنة 2025، تتولى قيادة التوجه الاستراتيجي الوطني لحماية الأطفال في الفضاء الرقمي وتنسيق الجهود بين جميع الجهات المعنية.
          </p>
        </div>

        {/* ── Quick Info Cards ────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <Gavel size={20} />, label: 'رقم القرار', value: '38 / 2025', color: '#8D1B3D' },
            { icon: <Calendar size={20} />, label: 'تاريخ الإصدار', value: 'مارس 2025', color: '#C9A84C' },
            { icon: <Users size={20} />, label: 'عدد الأعضاء', value: `${MEMBERS.length} عضواً`, color: '#1C2B3A' },
            { icon: <Target size={20} />, label: 'الاختصاصات', value: `${DECREE.mandates.length} اختصاصاً`, color: '#1565C0' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-center">
              <div className="flex justify-center mb-2" style={{ color: item.color }}>{item.icon}</div>
              <div className="text-lg font-black" style={{ color: item.color }}>{item.value}</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{item.label}</div>
            </div>
          ))}
        </div>

        {/* ── Tabs ────────────────────────────────────────────────────────── */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 pb-0">
          {[
            { id: 'decree' as const, label: 'قرار الإنشاء', icon: <FileText size={15} /> },
            { id: 'members' as const, label: `الأعضاء (${MEMBERS.length})`, icon: <Users size={15} /> },
            { id: 'mandates' as const, label: 'الاختصاصات', icon: <CheckCircle2 size={15} /> },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold transition-all duration-200 border-b-2 -mb-px"
              style={activeTab === tab.id
                ? { color: '#8D1B3D', borderBottomColor: '#8D1B3D' }
                : { color: '#6B7280', borderBottomColor: 'transparent' }
              }
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Tab: Decree ─────────────────────────────────────────────────── */}
        {activeTab === 'decree' && (
          <div>
            {/* Decree header card */}
            <div
              className="rounded-2xl p-6 mb-6 text-white"
              style={{ background: 'linear-gradient(135deg, #8D1B3D 0%, #5D1128 100%)' }}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Landmark size={28} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">قرار رسمي</span>
                    <span className="text-xs font-bold bg-amber-400/30 text-amber-200 px-2 py-0.5 rounded-full">
                      {DECREE.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-black leading-snug mb-1">{DECREE.title}</h3>
                  <p className="text-white/80 text-sm font-medium">{DECREE.subtitle}</p>
                  <p className="text-white/60 text-xs mt-2">صادر عن: {DECREE.issuedBy} — {DECREE.publishedIn}</p>
                </div>
              </div>
            </div>

            {/* Preamble */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <p className="text-xs font-bold text-amber-800 mb-1 flex items-center gap-1.5">
                <FileText size={13} />
                الديباجة
              </p>
              <p className="text-sm text-amber-900 leading-relaxed">{DECREE.preamble}</p>
            </div>

            {/* Articles */}
            <div>
              <h4 className="text-sm font-black text-gray-700 mb-3 flex items-center gap-2">
                <div className="w-1 h-5 rounded-full" style={{ backgroundColor: '#8D1B3D' }} />
                مواد القرار
              </h4>
              <div className="space-y-3">
                {DECREE.articles.map(article => (
                  <ArticleCard key={article.number} article={article} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Tab: Members ────────────────────────────────────────────────── */}
        {activeTab === 'members' && (
          <div className="space-y-8">
            {/* Legend */}
            <div className="flex flex-wrap gap-3">
              {(Object.keys(tierConfig) as (keyof typeof tierConfig)[]).map(tier => {
                const cfg = tierConfig[tier];
                return (
                  <div key={tier} className="flex items-center gap-1.5">
                    <span
                      className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: cfg.bg, color: cfg.color }}
                    >
                      {cfg.icon}
                      {cfg.label}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({membersByTier[tier].length})
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Leadership */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px flex-1" style={{ backgroundColor: '#8D1B3D', opacity: 0.2 }} />
                <h3 className="text-xs font-black uppercase tracking-widest" style={{ color: '#8D1B3D' }}>
                  القيادة
                </h3>
                <div className="h-px flex-1" style={{ backgroundColor: '#8D1B3D', opacity: 0.2 }} />
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {membersByTier.leadership.map(m => <MemberCard key={m.id} member={m} />)}
              </div>
            </div>

            {/* Government */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px flex-1 bg-indigo-200" />
                <h3 className="text-xs font-black uppercase tracking-widest text-indigo-700">
                  الجهات الحكومية
                </h3>
                <div className="h-px flex-1 bg-indigo-200" />
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {membersByTier.government.map(m => <MemberCard key={m.id} member={m} />)}
              </div>
            </div>

            {/* Academic */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px flex-1 bg-blue-200" />
                <h3 className="text-xs font-black uppercase tracking-widest text-blue-700">
                  الجهات الأكاديمية والبحثية
                </h3>
                <div className="h-px flex-1 bg-blue-200" />
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {membersByTier.academic.map(m => <MemberCard key={m.id} member={m} />)}
              </div>
            </div>

            {/* Civil */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px flex-1 bg-green-200" />
                <h3 className="text-xs font-black uppercase tracking-widest text-green-700">
                  المجتمع المدني
                </h3>
                <div className="h-px flex-1 bg-green-200" />
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {membersByTier.civil.map(m => <MemberCard key={m.id} member={m} />)}
              </div>
            </div>

            {/* Note */}
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <p className="text-xs text-amber-800 leading-relaxed">
                <span className="font-bold">ملاحظة: </span>
                أسماء الأعضاء المُدرجة تمثل الجهات المُعيَّنة بموجب قرار مجلس الوزراء رقم (38) لسنة 2025. يحق لكل جهة تعيين ممثلها الرسمي وفق آليات الجهة الداخلية، ويُحدَّث التشكيل بقرار من رئيس مجلس الوزراء عند الحاجة.
              </p>
            </div>
          </div>
        )}

        {/* ── Tab: Mandates ───────────────────────────────────────────────── */}
        {activeTab === 'mandates' && (
          <div>
            <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-3xl">
              تضطلع اللجنة بمجموعة من الاختصاصات الاستراتيجية والتنفيذية المُحددة في قرار إنشائها، وتعمل على تحقيقها من خلال التنسيق بين جميع الجهات الأعضاء.
            </p>
            <div className="space-y-3">
              {DECREE.mandates.map((mandate, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-xs font-black"
                    style={{ backgroundColor: i % 2 === 0 ? '#8D1B3D' : '#1C2B3A' }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-sm text-gray-800 leading-relaxed">{mandate}</p>
                </div>
              ))}
            </div>

            {/* Organizational structure note */}
            <div
              className="mt-8 rounded-2xl p-6 text-white"
              style={{ background: 'linear-gradient(135deg, #1C2B3A 0%, #2D3F52 100%)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Building2 size={20} className="text-white/80" />
                <h4 className="font-black text-base">الهيكل التنظيمي للجنة</h4>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="font-bold text-amber-300 mb-1">الرئاسة</p>
                  <p className="text-white/80 text-xs leading-relaxed">وزارة التنمية الاجتماعية والأسرة — قيادة الاجتماعات وإصدار القرارات</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="font-bold text-blue-300 mb-1">نيابة الرئاسة</p>
                  <p className="text-white/80 text-xs leading-relaxed">الوكالة الوطنية للأمن السيبراني — الإشراف التقني والأمني</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="font-bold text-green-300 mb-1">الأمانة العامة</p>
                  <p className="text-white/80 text-xs leading-relaxed">وزارة التنمية الاجتماعية والأسرة — إدارة الأعمال والتوثيق</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
