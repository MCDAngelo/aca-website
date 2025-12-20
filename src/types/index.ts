export interface Book {
  id: string;
  title: string;
  author: string;
  publication_year?: number;
  cover_image?: string;
  isbn?: string;
  google_books_id?: string;
  description?: string;
  page_count?: number;
  categories?: string[];
  created_at: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  email?: string;
  avatar_url?: string;
  is_admin: boolean;
  created_at: string;
}

export interface Year {
  id: string;
  academic_year: string;
  is_active: boolean;
  created_at: string;
}

export interface Recommendation {
  id: string;
  book_id: string;
  family_member_id: string;
  year_id: string;
  notes?: string;
  rating?: number;
  created_at: string;
  updated_at?: string;
  book?: Book;
  family_member?: FamilyMember;
  year?: Year;
}

export type UserRole = 'admin' | 'member' | 'viewer';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  family_member_id?: string;
  created_at: string;
  family_member?: FamilyMember;
} 