const { i18n } = require('./next-i18next.config')

module.exports = {
  reactStrictMode: true,
  output: 'standalone',
  swcMinify: false,
  i18n,
}
