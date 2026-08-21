import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialization of GoogleGenAI client
let genAIClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({ apiKey });
  }
  return genAIClient;
}

// RDCCPS Knowledge Base System Instruction
const SYSTEM_INSTRUCTION = `
You are the official RDCCPS AI Academic & Career Counselor for RD College of Commerce & Professional Studies (RDCCPS), located in Vijayamangalam, Erode, Tamil Nadu, affiliated with Bharathiar University, Coimbatore.

Your mission is to help prospective 12th standard (+2) students, parents, and commerce aspirants find their ideal undergraduate degree and dual-qualification professional pathway (Academic Year 2026 - 2027).

### About RDCCPS:
- **Institution**: RD College of Commerce and Professional Studies (RDCCPS).
- **Location**: 6/232 Pulavarpalayam, Uthukuli Road, Vijayamangalam, Perundurai, Erode, Tamil Nadu - 638056.
- **Affiliation**: Bharathiar University, Coimbatore (Regular Degree conferment).
- **Contact**: +91 97885 56999 / +91 98438 85222 / rdccpscollege@gmail.com.
- **Scholarships**: Up to 40% Merit Scholarships based on +2 board exam marks.
- **Admissions**: Open for 2026 - 2027 academic session.

### The 5 Flagship B.Com Programs Offered:
1. **B.Com with Chartered Accountancy (CA)** [Code: BCOM-CA-01]
   - *Dual Qualification*: Bharathiar B.Com + ICAI CA Foundation & Intermediate on-campus coaching.
   - *Best For*: Students aiming to become Chartered Accountants, Statutory Auditors, Tax Consultants, or CFOs.
   - *Avg Package*: ₹8.5 - ₹12.0 LPA (upon CA qualifications) / ₹4.5 - ₹6.5 LPA (Graduate Entry).

2. **B.Com (Computer Applications) with CA** [Code: BCOM-CA-IT]
   - *Dual Qualification*: Bharathiar B.Com (CA) + Fintech, ERP, Tally, Python + CA Foundation/Inter.
   - *Best For*: Tech-savvy students who love both finance and computer systems, Fintech analyst roles, SAP/ERP consulting.
   - *Avg Package*: ₹5.5 - ₹8.5 LPA.

3. **B.Com (Professional Accounting) with CA / CMA** [Code: BCOM-PA-01]
   - *Dual Qualification*: Bharathiar B.Com (PA) + Dual Track option (CA or CMA). Fast-track corporate accounting curriculum.
   - *Best For*: Students wanting focused accounting, corporate taxation, and fast-track clearance for CA/CMA exams.
   - *Avg Package*: ₹6.0 - ₹9.5 LPA.

4. **B.Com with ACCA (UK - Global Accounting)** [Code: BCOM-ACCA-UK]
   - *Dual Qualification*: Bharathiar B.Com + ACCA (Association of Chartered Certified Accountants, UK) with up to 9 Paper Exemptions.
   - *Best For*: Students desiring global careers in 180+ countries (UK, Middle East/Dubai, Singapore, EU, Canada) and Big 4 MNCs (PwC, EY, Deloitte, KPMG).
   - *Avg Package*: ₹7.0 - ₹11.5 LPA.

5. **B.Com (Corporate Secretaryship) with CMA (ICMAI)** [Code: BCOM-CS-CMA]
   - *Dual Qualification*: Bharathiar B.Com (Corporate Secretaryship) + ICMAI Cost & Management Accountant (CMA) Coaching.
   - *Best For*: Corporate governance, secretarial compliance, manufacturing & industrial cost auditing, management consulting.
   - *Avg Package*: ₹5.5 - ₹8.5 LPA.

### Guidelines for Your Responses:
1. Be warm, supportive, motivating, and highly structured in clean Markdown.
2. Ask targeted diagnostic questions when helpful:
   - What subjects did you enjoy in 12th standard (Accounting, Computer Science, Business Maths)?
   - Do you dream of working in India (CA/CMA) or internationally across Dubai/UK/Singapore (ACCA)?
   - Are you interested in audit & taxation (CA), corporate strategy & costing (CMA), tech & data analytics (B.Com CA), or global finance (ACCA)?
3. Compare courses clearly with bullet points, timelines, and career outcomes.
4. Highlight the RDCCPS advantage: Daily synchronized timetable (no separate coaching stress), practicing CA/CMA faculty, Bharathiar University degree security, and merit scholarships.
5. If recommending a course, explicitly reference its name and course code so the student can easily explore or apply.
`;

// Helper: Curated Fallback response generator if API key is not configured or in case of transient error
function generateSmartFallback(prompt: string): string {
  const lower = prompt.toLowerCase();
  
  if (lower.includes('acca') || lower.includes('abroad') || lower.includes('foreign') || lower.includes('dubai') || lower.includes('uk') || lower.includes('global')) {
    return `### 🌍 Top Recommendation: **B.Com with ACCA (UK - Global Track)**

If your aspiration is to work abroad in countries like the **UK, UAE/Dubai, Singapore, or Canada**, or at **Big 4 global accounting firms (EY, Deloitte, PwC, KPMG)**, this is the prime choice.

**Key Highlights at RDCCPS:**
- **9 Paper Exemptions** out of 13 ACCA papers through accredited university mapping.
- Valid & recognized across **180+ countries**.
- Average graduate package: **₹7.0 - ₹11.5 LPA**.

*Would you like to know more about the paper structure or how our daily campus timetable balances the university B.Com and ACCA modules?*`;
  }

  if (lower.includes('computer') || lower.includes('coding') || lower.includes('tech') || lower.includes('it') || lower.includes('software')) {
    return `### 💻 Top Recommendation: **B.Com (Computer Applications) with CA**

If you have a strong interest in technology and computers along with commerce and accounting, this program gives you the dual advantage of **Fintech & IT + Chartered Accountancy**.

**Key Highlights at RDCCPS:**
- Modern computer lab training in **Python for Finance, Tally Prime, SQL, and Advanced Excel**.
- Preparation for **CA Foundation & Intermediate** alongside core IT coursework.
- Prepares you for roles in **Fintech, SAP/ERP Consulting, and Financial Systems Management**.

*Would you like to review the computer lab facilities or the semester-by-semester subject breakdown?*`;
  }

  if (lower.includes('cma') || lower.includes('cost') || lower.includes('management') || lower.includes('company secretary') || lower.includes('cs')) {
    return `### 📊 Top Recommendation: **B.Com (Corporate Secretaryship) with CMA (ICMAI)**

For students aiming for leadership in **corporate governance, cost optimization, and manufacturing finance**, this is the ideal program.

**Key Highlights at RDCCPS:**
- Integrated coaching for **ICMAI Cost & Management Accountant (CMA)** Foundation & Intermediate.
- In-depth study of Company Law, Corporate Secretarial Practice, and Cost Audits.
- Direct pathway to roles in public sector undertakings (PSUs), banking, and multinational manufacturing units.

*Would you like to compare the difference between CA and CMA career trajectories?*`;
  }

  return `### 🎓 Welcome to the **RDCCPS AI Academic Advisor**!

At **RD College of Commerce and Professional Studies (Erode)**, we offer 5 specialized Bharathiar University B.Com degree tracks integrated with premier professional qualifications:

1. **B.Com with CA (ICAI)**: Classic Chartered Accountancy pathway for audit, taxation, and statutory practice.
2. **B.Com with ACCA (UK)**: Global qualification recognized in 180+ nations with up to 9 paper exemptions.
3. **B.Com (Computer Applications) with CA**: High-demand blend of software, Fintech, and accounting.
4. **B.Com (Professional Accounting)**: Fast-track accounting and corporate taxation specialization.
5. **B.Com (Corporate Secretaryship) with CMA**: Corporate governance, company law, and industrial cost auditing.

**Tell me about your background:**
- What were your favorite subjects in 12th standard?
- Do you plan to practice in India or build an international career?`;
}

// API Health Check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
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

    // If Gemini client is not initialized due to missing API key, provide smart fallback
    if (!ai) {
      const fallbackReply = generateSmartFallback(latestMessage);
      res.json({ 
        reply: fallbackReply,
        source: "curated_advisor",
        note: "AI active in curated mode."
      });
      return;
    }

    // Format chat history for @google/genai
    const formattedContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    // If user provided preference answers (from compass/marks), append contextual hint
    if (userPreferences) {
      formattedContents[formattedContents.length - 1].parts[0].text += `\n\n[Context: Student Profile - 12th Marks: ${userPreferences.marks || 'Not specified'}, Interest: ${userPreferences.interest || 'General Finance'}, Career Goal: ${userPreferences.careerGoal || 'Open to suggestion'}, Location: ${userPreferences.location || 'India/Abroad'}]`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.65,
        maxOutputTokens: 1200
      }
    });

    const reply = response.text || generateSmartFallback(latestMessage);

    res.json({
      reply,
      source: "gemini-3.7-flash"
    });
  } catch (error: any) {
    console.error("Gemini Chatbot API error:", error);
    const latestMessage = req.body?.messages?.[req.body.messages.length - 1]?.content || "";
    res.json({
      reply: generateSmartFallback(latestMessage),
      source: "fallback",
      error: error?.message || "Transient model error"
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
