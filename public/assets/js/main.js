/**
 * AUDIRA — Main JavaScript
 * Handles navigation, language switching, animations, form validation, and interactions
 */

// ============================================================================
// CONFIGURATION & STATE
// ============================================================================

const CONFIG = {
  languages: {
    en: { dir: 'ltr', label: 'EN', name: 'English' },
    ar: { dir: 'rtl', label: 'AR', name: 'العربية' }
  },
  animationThreshold: 0.12,
  counterDuration: 1200,
  scrollOffset: 80
};

let currentLang = 'en';
let observer = null;
let navObserver = null;

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  en: {
    // Navigation
    'nav-home': 'Home',
    'nav-about': 'About',
    'nav-services': 'Services',
    'nav-solutions': 'Solutions',
    'nav-industries': 'Industries',
    'nav-approach': 'Approach',
    'nav-insights': 'Insights',
    'nav-contact': 'Contact',
    'nav-cta': 'Request Consultation',

    // Hero
    'hero-label': 'Financial Intelligence & Technology Group',
    'hero-title-1': 'We help businesses',
    'hero-title-2': 'think financially,',
    'hero-title-3': 'act intelligently.',
    'hero-desc': 'AUDIRA integrates financial expertise, technology, and data analytics to improve how you manage, understand, automate, and develop your operations.',
    'hero-cta-primary': 'Start a Conversation',
    'hero-cta-secondary': 'Explore Services',
    'hero-indicator-1-label': 'Core Service Areas',
    'hero-indicator-2-label': 'Industries Served',
    'hero-indicator-3-label': 'Engagement Models',
    'hero-indicator-4-label': 'Coverage',
    'hero-scroll': 'Scroll',

    // About
    'about-label': 'About AUDIRA',
    'about-title': 'Financial expertise meets technological intelligence',
    'about-desc': 'AUDIRA operates at the intersection of financial intelligence, technology, and data analytics. We don\'t just provide accounting services or build software—we integrate both to give you a complete picture of your business and the tools to act on it.',
    'about-subtitle': 'How we\'re different',
    'point1-title': 'Integrated by design',
    'point1-desc': 'Financial operations, tax compliance, data analytics, and custom applications—connected, not siloed.',
    'point2-title': 'Intelligence over information',
    'point2-desc': 'We don\'t just produce reports. We build dashboards, alerts, and AI-assisted tools that help you decide.',
    'point3-title': 'Technology that fits',
    'point3-desc': 'Custom applications connected to your actual data—not generic templates forced onto your workflow.',
    'point4-title': 'Capability transfer',
    'point4-desc': 'Training and development programs so your team builds lasting internal capability.',

    // Services
    'services-label': 'Our Services',
    'services-title': 'Six integrated service areas',
    'services-desc': 'Each area stands on its own. Together, they form a complete financial intelligence system for your business.',
    's1-title': 'Financial & Accounting Management',
    's1-desc': 'Organize the finance cycle and monitor accounts, cash flows, and obligations.',
    's1a': 'Books, accounts, customers & suppliers',
    's1b': 'Treasury, banks & payroll',
    's1c': 'Reports, statements, costing & controls',
    's1-link': 'Learn more',
    's2-title': 'Tax Services & Advisory',
    's2-desc': 'Organize tax obligations, returns, and related procedures.',
    's2a': 'Tax returns and VAT',
    's2b': 'Obligations and deadline tracking',
    's2c': 'E-filing and representation*',
    's2-link': 'Learn more',
    's3-title': 'Data Analytics & Business Intelligence',
    's3-desc': 'Turn business data into indicators and reports that support decisions.',
    's3a': 'Revenue, expense & profitability analysis',
    's3b': 'Dashboards and performance indicators',
    's3c': 'Advanced Excel, Power BI, SQL, Python & AI',
    's3-link': 'Learn more',
    's4-title': 'Custom Applications & Intelligent Solutions',
    's4-desc': 'Business applications designed for your company, connected to your data.',
    's4a': 'Revenue, collections & expense monitoring',
    's4b': 'Reports, alerts & live information',
    's4c': 'AI assistant for natural-language queries',
    's4-link': 'Explore solutions',
    's5-title': 'Training & Professional Development',
    's5-desc': 'Structured programs with completion certificates and tailored corporate training.',
    's5a': 'AI in business and finance',
    's5b': 'Excel, Power BI & data analytics',
    's5c': 'Reporting, automation & decision support',
    's5-link': 'View programs',
    's6-title': 'Financial Budgeting & Planning',
    's6-desc': 'Build budgets and connect financial targets with monitoring and analysis.',
    's6a': 'Revenue and expense estimates',
    's6b': 'Operating and financial budgets',
    's6c': 'Actual-versus-budget variance analysis',
    's6-link': 'Learn more',
    'tax-disclaimer': '* Tax representation and e-filing services are subject to local authorization and regulatory requirements in each jurisdiction.',

    // Solutions
    'solutions-label': 'Integrated Technology Solutions',
    'solutions-title': 'Custom applications connected to your business data',
    'solutions-desc': 'We build tools that plug into your financial and operational systems—giving you real-time visibility, automated reporting, and AI-assisted interaction with your data.',
    'demo-title': 'Financial Performance Monitor',
    'demo-revenue-label': 'Revenue (MTD)',
    'demo-revenue-value': 'EGP 2.4M',
    'demo-revenue-change': '+12.3% vs last month',
    'demo-expenses-label': 'Expenses (MTD)',
    'demo-expenses-value': 'EGP 1.6M',
    'demo-expenses-change': '+8.1% vs last month',
    'demo-margin-label': 'Gross Margin',
    'demo-margin-value': '33.3%',
    'demo-margin-change': '+2.1pp',
    'demo-cash-label': 'Cash Position',
    'demo-cash-value': 'EGP 4.2M',
    'demo-cash-change': 'Stable',
    'insight1': 'Revenue growth accelerating in commercial segment',
    'insight2': 'Collections cycle improved by 4 days this quarter',
    'insight3': 'Expense ratio trending up—investigate procurement',
    'demo-caption': 'Illustrative data — not actual client information',
    'capabilities-title': 'What we build',
    'cap1-title': 'Financial Performance Monitoring',
    'cap1-desc': 'Real-time dashboards connecting to your ERP, accounting software, and bank feeds. Revenue, expenses, margins, cash flow—visible at a glance.',
    'cap2-title': 'Smart Reporting & Alerts',
    'cap2-desc': 'Automated reports delivered on schedule. Threshold-based alerts for cash position, overdue receivables, budget variances, and tax deadlines.',
    'cap3-title': 'AI-Powered Data Assistant',
    'cap3-desc': 'Ask questions in natural language: "Show me Q3 margin by product line" or "Which customers are over 60 days overdue?" Get answers, not raw data.',
    'cap4-title': 'Business Process Automation',
    'cap4-desc': 'Automate repetitive workflows: invoice processing, bank reconciliation, expense categorization, compliance checks, and approval routing.',
    'cap5-title': 'Intelligent Notifications',
    'cap5-desc': 'Context-aware alerts via email, WhatsApp, or in-app. Escalation rules, acknowledgment tracking, and audit trails built in.',

    // Industries
    'industries-label': 'Industries',
    'industries-title': 'Experience across diverse business sectors',
    'industries-desc': 'Solutions adaptable to the nature, scale, and regulatory context of each business.',
    'ind1-title': 'Trade & Distribution',
    'ind1-desc': 'Inventory turnover, supplier payments, multi-location P&L',
    'ind2-title': 'Industry & Manufacturing',
    'ind2-desc': 'Cost accounting, BOM analysis, production efficiency',
    'ind3-title': 'Contracting & Construction',
    'ind3-desc': 'Project costing, retention tracking, progress billing',
    'ind4-title': 'Real Estate & Investment',
    'ind4-desc': 'Portfolio tracking, lease management, yield analysis',
    'ind5-title': 'Services & Professional Firms',
    'ind5-desc': 'Time tracking, project profitability, retainer management',
    'ind6-title': 'Restaurants & Hospitality',
    'ind6-desc': 'Daily sales, COGS, labor cost, table turnover',
    'ind7-title': 'Car Rental',
    'ind7-desc': 'Fleet utilization, maintenance tracking, per-unit economics',
    'ind8-title': 'Startups & SMEs',
    'ind8-desc': 'Financial foundations, investor reporting, scalable systems',

    // Approach
    'approach-label': 'Our Approach',
    'approach-title': 'How we work with clients',
    'approach-desc': 'A structured process that moves from understanding to lasting capability.',
    'step1-title': 'Understand the Business',
    'step1-desc': 'We start by learning your operations, financial structure, current systems, and strategic objectives. No assumptions—just careful diagnosis.',
    'step2-title': 'Diagnose Financial & Operational Needs',
    'step2-desc': 'We map your finance cycle, identify gaps in reporting, compliance risks, automation opportunities, and data quality issues.',
    'step3-title': 'Design an Appropriate Solution',
    'step3-desc': 'We propose a tailored combination of services, technology, and training—prioritized by impact, feasibility, and your internal capacity.',
    'step4-title': 'Implement & Integrate',
    'step4-desc': 'We build, configure, and connect—working alongside your team. Phased delivery with clear milestones and knowledge transfer at each stage.',
    'step5-title': 'Monitor & Continuously Improve',
    'step5-desc': 'We stay engaged. Ongoing monitoring, quarterly reviews, capability building, and iterative enhancements as your business evolves.',

    // Insights
    'insights-label': 'Training & Knowledge',
    'insights-title': 'Capability transfer, not just delivery',
    'insights-desc': 'We run structured programs so your team builds lasting internal expertise. Public workshops and tailored corporate training available.',
    'ins1-badge': 'Workshop',
    'ins1-title': 'AI in Business & Finance',
    'ins1-desc': 'Practical applications of AI for financial analysis, forecasting, document processing, and decision support. Hands-on with real tools.',
    'ins1a': 'LLMs for financial research & reporting',
    'ins1b': 'Automated data extraction & categorization',
    'ins1c': 'Building custom AI assistants',
    'ins1-link': 'Enquire',
    'ins2-badge': 'Workshop',
    'ins2-title': 'Data Analytics with Excel, Power BI & SQL',
    'ins2-desc': 'From raw data to executive dashboards. Modeling, visualization, DAX, Power Query, and SQL for finance professionals.',
    'ins2a': 'Financial modeling best practices',
    'ins2b': 'Interactive dashboards in Power BI',
    'ins2c': 'SQL for finance teams',
    'ins2-link': 'Enquire',
    'ins3-badge': 'Program',
    'ins3-title': 'Automation & Reporting',
    'ins3-desc': 'End-to-end automation of financial workflows. Python for finance, low-code platforms, and scheduling/reporting pipelines.',
    'ins3a': 'Python for financial automation',
    'ins3b': 'Low-code workflow automation',
    'ins3c': 'Automated reporting pipelines',
    'ins3-link': 'Enquire',
    'ins4-badge': 'Corporate',
    'ins4-title': 'Tailored Corporate Training',
    'ins4-desc': 'Custom programs designed around your systems, data, and team skill gaps. Delivered on-site or remotely.',
    'ins4a': 'Needs assessment & curriculum design',
    'ins4b': 'Hands-on with your actual data',
    'ins4c': 'Completion certificates & follow-up',
    'ins4-link': 'Discuss needs',
    'insights-cta-text': 'Looking for a specific topic or format? We design custom learning experiences for teams of any size.',
    'insights-cta-btn': 'Request Custom Training',
    'insights-cta-text': 'Looking for a specific topic or format? We design custom learning experiences for teams of any size.',
    'insights-cta-btn': 'Request Custom Training',

    // Engagement Models
    'engagement-label': 'Engagement Models',
    'engagement-title': 'Flexible ways to work together',
    'engagement-desc': 'We select the model that fits your needs, scope, and budget.',
    'model1-title': 'Monthly Retainer',
    'model1-desc': 'Ongoing services and follow-up',
    'm1a': 'Dedicated resource allocation',
    'm1b': 'Priority response times',
    'm1c': 'Continuous monitoring & improvement',
    'm1d': 'Quarterly strategic reviews',
    'm1e': 'Predictable monthly investment',
    'model1-best-label': 'Best for:',
    'model1-best': 'Businesses needing ongoing financial operations, reporting, and advisory support',
    'model1-link': 'Discuss retainer',
    'model2-title': 'Defined Project',
    'model2-desc': 'Agreed scope and deliverables',
    'm2a': 'Fixed scope, timeline & price',
    'm2b': 'Clear milestones & acceptance criteria',
    'm2c': 'Project manager assigned',
    'm2d': 'Knowledge transfer included',
    'm2e': 'Post-launch support period',
    'model2-best-label': 'Best for:',
    'model2-best': 'Specific initiatives: system implementation, dashboard build, process redesign, audit preparation',
    'model2-link': 'Scope a project',
    'model3-title': 'Annual Partnership',
    'model3-desc': 'Long-term collaboration',
    'm3a': 'Strategic advisory included',
    'm3b': 'Technology roadmap planning',
    'm3c': 'Team training & capability building',
    'm3d': 'Preferred pricing & priority access',
    'm3e': 'Executive-level relationship',
    'model3-best-label': 'Best for:',
    'model3-best': 'Growing companies wanting a long-term financial intelligence partner',
    'model3-link': 'Explore partnership',
    'model4-title': 'On-Demand Services',
    'model4-desc': 'Services when needed',
    'm4a': 'No retainer commitment',
    'm4b': 'Time-based or fixed-fee per task',
    'm4c': 'Access to full service catalog',
    'm4d': 'Flexible scheduling',
    'm4e': 'Ideal for sporadic needs',
    'model4-best-label': 'Best for:',
    'model4-best': 'Ad-hoc advisory, interim support, second opinions, peak-period capacity',
    'model4-link': 'Request service',

    // Contact
    'contact-label': 'Start a Conversation',
    'contact-title': 'Let\'s discuss your business needs',
    'contact-desc': 'Tell us about your business and the challenge you want to solve, and we\'ll help identify a suitable next step.',
    'contact-info-title': 'Get in touch',
    'contact-phone-label': 'Phone / WhatsApp',
    'contact-phone': '+20 XXX XXXXXXX',
    'contact-email-label': 'Email',
    'contact-email': 'info@audira.com',
    'contact-location-label': 'Service Coverage',
    'contact-location': 'Egypt and GCC countries',
    'label-name': 'Name',
    'label-company': 'Company / Business',
    'label-email': 'Email or Phone',
    'label-service': 'Service of Interest',
    'label-message': 'How can we help?',
    'opt0': 'Choose a service',
    'opt1': 'Financial & Accounting Management',
    'opt2': 'Tax Services & Advisory',
    'opt3': 'Data Analytics & Business Intelligence',
    'opt4': 'Custom Applications & Intelligent Solutions',
    'opt5': 'Training & Professional Development',
    'opt6': 'Financial Budgeting & Planning',
    'opt7': 'Other / Not sure',
    'btn-submit': 'Submit Request',
    'btn-loading': 'Sending...',
    'form-hint': 'Preview form: information will not be sent until connected to a CRM or email service.',
    'required': '*',

    // Footer
    'footer-tagline': 'Financial Intelligence & Technology Group',
    'footer-positioning': 'Integrated financial expertise, technology, and data analytics for businesses in Egypt and GCC.',
    'footer-nav-services': 'Services',
    'ft-s1': 'Financial & Accounting Management',
    'ft-s2': 'Tax Services & Advisory',
    'ft-s3': 'Data Analytics & Business Intelligence',
    'ft-s4': 'Custom Applications & Intelligent Solutions',
    'ft-s5': 'Training & Professional Development',
    'ft-s6': 'Financial Budgeting & Planning',
    'footer-nav-company': 'Company',
    'ft-about': 'About AUDIRA',
    'ft-approach': 'Our Approach',
    'ft-industries': 'Industries',
    'ft-engagement': 'Engagement Models',
    'ft-insights': 'Training & Knowledge',
    'ft-contact': 'Contact',
    'footer-nav-contact': 'Contact',
    'footer-email': 'info@audira.com',
    'footer-phone': '+20 XXX XXXXXXX',
    'footer-coverage': 'Egypt & GCC Countries',
    'footer-copyright': '© 2025 AUDIRA. All rights reserved.',
    'legal-privacy': 'Privacy Policy',
    'legal-terms': 'Terms of Service',

    // Form validation messages
    'error-required': 'This field is required',
    'error-email': 'Please enter a valid email or phone number',
    'error-name': 'Please enter your name (at least 2 characters)',
    'error-company': 'Please enter your company name',
    'error-message': 'Please describe how we can help (at least 20 characters)',
    'form-success': 'Thank you for your request. We\'ll be in touch within 24 hours.',
    'form-error': 'Something went wrong. Please try again or contact us directly.'
  },

  ar: {
    // Navigation
    'nav-home': 'الرئيسية',
    'nav-about': 'من نحن',
    'nav-services': 'خدماتنا',
    'nav-solutions': 'حلولنا',
    'nav-industries': 'القطاعات',
    'nav-approach': 'منهجيتنا',
    'nav-insights': 'التدريب والمعرفة',
    'nav-contact': 'تواصل معنا',
    'nav-cta': 'طلب استشارة',

    // Hero - Bilingual brand expression preserved
    'hero-label': 'Financial Intelligence & Technology Group',
    'hero-title-1': 'نساعد الشركات على',
    'hero-title-2': 'التفكير مالياً،',
    'hero-title-3': 'والتصرف بذكاء.',
    'hero-desc': 'تدمج AUDIRA الخبرة المالية والتكنولوجيا وتحليلات البيانات لتحسين طريقة إدارتك وفهمك وأتمتة وتطوير عملياتك.',
    'hero-cta-primary': 'ابدأ محادثة',
    'hero-cta-secondary': 'استكشف الخدمات',
    'hero-indicator-1-label': 'مجالات الخدمة الأساسية',
    'hero-indicator-2-label': 'القطاعات المخدومة',
    'hero-indicator-3-label': 'نماذج التعامل',
    'hero-indicator-4-label': 'مصر ودول الخليج',
    'hero-scroll': 'تصفح',

    // About
    'about-label': 'عن AUDIRA',
    'about-title': 'الخبرة المالية تلتقي بالذكاء التكنولوجي',
    'about-desc': 'تعمل AUDIRA عند تقاطع الذكاء المالي والتكنولوجيا وتحليلات البيانات. نحن لا نقدم خدمات محاسبية أو نبني برمجيات فحسب—نحن ندمج كلاهما لنمنحك صورة كاملة عن عملك والأدوات للتصرف بناءً عليها.',
    'about-subtitle': 'كيف نحن مختلفون',
    'point1-title': 'متكاملة بالتصميم',
    'point1-desc': 'العمليات المالية، الامتثال الضريبي، تحليلات البيانات، والتطبيقات المخصصة—مترابطة، وليس في صوامع منفصلة.',
    'point2-title': 'الذكاء لا مجرد المعلومات',
    'point2-desc': 'نحن لا ننتج تقارير فحسب. نبني لوحات تنبيه، وتنبيهات، وأدوات بمساعدة الذكاء الاصطناعي تساعدك على اتخاذ القرار.',
    'point3-title': 'تكنولوجيا تناسبك',
    'point3-desc': 'تطبيقات مخصصة متصلة ببياناتك الفعلية—ليست قوالب عامة تُفرض على سير عملك.',
    'point4-title': 'نقل القدرات',
    'point4-desc': 'برامج تدريب وتطوير حتى يبني فريقك قدرات داخلية دائمة.',

    // Services - Bilingual terminology preserved
    'services-label': 'خدماتنا',
    'services-title': 'ستة مجالات خدمة متكاملة',
    'services-desc': 'كل مجال يقف بمفرده. معاً، يشكلون نظام ذكاء مالي كامل لعملك.',
    's1-title': 'Financial & Accounting Management',
    's1-desc': 'تنظيم الدورة المالية ومراقبة الحسابات والتدفقات النقدية والالتزامات.',
    's1a': 'الدفاتر، الحسابات، العملاء والموردين',
    's1b': 'الخزينة، البنوك وكشوف المرتبات',
    's1c': 'التقارير، القوائم، التكاليف والرقابة',
    's1-link': 'اعرف المزيد',
    's2-title': 'Tax Services & Advisory',
    's2-desc': 'تنظيم الالتزامات الضريبية والإقرارات والإجراءات ذات الصلة.',
    's2a': 'الإقرارات الضريبية وضريبة القيمة المضافة (VAT)',
    's2b': 'الالتزامات وتتبع المواعيد النهائية',
    's2c': 'التقديم الإلكتروني والتمثيل*',
    's2-link': 'اعرف المزيد',
    's3-title': 'Data Analytics & Business Intelligence',
    's3-desc': 'تحويل بيانات العمل إلى مؤشرات وتقارير تدعم القرارات.',
    's3a': 'تحليل الإيرادات والمصروفات والربحية',
    's3b': 'لوحات المعلومات (Dashboards) ومؤشرات الأداء (KPIs)',
    's3c': 'Advanced Excel، Power BI، SQL، Python، AI',
    's3-link': 'اعرف المزيد',
    's4-title': 'Custom Applications & Intelligent Solutions',
    's4-desc': 'تطبيقات أعمال مصممة لشركتك، متصلة ببياناتك.',
    's4a': 'مراقبة الإيرادات، التحصيلات والمصروفات',
    's4b': 'التقارير، التنبيهات والمعلومات المباشرة',
    's4c': 'AI Assistant للاستعلامات باللغة الطبيعية',
    's4-link': 'استكشف الحلول',
    's5-title': 'Training & Professional Development',
    's5-desc': 'برامج منظمة مع شهادات إتمام وتدريب مؤسسي مخصص.',
    's5a': 'AI في الأعمال والمالية',
    's5b': 'Excel، Power BI، Data Analytics',
    's5c': 'التقارير، الأتمتة، دعم القرار',
    's5-link': 'عرض البرامج',
    's6-title': 'Financial Budgeting & Planning',
    's6-desc': 'بناء الموازنات وربط الأهداف المالية بالمراقبة والتحليل.',
    's6a': 'تقديرات الإيرادات والمصروفات',
    's6b': 'الموازنات التشغيلية والمالية',
    's6c': 'تحليل الانحرافات (Actual vs Budget)',
    's6-link': 'اعرف المزيد',
    'tax-disclaimer': '* خدمات التمثيل الضريبي والتقديم الإلكتروني تخضع للتفويض والمتطلبات التنظيمية المحلية في كل ولاية قضائية.',

    // Solutions
    'solutions-label': 'الحلول التكنولوجية المتكاملة',
    'solutions-title': 'تطبيقات مخصصة متصلة ببيانات عملك',
    'solutions-desc': 'نبني أدوات تتصل بأنظمتك المالية والتشغيلية—مانحةً لك رؤية فورية، تقارير آلية، وتفاعل مدعوم بالذكاء الاصطناعي مع بياناتك.',
    'demo-title': 'مراقب الأداء المالي',
    'demo-revenue-label': 'الإيرادات (شهري)',
    'demo-revenue-value': '٢.٤ مليون ج.م',
    'demo-revenue-change': '+١٢.٣٪ مقارنة بالشهر الماضي',
    'demo-expenses-label': 'المصروفات (شهري)',
    'demo-expenses-value': '١.٦ مليون ج.م',
    'demo-expenses-change': '+٨.١٪ مقارنة بالشهر الماضي',
    'demo-margin-label': 'هامش الربح الإجمالي',
    'demo-margin-value': '٣٣.٣٪',
    'demo-margin-change': '+٢.١ نقطة مئوية',
    'demo-cash-label': 'المركز النقدي',
    'demo-cash-value': '٤.٢ مليون ج.م',
    'demo-cash-change': 'مستقر',
    'insight1': 'نمو الإيرادات يتسارع في قطاع التجارة',
    'insight2': 'دورة التحصيل تحسنت بـ ٤ أيام هذا الربع',
    'insight3': 'نسبة المصروفات في اتجاه تصاعدي—تحقيق في المشتريات',
    'demo-caption': 'بيانات توضيحية — ليست معلومات عميل فعلية',
    'capabilities-title': 'ماذا نبني',
    'cap1-title': 'مراقبة الأداء المالي',
    'cap1-desc': 'لوحات معلومات فورية متصلة بـ ERP، برامج المحاسبة، والتغذيات المصرفية. الإيرادات، المصروفات، الهوامش، التدفق النقدي—مرئية بنظرة واحدة.',
    'cap2-title': 'التقارير الذكية والتنبيهات',
    'cap2-desc': 'تقارير آلية تسلم وفق جدول. تنبيهات قائمة على العتبات للمركز النقدي، الذمم المدينة المتأخرة، انحرافات الموازنة، والمواعيد الضريبية.',
    'cap3-title': 'AI-Powered Data Assistant',
    'cap3-desc': 'اسأل بلغة طبيعية: "أظهر لي هامش الربع الثالث حسب خط الإنتاج" أو "ما العملاء المتأخرون أكثر من ٦٠ يوماً؟" احصل على إجابات، لا بيانات خام.',
    'cap4-title': 'Business Process Automation',
    'cap4-desc': 'أتمتة سير العمل المتكرر: معالجة الفواتير، تسوية البنك، تصنيف المصروفات، فحوصات الامتثال، وتوجيه الموافقات.',
    'cap5-title': 'Intelligent Notifications',
    'cap5-desc': 'تنبيهات واعية بالسياق عبر الإيميل، واتساب، أو داخل التطبيق. قواعد تصعيد، تتبع إقرار، ومسارات تدقيق مدمجة.',

    // Industries
    'industries-label': 'القطاعات',
    'industries-title': 'خبرة عبر قطاعات أعمال متنوعة',
    'industries-desc': 'حلول قابلة للتكيف مع طبيعة وحجم والسياق التنظيمي لكل عمل.',
    'ind1-title': 'Trade & Distribution',
    'ind1-desc': 'دوران المخزون، مدفوعات الموردين، قوائم ربح وخسارة متعددة المواقع',
    'ind2-title': 'Industry & Manufacturing',
    'ind2-desc': 'محاسبة التكاليف، تحليل قائمة المواد (BOM)، كفاءة الإنتاج',
    'ind3-title': 'Contracting & Construction',
    'ind3-desc': 'تكلفة المشاريع، تتبع الاستبقاء، الفوترة حسب التقدم',
    'ind4-title': 'Real Estate & Investment',
    'ind4-desc': 'تتبع المحفظة، إدارة الإيجارات، تحليل العائد',
    'ind5-title': 'Services & Professional Firms',
    'ind5-desc': 'تتبع الوقت، ربحية المشاريع، إدارة العقود المستمرة (Retainers)',
    'ind6-title': 'Restaurants & Hospitality',
    'ind6-desc': 'المبيعات اليومية، تكلفة البضاعة (COGS)، تكلفة العمالة، دوران الطاولات',
    'ind7-title': 'Car Rental',
    'ind7-desc': 'استخدام الأسطول، تتبع الصيانة، اقتصاديات الوحدة',
    'ind8-title': 'Startups & SMEs',
    'ind8-desc': 'أسس مالية، تقارير المستثمرين، أنظمة قابلة للتوسع',

    // Approach
    'approach-label': 'منهجيتنا',
    'approach-title': 'كيف نعمل مع العملاء',
    'approach-desc': 'عملية منظمة تنتقل من الفهم إلى القدرات الدائمة.',
    'step1-title': 'فهم العمل',
    'step1-desc': 'نبدأ بتعلم عملياتك، هيكل المالي، الأنظمة الحالية، والأهداف الاستراتيجية. لا افتراضات—فقط تشخيص دقيق.',
    'step2-title': 'تشخيص الاحتياجات المالية والتشغيلية',
    'step2-desc': 'نرسم دورتك المالية، ونحدد فجوات التقارير، مخاطر الامتثال، فرص الأتمتة، وقضايا جودة البيانات.',
    'step3-title': 'تصميم حل مناسب',
    'step3-desc': 'نقدم مزيجاً مخصصاً من الخدمات، التكنولوجيا، والتدريب—محدد الأولويات حسب الأثر، الجدوى، وقدرتك الداخلية.',
    'step4-title': 'التنفيذ والتكامل',
    'step4-desc': 'نبني، نهيئ، ونتصل—بالعمل جنباً إلى جنب مع فريقك. تسليم مرحلي مع مراحل واضحة ونقل معرفة في كل مرحلة.',
    'step5-title': 'المراقبة والتحسين المستمر',
    'step5-desc': 'نبقى مشاركين. مراقبة مستمرة، مراجعات ربع سنوية، بناء قدرات، وتحسينات تكرارية مع تطور عملك.',

    // Insights - Bilingual terminology preserved
    'insights-label': 'Training & Knowledge',
    'insights-title': 'نقل القدرات، ليس مجرد التسليم',
    'insights-desc': 'ننظم برامج حتى يبني فريقك خبرة داخلية دائمة. ورش عامة وتدريب مؤسسي مخصص متاح.',
    'ins1-badge': 'Workshop',
    'ins1-title': 'AI in Business & Finance',
    'ins1-desc': 'تطبيقات عملية للذكاء الاصطناعي للتحليل المالي، التنبؤ، معالجة المستندات، ودعم القرار. عملي مع أدوات حقيقية.',
    'ins1a': 'LLMs للأبحاث والتقارير المالية',
    'ins1b': 'استخراج وتصنيف البيانات الآلي',
    'ins1c': 'بناء AI Assistants مخصصين',
    'ins1-link': 'استفسر',
    'ins2-badge': 'Workshop',
    'ins2-title': 'Data Analytics with Excel, Power BI & SQL',
    'ins2-desc': 'من البيانات الخام إلى لوحات تنفيذية. النمذجة، التصور، DAX، Power Query، و SQL للمحترفين الماليين.',
    'ins2a': 'أفضل ممارسات النمذجة المالية',
    'ins2b': 'لوحات معلومات تفاعلية في Power BI',
    'ins2c': 'SQL للفرق المالية',
    'ins2-link': 'استفسر',
    'ins3-badge': 'Program',
    'ins3-title': 'Automation & Reporting',
    'ins3-desc': 'أتمتة شاملة لسير العمل المالي. Python للمالية، منصات منخفضة الكود، وخطوط أنابيب التقارير والجدولة.',
    'ins3a': 'Python لأتمتة المالية',
    'ins3b': 'أتمتة سير العمل منخفض الكود (Low-code)',
    'ins3c': 'خطوط أنابيب التقارير الآلية',
    'ins3-link': 'استفسر',
    'ins4-badge': 'Corporate',
    'ins4-title': 'Tailored Corporate Training',
    'ins4-desc': 'برامج مخصصة مصممة حول أنظمتك، بياناتك، وفجوات مهارات فريقك. تسليم في الموقع أو عن بعد.',
    'ins4a': 'تقييم الاحتياجات وتصميم المنهج',
    'ins4b': 'عملي مع بياناتك الفعلية',
    'ins4c': 'شهادات إتمام ومتابعة',
    'ins4-link': 'ناقش الاحتياجات',
    'insights-cta-text': 'تبحث عن موضوع أو تنسيق محدد؟ نصمم تجارب تعلم مخصصة لفرق بأي حجم.',
    'insights-cta-btn': 'طلب تدريب مخصص',

    // Engagement Models - Bilingual terminology preserved
    'engagement-label': 'Engagement Models',
    'engagement-title': 'طرق مرنة للعمل معاً',
    'engagement-desc': 'نختار النموذج الذي يناسب احتياجاتك، نطاقك، وميزانيتك.',
    'model1-title': 'Monthly Retainer',
    'model1-desc': 'خدمات ومتابعة مستمرة',
    'm1a': 'تخصيص موارد مخصص',
    'm1b': 'أوقات استجابة أولوية',
    'm1c': 'مراقبة وتحسين مستمر',
    'm1d': 'مراجعات استراتيجية ربع سنوية',
    'm1e': 'استثمار شهري متوقع',
    'model1-best-label': 'الأفضل لـ:',
    'model1-best': 'شركات تحتاج عمليات مالية، تقارير، ودعم استشاري مستمر',
    'model1-link': 'ناقش العقد',
    'model2-title': 'Defined Project',
    'model2-desc': 'نطاق ومخرجات متفق عليها',
    'm2a': 'نطاق، جدول زمني وسعر ثابت',
    'm2b': 'مراحل واضحة ومعايير قبول',
    'm2c': 'مدير مشروع مخصص',
    'm2d': 'نقل معرفة مشمول',
    'm2e': 'فترة دعم ما بعد الإطلاق',
    'model2-best-label': 'الأفضل لـ:',
    'model2-best': 'مبادرات محددة: تنفيذ نظام، بناء لوحة، إعادة تصميم عملية، استعداد للتدقيق',
    'model2-link': 'حدد نطاق مشروع',
    'model3-title': 'Annual Partnership',
    'model3-desc': 'تعاون طويل الأمد',
    'm3a': 'استشارات استراتيجية مشمولة',
    'm3b': 'تخطيط خارطة طريق تكنولوجية',
    'm3c': 'تدريب الفريق وبناء القدرات',
    'm3d': 'تسعير مفضل ووصول أولوية',
    'm3e': 'علاقة على مستوى تنفيذي',
    'model3-best-label': 'الأفضل لـ:',
    'model3-best': 'شركات نامية تريد شريك ذكاء مالي طويل الأمد',
    'model3-link': 'استكشف الشراكة',
    'model4-title': 'On-Demand Services',
    'model4-desc': 'خدمات عند الحاجة',
    'm4a': 'لا التزام بعقد شهري',
    'm4b': 'بناء على الوقت أو رسوم ثابتة لكل مهمة',
    'm4c': 'وصول لكامل كتالوج الخدمات',
    'm4d': 'جدولة مرنة',
    'm4e': 'مثالية للاحتياجات المتقطعة',
    'model4-best-label': 'الأفضل لـ:',
    'model4-best': 'استشارات عرضية، دعم مؤقت، آراء ثانية، سعة فترات الذروة',
    'model4-link': 'اطلب خدمة',

    // Contact
    'contact-label': 'Start a Conversation',
    'contact-title': 'لنتحدث عن احتياجات عملك',
    'contact-desc': 'أخبرنا عن عملك والتحدي الذي تريد حله، وسنساعد في تحديد الخطوة التالية المناسبة.',
    'contact-info-title': 'تواصل معنا',
    'contact-phone-label': 'Phone / WhatsApp',
    'contact-phone': '+٢٠ XXX XXXXXXX',
    'contact-email-label': 'Email',
    'contact-email': 'info@audira.com',
    'contact-location-label': 'Service Coverage',
    'contact-location': 'Egypt & GCC',
    'label-name': 'الاسم',
    'label-company': 'الشركة / العمل',
    'label-email': 'البريد الإلكتروني أو الهاتف',
    'label-service': 'الخدمة ذات الاهتمام',
    'label-message': 'كيف يمكننا المساعدة؟',
    'opt0': 'اختر خدمة',
    'opt1': 'Financial & Accounting Management',
    'opt2': 'Tax Services & Advisory',
    'opt3': 'Data Analytics & Business Intelligence',
    'opt4': 'Custom Applications & Intelligent Solutions',
    'opt5': 'Training & Professional Development',
    'opt6': 'Financial Budgeting & Planning',
    'opt7': 'Other / Not sure',
    'btn-submit': 'إرسال الطلب',
    'btn-loading': 'جاري الإرسال...',
    'form-hint': 'نموذج معاينة: لن تُرسل المعلومات حتى يتم الربط بـ CRM أو خدمة بريد.',
    'required': '*',

    // Footer
    'footer-tagline': 'Financial Intelligence & Technology Group',
    'footer-positioning': 'خبرة مالية متكاملة، تكنولوجيا، وتحليلات بيانات للشركات في مصر ودول الخليج.',
    'footer-nav-services': 'الخدمات',
    'ft-s1': 'الإدارة المالية والمحاسبية',
    'ft-s2': 'الخدمات الضريبية والاستشارات',
    'ft-s3': 'تحليلات البيانات وذكاء الأعمال',
    'ft-s4': 'التطبيقات المخصصة والحلول الذكية',
    'ft-s5': 'التدريب والتطوير المهني',
    'ft-s6': 'الموازنة والتخطيط المالي',
    'footer-nav-company': 'الشركة',
    'ft-about': 'عن AUDIRA',
    'ft-approach': 'منهجيتنا',
    'ft-industries': 'القطاعات',
    'ft-engagement': 'نماذج التعامل',
    'ft-insights': 'التدريب والمعرفة',
    'ft-contact': 'تواصل معنا',
    'footer-nav-contact': 'التواصل',
    'footer-email': 'info@audira.com',
    'footer-phone': '+٢٠ XXX XXXXXXX',
    'footer-coverage': 'مصر ودول الخليج',
    'footer-copyright': '© ٢٠٢٥ AUDIRA. جميع الحقوق محفوظة.',
    'legal-privacy': 'سياسة الخصوصية',
    'legal-terms': 'شروط الخدمة',

    // Form validation messages
    'error-required': 'هذا الحقل مطلوب',
    'error-email': 'يرجى إدخال بريد إلكتروني أو رقم هاتف صحيح',
    'error-name': 'يرجى إدخال اسمك (حرفين على الأقل)',
    'error-company': 'يرجى إدخال اسم الشركة',
    'error-message': 'يرجى وصف كيف يمكننا المساعدة (٢٠ حرف على الأقل)',
    'form-success': 'شكراً لطلبك. سنتواصل معك خلال ٢٤ ساعة.',
    'form-error': 'حدث خطأ. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.'
  }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function $(selector, context = document) {
  return context.querySelector(selector);
}

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

function t(key) {
  return translations[currentLang]?.[key] || translations.en[key] || key;
}

function setHTML(id, html) {
  const el = $(`#${id}`);
  if (el) el.innerHTML = html;
}

function setText(id, text) {
  const el = $(`#${id}`);
  if (el) el.textContent = text;
}

function setAttr(selector, attr, value) {
  const el = $(selector);
  if (el) el.setAttribute(attr, value);
}

// ============================================================================
// LANGUAGE SWITCHING
// ============================================================================

function applyLanguage(lang) {
  currentLang = lang;
  const config = CONFIG.languages[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = config.dir;

  // Update all elements with data-i18n attribute
  $$('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      if (el.type === 'submit' || el.type === 'button') {
        el.value = translation;
      } else {
        el.placeholder = translation;
      }
    } else if (el.tagName === 'OPTION') {
      el.textContent = translation;
    } else {
      el.textContent = translation;
    }
  });

  // Update elements with data-i18n-attr
  $$('[data-i18n-attr]').forEach(el => {
    const attr = el.getAttribute('data-i18n-attr');
    const key = el.getAttribute('data-i18n-key');
    if (attr && key) {
      el.setAttribute(attr, t(key));
    }
  });

  // Update language switchers
  $$('.lang-current').forEach(el => {
    el.textContent = config.label;
    el.setAttribute('data-lang', lang);
  });

  // Update aria-labels
  $$('.lang-switcher').forEach(btn => {
    btn.setAttribute('aria-label', lang === 'en' ? 'Switch to Arabic' : 'Switch to English');
  });

  // Dispatch event for other modules
  document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
}

function toggleLanguage() {
  const newLang = currentLang === 'en' ? 'ar' : 'en';
  applyLanguage(newLang);
}

// ============================================================================
// NAVIGATION
// ============================================================================

function initNavigation() {
  const header = $('#header');
  const hamburger = $('#hamburger');
  const mobileMenu = $('#mobile-menu');
  const navLinks = $$('.nav-link');
  const mobileNavLinks = $$('.mobile-nav-link');

  // Scroll effect on header
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // Mobile menu toggle
  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isOpen);
    mobileMenu.hidden = isOpen;
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  // Close mobile menu on link click
  [...navLinks, ...mobileNavLinks].forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.hidden = true;
      document.body.style.overflow = '';
    });
  });

  // Active section highlighting
  const sections = $$('section[id]');
  const observerOptions = {
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
        mobileNavLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // Smooth scroll for anchor links
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = $(targetId);
      if (target) {
        e.preventDefault();
        const offset = CONFIG.scrollOffset;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });
}

// ============================================================================
// SCROLL REVEAL ANIMATIONS
// ============================================================================

function initScrollReveal() {
  const revealElements = $$('.reveal, .reveal-left, .reveal-right');

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: CONFIG.animationThreshold,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// ============================================================================
// COUNTER ANIMATION
// ============================================================================

function initCounters() {
  const counters = $$('[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = CONFIG.counterDuration;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    const current = Math.floor(eased * target);
    el.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(update);
}

// ============================================================================
// FORM VALIDATION & SUBMISSION
// ============================================================================

function initForm() {
  const form = $('#contact-form');
  if (!form) return;

  const fields = {
    name: { minLength: 2 },
    company: { minLength: 2 },
    email: { pattern: /^[\w.-]+@[\w.-]+\.\w+$|^\+?[\d\s-]{10,}$/ },
    message: { minLength: 20 }
  };

  // Real-time validation
  Object.keys(fields).forEach(fieldName => {
    const input = $(`#${fieldName}`);
    if (!input) return;

    input.addEventListener('blur', () => validateField(fieldName, input));
    input.addEventListener('input', () => {
      if (input.classList.contains('invalid')) {
        validateField(fieldName, input);
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let isValid = true;
    Object.keys(fields).forEach(fieldName => {
      const input = $(`#${fieldName}`);
      if (!validateField(fieldName, input)) {
        isValid = false;
      }
    });

    const service = $('#service');
    if (service && !service.value) {
      showError('service', t('error-required'));
      isValid = false;
    } else if (service) {
      clearError('service');
    }

    if (!isValid) return;

    // Submit form
    await submitForm(form);
  });
}

function validateField(fieldName, input) {
  const config = fields[fieldName];
  const value = input.value.trim();
  let isValid = true;
  let errorMessage = '';

  if (!value) {
    isValid = false;
    errorMessage = t('error-required');
  } else if (config.minLength && value.length < config.minLength) {
    isValid = false;
    errorMessage = fieldName === 'name' ? t('error-name') :
                   fieldName === 'company' ? t('error-company') :
                   t('error-message');
  } else if (config.pattern && !config.pattern.test(value)) {
    isValid = false;
    errorMessage = t('error-email');
  }

  if (isValid) {
    clearError(fieldName);
    input.classList.remove('invalid');
    input.classList.add('valid');
  } else {
    showError(fieldName, errorMessage);
    input.classList.remove('valid');
    input.classList.add('invalid');
  }

  return isValid;
}

function showError(fieldName, message) {
  const errorEl = $(`#error-${fieldName}`);
  const input = $(`#${fieldName}`);
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.style.display = 'block';
  }
  if (input) input.setAttribute('aria-invalid', 'true');
}

function clearError(fieldName) {
  const errorEl = $(`#error-${fieldName}`);
  const input = $(`#${fieldName}`);
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.style.display = 'none';
  }
  if (input) input.removeAttribute('aria-invalid');
}

async function submitForm(form) {
  const submitBtn = $('#submit-btn');
  const btnText = $('#btn-submit');
  const btnLoading = $('#btn-loading');
  const formStatus = $('#form-status');

  // Show loading state
  submitBtn.disabled = true;
  btnText.hidden = true;
  btnLoading.hidden = false;

  // Collect form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Success
    formStatus.hidden = false;
    formStatus.className = 'form-status success';
    formStatus.textContent = t('form-success');
    formStatus.setAttribute('role', 'status');
    form.reset();

    // Clear validation states
    $$('.form-input, .form-select, .form-textarea').forEach(el => {
      el.classList.remove('valid', 'invalid');
    });

  } catch (error) {
    // Error
    formStatus.hidden = false;
    formStatus.className = 'form-status error';
    formStatus.textContent = t('form-error');
  } finally {
    // Reset button
    submitBtn.disabled = false;
    btnText.hidden = false;
    btnLoading.hidden = true;

    // Hide status after 5 seconds
    setTimeout(() => {
      formStatus.hidden = true;
    }, 5000);
  }
}

const fields = {
  name: { minLength: 2 },
  company: { minLength: 2 },
  email: { pattern: /^[\w.-]+@[\w.-]+\.\w+$|^\+?[\d\s-]{10,}$/ },
  message: { minLength: 20 }
};

// ============================================================================
// HERO INTERACTIONS
// ============================================================================

function initHero() {
  // Parallax effect for hero background (respect reduced motion)
  const heroBg = $('.hero-bg');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const hero = $('#home');
      if (!hero) return;
      const heroHeight = hero.offsetHeight;
      if (scrolled < heroHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    }, { passive: true });
  }
}

// ============================================================================
// SOLUTIONS DEMO INTERACTIONS
// ============================================================================

function initSolutionsDemo() {
  const chart = $('#demo-chart');
  if (!chart) return;

  // Add hover interaction to chart
  chart.addEventListener('mousemove', (e) => {
    const rect = chart.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percent = x / width;

    // Could add tooltip here
    chart.style.setProperty('--hover-position', `${percent * 100}%`);
  });
}

// ============================================================================
// INITIALIZATION
// ============================================================================

function init() {
  // Apply initial language
  applyLanguage(currentLang);

  // Initialize modules
  initNavigation();
  initScrollReveal();
  initCounters();
  initForm();
  initHero();
  initSolutionsDemo();

  // Language switchers
  $$('.lang-switcher').forEach(btn => {
    btn.addEventListener('click', toggleLanguage);
  });

  // Keyboard navigation for mobile menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const hamburger = $('#hamburger');
      const mobileMenu = $('#mobile-menu');
      if (hamburger && hamburger.getAttribute('aria-expanded') === 'true') {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
        document.body.style.overflow = '';
        hamburger.focus();
      }
    }
  });

  // Announce language change to screen readers
  document.addEventListener('languagechange', (e) => {
    const lang = e.detail.lang;
    const announcement = document.createElement('div');
    announcement.className = 'sr-only';
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = lang === 'ar' ? 'تم تغيير اللغة إلى العربية' : 'Language changed to English';
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
  });

  console.log('AUDIRA website initialized');
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for testing
export { applyLanguage, t, currentLang };