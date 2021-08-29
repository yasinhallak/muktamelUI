import axios from "axios";
import VueScrollTo from "vue-scrollto"
const pageSize = 9;

// sorting
const SortColumn = Object.freeze({
  area: 3,
  RoomsCount: 4,
  bathroomsCount: 5,
  showCount: 6
});

const SortDirection = Object.freeze({
  Asc: 1,
  Desc: 2
});

// plans types
const listTypesEnum = Object.freeze({
  Villa: 1,
  Duplex: 2,
  VillaApartment: 3,
  FlatApart: 4,
  ApartFlat: 5,
  ApartApart: 6,
  Flat: 7
});

class Form {
  constructor() {
    this.Types = [];
    this.HasExt = false;
    this.BuildingAreaFrom = null;
    this.BuildingAreaTo = null;
    this.RoomsCountFrom = null;
    this.RoomsCountTo = null;
    this.BathroomsCountFrom = null;
    this.BathroomsCountTo = null;
    this.sortColumn = null;
    this.sortDirection = null;
    this.AgencyName = null;
    this.Land = null;
  }

  ClearMoreSection() {
    this.BuildingAreaFrom = null;
    this.BuildingAreaTo = null;
    this.RoomsCountFrom = null;
    this.RoomsCountTo = null;
    this.BathroomsCountFrom = null;
    this.BathroomsCountTo = null;
    this.AgencyName = null;
  }

  asQueryString(){
    let replacer = (key, value)=>{
      console.log("value",value)
      if (value === null) {
        return undefined;
      }
      if (value === undefined || value.length == 0) {
        return undefined;
      }

      return value;
    };
    return JSON.stringify(this,replacer)
  }

  parseQueryString(queryString){
    if(queryString){
      Object.assign(this,JSON.parse(queryString))
    }
  }
}

export default {
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
  name: "plans",
  props: [],
  data() {
    return {
      listTypes: [],
      listTypesFilter: [],
      form: new Form(),
      streetsLand: [],
      hasExtention: false,
      width: null,
      length: null,
      streetNumber: 0,
      showMore: false,
      plans: [],
      spinner: true,
      toggleView: false,
      navStatitics: [],
      SortType: {
        [this.$AgencyType.engineering]:[{sortCol:3,sortDir:1},
          {sortCol:3,sortDir:2},
          {sortCol:4,sortDir:1},
          {sortCol:5,sortDir:1},
          {sortCol:6,sortDir:1}]
      },
      sortSelected: {
        sortCol:3,
        sortDir:1
      },
      currentPage: 1,
      noContent: false
    };
  },

  methods: {
    checkListChange(ev){
    },
    // call api filter
    callApiFilterPlan:_.debounce(function(){
      // this.form.sortColumn=this.sortSelected.sortCol;
      // this.form.sortDirection=this.sortSelected.sortDir;

      this.spinner = true;
      this.$axios
        .post(
          `/offer/engineering/Filter?PageNumber=${this.currentPage}&PageSize=${pageSize}`,
          this.form
        )
        .then(response => {
          this.plans = response.data;

          this.mapListTonavStatitics();
          this.spinner = false;
        })
        .catch(function (error) {
          // console.log(error);
          alert("حدث خطأ");
        });
    },800, {leading: false, trailing: true}) ,

    // map enum to array
    maplistEnumToArray() {
      for (const key in listTypesEnum) {
        this.listTypes.push({
          label: this.$t(`diagramType.${listTypesEnum[key]}`),
          value: listTypesEnum[key],
          isSelected: false
        });
      }
    },

    mapListTonavStatitics() {
      this.navStatitics = this.plans.data.map(obj => ({
        id: obj.key,
        label: this.$t(`diagramType.${obj.key}`),
        value: obj.value
      }));
    },

    // reset form
    resetForm(){
      this.form=new Form();
    },

    // land info selected
    landInfoChanged(obj) {
      console.log("landInfoChanged:", obj);
      let objectland = {
        Length: obj.land.length,
        Width: obj.land.width,
        Streets: []
      };
      obj.streets.forEach(item => {
        if (item.isLength != null && item.width != null)
          objectland.Streets.push({
            isLength: item.isLength,
            width: item.width,
            direction:item.direction,
            id:item.id,
            realEstateOfferId:item.realEstateOfferId
          });
      });
      // validate
      if ( objectland.Length == 0 ||objectland.Width == 0 || objectland.Streets.length == 0)
      {
        this.form.Land=null;
      }
      else
      {
        this.form.Land = objectland;
      }


      this.currentPage = 1;

      this.callApiFilterPlan();


      this.$router.push({
        path:this.$route.path,
        query: Object.assign({},this.$route.query,{searchQuery:this.form.asQueryString()})
      });
    },

    //on change sort
    onChangeSort() {
      this.form.sortColumn = this.sortSelected.sortCol;
      this.form.sortDirection = this.sortSelected.sortDir;
    },
    // Pagination
    onChangePagination(currentPage) {
      let element= document.getElementById("plansContainer")
      VueScrollTo.scrollTo(element,500)
      this.currentPage = currentPage;
      this.callApiFilterPlan();
    },

    setQuerySelectedInDom() {
      // set data selected to land component
      console.log("this.form",this.form)
      if (this.form.Land !== null && this.form.Land !== undefined) {
        this.streetsLand = this.form.Land.Streets;
        this.width = this.form.Land.Width;
        this.length = this.form.Land.Length;
        this.streetNumber = this.form.Land.Streets.length;
      }
      // sorting
      this.sortSelected = {sortCol: this.form.sortColumn,sortDir:this.form.sortDirection };
    },

    onClose() {
      this.toggleView = false;
    },
  },
  created() {
    this.maplistEnumToArray();
  },
  watch: {
    "form.HasExt": function (val) {
      this.currentPage = 1;
      this.callApiFilterPlan();

      this.$router.push({
        path: this.$route.path,
        query: Object.assign({}, this.$route.query, {searchQuery: this.form.asQueryString()})
      });
    },
    "form.Types": function (val) {
      this.currentPage = 1;
      this.callApiFilterPlan();

      this.$router.push({
        path: this.$route.path,
        query: Object.assign({}, this.$route.query, {searchQuery: this.form.asQueryString()})
      });
    },
    '$route':{
      deep:true,
      handler(newValue){
        this.form.parseQueryString(newValue.query.searchQuery);
        this.setQuerySelectedInDom();
      }
    }
  },

  mounted() {
    this.form.parseQueryString(this.$route.query.searchQuery);
    this.setQuerySelectedInDom();
    console.log("this.streetslans",this.form.Land,this.streetNumber)
    // send streetsland if streetNumber >0
    if(this.streetNumber>0){
      this.$refs.landStreets.fillStreet(this.streetsLand,this.streetNumber)
    }

    this.callApiFilterPlan();
  }
};
