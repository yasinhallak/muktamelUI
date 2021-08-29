import {
  Hooper,
   Slide as CustomSlide,
  Progress as HooperProgress,
  Pagination as HooperPagination,
  Navigation as HooperNavigation
} from 'hooper';
import {
  validate,
  ValidationObserver,
  ValidationProvider
} from "vee-validate/dist/vee-validate.full";

class CalculatorFrom{
  constructor(){
    this.Finishing=1;
    this.L=20; // Land Length
    this.W=15; // Land width
    this.A=null; // Land Area
    this.VL1=null; // the length of land that face the street 1
    this.VL2=null; // the length of land that face the street 2
    this.VL3=null; // the length of land that face the street 3
    this.VL4=null; // the length of land that face the street 4
    this.A0=null; // the area of land floor
    this.A1=null; // the area of first floor
    this.A3=null; // the area of warehouse
    this.Lp=null; // design Length
    this.Wp=null; // design width
    this.Lw=null; // water tank width
    this.Ls=null; // saref bayara Length
    this.Ws=null;  // saref bayara width

  }
}
export default {

  validate({ params,redirect }) {
    // Must be a number
     if(/^\d+$/.test(params.id) && params.id.length  <= 10){
       return true;
      }
      redirect('/404')
  },

  async asyncData({redirect,store,params}){
    await store.dispatch("getPlanDetail",params.id)
      .catch(error => {
        if (error.response.status === 404) {
          redirect('/404')
        }
      });
  },

  // async fetch () {
  //   await this.$axios.get(`/offer/engineering/${this.$route.params.id}`)
  //     .then(resp => {
  //       this.offer=resp.data;
  //     })
  //     .catch( (error)=> {
  //       if (error.response.status === 404) {
  //         this.$nuxt.context.redirect(`/404`)
  //       }
  //     });
  // },

  name: 'id',
  components: {
    Hooper,
    CustomSlide,
    HooperNavigation,
    HooperPagination,
    ValidationObserver,
    ValidationProvider,
    validate
  },
  props: [],

  head() {

      return {
        title: 'مخطط هندسي',
        meta: [
          {charset: 'utf-8'},
          {name: 'viewport', content: 'width=device-width, initial-scale=1'},
          {hid: 'description', name: 'description', content: `${this.getDescriptionMetaData()}`},
          {name: 'author', content: `${this.offer.title}- @muktamel`},
          {hid: 'robots', name: 'robots', content: 'index,follow'},
          {hid: 'keywords', name: 'keywords', content: ''},
          {name: 'theme-color', content: '#007bff'},
          {name: 'mobile-web-app-capable', content: 'yes'},
          {
            hid: 'apple-mobile-web-app-title',
            name: 'apple-mobile-web-app-title',
            content: `${this.getTitleMetaData()}`
          },
          {hid: 'og:image', property: 'og:image', content: this.$vRoute.imageUrl(this.offer.flat0Photo)},
          {
            hid: 'og:image:secure_url',
            property: 'og:image:secure_url',
            content: this.$vRoute.imageUrl(this.offer.flat0Photo)
          },
          {hid: 'og:image:width', property: 'og:image:width', content: '300'},
          {hid: 'og:image:height', property: 'og:image:height', content: '200'},
          {hid: 'og:title', property: 'og:title', content: `${this.getTitleMetaData()}`},
          {hid: 'og:description', property: 'og:description', content: `${this.getDescriptionMetaData()}`},
          {hid: 'og:url', property: 'og:url', content: `${this.$vRoute.base}${this.$route.path}`},
          {hid: 'og:site_name', property: 'og:site_name', content: 'muktamel'},
          {hid: 'og:type', property: 'og:type', content: 'product'},
          {name: 'twitter:card', content: `${this.getTitleMetaData()}`},
          {name: 'twitter:creator', content: `${this.offer.title}- @muktamel`},
          {name: 'twitter:site', content: 'muktamel'},
          {hid: 'twitter:image:src', name: 'twitter:image:src', content: this.$vRoute.imageUrl(this.offer.flat0Photo)},
          {hid: 'twitter:title', name: 'twitter:title', content: `${this.getTitleMetaData()}`},
          {hid: 'twitter:description', name: 'twitter:description', content: `${this.getDescriptionMetaData()}`},
          {hid: 'twitter:url', name: 'twitter:url', content: `${this.$vRoute.base}${this.$route.path}`}
        ]
      }

  },

  data() {
    return {
      hooperGallery: {
        itemsToShow: 1,
        wheelControl:false,
        autoPlay: true
      },
      hooperOtherProject: {
        trimWhiteSpace: true,
        autoPlay: false,
        itemsToSlide: 1,
        wheelControl:false,
        breakpoints: {
          1400: { // 2400px ~
            itemsToShow: 5
          },
          900: {
            itemsToShow: 4
          },
          600: {
            itemsToShow: 3
          },
          400:{
            itemsToShow: 1.8
          },
          0: { // 0px ~ 600px
            itemsToShow: 1.6
          }
        },
      },
      offerId: null,
      realEstateType: 11,
      breakpointsGallery: {
        2000: {
          fixedHeight: '450px'
        },
        900: {
          fixedHeight: '375px'
        },
        767: {
          fixedHeight: '325px'
        }
      },
      breakpointsRelated: {
        2000: {
          visibleSlides: 5,
          fixedHeight: '250px'
        },
        900: {
          visibleSlides: 3,
          fixedHeight: '350px'
        },
        767: {
          visibleSlides: 1,
          fixedHeight: '450px'
        }
      },
      StatisticsEnum: {
        SearchAppearCount: 1,
        DetailsShowCount: 2,
        PhoneCount: 3,
        WhatsAppCount: 4,
        MessageCount: 5
      },
      slides: [{
          title: 'Slide #1',
          content: 'Slide content.'
        },
        {
          title: 'Slide #2',
          content: 'Slide content.'
        },
        {
          title: 'Slide #2',
          content: 'Slide content.'
        },
        {
          title: 'Slide #2',
          content: 'Slide content.'
        }
      ],
      calculator: {
        totalResult: 0
      },
      lists: {
        newStreetSides: [{
            "id": 1,
            "name": "شمال",
            "group": 1,
            "cat": 1
          },
          {
            "id": 2,
            "name": "جنوب",
            "group": 1,
            "cat": 1
          },
          {
            "id": 3,
            "name": "شرق",
            "group": 2,
            "cat": 1
          },
          {
            "id": 4,
            "name": "غرب",
            "group": 2,
            "cat": 1
          },
          {
            "id": 5,
            "name": "شمال شرقي",
            "group": 3,
            "cat": 2
          },
          {
            "id": 6,
            "name": "شمال غربي",
            "group": 4,
            "cat": 2
          },
          {
            "id": 7,
            "name": "جنوب شرقي",
            "group": 4,
            "cat": 2
          },
          {
            "id": 8,
            "name": "جنوب غربي",
            "group": 3,
            "cat": 2
          }
        ],
        streetWidth: [
          6,
          8,
          10,
          12,
          15,
          18,
          20,
          25,
          28,
          30,
          36,
          40,
          50,
          60,
          80,
          100
        ],
      },
      showElement: {
        landInfo: false
      },
      streetsLand: [],
      width: null,
      length: null,
      streetNumber: 4,
      land: null,
      street_number: 1,
      streetsA: [{
          direction: null,
          width: null,
          isLength: null
        },
        {
          direction: null,
          width: null,
          isLength: null
        },
        {
          direction: null,
          width: null,
          isLength: null
        },
        {
          direction: null,
          width: null,
          isLength: null
        }
      ],
      offer: null,
      relatedOffers: null,
      calculatorForm:new CalculatorFrom(),
      finishing: 1,
      featuresToggle: false,
      form: {
        interested: null,
        name: null,
        phone: null,
        email: null,
        reason: null,
        notes: null,
        friendEmail: null,
        friendNote: 'مرحبا , لقد وجدت هذا العقار على موقع مكتمل .  أرجو أن تتحقق منه و تخبرني برأيك فيه'
      }
    }
  },

  methods: {
    onLoadOffer(){
      try {
        this.offer = {...this.$store.state.planDetail};
      }catch (e) {
        console.log(e);
      }
    },
    getRelatedOffer() {
      this.$axios
        .get(`/offer/engineering/${this.offerId}/suggestions`)
        .then(
          response => {
            this.relatedOffers = response.data;
          }
        ).catch(function (error) {
          console.log(error);
          alert('حدث خطأ')
        })
    },
    // get title meta data
    getTitleMetaData(){
      let diagramType = this.$t(`diagramType.${this.offer.type}`);
      return `${this.offer.title}  مكتمل | ${diagramType}  `;
    },
     // get description meta data
    getDescriptionMetaData(){
      let totalRoomsCount = this.offer.flat0RoomsCount + this.offer.flat1RoomsCount + this.offer.flatExtRoomsCount;
      let totalPathRoomsCount=this.offer.flat0BathroomsCount +this.offer.flat1BathroomsCount + this.offer.flatExtBathroomsCount;
      let totalArea= this.offer.flat0Area +this.offer.flat1Area + this.offer.flatExtArea;
      return `الغرف:${totalRoomsCount}, حمام:${totalPathRoomsCount}, المساحة:${totalArea} م2 `
    },

    formatNumber(num) {
      if (num != null)
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },


    // add to favorite
    addFavorite() {
      let payload = {
        offerId: this.offer.id,
        isFavorite: this.offer.isFavorite,
      };
      this.$store.dispatch("AddFavorite", payload).then((r) => {
        this.offer.isFavorite = r;
      });
    },

    listAddress(payload) {
      if (!payload) return [];
      let address = [];
      if (payload.region != null) address.push(this.$t(`region.${payload.region}`))
      if (payload.city) address.push(this.$t(`city.${payload.city}`))
      if (payload.district) address.push(this.$t(`district.${payload.district}`))
      return address;
    },

    calculateCost() {
      this.calculatorForm.A0=this.offer.flat0Area; // the area of land floor
      this.calculatorForm.A1=this.offer.flat1Area; // the area of first floor
      this.calculatorForm.A2=this.offer.flatExtArea; // the area of extension
      this.calculatorForm.A3=0; // the area of warehouse
      this.calculatorForm.Lp=this.offer.maxLength; // design Length
      this.calculatorForm.Wp=this.offer.maxWidth; // design width
       if(this.land){
        this.calculatorForm.L=this.land.length; // Land Length
        this.calculatorForm.W=this.land.width; // Land width
        this.calculatorForm.A=this.land.width * this.land.length; // Land Area
       }
       if(this.land &&  this.land.Streets && this.land.Streets[0]) {
         console.log("test")
        this.calculatorForm.VL1=this.land.Streets[0].isLength?this.land.length:this.land.width // the length of land that face the street 1
       }
       if(this.land && this.land.Streets && this.land.Streets[1]){
        this.calculatorForm.VL2=this.land.Streets[1].isLength?this.land.length:this.land.width // the length of land that face the street 2
      }
      if(this.land && this.land.Streets && this.land.Streets[2]){
        this.calculatorForm.VL3=this.land.Streets[2].isLength?this.land.length:this.land.width //the length of land that face the street 3
      }
      if(this.land && this.land.Streets && this.land.Streets[3]){
        this.calculatorForm.VL4=this.land.Streets[3].isLength?this.land.length:this.land.width // the length of land that face the street 4
      }

      this.$axios
        .post('/offer/engineering/calculator', this.calculatorForm)
        .then(
          response => {
            this.calculator = response.data;

          }
        ).catch(function (error) {
          console.log(error);
          alert('حدث خطأ')
        })
    },

    contactForm() {
      let payload = {
        name: this.form.name,
        email: this.form.email,
        MobileNO: this.form.phone,
        EmailText: this.form.interested,
      }
      this.$axios
        .post(`/offer/${this.offerId}/contact`, payload)
        .then(
          response => {
            console.log('this', this)
            alert('تم استلام الطلب بنجاح')
          }
        ).catch(function (error) {
          console.log(error);
          alert('حدث خطأ')
        })

    },
    reportForm() {
      let payload = {
        name: this.form.name,
        Email: this.form.email,
        Reason: this.form.reason,
        ReasonText: this.form.notes,
      }
      this.$axios
        .post(`/offer/${this.offerId}/report`, payload)
        .then(
          response => {
            this.$bvToast.toast("شكرا لكم, تم الابلاغ عن المشكلة بنجاح", {
              variant: "success",
              autoHideDelay: 3000,
              solid: true
            });
            $('#modalproblem').modal('hide');
          }
        ).catch(function (error) {
          console.log(error);
        this.$bvToast.toast("حدث خطأ", {
          variant: "danger",
          autoHideDelay: 3000,
          solid: true
        });
        })
    },
    inviteForm() {
      let payload = {
        name: this.form.name,
        EmailText: this.form.friendNote,
        SenderEmail: this.form.email,
        ReceiverEmail: this.form.friendEmail
      }
      this.$axios
        .post(`/offer/${this.offerId}/shareoffer`, payload)
        .then(
          response => {
            this.$bvToast.toast("تمت مشاركة المنشور مع صديقك", {
              variant: "success",
              autoHideDelay: 3000,
              solid: true
            });
            $('#modalShareMail').modal('hide');
          }
        ).catch(function (error) {
          console.log(error);
        this.$bvToast.toast("حدث خطأ", {
          variant: "danger",
          autoHideDelay: 3000,
          solid: true
        });
        })

    },
    updateStatistic(type) {
      this.$axios
        .post(`/offer/${this.offerId}/updateStatistics`, {
          StatusStatistics: type
        })
        .then(
          response => {
            console.log('updateStatistic', response)
          }
        ).catch(function (error) {
          console.log(error);
          alert('حدث خطأ')
        })

    },
    landInfoChanged(obj) {
      console.log("landInfoChanged:", obj);
      let objectland = {
        length: obj.land.length,
        width: obj.land.width,
        Streets: []
      }
      obj.streets.forEach(item => {
        if (item.isLength != null && item.width != null)
          objectland.Streets.push({
            IsLength: item.isLength,
            Width: item.width
          });
      });
      // // validate
      // if (objectland.length == 0 || objectland.width == 0 || objectland.Streets.length == 0)
      //   return;
      this.land = objectland;
      this.calculateCost();
    },

  },
  computed: {

    setAgencyType(){
      let object={
        "type":7,
      };
      let url=  this.$vRoute.CreateQueryString(object);
      return  `/agencies${url}`;

    },


    hasDimension: function () {
      if(this.land)
      return this.land.width && this.land.length;
      return false;
    },
    formTextBox: function () {
      this.form.interested = 'مرحباً , أنا مهتم بعقارك (' + this.offerId + ') في موقع مكتمل .الرجاء التواصل معي , شكرا';
      return `مرحباً , أنا مهتم بعقارك ( {this.offerId}$ ) في موقع مكتمل .الرجاء التواصل معي , شكرا`
    },
    photos: function () {
      let photos = [];
      if (this.offer.flat0Photo) photos.push({
        path: this.offer.flat0Photo
      });
      if (this.offer.flat1Photo) photos.push({
        path: this.offer.flat1Photo
      });
      if (this.offer.flatExtPhoto) photos.push({
        path: this.offer.flatExtPhoto
      });

      return photos.concat(this.offer.photos);
    },
    totalRoomsCount: function () {
      return this.offer.flat0RoomsCount + this.offer.flat1RoomsCount + this.offer.flatExtRoomsCount;
    },
    totalHallsCount: function () {
      return this.offer.flat0HallsCount + this.offer.flat1HallsCount + this.offer.flatExtHallsCount;
    },
    totalKitchenCount: function () {
      return this.offer.flat0KitchensCount + this.offer.flat1KitchensCount + this.offer.flatExtKitchensCount;
    },
    totalBathroomsCount: function () {
      return this.offer.flat0BathroomsCount + this.offer.flat1BathroomsCount + this.offer.flatExtBathroomsCount;
    },
    totalArea: function () {
      return this.offer.flat0Area + this.offer.flat1Area + this.offer.flatExtArea;
    }
  },
  mounted() {
   window.scrollTo(0, 0);
   setTimeout(this.calculateCost,1000) ;
    this.getRelatedOffer()
  },
  updated() {
    $(document).ready(function () {
      'use strict';

      $('.show_all_photo').click(function () {
        $(".show_all_photo").hide();
        $(".all_photo").hide();
        $(".thumb-gallery").hide();
        $(".all_photo_cont").slideDown();

      })
      $('.close_all_photo').click(function () {
        $(".all_photo_cont").slideUp();
        $(".show_all_photo").show();
        $(".all_photo").show();
        $(".thumb-gallery").show();
      })

      $('.email_ch').click(function () {
        $('.email_ch_input').show();
        $('.mobile_ch_input').hide();
        $(this).addClass('active_');
        $('.mobile_ch').removeClass('active_');
      })
      $('.mobile_ch').click(function () {
        $('.email_ch_input').hide();
        $('.mobile_ch_input').show();
        $(this).addClass('active_');
        $('.email_ch').removeClass('active_');
      })

    });
  },
  watch: {
    "calculatorForm.Finishing":function(){
      this.calculateCost();
    }
  },
  created() {
    //TODO GET OFFER ID
    this.onLoadOffer();
    this.offerId = this.$route.params.id; //577
    this.formTextBox;
  }
}
