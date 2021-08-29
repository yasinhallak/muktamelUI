import InfiniteLoading from "vue-infinite-loading";

class Form{
  constructor(){
    this.offerType=null,
    this.photographerId=null,
    this.isOnMuktamel=null,
    this.sortColumn=null,
    this.sortDirection=null

  }
}

export default {
  name: "virtual-tour",

  async asyncData({redirect,$axios,params}) {
    try {
      let resFilter = await $axios
        .post(`/offer/virtual-tour/filter?PageNumber=1&PageSize=15`,
          new Form());

      let resPhoto = await $axios
        .post(`/agency/filter`, {
          Type: 5, // 5 photographer
          Address: {
            Region: 0,
            City: 0,
            District: 0
          },
          Name: null
        });

      return{
        hasMorePages : true,
        virtualTourList :resFilter.data.page,
        totalCount : resFilter.data.totalCount,
        photographersList : resPhoto.data.page,
      }
    }catch (e) {
      redirect('/404')
    }

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
  components: {
    InfiniteLoading
  },
  props: [],
  data() {
    return {
      agencyType: [1, 2, 15],
      virtualTourList: [],
      photographersList: [],
      vtSort: [1, 2, 3],
      form :new Form(),
      pageNumber: 1,
      pageSize: 15,
      hasMorePages: true,
      totalCount: 0
    };
  },
  computed: {},
  mounted() {
     // this.filterVTShow();
    // this.getPhotographers();
  },
  methods: {
    getPhotographers() {
      this.$axios
        .post(`/agency/filter`, {
          Type: 5, // 5 photographer
          Address: {
            Region: 0,
            City: 0,
            District: 0
          },
          Name: null
        })
        .then(response => {
          this.photographersList = response.data.page;
          //console.log(this.photographersList);
        })
        .catch(function (error) {
          console.log(error);
          alert("حدث خطأ");
        });
    },
    sortSelect(item) {
      this.pageNumber = 1;
      if (item.target.value == 1) {
        this.sortColumn = 1;
        this.sortDirection = 1;
        this.filterVTShow();
      }
      if (item.target.value == 2) {
        this.sortColumn = 1;
        this.sortDirection = 2;
        this.filterVTShow();
      }
      if (item.target.value == 3) {
        this.sortColumn = 2;
        this.sortDirection = 1;
        this.filterVTShow();
      }
    },
    filterVTShow() {
     this.hasMorePages= true
      this.$axios
        .post(`/offer/virtual-tour/filter?PageNumber=${this.pageNumber}&PageSize=${this.pageSize}`,
          this.form)
        .then(response => {
          this.virtualTourList = response.data.page;
          this.totalCount = response.data.totalCount;
          //console.log( "filterVTShow",this.virtualTourList);
        })
        .catch(function (error) {
          console.log(error);
          alert("حدث خطأ");
        });
    },
    nextPage($state) {
      //console.log("test")
      this.pageNumber += 1;
      this.$axios
        .post(`/offer/virtual-tour/filter?PageNumber=${this.pageNumber}&PageSize=${this.pageSize}`, this.form)
        .then(response => {
          //console.log("nextPage:",response.data.page);
          this.virtualTourList = this.virtualTourList.concat(response.data.page);
          //console.log("nextPage1:",this.virtualTourList);
          this.hasMorePages = this.virtualTourList.length < this.totalCount ;
          //console.log("this.hasMorePages:",this.hasMorePages);
          $state.loaded();
        })
        .catch(function (error) {
          console.log(error);
          alert("حدث خطأ");
        });
    },
    resetForm(){
      this.form=new Form();
    }
  },
  watch:{
    form:{
      deep: true,
      handler() {
        this.pageNumber=1;
        this.filterVTShow()
      }
    }
  }
};
