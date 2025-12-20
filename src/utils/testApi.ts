/**
 * This file contains utility functions for testing API calls
 * It can be run in the browser console to test API calls
 */

import { supabase } from '../supabase';
import { searchBooks, getBookById, convertGoogleBookToBook } from '../services/googleBooksApi';
import { 
  getBooks, getFamilyMembers, getYears, getRecommendations,
  createBook, createRecommendation
} from '../services/supabaseService';

// Test Supabase connection
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('books').select('count');
    if (error) throw error;
    console.log('Supabase connection successful:', data);
    return true;
  } catch (error) {
    console.error('Supabase connection failed:', error);
    return false;
  }
};

// Test Google Books API
export const testGoogleBooksApi = async (query: string = 'Harry Potter') => {
  try {
    console.log(`Searching for books with query: "${query}"...`);
    const books = await searchBooks(query);
    console.log(`Found ${books.length} books:`, books);
    
    if (books.length > 0) {
      const bookId = books[0].id;
      console.log(`Getting details for book ID: ${bookId}...`);
      const bookDetails = await getBookById(bookId);
      console.log('Book details:', bookDetails);
      
      if (bookDetails) {
        console.log('Converting Google Book to our Book format...');
        const convertedBook = convertGoogleBookToBook(bookDetails);
        console.log('Converted book:', convertedBook);
      }
    }
    
    return books.length > 0;
  } catch (error) {
    console.error('Google Books API test failed:', error);
    return false;
  }
};

// Test data fetching
export const testDataFetching = async () => {
  try {
    console.log('Fetching books...');
    const books = await getBooks();
    console.log(`Found ${books.length} books:`, books);
    
    console.log('Fetching family members...');
    const familyMembers = await getFamilyMembers();
    console.log(`Found ${familyMembers.length} family members:`, familyMembers);
    
    console.log('Fetching years...');
    const years = await getYears();
    console.log(`Found ${years.length} years:`, years);
    
    console.log('Fetching recommendations...');
    const recommendations = await getRecommendations();
    console.log(`Found ${recommendations.length} recommendations:`, recommendations);
    
    return {
      books: books.length,
      familyMembers: familyMembers.length,
      years: years.length,
      recommendations: recommendations.length
    };
  } catch (error) {
    console.error('Data fetching test failed:', error);
    return null;
  }
};

// Test adding a new book (admin only)
export const testAddBook = async (title: string, author: string) => {
  try {
    console.log(`Adding book: "${title}" by ${author}...`);
    const newBook = await createBook({
      title,
      author,
      publication_year: new Date().getFullYear(),
      description: 'Test book created for API testing'
    });
    console.log('Book added successfully:', newBook);
    return newBook;
  } catch (error) {
    console.error('Add book test failed:', error);
    return null;
  }
};

// Test adding a recommendation (admin only)
export const testAddRecommendation = async (bookId: string, familyMemberId: string, yearId: string) => {
  try {
    console.log(`Adding recommendation for book ID: ${bookId}...`);
    const newRecommendation = await createRecommendation({
      book_id: bookId,
      family_member_id: familyMemberId,
      year_id: yearId,
      notes: 'Test recommendation created for API testing'
    });
    console.log('Recommendation added successfully:', newRecommendation);
    return newRecommendation;
  } catch (error) {
    console.error('Add recommendation test failed:', error);
    return null;
  }
};

// Run all tests
export const runAllTests = async () => {
  console.log('==== Starting API Tests ====');
  
  console.log('\n1. Testing Supabase Connection');
  const supabaseConnected = await testSupabaseConnection();
  
  console.log('\n2. Testing Google Books API');
  const googleBooksWorking = await testGoogleBooksApi();
  
  console.log('\n3. Testing Data Fetching');
  const dataResults = await testDataFetching();
  
  // Only run admin tests if explicitly asked for
  // Do not include in automatic testing
  
  console.log('\n==== Test Results Summary ====');
  console.log(`Supabase Connection: ${supabaseConnected ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Google Books API: ${googleBooksWorking ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Data Fetching: ${dataResults ? '✅ PASS' : '❌ FAIL'}`);
  
  if (dataResults) {
    console.log('\nData counts:');
    console.log(`- Books: ${dataResults.books}`);
    console.log(`- Family Members: ${dataResults.familyMembers}`);
    console.log(`- Years: ${dataResults.years}`);
    console.log(`- Recommendations: ${dataResults.recommendations}`);
  }
  
  console.log('\n==== Tests Completed ====');
};

// Export for browser console testing
if (typeof window !== 'undefined') {
  (window as any).acaApiTests = {
    testSupabaseConnection,
    testGoogleBooksApi,
    testDataFetching,
    testAddBook,
    testAddRecommendation,
    runAllTests
  };
  
  console.log('API tests available in browser console as acaApiTests');
} 