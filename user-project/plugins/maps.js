/***
 * Created Subhi Al Wattar
 * User: Subhi Al Wattar
 * Date: 7/25/2020
 * Time: 3:59 PM
 ***/
import Vue from "vue";
import * as GmapVue  from "~/node_modules/gmap-vue";

Vue.use(GmapVue , {
  load: {
    key: process.env.mapKey,
    libraries: "places,drawing",
    language: "ar",
    region: "SA"
  },
  installComponents: true
});
