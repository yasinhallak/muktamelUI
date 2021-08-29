<template>
  <div :class="classBasedOnType"
       class="mosque-map-card item-box d-flex align-items-center active">
    <div class="logo">
      <img :src="'/images/defaults/'+imageBasedOnType+'.png'"
           alt="">
    </div>
    <div class="details">
      <div class="title">
        <h2 class="blue-text ">
          {{ mosque.title }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "mosque-card",
  props: {
    mosque: {},
  },
  computed:{
    classBasedOnType(){
      switch (this.mosque.type){
        case 1 :
          return  'mosque-jamii';
          break
        case 2 :
          return 'mosque-masjid';
          break
        case 3 :
          return 'mosque-musalla';
          break

      }
    },
    imageBasedOnType(){
      switch (this.mosque.type){
        case 1 :
          return 'jamii';
          break
        case 2 :
          return 'masjid';
          break
        case 3 :
          return 'musalla';
          break

      }
    }
  }

};
</script>

<style lang="scss" scoped>
.mosque-map-card{
  background-color:#fff;
  width: 210px;
  height: 41px;
  padding:7px;
  @include  ipad-down() {
    //width: auto !important;
  }
  .logo{
    width: 41px;
    height: 27px;
    margin-left:5px;
    padding: 0 !important;
    @include  ipad-down() {
      //display:none;
    }
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  h2{
    text-align: right;
    font: normal normal normal 10px/13px 'Droid Arabic Kufi' !important;
    color: #0089FE;
  }
  ul{
    li{
      font: normal normal normal 8px/13px 'Droid Arabic Kufi';
      color: #818C95;
      margin-left:5px;
    }
  }
}
</style>
