const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ["./_site/**/*.html"],
  defaultExtractor: content => {
    const broadMatches =
      content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
    const innerMatches =
      content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
    return broadMatches.concat(innerMatches);
  },
  whitelist: [],
  whitelistPatterns: [
    /-(leave|enter|appear)(|-(to|from|active))$/,
    /^(?!(|.*?:)cursor-move).+-move$/,
  ],
})
const postcssclean = require('postcss-clean')({
  level: 1
})

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...(process.env.ELEVENTY_ENV === 'production' ? [postcssclean] : []),
    ...(process.env.ELEVENTY_ENV === 'production' ? [purgecss] : [])
  ],
}
