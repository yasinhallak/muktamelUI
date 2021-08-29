<template>
  <div id="mx-pano-viewer" style="height: 100%"></div>
</template>

<script>

  import { Viewer } from 'photo-sphere-viewer';
  import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'

export default {
    name: "Pano",
    props: {
      src: {
        default: 'https://test.muktamel.com/Offers360Images/01e560e5-0335-4269-a32b-527e63babc82.jpg',
        type: String
      }
    },
    data() {
      return {
        imageLoaded:false
      }
    },
    methods: {
      initPhotoSphere() {
        if(!this.src) return
        this.PSV = new Viewer({
          container: document.getElementById('mx-pano-viewer'),
          panorama: this.src,
          loadingImg: 'https://photo-sphere-viewer.js.org/assets/photosphere-logo.gif'
        })
      }
    },
    mounted() {
      this.initPhotoSphere();
    },
    watch:{
      src: function(){
        if (this.PSV) {
          this.imageLoaded = false
          this.PSV.setPanorama(this.src).then(() => {
            this.imageLoaded = true
          });
        } else {
          this.initPhotoSphere()
        }
      }
    }
  }
</script>



