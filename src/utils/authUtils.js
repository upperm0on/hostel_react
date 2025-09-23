// Authentication utility functions

/**
 * Checks if an error response indicates an unverified account
 * @param {Object} errorData - The error response data
 * @returns {boolean} - True if the error is due to unverified account
 */
export const isUnverifiedAccountError = (errorData) => {
  return (
    errorData?.error === "Account not verified" || 
    errorData?.account_verified === false ||
    errorData?.message?.includes("verify your email")
  );
};

/**
 * Handles unverified account error by redirecting to email verification page
 * @param {string} email - User's email address
 * @param {Function} navigate - React Router navigate function
 */
export const handleUnverifiedAccount = (email, navigate) => {
  if (email) {
    localStorage.setItem("email", email);
  }
  navigate("/email-verification");
};

/**
 * Wrapper function for API calls that handles unverified account errors
 * @param {Function} apiCall - The API call function
 * @param {string} email - User's email address
 * @param {Function} navigate - React Router navigate function
 * @returns {Promise} - The API call result
 */
export const withUnverifiedAccountHandling = async (apiCall, email, navigate) => {
  try {
    return await apiCall();
  } catch (error) {
    // If it's a fetch error with response, try to parse the error
    if (error.response) {
      try {
        const errorData = await error.response.json();
        if (isUnverifiedAccountError(errorData)) {
          handleUnverifiedAccount(email, navigate);
          return;
        }
      } catch (parseError) {
        // If we can't parse the error, just re-throw the original error
        throw error;
      }
    }
    throw error;
  }
};

/**
 * Checks if a fetch response indicates an unverified account
 * @param {Response} response - The fetch response
 * @returns {Promise<boolean>} - True if the response indicates unverified account
 */
export const checkResponseForUnverifiedAccount = async (response) => {
  if (!response.ok) {
    try {
      const errorData = await response.json();
      return isUnverifiedAccountError(errorData);
    } catch (error) {
      return false;
    }
  }
  return false;
};
