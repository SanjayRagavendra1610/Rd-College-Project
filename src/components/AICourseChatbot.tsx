import React, { useState, useRef, useEffect } from 'react';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  X, 
  RotateCcw, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle,
  Award,
  Globe,
  Laptop,
  GraduationCap,
  MessageSquare,
  ShieldAlert,
  ChevronDown,
  Copy,
  Check
} from 'lucide-react';
import { COURSES_DATA } from '../data/coursesData';
import { Course } from '../types';
import { Logo, RdccpsShieldCrest } from './Logo';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  recommendedCourses?: string[]; // course IDs
}

interface AICourseChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onSelectCourse: (course: Course) => void;
  onApplyCourse: (courseId: string) => void;
  initialQuery?: string;
}

export const AICourseChatbot: React.FC<AICourseChatbotProps> = ({
  isOpen,
  onClose,
  onOpen,
  onSelectCourse,
  onApplyCourse,
  initialQuery
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `### 👋 Vanakkam & Welcome to the **RDCCPS AI Academic Advisor**!

I am your official counselor for **RD College of Commerce and Professional Studies (RDCCPS)** in Vijayamangalam, Erode, affiliated with **Bharathiar University (Coimbatore)**.

I can provide verified facts on our **5 flagship B.Com degree programs**, integrated **CA / ACCA / CMA coaching**, merit scholarships (up to 40%), daily timetables, hostel, and bus transport for **Admissions 2026 - 2027**.

**How can I assist your career path today?** Tap any question below or type your query:`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const suggestedPrompts = [
    {
      label: '💰 Scholarships & Fee Slabs',
      query: 'What are the merit scholarships and fee concessions available for 12th commerce students at RDCCPS?'
    },
    {
      label: '🌍 ACCA vs CA (Abroad vs India)',
      query: 'What is the difference between B.Com with CA and B.Com Finance with ACCA for working in UK, Dubai, or Singapore?'
    },
    {
      label: '⏰ Daily College Timetable',
      query: 'How does RDCCPS balance Bharathiar University degree classes and CA/ACCA coaching in the daily timetable?'
    },
    {
      label: '🚌 Hostel & Daily Bus Routes',
      query: 'Tell me about the hostel facilities, dining mess, and college bus routes across Erode and Tiruppur.'
    },
    {
      label: '📋 Admission 2026-27 Documents',
      query: 'What is the eligibility criteria and what documents are required for 2026-2027 B.Com admission?'
    },
    {
      label: '⚖️ CA vs CMA Differences',
      query: 'Compare Chartered Accountancy (CA) and Cost & Management Accountancy (CMA) in terms of syllabus, duration, and job roles.'
    }
  ];

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setTimeout(() => {
        scrollToBottom();
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, messages]);

  // If initialQuery is provided from external trigger
  useEffect(() => {
    if (initialQuery && initialQuery.trim() !== '') {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  // Copy message text helper
  const handleCopyMessage = async (msgId: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(msgId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback if clipboard API unavailable in iframe
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedId(msgId);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Helper to accurately extract course IDs mentioned in text matching COURSES_DATA
  const detectCoursesInText = (text: string): Course[] => {
    const matched: Course[] = [];
    const lower = text.toLowerCase();

    COURSES_DATA.forEach((course) => {
      if (
        lower.includes(course.name.toLowerCase()) ||
        lower.includes(course.code.toLowerCase()) ||
        (course.id === 'bcom-general-ca' && (lower.includes('b.com with ca') || lower.includes('bcom with ca') || lower.includes('bcom-ca-01') || lower.includes('chartered accountancy (ca)'))) ||
        (course.id === 'bcom-finance-acca' && (lower.includes('acca') || lower.includes('bcom-fin-03') || lower.includes('global accounting') || lower.includes('9 paper'))) ||
        (course.id === 'bcom-accounting-finance-ca' && (lower.includes('bcom-af-04') || lower.includes('accounting & finance') || lower.includes('accounting and finance') || lower.includes('financial analytics'))) ||
        (course.id === 'bcom-banking-finance-cma' && (lower.includes('bcom-bf-05') || lower.includes('banking & finance') || lower.includes('banking and finance') || lower.includes('cma') || lower.includes('cost & management'))) ||
        (course.id === 'bcom-professional-accounting-ca' && (lower.includes('bcom-pa-02') || lower.includes('professional accounting') || lower.includes('b.com (pa)') || lower.includes('bcom pa')))
      ) {
        if (!matched.some((c) => c.id === course.id)) {
          matched.push(course);
        }
      }
    });

    return matched.slice(0, 2); // Max 2 relevant cards per message
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text || text.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // Prepare payload for backend Express /api/chat endpoint
      const payloadMessages = newMessages.map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: payloadMessages
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const replyContent = data.reply || "I'm having trouble retrieving course information right now. Please reach out to our admission helpdesk at +91 97885 56999.";

      const detected = detectCoursesInText(replyContent);

      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedCourses: detected.map((c) => c.id)
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (!isOpen) {
        setUnreadCount((c) => c + 1);
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallbackMessage: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        role: 'assistant',
        content: `### 🎓 Flagship RDCCPS Degree Programs (2026-27)

We offer 5 specialized Bharathiar University B.Com degree tracks:

1. **B.Com with CA** [Code: **BCOM-CA-01**]: ICAI CA Foundation & Inter on-campus coaching.
2. **B.Com Professional Accounting with CA** [Code: **BCOM-PA-02**]: 100% ICAI syllabus synergy.
3. **B.Com Finance with ACCA (UK)** [Code: **BCOM-FIN-03**]: 9 Paper Exemptions for global careers in 180+ countries.
4. **B.Com Accounting & Finance with CA** [Code: **BCOM-AF-04**]: Capital markets, financial modeling & CA prep.
5. **B.Com Banking & Finance with CMA** [Code: **BCOM-BF-05**]: Strategic cost management and commercial banking.

*Call our admission counsellors directly at **+91 97885 56999** or explore our course options below!*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedCourses: ['bcom-general-ca', 'bcom-finance-acca']
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: `### 🔄 Conversation Reset

How can I help you choose the right course today? Feel free to ask about fees, scholarships, syllabus, CA/ACCA exemptions, hostel, or transport facilities.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/95 text-white text-xs font-bold shadow-xl border border-amber-500/30 backdrop-blur-md cursor-pointer hover:border-amber-400"
            onClick={onOpen}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Need help choosing a course? Ask AI</span>
          </motion.div>
        )}

        <div className="relative group">
          {/* Animated Glow Aura */}
          <motion.span 
            animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-500 blur-sm pointer-events-none"
          />

          <motion.button
            id="open-ai-chatbot-btn"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={isOpen ? onClose : onOpen}
            className={`relative p-3.5 sm:p-4 rounded-full shadow-2xl flex items-center justify-center transition-all cursor-pointer ${
              isOpen 
                ? 'bg-slate-900 text-white border border-slate-700' 
                : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-slate-950 shadow-amber-500/40'
            }`}
            title="Chat with RDCCPS AI Course Advisor"
            aria-label="Open AI Course Advisor Chat"
          >
            {isOpen ? (
              <ChevronDown className="w-6 h-6 text-slate-200" />
            ) : (
              <div className="relative flex items-center justify-center">
                <Bot className="w-6 h-6 text-slate-950" />
                <Sparkles className="w-3 h-3 text-white absolute -top-1 -right-1 fill-white" />
              </div>
            )}

            {unreadCount > 0 && !isOpen && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white rounded-full text-[10px] font-black flex items-center justify-center border-2 border-white shadow-md animate-bounce">
                {unreadCount}
              </span>
            )}
          </motion.button>
        </div>
      </div>

      {/* Main Chat Drawer / Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-chatbot-window"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="fixed bottom-22 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[440px] md:w-[480px] h-[600px] max-h-[calc(100vh-7rem)] bg-white rounded-3xl shadow-2xl border border-slate-300/80 flex flex-col overflow-hidden z-50 backdrop-blur-xl"
          >
            {/* Chatbot Header */}
            <div className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white flex items-center justify-between border-b border-slate-800 relative flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/95 p-0.5 text-slate-950 flex items-center justify-center shadow-md border border-amber-400/40">
                  <RdccpsShieldCrest size={34} />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-sm sm:text-base text-white leading-none">
                      RDCCPS Course AI
                    </h3>
                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      LIVE
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Academic Advisor • Bharathiar University
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  id="reset-chat-btn"
                  onClick={handleResetChat}
                  title="Clear & Restart Chat"
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  id="close-chat-btn"
                  onClick={onClose}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Admissions Banner */}
            <div className="bg-amber-400 px-4 py-1.5 text-slate-950 text-[11px] font-bold flex items-center justify-between flex-shrink-0">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Admissions 2026-27 Open • Up to 40% Merit Scholarships</span>
              </span>
              <button 
                onClick={() => {
                  onClose();
                  onApplyCourse('bcom-general-ca');
                }}
                className="underline hover:text-blue-900 cursor-pointer font-black"
              >
                Apply Now →
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/70">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                const detectedCourses = msg.recommendedCourses
                  ? COURSES_DATA.filter((c) => msg.recommendedCourses?.includes(c.id))
                  : [];

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
                  >
                    <div className="flex items-end gap-2 max-w-[92%]">
                      {!isUser && (
                        <div className="w-7 h-7 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center flex-shrink-0 shadow-xs mb-1">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}

                      <div
                        className={`p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-xs ${
                          isUser
                            ? 'bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-br-xs'
                            : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs'
                        }`}
                      >
                        {isUser ? (
                          <p className="font-medium whitespace-pre-wrap">{msg.content}</p>
                        ) : (
                          <div className="prose prose-xs max-w-none text-slate-800 [&_h3]:text-sm [&_h3]:font-extrabold [&_h3]:text-slate-900 [&_h3]:mt-1.5 [&_h3]:mb-1.5 [&_h4]:text-xs [&_h4]:font-bold [&_h4]:text-slate-900 [&_p]:my-1.5 [&_ul]:my-1.5 [&_ul]:pl-4 [&_li]:my-0.5 [&_strong]:text-slate-950 [&_strong]:font-bold [&_table]:w-full [&_table]:border-collapse [&_table]:text-[11px] [&_table]:my-2.5 [&_table]:rounded-lg [&_table]:overflow-hidden [&_th]:bg-slate-100 [&_th]:p-1.5 [&_th]:border [&_th]:border-slate-200 [&_th]:font-bold [&_th]:text-slate-900 [&_td]:p-1.5 [&_td]:border [&_td]:border-slate-200 [&_td]:text-slate-700">
                            <Markdown>{msg.content}</Markdown>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Detected Course Action Cards if any */}
                    {!isUser && detectedCourses.length > 0 && (
                      <div className="pl-9 w-full space-y-2 mt-2">
                        {detectedCourses.map((course) => (
                          <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white border border-amber-300/80 rounded-xl p-3 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-2 overflow-hidden"
                          >
                            <div className="flex items-center gap-3">
                              {course.imageUrl && (
                                <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-slate-900 border border-slate-200 relative">
                                  <img
                                    src={course.imageUrl}
                                    alt={course.name}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-900 mb-0.5">
                                  {course.code}
                                </span>
                                <h4 className="text-xs font-bold text-slate-900 leading-tight line-clamp-1">
                                  {course.name}
                                </h4>
                                <p className="text-[11px] text-slate-500 line-clamp-1">
                                  {course.integratedCertification}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 pt-1.5 border-t border-slate-100">
                              <button
                                onClick={() => {
                                  onClose();
                                  onSelectCourse(course);
                                }}
                                className="flex-1 py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                              >
                                <BookOpen className="w-3 h-3 text-amber-400" />
                                <span>View Syllabus</span>
                              </button>

                              <button
                                onClick={() => {
                                  onClose();
                                  onApplyCourse(course.id);
                                }}
                                className="flex-1 py-1.5 px-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                              >
                                <span>Apply Now</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-[10px] text-slate-400 px-9">
                      <span>{msg.timestamp}</span>
                      {!isUser && (
                        <button
                          onClick={() => handleCopyMessage(msg.id, msg.content)}
                          className="flex items-center gap-1 hover:text-slate-700 transition-colors cursor-pointer"
                          title="Copy response"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-600 font-medium">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Loading Typing Indicator */}
              {isLoading && (
                <div className="flex items-end gap-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center flex-shrink-0 shadow-xs mb-1">
                    <Bot className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
                  </div>
                  <div className="p-3.5 bg-white border border-slate-200 rounded-2xl rounded-bl-xs text-slate-500 shadow-xs flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    <span className="text-xs font-semibold text-slate-600 ml-1">Analyzing courses...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips (Visible if 2 or fewer messages or when idle) */}
            {messages.length <= 3 && !isLoading && (
              <div className="px-3 py-2 bg-slate-100/90 border-t border-slate-200/80 overflow-x-auto flex-shrink-0">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 px-1">
                  Popular Questions:
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {suggestedPrompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(p.query)}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-amber-50 hover:border-amber-300 text-slate-700 text-[11px] font-medium border border-slate-200 shadow-2xs whitespace-nowrap transition-colors flex-shrink-0 cursor-pointer text-left"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Footer */}
            <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 flex-shrink-0">
              <input
                ref={inputRef}
                type="text"
                id="ai-chatbot-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask about CA, ACCA, CMA, marks, fees..."
                disabled={isLoading}
                className="flex-1 px-3.5 py-2.5 bg-slate-100 focus:bg-white text-xs sm:text-sm text-slate-900 rounded-xl border border-slate-300 focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 transition-all placeholder:text-slate-400"
              />

              <motion.button
                id="ai-chatbot-send-btn"
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className={`p-2.5 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  inputValue.trim() && !isLoading
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md shadow-amber-500/25 hover:from-amber-300 hover:to-amber-400'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
