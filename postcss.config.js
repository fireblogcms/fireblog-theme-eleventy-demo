// postCss plugin to remove unused CSS
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./_site/**/*.html'],
  defaultExtractor: content => {
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
    return broadMatches.concat(innerMatches);
  },
  whitelist: [],
  whitelistPatterns: [
    /-(leave|enter|appear)(|-(to|from|active))$/,
    /^(?!(|.*?:)cursor-move).+-move$/,
  ],
});

// PostCss plugin to minify your CSS
const postcssclean = require('postcss-clean')({
  level: 1,
});

const plugins = [require('tailwindcss'), require('autoprefixer')];

if (process.env.ELEVENTY_ENV === 'PRODUCTION') {
  postcssclean, purgecss;
}

module.exports = {
  plugins,
};
