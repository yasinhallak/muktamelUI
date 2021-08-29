/***
 * Created Subhi Al Wattar
 * User: Subhi Al Wattar
 * Date: 9/25/2020
 * Time: 12:17 PM
 ***/
import Vue from "vue";
import VueLazyload from "vue-lazyload";



Vue.use(VueLazyload, {
  preLoad: 1,
  listenEvents:['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove'],
  attempt: 1,
  observer: true,
  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1
  }
});
