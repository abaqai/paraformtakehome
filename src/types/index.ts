export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: Array<{
    text: string;
    type: 'required' | 'preferred';
  }>;
  benefits: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  recruiter: {
    name: string;
    email: string;
    title: string;
  };
  companyContact: {
    name: string;
    email: string;
    title: string;
    message?: string;
  };
  companyInfo: {
    name: string;
    description: string;
    website: string;
    logo: string;
    images: string[];
    industry: string;
    size: string;
    founded: string;
  };
  positions: {
    total: number;
    filled: number;
    available: number;
  };
  monetaryBenefit: {
    min: number;
    max: number;
    currency: string;
    description: string;
  };
}

export interface Candidate {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location?: string;
  experience?: number;
  skills?: string[];
  matchScore: 'high' | 'medium' | 'low';
  matchReason?: string;
  linkedinUrl?: string;
  resumeUrl?: string;
}

export interface Application {
  id?: string;
  jobId: string;
  candidateId: string;
  status: 'pending' | 'submitted' | 'reviewed' | 'rejected';
  submittedAt?: Date;
  questions: ApplicationQuestion[];
}

export interface ApplicationQuestion {
  id: string;
  question: string;
  answer: string;
  required: boolean;
}

export interface GreenhouseCandidate {
  id: number;
  first_name: string;
  last_name: string;
  email_addresses: Array<{
    value: string;
    type: string;
  }>;
  phone_numbers?: Array<{
    value: string;
    type: string;
  }>;
  addresses?: Array<{
    value: string;
    type: string;
  }>;
  tags: string[];
  applications: Array<{
    id: number;
    status: string;
    current_stage: {
      id: number;
      name: string;
    };
  }>;
}

export interface GreenhouseApplication {
  id: number;
  candidate_id: number;
  job_id: number;
  status: string;
  current_stage: {
    id: number;
    name: string;
  };
  submitted_at: string;
  questions: Array<{
    id: number;
    question: string;
    answer: string;
  }>;
}

export interface GreenhouseJob {
  id: number;
  name: string;
  location: {
    name: string;
  };
  department: {
    name: string;
  };
  office: {
    name: string;
  };
  status: string;
  created_at: string;
  updated_at: string;
  requisition_id: string;
  notes: string;
  confidential: boolean;
  departments: Array<{
    id: number;
    name: string;
  }>;
  offices: Array<{
    id: number;
    name: string;
  }>;
  custom_fields: Array<{
    id: number;
    name: string;
    value: string;
  }>;
} 