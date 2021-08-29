/***
 * Created Subhi Al Wattar
 * User: Subhi Al Wattar
 * Date: 7/23/2020
 * Time: 5:46 PM
 ***/
import Vue from 'vue'
Vue.filter("toComma", str => Number(str).toLocaleString());


let handleOutsideClick

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
    document.body.addEventListener('touchstart', handleOutsideClick)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
    document.body.removeEventListener('touchstart', handleOutsideClick)
  },
});

Vue.directive('toggle-active-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        el.classList.remove('active')
        el.classList.remove('collapsed')
        el.classList.add('not-collapsed')
        //  el.querySelector('.sub-menu').classList.remove('show')
        el.querySelector('.sub-menu').style.height = "0px";
        el.querySelector('.sub-menu').classList.add('collapsing')
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
    document.body.addEventListener('touchstart', handleOutsideClick)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
    document.body.removeEventListener('touchstart', handleOutsideClick)
  },
});
