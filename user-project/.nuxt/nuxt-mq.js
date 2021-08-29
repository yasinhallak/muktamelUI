import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {"defaultBreakpoint":"tablet","breakpoints":{"mobile":640,"ipad":960,"tablet":1140,"desktop":3000,"desktopWide":2000,"desktopUltraWide":Infinity}})
