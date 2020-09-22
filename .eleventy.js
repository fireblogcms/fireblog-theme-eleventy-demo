require('dotenv').config();
const moment = require('moment');
const path = require('path');
const fsExtra = require('fs-extra');

const config = {
  dir: {
    input: 'src', // relative to project root
    output: '_site', // relative to project root
    data: '_data', // relative to "input" dir
    includes: '_includes', // relative to "input" dir
  },
  templateFormats: ['njk'],
  htmlTemplateEngine: 'njk',
};

// Filters
module.exports = function(eleventyConfig) {
  // ------------------------------------------------------------------------
  // Plugins
  // ------------------------------------------------------------------------

  if (process.env.ELEVENTY_ENV === 'production') {
    eleventyConfig.addTransform('htmlmin', require('./src/utils/htmlmin.js'));
  }

  // ------------------------------------------------------------------------
  // Filters
  // ------------------------------------------------------------------------

  // JSONIFY
  eleventyConfig.addFilter('json', function(variable) {
    return JSON.stringify(variable);
  });

  // Create an array in Liquid
  eleventyConfig.addFilter('push', function(array, element) {
    return array.concat(element).filter(n => n !== '');
  });

  // Give the lenght of an array or an object
  eleventyConfig.addFilter('length', function(element) {
    if (Array.isArray(element)) {
      return element.length;
    }
    if (typeof element === 'object') {
      return Object.keys(element).length;
    }
  });

  // Date filter
  eleventyConfig.addFilter('date_to_string', function(date) {
    return moment(date).format('DD MMM YYYY');
  });

  // Date filter
  eleventyConfig.addFilter('date_to_long_string', function(date) {
    return moment(date).format('DD MMMM YYYY');
  });

  // ------------------------------------------------------------------------
  // Eleventy configuration
  // ------------------------------------------------------------------------

  fsExtra.copySync(
    path.resolve(`./${config.dir.input}/static`),
    path.resolve(`./${config.dir.output}`),
    {
      recursive: true,
    }
  );
  console.log(`📁 static files copied to ${config.dir.output} directory`);

  return config;
};
