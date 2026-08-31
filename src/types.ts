export type CertificationType = 'CA' | 'ACCA' | 'CMA' | 'ALL';
export type ActiveTabType = 'home' | 'about' | 'courses' | 'faculty' | 'admissions' | 'facilities' | 'placements' | 'contact';

export interface SemesterSubject {
  code: string;
  name: string;
  type: 'Core' | 'Allied' | 'Skill Based' | 'Professional' | 'Practical Lab';
  credits: number;
}

export interface SemesterInfo {
  semesterNumber: number;
  title: string;
  subjects: SemesterSubject[];
  professionalMilestone?: string;
}

export interface CareerOpportunity {
  role: string;
  averagePackage?: string;
  topCompanies: string[];
  description: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  shortName: string;
  tagline: string;
  integratedCertification: 'Chartered Accountancy (CA - ICAI)' | 'ACCA (UK Global)' | 'Cost & Management Accountancy (CMA - ICMAI)' | 'Chartered Accountancy (CA)';
  certificationType: CertificationType;
  affiliation: string;
  duration: string;
  mode: 'Full Time - On Campus';
  totalSemesters: number;
  eligibility: string;
  minimumMarks: string;
  description: string;
  colorTheme: {
    primary: string;
    secondary: string;
    accent: string;
    border: string;
    bgBadge: string;
    textBadge: string;
  };
  keyHighlights: string[];
  dualAdvantagePoints: string[];
  semesters: SemesterInfo[];
  careerOpportunities: CareerOpportunity[];
  toolsAndCertifications: string[];
  exemptionsOrExams: string;
  idealFor: string;
  seatsIntake: number;
  imageUrl?: string;
  brochureUrl?: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  roleType: 'Leadership' | 'Professional CA/CMA' | 'Academic Commerce' | 'Administration';
  qualifications: string;
  experienceYears: string;
  specialization: string;
  bio: string;
  subjectsTaught: string[];
  badgeColor?: string;
}

export interface CampusFacilityItem {
  id: string;
  title: string;
  category: 'Academic' | 'Technology' | 'Student Life' | 'Logistics';
  description: string;
  features: string[];
  iconName: string;
  tag: string;
}

export interface RecruiterPartner {
  name: string;
  category: 'Big 4' | 'Chartered Firm' | 'Tech & MNC' | 'Banking & BFSI';
  roles: string[];
}

export interface ComparisonItem {
  id: string;
  course: Course;
}

export interface AdmissionEnquiry {
  studentName: string;
  email: string;
  phone: string;
  city: string;
  district: string;
  selectedCourseId: string;
  twelfthMarksPercentage: number;
  twelfthGroup: string;
  hostelRequired: boolean;
  transportRequired: boolean;
  queryOrMessage?: string;
}

