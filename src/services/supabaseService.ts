import { supabase } from '../supabase';
import { Book, FamilyMember, Year, Recommendation } from '../types';

// Auth services
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  
  const { data: user, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

// Books services
export const getBooks = async (): Promise<Book[]> => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .order('title');
    
  if (error) throw error;
  return data || [];
};

export const getBookById = async (id: string): Promise<Book | null> => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) throw error;
  return data;
};

export const createBook = async (book: Partial<Book>): Promise<Book> => {
  const { data, error } = await supabase
    .from('books')
    .insert(book)
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const updateBook = async (id: string, book: Partial<Book>): Promise<Book> => {
  const { data, error } = await supabase
    .from('books')
    .update(book)
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const deleteBook = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('books')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
};

// Family members services
export const getFamilyMembers = async (): Promise<FamilyMember[]> => {
  const { data, error } = await supabase
    .from('family_members')
    .select('*')
    .order('name');
    
  if (error) throw error;
  return data || [];
};

export const getFamilyMemberById = async (id: string): Promise<FamilyMember | null> => {
  const { data, error } = await supabase
    .from('family_members')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) throw error;
  return data;
};

// Years services
export const getYears = async (): Promise<Year[]> => {
  const { data, error } = await supabase
    .from('years')
    .select('*')
    .order('academic_year', { ascending: false });
    
  if (error) throw error;
  return data || [];
};

export const getActiveYear = async (): Promise<Year | null> => {
  const { data, error } = await supabase
    .from('years')
    .select('*')
    .eq('is_active', true)
    .single();
    
  if (error) throw error;
  return data;
};

// Recommendations services
export const getRecommendations = async (): Promise<Recommendation[]> => {
  const { data, error } = await supabase
    .from('recommendations')
    .select(`
      *,
      book:books(*),
      family_member:family_members(*),
      year:years(*)
    `)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data || [];
};

export const getRecommendationsByYear = async (yearId: string): Promise<Recommendation[]> => {
  const { data, error } = await supabase
    .from('recommendations')
    .select(`
      *,
      book:books(*),
      family_member:family_members(*),
      year:years(*)
    `)
    .eq('year_id', yearId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data || [];
};

export const createRecommendation = async (recommendation: Partial<Recommendation>): Promise<Recommendation> => {
  const { data, error } = await supabase
    .from('recommendations')
    .insert(recommendation)
    .select(`
      *,
      book:books(*),
      family_member:family_members(*),
      year:years(*)
    `)
    .single();
    
  if (error) throw error;
  return data;
};

export const updateRecommendation = async (id: string, recommendation: Partial<Recommendation>): Promise<Recommendation> => {
  const { data, error } = await supabase
    .from('recommendations')
    .update(recommendation)
    .eq('id', id)
    .select(`
      *,
      book:books(*),
      family_member:family_members(*),
      year:years(*)
    `)
    .single();
    
  if (error) throw error;
  return data;
};

export const deleteRecommendation = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('recommendations')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
}; 