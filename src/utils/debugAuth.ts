import { supabase } from '../supabase';

// This file helps diagnose authentication and routing issues

// Helper to log environment variables (without exposing secrets)
export const logEnvironment = () => {
  console.log('Environment variables check:');
  
  // Check if Supabase URL exists and is properly formatted
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  if (!supabaseUrl) {
    console.error('⚠️ REACT_APP_SUPABASE_URL is missing!');
  } else {
    try {
      new URL(supabaseUrl);
      console.log('✅ REACT_APP_SUPABASE_URL is present and valid URL format');
    } catch (e) {
      console.error('⚠️ REACT_APP_SUPABASE_URL is not a valid URL format!', { 
        value: supabaseUrl.substring(0, 8) + '...' 
      });
    }
  }
  
  // Check if Supabase anon key exists
  const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
  if (!supabaseAnonKey) {
    console.error('⚠️ REACT_APP_SUPABASE_ANON_KEY is missing!');
  } else {
    const keyLength = supabaseAnonKey.length;
    console.log(`✅ REACT_APP_SUPABASE_ANON_KEY is present (${keyLength} characters)`);
  }
  
  // Check Google Books API key if needed
  const googleBooksApiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
  if (!googleBooksApiKey) {
    console.warn('⚠️ REACT_APP_GOOGLE_BOOKS_API_KEY is missing (may be needed for book search)');
  } else {
    console.log('✅ REACT_APP_GOOGLE_BOOKS_API_KEY is present');
  }
};

// Helper to check Supabase connection
export const checkSupabaseConnection = async () => {
  try {
    console.log('Testing Supabase connection...');
    const start = Date.now();
    
    // Try to make a simple query to check connection
    const { error } = await supabase
      .from('books')
      .select('count', { count: 'exact', head: true });
    
    const duration = Date.now() - start;
    
    if (error) {
      console.error('❌ Supabase connection failed:', error.message);
      if (error.message.includes('JWT')) {
        console.error('  This appears to be an authentication issue. Check your anon key.');
      }
      if (error.message.includes('connection')) {
        console.error('  This appears to be a network connection issue. Check your URL and internet.');
      }
      return false;
    }
    
    console.log(`✅ Supabase connection successful (${duration}ms)`);
    return true;
  } catch (err) {
    console.error('❌ Unexpected error testing Supabase:', err);
    return false;
  }
};

// Helper to diagnose common auth issues
export const diagnoseAuthIssues = async () => {
  console.log('Diagnosing auth issues...');
  
  try {
    // Check if we have a session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      console.log('❌ No active session found. User is not authenticated.');
      return false;
    }
    
    console.log('✅ Active session found', {
      userId: session.user.id,
      expiresAt: new Date(session.expires_at! * 1000).toLocaleString(),
    });
    
    // Check if the token is valid by making an authenticated request
    const { error } = await supabase.from('family_members').select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ Authentication token appears invalid:', error.message);
      return false;
    }
    
    console.log('✅ Authentication token is valid');
    return true;
  } catch (err) {
    console.error('❌ Error diagnosing auth:', err);
    return false;
  }
};

// Run all diagnostics
export const runAllDiagnostics = async () => {
  console.group('🔍 ACA Archive Diagnostics');
  
  logEnvironment();
  const connectionSuccess = await checkSupabaseConnection();
  
  if (connectionSuccess) {
    await diagnoseAuthIssues();
  }
  
  console.log('\n📋 Diagnostics Summary:');
  console.log('- Check that your .env file exists with proper values');
  console.log('- Ensure your Supabase project is running and accessible');
  console.log('- Verify that your Google OAuth is configured correctly in Supabase');
  console.log('- Check the browser console for any CORS or network errors');
  
  console.groupEnd();
};

// Export default function to run diagnostics
export default runAllDiagnostics; 