const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    './_site/**/*.html',
  ],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  whitelist:['is-active'],
  whitelistPatternsChildren: [/^content$/, /^pagination$/],
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
