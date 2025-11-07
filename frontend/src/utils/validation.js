/**
 * Form validation utilities for Portfolio Builder
 */

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - Valid status
 */
export const isValidEmail = (email) => {
  if (!email) return true; // Empty is valid (optional field)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - Valid status
 */
export const isValidURL = (url) => {
  if (!url) return true; // Empty is valid (optional field)
  try {
    // Allow URLs without protocol
    const urlToTest = url.startsWith('http') ? url : `https://${url}`;
    const urlObj = new URL(urlToTest);
    
    // Check if hostname has at least one dot (e.g., github.com, not just "notaurl")
    // and doesn't contain spaces or invalid characters
    const hasValidDomain = urlObj.hostname.includes('.') && 
                          !urlObj.hostname.includes(' ') &&
                          urlObj.hostname.length > 3;
    
    return hasValidDomain;
  } catch {
    return false;
  }
};

/**
 * Validate phone number (flexible format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - Valid status
 */
export const isValidPhone = (phone) => {
  if (!phone) return true; // Empty is valid (optional field)
  // Allow various formats: +1-234-567-8900, (123) 456-7890, 123.456.7890, etc.
  const phoneRegex = /^[\d\s\-\+\(\)\.]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

/**
 * Check if a field is empty
 * @param {string} value - Value to check
 * @returns {boolean} - Empty status
 */
export const isEmpty = (value) => {
  return !value || value.trim().length === 0;
};

/**
 * Validate required field
 * @param {string} value - Value to check
 * @param {string} fieldName - Name of the field for error message
 * @returns {object} - { valid: boolean, error: string }
 */
export const validateRequired = (value, fieldName) => {
  if (isEmpty(value)) {
    return {
      valid: false,
      error: `${fieldName} is required`
    };
  }
  return { valid: true, error: '' };
};

/**
 * Validate email field
 * @param {string} email - Email to validate
 * @returns {object} - { valid: boolean, error: string }
 */
export const validateEmail = (email) => {
  if (!email) return { valid: true, error: '' };
  
  if (!isValidEmail(email)) {
    return {
      valid: false,
      error: 'Please enter a valid email address'
    };
  }
  return { valid: true, error: '' };
};

/**
 * Validate URL field
 * @param {string} url - URL to validate
 * @returns {object} - { valid: boolean, error: string }
 */
export const validateURL = (url) => {
  if (!url) return { valid: true, error: '' };
  
  if (!isValidURL(url)) {
    return {
      valid: false,
      error: 'Please enter a valid URL'
    };
  }
  return { valid: true, error: '' };
};

/**
 * Validate phone field
 * @param {string} phone - Phone to validate
 * @returns {object} - { valid: boolean, error: string }
 */
export const validatePhone = (phone) => {
  if (!phone) return { valid: true, error: '' };
  
  if (!isValidPhone(phone)) {
    return {
      valid: false,
      error: 'Please enter a valid phone number'
    };
  }
  return { valid: true, error: '' };
};

/**
 * Validate personal info form
 * @param {object} personalInfo - Personal info object
 * @returns {object} - { valid: boolean, errors: object }
 */
export const validatePersonalInfo = (personalInfo) => {
  const errors = {};
  
  // Name is the only required field
  if (isEmpty(personalInfo.fullName)) {
    errors.fullName = 'Full name is required';
  }
  
  // Validate optional fields if provided
  const emailValidation = validateEmail(personalInfo.email);
  if (!emailValidation.valid) {
    errors.email = emailValidation.error;
  }
  
  const phoneValidation = validatePhone(personalInfo.phone);
  if (!phoneValidation.valid) {
    errors.phone = phoneValidation.error;
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate contact links
 * @param {object} contact - Contact object with social links
 * @returns {object} - { valid: boolean, errors: object }
 */
export const validateContact = (contact) => {
  const errors = {};
  
  // Validate all URLs if provided
  const urlFields = ['github', 'linkedin', 'twitter', 'website'];
  
  urlFields.forEach(field => {
    const validation = validateURL(contact[field]);
    if (!validation.valid) {
      errors[field] = validation.error;
    }
  });
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate project links
 * @param {string} githubLink - GitHub URL
 * @param {string} liveLink - Live demo URL
 * @returns {object} - { valid: boolean, errors: object }
 */
export const validateProjectLinks = (githubLink, liveLink) => {
  const errors = {};
  
  if (githubLink) {
    const validation = validateURL(githubLink);
    if (!validation.valid) {
      errors.githubLink = validation.error;
    }
  }
  
  if (liveLink) {
    const validation = validateURL(liveLink);
    if (!validation.valid) {
      errors.liveLink = validation.error;
    }
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};

export default {
  isValidEmail,
  isValidURL,
  isValidPhone,
  isEmpty,
  validateRequired,
  validateEmail,
  validateURL,
  validatePhone,
  validatePersonalInfo,
  validateContact,
  validateProjectLinks
};
