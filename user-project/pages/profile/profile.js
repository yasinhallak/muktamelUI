//import axios from "axios";
//import arData from "../../locales/ar.json";
import VueRecaptcha from "vue-recaptcha";

import {
  ValidationObserver,
  ValidationProvider,
  validate,
  extend
} from "vee-validate/dist/vee-validate.full";
//import Vue from "vue";
//import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import VueScrollTo from "vue-scrollto";
import {mapState} from "vuex";



extend("verify_password", {
  validate: value => {
    var strongRegex = new RegExp("^(?=.*[a-z,A-Z])(?=.*[0-9])");
    return strongRegex.test(value);
  }
});
class profile {
  constructor() {
    this.firstName = "";
    this.lastName = "";
    this.email = null;
    this.phone = null;
    this.isPhoneConfirm = false;
    this.isEmailConfirm = false;
    this.logo = "";
  }
}

class PlansForm {
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
    this.isFavorite = true;
  }
}

class RealEstateForm {
  constructor() {
    this.addressId = null;
    this.dealType = null;
    this.saleType = [];
    this.rentType = null;
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
    this.isFavorite = true;
    this.hasVirtualTour = null;
    this.sortColumn = null;
    this.sortDirection = null;
  }
}

class PasswordFrom {
  constructor() {
    this.oldPassword = null;
    this.newPassword = null;
    this.newPasswordConfirm = null;
  }
}
const pageSize = 4;
const SortDirection = Object.freeze({
  Asc: 1,
  Desc: 2
});

const FavoriteTitle = Object.freeze({
  favoriteItems: 1,
  favoriteOffers: 2,
  favoritePlans: 3
});

export default {
  middleware: "auth",
  name: "profile",
  components: {
    ValidationObserver,
    ValidationProvider,
    VueRecaptcha,
    validate
  },
  props: [],
  data() {
    return {
      window22: {
        width: 0,
        height: 0
      },
      form: new profile(),
      resultsCount: 0,
      offerSelected: null,
      sortSelected: null,
      sortCol:null,
      sortDir:null,
      noContent: null,
      oldEmail: "",
      oldPhone: "",
      checkEmailError: false,
      checkPhoneError: false,
      reCaptcha: null,
      isbuttonDisablePhone: false,
      isbuttonDisableEmail: false,
      sitekey: process.env.reCaptchaSitekey,
      failTries: false,
      successTries: true,
      buttonEmailClicked: false,
      password: new PasswordFrom(),

      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,

      favoriteTitleSelected: FavoriteTitle.favoriteItems,
      realestates: null,
      currentPageReal: 1,
      realEstateForm: new RealEstateForm(),
      plans: null,
      currentPagePlans: 1,
      plansForm: new PlansForm(),
      baseUrl:process.env.baseURL
    };
  },
  computed:{
    ...mapState(["userFavorites"]),
  },
  methods: {
    onResize() {
      this.window22.width = window.innerWidth
    },
    // get token
    onVerify(response) {
      this.reCaptcha = response;
      if (this.buttonEmailClicked) {
        this.callApiChangeEmail();
        this.buttonEmailClicked = false;
      } else {
        this.callApiChangePhone();
      }
    },

    onExpired: function() {
      // console.log("Expired");
    },
    resetRecaptcha() {
      this.$refs.Recaptcha.reset(); // reset reCaptcha
      this.reCaptcha = null;
    },
    // call api change phone
    callApiChangePhone() {
      this.isbuttonDisablePhone = true;
      if (this.reCaptcha === null) {
        this.$refs.Recaptcha.execute();
        return;
      }
      let payload = {
        phone: this.form.phone,
        reCaptcha: this.reCaptcha
      };
      this.$axios
        .post(`/identity/requestChangePhone`, payload)
        .then(response => {
          console.log("response", response.data);
          let result = response.data;
          this.$refs.Recaptcha.reset();
          this.reCaptcha = null;
          // fail phone
          if (result.success === false && result.countRegisterTries >= 3) {
            this.$bvModal.show("confirmChangePhone");
            this.$refs.confirmModalPhone3.UpdateModale(
              result.countRegisterTries,
              null
            );
            return;
          }
          // success phone
          if (result.success) {
            this.checkPhoneError = false;
            //this.form.isPhoneConfirm = true;
            this.oldPhone = this.form.phone;
            this.$bvModal.show("confirmChangePhone");
            this.$refs.confirmModalPhone3.StartTimer(
              120,
              result.countRegisterTries
            );
            return;
          }
        })
        .catch(error => {
          if (error.response.status == 400) {
            this.checkPhoneError = true;
          }
        });
    },
    // call api change email
    callApiChangeEmail() {
      this.isbuttonDisableEmail = true;
      if (this.reCaptcha === null) {
        this.buttonEmailClicked = true;
        this.$refs.Recaptcha.execute();
        return;
      }
      let payload = {
        email: this.form.email,
        reCaptcha: this.reCaptcha
      };
      this.$axios
        .post(`/identity/requestChangeEmail`, payload)
        .then(response => {
          //  console.log("response", response.data);
          let result = response.data;
          this.$refs.Recaptcha.reset();
          this.reCaptcha = null;
          // fail emaile
          if (result.success === false && result.countRegisterTries >= 3) {
            this.failTries = true;
            this.successTries = false;
            this.$bvModal.show("modal-email-profile");
            return;
          }
          // success email
          if (result.success) {
            this.$bvModal.show("modal-email-profile");
            return;
          }
        })
        .catch(error => {
          if (error.response.status == 400) {
            this.checkEmailError = true;
          }

        });
    },

    getProfile() {
      this.form = Object.assign({}, this.$auth.user.profile);
      this.oldEmail = this.form.email;
      this.oldPhone = this.form.phone;
      //this.firstName = user.firstName != null ? user.firstName : "";
      //this.lastName = user.lastName != null ? user.lastName : "";
    },

    isPhoneConfirmed() {
      return this.form.isPhoneConfirm && this.form.phone == this.oldPhone;
    },

    isMailConfirmed() {
      return this.form.isEmailConfirm && this.form.email === this.oldEmail;
    },

    EditUserProfile() {
      var model = {
        FirstName: this.form.firstName,
        LastName: this.form.lastName
      };
      this.$axios
        .put(`/profile`, model)
        .then(response => {
          this.$auth.fetchUser();
          this.$bvToast.toast("تمت عملية الحفظ بنجاح", {
            title: "تعديل",
            variant: "success",
            autoHideDelay: 3000,
            solid: true
          });
        })
        .catch(function(error) {
          this.$bvToast.toast("حدث خطأ", {
            title: "تعديل",
            variant: "danger",
            autoHideDelay: 3000,
            solid: true
          });
        });
    },

    ChangePassword() {
      this.$axios
        .post(`/identity/changePassword`, this.password)
        .then(response => {
          //  console.log(response.data);
          if (response.data.isChanged) {
            this.password = new PasswordFrom();
            this.$refs.form.reset();
            this.$bvToast.toast("تمت عملية الحفظ بنجاح", {
              title: "تعديل",
              variant: "success",
              autoHideDelay: 3000,
              solid: true
            });
          } else {
            this.$bvToast.toast(
              "خطأ في كلمة المرور القديمة أرجو إدخال الكلمة القديمة بشكل صحيح",
              {
                title: "تعديل",
                variant: "danger",
                autoHideDelay: 3000,
                solid: true
              }
            );
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },

    emailCheck() {
      if (this.form.email != null) return this.reg.test(this.form.email);
      return true;
    },

    phoneCheck() {
      if (this.form.phone != null)
        return this.form.phone.toString().length == 9;
      return true;
    },

    FilterRealEstate() {
      this.favoriteTitleSelected = FavoriteTitle.favoriteOffers;
      this.$axios
        .post(
          `/offer/realestate/filter?PageNumber=${this.currentPageReal}&PageSize=${pageSize}`,
          this.realEstateForm
        )
        .then(response => {
          //console.log("respone:", response.data);
          this.realestates = response.data;
          this.resultsCount = response.data.totalCount;
        })
        .catch(function(error) {
          //  console.log(error);
          alert("حدث خطأ");
        });
    },

    onChangeSort() {
      if (this.realestates != null) {
        this.realEstateForm.sortColumn =this.sortSelected.sortCol;
        // console.log("test", this.realEstateForm.sortColumn);
        this.realEstateForm.sortDirection =this.sortSelected.sortDir;

      }
      if (this.plans != null) {
        this.plansForm.sortColumn =7;
        this.plansForm.sortDirection =this.sortSelected.sortDir;
      }
    },

    scrollToElement() {
      let element = document.getElementById("list-favorites");
      VueScrollTo.scrollTo(element, 500);
    },

    onChangePagination(currentPage) {
      this.scrollToElement();
      this.currentPageReal = currentPage;
      this.FilterRealEstate();
    },

    FilterPlan() {
      this.favoriteTitleSelected = FavoriteTitle.favoritePlans;
      this.$axios
        .post(
          `/offer/engineering/Filter?PageNumber=${this.currentPagePlans}&PageSize=${pageSize}`,
          this.plansForm
        )
        .then(response => {
          this.plans = response.data;
          this.resultsCount = response.data.totalCount;
        })
        .catch(function(error) {
          //  console.log(error);
          //alert("حدث خطأ");
        });
    },

    onChangePaginationPlans(currentPage) {
      this.scrollToElement();
      this.currentPagePlans = currentPage;
      this.FilterPlan();
    },

    async reset() {
      //console.log("reset")
      this.favoriteTitleSelected = FavoriteTitle.favoriteItems;
      this.resultsCount = 0;
      this.offerSelected = null;
      this.realestates = null;
      this.plans = null;
      this.sortSelected = null;
     await this.$store.dispatch("getUserFavorites");
      this.currentPageReal = 1;
      this.currentPagePlans = 1;
    },

    getTabLinkFromUrl() {
      if (this.$route.hash!== "") {
        $(`.list-group a[href="${this.$route.hash}"]`).tab('show');
        // this.$el.querySelector(`.list-group a[href="${this.$route.hash}"]`).tab('show');
      }
    },

    createRealEstateObject(searchQuery) {
      let url = this.$vRoute.CreateQueryString(searchQuery);
      this.$router.push(`/real-estates${url}`);
    },
  },
  created() {this.$store.dispatch('getUserFavorites');},
  watch: {
    realEstateForm: {
      deep: true,
      handler: function(newVal, oldVal) {
        this.FilterRealEstate();

      }
    },
    plansForm: {
      deep: true,
      handler: function(newVal, oldVal) {
        this.FilterPlan();
      }
    },
    form:{
      deep: true,
      handler: function(newVal, oldVal) {
        this.checkPhoneError = false;
      }
    },
    $route:  function(newVal) {
      //   let tab='#list-favorites'
      // if(_.isEqual(newVal.hash,tab)){
      //   console.log('test');
      //   return;
      // }
      this.getTabLinkFromUrl();
    }
  },

  mounted() {
    console.log(this.$route.hash);
    // if(this.$route.hash === '#list-favorites'){
    //
    // }
    this.getProfile();
    this.getTabLinkFromUrl();
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
      this.window22.width = window.innerWidth
    })
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
};
