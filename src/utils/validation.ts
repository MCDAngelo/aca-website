/**
 * Validation schemas using Zod
 * Provides type-safe validation for forms and data inputs
 */

import { z } from 'zod';

/**
 * Book validation schema
 */
export const bookSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(500, 'Title must be less than 500 characters')
    .trim(),
  author: z.string()
    .min(1, 'Author is required')
    .max(200, 'Author name must be less than 200 characters')
    .trim(),
  publication_year: z.number()
    .int('Year must be a whole number')
    .min(1000, 'Year must be after 1000')
    .max(new Date().getFullYear() + 1, 'Year cannot be in the future')
    .optional()
    .nullable(),
  isbn: z.string()
    .refine((val) => !val || /^(\d{10}|\d{13})$/.test(val), {
      message: 'ISBN must be 10 or 13 digits',
    })
    .optional()
    .nullable(),
  cover_image_url: z.string()
    .refine((val) => !val || /^https?:\/\/.+/.test(val), {
      message: 'Must be a valid URL',
    })
    .optional()
    .nullable(),
  description: z.string()
    .max(2000, 'Description must be less than 2000 characters')
    .optional()
    .nullable(),
});

/**
 * Book schema for partial updates (all fields optional)
 */
export const bookUpdateSchema = bookSchema.partial();

/**
 * Recommendation validation schema
 */
export const recommendationSchema = z.object({
  book_id: z.string().uuid('Invalid book ID'),
  family_member_id: z.string().uuid('Invalid family member ID'),
  year_id: z.string().uuid('Invalid year ID'),
  notes: z.string()
    .max(1000, 'Notes must be less than 1000 characters')
    .optional()
    .nullable(),
});

/**
 * Helper function to validate data against a schema
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Validated data or throws error
 */
export const validateData = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  return schema.parse(data);
};

/**
 * Safe validation that returns errors instead of throwing
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Object with success flag and data or errors
 */
export const safeValidate = <T>(schema: z.ZodSchema<T>, data: unknown) => {
  return schema.safeParse(data);
};

/**
 * Sanitize text input to prevent XSS
 * @param text - Text to sanitize
 * @returns Sanitized text
 */
export const sanitizeText = (text: string): string => {
  // Basic XSS prevention - remove script tags and dangerous attributes
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/g, '')
    .replace(/on\w+='[^']*'/g, '')
    .trim();
};

