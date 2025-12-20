import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Book } from '../types';
import { getPlaceholderColor } from '../utils/placeholderUtils';

interface BookCardProps {
  book: Book;
  showLink?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, showLink = true }) => {
  const [imageError, setImageError] = useState(false);
  const showPlaceholder = !book.cover_image || imageError;
  
  return (
    <motion.div 
      className="vintage-card rounded-lg overflow-hidden transition-all"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 flex justify-center p-4 bg-library-cream/50">
          {showPlaceholder ? (
            <div className={`h-48 w-32 flex items-center justify-center rounded shadow-md ${getPlaceholderColor(book.title)}`}>
              <span className="text-white text-6xl font-serif font-bold drop-shadow-lg">
                {book.title.charAt(0).toUpperCase()}
              </span>
            </div>
          ) : (
            <img 
              src={book.cover_image} 
              alt={`${book.title} cover`}
              className="h-48 object-contain rounded shadow-md"
              onError={() => setImageError(true)}
            />
          )}
        </div>
        <div className="w-full md:w-2/3 p-4">
          <h3 className="font-serif text-xl text-library-brown mb-2">{book.title}</h3>
          <p className="text-library-wood mb-2">By {book.author}</p>
          {book.publication_year && (
            <p className="text-library-saddle text-sm mb-4">{book.publication_year}</p>
          )}
          
          {book.description && (
            <p className="text-library-wood text-sm mb-4 line-clamp-3 border-l-2 border-library-gold/50 pl-3 italic">
              {book.description}
            </p>
          )}
          
          {showLink && (
            <Link 
              to={`/books/${book.id}`}
              className="inline-block mt-2 px-4 py-2 bg-library-teal text-library-cream rounded hover:bg-library-saddle transition-all duration-300 vintage-btn"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
