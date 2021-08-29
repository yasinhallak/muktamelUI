import webpack from 'webpack'


export default {

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: '404',
        path: '/404',
        component: resolve(__dirname, 'pages/index.vue')
      }),
      routes.push({
        name: 'home',
        path: '/home',
        component: resolve(__dirname, 'pages/index.vue')
      })
    },
    scrollBehavior (to, from, savedPosition) {
      if(to.hash || to.path.includes('privacy') || to.path.includes('about-us') || to.path.includes('conditions')){
        return { x: 0, y: 0 }
      }
    }
  },

  target: "server",

  ignore:[
    'pages/**/*.js'
  ],

  loading: {
    color: '#0088fe'
  },

  head: {
    title: "مكتمل",
    titleTemplate: "%s - مكتمل",
    meta: [{
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, maximum-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      {
        rel:"apple-touch-icon",
        type:"image/x-icon",
        size:"57*57",
        href:"/favIcons/apple-icon-57x57.png"
      },
      {
        rel:"apple-touch-icon",
        type:"image/x-icon",
        size:"60*60",
        href:"/favIcons/apple-icon-60x60.png"
      },
      {
        rel:"apple-touch-icon",
        type:"image/x-icon",
        size:"72*72",
        href:"/favIcons/apple-icon-72x72.png"
      },
      {
        rel:"apple-touch-icon",
        type:"image/x-icon",
        size:"76*76",
        href:"/favIcons/apple-icon-76x76.png"
      },
      {
        rel:"apple-touch-icon",
        type:"image/x-icon",
        size:"114*114",
        href:"/favIcons/apple-icon-114x114.png"
      },
      {
        rel:"apple-touch-icon",
        type:"image/x-icon",
        size:"120*120",
        href:"/favIcons/apple-icon-120x120.png"
      },

      {
        rel:"apple-touch-icon",
        type:"image/x-icon",
        size:"144*144",
        href:"/favIcons/apple-icon-144x144.png"
      },
      {
        rel:"apple-touch-icon",
        type:"image/x-icon",
        size:"152*152",
        href:"/favIcons/apple-icon-152x152.png"
      },
      {
        rel:"apple-touch-icon",
        type:"image/x-icon",
        size:"180*180",
        href:"/favIcons/apple-icon-180x180.png"
      },
      {
        rel:"icon",
        type:"image/png",
        size:"192*192",
        href:"/favIcons/android-icon-192x192.png"
      },
      {
        rel:"icon",
        type:"image/png",
        size:"32*32",
        href:"/favIcons/favicon-32x32.png"
      },
      {
        rel:"icon",
        type:"image/png",
        size:"96*96",
        href:"/favIcons/favicon-96x96.png"
      },
      {
        rel:"icon",
        type:"image/png",
        size:"16*16",
        href:"/favIcons/favicon-16x16.png"
      },
      {
        name: 'theme-color',
        content: '#0089fe',
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
      },

      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/earlyaccess/droidarabickufi.css"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Lateef&display=swap"
      },
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/hooper@0.2.1/dist/hooper.css"
      }
    ],
    script: [
      {
        src: "https://code.jquery.com/jquery-3.5.1.min.js",
        type: "text/javascript"
      },
      {
        src: "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js",
        type: "text/javascript"
      },
      {
        src: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js",
        type: "text/javascript"
      },
      {
        src: "https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit",
        type: "text/javascript"
      }
    ]
  },

  css: [
    '@/assets/icons/style.css'
  ],

  styleResources: {
    scss: ["~assets/nscss/_common.scss","~assets/n-scss/utilities/_utilities-dir.scss"]
  },

  plugins: [
    "~/plugins/directives",
    "~/plugins/axios",
    "~/plugins/global",
    "~/plugins/i18n",
    { src: "~/plugins/maps",ssr: true },
    { src: '~/plugins/vue-carousel-3d',mode:'client', ssr: false },
    { src: '~/plugins/vue-imask',mode:'client' },
    { src: '~/plugins/vue-hammer',mode:'client' },
    { src: '~/plugins/ssr-cookie-proxy', mode: 'server' },
  ],

  components: [
    {
      path:'~/components/',
      prefix: 'mx',
    },
    {
      path: '~/components/cards/',
      prefix: 'mx-card',
      type: ['vue']
    },
    {
      path: '~/components/form/',
      prefix: 'mx-form',
      type: ['vue']
    },
    {
      path: '~/components/map/',
      prefix: 'mx-map',
      type: ['vue']
    },
    {
      path: '~/components/modals/',
      prefix: 'mx-modal',
      type: ['vue']
    },
    {
      path: '~/components/nav/',
      prefix: 'mx-nav',
      type: ['vue']
    }
  ],

  buildModules: ["@nuxtjs/moment"], //    '@nuxtjs/global-components' '@nuxtjs/components'
  moment: {
    defaultLocale: "ar",
    locales: ["ar"]
  },

  modules: [
    'nuxt-winston-log',
    "bootstrap-vue/nuxt",
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "@nuxtjs/style-resources",
    'vue-scrollto/nuxt',
    [
      "nuxt-i18n",
      {
        defaultLocale: "ar",
        seo: true,
        locales: [
          /*{
            code: "en",
            iso: "en-US",
            file: "en.json"
          },*/
          {
            code: "ar",
            iso: "ar-SA",
            file: "ar.json"
          }
        ],
        lazy: true,
        langDir: "locales/"
      }
    ],
    [
      "nuxt-mq", //:size="$mq === 'mobile' ? 'small' : 'default"
      {
        // Default breakpoint for SSR
        defaultBreakpoint: "tablet",
        breakpoints: {
          mobile: 640,//640
          ipad:960,
          tablet: 1140,//1140
          desktop: 3000,//1140
          desktopWide: 2000,
          desktopUltraWide: Infinity
        }
      }
    ]
    // [
    //   "nuxt-imagemin",
    //   {
    //     optipng: { optimizationLevel: 5 },
    //     gifsicle: { optimizationLevel: 2 }
    //   }
    // ]
  ],
  axios: {
    // proxyHeaders: false
    //baseURL: 'https://mukuser.azurewebsites.net/api/api/v1/',
    baseURL: 'https://muktamelapp.azurewebsites.net/api/api/v1/',
    //baseURL: 'http://localhost:5001/api/v1/',
    //baseURL: 'http://muktamel.test/api/v1/',
    withCredentials: true,
    credentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  },
  auth: {
    /*localStorage: false,
    cookie: {
      prefix: '',
      options: {
        path: '/'
      }
    },*/
    //defaultStrategy: '',
    strategies: {
      /*local: {
        scheme: 'refresh',
        endpoints: {
          login: {
            //baseURL: "https://test.muktamel.com/api/v1",
            url: `/identity/login`,
            method: "post",
            //propertyName: "token"
          },
          refresh: {
            //baseURL: "https://test.muktamel.com/api/v1",
            url: '/identity/refreshToken',
            method: 'post'
          },
          logout: {
            //baseURL: "https://test.muktamel.com/api/v1",
            url: `/identity/logout`,
            method: "post"
          },
          user: {
            //baseURL: "https://test.muktamel.com/api/v1",
            url: "/profile",
            method: "get",
            //propertyName: false
          },

        },
        token:{
          property: 'token',
          maxAge: 20 ,// * 60,
          type: 'Bearer'
        },
        refreshToken: {
          property: 'refreshToken',
          data: 'refreshToken',
          tokenRequired: true,
          required: true,
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: false,
          autoFetch: true
        },
        //tokenName: "Authorization",
        //tokenRequired: true,
        //tokenType: "Bearer",
        //globalToken: true
        //autoFetchUser: true
      },*/
      cookie: {
        cookie: {
          name: 'M.Auth',
        },
        endpoints: {
          login: {
            url: `/identity/login`,
            method: "post"
          },
          logout: {
           url: `/identity/logout`,
            method: "post"
          },
          user: {
            url: "/profile",
            method: "get"
          },
          xsrf: false
        },
        token:{
          required: false,
          global: false,
          name: '_'
        },
        user: {
          property: false,
          autoFetch: true
        },
      },
    },
    redirect: {
      login: '/#login',
      callback: "/callback",
      logout: '/',
      home: false
    },
    plugins: [ '~/plugins/auth.js' ]
  },

  build: {
    transpile: [/^gmap-vue($|\/)/, /^vue2-gmap-custom-marker($|\/)/],
    //cssSourceMap:true,
    babel: {

      plugins: [
        [
          "@babel/plugin-proposal-optional-chaining",
          {
            loose: true
          }
        ]
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        // global modules
        _: 'lodash'
      })
    ],
    extend(config, {
      isDev,
      isClient
    }) {
      config.resolve.alias["vue"] = "vue/dist/vue.common";
      if (isClient) {
        config.devtool = process.env.NODE_ENV === 'development' ? '#source-map' : '';
      }
      if (isDev) {
        config.devtool = 'inline-source-map';
      }
    }
  },

  server: {
    port: 8080
  },

  env: {
    baseUrl: "https://muktamelapp.azurewebsites.net",
    imgUrl : "https://storemukdev.blob.core.windows.net/images",
    docUrl: "https://storemukdev.blob.core.windows.net/document",
    apiBaseUrl: "https://muktamelapp.azurewebsites.net/api/api/v1/",
    vtTilesUrl: "https://storemukdev.blob.core.windows.net/virtualtur",

    reCaptchaSitekey: "6Led3tMZAAAAAEzmBcNLoet27kpymDr3PZGY8yC1",
    mapKey: "AIzaSyAcy_AzlVTRbF8lLZI4m7UaJM5C93gpbCA",
    mapEmbedKey: "AIzaSyCVnx29LxHrIVsBjl2Fcolv8N7HqdHdp54",
    buildState:""
  }
};
