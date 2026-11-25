const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://students.cuchd.in',

    setupNodeEvents(on, config) {
      config.env.username =
        process.env.CYPRESS_USERNAME ||
        process.env.CUIMS_UID ||
        config.env.username ||
        config.env.CUIMS_UID;

      config.env.password =
        process.env.CYPRESS_PASSWORD ||
        process.env.CUIMS_PASSWORD ||
        config.env.password ||
        config.env.CUIMS_PASSWORD;

      if (!config.env.username || !config.env.password) {
        throw new Error(
          'CUIMS credentials missing. Check your .env file in the project root.'
        );
      }

      return config;
    },
  },
});