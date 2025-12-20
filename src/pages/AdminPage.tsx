import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { useQuery } from '@tanstack/react-query';
import { getFamilyMembers, getYears, getBooks, getRecommendations } from '../services/supabaseService';

const AdminPage: React.FC = () => {
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect non-admin users
  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/');
    }
  }, [user, isAdmin, authLoading, navigate]);

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

  const isLoading = authLoading || membersLoading || yearsLoading || booksLoading || recommendationsLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null; // Will redirect from useEffect
  }

  const adminItems = [
    {
      title: 'Manage Books',
      count: books.length,
      description: 'Add, edit, or remove books from the collection',
      actions: [
        { label: 'View All', href: '/books' },
        { label: 'Add New', href: '/admin/books/new' },
      ],
    },
    {
      title: 'Manage Years',
      count: years.length,
      description: 'Add new academic years or set the current active year',
      actions: [
        { label: 'View All', href: '/years' },
        { label: 'Add New', href: '/admin/years/new' },
      ],
    },
    {
      title: 'Manage Family Members',
      count: familyMembers.length,
      description: 'Add or edit family member profiles',
      actions: [
        { label: 'View All', href: '/admin/family-members' },
        { label: 'Add New', href: '/admin/family-members/new' },
      ],
    },
    {
      title: 'Manage Recommendations',
      count: recommendations.length,
      description: 'Add, edit, or remove book recommendations',
      actions: [
        { label: 'View All', href: '/admin/recommendations' },
        { label: 'Add New', href: '/admin/recommendations/new' },
      ],
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
            <p className="text-gray-600 mb-6">{item.description}</p>
            <div className="flex space-x-3">
              {item.actions.map((action) => (
                <Link key={action.label} to={action.href}>
                  <Button variant={action.label === 'Add New' ? 'primary' : 'outline'}>
                    {action.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Admin Settings</h2>
        <p className="text-gray-600 mb-4">
          Additional administrative settings will be implemented in future versions.
        </p>
        <Button variant="outline" onClick={() => alert("Settings feature coming soon")}>
          Settings
        </Button>
      </div>
    </div>
  );
};

export default AdminPage; 