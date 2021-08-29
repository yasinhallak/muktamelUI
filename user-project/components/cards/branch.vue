<template>
  <div class="branch-map-card item-box d-flex align-items-center active" :class="isMain? 'red-border' : 'blue-border'">
    <div class="details">
      <div class="title">
        <h5
          class="text-blue font-size-10px font-weight-bold"
        >
          {{ branch.name }}
        </h5>
      </div>
      <div
        class="types d-flex"
        v-if="$mq !== 'mobile'"
      >
        <div class="type-item d-flex align-items-center font-size-9px" v-if="branch.phone">
          <i class="mx-icon-phone"></i>
          <a :href="'tel:' + branch.phone">{{
              branch.phone
            }}</a>
        </div>
        <div class="type-item d-flex align-items-center font-size-9px" v-if="branch.email">
          <i class="mx-icon-envelope"></i>
          <a :href="'mailto:' + branch.email">{{
              branch.email
            }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "branch-card",
  props: {
    branch: {},
    isMain: {
      default: false,
      type: Boolean
    },
  },
  methods:{
    // Get Address list
    listAddress(payload) {
      if (!payload) return [];
      let address = [];
      if (payload.region != null)
        address.push(this.$t(`region.${payload.region}`));
      if (payload.city) address.push(this.$t(`city.${payload.city}`));
      if (payload.district)
        address.push(this.$t(`district.${payload.district}`));
      return address;
    },
  }
};
</script>

<style lang="scss" scoped>
.blue-border{

  box-shadow: 0px 0px 5px #0a6ad2 !important;
}

.red-border{
  box-shadow: 0px 0px 5px red !important;
}
.branch-map-card{
  background-color:#fff;
  width: 210px;
  height: 41px !important;
  padding:7px;
  border-radius: 0 !important;
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
    margin-bottom:2px;
  }
  ul{
    @include ipad-down() {
      display: none ;
    }
    li{
      font: normal normal normal 8px/13px Droid Arabic Kufi;
      color: #818C95;
      margin-left:5px;
    }
  }
}
</style>
