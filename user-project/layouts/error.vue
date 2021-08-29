<template>
  <div class="container-muk">
    Error
  </div>
</template>

<script>
  export default {
    props: ['error'],

    // asyncData() {
    //   if (this.error.statusCode===404){
    //     this.$nuxt.context.redirect("/404")
    //   }
    // }
    created() {
      if (this.error.statusCode===404){
        this.$nuxt.context.redirect("/404")
      }
    }
  }
</script>
