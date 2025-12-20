import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRecommendationsByYear } from '../services/supabaseService';
import BookCard from '../components/BookCard';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const YearDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  
  const { data: recommendations = [], isLoading } = useQuery({
    queryKey: ['recommendations', id],
    queryFn: () => id ? getRecommendationsByYear(id) : Promise.resolve([]),
    enabled: !!id,
  });

  // Group recommendations by family member
  const recommendationsByMember = recommendations.reduce((acc, rec) => {
    if (!rec.family_member) return acc;
    
    const memberId = rec.family_member.id;
    if (!acc[memberId]) {
      acc[memberId] = {
        member: rec.family_member,
        recommendations: [],
      };
    }
    acc[memberId].recommendations.push(rec);
    return acc;
  }, {} as Record<string, { member: any; recommendations: any[] }>);

  return (
    <div>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/years')} 
          className="text-blue-600 hover:text-blue-800 mr-4"
        >
          &larr; Back to Years
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {recommendations[0]?.year?.academic_year || 'Year Details'}
        </h1>
        
        {user && isAdmin && (
          <div className="ml-auto">
            <Button
              variant="primary"
              onClick={() => window.location.href = `/admin/recommendations/new?year=${id}`}
            >
              Add Recommendation
            </Button>
          </div>
        )}
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading recommendations...</p>
          </div>
        </div>
      ) : Object.keys(recommendationsByMember).length > 0 ? (
        <div className="space-y-10">
          {Object.values(recommendationsByMember).map(({ member, recommendations }) => (
            <div key={member.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{member.name}'s Recommendations</h2>
              <div className="space-y-6">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="border-t pt-4">
                    {rec.book && <BookCard book={rec.book} />}
                    {rec.notes && (
                      <div className="mt-4 bg-gray-50 p-4 rounded-md">
                        <h3 className="font-semibold text-gray-700 mb-2">Notes:</h3>
                        <p className="text-gray-600 italic">{rec.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 bg-white rounded-lg shadow">
          <p className="text-xl font-semibold text-gray-700 mb-2">No recommendations for this year</p>
          <p className="text-gray-600">Recommendations will appear here once they are added.</p>
        </div>
      )}
    </div>
  );
};

export default YearDetailPage; 