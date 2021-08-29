/***
 * Created Yassin Hallak
 * User: Yassin Hallak
 * Date: 7/29/2020
 * Time: 5:01 PM
 ***/
import mFooter from "../../layouts/m-footer";
import arData from "../../locales/ar.json"
import Vue from 'vue'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import VueScrollTo from "vue-scrollto"
import {
  gmapApi
} from '~/node_modules/gmap-vue';



Vue.component('v-select', vSelect);

const SortColumn = Object.freeze({
  date: 1,
  price: 2,
});

const SortDirection = Object.freeze({
  Asc: 1,
  Desc: 2,
});

class Form {
  constructor() {
    this.addressId = null;
    this.projectId = null;
    this.agencyId = null;
    this.IsForRent = null;
    this.IsReadyForDelivery = null;
    this.StartYear = null;
    this.EndYear = null;
    this.ResidentialType = null;
    this.CommertialType = null;
    this.sortColumn = null;
    this.sortDirection = null;
    this.Bounds = null
  }

  ClearMoreSection() {
    this.IsForRent = null;
    this.IsReadyForDelivery = null;
    this.StartYear = null;
    this.EndYear = null;
    this.ResidentialType = null;
    this.CommertialType = null;
    this.sortColumn = null;
    this.sortDirection = null;
    this.Bounds = null
  }
  asQueryString(){
    let replacer = (key, value)=>{
      if (value === null) {
        return undefined;
      }
      return value;
    };
    return JSON.stringify(this,replacer)
  }

  parseQueryString(queryString){
    if(queryString){
      Object.assign(this, JSON.parse(queryString))
    }
  }

};

const pageSize = 9;
export default {
  name: "projects",
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
  data() {
    return {

      window22: {
        width: 0,
        height: 0
      },
      regionsCenters: {
        11: {
          lat: 23.35411,
          lng: 45.17795
        },
        12: {
          lat: 21.20834,
          lng: 41.16355
        },
        13: {
          lat: 23.39825,
          lng: 50.12950
        },
        14: {
          lat: 24.49579,
          lng: 39.53917
        },
        15: {
          lat: 25.57550,
          lng: 43.15219
        },
        16: {
          lat: 19.17339,
          lng: 42.93956
        },
        17: {
          lat: 17.21832,
          lng: 42.64565
        },
        18: {
          lat: 28.27001,
          lng: 37.25432
        },
        19: {
          lat: 27.14074,
          lng: 41.49812
        },
        20: {
          lat: 17.92306,
          lng: 47.37701
        },
        21: {
          lat: 29.55386,
          lng: 39.4486
        },
        22: {
          lat: 19.75267,
          lng: 41.40928
        },
        23: {
          lat: 29.50267,
          lng: 42.58148
        }
      },

      map: {
        mode: 'view',
        drawManager: {
          shapes: [],
          rectangleOptions: {
            fillColor: '#777',
            fillOpacity: 0.4,
            strokeWeight: 2,
            strokeColor: '#999',
            draggable: false,
            editable: false,
            clickable: true
          },
          circleOptions: {
            fillColor: '#777',
            fillOpacity: 0.4,
            strokeWeight: 2,
            strokeColor: '#999',
            draggable: false,
            editable: false,
            clickable: true
          },
          polylineOptions: {
            fillColor: '#777',
            fillOpacity: 0.4,
            strokeWeight: 2,
            strokeColor: '#999',
            draggable: false,
            editable: false,
            clickable: true
          }
        },
        zoom: 5,
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
          // zoomControlOptions: {
          //   position: 6 //google.maps.ControlPosition.LEFT_BOTTOM
          // },
          disableDefaultUI: true,
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

      spinner: false,
      form: new Form(),
      projects: null,
      selectedProjectId: null,
      selectedSchoolId: null,
      selectedHospitalId: null,
      selectedMosqueId: null,

      searchBox: {
        options: [],
        filterdOptions: [],
        svalue: "",
        selected: null,
      },
      sortSelected: {sortCol:null,sortDir:null},
      sortCol:null,
      sortDir:null,
      // RealEstate  List
      realEstateResidentialList: [
        {
          "id": 1,
          "name": "فيلا"
        },
        {
          "id": 2,
          "name": "دوبلكس"
        },
        {
          "id": 7,
          "name": "شقة"
        },
        {
          "id": 11,
          "name": "أرض"
        }
      ],
      realEstateCommercialList: [
        {
          "id": 1,
          "name": "فيلا"
        },
        {
          "id": 13,
          "name": "مكتب"
        },
        {
          "id": 14,
          "name": "محل"
        },
        {
          "id": 15,
          "name": "صالة عرض"
        },
        {
          "id": 16,
          "name": "مستودع"
        },
        {
          "id": 11,
          "name": "أرض"
        }
      ],

      // Results Number On Mobile view
      resultsVisible: true,

      toggleMap: false,

      resizeMap: false,

      seeMore: false,

      currentPage: 1,
    }
  },

  computed: {
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
      if (this.showRegion) return null;
      if (!this.form.addressId) return null;
      let polygon = this.polygons.find(p => p.id == this.form.addressId);
      if (!polygon) {
        //this.loadPolygon(this.form.addressId)
        return null;
      }

      return polygon;
    },

    // google maps api
    google: gmapApi,
  },
  methods: {
    // call filter api
    FilterProjects: _.debounce(function () {

      let payload={...this.form};
      if (payload.StartYear == 0 || payload.EndYear == 0) {
        payload.IsReadyForDelivery = true;
      }
      this.applyAddressFilter = null;
      if (this.$mq === 'mobile' && !this.toggleMap) {
        //this.form.Bounds = this.$vConfig.sa_bounds;
        payload.Bounds = null;
        this.applyAddressFilter = true;
      }
      //console.log("this.form:", this.form);
      this.spinner = true
      this.$axios.post(`/offer/realestatedev/filter?PageNumber=${this.currentPage}&PageSize=${pageSize}`, payload)
        .then(
          response => {
            this.projects = response.data;
            this.resultsVisible = true
            this.spinner = false;
            if (this.projects.totalCount == 0)
            setTimeout(() => this.resultsVisible = false, 2000);
          }
        ).catch(function (error) {
          console.log(error);
          alert('حدث خطأ')
        })

    }, 800, {
      leading: false,
      trailing: true
    }),

    // create url

    // get url
    setQuerySelectedInDom() {
      // set selected inputs
      this.sortSelected = {sortCol: this.form.sortColumn,sortDir:this.form.sortDirection };

      // init selected value to search box according selected address
      let id_Option;
      let type;
      if (this.form.addressId != null) {
        id_Option = this.form.addressId;
        let len = id_Option.toString().length;
        type = len == 2 ? "region" : len == 4 ? "city" : "district"
        console.log("yasin:", id_Option)
        console.log("type:", type)
        this.searchBox.selected = {
          id: id_Option,
          type: `${type}`,
          name: this.$t(`${type}.${id_Option}`),
          path: ''
        }
        return;
      }
    },
    // get all agencies and set in options
    GetAllAgencies() {
      let payload = {
        Types: [this.$AgencyType.estatedev]
      }
      this.$axios.post(`/agency/all`, payload)
        .then(
          response => {
            let items = response.data;
            let OptoinAgencyName = {
              group: "اسماء الشركات",
              name: null
            };
            this.searchBox.options.push(OptoinAgencyName);

            items.forEach(item => {
              let option = {
                id: item.id,
                type: "agency",
                name: item.name,
                path: ''
              };
              this.searchBox.options.push(option);
            });
            if (this.form.agencyId != null) {
              let type = "agency";
              let agencyName = '';
              this.searchBox.options.filter(s => {
                if (s.type === type && s.id === this.form.agencyId)
                  agencyName = s.name;
              });
              this.searchBox.selected = {
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
    // get all Projects and set in options

    GetAllProjects() {
      this.$axios.get(`/offer/realestatedev/listAll`)
        .then(
          response => {
            let items = response.data;
            let optionProjectName = {
              group: "اسماء المشاريع",
              name: null
            };
            this.searchBox.options.push(optionProjectName)
            items.forEach(item => {
              let option = {
                id: item.id,
                type: "project",
                name: item.title,
                path: ''
              };
              this.searchBox.options.push(option);
            });
            if (this.form.projectId != null) {
              let type = "project";
              let projectName = '';
              this.searchBox.options.filter(s => {
                if (s.type === type && s.id === this.form.projectId)
                  projectName = s.name;
              });
              this.searchBox.selected = {
                id: this.form.projectId,
                type: `${type}`,
                name: `${projectName}`,
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
      this.searchBox.options.push(optionLocationName);
      // region
      Object.keys(arData.region).forEach(item => {
        let option = {
          id: item,
          type: "region",
          name: this.$t('region.' + item),
          path: ''
        };
        this.searchBox.options.push(option);
      });
      //city
      Object.keys(arData.city).forEach(item => {
        let option = {
          id: item,
          type: "city",
          name: this.$t('city.' + item),
          path: ` (${this.$t('region.' + item.substring(0, 2))}) `
        };
        this.searchBox.options.push(option);
      });
      //district
      Object.keys(arData.district).forEach(item => {
        if (item != 'null' && item != null) {
          let option = {
            id: item,
            type: "district",
            name: this.$t('district.' + item),
            path: ` (${this.$t('city.' + item.substring(0, 4))} , ${this.$t('region.' + item.substring(0, 2))}) `
          };
          this.searchBox.options.push(option);
        }

      });

    },

     // reset form
    resetForm(){
      this.form=new Form();
      this.searchBox.selected= null;
      this.map.zoom=5;
      this.fitBounds();
    },
    // filter agencies and addressess and projects   and select 10 items from agencies ,10 items from address
    onSearch(search) {
      //console.log("search:", search)
      this.searchBox.svalue = search; // for drop list when greater than 2 char
      let locationCount = 0; // count of location  in  list
      let agenciesCount = 0; // count of agencies in list
      let projectsCount = 0; // count of projects in list

      this.searchBox.filterdOptions = this.searchBox.options.filter(s => {
        if (s.hasOwnProperty('group')) return true;

        if (s.type !== 'agency' && s.type !== "project") {
          if (locationCount === 10) return false;
          let isOk = s.name.toLowerCase().includes(search.toLowerCase());

          if (isOk) locationCount++;

          return isOk;
        }

        if (s.type === 'agency') {
          if (agenciesCount === 10) return false;
          let isOk = s.name.toLowerCase().includes(search.toLowerCase());

          if (isOk) agenciesCount++;

          return isOk;
        }
        if (s.type === 'project') {
          if (projectsCount === 10) return false;
          let isOk = s.name.toLowerCase().includes(search.toLowerCase());

          if (isOk) projectsCount++;

          return isOk;
        }
        return false;
      });
    },

    // onSelect(e) {
    //   //console.log('onSelect:', e);
    //   this.searchBox.selected = e.slice(-1);
    // },

    // Sorting
    onChangeSort() {
      if (this.sortSelected == null) return;
      this.form.sortColumn =this.sortSelected.sortCol;
      this.form.sortDirection =this.sortSelected.sortDir;
    },
    // Pagination
    onChangePagination(currentPage) {
      let element= document.getElementById("projectContainer")
      VueScrollTo.scrollTo(element,500, {container: '#projectContainer'})
      this.currentPage = currentPage;
      //console.log("pagination:", currentPage)
      this.FilterProjects();
    },

    onClose() {
      this.$root.$emit('bv::hide::popover', 'seeMoreButton')
      // this.seeMore = false
      // return this.seeMore
    },

    polygonCount(id) {
      if(! this.projects) return 0;
      let item = this.projects.data.mapAreaStatistics.find(p => p.id === id);
      if (!item)
        return 0;
      return item.count;
    },

    calcCenter(polygon) {
      let x = polygon.map(x => x[0]);
      let y = polygon.map(x => x[1]);
      let cx = (Math.min(...x) + Math.max(...x)) / 2;
      let cy = (Math.min(...y) + Math.max(...y)) / 2;
      return {
        lat: cx,
        lng: cy
      };
    },

    updatePolygonState() {
      // if there is a polygon on screen => clear search and polygon
      if (this.map.singlePolygon.isShown) {
        this.map.singlePolygon.isShown = !this.map.singlePolygon.isShown;
        this.form.addressId = null;
        this.searchBox.selected = null;
        return;
      }
      // Enter edit mode
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
      address.addressPolygon.forEach(ring => ring.forEach(location => bounds.extend(this.formatLocation(location))));

      // Set bounds
      setTimeout(() => {
        map.fitBounds(bounds, 0);
      }, 200);
    },
    // on polygon clicked
    polygonClicked(addressId) {
      let len = addressId.toString().length;
      let type = len === 2 ? "region" : len === 4 ? "city" : "district"
      this.searchBox.selected = {
        id: addressId,
        type: type,
        name: this.$t(`${type}.${addressId}`),
        path: ''
      }
    },
    // check if a location in polygon
    inSelectedPolygon(location) {
      let selectedPolygon = this.selectedPolygon;
      if (!selectedPolygon) {
        return false;
      }
      if (!location) {
        return false;
      }

      // ray-casting algorithm based on
      // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html
      let x = location.lat;
      let y = location.lng;
      let vs = selectedPolygon.addressPolygon[0];

      //console.log('selectedPolygon', selectedPolygon);
      //console.log('vs', vs);

      let inside = false;
      for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        let xi = vs[i][0],
          yi = vs[i][1];
        let xj = vs[j][0],
          yj = vs[j][1];

        let intersect = ((yi > y) != (yj > y)) &&
          (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }

      return inside;
    },
    // returns offer icon based on its location[in,out the polygon] and state[sale,rent]
    getOfferIcon(offer) {
      let selectedPolygon = this.selectedPolygon;
      // if project outside the selected polygon
      if (selectedPolygon && !this.inSelectedPolygon(offer.location)) {
        return this.map.markers.grayCircle;
      }
      if (!offer.realEstatesGroup) {
        return this.map.markers.blueCircle;
      }
      // check if all realestates of polygon is for rent
      let allForRent = offer.realEstatesGroup.every(g => g.dealType === 6);
      if (allForRent)
        return this.map.markers.redCircle;
      // for sale
      return this.map.markers.blueCircle;

      /* Old logic
      let hasSale = offer.realEstatesGroup.find(g => g.dealType == 5) != undefined;
      let hasRent = offer.realEstatesGroup.find(g => g.dealType == 6) != undefined;
      if (hasRent && hasSale)
        return this.map.markers.blueCircle;
      if (hasSale)
        return this.map.markers.blueCircle;
      if (hasRent)
        return this.map.markers.redCircle;

      return this.map.markers.grayCircle;*/
    },
    // Load all regions [from api]
    loadRegions() {
      this.$axios.get(`/address/region`)
        .then(
          response => {
            //console.log(response);
            response.data.data.forEach(p => {
              if (!this.polygons.find(localP => localP.id == p.id))
                this.polygons.push(p)
            });
          }
        ).catch(function (error) {
          console.log(error);
          alert('حدث خطأ')
        })
    },
    // load address polygon by its id [from api]
    loadPolygon(addressId) {
      //debugger
      this.$axios.get(`/address/${addressId}`)
        .then(
          response => {
            //debugger
            //console.log(response);
            if (!this.polygons.find(localP => localP.id == addressId))
              this.polygons.push({
                id: addressId,
                addressPolygon: response.data.data[0].polygon
              });
            //console.log('polygons after push:', this.polygons);
            this.fitBounds();
          }
        ).catch(function (error) {
          console.log(error);
          alert('حدث خطأ')
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
    }, 800, {
      leading: false,
      trailing: true
    }),
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
    }, 800, {
      leading: false,
      trailing: true
    }),
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
    }, 800, {
      leading: false,
      trailing: true
    }),
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
    // Reset selected Items [project,school,hospital,mosque]
    resetSelectedElements: function () {
      this.selectedProjectId = null;
      this.selectedSchoolId = null;
      this.selectedHospitalId = null;
      this.selectedMosqueId = null;
    },
    // update map (center,zoom,bounds)
    updateMapData:function () {
          //console.log('updateMapData')
      if (!this.$refs.mmap) return;

      this.map.zoom = this.$refs.mmap.$mapObject.getZoom();

      let c = this.$refs.mmap.$mapObject.getCenter();
      this.map.position.lng = c.lng()
      this.map.position.lat = c.lat();

      let b = this.$refs.mmap.$mapObject.getBounds();
      let ne = b.getNorthEast();
      let sw = b.getSouthWest();
      let bounds = [];
      bounds.push(ne.lat());
      bounds.push(sw.lat());
      bounds.push(ne.lng());
      bounds.push(sw.lng());

      this.map.bounds = bounds;
      this.form.Bounds = bounds;
    },

    onResize() {
      this.window22.width = window.innerWidth
    },
    // zoomChanged, cancelZoomDelay methods used for hiding polygons while zooming
    zoomChanged(){
      this.map.zoomDelay = true;
      this.cancelZoomDelay();
    },
    cancelZoomDelay: _.debounce(function () {
      this.map.zoomDelay = false;
    }, 200, {leading: false, trailing: true}),

  },
  watch: {
    'searchBox.selected': function (newOptions, oldOptions) {
      if (newOptions === null) {
        this.form.agencyId = null;
        this.form.addressId = null;
        this.form.projectId = null;
        return;
      }
      if(_.isEqual(newOptions ,oldOptions) ){
        return;
      }


      let item = newOptions;
      switch (item.type) {
        case 'agency':
          this.form.agencyId = item.id;
          break;
        case 'project':
          this.form.projectId = item.id;
          break;
        default:
          this.form.addressId = item.id;
          let polygon = this.polygons.find(p => p.id == this.form.addressId);
          if (!polygon) {
            this.loadPolygon(this.form.addressId)
          }
          this.map.singlePolygon.isShown = true;
          this.fitBounds();
      }

    },
    form: {
      deep: true,
      handler() {
          //  return to first page after every action
          this.currentPage=1;
        this.FilterProjects();

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
      }
    },
    // 'map.mode': {
    //   deep: true,
    //   handler: function (newMode, oldMode) {
    //     console.log('map.mode:', newMode, oldMode)
    //     if (newMode === 'view') {
    //       if (oldMode === 'edit') {
    //         this.map.options.draggable = true;
    //         this.map.options.draggableCursor = null;
    //         return;
    //       }
    //     }
    //
    //     if (newMode === 'edit') {
    //       this.map.options.draggable = false;
    //       this.map.options.draggableCursor = 'default';
    //     }
    //   }
    // },
    '$route':{
      deep:true,
      handler(newValue){
        this.form.parseQueryString(newValue.query.searchQuery);
        this.setQuerySelectedInDom();
       // this.GetQueryString();
      }
    }
  },
  created() {
    this.map.initPosition.lat = this.$vConfig.sa_location.lat;
    this.map.initPosition.lng = this.$vConfig.sa_location.lng;
    this.GetAllAgencies();
    this.GetAllProjects();
    this.ConvertAddressJson();

    },

  mounted() {
    this.form.parseQueryString(this.$route.query.searchQuery);
    this.setQuerySelectedInDom();
    //this.GetQueryString();
    //this.FilterProjects();
    this.loadRegions();

    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
      this.window22.width = window.innerWidth
    })


    /*this.$nextTick(function() {
      /!*this.$refs.mmap.$mapPromise.then((map) => {
        map.panTo({lat: 1.38, lng: 103.80})
      })*!/
      this.$refs.mmap.$mapObject.setBounds(this.form.Bounds);
    })*/
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },

}
