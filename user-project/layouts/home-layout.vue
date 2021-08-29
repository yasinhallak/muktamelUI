<template>
  <div class="dir-wrapper" style="overflow-x: hidden" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'" >
    <div class="mx-header-container">
      <div class="container-muk px-20">
        <m-header class="home-header"></m-header>
      </div>
    </div>
    <Nuxt class="app-wrapper" />
    <div class="mx-footer-container">
      <div class="container-muk">
        <m-footer></m-footer>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

@import "~assets/n-scss/style.scss";
@import "~assets/scss/muktamel.scss";
@import "~assets/scss/style.scss";

.mx-footer-container{
  .container-muk{
    @media (max-width: 959px) {
      padding:0;
    }
  }
}

</style>
<script>
import mHeader from "./m-header/index.vue";

import mFooter from "./m-footer";
export default {
  components: {
    mHeader,
    mFooter
  }
};
</script>
