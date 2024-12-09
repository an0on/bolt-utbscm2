import React from 'react';
import { useContestStore } from '../store/contestStore';
import { getParticipantById, getParticipantFullName } from '../utils/participant';

export function Scoring() {
  const [selectedHeatId, setSelectedHeatId] = React.useState<string>('');
  const [selectedParticipantId, setSelectedParticipantId] = React.useState<string>('');
  const [scores, setScores] = React.useState<{ [key: string]: number }>({});
  
  const { heats, addScore, participants } = useContestStore();

  const handleScoreSubmit = () => {
    if (!selectedHeatId || !selectedParticipantId) return;

    const judgeScores = Object.entries(scores).map(([judgeId, score]) => ({
      judgeId,
      score
    }));

    addScore({
      runId: crypto.randomUUID(),
      participantId: selectedParticipantId,
      judgeScores
    });

    setScores({});
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Score Entry</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Select Heat</label>
          <select
            value={selectedHeatId}
            onChange={e => setSelectedHeatId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select a heat...</option>
            {heats.map(heat => (
              <option key={heat.id} value={heat.id}>
                {heat.category} - Round {heat.round} - Heat {heat.id.slice(0, 4)}
              </option>
            ))}
          </select>
        </div>

        {selectedHeatId && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Participant</label>
            <select
              value={selectedParticipantId}
              onChange={e => setSelectedParticipantId(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select a participant...</option>
              {heats
                .find(h => h.id === selectedHeatId)
                ?.participants.map(participantId => {
                  const participant = getParticipantById(participants, participantId);
                  return participant ? (
                    <option key={participantId} value={participantId}>
                      {getParticipantFullName(participant)}
                    </option>
                  ) : null;
                })}
            </select>
          </div>
        )}

        {selectedParticipantId && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Judge Scores</h3>
            {Array.from({ length: 5 }, (_, i) => i + 1).map(judgeNum => (
              <div key={judgeNum}>
                <label className="block text-sm font-medium text-gray-700">
                  Judge {judgeNum}
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={scores[`judge${judgeNum}`] || ''}
                  onChange={e => setScores(prev => ({
                    ...prev,
                    [`judge${judgeNum}`]: Number(e.target.value)
                  }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            ))}

            <button
              onClick={handleScoreSubmit}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Scores
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
