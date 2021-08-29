import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _35fa5882 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "" */))
const _b8a2233e = () => interopDefault(import('..\\pages\\about-us\\index.vue' /* webpackChunkName: "pages/about-us/index" */))
const _392166bc = () => interopDefault(import('..\\pages\\agencies\\index.vue' /* webpackChunkName: "pages/agencies/index" */))
const _1a2c5c8c = () => interopDefault(import('..\\pages\\agencies-request\\index.vue' /* webpackChunkName: "pages/agencies-request/index" */))
const _50a44707 = () => interopDefault(import('..\\pages\\conditions\\index.vue' /* webpackChunkName: "pages/conditions/index" */))
const _3275e5d6 = () => interopDefault(import('..\\pages\\contact\\index.vue' /* webpackChunkName: "pages/contact/index" */))
const _bed9bd20 = () => interopDefault(import('..\\pages\\decor\\index.vue' /* webpackChunkName: "pages/decor/index" */))
const _0fe3729e = () => interopDefault(import('..\\pages\\help\\index.vue' /* webpackChunkName: "pages/help/index" */))
const _2d86e3e3 = () => interopDefault(import('..\\pages\\mortgage\\index.vue' /* webpackChunkName: "pages/mortgage/index" */))
const _0447096a = () => interopDefault(import('..\\pages\\plans\\index.vue' /* webpackChunkName: "pages/plans/index" */))
const _4680dcad = () => interopDefault(import('..\\pages\\privacy\\index.vue' /* webpackChunkName: "pages/privacy/index" */))
const _6c43f028 = () => interopDefault(import('..\\pages\\profile\\index.vue' /* webpackChunkName: "pages/profile/index" */))
const _8a22ed76 = () => interopDefault(import('..\\pages\\projects\\index.vue' /* webpackChunkName: "pages/projects/index" */))
const _9f7291f2 = () => interopDefault(import('..\\pages\\real-estates\\index.vue' /* webpackChunkName: "pages/real-estates/index" */))
const _4755a108 = () => interopDefault(import('..\\pages\\register\\index.vue' /* webpackChunkName: "pages/register/index" */))
const _2da7b9ab = () => interopDefault(import('..\\pages\\resetPassword\\index.vue' /* webpackChunkName: "pages/resetPassword/index" */))
const _2ab857d2 = () => interopDefault(import('..\\pages\\virtualTour\\index.vue' /* webpackChunkName: "pages/virtualTour/index" */))
const _44c085f3 = () => interopDefault(import('..\\pages\\cards-cases\\plan\\index.vue' /* webpackChunkName: "pages/cards-cases/plan/index" */))
const _dd9429c2 = () => interopDefault(import('..\\pages\\cards-cases\\project\\index.vue' /* webpackChunkName: "pages/cards-cases/project/index" */))
const _3656badc = () => interopDefault(import('..\\pages\\cards-cases\\realestate\\index.vue' /* webpackChunkName: "pages/cards-cases/realestate/index" */))
const _5100ea2b = () => interopDefault(import('..\\pages\\plans\\calcWizard\\index.vue' /* webpackChunkName: "pages/plans/calcWizard/index" */))
const _b9148844 = () => interopDefault(import('..\\pages\\agencies\\_id\\index.vue' /* webpackChunkName: "pages/agencies/_id/index" */))
const _9ee7aea2 = () => interopDefault(import('..\\pages\\plans\\_id\\index.vue' /* webpackChunkName: "pages/plans/_id/index" */))
const _7b5661a2 = () => interopDefault(import('..\\pages\\real-estates\\_id.vue' /* webpackChunkName: "pages/real-estates/_id" */))
const _2e0dda2e = () => interopDefault(import('..\\pages\\vt\\_id.vue' /* webpackChunkName: "pages/vt/_id" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/404",
    component: _35fa5882,
    name: "404___ar"
  }, {
    path: "/about-us",
    component: _b8a2233e,
    name: "about-us___ar"
  }, {
    path: "/agencies",
    component: _392166bc,
    name: "agencies___ar"
  }, {
    path: "/agencies-request",
    component: _1a2c5c8c,
    name: "agencies-request___ar"
  }, {
    path: "/conditions",
    component: _50a44707,
    name: "conditions___ar"
  }, {
    path: "/contact",
    component: _3275e5d6,
    name: "contact___ar"
  }, {
    path: "/decor",
    component: _bed9bd20,
    name: "decor___ar"
  }, {
    path: "/help",
    component: _0fe3729e,
    name: "help___ar"
  }, {
    path: "/home",
    component: _35fa5882,
    name: "home___ar"
  }, {
    path: "/mortgage",
    component: _2d86e3e3,
    name: "mortgage___ar"
  }, {
    path: "/plans",
    component: _0447096a,
    name: "plans___ar"
  }, {
    path: "/privacy",
    component: _4680dcad,
    name: "privacy___ar"
  }, {
    path: "/profile",
    component: _6c43f028,
    name: "profile___ar"
  }, {
    path: "/projects",
    component: _8a22ed76,
    name: "projects___ar"
  }, {
    path: "/real-estates",
    component: _9f7291f2,
    name: "real-estates___ar"
  }, {
    path: "/register",
    component: _4755a108,
    name: "register___ar"
  }, {
    path: "/resetPassword",
    component: _2da7b9ab,
    name: "resetPassword___ar"
  }, {
    path: "/virtualTour",
    component: _2ab857d2,
    name: "virtualTour___ar"
  }, {
    path: "/cards-cases/plan",
    component: _44c085f3,
    name: "cards-cases-plan___ar"
  }, {
    path: "/cards-cases/project",
    component: _dd9429c2,
    name: "cards-cases-project___ar"
  }, {
    path: "/cards-cases/realestate",
    component: _3656badc,
    name: "cards-cases-realestate___ar"
  }, {
    path: "/plans/calcWizard",
    component: _5100ea2b,
    name: "plans-calcWizard___ar"
  }, {
    path: "/agencies/:id",
    component: _b9148844,
    name: "agencies-id___ar"
  }, {
    path: "/plans/:id",
    component: _9ee7aea2,
    name: "plans-id___ar"
  }, {
    path: "/real-estates/:id?",
    component: _7b5661a2,
    name: "real-estates-id___ar"
  }, {
    path: "/vt/:id?",
    component: _2e0dda2e,
    name: "vt-id___ar"
  }, {
    path: "/",
    component: _35fa5882,
    name: "index___ar"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
