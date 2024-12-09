import React, { useEffect } from 'react';
import { useContestStore } from '../store/contestStore';
import { Category, Participant } from '../types';
import { getParticipantSponsor } from '../utils/participant';

export function ParticipantsList() {
  const { participants } = useContestStore();

  // Filter participants who have at least one paid category
  const paidParticipantsByCategory = {};
  const unpaidParticipantsByCategory = {};
  participants.forEach(participant => {
    const paidCategories = participant.paidCategories;
    const unpaidCategories = participant.categories.filter(cat => !paidCategories.includes(cat));

    paidCategories.forEach(category => {
      if (!paidParticipantsByCategory[category]) {
        paidParticipantsByCategory[category] = [];
      }
      paidParticipantsByCategory[category].push(participant);
    });

    unpaidCategories.forEach(category => {
      if (!unpaidParticipantsByCategory[category]) {
        unpaidParticipantsByCategory[category] = [];
      }
      unpaidParticipantsByCategory[category].push(participant);
    });
  });

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(paidParticipantsByCategory).map(([category, participants]) => (
          <div key={category} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-secondary px-4 py-3">
              <h2 className="text-lg font-semibold text-white">
                {category}
                <div className="text-sm font-medium text-gray-300 mt-1">
                  Paid: {participants.length}, Unpaid: {unpaidParticipantsByCategory[category]?.length || 0}
                </div>
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              <ul className="list-none p-0">
                {participants.map(participant => (
                  <li key={participant.id} className="py-2 bg-light-blue hover:bg-light-orange">
                    <div className="text-sm font-medium text-primary">
                      {participant.firstName} {participant.lastName}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {getParticipantSponsor(participant)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
