/***
 * Created Subhi Al Wattar
 * User: Subhi Al Wattar
 * Date: 7/29/2020
 * Time: 10:45 AM
 ***/

import Vue from "vue";
import vSelect from "vue-select";
import VueRecaptcha from "vue-recaptcha";
import "vue-select/dist/vue-select.css";
import {menu as navMenu} from "../../config/navMenu.json";
Vue.component("v-select", vSelect);



import {
  ValidationObserver,
  ValidationProvider,
  validate
} from "vee-validate/dist/vee-validate.full";

export default {
  name: "m-header",
  components: {
    ValidationObserver,
    ValidationProvider,
    VueRecaptcha,
    validate
  },
  data() {
    return {
      menu: navMenu,
      active: false,
      open: false,
      currentLanguage: null,
      username: null,
      password: null,
      email: null,
      phone: null,
      reCaptcha: null,
      dataError: null,
      dataErrorForget:false,
      fieldType: "password",
      sitekey: process.env.reCaptchaSitekey,
      baseUrl:process.env.imgUrl,
      selectedEmail: true,
      selectedPhone: false,
      isDisableForget: false,
      successTriesForget: true,
      failTriesForget: false,
      default_routes : {
        1: 'realestate',
        2: 'project',
        3: 'diagrams',
        4: 'mortgage',
        5: 'photographer',
        15: 'auction'
      }

    };
  },
  created() {
    this.currentLanguage = this.$i18n.locale;
  },
  methods: {
    async onMenuEnter(e){
      e.target.classList.add('active');
    },
    async onMenuLeave(e){
      e.target.classList.remove('active');
    },
    // /profile/#list-info
    async navToProfile(link){
     await this.$refs.menuDrop.hide(true);
     await this.$router.push(link);
    },
    closeOverlay(){
      this.active = false;
      this.open = false;
    },
    // get token
    onVerifyLogin(response) {
      this.reCaptcha = response;
      this.callApiLogin();
    },

    onVerifyForget(response) {
      this.reCaptcha = response;
      this.callApiForgetPassword();
    },

    onExpired: function() {
    },

    // call api login
    async callApiLogin() {
      if (this.reCaptcha === null) {
        this.$refs.Recaptcha.execute();
        return;
      }
      let payload = {
        UserName: this.username,
        Password: this.password,
        reCaptcha: this.reCaptcha
      };
      await this.$auth
        .loginWith("cookie", {
          data: payload
        })
        .then((res) => {
          this.$refs.Recaptcha.reset();
          this.reCaptcha = null;
          this.username=this.password=null;
          this.$refs.form.reset();
          this.$bvModal.hide("login");
          this.$bvToast.toast("تمت عملية تسجيل الدخول بنجاح", {
            variant: "success",
            autoHideDelay: 3000,
            solid: true
          });

          // redirect to home page if pathname equal to register
          if (this.$route.path === "/register") {
             this.$router.push("/");
          }
          // redirect to redirectUrl if exist in url
          if(this.$route.query.redirectUrl){
            this.$router.push(`/${this.$route.query.redirectUrl}`);
          }
          if(this.$route.hash.startsWith("#login?redirectUrl=Mortgage") ){
            this.$router.push(`/Mortgage`);
          }

        })
        .catch(error => {
          //console.log("error:", error);
          let errors = error.response.data.errors;
          errors.forEach(item => {
            //console.log("item:", item);
            this.dataError = this.$t(`login_error.${item}`);
          });
        });
    },

    // cal api forget password
    callApiForgetPassword() {
      if (this.reCaptcha === null) {
        this.$refs.Recaptcha.execute();
        return;
      }
      let payload = {
        Email: this.email,
        Phone: this.phone,
        reCaptcha: this.reCaptcha
      };
      this.$axios
        .post(`/identity/forgetPassword`, payload)
        .then(response => {
          let result = response.data;
          this.$refs.Recaptcha.reset();
          this.reCaptcha = null;
          console.log("forgetpassword", result);
          // fail phone
          if (
            result.success === false &&
            result.count >= 3 &&
            this.phone != null
          ) {
            this.$bvModal.hide("forgetPassword");
            this.$bvModal.show("confirmPhoneForgetPassword");
            this.$refs.confirmModalPhone2.UpdateModale(result.count, null);
            return;
          }
          // success phone
          if (this.phone != null) {
            this.$bvModal.show("confirmPhoneForgetPassword");
            this.$refs.confirmModalPhone2.StartTimer(20, result.count);
            return;
          }
          // fail email
          if (
            result.success === false &&
            result.count >= 3 &&
            this.email != null
          ) {
            this.successTriesForget = false;
            this.failTriesForget = true;
            this.$bvModal.hide("forgetPassword");
            this.$bvModal.show("modal-email-forget");
            return;
          }
          // success email
          if (this.email != null) {
            this.$bvModal.hide("forgetPassword");
            this.$bvModal.show("modal-email-forget");
            return;
          }
        })
        .catch((error)=> {
        //  console.log(error);
          this.dataErrorForget = true;
        });
    },

    //Change To Email
    ChangeEmail() {
      this.selectedEmail = true;
      this.selectedPhone = false;
      this.phone = null;
      this.dataErrorForget = false;

    },

    // change To Phone
    ChangePhone() {
      this.selectedPhone = true;
      this.selectedEmail = false;
      this.email = null;
      this.dataErrorForget = false;
    },

    // togglePassword
    togglePassword() {
      this.fieldType = this.fieldType === "password" ? "text" : "password";
    },

    // show hide modal
    showHideModalLoginForget() {
      this.$bvModal.hide("login");
      this.$bvModal.show("forgetPassword");
    },
    // show hide modal
    hideShowModalSuccessLogin() {
      this.$bvModal.hide("modal-confirm-register");
      this.$bvModal.show("login");
      history.pushState({}, null, "/");
    },

    // call api confirm Registeration
    callApiConfirmRegisteration() {

      let payload = {
        Method:this.$route.query.method ,
        UserId:this.$route.query.userId ,
        Token: this.$route.query.token
      };
      if (payload.Token === null || payload.Token===undefined) return;
      if (payload.Method === null|| payload.Method===undefined) return;
      this.$axios.post(`/Identity/Confirm`, payload).then(response => {
        if (response.data) {
          this.$bvModal.show("modal-confirm-register");
          //this.$router.push(`/`);
        }
      });
    },

    // auth mortgage
    authMortgage() {
      //console.log('authMortgage')
      if (this.$auth.loggedIn) {
        this.$router.push(`/Mortgage`);
        return;
      }

      this.$store.commit('updateTitle','للإستفادة من خدمة التمويل العقاري يجب عليك  أن تسجل الدخول أولا ');

      this.$router.push({
        path: this.$route.path,
        query: Object.assign( {},this.$route.query,{redirectUrl:"Mortgage"})
      });

       this.$bvModal.show("login");
    },

    callMethod(name){
      //console.log("callMethod")
      return this[name]();
    },
    // hide modal  login
    hideModalLogin(){
      this.$store.commit('updateModalState',false);
      this.$store.commit('updateTitle','');
    },

    createRealEstateObject(searchQuery){
      let url=  this.$vRoute.CreateQueryString(searchQuery);
      this.$router.push(`/real-estates${url}`);
      this.window.reload()
    }
  },

  watch: {
    '$route': {
      deep: true,
      immediate: true,
      handler: function(oldValue, newValue) {
        this.callApiConfirmRegisteration();
      }
    }
  },

  mounted() {
    // this.$bvModal.show("modal-email-forget");
    console.log("login",this.$route.hash)
    if(this.$route.hash.startsWith("#login?redirectUrl=agencies-request&&agencyType=1") ){
      this.$router.push(`/agencies-request?#login?redirectUrl=agencies-request&&agencyType=1`);
      return;
    }

    if (this.$route.hash.startsWith("#login") && !this.$auth.loggedIn) {
      this.$bvModal.show("login");
      return ;
    }

    if(this.$route.hash.startsWith("#login?redirectUrl=Mortgage") && this.$auth.loggedIn ){
      this.$router.push(`/Mortgage`);
      return;
    }


  }
};
