<template>
  <header class="head-bread-crumb">
    <div>
      <div class="main-wrapper">
        <button type="button"
                class="btn back-btn"
                @click="GoBack"
                href="#">
          <i class="mx-icon-back"></i>
          <span>عودة للبحث</span>
        </button>
        <ul class="bread-crumb">
          <li class="bread-item" v-if="offerType && dealTypeOffer">
            <nuxt-link :to="onClickNav1" class=" " >
                {{$t("realEstateTypePlural." + this.offerType) }}
                {{$t("dealTypeOperation." + this.dealTypeOffer)}}
            </nuxt-link>

          </li>
          <li class="bread-item" v-if="title">
            <nuxt-link :to="'/'+ pageType"  class=" ">
                 {{title}}
            </nuxt-link>
          </li>
          <li class="bread-item" v-if="name">
            <nuxt-link :to="onClickName()"  class=" ">
                 {{name}}
            </nuxt-link>
          </li>
          <li class="bread-item" v-if="address && address.region" >
            <nuxt-link :to="onClickNav2(address.region)" class=" " >
               {{$t('region.'+ address.region)}}
            </nuxt-link>

          </li>
          <li class="bread-item" v-if="address && address.city">
            <nuxt-link :to="onClickNav2(address.city)" class=" " >
               {{$t('city.'+ address.city)}}
            </nuxt-link>
          </li>
          <li class="bread-item" v-if="address && address.district">
             <nuxt-link :to="onClickNav2(address.district)" class=" " >
               {{$t('district.'+ address.district)}}
            </nuxt-link>
          </li>
          <li class="bread-item" v-if="project">
             <nuxt-link :to="'/projects/' + project.id" class=" " >
                {{ project.title}}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
/***
 * Created Subhi Al Wattar
 * User: Subhi Al Wattar
 * Date: 7/23/2020
 * Time: 4:31 PM
 ***/
class Form {
  constructor() {
    this.addressId = null;
    this.dealType = null;
    this.residentialRealstateType = [];
     this.commertialRealstateType = [];
    this.AgencyName = null;
  }
}
export default {
  name: "breadcrumb",
  props: {
    offerType: {
      type: Number,
      default: null,
    },
    dealTypeOffer: {
      type: Number,
      default: null,
    },
    address: {
      type: Object,
    },
    pageType: String,
    title: String,
    name: String,
    project:{
      type:Object,
     default: null,
    }
  },
  data() {
    return {
      commertialList:[ 12,13 ,14 ,15 , 16 , 17 , 18  , 19 , 20],
      ResidentialOffers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      CommercialOffers: [1, 5, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    };
  },
  methods: {
    GoBack() {
      history.back();
    },

    onClickName() {
      let object = new Form();
      object.AgencyName = this.name;
         let url=  this.$vRoute.CreateQueryString(object);
         return  `/${this.pageType}${url}`;
    },

    onClickNav2(id) {
      let object = new Form();
      object.addressId = id;
      object.dealType = this.getDealType();
      if (this.offerType) {
        if(this.CommercialOffers.find(item=>item===this.offerType)){
           object.commertialRealstateType.push(this.offerType)
        }
        if(this.ResidentialOffers.find(item=>item===this.offerType))
        {
          object.residentialRealstateType.push(this.offerType);
        }

      }
        let url=  this.$vRoute.CreateQueryString(object);
        return `/${this.pageType}${url}`;
    },
    // get Deal Type
    getDealType() {
      if (this.dealTypeOffer === 1 || this.dealTypeOffer === 3) {
        return 5;
      }
      if (this.dealTypeOffer === 2 || this.dealTypeOffer === 4) {
        return 6;
      }
      return this.dealTypeOffer;
    },

  },
  computed:{
     onClickNav1() {
      let object = new Form();

      object.dealType = this.getDealType();

       if (this.offerType) {
        if(this.CommercialOffers.find(item=>item==this.offerType)){
           object.commertialRealstateType.push(this.offerType)
        }
        if(this.ResidentialOffers.find(item=>item===this.offerType)){
          object.residentialRealstateType.push(this.offerType);
        }
      }
      let url=  this.$vRoute.CreateQueryString(object);
      return `/${this.pageType}${url}`
    }

  }
};
</script>

<style lang="scss" scoped src="./breadcrumb.scss"></style>
