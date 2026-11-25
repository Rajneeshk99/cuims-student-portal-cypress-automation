const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://students.cuchd.in',

    setupNodeEvents(on, config) {
      config.env.CUIMS_UID =
        process.env.CYPRESS_CUIMS_UID ||
        process.env.CUIMS_UID ||
        config.env.CUIMS_UID;

      config.env.CUIMS_PASSWORD =
        process.env.CYPRESS_CUIMS_PASSWORD ||
        process.env.CUIMS_PASSWORD ||
        config.env.CUIMS_PASSWORD;

      if (!config.env.CUIMS_UID || !config.env.CUIMS_PASSWORD) {
        throw new Error(
          'CUIMS credentials missing. Check your .env file in the project root.'
        );
      }

      return config;
    },
  },
});