import React from 'react';
import { Category } from '../types';

interface RegistrationSuccessModalProps {
  accessCode: string;
  categories: Category[];
  onClose: () => void;
}

export function RegistrationSuccessModal({ accessCode, categories, onClose }: RegistrationSuccessModalProps) {
  const getCategoryLabel = (category: Category): string => {
    switch (category) {
      case 'A-SPONSORED':
        return 'A - Sponsored Rider';
      case 'B-AMATEUR':
        return 'B - Amateur Rider';
      default:
        return category;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          
          <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">
            Registration Successful!
          </h3>
          
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-4">
              You have been registered for the following categories:
            </p>
            <ul className="text-sm text-gray-600 mb-6">
              {categories.map(category => (
                <li key={category} className="mb-1">
                  {getCategoryLabel(category)}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Important: Save Your Access Code
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    Your access code is: <span className="font-bold text-lg">{accessCode}</span>
                  </p>
                  <p className="mt-1">
                    You will need this code to access and edit your profile later.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-accent-orange text-base font-medium text-white hover:bg-accent-orange/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-orange sm:text-sm"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
