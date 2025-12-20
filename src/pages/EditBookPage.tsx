import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBookById, updateBook } from '../services/supabaseService';
import { Book } from '../types';
import BookForm from '../components/BookForm';
import { useAuth } from '../context/AuthContext';

const EditBookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, familyMember, isLoading: authLoading } = useAuth();
  
  // Redirect non-authenticated users
  React.useEffect(() => {
    if (!authLoading && (!user || !familyMember)) {
      navigate('/login');
    }
  }, [user, familyMember, authLoading, navigate]);
  
  const { data: book, isLoading: isLoadingBook } = useQuery({
    queryKey: ['book', id],
    queryFn: () => id ? getBookById(id) : Promise.resolve(null),
    enabled: !!id && !!user && !!familyMember,
  });
  
  const { mutate, isPending: isUpdating } = useMutation({
    mutationFn: (bookData: Partial<Book>) => updateBook(id!, bookData),
    onSuccess: (data) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['book', id] });
      // Navigate to the book's detail page
      navigate(`/books/${data.id}`);
    },
    onError: (error) => {
      console.error('Error updating book:', error);
      alert('Failed to update book. Please try again.');
    },
  });
  
  const handleSubmit = (data: Partial<Book>) => {
    mutate(data);
  };
  
  if (authLoading || isLoadingBook) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user || !familyMember) {
    return null; // Will redirect from useEffect
  }
  
  if (!book) {
    return (
      <div className="text-center p-12 bg-white rounded-lg shadow">
        <p className="text-xl font-semibold text-gray-700 mb-2">Book not found</p>
        <p className="text-gray-600 mb-6">The book you're trying to edit doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/books')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Back to Books
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Book: {book.title}</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <BookForm
          initialData={book}
          onSubmit={handleSubmit}
          isLoading={isUpdating}
        />
      </div>
    </div>
  );
};

export default EditBookPage; 