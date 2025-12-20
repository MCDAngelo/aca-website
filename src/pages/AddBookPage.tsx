import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBook } from '../services/supabaseService';
import { Book } from '../types';
import BookForm from '../components/BookForm';
import { useAuth } from '../context/AuthContext';
import { logger } from '../utils/logger';
import { handleError, showSuccess } from '../utils/errorHandler';

const AddBookPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, familyMember, isLoading: authLoading } = useAuth();
  
  logger.debug('AddBookPage - Auth state:', { 
    user: !!user, 
    familyMember: !!familyMember, 
    isLoading: authLoading 
  });
  
  // Redirect non-authenticated users
  useEffect(() => {
    logger.debug('AddBookPage - useEffect running, auth state:', { 
      user: !!user, 
      familyMember: !!familyMember, 
      isLoading: authLoading 
    });
    
    if (!authLoading && (!user || !familyMember)) {
      logger.debug('AddBookPage - Redirecting to login');
      navigate('/login');
    }
  }, [user, familyMember, authLoading, navigate]);
  
  const { mutate, isPending } = useMutation({
    mutationFn: (bookData: Partial<Book>) => createBook(bookData),
    onSuccess: (data) => {
      // Invalidate books query to refresh data
      queryClient.invalidateQueries({ queryKey: ['books'] });
      showSuccess('Book created successfully!');
      // Navigate to the new book's detail page
      navigate(`/books/${data.id}`);
    },
    onError: (error) => {
      handleError(error, 'Failed to create book. Please try again.');
    },
  });
  
  const handleSubmit = (data: Partial<Book>) => {
    mutate(data);
  };
  
  if (authLoading) {
    logger.debug('AddBookPage - Showing loading state');
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
    logger.debug('AddBookPage - Returning null due to no user/familyMember');
    return null; // Will redirect from useEffect
  }
  
  logger.debug('AddBookPage - Rendering form');
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Book</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <BookForm
          onSubmit={handleSubmit}
          isLoading={isPending}
        />
      </div>
    </div>
  );
};

export default AddBookPage; 