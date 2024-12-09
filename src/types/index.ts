export type Category = 'A-SPONSORED' | 'B-AMATEUR' | 'MINIRAMP' | 'GIRLS';

export interface Address {
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
}

export interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
  isSponsored: boolean;
  sponsorDetails?: string;
  categories: Category[];
  startNumber?: number;
  paidCategories: Category[];
  accessCode: string;
}

export interface Judge {
  id: string;
  name: string;
}

export interface Score {
  runId: string;
  participantId: string;
  judgeScores: {
    judgeId: string;
    score: number;
  }[];
  finalScore?: number;
}

export interface Heat {
  id: string;
  category: Category;
  participants: string[];
  round: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}
