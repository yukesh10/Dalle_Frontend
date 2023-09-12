// Read the NODE_ENV environment variable
const env = process.env.NODE_ENV || 'development';

// Load the proxy configuration based on the environment
const config = require(`../config/${env}.json`);

export default config;
