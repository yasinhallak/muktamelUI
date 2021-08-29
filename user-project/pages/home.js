import arData from "../locales/ar.json";
import {menu as footerMenu} from "../config/footerMenu.json";
import {menu as activityMenu} from "../config/activityMenu.json";
import {menu as cityMenu} from "../config/citiesMenu.json";
import {menuTablet as activityMenuTablet} from "../config/activityMenu.json";
import {clients} from "../config/clientMenu.json";
import staticJson from "../static/json/static.json";
import {
    Hooper,
    Slide as CustomSlide,
    Pagination as HooperPagination,
    Navigation as HooperNavigation
} from "hooper";
import Vue from 'vue'
import {BootstrapVueIcons} from 'bootstrap-vue';
import VueScreen from 'vue-screen';
import checkView from 'vue-check-view'

Vue.use(checkView)
Vue.use(BootstrapVueIcons);
Vue.use(VueScreen);

const dealType = Object.freeze({
    residentialSell: 1,
    residentialRent: 2,
    commercialSell: 3,
    commercialRent: 4,
    forSell: 5,
    forRent: 6,
    auction: 11
});

const rentType = Object.freeze({
    monthly: 1,
    yearly: 2
});

class Form {
    constructor() {
        this.addressId = null;
        this.applyAddressFilter = null;
        this.dealType = dealType.forSell;
        this.rentType = rentType.yearly;
        this.residentialRealstateType = [];
        this.commertialRealstateType = [];
        this.priceFrom = null;
        this.priceTo = null;
        this.roomsCountFrom = null;
        this.roomsCountTo = null;
        this.keyWord = null;
    }
}

export default {
  layout (context) {
    if(process.env.buildState == "cons"){
      return context.route.path == '/home' || context.route.path == '/404' ? 'home-layout' : 'cons-layout' ;
    }
    return "home-layout"
  },
  head() {
    let muktamel = "مكتمل";
    let title = "تطبيق مكتمل للخدمات العقارية";
    let description = "احصل على عقارك المناسب ضمن تطبيق مكتمل" +
      "\n" +
      "شراء عقار , عقار ضمن مشروع , تمويل عقاري , أرض للإستثمار العقاري";
    let imageUrl = "/_nuxt/assets/images/home/header_360-min.jpg";
    return {
      title: title,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: description },
        { name: 'author', content: `${title} - ${muktamel}` },
        { hid: 'robots', name: 'robots', content: 'index,follow' },
        { hid: 'keywords', name: 'keywords', content: '' },
        { name: 'theme-color', content: '#007bff'},
        { name: 'mobile-web-app-capable', content: 'yes' },
        { hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title',content: title },
        { hid: 'og:image', property: 'og:image', content: imageUrl },
        { hid: 'og:image:secure_url', property: 'og:image:secure_url', content: imageUrl },
        { hid: 'og:image:width', property: 'og:image:width', content: '300' },
        { hid: 'og:image:height', property: 'og:image:height', content: '200' },
        { hid: 'og:title', property: 'og:title', content: title },
        { hid: 'og:description', property: 'og:description', content: description },
        { hid: 'og:url', property: 'og:url', content: imageUrl },
        { hid: 'og:site_name', property: 'og:site_name', content: muktamel },
        { hid: 'og:type', property: 'og:type', content: 'product' },
        { name: 'twitter:card', content: title  },
        { name: 'twitter:creator', content: `${title}- ${muktamel}` },
        { name: 'twitter:site', content: muktamel },
        { hid: 'twitter:image:src', name: 'twitter:image:src', content: imageUrl },
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        { hid: 'twitter:description', name: 'twitter:description', content: description },
        { hid: 'twitter:url', name: 'twitter:url', content: imageUrl }
      ]
    }
  },
    data() {
        return {
          showServiceGrid:true,
          showClientSection:false,
          isLoadingOffer:false,
            carouse3DOptions:{
              width:240,
              space:255,
              height:300,
              display:7,
              inverseScaling:-100,
              border:0,
              perspective:0,
              controlsVisible:true,
              dir:"rtl",
              controlsPrevHtml:'<i class="fas fa-chevron-left icon-prev-3d"></i>',
              controlsNextHtml:'<i class="fas fa-chevron-right icon-next-3d"></i>',
              disable3d:false,
              clickable:false
            },
            form: new Form(),
            offers: null,
            collapse1:{
                type:Boolean,
                default:false
            },
            pathname: "real-estates",
            searchBoxAddress: {
                options: [],
                filterdOptions: [],
                svalue: "",
                selected: null
            },
            sampleListRooms: staticJson.moreListRooms,
            sampleListResidence: [
                {
                    value: 1,
                    label: "فيلا"
                },
                {
                    value: 2,
                    label: "دوبلكس"
                },
                {
                    value: 3,
                    label: "بيت شعبي"
                },
                {
                    value: 4,
                    label: "استراحة - شاليه"
                },
                {
                    value: 5,
                    label: "قصر"
                },
                {
                    value: 6,
                    label: "دور مستقل"
                },
                {
                    value: 7,
                    label: "شقة"
                },
                {
                    value: 8,
                    label: "غرفة"
                },
                {
                    value: 9,
                    label: "عمارة"
                },
                {
                    value: 10,
                    label: "مجمع سكني"
                },
                {
                    value: 11,
                    label: "أرض"
                }
            ],
            sampleListCommercial: [
                {
                    value: 1,
                    label: "فيلا"
                },
                {
                    value: 13,
                    label: "مكتب"
                },
                {
                    value: 14,
                    label: "محل"
                },
                {
                    value: 15,
                    label: "صالة عرض"
                },
                {
                    value: 5,
                    label: "قصر"
                },
                {
                    value: 16,
                    label: "مستودع"
                },
                {
                    value: 17,
                    label: "مجمع تجاري"
                },
                {
                    value: 18,
                    label: "فندق"
                },
                {
                    value: 9,
                    label: "عمارة"
                },
                {
                    value: 19,
                    label: "مصنع"
                },
                {
                    value: 11,
                    label: "أرض"
                },
                {
                    value: 12,
                    label: "أرض خام"
                },
                {
                    value: 20,
                    label: "مزرعة"
                }
            ],
            hooperSettingsProps: {
                rtl: true,
                infiniteScroll: true,
                trimWhiteSpace: true,
                wheelControl: false,
                autoPlay: false,
                centerMode: false,
                itemsToSlide: 1,
                itemsToShow: 3,
                breakpoints: {
                    1200: {
                        // 2400px ~
                        itemsToShow: 4
                    },

                    900: {
                        itemsToShow: 3
                    },
                    750: {
                        // 600px ~ 1100px
                        itemsToShow: 2
                    },
                    550: {
                        itemsToShow: 2
                    },
                    400: {
                        itemsToShow: 1
                    },
                    0: {
                        // 0px ~ 600px
                        itemsToShow: 1
                    }
                }
            },
            hooperOffers: {
                rtl: true,
                infiniteScroll: true,
                centerMode: false,
                trimWhiteSpace: true,
                wheelControl: false,
                autoPlay: false,
                itemsToSlide: 1,
                itemsToShow: 3,
                breakpoints: {
                    1140: {
                        // 2400px ~
                        itemsToShow: 3
                    },
                    // 1000: {
                    //     // 2400px ~
                    //     centerMode: false,
                    //     itemsToShow: 2.5
                    // },
                    1110: {
                        itemsToShow: 3
                    },
                    930:{
                      itemsToShow:2.5,
                    },
                    750: {
                      itemsToShow: 2
                    },
                    555:{
                      itemsToShow: 1.5
                    },
                    400:{
                      itemsToShow: 1.5
                    },
                    0: {
                        itemsToShow: 1
                    }
                }
            },
            hooperOurClient: {
                rtl: true,
                infiniteScroll: true,
                centerMode: false,
                trimWhiteSpace: true,
                wheelControl: false,
                autoPlay: false,
                breakpoints: {
                    2000: {
                        // 2400px ~
                        itemsToShow: 5
                    },
                    1100: {
                        itemsToShow: 5
                    },
                    750: {
                        itemsToShow: 4
                    },
                    400: {
                        itemsToShow: 2
                    },
                    350: {
                        itemsToShow: 1
                    },
                    0: {
                        // 0px ~ 600px
                        itemsToShow: 1
                    }
                }
            },
            footerMenu: footerMenu,
            activityMenu: activityMenu,
            cityMenu:cityMenu,
            activeMenuTablet:activityMenuTablet,
            clientMenu:clients,
        };
    },
    components: {
        Hooper,
        CustomSlide,
        HooperNavigation,
        HooperPagination
    },
    methods: {
      onPropertiesSlideEnter(e){
        this.callApi();
      },
      onClientSectionEnter(e){
        this.showClientSection = true;
      },
      goNext3DSlide(){
        let next = document.querySelectorAll("[aria-label='Next slide']")[0];
        next.click();
      },
      goPrev3DSlide(){
        let prev = document.querySelectorAll("[aria-label='Previous slide']")[0];
        prev.click();
      },
        // call api top ten item
        callApi() {
            this.isLoadingOffer = true;
            this.$axios
                .get(`/offer/realestate/Top`)
                .then(respone => {
                    this.offers = respone.data;
                    this.isLoadingOffer = false;
                })
                .catch(function (error) {
                    // console.log(error);
                  this.isLoadingOffer = false;
                    alert("حدث خطأ");
                });
        },

        // filter  addressess    and select 10 items from agencies ,10 items from address
        onSearchAddress(search) {
            // console.log("search:", search);
            this.searchBoxAddress.svalue = search; // for drop list when greater than 2 char
            let locationCount = 0; // count of location  in  list
            this.searchBoxAddress.filterdOptions = this.searchBoxAddress.options.filter(
                s => {
                    if (s.hasOwnProperty("group")) return true;

                    if (locationCount == 10) return false;

                    let isOk = s.name.toLowerCase().includes(search.toLowerCase());

                    if (isOk) locationCount++;

                    return isOk;
                }
            );
        },


        // convert address json to suitable structure
        ConvertAddressJson() {

            // region
            Object.keys(arData.region).forEach(item => {
                let option = {
                    id: item,
                    type: "region",
                    name: this.$t("region." + item),
                    path: ""
                };
                this.searchBoxAddress.options.push(option);
            });
            //city
            Object.keys(arData.city).forEach(item => {
                let option = {
                    id: item,
                    type: "city",
                    name: this.$t("city." + item),
                    path: ` (${this.$t("region." + item.substring(0, 2))}) `
                };
                this.searchBoxAddress.options.push(option);
            });
            //district
            Object.keys(arData.district).forEach(item => {
                if (item != "null" && item != null) {
                    let option = {
                        id: item,
                        type: "district",
                        name: this.$t("district." + item),
                        path: ` (${this.$t("city." + item.substring(0, 4))} , ${this.$t(
                            "region." + item.substring(0, 2)
                        )}) `
                    };
                    this.searchBoxAddress.options.push(option);
                }
            });
        },

        onClickSearch() {
            console.log("this.form:", this.form);
            let url = this.$vRoute.CreateQueryString(this.form);
            // console.log("url:", url);
            this.$router.push(`/${this.pathname}${url}`);
        },
        //Show And hide inputs based on auction type
        hasProp(prop) {

            if (!prop) return false; // prop is null

            let selecteditems = _.union(this.form.residentialRealstateType, this.form.commertialRealstateType);

            let hasProbs = true;
            // check of selelectditems if include any prop
            selecteditems.forEach(item => {
                if (
                    !staticJson.realEstateType
                        .find(e => e.id === item)
                        .prop.includes(prop)
                ) {
                    hasProbs = false;
                }
            });
            return hasProbs;

        },

        confirmEmployee(){
         let query=this.$route.query;
         if(query.empId && query.agencyId)
         {
           this.$axios.post(`/agency/${query.agencyId}/employee/${query.empId}/confirm`)
             .then(respone => {
               if(respone.data.confirm){
                 this.$bvToast.toast("تمت عملية التأكيد بنجاح", {
                   title: "تأكيد",
                   variant: "success",
                   autoHideDelay: 5000,
                   solid: true
                 });
                 return;
               }
               this.$bvToast.toast("يجب عليك إدخال رقم جوال وتأكيده ثم إعادة المحاولة من جديدأ", {
                 title: "تأكيد",
                 variant: "danger",
                 autoHideDelay: 5000,
                 solid: true
               });

             })
             .catch(error=>{

             })
         }



        }
    },
    computed: {
        // select list price according on dealType
        listPrice: function () {
            if (this.form.dealType === dealType.forSell)
                return staticJson.listPriceSell;
            if (this.form.dealType === dealType.forRent) {
                if (this.form.rentType === rentType.monthly)
                    return staticJson.listPriceRentMonthly;
                if (this.form.rentType === rentType.yearly)
                    return staticJson.listPriceRentYearly;
            }
        },
        // set  extenstion suitable  according on dealType and rentType
        hasExtPrice: function () {
            if (this.form.dealType === dealType.forSell) return "ريال ";
            if (this.form.dealType === dealType.forRent)
                if (this.form.rentType === rentType.monthly) return "ريال/شهري";
            if (this.form.rentType === rentType.yearly) return "ريال/سنوي";
        }
    },
    watch: {
        "searchBoxAddress.selected": function (newOptions) {
            if (!newOptions) {
                this.form.addressId = null;
                return;
            }
            this.form.addressId = newOptions.id

        }
    },
    created() {

      // this.callApi();
        this.ConvertAddressJson();
    },
  mounted() {
      // this.$nextTick(()=>{
      //     let c1 = $("#collapse-1")[0];
      // });
    this.showServiceGrid = false;

      // $( ".collapse-button1" ).click(function() {
      //       $( "#collapse-1" ).toggle(400, function() {
      //
      //       });
      //   });
      //
      // $( ".collapse-button2" ).click(function() {
      //       $( "#collapse-2" ).toggle(400, function() {
      //
      //       });
      //   });

       this.confirmEmployee();
    },
    updated() {
        // let filterEl = this.$refs["filter-box-ref"];
        // let collapseEl = this.$refs["collapse-1"];
        // if(filterEl && collapseEl){
        //   console.log('t')
        //   window.onload = ()=>{
        //     collapseEl.style.width = filterEl.clientWidth;
        //     console.log('tt')
        //   }
        // }
    }
};
