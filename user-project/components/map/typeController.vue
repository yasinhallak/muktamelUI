<template>
  <button :class="{active :mapType}" class="btn-layers" @click="changeMapType"><i class="mx-icon-layers"></i></button>
</template>

<script>
import * as VueGoogleMaps from "gmap-vue";
export default {
  name: "mapTypeController",

  mixins: [VueGoogleMaps.MapElementMixin],

  data() {
    return {
      map:null,
      mapType: false,
    };
  },

  methods: {
    changeMapType(){
      this.mapType = !this.mapType;
      this.mapType?this.map.setMapTypeId('hybrid'): this.map.setMapTypeId("roadmap");
    }
  },

  created() {
    const self = this;
    this.$mapPromise.then(map => {
      self.map = map
    });
  },
}
</script>

<style scoped lang="scss">

.btn-layers {
  position: absolute;
  top: 15px;
  left:15px;
  pointer-events: auto;
  font-size: 17px;
  width: 30px;
  height: 30px;
  z-index: 10;
  color: $color_blue;
  border: 1px solid #333;
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: center;
  outline: none;
  &.active{
    color: #fff;
    background: $color_blue;
  }
}
</style>
