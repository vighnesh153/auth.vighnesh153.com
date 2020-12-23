const constants = {
  isDevelopment: window.location.href.toString().startsWith('http://localhost'),
};

constants.apiUrl = constants.isDevelopment
  ? 'http://localhost:3001'
  : 'https://api.vighnesh153.com';

export default constants;
