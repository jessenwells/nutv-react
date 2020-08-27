const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
 app.use(
  '/login',
  createProxyMiddleware({
   target: 'https://api.thetvdb.com',
   changeOrigin: true,
  }),
 )
 app.use(
  '/series',
  createProxyMiddleware({
   target: 'https://api.thetvdb.com',
   changeOrigin: true,
  }),
 )
 app.use(
  '/search',
  createProxyMiddleware({
   target: 'https://api.thetvdb.com',
   changeOrigin: true,
  }),
 )
 app.use(
  '/refresh_token',
  createProxyMiddleware({
   target: 'https://api.thetvdb.com',
   changeOrigin: true,
  }),
 )
}
