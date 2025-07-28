import { Job, Candidate } from '@/types';

export const mockJob: Job = {
  id: '4285367007',
  title: 'Senior Software Engineer',
  company: 'Paraform',
  location: 'San Francisco, CA',
  type: 'Full-time',
  description: 'We are looking for a Senior Software Engineer to join our team and help build the future of recruitment technology. You will work on challenging problems and have the opportunity to make a significant impact on our product.',
  requirements: [
    // Technical Skills
    {
      text: '5+ years of experience in software development',
      type: 'required'
    },
    {
      text: 'Strong proficiency in TypeScript and React',
      type: 'required'
    },
    {
      text: 'Experience with Node.js and modern JavaScript frameworks',
      type: 'required'
    },
    {
      text: 'Knowledge of database design and optimization (PostgreSQL, MongoDB)',
      type: 'required'
    },
    {
      text: 'Experience with cloud platforms (AWS, GCP, or Azure)',
      type: 'required'
    },
    {
      text: 'Experience with API design and development',
      type: 'required'
    },
    {
      text: 'Understanding of software testing principles and practices',
      type: 'required'
    },
    {
      text: 'Experience with GraphQL and REST APIs',
      type: 'preferred'
    },
    {
      text: 'Knowledge of containerization (Docker, Kubernetes)',
      type: 'preferred'
    },
    {
      text: 'Experience with CI/CD pipelines',
      type: 'preferred'
    },
    {
      text: 'Familiarity with microservices architecture',
      type: 'preferred'
    },
    {
      text: 'Experience with performance optimization',
      type: 'preferred'
    },
    {
      text: 'Knowledge of security best practices',
      type: 'preferred'
    },
    {
      text: 'Experience with monitoring and logging tools',
      type: 'preferred'
    },
    {
      text: 'Contributions to open source projects',
      type: 'preferred'
    },
    // Soft Skills
    {
      text: 'Excellent problem-solving and communication skills',
      type: 'required'
    },
    {
      text: 'Ability to work in a fast-paced, collaborative environment',
      type: 'required'
    },
    {
      text: 'Strong attention to detail and code quality',
      type: 'required'
    },
    {
      text: 'Experience mentoring junior developers',
      type: 'preferred'
    },
    {
      text: 'Experience with agile development methodologies',
      type: 'preferred'
    }
  ],
  benefits: [
    'Competitive salary and equity package',
    'Comprehensive health, dental, and vision insurance',
    'Flexible work arrangements',
    'Professional development opportunities',
    'Modern office in San Francisco',
    'Team events and activities'
  ],
  salary: {
    min: 150000,
    max: 200000,
    currency: 'USD'
  },
  recruiter: {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@paraform.com',
    title: 'Senior Recruiter'
  },
  companyContact: {
    name: 'Michael Chen',
    email: 'michael.chen@paraform.com',
    title: 'Engineering Manager'
  },
  companyInfo: {
    name: 'Paraform',
    description: 'Paraform is revolutionizing the recruitment industry by connecting top talent with innovative companies through our AI-powered platform. We\'re building the future of hiring with cutting-edge technology and a human-centered approach.',
    website: 'https://paraform.com',
    logo: '/images/paraform-logo.png',
    images: [
      '/images/paraform-office-1.jpg',
      '/images/paraform-team-1.jpg',
      '/images/paraform-office-2.jpg'
    ],
    industry: 'Technology / Recruitment',
    size: '50-100 employees',
    founded: '2020'
  },
  positions: {
    total: 5,
    filled: 2,
    available: 3
  },
  monetaryBenefit: {
    min: 24000, // 0.8 * 0.25 * 150000
    max: 32000, // 0.8 * 0.25 * 200000
    currency: 'USD',
    description: 'Recruiter benefit: 20% of first year salary (80% of 25% standard rate)'
  }
};

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    firstName: 'Alex',
    lastName: 'Chen',
    email: 'alex.chen@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    experience: 6,
    skills: ['TypeScript', 'React', 'Node.js', 'AWS', 'PostgreSQL'],
    matchScore: 'high',
    matchReason: 'Strong technical background with relevant experience in our tech stack',
    linkedinUrl: 'https://linkedin.com/in/alexchen',
    resumeUrl: '/resumes/alex-chen.pdf'
  },
  {
    id: '2',
    firstName: 'Maria',
    lastName: 'Garcia',
    email: 'maria.garcia@email.com',
    phone: '+1 (555) 234-5678',
    location: 'Oakland, CA',
    experience: 4,
    skills: ['JavaScript', 'React', 'Python', 'Django', 'MongoDB'],
    matchScore: 'medium',
    matchReason: 'Good experience but needs more TypeScript and cloud experience',
    linkedinUrl: 'https://linkedin.com/in/mariagarcia',
    resumeUrl: '/resumes/maria-garcia.pdf'
  },
  {
    id: '3',
    firstName: 'David',
    lastName: 'Kim',
    email: 'david.kim@email.com',
    phone: '+1 (555) 345-6789',
    location: 'San Jose, CA',
    experience: 8,
    skills: ['Java', 'Spring Boot', 'Kubernetes', 'Docker', 'Microservices'],
    matchScore: 'low',
    matchReason: 'Strong backend experience but lacks frontend and TypeScript skills',
    linkedinUrl: 'https://linkedin.com/in/davidkim',
    resumeUrl: '/resumes/david-kim.pdf'
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@email.com',
    phone: '+1 (555) 456-7890',
    location: 'San Francisco, CA',
    experience: 5,
    skills: ['TypeScript', 'React', 'Node.js', 'GraphQL', 'Redis'],
    matchScore: 'high',
    matchReason: 'Excellent match with our tech stack and culture',
    linkedinUrl: 'https://linkedin.com/in/emilyrodriguez',
    resumeUrl: '/resumes/emily-rodriguez.pdf'
  }
];

export const applicationQuestions = [
  {
    id: '1',
    question: 'Why are you interested in joining Paraform?',
    answer: '',
    required: true
  },
  {
    id: '2',
    question: 'Describe a challenging technical problem you solved recently.',
    answer: '',
    required: true
  },
  {
    id: '3',
    question: 'What is your experience with TypeScript and React?',
    answer: '',
    required: true
  },
  {
    id: '4',
    question: 'How do you approach learning new technologies?',
    answer: '',
    required: false
  },
  {
    id: '5',
    question: 'What are your salary expectations?',
    answer: '',
    required: true
  }
]; 