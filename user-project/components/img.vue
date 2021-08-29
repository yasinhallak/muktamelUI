<template>
    <picture @click="onClick" :class="imageClass" >
      <template v-if="!noResponsive">
        <template v-for="item in maxScreen" >
          <source v-if="!hasError" :srcset="$vRoute.imageUrl(imgSrc,item.size,'webp')"
                  :media="'(max-width:'+item.value+'px)'" type="image/webp" >
          <source v-if="!hasError" :srcset="$vRoute.imageUrl(imgSrc,item.size,'jpg')"
                  :media="'(max-width:'+item.value+'px)'" type="image/jpg">
        </template>
      </template>
      <img v-if="!hasError" :alt="alt"  :src="$vRoute.imageUrl(imgSrc,maxSize,imageExt)"
           @error="onError">
      <img v-else :alt="alt"  :src="errorImage">
      <slot></slot>
    </picture>
</template>

<script>
/***
 * Created Subhi Al Wattar
 * User: Subhi Al Wattar
 * Date: 9/24/2020
 * Time: 11:45 AM
 ***/
export default {
  props:{
    maxSize : {
      type : String
    },
    imgSrc: {
      type: String
    },
    errorImageUrl: {
      type: String
    },
    ratio: {
      type: String,
      default: '3/2'
    },
    alt: {
      type: String
    },
    noResponsive:{
      type:Boolean,
      default: false
    }
  },
  name: "Img",
  data() {
    return {
      defaultErrorImage: '/_nuxt/assets/images/downSlider02.png',
      hasError: false,
      mq:[
        {
          size: 'xs',
          value: 120
        },
        {
          size: 'sd',
          value: 360
        },
        {
          size: 'md',
          value: 768
        },
        {
          size: 'hd',
          value: 1280
        }
      ]

    }
  },
  methods: {
    onClick(){
      this.$emit("clicked");
    },
    onError (error) {
      this.hasError = true
    },

  },
  computed: {
    maxScreen: function (){
      if(this.maxSize){
        let index = this.mq.findIndex(x=> x.size === this.maxSize);
        return this.mq.slice(0,index+1);
      }
      return this.mq

    },
    imageExt(){
      if(this.noResponsive){
        return 'jpg';
      }
      return  'webp';
    },
    imageClass(){
      switch(this.ratio) {
        case '2/1':
          return 'container-2-1'
          break;
        case '1/1':
          return 'container-1-1'
          break;
        default :
          return 'container-3-2'
      }

    },
    errorImage () {
      if (this.errorImageUrl && this.errorImageUrl !== '') {
        return this.errorImageUrl;
      }
      return this.defaultErrorImage
    },
  },
  watch:{
    imgSrc: function (){
      this.hasError = false;
    }
  }
}
</script>

<style lang="scss" scoped>

picture{
  display: block;
  overflow: hidden;
  &.rounded {
    border-radius: 5px !important;
  }
  &.circle {
    border-radius: 50% !important;
  }
}


.container-3-2 {
  width: 100%;
  padding-top: 66.66% !important;
  position: relative;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
  }
}

.container-2-1 {
  width: 100%;
  padding-top: 50% !important;
  position: relative;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
  }
}

.container-1-1 {
  width: 100%;
  padding-top: 100% !important;
  position: relative;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
  }
}


</style>
