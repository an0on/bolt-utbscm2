import React from 'react';

interface ProfileSuccessModalProps {
  onClose: () => void;
}

export function ProfileSuccessModal({ onClose }: ProfileSuccessModalProps) {
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
            Profile Updated Successfully!
          </h3>
          
          <div className="mt-4 mb-6">
            <p className="text-sm text-gray-500">
              Your profile changes have been saved.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-accent-orange text-base font-medium text-white hover:bg-accent-orange/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-orange sm:text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
