/**
 * Application-wide constants
 * Centralized configuration values to avoid magic numbers
 */

/**
 * React Query configuration
 */
export const QUERY_CONFIG = {
  STALE_TIME: 5 * 60 * 1000, // 5 minutes
  CACHE_TIME: 10 * 60 * 1000, // 10 minutes
};

/**
 * Search configuration
 */
export const SEARCH_CONFIG = {
  DEBOUNCE_MS: 500, // Debounce delay for search inputs
  MAX_GOOGLE_BOOKS_RESULTS: 5, // Maximum number of Google Books suggestions to show
};

/**
 * UI configuration
 */
export const UI_CONFIG = {
  HOME_PAGE_RECENT_ITEMS: 3, // Number of recent items to show on home page
};

/**
 * Validation configuration
 */
export const VALIDATION_CONFIG = {
  MAX_TITLE_LENGTH: 500,
  MAX_AUTHOR_LENGTH: 200,
  MAX_DESCRIPTION_LENGTH: 2000,
  MAX_NOTES_LENGTH: 1000,
  MIN_YEAR: 1000,
};

