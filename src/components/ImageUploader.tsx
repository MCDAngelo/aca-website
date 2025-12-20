import React, { useState } from 'react';
import Button from './Button';

interface ImageUploaderProps {
  onUpload: (file: File) => Promise<string>;
  existingImageUrl?: string;
  label?: string;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onUpload,
  existingImageUrl,
  label = 'Upload Image',
  className = '',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(existingImageUrl);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];
    
    // Basic validation
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Size validation (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);
      setError(null);
      
      // Call the onUpload function prop to handle the actual upload
      const url = await onUpload(file);
      
      setImageUrl(url);
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {imageUrl && (
        <div className="mb-4 relative">
          <img 
            src={imageUrl} 
            alt="Uploaded" 
            className="w-32 h-32 object-cover rounded-md"
          />
        </div>
      )}
      
      <div className="flex items-center">
        <label className="relative cursor-pointer">
          <Button
            type="button"
            variant="outline"
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : label}
          </Button>
          
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />
        </label>
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default ImageUploader; 