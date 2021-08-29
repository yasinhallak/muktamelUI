import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '..\\layouts\\error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_48ba925a from 'nuxt_plugin_plugin_48ba925a' // Source: .\\components\\plugin.js (mode: 'all')
import nuxt_plugin_bootstrapvue_5dbd4eac from 'nuxt_plugin_bootstrapvue_5dbd4eac' // Source: .\\bootstrap-vue.js (mode: 'all')
import nuxt_plugin_nuxtmq_4bda5976 from 'nuxt_plugin_nuxtmq_4bda5976' // Source: .\\nuxt-mq.js (mode: 'all')
import nuxt_plugin_pluginseo_c5c0c3b6 from 'nuxt_plugin_pluginseo_c5c0c3b6' // Source: .\\nuxt-i18n\\plugin.seo.js (mode: 'all')
import nuxt_plugin_pluginrouting_64fc679c from 'nuxt_plugin_pluginrouting_64fc679c' // Source: .\\nuxt-i18n\\plugin.routing.js (mode: 'all')
import nuxt_plugin_pluginmain_7b39ed5a from 'nuxt_plugin_pluginmain_7b39ed5a' // Source: .\\nuxt-i18n\\plugin.main.js (mode: 'all')
import nuxt_plugin_vuescrollto_ba3fdc28 from 'nuxt_plugin_vuescrollto_ba3fdc28' // Source: .\\vue-scrollto.js (mode: 'client')
import nuxt_plugin_axios_8d718506 from 'nuxt_plugin_axios_8d718506' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_pluginserver_5e372e95 from 'nuxt_plugin_pluginserver_5e372e95' // Source: .\\plugin.server.js (mode: 'server')
import nuxt_plugin_moment_7e4c03bb from 'nuxt_plugin_moment_7e4c03bb' // Source: .\\moment.js (mode: 'all')
import nuxt_plugin_directives_d0867c0c from 'nuxt_plugin_directives_d0867c0c' // Source: ..\\plugins\\directives (mode: 'all')
import nuxt_plugin_axios_3566aa80 from 'nuxt_plugin_axios_3566aa80' // Source: ..\\plugins\\axios (mode: 'all')
import nuxt_plugin_global_6441a2ce from 'nuxt_plugin_global_6441a2ce' // Source: ..\\plugins\\global (mode: 'all')
import nuxt_plugin_i18n_6a80ea94 from 'nuxt_plugin_i18n_6a80ea94' // Source: ..\\plugins\\i18n (mode: 'all')
import nuxt_plugin_maps_6a83770d from 'nuxt_plugin_maps_6a83770d' // Source: ..\\plugins\\maps (mode: 'all')
import nuxt_plugin_vuecarousel3d_e42043be from 'nuxt_plugin_vuecarousel3d_e42043be' // Source: ..\\plugins\\vue-carousel-3d (mode: 'client')
import nuxt_plugin_vueimask_72e03518 from 'nuxt_plugin_vueimask_72e03518' // Source: ..\\plugins\\vue-imask (mode: 'client')
import nuxt_plugin_vuehammer_32644e3a from 'nuxt_plugin_vuehammer_32644e3a' // Source: ..\\plugins\\vue-hammer (mode: 'client')
import nuxt_plugin_ssrcookieproxy_241a5116 from 'nuxt_plugin_ssrcookieproxy_241a5116' // Source: ..\\plugins\\ssr-cookie-proxy (mode: 'server')
import nuxt_plugin_auth_0d9f6fda from 'nuxt_plugin_auth_0d9f6fda' // Source: .\\auth.js (mode: 'all')
import nuxt_plugin_auth_7f7561ce from 'nuxt_plugin_auth_7f7561ce' // Source: ..\\plugins\\auth.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    return this.$root.$options.$nuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule
const baseStoreOptions = { preserveState: process.client }

function registerModule (path, rawModule, options = {}) {
  return originalRegisterModule.call(this, path, rawModule, { ...baseStoreOptions, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"مكتمل","titleTemplate":"%s - مكتمل","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1, maximum-scale=1"},{"hid":"description","name":"description","content":"```bash\r # install dependencies\r $ npm install"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"apple-touch-icon","type":"image\u002Fx-icon","size":"57*57","href":"\u002FfavIcons\u002Fapple-icon-57x57.png"},{"rel":"apple-touch-icon","type":"image\u002Fx-icon","size":"60*60","href":"\u002FfavIcons\u002Fapple-icon-60x60.png"},{"rel":"apple-touch-icon","type":"image\u002Fx-icon","size":"72*72","href":"\u002FfavIcons\u002Fapple-icon-72x72.png"},{"rel":"apple-touch-icon","type":"image\u002Fx-icon","size":"76*76","href":"\u002FfavIcons\u002Fapple-icon-76x76.png"},{"rel":"apple-touch-icon","type":"image\u002Fx-icon","size":"114*114","href":"\u002FfavIcons\u002Fapple-icon-114x114.png"},{"rel":"apple-touch-icon","type":"image\u002Fx-icon","size":"120*120","href":"\u002FfavIcons\u002Fapple-icon-120x120.png"},{"rel":"apple-touch-icon","type":"image\u002Fx-icon","size":"144*144","href":"\u002FfavIcons\u002Fapple-icon-144x144.png"},{"rel":"apple-touch-icon","type":"image\u002Fx-icon","size":"152*152","href":"\u002FfavIcons\u002Fapple-icon-152x152.png"},{"rel":"apple-touch-icon","type":"image\u002Fx-icon","size":"180*180","href":"\u002FfavIcons\u002Fapple-icon-180x180.png"},{"rel":"icon","type":"image\u002Fpng","size":"192*192","href":"\u002FfavIcons\u002Fandroid-icon-192x192.png"},{"rel":"icon","type":"image\u002Fpng","size":"32*32","href":"\u002FfavIcons\u002Ffavicon-32x32.png"},{"rel":"icon","type":"image\u002Fpng","size":"96*96","href":"\u002FfavIcons\u002Ffavicon-96x96.png"},{"rel":"icon","type":"image\u002Fpng","size":"16*16","href":"\u002FfavIcons\u002Ffavicon-16x16.png"},{"name":"theme-color","content":"#0089fe"},{"rel":"stylesheet","href":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Ffont-awesome\u002F5.14.0\u002Fcss\u002Fall.min.css"},{"rel":"stylesheet","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fearlyaccess\u002Fdroidarabickufi.css"},{"rel":"stylesheet","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Lateef&display=swap"},{"rel":"stylesheet","href":"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Fhooper@0.2.1\u002Fdist\u002Fhooper.css"}],"script":[{"src":"https:\u002F\u002Fcode.jquery.com\u002Fjquery-3.5.1.min.js","type":"text\u002Fjavascript"},{"src":"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Fpopper.js@1.16.0\u002Fdist\u002Fumd\u002Fpopper.min.js","type":"text\u002Fjavascript"},{"src":"https:\u002F\u002Fstackpath.bootstrapcdn.com\u002Fbootstrap\u002F4.5.0\u002Fjs\u002Fbootstrap.min.js","type":"text\u002Fjavascript"},{"src":"https:\u002F\u002Fwww.google.com\u002Frecaptcha\u002Fapi.js?onload=vueRecaptchaApiLoaded&render=explicit","type":"text\u002Fjavascript"}],"style":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_48ba925a === 'function') {
    await nuxt_plugin_plugin_48ba925a(app.context, inject)
  }

  if (typeof nuxt_plugin_bootstrapvue_5dbd4eac === 'function') {
    await nuxt_plugin_bootstrapvue_5dbd4eac(app.context, inject)
  }

  if (typeof nuxt_plugin_nuxtmq_4bda5976 === 'function') {
    await nuxt_plugin_nuxtmq_4bda5976(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginseo_c5c0c3b6 === 'function') {
    await nuxt_plugin_pluginseo_c5c0c3b6(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginrouting_64fc679c === 'function') {
    await nuxt_plugin_pluginrouting_64fc679c(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginmain_7b39ed5a === 'function') {
    await nuxt_plugin_pluginmain_7b39ed5a(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuescrollto_ba3fdc28 === 'function') {
    await nuxt_plugin_vuescrollto_ba3fdc28(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_8d718506 === 'function') {
    await nuxt_plugin_axios_8d718506(app.context, inject)
  }

  if (process.server && typeof nuxt_plugin_pluginserver_5e372e95 === 'function') {
    await nuxt_plugin_pluginserver_5e372e95(app.context, inject)
  }

  if (typeof nuxt_plugin_moment_7e4c03bb === 'function') {
    await nuxt_plugin_moment_7e4c03bb(app.context, inject)
  }

  if (typeof nuxt_plugin_directives_d0867c0c === 'function') {
    await nuxt_plugin_directives_d0867c0c(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_3566aa80 === 'function') {
    await nuxt_plugin_axios_3566aa80(app.context, inject)
  }

  if (typeof nuxt_plugin_global_6441a2ce === 'function') {
    await nuxt_plugin_global_6441a2ce(app.context, inject)
  }

  if (typeof nuxt_plugin_i18n_6a80ea94 === 'function') {
    await nuxt_plugin_i18n_6a80ea94(app.context, inject)
  }

  if (typeof nuxt_plugin_maps_6a83770d === 'function') {
    await nuxt_plugin_maps_6a83770d(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuecarousel3d_e42043be === 'function') {
    await nuxt_plugin_vuecarousel3d_e42043be(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vueimask_72e03518 === 'function') {
    await nuxt_plugin_vueimask_72e03518(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuehammer_32644e3a === 'function') {
    await nuxt_plugin_vuehammer_32644e3a(app.context, inject)
  }

  if (process.server && typeof nuxt_plugin_ssrcookieproxy_241a5116 === 'function') {
    await nuxt_plugin_ssrcookieproxy_241a5116(app.context, inject)
  }

  if (typeof nuxt_plugin_auth_0d9f6fda === 'function') {
    await nuxt_plugin_auth_0d9f6fda(app.context, inject)
  }

  if (typeof nuxt_plugin_auth_7f7561ce === 'function') {
    await nuxt_plugin_auth_7f7561ce(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, (err) => {
        // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
        if (!err._isRouter) return reject(err)
        if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
