'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, MagnifyingGlassIcon, PlusIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Candidate } from '@/types';
import MatchScoreBadge from './MatchScoreBadge';

interface CandidateSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCandidate: (candidate: Candidate) => void;
  candidates: Candidate[];
}

/**
 * CandidateSelectionModal Component
 * 
 * Modal for selecting candidates from the pipeline with filtering and search capabilities.
 * 
 * TODO: Future improvements for scaling:
 * - Add pagination for large candidate lists
 * - Implement advanced filtering (location, experience, skills)
 * - Add candidate sorting options (match score, experience, etc.)
 * - Implement candidate tagging and categorization
 * - Add candidate notes and comments
 * - Implement candidate status tracking
 * - Add bulk candidate selection
 * - Implement candidate recommendation algorithm
 * - Add candidate import/export functionality
 * - Implement candidate pipeline stages
 * - Add candidate activity timeline
 * - Implement candidate communication history
 */
export default function CandidateSelectionModal({
  isOpen,
  onClose,
  onSelectCandidate,
  candidates
}: CandidateSelectionModalProps) {
  // State for search and filtering functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScore, setSelectedScore] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  /**
   * Filters candidates based on search term and match score
   * TODO: Implement more sophisticated filtering:
   * - Filter by location, experience level, skills
   * - Add date range filtering
   * - Implement fuzzy search
   * - Add saved filter presets
   */
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesScore = selectedScore === 'all' || candidate.matchScore === selectedScore;
    
    return matchesSearch && matchesScore;
  });

  /**
   * Handles candidate selection and closes modal
   * TODO: Add candidate selection analytics
   * TODO: Implement candidate selection history
   * TODO: Add candidate selection validation
   */
  const handleCandidateSelect = (candidate: Candidate) => {
    onSelectCandidate(candidate);
    onClose();
  };

  // Check if there are low match candidates in the filtered results
  const hasLowMatchCandidates = filteredCandidates.some(candidate => candidate.matchScore === 'low');

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
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
                      Select a Candidate
                    </Dialog.Title>

                    {/* Low Match Warning Banner */}
                    {hasLowMatchCandidates && (
                      <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <h4 className="text-sm font-medium text-yellow-800">Submit at Your Own Risk</h4>
                            <p className="text-sm text-yellow-700 mt-1">
                              We only serve high-quality candidates. Low match candidates may not meet the job requirements and could impact your success rate.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Search and Filter Controls */}
                    <div className="mb-6 space-y-4">
                      <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search candidates..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>

                      {/* Match Score Filter Buttons */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedScore('all')}
                          className={`px-3 py-1 rounded-md text-sm font-medium ${
                            selectedScore === 'all'
                              ? 'bg-indigo-100 text-indigo-700'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          All
                        </button>
                        <button
                          onClick={() => setSelectedScore('high')}
                          className={`px-3 py-1 rounded-md text-sm font-medium ${
                            selectedScore === 'high'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          High Match
                        </button>
                        <button
                          onClick={() => setSelectedScore('medium')}
                          className={`px-3 py-1 rounded-md text-sm font-medium ${
                            selectedScore === 'medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          Medium Match
                        </button>
                        <button
                          onClick={() => setSelectedScore('low')}
                          className={`px-3 py-1 rounded-md text-sm font-medium ${
                            selectedScore === 'low'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          Low Match
                        </button>
                      </div>
                    </div>

                    {/* Candidates List */}
                    <div className="max-h-96 overflow-y-auto">
                      {filteredCandidates.length === 0 ? (
                        <div className="text-center py-8">
                          <div className="mx-auto h-12 w-12 text-gray-400">
                            <PlusIcon className="h-12 w-12" />
                          </div>
                          <h3 className="mt-2 text-sm font-medium text-gray-900">No candidates found</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {searchTerm || selectedScore !== 'all' 
                              ? 'Try adjusting your search or filter criteria.'
                              : 'Get started by adding some candidates to your pipeline.'
                            }
                          </p>
                          <div className="mt-6">
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              onClick={() => window.open('https://linkedin.com', '_blank')}
                            >
                              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                              Source Candidates on LinkedIn
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {filteredCandidates.map((candidate) => (
                            <div
                              key={candidate.id}
                              className={`border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                                candidate.matchScore === 'low' 
                                  ? 'border-yellow-200 bg-yellow-50' 
                                  : 'border-gray-200'
                              }`}
                              onClick={() => handleCandidateSelect(candidate)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                        <span className="text-sm font-medium text-indigo-700">
                                          {candidate.firstName[0]}{candidate.lastName[0]}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900 truncate">
                                        {candidate.firstName} {candidate.lastName}
                                      </p>
                                      <p className="text-sm text-gray-500 truncate">{candidate.email}</p>
                                      <p className="text-sm text-gray-500 truncate">{candidate.location}</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <MatchScoreBadge score={candidate.matchScore} />
                                  <div className="text-right">
                                    <p className="text-sm text-gray-900">{candidate.experience} years exp.</p>
                                    <p className="text-xs text-gray-500">
                                      {candidate.skills?.slice(0, 3).join(', ')}
                                      {candidate.skills && candidate.skills.length > 3 && '...'}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {candidate.matchReason && (
                                <div className="mt-2 text-xs text-gray-600">
                                  {candidate.matchReason}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
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