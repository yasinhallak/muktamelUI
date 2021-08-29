import {
  Hooper,
  Slide as CustomSlide,
  Progress as HooperProgress,
  Pagination as HooperPagination,
  Navigation as HooperNavigation
} from "hooper";

import {validate, ValidationObserver, ValidationProvider} from "vee-validate/dist/vee-validate.full";
import VueScrollTo from "vue-scrollto"

class RealForm {
  constructor() {
    this.addressId = null;
    this.dealType = null;
    this.saleType = [];
    this.residentialRealstateType = [];
    this.commertialRealstateType = [];
    this.featuresRealEstates = null;
    this.agencyId = null;
    this.priceFrom = null;
    this.priceTo = null;
    this.roomsCountFrom = null;
    this.roomsCountTo = null;
    this.bathRoomsCountFrom = null;
    this.bathRoomsCountTo = null;
    this.landAreaFrom = null;
    this.landAreaTo = null;
    this.buildingAreaFrom = null;
    this.buildingAreaTo = null;
    this.streetsCountFrom = null;
    this.streetsCountTo = null;
    this.realEstateAgeFrom = null;
    this.realEstateAgeTo = null;
    this.finishingRealEstate = null;
    this.keyWord = null;
    this.bounds = null;
    this.featuresRealEstates = [];
    this.isFavorite = null;
    this.isCommertial = null;
    this.hasVirtualTour = null;
    this.sortColumn = null;
    this.sortDirection=null;
    this.LoadMapAreaStatistics = true;
  }
}

class DevForm {
  constructor() {
    this.addressId = null;
    this.agencyId = null;
    this.sortColumn = null;
    this.sortDirection=null;
    this.Bounds = null;
  }
}

class PlanForm {
  constructor() {
    this.sortColumn = null;
    this.sortDirection=null;
    this.agencyId = null;
    this.Land = null;
  }
}

const StatisticsEnum = Object.freeze({
  SearchAppearCount: 1,
  DetailsShowCount: 2,
  PhoneCount: 3,
  WhatsAppCount: 4,
  MessageCount: 5
});

const typeStatitics = Object.freeze({
  "1": "realEstateType",
  "2": "region",
  "3": "city",
  "4": "district",
  "5": "process",
  "6": "category"
});

const agencyType = Object.freeze({
  realestate: 1,
  estatedev: 2,
  engineering: 3,
  financing: 4,
  photography: 5,
  estimator: 6,
  constructor: 7,
  chalet: 8,
  weddingHall: 9,
  playground: 10,
  school: 11,
  hospital: 12,
  trading: 13,
  service: 14,
  auction: 15
});

const SortDirection = Object.freeze({
  Asc: 1,
  Desc: 2
});

const pageSize = 4;

export default {

  validate({ params,redirect }) {
    // Must be a number
    if(/^\d+$/.test(params.id) && params.id.length  <= 10){
      return true;
    }
    redirect('/404')
  },
  // TODO: Fix Meta name
  async asyncData({redirect, params, $axios}) {
    return await $axios.get(`/agency/${params.id}/profile`).then((res) => {
      return {
        agency: res.data.data,
        totalCount:res.data.data.totalCount,
        levelOne: res.data.data.type,
        map:{
          location:res.data.data.location,
          options:{
            minZoom: 15,
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
            scaleControl: true,
            draggable: true,
            draggableCursor: null,
            disableDefaultUI: true,
            styles: [
              {
                featureType: 'poi.business',
                stylers: [{visibility: 'off'}]
              },
              {
                featureType: 'poi.medical',
                stylers: [{visibility: 'off'}]
              },
              {
                featureType: 'poi.place_of_worship',
                stylers: [{visibility: 'off'}]
              },
              {
                featureType: 'poi.school',
                stylers: [{visibility: 'off'}]
              }
            ],
          }
        }
      }
    }).catch((e) => {
      redirect('/404')
    })
  },
  // async fetch () {
  //   await this.$axios.get(`/agency/${this.$route.params.id}/profile`)
  //     .then(resp => {
  //       this.agency=resp.data.data;
  //       this.totalCount = this.agency.totalCount ;
  //       this.levelOne = this.agency.type !== 15;
  //       this.sortSelected=this.SortType[this.agency.type][0];
  //       if (this.agency.type === 1 || this.agency.type === 15) {
  //         this.realEstateForm.agencyId = this.agency.id;
  //         this.realEstateForm.dealType = this.agency.type === 15 ? 11 : null;
  //         return;
  //       }
  //       if (this.agency.type === 2) {
  //         this.realEstateDevForm=new DevForm();
  //         this.realEstateDevForm.agencyId = this.agency.id;
  //         return;
  //       }
  //       if (this.agency.type === 3) {
  //         this.plansForm=new PlanForm();
  //         this.plansForm.agencyId = this.agency.id;
  //         return;
  //       }
  //
  //     })
  //     .catch( (error)=> {
  //       if (error.response.status === 404) {
  //         this.$nuxt.context.redirect(`/404`)
  //       }
  //     });
  // },
  components: {
    Hooper,
    CustomSlide,
    HooperNavigation,
    ValidationObserver,
    ValidationProvider,
    validate,
    VueScrollTo,
  },
  name: "agency",
  props: [],
  head() {
      return {
        title: this.agency.name + ' | muktamel',
        meta: [
          {charset: 'utf-8'},
          {name: 'viewport', content: 'width=device-width, initial-scale=1'},
          {hid: 'description', name: 'description', content: this.agency.description},
          {name: 'author', content: `${this.agency.name}- @muktamel`},
          {hid: 'robots', name: 'robots', content: 'index,follow'},
          {hid: 'keywords', name: 'keywords', content: ''},
          {name: 'theme-color', content: '#007bff'},
          {name: 'mobile-web-app-capable', content: 'yes'},
          {hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: `${this.agency.name}`},
          {hid: 'og:image', property: 'og:image', content: this.$vRoute.imageUrl(this.agency.logo)},
          {
            hid: 'og:image:secure_url',
            property: 'og:image:secure_url',
            content: this.$vRoute.imageUrl(this.agency.logo)
          },
          {hid: 'og:image:width', property: 'og:image:width', content: '300'},
          {hid: 'og:image:height', property: 'og:image:height', content: '200'},
          {hid: 'og:title', property: 'og:title', content: `${this.agency.name}`},
          {hid: 'og:description', property: 'og:description', content: this.agency.description},
          {hid: 'og:url', property: 'og:url', content: `${this.$vRoute.base}${this.$route.path}`},
          {hid: 'og:site_name', property: 'og:site_name', content: 'muktamel'},
          {hid: 'og:type', property: 'og:type', content: 'product'},
          {name: 'twitter:card', content: this.agency.description},
          {name: 'twitter:creator', content: `${this.agency.name}- @muktamel`},
          {name: 'twitter:site', content: 'muktamel'},
          {hid: 'twitter:image:src', name: 'twitter:image:src', content: this.$vRoute.imageUrl(this.agency.logo)},
          {hid: 'twitter:title', name: 'twitter:title', content: this.agency.name},
          {hid: 'twitter:description', name: 'twitter:description', content: this.agency.description},
          {hid: 'twitter:url', name: 'twitter:url', content: `${this.$vRoute.base}${this.$route.path}`}
        ]
      }
  },
  data()  {
    return {
      activeTooltip:false,
      customItem:null,
      itemId:null,

      agencyId: null,
      agency: null,
      zoom: 15,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      form: {
        name: null,
        phone: null,
        email: null,
        message: null,
        interested: null,
        reason: null,
        notes: null,
        friendEmail: null,
        friendNote: 'مرحبا , لقد وجدت هذا العقار على موقع مكتمل .  أرجو أن تتحقق منه و تخبرني برأيك فيه'
      },
      listToggle:false,
      StatisticsEnum: StatisticsEnum,
      ResidentialOffers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      CommertialOffers: [1, 5, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      searchBoxAddress: {
        options: [],
        filterdOptions: [],
        svalue: "",
        selected: []
      },
      backButVisible: false,
      levelOne: true,
      sortSelected:null,
      SortType: {
        [agencyType.realestate]: [{sortCol:2,sortDir:2} ,{sortCol:1,sortDir:1},{sortCol:1,sortDir:2}],
        [agencyType.estatedev]: [{sortCol:2,sortDir:2} ,{sortCol:1,sortDir:1},{sortCol:1,sortDir:2}],
        [agencyType.engineering]: [{sortCol :3,sortDir:1 },{sortCol :3,sortDir:2 } ,{sortCol :4,sortDir:1 },{sortCol :5,sortDir:1 },{sortCol :6,sortDir:1 }],
        [agencyType.auction]: [{sortCol :2,sortDir:2 },{sortCol :4,sortDir:2 }],
      },
      totalCount: 0,
      resultsCount: 0,
      realEstateForm: new RealForm(),
      filterResultsSampleData: [],
      realCurrentPage: 1,
      realEstatesSampleData: null,
      realEstateDevForm: null,
      devCurrentPage: 1,
      realEstatesDevSampleData: null,
      plansForm: null,
      plansCurrentPage: 1,
      plansSampleData: null,
      readmore:[],
      readmore2: true,
      cardSameTypeCount: 1,
      cardSameTypeCount2: [],
      hooperOtherProject: {
        trimWhiteSpace: true,
        autoPlay: false,
        wheelControl:false,
        breakpoints: {
          1400: {
            // 2400px ~
            itemsToShow: 4
          },
          900: {
            itemsToShow: 4
          },
          600: {
            itemsToShow: 3
          },
          0: {
            // 0px ~ 600px
            itemsToShow: 1.5
          }
        }
      },
      hooperClients: {
        trimWhiteSpace: true,
        autoPlay: false,
        wheelControl:false,
        breakpoints: {
          2000: {
            // 2400px ~
            itemsToShow: 8
          },
          1100: {
            itemsToShow: 5
          },
          750: {
            itemsToShow: 3.5
          },
          0: {
            // 0px ~ 600px
            itemsToShow: 1.5
          }
        }
      }


    };
  },
  methods: {
    scrollElementIntroView(e){
      let elementId = e.target.dataset.scroll;
      let element =  document.getElementById(elementId);
      element.scrollIntoView()
    },
    moveSmoothly(ref,item,type){
      let that = this;
      let thisMap = this.$refs[ref].$mapObject;
      that.$refs[ref].$mapObject.panTo(item.location);
      function popupItem(){
        that.$root.$emit('bv::show::popover', type+'-marker-'+item.id);
        google.maps.event.clearListeners(thisMap);
      }
      google.maps.event.addListener(thisMap, 'idle', popupItem);


    },
    hideSocialSection(){
    return (
      !this.agency.contact.website &&
      !this.agency.contact.yotube &&
      !this.agency.contact.snapchat &&
      !this.agency.contact.instagram &&
      !this.agency.contact.twitter &&
      !this.agency.contact.facebook
    )
    },

    listAddress(payload) {
      let address = [];
      if (payload.region) address.push(this.$t(`region.${payload.region}`));
      if (payload.city) address.push(this.$t(`city.${payload.city}`));
      if (payload.district)
        address.push(this.$t(`district.${payload.district}`));
      return address;
    },
    dynamicContentMainFooterContains(order) {
      let response = false;
      this.agency.dynamicData.forEach(element => {
        if (element.order === order) {
          response = true;
        }
      });
      return response;
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
            $('#modalShare').modal('hide');
          }
        ).catch(function (error) {
       // console.log(error);

        this.$bvToast.toast("حدث خطأ", {
          variant: "danger",
          autoHideDelay: 3000,
          solid: true
        });
      })

    },

    checkTooltip(_id){
      this.activeTooltip = this.$refs[_id][0].scrollWidth > this.$refs[_id][0].clientWidth;
    },

    contactForm() {
      let payload = {
        name: this.form.name,
        email: this.form.email,
        MobileNO: this.form.phone,
        emailText: this.form.message
      };
      this.$axios
        .post(`/agency/${this.agencyId}/contact`, payload)
        .then(response => {
          alert("تم استلام الطلب بنجاح");
        })
        .catch(function(error) {
         // console.log(error);
          alert("حدث خطأ24");
        });
    },
    // statistics
    updateStatistic(type) {
      this.$axios
        .post(`/agency/${this.agencyId}/updateStatistics`, {
          StatusStatistics: type
        })
        .then(response => {
         // console.log("updateStatistic", response);
        })
        .catch(function(error) {
         // console.log(error);
        });
    },
    calcDist(offerLocation, itemLocation) {
      const inSquare = 1000,
        R = 5999808,
        inSquareDeg = (180 * inSquare) / Math.PI / R,
        mPerDeg = (Math.PI * R) / 180;
      let deltaLat = offerLocation.lat - itemLocation.lat,
        deltaLng = offerLocation.lng - itemLocation.lng;
      return Math.round(mPerDeg * Math.hypot(deltaLat, deltaLng)) / 1000;
    },

    FilterRealEstates() {
      this.realEstateForm.sortColumn=this.sortSelected.sortCol;
      this.realEstateForm.sortDirection=this.sortSelected.sortDir;
      this.$axios
        .post(
          `/offer/realestate/filter?PageNumber=${this.realCurrentPage}&PageSize=${pageSize}`,
          this.realEstateForm
        )
        .then(response => {
          this.realEstatesSampleData = response.data;
          this.resultsCount = response.data.totalCount;
          this.mapListTonavStatitics();

        })
        .catch(function(error) {
        //  console.log(error);
          alert("حدث خطأ26");
        });
    },

    FilterProjects() {
      this.realEstateDevForm.sortColumn=this.sortSelected.sortCol;
      this.realEstateDevForm.sortDirection=this.sortSelected.sortDir;
      this.$axios
        .post(
          `/offer/realestatedev/filter?PageNumber=${this.devCurrentPage}&PageSize=${pageSize}`,
          this.realEstateDevForm
        )
        .then(response => {
          this.realEstatesDevSampleData = response.data;
          this.resultsCount = response.data.totalCount;
        })
        .catch(function(error) {
        //  console.log(error);
          alert("حدث خطأ27");
        });
    },

    FilterPlans() {
      this.plansForm.sortColumn=this.sortSelected.sortCol;
      this.plansForm.sortDirection=this.sortSelected.sortDir;
      this.$axios
        .post(
          `/offer/engineering/Filter?PageNumber=${this.plansCurrentPage}&PageSize=${pageSize}`,
          this.plansForm
        )
        .then(response => {
          this.plansSampleData = response.data;
          this.resultsCount = response.data.totalCount;
        })
        .catch(function(error) {
          console.log(error);
          alert("حدث خطأ28");
        });
    },

    AddFavorite(obj) {
      let favorite = $(".fa-heart").hasClass("far") ? true : false;
      this.$axios
        .post(`/favorite/${obj.offerId}?isFavorite=${favorite}`)
        .then(response => {
          if (response.data) $(".added_to_favorit").toggleClass("far fas");
        })
        .catch(function(error) {
         // console.log(error);
          alert("you are not authorized");
        });
    },

    onChangeSort() {
      if (this.sortSelected == null) return;
      if (this.agency.type == 1 || this.agency.type == 15) {
        this.realEstateForm.sortColumn =this.sortSelected.sortCol;
        this.realEstateForm.sortDirection =this.sortSelected.sortDir;
      }
      if (this.agency.type == 3 ) {
        this.plansForm.sortColumn = this.sortSelected.sortCol;
        this.plansForm.sortDirection = this.sortSelected.sortDir;
      }
      if (this.agency.type == 2 ) {
        this.realEstateDevForm.sortColumn =this.sortSelected.sortCol;
        this.realEstateDevForm.sortDirection =this.sortSelected.sortDir;
      }
    },

    scrollToElement(){
      let element= this.$el.querySelector("#agencyContainer")
      VueScrollTo.scrollTo(element,500)
    },

    onChangePaginationReals(currentPage) {
      this.scrollToElement();
      this.realCurrentPage = currentPage;
      this.FilterRealEstates();
    },

    onChangePaginationDevs(currentPage) {
      this.scrollToElement();
      this.devCurrentPage = currentPage;
      this.FilterProjects();
    },

    onChangePaginationPlans(currentPage) {
      this.scrollToElement();
      this.plansCurrentPage = currentPage;
      this.FilterPlans();
    },

    // map listStatistics
    mapListTonavStatitics() {
      let l1 = this.isLevelOne && this.agency.type === 1;
      this.filterResultsSampleData = this.realEstatesSampleData.data.mapAreaStatistics
        .filter(x => !( x.type === 6 && x.id === 0))
        .map(obj =>
          {
            let id = obj.id;
            if(l1)
              id =obj.type===5 && obj.id===0 ? 1  :obj.type===5 && obj.id===1 ?2:obj.type===6 && obj.id===0?3:4 ;
            return{
              id: id,
              label: this.$t(`${typeStatitics[obj.type]}.${obj.id}`),
              value: obj.count,
              type: obj.type
            }
        });
    },

    // on click nav filter
    onClickStatistic(item) {
     // console.log("item:", item);

      this.realCurrentPage = 1;
      if (!item) return;

     // first level
      if(this.isLevelOne && this.agency.type ===1){
        if (item === 1) this.realEstateForm.dealType = 5;
        if (item === 2) this.realEstateForm.dealType = 6;
        if (item === 3) this.realEstateForm.isCommertial = false;
        if (item === 4) this.realEstateForm.isCommertial = true;
        return;
      }

      // second level [address]
      if(!this.isLastLevel){
        this.realEstateForm.addressId = item;
        this.realEstateForm.applyAddressFilter = true;
        return;
      }

      // last [Types]
      this.realEstateForm.residentialRealstateType = item;
      this.realEstateForm.commertialRealstateType = item;


    },

    reset() {
      this.realCurrentPage = 1;
      if(this.isLastLevel){
        this.realEstateForm.residentialRealstateType = [];
        this.realEstateForm.commertialRealstateType = [];
        this.realEstateForm.addressId =  parseInt(this.realEstateForm.addressId / 1000);
        return ;
      }

      if(this.realEstateForm.addressId !== null){
        this.realEstateForm.addressId = parseInt(this.realEstateForm.addressId / 100);
       // console.log("this.realEstateForm.addressId",this.realEstateForm.addressId)
        if(this.realEstateForm.addressId === 0)
          this.realEstateForm.addressId = null;
        return;
      }
      this.realEstateForm.dealType = null;
      this.realEstateForm.isCommertial = null;
    },

    showMoreCard(_itemId) {
      this.$refs[_itemId][0].classList.remove("haveMore2");
    },

    hideMoreCard(_itemId) {
      this.$refs[_itemId][0].classList.add("haveMore2");
    },

    cardCanRevert() {
      let isRevert=false;
      this.dynamicContentBody.forEach((res,i)=>{
        if(res.type === 2){
          if(isRevert) {
            this.$refs['dynamicContentBody-' + i][0].style.direction = "ltr";
          }
          else{
            this.$refs['dynamicContentBody-' + i][0].style.direction = "rtl";
          }
          isRevert=!isRevert;
        }
        else{
          this.$refs['dynamicContentBody-' + i][0].style.direction = "rtl";
          isRevert=false;
        }
      });
      },

    isFoundRealEstateSection(){
      if(this.agency.type ==1 || this.agency.type==2 || this.agency.type==15 || this.agency.type==3 ){
        return true;
      }
      return  false;
    },

    scrollSlideChange(position) {
      console.log(position)
      let x = 75;
      let thisElement = event.target;
      // TODO: remove jquery

      let selector = $(thisElement).siblings(".carousel-indicators")[0];
      let scroll =
        position === "top" || position === "bottom"
          ? selector.scrollTop
          : selector.scrollLeft;
      scroll =
        position === "top" || position === "left" ? scroll - x : scroll + x;

      selector.scroll({
        top: position === "top" || position === "bottom" ? scroll : 0,
        left: position === "top" || position === "bottom" ? 0 : scroll,
        behavior: "smooth",
      });
    },

  },
  computed: {
    isLevelOne: function() {
      if(this.agency.type === 1)
        return (
          this.realEstateForm.dealType == null &&
          this.realEstateForm.isCommertial == null
        );
      if(this.agency.type === 15)
        return (
          this.realEstateForm.addressId === null
        );
    },
    isLastLevel: function() {
      if(!this.realEstateForm.addressId) return false;
      return this.realEstateForm.addressId.toString().length === 7 ;
    },
    dynamicContentBody: function() {
      if (this.agency == null) return [];
      return this.agency.dynamicData
        .filter(x => x.type == 2 || x.type == 3)
        .sort((a, b) => a.order - b.order);
    }
  },
  created() {
    this.agencyId = this.$route.params.id;
    this.sortSelected=this.SortType[this.agency.type][0];
    if (this.agency.type === 1 || this.agency.type === 15) {
      this.realEstateForm.agencyId = this.agency.id;
      this.realEstateForm.dealType = this.agency.type === 15 ? 11 : null;
      return;
    }
    if (this.agency.type === 2) {
      this.realEstateDevForm=new DevForm();
      this.realEstateDevForm.agencyId = this.agency.id;
      return;
    }
    if (this.agency.type === 3) {
      this.plansForm=new PlanForm();
      this.plansForm.agencyId = this.agency.id;
      return;
    }

    },
  watch: {
    realEstateForm: {
      deep: true,
      handler: function(newVal, oldVal) {
        this.FilterRealEstates();
      }
    },
    plansForm: {
      deep: true,
      handler: function(newVal, oldVal) {
        this.FilterPlans();
      }
    },
    realEstateDevForm: {
      deep: true,
      handler: function(newVal, oldVal) {
        this.FilterProjects();
      }
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    setTimeout(()=>{
      this.cardCanRevert();
    },200);

  },
  updated() {
    $(function() {
      /*----- Start Office Show Page -----*/

      //For the first text Areas of specialization
      if ($("#work_in_city").height() > 47) {
        $("#readDiv1").removeClass("d-none");
        $("#work_in_city").addClass("consts");

        $("#showAll").on("click", () => {
          $("#rightSide").innerHeight("auto");
          $("#work_in_city").removeClass("consts");
          $("#work_in_city p").removeClass("text-truncate");
          $("#showAll").addClass("d-none");
          $("#showLess").removeClass("d-none");
        });
        $("#showLess").on("click", () => {
          if ($(window).width() > 991) {
            $("#rightSide").innerHeight($("#leftSide").innerHeight());
          } else {
            $("#rightSide").innerHeight("auto");
          }
          $("#work_in_city").addClass("consts");
          $("#work_in_city p").addClass("text-truncate");
          $("#showAll").removeClass("d-none");
          $("#showLess").addClass("d-none");
          if (!$("#general-info").hasClass("info")) {
            // in info mean height
            $("#rightSide").innerHeight("auto");
         //   console.log("Right side has auto height");
          }
        });
      }
      // This the first section for Read more General Info

      if ($("#general-info").height() > 140) {
        $("#rightSide").innerHeight("auto");
        $("#readDiv2").removeClass("d-none");
        $("#general-info").addClass("info");

        $("#readMore").on("click", () => {
          $("#general-info").removeClass("info haveMore");
          $("#readMore").addClass("d-none");
          $("#readLess").removeClass("d-none");
          $("#rightSide").innerHeight("auto");
        });
        $("#readLess").on("click", () => {
          if ($(window).width() > 991) {
            $("#rightSide").innerHeight($("#leftSide").innerHeight());
          } else {
            $("#rightSide").innerHeight("auto");
          }
          $("#general-info").addClass("info haveMore");
          $("#readMore").removeClass("d-none");
          $("#readLess").addClass("d-none");
          if (!$("#work_in_city").hasClass("consts")) {
            $("#rightSide").innerHeight("auto");
          }
        });
      }

      // Equel the hieght of both sides left and right
      if ($(window).width() > 991) {
        $("#rightSide").innerHeight($("#leftSide").innerHeight());
      } else {
        $("#rightSide").innerHeight("auto");
      }

      $(window).on("resize", function() {
        if ($(window).width() > 991.99) {
          $("#rightSide").innerHeight($("#leftSide").innerHeight());
        } else {
          $("#rightSide").innerHeight("auto");
        }
      });

    });
  }
};
