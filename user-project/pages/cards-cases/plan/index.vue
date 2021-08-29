<template>

  <section class="cards-cases">
    <div class="view-1"><h1>العرض الأفقي (9/12)</h1>
      <div class="container">
        <div class="row">
          <div class="col-lg-9">
            <template v-for="item in projects">
              <mx-card-project :project="item"
                               :class="{'grid-view':$mq === 'tablet' || $mq === 'mobile' }">
              </mx-card-project>
            </template>
          </div>
          <div class="col-lg-8">
            <template v-for="item in projects">
              <mx-card-project :project="item"
                               :class="{'grid-view':$mq === 'tablet' || $mq === 'mobile' }">
              </mx-card-project>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="view-2"><h1>العرض العمودي (4/12)</h1>
      <div class="container">
        <div class="row">
          <div class="col-lg-4" v-for="item in projects">
            <mx-card-project :project="item"
                             class="grid-view">
            </mx-card-project>
          </div>
        </div>
      </div>
    </div>
    <div class="view-3"><h1>العرض العمودي  عرض ثابت صغير</h1>
      <div class="container">
        <div class="row">
          <div style="width:250px" v-for="item in projects">
            <mx-card-project :project="item"
                             class="grid-view">
            </mx-card-project>
          </div>
        </div>
      </div>
    </div>
    <div class="view-4"><h1>العرض العمودي  خريطة</h1>
      <div class="container">
        <div class="row">
          <div style="width:250px" v-for="item in projects">
            <mx-card-project :project="item"
                             class="grid-view info-window">
            </mx-card-project>
          </div>
        </div>
      </div>
    </div>
    <div class="view-5"><h1>العرض الافقي  خريطة</h1>
      <div class="container">
        <div class="row">
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

