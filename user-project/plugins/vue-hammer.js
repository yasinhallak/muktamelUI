import Vue from 'vue';
import { VueHammer } from 'vue2-hammer'
VueHammer.config.press = {
  time: 500
};
Vue.use(VueHammer)
