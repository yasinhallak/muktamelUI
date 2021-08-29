import authMiddleware from '~auth/core/middleware'
import Middleware from './middleware'
import Auth from '~auth/core/auth'
import ExpiredAuthSessionError from '~auth/inc/expired-auth-session-error'

// Active schemes
import scheme_2df8eb24 from '~auth/schemes/cookie'

Middleware.auth = authMiddleware

export default function (ctx, inject) {
  // Options
  const options = {"resetOnError":false,"scopeKey":"scope","rewriteRedirects":true,"fullPathRedirect":false,"watchLoggedIn":true,"redirect":{"login":"/#login","logout":"/","home":false,"callback":"/callback"},"vuex":{"namespace":"auth"},"cookie":{"prefix":"auth.","options":{"path":"/"}},"localStorage":{"prefix":"auth."},"defaultStrategy":"cookie"}

  // Create a new Auth instance
  const $auth = new Auth(ctx, options)

  // Register strategies
  // cookie
  $auth.registerStrategy('cookie', new scheme_2df8eb24($auth, {"cookie":{"name":"M.Auth"},"endpoints":{"login":{"url":"/identity/login","method":"post"},"logout":{"url":"/identity/logout","method":"post"},"user":{"url":"/profile","method":"get"},"xsrf":false},"token":{"required":false,"global":false,"name":"_"},"user":{"property":false,"autoFetch":true},"name":"cookie"}))

  // Inject it to nuxt context as $auth
  inject('auth', $auth)
  ctx.$auth = $auth

  // Initialize auth
  return $auth.init().catch(error => {
    if (process.client) {
      // Don't console log expired auth session errors. This error is common, and expected to happen.
      // The error happens whenever the user does an ssr request (reload/initial navigation) with an expired refresh
      // token. We don't want to log this as an error.
      if (error instanceof ExpiredAuthSessionError) {
        return
      }

      console.error('[ERROR] [AUTH]', error)
    }
  })
}
