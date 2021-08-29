<template>
  <div class="cons-layout">
    <div class="cons-wrapper">
      <img src="@/static/logo.svg">
      <p class="p1">Our website is under construction, keep in touch!</p>
      <p class="p2">الموقع قيد التطوير حاليا،ً انتظرونا</p>
    </div>
  </div>
</template>

<style lang="scss">
.cons-layout{
  background: url("~@/static/cons-bg.jpg");
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &:before{
    content: "";
    display: block;
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.8);
  }
  .cons-wrapper{
    text-align: center;
    z-index: 2;
  }

  img{
    height: 220px;
    margin-bottom: 80px;
  }
  .p1,.p2{
    color: #fff;
  }

  .p1{
   direction: ltr;
    font-size: 22px;
    line-height: 1.2;
    padding-bottom: 48px;
  }

  .p2{
    font-weight: bold;
    font-size: 18px;
    line-height: 1.2;
  }

  @media only screen and (max-width: 575px) {
    .p1{
      font-size: 14px;
    }
    img{
      max-width: 80%;
    }
  }

}



</style>
<script>
export default {

};
</script>
