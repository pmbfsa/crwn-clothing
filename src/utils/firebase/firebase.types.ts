import type { Timestamp } from 'firebase/firestore';

export type UserData = {
  createdAt: Timestamp;
  displayName: string;
  email: string;
};

export type AdditionalInfo = {
  displayName?: string;
};

export type ObjectToAdd = {
  title: string;
};
