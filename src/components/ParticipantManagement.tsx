import React, { useState } from 'react';
import { useContestStore } from '../store/contestStore';
import { Participant, Category } from '../types';
import { formatAddress } from '../utils/participant';
import { Edit2, DollarSign, Eye, EyeOff } from 'lucide-react';
import { EditParticipantModal } from './EditParticipantModal';

export function ParticipantManagement() {
  const { participants, updateParticipant, toggleCategoryPayment } = useContestStore();
  const [editingParticipant, setEditingParticipant] = useState<Participant | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAccessCodes, setShowAccessCodes] = useState<Record<string, boolean>>({});

  const sortedParticipants = [...participants].sort((a, b) => 
    a.lastName.localeCompare(b.lastName) || a.firstName.localeCompare(b.firstName)
  );

  const filteredParticipants = sortedParticipants.filter(participant => {
    const searchLower = searchTerm.toLowerCase();
    return (
      participant.firstName.toLowerCase().includes(searchLower) ||
      participant.lastName.toLowerCase().includes(searchLower) ||
      formatAddress(participant).toLowerCase().includes(searchLower)
    );
  });

  const handleEdit = (participant: Participant) => {
    setEditingParticipant(participant);
  };

  const handleSave = (updatedParticipant: Participant) => {
    updateParticipant(updatedParticipant.id, updatedParticipant);
    setEditingParticipant(null);
  };

  const toggleAccessCode = (participantId: string) => {
    setShowAccessCodes(prev => ({
      ...prev,
      [participantId]: !prev[participantId]
    }));
  };

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
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search participants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm input-primary"
        />
      </div>

      <div className="bg-surface shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-secondary text-white">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Address
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Categories & Payment Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Access Code
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-gray-200">
            {filteredParticipants.map((participant) => (
              <tr key={participant.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-primary">
                    {participant.lastName}, {participant.firstName}
                  </div>
                  {participant.isSponsored && participant.sponsorDetails && (
                    <div className="text-sm text-gray-500">
                      Sponsored by: {participant.sponsorDetails}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-primary">
                    {formatAddress(participant)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    {participant.categories.map((category) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-sm text-primary">{getCategoryLabel(category)}</span>
                        <button
                          onClick={() => toggleCategoryPayment(participant.id, category)}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            participant.paidCategories.includes(category)
                              ? 'bg-accent-green bg-opacity-20 text-accent-green'
                              : 'bg-accent-yellow bg-opacity-20 text-accent-orange'
                          }`}
                        >
                          <DollarSign className="w-4 h-4 mr-1" />
                          {participant.paidCategories.includes(category) ? 'Paid' : 'Unpaid'}
                        </button>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono">
                      {showAccessCodes[participant.id] ? participant.accessCode : '****'}
                    </span>
                    <button
                      onClick={() => toggleAccessCode(participant.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showAccessCodes[participant.id] ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(participant)}
                    className="text-accent-orange hover:text-accent-orange/80"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingParticipant && (
        <EditParticipantModal
          participant={editingParticipant}
          onSave={handleSave}
          onCancel={() => setEditingParticipant(null)}
        />
      )}
    </div>
  );
}
