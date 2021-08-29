<template>

  <iframe :src="`${endPoint}/api/MortgagePrograms/wizard${setQueryString()}`" ></iframe>

</template>
<script src="./script.js">

</script>
<style lang="scss">
   iframe {
    width: 100%;
    min-height: calc(100vh - 90px);

   @media only screen and (max-width: 959px) {
     min-height: calc(100vh - 50px);
   }
  }

</style>
