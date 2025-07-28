# Paraform Takehome - Job Application Interface

A modern job application interface that integrates with Greenhouse ATS to allow recruiters to submit candidates for job positions.

## Notes for Jeff
1. Wassup, happy Monday
2. Alex and Maria will error out on purposes because a job application for these canidadates already exists in greenhouse. In production, we would not even show these candidates for the recruiter to select.
3. Decided to not leverage the `prospect` option in the greenhouse api for simplicity, but could imagine how recruiters could submit applicants as prospects and the clients could approve the application. 
4. See rough_notes.txt for my rough notes before I started coding. Included match based filtering when selecting candidates, thought this was the most important thing for the recruiter to keep in mind.
5. Product Improvements that came to mind: Bulk candidate submission for roles that have high availability (> 10 opennings), greenhouse application tracking visible to recruiters (could provide as much as detail as we can to the recruiter about the different applicants in the process)

## Features

### 🎯 Core Functionality
- **Job Details Display**: Comprehensive job information including requirements, benefits, and recruiter details
- **Candidate Selection**: Browse and filter candidates with match scores (High, Medium, Low)
- **Application Submission**: Complete application forms with job-specific questions
- **Greenhouse Integration**: Two-way sync with Greenhouse ATS for candidate and application management

### 🎨 User Experience
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Interactive Modals**: Smooth candidate selection and application forms
- **Progress Tracking**: Visual progress indicators for application completion
- **Real-time Validation**: Form validation with helpful error messages

### 📊 Analytics & Insights
- **Position Status**: Track filled vs. available positions
- **Recruiter Benefits**: Display monetary incentives for successful hires
- **Match Scoring**: AI-powered candidate matching with detailed reasoning

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI + Heroicons
- **HTTP Client**: Axios
- **ATS Integration**: Greenhouse API

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Greenhouse API access

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd paraform-takehome
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   GREENHOUSE_API_KEY=f06b2b153e016f8e7c3632627af56b1d-7
   GREENHOUSE_JOB_ID=4285367007
   GREENHOUSE_USER_ID=4280249007
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── submit-application/
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── JobDetails.tsx     # Main job interface
│   ├── CandidateSelectionModal.tsx
│   ├── ApplicationFormModal.tsx
│   └── MatchScoreBadge.tsx
├── lib/                   # Utilities and services
│   ├── greenhouse.ts      # Greenhouse API integration
│   └── mockData.ts        # Mock data for development
└── types/                 # TypeScript type definitions
    └── index.ts
```

## API Integration

### Greenhouse API
The application integrates with Greenhouse's Harvest API to:
- Fetch job details
- Create/retrieve candidates
- Submit applications
- Track application status

### API Endpoints

#### POST `/api/submit-application`
Submits a candidate application to Greenhouse.

**Request Body:**
```json
{
  "candidate": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "location": "San Francisco, CA"
  },
  "questions": [
    {
      "id": "1",
      "question": "Why are you interested in this role?",
      "answer": "I'm passionate about...",
      "required": true
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "application": {
    "id": 12345,
    "candidateId": 67890,
    "jobId": 4285367007,
    "status": "active",
    "submittedAt": "2024-01-15T10:30:00Z"
  }
}
```

## Deployment

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically on push

### Environment Variables
Set these in your Vercel project:
- `GREENHOUSE_API_KEY`: Your Greenhouse API key
- `GREENHOUSE_JOB_ID`: Target job ID
- `GREENHOUSE_USER_ID`: User ID for API requests

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for consistent styling

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
