'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Candidate, ApplicationQuestion } from '@/types';
import MatchScoreBadge from './MatchScoreBadge';

interface ApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (applicationData: { candidate: Candidate; questions: ApplicationQuestion[] }) => void;
  candidate: Candidate;
  questions: ApplicationQuestion[];
  isSubmitting?: boolean;
}

/**
 * ApplicationFormModal Component
 * 
 * Modal for completing job applications with candidate information and job-specific questions.
 *
 */
export default function ApplicationFormModal({
  isOpen,
  onClose,
  onSubmit,
  candidate,
  questions,
  isSubmitting = false
}: ApplicationFormModalProps) {
  // Initialize form questions with empty answers
  const [formQuestions, setFormQuestions] = useState<ApplicationQuestion[]>(
    questions.map(q => ({ ...q, answer: '' }))
  );

  /**
   * Updates question answers in the form
   * TODO: Add answer suggestions based on candidate profile
   */
  const handleQuestionChange = (questionId: string, answer: string) => {
    setFormQuestions(prev => 
      prev.map(q => q.id === questionId ? { ...q, answer } : q)
    );
  };

  /**
   * Validates and submits the application
   */
  const handleSubmit = () => {
    const hasRequiredAnswers = formQuestions
      .filter(q => q.required)
      .every(q => q.answer.trim() !== '');
    
    if (!hasRequiredAnswers) {
      alert('Please answer all required questions.');
      return;
    }

    onSubmit({
      candidate,
      questions: formQuestions
    });
  };

  // Calculate progress for required questions
  const requiredQuestionsCount = formQuestions.filter(q => q.required).length;
  const answeredRequiredQuestions = formQuestions
    .filter(q => q.required)
    .filter(q => q.answer.trim() !== '').length;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                      Submit Application
                    </Dialog.Title>

                    {/* Candidate Information Display */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-indigo-700">
                              {candidate.firstName[0]}{candidate.lastName[0]}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">
                            {candidate.firstName} {candidate.lastName}
                          </h4>
                          <p className="text-sm text-gray-500">{candidate.email}</p>
                          <p className="text-sm text-gray-500">{candidate.location}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MatchScoreBadge score={candidate.matchScore} />
                          <span className="text-sm text-gray-500">{candidate.experience} years exp.</span>
                        </div>
                      </div>
                      {candidate.matchReason && (
                        <div className="mt-3 text-xs text-gray-600">
                          <strong>Match Reason:</strong> {candidate.matchReason}
                        </div>
                      )}
                    </div>

                    {/* Progress Indicator */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Application Questions ({answeredRequiredQuestions}/{requiredQuestionsCount} required completed)
                        </span>
                        <span className="text-sm text-gray-500">
                          {Math.round((answeredRequiredQuestions / requiredQuestionsCount) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(answeredRequiredQuestions / requiredQuestionsCount) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Questions Form */}
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {formQuestions.map((question) => (
                        <div key={question.id} className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            {question.question}
                            {question.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          <textarea
                            rows={3}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                              question.required && question.answer.trim() === '' ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="Enter your answer..."
                            value={question.answer}
                            onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                          />
                          {question.required && question.answer.trim() === '' && (
                            <p className="text-sm text-red-600">This question is required.</p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={onClose}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                          isSubmitting
                            ? 'bg-indigo-400 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <CheckIcon className="-ml-1 mr-2 h-4 w-4" aria-hidden="true" />
                            Submit Application
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
