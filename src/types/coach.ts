export interface Coach {
  id: string;
  name: string;
  age: number;
  bio: string;
  description?: string;
  avatar: string;
  isOnline: boolean;
  isVerified: boolean;
  isPremium?: boolean;
  style: string;
  interests: string[];
  specialties?: string[];
  rating?: number;
  reviewCount?: number;
  languages?: string[];
  location?: string;
  experience?: string;
}