import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getBooks } from '../services/supabaseService';
import BookCard from '../components/BookCard';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const BooksPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, familyMember } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const { data: books = [], isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
  });

  // Filter books based on search term
  const filteredBooks = books.filter((book) => {
    if (!searchTerm.trim()) return true;
    
    const term = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term) ||
      (book.description && book.description.toLowerCase().includes(term))
    );
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Book Collection</h1>
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search books..."
              className="w-full md:w-64 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Clear search</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
          {user && familyMember && (
            <Button
              variant="primary"
              onClick={() => navigate('/books/new')}
            >
              Add New Book
            </Button>
          )}
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading books...</p>
          </div>
        </div>
      ) : filteredBooks.length > 0 ? (
        <div className="grid gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center p-12 bg-white rounded-lg shadow">
          {searchTerm ? (
            <>
              <p className="text-xl font-semibold text-gray-700 mb-2">No books match your search</p>
              <p className="text-gray-600">Try different keywords or browse all books by clearing your search.</p>
            </>
          ) : (
            <>
              <p className="text-xl font-semibold text-gray-700 mb-2">No books added yet</p>
              <p className="text-gray-600 mb-6">Books added to the collection will appear here.</p>
              {user && familyMember && (
                <Button
                  variant="primary"
                  onClick={() => navigate('/books/new')}
                >
                  Add Your First Book
                </Button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BooksPage; 