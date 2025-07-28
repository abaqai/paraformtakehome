import { NextRequest, NextResponse } from 'next/server';
import { GreenhouseService } from '@/lib/greenhouse';

/**
 * POST /api/submit-application
 * 
 * Submits a candidate application to Greenhouse ATS
 * 
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { candidate, questions } = body;

    // Validate required fields
    if (!candidate || !questions) {
      return NextResponse.json(
        { error: 'Missing required fields: candidate and questions' },
        { status: 400 }
      );
    }

    if (!candidate.email || !candidate.firstName || !candidate.lastName) {
      return NextResponse.json(
        { error: 'Missing required candidate information' },
        { status: 400 }
      );
    }

    // TODO: Add comprehensive candidate validation
    // - Check for duplicate applications
    // - Validate candidate against job requirements

    // Check if candidate exists in Greenhouse
    let greenhouseCandidate = await GreenhouseService.getCandidateByEmail(candidate.email);

    // If candidate doesn't exist, create them with an application
    if (!greenhouseCandidate) {
      greenhouseCandidate = await GreenhouseService.createCandidate(candidate);
      
      if (!greenhouseCandidate) {
        return NextResponse.json(
          { error: 'Failed to create candidate in Greenhouse' },
          { status: 500 }
        );
      }
      
      // Since we created the candidate with an application, we can return success
      return NextResponse.json({
        success: true,
        application: {
          id: greenhouseCandidate.applications?.[0]?.id || 'new',
          candidateId: greenhouseCandidate.id,
          jobId: parseInt(process.env.JOB_ID || '4285367007'),
          status: 'submitted',
          submittedAt: new Date().toISOString()
        }
      });
    }

    // If candidate exists, submit a new application
    const application = await GreenhouseService.submitApplication(
      greenhouseCandidate.id,
      questions
    );

    if (!application) {
      return NextResponse.json(
        { error: 'This candidate has already applied to this position. Duplicate applications are not allowed.' },
        { status: 409 }
      );
    }

    // TODO: Add post-submission actions
    // - Update application status
    // - Trigger notifications

    return NextResponse.json({
      success: true,
      application: {
        id: application.id,
        candidateId: application.candidate_id,
        jobId: application.job_id,
        status: application.status,
        submittedAt: application.submitted_at
      }
    });

  } catch (error) {
    // TODO: Add comprehensive error handling
    // - Add error recovery mechanisms
    // - Implement error notifications
    
    console.error('Error submitting application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 