export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // GitHub Pages部署时的基础路径
  router: {
    base: '/'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'XMRhapsody - About Me',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'XMRhapsody\'s personal website' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://api.github.com',
    headers: {
      common: {
        'Accept': 'application/vnd.github.v3+json'
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'marked'
    ]
  },

  // 生成静态页面时，为404页面提供支持
  generate: {
    fallback: true
  }
} 