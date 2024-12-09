import { Participant } from '../types';

export const getParticipantFullName = (participant: Participant): string => {
  const sponsorText = participant.isSponsored && participant.sponsorDetails 
    ? ` (Sponsored by: ${participant.sponsorDetails})`
    : '';
  return `${participant.firstName} ${participant.lastName}${sponsorText}`;
};

export const getParticipantById = (
  participants: Participant[],
  participantId: string
): Participant | undefined => {
  return participants.find((p) => p.id === participantId);
};

export const formatAddress = (participant: Participant): string => {
  const { street, houseNumber, postalCode, city } = participant.address;
  return `${street} ${houseNumber}, ${postalCode} ${city}`;
};

export const getParticipantSponsor = (participant: Participant): string => {
  return participant.isSponsored && participant.sponsorDetails ? participant.sponsorDetails : '';
};
