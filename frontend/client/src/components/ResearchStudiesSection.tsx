/**
 * ResearchStudiesSection.tsx
 * Design: Deep navy/teal academic aesthetic — matches the site's dark scholarly theme.
 * Layout: Asymmetric card grid with filter tabs by institution, expandable abstracts.
 * Typography: Noto Kufi Arabic headers, body text readable at small sizes.
 * Updated: Added DIFI Chapter 9 visual stats + related laws linking.
 */

import { useState } from "react";
import {
  BookOpen, ExternalLink, Users, Calendar, Building2,
  ChevronDown, ChevronUp, Search, Filter, Scale, BarChart2, ArrowLeft
} from "lucide-react";

interface RelatedLaw {
  id: string;        // section anchor id in Home.tsx (e.g. "laws")
  label: string;     // short display label
  number: string;    // e.g. "ق. 14/2014"
  color: string;     // tailwind bg class
}

interface StatBar {
  label: string;
  value: number;   // percentage 0-100
  color: string;
}

interface StatGroup {
  title: string;
  stats: StatBar[];
}

interface Study {
  id: number;
  titleAr: string;
  titleEn: string;
  authors: string[];
  institution: string;
  institutionEn: string;
  journal: string;
  year: number;
  category: "جامعة قطر" | "HBKU" | "DIFI" | "دولية";
  abstract: string;
  keyFindings: string[];
  url: string;
  doi?: string;
  tags: string[];
  openAccess: boolean;
  relatedLaws?: RelatedLaw[];
  statGroups?: StatGroup[];
  highlightStats?: { label: string; value: string; note?: string }[];
}

// Scroll helper — jumps to the laws section on the main page
function scrollToLaws() {
  const el = document.getElementById("laws");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const studies: Study[] = [
  {
    id: 1,
    titleAr: "السياسات التنظيمية والأمن الرقمي: مراجعة الإطار التنظيمي في دولة قطر ودوره في حماية الأطفال في الفضاء الإلكتروني",
    titleEn: "Regulatory Policies and Digital Security: A Review of the Regulatory Framework in the State of Qatar and Its Role in Protecting Children in Cyberspace",
    authors: ["أ. أحمد بدران"],
    institution: "جامعة قطر",
    institutionEn: "Qatar University",
    journal: "Handbook of Families in the Arab Gulf States — Springer",
    year: 2025,
    category: "جامعة قطر",
    abstract: "تُراجع هذه الدراسة الإطار التنظيمي الذي وضعته دولة قطر لحماية الأطفال في الفضاء الإلكتروني. تتناول قانون حماية البيانات الشخصية رقم 13 لسنة 2016، وقانون مكافحة الجرائم الإلكترونية، ودور وزارة المواصلات والاتصالات وهيئة تنظيم الاتصالات. تؤكد الدراسة أن التكنولوجيا سلاح ذو حدين، وأن الإطار التنظيمي القطري يعتمد استراتيجية متعددة الأطراف تشمل الجهات الحكومية ومزودي الخدمة والمؤسسات الأكاديمية والآباء.",
    keyFindings: [
      "الإطار التنظيمي القطري يعتمد استراتيجية متعددة الأطراف",
      "قانون الجرائم الإلكترونية يحظر صراحةً امتلاك أو نشر المواد الإباحية المتعلقة بالأطفال",
      "ضرورة تطوير أطر تنظيمية مناسبة لمواجهة التأثيرات السلبية للتكنولوجيا على الأطفال",
      "التكنولوجيا لها تأثيرات إيجابية وسلبية على الصحة والتعليم والعلاقات الاجتماعية"
    ],
    url: "https://qspace.qu.edu.qa/handle/10576/50336",
    doi: "10.1007/978-981-96-3412-5_13",
    tags: ["إطار تنظيمي", "قانون الجرائم الإلكترونية", "حماية الأطفال", "السياسات الرقمية"],
    openAccess: false,
    relatedLaws: [
      { id: "laws", label: "قانون مكافحة الجرائم الإلكترونية", number: "ق. 14/2014", color: "bg-red-900/30 text-red-300 border-red-800/40" },
      { id: "laws", label: "قانون حماية البيانات الشخصية", number: "ق. 13/2016", color: "bg-blue-900/30 text-blue-300 border-blue-800/40" },
      { id: "laws", label: "الاستراتيجية الوطنية للأمن السيبراني", number: "2014", color: "bg-amber-900/30 text-amber-300 border-amber-800/40" },
    ]
  },
  {
    id: 2,
    titleAr: "دراسة العلاقة بين التنمر الإلكتروني والضحايا الإلكترونيين وأعراض الاكتئاب لدى طلاب جامعة قطر",
    titleEn: "An investigation of the relationship between cyberbullying, cyber-victimization and depression symptoms: A cross sectional study among university students in Qatar",
    authors: ["سارة محمد الرجيح", "هدى محمد حسن", "عائشة سالم الأحمد", "ديانا الصايد حسن"],
    institution: "جامعة قطر",
    institutionEn: "Qatar University",
    journal: "PLOS One",
    year: 2021,
    category: "جامعة قطر",
    abstract: "دراسة مقطعية تبحث في انتشار التنمر الإلكتروني والضحايا الإلكترونيين وأعراض الاكتئاب لدى طلاب جامعة قطر. استُخدم مقياس RCBI-II لقياس التنمر الإلكتروني ومقياس PHQ-9 لقياس أعراض الاكتئاب. شملت العينة 836 طالباً وطالبة.",
    keyFindings: [
      "6.8% متنمرون إلكترونياً، 29.2% ضحايا، 35.8% متنمرون وضحايا في آن واحد",
      "50% من الطلاب أظهروا أعراض اكتئاب (درجة 10+ على مقياس PHQ-9)",
      "احتمالية الاكتئاب للضحايا أعلى بمرتين، وللمتنمرين-الضحايا أعلى بثلاث مرات",
      "ارتباط إيجابي معنوي بين التنمر الإلكتروني والاكتئاب (p<0.001)",
      "الطالبات أكثر عرضة للاكتئاب من الطلاب الذكور"
    ],
    url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0260263",
    doi: "10.1371/journal.pone.0260263",
    tags: ["تنمر إلكتروني", "اكتئاب", "صحة نفسية", "طلاب جامعة قطر"],
    openAccess: true,
    relatedLaws: [
      { id: "laws", label: "قانون مكافحة الجرائم الإلكترونية", number: "ق. 14/2014", color: "bg-red-900/30 text-red-300 border-red-800/40" },
      { id: "laws", label: "قرار إنشاء لجنة السلامة الرقمية", number: "ق.و. 38/2025", color: "bg-purple-900/30 text-purple-300 border-purple-800/40" },
    ],
    highlightStats: [
      { label: "ضحايا إلكترونيون", value: "29.2%", note: "من إجمالي الطلاب" },
      { label: "أعراض اكتئاب", value: "50%", note: "من عينة 836 طالباً" },
      { label: "متنمرون وضحايا", value: "35.8%", note: "في آن واحد" },
    ]
  },
  {
    id: 3,
    titleAr: "تقييم العلاقة بين نوع استخدام الإنترنت وإدمانه لدى المراهقين المبكرين والمتوسطين: دراسة مقطعية من قطر",
    titleEn: "Assessing the Relationship Between the Type of Internet Use and Internet Addiction in Early and Middle Adolescents: Cross-Sectional Study From Qatar",
    authors: ["خنساء شمناد", "مريم عزيز", "سناء الحراحشة", "عزة عبد المنعم", "أحمد بغدادي", "ديانا الصايد حسن", "ريان علي"],
    institution: "جامعة حمد بن خليفة",
    institutionEn: "Hamad Bin Khalifa University",
    journal: "JMIR Human Factors",
    year: 2025,
    category: "HBKU",
    abstract: "دراسة مقطعية على 377 طالباً من 16 مدرسة في قطر تهدف إلى التمييز بين الاستخدام الضروري وغير الضروري للإنترنت وعلاقته بإدمان الإنترنت في المراهقين المبكرين (11-13 سنة) والمتوسطين (14-17 سنة).",
    keyFindings: [
      "الاستخدام غير الضروري للإنترنت مؤشر قوي على الإدمان في كلا المجموعتين",
      "الارتباط أقوى في المراهقين المبكرين (11-13 سنة)",
      "الاستخدام الضروري للإنترنت غير مرتبط بالإدمان",
      "ضرورة التمييز بين الاستخدام الضروري وغير الضروري في التدخلات الوقائية",
      "البرامج المدرسية الوقائية يجب أن تراعي الفروقات التنموية والثقافية"
    ],
    url: "https://humanfactors.jmir.org/2025/1/e62955/",
    doi: "10.2196/62955",
    tags: ["إدمان الإنترنت", "مراهقون", "مدارس قطر", "استخدام التكنولوجيا"],
    openAccess: true,
    relatedLaws: [
      { id: "laws", label: "قانون مكافحة الجرائم الإلكترونية", number: "ق. 14/2014", color: "bg-red-900/30 text-red-300 border-red-800/40" },
      { id: "laws", label: "استراتيجية الذكاء الاصطناعي", number: "2019", color: "bg-cyan-900/30 text-cyan-300 border-cyan-800/40" },
    ],
    highlightStats: [
      { label: "حجم العينة", value: "377", note: "طالباً من 16 مدرسة" },
      { label: "أشد عرضة للخطر", value: "11–13", note: "سنة (مراهقون مبكرون)" },
    ]
  },
  {
    id: 4,
    titleAr: "الإفراط في استخدام التكنولوجيا الرقمية لدى المراهقين: وجهات نظر الآباء والمراهقين والممارسين في قطر",
    titleEn: "Adolescent overuse of digital technology: Perspectives of parents, adolescents and practitioners in Qatar",
    authors: ["سناء الحراحشة", "عزة عبد المنعم", "أحمد بغدادي", "ريان علي", "مريم الخلف", "فاطمة المطوع"],
    institution: "معهد الدوحة الدولي للأسرة + HBKU",
    institutionEn: "DIFI + Hamad Bin Khalifa University",
    journal: "Hamad Bin Khalifa University Press",
    year: 2024,
    category: "DIFI",
    abstract: "بحث مشترك بين معهد الدوحة الدولي للأسرة (DIFI) وقمة الابتكار العالمية للصحة (WISH) وقمة الابتكار العالمية للتعليم (WISE) وجامعة حمد بن خليفة. يدرس تأثير الإفراط في استخدام التكنولوجيا الرقمية على تماسك الأسرة والصحة والتعلم، ويستعرض استراتيجيات الآباء لمواجهة الإفراط الرقمي لدى أبنائهم المراهقين.",
    keyFindings: [
      "الإفراط الرقمي يؤثر سلباً على تماسك الأسرة والعلاقات الأسرية",
      "تأثيرات صحية وتعليمية موثقة للإفراط في استخدام التكنولوجيا",
      "شُح الأساليب المُتحقق منها لمكافحة الإدمان الرقمي سواء في الوقاية أو التدخل",
      "الديناميكيات الثقافية في قطر تؤثر في أنماط استخدام التكنولوجيا الأسرية",
      "الحاجة إلى سياسات وطنية وبرامج تدخل متخصصة"
    ],
    url: "https://manara.qnl.qa/articles/report/Adolescent_overuse_of_digital_technology_Perspectives_of_parents_adolescents_and_practitioners_in_Qatar/24591189",
    tags: ["إدمان رقمي", "تماسك الأسرة", "مراهقون", "استراتيجيات الآباء"],
    openAccess: true,
    relatedLaws: [
      { id: "laws", label: "قرار إنشاء لجنة السلامة الرقمية", number: "ق.و. 38/2025", color: "bg-purple-900/30 text-purple-300 border-purple-800/40" },
      { id: "laws", label: "رؤية قطر الوطنية 2030", number: "2008", color: "bg-amber-900/30 text-amber-300 border-amber-800/40" },
    ]
  },
  {
    id: 5,
    titleAr: "رفاهية الطفولة في قطر: مسح الأسر القطرية — الفصل التاسع: رفاهية الطفل والإنترنت",
    titleEn: "Childhood Well-being in Qatar: Survey of Qatari Families — Chapter 9: Well-Being And The Internet",
    authors: ["فريق بحثي مشترك — DIFI + SESRI"],
    institution: "معهد الدوحة الدولي للأسرة + معهد البحوث الاقتصادية والاجتماعية (SESRI) - جامعة قطر",
    institutionEn: "DIFI + SESRI - Qatar University",
    journal: "تقرير بحثي — معهد الدوحة الدولي للأسرة",
    year: 2024,
    category: "DIFI",
    abstract: "أشمل مسح وطني للأسر القطرية حول رفاهية الطفولة (64 صفحة، 11 فصلاً). يُكرّس الفصل التاسع (ص 78–85) بالكامل لرصد علاقة الأطفال بالإنترنت: الوصول، ومتوسط وقت الشاشة، والتأثيرات الإيجابية والسلبية، والسلوكيات الاجتماعية والنفسية المرتبطة بالاستخدام الرقمي. البيانات مستقاة من عينة ممثلة للأسر القطرية (أكتوبر 2024).",
    keyFindings: [
      "81% من الأطفال لديهم إمكانية الوصول إلى الإنترنت",
      "متوسط وقت الشاشة اليومي: 4.5 ساعات لكل طفل",
      "90% من الآباء يوافقون أن أطفالهم يستفيدون من البحث عبر الإنترنت",
      "85% يقولون أن أطفالهم يفهمون ما يجب وما لا يجب مشاركته من بيانات شخصية",
      "49% يقولون أن استخدام الشاشات يؤثر سلباً على نوم أطفالهم",
      "29% يجدون صعوبة في إخراج أطفالهم من المنزل بسبب تفضيلهم للمحتوى الرقمي",
      "16% يوافقون أن أطفالهم مروا بتجارب سلبية في التفاعل مع الآخرين عبر الإنترنت"
    ],
    url: "https://difi.org.qa/wp-content/uploads/2025/07/Childhood-Well-being-in-Qatar.pdf",
    tags: ["رفاهية الطفولة", "مسح وطني", "الأسر القطرية", "الأطفال والإنترنت", "وقت الشاشة"],
    openAccess: true,
    relatedLaws: [
      { id: "laws", label: "قانون حماية البيانات الشخصية", number: "ق. 13/2016", color: "bg-blue-900/30 text-blue-300 border-blue-800/40" },
      { id: "laws", label: "قانون مكافحة الجرائم الإلكترونية", number: "ق. 14/2014", color: "bg-red-900/30 text-red-300 border-red-800/40" },
      { id: "laws", label: "قرار إنشاء لجنة السلامة الرقمية", number: "ق.و. 38/2025", color: "bg-purple-900/30 text-purple-300 border-purple-800/40" },
    ],
    highlightStats: [
      { label: "وصول للإنترنت", value: "81%", note: "من أطفال قطر" },
      { label: "وقت الشاشة اليومي", value: "4.5 ساعة", note: "متوسط لكل طفل" },
      { label: "تأثير سلبي على النوم", value: "49%", note: "من الآباء" },
    ],
    statGroups: [
      {
        title: "التأثيرات الإيجابية للتكنولوجيا",
        stats: [
          { label: "يستفيدون من البحث عبر الإنترنت", value: 90, color: "#4a9edd" },
          { label: "يفهمون خصوصية المعلومات الشخصية", value: 85, color: "#4a9edd" },
          { label: "يتعلمون مهارات جديدة عبر الإنترنت", value: 87, color: "#4a9edd" },
          { label: "يستكشفون هواياتهم رقمياً", value: 82, color: "#4a9edd" },
          { label: "الإنترنت مهم لمستقبلهم", value: 81, color: "#4a9edd" },
        ]
      },
      {
        title: "التأثيرات السلبية والمخاوف",
        stats: [
          { label: "يُعيد الأطفال مشاهدة نفس المحتوى", value: 59, color: "#e87a8a" },
          { label: "الشاشات تؤثر سلباً على النوم", value: 49, color: "#e87a8a" },
          { label: "صعوبة تمييز المعلومات الصحيحة", value: 41, color: "#e87a8a" },
          { label: "يرون محتوى مزعجاً عبر الإنترنت", value: 35, color: "#e87a8a" },
          { label: "يرفضون لقاء الأصدقاء للبقاء رقمياً", value: 29, color: "#e87a8a" },
          { label: "مقارنة غير صحية بالآخرين رقمياً", value: 24, color: "#e87a8a" },
          { label: "تجارب سلبية في التفاعل الرقمي", value: 16, color: "#e87a8a" },
        ]
      }
    ]
  },
  {
    id: 6,
    titleAr: "المخاطر الحقيقية للألعاب الرقمية: منظور سياساتي لحماية الأطفال والمراهقين في بيئات الألعاب الإلكترونية",
    titleEn: "Real risks of digital gameplay: A policy perspective on protecting children and adolescents in online gaming environments",
    authors: ["هالة أ. م. الأحمدي"],
    institution: "معهد الدوحة الدولي للأسرة",
    institutionEn: "Doha International Family Institute (DIFI)",
    journal: "Doha International Family Institute Journal",
    year: 2025,
    category: "DIFI",
    abstract: "تتناول هذه الدراسة المخاطر المتعددة الأبعاد المرتبطة ببيئات الألعاب الرقمية للأطفال والمراهقين، وتشمل الجوانب النفسية والاجتماعية والجسدية وما يتعلق بالبيانات الشخصية. تحلل حالات Fire Fairy وPokémon Go وPanda وRoblox، وتُقيّم السياسة القطرية في مجال الأمن السيبراني وحماية البيانات والمبادرات الموجهة للشباب.",
    keyFindings: [
      "خصائص المنصات كالواقع الافتراضي والمحتوى المُنتج من المستخدمين تُضخّم التعرض للمخاطر",
      "توصية بتقييد المنصات عالية الخطورة كـ Roblox ما لم تلتزم بمعايير السلامة",
      "ضرورة تعزيز أنظمة التحقق من العمر وتطوير أدوات المراقبة الذكية",
      "الحاجة إلى تحديث التشريعات الوطنية ودعم البدائل التعليمية الآمنة",
      "التعاون الدولي ضروري لمواجهة مخاطر الألعاب العابرة للحدود"
    ],
    url: "https://www.qscience.com/content/journals/10.5339/difi.2025.13",
    doi: "10.5339/difi.2025.13",
    tags: ["ألعاب رقمية", "Roblox", "حماية الأطفال", "السياسة الرقمية", "قطر"],
    openAccess: true,
    relatedLaws: [
      { id: "laws", label: "قانون حماية البيانات الشخصية", number: "ق. 13/2016", color: "bg-blue-900/30 text-blue-300 border-blue-800/40" },
      { id: "laws", label: "قانون مكافحة الجرائم الإلكترونية", number: "ق. 14/2014", color: "bg-red-900/30 text-red-300 border-red-800/40" },
      { id: "laws", label: "الاستراتيجية الوطنية للأمن السيبراني", number: "2014", color: "bg-amber-900/30 text-amber-300 border-amber-800/40" },
    ]
  },
  {
    id: 7,
    titleAr: "مراجعة منهجية لتأثير وسائل التواصل الاجتماعي على الرفاهية النفسية للأطفال والمراهقين والشباب في الدول العربية",
    titleEn: "A systematic review of social media impact on psychological well-being among children, adolescents, and young adults in Arab countries",
    authors: ["أماني الأنصاري", "عبدالله العواوي", "أماني سالم", "نزار طراوة", "أمين قسيا", "محمد سيد زعزوع"],
    institution: "مراجعة منهجية — دول عربية متعددة",
    institutionEn: "Systematic Review — Multiple Arab Countries",
    journal: "Asian Journal of Psychiatry",
    year: 2026,
    category: "دولية",
    abstract: "مراجعة منهجية شاملة لـ 21 دراسة مقطعية تشمل أكثر من 15,000 مشارك من الدول العربية بمتوسط أعمار 13-25 سنة. تهدف إلى تجميع الأدلة حول العلاقة بين استخدام وسائل التواصل الاجتماعي ومؤشرات الصحة النفسية.",
    keyFindings: [
      "ارتباط ثابت بين الاستخدام المفرط لوسائل التواصل الاجتماعي والقلق والاكتئاب",
      "اضطرابات النوم وتراجع التحصيل الدراسي من أبرز النتائج الموثقة",
      "الاستخدام العاطفي والاستخدام الليلي من أبرز الوسطاء",
      "الحاجة إلى برامج محو الأمية الرقمية المصممة ثقافياً للبيئة العربية",
      "غلبة التصاميم المقطعية تحدّ من استنتاج العلاقات السببية"
    ],
    url: "https://www.sciencedirect.com/science/article/pii/S1876201825004368",
    doi: "10.1016/j.ajp.2025.104793",
    tags: ["وسائل التواصل الاجتماعي", "صحة نفسية", "دول عربية", "مراجعة منهجية"],
    openAccess: true,
    relatedLaws: [
      { id: "laws", label: "قانون مكافحة الجرائم الإلكترونية", number: "ق. 14/2014", color: "bg-red-900/30 text-red-300 border-red-800/40" },
      { id: "laws", label: "قانون حماية البيانات الشخصية", number: "ق. 13/2016", color: "bg-blue-900/30 text-blue-300 border-blue-800/40" },
    ],
    highlightStats: [
      { label: "دراسة مُراجَعة", value: "21", note: "دراسة مقطعية" },
      { label: "مشاركون", value: "+15,000", note: "من الدول العربية" },
    ]
  }
];

const categoryColors: Record<string, string> = {
  "جامعة قطر": "bg-[#8B1A2F]/20 text-[#e87a8a] border-[#8B1A2F]/40",
  "HBKU": "bg-[#1a4a8B]/20 text-[#7aaae8] border-[#1a4a8B]/40",
  "DIFI": "bg-[#1a6B4a]/20 text-[#7ae8b0] border-[#1a6B4a]/40",
  "دولية": "bg-[#5a1a8B]/20 text-[#b07ae8] border-[#5a1a8B]/40",
};

const categoryBg: Record<string, string> = {
  "جامعة قطر": "border-[#8B1A2F]/30 hover:border-[#8B1A2F]/60",
  "HBKU": "border-[#1a4a8B]/30 hover:border-[#1a4a8B]/60",
  "DIFI": "border-[#1a6B4a]/30 hover:border-[#1a6B4a]/60",
  "دولية": "border-[#5a1a8B]/30 hover:border-[#5a1a8B]/60",
};

function StatBarChart({ group }: { group: StatGroup }) {
  return (
    <div className="mb-4">
      <h5 className="text-xs font-semibold mb-3 flex items-center gap-1.5" style={{ color: group.stats[0]?.color || "#4a9edd" }}>
        <BarChart2 className="w-3.5 h-3.5" />
        {group.title}
      </h5>
      <div className="space-y-2.5">
        {group.stats.map((stat, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#8899aa]">{stat.label}</span>
              <span className="text-xs font-bold" style={{ color: stat.color }}>{stat.value}%</span>
            </div>
            <div className="h-1.5 bg-[#0a1520]/80 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${stat.value}%`, backgroundColor: stat.color, opacity: 0.85 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ResearchStudiesSection() {
  const [activeCategory, setActiveCategory] = useState<string>("الكل");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["الكل", "جامعة قطر", "HBKU", "DIFI", "دولية"];

  const filtered = studies.filter(s => {
    const matchCat = activeCategory === "الكل" || s.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || s.titleAr.toLowerCase().includes(q) ||
      s.authors.some(a => a.toLowerCase().includes(q)) ||
      s.tags.some(t => t.toLowerCase().includes(q)) ||
      s.institution.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <section id="research" className="py-16 px-6 md:px-10" dir="rtl">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#1a3a5c] border border-[#2a5a8c]/50 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-[#4a9edd]" />
          </div>
          <div>
            <p className="text-xs text-[#4a9edd] font-medium tracking-widest uppercase">أبحاث موثقة</p>
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Lusail', sans-serif" }}>
              الدراسات والأبحاث العلمية
            </h2>
          </div>
        </div>
        <p className="text-[#8899aa] text-sm leading-relaxed max-w-2xl">
          دراسات وأبحاث علمية محكّمة صادرة عن جامعة قطر ومؤسسة قطر والمؤسسات البحثية القطرية حول السلامة الرقمية للأطفال والمراهقين.
        </p>

        {/* Stats bar */}
        <div className="flex flex-wrap gap-4 mt-6">
          {[
            { label: "دراسة موثقة", value: studies.length },
            { label: "مؤسسة بحثية", value: 4 },
            { label: "وصول مفتوح", value: studies.filter(s => s.openAccess).length },
            { label: "سنوات البحث", value: "2021–2026" },
          ].map((stat, i) => (
            <div key={i} className="bg-[#0d1f35]/60 border border-[#1e3a5c]/50 rounded-lg px-4 py-2 flex items-center gap-2">
              <span className="text-[#4a9edd] font-bold text-lg">{stat.value}</span>
              <span className="text-[#8899aa] text-xs">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a6a8a]" />
          <input
            type="text"
            placeholder="ابحث في الدراسات..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#0d1f35]/80 border border-[#1e3a5c]/60 rounded-lg pr-10 pl-4 py-2.5 text-sm text-white placeholder-[#4a6a8a] focus:outline-none focus:border-[#4a9edd]/60 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-[#4a6a8a] shrink-0" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all border ${
                activeCategory === cat
                  ? "bg-[#4a9edd]/20 text-[#4a9edd] border-[#4a9edd]/50"
                  : "bg-transparent text-[#8899aa] border-[#1e3a5c]/50 hover:border-[#4a9edd]/30 hover:text-[#aabbcc]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Studies Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[#4a6a8a]">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>لا توجد دراسات تطابق بحثك</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(study => {
            const isExpanded = expandedId === study.id;
            return (
              <div
                key={study.id}
                className={`bg-[#0d1f35]/70 border rounded-xl transition-all duration-300 ${categoryBg[study.category]}`}
              >
                {/* Card Header */}
                <div className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div className="flex flex-wrap gap-2">
                      <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${categoryColors[study.category]}`}>
                        {study.category}
                      </span>
                      {study.openAccess && (
                        <span className="text-xs px-2.5 py-1 rounded-full border bg-emerald-900/20 text-emerald-400 border-emerald-800/40 font-medium">
                          وصول مفتوح
                        </span>
                      )}
                      <span className="text-xs px-2.5 py-1 rounded-full border bg-[#1a2a3a]/60 text-[#8899aa] border-[#2a3a4a]/50">
                        {study.year}
                      </span>
                    </div>
                    <a
                      href={study.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-xs text-[#4a9edd] hover:text-[#7abfee] transition-colors border border-[#4a9edd]/30 hover:border-[#4a9edd]/60 rounded-md px-3 py-1.5"
                    >
                      <ExternalLink className="w-3 h-3" />
                      عرض الدراسة
                    </a>
                  </div>

                  <h3 className="text-white font-semibold text-base leading-relaxed mb-2" style={{ fontFamily: "'Lusail', sans-serif" }}>
                    {study.titleAr}
                  </h3>
                  <p className="text-[#6a8aaa] text-xs mb-3 leading-relaxed">{study.titleEn}</p>

                  <div className="flex flex-wrap gap-4 text-xs text-[#6a8aaa]">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#4a7a9a]" />
                      <span>{study.authors.join("، ")}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#4a7a9a]" />
                      <span>{study.institution}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#4a7a9a]" />
                      <span>{study.journal}</span>
                    </div>
                  </div>

                  {/* Highlight Stats (quick KPIs) */}
                  {study.highlightStats && (
                    <div className="flex flex-wrap gap-3 mt-4">
                      {study.highlightStats.map((hs, i) => (
                        <div key={i} className="bg-[#0a1520]/70 border border-[#1e3a5c]/50 rounded-lg px-3 py-2 text-center min-w-[80px]">
                          <div className="text-[#4a9edd] font-bold text-lg leading-tight">{hs.value}</div>
                          <div className="text-[#6a8aaa] text-xs mt-0.5">{hs.label}</div>
                          {hs.note && <div className="text-[#4a6a8a] text-xs">{hs.note}</div>}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Related Laws */}
                  {study.relatedLaws && study.relatedLaws.length > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Scale className="w-3.5 h-3.5 text-[#4a7a9a]" />
                        <span className="text-xs text-[#6a8aaa] font-medium">القوانين المرتبطة</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {study.relatedLaws.map((law, i) => (
                          <button
                            key={i}
                            onClick={scrollToLaws}
                            className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border transition-all hover:opacity-90 hover:scale-105 active:scale-95 ${law.color}`}
                            title={`الانتقال إلى قسم التشريعات — ${law.label}`}
                          >
                            <Scale className="w-3 h-3 shrink-0" />
                            <span className="font-medium">{law.number}</span>
                            <span className="opacity-80">·</span>
                            <span>{law.label}</span>
                            <ArrowLeft className="w-3 h-3 opacity-60" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {study.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded bg-[#1a2a3a]/80 text-[#6a8aaa] border border-[#2a3a4a]/50">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Expand toggle */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : study.id)}
                    className="mt-4 flex items-center gap-1.5 text-xs text-[#4a9edd] hover:text-[#7abfee] transition-colors"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-3.5 h-3.5" />
                        إخفاء التفاصيل
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3.5 h-3.5" />
                        عرض الملخص والنتائج
                      </>
                    )}
                  </button>
                </div>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="border-t border-[#1e3a5c]/40 px-5 pb-5 pt-4 space-y-5">
                    {/* Abstract */}
                    <div>
                      <h4 className="text-xs font-semibold text-[#4a9edd] mb-2 uppercase tracking-wider">الملخص</h4>
                      <p className="text-[#8899aa] text-sm leading-relaxed">{study.abstract}</p>
                    </div>

                    {/* Key Findings */}
                    <div>
                      <h4 className="text-xs font-semibold text-[#4a9edd] mb-3 uppercase tracking-wider">النتائج الرئيسية</h4>
                      <ul className="space-y-2">
                        {study.keyFindings.map((finding, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-[#8899aa]">
                            <span className="w-5 h-5 rounded-full bg-[#4a9edd]/10 border border-[#4a9edd]/30 text-[#4a9edd] text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                              {i + 1}
                            </span>
                            {finding}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Visual stat charts (DIFI Chapter 9) */}
                    {study.statGroups && study.statGroups.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-[#4a9edd] mb-4 uppercase tracking-wider flex items-center gap-1.5">
                          <BarChart2 className="w-3.5 h-3.5" />
                          البيانات الإحصائية التفصيلية — الفصل التاسع
                        </h4>
                        <div className="grid md:grid-cols-2 gap-6">
                          {study.statGroups.map((group, gi) => (
                            <div key={gi} className="bg-[#0a1520]/60 border border-[#1e3a5c]/40 rounded-lg p-4">
                              <StatBarChart group={group} />
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-[#4a6a8a] mt-3">
                          * النسب المئوية تمثل إجابات "أوافق" أو "أوافق بشدة" من عينة الأسر القطرية (أكتوبر 2024).
                          المصدر: DIFI + SESRI — جامعة قطر.
                        </p>
                      </div>
                    )}

                    {/* DOI */}
                    {study.doi && (
                      <div className="flex items-center gap-2 text-xs text-[#4a6a8a]">
                        <span className="font-mono bg-[#0a1520]/60 border border-[#1a2a3a]/60 rounded px-2 py-1">
                          DOI: {study.doi}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Footer note */}
      <div className="mt-8 p-4 bg-[#0a1520]/60 border border-[#1e3a5c]/40 rounded-lg">
        <p className="text-xs text-[#4a6a8a] text-center leading-relaxed">
          جميع الدراسات المذكورة منشورة في مجلات علمية محكّمة أو مستودعات بحثية معتمدة.
          الروابط تُوجّه مباشرةً إلى المصادر الأصلية.
          للاطلاع على قائمة أشمل، يُرجى زيارة{" "}
          <a href="https://qspace.qu.edu.qa" target="_blank" rel="noopener noreferrer" className="text-[#4a9edd] hover:underline">
            مستودع جامعة قطر (QSpace)
          </a>
          {" "}و{" "}
          <a href="https://difi.org.qa" target="_blank" rel="noopener noreferrer" className="text-[#4a9edd] hover:underline">
            معهد الدوحة الدولي للأسرة
          </a>.
        </p>
      </div>
    </section>
  );
}
