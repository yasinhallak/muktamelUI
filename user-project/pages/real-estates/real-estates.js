/***
 * Created Subhi Al Wattar
 * User: Subhi Al Wattar
 * Date: 7/29/2020
 * Time: 5:01 PM
 ***/

import arData from "../../locales/ar.json";
import staticJson from "../../static/json/static.json";
import Vue from "vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import VueScrollTo from "vue-scrollto"
import {gmapApi} from '~/node_modules/gmap-vue';
import mFooter from "../../layouts/m-footer";
import {mapState} from "vuex";
//import debounce from 'lodash.debounce'

Vue.component("v-select", vSelect);


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
    this.saleType = [1,2];
    this.rentType = rentType.monthly;
    this.residentialRealstateType = [];
    this.commertialRealstateType = [];
    this.featuresRealEstates = null;
    this.agencyId = null;
    this.priceFrom = null;
    this.priceTo = null;
    this.roomsCountFrom = null;
    this.roomsCountTo = null;
    this.bedRoomsCountFrom = null;
    this.bedRoomsCountTo = null;
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
    this.floorsCountFrom = null;
    this.floorsCountTo = null;
    this.shopsCountFrom = null;
    this.shopsCountTo = null;
    this.apartmentsCountFrom = null;
    this.apartmentsCountTo = null;
    this.keyWord = null;
    this.bounds = null;
    this.featuresRealEstates = [];
    this.isFavorite = null;
    this.hasVirtualTour = null;
    this.sortColumn = null;
    this.sortDirection = null;

    this.LoadRegionStatistic = true;
    this.LoadMapData = true;
    this.LoadMapAreaStatistics = true;
  }

  ClearMoreSection() {
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
    this.floorsCountFrom = null;
    this.floorsCountTo = null;
    this.shopsCountFrom = null;
    this.shopsCountTo = null;
    this.apartmentsCountFrom = null;
    this.apartmentsCountTo = null;
    this.featuresRealEstates = [];
    this.keyWord = null;
    this.hasVirtualTour = null;
    this.agencyId = null;
  }

  asQueryString(){
    let replacer = (key, value)=>{
      if (value === null) {
        return undefined;
      }
      return value;
    };

    return JSON.stringify(this,replacer);
  }

  parseQueryString(queryString){
    if(queryString){
      Object.assign(this, JSON.parse(queryString))
    }
  }
}

const SortColumn = Object.freeze({
  price: 1,
  date: 2
});

const SortDirection = Object.freeze({
  Asc: 1,
  Desc: 2
});

const typeStatitics = Object.freeze({
  "1": "realEstateType",
  "2": "region",
  "3": "city",
  "4": "district"
});

const pageSize = 4;

export default {
  layout: 'no-footer',
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
    mFooter,
    VueScrollTo,
  },
  name: "realestates",

  data() {
    return {
      dealType,
      form: new Form(),
      searchKeyword: null,
      realestates: null,
      currentPage: 1,
      spinner: false,
      noContent: false,
      SortType: {
        [dealType.forSell]:[{sortCol:2,sortDir:2},{sortCol:1,sortDir:1},{sortCol:1,sortDir:2}],
        [dealType.forRent]:[{sortCol:2,sortDir:2},{sortCol:1,sortDir:1},{sortCol:1,sortDir:2}],
        [dealType.auction]:[{sortCol:2,sortDir:2},{sortCol:4,sortDir:2}]
      },
      sortSelected: {
        sortCol:null,
        sortDir:null
      },

      searchBoxAddress: {
        options: [],
        filterdOptions: [],
        svalue: "",
        selected: null
      },
      // agencies
      searchBoxAgency: {
        options: [],
        filterdOptions: [],
        svalue: "",
        selected: []
      },
      sampleListRooms: staticJson.moreListRooms,
      sampleListResidence: staticJson.realEstateType.filter(o => o.is_residential).map(o => {return{value:o.id, label:o.name}}),
      sampleListCommercial: staticJson.realEstateType.filter(o => o.is_commercial).map(o => {return{value:o.id, label:o.name}}),
      filterResultsSampleData: [],
      // More
      roomsList: staticJson.roomsList,
      areaList: staticJson.areaList,
      streetList: staticJson.streetList,
      ageList: staticJson.building_age,
      building_finishList: staticJson.building_finish,

      // Results Number On Mobile view
      resultsVisible: false,

      // Map
      map: {
        zoom: 5,
        zoomDelay: false,
        initPosition: {
          lat: null,
          lng: null
        },

        position: {
          lat: null,
          lng: null
        },
        bounds: [],
        options: {

          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: false,

          scaleControl: true,
          minZoom: 5,
          draggable: true,
          draggableCursor: null,
          disableDefaultUI: true,
          styles: [
            {
              featureType: 'poi',
              stylers: [{visibility: 'off'}]
            }
          ],
        },
        polygon: {
          options: {
            strokeColor: "#00F",
            strokeWeight: 2,
            fillOpacity: 0.2,
            clickable: true
          },
        },
        singlePolygon: {
          options: {
            strokeColor: "#00F",
            strokeWeight: 2,
            fillOpacity: 0.2,
            clickable: false
          },
          isShown: false
        },
        info: {
          Options: {
            pixelOffset: {
              width: 0,
              height: -5
            }
          }
        },
        markers: {
          blueCircle: {
            path: "M-10,0a10,10 0 1,0 20,0a10,10 0 1,0 -20,0",
            fillColor: "#1d96fd",
            fillOpacity: 1,
            scale: 1,
            strokeColor: "white",
            strokeWeight: 3
          },
          redCircle: {
            path: "M-10,0a10,10 0 1,0 20,0a10,10 0 1,0 -20,0",
            fillColor: "#D92227",
            fillOpacity: 1,
            scale: 1,
            strokeColor: "white",
            strokeWeight: 3
          },
          greenCircle: {
            path: "M-10,0a10,10 0 1,0 20,0a10,10 0 1,0 -20,0",
            fillColor: "#10BA19",
            fillOpacity: 1,
            scale: 1,
            strokeColor: "white",
            strokeWeight: 3
          },
          grayCircle: {
            path: "M-10,0a10,10 0 1,0 20,0a10,10 0 1,0 -20,0",
            fillColor: "#666",
            fillOpacity: 1,
            scale: 1,
            strokeColor: "white",
            strokeWeight: 3
          },
        },
        extra: {
          schools: {
            isShown: false,
            markers: []
          },
          hospitals: {
            isShown: false,
            markers: []
          },
          mosques: {
            isShown: false,
            markers: []
          },
        }
      },
      polygons: [],
      drawingMode:false,
      freeHandPolygon:null,
      regionsCenters:staticJson.regionCenterLocations,
      regionsCounts: [],

      selectedOfferId: null,
      selectedSchoolId: null,
      selectedHospitalId: null,
      selectedMosqueId: null,

      toggleMap: false,
      resizeMap: false,
      comparedArray:{
        offers:[],
        mosques:[],
        hospitals: [],
        schools:[]
      }
    };
  },

  methods: {

    getAddressName: function(addressId){
      if(!addressId) return '';
      let idLength = addressId.toString().length;
      let addressType;
      switch (idLength) {
        case 2:
          addressType ='region';
          break;
        case 4:
          addressType ='city';
          break;
        case 7:
          addressType ='district';
          break;
        default:
          return '';
      }
      return this.$t(`${addressType}.${addressId}`);
    },

    // call api filter
    FilterRealEstate: _.debounce(function () {
      this.spinner = true;
      this.$axios
        .post(
          `/offer/realestate/filter?PageNumber=${this.currentPage}&PageSize=${pageSize}`,
          this.form
        )
        .then(response => {
          this.resultsVisible = true
          setTimeout(() => (this.resultsVisible = false), 3000);

          //console.log("respone:", response.data);
          this.realestates = response.data;
          if (this.realestates.data.regionStatistics.some(e => e.type == 2)) {
            this.regionsCounts = this.realestates.data.regionStatistics;
          }
          this.spinner = false;
          this.mapListTonavStatitics();
          if (this.realestates.totalCount == 0) this.noContent = true;
        })
        .catch(function (error) {
          console.log(error);
          alert("حدث خطأ");
        });
    }, 800, {leading: false, trailing: true}),

    // parse query query string and assign it to form
    setQuerySelectedInDom() {
      // set selected inputs
      this.sortSelected = {sortCol: this.form.sortColumn,sortDir:this.form.sortDirection };

    },

    // map listStatistics
    mapListTonavStatitics() {
      this.filterResultsSampleData = this.realestates.data.mapAreaStatistics.map(
        obj => ({
          id: obj.id,
          label: this.$t(`${typeStatitics[obj.type]}.${obj.id}`),
          value: obj.count,
          type: obj.type
        })
      );
    },

    // convert address json to suitable structure
    // TODO: move to store
    ConvertAddressJson() {
      // let optionLocationName = {
      //   group: "اسماء المناطق",
      //   name: null
      // };
      // this.searchBoxAddress.options.push(optionLocationName);
      // region
      Object.keys(arData.region).forEach(item => {
        let option = {
          id: Number(item),
          type: "region",
          name: this.$t("region." + item),
          path: ""
        };
        this.searchBoxAddress.options.push(option);
      });
      //city
      Object.keys(arData.city).forEach(item => {
        let option = {
          id: Number(item),
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
            id: Number(item),
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

    // filter addresses and select 10 items from agencies ,10 items from address
    onSearchAddress(search) {
      //console.log("search:", search);
      this.searchBoxAddress.svalue = search; // for drop list when greater than 2 char
      let locationCount = 0; // count of location  in  list
      this.searchBoxAddress.filterdOptions = this.searchBoxAddress.options.filter(
        s => {
          if (s.hasOwnProperty("group")) return true;

          if (locationCount === 25) return false;

          let isOk = s.name.toLowerCase().includes(search.toLowerCase());

          if (isOk) locationCount++;

          return isOk;
        }
      );
    },

    // filter agencies and select 10 items from agencies ,10 items from agencies
    onSearchAgency(search) {
      //console.log("search:", search);
      this.searchBoxAgency.svalue = search; // for drop list when greater than 2 char
      let agenciesCount = 0; // count of location  in  list

      this.searchBoxAgency.filterdOptions = this.searchBoxAgency.options.filter(
        s => {
          if (s.hasOwnProperty("group")) return true;

          if (agenciesCount == 10) return false;

          let isOk = s.name.toLowerCase().includes(search.toLowerCase());

          if (isOk) agenciesCount++;

          return isOk;
        }
      );
    },

    // on click nav filter
    onClickStatistic(items) {
      //console.log("arrayObj",items)
      let isTypes = this.isMultiSelect;
      if(isTypes){
        items.forEach(item=>{
          let isItemBelongsInResidential =this.sampleListResidence.find(op=>op.value===item);
          let isItemSelectedInResidential =this.form.residentialRealstateType.includes(item);
          let isItemBelongsInCommercial =this.sampleListCommercial.find(op=>op.value===item);
          let isItemSelectedInCommercial =this.form.residentialRealstateType.includes(item);

          if(isItemBelongsInResidential && !isItemSelectedInResidential ){
            this.form.residentialRealstateType.push(item);
          }
          if(isItemBelongsInCommercial && !isItemSelectedInCommercial) {
            this.form.commertialRealstateType.push(item);
          }
        });
        let ids = this.filterResultsSampleData.map(op=>op.id);
        let notSelectedNavIds = _.difference(ids, items);

        notSelectedNavIds.forEach(navId=>{

          let indexOfResidentialItem=this.form.residentialRealstateType.indexOf(navId)
          if(indexOfResidentialItem !==-1) {
             this.form.residentialRealstateType.splice(indexOfResidentialItem,1)
          }
          let indexOfCommercialItem=this.form.commertialRealstateType.indexOf(navId)
          if(indexOfCommercialItem!==-1) {
            this.form.commertialRealstateType.splice(indexOfCommercialItem,1);
          }
        })

      }
      else{
        if (items == null) return;
        if(items)
        this.form.addressId = items;

        //let len=items.toString().length ;
        //let type = len===2 ? "region" : len === 4 ? "city" : "district";
        // set select item in search box
        //this.searchBoxAddress.selected = items;
        /*this.searchBoxAddress.selected = [{
          id: items,
          type: type,
          name: this.$t(`${type}.${items}`),
          path: ""
        }];*/
      }
    },

    // on click notify
    onClickNotify(){
      // check if user is logged in
      if(!this.$auth.loggedIn){
        this.$store.commit('updateTitle',"للإستفادة من خدمة إضافة تنبيه يجب عليك  أن تسجل الدخول أولا");
        this.$bvModal.show("login");
        return;
      }

      // check if user selected an address OR Zoomed to a location
      if(this.form.addressId || this.map.zoom >= 10){
        this.$bvModal.show("modal-notify-1");
        return;
      }

      // Message to user "select your interest area"
      this.$bvModal.show("modal-request-address");
    },

    // Sorting
    onChangeSort() {
      if (this.sortSelected == null) return ;
      this.form.sortColumn =this.sortSelected.sortCol;
      this.form.sortDirection =this.sortSelected.sortDir;
    },

    //  select only on option
    onSelectAddress(e) {
      //console.log('onSelectAddress:',e)
      //this.searchBoxAddress.selected = e.slice(-1);
      //if(e.length === 0)
      //  this.map.singlePolygon.isShown = false;

      //if(!Number.isInteger(e)){
      if(Array.isArray(e) && e.length === 0){
        this.form.addressId = null;
      }
    },

    //  select only on option
    onSelectAgency(e) {
      this.searchBoxAgency.selected = e.slice(-1);
    },

    resetForm(){
        this.form=new Form();
        //this.searchBoxAddress.selected = null;
        this.map.zoom=5;
        this.fitBounds();
    },

    onChangePagination(currentPage) {
      let element= document.getElementById("reaEstateContainer")
      VueScrollTo.scrollTo(element,500, {container: '#reaEstateContainer'})
      this.currentPage = currentPage;
      this.FilterRealEstate();
    },
    //Show And hide inputs based on auction type
    hasProp(prop) {

      if (!prop) return false;

      let selectedItems = _.union(this.form.residentialRealstateType,this.form.commertialRealstateType)

      // check if any of selectedTypes does not includes the prop
      let allTypesHasTheProp = selectedItems.every(item => {
        return staticJson.realEstateType.find(e => e.id === item).prop.includes(prop);
      });

      return allTypesHasTheProp;
    },
    // search by keyword
    ClickSearchKeyWord() {
      this.form.keyWord = this.searchKeyword;
    },
    onClose() {
      this.$root.$emit('bv::hide::popover', 'seeMoreButton')
    },
    // --------- Map ----------------

    // free draw mode
    // convert google map polygon ring to muktamel polygon
    freeDrawApplied(e){
      this.drawingMode = false;
      let rings = [];
      e.forEach(r => {
        let path = [];
        r.getPath().forEach(p=>{
          path.push({lat:p.lat(),lng:p.lng()});
        })
        rings.push(path);
      });
      this.freeHandPolygon = {
        id:12122,
        addressPolygon:rings
      };
      this.map.singlePolygon.isShown = true;
    },
    // reset map config
    freeDrawCancel(e){
      this.drawingMode = false;
      this.freeHandPolygon = null;
      this.map.singlePolygon.isShown = false;
    },

    // format offer price to display on map
    priceLabel(price) {
      if (!price) return '';
      if (price < 0) return '';
      if (price < 1000) {
        price = price.toFixed(0);
        return `${price} ريال`;
      }
      if (price < 1000000) {
        price = price / 1000;
        price = price.toString().slice(0, 5);
        return `${price} ألف`;
      }

      price = price / 1000000;
      price = price.toString().slice(0, 4);
      return `${price} مليون`;
    },

    // return offer count in specified region
    polygonCount(id) {
      let item = this.regionsCounts.find(p => p.id === id);
      if (!item)
        return 0;
      return item.count;
    },

    // zoomChanged, cancelZoomDelay methods used for hiding polygons while zooming
    zoomChanged(){
      this.map.zoomDelay = true;
      this.cancelZoomDelay();
    },
    cancelZoomDelay: _.debounce(function () {
      this.map.zoomDelay = false;
    }, 500, {leading: false, trailing: true}),

    // cancel selected polygon if selected
    // enter drawing mode
    updatePolygonState() {
      // if there is a polygon on screen => clear search and polygon
      if (this.map.singlePolygon.isShown) {
        this.map.singlePolygon.isShown = false;
        this.freeHandPolygon = null;
        this.form.addressId = null;
        //this.searchBoxAddress.selected = null;
        return;
      }
      // Enter edit mode
      this.drawingMode = true;
    },

    // map fit bounds to selected polygon
    fitBounds() {
      if (!this.form.addressId) return;
      if (!this.google) return;
      let map = this.$refs.mmap;
      if (!map) return;
      let address = this.polygons.find(p => p.id == this.form.addressId);
      if (!address) return;

      // Calculate Bounds
      let bounds = new this.google.maps.LatLngBounds();
      address.addressPolygon.forEach(ring => ring.forEach(location => bounds.extend(location)));

      // Set bounds
      // map.fitBounds(bounds);

      // using delay trying to ride over pixelate polygon issue (drawing polygon while zooming)
      setTimeout(() => {
        map.fitBounds(bounds);

        // triggering resize event trying to ride over pixelate polygon issue (drawing polygon while zooming)
        setTimeout(() => {
          map.$mapObject.setZoom(map.$mapObject.getZoom());
          google.maps.event.trigger(map.$mapObject,'resize');
        }, 100);
      }, 100);
    },
    // on polygon clicked
    polygonClicked(addressId) {
      this.form.addressId = addressId;
    },
    // check if a location in selected polygon
    inSelectedPolygon(location)  {
      let selectedPolygon = this.selectedPolygon;
      if (!selectedPolygon) {
        return false;
      }
      if (!location) {
        return false;
      }

      let x = location.lat;
      let y = location.lng;

      let inside = false;
      // each polygon contains multiple ring
      selectedPolygon.addressPolygon.forEach(ring=>{
        if(!inside){
          inside = this.inPolygon(ring,x,y);
        }
      });
      return inside;
    },

    // check if point inside a polygon ring
    inPolygon(vs,x,y){
      // ray-casting algorithm based on
      // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html

      let inside = false;
      for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        //console.log('vs[i]',vs[i]);
        let xi = vs[i].lat;// || vs[i].lat()
        let yi = vs[i].lng;// || vs[i].lng();
        let xj = vs[j].lat;// || vs[j].lat()
        let yj = vs[j].lng;// || vs[j].lng();

        let intersect = ((yi > y) != (yj > y)) &&
          (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }
      return inside;
    },

    // returns offer icon based on its location[in,out the polygon] and state[sale,rent]
    getOfferIconClass(offer) {
      let selectedPolygon = this.selectedPolygon;
      // if project outside the selected polygon
      if (selectedPolygon && !this.inSelectedPolygon(offer.location)) {
        return 'background-gray';
        //return this.map.markers.grayCircle;
      }
      if (offer.dealType === dealType.auction) {
        return 'background-green';
        //return this.map.markers.greenCircle;
      }
      if (offer.dealType === dealType.forSell ||
        offer.dealType === dealType.commercialSell ||
        offer.dealType === dealType.residentialSell) {
        return 'background-red';
        //return this.map.markers.redCircle;
      }

      // for sale
      return 'background-blue';
      //return this.map.markers.blueCircle;
    },

    // Load all regions [from api]
    loadRegions() {
      this.$axios.get(`/address/region`)
        .then(
          response => {
            //console.log('loadRegions:', response);
            response.data.data.forEach(p => {
              if (!this.polygons.find(localP => localP.id == p.id))
                p.addressPolygon = this.formatPolygon(p.addressPolygon);
                this.polygons.push(p);
            });
          }
        ).catch(function (error) {
          console.log(error);
          alert('حدث خطأ')
        })
    },

    // load address polygon by its id [from api]
    loadPolygon(addressId) {
      if(!Number.isInteger(addressId)) return;
      this.$axios.get(`/address/${addressId}`)
        .then(
          response => {
            //debugger
            //console.log(response);
            if (!this.polygons.find(localP => localP.id == addressId)) {
              this.polygons.push({
                id: addressId,
                addressPolygon: this.formatPolygon(response.data.data[0].polygon)
              });
            }
            //console.log('polygons after push:', this.polygons);
            this.fitBounds();
          }
        ).catch(function (error) {
          console.log(error);
          //alert('حدث خطأ')
        })
    },

    // load schools
    loadSchools: _.debounce(function () {
      this.$axios.post(`/offer/school/filter`, {
          bounds: this.map.bounds
        })
        .then(
          response => {
            this.map.extra.schools.markers = response.data;
          }
        ).catch(function (error) {
          console.log(error);
          alert('حدث خطأ')
        })
    }, 800, {leading: false, trailing: true}),
    changeSchoolsState() {
      this.map.extra.schools.isShown = !this.map.extra.schools.isShown;
      if (this.map.extra.schools.isShown) {
        this.loadSchools();
      }
    },

    // load hospitals
    loadHospitals: _.debounce(function () {
      this.$axios.post(`/offer/hospital/filter`, {
          bounds: this.map.bounds
        })
        .then(
          response => {
            this.map.extra.hospitals.markers = response.data;
          }
        ).catch(function (error) {
          console.log(error);
          alert('حدث خطأ')
        })
    }, 800, {leading: false, trailing: true}),
    changeHospitalsState() {
      this.map.extra.hospitals.isShown = !this.map.extra.hospitals.isShown;
      if (this.map.extra.hospitals.isShown) {
        this.loadHospitals();
      }
    },

    // load mosques
    loadMosques: _.debounce(function () {
      this.$axios.post(`/mosques/filter`, {
          bounds: this.map.bounds
        })
        .then(
          response => {
            this.map.extra.mosques.markers = response.data;

          }
        ).catch(function (error) {
          console.log(error);
          alert('حدث خطأ')
        })
    }, 800, {leading: false, trailing: true}),
    changeMosquesState() {
      this.map.extra.mosques.isShown = !this.map.extra.mosques.isShown;
      if (this.map.extra.mosques.isShown) {
        this.loadMosques();
      }
    },

    // Format location to match google map structure
    formatLocation(location) {
      return {
        lng: location[1],
        lat: location[0]
      };
    },
    // Format Polygon to match google map structure
    formatPolygon: function (polygon) {
      if (!polygon) return [];
      let newPolygon = [];
      polygon.forEach(ring => {
        let newRing = ring.map(p => this.formatLocation(p));
        newPolygon.push(newRing);
      });
      return newPolygon;
    },
    // Reset selected Items [Offer,school,hospital,mosque]
    resetSelectedElements: function () {
      this.selectedOfferId = null;
      this.selectedSchoolId = null;
      this.selectedHospitalId = null;
      this.selectedMosqueId = null;
    },
    // update map (center,zoom,bounds)
    updateMapData: function () {

      if (!this.$refs.mmap) return;

      this.map.zoom = this.$refs.mmap.$mapObject.getZoom();

      let c = this.$refs.mmap.$mapObject.getCenter();
      if(c){
        this.map.position.lng = c.lng();
        this.map.position.lat = c.lat();
      }

      let b = this.$refs.mmap.$mapObject.getBounds();
      if(b){
        let ne = b.getNorthEast();
        let sw = b.getSouthWest();
        let bounds = [];
        bounds.push(ne.lat());
        bounds.push(sw.lat());
        bounds.push(ne.lng());
        bounds.push(sw.lng());

        this.map.bounds = bounds;
        this.form.bounds = bounds;
      }
    },
  },

  computed: {
    ...mapState('agency', ['AgenciesRealEstate']),
    // ...mapState( cars: state => state.cars.list),
    filteredAgenciesRealEstate: function (){
      if(this.form.dealType === 5 && this.form.saleType.length === 1){
        return this.AgenciesRealEstate.filter(x=>x.type == this.form.saleType[0]);
      }
      else if(this.form.dealType === 11){
        return this.AgenciesRealEstate.filter(x=> x.type == 15 );
      }
      return this.AgenciesRealEstate
    },

    featuresList: function () {
      let resultitems = staticJson.features;

      let selecteditems =  _.union(this.form.residentialRealstateType, this.form.commertialRealstateType);

      selecteditems.forEach(item => {
        let typeFeatures = staticJson.realEstateType.find(e => e.id === item)
          .features;
        resultitems = resultitems.filter(value => typeFeatures.includes(value));
      });
      return resultitems;
    },
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
    hasExtPrice: function () {
      if (this.form.dealType === dealType.forSell) return "ريال ";
      if (this.form.dealType === dealType.forRent)
        if (this.form.rentType === rentType.monthly) return "ريال/شهري";
      if (this.form.rentType === rentType.yearly) return "ريال/سنوي";
    },
    isMultiSelect: function() {
      if(!this.form.addressId) return false;

      return this.form.addressId.toString().length === 7 ;
    },
    // map select dealType to nav filter
    selectedNavFilter:{
      get:function () {
        if(this.isMultiSelect){
          return  _.union(this.form.residentialRealstateType, this.form.commertialRealstateType);
        }
      },
      set:function () {

      }

    },
    selectedOffer: function(){
      if(!this.selectedOfferId)
        return null;
      if(!this.realestates)
        return null;
      return this.realestates.data.mapData.find(r => r.id === this.selectedOfferId);
    },

    // -------------- MAP -----------------
    // all regions polygons
    regionPolygons: function () {
      return this.polygons.filter(p => p.id.toString().length === 2);
    },
    //Show Region Condition
    showRegion() {
      if (!this.form.addressId)
        return this.map.zoom < 9;
      return this.map.zoom < 7;
    },
    //Show map extras[schools,hospital,mosques] condition
    showExtras() {
      return this.map.zoom >= 14;
    },
    //Show map polygon edit condition
    showPolygonEdit() {
      return this.map.zoom >= 10;
    },
    //Selected polygon
    selectedPolygon() {
      // the selected polygon must not be shown if regions are shown
      if (this.showRegion) return null;

      // in case free hand draw
      if(this.freeHandPolygon) {
        return this.freeHandPolygon;
      }

      // If there is no address selected there is no selected polygon
      if (!this.form.addressId) return null;
      let polygon = this.polygons.find(p => p.id == this.form.addressId);
      // in case of polygon not loaded
      if (!polygon) {
        return null;
      }
      return polygon;
    },
    // google maps api
    google: gmapApi,
  },

  watch: {
   'realestates.data.mapData': function(newValue, oldValue){
       let oldDef = _.differenceWith(oldValue, newValue, _.isEqual);
       let newDef = _.differenceWith(newValue, oldValue, _.isEqual);
       if(oldValue && oldValue.length){
         newDef.map(x=>{
           this.comparedArray.offers.push(x)
         })
         _.pullAllWith(this.comparedArray.offers, oldDef, _.isEqual);
       }else{
         this.comparedArray.offers =  newValue;
       }
   },
   'map.extra.mosques.markers': function(newValue, oldValue){
       let oldDef = _.differenceWith(oldValue, newValue, _.isEqual);
       let newDef = _.differenceWith(newValue, oldValue, _.isEqual);
     if(oldValue && oldValue.length){
       newDef.map(x=>{
         this.comparedArray.mosques.push(x)
       })
       _.pullAllWith(this.comparedArray.mosques, oldDef, _.isEqual);
     }else{
       this.comparedArray.mosques =  newValue;
     }
   },
   'map.extra.hospitals.markers': function(newValue, oldValue){
       let oldDef = _.differenceWith(oldValue, newValue, _.isEqual);
       let newDef = _.differenceWith(newValue, oldValue, _.isEqual);
     if(oldValue && oldValue.length){
       newDef.map(x=>{
         this.comparedArray.hospitals.push(x)
       })
       _.pullAllWith(this.comparedArray.hospitals, oldDef, _.isEqual);
     }else{
       this.comparedArray.hospitals =  newValue;
     }
   },
   'map.extra.schools.markers': function(newValue, oldValue){
       let oldDef = _.differenceWith(oldValue, newValue, _.isEqual);
       let newDef = _.differenceWith(newValue, oldValue, _.isEqual);
     if(oldValue && oldValue.length){
       newDef.map(x=>{
         this.comparedArray.schools.push(x)
       })
       _.pullAllWith(this.comparedArray.schools, oldDef, _.isEqual);
     }else{
       this.comparedArray.schools =  newValue;
     }
   },
    "form.addressId": function (newvalue) {


      if(Array.isArray(newvalue)){
        this.form.addressId = null;
        return;
      }

      this.form.addressId = newvalue;

      let polygon = this.polygons.find(p => p.id === this.form.addressId);
      if (!polygon) {
        this.loadPolygon(this.form.addressId)
      }
      this.map.singlePolygon.isShown = true;
      this.fitBounds();
    },
    form: {
      deep: true,
      handler() {

        if(Array.isArray(this.form.agencyId)) this.form.agencyId = null;

        // apply address filter in case of mobile && not in map section
        //this.form.applyAddressFilter = null;
        if (this.$mq === 'mobile' && !this.toggleMap) {
          this.form.bounds = null;
          this.form.applyAddressFilter = true;
        }else{
          this.form.applyAddressFilter = null;
        }

        //return to first page after every action
        this.currentPage=1;

        // load region statistic only in case of regions are viewed
        this.form.LoadRegionStatistic = this.showRegion;

        // load map offers only in case of offers are viewed in the map
        this.form.LoadMapData = !this.showRegion;

        // load statistic data box if the view is not mobile
        this.form.LoadMapAreaStatistics = this.$mq !== 'mobile';

        //call the filter api
        this.FilterRealEstate();

        // if zoom suitable to load extra data
        if (this.showExtras) {
          // load schools
          if (this.map.extra.schools.isShown) {
            this.loadSchools();
          }
          if (this.map.extra.hospitals.isShown) {
            this.loadHospitals();
          }
          if (this.map.extra.mosques.isShown) {
            this.loadMosques();
          }
        }

        this.$router.push({
          path:this.$route.path,
          query: Object.assign({},this.$route.query,{searchQuery:this.form.asQueryString()})
        });

        if(this.form.dealType == dealType.auction && this.form.sortColumn ==1 ){
            this.form.sortColumn=null;
            this.form.sortDirection=null;
        }
        if((this.form.dealType == dealType.forSell || this.form.dealType ==dealType.forRent ) && this.form.sortColumn ==4 ){
          this.form.sortColumn=null;
          this.form.sortDirection=null;
        }
        // let url=  this.$vRoute.CreateQueryString(this.form);
        // this.$router.push(`/real-estates${url}`);
      }
    },
    // have been implemented for async any change in header (realEstate navigation property)
    '$route':{
      deep:true,
      handler(newValue){
        this.form.parseQueryString(newValue.query.searchQuery);
        this.searchKeyword = this.form.keyWord;
        console.log('this.form',this.form)
        this.setQuerySelectedInDom();
      }
    }
  },

  mounted() {
    this.loadRegions();
    this.ConvertAddressJson();
    if(!this.AgenciesRealEstate.length){
      this.$store.dispatch('agency/fetchAgencies_realEstates').catch( (error)=> {
        console.log(error);
      });
    }

    this.form.parseQueryString(this.$route.query.searchQuery);
    this.setQuerySelectedInDom();

    this.$refs.mmap.$mapPromise.then((map) => {

      this.map.initPosition.lat = this.$vConfig.sa_location.lat;
      this.map.initPosition.lng = this.$vConfig.sa_location.lng;

      // if query string contains bounds fit map to that bound
      if(this.form.bounds){
        let mapref = this.$refs.mmap;
        if(!mapref) return;
        mapref.$mapPromise.then((map) => {

          let ne = new this.google.maps.LatLng({lat: this.form.bounds[0], lng: this.form.bounds[2]});
          let sw = new this.google.maps.LatLng({lat: this.form.bounds[1], lng: this.form.bounds[3]});
          let b = new this.google.maps.LatLngBounds(sw,ne)

          this.map.initPosition.lat = b.getCenter().lat();
          this.map.initPosition.lng = b.getCenter().lng();

          map.fitBounds(b);
        })
      }else if(this.form.addressId){
        let polygon = this.polygons.find(p => p.id === this.form.addressId);
        if (!polygon) {
          this.loadPolygon(Number(this.form.addressId))
        }
        this.map.singlePolygon.isShown = true;
        this.fitBounds();
      }
    })

    //this.FilterRealEstate();
  }
};
