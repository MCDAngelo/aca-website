/**
 * Centralized error handling utility
 * Provides consistent error display using toast notifications
 */

import toast from 'react-hot-toast';
import { logger } from './logger';

/**
 * Handle errors with logging and user notification
 * @param error - The error object or message
 * @param userMessage - User-friendly message to display
 */
export const handleError = (error: unknown, userMessage: string) => {
  logger.error(error);
  toast.error(userMessage);
};

/**
 * Display a success message to the user
 * @param message - Success message to display
 */
export const showSuccess = (message: string) => {
  toast.success(message);
};

/**
 * Display an info message to the user
 * @param message - Info message to display
 */
export const showInfo = (message: string) => {
  toast(message);
};

/**
 * Display a warning message to the user
 * @param message - Warning message to display
 */
export const showWarning = (message: string) => {
  toast(message, { icon: '⚠️' });
};

