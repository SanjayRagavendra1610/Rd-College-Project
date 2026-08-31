import { FacultyMember, CampusFacilityItem, RecruiterPartner } from '../types';

export const RDCCPS_CORE_PROFILE = {
  institutionName: "RD College of Commerce & Professional Studies",
  shortName: "RDCCPS",
  tagline: "Cultivating Accomplished Professionals with Integrated Academic & Professional Qualifications",
  motto: "Excellence in Commerce • Integrity in Profession • Mastery in Practice",
  established: "Erode & Coimbatore, Tamil Nadu",
  affiliation: "Affiliated with Bharathiar University, Coimbatore",
  approvedBy: "Recognized by Govt. of Tamil Nadu & UGC Guidelines",
  campusAddresses: [
    {
      campusName: "Erode Main Campus",
      address: "6/232 Pulavarpalayam, Uthukuli Road, Vijayamangalam, Perundurai, Erode District, Tamil Nadu - 638056",
      landmark: "Near Vijayamangalam Toll / Uthukuli Road Junction",
      phones: ["+91 97885 56999", "+91 98438 85222", "+91 98438 84222"],
      email: "rdccpscollege@gmail.com",
      mapEmbedUrl: "https://maps.google.com/maps?q=Vijayamangalam%20Perundurai%20Erode&t=&z=13&ie=UTF8&iwloc=&output=embed"
    },
    {
      campusName: "Coimbatore Center & Admissions Liaison",
      address: "Shanmugapuram, Coimbatore, Tamil Nadu",
      phones: ["+91 97885 56999"],
      email: "helpdesk@rdccps.com"
    }
  ],
  cohortSizeLimit: 300,
  admissionsSession: "2026 - 2027",
  workingHours: "Monday to Saturday: 8:30 AM to 5:30 PM",
  
  // Leadership & Founder Message
  founderAndLeadership: {
    title: "Founder & Academic Patron",
    qualifications: "M.Sc., ML., ACMA., ACS., FIV., Ph.D., Advocate Supreme Court Bar Association",
    distinction: "Former Director, Government of India (IA & AS)",
    experience: "Over two decades of distinguished public service, corporate governance, and professional development leadership.",
    message: "In today's dynamic global economic landscape, a conventional academic degree alone is no longer adequate. The modern economy demands young professionals who possess both solid theoretical foundations and rigorous professional credentials like CA, ACCA, and CMA. At RDCCPS, we have eliminated the historic compromise between university education and coaching institutes. We bring both together under one roof with a disciplined mentorship framework. Our objective is not simply to produce graduates, but to cultivate semi-qualified and fully qualified leaders of tomorrow."
  },

  // Vision & Mission
  vision: "To establish RDCCPS as India's premier commerce institution that transforms aspiring students into disciplined, highly competent, and ethically grounded financial professionals equipped for leadership across global accounting, taxation, auditing, and corporate governance sectors.",
  
  mission: [
    "To provide an intensive, focused, and distraction-free learning ecosystem tailored for simultaneous excellence in University degrees and CA/ACCA/CMA qualifications.",
    "To integrate rigorous professional coaching for ICAI, ACCA (UK), and ICMAI directly within the regular academic timetable.",
    "To instill uncompromising professional ethics, analytical mindset, and AI-enabled technological fluency through practical accounting labs and software certifications.",
    "To deliver personalized 1:1 faculty mentorship with an intentional student cohort cap of 300 students, ensuring every learner receives individualized career navigation.",
    "To bridge academia and industry through mandatory articleship placements, corporate internships, and live simulated tax-filing clinics."
  ],

  // Core Pillars
  corePillars: [
    {
      id: "dual-qualification",
      title: "Dual Qualification Advantage",
      description: "Graduate with an esteemed Bharathiar University B.Com degree AND qualified milestones in CA, ACCA, or CMA.",
      highlight: "Save 2-3 years of career preparation"
    },
    {
      id: "mentorship-model",
      title: "300-Cohort Mentorship Focus",
      description: "We intentionally cap total intake to 300 students, guaranteeing personalized attention, daily tracking, and zero crowd obscurity.",
      highlight: "1:1 Faculty Mentorship"
    },
    {
      id: "expert-faculty",
      title: "Practicing CA/CMA Mentors",
      description: "Classes delivered by practicing Chartered Accountants, Cost Accountants, and seasoned Ph.D. scholars with practical audit insights.",
      highlight: "Real-world Case Studies"
    },
    {
      id: "integrated-timetable",
      title: "Same Campus, Same Class, Same Faculty",
      description: "Say goodbye to exhausting evening and weekend coaching commutes. Professional modules are integrated into college hours.",
      highlight: "Zero Commute Stress"
    },
    {
      id: "articleship-placement",
      title: "Articleship & Big 4 Assistance",
      description: "Dedicated corporate connect cell guiding students into coveted 2-year CA articleships and entry-level corporate analyst tracks.",
      highlight: "100% Placement Support"
    }
  ]
};

export const FACULTY_DIRECTORY: FacultyMember[] = [
  {
    id: "fac-founder",
    name: "Dr. Leadership & Academic Patron",
    designation: "Founder & Academic Director",
    roleType: "Leadership",
    qualifications: "M.Sc., ML., ACMA., ACS., FIV., Ph.D., Advocate Supreme Court",
    experienceYears: "25+ Years",
    specialization: "Corporate Law, Public Finance, Strategic Auditing & Constitutional Jurisprudence",
    bio: "Former Director, Government of India (IA & AS). Veteran legal scholar and multi-credentialed accountant guiding RDCCPS's institutional vision.",
    subjectsTaught: ["Advanced Corporate Governance", "Public Finance & Auditing Standards", "Strategic Financial Jurisprudence"],
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300"
  },
  {
    id: "fac-sivaranjani",
    name: "CA Mrs. J. Sivaranjani",
    designation: "Senior Professor & Lead CA Mentor",
    roleType: "Professional CA/CMA",
    qualifications: "FCA, DISA (ICAI), M.Com",
    experienceYears: "14+ Years",
    specialization: "Direct & Indirect Taxation (GST), Statutory Auditing, CA Foundation & Inter Direct Tax",
    bio: "Practicing Chartered Accountant with extensive statutory audit and appellate taxation experience. Specializes in simplifying complex tax legislation and ICAI exam strategy.",
    subjectsTaught: ["Direct Tax Law & Practice", "Goods and Services Tax (GST)", "CA Inter Auditing & Assurance"],
    badgeColor: "bg-blue-100 text-blue-900 border-blue-300"
  },
  {
    id: "fac-govarthanan",
    name: "ACMA N. Govarthanan",
    designation: "Associate Professor & CMA Program Coordinator",
    roleType: "Professional CA/CMA",
    qualifications: "ACMA (ICMAI), M.Com, M.Phil",
    experienceYears: "12+ Years",
    specialization: "Cost & Management Accounting, Financial Management, Capital Budgeting, ICMAI Group 1 & 2",
    bio: "Associate Member of the Institute of Cost Accountants of India. Renowned for practical coaching in marginal costing, standard costing, and corporate decision analysis.",
    subjectsTaught: ["Cost Accounting Principles", "Management Accounting", "Financial Management & Capital Budgeting"],
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300"
  },
  {
    id: "fac-ramsubhash",
    name: "CMA N. Ram Subhash",
    designation: "Senior Faculty & Strategic Finance Specialist",
    roleType: "Professional CA/CMA",
    qualifications: "FCMA, CS (Semi-Qualified), M.Com",
    experienceYears: "15+ Years",
    specialization: "Strategic Financial Management, Corporate Restructuring, Performance Management",
    bio: "Fellow Cost and Management Accountant guiding students in strategic cost control, international financial reporting standards, and corporate valuations.",
    subjectsTaught: ["Strategic Management", "Advanced Corporate Accounting", "Security Analysis & Portfolio Management"],
    badgeColor: "bg-purple-100 text-purple-900 border-purple-300"
  },
  {
    id: "fac-soundararajan",
    name: "Dr. K. Soundararajan",
    designation: "Professor & Head, Department of Commerce",
    roleType: "Academic Commerce",
    qualifications: "M.Com., M.Phil., Ph.D., PGDCA",
    experienceYears: "18+ Years",
    specialization: "Banking Systems, Financial Markets, Research Methodology & Commerce Pedagogy",
    bio: "Distinguished academician with over 18 years of university teaching. Oversees Bharathiar University curriculum alignment, semester assessments, and academic discipline.",
    subjectsTaught: ["Principles of Accountancy", "Banking Theory Law & Practice", "Financial Markets & Institutions"],
    badgeColor: "bg-sky-100 text-sky-900 border-sky-300"
  },
  {
    id: "fac-balamurugan",
    name: "Prof. M. Balamurugan",
    designation: "Assistant Professor in Accounting",
    roleType: "Academic Commerce",
    qualifications: "M.Com., M.Phil., UGC-NET, SET",
    experienceYears: "10+ Years",
    specialization: "Corporate Accounting, Partnership Accounts, Company Amalgamation",
    bio: "UGC-NET qualified scholar with specialized focus on accounting mechanics, balance sheet consolidation, and corporate liquidation frameworks.",
    subjectsTaught: ["Corporate Accounting I & II", "Financial Accounting II", "Auditing Principles"],
    badgeColor: "bg-indigo-100 text-indigo-900 border-indigo-300"
  },
  {
    id: "fac-priyadharshini",
    name: "Prof. S. Priyadharshini",
    designation: "Assistant Professor in Quantitative Techniques",
    roleType: "Academic Commerce",
    qualifications: "M.Com., MBA (Finance), M.Phil",
    experienceYears: "8+ Years",
    specialization: "Business Mathematics, Quantitative Aptitude, Statistical Analysis, CA Foundation Maths",
    bio: "Expert trainer in quantitative reasoning, logical deduction, and financial mathematics designed specifically for commerce students taking CA Foundation.",
    subjectsTaught: ["Business Mathematics & Statistics", "Quantitative Aptitude for CA Foundation", "Operations Research"],
    badgeColor: "bg-rose-100 text-rose-900 border-rose-300"
  },
  {
    id: "fac-vignesh",
    name: "Prof. R. Vignesh",
    designation: "Assistant Professor in Mercantile Law",
    roleType: "Academic Commerce",
    qualifications: "M.Com., LL.B., ACS (Executive)",
    experienceYears: "7+ Years",
    specialization: "Business Law, Industrial Jurisprudence, Company Law & ICAI Law Modules",
    bio: "Dual-qualified legal educator bridging commercial law with practical legal drafting, corporate filings, and contract compliance.",
    subjectsTaught: ["Mercantile Law", "Company Law & Secretarial Practice", "Industrial Jurisprudence"],
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300"
  },
  {
    id: "fac-librarian",
    name: "Mr. S. Jayakumar",
    designation: "Chief Librarian & Information Officer",
    roleType: "Administration",
    qualifications: "M.L.I.Sc., M.Phil",
    experienceYears: "11+ Years",
    specialization: "Digital Knowledge Management, ICAI/ICMAI Repositories, Research Indexing",
    bio: "Oversees the central library, digital e-journal subscriptions, ICAI study kit cataloging, and automated lending systems.",
    subjectsTaught: ["Digital Library & Research Resources Orientation"],
    badgeColor: "bg-slate-100 text-slate-900 border-slate-300"
  },
  {
    id: "fac-admin",
    name: "Mrs. K. Revathi",
    designation: "Administrative & Student Welfare Officer",
    roleType: "Administration",
    qualifications: "MBA, M.Com",
    experienceYears: "9+ Years",
    specialization: "Academic Coordination, Student Counseling, Hostel Administration & Parent Liaison",
    bio: "Manages day-to-day campus operations, scholarship liaison, transport routes, and student welfare initiatives.",
    subjectsTaught: ["Student Induction & Professional Ethics"],
    badgeColor: "bg-slate-100 text-slate-900 border-slate-300"
  }
];

export const CAMPUS_FACILITIES_FULL: CampusFacilityItem[] = [
  {
    id: "smart-classrooms",
    title: "Air-Conditioned Smart Classrooms",
    category: "Academic",
    description: "Ergonomically designed amphitheater and lecture halls fitted with interactive 4K digital smartboards, acoustic treatment, and climate control to foster intense concentration during rigorous coaching.",
    features: [
      "Interactive 4K smartboards for real-time problem-solving",
      "Ergonomic executive seating with individual power charging points",
      "Acoustically treated halls for crystal-clear faculty instruction",
      "CCTV surveillance and biometric attendance integration"
    ],
    iconName: "Monitor",
    tag: "Modern Learning"
  },
  {
    id: "fintech-labs",
    title: "High-Tech Finance & Tally Prime Labs",
    category: "Technology",
    description: "Dedicated computer laboratory equipped with modern workstation towers, licensed Tally Prime ERP, GST filing sandbox simulators, and Advanced Excel financial modeling toolsets.",
    features: [
      "Licensed Tally Prime with Multi-User Taxation modules",
      "Income Tax and GST e-Filing live portal simulations",
      "Advanced Financial Modeling & Python for Finance stations",
      "1 Gbps high-speed dedicated fiber optic internet connectivity"
    ],
    iconName: "Cpu",
    tag: "Practical Competence"
  },
  {
    id: "central-library",
    title: "Knowledge Hub & Digital Commerce Library",
    category: "Academic",
    description: "Comprehensive repository of over 12,000 commerce textbooks, complete ICAI/ICMAI/ACCA study kits, chartered journals, tax law reporters, and global digital e-library subscriptions.",
    features: [
      "Complete collection of ICAI, ICMAI & ACCA approved learning materials",
      "Subscriptions to Chartered Accountant Journal, Taxmann & Corporate Law Advisor",
      "Silent individual study carrels open for extended pre-exam hours",
      "Digital cataloging with barcode checkouts and e-book reader terminals"
    ],
    iconName: "BookOpen",
    tag: "Rich Repository"
  },
  {
    id: "auditorium",
    title: "Executive Seminar & Conference Hall",
    category: "Academic",
    description: "Air-conditioned 250-seat conference center hosting national commerce symposiums, guest lectures by practicing CAs, inter-collegiate commerce fests, and corporate recruitment drives.",
    features: [
      "State-of-the-art surround sound audio and projection systems",
      "Stage lighting and video-conferencing bridge for international guest lectures",
      "Dedicated staging for student debates and finance quiz tournaments"
    ],
    iconName: "Users",
    tag: "Corporate Interface"
  },
  {
    id: "transport-fleet",
    title: "Dedicated Campus Transport Fleet",
    category: "Logistics",
    description: "Safe, comfortable GPS-tracked college buses connecting students across Erode, Tirupur, Coimbatore, Perundurai, Uthukuli, Vijayamangalam, Kangeyam, and surrounding towns.",
    features: [
      "GPS tracking and speed governors on all bus routes",
      "Doorstep pickup points across key residential hubs in 4 districts",
      "Experienced institutional drivers with proven safety records",
      "Synchronized with morning & evening academic coaching schedules"
    ],
    iconName: "Bus",
    tag: "Safe Transit"
  },
  {
    id: "student-hostel",
    title: "Secure Residential Hostels & Hygienic Dining",
    category: "Student Life",
    description: "Separate secure on-campus residences for male and female students with 24/7 warden supervision, furnished study rooms, hygienic dining hall serving nutritious vegetarian cuisine, and Wi-Fi.",
    features: [
      "Separate boys & girls hostels with biometric security",
      "Nutritious, steam-cooked vegetarian multi-cuisine menu",
      "Purified RO drinking water and solar hot water heating",
      "Supervised evening study hours with resident faculty tutors"
    ],
    iconName: "Home",
    tag: "Homely Ambience"
  }
];

export const TOP_RECRUITERS_LIST: RecruiterPartner[] = [
  {
    name: "Deloitte",
    category: "Big 4",
    roles: ["Statutory Audit Associate", "Tax Consultant", "Risk Advisory Analyst"]
  },
  {
    name: "PricewaterhouseCoopers (PwC)",
    category: "Big 4",
    roles: ["Assurance Associate", "Global Indirect Tax Analyst", "Forensic Accounting"]
  },
  {
    name: "Ernst & Young (EY)",
    category: "Big 4",
    roles: ["Direct Tax Consultant", "FSO Audit Associate", "Financial Accounting Advisory"]
  },
  {
    name: "KPMG",
    category: "Big 4",
    roles: ["Corporate Audit Analyst", "Deal Advisory Associate", "Transfer Pricing"]
  },
  {
    name: "Grant Thornton Bharat",
    category: "Chartered Firm",
    roles: ["Senior Audit Trainee", "Valuation Associate", "Corporate Secretarial Advisory"]
  },
  {
    name: "BDO India",
    category: "Chartered Firm",
    roles: ["Risk & Governance Associate", "Statutory Audit Articleship", "Tax Compliance"]
  },
  {
    name: "Zoho Corporation",
    category: "Tech & MNC",
    roles: ["Financial Systems Analyst", "Product Accountant", "Corporate Finance Executive"]
  },
  {
    name: "Infosys & Tata Consultancy Services (TCS)",
    category: "Tech & MNC",
    roles: ["Financial Accounting Associate", "Global Tax Analyst", "Internal Audit Trainee"]
  },
  {
    name: "ICICI Bank & HDFC Bank",
    category: "Banking & BFSI",
    roles: ["Credit Analyst", "Commercial Banking Officer", "Forex & Treasury Management"]
  }
];

export const ADMISSION_STEPS = [
  {
    stepNumber: "01",
    title: "Submit Online Application / Enquiry",
    description: "Fill the digital admission form with your +2 / HSC examination stream details, selected course, and contact information."
  },
  {
    stepNumber: "02",
    title: "1:1 Academic Profile Counseling",
    description: "Attend a personalized counseling session with senior CA/CMA faculty to match your aptitude with CA, ACCA, or CMA pathways."
  },
  {
    stepNumber: "03",
    title: "Merit Evaluation & Seat Allotment",
    description: "Seats are allocated based on Higher Secondary marks merit and scholarship evaluation within the capped cohort of 300 students."
  },
  {
    stepNumber: "04",
    title: "Document Verification & Fee Confirmation",
    description: "Submit original mark sheets, transfer certificates, and complete enrollment documentation."
  },
  {
    stepNumber: "05",
    title: "Induction & Foundation Bootcamp",
    description: "Join the 2-week intensive Commerce & Quantitative Aptitude bridge program before regular semester classes commence."
  }
];

export const STUDENT_CLUBS = [
  {
    name: "The Chartered Guild",
    focus: "ICAI & ICMAI Exam strategy, peer problem-solving circles, and weekly case study debates.",
    badge: "Professional Track"
  },
  {
    name: "Tax & GST Clinic",
    focus: "Hands-on simulated filing of ITR-1, ITR-4, GSTR-1, and GSTR-3B using live dummy datasets.",
    badge: "Practical Skills"
  },
  {
    name: "FinTech & Investment Society",
    focus: "Stock market mock trading, crypto asset discussions, algorithmic financial modeling, and venture capital basics.",
    badge: "Market Insights"
  },
  {
    name: "Orators & Literary Council",
    focus: "Mastering corporate communication, business email drafting, extempore speaking, and interview simulations.",
    badge: "Soft Skills"
  },
  {
    name: "COMMEX Annual Commerce Fest",
    focus: "Inter-collegiate commerce fest featuring Best Manager, Corporate Quiz, Crisis Management, and Mock Boardroom.",
    badge: "Annual Flagship"
  }
];
