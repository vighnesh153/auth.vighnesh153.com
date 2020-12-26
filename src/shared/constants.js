const constants = {
  isDevelopment: window.location.href.toString().startsWith('http://localhost'),
};

// Auth API URL
constants.apiUrl = constants.isDevelopment
  ? 'http://localhost:3001'
  : 'https://api.vighnesh153.com';

// Regex pattern for acceptable redirect URLs
constants.redirectUrlRegex = constants.isDevelopment
  ? /^.*$/
  : /^https:\/\/[a-zA-Z0-9-]*\.?vighnesh153\.com/

export default constants;
