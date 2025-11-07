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
  
  // Trim whitespace
  url = url.trim();
  
  // Reject if contains spaces or is too short
  if (url.includes(' ') || url.length < 4) {
    return false;
  }
  
  try {
    // Allow URLs without protocol
    const urlToTest = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
    const urlObj = new URL(urlToTest);
    
    // Extract hostname and validate
    const hostname = urlObj.hostname;
    
    // Must have at least one dot
    if (!hostname.includes('.')) {
      return false;
    }
    
    // Split into parts (e.g., "github.com" -> ["github", "com"])
    const parts = hostname.split('.');
    
    // Must have at least 2 parts
    if (parts.length < 2) {
      return false;
    }
    
    // Each part must be at least 2 characters (rejects "x.y", "no.co" edge cases)
    // Exception: TLDs like ".io" are valid, so only check non-TLD parts
    const domainPart = parts[parts.length - 2]; // The main domain part
    const tldPart = parts[parts.length - 1]; // The TLD
    
    if (domainPart.length < 2 || tldPart.length < 2) {
      return false;
    }
    
    // Ensure no invalid characters in hostname
    const validHostnamePattern = /^[a-zA-Z0-9.-]+$/;
    if (!validHostnamePattern.test(hostname)) {
      return false;
    }
    
    // Overall hostname should be at least 4 characters (e.g., "x.co" = 4)
    // But we want more strict - at least 5 to reject edge cases like "no.co"
    if (hostname.length < 5) {
      return false;
    }
    
    return true;
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
