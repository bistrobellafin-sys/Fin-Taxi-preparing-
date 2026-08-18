import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
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
  UserRound,
  X,
  Zap,
} from "lucide-react";

type NavKey = "home" | "path" | "quiz" | "glossary" | "sources";
type Question = {
  category: string;
  finnish: string;
  arabic: string;
  options: string[];
  answer: number;
  explanation: string;
  source: string;
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
    duration: "35 دقيقة",
    lessons: 5,
    progress: 82,
    icon: ShieldCheck,
    color: "amber",
    status: "قريب من الإتقان",
    source: "Taksi Helsinki",
  },
  {
    id: "02",
    eyebrow: "جاهزية الاختبار",
    title: "اللغة والاختبار",
    description: "مصطلحات العمل، أسئلة أصلية للتدريب، والفرق بين اختبار الشركة واختبار Traficom.",
    duration: "50 دقيقة",
    lessons: 7,
    progress: 48,
    icon: Brain,
    color: "blue",
    status: "قيد الدراسة",
    source: "Taksi Helsinki · Traficom",
  },
  {
    id: "03",
    eyebrow: "الخدمة الخاصة",
    title: "Kela والرحلات الخاصة",
    description: "خريطة عملية لما هو منشور عن رحلات Kela، مع فصل قواعد Kela عن قواعد الشركة.",
    duration: "42 دقيقة",
    lessons: 6,
    progress: 16,
    icon: HeartPulseIcon,
    color: "teal",
    status: "لم تبدأ",
    source: "Kela · Taksi Helsinki",
  },
  {
    id: "04",
    eyebrow: "العمل الميداني",
    title: "Helsinki في يوم السائق",
    description: "ملاحظات للمراجعة حول الأماكن والرحلات، مع تنبيه واضح عندما لا توجد قائمة تشغيلية عامة.",
    duration: "28 دقيقة",
    lessons: 4,
    progress: 0,
    icon: Map,
    color: "violet",
    status: "مقفل حتى تكمل الأساسيات",
    source: "مصادر عامة موثقة",
  },
];

const questions: Question[] = [
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
    explanation: "توضح Kela أن الرحلة يجب طلبها من مركز الطلب الإقليمي، ويفضل مسبقًا إن أمكن في اليوم السابق.",
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
];

const glossary = [
  ["Kuljettaja", "السائق", "الشخص الذي يقود السيارة ويخدم العميل."],
  ["Kuljettajankoulutus", "تدريب السائق", "مسار Taksi Helsinki التحضيري للسائق."],
  ["Kuljettajankoe", "اختبار السائق", "اختبار الشركة ضمن التدريب، ويُميّز عن اختبار Traficom."],
  ["Taksinkuljettajan ajolupa", "رخصة قيادة التاكسي", "الرخصة التي تصدرها Traficom للعمل كسائق تاكسي."],
  ["Kyyti", "الرحلة", "رحلة العميل أو طلب التاكسي."],
  ["Tilaus", "طلب / حجز", "طلب رحلة يصل إلى نظام الإرسال."],
  ["Nouto-osoite", "عنوان الاستلام", "المكان الذي يلتقي فيه السائق بالعميل."],
  ["Määränpää", "الوجهة", "المكان المقصود في نهاية الرحلة."],
  ["Taksamittari", "عداد التاكسي", "جهاز حساب أجرة الرحلة؛ التفاصيل التشغيلية الداخلية تحتاج دليلًا عامًا منشورًا."],
  ["Kiinteä hinta", "سعر ثابت", "مصطلح يجب فهمه من تعليمات الشركة الحالية؛ لا نضيف إجراءً غير منشور."],
  ["Erityisryhmät", "المجموعات الخاصة", "عملاء يحتاجون مهارات مساعدة وتجهيزات خاصة."],
  ["Omavastuu", "المبلغ الذي يدفعه العميل", "مصطلح يظهر في سياق تعويضات Kela؛ تحقّق من القاعدة الحالية."],
];

const moduleDetails = {
  "01": [
    ["01", "Suomen kielen tasotesti", "تقييم مستوى اللغة الفنلندية قبل شراء التدريب، مع استثناءات محددة لمن يملك شهادة دراسية باللغة الفنلندية."],
    ["02", "Ajotavan arviointi", "تقييم أسلوب القيادة مع CAP: التحكم والوقوف، مواقف المرور، القيادة الآمنة، تقدير أبعاد السيارة، وقواعد المرور."],
    ["03", "Verkkokoulutus ja koe", "التدريب الإلكتروني والاختبار باللغة الفنلندية، ويشمل الخدمة، الأجهزة والعدادات، المعرفة المحلية، وحزمة معلومات السائق."],
    ["04", "Koulutusajo", "تدريب قيادة إلزامي بعد اجتياز اختبار الشركة، يستغرق نحو 8 ساعات ويتضمن تدريبًا عمليًا على الأجهزة وأهم الأماكن."],
    ["05", "Käytännön oppimisjakso", "فترة تعلم عملي تقارب 50 وردية تحت إشراف صاحب العمل، كما تذكر الصفحة الرسمية."],
  ],
  "02": [
    ["01", "اختبار الشركة أم Traficom؟", "هذا المسار يشرح الفارق: اختبار Taksi Helsinki جزء من تدريب الشركة، أما اختبار Traficom فهو شرط رخصة قيادة التاكسي الحكومية."],
    ["02", "لغة العمل", "تنص Taksi Helsinki على أن التدريب والاختبار الخاصين بها يُنفذان باللغة الفنلندية."],
    ["03", "50 سؤالًا / 45 دقيقة", "معلومة رسمية تخص اختبار Traficom: 50 سؤال اختيار من متعدد، بحد أقصى 45 دقيقة، وإجابة واحدة صحيحة تمامًا لكل سؤال."],
    ["04", "ممنوعات الاختبار", "تمنع Traficom الهواتف وسماعات الرأس وأجهزة الاتصال أو التسجيل والمواد التي تساعد على الغش داخل منطقة الاختبار."],
  ],
  "03": [
    ["01", "مركز الطلب الإقليمي", "رحلة Kela تُطلب من مركز إقليمي. في Uusimaa يظهر رقم Taksi Helsinki الرسمي: 0800 414 600، مع رقم سويدي منفصل."],
    ["02", "الطلب المسبق", "توصي Kela بالطلب مسبقًا، وإن أمكن في موعد لا يتجاوز اليوم السابق للرحلة."],
    ["03", "تدريب السائق", "تذكر Taksi Helsinki أن سائقي رحلات Kela أكملوا تدريب المجموعات الخاصة وتدريب Taksi Helsinki الخاص بـ Kela."],
    ["04", "حدود المعرفة العامة", "تفاصيل نظام السائق الداخلية أو أزرار Autocab لا تُعرض هنا كحقائق ما لم نجد لها دليلًا رسميًا عامًا قابلًا للتحقق."],
  ],
  "04": [
    ["01", "المعرفة المحلية", "تدرج Taksi Helsinki معرفة pääkaupunkiseutu ضمن التدريب الإلكتروني، كما يذكر التدريب العملي التعرف على الأماكن المهمة."],
    ["02", "المطار والموانئ", "هذه المنصة لا تخترع مناطق انتظار أو مسارات تشغيلية؛ راجع تعليمات الشركة الحالية أو التدريب المدفوع عند توفرها."],
    ["03", "المعلومة المؤكدة", "الخدمة الرسمية تقول إن الشركة تعمل في منطقة العاصمة ومناطق أخرى، لكن تفاصيل التوزيع التشغيلية ليست قائمة عامة كاملة في المصادر المفتوحة التي فُحصت."],
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
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [glossarySearch, setGlossarySearch] = useState("");

  const currentQuestion = questions[quizIndex];
  const quizScore = Object.entries(answers).filter(([index, answer]) => questions[Number(index)].answer === answer).length;
  const filteredGlossary = useMemo(
    () => glossary.filter(([term, meaning]) => `${term} ${meaning}`.toLowerCase().includes(glossarySearch.toLowerCase())),
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
    }
  }

  const navItems: Array<{ key: NavKey; label: string; icon: typeof LayoutDashboard }> = [
    { key: "home", label: "نظرة عامة", icon: LayoutDashboard },
    { key: "path", label: "مسار التدريب", icon: BookOpenCheck },
    { key: "quiz", label: "بنك الأسئلة", icon: CircleHelp },
    { key: "glossary", label: "قاموس السائق", icon: Languages },
    { key: "sources", label: "المصادر الرسمية", icon: Library },
  ];

  return (
    <div className={`app-shell ${darkMode ? "dark-app" : ""}`} dir="rtl">
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="sidebar-top">
          <div className="brand"><BrandMark /><div><strong>Taksi Pro</strong><span>سجلّ السائق الذكي</span></div></div>
          <button className="icon-button mobile-close" onClick={() => setMobileMenu(false)} aria-label="إغلاق القائمة"><X size={19} /></button>
        </div>
        <div className="profile-card">
          <div className="avatar">م</div>
          <div className="profile-copy"><strong>مرحبًا، محمد</strong><span>رحلة السائق · 2026</span></div>
          <MoreHorizontal size={18} className="muted-icon" />
        </div>
        <nav className="main-nav">
          <p className="nav-label">مساحة الدراسة</p>
          {navItems.map(({ key, label, icon: Icon }) => <button key={key} className={`nav-item ${activeNav === key ? "active" : ""}`} onClick={() => navigate(key)}><Icon size={18} /><span>{label}</span>{key === "quiz" && <em>5</em>}</button>)}
        </nav>
        <div className="sidebar-spacer" />
        <div className="help-card"><div className="help-icon"><Headphones size={18} /></div><strong>تحتاج مساعدة؟</strong><span>راجع المصدر قبل أن تعتمد المعلومة.</span><button onClick={() => navigate("sources")}>فتح مركز المراجع <ArrowLeft size={14} /></button></div>
        <div className="sidebar-footer"><span className="status-dot" /> المحتوى متاح للعمل دون اتصال <button className="mini-icon" onClick={() => setDarkMode((value) => !value)}>{darkMode ? <Sun size={15} /> : <Moon size={15} />}</button></div>
      </aside>
      {mobileMenu && <button className="mobile-overlay" onClick={() => setMobileMenu(false)} aria-label="إغلاق القائمة" />}

      <main className="main-content">
        <header className="topbar"><button className="icon-button menu-toggle" onClick={() => setMobileMenu(true)}><Menu size={20} /></button><div className="breadcrumbs"><span>مساحة الدراسة</span><ChevronLeft size={14} /><strong>{navItems.find((item) => item.key === activeNav)?.label}</strong></div><div className="topbar-actions"><div className="sync-status"><span className="status-dot" /> آخر حفظ منذ 3 دقائق</div><button className="icon-button"><Search size={18} /></button><button className="notification"><span>2</span><CircleHelp size={18} /></button><div className="top-avatar">م</div></div></header>

        {activeNav === "home" && <Dashboard onStartQuiz={startQuiz} onNavigate={navigate} onOpenModule={(id) => { setSelectedModule(id); setActiveNav("path"); }} />}
        {activeNav === "path" && <TrainingPath selectedModule={selectedModule} onSelectModule={setSelectedModule} onStartQuiz={startQuiz} />}
        {activeNav === "quiz" && <QuizView started={quizStarted} startQuiz={startQuiz} currentQuestion={currentQuestion} quizIndex={quizIndex} selectedAnswer={selectedAnswer} answers={answers} quizScore={quizScore} onAnswer={answerQuestion} onNext={nextQuestion} onBack={() => { setQuizStarted(false); setActiveNav("home"); }} />}
        {activeNav === "glossary" && <Glossary search={glossarySearch} onSearch={setGlossarySearch} terms={filteredGlossary} />}
        {activeNav === "sources" && <Sources />}
      </main>
    </div>
  );
}

function Dashboard({ onStartQuiz, onNavigate, onOpenModule }: { onStartQuiz: () => void; onNavigate: (key: NavKey) => void; onOpenModule: (id: string) => void }) {
  return <div className="page-wrap">
    <section className="welcome-row"><div><div className="eyebrow-line"><Sparkles size={15} /> الخميس، 18 أغسطس 2026</div><h1>مساء الخير، محمد <span>👋</span></h1><p>خطوة واحدة كل يوم. اجعل معرفتك أهدأ من الطريق.</p></div><button className="primary-button" onClick={onStartQuiz}><Play size={17} fill="currentColor" /> ابدأ جلسة تدريب</button></section>
    <section className="hero-panel"><div className="hero-copy"><div className="hero-kicker"><span className="live-dot" /> خطة Taksi Helsinki · المستوى الأول</div><h2>أنت على الطريق الصحيح<br /><em>واصل التقدم.</em></h2><p>راجعت 12 من أصل 16 درسًا. أكمل أساسيات المسار قبل الانتقال إلى التدريب الميداني.</p><div className="hero-actions"><button className="light-button" onClick={() => onOpenModule("01")}>متابعة الدرس <ArrowLeft size={16} /></button><span className="hero-meta"><Clock3 size={14} /> 18 دقيقة متبقية</span></div></div><div className="hero-orbit"><div className="orbit-ring ring-one" /><div className="orbit-ring ring-two" /><div className="orbit-core"><ShieldCheck size={35} /><span>82%</span></div><div className="orbit-chip chip-one"><Check size={13} /> اللغة</div><div className="orbit-chip chip-two"><Target size={13} /> المسار</div></div></section>
    <div className="section-heading"><div><h2>لوحة التقدم</h2><p>مؤشراتك في هذه الرحلة التعليمية</p></div><button className="text-button" onClick={() => onNavigate("path")}>عرض المسار كاملًا <ArrowLeft size={15} /></button></div>
    <section className="stats-grid"><StatCard icon={BarChart3} label="نسبة الإكمال" value="68%" note="+12% هذا الأسبوع" color="amber" /><StatCard icon={BookOpen} label="دروس مكتملة" value="12" note="من أصل 24 درسًا" color="blue" /><StatCard icon={Trophy} label="أفضل نتيجة" value="86%" note="جلسة 16 أغسطس" color="teal" /><StatCard icon={Zap} label="أيام متتالية" value="4" note="هدفك: 7 أيام" color="violet" /></section>
    <div className="content-grid"><section><div className="section-heading compact"><div><h2>مساراتك الحالية</h2><p>محتوى مختصر مع مرجع لكل محور</p></div><button className="text-button" onClick={() => onNavigate("path")}>كل المسارات <ArrowLeft size={15} /></button></div><div className="module-list">{modules.slice(0, 3).map((module) => <ModuleRow key={module.id} module={module} onClick={() => onOpenModule(module.id)} />)}</div></section><aside className="side-column"><div className="quiz-card"><div className="quiz-card-head"><div className="quiz-card-icon"><Brain size={20} /></div><span>تحدي اليوم</span><MoreHorizontal size={18} /></div><h3>هل أنت جاهز لاختبار قصير؟</h3><p>5 أسئلة أصلية مبنية على مصادر رسمية، بلا أسئلة امتحان مسرّبة.</p><div className="quiz-footer"><span><Clock3 size={14} /> 5 دقائق</span><button onClick={onStartQuiz}>ابدأ <ArrowLeft size={14} /></button></div></div><div className="source-note"><div className="note-icon"><FileCheck2 size={18} /></div><div><strong>قاعدة المنصة</strong><p>نميز دائمًا بين <b>رسمي</b> و<b>شرح تعليمي</b> و<b>سؤال تدريبي</b>.</p></div></div></aside></div>
    <section className="bottom-strip"><div className="strip-icon"><FileText size={20} /></div><div><strong>آخر تحديث للمحتوى</strong><p>18 أغسطس 2026 · تم فحص صفحات Taksi Helsinki وTraficom وKela الرسمية.</p></div><button onClick={() => onNavigate("sources")}>راجع المصادر <ExternalLink size={15} /></button></section>
  </div>;
}

function StatCard({ icon: Icon, label, value, note, color }: { icon: typeof BarChart3; label: string; value: string; note: string; color: string }) {
  return <div className="stat-card"><div className={`stat-icon ${color}`}><Icon size={18} /></div><div><span>{label}</span><strong>{value}</strong><small>{note}</small></div><ArrowUpLeft size={16} className="trend" /></div>;
}

function ModuleRow({ module, onClick }: { module: typeof modules[number]; onClick: () => void }) {
  const Icon = module.icon;
  return <button className="module-row" onClick={onClick}><div className={`module-icon ${module.color}`}><Icon size={21} /></div><div className="module-main"><div className="module-title"><span className="module-number">{module.id}</span><strong>{module.title}</strong><SourceBadge>{module.source}</SourceBadge></div><p>{module.description}</p><div className="module-progress"><div className="progress-track"><span style={{ width: `${module.progress}%` }} /></div><small>{module.progress}%</small><span className="module-meta"><Clock3 size={13} /> {module.duration} <span>·</span> {module.lessons} دروس</span></div></div><ChevronLeft size={18} className="row-chevron" /></button>;
}

function TrainingPath({ selectedModule, onSelectModule, onStartQuiz }: { selectedModule: string; onSelectModule: (id: string) => void; onStartQuiz: () => void }) {
  const detail = moduleDetails[selectedModule as keyof typeof moduleDetails];
  const selected = modules.find((module) => module.id === selectedModule) ?? modules[0];
  const Icon = selected.icon;
  return <div className="page-wrap"><section className="page-heading"><div><div className="eyebrow-line"><BookOpenCheck size={15} /> المنهج الموثق</div><h1>مسار التدريب</h1><p>محتوى عملي، مترجم، ومربوط بالمصدر الأصلي لكل موضوع.</p></div><button className="secondary-button" onClick={onStartQuiz}><Brain size={16} /> اختبر نفسك</button></section><div className="path-layout"><aside className="path-nav"><div className="path-nav-head"><span>المنهج الكامل</span><small>4 وحدات</small></div>{modules.map((module) => { const ModuleIcon = module.icon; return <button key={module.id} onClick={() => onSelectModule(module.id)} className={`path-nav-item ${selectedModule === module.id ? "selected" : ""}`}><div className={`module-icon small ${module.color}`}><ModuleIcon size={16} /></div><div><strong>{module.id} · {module.title}</strong><span>{module.progress === 0 ? "لم تبدأ" : `${module.progress}% مكتمل`}</span></div><ChevronLeft size={15} /></button>; })}<div className="path-total"><div className="circular-progress"><span>68%</span></div><div><strong>التقدم الكلي</strong><span>12 من 24 درسًا</span></div></div></aside><section className="lesson-panel"><div className={`lesson-banner ${selected.color}`}><div className="lesson-banner-copy"><span className="lesson-eyebrow">الوحدة {selected.id} · {selected.eyebrow}</span><h2>{selected.title}</h2><p>{selected.description}</p><SourceBadge>{selected.source}</SourceBadge></div><div className="lesson-visual"><Icon size={42} /><span>{selected.progress}%</span></div></div><div className="lesson-meta-row"><span><Clock3 size={15} /> {selected.duration}</span><span><BookOpen size={15} /> {selected.lessons} دروس</span><span><ShieldCheck size={15} /> مصدر لكل درس</span><button className="outline-button" onClick={onStartQuiz}><Play size={14} /> جلسة مراجعة</button></div><div className="lesson-list">{detail.map(([number, title, description], index) => <div className={`lesson-item ${index < Math.ceil(selected.progress / 25) ? "done" : ""}`} key={number}><div className="lesson-check">{index < Math.ceil(selected.progress / 25) ? <Check size={14} /> : <span>{number}</span>}</div><div className="lesson-item-copy"><div><strong>{title}</strong>{index < Math.ceil(selected.progress / 25) && <span className="completed-label">مكتمل</span>}</div><p>{description}</p></div><button className="lesson-open">{index < Math.ceil(selected.progress / 25) ? "مراجعة" : "فتح"} <ArrowLeft size={14} /></button></div>)}</div><div className="verified-callout"><div><Info size={18} /></div><p><strong>ملاحظة منهجية:</strong> تفاصيل نظام السائق الداخلية، مثل أزرار Autocab أو إجراءات الأعطال، لا تُعرض كحقائق إلا إذا كانت في دليل رسمي عام قابل للتحقق. المحتوى المدفوع غير متاح لنا.</p></div></section></div></div>;
}

function QuizView({ started, startQuiz, currentQuestion, quizIndex, selectedAnswer, answers, quizScore, onAnswer, onNext, onBack }: { started: boolean; startQuiz: () => void; currentQuestion: Question; quizIndex: number; selectedAnswer: number | null; answers: Record<number, number>; quizScore: number; onAnswer: (answer: number) => void; onNext: () => void; onBack: () => void }) {
  if (!started) return <div className="page-wrap"><section className="quiz-intro"><div className="quiz-intro-icon"><Brain size={38} /></div><div className="eyebrow-line">بنك الأسئلة · تدريب أصلي</div><h1>اختبر جاهزيتك بهدوء</h1><p>جلسة قصيرة من 5 أسئلة مبنية على معلومات قابلة للتحقق من Taksi Helsinki وTraficom وKela. هذه الأسئلة تدريبية وليست أسئلة الامتحان الحقيقي.</p><div className="quiz-feature-row"><span><FileCheck2 size={17} /> مصادر مرفقة</span><span><TimerReset size={17} /> 5 دقائق</span><span><Target size={17} /> نتيجة فورية</span></div><button className="primary-button" onClick={startQuiz}><Play size={17} fill="currentColor" /> ابدأ الاختبار القصير</button><button className="back-link" onClick={onBack}><ArrowRightIcon /> العودة إلى لوحة التحكم</button></section></div>;
  const isLast = quizIndex === questions.length - 1;
  const hasAnswer = selectedAnswer !== null;
  return <div className="page-wrap quiz-page"><div className="quiz-topline"><button className="back-link" onClick={onBack}><ChevronRightIcon /> إنهاء الجلسة</button><div className="quiz-progress-copy"><span>سؤال {quizIndex + 1} من {questions.length}</span><div className="quiz-progress-track"><span style={{ width: `${((quizIndex + 1) / questions.length) * 100}%` }} /></div></div><span className="score-pill"><Trophy size={14} /> {quizScore} صحيحة</span></div><div className="quiz-question-card"><div className="question-meta"><span className="category-pill">{currentQuestion.category}</span><SourceBadge>تدريبي</SourceBadge></div><h1 dir="ltr">{currentQuestion.finnish}</h1><p className="arabic-question">{currentQuestion.arabic}</p><div className="options-list">{currentQuestion.options.map((option, index) => { const isChosen = selectedAnswer === index; const isCorrect = hasAnswer && index === currentQuestion.answer; const isWrong = isChosen && index !== currentQuestion.answer; return <button key={option} className={`option ${isChosen ? "chosen" : ""} ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`} onClick={() => !hasAnswer && onAnswer(index)}><span className="option-letter">{String.fromCharCode(65 + index)}</span><span>{option}</span>{isCorrect && <Check size={18} />}{isWrong && <X size={18} />}</button>; })}</div>{hasAnswer && <div className={`answer-feedback ${selectedAnswer === currentQuestion.answer ? "positive" : "negative"}`}><div>{selectedAnswer === currentQuestion.answer ? <Check size={18} /> : <Info size={18} />}</div><p><strong>{selectedAnswer === currentQuestion.answer ? "إجابة صحيحة" : "راجع هذه النقطة"}</strong>{currentQuestion.explanation}<small>المصدر: {currentQuestion.source}</small></p></div>}<div className="question-actions"><span><LockKeyhole size={14} /> لا نحفظ بيانات شخصية</span>{hasAnswer && <button className="primary-button" onClick={onNext}>{isLast ? "إنهاء المراجعة" : "السؤال التالي"} <ArrowLeft size={16} /></button>}</div></div>{isLast && hasAnswer && <div className="quiz-result"><Trophy size={23} /><div><strong>أكملت جلسة المراجعة</strong><span>نتيجتك {quizScore} من {questions.length}. ارجع للمصادر إذا أخطأت في سؤال.</span></div></div>}</div>;
}

function Glossary({ search, onSearch, terms }: { search: string; onSearch: (value: string) => void; terms: string[][] }) {
  return <div className="page-wrap"><section className="page-heading"><div><div className="eyebrow-line"><Languages size={15} /> فنلندي عملي</div><h1>قاموس السائق</h1><p>المصطلح كما ستراه في المادة، ثم معناه بالعربية وشرحه العملي.</p></div><div className="glossary-count">{terms.length} مصطلحًا</div></section><div className="search-box"><Search size={18} /><input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="ابحث بالفنلندية أو العربية..." /><kbd>⌘ K</kbd></div><div className="glossary-grid">{terms.map(([term, meaning, explanation], index) => <article className="glossary-card" key={term}><span className="glossary-index">{String(index + 1).padStart(2, "0")}</span><div className="glossary-term"><strong dir="ltr">{term}</strong><span>{meaning}</span></div><p>{explanation}</p><div className="glossary-footer"><SourceBadge>شرح تعليمي</SourceBadge><button><BookOpen size={14} /> مثال عملي</button></div></article>)}</div></div>;
}

function Sources() {
  return <div className="page-wrap"><section className="page-heading"><div><div className="eyebrow-line"><Library size={15} /> سجل التحقق</div><h1>المصادر الرسمية</h1><p>لا تعتمد على معلومة مهمة قبل معرفة الجهة التي نشرتها وتاريخ فحصها.</p></div><div className="source-counter"><ShieldCheck size={18} /><strong>5</strong><span>مصادر موثقة</span></div></section><div className="source-principles"><div><ShieldCheck size={21} /><div><strong>ثلاثة أوسمة للمحتوى</strong><p><b className="official-text">رسمي</b> · <b className="explain-text">شرح تعليمي</b> · <b className="practice-text">سؤال تدريبي</b></p></div></div><div><FileText size={21} /><div><strong>تاريخ الوصول واضح</strong><p>المعلومات المتغيرة تحتاج مراجعة دورية.</p></div></div><div><LockKeyhole size={21} /><div><strong>لا محتوى مدفوع</strong><p>لم ندّعِ قراءة منصة أو دليل خاص.</p></div></div></div><div className="sources-list">{sources.map((source, index) => <article className="source-card" key={source.id}><div className={`source-number ${source.accent}`}>{String(index + 1).padStart(2, "0")}</div><div className="source-card-body"><div className="source-title-row"><div><span>{source.publisher}</span><h3>{source.name}</h3></div><ExternalLink size={18} className="source-external" /></div><div className="source-card-meta"><SourceBadge>{source.type}</SourceBadge><span><Clock3 size={13} /> {source.date}</span></div><a href={source.url} target="_blank" rel="noreferrer">فتح المصدر الأصلي <ArrowLeft size={14} /></a></div></article>)}</div><div className="sources-disclaimer"><div className="note-icon"><Info size={18} /></div><p><strong>حدود التحقق:</strong> لم نعثر في المصادر العامة المفحوصة على دليل رسمي منشور يشرح خطوات Autocab الداخلية أو خرائط انتظار المطار والموانئ بالتفصيل. لذلك تظهر هذه الموضوعات كـ «تحتاج مادة رسمية» بدلًا من ملئها بالتخمين.</p></div></div>;
}

function ArrowRightIcon() { return <ArrowLeft size={15} />; }
function ChevronRightIcon() { return <ChevronLeft size={15} />; }

export default App;
