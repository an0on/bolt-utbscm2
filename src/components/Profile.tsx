import React, { useState } from 'react';
import { useContestStore } from '../store/contestStore';
import { Eye, EyeOff } from 'lucide-react';
import { EditParticipantModal } from './EditParticipantModal';
import { ProfileSuccessModal } from './ProfileSuccessModal';

export function Profile() {
  const [accessCode, setAccessCode] = useState('');
  const [showAccessCode, setShowAccessCode] = useState(false);
  const [error, setError] = useState('');
  const { participants, updateParticipant } = useContestStore();
  const [participant, setParticipant] = useState<typeof participants[0] | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const found = participants.find(p => p.accessCode === accessCode);
    if (found) {
      setParticipant(found);
      setError('');
    } else {
      setError('Invalid access code. Please try again.');
    }
  };

  const handleSave = (updatedParticipant: typeof participants[0]) => {
    updateParticipant(updatedParticipant.id, updatedParticipant);
    setParticipant(updatedParticipant);
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setParticipant(null);
    setAccessCode('');
  };

  if (participant) {
    return (
      <>
        <EditParticipantModal
          participant={participant}
          onSave={handleSave}
          onCancel={() => setParticipant(null)}
          isProfileMode={true}
        />
        {showSuccessModal && (
          <ProfileSuccessModal onClose={handleSuccessModalClose} />
        )}
      </>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Access</h2>
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Access Code</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type={showAccessCode ? 'text' : 'password'}
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              className="block w-full pr-10 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your 4-digit code"
            />
            <button
              type="button"
              onClick={() => setShowAccessCode(!showAccessCode)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
            >
              {showAccessCode ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Access Profile
        </button>
      </form>
    </div>
  );
}
