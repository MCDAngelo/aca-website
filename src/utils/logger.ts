/**
 * Logger utility that gates console statements behind environment checks
 * Only debug and info logs will appear in development mode
 * Warnings and errors always appear
 */

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
  /**
   * Debug logs - only in development
   */
  debug: (...args: any[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },

  /**
   * Info logs - only in development
   */
  info: (...args: any[]) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },

  /**
   * Warning logs - always shown
   */
  warn: (...args: any[]) => {
    console.warn(...args);
  },

  /**
   * Error logs - always shown
   */
  error: (...args: any[]) => {
    console.error(...args);
  }
};

