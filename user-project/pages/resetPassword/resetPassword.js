import {
  ValidationObserver,
  ValidationProvider,
  validate,
  extend
} from "vee-validate/dist/vee-validate.full";

extend("verify_password", {
  validate: value => {
    var strongRegex = new RegExp("^(?=.*[a-z,A-Z])(?=.*[0-9])");
    return strongRegex.test(value);
  }
});
export default {
  name: 'reset-password',
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
    validate
  },
  props: [],
  data() {
    return {
      fieldType1: 'password',
      fieldType2: 'password',
      password: null,
      confirmPassword: null
    }
  },

  methods: {
    // call api reset Password
    callApiResetPassword() {
      let url = new URL(window.location.href);
      let params = new URLSearchParams(url.search);

      let payload = {
        Password: this.password,
        UserId: params.get("userId"),
        Token: params.get("token"),
      }
     // console.log("resetPassword", payload);
      this.$axios.post(`/identity/setPassword`, payload)
        .then(response => {
         // console.log("response", response.data);
          this.$router.push(`/`);
          this.$bvModal.show("login");

        }).catch(function (error) {
         // console.log(error);
          alert('حدث خطأ')
        })
    },

    // togglePassword1
    togglePassword1() {
      this.fieldType1 = this.fieldType1 === 'password' ? 'text' : 'password';
    },
    // togglePassword
    togglePassword2() {
      this.fieldType2 = this.fieldType2 === 'password' ? 'text' : 'password';
    }
  }
}
