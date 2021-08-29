<template>
  <div :class="hospital.isPrivate === false ? 'hospital-goverment active' : 'hospital-private active'"
       class="hospital-map-card item-box d-flex align-items-center">
    <div class="logo">
      <img :src="'/images'+hospital.logo+'.jpg'"
           onerror="this.src='/images/defaults/hospital.png'; this.onerror = null"
           alt=""
      >
    </div>
    <div class="details">
      <div class="title">
        <h2 class="blue-text text-truncate">{{ hospital.title }}</h2>
      </div>
      <ul class="tags d-flex flex-wrap ">
        <li :key="i"
            v-for="(s,i) in hospital.hospitalSpecialties">
          {{ $t(`hospitalSpecialties.${s}`) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: "school-card",
  props: {
    hospital: {},
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.hospital-map-card{
  background-color:#fff;
  width: 210px;
  height: 41px;
  padding:7px;
  .logo{
    width: 41px;
    height: 27px;
    margin-left:5px;
    padding: 0 !important;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  h2{
    text-align: right;
    font: normal normal normal 10px/13px 'Droid Arabic Kufi';
    color: #0089FE;
  }
  ul{
    li{
      font: normal normal normal 8px/13px Droid Arabic Kufi;
      color: #818C95;
      margin-left:5px;
    }
  }
}
</style>
