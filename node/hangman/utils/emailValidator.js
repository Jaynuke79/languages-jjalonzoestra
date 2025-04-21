
 // Construct a regex for validating Unicode email addresses
 const emailRegex = new RegExp(
  // Start of pattern
  '^(?:[\\p{L}\\p{N}\'"(),.:;!?&\\s-]+<)?' +                   // Optional display name
  '([a-zA-Z0-9!#$%&\'*+/=?^_`{|}~\\u0080-\\uFFFF]+(?:\\.[a-zA-Z0-9!#$%&\'*+/=?^_`{|}~\\u0080-\\uFFFF]+)*)@' + // Local part
  '([a-zA-Z0-9\\u0080-\\uFFFF](?:[a-zA-Z0-9\\u0080-\\uFFFF-]{0,61}[a-zA-Z0-9\\u0080-\\uFFFF])?' + // First domain label
  '(?:\\.[a-zA-Z0-9\\u0080-\\uFFFF](?:[a-zA-Z0-9\\u0080-\\uFFFF-]{0,61}[a-zA-Z0-9\\u0080-\\uFFFF])?)*)' + // Subsequent labels
  '\\.[a-zA-Z\\u0080-\\uFFFF]{2,}' +                          // TLD (2+ letters)
  '(?:>)?$',                                                  // Optional closing bracket
  'u' // Unicode flag
);


/**
 * Checks if the given email is valid.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
function isEmailValid(email) {
  return emailRegex.test(email);
}

// Export the function for use in production and testing
module.exports = { isEmailValid };