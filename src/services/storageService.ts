import { supabase } from '../supabase';

const BOOK_COVERS_BUCKET = 'book-covers';

/**
 * Initialize storage buckets if they don't exist
 */
export const initializeStorage = async (): Promise<void> => {
  try {
    // Check if book-covers bucket exists
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      // Storage listing requires auth - skip silently if not authenticated
      console.log('Storage: Skipping bucket check (requires authentication)');
      return;
    }
    
    // Create book covers bucket if it doesn't exist
    if (!buckets.find(bucket => bucket.name === BOOK_COVERS_BUCKET)) {
      const { error: createError } = await supabase.storage.createBucket(
        BOOK_COVERS_BUCKET, 
        { public: true }
      );
      
      if (createError) {
        // Bucket creation might be restricted - log but don't throw
        console.log('Storage: Could not create bucket (may need manual setup in Supabase Dashboard)');
        return;
      }
      
      console.log(`Created ${BOOK_COVERS_BUCKET} bucket`);
    }
  } catch (error) {
    // Don't throw - storage is optional functionality
    console.log('Storage initialization skipped:', error instanceof Error ? error.message : 'Unknown error');
  }
};

/**
 * Upload a book cover image to Supabase storage
 */
export const uploadBookCover = async (
  file: File, 
  bookId: string
): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${bookId}.${fileExt}`;
    
    const { error } = await supabase.storage
      .from(BOOK_COVERS_BUCKET)
      .upload(fileName, file, { upsert: true });
    
    if (error) {
      throw error;
    }
    
    // Get the public URL
    const { data } = supabase.storage
      .from(BOOK_COVERS_BUCKET)
      .getPublicUrl(fileName);
    
    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading book cover:', error);
    throw error;
  }
};

/**
 * Delete a book cover image from Supabase storage
 */
export const deleteBookCover = async (bookId: string, fileExt: string): Promise<void> => {
  try {
    const fileName = `${bookId}.${fileExt}`;
    
    const { error } = await supabase.storage
      .from(BOOK_COVERS_BUCKET)
      .remove([fileName]);
    
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error deleting book cover:', error);
    throw error;
  }
};

/**
 * Get public URL for a file
 */
export const getPublicUrl = (filePath: string): string => {
  const { data } = supabase.storage
    .from(BOOK_COVERS_BUCKET)
    .getPublicUrl(filePath);
  
  return data.publicUrl;
}; 