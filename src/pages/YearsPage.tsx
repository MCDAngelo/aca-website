import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getYears } from '../services/supabaseService';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const YearsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, familyMember, isAdmin, isLoading: authLoading } = useAuth();
  
  // Redirect unauthenticated users
  useEffect(() => {
    if (!authLoading && (!user || !familyMember)) {
      navigate('/login');
    }
  }, [user, familyMember, authLoading, navigate]);
  
  const { data: years = [], isLoading } = useQuery({
    queryKey: ['years'],
    queryFn: getYears,
    enabled: !!user && !!familyMember,
  });

  if (authLoading || !user || !familyMember) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Browse by Year</h1>
        {user && isAdmin && (
          <Button
            variant="primary"
            onClick={() => window.location.href = '/admin/years/new'}
          >
            Add New Year
          </Button>
        )}
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading years...</p>
          </div>
        </div>
      ) : years.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {years.map((year) => (
            <Link 
              key={year.id} 
              to={`/years/${year.id}`}
              className="block"
            >
              <div className={`
                bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg 
                ${year.is_active ? 'border-l-4 border-blue-500' : ''}
              `}>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{year.academic_year}</h2>
                {year.is_active && (
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                    Current Year
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 bg-white rounded-lg shadow">
          <p className="text-xl font-semibold text-gray-700 mb-2">No years added yet</p>
          <p className="text-gray-600">Academic years will appear here once they are added.</p>
        </div>
      )}
    </div>
  );
};

export default YearsPage; 