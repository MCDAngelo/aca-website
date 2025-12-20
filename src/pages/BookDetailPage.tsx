import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBookById } from '../services/supabaseService';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { getPlaceholderColor } from '../utils/placeholderUtils';

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, familyMember } = useAuth();
  const [imageError, setImageError] = useState(false);
  
  const { data: book, isLoading, error } = useQuery({
    queryKey: ['book', id],
    queryFn: () => id ? getBookById(id) : Promise.resolve(null),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="text-center p-12 bg-white rounded-lg shadow">
        <p className="text-xl font-semibold text-gray-700 mb-2">Book not found</p>
        <p className="text-gray-600 mb-6">The book you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/books')}>Back to Books</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/books')} 
          className="text-blue-600 hover:text-blue-800 mr-4"
        >
          &larr; Back to Books
        </button>
        {user && familyMember && (
          <div className="ml-auto">
            <Button
              variant="secondary"
              onClick={() => navigate(`/books/edit/${book.id}`)}
              className="mr-2"
            >
              Edit Book
            </Button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
              {!book.cover_image || imageError ? (
                <div className={`h-64 md:h-80 w-48 md:w-56 flex items-center justify-center rounded ${getPlaceholderColor(book.title)}`}>
                  <span className="text-white text-8xl font-bold">
                    {book.title.charAt(0).toUpperCase()}
                  </span>
                </div>
              ) : (
                <img 
                  src={book.cover_image} 
                  alt={`${book.title} cover`}
                  className="h-64 md:h-80 object-contain rounded"
                  onError={() => setImageError(true)}
                />
              )}
            </div>
            <div className="w-full md:w-2/3 md:pl-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-xl text-gray-700 mb-4">by {book.author}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {book.publication_year && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">Publication Year</h3>
                    <p className="text-gray-900">{book.publication_year}</p>
                  </div>
                )}
                
                {book.isbn && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">ISBN</h3>
                    <p className="text-gray-900">{book.isbn}</p>
                  </div>
                )}
                
                {book.page_count && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">Pages</h3>
                    <p className="text-gray-900">{book.page_count}</p>
                  </div>
                )}
                
                {book.categories && book.categories.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">Categories</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {book.categories.map((category, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {book.description && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Description</h3>
                  <p className="text-gray-700 whitespace-pre-line">{book.description}</p>
                </div>
              )}
              
              {book.google_books_id && (
                <div>
                  <a 
                    href={`https://books.google.com/books?id=${book.google_books_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    View on Google Books
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage; 