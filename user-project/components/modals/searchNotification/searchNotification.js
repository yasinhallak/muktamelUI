//import _ from 'lodash';
import {validate, ValidationObserver, ValidationProvider} from "vee-validate/dist/vee-validate.full";
import {mapState} from "vuex";

export default {
  name: 'search-notification',
  components: {
    ValidationObserver,
    ValidationProvider,
    validate
  },
  data () {
    return{
      innerForm: {
        byEmail: false,
        byWhatsApp: false
      }
    }
  },
  props: {
    /*Base Data*/
    form: Object,
    modalId : String
  },
  methods: {
    checkConfirmedTool(msg,status){
      if(!status){
        this.$bvModal
          .msgBoxOk(`يجب عليك تاكيد ${msg} أولا لتستطيع استلام التنبيهات`, {
            title: "لا يمكنكم المتابعة",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "تم",
            modalClass: 'alert-popup',
            centered: true
          })
          .then(value => {
          })
          .catch(err => {
            // An error occurred
          });
      }

    },
    postSearchQuery() {
      console.log("SearchQuery")
      if(!this.innerForm.id){
        this.$axios.post('/searchQuery', this.innerForm)
          .then(() => {
          this.$bvToast.toast("سيتم ارسال التنبيه في حال توفر عقارات جديدة", {
            title: "تم الحفظ بنجاح",
            variant: "success",
            solid: true,
            toaster: "b-toaster-top-right"
          });
          this.$auth.fetchUser()
            if(this.innerForm.byWhatsApp) {
              window.open(`https://api.whatsapp.com/send?phone=0096653149256320&text=sdfsafsafsadf`,'_blank')
            }
        })
      }
      else{
        this.$axios.put(`/searchQuery/${this.innerForm.id}`, this.innerForm).then(() => {
          this.$bvToast.toast("تم الحفظ", {
            title: "تم التحديث بنجاح",
            variant: "success",
            solid: true,
            toaster: "b-toaster-top-right"
          });
          this.$auth.fetchUser()
        })
      }

    },
    mergeObj(obj1, obj2) {
      return _.union([...obj1], [...obj2])
    },
    address_(_address) {
      console.log('_address',_address)

      if(!_address) return  ;
      if (_address.toString().length === 2) {
        return this.$t('region.' + _address)
      } else if (_address.toString().length === 4) {
        return this.$t('city.' + _address) + ', ' + this.$t('region.' + _address.toString().substring(0, 2))
      } else {
        return this.$t('district.' + _address) + ', ' + this.$t('city.' + _address.toString().substring(0, 4))
      }
    },

    deal_(_dealType, _rentType) {
      if ((_dealType === 2 || _dealType === 6) && _rentType) {
        return this.$t('dealTypeOperation.' + _dealType) + ' (' + this.$t('rentDealTypes.' + _rentType) + ')';
      }
      return this.$t('dealTypeOperation.' + _dealType);
    },

    generateTitle: function () {
      if(!this.innerForm.addressId) return;

      let _address;
      if (this.innerForm.addressId < 99) {
        _address = this.$t('region.' + this.innerForm.addressId);
      } else if (this.innerForm.addressId > 99 && this.innerForm.addressId < 9999) {
        _address = this.$t('city.' + this.innerForm.addressId);
      } else if (this.innerForm.addressId > 9999) {
        _address = this.$t('district.' + this.innerForm.addressId)
      }
      this.innerForm.title = this.$t('dealTypeOperation.' + this.innerForm.dealType) + ' في ' + _address;
    },

    getAddress(){
      console.log("test1",this.form.bounds)
      if(this.innerForm.addressId) return;
      let location={
        Lat:(this.form.bounds[0] + this.form.bounds[1])/2,
        Lng:(this.form.bounds[2]+ this.form.bounds[3])/2
      }
      this.$axios.post(`/address/locate`,{location:location}).then((response)=>{
        let region=response.data.data.region;
        if(region ==-1)
        {
          return;
        }
        if(region)
        {
          this.innerForm.addressId=region;
          this.generateTitle()
        }
      }).catch((error)=>{
       // console.log("error",error)
      })
    },

  },
  computed: {

    ...mapState('agency', ['AgenciesRealEstate']),
    modalAttribute() {
      return {
        ['id']: "modal-notify-"+this.modalId,
      }
    },
    propertyTypes() {
      let mergedArray = _.union( this.innerForm.residentialRealstateType, this.innerForm.commertialRealstateType);
      return mergedArray;
    }


  },
  watch: {
    form: {
      deep:true,
      immediate:true,
      handler() {
        this.innerForm = Object.assign({}, this.form);
        this.generateTitle();
      }
    }

  },
  mounted() {
    if (!this.AgenciesRealEstate.length) {
      this.$store.dispatch('agency/fetchAgencies_realEstates').catch((error) => {
        console.log(error);
      });
    }

  }

}


