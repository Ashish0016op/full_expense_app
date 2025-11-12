import axios from 'axios';

// Single place to configure axios base URL for the frontend.
// Uses REACT_APP_API_URL from environment when available, otherwise falls back to localhost.
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5500';

axios.defaults.baseURL = baseURL;

// Optionally you can set common headers here, e.g.:
// axios.defaults.headers.common['Content-Type'] = 'application/json';

// No default export needed because this file mutates the axios module globally.
