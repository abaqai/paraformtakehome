import axios, { AxiosError } from 'axios';
import { Candidate, Application, GreenhouseCandidate, GreenhouseApplication, GreenhouseJob } from '@/types';

// Greenhouse API configuration
const GREENHOUSE_API_KEY = 'f06b2b153e016f8e7c3632627af56b1d-7';
const JOB_ID = '4285367007';
const USER_ID = '4280249007'; // User ID for On-Behalf-Of header
const SOURCE_ID = '4285367007'; // Source ID for the job posting (using job ID as source)

/**
 * Greenhouse API client configuration
 * TODO: Future improvements:
 * - Add environment variable support for API keys
 * - Add request/response logging (if logging is not handled by api)
 */
const greenhouseApi = axios.create({
  baseURL: 'https://harvest.greenhouse.io/v1',
  headers: {
    'Authorization': `Basic ${Buffer.from(GREENHOUSE_API_KEY + ':').toString('base64')}`,
    'Content-Type': 'application/json',
    'On-Behalf-Of': USER_ID,
  },
});

/**
 * GreenhouseService Class
 * 
 * Handles all interactions with the Greenhouse ATS API
 * 
 * TODO: Future improvements for scaling:
 * - Implement request batching for bulk operations
 */
export class GreenhouseService {
  /**
   * Retrieves a candidate by email address
   * 
   * @param email - Candidate's email address
   * @returns Promise<GreenhouseCandidate | null>
   * 
   */
  static async getCandidateByEmail(email: string): Promise<GreenhouseCandidate | null> {
    try {
      const response = await greenhouseApi.get('/candidates', {
        params: {
          email: email,
        },
      });
      
      if (response.data && response.data.length > 0) {
        // Filter candidates to only include those who have applied to this specific job
        const candidatesWithJobApplication = response.data.filter((candidate: GreenhouseCandidate) => {
          return candidate.applications && candidate.applications.length > 0;
        });
        
        // Return the first candidate who has applied to this job
        if (candidatesWithJobApplication.length > 0) {
          return candidatesWithJobApplication[0];
        }
      }
      return null;
    } catch (error) {
      console.error('Error fetching candidate:', error);
      return null;
    }
  }

  /**
   * Creates a new candidate in Greenhouse (used if they don't exist already) and attached the application.
   * 
   * @param candidate - Candidate information
   * @returns Promise<GreenhouseCandidate | null>
   * 
   */
  static async createCandidate(candidate: Candidate): Promise<GreenhouseCandidate | null> {
    try {
      const candidateData = {
        first_name: candidate.firstName,
        last_name: candidate.lastName,
        email_addresses: [
          {
            value: candidate.email,
            type: 'personal',
          },
        ],
        applications: [
          {
            job_id: parseInt(JOB_ID),
          },
        ],
        ...(candidate.phone && {
          phone_numbers: [
            {
              value: candidate.phone,
              type: 'mobile',
            },
          ],
        }),
        ...(candidate.location && {
          addresses: [
            {
              value: candidate.location,
              type: 'home',
            },
          ],
        }),
      };

      const response = await greenhouseApi.post('/candidates', candidateData);
      return response.data;
    } catch (error) {
      console.error('Error creating candidate:', error);
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as AxiosError;
        console.error('Response data:', axiosError.response?.data);
        console.error('Response status:', axiosError.response?.status);
      }
      return null;
    }
  }

  /**
   * Submits an application to Greenhouse.
   * 
   * @param candidateId - Greenhouse candidate ID
   * @param questions - Application questions and answers
   * @returns Promise<GreenhouseApplication | null>
   * 
   */
  static async submitApplication(candidateId: number, questions: Application['questions']): Promise<GreenhouseApplication | null> {
    try {
      const applicationData = {
        candidate_id: candidateId,
        job_id: parseInt(JOB_ID),
        questions: questions.map(q => ({
          question_id: parseInt(q.id),
          answer: q.answer,
        })),
      };

      const response = await greenhouseApi.post('/applications', applicationData);
      return response.data;
    } catch (error) {
      console.error('Error submitting application:', error);
      return null;
    }
  }

  /**
   * Retrieves job details from Greenhouse
   * 
   * @returns Promise<GreenhouseJob | null>
   * 
   * NOTE: This method is available but not currently integrated into the UI.
   * I planned to use this but not deemed necessary for the current single-job implementation.
   * 
   */
  static async getJobDetails(): Promise<GreenhouseJob | null> {
    try {
      const response = await greenhouseApi.get(`/jobs/${JOB_ID}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching job details:', error);
      return null;
    }
  }

  /**
   * Retrieves applications for a specific job
   * 
   * @returns Promise<GreenhouseApplication[]>
   * 
   * NOTE: Again, this method is available but not currently integrated into the UI.
   * Planned for future use but not deemed necessary for the current single-job implementation.
   * 
   */
  static async getJobApplications(): Promise<GreenhouseApplication[]> {
    try {
      const response = await greenhouseApi.get(`/jobs/${JOB_ID}/applications`);
      return response.data;
    } catch (error) {
      console.error('Error fetching job applications:', error);
      return [];
    }
  }
} 