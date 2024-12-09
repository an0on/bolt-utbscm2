import React from 'react';
import { useContestStore } from '../store/contestStore';
import { Category } from '../types';
import { getParticipantById } from '../utils/participant';

export function HeatManagement() {
  const { heats, participants } = useContestStore();

  // Group heats by category
  const heatsByCategory = heats.reduce((acc, heat) => {
    if (!acc[heat.category]) {
      acc[heat.category] = [];
    }
    acc[heat.category].push(heat);
    return acc;
  }, {} as Record<Category, typeof heats>);

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
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(['A-SPONSORED', 'B-AMATEUR', 'MINIRAMP', 'GIRLS'] as Category[]).map(category => (
          <div key={category} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-secondary px-4 py-3">
              <h2 className="text-lg font-semibold text-white">
                {getCategoryLabel(category)}
              </h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              {heatsByCategory[category]?.map((heat, heatIndex) => (
                <div key={heat.id} className="p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">
                    Heat {heatIndex + 1}
                  </h3>
                  <div className="space-y-3">
                    {heat.participants.map(participantId => {
                      const participant = getParticipantById(participants, participantId);
                      if (!participant) return null;
                      
                      return (
                        <div 
                          key={participantId} 
                          className="p-2 rounded bg-background hover:bg-gray-100 transition-colors"
                        >
                          <div className="text-sm font-medium text-primary">
                            {participant.lastName}, {participant.firstName}
                          </div>
                          {participant.isSponsored && participant.sponsorDetails && (
                            <div className="text-xs text-gray-500 mt-1">
                              Sponsored by: {participant.sponsorDetails}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              
              {(!heatsByCategory[category] || heatsByCategory[category].length === 0) && (
                <div className="p-4 text-sm text-gray-500 italic">
                  No heats available
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
