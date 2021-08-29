<template>

  <section class="cards-cases my-5">
    <div class="view">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h3 class="mb-2">  العرض الأفقي  </h3>
            <h5 class="mb-2">[ ]</h5>
          </div>
          <div class="col-lg-9 mb-2" v-for="(item,index) in realestates" :key="index">
            <mx-card-realestate
              :offerItems="item"
              hasCallButtons
              :hasDistrict="false"
            ></mx-card-realestate>
          </div>
        </div>
      </div>
    </div>
    <div class="view">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h3 class="mb-2">  العرض العمودي السعر أولاً </h3>
            <h5 class="mb-2">[  ]</h5>
          </div>
          <div class="col-lg-4" v-for="item in realestates">
            <mx-card-realestate
              :offerItems="item"
              class="grid-view "
              pricePriority
              :hasDistrict="false"
            ></mx-card-realestate>
          </div>
        </div>
      </div>
    </div>
    <div class="view">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h3 class="mb-2">  العرض العمودي العنوان أولاً </h3>
            <h5 class="mb-2">[  ]</h5>
          </div>
          <div class="col-lg-4" v-for="item in realestates">
            <mx-card-realestate
              :offerItems="item"
              class="grid-view "
              hasCallButtons
            ></mx-card-realestate>
          </div>
        </div>
      </div>
    </div>
    <div class="view">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h3 class="mb-2">  العرض الأفقي  </h3>
            <h5 class="mb-2">[  ]</h5>
          </div>
          <div style="width:250px" v-for="item in realestates">
            <mx-card-realestate
              :offerItems="item"
              class="grid-view grid-view-small real-estate-card"
              pricePriority
              :hasDistrict="false"
            ></mx-card-realestate>
          </div>
        </div>
      </div>
    </div>
    <div class="view">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h3 class="mb-2">  العرض الأفقي  </h3>
            <h5 class="mb-2">[ 5 ]</h5>
          </div>
          <div style="width:320px" v-for="item in realestates">
            <mx-card-realestate
              class="info-map-view"
              :offerItems="item"
              pricePriority
            ></mx-card-realestate>
          </div>
        </div>
      </div>
    </div>
    <div class="view">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h3 class="mb-2">  العرض الأفقي  </h3>
            <h5 class="mb-2">[  ]</h5>
          </div>
          <div style="width:320px" v-for="item in realestates">
            <mx-card-realestate
              class="grid-view info-map-view"
              :offerItems="item"
              pricePriority
            ></mx-card-realestate>
          </div>
        </div>
      </div>
    </div>
  </section>


</template>
<script src="./cards-cases.js"></script>
<style src="./cards-cases.scss" scoped lang="scss"></style>

