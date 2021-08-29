import InfiniteLoading from "vue-infinite-loading";
import DecorFilter from "../../components/decor-filter/index"


export default {
  name: "decor",
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
    InfiniteLoading,
    DecorFilter,
  },
  props: [],
  data() {
    return {
      isVisibleSidebar:false,
      itemDetail:{},
      isActiveDetail:false,
      photoShows: [],
      decorSort: [1, 2, 3],
      primarySpecification: [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      selectedPrimary: 0,
      secondarySpecification: [
        [1, 2, 3],
        [4, 5, 6, 7, 8, 9, 10],
        [11, 12, 13],
        [14, 15],
        [16, 17, 18],
        [19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
        [29, 30, 31, 32, 33, 34],
        [35, 36, 37, 38, 39, 40, 41],
        [42, 43, 44],
        [45, 46, 47, 48, 49, 50, 51]
      ],
      selectedSecondary: 0,
      colors: [{
          id: 0,
          color: "#e5e9ef"
        },
        {
          id: 1,
          color: "#000"
        },
        {
          id: 2,
          color: "#969696"
        },
        {
          id: 3,
          color: "#993300"
        },
        {
          id: 4,
          color: "#ff0000"
        },
        {
          id: 5,
          color: "#ff6600"
        },
        {
          id: 6,
          color: "#ff00ff"
        },
        {
          id: 7,
          color: "#ffabec"
        },
        {
          id: 8,
          color: "#00ff00"
        },
        {
          id: 9,
          color: "#0000ff"
        },
        {
          id: 10,
          color: "#851ff8"
        },
        {
          id: 11,
          color: "#00ccff"
        },
        {
          id: 12,
          color: "#ffcc00"
        },
        {
          id: 13,
          color: "#ffff00"
        },
        {
          id: 14,
          color: "#fff"
        }
      ],
      selectedColor: 0,
      IsOnMuktamel: false,
      // for sorting and pagination
      sortColumn: 1,
      sortDirection: 1,
      pageNumber: 1,
      pageSize: 9,
      hasMorePages: true,
      lightBoxImgSrc:null,
    };
  },
  async asyncData({redirect,$axios,params}) {
    try {
     let res = await $axios
        .post(
          `/admin/decor/filterSections?PageNumber=1&PageSize=9`,
          {
            PrimaryTypes: [],
            SecandaryTypes: [],
            Colors: [],
            IsOnMuktamel: null,
            SortColumn: 1,
            SortDirection: 1
          }
        );

     //check next page
      let hasMore = false;
      if(res.data.length == 9){
        let resCheck = await $axios
          .post(
            `/admin/decor/filterSections?PageNumber=2&PageSize=9`, {
              PrimaryTypes: [],
              SecandaryTypes: [],
              Colors: [],
              IsOnMuktamel: null,
              SortColumn: 1,
              SortDirection: 1
            }
          );
        hasMore = resCheck.data.length > 0;
      }

     return{
       hasMorePages : hasMore,
       photoShows : res.data
     }
    }catch (e) {
      console.log(e);
      redirect('/404')
    }

  },
  methods: {
    whatsShare(){
      return `https://api.whatsapp.com/send?text=${process.env.imgUrl+'/DecorImages/'+this.itemDetail.fileId+'-sd.jpg'}`
    },
    twitterShare(){
      return `https://twitter.com/intent/tweet?text=${process.env.imgUrl+'/DecorImages/'+this.itemDetail.fileId+'-sd.jpg'}`
    },
    shareFacebook(){
      return `https://www.facebook.com/sharer/sharer.php?u=${process.env.imgUrl+'/DecorImages/'+this.itemDetail.fileId+'-sd.jpg'}`
    },
    onSlideStart(slideIndex){
      this.itemDetail = this.photoShows[slideIndex];
    },
    async showDetail(item,index){
      // item.agencyName = "شركة تجربة";
      // item.description = "شرطة شرطة شرطة شرطة شرطة شرطة شرطة شرطة شرطة شرطة شرطة شرطة شرطة شرطة شرطة شرطة شرطة شرطة شرطة شرطة شرطة ";
      // item.offerTitle = "عنوان تجربة"
      // item.offerID = 88;
      // item.agencyID = 5;
      this.itemDetail = item;
      await this.$refs.detailSlider.setSlide(index);
      this.isActiveDetail = true;
    },
    async FilterPhotoShow() {
      try{
        let response = await this.$axios
          .post(
            `/admin/decor/filterSections?PageNumber=${this.pageNumber}&PageSize=${this.pageSize}`,
            {
              PrimaryTypes: this.selectedPrimary != 0 ? [this.selectedPrimary] : [],
              SecandaryTypes: this.selectedSecondary != 0 ? [this.selectedSecondary] : [],
              Colors: this.selectedColor != 0 ? [this.selectedColor] : [],
              IsOnMuktamel: this.IsOnMuktamel != false ? this.IsOnMuktamel : null,
              SortColumn: this.sortColumn,
              SortDirection: this.sortDirection
            }
          );
        this.photoShows = response.data;
        //check next page
        if(response.data.length == this.pageSize){
          let result = await this.checkNextPage();
          this.hasMorePages = result;
        }
      }catch (e) {
        console.log(e);
        alert("حدث خطأ");
      }
    },

    async checkNextPage(){
      this.pageNumber += 1;
      try{
       let res = await this.$axios
          .post(
            `/admin/decor/filterSections?PageNumber=${this.pageNumber}&PageSize=${this.pageSize}`, {
              PrimaryTypes: this.selectedPrimary != 0 ? [this.selectedPrimary] : [],
              SecandaryTypes: this.selectedSecondary != 0 ? [this.selectedSecondary] : [],
              Colors: this.selectedColor != 0 ? [this.selectedColor] : [],
              IsOnMuktamel: this.IsOnMuktamel != false ? this.IsOnMuktamel : null,
              SortColumn: this.sortColumn,
              SortDirection: this.sortDirection
            }
          );


       return res.data.length > 0;
      }catch (e) {
        console.log(e);
        alert("خطا")
      }
    },

    nextPage($state) {
      this.pageNumber += 1;
      this.$axios
        .post(
          `/admin/decor/filterSections?PageNumber=${this.pageNumber}&PageSize=${this.pageSize}`, {
            PrimaryTypes: this.selectedPrimary != 0 ? [this.selectedPrimary] : [],
            SecandaryTypes: this.selectedSecondary != 0 ? [this.selectedSecondary] : [],
            Colors: this.selectedColor != 0 ? [this.selectedColor] : [],
            IsOnMuktamel: this.IsOnMuktamel != false ? this.IsOnMuktamel : null,
            SortColumn: this.sortColumn,
            SortDirection: this.sortDirection
          }
        )
        .then(response => {
          this.photoShows = this.photoShows.concat(response.data);
          this.hasMorePages = response.data.length == this.pageSize;
          $state.loaded();
        })
        .catch(function (error) {
          console.log(error);
          alert("حدث خطأ");
        });
    },
    async reloadData() {
      this.pageNumber = 1;
      await this.FilterPhotoShow();
      // this.hasMorePages = true;
      this.isActiveDetail = false;
      this.isVisibleSidebar = false;
    },

    async resetData() {
      // this.pageNumber = 1;
      await this.resetForm();
      await this.FilterPhotoShow();
      this.isActiveDetail = false;
      this.isVisibleSidebar = false;
    },

    async sortSelect(item) {
      this.pageNumber = 1;
      if (item.target.value == 1) {
        this.sortColumn = 1;
        this.sortDirection = 1;
        this.FilterPhotoShow();
      }
      if (item.target.value == 2) {
        this.sortColumn = 1;
        this.sortDirection = 2;
        this.FilterPhotoShow();
      }
      if (item.target.value == 3) {
        this.sortColumn = 2;
        this.sortDirection = 1;
        await this.FilterPhotoShow();
      }
    },

    async resetForm(){
      this.selectedPrimary = 0;
      this.selectedSecondary = 0;
      this.selectedColor = 0;
      this.IsOnMuktamel = false;
      this.pageNumber = 1;
    }

  },
  computed: {},
  mounted() {
    // this.FilterPhotoShow();
  }
};
