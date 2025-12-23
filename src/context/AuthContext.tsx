import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../supabase';
import { FamilyMember } from '../types';
import { logger } from '../utils/logger';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  familyMember: FamilyMember | null;
  isAdmin: boolean;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithMagicLink: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [familyMember, setFamilyMember] = useState<FamilyMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        logger.error('Error getting session:', error);
        setSession(null);
        setUser(null);
        setFamilyMember(null);
        setIsLoading(false);
        return;
      }

      logger.debug('Initial session check:', session ? 'Session found' : 'No session');
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchFamilyMember(session.user.id);
      } else {
        setIsLoading(false);
      }
    }).catch((err) => {
      logger.error('Exception getting session:', err);
      setSession(null);
      setUser(null);
      setFamilyMember(null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        logger.debug('Auth state change event:', event, 'Has session:', !!session);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_OUT') {
          logger.debug('User signed out, clearing all state');
          setSession(null);
          setUser(null);
          setFamilyMember(null);
          setIsLoading(false);
          return;
        }
        
        if (session?.user) {
          // This could be a new sign-in or a session refresh
          if (event === 'SIGNED_IN') {
            logger.debug('User signed in, checking/creating family member record');
            await fetchOrCreateFamilyMember(session.user.id, session.user);
          } else if (event === 'TOKEN_REFRESHED') {
            logger.debug('Token refreshed, fetching family member');
            await fetchFamilyMember(session.user.id);
          } else {
            await fetchFamilyMember(session.user.id);
          }
        } else {
          setFamilyMember(null);
          setIsLoading(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchFamilyMember = async (userId: string) => {
    try {
      logger.debug('Fetching family member for user:', userId);
      const { data, error } = await supabase
        .from('family_members')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error) {
        logger.error('Error fetching family member:', error);
        setFamilyMember(null);
      } else {
        logger.debug('Family member found:', data);
        setFamilyMember(data);
      }
    } catch (error) {
      logger.error('Error fetching family member:', error);
      setFamilyMember(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrCreateFamilyMember = async (userId: string, userDetails: User) => {
    try {
      logger.debug('Checking if family member exists for user:', userId);
      
      // First try to fetch existing family member by user_id
      const { data: existingMember, error: fetchError } = await supabase
        .from('family_members')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (!fetchError && existingMember) {
        logger.debug('Existing family member found with user_id:', existingMember);
        setFamilyMember(existingMember);
        setIsLoading(false);
        return;
      }
      
      // No user_id match - check if there's a family member with this email
      const userEmail = userDetails.email;
      if (!userEmail) {
        logger.error('No email found for Google user');
        setFamilyMember(null);
        setIsLoading(false);
        return;
      }
      
      logger.debug('Checking for family member with email:', userEmail);
      const { data: memberByEmail, error: emailError } = await supabase
        .from('family_members')
        .select('*')
        .eq('email', userEmail)
        .maybeSingle();
      
      if (emailError) {
        logger.error('Error looking up family member by email:', emailError);
        setFamilyMember(null);
        setIsLoading(false);
        return;
      }
      
      if (memberByEmail) {
        // Found a family member with matching email - link them!
        logger.debug('Found family member with matching email, linking accounts:', memberByEmail);
        
        const { data: updatedMember, error: updateError } = await supabase
          .from('family_members')
          .update({ user_id: userId })
          .eq('id', memberByEmail.id)
          .select()
          .single();
        
        if (updateError) {
          logger.error('Error linking family member to user:', updateError);
          setFamilyMember(null);
        } else {
          logger.debug('Successfully linked family member to user:', updatedMember);
          setFamilyMember(updatedMember);
        }
      } else {
        // No matching email found - unauthorized access
        logger.error('No family member found with email:', userEmail);
        logger.error('This Google account is not authorized to access this application');
        setFamilyMember(null);
        // Optionally sign the user out since they're not authorized
        await supabase.auth.signOut();
      }
    } catch (error) {
      logger.error('Error in fetchOrCreateFamilyMember:', error);
      setFamilyMember(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (error) {
      logger.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const signInWithMagicLink = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (error) {
      logger.error('Error signing in with magic link:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      logger.debug('Signing out...');
      const { error } = await supabase.auth.signOut();
      if (error) {
        logger.error('Supabase signOut error:', error);
        throw error;
      }
      
      // Clear state immediately
      logger.debug('Clearing auth state...');
      setSession(null);
      setUser(null);
      setFamilyMember(null);
      
      // Also clear localStorage to ensure clean sign out
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.includes('supabase')) {
          logger.debug('Clearing localStorage key:', key);
          localStorage.removeItem(key);
        }
      });
      
      logger.debug('Sign out complete');
    } catch (error) {
      logger.error('Error signing out:', error);
      
      // Even if there's an error, try to clear local state
      setSession(null);
      setUser(null);
      setFamilyMember(null);
      
      // Clear localStorage anyway
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.includes('supabase')) {
          localStorage.removeItem(key);
        }
      });
      
      throw error;
    }
  };

  const isAdmin = !!familyMember?.is_admin;

  const value = {
    session,
    user,
    familyMember,
    isAdmin,
    isLoading,
    signInWithGoogle,
    signInWithMagicLink,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 