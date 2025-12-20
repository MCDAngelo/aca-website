/**
 * Generate a color based on a string (typically book title) for visual variety
 * @param text - The text to generate a color for
 * @returns Tailwind CSS color class
 */
export const getPlaceholderColor = (text: string): string => {
  if (!text) return 'bg-gray-400';
  
  const colors = [
    'bg-blue-500', 
    'bg-green-500', 
    'bg-purple-500', 
    'bg-pink-500', 
    'bg-indigo-500', 
    'bg-teal-500',
    'bg-orange-500', 
    'bg-red-500'
  ];
  
  const index = text.charCodeAt(0) % colors.length;
  return colors[index];
};

