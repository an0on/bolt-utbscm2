import React from 'react';
import { useContestStore } from '../store/contestStore';
import { Participant } from '../types';
import { getParticipantFullName } from '../utils/participant';

export function Announcements() {
  const { participants } = useContestStore();
  const announcements = participants.filter(p => p.paidCategories.length > 0).map(p => getParticipantFullName(p));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Announcements</h2>
      <ul>
        {announcements.map((announcement) => (
          <li key={announcement}>{announcement}</li>
        ))}
      </ul>
    </div>
  );
}
