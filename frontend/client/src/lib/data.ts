// Qatar Digital Safety for Children - Legislative Data
// Design: Modern Arabic Institutional (Qatar maroon + gold palette)

export interface LawItem {
  id: string;
  title: string;
  number: string;
  year: number;
  type: 'constitution' | 'national' | 'strategy' | 'international' | 'decree';
  typeLabel: string;
  authority: string;
  summary: string;
  articles: { number: string; text: string }[];
  penalties?: string;
  importance: 'high' | 'medium' | 'low';
  tags: string[];
}

export type SourceType = 'law' | 'decree' | 'official' | 'inferred';

export interface ProgramItem {
  text: string;
  source: SourceType;      // نوع المصدر
  sourceRef?: string;      // مرجع المصدر (مثل: قانون 14/2014)
  sourceUrl?: string;      // رابط مباشر للمصدر
}

export interface Institution {
  id: string;
  name: string;
  shortName: string;
  role: string;
  roleSource: SourceType;  // مصدر الدور
  roleRef?: string;        // مرجع الدور
  programs: ProgramItem[];
  color: string;
  tier: 'primary' | 'supporting';
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface Initiative {
  id: string;
  name: string;
  operator: string;
  year: number;
  description: string;
  components: string[];
  targets: string[];
  website?: string;
}

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  type: 'law' | 'strategy' | 'institution' | 'initiative' | 'international';
  importance: 'major' | 'minor';
}

export const laws: LawItem[] = [
  {
    id: 'constitution-2004',
    title: 'الدستور الدائم لدولة قطر',
    number: 'الدستور الدائم',
    year: 2004,
    type: 'constitution',
    typeLabel: 'دستور',
    authority: 'دولة قطر',
    summary: 'يُشكّل المرجعية العليا لجميع التشريعات، ويكفل حماية الطفولة والأمومة ودور الأسرة في صون الأطفال من الاستغلال والإهمال.',
    articles: [
      { number: 'المادة 21', text: 'تؤكد دور الأسرة في حماية الأطفال من الاستغلال والإهمال وتنشئتهم تنشئة صالحة.' },
      { number: 'المادة 22', text: 'تكفل الدولة حماية الطفولة والأمومة وترعى النشء وتحميه من الانحراف.' },
    ],
    importance: 'high',
    tags: ['الأسرة', 'الطفولة', 'الحماية', 'المرجعية العليا'],
  },
  {
    id: 'cybercrime-2014',
    title: 'قانون مكافحة الجرائم الإلكترونية',
    number: 'رقم (14) لسنة 2014',
    year: 2014,
    type: 'national',
    typeLabel: 'قانون وطني',
    authority: 'وزارة الاتصالات وتكنولوجيا المعلومات',
    summary: 'يُجرِّم الجرائم الإلكترونية بما فيها استغلال الأطفال عبر الإنترنت، ويُعرِّف الطفل بأنه كل من لم يبلغ 18 سنة.',
    articles: [
      { number: 'المادة 7', text: 'تجريم إنتاج المواد الإباحية للأطفال أو استيرادها أو بيعها أو نشرها عبر تقنية المعلومات. العقوبة: الحبس حتى 5 سنوات وغرامة حتى 500,000 ريال.' },
      { number: 'المادة 9', text: 'تجريم الابتزاز الإلكتروني. العقوبة: الحبس حتى 3 سنوات أو غرامة حتى 100,000 ريال.' },
    ],
    penalties: 'الحبس حتى 5 سنوات وغرامة حتى 500,000 ريال قطري',
    importance: 'high',
    tags: ['الجرائم الإلكترونية', 'الاستغلال', 'الابتزاز', 'العقوبات'],
  },
  {
    id: 'data-privacy-2016',
    title: 'قانون حماية خصوصية البيانات الشخصية',
    number: 'رقم (13) لسنة 2016',
    year: 2016,
    type: 'national',
    typeLabel: 'قانون وطني',
    authority: 'وزارة الاتصالات وتكنولوجيا المعلومات',
    summary: 'يُصنِّف بيانات الأطفال ضمن البيانات الحساسة ويُلزم مشغلي المواقع بالحصول على موافقة ولي الأمر قبل معالجة بيانات الأطفال.',
    articles: [
      { number: 'المادة 16', text: 'تصنيف بيانات الأطفال ضمن الفئات الخاصة (البيانات الحساسة) التي تستوجب حماية مشددة.' },
      { number: 'المادة 17', text: 'التزامات مشغلي المواقع الموجهة للأطفال: وضع إشعار واضح، الحصول على موافقة ولي الأمر، منح حق الاطلاع والحذف.' },
      { number: 'المادة 27', text: 'التعاون مع المنظمات المعنية بشؤون الأسرة لتعزيز سلامة الأطفال على الإنترنت.' },
    ],
    importance: 'high',
    tags: ['الخصوصية', 'البيانات الشخصية', 'ولي الأمر', 'المواقع الإلكترونية'],
  },
  {
    id: 'juvenile-1994',
    title: 'قانون الأحداث',
    number: 'رقم (1) لسنة 1994',
    year: 1994,
    type: 'national',
    typeLabel: 'قانون وطني',
    authority: 'وزارة العدل',
    summary: 'يتضمن أحكاماً لحماية الأطفال من الاستغلال وينظم محكمة الأحداث لضمان معاملة عادلة للأطفال في النظام القضائي.',
    articles: [
      { number: 'المواد 28-44', text: 'تنظيم محكمة الأحداث وضمان معاملة عادلة للأطفال في الإجراءات القضائية.' },
    ],
    importance: 'medium',
    tags: ['الأحداث', 'القضاء', 'الحماية القانونية'],
  },
  {
    id: 'cabinet-decree-2025',
    title: 'قرار إنشاء لجنة السلامة الرقمية للأطفال والنشء',
    number: 'قرار مجلس الوزراء رقم (38) لسنة 2025',
    year: 2025,
    type: 'decree',
    typeLabel: 'قرار وزاري',
    authority: 'مجلس الوزراء',
    summary: 'أنشأ لجنة وطنية متخصصة للسلامة الرقمية للأطفال برئاسة وزارة التنمية الاجتماعية ونيابة الوكالة الوطنية للأمن السيبراني.',
    articles: [
      { number: 'الهيكل التنظيمي', text: 'الرئاسة: وزارة التنمية الاجتماعية والأسرة. نيابة الرئاسة: الوكالة الوطنية للأمن السيبراني. العضوية: ممثلون من وزارات الداخلية والعدل والتعليم والصحة والاتصالات والثقافة والرياضة.' },
      { number: 'الاختصاصات', text: 'اقتراح سياسات وتشريعات، إعداد دراسات تحليلية، التنسيق بين الجهات، توفير الدعم الفني والتوعوي.' },
    ],
    importance: 'high',
    tags: ['اللجنة الوطنية', 'السلامة الرقمية', 'الحوكمة', '2025'],
  },
  {
    id: 'crc-1989',
    title: 'اتفاقية حقوق الطفل',
    number: 'اتفاقية الأمم المتحدة 1989',
    year: 1989,
    type: 'international',
    typeLabel: 'اتفاقية دولية',
    authority: 'الأمم المتحدة (صادقت عليها قطر)',
    summary: 'الإطار الدولي الشامل لحقوق الطفل. تُعرِّف الطفل بأنه كل إنسان لم يبلغ 18 سنة وتكفل حقه في الحماية من الاستغلال.',
    articles: [
      { number: 'المادة 13', text: 'حق الطفل في حرية التعبير وتلقي المعلومات.' },
      { number: 'المادة 17', text: 'تشجيع وسائل الإعلام على نشر مواد تعود بالنفع على الطفل وحمايته من المواد الضارة.' },
      { number: 'المادة 34', text: 'حماية الطفل من الاستغلال الجنسي والإساءة الجنسية.' },
    ],
    importance: 'high',
    tags: ['حقوق الطفل', 'الأمم المتحدة', 'الإطار الدولي', 'التصديق'],
  },
  {
    id: 'cybersecurity-strategy-2014',
    title: 'الاستراتيجية الوطنية للأمن السيبراني',
    number: '2014-2018',
    year: 2014,
    type: 'strategy',
    typeLabel: 'استراتيجية وطنية',
    authority: 'ictQATAR (وزارة الاتصالات)',
    summary: 'تضمنت مبادرة خاصة لتعزيز الوعي بالأمن السيبراني عبر قنوات متعددة تستهدف الأطفال الصغار والطلاب وأولياء الأمور.',
    articles: [
      { number: 'الهدف الرابع', text: 'تعزيز ثقافة الأمن السيبراني التي تُشجع على الاستخدام الآمن والملائم للفضاء الإلكتروني.' },
      { number: 'المبادرة الخاصة', text: 'تعزيز الوعي بالأمن السيبراني عبر قنوات متعددة تستهدف الفئات الديموغرافية المختلفة بما فيها الأطفال.' },
    ],
    importance: 'high',
    tags: ['الأمن السيبراني', 'الاستراتيجية الوطنية', 'التوعية', 'الأطفال'],
  },
  {
    id: 'ai-strategy-2019',
    title: 'استراتيجية قطر الوطنية للذكاء الاصطناعي',
    number: '2019',
    year: 2019,
    type: 'strategy',
    typeLabel: 'استراتيجية وطنية',
    authority: 'وزارة الاتصالات وتكنولوجيا المعلومات',
    summary: 'تتضمن أهدافاً لتمكين الأطفال في الفضاء الرقمي وتطوير برامج الذكاء الاصطناعي بأطر تحمي بيانات المستخدمين بما فيهم الأطفال.',
    articles: [
      { number: 'ركيزة الأخلاقيات', text: 'ضمان تطوير تطبيقات الذكاء الاصطناعي بأطر أخلاقية تحمي بيانات المستخدمين وخاصة الأطفال.' },
    ],
    importance: 'medium',
    tags: ['الذكاء الاصطناعي', 'الاستراتيجية', 'الأخلاقيات الرقمية', 'تمكين الأطفال'],
  },
  {
    id: 'qatar-vision-2030',
    title: 'رؤية قطر الوطنية 2030',
    number: '2008',
    year: 2008,
    type: 'strategy',
    typeLabel: 'وثيقة وطنية',
    authority: 'دولة قطر',
    summary: 'تتضمن محاور لحماية حقوق الأطفال ودعم التنمية الرقمية الآمنة ضمن التنمية البشرية المستدامة.',
    articles: [
      { number: 'التنمية البشرية', text: 'تطوير قدرات الإنسان القطري وحماية الأطفال وتمكينهم من الاستفادة من التكنولوجيا بأمان.' },
    ],
    importance: 'medium',
    tags: ['رؤية 2030', 'التنمية البشرية', 'حماية الأطفال'],
  },
];

export const institutions: Institution[] = [
  // ─── جهات رئيسية ───────────────────────────────────────────────────────────
  {
    id: 'ncsa',
    name: 'الوكالة الوطنية للأمن السيبراني',
    shortName: 'NCSA',
    role: 'نائب رئيس لجنة السلامة الرقمية — حماية البنية التحتية الرقمية الوطنية، وضع معايير الأمن السيبراني، وإدارة التهديدات والحوادث الرقمية، ودعم الجهات الحكومية تقنياً',
    roleSource: 'decree',
    roleRef: 'قرار 38/2025',
    programs: [
      { text: 'إدارة التهديدات السيبرانية التي تستهدف الأطفال ورصدها', source: 'official', sourceRef: 'ncsa.gov.qa', sourceUrl: 'https://www.ncsa.gov.qa/ar' },
      { text: 'وضع معايير الأمن السيبراني للمنصات والتطبيقات الرقمية', source: 'official', sourceRef: 'ncsa.gov.qa', sourceUrl: 'https://www.ncsa.gov.qa/ar' },
      { text: 'تقديم الدعم الفني للجهات الحكومية (التعليم، الصحة، الداخلية)', source: 'decree', sourceRef: 'قرار 38/2025', sourceUrl: 'https://almeezan.qa/LawView.aspx?opt&LawID=10265&language=ar' },
      { text: 'مشروع مناهج الأمن السيبراني التعليمية (الأول من نوعه في المنطقة)', source: 'official', sourceRef: 'ncsa.gov.qa', sourceUrl: 'https://www.ncsa.gov.qa/ar' },
      { text: 'برنامج Q-CERT لتدريب الكوادر المتخصصة', source: 'official', sourceRef: 'ncsa.gov.qa', sourceUrl: 'https://www.ncsa.gov.qa/ar' },
    ],
    color: '#8D1B3D',
    tier: 'primary',
    website: 'www.ncsa.gov.qa',
    email: 'info@ncsa.gov.qa',
    phone: '+974 4496 5555',
    address: 'الدوحة، دولة قطر',
  },
  {
    id: 'mcit',
    name: 'وزارة الاتصالات وتكنولوجيا المعلومات',
    shortName: 'MCIT',
    role: 'قيادة سياسات السلامة الرقمية على المستوى الوطني، تنظيم البيئة الرقمية والخدمات الإلكترونية، إطلاق مبادرات التوعية الرقمية، والتنسيق مع مزودي الخدمات وشركات التكنولوجيا',
    roleSource: 'decree',
    roleRef: 'قرار 38/2025',
    programs: [
      { text: 'تطوير السياسة الوطنية للسلامة الرقمية بالتنسيق مع وزارة التنمية الاجتماعية', source: 'decree', sourceRef: 'قرار 38/2025', sourceUrl: 'https://almeezan.qa/LawView.aspx?opt&LawID=10265&language=ar' },
      { text: 'تنظيم المنصات الرقمية لضمان حماية الأطفال', source: 'law', sourceRef: 'قانون 13/2016', sourceUrl: 'https://almeezan.qa/LawPage.aspx?id=6366&language=ar' },
      { text: 'مبادرة سيف سبيس (Safe Space) — المنصة الوطنية للسلامة الرقمية', source: 'official', sourceRef: 'safespace.qa', sourceUrl: 'https://www.safespace.qa' },
      { text: 'مسلسل "عالم سيف" للأطفال (2025)', source: 'official', sourceRef: 'safespace.qa', sourceUrl: 'https://www.safespace.qa' },
      { text: 'إطلاق تطبيقات الرقابة الأبوية (Parental Controls)', source: 'official', sourceRef: 'mcit.gov.qa', sourceUrl: 'https://www.mcit.gov.qa/ar' },
      { text: 'تعزيز حماية بيانات الأطفال ضمن السياسات الرقمية', source: 'law', sourceRef: 'قانون 13/2016', sourceUrl: 'https://almeezan.qa/LawPage.aspx?id=6366&language=ar' },
    ],
    color: '#1C2B3A',
    tier: 'primary',
    website: 'www.mcit.gov.qa',
    email: 'info@mcit.gov.qa',
    phone: '+974 4496 5000',
    address: 'برج الاتصالات، الدوحة',
  },
  {
    id: 'cra',
    name: 'هيئة تنظيم الاتصالات',
    shortName: 'CRA',
    role: 'تنظيم مزودي خدمات الاتصالات والإنترنت، فرض متطلبات حماية المستخدمين، تعزيز أدوات الرقابة الأبوية، ومراقبة الامتثال وإدارة الشكاوى',
    roleSource: 'law',
    roleRef: 'قانون 13/2016',
    programs: [
      { text: 'فرض متطلبات إلزامية على مزودي الخدمة لحماية الأطفال', source: 'law', sourceRef: 'قانون 13/2016', sourceUrl: 'https://almeezan.qa/LawPage.aspx?id=6366&language=ar' },
      { text: 'تطوير أدوات رقابية على المحتوى الضار', source: 'official', sourceRef: 'cra.gov.qa', sourceUrl: 'https://www.cra.gov.qa/ar' },
      { text: 'تعزيز نظام شكاوى المستخدمين المتعلق بالأطفال', source: 'official', sourceRef: 'cra.gov.qa', sourceUrl: 'https://www.cra.gov.qa/ar' },
      { text: 'إلزام الشركات بتوفير أدوات الحماية الافتراضية', source: 'law', sourceRef: 'قانون 13/2016', sourceUrl: 'https://almeezan.qa/LawPage.aspx?id=6366&language=ar' },
      { text: 'رئاسة مجموعة الدراسة 17 للاتحاد الدولي للاتصالات', source: 'official', sourceRef: 'cra.gov.qa', sourceUrl: 'https://www.cra.gov.qa/ar' },
    ],
    color: '#C9A84C',
    tier: 'primary',
    website: 'www.cra.gov.qa',
    email: 'info@cra.gov.qa',
    phone: '+974 4496 5000',
    address: 'الدوحة، دولة قطر',
  },
  {
    id: 'nic',
    name: 'اللجنة الوطنية لأمن المعلومات',
    shortName: 'NIC',
    role: 'تنسيق الجهود الوطنية لأمن المعلومات بنهج متعدد الأطراف، وضع السياسات الوطنية للأمن السيبراني، وتنظيم التعاون بين القطاعين العام والخاص',
    roleSource: 'official',
    roleRef: 'motc.gov.qa',
    programs: [
      { text: 'لجنة فرعية لشؤون الأسرة والأطفال في الفضاء الرقمي', source: 'official', sourceRef: 'motc.gov.qa', sourceUrl: 'https://www.motc.gov.qa/ar' },
      { text: 'لجنة فرعية لإدارة المحتوى الرقمي', source: 'official', sourceRef: 'motc.gov.qa', sourceUrl: 'https://www.motc.gov.qa/ar' },
      { text: 'لجنة فرعية للإطار القانوني والتشريعي', source: 'official', sourceRef: 'motc.gov.qa', sourceUrl: 'https://www.motc.gov.qa/ar' },
    ],
    color: '#2E7D32',
    tier: 'primary',
    website: 'www.motc.gov.qa',
    email: 'info@motc.gov.qa',
    phone: '+974 4496 5000',
    address: 'الدوحة، دولة قطر',
  },
  {
    id: 'moi',
    name: 'وزارة الداخلية',
    shortName: 'MOI',
    role: 'التحقيق في الجرائم الإلكترونية، استقبال البلاغات المتعلقة بالأطفال (ابتزاز، تنمر، اختراق)، حماية الضحايا، وتطبيق قانون مكافحة الجرائم الإلكترونية رقم 14 لسنة 2014',
    roleSource: 'law',
    roleRef: 'قانون 14/2014',
    programs: [
      { text: 'إدارة مكافحة الجرائم الاقتصادية والإلكترونية (وحدة حماية الطفل)', source: 'official', sourceRef: 'moi.gov.qa', sourceUrl: 'https://portal.moi.gov.qa/wps/portal/MOIInternet/departmentcommittees/cybercrimes' },
      { text: 'استقبال البلاغات عبر قنوات متعددة يسهل وصول الأطفال والأسر إليها', source: 'official', sourceRef: 'moi.gov.qa', sourceUrl: 'https://portal.moi.gov.qa' },
      { text: 'تطوير وحدات متخصصة في الجرائم الرقمية المتعلقة بالأطفال', source: 'law', sourceRef: 'قانون 14/2014', sourceUrl: 'https://almeezan.qa/LawPage.aspx?id=6366&language=ar' },
      { text: 'التنسيق مع النيابة العامة والجهات الدولية لملاحقة الجناة', source: 'law', sourceRef: 'قانون 14/2014', sourceUrl: 'https://almeezan.qa/LawPage.aspx?id=6366&language=ar' },
    ],
    color: '#7B1FA2',
    tier: 'primary',
    website: 'www.moi.gov.qa',
    email: 'info@moi.gov.qa',
    phone: '+974 2347 444',
    address: 'شارع اللواء، الدوحة',
  },
  // ─── جهات داعمة ───────────────────────────────────────────────────────────
  {
    id: 'moe',
    name: 'وزارة التربية والتعليم',
    shortName: 'MOE',
    role: 'دمج السلامة الرقمية في المناهج الدراسية لجميع المراحل، وضع سياسات استخدام الأجهزة في المدارس، تدريب المعلمين، وإدارة الحوادث الرقمية داخل البيئة المدرسية',
    roleSource: 'decree',
    roleRef: 'قرار 38/2025',
    programs: [
      { text: 'دمج السلامة الرقمية في المناهج الدراسية بشكل منهجي (بالتعاون مع NCSA)', source: 'decree', sourceRef: 'قرار 38/2025', sourceUrl: 'https://almeezan.qa/LawView.aspx?opt&LawID=10265&language=ar' },
      { text: 'تدريب جميع المعلمين على التعامل مع المخاطر الرقمية', source: 'official', sourceRef: 'edu.gov.qa', sourceUrl: 'https://www.edu.gov.qa/ar' },
      { text: 'تعزيز إشراك أولياء الأمور في التوعية الرقمية', source: 'official', sourceRef: 'edu.gov.qa', sourceUrl: 'https://www.edu.gov.qa/ar' },
    ],
    color: '#0277BD',
    tier: 'primary',
    website: 'www.edu.gov.qa',
    email: 'info@edu.gov.qa',
    phone: '+974 4494 4444',
    address: 'شارع الكورنيش، الدوحة',
  },
  {
    id: 'msf',
    name: 'وزارة التنمية الاجتماعية والأسرة',
    shortName: 'MSF',
    role: 'رئاسة لجنة السلامة الرقمية للأطفال والنشء (قرار 38/2025) — قيادة التوجه الاستراتيجي الوطني، حماية الطفل والأسرة من المخاطر الرقمية، والتوعية المجتمعية والتدخل الاجتماعي',
    roleSource: 'decree',
    roleRef: 'قرار 38/2025',
    programs: [
      { text: 'رئاسة لجنة السلامة الرقمية للأطفال والنشء وإدارة اجتماعاتها', source: 'decree', sourceRef: 'قرار 38/2025', sourceUrl: 'https://almeezan.qa/LawView.aspx?opt&LawID=10265&language=ar' },
      { text: 'اقتراح سياسات وتشريعات للسلامة الرقمية للأطفال وفق قرار 38/2025', source: 'decree', sourceRef: 'قرار 38/2025', sourceUrl: 'https://almeezan.qa/LawView.aspx?opt&LawID=10265&language=ar' },
      { text: 'إطلاق برنامج وطني للتوعية الأسرية بمخاطر الفضاء الرقمي', source: 'official', sourceRef: 'msdf.gov.qa', sourceUrl: 'https://www.msdf.gov.qa/ar' },
      { text: 'دعم الحالات الاجتماعية المرتبطة بالمخاطر الرقمية عالية الخطورة', source: 'official', sourceRef: 'msdf.gov.qa', sourceUrl: 'https://www.msdf.gov.qa/ar' },
    ],
    color: '#AD1457',
    tier: 'primary',
    website: 'www.msdf.gov.qa',
    email: 'info@msdf.gov.qa',
    phone: '+974 4406 0000',
    address: 'شارع الكورنيش، الدوحة',
  },
  {
    id: 'moph',
    name: 'وزارة الصحة العامة',
    shortName: 'MOPH',
    role: 'معالجة الآثار النفسية والصحية المرتبطة بالاستخدام الرقمي لدى الأطفال، دعم الصحة النفسية للأطفال ضحايا الجرائم الإلكترونية، وتقديم التوعية الصحية للأسر',
    roleSource: 'decree',
    roleRef: 'قرار 38/2025',
    programs: [
      { text: 'تطوير برامج وطنية للصحة النفسية الرقمية للأطفال', source: 'official', sourceRef: 'moph.gov.qa', sourceUrl: 'https://www.moph.gov.qa/ar' },
      { text: 'إنشاء خدمات دعم نفسي للحالات المرتبطة بالمخاطر الرقمية', source: 'official', sourceRef: 'moph.gov.qa', sourceUrl: 'https://www.moph.gov.qa/ar' },
      { text: 'إطلاق حملات توعية حول التأثيرات النفسية للتكنولوجيا', source: 'official', sourceRef: 'moph.gov.qa', sourceUrl: 'https://www.moph.gov.qa/ar' },
    ],
    color: '#00838F',
    tier: 'supporting',
    website: 'www.moph.gov.qa',
    email: 'info@moph.gov.qa',
    phone: '+974 4407 0000',
    address: 'شارع الكورنيش، الدوحة',
  },
  {
    id: 'moj',
    name: 'وزارة العدل',
    shortName: 'MOJ',
    role: 'تعزيز الوعي القانوني المجتمعي بشأن الجرائم الرقمية، ودعم تسريع التقاضي في قضايا الجرائم الرقمية',
    roleSource: 'decree',
    roleRef: 'قرار 38/2025',
    programs: [
      { text: 'تعزيز الوعي القانوني في المجتمع بشأن الجرائم الرقمية', source: 'official', sourceRef: 'moj.gov.qa', sourceUrl: 'https://www.moj.gov.qa/ar' },
      { text: 'دعم تسريع إجراءات التقاضي في قضايا الجرائم الرقمية', source: 'law', sourceRef: 'قانون 14/2014', sourceUrl: 'https://almeezan.qa/LawPage.aspx?id=6366&language=ar' },
      { text: 'التنسيق مع النيابة العامة لتطبيق قانون مكافحة الجرائم الإلكترونية', source: 'law', sourceRef: 'قانون 14/2014', sourceUrl: 'https://almeezan.qa/LawPage.aspx?id=6366&language=ar' },
    ],
    color: '#37474F',
    tier: 'supporting',
    website: 'www.moj.gov.qa',
    email: 'info@moj.gov.qa',
    phone: '+974 4461 6666',
    address: 'شارع الكورنيش، الدوحة',
  },
  {
    id: 'moc',
    name: 'وزارة الثقافة',
    shortName: 'MOC',
    role: 'إنتاج محتوى رقمي وطني آمن وهادف للأطفال، تعزيز القيم الرقمية الإيجابية، تنفيذ حملات توعية ثقافية، وحماية الهوية الثقافية القطرية في الفضاء الرقمي',
    roleSource: 'decree',
    roleRef: 'قرار 38/2025',
    programs: [
      { text: 'إنتاج محتوى رقمي وطني آمن وموجه للأطفال والناشئة', source: 'official', sourceRef: 'moc.gov.qa', sourceUrl: 'https://www.moc.gov.qa/ar' },
      { text: 'تعزيز القيم الرقمية الإيجابية في المجتمع', source: 'official', sourceRef: 'moc.gov.qa', sourceUrl: 'https://www.moc.gov.qa/ar' },
      { text: 'تنفيذ حملات توعية ثقافية وطنية حول السلامة الرقمية', source: 'official', sourceRef: 'moc.gov.qa', sourceUrl: 'https://www.moc.gov.qa/ar' },
    ],
    color: '#E65100',
    tier: 'supporting',
    website: 'www.moc.gov.qa',
    email: 'info@moc.gov.qa',
    phone: '+974 4452 7777',
    address: 'شارع الكورنيش، الدوحة',
  },
  {
    id: 'moys',
    name: 'وزارة الرياضة والشباب',
    shortName: 'MOYS',
    role: 'تطوير برامج توعية رقمية للشباب، تعزيز الاستخدام المتوازن للتكنولوجيا، إشراك الشباب في مبادرات السلامة الرقمية، ومعالجة مخاطر إدمان الألعاب الإلكترونية',
    roleSource: 'decree',
    roleRef: 'قرار 38/2025',
    programs: [
      { text: 'تطوير برامج توعية رقمية مخصصة للشباب والناشئة', source: 'official', sourceRef: 'moys.gov.qa', sourceUrl: 'https://www.moys.gov.qa/ar' },
      { text: 'تعزيز الاستخدام المتوازن والصحي للتكنولوجيا', source: 'official', sourceRef: 'moys.gov.qa', sourceUrl: 'https://www.moys.gov.qa/ar' },
      { text: 'معالجة مخاطر إدمان الألعاب الإلكترونية ووسائل التواصل', source: 'official', sourceRef: 'moys.gov.qa', sourceUrl: 'https://www.moys.gov.qa/ar' },
    ],
    color: '#1565C0',
    tier: 'supporting',
    website: 'www.moys.gov.qa',
    email: 'info@moys.gov.qa',
    phone: '+974 4496 6666',
    address: 'شارع الكورنيش، الدوحة',
  },
  {
    id: 'qu',
    name: 'جامعة قطر',
    shortName: 'QU',
    role: 'إجراء دراسات وطنية حول المخاطر الرقمية للأطفال، دعم السياسات الوطنية بالبحث العلمي، وتطوير برامج تدريبية متخصصة في الأمن السيبراني وحماية الطفولة الرقمية',
    roleSource: 'decree',
    roleRef: 'قرار 38/2025',
    programs: [
      { text: 'إجراء دراسات وطنية حول المخاطر الرقمية وسلوك الأطفال عبر الإنترنت', source: 'official', sourceRef: 'qu.edu.qa', sourceUrl: 'https://www.qu.edu.qa/ar' },
      { text: 'دعم السياسات الوطنية للسلامة الرقمية بالأدلة والبحث العلمي', source: 'official', sourceRef: 'qu.edu.qa', sourceUrl: 'https://www.qu.edu.qa/ar' },
      { text: 'تطوير برامج تدريبية متخصصة في الأمن السيبراني', source: 'official', sourceRef: 'qu.edu.qa', sourceUrl: 'https://www.qu.edu.qa/ar' },
      { text: 'الشراكة مع الجهات الحكومية في مشاريع السلامة الرقمية', source: 'official', sourceRef: 'qu.edu.qa', sourceUrl: 'https://www.qu.edu.qa/ar' },
    ],
    color: '#4527A0',
    tier: 'supporting',
    website: 'www.qu.edu.qa',
    email: 'info@qu.edu.qa',
    phone: '+974 4403 4000',
    address: 'طريق الجامعة، الدوحة',
  },
  {
    id: 'qf',
    name: 'مؤسسة قطر للتربية والعلوم والتنمية المجتمعية',
    shortName: 'QF',
    role: 'دعم البحث والابتكار في مجال التعليم الرقمي الآمن، تطوير مناهج السلامة الرقمية عبر مدارس المدينة التعليمية، وتطوير حلول تقنية مبتكرة لحماية الأطفال',
    roleSource: 'decree',
    roleRef: 'قرار 38/2025',
    programs: [
      { text: 'مبادرات التعليم الرقمي الآمن عبر مدارس المدينة التعليمية', source: 'official', sourceRef: 'qf.org.qa', sourceUrl: 'https://www.qf.org.qa/ar' },
      { text: 'دعم مشاريع بحثية حول حماية الأطفال في الفضاء الرقمي', source: 'official', sourceRef: 'qf.org.qa', sourceUrl: 'https://www.qf.org.qa/ar' },
      { text: 'برامج التوعية الرقمية للأطفال والأسر عبر مؤسسات المدينة التعليمية', source: 'official', sourceRef: 'qf.org.qa', sourceUrl: 'https://www.qf.org.qa/ar' },
      { text: 'الشراكة مع الوكالة الوطنية للأمن السيبراني في مشاريع التوعية', source: 'official', sourceRef: 'qf.org.qa', sourceUrl: 'https://www.qf.org.qa/ar' },
    ],
    color: '#558B2F',
    tier: 'supporting',
    website: 'www.qf.org.qa',
    email: 'info@qf.org.qa',
    phone: '+974 4454 0000',
    address: 'المدينة التعليمية، الدوحة',
  },
];

export const initiatives: Initiative[] = [
  {
    id: 'safespace',
    name: 'سيف سبيس (Safe Space)',
    operator: 'وزارة الاتصالات وتكنولوجيا المعلومات',
    year: 2020,
    description: 'منصة تعليمية تفاعلية شاملة تهدف إلى تعزيز الوعي بالسلامة الرقمية وتمكين الأطفال والأسر من اكتساب مهارات الاستخدام الآمن للإنترنت.',
    components: [
      'برنامج HASEEN (حصين)',
      'مناهج محو الأمية الرقمية',
      'برامج سفراء السلامة الرقمية',
      'مكتبات رقمية للسلامة الإلكترونية',
      'حملات التوعية عبر وسائل التواصل الاجتماعي',
      'مسلسل "عالم سيف" للأطفال (2025)',
    ],
    targets: ['الأطفال', 'الشباب', 'أولياء الأمور', 'المعلمون', 'الجمهور العام'],
    website: 'www.safespace.qa',
  },
  {
    id: 'helpline',
    name: 'خط مساعدة الأطفال الوطني (919)',
    operator: 'وزارة التنمية الاجتماعية والأسرة',
    year: 2016,
    description: 'خط ساخن مجاني وسري يوفر استشارات اجتماعية ونفسية وقانونية للنساء والأطفال ضحايا العنف والجرائم الإلكترونية.',
    components: [
      'استشارات اجتماعية مجانية',
      'استشارات نفسية',
      'استشارات قانونية',
      'دعم ضحايا العنف الإلكتروني',
    ],
    targets: ['الأطفال', 'النساء', 'ضحايا العنف الإلكتروني'],
  },
  {
    id: 'cyber-curriculum',
    name: 'مناهج الأمن السيبراني التعليمية',
    operator: 'الوكالة الوطنية للأمن السيبراني + وزارة التربية والتعليم',
    year: 2018,
    description: 'أول مشروع من نوعه في المنطقة يدمج مفاهيم الأمن السيبراني والسلامة الرقمية في المناهج الدراسية من الصف الأول حتى الثاني عشر.',
    components: [
      'محتوى تعليمي تفاعلي',
      'مواد باللغتين العربية والإنجليزية',
      'نظام إدارة التعلم الإلكتروني',
      'تدريب المعلمين',
    ],
    targets: ['طلاب الصف الأول حتى الثاني عشر', 'المعلمون', 'أولياء الأمور'],
  },
];

export const timelineEvents: TimelineEvent[] = [
  { year: 1989, title: 'اتفاقية حقوق الطفل', description: 'الأمم المتحدة تعتمد الاتفاقية الدولية لحقوق الطفل', type: 'international', importance: 'major' },
  { year: 1994, title: 'قانون الأحداث', description: 'قطر تصدر قانون الأحداث رقم (1) لسنة 1994', type: 'law', importance: 'minor' },
  { year: 2004, title: 'الدستور الدائم', description: 'صدور الدستور الدائم لدولة قطر المتضمن حماية الطفولة', type: 'law', importance: 'major' },
  { year: 2008, title: 'رؤية قطر 2030', description: 'إطلاق رؤية قطر الوطنية 2030 المتضمنة التنمية الرقمية الآمنة', type: 'strategy', importance: 'major' },
  { year: 2012, title: 'اللجنة الوطنية لأمن المعلومات', description: 'إنشاء اللجنة الوطنية لأمن المعلومات بنهج متعدد الأطراف', type: 'institution', importance: 'minor' },
  { year: 2014, title: 'قانون مكافحة الجرائم الإلكترونية', description: 'صدور القانون رقم (14) لسنة 2014 المجرِّم لاستغلال الأطفال إلكترونياً', type: 'law', importance: 'major' },
  { year: 2014, title: 'الاستراتيجية الوطنية للأمن السيبراني', description: 'إطلاق الاستراتيجية الوطنية للأمن السيبراني 2014-2018', type: 'strategy', importance: 'major' },
  { year: 2016, title: 'قانون حماية البيانات الشخصية', description: 'صدور القانون رقم (13) لسنة 2016 لحماية بيانات الأطفال', type: 'law', importance: 'major' },
  { year: 2016, title: 'خط المساعدة 919', description: 'إطلاق خط مساعدة الأطفال الوطني المجاني', type: 'initiative', importance: 'minor' },
  { year: 2018, title: 'مناهج الأمن السيبراني', description: 'إطلاق مشروع مناهج الأمن السيبراني التعليمية (الأول في المنطقة)', type: 'initiative', importance: 'major' },
  { year: 2019, title: 'استراتيجية الذكاء الاصطناعي', description: 'إطلاق استراتيجية قطر الوطنية للذكاء الاصطناعي', type: 'strategy', importance: 'minor' },
  { year: 2020, title: 'مبادرة سيف سبيس', description: 'إطلاق منصة سيف سبيس للسلامة الرقمية للأطفال', type: 'initiative', importance: 'major' },
  { year: 2025, title: 'لجنة السلامة الرقمية', description: 'إنشاء لجنة السلامة الرقمية للأطفال والنشء بقرار مجلس الوزراء', type: 'institution', importance: 'major' },
];

export const stats = [
  { label: 'قوانين وطنية', value: 3, icon: 'scale', color: '#8D1B3D' },
  { label: 'استراتيجيات وطنية', value: 3, icon: 'target', color: '#C9A84C' },
  { label: 'مؤسسات مسؤولة', value: 13, icon: 'building', color: '#1C2B3A' },
  { label: 'مبادرات توعوية', value: 3, icon: 'lightbulb', color: '#2E7D32' },
  { label: 'سنوات من التشريع', value: 31, icon: 'calendar', color: '#7B1FA2' },
  { label: 'اتفاقيات دولية', value: 1, icon: 'globe', color: '#0277BD' },
];

// ─── بيانات المراجع والمصادر ──────────────────────────────────────────────────

export interface ReferenceItem {
  id: string;
  title: string;
  subtitle?: string;
  type: 'constitution' | 'law' | 'decree' | 'strategy' | 'international' | 'website' | 'research';
  typeLabel: string;
  year?: number;
  authority?: string;
  url?: string;
  description: string;
}

export const references: ReferenceItem[] = [
  // ─── الدستور والقوانين الوطنية ───────────────────────────────────────────
  {
    id: 'ref-constitution',
    title: 'الدستور الدائم لدولة قطر',
    type: 'constitution',
    typeLabel: 'دستور',
    year: 2004,
    authority: 'دولة قطر',
    url: 'https://almeezan.qa/LawPage.aspx?id=2284&language=ar',
    description: 'المواد 21 و22 — تكفل الدولة حماية الأسرة والطفولة وصون الهوية الوطنية.',
  },
  {
    id: 'ref-law14-2014',
    title: 'قانون رقم (14) لسنة 2014',
    subtitle: 'بشأن مكافحة الجرائم الإلكترونية',
    type: 'law',
    typeLabel: 'قانون وطني',
    year: 2014,
    authority: 'دولة قطر',
    url: 'https://almeezan.qa/LawPage.aspx?id=6366&language=ar',
    description: 'يُجرّم استغلال الأطفال إلكترونياً والتحرش والابتزاز الرقمي، ويُحدد العقوبات المشددة لحماية القاصرين.',
  },
  {
    id: 'ref-law13-2016',
    title: 'قانون رقم (13) لسنة 2016',
    subtitle: 'بشأن حماية خصوصية البيانات الشخصية',
    type: 'law',
    typeLabel: 'قانون وطني',
    year: 2016,
    authority: 'دولة قطر',
    url: 'https://almeezan.qa/LawPage.aspx?id=6366&language=ar',
    description: 'يحمي بيانات الأطفال الشخصية ويُلزم مزودي الخدمات الرقمية بضمانات صارمة لحماية المعلومات.',
  },
  {
    id: 'ref-law12-2005',
    title: 'قانون رقم (12) لسنة 2005',
    subtitle: 'بشأن حماية الطفل',
    type: 'law',
    typeLabel: 'قانون وطني',
    year: 2005,
    authority: 'دولة قطر',
    url: 'https://almeezan.qa/LawPage.aspx?id=2284&language=ar',
    description: 'الإطار القانوني الأساسي لحماية الطفل في قطر، يشمل الحماية من الاستغلال والإساءة بجميع أشكالها.',
  },
  {
    id: 'ref-law16-2004',
    title: 'قانون رقم (16) لسنة 2004',
    subtitle: 'بشأن تنظيم الاتصالات',
    type: 'law',
    typeLabel: 'قانون وطني',
    year: 2004,
    authority: 'دولة قطر',
    url: 'https://almeezan.qa/LawPage.aspx?id=2284&language=ar',
    description: 'يُنظّم قطاع الاتصالات ويُخوّل هيئة تنظيم الاتصالات صلاحيات الرقابة على المحتوى الرقمي.',
  },
  // ─── القرارات والمراسيم ───────────────────────────────────────────────────
  {
    id: 'ref-decree38-2025',
    title: 'قرار مجلس الوزراء رقم (38) لسنة 2025',
    subtitle: 'بإنشاء لجنة السلامة الرقمية للأطفال والنشء',
    type: 'decree',
    typeLabel: 'قرار وزاري',
    year: 2025,
    authority: 'مجلس الوزراء القطري',
    url: 'https://almeezan.qa/LawView.aspx?opt&LawID=10265&language=ar',
    description: 'أنشأ اللجنة الوطنية للسلامة الرقمية برئاسة وزارة التنمية الاجتماعية، وحدد أعضاءها من 13 جهة حكومية وصلاحياتها.',
  },
  {
    id: 'ref-strategy-2030',
    title: 'رؤية قطر الوطنية 2030',
    subtitle: 'محور التنمية البشرية — السلامة الرقمية',
    type: 'strategy',
    typeLabel: 'استراتيجية وطنية',
    year: 2008,
    authority: 'ديوان رئاسة مجلس الوزراء',
    url: 'https://www.gco.gov.qa/ar/focus/qatar-national-vision-2030/',
    description: 'تُرسي الرؤية الوطنية أسس التنمية البشرية الشاملة بما يتضمن بيئة رقمية آمنة للأجيال القادمة.',
  },
  {
    id: 'ref-strategy-cyber',
    title: 'الاستراتيجية الوطنية للأمن السيبراني 2024–2030',
    type: 'strategy',
    typeLabel: 'استراتيجية وطنية',
    year: 2024,
    authority: 'الوكالة الوطنية للأمن السيبراني',
    url: 'https://www.ncsa.gov.qa/ar',
    description: 'تُحدد الأهداف الاستراتيجية لتعزيز الأمن السيبراني الوطني بما يشمل حماية الأطفال والناشئة في الفضاء الرقمي.',
  },
  // ─── المرجعيات الدولية ────────────────────────────────────────────────────
  {
    id: 'ref-crc',
    title: 'اتفاقية الأمم المتحدة لحقوق الطفل (CRC)',
    subtitle: 'المادتان 17 و34 — الحماية الرقمية',
    type: 'international',
    typeLabel: 'اتفاقية دولية',
    year: 1989,
    authority: 'الأمم المتحدة',
    url: 'https://www.ohchr.org/ar/instruments-mechanisms/instruments/convention-rights-child',
    description: 'صادقت عليها قطر عام 1995 — تُلزم الدول بحماية الأطفال من المحتوى الضار وضمان وصولهم لمعلومات آمنة.',
  },
  {
    id: 'ref-crc-protocol',
    title: 'البروتوكول الاختياري لاتفاقية حقوق الطفل',
    subtitle: 'بشأن بيع الأطفال واستغلالهم جنسياً',
    type: 'international',
    typeLabel: 'بروتوكول دولي',
    year: 2000,
    authority: 'الأمم المتحدة',
    url: 'https://www.ohchr.org/ar/instruments-mechanisms/instruments/optional-protocol-convention-rights-child-sale-children',
    description: 'يُجرّم استغلال الأطفال جنسياً عبر الإنترنت ويُلزم الدول بالتجريم والملاحقة القضائية.',
  },
  {
    id: 'ref-itu',
    title: 'إرشادات الاتحاد الدولي للاتصالات (ITU)',
    subtitle: 'حماية الأطفال عبر الإنترنت',
    type: 'international',
    typeLabel: 'إرشادات دولية',
    year: 2020,
    authority: 'الاتحاد الدولي للاتصالات',
    url: 'https://www.itu.int/ar/ITU-D/Cybersecurity/Pages/child-online-protection.aspx',
    description: 'إطار دولي لحماية الأطفال عبر الإنترنت تستند إليه هيئة تنظيم الاتصالات القطرية في سياساتها التنظيمية.',
  },
  // ─── المواقع الرسمية ──────────────────────────────────────────────────────
  {
    id: 'ref-safespace',
    title: 'منصة سيف سبيس (Safe Space)',
    subtitle: 'المنصة الوطنية للسلامة الرقمية',
    type: 'website',
    typeLabel: 'موقع رسمي',
    authority: 'وزارة الاتصالات وتكنولوجيا المعلومات',
    url: 'https://www.safespace.qa',
    description: 'المنصة الوطنية الرسمية لتوعية الأطفال والأسر بمخاطر الفضاء الرقمي وتقديم الموارد التعليمية.',
  },
  {
    id: 'ref-ncsa',
    title: 'الوكالة الوطنية للأمن السيبراني',
    type: 'website',
    typeLabel: 'موقع رسمي',
    authority: 'NCSA',
    url: 'https://www.ncsa.gov.qa/ar',
    description: 'المرجع الرسمي لمعايير الأمن السيبراني الوطنية وبرامج تدريب الكوادر المتخصصة.',
  },
  {
    id: 'ref-msdf',
    title: 'وزارة التنمية الاجتماعية والأسرة',
    type: 'website',
    typeLabel: 'موقع رسمي',
    authority: 'MSDF',
    url: 'https://www.msdf.gov.qa/ar',
    description: 'الجهة الرئيسية لرئاسة لجنة السلامة الرقمية وتنسيق الجهود الوطنية لحماية الطفل.',
  },
  {
    id: 'ref-moi-cyber',
    title: 'إدارة مكافحة الجرائم الإلكترونية — وزارة الداخلية',
    type: 'website',
    typeLabel: 'موقع رسمي',
    authority: 'وزارة الداخلية',
    url: 'https://portal.moi.gov.qa/wps/portal/MOIInternet/departmentcommittees/cybercrimes',
    description: 'الجهة المختصة باستقبال البلاغات والتحقيق في الجرائم الإلكترونية المتعلقة بالأطفال.',
  },
  {
    id: 'ref-almeezan',
    title: 'الميزان القانوني — بوابة التشريعات القطرية',
    type: 'website',
    typeLabel: 'قاعدة بيانات قانونية',
    authority: 'وزارة العدل',
    url: 'https://almeezan.qa',
    description: 'المرجع الرسمي لجميع القوانين والمراسيم والتشريعات القطرية النافذة.',
  },
  // ─── الأبحاث والدراسات ────────────────────────────────────────────────────
  {
    id: 'ref-research-1',
    title: 'تنظيم الفضاء الإلكتروني للأطفال: دراسة الحالة القطرية',
    subtitle: 'Regulating Cyberspace for Children: Reflections on the Qatari Case',
    type: 'research',
    typeLabel: 'بحث أكاديمي',
    year: 2023,
    authority: 'British Journal of Cyber Criminology',
    url: 'https://www.pubtexto.com/journals/british-journal-of-cyber-criminology/fulltext/regulating-cyberspace-for-children-reflections-on-the-qatari-case',
    description: 'دراسة أكاديمية محكّمة تحلل الإطار التشريعي والسياساتي لحماية الأطفال في الفضاء الرقمي بقطر.',
  },
  {
    id: 'ref-research-2',
    title: 'تقرير لجنة حقوق الطفل الأممية — قطر 2025',
    type: 'research',
    typeLabel: 'تقرير أممي',
    year: 2025,
    authority: 'مجلس حقوق الإنسان — الأمم المتحدة',
    url: 'https://www.ohchr.org/en/meeting-summaries/2025/05/experts-committee-rights-child-praise-qatars-investments-child-health-and',
    description: 'تقرير اللجنة الأممية لحقوق الطفل الذي أشاد باستثمارات قطر في صحة الطفل وحمايته الرقمية.',
  },
];
