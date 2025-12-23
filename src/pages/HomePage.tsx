import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useRecommendations from '../hooks/useRecommendations';
import Button from '../components/Button';
import heroImage from '../assets/eugenio-mazzone-6ywyo2qtaZ8-unsplash.jpg';
import logoImage from '../assets/ACA_book_plate_logo.png';
import { UI_CONFIG } from '../config/constants';

const HomePage: React.FC = () => {
  const { user, familyMember, isLoading: authLoading } = useAuth();
  const { recommendations, isLoading: recLoading } = useRecommendations();
  const isLoading = authLoading || recLoading;

  // Get the latest recommendations
  const latestRecommendations = recommendations.slice(0, UI_CONFIG.HOME_PAGE_RECENT_ITEMS);

  // Get first name from family member name
  const firstName = familyMember?.name?.split(' ')[0] || '';

  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8 -mt-8">
      {/* Hero Section */}
      <div 
        className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 hero-overlay"></div>
        
        {/* Hero content */}
        <div className="relative z-10 text-center px-4 py-12">
          {/* Logo */}
          <img 
            src={logoImage} 
            alt="ACAs The Archives" 
            className="w-48 md:w-64 lg:w-72 mx-auto mb-8 drop-shadow-2xl"
          />
          
          {/* Welcome message */}
          {familyMember && (
            <p className="text-library-gold text-lg md:text-xl mb-4 font-serif">
              Welcome back, {firstName}
            </p>
          )}
          
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-library-cream mb-4 tracking-wide">
            A Family Book Archive
          </h1>
          
          <p className="text-library-cream/90 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Preserving our annual book recommendations, one story at a time.
          </p>
          
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-library-gold/50"></div>
            <div className="w-2 h-2 rotate-45 bg-library-gold/70"></div>
            <div className="w-16 h-px bg-library-gold/50"></div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {authLoading ? (
              <div className="w-48 h-12 bg-library-cream/20 rounded animate-pulse"></div>
            ) : user && familyMember ? (
              <>
                <Link to="/years">
                  <Button className="px-6 py-3 text-base">Browse by Year</Button>
                </Link>
                <Link to="/books">
                  <Button variant="outline" className="px-6 py-3 text-base border-library-cream/70 text-library-cream hover:bg-library-cream hover:text-library-brown transition-colors">
                    View All Books
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/login">
                <Button variant="secondary" className="px-6 py-3 text-base">
                  Sign In to View Archive
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {authLoading ? (
          <div className="vintage-card rounded-lg p-8">
            <div className="flex justify-center items-center h-32">
              <div className="w-8 h-8 border-2 border-library-teal border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        ) : user && familyMember ? (
          <div className="vintage-card rounded-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-2xl text-library-brown">Latest Recommendations</h2>
              <Link to="/years" className="text-library-teal hover:text-library-saddle transition-colors">
                View all →
              </Link>
            </div>

            {isLoading ? (
              <div className="text-center p-10 text-library-wood">Loading...</div>
            ) : latestRecommendations.length > 0 ? (
              <div className="space-y-6">
                {latestRecommendations.map((recommendation) => (
                  <div 
                    key={recommendation.id}
                    className="border border-library-wood/30 rounded-lg p-4 hover:shadow-md transition-all bg-library-cream/50"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/5 flex justify-center mb-4 md:mb-0">
                        <img 
                          src={recommendation.book?.cover_image || 'https://via.placeholder.com/128x192?text=No+Cover'}
                          alt={`${recommendation.book?.title} cover`}
                          className="h-36 object-contain rounded shadow-md"
                        />
                      </div>
                      <div className="w-full md:w-4/5 md:pl-6">
                        <h3 className="font-serif text-xl text-library-brown">
                          {recommendation.book?.title}
                        </h3>
                        <p className="text-library-wood mb-2">
                          By {recommendation.book?.author}
                        </p>
                        <p className="text-library-saddle mb-3">
                          Recommended by {recommendation.family_member?.name} ({recommendation.year?.academic_year})
                        </p>
                        {recommendation.notes && (
                          <p className="text-library-wood italic mb-3 border-l-2 border-library-gold pl-3">
                            "{recommendation.notes}"
                          </p>
                        )}
                        <Link 
                          to={`/books/${recommendation.book_id}`}
                          className="text-library-teal hover:text-library-saddle transition-colors"
                        >
                          View details →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-10 text-library-wood">
                No recommendations yet.
              </div>
            )}
          </div>
        ) : (
          <div className="vintage-card rounded-lg p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <svg className="w-20 h-20 mx-auto mb-6 text-library-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h2 className="font-serif text-3xl text-library-brown mb-4">
                Family Members Only
              </h2>
              <p className="text-lg text-library-wood mb-8">
                This is a private family archive. Sign in with your Google account to view our book recommendations and add your own.
              </p>
              <Link to="/login">
                <Button className="px-8 py-3 text-base">Sign In to Continue</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
