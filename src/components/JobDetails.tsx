'use client';

import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
  CurrencyDollarIcon,
  UsersIcon,
  ClockIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  ExclamationCircleIcon,
  StarIcon,
  CheckIcon,
  CalendarIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { Job, Candidate, ApplicationQuestion } from '@/types';
import { mockCandidates, applicationQuestions } from '@/lib/mockData';
import CandidateSelectionModal from './CandidateSelectionModal';
import ApplicationFormModal from './ApplicationFormModal';
import MatchScoreBadge from './MatchScoreBadge';

interface JobDetailsProps {
  job: Job;
}

/**
 * JobDetails Component
 * 
 * Main component for displaying job information and handling candidate submissions.
 * 
 * TODO: Future improvements for scaling:
 * - Add job ID parameter to fetch specific job data from API
 * - Implement job search/filtering functionality
 * - Add pagination for multiple jobs
 * - Implement job bookmarking functionality
 * - Add job sharing capabilities
 * - Implement job application tracking
 * - Add analytics for job view metrics
 */
export default function JobDetails({ job }: JobDetailsProps) {
  // State management for modals and application flow
  const [isCandidateModalOpen, setIsCandidateModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Opens the candidate selection modal
   * TODO: Add candidate filtering based on job requirements
   * TODO: Implement candidate recommendation algorithm
   * TODO: Add candidate pipeline management
   */
  const handleSubmitCandidate = () => {
    setIsCandidateModalOpen(true);
  };

  /**
   * Handles candidate selection and opens application form
   * TODO: Add candidate validation against job requirements
   * TODO: Implement candidate matching score calculation
   * TODO: Add candidate history tracking
   */
  const handleCandidateSelect = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsApplicationModalOpen(true);
  };

  /**
   * Submits application to Greenhouse API
   * TODO: Add application status tracking
   * TODO: Implement application versioning
   * TODO: Add application templates
   * TODO: Implement bulk application submission
   * TODO: Add application analytics and reporting
   */
  const handleApplicationSubmit = async (applicationData: { 
    candidate: Candidate; 
    questions: ApplicationQuestion[] 
  }) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle specific error types
        if (response.status === 409) {
          throw new Error('This candidate has already applied to this position. Duplicate applications are not allowed.');
        } else if (response.status === 400) {
          throw new Error(result.error || 'Please check your application information and try again.');
        } else if (response.status === 500) {
          throw new Error('There was an issue submitting your application. Please try again later.');
        } else {
          throw new Error(result.error || 'Failed to submit application');
        }
      }

      // Show success message
      alert('Application submitted successfully to Greenhouse!');
      
      setIsApplicationModalOpen(false);
      setSelectedCandidate(null);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert(`Error submitting application: ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">{job.title}</h1>
              <div className="flex items-center space-x-6 text-gray-600 flex-wrap">
                <div className="flex items-center">
                  <BuildingOfficeIcon className="h-5 w-5 mr-2" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center">
                  <CurrencyDollarIcon className="h-5 w-5 mr-2" />
                  <span>${job.salary?.min.toLocaleString()} - ${job.salary?.max.toLocaleString()}</span>
                </div>
              </div>
            </div>
            {/* Contact Info moved to the right */}
            <div className="flex items-center text-gray-600 mt-6 lg:mt-0">
              <UserIcon className="h-5 w-5 mr-2" />
              <span className="text-sm">{job.companyContact.name} • {job.companyContact.title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Recruiter Benefit with Submit Button */}
        <div className="mb-12 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <CurrencyDollarIcon className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">Recruiter Benefit</h3>
                <p className="text-3xl font-bold text-gray-900">
                  ${job.monetaryBenefit.min.toLocaleString()} - ${job.monetaryBenefit.max.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">20% of first year salary</p>
              </div>
            </div>
            {/* Tooltip */}
            <div className="flex items-center space-x-6">
              <div className="group relative">
                <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center cursor-help">
                  <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 shadow-lg">
                  {job.monetaryBenefit.description}
                  <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
                        {/* Submit Button */}
                        <button
                          onClick={handleSubmitCandidate}
                          className="inline-flex items-center justify-center px-4 py-2 border border-indigo-300 text-sm font-medium rounded-lg text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 shadow-sm"
                        >
                          <UsersIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                          Submit Candidate
                        </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Job Description, Requirements, Company */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Description</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {job.description}
                </p>
              </div>
            </div>

            {/* Requirements - Minimalist with hover icons */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h2>

              {/* Technical Skills Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Skills</h3>
                <ul className="space-y-3">
                  {job.requirements.filter(req => 
                    req.text.includes('experience') || 
                    req.text.includes('proficiency') || 
                    req.text.includes('knowledge') ||
                    req.text.includes('GraphQL') ||
                    req.text.includes('Docker') ||
                    req.text.includes('CI/CD') ||
                    req.text.includes('microservices') ||
                    req.text.includes('performance') ||
                    req.text.includes('security') ||
                    req.text.includes('monitoring') ||
                    req.text.includes('open source')
                  ).map((requirement, index) => (
                    <li key={index} className="flex items-start group">
                      <div className="flex-shrink-0 mr-4 mt-1 relative">
                        {requirement.type === 'required' ? (
                          <ExclamationCircleIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors cursor-help" />
                        ) : (
                          <StarIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors cursor-help" />
                        )}
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                          {requirement.type === 'required' ? 'Required' : 'Preferred'}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                      <span className="text-gray-700 text-lg">{requirement.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Soft Skills Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Soft Skills</h3>
                <ul className="space-y-3">
                  {job.requirements.filter(req => 
                    req.text.includes('communication') || 
                    req.text.includes('collaborative') || 
                    req.text.includes('attention') ||
                    req.text.includes('mentoring') ||
                    req.text.includes('agile')
                  ).map((requirement, index) => (
                    <li key={index} className="flex items-start group">
                      <div className="flex-shrink-0 mr-4 mt-1 relative">
                        {requirement.type === 'required' ? (
                          <ExclamationCircleIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors cursor-help" />
                        ) : (
                          <StarIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors cursor-help" />
                        )}
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                          {requirement.type === 'required' ? 'Required' : 'Preferred'}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                      <span className="text-gray-700 text-lg">{requirement.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Company Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About {job.companyInfo.name}</h2>
              <div className="space-y-8">
                {/* Company Description */}
                <div>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">{job.companyInfo.description}</p>
                  <div className="flex items-center space-x-8 text-sm text-gray-600">
                    <div className="flex items-center">
                      <BuildingOfficeIcon className="h-4 w-4 mr-2" />
                      <span>{job.companyInfo.industry}</span>
                    </div>
                    <div className="flex items-center">
                      <UsersIcon className="h-4 w-4 mr-2" />
                      <span>{job.companyInfo.size}</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      <span>Founded {job.companyInfo.founded}</span>
                    </div>
                  </div>
                </div>

                {/* Company Images */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {job.companyInfo.images.map((image, index) => (
                    <div key={index} className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BuildingOfficeIcon className="h-12 w-12 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Company Website Link */}
                <div className="flex justify-center">
                  <a
                    href={job.companyInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
                  >
                    <GlobeAltIcon className="h-4 w-4 mr-2" />
                    Visit Company Website
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Position Status - Updated Format */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Position Status</h3>
              <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-10 w-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <UsersIcon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">
                      {job.positions.filled}/{job.positions.total}
                    </p>
                    <p className="text-sm text-gray-600">Positions Filled</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span className="ml-2">{Math.round((job.positions.filled / job.positions.total) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(job.positions.filled / job.positions.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Benefits</h2>
              <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border border-gray-100">
                <ul className="space-y-4">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <CheckIcon className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CandidateSelectionModal
        isOpen={isCandidateModalOpen}
        onClose={() => setIsCandidateModalOpen(false)}
        onSelectCandidate={handleCandidateSelect}
        candidates={mockCandidates}
      />

      {selectedCandidate && (
        <ApplicationFormModal
          isOpen={isApplicationModalOpen}
          onClose={() => {
            setIsApplicationModalOpen(false);
            setSelectedCandidate(null);
          }}
          onSubmit={handleApplicationSubmit}
          candidate={selectedCandidate}
          questions={applicationQuestions}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
} 