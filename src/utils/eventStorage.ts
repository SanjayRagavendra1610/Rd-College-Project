import { CollegeEvent } from '../types';
import rdCollegeCampus from '../assets/images/rd_college_campus.jpg';
import courseBcomCa from '../assets/images/course_bcom_ca_1787345690903.jpg';
import courseBcomAcca from '../assets/images/course_bcom_acca_1787345706468.jpg';
import courseBcomCma from '../assets/images/course_bcom_cma_1787345734412.jpg';
import courseBcomPa from '../assets/images/course_bcom_pa_1787345751516.jpg';

// Initial curated events celebrating RDCCPS campus life, functions, and milestones
export const DEFAULT_COLLEGE_EVENTS: CollegeEvent[] = [
  {
    id: 'event-conclave-2026',
    title: 'National Commerce Conclave & FinTech Symposium 2026',
    category: 'academic',
    date: '2026-02-20',
    venue: 'RDCCPS Main Auditorium & Seminar Complex',
    organizer: 'Department of Commerce & ICAI Professional Chapter',
    description: 'A distinguished state-level congregation of chartered accountants, financial analysts, and corporate leaders discussing modern audit practices, AI in forensic accounting, and global IFRS standards.',
    featured: true,
    createdAt: 1771545600000,
    photos: [
      {
        id: 'p-conclave-1',
        url: courseBcomCa,
        caption: 'Keynote panel discussion with practicing Chartered Accountants & University deans',
        uploadedAt: '2026-02-20'
      },
      {
        id: 'p-conclave-2',
        url: courseBcomAcca,
        caption: 'Interactive workshop on International Financial Reporting Standards (IFRS)',
        uploadedAt: '2026-02-20'
      },
      {
        id: 'p-conclave-3',
        url: rdCollegeCampus,
        caption: 'Delegates and faculty gathering at the central academic building entrance',
        uploadedAt: '2026-02-20'
      }
    ]
  },
  {
    id: 'event-sports-meet-2026',
    title: 'Annual Athletic Championship & Inter-Department Sports Trophy',
    category: 'sports',
    date: '2026-01-28',
    venue: 'RDCCPS College Sports Grounds & Courts',
    organizer: 'Department of Physical Education & Sports Council',
    description: 'Students demonstrated vibrant athletic excellence across 100m/200m track events, inter-departmental cricket finals, volleyball, and badminton championships.',
    featured: true,
    createdAt: 1769558400000,
    photos: [
      {
        id: 'p-sports-1',
        url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
        caption: 'Annual track and field sprint finals at the main sports complex',
        uploadedAt: '2026-01-28'
      },
      {
        id: 'p-sports-2',
        url: 'https://images.unsplash.com/photo-1531415074868-036b107e775a?auto=format&fit=crop&w=1200&q=80',
        caption: 'Inter-collegiate cricket championship match at RD grounds',
        uploadedAt: '2026-01-28'
      },
      {
        id: 'p-sports-3',
        url: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80',
        caption: 'Victory lap and championship trophy presentation to the commerce batch',
        uploadedAt: '2026-01-28'
      }
    ]
  },
  {
    id: 'event-pongal-fest-2026',
    title: 'Traditional Pongal Thiruvizha & Cultural Heritage Celebration',
    category: 'celebration',
    date: '2026-01-13',
    venue: 'Central Courtyard & Open-Air Amphitheater',
    organizer: 'Student Welfare Council & Tamil Cultural Mandram',
    description: 'A colorful celebration embracing traditional Tamil heritage with earthen pot sweet Pongal preparation, Oyilattam folk dance, uri adithal games, and ethnic attire fashion parades.',
    featured: false,
    createdAt: 1768262400000,
    photos: [
      {
        id: 'p-pongal-1',
        url: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&w=1200&q=80',
        caption: 'Traditional Pongal cooking ritual with festive kolam decorations',
        uploadedAt: '2026-01-13'
      },
      {
        id: 'p-pongal-2',
        url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
        caption: 'Students performing folk dances in traditional silk veshti and sarees',
        uploadedAt: '2026-01-13'
      }
    ]
  },
  {
    id: 'event-ca-induction-2025',
    title: 'ICAI Foundation & Intermediate Induction Ceremony',
    category: 'orientation',
    date: '2025-11-14',
    venue: 'Smart Lecture Hall & ICAI Coaching Block',
    organizer: 'Professional Studies Board',
    description: 'Orientation for fresh B.Com batches embarking on their dual journey with ICAI Foundation coaching, module distribution, and guest mentorship by rank-holding alumni.',
    featured: false,
    createdAt: 1763078400000,
    photos: [
      {
        id: 'p-induction-1',
        url: courseBcomPa,
        caption: 'Lighting the kuthuvilakku lamp to inaugurate the professional coaching semester',
        uploadedAt: '2025-11-14'
      },
      {
        id: 'p-induction-2',
        url: courseBcomCma,
        caption: 'Distribution of ICAI Foundation study materials to student scholars',
        uploadedAt: '2025-11-14'
      }
    ]
  },
  {
    id: 'event-workshop-sap-2025',
    title: 'Executive Hands-on Workshop on SAP FICO & Tally Prime',
    category: 'workshop',
    date: '2025-10-18',
    venue: 'High-Tech Computerized Accounting Lab',
    organizer: 'Department of Computer Applications & Accounting',
    description: '3-day hands-on corporate simulation training on enterprise enterprise resource planning (ERP), financial ledgers, GST filings, and automated balance sheet finalization.',
    featured: false,
    createdAt: 1760745600000,
    photos: [
      {
        id: 'p-workshop-1',
        url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
        caption: 'Students simulating enterprise GST and balance sheet workflows in the computer lab',
        uploadedAt: '2025-10-18'
      },
      {
        id: 'p-workshop-2',
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Corporate trainer explaining SAP FICO general ledger configuration',
        uploadedAt: '2025-10-18'
      }
    ]
  }
];

const DB_NAME = 'RDCCPS_COLLEGE_EVENTS_DB';
const DB_VERSION = 1;
const STORE_NAME = 'college_events';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('IndexedDB not supported in this browser environment'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Fallback to localStorage if IndexedDB is unavailable
const LOCAL_STORAGE_KEY = 'rdccps_user_events_fallback';

export async function fetchAllEvents(): Promise<CollegeEvent[]> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const storedEvents: CollegeEvent[] = request.result || [];
        // Combine default college events with user uploaded events
        const userEventIds = new Set(storedEvents.map(e => e.id));
        const merged = [
          ...storedEvents,
          ...DEFAULT_COLLEGE_EVENTS.filter(e => !userEventIds.has(e.id))
        ];
        // Sort descending by date
        merged.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        resolve(merged);
      };

      request.onerror = () => {
        resolve(getFallbackEvents());
      };
    });
  } catch {
    return getFallbackEvents();
  }
}

function getFallbackEvents(): CollegeEvent[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const userEvents: CollegeEvent[] = JSON.parse(raw);
      const userEventIds = new Set(userEvents.map(e => e.id));
      const merged = [
        ...userEvents,
        ...DEFAULT_COLLEGE_EVENTS.filter(e => !userEventIds.has(e.id))
      ];
      merged.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return merged;
    }
  } catch {
    // fallback ignore
  }
  return DEFAULT_COLLEGE_EVENTS;
}

export async function saveEvent(event: CollegeEvent): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(event);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch {
    // Fallback to localStorage
    try {
      const existing = getFallbackEvents();
      const updated = [event, ...existing.filter(e => e.id !== event.id)];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated.filter(e => e.isUserUploaded)));
    } catch {
      // quota or local storage failure
    }
  }
}

export async function deleteEvent(eventId: string): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(eventId);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const events: CollegeEvent[] = JSON.parse(raw);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events.filter(e => e.id !== eventId)));
      }
    } catch {
      // fallback ignore
    }
  }
}

// Compress and resize images smoothly client-side to ensure instant performance
export function processImageFile(file: File, maxWidth = 1600, maxHeight = 1600): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // High quality JPEG compression
        const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to read image file'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
