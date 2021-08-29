<template>
      <div class="zoom-controller d-flex" >
        <button class="zoom-plus" @click="zoomIn"><span>+</span></button>
        <button class="zoom-minus" @click="zoomOut"><span>ــ</span></button>
      </div>
</template>

<script>
import * as VueGoogleMaps from "gmap-vue";


export default {

  mixins: [VueGoogleMaps.MapElementMixin],
  data() {
    return {
      map:null
    };
  },


  methods: {
    zoomIn(){
      console.log('this.map',this.map)
      this.map.setZoom(this.map.getZoom() + 1);
    },
    zoomOut(){
      this.map.setZoom(this.map.getZoom() - 1);
    },
},

  created() {
    const self = this;
    this.$mapPromise.then(map => {
      self.map = map
    });
  },

};
</script>

<style scoped lang="scss">
  .zoom-controller{
    position: absolute;
    bottom: 15px;
    left:15px;
    display: flex;
    flex-direction: column;
    button{
      background: #FFFFFF 0% 0% no-repeat padding-box;
      border: 1px solid #707070;
      width: 30px;
      height: 30px;
      color: #0089FE;
      margin-bottom:1px;
      display: flex;
      align-items:center;
      justify-content: center;
      outline:0;
      overflow: hidden;
      &:focus{
        outline:0;
      }
      &.zoom-plus{

        span{
          font: normal normal 900 29px/0 sans-serif;
          position: relative;
          top: -3px;
        }
      }
      &.zoom-minus{
        font: normal normal bold 33px/0 'Droid Arabic Kufi';
        span{
          position: relative;
          top: -8px;
        }
      }
    }
  }
</style>
