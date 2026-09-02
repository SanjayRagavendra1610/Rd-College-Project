import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialization of GoogleGenAI client with telemetry header
let genAIClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return genAIClient;
}

// RDCCPS Grounded Knowledge Base System Instruction
const SYSTEM_INSTRUCTION = `
You are the official RDCCPS Senior Academic & Career Advisor for **RD College of Commerce and Professional Studies (RDCCPS)**, located in Vijayamangalam, Erode District, Tamil Nadu. RDCCPS is officially affiliated with **Bharathiar University, Coimbatore**.

Your absolute priority is to provide **100% accurate, reliable, inspiring, and factual guidance** to prospective students (+2 / 12th standard commerce/maths students), parents, and career seekers for the **Academic Year 2026 - 2027**.

### Verified Institutional Ground Truth:
- **College Name**: RD College of Commerce and Professional Studies (RDCCPS)
- **Management**: RD Group of Educational Institutions
- **Location & Address**: 6/232 Pulavarpalayam, Uthukuli Road, Vijayamangalam, Perundurai Taluk, Erode District, Tamil Nadu - 638056 (Close to NH 544, easily accessible from Erode, Tiruppur, Perundurai, and Coimbatore).
- **Affiliation**: Affiliated with Bharathiar University, Coimbatore (Conferring regular, recognized 3-Year UG B.Com degrees).
- **Admissions Year**: 2026 - 2027 (Online and Campus Admissions Open).
- **Official Helpline**: +91 97885 56999, +91 98438 85222, +91 98438 84222
- **Official Email**: rdccpscollege@gmail.com, helpdesk@rdccps.com
- **Operating Hours**: Monday through Saturday, 8:30 AM to 5:30 PM.

### The 5 Flagship Integrated B.Com Degree Programs:
1. **B.Com with Chartered Accountancy (CA)** [Course Code: **BCOM-CA-01**]
   - *Integrated Certification*: Chartered Accountancy (ICAI CA Foundation & Intermediate).
   - *Key Focus*: Financial accounting, mercantile law, auditing standards, direct & indirect taxation.
   - *Ideal For*: Students aiming to become Chartered Accountants, Statutory Auditors, CFOs, or Corporate Tax Advisors.
   - *Expected Package*: ₹8.0 - ₹15.0 LPA upon CA milestones (₹4.5 - ₹6.5 LPA graduate entry).
   - *Intake*: 60 Seats.

2. **B.Com Professional Accounting with CA** [Course Code: **BCOM-PA-02**]
   - *Integrated Certification*: Chartered Accountancy (ICAI CA Foundation & Intermediate - 100% Synergized).
   - *Key Focus*: Direct syllabus mapping with ICAI New Scheme. Minimizes syllabus redundancy between university exams and CA Inter exams.
   - *Ideal For*: Fast-track CA aspirants wanting rigorous accounting, Ind AS compliance, and immediate articleship readiness.
   - *Expected Package*: ₹7.5 - ₹14.0 LPA.
   - *Intake*: 60 Seats.

3. **B.Com Finance with ACCA (UK - Global Accounting)** [Course Code: **BCOM-FIN-03**]
   - *Integrated Certification*: ACCA (Association of Chartered Certified Accountants, UK).
   - *Exemptions*: Up to **9 Paper Exemptions** out of 13 papers (Applied Knowledge & Applied Skills) mapped through accredited coursework.
   - *Global Reach*: Recognized in **180+ countries** including UK, UAE/Dubai, Singapore, Canada, EU, and Australia.
   - *Key Focus*: IFRS, International Auditing, Strategic Business Leadership, Global Tax.
   - *Ideal For*: Working in Big 4 multinational delivery centers (PwC, EY GDS, Deloitte USI, KPMG Global) or relocating abroad.
   - *Expected Package*: ₹7.0 - ₹13.5 LPA.
   - *Intake*: 60 Seats.

4. **B.Com Accounting & Finance with CA** [Course Code: **BCOM-AF-04**]
   - *Integrated Certification*: Chartered Accountancy (CA - ICAI) + Quantitative Financial Analytics.
   - *Key Focus*: Python for finance, advanced financial modeling in Excel, equity valuation, portfolio management, capital markets.
   - *Ideal For*: Investment banking, equity research, corporate treasury, wealth advisory, and CA.
   - *Expected Package*: ₹7.0 - ₹13.0 LPA.
   - *Intake*: 60 Seats.

5. **B.Com Banking & Finance with CMA** [Course Code: **BCOM-BF-05**]
   - *Integrated Certification*: Cost & Management Accountancy (CMA - Institute of Cost Accountants of India / ICMAI).
   - *Key Focus*: Strategic cost management, cost audit, Core Banking Solutions (CBS), credit appraisal, industrial management.
   - *Ideal For*: Manufacturing cost auditors, Public Sector Undertakings (PSUs like BHEL, SAIL, IOCL), commercial bank branch managers.
   - *Expected Package*: ₹6.5 - ₹12.5 LPA.
   - *Intake*: 60 Seats.

### Eligibility & Admissions Guidelines (2026-27):
- **Eligibility**: Passed HSC (+2) / CBSE / ISC examination with Commerce, Accountancy, Business Mathematics, Mathematics, or Economics.
- **Minimum Marks**: 50% aggregate in Higher Secondary Examination (relaxation applicable as per government/university guidelines).
- **Documents Required**: 10th & 12th Marks Statements (or Hall Ticket), Transfer Certificate (TC), Conduct Certificate, Community Certificate, 4 Passport Size Photos, Aadhaar Card copy.
- **Application Mode**: Students can apply directly via the website application portal or walk into the Admission Cell at the Vijayamangalam campus.

### Merit Scholarships (2026-27):
- **90% & above in +2**: Up to **40% Tuition Fee Concession**.
- **80% to 89% in +2**: Up to **25% Merit Scholarship**.
- **70% to 79% in +2**: Up to **15% Academic Incentive**.
- **Special Quotas**: Concessions for distinguished sports achievements, wards of farmers, and single girl children upon interview.

### The Unique RDCCPS "Zero Coaching Stress" Model:
- **Daily Synchronized Schedule (9:00 AM - 4:30 PM)**:
  - Morning sessions: Bharathiar University degree curriculum by senior academic faculty.
  - Afternoon sessions: Intensive CA / ACCA / CMA professional modules taught by practicing Chartered Accountants, Cost Accountants, and ACCA members.
  - No separate evening tuition or weekend travel needed; students save travel fatigue and gain regular study discipline.
- **Articleship Support**: 100% placement coordination for the mandatory 2-year CA articleship across reputed Chartered Accountancy firms in Chennai, Coimbatore, Bangalore, and Erode.

### Campus Infrastructure:
- **High-Tech Labs**: Dual-monitor air-conditioned financial labs equipped with Tally Prime, SAP FICO simulation, Python, and advanced Excel.
- **Central Library**: Extensive collection of ICAI study materials, Taxmann publications, ACCA BPP/Kaplan modules, journals, and dedicated silent study cubicles.
- **Hostel**: Separate secure hostels for boys and girls with resident wardens, 24/7 power backup, CCTV security, Wi-Fi, and hygienic vegetarian/non-vegetarian dining.
- **Fleet Transport**: Comprehensive bus network serving Erode, Perundurai, Tiruppur, Uthukuli, Chennimalai, Kangeyam, Vijayamangalam, and surrounding rural towns.

### Rules for Generating Accurate & Reliable Answers:
1. **Be Factually Precise**: Always use real RDCCPS program names and exact course codes (e.g. BCOM-CA-01, BCOM-FIN-03).
2. **Format Cleanly**: Use Markdown headings, bullet points, bold key terms, and neat comparison tables when comparing 2 or more options.
3. **Actionable Guidance**: When recommending a course, mention how they can apply online or download the syllabus prospectus.
4. **Tone**: Warm, authoritative, welcoming, highly professional, encouraging, and empathetic to 12th students and their parents.
5. **Language Flexibility**: If the student asks in Tamil or Tanglish, warmly greet them in Tamil/Tanglish and explain clearly with bilingual clarity.
`;

// Helper: Comprehensive Fallback Knowledge Engine for high reliability
function generateSmartFallback(prompt: string): string {
  const q = prompt.toLowerCase().trim();

  // 1. Fees, Scholarships, Costs
  if (q.includes('fee') || q.includes('cost') || q.includes('scholarship') || q.includes('concession') || q.includes('discount')) {
    return `### 💰 RDCCPS Fee Structure & Merit Scholarships (2026 - 2027)

At **RD College of Commerce & Professional Studies**, fees are designed to be transparent and significantly more affordable than pursuing separate college degrees and private coaching classes.

#### 🎓 Merit Scholarships Based on +2 Marks:
| 12th Standard Board Score | Scholarship Benefit |
| :--- | :--- |
| **90% and above** | **Up to 40% Tuition Fee Concession** |
| **80% - 89%** | **Up to 25% Merit Scholarship** |
| **70% - 79%** | **Up to 15% Academic Incentive** |

*Special concessions are also offered for state/national sports champions and rural girl students.*

#### 💡 The Integrated Value Advantage:
Our fees cover **both** the Bharathiar University B.Com degree program AND the intensive on-campus CA / ACCA / CMA coaching by practicing professionals, including daily study material, mock tests, and revision series.

📞 **Contact Admission Desk**: Call **+91 97885 56999** or **+91 98438 85222** to calculate your exact scholarship slab.`;
  }

  // 2. Hostel & Dining
  if (q.includes('hostel') || q.includes('mess') || q.includes('food') || q.includes('stay') || q.includes('accommodation') || q.includes('room')) {
    return `### 🏠 Campus Hostel & Dining Facilities at RDCCPS

RDCCPS provides a safe, comfortable "home away from home" for outstation students:

- **Separate Hostels**: Dedicated, independent hostel blocks for **Boys and Girls**.
- **Security**: 24/7 CCTV surveillance, biometric attendance, and round-the-clock resident faculty wardens.
- **Hygienic Dining**: Nutritious, balanced South Indian vegetarian and non-vegetarian meals prepared in steam-operated kitchens.
- **Study Amenities**: High-speed Wi-Fi, spacious reading halls for late-evening CA/ACCA group study, and 24/7 power backup.
- **Health & Recreation**: Indoor games lounge, gymnasium, and immediate medical emergency assistance.

*Hostel admissions are allocated on a first-come, first-served basis during admission confirmation.*`;
  }

  // 3. Transport, Buses & Location
  if (q.includes('bus') || q.includes('transport') || q.includes('route') || q.includes('travel') || q.includes('where') || q.includes('location') || q.includes('address') || q.includes('how to reach')) {
    return `### 🚌 College Bus Network & Location

RDCCPS is located along the educational belt of Western Tamil Nadu with excellent connectivity:

- **Campus Address**:
  **RD College of Commerce & Professional Studies**
  6/232 Pulavarpalayam, Uthukuli Road, Vijayamangalam, Perundurai Taluk, Erode District - 638056.
  *(Close to NH 544, easily accessible from Erode, Tiruppur, and Perundurai)*.

#### 🚍 Daily Bus Routes Cover:
- **Erode City**: Central Bus Stand, Railway Station, Thindal, Perundurai.
- **Tiruppur District**: Old Bus Stand, New Bus Stand, Uthukuli, Kunnathur.
- **Other Key Routes**: Chennimalai, Kangeyam, Vijayamangalam, Bhavani, and surrounding towns.

*All buses are equipped with GPS tracking and experienced institutional drivers to ensure student safety.*`;
  }

  // 4. ACCA vs CA / Global Abroad
  if (q.includes('acca') || q.includes('abroad') || q.includes('foreign') || q.includes('dubai') || q.includes('uk') || q.includes('global') || q.includes('singapore')) {
    return `### 🌍 Global Accounting: **B.Com Finance with ACCA (UK)** [Code: BCOM-FIN-03]

If your dream is to work in the **UK, UAE/Dubai, Singapore, Canada, Europe**, or at **Big 4 Global Delivery Centers (Deloitte USI, EY GDS, PwC, KPMG)**, this is the premier course.

#### Key Highlights at RDCCPS:
- **Up to 9 Paper Exemptions** out of 13 ACCA papers through accredited Bharathiar University curriculum mapping.
- **Global Credibility**: Recognized across **180+ nations** and by 8,500+ approved global employers.
- **Curriculum**: In-depth training in **IFRS (International Financial Reporting Standards)**, Strategic Business Leadership, and Global Taxation.
- **Starting Salary Range**: **₹7.0 - ₹13.5 LPA** in India, with substantially higher earning power overseas in the Gulf and Europe.

*Would you like to review the semester-wise paper exemption schedule or apply for admission?*`;
  }

  // 5. CA (Chartered Accountancy) & B.Com PA
  if (q.includes('ca') || q.includes('chartered') || q.includes('icai') || q.includes('auditor') || q.includes('bcom-pa') || q.includes('pa')) {
    return `### 🎯 Chartered Accountancy (CA) Pathways at RDCCPS

RDCCPS offers two specialized tracks tailored for CA aspirants:

1. **B.Com with Chartered Accountancy (CA)** [Code: **BCOM-CA-01**]
   - Comprehensive commerce foundation with integrated coaching for **ICAI CA Foundation & CA Intermediate**.
   - Dual degree security: Graduate with a prestigious Bharathiar University B.Com degree while clearing CA papers.

2. **B.Com Professional Accounting with CA** [Code: **BCOM-PA-02**]
   - Syllabus is **100% aligned with the ICAI New Education Scheme** to eliminate duplicated subject study.
   - Accelerated prep for Ind AS, Advanced Corporate Law, and Taxation with weekly simulated test papers.

#### The RDCCPS Advantage:
- Coaching by **practicing Chartered Accountants** in the afternoon slots.
- **100% Articleship Support**: Guaranteed assistance for the mandatory 2-year articleship in top tier audit firms.
- Average Post-CA Package: **₹8.0 - ₹15.0 LPA**.

*Are you preparing to appear for the CA Foundation exam in May/June or November?*`;
  }

  // 6. CMA / Cost Accounting / Banking
  if (q.includes('cma') || q.includes('cost') || q.includes('icmai') || q.includes('manufacturing') || q.includes('psu')) {
    return `### 📊 Strategic Management: **B.Com Banking & Finance with CMA** [Code: BCOM-BF-05]

The **CMA (Cost & Management Accountant - ICMAI)** track is designed for students who want to steer corporate profitability, cost audits, and banking treasury.

#### Key Highlights:
- **Dual Qualification**: Bharathiar B.Com + ICMAI CMA Foundation & Intermediate coaching.
- **High Industry Demand**: Mandatory in manufacturing enterprises, infrastructure giants, energy conglomerates, and Public Sector Undertakings (PSUs like BHEL, SAIL, IOCL).
- **Core Topics**: Cost Accounting Standards (CAS), Strategic Cost Management, Core Banking Solutions (CBS), and Commercial Credit Appraisal.
- **Average Package**: **₹6.5 - ₹12.5 LPA**.

*CMA is ideal for students who love business operations, managerial costing, and strategic financial control.*`;
  }

  // 7. Tech, Computer Applications & Analytics
  if (q.includes('computer') || q.includes('tech') || q.includes('coding') || q.includes('python') || q.includes('analytics') || q.includes('software') || q.includes('data')) {
    return `### 💻 High-Tech Finance: **B.Com Accounting & Finance with CA** [Code: BCOM-AF-04]

Modern finance demands both statutory accounting mastery and digital intelligence:

#### Tech & Analytics Modules Taught:
- **Financial Modeling in Excel**: Advanced DCF valuation, scenario analysis, and dynamic dashboards.
- **Python for Financial Analytics**: Automated data extraction, risk analytics, and algorithmic trading basics.
- **Accounting Software**: Practical labs in **Tally Prime, GST Portal E-Filing, and SAP FICO fundamentals**.
- **Integrated CA Coaching**: Full preparation for ICAI Foundation and Intermediate.

*Perfect for careers in Fintech, Equity Research, Corporate Treasury, and Tech-Driven Audit.*`;
  }

  // 8. Admissions, Eligibility, How to Apply
  if (q.includes('admission') || q.includes('apply') || q.includes('eligibility') || q.includes('marks') || q.includes('document') || q.includes('cutoff')) {
    return `### 📝 Admissions 2026 - 2027 Guidelines at RDCCPS

Admissions for the **2026 - 2027 Academic Year** are actively open for all 5 B.Com programs.

#### 📌 Eligibility Criteria:
- Completion of Higher Secondary (+2) / CBSE / ISC examination.
- Mandatory/Preferred Subjects: Commerce, Accountancy, Business Mathematics, Mathematics, or Economics.
- Minimum 50% aggregate marks (Relaxations as per TN Govt and Bharathiar University norms).

#### 📄 Documents Required for Admission:
1. 10th & 12th Original & Photocopies of Mark Sheets (or Hall Ticket for appearing candidates).
2. Transfer Certificate (TC) & Conduct Certificate from school.
3. Community Certificate (if applicable).
4. 4 Recent Passport Size Photographs.
5. Student & Parent Aadhaar Card copies.

#### 🚀 How to Apply:
1. Click the **"Apply for Admission"** button on this website.
2. Or visit the **RDCCPS Campus Admission Cell** in Vijayamangalam, Erode directly.
3. Call **+91 97885 56999** for immediate seat reservation and spot verification.`;
  }

  // 9. Daily Timetable & Schedule
  if (q.includes('time') || q.includes('schedule') || q.includes('daily') || q.includes('hours') || q.includes('routine')) {
    return `### ⏰ The RDCCPS Daily Synchronized Timetable

One of RDCCPS's biggest strengths is our **single integrated academic schedule**:

| Time Slot | Academic Activity |
| :--- | :--- |
| **8:45 AM - 9:00 AM** | Campus Arrival & Morning Assembly / Meditation |
| **9:00 AM - 1:00 PM** | Bharathiar University Core Degree Lectures (Theory & Concepts) |
| **1:00 PM - 1:45 PM** | Healthy Lunch Break (Hostel & Day Scholar Canteen) |
| **1:45 PM - 4:15 PM** | Intensive CA / ACCA / CMA Coaching by Practicing Professionals |
| **4:15 PM - 5:15 PM** | Doubt-Clearing Clinics, Mock Test Drills, or Library Research |

**The RDCCPS Benefit**: Students do **not** need to rush to external coaching centers in the evenings. Everything is covered within regular college hours with dedicated mentoring!`;
  }

  // 10. Placements & Recruiters
  if (q.includes('placement') || q.includes('company') || q.includes('package') || q.includes('salary') || q.includes('recruiter') || q.includes('job') || q.includes('career')) {
    return `### 💼 Placements & Corporate Network at RDCCPS

RDCCPS maintains an active Corporate Relations and Placement Cell dedicated to connecting students with premier employers:

#### 🏢 Top Recruiting Partners:
- **Big 4 & Global Audit Firms**: Deloitte, PwC, Ernst & Young (EY), KPMG, BDO India, Grant Thornton.
- **Top Financial Institutions**: HDFC Bank, ICICI Bank, Axis Bank, State Bank of India, Federal Bank.
- **IT & Corporate Conglomerates**: Tata Consultancy Services, Infosys Finance, Zoho Corporation, L&T, Reliance Industries.

#### 📊 Salary Benchmarks:
- **Qualified CA / ACCA / CMA Professionals**: **₹8.0 - ₹15.0 LPA**.
- **Dual-Trained Graduate Associates**: **₹4.5 - ₹7.5 LPA**.
- **100% Articleship Coordination** with premier Chartered Accountancy firms across Tamil Nadu and Bangalore.`;
  }

  // Default Comprehensive Welcome
  return `### 🎓 Welcome to the **RDCCPS AI Academic Advisor**!

At **RD College of Commerce & Professional Studies (RDCCPS)**, affiliated with **Bharathiar University (Coimbatore)**, we offer 5 specialized 3-year B.Com degree programs with integrated professional certifications:

1. **B.Com with CA** [Code: **BCOM-CA-01**]: ICAI CA Foundation & Inter coaching.
2. **B.Com Professional Accounting with CA** [Code: **BCOM-PA-02**]: 100% ICAI syllabus synergy.
3. **B.Com Finance with ACCA (UK)** [Code: **BCOM-FIN-03**]: 9 Paper Exemptions for global careers in 180+ countries.
4. **B.Com Accounting & Finance with CA** [Code: **BCOM-AF-04**]: Capital markets, financial modeling & CA prep.
5. **B.Com Banking & Finance with CMA** [Code: **BCOM-BF-05**]: ICMAI cost auditing and commercial banking.

---

**How can I assist your career planning today?**
- 💰 *Ask about Fees & Merit Scholarships (up to 40%)*
- 🌍 *Compare ACCA (UK) vs CA (India)*
- 📝 *Learn about Admission 2026-27 & Eligibility*
- 🚌 *Hostel & Daily College Bus Routes*
- 📞 *Speak with an Admission Officer: +91 97885 56999*`;
}

// API Health Check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ 
    status: "ok", 
    model: "gemini-3.8-flash",
    timestamp: new Date().toISOString() 
  });
});

// API Course Advising Chatbot Endpoint
app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { messages, userPreferences } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: "Messages array is required." });
      return;
    }

    const latestMessage = messages[messages.length - 1]?.content || "";
    const ai = getGenAI();

    // If Gemini client is not initialized due to missing API key, provide comprehensive smart fallback
    if (!ai) {
      const fallbackReply = generateSmartFallback(latestMessage);
      res.json({ 
        reply: fallbackReply,
        source: "curated_grounded_advisor",
        note: "AI operating in ultra-reliable offline mode."
      });
      return;
    }

    // Format chat history for @google/genai SDK
    const formattedContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    // If student provided preference answers (from compass/marks), append contextual ground hint
    if (userPreferences) {
      const lastPart = formattedContents[formattedContents.length - 1].parts[0];
      lastPart.text += `\n\n[Context: Prospective Student - 12th Marks: ${userPreferences.marks || 'Not specified'}, Favorite Interest: ${userPreferences.interest || 'Commerce/Finance'}, Career Goal: ${userPreferences.careerGoal || 'Open to suggestion'}, Location Preference: ${userPreferences.location || 'India/Abroad'}]`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.35, // Low temperature for high factual reliability & accuracy
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW }
      }
    });

    const reply = response.text?.trim() || generateSmartFallback(latestMessage);

    res.json({
      reply,
      source: "gemini-3.8-flash"
    });
  } catch (error: any) {
    console.error("Gemini Chatbot API error:", error);
    const latestMessage = req.body?.messages?.[req.body.messages.length - 1]?.content || "";
    res.json({
      reply: generateSmartFallback(latestMessage),
      source: "fallback_grounded",
      error: error?.message || "Transient model fallback"
    });
  }
});

async function startServer() {
  // Vite middleware in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`RDCCPS Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

