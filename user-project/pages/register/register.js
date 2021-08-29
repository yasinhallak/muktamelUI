import VueRecaptcha from "vue-recaptcha";
import axios from "axios";
axios.defaults.baseURL = process.env.apiBaseUrl;

import {
  ValidationObserver,
  ValidationProvider,
  validate,
  extend
} from "vee-validate/dist/vee-validate.full";

class Form {
  constructor() {
    this.username = null;
    this.password = null;
    this.email = null;
    this.phone = null;
    this.reCaptcha = null;
  }
}

extend("uniqe", async value => {
  let result = await axios.get(`identity/username/${value}`);
  return result.data.isAvailable ? true : false;
});

extend("verify_password", {
  validate: value => {
    var strongRegex = new RegExp("^(?=.*[a-z,A-Z])(?=.*[0-9])");
    return strongRegex.test(value);
  }
});
export default {
  middleware: 'guest',
  name: "register",
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
    ValidationObserver,
    ValidationProvider,
    VueRecaptcha,
    validate
  },

  data() {
    return {
      form: new Form(),
      cashPassword: null,
      isDisableButton: true,
      timerInterval: null,
      selectedEmail: true,
      selectedPhone: false,
      dataError: false,
      fieldType: "password",
      sitekey: process.env.reCaptchaSitekey,
      reCaptcha: null,
      failTries: false,
      successTries: true,
      link:true
    };
  },

  methods: {
    // get token
    onVerify(response) {
      this.reCaptcha = response;
      this.callApiRegister();
    },
    onExpired: function () {
    },
    resetRecaptcha() {
      this.$refs.Recaptcha.reset(); // reset reCaptcha
      this.reCaptcha = null;
    },
    // call api register
    callApiRegister() {
      if (this.reCaptcha === null) {
        this.$refs.Recaptcha.execute();
        return;
      }
      if (this.cashPassword != null) {
        this.form.password = this.cashPassword;
      }

      this.form.reCaptcha = this.reCaptcha;
      this.$axios
        .post(`/identity/register`, this.form)
        .then(response => {
          console.log("response", response.data);
          let result = response.data;
          this.$refs.Recaptcha.reset();
          this.$refs.form.reset();
          this.reCaptcha = null;
          this.isDisableButton = true;
          this.cashPassword = this.form.password;
          this.form.password = null;
          // fail phone
          if (
            result.success === false &&
            result.countRegisterTries >= 3 &&
            this.form.phone != null
          ) {
            this.$bvModal.show("confirmPhoneRegister");
            this.$refs.confirmModalPhone1.UpdateModale(result.countRegisterTries, null);
            return;
          }
          // fail emaile
          if (
            result.success === false &&
            result.countRegisterTries >= 3 &&
            this.form.email != null
          ) {
            this.failTries = true;
            this.successTries = false;
            this.$bvModal.show("modal-email-register");
            return;
          }
          // success email
          if (result.method === "e") {
            this.$bvModal.show("modal-email-register");
            return;
          }
          // success phone
          if (result.method === "p") {
            this.$bvModal.show("confirmPhoneRegister");
            this.$refs.confirmModalPhone1.StartTimer(
              20,
              result.countRegisterTries
            );
            return;
          }
        })
        .catch(error => {
          this.dataError = true;
        });
    },

    //Change To Email
    ChangeEmail() {
      this.selectedEmail = true;
      this.selectedPhone = false;
      this.form.phone = null;
      this.dataError=false;
    },

    // change To Phone
    ChangePhone() {
      this.selectedPhone = true;
      this.selectedEmail = false;
      this.form.email = null;
      this.dataError=false;
    },

    // togglePassword
    togglePassword() {
      this.fieldType = this.fieldType === "password" ? "text" : "password";
    }
  },
  watch: {
    form: {
      deep: true,
      handler() {
        if (this.form.username && this.form.password && (this.form.email || this.form.phone)) {
          this.isDisableButton = false;
        }
      },
    }

  },
  mounted(){
  },
  // beforeCreate(){
  //   if (this.$auth.loggedIn) {
  //     console.log("this.auth:",this.$auth.loggedIn)
  //     this.$router.push('/');
  //   }
  // }
};
