<template>
  <div style="cursor: pointer" @click.prevent="createRealEstateObject(itemData)" class="notify d-flex align-items-center">
    <div class="notify-map-image position-relative">
      <img alt="" :src="$vRoute.imageUrl('/SearchQueryMap/'+itemData.id)">
      <span class="notifications-count position-absolute">{{ itemData.count }}</span>
    </div>
    <div class="notify-content">
      <h2 class="notify-title">{{ itemData.title }}</h2>
      <div class="notify-deal d-flex">
        {{ deal_(itemData.dealType, itemData.rentType) }} - {{ address_(itemData.addressId) }}
      </div>
      <ul class="notify-property-types d-flex">
        <li v-for="item in propertyTypes" :key="item.id">
          {{ $t('realEstateType.' + item) }}
        </li>
        <li v-if="!propertyTypes.length">جميع العقارات</li>
      </ul>
      <div class="notify-actions">
        <button @click.stop v-b-modal="'modal-notify-'+itemData.id">
          <i class="mx-icon-edit"></i>
          استعراض
        </button>
        <button @click.stop="alertDelete(itemData.id)" >
          <i class="mx-icon-trash"></i>
          حذف
        </button>
      </div>
    </div>
    <mx-modal-search-notification :modal-id="`${itemData.id}`" :form="itemData" ></mx-modal-search-notification>
  </div>

</template>

<script>
/***
 * Created Subhi Al Wattar
 * User: Subhi Al Wattar
 * Date: 9/21/2020
 * Time: 12:03 PM
 ***/
export default {
  name: "notification",
  props: {
    itemData: Object
  },
  data() {
    return {
    }
  },
  methods: {
    address_(_address) {
      if(!_address) return;
      if (_address.toString().length === 2) {
        return this.$t('region.' + _address)
      } else if (_address.toString().length === 4) {
        return this.$t('city.' + _address) + ', ' + this.$t('region.' + _address.toString().substring(0, 2))
      } else {
        return this.$t('district.' + _address) + ', ' + this.$t('city.' + _address.toString().substring(0, 4))
      }
    },
    deal_(_dealType, _rentType) {
      if ((_dealType == 2 || _dealType == 6)  && _rentType) {
        return this.$t('dealTypeOperation.' + _dealType) + '(' + this.$t('rentDealTypes.' + _rentType) + ')';
      }
      return this.$t('dealTypeOperation.' + _dealType);
    },
    alertDelete(id){
      this.$bvModal
        .msgBoxConfirm("في حال قمت بحذف هذا التنبيه، فإنك لن تتلقى المزيد من التنبيهات بالعقارات الجديدة.", {
          title: "حذف التنبيه",
          size: "sm",
          buttonSize: "sm",
          modalClass: 'alert-popup',
          okVariant: "primary",
          okTitle: "حذف",
          cancelTitle: "الغاء",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value == false) return false;
          if (value == true) this.deleteRecord(id);

        })
        .catch(err => {
          // An error occurred
        });
},
    deleteRecord(id) {

      this.$axios.delete(`/searchQuery/${id}`).then(()=>{
        this.$auth.fetchUser()
        this.$bvToast.toast("حذف تنبيه", {
          title: "تم الحذف بنجاح",
          variant: "danger",
          solid: true,
          toaster: "b-toaster-top-right"
        });
      }).catch((e)=> {
        this.$bvToast.toast("حذف تنبيه", {
          title: "فشل الحذف",
          variant: "danger",
          solid: true,
          toaster: "b-toaster-top-right"
        });
      })
   },
    createRealEstateObject(searchQuery){
      let url=  this.$vRoute.CreateQueryString(searchQuery);
      this.$router.push(`/real-estates${url}`);
    }

  },
  computed:{
    propertyTypes() {
      let mergedArray = _.union( this.itemData.residentialRealstateType, this.itemData.commertialRealstateType);
      return mergedArray;
    }
  }
}
</script>

<style lang="scss" scoped>
.notify {
  padding: 5px 0;
  &:not(:last-child){
    border-bottom: 1px solid rgba(112, 112, 112, 0.5);
  }
  .notify-map-image {
    box-shadow: 2px 3px 6px #00000066;
    border-radius: 10px;
    width: 100px;
    height: 100px;
    padding: 5px;

    img {
      width: 90px;
      height: 90px;
      box-shadow: 0px 0px 3px #00000099;
      border-radius: 5px;
    }
    .notifications-count{
      width: 30px;
      height: 30px;
      bottom: 5px;
      right: 5px;
      background: rgba(217, 34, 47, 0.6);
      box-shadow: 2px 2px 3px #00000099 ;
      border-radius: 50%;
      text-shadow: 2px 2px 3px #00000080;
      color: #FFFFFF;
      font-size: 18px;
      font-weight: bold;
      display:flex;
      align-items:center;
      justify-content: center;

    }

  }

  .notify-content {
    line-height: 24px;
    padding-right: 5px;

    .notify-title {
      color: #001324;
      font-size: 14px;
      font-weight: bold;
      line-height: 2;
      margin-bototm:3px;

    }

    .notify-deal {
      font-size: 11px;
      color: #001324;
      height: 21px;
      margin-bototm:1px;
    }

    .notify-property-types {
      color: #001324;
      font-size: 11px;
      height: 21px;
      margin-bottom: 5px;
      li{
        &:not(:last-child)::after{
          content: '-';
          margin:0 5px;
        }
      }
    }

    button {
      color: #0089FE;
      width: 75px;
      height: 25px;
      border: 1px solid #0089FE;
      border-radius: 3px;
      font-size: 11px;
    }

  }

  .notify-actions{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    button{
      margin-left: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      i{
        padding-left: 5px;
      }
    }
  }
}




</style>
<style lang="scss">

</style>
