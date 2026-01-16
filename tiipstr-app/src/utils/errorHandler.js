// Translate Firebase error codes to user-friendly messages

export const getErrorMessage = (errorCode) => {
  const errorMessages = {
    // Auth errors
    'auth/email-already-in-use': 'This email is already registered. Please log in instead.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/weak-password': 'Password should be at least 6 characters long.',
    'auth/network-request-failed': 'Network error. Please check your internet connection.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/requires-recent-login': 'Please log in again to continue.',
    'auth/invalid-credential': 'Invalid email or password. Please try again.',

    // Firestore errors
    'permission-denied': 'You don\'t have permission to perform this action.',
    'not-found': 'The requested data was not found.',
    'already-exists': 'This item already exists.',
    'failed-precondition': 'Operation failed. Please try again.',
    'unavailable': 'Service is currently unavailable. Please try again later.',

    // Default
    'default': 'An error occurred. Please try again.',
  };

  return errorMessages[errorCode] || errorMessages['default'];
};

// Get user-friendly error message from error object
export const handleError = (error) => {
  if (error.code) {
    return getErrorMessage(error.code);
  }
  return error.message || 'An unexpected error occurred.';
};
