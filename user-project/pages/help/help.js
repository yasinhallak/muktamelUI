import {validate, ValidationObserver, ValidationProvider} from "vee-validate/dist/vee-validate.full";
import VueRecaptcha from "vue-recaptcha";



class problemFormClass {
  constructor() {
    this.type = 2;
    this.message = null;
    this.name = null;
    this.email = null;
    this.reCaptcha = null;
  }
}


export default {
  name: 'help',
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
      problemForm:new problemFormClass(),
      isDisableButton: true,
      sitekey: process.env.reCaptchaSitekey,
      reCaptcha:null,
    }
  },
  computed: {

  },
  mounted () {

  },
  resetRecaptcha() {
    this.$refs.Recaptcha.reset(); // reset reCaptcha
    this.reCaptcha = null;
  },
  methods: {

    onVerify(response) {
      this.reCaptcha = response;
      this.sendProblemForm();
    },
    resetRecaptcha() {
      this.$refs.Recaptcha.reset(); // reset reCaptcha
      this.reCaptcha = null;
    },
    sendProblemForm() {
      if (this.reCaptcha === null) {
        this.$refs.Recaptcha.execute();
        return;
      }

      this.problemForm.reCaptcha = this.reCaptcha;
      this.$store.dispatch('postHelpForm',this.problemForm).then((res)=>{
        this.$bvModal
          .msgBoxOk("تم تلقي مشكلتكم بنجاح ... نشكر تواصلكم", {
            title: "نجاح العملية",
            size: "sm",
            buttonSize: "sm",
            modalClass: 'alert-popup',
            okVariant: "primary",
            okTitle: "تم",
            centered: true
          })
          .then(value => {
            this.$refs.Recaptcha.reset();
            this.problemForm.email=null;
            this.problemForm.message=null;
            this.problemForm.name=null;

          })
          .catch(err => {
          });

      })

    }

  }

}


