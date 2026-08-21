import { Course } from '../types';
import bcomCaImg from '../assets/images/course_bcom_ca_1787345690903.jpg';
import bcomPaImg from '../assets/images/course_bcom_pa_1787345751516.jpg';
import bcomAccaImg from '../assets/images/course_bcom_acca_1787345706468.jpg';
import bcomTechImg from '../assets/images/course_bcom_tech_1787345719816.jpg';
import bcomCmaImg from '../assets/images/course_bcom_cma_1787345734412.jpg';

export const RDCCPS_INFO = {
  name: "RD College of Commerce & Professional Studies",
  shortName: "RDCCPS",
  tagline: "Empowering Next-Gen Finance Leaders & Chartered Professionals",
  established: "Erode, Tamil Nadu",
  affiliation: "Affiliated with Bharathiar University, Coimbatore",
  address: "6/232 Pulavarpalayam, Uthukuli Road, Vijayamangalam, Perundurai, Erode, Tamil Nadu - 638056",
  phones: ["+91 97885 56999", "+91 98438 85222", "+91 98438 84222"],
  emails: ["rdccpscollege@gmail.com", "helpdesk@rdccps.com"],
  admissionsOpenYear: "2026 - 2027",
  operatingHours: "Monday - Saturday: 8:30 AM to 5:30 PM",
  keyStats: [
    { label: "Integrated Qualifications", value: "100%", sub: "CA, ACCA & CMA Coaching" },
    { label: "University Affiliation", value: "Bharathiar", sub: "Recognized UG Degrees" },
    { label: "Flagship Integrated Programs", value: "5 Tracks", sub: "Designed for Professional Mastery" },
    { label: "Placement Assistance", value: "Big 4 & Top MNCs", sub: "Dedicated Corporate Cell" }
  ]
};

export const COURSES_DATA: Course[] = [
  {
    id: "bcom-general-ca",
    code: "BCOM-CA-01",
    name: "B.Com with Chartered Accountancy (CA)",
    shortName: "B.Com with CA",
    tagline: "Comprehensive Commerce Degree with ICAI Chartered Accountancy Coaching",
    integratedCertification: "Chartered Accountancy (CA - ICAI)",
    certificationType: "CA",
    affiliation: "Bharathiar University, Coimbatore",
    duration: "3 Years (6 Semesters)",
    mode: "Full Time - On Campus",
    totalSemesters: 6,
    eligibility: "HSC (+2) / CBSE / ISC with Commerce, Accountancy, Business Maths, or Mathematics",
    minimumMarks: "50% aggregate in Higher Secondary Examination",
    description: "The B.Com with CA program at RDCCPS is designed to bridge standard university academia with rigorous preparation for ICAI examinations. Students earn a full-fledged Bharathiar University B.Com degree while concurrently undergoing expert mentoring for CA Foundation and CA Intermediate exams.",
    colorTheme: {
      primary: "from-blue-900 to-indigo-900",
      secondary: "bg-blue-50 text-blue-800",
      accent: "text-amber-500",
      border: "border-blue-200",
      bgBadge: "bg-blue-100 text-blue-800",
      textBadge: "text-blue-900"
    },
    keyHighlights: [
      "Rigorous ICAI CA Foundation & Intermediate classroom coaching integrated within the daily academic timetable",
      "Daily practice papers, weekly chapter mocks, and real-time exam simulation series",
      "Hands-on practical training in Tally Prime, GST filing, TDS computation, and Income Tax e-Returns",
      "Special guidance for securing 2-year mandatory CA Articleship in top chartered accounting firms"
    ],
    dualAdvantagePoints: [
      "No separate travel or weekend coaching stress—regular college hours cover university and CA coaching concurrently",
      "Faculty comprising practicing Chartered Accountants (CAs) and experienced university academicians",
      "Dedicated doubt-clearing clinics and intensive revision bootcamps before ICAI exams",
      "Degree security: Graduate with a recognized B.Com even while pursuing CA milestones"
    ],
    exemptionsOrExams: "Prepares for ICAI CA Foundation & CA Intermediate Group 1 & 2 exams alongside university semester exams.",
    idealFor: "Students aspiring to become Chartered Accountants, Statutory Auditors, Chief Financial Officers, or Corporate Tax Advisors.",
    seatsIntake: 60,
    imageUrl: bcomCaImg,
    toolsAndCertifications: [
      "ICAI Foundation & Inter Prep",
      "Tally Prime & GST E-Filing",
      "Advanced MS Excel & Financial Modeling",
      "Corporate Taxation & Audit Tools"
    ],
    semesters: [
      {
        semesterNumber: 1,
        title: "Semester I: Principles of Accounting & CA Foundation Base",
        professionalMilestone: "CA Foundation Orientation & Quantitative Aptitude Intensive",
        subjects: [
          { code: "COM101", name: "Principles of Accountancy", type: "Core", credits: 4 },
          { code: "COM102", name: "Business Organization & Management", type: "Core", credits: 4 },
          { code: "COM103", name: "Business Mathematics & Statistics", type: "Allied", credits: 4 },
          { code: "ENG101", name: "Communicative English & Business Correspondence", type: "Allied", credits: 3 },
          { code: "CA101", name: "CA Foundation: Mercantile Law & Jurisprudence", type: "Professional", credits: 3 }
        ]
      },
      {
        semesterNumber: 2,
        title: "Semester II: Financial Accounting & CA Foundation Examination",
        professionalMilestone: "Appear for ICAI CA Foundation Exam (May/June)",
        subjects: [
          { code: "COM201", name: "Financial Accounting II", type: "Core", credits: 4 },
          { code: "COM202", name: "Mercantile & Commercial Law", type: "Core", credits: 4 },
          { code: "COM203", name: "Managerial Economics", type: "Allied", credits: 4 },
          { code: "LAB201", name: "Computer Applications in Business & Tally Lab", type: "Practical Lab", credits: 3 },
          { code: "CA201", name: "CA Foundation Mock Series & Question Bank Drill", type: "Professional", credits: 3 }
        ]
      },
      {
        semesterNumber: 3,
        title: "Semester III: Corporate Accounting & CA Inter Group 1",
        professionalMilestone: "CA Intermediate Group 1 Preparation (Advanced Accounting & Corporate Law)",
        subjects: [
          { code: "COM301", name: "Corporate Accounting I", type: "Core", credits: 4 },
          { code: "COM302", name: "Direct Taxation & Law", type: "Core", credits: 4 },
          { code: "COM303", name: "Cost Accounting Principles", type: "Core", credits: 4 },
          { code: "COM304", name: "Banking Theory Law & Practice", type: "Allied", credits: 3 },
          { code: "CA301", name: "CA Inter: Corporate & Other Laws (ICAI Module)", type: "Professional", credits: 3 }
        ]
      },
      {
        semesterNumber: 4,
        title: "Semester IV: Advanced Corporate Accounting & Taxation",
        professionalMilestone: "Appear for CA Intermediate Group 1 / Mock Exams",
        subjects: [
          { code: "COM401", name: "Corporate Accounting II (Amalgamation & Reconstruction)", type: "Core", credits: 4 },
          { code: "COM402", name: "Indirect Taxation & Goods and Services Tax (GST)", type: "Core", credits: 4 },
          { code: "COM403", name: "Auditing Principles & Assurance", type: "Core", credits: 4 },
          { code: "LAB401", name: "GST Portal E-filing & Practical Tax Lab", type: "Practical Lab", credits: 3 },
          { code: "CA401", name: "CA Inter: Taxation (Income Tax & GST Specialization)", type: "Professional", credits: 3 }
        ]
      },
      {
        semesterNumber: 5,
        title: "Semester V: Management Accounting & CA Inter Group 2",
        professionalMilestone: "CA Intermediate Group 2 Preparation (Costing, FM & Auditing)",
        subjects: [
          { code: "COM501", name: "Management Accounting & Decision Making", type: "Core", credits: 4 },
          { code: "COM502", name: "Financial Management & Capital Budgeting", type: "Core", credits: 4 },
          { code: "COM503", name: "Company Law & Secretarial Practice", type: "Core", credits: 4 },
          { code: "COM504", name: "Strategic Management", type: "Skill Based", credits: 3 },
          { code: "CA501", name: "CA Inter: Auditing and Ethics Comprehensive", type: "Professional", credits: 3 }
        ]
      },
      {
        semesterNumber: 6,
        title: "Semester VI: Financial Markets & Articleship Placement Readiness",
        professionalMilestone: "Articleship Interview Drives & ICAI Exam Final Preparation",
        subjects: [
          { code: "COM601", name: "Financial Markets, Services & Institutions", type: "Core", credits: 4 },
          { code: "COM602", name: "Security Analysis & Portfolio Management", type: "Core", credits: 4 },
          { code: "COM603", name: "Entrepreneurial Development & Business Ethics", type: "Skill Based", credits: 3 },
          { code: "PRJ601", name: "Comprehensive Financial Project / Audit Internship Report", type: "Practical Lab", credits: 4 },
          { code: "CA601", name: "Articleship Readiness & ICAI Orientation Course", type: "Professional", credits: 3 }
        ]
      }
    ],
    careerOpportunities: [
      {
        role: "Chartered Accountant / Statutory Auditor",
        averagePackage: "₹8.0 - ₹15.0 LPA",
        topCompanies: ["PwC", "Deloitte", "EY", "KPMG", "Top Tier CA Firms"],
        description: "Perform comprehensive statutory audits, forensic verification, and financial reporting for corporate entities."
      },
      {
        role: "Corporate Tax Consultant",
        averagePackage: "₹6.5 - ₹11.0 LPA",
        topCompanies: ["BDO India", "Grant Thornton", "Tata Consultancy Services"],
        description: "Advising enterprise clients on direct and indirect tax strategies, GST disputes, and cross-border tax compliance."
      },
      {
        role: "Internal Audit & Risk Analyst",
        averagePackage: "₹5.5 - ₹9.5 LPA",
        topCompanies: ["ICICI Bank", "Larsen & Toubro", "Infosys Finance"],
        description: "Evaluating corporate internal controls, governance structures, and financial operational efficiency."
      }
    ]
  },
  {
    id: "bcom-professional-accounting-ca",
    code: "BCOM-PA-02",
    name: "B.Com Professional Accounting with CA",
    shortName: "B.Com (PA) with CA",
    tagline: "100% Curriculum Alignment with the Institute of Chartered Accountants of India",
    integratedCertification: "Chartered Accountancy (CA - ICAI)",
    certificationType: "CA",
    affiliation: "Bharathiar University, Coimbatore",
    duration: "3 Years (6 Semesters)",
    mode: "Full Time - On Campus",
    totalSemesters: 6,
    eligibility: "HSC (+2) in Commerce / Accountancy / Mathematics with minimum 50%",
    minimumMarks: "50% aggregate in Higher Secondary",
    description: "B.Com Professional Accounting is specifically engineered for students with a single-minded goal of clearing CA examinations. The syllabus is customized so that university curriculum and ICAI Intermediate course modules work in absolute synergy, eliminating duplication and maximizing exam success.",
    colorTheme: {
      primary: "from-slate-900 to-sky-950",
      secondary: "bg-sky-50 text-sky-900",
      accent: "text-amber-500",
      border: "border-sky-200",
      bgBadge: "bg-sky-100 text-sky-800",
      textBadge: "text-sky-900"
    },
    keyHighlights: [
      "Customized syllabus designed to mirror ICAI's new scheme of education and training",
      "Specialized modules in Advanced Accounting Standards (Ind AS), Corporate Tax Planning, and Corporate Laws",
      "Intensive weekly test series with individual evaluation and performance mentoring",
      "Articleship interview training, resume preparation, and soft skills grooming by industry experts"
    ],
    dualAdvantagePoints: [
      "Maximum overlap between college semester subjects and CA Inter subjects",
      "Exclusive access to RDCCPS CA Study Library with latest ICAI study materials, scanners, and suggested answers",
      "Masterclasses by visiting senior Chartered Accountants and past all-India rank holders",
      "Pre-placement training for Big 4 and mid-tier CA firms"
    ],
    exemptionsOrExams: "Integrated coaching for ICAI Foundation and Intermediate Examinations with direct mock-test benchmarks.",
    idealFor: "Dedicated accounting aspirants aiming for fast-track qualification as a Chartered Accountant.",
    seatsIntake: 60,
    imageUrl: bcomPaImg,
    toolsAndCertifications: [
      "Ind AS & IFRS Standards",
      "Advanced Tally Prime with Payroll & GST",
      "Excel Data Analytics for Auditors",
      "Audit Automation Software"
    ],
    semesters: [
      {
        semesterNumber: 1,
        title: "Semester I: Foundations of Professional Accounting",
        professionalMilestone: "CA Foundation Induction & Mathematical Foundations",
        subjects: [
          { code: "PA101", name: "Financial Accounting: Standards & Frameworks", type: "Core", credits: 4 },
          { code: "PA102", name: "Business Economics & Market Analysis", type: "Core", credits: 4 },
          { code: "PA103", name: "Quantitative Techniques for Accountants", type: "Allied", credits: 4 },
          { code: "PA104", name: "Business Law & Indian Contract Act", type: "Core", credits: 3 },
          { code: "PA105", name: "CA Foundation: Law & Writing Skills Lab", type: "Professional", credits: 3 }
        ]
      },
      {
        semesterNumber: 2,
        title: "Semester II: Advanced Financial Accounting & CA Foundation",
        professionalMilestone: "ICAI CA Foundation Exam Cycle",
        subjects: [
          { code: "PA201", name: "Higher Financial Accounting (Partnership & Special Accounts)", type: "Core", credits: 4 },
          { code: "PA202", name: "Industrial & Labour Jurisprudence", type: "Core", credits: 4 },
          { code: "PA203", name: "Business Statistics & Probability Models", type: "Allied", credits: 4 },
          { code: "PAL201", name: "Financial Reporting Computer Lab", type: "Practical Lab", credits: 3 },
          { code: "PA204", name: "CA Foundation Intensive Question Bank Series", type: "Professional", credits: 3 }
        ]
      },
      {
        semesterNumber: 3,
        title: "Semester III: Corporate Financial Reporting & Taxation",
        professionalMilestone: "CA Inter: Corporate Law & Direct Tax Intensive",
        subjects: [
          { code: "PA301", name: "Corporate Financial Reporting (Ind AS)", type: "Core", credits: 4 },
          { code: "PA302", name: "Income Tax Law and Practice - I", type: "Core", credits: 4 },
          { code: "PA303", name: "Cost Accounting & Control", type: "Core", credits: 4 },
          { code: "PA304", name: "Company Law (Companies Act 2013)", type: "Core", credits: 3 },
          { code: "PA305", name: "CA Inter Group 1 Practice Series", type: "Professional", credits: 3 }
        ]
      },
      {
        semesterNumber: 4,
        title: "Semester IV: Advanced Costing & Indirect Taxes (GST)",
        professionalMilestone: "CA Inter Group 1 Milestone Exams",
        subjects: [
          { code: "PA401", name: "Advanced Cost & Management Accounting", type: "Core", credits: 4 },
          { code: "PA402", name: "Income Tax Law & Practice - II (Corporate Assessment)", type: "Core", credits: 4 },
          { code: "PA403", name: "Indirect Tax Laws (GST & Customs Law)", type: "Core", credits: 4 },
          { code: "PAL401", name: "Automated Tax Filing & TDS Lab", type: "Practical Lab", credits: 3 },
          { code: "PA404", name: "CA Inter: Cost & Management Module", type: "Professional", credits: 3 }
        ]
      },
      {
        semesterNumber: 5,
        title: "Semester V: Auditing, Assurance & Financial Management",
        professionalMilestone: "CA Inter Group 2: Advanced Auditing & Strategic FM",
        subjects: [
          { code: "PA501", name: "Auditing Standards & Professional Ethics", type: "Core", credits: 4 },
          { code: "PA502", name: "Financial Management: Valuation & Capital Decisions", type: "Core", credits: 4 },
          { code: "PA503", name: "Enterprise Information Systems & MIS", type: "Core", credits: 4 },
          { code: "PA504", name: "Corporate Restructuring & Valuation", type: "Skill Based", credits: 3 },
          { code: "PA505", name: "CA Inter Group 2 Mock Examinations", type: "Professional", credits: 3 }
        ]
      },
      {
        semesterNumber: 6,
        title: "Semester VI: Strategic Financial Management & Articleship Launch",
        professionalMilestone: "Articleship Selection & Placement Campus Drives",
        subjects: [
          { code: "PA601", name: "Strategic Financial Management", type: "Core", credits: 4 },
          { code: "PA602", name: "Financial Analysis with Python & PowerBI", type: "Practical Lab", credits: 4 },
          { code: "PA603", name: "International Auditing & Assurance Frameworks", type: "Core", credits: 3 },
          { code: "PAP601", name: "Institutional Accounting & Audit Project", type: "Practical Lab", credits: 4 },
          { code: "PA604", name: "Articleship Induction & Advanced Audit Soft Skills", type: "Professional", credits: 3 }
        ]
      }
    ],
    careerOpportunities: [
      {
        role: "Chartered Accountant Associate / Senior Audit Executive",
        averagePackage: "₹7.5 - ₹14.0 LPA",
        topCompanies: ["KPMG", "Deloitte USI", "PwC SDC", "Singhi & Co."],
        description: "Direct handling of corporate audit assignments, financial consolidation, and regulatory certifications."
      },
      {
        role: "Financial Analyst & Controller",
        averagePackage: "₹6.0 - ₹10.0 LPA",
        topCompanies: ["Amazon Finance", "Flipkart", "Zoho Corporation"],
        description: "Overseeing budgeting, financial variance analysis, and internal financial controls."
      },
      {
        role: "Direct & Indirect Tax Specialist",
        averagePackage: "₹6.0 - ₹11.5 LPA",
        topCompanies: ["BMR Advisors", "Baker Tilly", "Grant Thornton Bharat"],
        description: "Handling GST audits, litigations, corporate income tax filing, and transfer pricing assessments."
      }
    ]
  },
  {
    id: "bcom-finance-acca",
    code: "BCOM-FIN-03",
    name: "B.Com Finance with ACCA (UK)",
    shortName: "B.Com Finance with ACCA",
    tagline: "Global Chartered Accounting Credential Valid across 180+ Countries",
    integratedCertification: "ACCA (UK Global)",
    certificationType: "ACCA",
    affiliation: "Bharathiar University, Coimbatore",
    duration: "3 Years (6 Semesters)",
    mode: "Full Time - On Campus",
    totalSemesters: 6,
    eligibility: "HSC (+2) / CBSE / ISC with Commerce, Accountancy, or Mathematics with min 50%",
    minimumMarks: "50% aggregate in Higher Secondary",
    description: "The B.Com Finance with ACCA (Association of Chartered Certified Accountants, UK) program offers a passport to global careers. Students study an international curriculum aligned with IFRS standards, gain exemptions for eligible ACCA papers, and prepare for global leadership in multinational corporations, Big 4 firms, and investment banks.",
    colorTheme: {
      primary: "from-emerald-950 to-teal-900",
      secondary: "bg-emerald-50 text-emerald-900",
      accent: "text-emerald-500",
      border: "border-emerald-200",
      bgBadge: "bg-emerald-100 text-emerald-800",
      textBadge: "text-emerald-900"
    },
    keyHighlights: [
      "International curriculum recognized across 180+ countries and thousands of global employers",
      "Opportunity for paper exemptions in ACCA Applied Knowledge and Applied Skills levels",
      "Training in International Financial Reporting Standards (IFRS), Global Tax, and Strategic Business Leadership (SBL)",
      "Direct pathway to high-paying international corporate finance roles in UK, Middle East, Singapore, and India"
    ],
    dualAdvantagePoints: [
      "ACCA Approved learning materials, Kaplan/BPP mock examinations, and live masterclasses",
      "Mentored by ACCA qualified members and international finance trainers",
      "High demand across Big 4 Global Delivery Centers (PwC, EY GDS, Deloitte USI, KPMG GS)",
      "Degree plus prestigious Global Affiliate status upon clearing required papers"
    ],
    exemptionsOrExams: "Integrated ACCA coaching covering Applied Knowledge (BT, MA, FA), Applied Skills (LW, PM, TX, FR, AA, FM), and Strategic Professional prep.",
    idealFor: "Students aspiring for global accounting careers, international consulting, MNC finance, or relocation abroad.",
    seatsIntake: 60,
    imageUrl: bcomAccaImg,
    toolsAndCertifications: [
      "ACCA (UK) Integrated Modules",
      "IFRS & International Taxation",
      "Financial Modeling in Excel",
      "Power BI for Finance Reporting"
    ],
    semesters: [
      {
        semesterNumber: 1,
        title: "Semester I: Business & Technology + Financial Accounting",
        professionalMilestone: "ACCA Business and Technology (BT) & Financial Accounting (FA)",
        subjects: [
          { code: "FIN101", name: "Financial Accounting & Reporting Basics", type: "Core", credits: 4 },
          { code: "FIN102", name: "Business Environment & Global Economics", type: "Core", credits: 4 },
          { code: "FIN103", name: "Quantitative Methods in Financial Analysis", type: "Allied", credits: 4 },
          { code: "FIN104", name: "Business Technology & Organizational Behavior", type: "Allied", credits: 3 },
          { code: "ACCA101", name: "ACCA F1: Business & Technology (BT)", type: "Professional", credits: 3 }
        ]
      },
      {
        semesterNumber: 2,
        title: "Semester II: Management Accounting & Global Corporate Law",
        professionalMilestone: "ACCA Management Accounting (MA) Certification",
        subjects: [
          { code: "FIN201", name: "Corporate Financial Accounting", type: "Core", credits: 4 },
          { code: "FIN202", name: "Cost & Management Accounting Principles", type: "Core", credits: 4 },
          { code: "FIN203", name: "Corporate & Business Law (Global Frameworks)", type: "Core", credits: 4 },
          { code: "FINL201", name: "Financial Spreadsheet Modeling Lab", type: "Practical Lab", credits: 3 },
          { code: "ACCA201", name: "ACCA F2 & F3: Applied Knowledge Exams", type: "Professional", credits: 3 }
        ]
      },
      {
        semesterNumber: 3,
        title: "Semester III: Performance Management & Taxation",
        professionalMilestone: "ACCA Applied Skills: Performance Management (PM) & Taxation (TX)",
        subjects: [
          { code: "FIN301", name: "Financial Reporting (IFRS / Ind AS Comparison)", type: "Core", credits: 4 },
          { code: "FIN302", name: "Direct & Indirect Taxation Systems", type: "Core", credits: 4 },
          { code: "FIN303", name: "Advanced Cost Management Techniques", type: "Core", credits: 4 },
          { code: "FIN304", name: "Banking & Financial Institutions Operations", type: "Allied", credits: 3 },
          { code: "ACCA301", name: "ACCA F5: Performance Management Intensive", type: "Professional", credits: 3 }
        ]
      },
      {
        semesterNumber: 4,
        title: "Semester IV: Financial Reporting & International Audit",
        professionalMilestone: "ACCA Applied Skills: Financial Reporting (FR) & Audit & Assurance (AA)",
        subjects: [
          { code: "FIN401", name: "Advanced Financial Reporting & Group Accounts", type: "Core", credits: 4 },
          { code: "FIN402", name: "Audit and Assurance: International Standards", type: "Core", credits: 4 },
          { code: "FIN403", name: "Corporate Finance & Capital Structuring", type: "Core", credits: 4 },
          { code: "FINL401", name: "IFRS Practical Compliance & XBRL Lab", type: "Practical Lab", credits: 3 },
          { code: "ACCA401", name: "ACCA F7 & F8: FR and Audit Exam Prep", type: "Professional", credits: 3 }
        ]
      },
      {
        semesterNumber: 5,
        title: "Semester V: Financial Management & Strategic Leadership",
        professionalMilestone: "ACCA Applied Skills: Financial Management (FM) & SBL Induction",
        subjects: [
          { code: "FIN501", name: "International Financial Management & Forex", type: "Core", credits: 4 },
          { code: "FIN502", name: "Investment Analysis & Portfolio Management", type: "Core", credits: 4 },
          { code: "FIN503", name: "Strategic Business Analysis & Risk Management", type: "Core", credits: 4 },
          { code: "FIN504", name: "Corporate Governance & Ethics in Finance", type: "Skill Based", credits: 3 },
          { code: "ACCA501", name: "ACCA F9: Financial Management Practice Tests", type: "Professional", credits: 3 }
        ]
      },
      {
        semesterNumber: 6,
        title: "Semester VI: Global Strategic Business Leader & Capstone",
        professionalMilestone: "ACCA Strategic Professional Level (SBL / SBR) Orientation",
        subjects: [
          { code: "FIN601", name: "Strategic Business Reporting (SBR Frameworks)", type: "Core", credits: 4 },
          { code: "FIN602", name: "Financial Analytics with Python & Tableau", type: "Practical Lab", credits: 4 },
          { code: "FIN603", name: "Mergers, Acquisitions & Corporate Valuation", type: "Core", credits: 3 },
          { code: "FINP601", name: "Global Finance Internship & Research Dissertation", type: "Practical Lab", credits: 4 },
          { code: "ACCA601", name: "ACCA Global Placement Assessment & Interview Readiness", type: "Professional", credits: 3 }
        ]
      }
    ],
    careerOpportunities: [
      {
        role: "Global Audit & Assurance Specialist (Big 4)",
        averagePackage: "₹8.5 - ₹16.0 LPA",
        topCompanies: ["Deloitte Global", "EY GDS", "PwC Acceleration Center", "KPMG Global"],
        description: "Conducting audits for Fortune 500 multinationals under International Financial Reporting Standards."
      },
      {
        role: "International Financial Controller / FP&A Analyst",
        averagePackage: "₹7.0 - ₹13.5 LPA",
        topCompanies: ["Amazon", "Google Finance", "Standard Chartered", "Barclays"],
        description: "Leading strategic budgeting, variance tracking, and multinational consolidation across geographic regions."
      },
      {
        role: "M&A Advisory & Valuation Consultant",
        averagePackage: "₹8.0 - ₹15.0 LPA",
        topCompanies: ["Grant Thornton UK", "BDO Global", "Alvarez & Marsal"],
        description: "Assisting international cross-border transactions, enterprise valuation, and financial due diligence."
      }
    ]
  },
  {
    id: "bcom-accounting-finance-ca",
    code: "BCOM-AF-04",
    name: "B.Com Accounting & Finance with CA",
    shortName: "B.Com (A&F) with CA",
    tagline: "Quantitative Analytics, Corporate Finance, and Chartered Accountancy Synergy",
    integratedCertification: "Chartered Accountancy (CA - ICAI)",
    certificationType: "CA",
    affiliation: "Bharathiar University, Coimbatore",
    duration: "3 Years (6 Semesters)",
    mode: "Full Time - On Campus",
    totalSemesters: 6,
    eligibility: "HSC (+2) in Commerce / Accountancy / Business Maths with minimum 50%",
    minimumMarks: "50% aggregate in Higher Secondary",
    description: "B.Com in Accounting and Finance with CA coaching is designed for students seeking a dual mastery in accounting mechanics and forward-looking financial market intelligence. It prepares candidates for both the rigorous ICAI examinations and dynamic corporate finance, wealth management, and investment advisory roles.",
    colorTheme: {
      primary: "from-purple-950 to-slate-900",
      secondary: "bg-purple-50 text-purple-900",
      accent: "text-amber-500",
      border: "border-purple-200",
      bgBadge: "bg-purple-100 text-purple-800",
      textBadge: "text-purple-900"
    },
    keyHighlights: [
      "Dual focus on statutory accounting compliance and quantitative corporate finance strategy",
      "Full coverage of ICAI CA syllabus integrated into regular class schedules",
      "Laboratory sessions on Financial Modeling, Equity Research, and Valuation using Excel and Python",
      "Practical workshops on stock market mechanisms, derivatives, and algorithmic trading basics"
    ],
    dualAdvantagePoints: [
      "Builds an edge over standard commerce graduates by merging CA coaching with high-finance skills",
      "Dedicated faculty with extensive industry experience in investment banking and statutory auditing",
      "Structured mentoring for CA Intermediate group exams and articleship placement",
      "Guest lectures from hedge fund managers, equity research analysts, and senior partners"
    ],
    exemptionsOrExams: "Integrated coaching for ICAI CA Foundation & Intermediate along with financial markets certification training.",
    idealFor: "Students aspiring for careers in Chartered Accountancy, Corporate Treasury, Investment Banking, or Equity Research.",
    seatsIntake: 60,
    imageUrl: bcomTechImg,
    toolsAndCertifications: [
      "ICAI Foundation & Inter Prep",
      "Financial Modeling & Valuation (DCF / Comps)",
      "Tally Prime, GST, TDS Modules",
      "Python for Algorithmic Financial Analysis"
    ],
    semesters: [
      {
        semesterNumber: 1,
        title: "Semester I: Principles of Accounting & Financial Markets Intro",
        professionalMilestone: "CA Foundation Math, Law & Accounting Orientation",
        subjects: [
          { code: "AF101", name: "Financial Accounting & Conceptual Framework", type: "Core", credits: 4 },
          { code: "AF102", name: "Financial Mathematics & Time Value of Money", type: "Allied", credits: 4 },
          { code: "AF103", name: "Business Organization & Financial Economics", type: "Core", credits: 4 },
          { code: "AF104", name: "Business Laws & Regulatory Compliance", type: "Core", credits: 3 },
          { code: "AFCA101", name: "CA Foundation: Mercantile Law & Quantitative Prep", type: "Professional", credits: 3 }
        ]
      },
      {
        semesterNumber: 2,
        title: "Semester II: Advanced Financial Accounting & Corporate Finance",
        professionalMilestone: "CA Foundation Examination",
        subjects: [
          { code: "AF201", name: "Higher Financial Accounting (Special Entities)", type: "Core", credits: 4 },
          { code: "AF202", name: "Principles of Corporate Finance", type: "Core", credits: 4 },
          { code: "AF203", name: "Applied Statistics for Financial Markets", type: "Allied", credits: 4 },
          { code: "AFL201", name: "Financial Modeling in Excel Lab I", type: "Practical Lab", credits: 3 },
          { code: "AFCA201", name: "CA Foundation Complete Test Series & Mock Drills", type: "Professional", credits: 3 }
        ]
      },
      {
        semesterNumber: 3,
        title: "Semester III: Corporate Accounting & Financial Analytics",
        professionalMilestone: "CA Inter: Corporate Law & Direct Tax Modules",
        subjects: [
          { code: "AF301", name: "Corporate Financial Accounting & Ind AS", type: "Core", credits: 4 },
          { code: "AF302", name: "Direct Taxation - Computation & Case Studies", type: "Core", credits: 4 },
          { code: "AF303", name: "Cost Analysis & Strategic Decision Systems", type: "Core", credits: 4 },
          { code: "AF304", name: "Financial Markets & Secondary Market Trading", type: "Allied", credits: 3 },
          { code: "AFCA301", name: "CA Inter Group 1 Classroom Practice", type: "Professional", credits: 3 }
        ]
      },
      {
        semesterNumber: 4,
        title: "Semester IV: Indirect Taxes (GST) & Security Analysis",
        professionalMilestone: "CA Inter Group 1 Examinations / Group 2 Preparation",
        subjects: [
          { code: "AF401", name: "Advanced Corporate Accounting & Consolidation", type: "Core", credits: 4 },
          { code: "AF402", name: "Indirect Tax Laws (GST & Customs Regulations)", type: "Core", credits: 4 },
          { code: "AF403", name: "Security Analysis & Fundamental Equity Valuation", type: "Core", credits: 4 },
          { code: "AFL401", name: "Tax Audit E-Filing & Financial Modeling Lab II", type: "Practical Lab", credits: 3 },
          { code: "AFCA401", name: "CA Inter: Taxation & Advanced Law Series", type: "Professional", credits: 3 }
        ]
      },
      {
        semesterNumber: 5,
        title: "Semester V: Portfolio Management, Auditing & Ethics",
        professionalMilestone: "CA Inter Group 2: Auditing & Financial Management",
        subjects: [
          { code: "AF501", name: "Portfolio Theory & Asset Management", type: "Core", credits: 4 },
          { code: "AF502", name: "Auditing & Assurance Standards", type: "Core", credits: 4 },
          { code: "AF503", name: "Financial Derivatives, Futures & Options", type: "Core", credits: 4 },
          { code: "AF504", name: "Corporate Restructuring & M&A Strategy", type: "Skill Based", credits: 3 },
          { code: "AFCA501", name: "CA Inter Group 2 Mock Question Papers", type: "Professional", credits: 3 }
        ]
      },
      {
        semesterNumber: 6,
        title: "Semester VI: Financial Engineering & Articleship Transition",
        professionalMilestone: "Articleship Placement Drives & Career Transition",
        subjects: [
          { code: "AF601", name: "International Finance & Forex Risk Management", type: "Core", credits: 4 },
          { code: "AF602", name: "Financial Risk Analytics & Python Modeling", type: "Practical Lab", credits: 4 },
          { code: "AF603", name: "Wealth Management & Private Equity", type: "Core", credits: 3 },
          { code: "AFP601", name: "Equity Research & Corporate Audit Project", type: "Practical Lab", credits: 4 },
          { code: "AFCA601", name: "Articleship Placement & Executive Personality Grooming", type: "Professional", credits: 3 }
        ]
      }
    ],
    careerOpportunities: [
      {
        role: "Investment Banking & Corporate Finance Associate",
        averagePackage: "₹7.0 - ₹13.0 LPA",
        topCompanies: ["HDFC Bank", "Morgan Stanley Advantage", "Nomura", "Crisil"],
        description: "Building detailed financial models, company pitch books, and enterprise valuations."
      },
      {
        role: "Chartered Accountant / Audit Senior",
        averagePackage: "₹7.5 - ₹14.5 LPA",
        topCompanies: ["BDO", "Grant Thornton", "Deloitte", "R. Subramanian and Company"],
        description: "Direct handling of corporate audit, tax compliance, and strategic management reviews."
      },
      {
        role: "Equity Research Analyst / Wealth Manager",
        averagePackage: "₹6.0 - ₹10.5 LPA",
        topCompanies: ["Motilal Oswal", "Kotak Securities", "ICICI Securities"],
        description: "Analyzing company earnings, financial statements, and recommending portfolio allocations."
      }
    ]
  },
  {
    id: "bcom-banking-finance-cma",
    code: "BCOM-BF-05",
    name: "B.Com Banking & Finance with CMA",
    shortName: "B.Com (B&F) with CMA",
    tagline: "Strategic Cost Control, Management Accounting & Commercial Banking Specialization",
    integratedCertification: "Cost & Management Accountancy (CMA - ICMAI)",
    certificationType: "CMA",
    affiliation: "Bharathiar University, Coimbatore",
    duration: "3 Years (6 Semesters)",
    mode: "Full Time - On Campus",
    totalSemesters: 6,
    eligibility: "HSC (+2) in Commerce / Accountancy / Economics / Mathematics with min 50%",
    minimumMarks: "50% aggregate in Higher Secondary Examination",
    description: "B.Com Banking & Finance with CMA (Cost & Management Accountancy - ICMAI) produces professionals who can steer business profitability, cost efficiency, and treasury operations. Students gain deep knowledge in managerial costing, operational efficiency, modern banking technologies, and commercial credit appraisal.",
    colorTheme: {
      primary: "from-amber-950 to-stone-900",
      secondary: "bg-amber-50 text-amber-900",
      accent: "text-amber-600",
      border: "border-amber-200",
      bgBadge: "bg-amber-100 text-amber-800",
      textBadge: "text-amber-900"
    },
    keyHighlights: [
      "Integrated coaching for ICMAI CMA Foundation and Intermediate examinations",
      "Specialized curriculum on Strategic Cost Management, Operational Analysis, and Cost Auditing",
      "In-depth training on Commercial Banking, Credit Appraisal, NPA Management, and Treasury Operations",
      "Hands-on FinTech, CBS (Core Banking Solutions) simulations, and Advanced Excel modeling"
    ],
    dualAdvantagePoints: [
      "CMA credential is highly sought after across manufacturing, defense, energy, infrastructure, and banking sectors",
      "Faculty includes practicing Cost Accountants (FCMA/ACMA) and seasoned banking executives",
      "Concurrent preparation eliminates post-degree coaching delays",
      "High placement conversion into Public Sector Undertakings (PSUs), MNC manufacturing units, and top banks"
    ],
    exemptionsOrExams: "Integrated ICMAI CMA Foundation and CMA Intermediate Group 1 & 2 coaching curriculum.",
    idealFor: "Students targeting careers as Cost Accountants, Management Controllers, Commercial Bankers, or PSU Finance Officers.",
    seatsIntake: 60,
    imageUrl: bcomCmaImg,
    toolsAndCertifications: [
      "ICMAI CMA Foundation & Inter",
      "Cost Accounting Standards (CAS)",
      "Core Banking Systems (CBS) Simulation",
      "SAP FICO & Tally Prime Cost Centers"
    ],
    semesters: [
      {
        semesterNumber: 1,
        title: "Semester I: Principles of Accounting & Banking Fundamentals",
        professionalMilestone: "CMA Foundation Induction & Business Economics",
        subjects: [
          { code: "BF101", name: "Financial Accounting Basics & Concepts", type: "Core", credits: 4 },
          { code: "BF102", name: "Principles of Banking & Financial Institutions", type: "Core", credits: 4 },
          { code: "BF103", name: "Business Mathematics & Commercial Statistics", type: "Allied", credits: 4 },
          { code: "BF104", name: "Business Law & Commercial Ethics", type: "Core", credits: 3 },
          { code: "CMA101", name: "CMA Foundation: Fundamentals of Economics & Law", type: "Professional", credits: 3 }
        ]
      },
      {
        semesterNumber: 2,
        title: "Semester II: Cost Concepts & CMA Foundation Exam",
        professionalMilestone: "ICMAI CMA Foundation Examination",
        subjects: [
          { code: "BF201", name: "Financial Accounting II (Corporate)", type: "Core", credits: 4 },
          { code: "BF202", name: "Fundamentals of Cost Accounting", type: "Core", credits: 4 },
          { code: "BF203", name: "Banking Regulations & Negotiable Instruments Act", type: "Core", credits: 4 },
          { code: "BFL201", name: "Banking Technology & Spreadsheets Lab", type: "Practical Lab", credits: 3 },
          { code: "CMA201", name: "CMA Foundation Mock Exam Series", type: "Professional", credits: 3 }
        ]
      },
      {
        semesterNumber: 3,
        title: "Semester III: Strategic Cost Accounting & Commercial Banking",
        professionalMilestone: "CMA Inter Group 1: Cost Accounting & Financial Accounting",
        subjects: [
          { code: "BF301", name: "Advanced Cost Accounting (Methods & Techniques)", type: "Core", credits: 4 },
          { code: "BF302", name: "Corporate Direct Taxation Law", type: "Core", credits: 4 },
          { code: "BF303", name: "Commercial Banking Operations & Credit Management", type: "Core", credits: 4 },
          { code: "BF304", name: "Rural Banking & Microfinance", type: "Allied", credits: 3 },
          { code: "CMA301", name: "CMA Inter: Cost Accounting Standards (CAS)", type: "Professional", credits: 3 }
        ]
      },
      {
        semesterNumber: 4,
        title: "Semester IV: Management Accounting & GST in Banking",
        professionalMilestone: "CMA Inter Group 1 Exams / Group 2 Preparation",
        subjects: [
          { code: "BF401", name: "Management Accounting for Operational Decisions", type: "Core", credits: 4 },
          { code: "BF402", name: "Indirect Taxation (GST on Banking & Financial Services)", type: "Core", credits: 4 },
          { code: "BF403", name: "Treasury Management & Foreign Exchange Operations", type: "Core", credits: 4 },
          { code: "BFL401", name: "Tally Prime Cost Centers & SAP FICO Intro Lab", type: "Practical Lab", credits: 3 },
          { code: "CMA401", name: "CMA Inter: Direct & Indirect Tax Practice Series", type: "Professional", credits: 3 }
        ]
      },
      {
        semesterNumber: 5,
        title: "Semester V: Operations Management & Strategic Cost Management",
        professionalMilestone: "CMA Inter Group 2: Operations Management & Cost Audit",
        subjects: [
          { code: "BF501", name: "Operations Management & Strategic Cost Control", type: "Core", credits: 4 },
          { code: "BF502", name: "Financial Management & Capital Restructuring", type: "Core", credits: 4 },
          { code: "BF503", name: "Cost & Management Audit Standards", type: "Core", credits: 4 },
          { code: "BF504", name: "Investment Banking & Risk Analysis", type: "Skill Based", credits: 3 },
          { code: "CMA501", name: "CMA Inter Group 2 Mock Exams", type: "Professional", credits: 3 }
        ]
      },
      {
        semesterNumber: 6,
        title: "Semester VI: FinTech, Corporate Valuation & Industry Transition",
        professionalMilestone: "CMA Articleship / Corporate Placement Drives",
        subjects: [
          { code: "BF601", name: "FinTech, Digital Banking & Cyber Security in Finance", type: "Core", credits: 4 },
          { code: "BF602", name: "Business Valuation & Financial Analytics Lab", type: "Practical Lab", credits: 4 },
          { code: "BF603", name: "Corporate Financial Reporting & Ethics", type: "Core", credits: 3 },
          { code: "BFP601", name: "Commercial Banking / Cost Audit Internship Project", type: "Practical Lab", credits: 4 },
          { code: "CMA601", name: "CMA Professional Placement Readiness & Interview Bootcamp", type: "Professional", credits: 3 }
        ]
      }
    ],
    careerOpportunities: [
      {
        role: "Cost & Management Accountant (CMA)",
        averagePackage: "₹6.5 - ₹12.5 LPA",
        topCompanies: ["Tata Motors", "L&T Construction", "Steel Authority of India (SAIL)", "BHEL"],
        description: "Implementing cost control mechanisms, supply chain costing, and statutory cost audit reports."
      },
      {
        role: "Commercial Credit Analyst / Branch Manager",
        averagePackage: "₹5.5 - ₹10.0 LPA",
        topCompanies: ["HDFC Bank", "State Bank of India", "Axis Bank", "Federal Bank"],
        description: "Appraising corporate loan proposals, risk mitigation, and managing branch asset portfolios."
      },
      {
        role: "Operations & Treasury Controller",
        averagePackage: "₹6.0 - ₹11.0 LPA",
        topCompanies: ["Reliance Industries", "Adani Group", "Siemens India"],
        description: "Managing corporate liquidity, foreign exchange hedging, and working capital optimization."
      }
    ]
  }
];

export const DUAL_PATH_MATRIX = [
  {
    step: "01",
    time: "8:30 AM - 1:00 PM",
    title: "University Academic Sessions",
    description: "Core Bharathiar University syllabus taught with rigorous academic depth covering Accounting, Law, Taxation, Economics, and Management.",
    badge: "B.Com Degree Focus",
    icon: "GraduationCap"
  },
  {
    step: "02",
    time: "1:45 PM - 4:15 PM",
    title: "Integrated Professional Body Coaching",
    description: "Specialized CA / ACCA / CMA modules delivered by practicing Chartered Accountants, Cost Accountants, and ACCA certified professionals.",
    badge: "Professional Mastery",
    icon: "Award"
  },
  {
    step: "03",
    time: "4:30 PM - 5:30 PM",
    title: "Daily Practice Drills & Mock Labs",
    description: "Chapter-wise revision test series, doubt clearing clinics, computer labs (Tally, Excel, SAP, Python), and past exam paper analysis.",
    badge: "Exam Simulation",
    icon: "CheckCircle2"
  },
  {
    step: "04",
    time: "Semester Breaks & Year 3",
    title: "Articleship & Corporate Placements",
    description: "Exclusive campus placement drives, resume workshops, Big 4 interview preparation, and assistance with ICAI/CMA mandatory articleship.",
    badge: "Career Launch",
    icon: "Briefcase"
  }
];

export const CAMPUS_FACILITIES = [
  {
    id: "finance-lab",
    title: "Digital Finance & Analytics Lab",
    description: "State-of-the-art computer center equipped with Tally Prime, SAP FICO simulation, Python for Finance, and Advanced Excel financial modeling suites.",
    icon: "Monitor",
    highlight: "100+ High-Performance Terminals"
  },
  {
    id: "ca-library",
    title: "Exclusive CA / ACCA / CMA Study Library",
    description: "Comprehensive repository of official ICAI study materials, ACCA Kaplan/BPP sets, ICMAI scanner guides, national finance journals, and quiet reading pods.",
    icon: "BookOpen",
    highlight: "Open till late evening for aspirants"
  },
  {
    id: "smart-classes",
    title: "Interactive Smart Classrooms",
    description: "Acoustically designed lecture halls with audio-visual projection, interactive smart boards, and recorded lecture backups for missed classes.",
    icon: "Layers",
    highlight: "Air-Conditioned & Ergonomic"
  },
  {
    id: "hostel-dining",
    title: "Secure On-Campus Hostels",
    description: "Separate, secure hostel facilities for boys and girls with hygienic multi-cuisine dining, 24/7 security, Wi-Fi connectivity, and in-house warden support.",
    icon: "Home",
    highlight: "Nutritious & Safe Environment"
  },
  {
    id: "transport",
    title: "Extensive Transport Connectivity",
    description: "Dedicated college bus network connecting across Erode, Tirupur, Coimbatore, Perundurai, Vijayamangalam, Uthukuli, and surrounding hubs.",
    icon: "Bus",
    highlight: "Spans 50+ Key Pickup Routes"
  },
  {
    id: "sports-auditorium",
    title: "Auditorium & Sports Arena",
    description: "500-seater air-conditioned auditorium for national conferences, guest lectures, commerce fests, alongside sports courts for fitness and recreation.",
    icon: "Trophy",
    highlight: "Holistic Student Development"
  }
];

export const FAQS_DATA = [
  {
    question: "How does RDCCPS manage both B.Com university syllabus and CA / ACCA / CMA coaching simultaneously?",
    answer: "Our curriculum is engineered with synchronized timetables. Morning hours (8:30 AM - 1:00 PM) cover Bharathiar University degree coursework, while afternoon hours (1:45 PM - 4:15 PM) are dedicated exclusively to professional coaching (ICAI/ACCA/ICMAI) taught by practicing professionals. This eliminates the burden of outside tuition and optimizes your study time."
  },
  {
    question: "What is the key difference between B.Com (General) with CA and B.Com (Professional Accounting) with CA?",
    answer: "Both programs integrate full CA coaching. B.Com Professional Accounting has a university syllabus customized to map even closer to ICAI's Intermediate curriculum, minimizing subject redundancy. B.Com General offers broader commercial foundation subjects alongside CA coaching."
  },
  {
    question: "What international career opportunities are opened by B.Com Finance with ACCA (UK)?",
    answer: "ACCA is recognized in over 180 countries. Graduates of this program are actively hired by Big 4 Global Delivery Centers (EY GDS, Deloitte USI, PwC AC, KPMG) in India and international multinational banks across the Middle East, UK, Singapore, and Canada for global accounting and advisory roles."
  },
  {
    question: "Does RDCCPS provide assistance for CA Articleship and campus placements?",
    answer: "Yes. Our Corporate Relations and Placement Cell has tie-ups with leading Chartered Accounting firms, mid-tier audit firms, and corporate multinationals across Erode, Coimbatore, Chennai, and Bangalore. We conduct mock interviews, resume bootcamps, and direct articleship recruitment drives on campus."
  },
  {
    question: "Are merit scholarships and hostel accommodations available for outstation students?",
    answer: "Yes, RDCCPS awards generous merit scholarships for students with 80%+ and 90%+ marks in their Higher Secondary (+2) examinations. We also provide secure, well-maintained on-campus hostels with hygienic vegetarian/non-vegetarian dining for both boys and girls."
  }
];

export const TESTIMONIALS = [
  {
    name: "Karthik R.",
    course: "B.Com (Professional Accounting) with CA",
    batch: "Cleared CA Inter in 1st Attempt",
    company: "Articleship Trainee at Top Tier CA Firm, Chennai",
    quote: "The synchronized coaching at RDCCPS saved me over 3 hours of daily travel to outside coaching centers. The faculty's focus on ICAI mock test papers made CA Inter so much more approachable."
  },
  {
    name: "Priyadharshini S.",
    course: "B.Com Finance with ACCA",
    batch: "ACCA Affiliate",
    company: "Audit Associate at EY Global Delivery Services",
    quote: "RDCCPS gave me the confidence to compete globally. Learning IFRS alongside our university degree opened the doors for my immediate placement in the Big 4 before my final semester exams."
  },
  {
    name: "Vigneshwaran M.",
    course: "B.Com Banking & Finance with CMA",
    batch: "CMA Intermediate Cleared",
    company: "Management Trainee at L&T Infrastructure Finance",
    quote: "The faculty consists of practicing CMAs who teach real-world costing cases. The computer labs with Tally and SAP FICO gave me practical skills that set me apart in campus interviews."
  }
];
