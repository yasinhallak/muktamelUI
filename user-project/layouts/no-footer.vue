<template>
  <div class="dir-wrapper" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <m-header class="search-header"></m-header>
    <Nuxt class="app-wrapper" />
  </div>
</template>

<style lang="scss">

@import "~assets/n-scss/style.scss";
@import "~assets/scss/muktamel.scss";
@import "~assets/scss/style.scss";

.list-enter,
.list-leave-to {
  visibility: hidden;
  height: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
<script>
import mHeader from "./m-header/index.vue";
export default {
  components: {
    mHeader,
  }
};
</script>
