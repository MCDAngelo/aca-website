import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from './Button';
import logoImage from '../assets/ACA_book_plate_logo.png';
import { logger } from '../utils/logger';
import { handleError } from '../utils/errorHandler';

const Navbar: React.FC = () => {
  const { user, familyMember, isAdmin, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Debug: Log auth state when it changes
  useEffect(() => {
    logger.debug('Navbar - Auth state:', { 
      hasUser: !!user, 
      hasFamilyMember: !!familyMember, 
      isAdmin,
      userId: user?.id,
      familyMemberName: familyMember?.name
    });
  }, [user, familyMember, isAdmin]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    logger.debug('Sign out button clicked');
    if (isSigningOut) {
      logger.debug('Already signing out, ignoring click');
      return;
    }
    
    setIsSigningOut(true);
    try {
      logger.debug('Calling signOut...');
      await signOut();
      logger.debug('SignOut successful, navigating to home...');
      navigate('/');
    } catch (error) {
      handleError(error, 'Failed to sign out. Please try again.');
    } finally {
      setIsSigningOut(false);
    }
  };

  // Build navigation links based on user authentication status
  const navLinks = [
    { to: '/', label: 'Home' },
  ];

  // Only show these links when user is authenticated and a family member
  if (user && familyMember) {
    navLinks.push({ to: '/years', label: 'Years' });
    navLinks.push({ to: '/books', label: 'Books' });
    navLinks.push({ to: '/books/new', label: 'Add Book' });
  }

  // Admin link for admin users
  if (isAdmin) {
    navLinks.push({ to: '/admin', label: 'Admin' });
  }

  // Settings link for authenticated users
  if (user) {
    navLinks.push({ to: '/settings', label: 'Settings' });
  }

  return (
    <nav className="bg-library-brown text-library-cream shadow-lg border-b border-library-saddle/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-3 group">
                <img 
                  src={logoImage} 
                  alt="ACA Archive" 
                  className="h-10 w-auto transition-transform group-hover:scale-105"
                />
                <span className="font-serif font-bold text-xl text-library-cream group-hover:text-library-gold transition-colors">
                  ACA Archive
                </span>
              </Link>
            </div>
            <div className="hidden md:ml-8 md:flex md:items-center md:space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.to
                      ? 'bg-library-saddle/50 text-library-gold'
                      : 'text-library-cream/80 hover:bg-library-saddle/30 hover:text-library-cream'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:ml-6">
            {user ? (
              <div className="flex items-center space-x-4">
                {familyMember && (
                  <div className="text-sm text-library-cream/70 mr-2">
                    Hello, <span className="text-library-gold">{familyMember.name}</span>
                  </div>
                )}
                <Button 
                  variant="outline" 
                  onClick={handleSignOut}
                  isLoading={isSigningOut}
                  className="border-library-cream/40 text-library-cream hover:bg-library-saddle/30 hover:border-library-cream/60"
                >
                  {isSigningOut ? 'Signing out...' : 'Sign Out'}
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="secondary">Sign In</Button>
              </Link>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-library-cream/70 hover:text-library-cream hover:bg-library-saddle/30 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-library-gold"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden border-t border-library-saddle/30`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                location.pathname === link.to
                  ? 'bg-library-saddle/50 text-library-gold'
                  : 'text-library-cream/80 hover:bg-library-saddle/30 hover:text-library-cream'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-library-saddle/30">
          <div className="flex items-center px-5">
            {user ? (
              <div className="w-full">
                {familyMember && (
                  <div className="text-library-cream/70 mb-3">
                    Hello, <span className="text-library-gold">{familyMember.name}</span>
                  </div>
                )}
                <Button 
                  variant="outline" 
                  onClick={async () => {
                    await handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  isLoading={isSigningOut}
                  fullWidth
                  className="border-library-cream/40 text-library-cream hover:bg-library-saddle/30"
                >
                  {isSigningOut ? 'Signing out...' : 'Sign Out'}
                </Button>
              </div>
            ) : (
              <Link to="/login" className="w-full" onClick={() => setIsMenuOpen(false)}>
                <Button variant="secondary" fullWidth>Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
