import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Award,
  BarChart3,
  BookOpen,
  BookOpenCheck,
  Brain,
  Check,
  ChevronLeft,
  CircleHelp,
  Clock3,
  ExternalLink,
  FileCheck2,
  FileText,
  Flag,
  Headphones,
  Info,
  Languages,
  LayoutDashboard,
  Library,
  LockKeyhole,
  Map,
  Menu,
  Moon,
  MoreHorizontal,
  PanelLeftClose,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  TimerReset,
  TrainFront,
  Trophy,
  X,
} from "lucide-react";
import {
  evidenceFor,
  evidenceRegistry,
  knowledgeAudit,
  knowledgeGlossary,
  knowledgeLessons,
  knowledgeModules,
  knowledgeQuestions,
  mockExams,
  sourceFor,
  sourceRegistry,
  type SourceStatus,
} from "./knowledgeBase";

type NavKey = "home" | "path" | "quiz" | "glossary" | "sources" | "knowledge";
type Question = {
  category: string;
  finnish: string;
  arabic: string;
  options: string[];
  answer: number;
  explanation: string;
  source: string;
  sourcePage?: string;
  evidenceId?: string;
  trainingQuestion?: boolean;
  officialExamQuestion?: boolean;
};

const sources = [
  {
    id: "th-training",
    name: "Taksi Helsingin kuljettajakoulutus",
    publisher: "Taksi Helsinki",
    type: "صفحة تدريب رسمية",
    date: "متاح للعامة · فُحص 18.08.2026",
    url: "https://taksihelsinki.fi/taksi-helsinki/taksi-helsingin-kuljettajakoulutus/",
    accent: "amber",
  },
  {
    id: "traficom-licence",
    name: "Apply for a taxi driving licence",
    publisher: "Traficom",
    type: "متطلبات ورخصة",
    date: "آخر تحديث 05.08.2026",
    url: "https://traficom.fi/en/commercial-transport/drivers-licenses-and-qualifications/apply-taxi-driving-licence",
    accent: "blue",
  },
  {
    id: "th-kela",
    name: "Kela taxi",
    publisher: "Taksi Helsinki",
    type: "صفحة خدمة رسمية",
    date: "متاح للعامة · فُحص 18.08.2026",
    url: "https://taksihelsinki.fi/en/kela-taxi/",
    accent: "teal",
  },
  {
    id: "traficom-reform",
    name: "Changes to taxi transport regulation",
    publisher: "Traficom",
    type: "تشريعات وتواريخ قادمة",
    date: "آخر تحديث 03.08.2026 · يحتاج مراجعة عند سريان التغيير",
    url: "https://traficom.fi/en/commercial-transport/changes-taxi-transport-regulation",
    accent: "rose",
  },
  {
    id: "kela-taxi",
    name: "Using a taxi",
    publisher: "Kela",
    type: "إرشادات Kela الرسمية",
    date: "صفحة خدمة عامة",
    url: "https://www.kela.fi/transport-by-taxi",
    accent: "violet",
  },
  {
    id: "th-home",
    name: "Taksi Helsinki · Front page",
    publisher: "Taksi Helsinki",
    type: "هوية الخدمة ونطاقها",
    date: "متاح للعامة · فُحص 18.08.2026",
    url: "https://taksihelsinki.fi/en/frontpage/",
    accent: "rose",
  },
];

const modules = [
  {
    id: "01",
    eyebrow: "الأساسيات",
    title: "مسار Taksi Helsinki",
    description: "افهم مراحل التقديم والتدريب كما تنشرها الشركة، بدون خلطها بمتطلبات Traficom.",
    duration: "55 دقيقة",
    lessons: 9,
    icon: ShieldCheck,
    color: "amber",
    source: "Taksi Helsinki",
  },
  {
    id: "02",
    eyebrow: "جاهزية الاختبار",
    title: "اللغة والاختبار",
    description: "مصطلحات العمل، أسئلة أصلية للتدريب، والفرق بين اختبار الشركة واختبار Traficom.",
    duration: "90 دقيقة",
    lessons: 15,
    icon: Brain,
    color: "blue",
    source: "Taksi Helsinki · Traficom",
  },
  {
    id: "03",
    eyebrow: "الخدمة الخاصة",
    title: "Kela والرحلات الخاصة",
    description: "خريطة عملية لما هو منشور عن رحلات Kela، مع فصل قواعد Kela عن قواعد الشركة.",
    duration: "75 دقيقة",
    lessons: 13,
    icon: HeartPulseIcon,
    color: "teal",
    source: "Kela · Taksi Helsinki",
  },
  {
    id: "04",
    eyebrow: "العمل الميداني",
    title: "Helsinki في يوم السائق",
    description: "ملاحظات للمراجعة حول الأماكن والرحلات، مع تنبيه واضح عندما لا توجد قائمة تشغيلية عامة.",
    duration: "60 دقيقة",
    lessons: 11,
    icon: Map,
    color: "violet",
    source: "مصادر عامة موثقة",
  },
];

const moduleSourceUrls: Record<string, string> = {
  "01": "https://taksihelsinki.fi/taksi-helsinki/taksi-helsingin-kuljettajakoulutus/",
  "02": "https://traficom.fi/en/commercial-transport/drivers-licenses-and-qualifications/apply-taxi-driving-licence",
  "03": "https://www.kela.fi/transport-by-taxi",
  "04": "https://taksihelsinki.fi/en/frontpage/",
};

const legacyQuestions: Question[] = [
  {
    category: "Taksi Helsinki",
    finnish: "Kuinka monta koulutusosiota Taksi Helsingin kuljettajakoulutuksessa on?",
    arabic: "كم عدد أقسام التدريب في مسار Taksi Helsinki المنشور؟",
    options: ["قسمان", "ثلاثة أقسام", "أربعة أقسام", "عدد غير محدد"],
    answer: 1,
    explanation: "تذكر الصفحة الرسمية أن التدريب ينقسم إلى ثلاثة (3) أقسام تُنجز بالترتيب.",
    source: "Taksi Helsingin kuljettajakoulutus",
  },
  {
    category: "Traficom",
    finnish: "Kuinka monta monivalintakysymystä taksinkuljettajan kokeessa on?",
    arabic: "كم سؤال اختيار من متعدد في اختبار سائق التاكسي لدى Traficom؟",
    options: ["30 سؤالًا", "40 سؤالًا", "50 سؤالًا", "60 سؤالًا"],
    answer: 2,
    explanation: "تنص Traficom على أن الاختبار يضم 50 سؤال اختيار من متعدد، ومدته القصوى 45 دقيقة.",
    source: "Traficom · Information on the taxi driver examination",
  },
  {
    category: "Kela",
    finnish: "Miten Kela-korvattava taksimatka tulee yleensä tilata?",
    arabic: "كيف ينبغي عادةً طلب رحلة التاكسي التي تعوّضها Kela؟",
    options: ["من أي سيارة في الشارع", "من رقم مركز الطلب الإقليمي", "من الفندق فقط", "لا يلزم الطلب مسبقًا"],
    answer: 1,
    explanation: "توضح Kela أن الرحلة التي تعوّضها يجب طلبها من مركز الطلب الإقليمي؛ يختلف رقم المركز حسب المنطقة.",
    source: "Kela · Using a taxi",
  },
  {
    category: "المصطلحات",
    finnish: "Mitä tarkoittaa ‘nouto-osoite’?",
    arabic: "ماذا تعني عبارة Nouto-osoite؟",
    options: ["الوجهة", "عنوان الفاتورة", "عنوان الاستلام", "محطة التاكسي"],
    answer: 2,
    explanation: "Nouto تعني الاستلام وosoite تعني العنوان؛ أي عنوان استلام العميل.",
    source: "شرح تعليمي · مصطلح عملي",
  },
  {
    category: "Taksi Helsinki",
    finnish: "Kuinka kauan koulutusajo kestää noin?",
    arabic: "ما المدة التقريبية للتدريب العملي بالسيارة؟",
    options: ["ساعتان", "4 ساعات", "8 ساعات", "50 ساعة"],
    answer: 2,
    explanation: "بعد النجاح في اختبار Taksi Helsinki، تذكر الشركة أن koulutusajo إلزامي ويستغرق نحو 8 ساعات.",
    source: "Taksi Helsinki · Koulutusosio 2",
  },
  {
    category: "Traficom · شروط الرخصة",
    finnish: "Kuinka kauan B-ajokortin on yleensä pitänyt olla myönnettynä?",
    arabic: "منذ متى يجب أن تكون رخصة القيادة من الفئة B صادرة عادةً قبل طلب رخصة التاكسي؟",
    options: ["ثلاثة أشهر", "سنة واحدة على الأقل", "سنتان", "لا توجد مدة"],
    answer: 1,
    explanation: "تذكر Traficom أن رخصة B الفنلندية أو الأوروبية يجب أن تكون صادرة قبل سنة واحدة على الأقل، مع بقية الشروط المنشورة.",
    source: "Traficom · Apply for a taxi driving licence",
  },
  {
    category: "تغيير تشريعي قادم",
    finnish: "Milloin uusien taksinkuljettajien 21 tunnin koulutus tulee suorittaa ennen koetta?",
    arabic: "متى يجب على السائقين الجدد إكمال التدريب الإلزامي لمدة 21 ساعة قبل الاختبار؟",
    options: ["1 سبتمبر 2026", "1 نوفمبر 2026", "1 فبراير 2027", "1 يوليو 2027"],
    answer: 1,
    explanation: "هذه قاعدة مستقبلية منشورة من Traficom: تبدأ للسائقين الجدد في 1 نوفمبر 2026. لا تُعرض كقاعدة سارية قبل تاريخها.",
    source: "Traficom · Changes to taxi transport regulation",
  },
  {
    category: "Taksi Helsinki · المجموعات الخاصة",
    finnish: "Kuinka pitkä Taksi Helsingin erityisryhmien koulutus on kokonaisuudessaan?",
    arabic: "ما المدة الإجمالية لتدريب Taksi Helsinki الخاص بالمجموعات الخاصة؟",
    options: ["7 ساعات", "14 ساعة", "21 ساعة", "50 ساعة"],
    answer: 2,
    explanation: "توضح صفحة Taksi Helsinki أن التدريب الكامل للمجموعات الخاصة 21 ساعة: 14 ساعة نظرية و7 ساعات عملية، مع اختلاف القاعدة بحسب تاريخ رخصة السائق.",
    source: "Taksi Helsinki · Kuljettajakoulutus",
  },
  {
    category: "Kela",
    finnish: "Mitä tehdä, jos Kela-taksi ei saavu sovittuna aikana?",
    arabic: "ماذا تفعل إذا لم تصل سيارة Kela في الوقت المتفق عليه؟",
    options: ["الاتصال بمركز الطلب الذي حُجزت منه الرحلة", "إلغاء الرحلة دون إبلاغ", "الانتظار حتى اليوم التالي", "حجز أي سيارة وتقديمها كرحلة Kela"],
    answer: 0,
    explanation: "تطلب Kela الاتصال بمركز الطلب الذي تم الحجز منه؛ وعلى المركز ترتيب وسيلة نقل أخرى عند عدم وصول التاكسي.",
    source: "Kela · Using a taxi",
  },
  {
    category: "Traficom · مدة الرخصة",
    finnish: "Kuinka kauan taksinkuljettajan ajolupa on yleensä voimassa?",
    arabic: "ما مدة صلاحية رخصة قيادة التاكسي عادةً؟",
    options: ["سنة واحدة", "خمس سنوات", "عشر سنوات", "غير محددة"],
    answer: 1,
    explanation: "توضح Traficom أن الرخصة صالحة خمس سنوات، أو سنتين إذا كان عمر حاملها 68 عامًا أو أكثر.",
    source: "Traficom · Apply for a taxi driving licence",
  },
  {
    category: "Traficom · مكان الاختبار",
    finnish: "Missä taksinkuljettajan koe suoritetaan?",
    arabic: "أين يُجرى اختبار سائق التاكسي؟",
    options: ["في مركز Ajovarma بعد حجز موعد", "في أي فندق", "في سيارة العميل", "لا يحتاج إلى موعد"],
    answer: 0,
    explanation: "تذكر Traficom أن اختبار سائق التاكسي يُجرى في نقطة خدمة Ajovarma، مع حجز موعد مسبق.",
    source: "Traficom · Apply for a taxi driving licence",
  },
  {
    category: "Kela · وقت الوصول",
    finnish: "Milloin Kela-taksin pitäisi saapua sovitulle noutoajalle?",
    arabic: "متى ينبغي أن تصل سيارة Kela بالنسبة إلى موعد الاستلام المتفق عليه؟",
    options: ["خلال 15 دقيقة من الموعد", "بعد ساعة على الأقل", "في نهاية اليوم", "لا توجد إرشادات"],
    answer: 0,
    explanation: "تذكر Kela أن سيارة التاكسي ينبغي أن تصل خلال 15 دقيقة من وقت الاستلام المتفق عليه.",
    source: "Kela · Using a taxi",
  },
  {
    category: "Traficom · التقرير الطبي",
    finnish: "Kuinka vanha lääkärinlausunto saa olla hakemuksen yhteydessä?",
    arabic: "ما أقصى عمر للتقرير الطبي عند تقديم طلب رخصة قيادة التاكسي؟",
    options: ["شهر واحد", "6 أشهر", "سنة واحدة", "لا توجد مدة"],
    answer: 1,
    explanation: "تذكر Traficom أن التقرير الطبي المطلوب يجب ألا يكون أقدم من 6 أشهر وقت تقديم الطلب، مع الاستثناءات المنشورة.",
    source: "Traficom · Apply for a taxi driving licence",
  },
  {
    category: "Traficom · نزاهة الاختبار",
    finnish: "Kuinka pitkä kielto voi seurata vilpistä taksinkuljettajan kokeessa?",
    arabic: "ما مدة المنع التي قد تترتب على الغش في اختبار سائق التاكسي؟",
    options: ["أسبوع واحد", "شهر واحد", "6 أشهر", "سنتان"],
    answer: 2,
    explanation: "تنص Traficom على أن المرشح الذي يغش في الاختبار قد يُمنع من دخول اختبار سائق التاكسي لمدة 6 أشهر.",
    source: "Traficom · Apply for a taxi driving licence",
  },
  {
    category: "Traficom · اللياقة الطبية",
    finnish: "Mitä ryhmän 2 terveysvaatimukset tarkoittavat tässä yhteydessä?",
    arabic: "ماذا تعني متطلبات اللياقة الطبية للمجموعة 2 في هذا السياق؟",
    options: ["متطلبات صحية خاصة بالقيادة المهنية", "نوع من التأمين", "تصنيف للسيارة", "مدة التدريب"],
    answer: 0,
    explanation: "تربط Traficom طلب رخصة التاكسي بمتطلبات اللياقة للقيادة من المجموعة 2؛ التفاصيل الطبية يجب أخذها من الجهة الصحية المختصة.",
    source: "Traficom · Apply for a taxi driving licence",
  },
  {
    category: "Traficom · صلاحية الاختبار",
    finnish: "Kuinka kauan hyväksytty taksinkuljettajan koe on voimassa?",
    arabic: "إلى متى يبقى اختبار سائق التاكسي المقبول صالحًا؟",
    options: ["حتى إشعار آخر", "30 يومًا", "6 أشهر فقط", "سنتين فقط"],
    answer: 0,
    explanation: "تذكر Traficom أن اختبار سائق التاكسي المقبول صالح حتى إشعار آخر، مع ضرورة متابعة التغييرات التشريعية الجديدة.",
    source: "Traficom · Apply for a taxi driving licence",
  },
  {
    category: "Traficom · شروط الرخصة",
    finnish: "Voidaanko taksinkuljettajan ajolupa myöntää ajokiellossa olevalle?",
    arabic: "هل يمكن إصدار رخصة قيادة التاكسي لمن يخضع لمنع قيادة؟",
    options: ["نعم دائمًا", "لا، يجب ألا يكون ممنوعًا من القيادة", "فقط في عطلة نهاية الأسبوع", "لا علاقة لذلك"],
    answer: 1,
    explanation: "تشترط Traficom ألا يكون مقدم الطلب خاضعًا لمنع قيادة ضمن شروط إصدار الرخصة.",
    source: "Traficom · Apply for a taxi driving licence",
  },
  {
    category: "تغيير تشريعي قادم",
    finnish: "Milloin taksamittarit tulevat pakollisiksi kaikissa takseissa?",
    arabic: "متى تصبح عدادات التاكسي إلزامية في جميع سيارات التاكسي؟",
    options: ["1 سبتمبر 2026", "1 نوفمبر 2026", "1 فبراير 2027", "1 يوليو 2027"],
    answer: 2,
    explanation: "تحدد صفحة Traficom تاريخ 1 فبراير 2027 لبدء إلزامية عدادات التاكسي، لذلك لا نعرضها كقاعدة سارية قبل تاريخها.",
    source: "Traficom · Changes to taxi transport regulation",
  },
  {
    category: "تغيير تشريعي قادم",
    finnish: "Milloin taksikilvet tulevat pakollisiksi kaikissa taksiliikenteen ajoneuvoissa?",
    arabic: "متى تصبح لوحات التاكسي إلزامية في المركبات المستخدمة لنقل التاكسي؟",
    options: ["1 سبتمبر 2026", "1 يناير 2027", "1 فبراير 2027", "1 يوليو 2027"],
    answer: 3,
    explanation: "تذكر Traficom أن لوحات التاكسي تصبح إلزامية في 1 يوليو 2027، مع بدء إصدارها من 1 يناير 2027.",
    source: "Traficom · Changes to taxi transport regulation",
  },
  {
    category: "Taksi Helsinki · الجودة",
    finnish: "Mitä Taksi Helsinki kertoo seuraavansa jatkuvasti?",
    arabic: "ما الذي تقول Taksi Helsinki إنها تراقبه باستمرار؟",
    options: ["رضا العملاء", "أسعار الوقود فقط", "عدد السيارات في المطار فقط", "نتائج امتحان Traficom"],
    answer: 0,
    explanation: "تقول الصفحة الرسمية إن Taksi Helsinki تراقب رضا العملاء باستمرار وتطور خدماتها وفق احتياجاتهم وتوقعاتهم.",
    source: "Taksi Helsinki · Front page",
  },
  {
    category: "Taksi Helsinki · التصاريح",
    finnish: "Mitä Taksi Helsinki kertoo välitysjärjestelmässään toimivista kuljettajista?",
    arabic: "ما الذي تقوله Taksi Helsinki عن السائقين العاملين في نظام الإرسال لديها؟",
    options: ["لديهم تصريح سائق تاكسي ساري", "لا يحتاجون إلى تصريح", "يعملون بتصريح مؤقت دائمًا", "تتحقق الشركة من رخصة B فقط"],
    answer: 0,
    explanation: "تذكر الصفحة الرسمية أن كل سائق يعمل في نظام الإرسال لديها يملك تصريح سائق تاكسي ساريًا.",
    source: "Taksi Helsinki · Front page",
  },
  {
    category: "Kela · بيانات الحجز",
    finnish: "Mitä tietoa Kela-taksin välityskeskus tarvitsee varauksen yhteydessä?",
    arabic: "ما المعلومة التي يحتاجها مركز طلب Kela عند الحجز؟",
    options: ["الرمز السري للتطبيق", "الرقم الشخصي للعميل", "كلمة مرور البنك", "لا يحتاج أي معلومة"],
    answer: 1,
    explanation: "توضح Kela أن الرقم الشخصي مطلوب عند حجز الرحلة لأن الرحلات تُحتسب ضمن الحد السنوي وتُدفع التعويضات لمقدم الخدمة. لا تطلب المنصة هذه البيانات.",
    source: "Kela · Using a taxi",
  },
  {
    category: "Kela · السائق المألوف",
    finnish: "Kuka voi saada oikeuden tuttuun taksinkuljettajaan tietyissä tilanteissa?",
    arabic: "من يمكن أن يحق له استخدام سائق تاكسي مألوف في حالات محددة؟",
    options: ["كل عميل تلقائيًا", "طفل دون 16 عامًا يسافر وحده بانتظام للعلاج أو التأهيل", "أي سائح", "لا أحد"],
    answer: 1,
    explanation: "تذكر Kela أن الأطفال دون 16 عامًا الذين يسافرون وحدهم بانتظام للعلاج أو التأهيل لهم هذا الحق، كما توجد حالات صحية محددة أخرى بقرار Kela.",
    source: "Kela · Using a taxi",
  },
  {
    category: "Kela · سهولة الوصول",
    finnish: "Miten voi varata Kela-taksin, jos asiakkaalla on kuulo- tai puhevamma?",
    arabic: "كيف يمكن حجز تاكسي Kela لمن لديه إعاقة سمع أو كلام؟",
    options: ["برسالة نصية بعد تهيئة البيانات أول مرة", "من أي سيارة في الشارع", "لا يمكن الحجز", "من خلال اختبار القيادة"],
    answer: 0,
    explanation: "توضح Kela أن الحجز بالرسالة النصية ممكن؛ يجب أولًا الاتصال بمركز الطلب لتسجيل البيانات، ثم يمكن استخدام رقم الرسائل المخصص للمركز.",
    source: "Kela · Using a taxi",
  },
];

const questions: Question[] = [...legacyQuestions, ...knowledgeQuestions];

const glossary = [
  ["Kuljettaja", "السائق", "الشخص الذي يقود السيارة ويخدم العميل."],
  ["Kuljettajankoulutus", "تدريب السائق", "مسار Taksi Helsinki التحضيري للسائق."],
  ["Kuljettajankoe", "اختبار السائق", "اختبار الشركة ضمن التدريب، ويُميّز عن اختبار Traficom."],
  ["Taksinkuljettajan ajolupa", "رخصة قيادة التاكسي", "الرخصة التي تصدرها Traficom للعمل كسائق تاكسي."],
  ["Ajovarma", "نقطة خدمة", "الجهة التي تذكرها Traficom لإجراء الاختبار وتقديم طلب الرخصة بعد حجز موعد."],
  ["Ryhmä 2", "المجموعة 2 الطبية", "متطلبات اللياقة الطبية المرتبطة بالقيادة المهنية؛ لا نستبدل التقييم الطبي بشرح المنصة."],
  ["Välityskeskus", "مركز الطلب", "المركز الإقليمي الذي تُطلب منه رحلة Kela بحسب المنطقة."],
  ["Koulutusajo", "تدريب القيادة", "التدريب العملي الذي تنظمه Taksi Helsinki بعد اجتياز اختبارها، وفق الصفحة الرسمية."],
  ["Kyyti", "الرحلة", "رحلة العميل أو طلب التاكسي."],
  ["Tilaus", "طلب / حجز", "طلب رحلة يصل إلى نظام الإرسال."],
  ["Nouto-osoite", "عنوان الاستلام", "المكان الذي يلتقي فيه السائق بالعميل."],
  ["Määränpää", "الوجهة", "المكان المقصود في نهاية الرحلة."],
  ["Taksamittari", "عداد التاكسي", "جهاز حساب أجرة الرحلة؛ التفاصيل التشغيلية الداخلية تحتاج دليلًا عامًا منشورًا."],
  ["Kiinteä hinta", "سعر ثابت", "مصطلح يجب فهمه من تعليمات الشركة الحالية؛ لا نضيف إجراءً غير منشور."],
  ["Erityisryhmät", "المجموعات الخاصة", "عملاء يحتاجون مهارات مساعدة وتجهيزات خاصة."],
  ["Omavastuu", "المبلغ الذي يدفعه العميل", "مصطلح يظهر في سياق تعويضات Kela؛ تحقّق من القاعدة الحالية."],
  ["Lääkärinlausunto", "تقرير طبي", "وثيقة طبية قد تطلبها Traficom ضمن طلب رخصة قيادة التاكسي وفق الشروط والتواريخ المنشورة."],
  ["Taksinkuljetuslupa", "رخصة نقل التاكسي", "ترخيص النقل الذي تميزه Taksi Helsinki عن تصريح السائق الفردي؛ لا تخلط بينهما."],
  ["Asiakastyytyväisyys", "رضا العملاء", "مؤشر تقول Taksi Helsinki إنها تراقبه باستمرار لتطوير الخدمة."],
  ["Sote-taksi", "تاكسي الخدمات الاجتماعية والصحية", "نوع خدمة تذكره Taksi Helsinki في مناطق محددة على صفحتها العامة؛ تحقق من المناطق الحالية."],
];

const glossaryTerms: string[][] = [
  ...glossary,
  ...knowledgeGlossary.map((entry) => [entry.term, entry.meaning, entry.explanation, entry.sourceLabel]),
];

const moduleDetails = {
  "01": [
    ["01", "Suomen kielen tasotesti", "تقييم مستوى اللغة الفنلندية قبل شراء التدريب، مع استثناءات محددة لمن يملك شهادة دراسية باللغة الفنلندية."],
    ["02", "Ajotavan arviointi", "تقييم أسلوب القيادة مع CAP: التحكم والوقوف، مواقف المرور، القيادة الآمنة، تقدير أبعاد السيارة، وقواعد المرور."],
    ["03", "Verkkokoulutus ja koe", "التدريب الإلكتروني والاختبار باللغة الفنلندية، ويشمل الخدمة، الأجهزة والعدادات، المعرفة المحلية، وحزمة معلومات السائق."],
    ["04", "Koulutusajo", "تدريب قيادة إلزامي بعد اجتياز اختبار الشركة، يستغرق نحو 8 ساعات ويتضمن تدريبًا عمليًا على الأجهزة وأهم الأماكن."],
    ["05", "Käytännön oppimisjakso", "فترة تعلم عملي تقارب 50 وردية تحت إشراف صاحب العمل، كما تذكر الصفحة الرسمية."],
    ["06", "طبيعة عمل السائق", "تصف Taksi Helsinki العمل بأنه خدمة للعملاء، متنوع ومستقل لكنه مسؤول؛ لا توجد ورديتان أو مقابلتان متطابقتان تمامًا."],
    ["07", "صفات السائق", "تذكر الشركة أهمية الموقف الإيجابي تجاه الخدمة، احترام العميل، الهدوء، الصبر، والقدرة على التركيز في عدة أمور وحل المواقف باستقلالية."],
    ["08", "اللغة الفنلندية", "توضح Taksi Helsinki أنها تشترط القدرة على خدمة العملاء باللغة الفنلندية، وأن تدريبها واختبارها يُجرَيان باللغة الفنلندية."],
    ["09", "التدريب المستمر", "تذكر الشركة أنها تنظم تدريبات وتمارين سنوية، وتتابع مستوى المهارة خصوصًا عند ظهور انحرافات في الجودة."],
  ],
  "02": [
    ["01", "اختبار الشركة أم Traficom؟", "هذا المسار يشرح الفارق: اختبار Taksi Helsinki جزء من تدريب الشركة، أما اختبار Traficom فهو شرط رخصة قيادة التاكسي الحكومية."],
    ["02", "لغة العمل", "تنص Taksi Helsinki على أن التدريب والاختبار الخاصين بها يُنفذان باللغة الفنلندية."],
    ["03", "50 سؤالًا / 45 دقيقة", "معلومة رسمية تخص اختبار Traficom: 50 سؤال اختيار من متعدد، بحد أقصى 45 دقيقة، وإجابة واحدة صحيحة تمامًا لكل سؤال."],
    ["04", "ممنوعات الاختبار", "تمنع Traficom الهواتف وسماعات الرأس وأجهزة الاتصال أو التسجيل والمواد التي تساعد على الغش داخل منطقة الاختبار."],
    ["05", "تغيير قادم في 1 سبتمبر 2026", "تقول Traficom إن اختبار سائق التاكسي سيُراجع في 1 سبتمبر 2026، مع إضافة موضوع حقوق السائق وواجباته وزيادة عدد الأسئلة بعشرة. هذه معلومة مستقبلية ويجب مراجعتها عند بدء سريانها."],
    ["06", "مكان الاختبار", "توضح Traficom أن اختبار سائق التاكسي يُجرى في نقطة خدمة Ajovarma، ويجب حجز موعد مسبقًا."],
    ["07", "مدة صلاحية الرخصة", "تذكر Traficom أن رخصة قيادة التاكسي صالحة خمس سنوات، أو سنتين لمن يبلغ 68 عامًا أو أكثر."],
    ["08", "التقرير الطبي", "يجب أن يكون التقرير الطبي المطلوب عند تقديم الطلب حديثًا، وتذكر Traficom ألا يتجاوز عمره 6 أشهر، مع استثناءات محددة في الصفحة الرسمية."],
    ["09", "نزاهة الاختبار", "توضح Traficom أن الغش في اختبار سائق التاكسي قد يؤدي إلى منع المرشح من دخول الاختبار لمدة 6 أشهر."],
    ["10", "صلاحية الاختبار المقبول", "تذكر Traficom أن اختبار سائق التاكسي المقبول صالح حتى إشعار آخر، مع ضرورة مراجعة أي تغيير رسمي لاحقًا."],
    ["11", "منع القيادة", "من شروط إصدار رخصة قيادة التاكسي ألا يكون مقدم الطلب ممنوعًا من القيادة."],
    ["12", "معلومة مستقبلية: عداد التاكسي", "تقول Traficom إن عدادات التاكسي تصبح إلزامية في جميع سيارات التاكسي من 1 فبراير 2027. هذه ليست قاعدة حالية قبل تاريخها."],
    ["13", "معلومة مستقبلية: لوحات التاكسي", "تقول Traficom إن لوحات التاكسي تصبح إلزامية في 1 يوليو 2027، مع بدء إصدارها من 1 يناير 2027."],
    ["14", "معلومة مستقبلية: شفافية الأجرة", "من 1 سبتمبر 2026، توضح Traficom أن السائق يجب أن يقدم معلومات الأجرة قبل الرحلة إذا طلب العميل ذلك، وفق الشروط المنشورة."],
    ["15", "حدود الاختبار", "هذه المراجعة لا تستبدل اختبار Traficom ولا تمثل أسئلته الحقيقية؛ هي أسئلة أصلية مبنية على معلومات عامة منشورة."],
  ],
  "03": [
    ["01", "مركز الطلب الإقليمي", "رحلة Kela تُطلب من مركز إقليمي. في Uusimaa يظهر رقم Taksi Helsinki الرسمي: 0800 414 600، مع رقم سويدي منفصل."],
    ["02", "الطلب المسبق", "استخدم مركز الطلب الإقليمي المنشور من Kela، وتحقق من التعليمات الحالية للمنطقة قبل الرحلة."],
    ["03", "تدريب السائق", "تذكر Taksi Helsinki أن سائقي رحلات Kela أكملوا تدريب المجموعات الخاصة وتدريب Taksi Helsinki الخاص بـ Kela."],
    ["04", "تدريب المجموعات الخاصة", "تذكر Taksi Helsinki أن التدريب الكامل 21 ساعة، منها 14 ساعة نظرية و7 ساعات عملية، مع قاعدة مختلفة لمن حصل على رخصته قبل 1 يوليو 2018."],
    ["05", "وقت وصول سيارة Kela", "تذكر Kela أن السيارة ينبغي أن تصل خلال 15 دقيقة من وقت الاستلام المتفق عليه. عند عدم الوصول، اتصل بمركز الطلب الذي حُجزت منه الرحلة."],
    ["06", "حدود المعرفة العامة", "تفاصيل نظام السائق الداخلية أو أزرار Autocab لا تُعرض هنا كحقائق ما لم نجد لها دليلًا رسميًا عامًا قابلًا للتحقق."],
    ["07", "معلومات الاستحقاق", "توضح Kela أن مركز الطلب يتلقى معلومات عن حق العميل في التعويض ونوع المركبة وحق السائق المألوف والمبلغ الذي يدفعه العميل، وفق البيانات المتاحة له."],
    ["08", "المساعدة والأجهزة", "يمكن للعميل طلب إضافة معلومات مستمرة عن الحاجة إلى مساعدة خاصة أو وجود أجهزة مساعدة؛ هذه المعلومة تساعد في ترتيب الرحلة."],
    ["09", "الرحلة المشتركة", "تذكر Kela أن استخدام السائق المألوف لا يمنع بالضرورة مشاركة الرحلة مع عملاء آخرين يسافرون في الاتجاه نفسه."],
    ["10", "الحجز بالرسالة النصية", "تتيح Kela طريقة الرسائل النصية لمن لديه إعاقة سمع أو كلام بعد تسجيل البيانات أول مرة لدى مركز الطلب."],
    ["11", "حدود المعرفة العامة", "لا نعرض أرقامًا أو تعليمات منطقة متغيرة كقاعدة دائمة؛ راجع صفحة Kela ومركز الطلب الحالي قبل الرحلة."],
  ],
  "04": [
    ["01", "المعرفة المحلية", "تدرج Taksi Helsinki معرفة pääkaupunkiseutu ضمن التدريب الإلكتروني، كما يذكر التدريب العملي التعرف على الأماكن المهمة."],
    ["02", "جودة الخدمة", "تقول Taksi Helsinki إن هدفها تقديم خدمة عالية الجودة وآمنة ومتاحة، وإن تجربة العميل تأتي أولًا."],
    ["03", "رضا العملاء", "تذكر الصفحة الرسمية أن الشركة تراقب رضا العملاء باستمرار وتطور خدماتها وفق احتياجات العملاء وتوقعاتهم."],
    ["04", "التصاريح السارية", "تذكر Taksi Helsinki أن سياراتها تحمل رخصة نقل تاكسي سارية، وأن كل سائق في نظام الإرسال يملك تصريح سائق تاكسي ساريًا."],
    ["05", "نطاق الخدمة المنشور", "تقول الصفحة الرسمية إن الشركة تعمل في منطقة العاصمة وتتوسع على المستوى الوطني، وتذكر مناطق محددة لخدمات Kela وSote. يجب التحقق من الصفحة الحالية قبل اعتماد أي منطقة تشغيلية."],
    ["06", "المطار والموانئ", "هذه المنصة لا تخترع مناطق انتظار أو مسارات تشغيلية؛ راجع تعليمات الشركة الحالية أو التدريب المدفوع عند توفرها."],
    ["07", "حدود المعرفة العامة", "لا توجد في المصادر المفتوحة المفحوصة خريطة تشغيلية كاملة أو دليل عام يشرح كل إجراءات السائق الداخلية، لذلك نترك هذه النقاط معلّمة بدل التخمين."],
    ["08", "التوسع ومناطق الخدمة", "تذكر الصفحة العامة أن Taksi Helsinki تعمل في منطقة العاصمة وتتوسع وطنيًا، لكنها تفصل مناطق خدمات Kela وSote؛ تحقق من الصفحة الحالية بدل حفظ قائمة قديمة."],
    ["09", "الخدمة الآمنة والمتاحة", "تصف Taksi Helsinki هدفها بأنه تقديم خدمة عالية الجودة وآمنة ومتاحة، وهذه مبادئ خدمة عامة وليست تعليمات تشغيلية داخلية."],
    ["10", "مراقبة الجودة", "تقول الشركة إنها تراقب رضا العملاء باستمرار وتطور الخدمة وفق احتياجاتهم وتوقعاتهم."],
    ["11", "المصدر المفتوح وحدوده", "المعلومات المنشورة لا تعطي خريطة انتظار للمطار أو الموانئ ولا خطوات تشغيلية لكل موقف؛ لذلك لا نضع مسارات أو تعليمات من عندنا."],
  ],
};

function HeartPulseIcon(props: { size?: number; className?: string }) {
  return <span className={props.className}><svg width={props.size ?? 24} height={props.size ?? 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"/><path d="M3.5 12h3l1.5-3 3 6 1.5-3h4"/></svg></span>;
}

function BrandMark() {
  return <div className="brand-mark"><span>TH</span><i /></div>;
}

function SourceBadge({ children = "موثق" }: { children?: string }) {
  return <span className="source-badge"><ShieldCheck size={13} />{children}</span>;
}

function App() {
  const [activeNav, setActiveNav] = useState<NavKey>("home");
  const [selectedModule, setSelectedModule] = useState("01");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [glossarySearch, setGlossarySearch] = useState("");

  const currentQuestion = questions[quizIndex];
  const quizScore = Object.entries(answers).filter(([index, answer]) => questions[Number(index)].answer === answer).length;
  const filteredGlossary = useMemo(
    () => glossaryTerms.filter(([term, meaning]) => `${term} ${meaning}`.toLowerCase().includes(glossarySearch.toLowerCase())),
    [glossarySearch],
  );

  function navigate(key: NavKey) {
    setActiveNav(key);
    setMobileMenu(false);
    if (key !== "quiz") setQuizStarted(false);
  }

  function startQuiz() {
    setActiveNav("quiz");
    setQuizStarted(true);
    setQuizCompleted(false);
    setQuizIndex(0);
    setSelectedAnswer(null);
    setAnswers({});
  }

  function answerQuestion(answer: number) {
    setSelectedAnswer(answer);
    setAnswers((previous) => ({ ...previous, [quizIndex]: answer }));
  }

  function nextQuestion() {
    if (quizIndex < questions.length - 1) {
      setQuizIndex((index) => index + 1);
      setSelectedAnswer(answers[quizIndex + 1] ?? null);
      return;
    }
    setQuizCompleted(true);
  }

  const navItems: Array<{ key: NavKey; label: string; icon: typeof LayoutDashboard }> = [
    { key: "home", label: "نظرة عامة", icon: LayoutDashboard },
    { key: "path", label: "مسار التدريب", icon: BookOpenCheck },
    { key: "quiz", label: "بنك الأسئلة", icon: CircleHelp },
    { key: "glossary", label: "قاموس السائق", icon: Languages },
    { key: "sources", label: "المصادر الرسمية", icon: Library },
    { key: "knowledge", label: "قاعدة المعرفة", icon: FileCheck2 },
  ];

  return (
    <div className={`app-shell ${darkMode ? "dark-app" : ""}`} dir="rtl">
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="sidebar-top">
          <div className="brand"><BrandMark /><div><strong>Taksi Pro</strong><span>سجلّ السائق الذكي</span></div></div>
          <button className="icon-button mobile-close" onClick={() => setMobileMenu(false)} aria-label="إغلاق القائمة"><X size={19} /></button>
        </div>
        <nav className="main-nav">
          <p className="nav-label">مساحة الدراسة</p>
          {navItems.map(({ key, label, icon: Icon }) => <button key={key} className={`nav-item ${activeNav === key ? "active" : ""}`} onClick={() => navigate(key)}><Icon size={18} /><span>{label}</span>{key === "quiz" && <em>{questions.length}</em>}</button>)}
        </nav>
        <div className="sidebar-spacer" />
        <div className="help-card"><div className="help-icon"><Headphones size={18} /></div><strong>تحتاج مساعدة؟</strong><span>راجع المصدر قبل أن تعتمد المعلومة.</span><button onClick={() => navigate("sources")}>فتح مركز المراجع <ArrowLeft size={14} /></button></div>
        <div className="sidebar-footer"><span className="status-dot" /> المحتوى متاح للعمل دون اتصال <button className="mini-icon" onClick={() => setDarkMode((value) => !value)}>{darkMode ? <Sun size={15} /> : <Moon size={15} />}</button></div>
      </aside>
      {mobileMenu && <button className="mobile-overlay" onClick={() => setMobileMenu(false)} aria-label="إغلاق القائمة" />}

      <main className="main-content">
        <header className="topbar"><button className="icon-button menu-toggle" onClick={() => setMobileMenu(true)}><Menu size={20} /></button><div className="breadcrumbs"><span>مساحة الدراسة</span><ChevronLeft size={14} /><strong>{navItems.find((item) => item.key === activeNav)?.label}</strong></div><div className="topbar-actions"><div className="sync-status"><span className="status-dot" /> دراسة عامة · لا حساب</div><button className="icon-button" aria-label="بحث"><Search size={18} /></button></div></header>

        {activeNav === "home" && <Dashboard onStartQuiz={startQuiz} onNavigate={navigate} onOpenModule={(id) => { setSelectedModule(id); setActiveNav("path"); }} />}
        {activeNav === "path" && <TrainingPath selectedModule={selectedModule} onSelectModule={setSelectedModule} onStartQuiz={startQuiz} />}
        {activeNav === "quiz" && <QuizView started={quizStarted} completed={quizCompleted} startQuiz={startQuiz} currentQuestion={currentQuestion} quizIndex={quizIndex} selectedAnswer={selectedAnswer} answers={answers} quizScore={quizScore} onAnswer={answerQuestion} onNext={nextQuestion} onRestart={startQuiz} onBack={() => { setQuizStarted(false); setQuizCompleted(false); setActiveNav("home"); }} />}
        {activeNav === "glossary" && <Glossary search={glossarySearch} onSearch={setGlossarySearch} terms={filteredGlossary} />}
        {activeNav === "sources" && <SourceRegistryView />}
        {activeNav === "knowledge" && <KnowledgeBaseView />}
      </main>
    </div>
  );
}

type SourceCheckState = "checking" | "reachable" | "unchanged" | "changed" | "unavailable" | "restricted";
type SourceCheck = { state: SourceCheckState; httpStatus?: number; message: string };

function SourceRegistryView() {
  const [statusFilter, setStatusFilter] = useState<"all" | "current" | "historical" | "future" | "restricted">("all");
  const [query, setQuery] = useState("");
  const [verification, setVerification] = useState<Record<string, SourceCheck>>({});
  const [isVerifying, setIsVerifying] = useState(false);
  const normalizedQuery = query.trim().toLowerCase();
  const filteredSources = useMemo(() => sourceRegistry.filter((source) => {
    const statusMatch = statusFilter === "all" || (statusFilter === "current" && source.status === "official_current") || (statusFilter === "historical" && source.status === "official_historical") || (statusFilter === "future" && source.status === "official_future") || (statusFilter === "restricted" && source.status === "access_restricted");
    const searchable = [source.title, source.publisher, source.documentType, source.topics.join(" "), source.notes ?? ""].join(" ").toLowerCase();
    return statusMatch && (!normalizedQuery || searchable.includes(normalizedQuery));
  }), [normalizedQuery, statusFilter]);

  async function verifySources() {
    setIsVerifying(true);
    const checking: Record<string, SourceCheck> = {};
    sourceRegistry.forEach((source) => {
      checking[source.id] = { state: "checking", message: "جارٍ فحص الرابط" };
    });
    setVerification(checking);

    const results: Record<string, SourceCheck> = {};
    await Promise.all(sourceRegistry.map(async (source) => {
      if (source.status === "access_restricted") {
        results[source.id] = { state: "restricted", message: "ACCESS_RESTRICTED · لم يُطلب المحتوى" };
        return;
      }
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 8000);
      try {
        const hasBaseline = source.contentHash !== "not_computed_in_static_build";
        const response = await fetch(source.url, { method: hasBaseline ? "GET" : "HEAD", cache: "no-store", signal: controller.signal });
        if (!response.ok) {
          results[source.id] = { state: "unavailable", httpStatus: response.status, message: "HTTP غير ناجح أو المصدر غير متاح" };
          return;
        }
        if (!hasBaseline) {
          results[source.id] = { state: "reachable", httpStatus: response.status, message: "الرابط متاح · لم تُقارن hash" };
          return;
        }
        if (!crypto.subtle) {
          results[source.id] = { state: "reachable", httpStatus: response.status, message: "الرابط متاح · تعذر تشغيل مقارنة hash في المتصفح" };
          return;
        }
        const bytes = await response.arrayBuffer();
        const digest = await crypto.subtle.digest("SHA-256", bytes);
        const currentHash = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
        const expectedHash = source.contentHash.replace(/^sha256:/, "");
        const matches = currentHash === expectedHash;
        results[source.id] = { state: matches ? "unchanged" : "changed", httpStatus: response.status, message: matches ? "unchanged · hash مطابق" : "SOURCE_CHANGED · hash مختلف، أعد تحليل المصدر" };
      } catch {
        results[source.id] = { state: "unavailable", message: "تعذر الفحص من المتصفح؛ قد يكون CORS أو المصدر غير متاح" };
      } finally {
        window.clearTimeout(timeoutId);
      }
    }));

    setVerification(results);
    setIsVerifying(false);
  }

  const verificationValues = Object.values(verification);
  const reachableCount = verificationValues.filter((result) => result.state === "reachable" || result.state === "unchanged").length;
  const changedCount = verificationValues.filter((result) => result.state === "changed").length;
  const unavailableCount = verificationValues.filter((result) => result.state === "unavailable").length;
  const restrictedCount = verificationValues.filter((result) => result.state === "restricted").length;

  return <div className="page-wrap"><section className="page-heading"><div><div className="eyebrow-line"><Library size={15} /> سجل التحقق المحلي</div><h1>المصادر الرسمية</h1><p>Registry محلي يفصل الحالي والتاريخي والمستقبلي والوصول المقيد.</p></div><div className="source-heading-actions"><button className="secondary-button" onClick={verifySources} disabled={isVerifying}><ShieldCheck size={16} /> {isVerifying ? "جارٍ الفحص..." : "Verify Sources"}</button><div className="source-counter"><ShieldCheck size={18} /><strong>{sourceRegistry.length}</strong><span>سجل مصدر</span></div></div></section><div className="source-principles"><div><ShieldCheck size={21} /><div><strong>Tier 1 أولًا</strong><p>Taksi Helsinki للسياسات التشغيلية، ثم Kela وTraficom.</p></div></div><div><FileText size={21} /><div><strong>التاريخ والصفحة</strong><p>كل Evidence يذكر الإصدار أو الصفحة عند توفرها.</p></div></div><div><LockKeyhole size={21} /><div><strong>لا نتجاوز الحماية</strong><p>المواد الخاصة تبقى ACCESS_RESTRICTED.</p></div></div></div><div className="source-controls"><div className="search-box"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث عن AD Kuljettaja أو Kela أو Cabman..." /><kbd>⌘ K</kbd></div><div className="source-filter-row">{([["all", "الكل"], ["current", "Current"], ["historical", "Historical"], ["future", "Future"], ["restricted", "وصول مقيد"]] as const).map(([value, label]) => <button key={value} className={statusFilter === value ? "active" : ""} onClick={() => setStatusFilter(value)}>{label}</button>)}</div></div>{verificationValues.length > 0 && <div className="source-verification-summary" aria-live="polite"><strong>نتيجة الفحص الحالي</strong><span>{reachableCount} رابط متاح أو hash مطابق</span><span>{changedCount} SOURCE_CHANGED</span><span>{unavailableCount} غير متاح أو محجوب</span><span>{restrictedCount} وصول مقيد دون طلب المحتوى</span><small>الفحص يستخدم HEAD للمصادر بلا baseline، وGET/ SHA-256 فقط عندما يوجد contentHash مسجل. لا يتم تحديث المحتوى تلقائيًا.</small></div>}<div className="sources-list">{filteredSources.map((source, index) => { const check = verification[source.id]; return <article className="source-card" key={source.id}><div className={`source-number ${["amber", "blue", "teal", "violet", "rose"][index % 5]}`}>{String(index + 1).padStart(2, "0")}</div><div className="source-card-body"><div className="source-title-row"><div><span>{source.publisher}</span><h3>{source.title}</h3></div><SourceStatusBadge status={source.status} /></div><div className="source-card-meta"><SourceBadge>{source.documentType}</SourceBadge><span><Clock3 size={13} /> نُشر/رُفع: {source.publicationDate}</span>{source.pages && <span><FileText size={13} /> {source.pages} صفحة</span>}</div>{check && <div className={`source-check-result check-${check.state}`}><span className="status-dot" /><span>{check.message}</span>{check.httpStatus && <small>HTTP {check.httpStatus}</small>}</div>}<div className="source-topics">{source.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>{source.notes && <p className="source-note-text">{source.notes}</p>}<div className="source-record-footer"><span>Last verified: {source.lastVerified} · Used in {knowledgeLessons.filter((lesson) => lesson.sourceIds.includes(source.id)).length} lessons</span><a href={source.url} target="_blank" rel="noreferrer">فتح المصدر الأصلي <ArrowLeft size={14} /></a></div></div></article>; })}</div><div className="sources-disclaimer"><div className="note-icon"><Info size={18} /></div><p><strong>قاعدة عدم الهلوسة:</strong> ملفات Autocab ومواد Materiaalisalkku وإشعارات السائق لم تكن متاحة للقراءة العامة عند التحقق، لذلك تظهر كـ ACCESS_RESTRICTED. أما Mitax وSemel فتم تسجيلها لكن لم تُستخدم لإثبات أزرار غير مقروءة. أي SOURCE_CHANGED يحتاج إعادة تحليل بشرية قبل تحديث Evidence؛ لا يتم تجاوز تسجيل الدخول أو تعديل قاعدة المعرفة تلقائيًا.</p></div></div>;
}

function Dashboard({ onStartQuiz, onNavigate, onOpenModule }: { onStartQuiz: () => void; onNavigate: (key: NavKey) => void; onOpenModule: (id: string) => void }) {
  return <div className="page-wrap">
    <section className="welcome-row"><div><div className="eyebrow-line"><Sparkles size={15} /> أكاديمية Taksi Helsinki · دراسة عامة</div><h1>مرحبًا بك في أكاديمية السائق <span>👋</span></h1><p>تعلّم من المصادر الرسمية، بدون حساب تجريبي أو بيانات مستخدم مسبقة.</p></div><button className="primary-button" onClick={onStartQuiz}><Play size={17} fill="currentColor" /> ابدأ جلسة تدريب</button></section>
    <section className="hero-panel"><div className="hero-copy"><div className="hero-kicker"><span className="live-dot" /> مساحة دراسة عامة · بدون حساب</div><h2>تعلّم من المصدر<br /><em>وابنِ معرفتك بثقة.</em></h2><p>ابدأ بأي وحدة، وافتح المصدر الرسمي المرتبط بكل درس قبل اعتماد المعلومة.</p><div className="hero-actions"><button className="light-button" onClick={() => onOpenModule("01")}>ابدأ من المسار <ArrowLeft size={16} /></button><span className="hero-meta"><Clock3 size={14} /> مصادر رسمية مرتبطة بكل درس</span></div></div><div className="hero-orbit"><div className="orbit-ring ring-one" /><div className="orbit-ring ring-two" /><div className="orbit-core"><ShieldCheck size={35} /><span>موثق</span></div><div className="orbit-chip chip-one"><FileCheck2 size={13} /> المصادر</div><div className="orbit-chip chip-two"><BookOpen size={13} /> الدروس</div></div></section>
    <div className="section-heading"><div><h2>ملخص المحتوى</h2><p>أرقام المحتوى الموثق، لا تقييمات المستخدمين</p></div><button className="text-button" onClick={() => onNavigate("path")}>عرض المسار كاملًا <ArrowLeft size={15} /></button></div>
    <section className="stats-grid"><StatCard icon={BookOpen} label="دروس منظمة" value={`${knowledgeLessons.length}`} note="في قاعدة المعرفة" color="amber" /><StatCard icon={CircleHelp} label="أسئلة تدريبية" value={`${questions.length}`} note="ليست أسئلة امتحان" color="blue" /><StatCard icon={Library} label="مصادر مسجلة" value={`${sourceRegistry.length}`} note="Current / Historical / Future" color="teal" /><StatCard icon={ShieldCheck} label="حالة المنصة" value="عامة" note="بدون مستخدم افتراضي" color="violet" /></section>
    <div className="content-grid"><section><div className="section-heading compact"><div><h2>مساراتك الحالية</h2><p>وحدات قابلة للفتح مع مرجع لكل محور</p></div><button className="text-button" onClick={() => onNavigate("path")}>كل المسارات <ArrowLeft size={15} /></button></div><div className="module-list">{modules.slice(0, 3).map((module) => <ModuleRow key={module.id} module={module} onClick={() => onOpenModule(module.id)} />)}</div></section><aside className="side-column"><div className="quiz-card"><div className="quiz-card-head"><div className="quiz-card-icon"><Brain size={20} /></div><span>تحدي اليوم</span><MoreHorizontal size={18} /></div><h3>هل أنت جاهز لاختبار قصير؟</h3><p>{questions.length} أسئلة أصلية مبنية على مصادر رسمية، بلا أسئلة امتحان مسرّبة.</p><div className="quiz-footer"><span><Clock3 size={14} /> 15 دقيقة</span><button onClick={onStartQuiz}>ابدأ <ArrowLeft size={14} /></button></div></div><div className="source-note"><div className="note-icon"><FileCheck2 size={18} /></div><div><strong>قاعدة المنصة</strong><p>نميز دائمًا بين <b>رسمي</b> و<b>شرح تعليمي</b> و<b>سؤال تدريبي</b>.</p></div></div></aside></div>
    <section className="bottom-strip"><div className="strip-icon"><FileText size={20} /></div><div><strong>آخر تحديث للمحتوى</strong><p>18 أغسطس 2026 · تم فحص صفحات Taksi Helsinki وTraficom وKela الرسمية.</p></div><button onClick={() => onNavigate("sources")}>راجع المصادر <ExternalLink size={15} /></button></section>
  </div>;
}

function StatCard({ icon: Icon, label, value, note, color }: { icon: typeof BarChart3; label: string; value: string; note: string; color: string }) {
  return <div className="stat-card"><div className={`stat-icon ${color}`}><Icon size={18} /></div><div><span>{label}</span><strong>{value}</strong><small>{note}</small></div></div>;
}

function ModuleRow({ module, onClick }: { module: typeof modules[number]; onClick: () => void }) {
  const Icon = module.icon;
  return <button className="module-row" onClick={onClick}><div className={`module-icon ${module.color}`}><Icon size={21} /></div><div className="module-main"><div className="module-title"><span className="module-number">{module.id}</span><strong>{module.title}</strong><SourceBadge>{module.source}</SourceBadge></div><p>{module.description}</p><div className="module-progress"><span className="module-meta"><Clock3 size={13} /> {module.duration} <span>·</span> {module.lessons} دروس</span><span className="module-content-label">محتوى موثق</span></div></div><ChevronLeft size={18} className="row-chevron" /></button>;
}

function TrainingPath({ selectedModule, onSelectModule, onStartQuiz }: { selectedModule: string; onSelectModule: (id: string) => void; onStartQuiz: () => void }) {
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const detail = moduleDetails[selectedModule as keyof typeof moduleDetails];
  const selected = modules.find((module) => module.id === selectedModule) ?? modules[0];
  const Icon = selected.icon;
  return <div className="page-wrap"><section className="page-heading"><div><div className="eyebrow-line"><BookOpenCheck size={15} /> المنهج الموثق</div><h1>مسار التدريب</h1><p>محتوى عملي، مترجم، ومربوط بالمصدر الأصلي لكل موضوع.</p></div><button className="secondary-button" onClick={onStartQuiz}><Brain size={16} /> اختبر نفسك</button></section><div className="path-layout"><aside className="path-nav"><div className="path-nav-head"><span>المنهج الكامل</span><small>4 وحدات</small></div>{modules.map((module) => { const ModuleIcon = module.icon; return <button key={module.id} onClick={() => onSelectModule(module.id)} className={`path-nav-item ${selectedModule === module.id ? "selected" : ""}`}><div className={`module-icon small ${module.color}`}><ModuleIcon size={16} /></div><div><strong>{module.id} · {module.title}</strong><span>{module.lessons} دروس موثقة</span></div><ChevronLeft size={15} /></button>; })}<div className="path-total"><div className="circular-progress"><BookOpen size={18} /></div><div><strong>المحتوى الكامل</strong><span>{knowledgeModules.length} محورًا موثقًا</span></div></div></aside><section className="lesson-panel"><div className={`lesson-banner ${selected.color}`}><div className="lesson-banner-copy"><span className="lesson-eyebrow">الوحدة {selected.id} · {selected.eyebrow}</span><h2>{selected.title}</h2><p>{selected.description}</p><SourceBadge>{selected.source}</SourceBadge></div><div className="lesson-visual"><Icon size={42} /><span>مصدر</span></div></div><div className="lesson-meta-row"><span><Clock3 size={15} /> {selected.duration}</span><span><BookOpen size={15} /> {selected.lessons} دروس</span><span><ShieldCheck size={15} /> مصدر لكل درس</span><button className="outline-button" onClick={onStartQuiz}><Play size={14} /> جلسة مراجعة</button></div><div className="lesson-list">{detail.map(([number, title, description], index) => <div className="lesson-item" key={number}><div className="lesson-check"><span>{number}</span></div><div className="lesson-item-copy"><div><strong>{title}</strong></div><p>{description}</p></div><button className="lesson-open" onClick={() => setActiveLesson(activeLesson === number ? null : number)}>{activeLesson === number ? "إخفاء" : "فتح"} <ArrowLeft size={14} /></button>{activeLesson === number && <div className="lesson-preview"><strong>ملخص الدرس</strong><p>{description}</p><span><ShieldCheck size={13} /> شرح تعليمي مرتبط بالمحتوى الموثق</span><a href={moduleSourceUrls[selected.id]} target="_blank" rel="noreferrer">فتح المصدر الأصلي <ExternalLink size={12} /></a></div>}</div>)}</div><div className="verified-callout"><div><Info size={18} /></div><p><strong>ملاحظة منهجية:</strong> تفاصيل نظام السائق الداخلية، مثل أزرار Autocab أو إجراءات الأعطال، لا تُعرض كحقائق إلا إذا كانت في دليل رسمي عام قابل للتحقق. المحتوى المدفوع غير متاح لنا.</p></div></section></div></div>;
}

function QuizView({ started, completed, startQuiz, currentQuestion, quizIndex, selectedAnswer, answers, quizScore, onAnswer, onNext, onRestart, onBack }: { started: boolean; completed: boolean; startQuiz: () => void; currentQuestion: Question; quizIndex: number; selectedAnswer: number | null; answers: Record<number, number>; quizScore: number; onAnswer: (answer: number) => void; onNext: () => void; onRestart: () => void; onBack: () => void }) {
  if (!started) return <div className="page-wrap"><section className="quiz-intro"><div className="quiz-intro-icon"><Brain size={38} /></div><div className="eyebrow-line">بنك الأسئلة · تدريب أصلي</div><h1>اختبر جاهزيتك بهدوء</h1><p>جلسة قصيرة من {questions.length} أسئلة مبنية على معلومات قابلة للتحقق من Taksi Helsinki وTraficom وKela. هذه الأسئلة تدريبية وليست أسئلة الامتحان الحقيقي.</p><div className="quiz-feature-row"><span><FileCheck2 size={17} /> مصادر مرفقة</span><span><TimerReset size={17} /> 15 دقيقة</span><span><Target size={17} /> نتيجة فورية</span></div><button className="primary-button" onClick={startQuiz}><Play size={17} fill="currentColor" /> ابدأ الاختبار القصير</button><button className="back-link" onClick={onBack}><ArrowRightIcon /> العودة إلى لوحة التحكم</button></section></div>;
  const isLast = quizIndex === questions.length - 1;
  const hasAnswer = selectedAnswer !== null;
  return <div className="page-wrap quiz-page"><div className="quiz-topline"><button className="back-link" onClick={onBack}><ChevronRightIcon /> إنهاء الجلسة</button><div className="quiz-progress-copy"><span>سؤال {quizIndex + 1} من {questions.length}</span><div className="quiz-progress-track"><span style={{ width: `${((quizIndex + 1) / questions.length) * 100}%` }} /></div></div><span className="score-pill"><Trophy size={14} /> {quizScore} صحيحة</span></div><div className="quiz-question-card"><div className="question-meta"><span className="category-pill">{currentQuestion.category}</span><SourceBadge>تدريبي</SourceBadge></div><h1 dir="ltr">{currentQuestion.finnish}</h1><p className="arabic-question">{currentQuestion.arabic}</p><div className="options-list">{currentQuestion.options.map((option, index) => { const isChosen = selectedAnswer === index; const isCorrect = hasAnswer && index === currentQuestion.answer; const isWrong = isChosen && index !== currentQuestion.answer; return <button key={option} className={`option ${isChosen ? "chosen" : ""} ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`} onClick={() => !hasAnswer && onAnswer(index)}><span className="option-letter">{String.fromCharCode(65 + index)}</span><span>{option}</span>{isCorrect && <Check size={18} />}{isWrong && <X size={18} />}</button>; })}</div>{hasAnswer && <div className={`answer-feedback ${selectedAnswer === currentQuestion.answer ? "positive" : "negative"}`}><div>{selectedAnswer === currentQuestion.answer ? <Check size={18} /> : <Info size={18} />}</div><p><strong>{selectedAnswer === currentQuestion.answer ? "إجابة صحيحة" : "راجع هذه النقطة"}</strong>{currentQuestion.explanation}<small>المصدر: {currentQuestion.source}{currentQuestion.sourcePage ? ` · الصفحة ${currentQuestion.sourcePage}` : ""}{currentQuestion.evidenceId ? ` · Evidence ${currentQuestion.evidenceId}` : ""}</small></p></div>}<div className="question-actions"><span><LockKeyhole size={14} /> لا نحفظ بيانات شخصية</span>{hasAnswer && (completed ? <button className="secondary-button" onClick={onRestart}><Play size={14} /> إعادة الاختبار</button> : <button className="primary-button" onClick={onNext}>{isLast ? "عرض النتيجة" : "السؤال التالي"} <ArrowLeft size={16} /></button>)}</div></div>{isLast && hasAnswer && completed && <div className="quiz-result"><Trophy size={23} /><div><strong>أكملت جلسة المراجعة</strong><span>نتيجتك {quizScore} من {questions.length}. ارجع للمصادر إذا أخطأت في سؤال.</span></div><button className="text-button" onClick={onBack}>العودة للوحة <ArrowLeft size={14} /></button></div>}</div>;
}

function Glossary({ search, onSearch, terms }: { search: string; onSearch: (value: string) => void; terms: string[][] }) {
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const examples: Record<string, string> = {
    Kuljettaja: "Kuljettaja saapuu nouto-osoiteen ajoissa. · يصل السائق إلى عنوان الاستلام في الوقت المحدد.",
    "Nouto-osoite": "Tarkista nouto-osoite ennen kuin aloitat ajon. · تحقق من عنوان الاستلام قبل بدء الرحلة.",
    Määränpää: "Määränpää näkyy tilauksessa. · تظهر الوجهة في الطلب.",
    Kyyti: "Kyyti alkaa, kun asiakas on autossa. · تبدأ الرحلة عندما يكون العميل داخل السيارة.",
    Tilaus: "Vastaanota tilaus ja tarkista tiedot. · استقبل الطلب وتحقق من البيانات.",
  };
  return <div className="page-wrap"><section className="page-heading"><div><div className="eyebrow-line"><Languages size={15} /> فنلندي عملي</div><h1>قاموس السائق</h1><p>المصطلح كما ستراه في المادة، ثم معناه بالعربية وشرحه العملي.</p></div><div className="glossary-count">{terms.length} مصطلحًا</div></section><div className="search-box"><Search size={18} /><input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="ابحث بالفنلندية أو العربية..." /><kbd>⌘ K</kbd></div><div className="glossary-grid">{terms.map(([term, meaning, explanation, sourceLabel], index) => { const isExpanded = expandedTerm === term; return <article className={`glossary-card ${isExpanded ? "expanded" : ""}`} key={term}><span className="glossary-index">{String(index + 1).padStart(2, "0")}</span><div className="glossary-term"><strong dir="ltr">{term}</strong><span>{meaning}</span></div><p>{explanation}</p>{isExpanded && <div className="glossary-example"><strong>مثال موثق</strong><span>{sourceLabel ? `${examples[term] ?? knowledgeGlossary.find((entry) => entry.term === term)?.example ?? `راجع ${term} في المصدر.`}` : (examples[term] ?? `استخدم مصطلح ${term} عند مراجعة تفاصيل الرحلة مع العميل.`)}</span>{sourceLabel && <small>المصدر: {sourceLabel}</small>}</div>}<div className="glossary-footer"><SourceBadge>{sourceLabel ? "مصدر رسمي" : "شرح تعليمي"}</SourceBadge><button onClick={() => setExpandedTerm(isExpanded ? null : term)}><BookOpen size={14} /> {isExpanded ? "إخفاء المثال" : "مثال عملي"}</button></div></article>; })}</div></div>;
}

const sourceStatusLabels: Record<SourceStatus, string> = {
  official_current: "رسمي · حالي",
  official_historical: "رسمي · تاريخي",
  official_future: "رسمي · مستقبلي",
  official_notice: "إشعار رسمي",
  access_restricted: "وصول مقيد",
  not_verified: "NOT_VERIFIED",
};

function SourceStatusBadge({ status }: { status: SourceStatus }) {
  return <span className={`source-status-badge status-${status}`}><span className="status-dot" />{sourceStatusLabels[status]}</span>;
}

function KnowledgeBaseView() {
  const [query, setQuery] = useState("");
  const [moduleFilter, setModuleFilter] = useState("all");
  const [expandedLesson, setExpandedLesson] = useState("kb-ad-003");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredLessons = useMemo(() => knowledgeLessons.filter((lesson) => {
    const searchable = [lesson.title, lesson.summary, lesson.commonMistake, ...lesson.whatYouNeedToKnow, ...lesson.terminology].join(" ").toLowerCase();
    return (moduleFilter === "all" || lesson.moduleId === moduleFilter) && (!normalizedQuery || searchable.includes(normalizedQuery));
  }), [moduleFilter, normalizedQuery]);

  return <div className="page-wrap">
    <section className="page-heading knowledge-heading"><div><div className="eyebrow-line"><FileCheck2 size={15} /> مصدر ← دليل ← تدريب</div><h1>قاعدة المعرفة</h1><p>محتوى محلي منظم من المصادر الرسمية، مع Evidence واضح وحدود معلنة للمادة غير المتاحة.</p></div><div className="audit-stamp"><span>آخر تحقق</span><strong>{knowledgeAudit.lastVerified}</strong></div></section>
    <section className="kb-audit-grid">{[
      ["مصادر رسمية", knowledgeAudit.officialSourcesDiscovered, "اكتُشفت وسُجلت"],
      ["ملفات PDF مقروءة", `${knowledgeAudit.officialPdfsParsed}/${knowledgeAudit.officialPdfsDiscovered}`, "المقروء كاملًا"],
      ["Evidence claims", knowledgeAudit.knowledgeClaims, "ادعاء مرتبط بمصدر"],
      ["دروس منظمة", knowledgeAudit.lessonsGenerated, `${knowledgeAudit.practicalScenarios} حالات عملية`],
      ["أسئلة مرتبطة", knowledgeAudit.quizQuestions, "training · ليست امتحانًا"],
      ["غير متحقق", knowledgeAudit.unverifiedClaims, `${knowledgeAudit.notVerifiedTopics} محاور محجوبة`],
    ].map(([label, value, note]) => <div className="kb-audit-card" key={label}><span>{label}</span><strong>{value}</strong><small>{note}</small></div>)}</section>
    <div className="knowledge-toolbar"><div className="search-box"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث في الدروس والمصطلحات وAutocab وKela..." /><kbd>⌘ K</kbd></div><select value={moduleFilter} onChange={(event) => setModuleFilter(event.target.value)} aria-label="تصفية الوحدات"><option value="all">كل الوحدات ({knowledgeModules.length})</option>{knowledgeModules.map((module) => <option key={module.id} value={module.id}>{module.number} · {module.title}</option>)}</select></div>
    <div className="knowledge-layout"><aside className="knowledge-module-list"><div className="path-nav-head"><span>تغطية المنهج</span><small>{knowledgeModules.length} محورًا</small></div>{knowledgeModules.map((module) => <button key={module.id} className={`knowledge-module-row ${moduleFilter === module.id ? "selected" : ""}`} onClick={() => setModuleFilter(moduleFilter === module.id ? "all" : module.id)}><span className="module-number">{module.number}</span><span><strong>{module.title}</strong><small>{module.lessonIds.length} {module.lessonIds.length === 1 ? "درس" : "دروس"}</small></span><SourceStatusBadge status={module.status} /></button>)}</aside><section className="knowledge-results"><div className="knowledge-results-head"><div><h2>الدروس والأدلة</h2><p>{filteredLessons.length} نتيجة · افتح الدرس لرؤية الإجراء والمصدر والصفحة.</p></div><span className="source-badge"><ShieldCheck size={13} /> لا معلومات بلا Evidence</span></div>{filteredLessons.length === 0 && <div className="empty-state"><Search size={22} /><strong>لا توجد نتيجة موثقة لهذا البحث</strong><span>جرّب مصطلحًا آخر أو اختر كل الوحدات.</span></div>}{filteredLessons.map((lesson) => { const isExpanded = expandedLesson === lesson.id; return <article className={`knowledge-lesson-card ${isExpanded ? "expanded" : ""}`} key={lesson.id}><div className="knowledge-lesson-top"><div><div className="knowledge-lesson-label"><span>الوحدة {knowledgeModules.find((module) => module.id === lesson.moduleId)?.number ?? "—"}</span><SourceStatusBadge status={lesson.status} /></div><h3>{lesson.title}</h3><p>{lesson.summary}</p></div><button className="lesson-open" onClick={() => setExpandedLesson(isExpanded ? "" : lesson.id)}>{isExpanded ? "إخفاء التفاصيل" : "فتح الدليل"} <ArrowLeft size={14} /></button></div>{isExpanded && <div className="knowledge-lesson-detail"><div className="detail-columns"><div><h4>ما تحتاج إلى معرفته</h4><ul>{lesson.whatYouNeedToKnow.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h4>الإجراء المنشور</h4><ol>{lesson.officialProcedure.map((item) => <li key={item}>{item}</li>)}</ol></div><div><h4>مصطلحات</h4><div className="term-chips">{lesson.terminology.map((term) => <span key={term}>{term}</span>)}</div><p className="mistake-note"><strong>خطأ شائع:</strong> {lesson.commonMistake}</p></div></div>{lesson.scenario && <div className="scenario-card"><div className="scenario-icon"><Target size={17} /></div><div><span>حالة عملية مشتقة من الدليل</span><h4>{lesson.scenario.title}</h4><p><strong>ماذا حدث؟</strong> {lesson.scenario.happened}</p><p><strong>لماذا؟</strong> {lesson.scenario.why}</p><p><strong>ما يثبته المصدر:</strong> {lesson.scenario.officialGuidance}</p><p><strong>الخطوة التالية:</strong> {lesson.scenario.nextStep}</p></div></div>}<div className="evidence-panel"><div className="evidence-panel-head"><div><h4>Evidence panel</h4><p>كل claim هنا مرتبط بمصدر وصفحة.</p></div><span>{lesson.evidenceIds.length} أدلة</span></div>{lesson.evidenceIds.length === 0 && <p className="not-verified-note">NOT_VERIFIED — لا توجد claims تشغيلية مثبتة لهذا الدرس.</p>}{lesson.evidenceIds.map((evidenceId) => { const evidence = evidenceFor(evidenceId); if (!evidence) return null; const source = sourceFor(evidence.sourceId); return <div className="evidence-row" key={evidence.id}><div className="evidence-page">{evidence.page}<small>صفحة</small></div><div><strong>{evidence.claim}</strong><span>{evidence.section} · {evidence.topic}</span></div>{source && <a href={source.url} target="_blank" rel="noreferrer" aria-label={`فتح ${source.title}`}><ExternalLink size={14} /></a>}</div>; })}</div><div className="lesson-source-row">{lesson.sourceIds.map((sourceId) => { const source = sourceFor(sourceId); if (!source) return null; return <a key={source.id} href={source.url} target="_blank" rel="noreferrer"><ShieldCheck size={13} /> {source.title} <ExternalLink size={12} /></a>; })}<span>آخر تحقق: {lesson.lastVerified}</span></div></div>}</article>; })}</section></div>
    <section className="mock-exams"><div className="section-heading compact"><div><h2>Mock exams</h2><p>تقسيم الأسئلة حسب المحور، وكلها تدريبية مرتبطة بالمصدر.</p></div><SourceBadge>official_exam_question = false</SourceBadge></div><div className="mock-exam-grid">{mockExams.map((exam) => <article key={exam.id}><div className="mock-exam-number"><Trophy size={15} /></div><div><strong>{exam.title}</strong><p>{exam.description}</p><span>{exam.questionIds.length} سؤال مرتبط</span></div></article>)}</div></section>
  </div>;
}

function Sources() {
  const [statusFilter, setStatusFilter] = useState<"all" | "current" | "historical" | "future" | "restricted">("all");
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredSources = useMemo(() => sourceRegistry.filter((source) => {
    const statusMatch = statusFilter === "all" || (statusFilter === "current" && source.status === "official_current") || (statusFilter === "historical" && source.status === "official_historical") || (statusFilter === "future" && source.status === "official_future") || (statusFilter === "restricted" && source.status === "access_restricted");
    const text = [source.title, source.publisher, source.documentType, source.topics.join(" "), source.notes ?? ""].join(" ").toLowerCase();
    return statusMatch && (!normalizedQuery || text.includes(normalizedQuery));
  }), [normalizedQuery, statusFilter]);
  return <div className="page-wrap"><section className="page-heading"><div><div className="eyebrow-line"><Library size={15} /> سجل التحقق المحلي</div><h1>المصادر الرسمية</h1><p>Registry محلي يفصل الحالي والتاريخي والمستقبلي والوصول المقيد.</p></div><div className="source-counter"><ShieldCheck size={18} /><strong>{sourceRegistry.length}</strong><span>سجل مصدر</span></div></section><div className="source-principles"><div><ShieldCheck size={21} /><div><strong>Tier 1 أولًا</strong><p>Taksi Helsinki للسياسات التشغيلية، ثم Kela وTraficom.</p></div></div><div><FileText size={21} /><div><strong>التاريخ والصفحة</strong><p>كل Evidence يذكر الإصدار أو الصفحة عند توفرها.</p></div></div><div><LockKeyhole size={21} /><div><strong>لا نتجاوز الحماية</strong><p>المواد الخاصة تبقى ACCESS_RESTRICTED.</p></div></div></div><div className="source-controls"><div className="search-box"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث عن AD Kuljettaja أو Kela أو Cabman..." /><kbd>⌘ K</kbd></div><div className="source-filter-row">{([["all", "الكل"], ["current", "Current"], ["historical", "Historical"], ["future", "Future"], ["restricted", "وصول مقيد"]] as const).map(([value, label]) => <button key={value} className={statusFilter === value ? "active" : ""} onClick={() => setStatusFilter(value)}>{label}</button>)}</div></div><div className="sources-list">{filteredSources.map((source, index) => <article className="source-card" key={source.id}><div className={`source-number ${["amber", "blue", "teal", "violet", "rose"][index % 5]}`}>{String(index + 1).padStart(2, "0")}</div><div className="source-card-body"><div className="source-title-row"><div><span>{source.publisher}</span><h3>{source.title}</h3></div><SourceStatusBadge status={source.status} /></div><div className="source-card-meta"><SourceBadge>{source.documentType}</SourceBadge><span><Clock3 size={13} /> نُشر/رُفع: {source.publicationDate}</span>{source.pages && <span><FileText size={13} /> {source.pages} صفحة</span>}</div><div className="source-topics">{source.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>{source.notes && <p className="source-note-text">{source.notes}</p>}<div className="source-record-footer"><span>Last verified: {source.lastVerified} · Used in {knowledgeLessons.filter((lesson) => lesson.sourceIds.includes(source.id)).length} lessons</span><a href={source.url} target="_blank" rel="noreferrer">فتح المصدر الأصلي <ArrowLeft size={14} /></a></div></div></article>)}</div><div className="sources-disclaimer"><div className="note-icon"><Info size={18} /></div><p><strong>قاعدة عدم الهلوسة:</strong> ملفات Autocab ومواد Materiaalisalkku وإشعارات السائق لم تكن متاحة للقراءة العامة عند التحقق، لذلك تظهر كـ ACCESS_RESTRICTED. أما Mitax وSemel فتم تسجيلها لكن لم تُستخدم لإثبات أزرار غير مقروءة. راجع <code>docs/OFFICIAL_SOURCES.md</code> و<code>docs/EVIDENCE_MAP.md</code> للتقرير القابل للمراجعة.</p></div></div>;
}

function SourcesLegacy() {
  return <div className="page-wrap"><section className="page-heading"><div><div className="eyebrow-line"><Library size={15} /> سجل التحقق</div><h1>المصادر الرسمية</h1><p>لا تعتمد على معلومة مهمة قبل معرفة الجهة التي نشرتها وتاريخ فحصها.</p></div><div className="source-counter"><ShieldCheck size={18} /><strong>{sources.length}</strong><span>مصادر موثقة</span></div></section><div className="source-principles"><div><ShieldCheck size={21} /><div><strong>ثلاثة أوسمة للمحتوى</strong><p><b className="official-text">رسمي</b> · <b className="explain-text">شرح تعليمي</b> · <b className="practice-text">سؤال تدريبي</b></p></div></div><div><FileText size={21} /><div><strong>تاريخ الوصول واضح</strong><p>المعلومات المتغيرة تحتاج مراجعة دورية.</p></div></div><div><LockKeyhole size={21} /><div><strong>لا محتوى مدفوع</strong><p>لم ندّعِ قراءة منصة أو دليل خاص.</p></div></div></div><div className="sources-list">{sources.map((source, index) => <article className="source-card" key={source.id}><div className={`source-number ${source.accent}`}>{String(index + 1).padStart(2, "0")}</div><div className="source-card-body"><div className="source-title-row"><div><span>{source.publisher}</span><h3>{source.name}</h3></div><ExternalLink size={18} className="source-external" /></div><div className="source-card-meta"><SourceBadge>{source.type}</SourceBadge><span><Clock3 size={13} /> {source.date}</span></div><a href={source.url} target="_blank" rel="noreferrer">فتح المصدر الأصلي <ArrowLeft size={14} /></a></div></article>)}</div><div className="sources-disclaimer"><div className="note-icon"><Info size={18} /></div><p><strong>حدود التحقق:</strong> لم نعثر في المصادر العامة المفحوصة على دليل رسمي منشور يشرح خطوات Autocab الداخلية أو خرائط انتظار المطار والموانئ بالتفصيل. لذلك تظهر هذه الموضوعات كـ «تحتاج مادة رسمية» بدلًا من ملئها بالتخمين.</p></div></div>;
}

function ArrowRightIcon() { return <ArrowLeft size={15} />; }
function ChevronRightIcon() { return <ChevronLeft size={15} />; }

export default App;
