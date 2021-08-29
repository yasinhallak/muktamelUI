import axios from "axios";
import {validate, ValidationObserver, ValidationProvider} from "vee-validate/dist/vee-validate.full";

/*
example in template:

   <mx-modal-contacts-card
    ***First prop***        :offer22="offer"
    ***Second prop***       :isMessage="true" or isWeb or isMobileCall isMobileWhatsApp or isMobileMail
    ***Third prop***        :projectType="true" or realEstateType >
   </mx-modal-contacts-card>


*/

export default {
  name: 'contacts-card-modal',
  components: {
    ValidationObserver,
    ValidationProvider,
    validate
  },
  props: {

    /******** is required for base data *********/
    /*Base Data*/
    offer22: Object,


    /******** one of two prop is required ************/
    /*for projects forms*/
    projectType: {
      default: false,
      type: Boolean
    },

    /*for projects forms*/
    agencyType: {
      default: false,
      type: Boolean
    },

    /*for realEstate forms*/
    realEstateType: {
      default: false,
      type: Boolean,
    },

    /*for realEstate card inside project page*/
    projectRealType: {
      default: false,
      type: Boolean,
    },

    isAuction: {
      default: false,
      type: Boolean,
    },

    id: {
      default: '',
      type: String
    },

    /*for plans forms*/
    planType: {
      default: false,
      type: Boolean,
    },


    /******** one of five prop is required ************/

    /*For Mobile Call Form*/
    isMobileCall: {
      default: false,
      type: Boolean
    },

    /*for web call Form*/
    isCall: {
      default: false,
      type: Boolean
    },

    /*for Mobile Mail*/
    isMobileMail: {
      default: false,
      type: Boolean
    },

    /*For Mobile WhatsApp Form*/
    isMobileWhatsApp: {
      default: false,
      type: Boolean
    },

    /*for web message*/
    isMessage: {
      default: false,
      type: Boolean
    },

    /************* End ***************/


  },
  data() {
    return {
      modalProject: 'email',
      dataType: '',
      form: {
        interested: null,
        name: null,
        phone: null,
        email: null,
        reason: null,
        notes: ` مرحباً , أنا مهتم ${this.getDataType()}${this.offer22.id} في موقع مكتمل .الرجاء التواصل معي , شكرا `,
        friendEmail: null,
        friendNote: 'مرحبا , لقد وجدت هذا العقار على موقع مكتمل .  أرجو أن تتحقق منه و تخبرني برأيك فيه'
      },
      /*data form fields*/

    }
  },
  computed: {
    totalArea: function () {
      return this.offer22.flat0Area + this.offer22.flat1Area + this.offer22.flatExtArea;
    }

  },
  mounted() {

  },
  methods: {

    getDataType() {
      if (this.realEstateType) {
        return 'بالعقار'
      }
      if (this.agencyType) {
        return 'بالتواصل مع الشركة'
      }
      if (this.planType) {
        return 'بالمخطط'
      }
      if (this.projectType) {
        return 'بالمشروع'
      }
      return 'بالعقار'
    },

    //return format number
    formatNumber(num) {
      if (num != null)
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    },

    /*send mail form method*/
    contactForm() {
      let payload = {
        name: this.form.name,
        email: this.form.email,
        MobileNO: this.form.phone,
        EmailText: this.form.notes,
      };
      this.$axios
        .post(`/offer/${this.offer22.id}/contact`, payload)
        .then(
          response => {
            this.$bvToast.toast("تم استلام الطلب بنجاح", {
              variant: "success",
              autoHideDelay: 3000,
              solid: true
            });
            if(this.id){
              $('#'+this.id).modal('hide');
            }
            else{
              $('#modalEmail').modal('hide');
              $('#modalProject').modal('hide');
            }

          }
        ).catch(error => {
        this.$bvToast.toast("حدث خطأ", {
          variant: "danger",
          autoHideDelay: 3000,
          solid: true
        });
      })

    },

    /*WhatsApp Form method*/
    Statistic(statists) {
      let phoneNum;
      if (this.agencyType) {
        phoneNum = this.offer22.contact.whatsApp;
      } else {
        if(this.offer22.employee.phone){
          phoneNum =this.offer22.employee.phone
        }
        else{
          phoneNum =this.offer22.employee.user.phone
        }
      }
      if(this.projectRealType){
        phoneNum =this.offer22.employee.phone
      }
      this.$axios
        .post(`/offer/${this.offer22.id}/updateStatistics`, {
          StatusStatistics: statists
        }).then(
        response => {
          let whats_message = this.form.notes;
          let link = `${this.$vRoute.base}/offer/realestate/${this.offer22.id}`;
          let _id=this.id?'#'+this.id:'#modalWhatsApp';
          console.log(_id);
          if (statists === 4) {
            if(this.id){
              $(_id).modal('hide');
            }
            else {
              $('#modalWhatsApp').modal('hide');
              $('#modalProject').modal('hide');
            }

            window.open(`https://api.whatsapp.com/send?phone=00966${phoneNum}&text=${whats_message}`);
          } else if (statists === 3) {
            if(this.id){
              $(_id).modal('hide');
            }
            else{
              $('#modalWhatsApp').modal('hide');
              $('#modalProject').modal('hide');
            }
            window.open(`https://api.whatsapp.com/send?phone=${phoneNum}&text=${whats_message}`);
          }
        })
        .catch(error => {
          this.$bvToast.toast("حدث خطأ", {
            variant: "danger",
            autoHideDelay: 3000,
            solid: true
          });
        })
    },

    /*for create address list*/
    listAddress(payload) {
      if (!payload) return [];
      let address = [];
      if (payload.region != null) address.push(this.$t(`region.${payload.region}`))
      if (payload.city) address.push(this.$t(`city.${payload.city}`))
      if (payload.district) address.push(this.$t(`district.${payload.district}`))
      return address;
    },

    /*invent form*/
    inviteForm() {
      let payload = {
        name: this.form.name,
        EmailText: this.form.friendNote,
        SenderEmail: this.form.email,
        ReceiverEmail: this.form.friendEmail
      };
      this.$axios
        .post(`/offer/${this.offer22.id}/shareoffer`, payload)
        .then(
          response => {
            let _id=this.id?'#'+this.id:'#modalProject';
            this.$bvToast.toast("تمت مشاركة المنشور مع صديقك", {
              variant: "success",
              autoHideDelay: 3000,
              solid: true
            });
            $(_id).modal('hide');
          }
        ).catch(error => {
        console.log(error);
        this.$bvToast.toast("حدث خطأ", {
          variant: "danger",
          autoHideDelay: 3000,
          solid: true
        });
      })

    },

  },

}


