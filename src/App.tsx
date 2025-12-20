import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import { logger } from './utils/logger';
import './App.css';

// Create a client
const queryClient = new QueryClient();

// Import pages here (we'll create these next)
const HomePage = React.lazy(() => import('./pages/HomePage'));
const BooksPage = React.lazy(() => import('./pages/BooksPage'));
const BookDetailPage = React.lazy(() => import('./pages/BookDetailPage'));
const YearsPage = React.lazy(() => import('./pages/YearsPage'));
const YearDetailPage = React.lazy(() => import('./pages/YearDetailPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const AdminPage = React.lazy(() => import('./pages/AdminPage'));
const AddBookPage = React.lazy(() => import('./pages/AddBookPage'));
const EditBookPage = React.lazy(() => import('./pages/EditBookPage'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

const App: React.FC = () => {
  // Log app version in development
  useEffect(() => {
    logger.info('ACA Archive v0.1.0');
    logger.info('Environment:', process.env.NODE_ENV);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#2C1810',
                color: '#F5F1E8',
                fontFamily: 'Georgia, serif',
              },
              success: {
                iconTheme: {
                  primary: '#D4AF37',
                  secondary: '#F5F1E8',
                },
              },
              error: {
                iconTheme: {
                  primary: '#8B1538',
                  secondary: '#F5F1E8',
                },
              },
            }}
          />
          <div className="min-h-screen bg-library-cream">
            <Navbar />
            <main className="py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <React.Suspense fallback={
                  <div className="text-center p-10">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-library-wood border-t-library-gold"></div>
                    <p className="mt-4 text-library-wood font-serif">Loading...</p>
                  </div>
                }>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    
                    {/* Book routes - specifically ordered */}
                    <Route path="/books" element={<BooksPage />} />
                    <Route path="/books/new" element={<AddBookPage />} />
                    <Route path="/books/edit/:id" element={<EditBookPage />} />
                    
                    {/* Dynamic ID route comes after all specific book routes */}
                    <Route path="/books/:id" element={<BookDetailPage />} />
                    
                    {/* Other routes */}
                    <Route path="/years" element={<YearsPage />} />
                    <Route path="/years/:id" element={<YearDetailPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </React.Suspense>
              </div>
            </main>
            <footer className="bg-library-brown py-6 border-t border-library-saddle/30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-library-cream/70 text-sm font-serif">
                  &copy; {new Date().getFullYear()} ACA Archive. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
