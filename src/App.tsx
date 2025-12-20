import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import { initializeStorage } from './services/storageService';
import runAllDiagnostics from './utils/debugAuth';
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

// Debug component for route debugging
const DebugRoute = ({ path }: { path: string }) => {
  console.log(`Debug route matched: ${path}`);
  return (
    <div className="p-8 bg-library-burgundy/20 border border-library-burgundy rounded">
      <h2 className="font-serif text-xl text-library-burgundy">Route Debug</h2>
      <p className="mt-2 text-library-brown">Matched path: {path}</p>
      <p className="mt-1 text-library-wood">This route is being caught by a debug handler.</p>
    </div>
  );
};

// Load test utilities in development mode
if (process.env.NODE_ENV === 'development') {
  import('./utils/testApi').then((module) => {
    console.log('Test utilities loaded. Access via `acaApiTests` in console.');
  });
}

const App: React.FC = () => {
  // Add version info to console for debugging
  useEffect(() => {
    console.log('ACA Archive v0.1.0');
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Current URL:', window.location.href);

    // Run diagnostics in development mode
    if (process.env.NODE_ENV === 'development') {
      runAllDiagnostics().catch(err => {
        console.error('Error running diagnostics:', err);
      });
    }

    // Initialize storage buckets
    const setupStorage = async () => {
      try {
        await initializeStorage();
        console.log('Storage buckets initialized');
      } catch (error) {
        console.error('Failed to initialize storage buckets:', error);
      }
    };

    setupStorage();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
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
                    
                    {/* Debug routes to help diagnose issues */}
                    <Route path="/books/new/*" element={<DebugRoute path="/books/new/*" />} />
                    <Route path="/books/edit/*" element={<DebugRoute path="/books/edit/*" />} />
                    
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
