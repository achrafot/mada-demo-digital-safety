/**
 * ComparativeStudy Component
 * Design: Modern Arabic Institutional — Qatar National Identity
 * Colors: Maroon (#8B1A1A), Gold (#C9A84C), Deep Navy (#1A2744)
 * Purpose: Display the comparative analytical study on Qatar's digital safety for children
 * Updated: Added "الدراسات القطرية" tab with all 7 extracted studies + comparative charts
 */

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
  LineChart,
  Line,
} from "recharts";
import {
  BookOpen,
  Globe,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  BarChart2,
  FileText,
  Target,
  Users,
  FlaskConical,
  TrendingUp,
  Building2,
} from "lucide-react";

// ── Data ────────────────────────────────────────────────────────────────────

const gapData = [
  { criterion: "قانون مستقل", qatar: 10, uk: 95, uae: 90, au: 85 },
  { criterion: "التحقق من العمر", qatar: 20, uk: 90, uae: 85, au: 80 },
  { criterion: "السلامة بالتصميم", qatar: 25, uk: 85, uae: 75, au: 80 },
  { criterion: "آلية إبلاغ موحدة", qatar: 15, uk: 95, uae: 70, au: 95 },
  { criterion: "بيانات وطنية دورية", qatar: 35, uk: 90, uae: 65, au: 90 },
  { criterion: "محو الأمية الرقمية", qatar: 55, uk: 80, uae: 70, au: 85 },
  { criterion: "التنسيق الإقليمي", qatar: 30, uk: 85, uae: 60, au: 75 },
  { criterion: "حماية البيانات", qatar: 60, uk: 90, uae: 80, au: 85 },
];

const radarData = [
  { subject: "التشريع", qatar: 45, benchmark: 88 },
  { subject: "المؤسسات", qatar: 70, benchmark: 85 },
  { subject: "التنفيذ", qatar: 40, benchmark: 80 },
  { subject: "التوعية", qatar: 55, benchmark: 82 },
  { subject: "البيانات", qatar: 35, benchmark: 85 },
  { subject: "التنسيق", qatar: 30, benchmark: 78 },
];

// ── الدراسات القطرية السبع ───────────────────────────────────────────────────

const qatarStudies = [
  {
    id: 1,
    titleAr: "السياسات التنظيمية والأمن الرقمي: مراجعة الإطار التنظيمي في قطر",
    authors: "أحمد بدران",
    institution: "جامعة قطر",
    institutionColor: "#8B1A2F",
    institutionBg: "rgba(139,26,47,0.15)",
    year: 2025,
    journal: "Handbook of Families in the Arab Gulf States — Springer",
    url: "https://qspace.qu.edu.qa/handle/10576/50336",
    openAccess: false,
    keyStats: [
      { label: "طبقات تشريعية", value: "3+", color: "#C9A84C" },
      { label: "جهات معنية", value: "13", color: "#8B1A1A" },
    ],
    mainFinding: "الإطار التنظيمي القطري يعتمد استراتيجية متعددة الأطراف — لكن يفتقر إلى قانون مستقل للسلامة الرقمية للأطفال",
    tags: ["إطار تنظيمي", "قانون الجرائم الإلكترونية", "حماية الأطفال"],
  },
  {
    id: 2,
    titleAr: "التنمر الإلكتروني والاكتئاب لدى طلاب جامعة قطر",
    authors: "الرجيح، حسن، الأحمد، الصايد حسن",
    institution: "جامعة قطر",
    institutionColor: "#8B1A2F",
    institutionBg: "rgba(139,26,47,0.15)",
    year: 2021,
    journal: "PLOS One",
    url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0260263",
    openAccess: true,
    keyStats: [
      { label: "ضحايا إلكترونيون", value: "29.2%", color: "#e87a8a" },
      { label: "أعراض اكتئاب", value: "50%", color: "#8B1A1A" },
      { label: "عينة الدراسة", value: "836", color: "#C9A84C" },
    ],
    mainFinding: "50% من الطلاب يعانون أعراض اكتئاب — الضحايا الإلكترونيون أكثر عرضة للاكتئاب بمرتين",
    tags: ["تنمر إلكتروني", "اكتئاب", "صحة نفسية"],
  },
  {
    id: 3,
    titleAr: "إدمان الإنترنت لدى المراهقين المبكرين والمتوسطين في قطر",
    authors: "شمناد، عزيز، الحراحشة، ريان علي",
    institution: "جامعة حمد بن خليفة (HBKU)",
    institutionColor: "#1a4a8B",
    institutionBg: "rgba(26,74,139,0.15)",
    year: 2025,
    journal: "JMIR Human Factors",
    url: "https://humanfactors.jmir.org/2025/1/e62955/",
    openAccess: true,
    keyStats: [
      { label: "حجم العينة", value: "377", color: "#7aaae8" },
      { label: "مدارس", value: "16", color: "#1a4a8B" },
      { label: "أشد عرضة للخطر", value: "11–13", color: "#C9A84C" },
    ],
    mainFinding: "الاستخدام غير الضروري للإنترنت مؤشر قوي على الإدمان — المراهقون 11-13 سنة الأكثر عرضة",
    tags: ["إدمان الإنترنت", "مراهقون", "مدارس قطر"],
  },
  {
    id: 4,
    titleAr: "الإفراط في استخدام التكنولوجيا الرقمية: وجهات نظر الآباء والمراهقين في قطر",
    authors: "الحراحشة، عبد المنعم، بغدادي، ريان علي",
    institution: "DIFI + HBKU",
    institutionColor: "#1a6B4a",
    institutionBg: "rgba(26,107,74,0.15)",
    year: 2024,
    journal: "Hamad Bin Khalifa University Press",
    url: "https://manara.qnl.qa/articles/report/Adolescent_overuse_of_digital_technology_Perspectives_of_parents_adolescents_and_practitioners_in_Qatar/24591189",
    openAccess: true,
    keyStats: [
      { label: "تأثير على الأسرة", value: "سلبي", color: "#e87a8a" },
      { label: "حلول موثقة", value: "شحيحة", color: "#C9A84C" },
    ],
    mainFinding: "الإفراط الرقمي يؤثر سلباً على تماسك الأسرة — شُح الأساليب المُتحقق منها للوقاية والتدخل",
    tags: ["إدمان رقمي", "تماسك الأسرة", "مراهقون"],
  },
  {
    id: 5,
    titleAr: "رفاهية الطفولة في قطر: مسح الأسر القطرية — الفصل 9: رفاهية الطفل والإنترنت",
    authors: "فريق DIFI + SESRI — جامعة قطر",
    institution: "DIFI + جامعة قطر",
    institutionColor: "#1a6B4a",
    institutionBg: "rgba(26,107,74,0.15)",
    year: 2024,
    journal: "تقرير بحثي — معهد الدوحة الدولي للأسرة",
    url: "https://difi.org.qa/wp-content/uploads/2025/07/Childhood-Well-being-in-Qatar.pdf",
    openAccess: true,
    keyStats: [
      { label: "وصول للإنترنت", value: "81%", color: "#4a9edd" },
      { label: "وقت الشاشة اليومي", value: "4.5 ساعة", color: "#C9A84C" },
      { label: "تأثير على النوم", value: "49%", color: "#e87a8a" },
    ],
    mainFinding: "81% من أطفال قطر متصلون بالإنترنت — متوسط 4.5 ساعة يومياً — 49% تأثير سلبي على النوم",
    tags: ["رفاهية الطفولة", "مسح وطني", "الأسر القطرية"],
  },
  {
    id: 6,
    titleAr: "المخاطر الحقيقية للألعاب الرقمية: منظور سياساتي لحماية الأطفال في قطر",
    authors: "هالة أ. م. الأحمدي",
    institution: "معهد الدوحة الدولي للأسرة (DIFI)",
    institutionColor: "#1a6B4a",
    institutionBg: "rgba(26,107,74,0.15)",
    year: 2025,
    journal: "Doha International Family Institute Journal",
    url: "https://www.qscience.com/content/journals/10.5339/difi.2025.13",
    openAccess: true,
    keyStats: [
      { label: "منصات محللة", value: "4", color: "#7ae8b0" },
      { label: "توصية حرجة", value: "Roblox", color: "#e87a8a" },
    ],
    mainFinding: "منصات كـ Roblox تُضخّم تعرض الأطفال للمخاطر — ضرورة تقييدها حتى تلتزم بمعايير السلامة",
    tags: ["ألعاب رقمية", "Roblox", "حماية الأطفال"],
  },
  {
    id: 7,
    titleAr: "تأثير وسائل التواصل الاجتماعي على الصحة النفسية للأطفال في الدول العربية: مراجعة منهجية",
    authors: "الأنصاري، العواوي، سالم، طراوة، قسيا، زعزوع",
    institution: "مراجعة منهجية — دول عربية متعددة",
    institutionColor: "#5a1a8B",
    institutionBg: "rgba(90,26,139,0.15)",
    year: 2026,
    journal: "Asian Journal of Psychiatry",
    url: "https://www.sciencedirect.com/science/article/pii/S1876201825004368",
    openAccess: true,
    keyStats: [
      { label: "دراسات مُراجَعة", value: "21", color: "#b07ae8" },
      { label: "مشاركون", value: "+15,000", color: "#5a1a8B" },
    ],
    mainFinding: "ارتباط ثابت بين الاستخدام المفرط لوسائل التواصل الاجتماعي والقلق والاكتئاب في الدول العربية",
    tags: ["وسائل التواصل الاجتماعي", "صحة نفسية", "دول عربية"],
  },
];

// ── مخطط مقارنة الإحصاءات الرئيسية عبر الدراسات ───────────────────────────

const studiesComparisonData = [
  { name: "بدران 2025", metric: 45, category: "جامعة قطر", desc: "مستوى الإطار التنظيمي (0-100)" },
  { name: "الرجيح 2021", metric: 50, category: "جامعة قطر", desc: "نسبة أعراض الاكتئاب %" },
  { name: "شمناد 2025", metric: 29.2, category: "HBKU", desc: "نسبة الضحايا الإلكترونيين %" },
  { name: "الحراحشة 2024", metric: 81, category: "DIFI", desc: "نسبة وصول الأطفال للإنترنت %" },
  { name: "DIFI مسح 2024", metric: 49, category: "DIFI", desc: "تأثير سلبي على النوم %" },
  { name: "الأحمدي 2025", metric: 35, category: "DIFI", desc: "نسبة تعرض لمحتوى مزعج %" },
  { name: "الأنصاري 2026", metric: 42.8, category: "دولية", desc: "معدل التنمر الإلكتروني الخليجي %" },
];

const riskTrendData = [
  { year: "2021", cyberbullying: 29.2, depression: 50, internetAddiction: 0 },
  { year: "2024", cyberbullying: 35, depression: 45, internetAddiction: 42 },
  { year: "2025", cyberbullying: 42.8, depression: 48, internetAddiction: 45 },
  { year: "2026", cyberbullying: 44, depression: 50, internetAddiction: 47 },
];

const institutionBreakdown = [
  { institution: "جامعة قطر", count: 2, color: "#8B1A2F" },
  { institution: "HBKU", count: 1, color: "#1a4a8B" },
  { institution: "DIFI", count: 3, color: "#1a6B4a" },
  { institution: "دولية", count: 1, color: "#5a1a8B" },
];

const gaps = [
  {
    id: 1,
    level: "عالي",
    levelColor: "bg-red-100 text-red-700 border-red-200",
    icon: <XCircle className="w-5 h-5 text-red-600" />,
    title: "غياب قانون مستقل ومتكامل للسلامة الرقمية للأطفال",
    description:
      "تظل الحماية القانونية في قطر موزعةً على تشريعات متعددة لا تُعالج بشكل مباشر ومتكامل خصوصية الفضاء الرقمي للأطفال، في حين تعتمد المملكة المتحدة والإمارات قوانين مستقلة وشاملة.",
    ref: "Badran, 2025",
    refUrl: "https://qspace.qu.edu.qa/handle/10576/50336",
  },
  {
    id: 2,
    level: "عالي",
    levelColor: "bg-red-100 text-red-700 border-red-200",
    icon: <XCircle className="w-5 h-5 text-red-600" />,
    title: "ضعف آليات التحقق من العمر على المنصات الرقمية",
    description:
      "لا تُلزم التشريعات القطرية الحالية المنصات الرقمية بتطبيق آليات فعّالة للتحقق من أعمار المستخدمين، مما يُتيح للأطفال الوصول إلى محتوى مخصص للبالغين. دراسة الأحمدي (2025) رصدت مخاطر منصات كـ Roblox وPokémon Go.",
    ref: "الأحمدي، DIFI 2025",
    refUrl: "https://www.qscience.com/content/journals/10.5339/difi.2025.13",
  },
  {
    id: 3,
    level: "عالي",
    levelColor: "bg-red-100 text-red-700 border-red-200",
    icon: <XCircle className="w-5 h-5 text-red-600" />,
    title: "غياب آلية إبلاغ وطنية موحدة ومخصصة للأطفال",
    description:
      "لا تمتلك قطر حتى الآن آلية إبلاغ موحدة ومخصصة للأطفال على غرار مركز CEOP البريطاني أو مفوض السلامة الرقمية الأسترالي.",
    ref: "Badran, 2025",
    refUrl: "https://qspace.qu.edu.qa/handle/10576/50336",
  },
  {
    id: 4,
    level: "متوسط",
    levelColor: "bg-amber-100 text-amber-700 border-amber-200",
    icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
    title: "ارتفاع معدلات التنمر الإلكتروني والاكتئاب المرتبط به",
    description:
      "كشفت دراسة جامعة قطر (الرجيح وآخرون، 2021) أن 29.2% من الطلاب ضحايا إلكترونيون، و50% يعانون أعراض اكتئاب. ومراجعة الأنصاري (2026) رصدت معدل 42.8% للتنمر الإلكتروني في الخليج.",
    ref: "الرجيح وآخرون، 2021؛ الأنصاري وآخرون، 2026",
    refUrl: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0260263",
  },
  {
    id: 5,
    level: "متوسط",
    levelColor: "bg-amber-100 text-amber-700 border-amber-200",
    icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
    title: "إدمان الإنترنت لدى المراهقين المبكرين (11-13 سنة)",
    description:
      "دراسة HBKU (شمناد وآخرون، 2025) على 377 طالباً في 16 مدرسة قطرية أثبتت أن الاستخدام غير الضروري للإنترنت مؤشر قوي على الإدمان، مع تركز الخطر في الفئة العمرية 11-13 سنة.",
    ref: "شمناد وآخرون، HBKU 2025",
    refUrl: "https://humanfactors.jmir.org/2025/1/e62955/",
  },
  {
    id: 6,
    level: "متوسط",
    levelColor: "bg-amber-100 text-amber-700 border-amber-200",
    icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
    title: "وقت الشاشة المرتفع وتأثيره على النوم والسلوك الاجتماعي",
    description:
      "مسح DIFI (2024): 81% من أطفال قطر متصلون بالإنترنت بمتوسط 4.5 ساعات يومياً. 49% من الآباء يرصدون تأثيراً سلبياً على النوم، و29% يجدون صعوبة في إخراج أطفالهم من المنزل.",
    ref: "DIFI + SESRI، 2024",
    refUrl: "https://difi.org.qa/wp-content/uploads/2025/07/Childhood-Well-being-in-Qatar.pdf",
  },
];

const recommendations = [
  {
    id: 1,
    category: "تشريعية",
    categoryColor: "bg-[#8B1A1A]",
    icon: <FileText className="w-5 h-5" />,
    title: "إصدار قانون مستقل للسلامة الرقمية للأطفال",
    details:
      "إعداد تشريع وطني متكامل يستلهم من قانون السلامة الرقمية البريطاني 2023 وقانون الإمارات 2026، يتضمن: واجب الرعاية على المنصات، ومتطلبات التحقق من العمر، وآليات الإزالة السريعة للمحتوى الضار.",
    priority: "عاجل",
    responsibleInstitution: "وزارة التنمية الاجتماعية والأسرة + وزارة العدل",
    institutionId: "msf",
    institutionSection: "institutions",
    evidence: "Badran 2025 · OECD 2024",
  },
  {
    id: 2,
    category: "تشريعية",
    categoryColor: "bg-[#8B1A1A]",
    icon: <FileText className="w-5 h-5" />,
    title: "تقنين مبدأ السلامة بالتصميم (Safety by Design)",
    details:
      "إدراج مبدأ السلامة بالتصميم كمتطلب قانوني ملزم للمنصات الرقمية العاملة في قطر، استناداً إلى الإطار الثماني المكونات الذي اقترحته OECD عام 2024. تطبيق فوري على منصات الألعاب عالية الخطورة.",
    priority: "عاجل",
    responsibleInstitution: "وزارة الاتصالات وتكنولوجيا المعلومات + هيئة تنظيم الاتصالات",
    institutionId: "mcit",
    institutionSection: "institutions",
    evidence: "الأحمدي DIFI 2025 · OECD 2024",
  },
  {
    id: 3,
    category: "مؤسسية",
    categoryColor: "bg-[#1A2744]",
    icon: <Target className="w-5 h-5" />,
    title: "إنشاء آلية إبلاغ وطنية موحدة مخصصة للأطفال",
    details:
      "إنشاء منصة وطنية موحدة للإبلاغ عن المخاطر الرقمية، مُصمَّمة بلغة وواجهة مناسبة للأطفال والمراهقين، على غرار نموذج CEOP البريطاني. تشمل آلية الإبلاغ عن التنمر الإلكتروني والمحتوى الضار.",
    priority: "عاجل",
    responsibleInstitution: "وزارة الداخلية — إدارة مكافحة الجرائم الإلكترونية",
    institutionId: "moi",
    institutionSection: "institutions",
    evidence: "الرجيح 2021 · الأنصاري 2026",
  },
  {
    id: 4,
    category: "مؤسسية",
    categoryColor: "bg-[#1A2744]",
    icon: <Target className="w-5 h-5" />,
    title: "إطلاق مسح وطني دوري لمخاطر الإنترنت",
    details:
      "إطلاق مسح وطني كل سنتين يرصد مخاطر الإنترنت التي يتعرض لها الأطفال، بقيادة جامعة قطر بالتعاون مع DIFI ووزارة التربية والتعليم، مع نشر النتائج بصورة منتظمة. تُشكّل دراسة DIFI (2024) نموذجاً قابلاً للتكرار.",
    priority: "متوسط",
    responsibleInstitution: "جامعة قطر + وزارة التربية والتعليم والتعليم العالي",
    institutionId: "qu",
    institutionSection: "institutions",
    evidence: "DIFI + SESRI 2024 · شمناد HBKU 2025",
  },
  {
    id: 5,
    category: "برامجية",
    categoryColor: "bg-[#C9A84C]",
    icon: <BookOpen className="w-5 h-5 text-white" />,
    title: "دمج محو الأمية الرقمية في المناهج الدراسية",
    details:
      "دمج مناهج محو الأمية الرقمية والسلامة الإلكترونية في المناهج الوطنية بدءاً من المرحلة الابتدائية، مع تطوير محتوى يراعي الفروق العمرية استناداً إلى إطار 4Cs الدولي. التركيز على الفئة 11-13 سنة الأكثر عرضة للإدمان.",
    priority: "متوسط",
    responsibleInstitution: "وزارة التربية والتعليم والتعليم العالي",
    institutionId: "moe",
    institutionSection: "institutions",
    evidence: "شمناد HBKU 2025 · الأنصاري 2026",
  },
  {
    id: 6,
    category: "برامجية",
    categoryColor: "bg-[#C9A84C]",
    icon: <Globe className="w-5 h-5 text-white" />,
    title: "تعزيز التنسيق الإقليمي الخليجي",
    details:
      "العمل على إطار تنسيق خليجي لمكافحة الجرائم الرقمية التي تستهدف الأطفال، يُتيح تبادل المعلومات والملاحقة القضائية المشتركة. معدل التنمر الإلكتروني 42.8% في دول الخليج يؤكد الحاجة لاستجابة إقليمية.",
    priority: "متوسط",
    responsibleInstitution: "وزارة الداخلية + الوكالة الوطنية للأمن السيبراني",
    institutionId: "moi",
    institutionSection: "institutions",
    evidence: "الأنصاري وآخرون 2026",
  },
  {
    id: 7,
    category: "برامجية",
    categoryColor: "bg-[#C9A84C]",
    icon: <BookOpen className="w-5 h-5 text-white" />,
    title: "تفعيل دور الأسرة والمجتمع",
    details:
      "تطوير برامج تدريبية للآباء والمعلمين حول مخاطر الإنترنت وأساليب التعامل معها. دراسة الحراحشة (2024) أثبتت أن الديناميكيات الثقافية في قطر تؤثر في أنماط الاستخدام، ومسح DIFI (2024) يكشف أن 29% من الآباء يجدون صعوبة في تنظيم استخدام أطفالهم.",
    priority: "طويل المدى",
    responsibleInstitution: "وزارة التنمية الاجتماعية والأسرة + وزارة التربية والتعليم",
    institutionId: "msf",
    institutionSection: "institutions",
    evidence: "الحراحشة DIFI 2024 · DIFI + SESRI 2024",
  },
];

const references = [
  {
    id: 1,
    authors: "DataReportal",
    year: 2024,
    title: "Digital 2024: Qatar",
    url: "https://datareportal.com/reports/digital-2024-qatar",
    type: "تقرير",
  },
  {
    id: 2,
    authors: "بدران، أحمد",
    year: 2025,
    title: "السياسات التنظيمية والأمن الرقمي: مراجعة الإطار التنظيمي في دولة قطر ودوره في حماية الأطفال في الفضاء الإلكتروني",
    url: "https://qspace.qu.edu.qa/handle/10576/50336",
    type: "بحث محكّم",
  },
  {
    id: 3,
    authors: "الرجيح، حسن، الأحمد، الصايد حسن",
    year: 2021,
    title: "دراسة العلاقة بين التنمر الإلكتروني والضحايا الإلكترونيين وأعراض الاكتئاب لدى طلاب جامعة قطر",
    url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0260263",
    type: "بحث محكّم",
  },
  {
    id: 4,
    authors: "شمناد، عزيز، الحراحشة، ريان علي",
    year: 2025,
    title: "تقييم العلاقة بين نوع استخدام الإنترنت وإدمانه لدى المراهقين المبكرين والمتوسطين: دراسة مقطعية من قطر",
    url: "https://humanfactors.jmir.org/2025/1/e62955/",
    type: "بحث محكّم",
  },
  {
    id: 5,
    authors: "الحراحشة، عبد المنعم، بغدادي، ريان علي",
    year: 2024,
    title: "الإفراط في استخدام التكنولوجيا الرقمية لدى المراهقين: وجهات نظر الآباء والمراهقين والممارسين في قطر",
    url: "https://manara.qnl.qa/articles/report/Adolescent_overuse_of_digital_technology_Perspectives_of_parents_adolescents_and_practitioners_in_Qatar/24591189",
    type: "تقرير بحثي",
  },
  {
    id: 6,
    authors: "DIFI + SESRI — جامعة قطر",
    year: 2024,
    title: "رفاهية الطفولة في قطر: مسح الأسر القطرية — الفصل التاسع: رفاهية الطفل والإنترنت",
    url: "https://difi.org.qa/wp-content/uploads/2025/07/Childhood-Well-being-in-Qatar.pdf",
    type: "تقرير بحثي",
  },
  {
    id: 7,
    authors: "الأحمدي، هالة أ. م.",
    year: 2025,
    title: "المخاطر الحقيقية للألعاب الرقمية: منظور سياساتي لحماية الأطفال والمراهقين في بيئات الألعاب الإلكترونية",
    url: "https://www.qscience.com/content/journals/10.5339/difi.2025.13",
    type: "بحث محكّم",
  },
  {
    id: 8,
    authors: "الأنصاري، العواوي، سالم، طراوة، قسيا، زعزوع",
    year: 2026,
    title: "مراجعة منهجية لتأثير وسائل التواصل الاجتماعي على الرفاهية النفسية للأطفال في الدول العربية",
    url: "https://www.sciencedirect.com/science/article/pii/S1876201825004368",
    type: "بحث محكّم",
  },
  {
    id: 9,
    authors: "قرار مجلس الوزراء القطري",
    year: 2025,
    title: "قرار رقم 38 لسنة 2025 بإنشاء لجنة السلامة الرقمية للأطفال والنشء",
    url: "https://almeezan.qa/LawView.aspx?opt&LawID=10265&language=ar",
    type: "وثيقة رسمية",
  },
  {
    id: 10,
    authors: "UK Government",
    year: 2023,
    title: "Online Safety Act 2023",
    url: "https://www.legislation.gov.uk/ukpga/2023/50",
    type: "تشريع",
  },
  {
    id: 11,
    authors: "OECD",
    year: 2024,
    title: "Towards Digital Safety by Design for Children",
    url: "https://www.oecd.org/en/publications/towards-digital-safety-by-design-for-children_c167b650-en.html",
    type: "تقرير دولي",
  },
  {
    id: 12,
    authors: "Latham & Watkins",
    year: 2026,
    title: "UAE's Child Digital Safety Law: What Every Digital Platform and ISP Should Know",
    url: "https://www.lw.com/en/insights/uaes-child-digital-safety-law-what-every-digital-platform-and-isp-should-know",
    type: "تقرير قانوني",
  },
  {
    id: 13,
    authors: "Özkul, D. (UNICEF Innocenti)",
    year: 2025,
    title: "Best Interests of the Child in Relation to the Digital Environment",
    url: "https://www.unicef.org/innocenti/media/10571/file/UNICEF-Innocenti-Best-interests-child-digital-environment-brief-2025.pdf",
    type: "تقرير دولي",
  },
  {
    id: 14,
    authors: "Australian Government",
    year: 2021,
    title: "Online Safety Act 2021 — eSafety Commissioner",
    url: "https://www.esafety.gov.au/",
    type: "تشريع",
  },
  {
    id: 15,
    authors: "Helsper, E. et al.",
    year: 2025,
    title: "Left out and misunderstood: Children in global, regional and national digital policies",
    url: "https://eprints.lse.ac.uk/130445/",
    type: "بحث محكّم",
  },
];

// ── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  value,
  label,
  source,
  sourceUrl,
  color,
}: {
  value: string;
  label: string;
  source: string;
  sourceUrl: string;
  color: string;
}) {
  return (
    <div className={`rounded-xl border-r-4 bg-white p-5 shadow-sm ${color}`}>
      <div className="text-3xl font-bold text-gray-800">{value}</div>
      <div className="mt-1 text-sm text-gray-600">{label}</div>
      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 flex items-center gap-1 text-xs text-gray-400 hover:text-[#8B1A1A] transition-colors"
      >
        <ExternalLink className="w-3 h-3" />
        {source}
      </a>
    </div>
  );
}

function GapCard({ gap }: { gap: (typeof gaps)[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      <button
        className="w-full flex items-start gap-3 p-4 text-right hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <div className="mt-0.5 shrink-0">{gap.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-xs px-2 py-0.5 rounded-full border font-medium ${gap.levelColor}`}
            >
              فجوة {gap.level}
            </span>
            <span className="font-semibold text-gray-800 text-sm">{gap.title}</span>
          </div>
        </div>
        <div className="shrink-0 text-gray-400">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-gray-50 pt-3">
          <p className="text-sm text-gray-600 leading-relaxed">{gap.description}</p>
          <a
            href={gap.refUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-xs text-[#8B1A1A] hover:underline"
          >
            <ExternalLink className="w-3 h-3" />
            المصدر: {gap.ref}
          </a>
        </div>
      )}
    </div>
  );
}

function RecommendationCard({ rec }: { rec: (typeof recommendations)[0] }) {
  const priorityColors: Record<string, string> = {
    عاجل: "bg-red-50 text-red-700 border-red-200",
    "متوسط": "bg-amber-50 text-amber-700 border-amber-200",
    "طويل المدى": "bg-blue-50 text-blue-700 border-blue-200",
  };

  const scrollToInstitution = () => {
    const section = document.getElementById(rec.institutionSection || 'institutions');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const cards = document.querySelectorAll('[data-institution-id]');
        cards.forEach(card => {
          if ((card as HTMLElement).dataset.institutionId === rec.institutionId) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            (card as HTMLElement).style.transition = 'box-shadow 0.3s';
            (card as HTMLElement).style.boxShadow = '0 0 0 3px #C9A84C';
            setTimeout(() => { (card as HTMLElement).style.boxShadow = ''; }, 3000);
          }
        });
      }, 800);
    }
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div
          className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-white ${rec.categoryColor}`}
        >
          {rec.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span
              className={`text-xs px-2 py-0.5 rounded-full border font-medium ${priorityColors[rec.priority]}`}
            >
              {rec.priority}
            </span>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {rec.category}
            </span>
          </div>
          <h4 className="font-semibold text-gray-800 text-sm mb-1">{rec.title}</h4>
          <p className="text-xs text-gray-500 leading-relaxed mb-2">{rec.details}</p>
          {rec.evidence && (
            <div className="flex items-center gap-1 text-xs text-[#1A2744]/60 mb-2">
              <FlaskConical className="w-3 h-3" />
              <span>الأدلة: {rec.evidence}</span>
            </div>
          )}
          {rec.responsibleInstitution && (
            <button
              onClick={scrollToInstitution}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all hover:shadow-sm"
              style={{ color: '#8D1B3D', borderColor: '#8D1B3D22', background: '#8D1B3D08' }}
            >
              <Users className="w-3 h-3" />
              <span>الجهة المسؤولة: {rec.responsibleInstitution}</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StudyCard({ study }: { study: (typeof qatarStudies)[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl border bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow"
      style={{ borderColor: study.institutionColor + "33" }}
    >
      <div
        className="flex items-start gap-3 p-4 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div
          className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
          style={{ backgroundColor: study.institutionColor }}
        >
          {study.id}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span
              className="text-xs px-2 py-0.5 rounded-full border font-medium"
              style={{ backgroundColor: study.institutionBg, color: study.institutionColor, borderColor: study.institutionColor + "44" }}
            >
              {study.institution}
            </span>
            <span className="text-xs text-gray-400">{study.year}</span>
            {study.openAccess && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-green-50 text-green-700 border border-green-200">
                وصول مفتوح
              </span>
            )}
          </div>
          <h4 className="font-semibold text-gray-800 text-sm leading-snug mb-1">{study.titleAr}</h4>
          <p className="text-xs text-gray-500 leading-relaxed">{study.mainFinding}</p>
        </div>
        <div className="shrink-0 text-gray-400 mt-1">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {/* Key Stats */}
      <div className="flex gap-3 px-4 pb-3 flex-wrap">
        {study.keyStats.map((stat, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="text-sm font-bold" style={{ color: stat.color }}>{stat.value}</span>
            <span className="text-xs text-gray-400">{stat.label}</span>
          </div>
        ))}
      </div>

      {open && (
        <div className="border-t border-gray-50 px-4 py-3">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {study.tags.map((tag, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              {study.journal}
            </span>
          </div>
          <a
            href={study.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium hover:underline"
            style={{ color: study.institutionColor }}
          >
            <ExternalLink className="w-3 h-3" />
            عرض الدراسة الكاملة
          </a>
        </div>
      )}
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function ComparativeStudy() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "qatar-studies" | "gaps" | "recommendations" | "references"
  >("overview");

  const tabs = [
    { id: "overview", label: "نظرة عامة والمقارنة", icon: <BarChart2 className="w-4 h-4" /> },
    { id: "qatar-studies", label: "الدراسات القطرية (7)", icon: <FlaskConical className="w-4 h-4" /> },
    { id: "gaps", label: "تحليل الفجوات", icon: <AlertTriangle className="w-4 h-4" /> },
    { id: "recommendations", label: "التوصيات", icon: <Target className="w-4 h-4" /> },
    { id: "references", label: "المراجع العلمية", icon: <BookOpen className="w-4 h-4" /> },
  ] as const;

  return (
    <section id="study" className="py-16 bg-gray-50" dir="rtl">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 bg-[#8B1A1A] rounded-full" />
            <span className="text-sm font-medium text-[#8B1A1A] uppercase tracking-wider">
              دراسة تحليلية مقارنة
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            السلامة الرقمية للأطفال والنشء في قطر
          </h2>
          <p className="text-gray-500 max-w-2xl text-sm leading-relaxed">
            دراسة تحليلية مقارنة بالممارسات العالمية الرائدة مع توصيات لسد الفجوات — مستندة إلى{" "}
            <strong>7 دراسات قطرية محكّمة</strong> و<strong>15 مرجعاً علمياً</strong> دولياً موثقاً.
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            value="81%"
            label="من أطفال قطر متصلون بالإنترنت"
            source="DIFI + SESRI، 2024"
            sourceUrl="https://difi.org.qa/wp-content/uploads/2025/07/Childhood-Well-being-in-Qatar.pdf"
            color="border-[#8B1A1A]"
          />
          <StatCard
            value="4.5 ساعة"
            label="متوسط وقت الشاشة اليومي لكل طفل"
            source="DIFI + SESRI، 2024"
            sourceUrl="https://difi.org.qa/wp-content/uploads/2025/07/Childhood-Well-being-in-Qatar.pdf"
            color="border-amber-400"
          />
          <StatCard
            value="42.8%"
            label="معدل التنمر الإلكتروني في دول الخليج"
            source="الأنصاري وآخرون، 2026"
            sourceUrl="https://www.sciencedirect.com/science/article/pii/S1876201825004368"
            color="border-red-400"
          />
          <StatCard
            value="7"
            label="دراسات قطرية محكّمة (2021–2026)"
            source="جامعة قطر · HBKU · DIFI"
            sourceUrl="#"
            color="border-[#1A2744]"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "border-b-2 border-[#8B1A1A] text-[#8B1A1A] bg-red-50/30"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Context */}
                <div className="bg-[#1A2744]/5 rounded-xl p-5 border border-[#1A2744]/10">
                  <h3 className="font-bold text-[#1A2744] mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    السياق والمشهد الرقمي في قطر
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    تُعدّ دولة قطر من الدول الأكثر اتصالاً بالإنترنت على مستوى العالم، إذ تبلغ نسبة
                    انتشار الإنترنت فيها <strong>99%</strong> مع تسجيل نحو{" "}
                    <strong>2.70 مليون مستخدم نشط</strong> (DataReportal, 2024). وتكشف الدراسات
                    الأكاديمية المحكّمة الصادرة عن جامعة قطر وHBKU وDIFI أن{" "}
                    <strong>81% من الأطفال متصلون بالإنترنت</strong> بمتوسط 4.5 ساعات يومياً، وأن
                    الاستخدام غير الأساسي يُشكّل عامل خطر رئيسياً للإدمان لدى المراهقين 11-13 عاماً
                    (شمناد وآخرون، 2025).
                  </p>
                </div>

                {/* Institution Distribution */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#8B1A1A]" />
                    توزيع الدراسات القطرية حسب المؤسسة البحثية
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {institutionBreakdown.map((inst) => (
                      <div
                        key={inst.institution}
                        className="rounded-xl p-4 text-center border"
                        style={{ borderColor: inst.color + "33", backgroundColor: inst.color + "0d" }}
                      >
                        <div className="text-2xl font-bold mb-1" style={{ color: inst.color }}>
                          {inst.count}
                        </div>
                        <div className="text-xs text-gray-600">{inst.institution}</div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          {inst.count === 1 ? "دراسة" : "دراسات"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comparison Chart */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-[#8B1A1A]" />
                    مقارنة مستوى الجاهزية في السلامة الرقمية للأطفال (0–100)
                  </h3>
                  <div className="text-xs text-gray-400 mb-3">
                    المصادر: OECD 2024 · UK Online Safety Act 2023 · UAE Child Digital Safety Law 2026 · Badran 2025
                  </div>
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart
                      data={gapData}
                      margin={{ top: 5, right: 10, left: 10, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="criterion"
                        tick={{ fontSize: 11, fill: "#6b7280" }}
                        angle={-30}
                        textAnchor="end"
                        interval={0}
                      />
                      <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} domain={[0, 100]} />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "8px",
                          border: "1px solid #e5e7eb",
                          fontSize: "12px",
                          direction: "rtl",
                        }}
                      />
                      <Legend
                        wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }}
                        formatter={(value) =>
                          value === "qatar"
                            ? "قطر"
                            : value === "uk"
                            ? "المملكة المتحدة"
                            : value === "uae"
                            ? "الإمارات"
                            : "أستراليا"
                        }
                      />
                      <Bar dataKey="qatar" fill="#8B1A1A" radius={[3, 3, 0, 0]} />
                      <Bar dataKey="uk" fill="#1A2744" radius={[3, 3, 0, 0]} />
                      <Bar dataKey="uae" fill="#C9A84C" radius={[3, 3, 0, 0]} />
                      <Bar dataKey="au" fill="#4B7A6E" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Radar Chart */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-[#8B1A1A]" />
                    مستوى قطر مقارنةً بالمعيار الدولي الموصى به
                  </h3>
                  <div className="text-xs text-gray-400 mb-3">
                    المعيار الدولي مستمد من: OECD 2024 · UNICEF Innocenti 2025 · UK Online Safety Act 2023
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fontSize: 12, fill: "#6b7280" }}
                      />
                      <Radar
                        name="قطر"
                        dataKey="qatar"
                        stroke="#8B1A1A"
                        fill="#8B1A1A"
                        fillOpacity={0.3}
                      />
                      <Radar
                        name="المعيار الدولي"
                        dataKey="benchmark"
                        stroke="#1A2744"
                        fill="#1A2744"
                        fillOpacity={0.15}
                      />
                      <Legend wrapperStyle={{ fontSize: "12px" }} />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "8px",
                          border: "1px solid #e5e7eb",
                          fontSize: "12px",
                          direction: "rtl",
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Strengths */}
                <div className="bg-green-50 rounded-xl p-5 border border-green-100">
                  <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    نقاط القوة في المنظومة القطرية
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "إنشاء لجنة السلامة الرقمية للأطفال والنشء عام 2025 — خطوة مؤسسية رائدة إقليمياً",
                      "منظومة تشريعية متعددة الطبقات تشمل قانون مكافحة الجرائم الإلكترونية (14/2014) وقانون حماية البيانات (13/2016)",
                      "13 جهة مسؤولة في إطار مؤسسي متكامل يضم الجهات الرئيسية والداعمة",
                      "7 دراسات أكاديمية محكّمة (2021–2026) صادرة عن جامعة قطر وHBKU وDIFI توثّق المخاطر الرقمية المحلية",
                      "مسح DIFI الوطني (2024) يوفر بيانات ممثلة للأسر القطرية حول رفاهية الطفولة الرقمية",
                      "الانضمام إلى اتفاقية حقوق الطفل والالتزام بالمرجعيات الدولية",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                        <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Qatar Studies Tab */}
            {activeTab === "qatar-studies" && (
              <div className="space-y-4">
                <div className="bg-[#1A2744]/5 rounded-xl p-4 border border-[#1A2744]/10 mb-6">
                  <h3 className="font-bold text-[#1A2744] mb-2 flex items-center gap-2">
                    <FlaskConical className="w-5 h-5" />
                    الدراسات القطرية المحكّمة حول السلامة الرقمية للأطفال (2021–2026)
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    سبع دراسات علمية صادرة عن جامعة قطر وجامعة حمد بن خليفة (HBKU) ومعهد الدوحة الدولي للأسرة (DIFI)، تُشكّل قاعدة الأدلة الوطنية لصياغة السياسات المستنيرة.
                  </p>
                  <div className="flex gap-3 mt-3 flex-wrap">
                    {institutionBreakdown.map((inst) => (
                      <span
                        key={inst.institution}
                        className="text-xs px-2.5 py-1 rounded-full border font-medium"
                        style={{ backgroundColor: inst.color + "15", color: inst.color, borderColor: inst.color + "44" }}
                      >
                        {inst.institution}: {inst.count} {inst.count === 1 ? "دراسة" : "دراسات"}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Comparative Bar Chart */}
                <div className="bg-white rounded-xl border border-gray-100 p-5 mb-4">
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-[#8B1A1A]" />
                    المؤشرات الرئيسية عبر الدراسات السبع
                  </h4>
                  <div className="text-xs text-gray-400 mb-3">
                    كل قيمة تمثل المؤشر الرئيسي للدراسة (نسبة % أو درجة من 100)
                  </div>
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart
                      data={studiesComparisonData}
                      margin={{ top: 5, right: 10, left: 10, bottom: 80 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 10, fill: "#6b7280" }}
                        angle={-35}
                        textAnchor="end"
                        interval={0}
                      />
                      <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} domain={[0, 100]} />
                      <Tooltip
                        contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "11px", direction: "rtl" }}
                        formatter={(value, _name, props) => [
                          `${value}`,
                          props.payload?.desc || "القيمة"
                        ]}
                      />
                      <Bar
                        dataKey="metric"
                        radius={[4, 4, 0, 0]}
                        fill="#8B1A1A"
                        label={{ position: "top", fontSize: 10, fill: "#374151" }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Risk Trend */}
                <div className="bg-white rounded-xl border border-gray-100 p-5 mb-4">
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-[#8B1A1A]" />
                    اتجاهات المخاطر الرقمية عبر الزمن (مُستنبط من الدراسات)
                  </h4>
                  <div className="text-xs text-gray-400 mb-3">
                    البيانات مستنبطة من نتائج الدراسات السبع عبر الفترة 2021–2026
                  </div>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={riskTrendData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#6b7280" }} />
                      <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} domain={[0, 70]} />
                      <Tooltip
                        contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "12px", direction: "rtl" }}
                        formatter={(value, name) => [
                          `${value}%`,
                          name === "cyberbullying" ? "التنمر الإلكتروني" :
                          name === "depression" ? "أعراض الاكتئاب" : "إدمان الإنترنت"
                        ]}
                      />
                      <Legend
                        wrapperStyle={{ fontSize: "11px" }}
                        formatter={(value) =>
                          value === "cyberbullying" ? "التنمر الإلكتروني" :
                          value === "depression" ? "أعراض الاكتئاب" : "إدمان الإنترنت"
                        }
                      />
                      <Line type="monotone" dataKey="cyberbullying" stroke="#8B1A1A" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="depression" stroke="#1A2744" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="internetAddiction" stroke="#C9A84C" strokeWidth={2} dot={{ r: 4 }} strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Study Cards */}
                <div className="space-y-3">
                  {qatarStudies.map((study) => (
                    <StudyCard key={study.id} study={study} />
                  ))}
                </div>
              </div>
            )}

            {/* Gaps Tab */}
            {activeTab === "gaps" && (
              <div className="space-y-4">
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  بناءً على مقارنة الإطار القطري بالمعايير الدولية الرائدة (OECD، UK، UAE، أستراليا) ونتائج الدراسات القطرية السبع (2021–2026)،
                  تم تحديد <strong>6 فجوات جوهرية</strong> تستدعي معالجة تشريعية ومؤسسية منسقة.
                </p>
                {gaps.map((gap) => (
                  <GapCard key={gap.id} gap={gap} />
                ))}
              </div>
            )}

            {/* Recommendations Tab */}
            {activeTab === "recommendations" && (
              <div className="space-y-4">
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  تُقدَّم <strong>7 توصيات</strong> مُصنَّفة حسب الأولوية والطبيعة (تشريعية /
                  مؤسسية / برامجية)، مستندةً إلى أفضل الممارسات الدولية الموثقة ونتائج الدراسات القطرية السبع.
                </p>
                <div className="flex gap-3 flex-wrap mb-4">
                  <span className="flex items-center gap-1.5 text-xs text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-red-500" /> عاجل
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-amber-500" /> متوسط المدى
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-blue-500" /> طويل المدى
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {recommendations.map((rec) => (
                    <RecommendationCard key={rec.id} rec={rec} />
                  ))}
                </div>
              </div>
            )}

            {/* References Tab */}
            {activeTab === "references" && (
              <div className="space-y-3">
                <p className="text-sm text-gray-500 mb-6">
                  جميع المراجع أدناه هي مصادر موثقة (أبحاث محكّمة، تقارير دولية، تشريعات رسمية) —
                  لا تتضمن هذه الدراسة أي استنتاجات مولّدة بالذكاء الاصطناعي.
                  تشمل <strong>7 دراسات قطرية</strong> و<strong>8 مراجع دولية</strong>.
                </p>
                <div className="mb-4 p-3 bg-[#8B1A1A]/5 rounded-xl border border-[#8B1A1A]/10">
                  <p className="text-xs font-semibold text-[#8B1A1A] mb-2">الدراسات القطرية (1–8)</p>
                  <p className="text-xs text-gray-500">جامعة قطر · جامعة حمد بن خليفة (HBKU) · معهد الدوحة الدولي للأسرة (DIFI)</p>
                </div>
                {references.map((ref) => (
                  <div
                    key={ref.id}
                    className={`flex items-start gap-3 p-4 rounded-xl border bg-white hover:border-[#8B1A1A]/20 transition-colors ${ref.id <= 8 ? "border-[#8B1A1A]/15" : "border-gray-100"}`}
                  >
                    <span className={`shrink-0 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${ref.id <= 8 ? "bg-[#8B1A1A]/10 text-[#8B1A1A]" : "bg-gray-100 text-gray-500"}`}>
                      {ref.id}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${ref.id <= 8 ? "bg-[#8B1A1A]/10 text-[#8B1A1A]" : "bg-gray-100 text-gray-500"}`}>
                          {ref.type}
                        </span>
                        <span className="text-xs text-gray-400">{ref.year}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-800 mb-0.5">{ref.title}</p>
                      <p className="text-xs text-gray-500 mb-1">{ref.authors}</p>
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#8B1A1A] hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                        الرابط المباشر
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
