import VueRecaptcha from "vue-recaptcha";
import {
  ValidationObserver,
  ValidationProvider,
  validate,
  extend
} from "vee-validate/dist/vee-validate.full";

class Form {
  constructor() {
    this.type = 1;
    this.name = null;
    this.email = null;
    this.phone = null;
    this.title = null;
    this.message = null;
    this.reCaptcha = null;
  }
}
export default {
  name: 'contact',
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
  props: [],
  data () {
    return {
      form: new Form(),
      sitekey: process.env.reCaptchaSitekey,
      isDisableButton: true,
      reCaptcha:null,
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    onVerify(response) {
      this.reCaptcha = response;
      this.sendForm();
    },
    onExpired: function () {
    },
    resetRecaptcha() {
      this.$refs.Recaptcha.reset(); // reset reCaptcha
      this.reCaptcha = null;
    },
    sendForm() {
      if (this.reCaptcha === null) {
        this.$refs.Recaptcha.execute();
        return;
      }

      this.form.reCaptcha = this.reCaptcha;
      this.$store.dispatch('postContactForm',this.form).then((response)=>{
        console.log('response',response);
        this.$bvModal
          .msgBoxOk("تم استقبال رسالتك بنجاح لا تتردوا بالتواصل معنا مرة اخرى", {
            title: "نجاح العملية",
            size: "sm",
            buttonSize: "sm",
            modalClass: 'alert-popup',
            okVariant: "primary",
            okTitle: "تم",
            centered: true
          })
          .then(value => {
            // this.form = new Form();
            // this.$refs.observer.reset();
            this.$refs.Recaptcha.reset();

          })
          .catch(err => {
            // An error occurred
          });

      })

    }
  }
}


