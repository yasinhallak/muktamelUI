<template>
  <div class="dir-wrapper" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'" >
    <div class="mx-header-container">
      <div class="container-muk default-header-wrapper px-20">
        <m-header class="non-home-header"></m-header>
      </div>
    </div>
    <Nuxt class="app-wrapper" :key="$route.fullPath" />
    <div class="mx-footer-container">
      <div class="mx-container">
        <m-footer></m-footer>
      </div>
    </div>

  </div>
</template>

<style lang="scss">

@import "~assets/n-scss/style.scss";
@import "~assets/scss/muktamel.scss";
@import "~assets/scss/style.scss";


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
