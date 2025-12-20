import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Book } from '../types';
import Button from './Button';
import ImageUploader from './ImageUploader';
import { uploadBookCover } from '../services/storageService';
import { searchBooks } from '../services/googleBooksApi';
import { getPlaceholderColor } from '../utils/placeholderUtils';

interface BookFormProps {
  initialData?: Partial<Book>;
  onSubmit: (data: Partial<Book>) => void;
  isLoading: boolean;
}

type FormData = Omit<Book, 'id' | 'created_at'> & {
  categories_string?: string;
};

const BookForm: React.FC<BookFormProps> = ({
  initialData = {},
  onSubmit,
  isLoading,
}) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      title: initialData.title || '',
      author: initialData.author || '',
      publication_year: initialData.publication_year || undefined,
      cover_image: initialData.cover_image || '',
      isbn: initialData.isbn || '',
      google_books_id: initialData.google_books_id || '',
      description: initialData.description || '',
      page_count: initialData.page_count || undefined,
      categories_string: initialData.categories ? initialData.categories.join(', ') : '',
    }
  });
  
  const [googleBooksResults, setGoogleBooksResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [useGoogleBooksCover, setUseGoogleBooksCover] = useState(true);
  const [showCoverSearch, setShowCoverSearch] = useState(false);
  const [coverSearchResults, setCoverSearchResults] = useState<any[]>([]);
  const [isSearchingCovers, setIsSearchingCovers] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const watchedTitle = watch('title');
  const watchedAuthor = watch('author');
  const watchedCoverImage = watch('cover_image');
  
  // Reset image error when cover image changes
  useEffect(() => {
    setImageError(false);
  }, [watchedCoverImage]);
  
  // Search Google Books API as user types title
  const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setValue('title', title);
    
    if (title.length > 2) {
      try {
        setIsSearching(true);
        setSearchTerm(title);
        const results = await searchBooks(title);
        setGoogleBooksResults(results.slice(0, 5)); // Show top 5 results
      } catch (error) {
        console.error('Error searching Google Books:', error);
      } finally {
        setIsSearching(false);
      }
    } else {
      setGoogleBooksResults([]);
    }
  };
  
  // Fill form with Google Books data
  const fillFromGoogleBooks = (book: any) => {
    setValue('title', book.volumeInfo.title);
    setValue('author', book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : '');
    setValue('publication_year', book.volumeInfo.publishedDate ? parseInt(book.volumeInfo.publishedDate.substring(0, 4)) : undefined);
    if (useGoogleBooksCover && book.volumeInfo.imageLinks?.thumbnail) {
      setValue('cover_image', book.volumeInfo.imageLinks.thumbnail);
    }
    setValue('isbn', book.volumeInfo.industryIdentifiers?.find((id: any) => id.type === 'ISBN_13')?.identifier || 
                  book.volumeInfo.industryIdentifiers?.find((id: any) => id.type === 'ISBN_10')?.identifier || '');
    setValue('google_books_id', book.id);
    setValue('description', book.volumeInfo.description || '');
    setValue('page_count', book.volumeInfo.pageCount);
    setValue('categories_string', book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : '');
    setGoogleBooksResults([]);
  };
  
  // Handle custom image upload
  const handleImageUpload = async (file: File) => {
    try {
      // Generate a temporary ID if we don't have one (for new books)
      const tempId = initialData.id || `temp-${Date.now()}`;
      const imageUrl = await uploadBookCover(file, tempId);
      setValue('cover_image', imageUrl);
      setUseGoogleBooksCover(false);
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };
  
  // Search Google Books for cover images
  const handleSearchForCover = async () => {
    const title = watchedTitle;
    const author = watchedAuthor;
    
    if (!title || title.length < 2) {
      alert('Please enter a book title first');
      return;
    }
    
    try {
      setIsSearchingCovers(true);
      setShowCoverSearch(true);
      const searchQuery = author ? `${title} ${author}` : title;
      const results = await searchBooks(searchQuery);
      // Filter results that have cover images
      const resultsWithCovers = results.filter(book => book.volumeInfo.imageLinks?.thumbnail);
      setCoverSearchResults(resultsWithCovers.slice(0, 10));
    } catch (error) {
      console.error('Error searching for covers:', error);
      alert('Failed to search for covers. Please try again.');
    } finally {
      setIsSearchingCovers(false);
    }
  };
  
  // Select a cover from Google Books search
  const selectCoverFromSearch = (book: any) => {
    if (book.volumeInfo.imageLinks?.thumbnail) {
      setValue('cover_image', book.volumeInfo.imageLinks.thumbnail);
      setUseGoogleBooksCover(true);
      setShowCoverSearch(false);
      setCoverSearchResults([]);
    }
  };
  
  const processFormData = (data: FormData): Partial<Book> => {
    // Process categories from comma-separated string to array
    const categories = data.categories_string
      ? data.categories_string.split(',').map(cat => cat.trim()).filter(Boolean)
      : undefined;
    
    const bookData: Partial<Book> = {
      ...data,
      categories,
      // Convert empty strings to undefined for numeric fields
      publication_year: data.publication_year || undefined,
      page_count: data.page_count || undefined,
    };
    
    // Remove the categories_string field which is not part of the Book type
    delete (bookData as any).categories_string;
    
    return bookData;
  };
  
  return (
    <form onSubmit={handleSubmit(data => onSubmit(processFormData(data)))} className="space-y-6">
      {/* Google Books search results */}
      {googleBooksResults.length > 0 && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Suggestions from Google Books for "{searchTerm}"
          </h3>
          <div className="space-y-3">
            {googleBooksResults.map(book => (
              <div 
                key={book.id} 
                className="p-3 bg-white rounded border hover:bg-blue-50 cursor-pointer flex items-center"
                onClick={() => fillFromGoogleBooks(book)}
              >
                {book.volumeInfo.imageLinks?.thumbnail && (
                  <img 
                    src={book.volumeInfo.imageLinks.thumbnail} 
                    alt={book.volumeInfo.title}
                    className="w-12 h-16 object-cover mr-3"
                  />
                )}
                <div>
                  <h4 className="font-medium">{book.volumeInfo.title}</h4>
                  <p className="text-sm text-gray-600">
                    {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown author'}
                    {book.volumeInfo.publishedDate ? ` (${book.volumeInfo.publishedDate.substring(0, 4)})` : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title*
          </label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            onChange={handleTitleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
          {isSearching && (
            <p className="mt-1 text-sm text-gray-500">Searching Google Books...</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author*
          </label>
          <input
            type="text"
            {...register('author', { required: 'Author is required' })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.author && (
            <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Publication Year
          </label>
          <input
            type="number"
            {...register('publication_year', { 
              min: { value: 1000, message: 'Year must be at least 1000' },
              max: { value: new Date().getFullYear(), message: 'Year cannot be in the future' }
            })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.publication_year && (
            <p className="mt-1 text-sm text-red-600">{errors.publication_year.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ISBN
          </label>
          <input
            type="text"
            {...register('isbn')}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Page Count
          </label>
          <input
            type="number"
            {...register('page_count', { 
              min: { value: 1, message: 'Page count must be at least 1' }
            })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.page_count && (
            <p className="mt-1 text-sm text-red-600">{errors.page_count.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categories (comma-separated)
          </label>
          <input
            type="text"
            {...register('categories_string')}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Fiction, Fantasy, Adventure"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register('description')}
            rows={4}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Cover Image
          </label>
          
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Display current image or placeholder */}
            <div className="w-32 flex-shrink-0">
              {watchedCoverImage && !imageError ? (
                <img 
                  src={watchedCoverImage} 
                  alt={`Cover for ${watchedTitle}`}
                  className="max-w-full h-auto rounded-md shadow-sm"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className={`h-48 w-32 flex items-center justify-center rounded ${getPlaceholderColor(watchedTitle || 'Book')}`}>
                  <span className="text-white text-6xl font-bold">
                    {watchedTitle ? watchedTitle.charAt(0).toUpperCase() : '?'}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex-grow">
              <input
                type="hidden"
                {...register('cover_image')}
              />
              
              <div className="space-y-3">
                {/* Search Google Books for cover */}
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSearchForCover}
                    disabled={isSearchingCovers}
                  >
                    {isSearchingCovers ? 'Searching...' : 'Search Google Books for Cover'}
                  </Button>
                  <p className="mt-1 text-sm text-gray-500">
                    Search Google Books to find and select a cover image
                  </p>
                </div>
                
                {/* Upload custom image */}
                <div>
                  <ImageUploader
                    onUpload={handleImageUpload}
                    existingImageUrl={initialData.cover_image}
                    label="Upload Custom Image"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Or upload your own cover image
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Cover search results modal */}
          {showCoverSearch && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Select a Cover Image
                  </h3>
                  <button
                    onClick={() => {
                      setShowCoverSearch(false);
                      setCoverSearchResults([]);
                    }}
                    className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                  >
                    &times;
                  </button>
                </div>
                
                <div className="p-4 overflow-y-auto">
                  {isSearchingCovers ? (
                    <div className="flex justify-center items-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
                    </div>
                  ) : coverSearchResults.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {coverSearchResults.map((book) => (
                        <div
                          key={book.id}
                          className="cursor-pointer hover:opacity-75 transition-opacity"
                          onClick={() => selectCoverFromSearch(book)}
                        >
                          <img
                            src={book.volumeInfo.imageLinks?.thumbnail}
                            alt={book.volumeInfo.title}
                            className="w-full h-auto rounded shadow-md"
                          />
                          <p className="mt-2 text-xs text-gray-700 line-clamp-2">
                            {book.volumeInfo.title}
                          </p>
                          {book.volumeInfo.authors && (
                            <p className="text-xs text-gray-500 line-clamp-1">
                              {book.volumeInfo.authors.join(', ')}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-600">No covers found. Try adjusting the book title or author.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : initialData.id ? 'Update Book' : 'Add Book'}
        </Button>
      </div>
    </form>
  );
};

export default BookForm; 