<template>

  <section class="cards-cases my-5">
    <div class="view">
      <div class="container">
        <div class="row">
          <div class="col-12"> <h3 class="mb-2"> العرض الأفقي (9/12)</h3>
            <h5 class="mb-2">لا يحتاج لإضافةاي كلاس</h5></div>
          <div class="col-lg-9" v-for="(item,index) in projects" :key="index">
            <mx-card-project :project="item"
                             :class="{'grid-view':$mq === 'tablet' || $mq === 'mobile' }">
            </mx-card-project>
          </div>

        </div>
      </div>
    </div>
    <div class="view">

      <div class="container">
        <div class="row">
          <div class="col-12">
            <h3 class="mb-2"> العرض في صفحة الشركة</h3>
            <h5 class="mb-2">[ agency-view ]</h5>
          </div>
          <div class="col-lg-8" v-for="(item,index) in projects" :key="index">
            <mx-card-project :project="item"
                             class="agency-view"
                             :class="{'grid-view':$mq === 'tablet' || $mq === 'mobile' }">
            </mx-card-project>
          </div>
        </div>
      </div>
    </div>
    <div class="view">

      <div class="container">
        <div class="row">

          <div class="col-12">
            <h3 class="mb-2"> العرض العمودي  </h3>
            <h5 class="mb-2">[ grid-view ]</h5>
          </div>
          <div class="col-lg-4" v-for="item in projects">
            <mx-card-project :project="item"
                             class="grid-view">
            </mx-card-project>
          </div>
        </div>
      </div>
    </div>
    <div class="view">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h3 class="mb-2"> العرض العمودي خريطة </h3>
            <h5 class="mb-2">[ grid-view + info-windows ]</h5>
          </div>
          <div style="width:250px" v-for="item in projects">
            <mx-card-project :project="item"
                             class="grid-view info-window">
            </mx-card-project>
          </div>
        </div>
      </div>
    </div>
    <div class="view">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h3 class="mb-2"> العرض الافقي خريطة </h3>
            <h5 class="mb-2">[ list-info-window ]</h5>
          </div>
          <div style="width:320px" v-for="item in projects">
            <mx-card-project :project="item"
                             class="list-info-window">
            </mx-card-project>
          </div>
        </div>
      </div>
    </div>
  </section>


</template>
<script src="./cards-cases.js"></script>
<style src="./cards-cases.scss" scoped lang="scss"></style>

