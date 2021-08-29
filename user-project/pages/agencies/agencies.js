   import arData from "../../locales/ar.json"

   import Vue from 'vue'
   import vSelect from 'vue-select'
   import 'vue-select/dist/vue-select.css';
   import VueScrollTo from "vue-scrollto"
   Vue.component('v-select', vSelect);

   const pageSize = 3;

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

   const SortColumn = Object.freeze({
     name: 1,
     offerCount: 2,
     sell:7,
     rent:8,
     commercial:9
   });
   const SortDirection = Object.freeze({
     Asc: 1,
     Desc: 2,
   });

   class Form {
     constructor() {
       this.type = agencyType.realestate;
       this.agencyId = null;
       this.sortColumn = SortColumn.name;
       this.sortDirection = SortDirection.Asc;
       this.address = {
         region: 0,
         city: 0,
         district: 0,
       };
     }

     asQueryString(){
       let replacer = (key, value)=>{
         if (value === null ) {
           return undefined;
         }
         // if(_.isEmpty( value )){
         //   return  undefined;
         // }
         return value;
       };
       return JSON.stringify(this,replacer)
     }

     parseQueryString(queryString){
       // create object with methods
       if(queryString){
         Object.assign(this, JSON.parse(queryString));
       }

     }
   }

   export default {
     name: 'agencies',
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
     components: {
      VueScrollTo
     },
     props: [],
     data() {
       return {
         agencies: null,
         spinner: false,
         noContent: false,
         AgencyType: agencyType,
         form: new Form(),
         selected: null,
         options: [],
         filterdOptions: [],
         svalue: "",
         SortType: {
           [agencyType.realestate]: [SortColumn.name, SortColumn.offerCount,SortColumn.sell,SortColumn.rent,SortColumn.commercial],
           [agencyType.estatedev]: [SortColumn.name, SortColumn.offerCount],
           [agencyType.auction]: [SortColumn.name, SortColumn.offerCount],
           [agencyType.engineering]: [SortColumn.name, SortColumn.offerCount],
           [agencyType.photography]: [SortColumn.name],
           [agencyType.constructor]: [SortColumn.name],
           [agencyType.estimator]: [SortColumn.name],
           [agencyType.service]: [SortColumn.name],
         },

         currentPage: 1
       }
     },
     methods: {
       // call filter api
       FilterAgency() {
        // console.log("this.form:", this.form);

         this.spinner = true
         this.$axios.post(`/agency/Filter?PageNumber=${this.currentPage}&PageSize=${pageSize}`, this.form)
           .then(
             response => {
               console.log("result:", response.data)
               this.agencies = response.data;
               this.spinner = false;
              // console.log("this.agencies", this.agencies);
               if (this.agencies.totalCount === 0)
                 this.noContent = true;
             }
           ).catch(function (error) {
             console.log(error);
             alert('حدث خطأ')
           })
       },
       // get all agencies and set in options
       GetAllAgencies() {
         this.$axios.post(`/agency/all`, {
             Types: []
           })
           .then(
             response => {
               let items = response.data;
               let OptoinAgencyName = {
                 group: "اسماء الشركات",
                 name: null
               };
               this.options.push(OptoinAgencyName)
               items.forEach(item => {
                 let option = {
                   id: item.id,
                   type: "agency",
                   name: item.name,
                   path: ''
                 };
                 this.options.push(option);
               });
               if (this.form.agencyId != null) {
                 let type = "agency";
                 let agencyName = '';
                 this.options.filter(s => {
                   if (s.type === type && s.id === this.form.agencyId)
                     agencyName = s.name;
                 });
                 this.selected = {
                   id: this.form.agencyId,
                   type: `${type}`,
                   name: `${agencyName}`,
                   path: ''
                 }
                 return;
               }
             }
           ).catch(function (error) {
             console.log(error);
             alert('حدث خطأ')
           })
       },
       // convert address json to suitable structure
       ConvertAddressJson() {
         let optionLocationName = {
           group: "اسماء المناطق",
           name: null
         };
         this.options.push(optionLocationName);
         // region
         Object.keys(arData.region).forEach(item => {
           let option = {
             id: item,
             type: "region",
             name: this.$t('region.' + item),
             path: ''
           };
           this.options.push(option);
         });
         //city
         Object.keys(arData.city).forEach(item => {
           let option = {
             id: item,
             type: "city",
             name: this.$t('city.' + item),
             path: ` (${this.$t('region.'+ item.substring(0, 2)) }) `
           };
           this.options.push(option);
         });
         //district
         Object.keys(arData.district).forEach(item => {
           let option = {
             id: item,
             type: "district",
             name: this.$t('district.' + item),
             path: ` (${this.$t('city.'+ item.substring(0, 4)) } , ${this.$t('region.'+ item.substring(0, 2)) }) `
           };
           this.options.push(option);
         });

       },
       // filter agencies and addressess  and select 10 items from agencies ,10 items from address
       onSearch(search) {
        // console.log("search:", search)
         this.svalue = search; // for drop list when greater than 2 char
         let locationCount = 0; // count of location  in  list
         let agenciesCount = 0; // count of agencies in list

         this.filterdOptions = this.options.filter(s => {
           if (s.hasOwnProperty('group')) return true;

           if (s.type !== 'agency') {
             if (locationCount == 10) return false;
             let isOk = s.name.toLowerCase().includes(search.toLowerCase());

             if (isOk) locationCount++;

             return isOk;
           }

           if (s.type === 'agency') {
             if (agenciesCount == 10) return false;
             let isOk = s.name.toLowerCase().includes(search.toLowerCase());

             if (isOk) agenciesCount++;

             return isOk;
           }

           return false;
         });
       },
       // on click nav statistics
       onClickStatistics(addressStatic) {
         console.log("statistic:", addressStatic)
         if (addressStatic.type === "region") {
           this.form.address.region = addressStatic.id;
           this.form.address.city = 0;
         }

         if (addressStatic.type === "city") {
           this.form.address.city = addressStatic.id;
           this.form.address.region = 0;
         }

         // set select item in search box
         this.selected = {
           id: addressStatic.id,
           type: addressStatic.type,
           name: this.$t(`${addressStatic.type}.${addressStatic.id}`),
           path: ''
         }
       },

       // onSelect(e) {
       //   this.selected = e.slice(-1);
       // },
       // Sorting
       onChangeSort() {
         this.form.sortDirection =  this.form.sortColumn == SortColumn.name ? SortDirection.Asc : SortDirection.Desc;
       },
       // Pagination
       onChangePagination(currentPage) {
         let element= document.getElementById("agenciesContainer")
         VueScrollTo.scrollTo(element,500)
         this.currentPage = currentPage;
         this.FilterAgency();
       },

       setQuerySelectedInDom(){
         // set selected inputs
        // this.sortSelected = this.form.sortColumn;
         // init selected value to search box according selected address
         let id_Address;
         let type;
         if (this.form.address.region != 0) {
           id_Address = this.form.address.region;
           type = "region"
         }
         if (this.form.address.city != 0) {
           id_Address = this.form.address.city;
           type = "city"
         }
         if (this.form.address.district != 0) {
           id_Address = this.form.address.district;
           type = "district"
         }
         if (id_Address == null) return;
         this.selected = {
           id: id_Address,
           type: `${type}`,
           name: this.$t(`${type}.${id_Address}`),
           path: ''
         }
       },

       reset(){
        this.form= new Form();
         this.selected=null
       }
     },
     updated() {
       $(document).ready(function () {
         'use strict';
         ///////// show more show less
         $('.more-less').hide();
         if ($('.compact-list').length > 12) {
           $('.compact-list:gt(11)').hide();
           $('.more-less').show();
         }

         $('.more-less').on('click', function () {
           //toggle elements with class .compact-list that their index is bigger than 2
           $('.compact-list:gt(11)').toggle();
           //change text of show more element just for demonstration purposes to this demo
           $(this).html() === '<i class="fas fa-angle-double-up"></i>' ? $(this).html('<i class="fas fa-angle-double-down"></i>') : $(this).html('<i class="fas fa-angle-double-up"></i>');
         });
         ////////////////////// SEARCH INPUT
         $('.input_search_cancel').on('input', (e) => {
           if ($(e.target).val().length > 0) {
             $('.input_search_cancel i').addClass('fa-times-circle').removeClass('fa-search');
           } else {
             $('.input_search_cancel i').removeClass('fa-times-circle').addClass('fa-search');
           }
         })

         $('.input_search_cancel i').on('click', () => {
           $('.input_search_cancel input').val('');
           $('.input_search_cancel i').removeClass('fa-times-circle').addClass('fa-search');
         })

         $('.search-side #prop-name').on('input', (e) => {
           if ($(e.target).val().length > 0) {
             $('.search-side #basic-search i').addClass('fa-times-circle').removeClass('fa-search');
           } else {
             $('.search-side #basic-search i').removeClass('fa-times-circle').addClass('fa-search');
           }
         })

         $('.search-side #basic-search i').on('click', () => {
           $('.search-side #prop-name').val('');
           $('.search-side #basic-search i').removeClass('fa-times-circle').addClass('fa-search');
         })

       });

     },
     watch: {
       selected: function (newOptions, oldOptions) {
         if (!newOptions) {
           this.form.agencyId = null
           this.form.address.region = 0;
           this.form.address.city = 0;
           this.form.address.district = 0;
           return;
         }
         let item = newOptions;
        // console.log("item", item);
         switch (item.type) {
           case 'agency':
             this.form.agencyId = item.id;
             break;
           case 'region':
             this.form.address.region = item.id;
             break;
           case 'city':
             this.form.address.city = item.id;
             break;
           case 'district':
             this.form.address.district = item.id;
             break;
         }

       },
       form: {
         deep: true,
         handler() {
           this.currentPage = 1;
           this.FilterAgency();
           if((this.form.type == agencyType.photography ||
             this.form.type == agencyType.constructor ||
             this.form.type == agencyType.estimator ||
             this.form.type == agencyType.service ) && this.form.sortColumn != SortColumn.name){
             this.form.sortColumn =SortColumn.name;
             this.form.sortDirection =SortDirection.Asc;
           }
           this.$router.push({
             path:this.$route.path,
             query: Object.assign({},this.$route.query,{searchQuery:this.form.asQueryString()})
           });

         }
       },
       '$route':{
         deep:true,
         handler(newRoute){
           if(_.isEqual(newRoute.query.searchQuery,this.form.asQueryString())){
             return;
           }
           this.form.parseQueryString(newRoute.query.searchQuery);
           this.setQuerySelectedInDom();
         }
       }

     },
     created() {
       this.ConvertAddressJson();
       this.GetAllAgencies();
     },
     mounted() {
       console.log("test1234567",this.$route.query.searchQuery)
       this.form.parseQueryString(this.$route.query.searchQuery);
       this.setQuerySelectedInDom();
       if(!this.$route.query.searchQuery){
         this.FilterAgency();
       }
     },
   }
