import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { useQuery } from '@tanstack/react-query';
import { getFamilyMembers, getYears, getBooks, getRecommendations } from '../services/supabaseService';
import { showInfo } from '../utils/errorHandler';

const AdminPage: React.FC = () => {
  const { user, familyMember, isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect non-admin users
  useEffect(() => {
    if (!authLoading && (!user || !familyMember)) {
      navigate('/login');
    } else if (!authLoading && user && familyMember && !isAdmin) {
      navigate('/');
    }
  }, [user, familyMember, isAdmin, authLoading, navigate]);

  const { data: familyMembers = [], isLoading: membersLoading } = useQuery({
    queryKey: ['familyMembers'],
    queryFn: getFamilyMembers,
    enabled: !!user && isAdmin,
  });

  const { data: years = [], isLoading: yearsLoading } = useQuery({
    queryKey: ['years'],
    queryFn: getYears,
    enabled: !!user && isAdmin,
  });

  const { data: books = [], isLoading: booksLoading } = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
    enabled: !!user && isAdmin,
  });

  const { data: recommendations = [], isLoading: recommendationsLoading } = useQuery({
    queryKey: ['recommendations'],
    queryFn: getRecommendations,
    enabled: !!user && isAdmin,
  });

  const isLoading = authLoading || (user && isAdmin && (membersLoading || yearsLoading || booksLoading || recommendationsLoading));

  // Show loading only while auth is loading or data is loading for confirmed admin
  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // User is not authenticated or not a family member
  if (!user || !familyMember) {
    return null; // Will redirect to login from useEffect
  }

  // User is authenticated but not an admin
  if (!isAdmin) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">You need administrator privileges to access this page.</p>
          <Button onClick={() => navigate('/')}>Go to Home</Button>
        </div>
      </div>
    );
  }

  // Admin data is still loading
  if (membersLoading || yearsLoading || booksLoading || recommendationsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin data...</p>
        </div>
      </div>
    );
  }

  const adminItems = [
    {
      title: 'Manage Books',
      count: books.length,
      description: 'Add, edit, or remove books from the collection',
      actions: [
        { label: 'View All', href: '/books' },
        { label: 'Add New', href: '/books/new' },
      ],
    },
    {
      title: 'Manage Years',
      count: years.length,
      description: 'View years and book recommendations',
      actions: [
        { label: 'View All', href: '/years' },
      ],
      comingSoon: 'Add/Edit/Delete functionality coming soon',
    },
    {
      title: 'Family Members',
      count: familyMembers.length,
      description: 'View family member profiles',
      actions: [
        { label: 'View in Database', href: '#', external: true },
      ],
      comingSoon: 'Manage via Supabase Dashboard for now',
    },
    {
      title: 'Recommendations',
      count: recommendations.length,
      description: 'Track book recommendations by year',
      actions: [
        { label: 'View All', href: '/years' },
      ],
      comingSoon: 'Manage via book detail pages for now',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {adminItems.map((item) => (
          <div key={item.title} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                {item.count}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{item.description}</p>
            {item.comingSoon && (
              <p className="text-sm text-amber-600 mb-4 italic">
                💡 {item.comingSoon}
              </p>
            )}
            <div className="flex space-x-3">
              {item.actions.map((action) => (
                'external' in action && action.external ? (
                  <Button 
                    key={action.label} 
                    variant="outline"
                    onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
                  >
                    {action.label}
                  </Button>
                ) : (
                  <Link key={action.label} to={action.href}>
                    <Button variant={action.label === 'Add New' ? 'primary' : 'outline'}>
                      {action.label}
                    </Button>
                  </Link>
                )
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{books.length}</div>
            <div className="text-sm text-gray-600">Books</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{years.length}</div>
            <div className="text-sm text-gray-600">Years</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{familyMembers.length}</div>
            <div className="text-sm text-gray-600">Family Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600">{recommendations.length}</div>
            <div className="text-sm text-gray-600">Recommendations</div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Database Management</h3>
          <p className="text-sm text-gray-600 mb-3">
            For advanced operations (add years, manage family members, set admin roles), use the Supabase Dashboard.
          </p>
          <Button 
            variant="outline" 
            onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
          >
            Open Supabase Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 