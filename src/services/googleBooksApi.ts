import { Book } from '../types';

const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export interface GoogleBookItem {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    description?: string;
    pageCount?: number;
    categories?: string[];
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    industryIdentifiers?: Array<{
      type: string;
      identifier: string;
    }>;
  };
}

export interface GoogleBooksResponse {
  items: GoogleBookItem[];
  totalItems: number;
}

/**
 * Search for books using the Google Books API
 */
export const searchBooks = async (query: string): Promise<GoogleBookItem[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${encodeURIComponent(query)}&key=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Google Books API error: ${response.status}`);
    }
    
    const data = await response.json() as GoogleBooksResponse;
    return data.items || [];
  } catch (error) {
    console.error('Error searching books:', error);
    return [];
  }
};

/**
 * Get a single book by Google Books ID
 */
export const getBookById = async (id: string): Promise<GoogleBookItem | null> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}?key=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`Google Books API error: ${response.status}`);
    }
    
    return await response.json() as GoogleBookItem;
  } catch (error) {
    console.error('Error getting book by ID:', error);
    return null;
  }
};

/**
 * Convert a Google Books item to our Book type
 */
export const convertGoogleBookToBook = (googleBook: GoogleBookItem): Partial<Book> => {
  const isbn = googleBook.volumeInfo.industryIdentifiers?.find(
    id => id.type === 'ISBN_13' || id.type === 'ISBN_10'
  )?.identifier;
  
  const publicationYear = googleBook.volumeInfo.publishedDate 
    ? parseInt(googleBook.volumeInfo.publishedDate.substring(0, 4))
    : undefined;
  
  return {
    title: googleBook.volumeInfo.title,
    author: googleBook.volumeInfo.authors?.join(', ') || 'Unknown',
    publication_year: publicationYear,
    cover_image: googleBook.volumeInfo.imageLinks?.thumbnail,
    isbn: isbn,
    google_books_id: googleBook.id,
    description: googleBook.volumeInfo.description,
    page_count: googleBook.volumeInfo.pageCount,
    categories: googleBook.volumeInfo.categories
  };
}; 