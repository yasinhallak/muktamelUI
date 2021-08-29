import {
  Hooper,
  Slide as CustomSlide,
  Progress as HooperProgress,
  Pagination as HooperPagination,
  Navigation as HooperNavigation
} from "hooper";
import {
  ValidationObserver,
  ValidationProvider,
  validate
} from "vee-validate/dist/vee-validate.full";

class ProfileForm {
  constructor() {
    this.firstName = null;
    this.lastName = null;
    this.phone = null;
    this.email = null;
    this.cRNo = null;
    this.agencyName = null;
    this.agencyType = 1;
    this.representativeCode = null;
    this.findUsMethod = null;
    this.employeePosition = null;
    this.tradingRecordFile = null;
    this.otherFile = null;
  }
}

export default {
  name: "company-registration",
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
    Hooper,
    CustomSlide,
    HooperNavigation,
    ValidationObserver,
    ValidationProvider,
    validate
  },
  props: [],
  data() {
    return {
      form: new ProfileForm(),
      file1: "",
      file2: "",
      file1Name: null,
      file2Name: null,
      agenciesList: [1, 2, 15, 6, 5, 3, 4, 7, 14],
      findUsMethods: [1, 2, 3, 4],
      descriptionOfRequest: [1, 2, 3, 4],
      inputFileTypeList: [6, 15, 11, 12],
      hasOkButton: true,
      hasCancelButton: true,
      hooperSetting: {
        itemToShow: 6,
        wheelControl: false,
        trimWhiteSpace: true,
        autoPlay: true,
        itemsToSlide: 1,
        breakpoints: {
          1400: {
            // 2400px ~
            itemsToShow: 6
          },
          900: {
            itemsToShow: 3
          },
          600: {
            itemsToShow: 3
          },
          0: {
            // 0px ~ 600px
            itemsToShow: 2
          }
        }
      }
    };
  },
  computed: {
    isComplete() {
      return (
        this.form.cRNo &&
        this.form.agencyName &&
        this.form.agencyType &&
        this.form.firstName &&
        this.form.lastName &&
        this.form.employeePosition &&
        this.file1
      );
    }
  },
  update() {},
  mounted() {
    //this.checkURL();
   // console.log("query",this.$route)
    if (this.$route.hash.startsWith("#login?redirectUrl=agencies-request&&agencyType=1")) {

      let paramVal =parseInt(this.$route.hash.charAt(this.$route.hash.length -1 ))
      if (this.agenciesList.includes(paramVal))
      {
        this.form.agencyType = paramVal;
        this.agencyRequest();
      }
    }
  },
  watch: {

  },
  methods: {
    selectChangeColor(_selectId){
      const _select= this.$refs[_selectId];
      if(_select.value === ''){
        _select.style.color = "#D1D1D1"
      }
      else{
        _select.style.color = "#707070"
      }
    },
    handleFileUpload1(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      var formData = new FormData();
      var files = files[0];
      this.file1Name = files.name;
      formData.append("file", files);
      console.log("formData: ", formData);
      this.$axios
        .post(`/media/upload`, formData)
        .then(response => {
          this.file1 = response.data.id;
          console.log(this.file1);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleFileUpload2(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      var formData = new FormData();
      var files2 = files[0];
      this.file2Name = files2.name;
      formData.append("file", files2);
      console.log("formData: ", formData);
      this.$axios
        .post(`/media/upload`, formData)
        .then(response => {
          this.file2 = response.data.id;
          console.log(this.file1);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submitForm() {
      console.log(this.file1);
      console.log(this.file2);
      this.form.tradingRecordFile = this.file1;
      this.form.otherFile = this.file2;
      $("#registrationFormModal").modal("hide");
      this.$axios
        .post(`/agency/request`, this.form)
        .then(response => {
          console.log(response.data);
          this.$bvModal.show("requst_success");
        })
        .catch(error => {
          this.$bvModal.show("request_fail");
        });
    },
    hasSecondaryDoc() {
      return this.inputFileTypeList.includes(this.form.agencyType);
    },
    // auth Agency Request
    agencyRequest() {
      if (!this.$auth.loggedIn) {
        this.$store.commit(
          "updateTitle",
          "لكي تستطيع  تسجيل شركة يجب عليك أن تسجل الدخول أولا  "
        );
        this.$bvModal.show("login");
        return;
      }
      if (
        this.$auth.loggedIn &&
        this.$auth.user.profile.isEmailConfirm &&
        this.$auth.user.profile.isPhoneConfirm
      ) {
        // Assignment user info to modal form
        this.form.firstName = this.$auth.user.profile.firstName;
        this.form.lastName = this.$auth.user.profile.lastName;
        this.form.phone = this.$auth.user.profile.phone;
        this.form.email = this.$auth.user.profile.email;
        $("#registrationFormModal").modal("show"); // show modal
       // this.$router.push('/agencies-request')
      } else {
        this.$bvToast.toast(
          "يجب أن تؤكد البريد الإلكتروني ورقم الجوال لكي تستطيع تسجيل شركة",
          {
            variant: "danger",
            autoHideDelay: 5000,
            solid: true
          }
        );
      }
    }
  }
};
