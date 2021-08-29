<template>
  <section class="home">
    <div>

      <div class="filter-img"
           :class="$route.path==='/404'?'is-e':''"
           :style="$route.path==='/404'
      ?{'background-image':'url('+require('@/assets/images/home/home-error.jpg')+')'}
      :''">

        <!--title 404 section-->
        <div class="row e_row" v-if="$route.path=='/404'">
        <div class="col-12 e-col">
          <h1 class="lost-text">هل ضللت الطريق؟</h1>
          <h1 class="e-title">404</h1>
        </div>
        </div>

        <!--filter section-->
        <div
          class="filter-section justify-content-center text-center"
        >
          <div class="container-search-box container-muk-fluid">
            <div class="row align-items-center justify-content-center flex-column">

              <h2 v-if="$route.path!='/404'">بيتك أقرب إليك</h2>
              <p class="not-found-text"
                  v-if="$route.path=='/404'">الصفحة التي طلبتها غير موجودة</p>

<!--              <b-tabs pills >-->
<!--                <b-tab title="للبيع" active><b-card-text>Tab contents 1</b-card-text></b-tab>-->
<!--                <b-tab title="للإيجار"><b-card-text>Tab contents 2</b-card-text></b-tab>-->
<!--                <b-tab title="مشاريع"><b-card-text>Tab contents 2</b-card-text></b-tab>-->
<!--              </b-tabs>-->

              <ul class="nav nav-pills" id="pills-tab" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    id="pills-home-tab"
                    data-toggle="pill"
                    href="#pills-home"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                    @click="
                    form.dealType = 5;
                    pathname = 'real-estates';
                  "
                  ><span>للبيع</span></a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    id="pills-profile-tab"
                    data-toggle="pill"
                    href="#pills-profile"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                    @click="
                    form.dealType = 6;
                    pathname = 'real-estates';
                    form.rentType = 2;
                  "
                  ><span>للإيجار</span></a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    id="pills-contact-tab"
                    data-toggle="pill"
                    href="#pills-contact"
                    role="tab"
                    aria-controls="pills-contact"
                    aria-selected="false"
                    @click="
                    pathname = 'projects';
                    form.dealType = form.rentType = null;
                  "
                  ><span>مشاريع</span></a
                  >
                </li>
              </ul>
              <div class="tab-content-wrapper">
                <div class="tab-content main-filter-box" id="pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <div class="filter-box">
                      <div class="filter-col filter-item-1">
                        <v-select
                          class="v-selector "
                          :class="{'has-value' : !searchBoxAddress.selected}"
                          dir="rtl"
                          placeholder="المنطقة أو المدينة أو الحي"
                          :filterable="false"
                          v-model="searchBoxAddress.selected"
                          @search="onSearchAddress"
                          :options="searchBoxAddress.filterdOptions"
                          :no-drop="searchBoxAddress.svalue.length < 1"
                          :selectable="option => !option.hasOwnProperty('group')"
                          label="name"
                        >
                          <template #option="{ group, name,path }">
                            <div class="group" v-if="group">
                              {{ group }}
                            </div>
                            <div class="px-4">{{ name }}{{ path }}</div>
                          </template>

                        </v-select>
                      </div>
                      <div class="btn-more-wrapper filter-item-2">
                        <div>
                          <b-button id="collapseButton1" class="collapse-button1" v-b-toggle="'collapse-1'" variant="more-button"
                          ><span>المزيد</span>
                            <i class="mx-icon-sliders more-filter-icon"></i>
                          </b-button>
                        </div>
                      </div>
                      <div class="search-col filter-item-3">
                        <button class="btn search" @click="onClickSearch">
                          ابحث
                        </button>
                      </div>
                      <!--here-->
                      <b-collapse  id="collapse-1" ref="c1" class="mt-2 filter-collapse test1">
                        <b-card class="filter-card">
                          <div class="d-grid filter-collapse-grid">
                            <div class="grid-item item-a text-left input-wrapper">
                              <label >نوع العقار</label>
                              <mx-form-select-multi-column
                                rightTitle="سكني"
                                leftTitle="تجاري"
                                :leftList="sampleListCommercial"
                                :rightList="sampleListResidence"
                                :leftSelected.sync="form.commertialRealstateType"
                                :rightSelected.sync="form.residentialRealstateType"
                                title="نوع العقار"
                                refName="buyRealestateType"
                                :pop-offset="-50"
                              >
                              </mx-form-select-multi-column>
                            </div>
                            <div class="grid-item item-b text-left input-wrapper">
                              <label >حدود السعر</label>
                              <mx-form-select-range
                                :list="listPrice"
                                :hasExt="hasExtPrice"
                                :rangeFromSelected.sync="form.priceFrom"
                                :rangeToSelected.sync="form.priceTo"
                                fromTitle="السعر الأدنى"
                                toTitle="السعر الأعلى"
                                rangeFromTitle="ادنى سعر"
                                rangeToTitle="اعلى سعر"
                                sub-title="السعر :"
                                title="سعر العقار"
                                refName="buyPrice"
                              >
                              </mx-form-select-range>
                            </div>
                            <div class="grid-item item-c text-left">
                              <label for="">بحث بكلمة</label>
                              <div class="mx-input-search">
                                <input
                                  placeholder="بحث كلمة (مثلا مسبح)"
                                  type="search"
                                  v-model="form.keyWord"
                                />
                              </div>
                            </div>
                          </div>
                        </b-card>
                      </b-collapse>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    <div class="rent-box-grid">
                      <div class="rent-item-1">
                        <v-select
                          class="v-selector "
                          :class="{'has-value' : !searchBoxAddress.selected}"
                          dir="rtl"
                          placeholder="المنطقة أو المدينة أو الحي"
                          :filterable="false"
                          v-model="searchBoxAddress.selected"
                          @search="onSearchAddress"
                          :options="searchBoxAddress.filterdOptions"
                          :no-drop="searchBoxAddress.svalue.length < 1"
                          label="name"
                        >
                          <template #option="{ group, name,path }">
                            <div class="px-4">{{ name }}{{ path }}</div>
                          </template>
                        </v-select>
                      </div>
                      <div class="rent-item-2">
                        <select v-model.number="form.rentType">
                          <option value="1">شهريا</option>
                          <option value="2">سنويا</option>
                        </select>
                      </div>
                      <div class="btn-more-wrapper rent-item-3">
                        <div>
                          <b-button class="collapse-button2" v-b-toggle="'collapse-2'" variant="more-button"
                          ><span>المزيد</span>
                            <i class="mx-icon-sliders more-filter-icon"></i>
                          </b-button>
                        </div>
                      </div>
                      <div class="rent-item--4">
                        <button class="btn search" @click="onClickSearch">
                          ابحث
                        </button>
                      </div>
                      <b-collapse id="collapse-2" ref="c2" class="mt-2 filter-collapse test1">
                        <b-card class="filter-card">
                          <div class="d-grid filter-collapse-grid">
                            <div class="grid-item item-a text-left input-wrapper">
                              <label for="">نوع العقار</label>
                              <mx-form-select-multi-column
                                rightTitle="سكني"
                                leftTitle="تجاري"
                                :leftList="sampleListCommercial"
                                :rightList="sampleListResidence"
                                :leftSelected.sync="form.commertialRealstateType"
                                :rightSelected.sync="form.residentialRealstateType"
                                title="نوع العقار"
                                refName="rentRealestateType"
                                :pop-offset="-50"
                              >
                              </mx-form-select-multi-column>
                            </div>
                            <div class="grid-item item-a text-left input-wrapper">
                              <label for="">حدود السعر</label>
                              <mx-form-select-range
                                :list="listPrice"
                                :hasExt="hasExtPrice"
                                :rangeFromSelected.sync="form.priceFrom"
                                :rangeToSelected.sync="form.priceTo"
                                fromTitle="السعر الأدنى"
                                toTitle="السعر الأعلى"
                                rangeFromTitle="ادنى سعر"
                                rangeToTitle="اعلى سعر"
                                sub-title="السعر :"
                                title="سعر العقار"
                                refName="rentPrice"
                              >
                              </mx-form-select-range>
                            </div>
                            <div class="grid-item item-c text-left">
                              <label for="">بحث بكلمة</label>
                              <div class="mx-input-search">
                                <input
                                  placeholder="بحث كلمة (مثلا مسبح)"
                                  type="search"
                                  v-model="form.keyWord"
                                />
                              </div>
                            </div>
                          </div>
                        </b-card>
                      </b-collapse>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-contact"
                    role="tabpanel"
                    aria-labelledby="pills-contact-tab"
                  >
                    <div class="project-box-grid">
                      <div class="project-item-1">
                        <v-select
                          class="v-selector "
                          :class="{'has-value' : !searchBoxAddress.selected}"
                          dir="rtl"

                          placeholder="المنطقة أو المدينة أو الحي"
                          :filterable="false"
                          v-model="searchBoxAddress.selected"
                          @search="onSearchAddress"
                          :options="searchBoxAddress.filterdOptions"
                          :no-drop="searchBoxAddress.svalue.length < 1"
                          :selectable="option => !option.hasOwnProperty('group')"
                          label="name"
                        >
                          <template #option="{ group, name,path }">
                            <div class="group" v-if="group">
                              {{ group }}
                            </div>
                            <div class="px-4">{{ name }}{{ path }}</div>
                          </template>
                        </v-select>
                      </div>

                      <div class="project-item-2">
                        <button class="btn search" @click="onClickSearch">
                          ابحث
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!--3D-->
      <div class="container-muk services-slider text-center position-relative" >
        <div class="row align-items-center justify-content-center carousel-3d-row">
          <div class="col-muk-12">
            <h3>خدماتنا .. وأكثر</h3>
          </div>
          <div v-if="showServiceGrid"
               v-for="(m,i) in activeMenuTablet" :key="i"
               class="col-12 col-md-4 d-none">
            <div class="services-box w-100">
              <img :src="m.imgSrc" alt="" />
              <div class="services-content">
                <h4>{{m.title}}</h4>
                <p>{{m.description}} </p>
                <button>اعرف المزيد</button>
              </div>
            </div>
          </div>
          <client-only>
            <template v-if="$screen.width >= 640 && $screen.width <= 959">
              <carousel-3d
                :width="carouse3DOptions.width"
                :space="carouse3DOptions.space"
                :height="carouse3DOptions.height"
                :display="'8'"
                :inverseScaling="carouse3DOptions.inverseScaling"
                :border="carouse3DOptions.border"
                :perspective="carouse3DOptions.perspective"
                :controlsVisible="carouse3DOptions.controlsVisible"
                :dir="carouse3DOptions.dir"
                :controlsPrevHtml="carouse3DOptions.controlsPrevHtml"
                :controlsNextHtml="carouse3DOptions.controlsNextHtml"
                :disable3d="carouse3DOptions.disable3d"
                :clickable="carouse3DOptions.clickable"
              >
                <slide v-for="(m,i) in activeMenuTablet" :key="i"
                       class="right-current"
                       :index="i"
                       style="min-width: 200px!important"
                >
                  <nuxt-link :to="m.link">
                    <div class="services-box">
                      <img :src="m.imgSrc" alt="" />
                      <div class="services-content">
                        <h4>{{m.title}}</h4>
                        <p>{{m.description}} </p>
                        <button>اعرف المزيد</button>
                      </div>
                    </div>
                  </nuxt-link>
                </slide>
              </carousel-3d>
              <mx-spinner v-if="true" slot="placeholder"></mx-spinner>
            </template>
            <template v-else>
              <carousel-3d
                :width="carouse3DOptions.width"
                :space="carouse3DOptions.space"
                :height="carouse3DOptions.height"
                :display="carouse3DOptions.display"
                :inverseScaling="carouse3DOptions.inverseScaling"
                :border="carouse3DOptions.border"
                :perspective="carouse3DOptions.perspective"
                :controlsVisible="carouse3DOptions.controlsVisible"
                :dir="carouse3DOptions.dir"
                :controlsPrevHtml="carouse3DOptions.controlsPrevHtml"
                :controlsNextHtml="carouse3DOptions.controlsNextHtml"
                :disable3d="carouse3DOptions.disable3d"
                :clickable="carouse3DOptions.clickable"
              >
                <slide v-for="(m,i) in activityMenu" :key="i"
                       class="right-current"
                       :index="i"
                       style="min-width: 200px!important"
                >
                  <nuxt-link :to="m.link">
                    <div class="services-box">
                      <img :src="m.imgSrc" alt="" />
                      <div class="services-content">
                        <h4>{{m.title}}</h4>
                        <p>{{m.description}} </p>
                        <p>{{m.subDesc}} </p>
                        <button><span>المزيد</span></button>
                      </div>
                    </div>
                  </nuxt-link>

                </slide>
              </carousel-3d>
              <mx-spinner v-if="true" slot="placeholder"></mx-spinner>
            </template>
          </client-only>
        </div>
        <div class="nav-3d-wrapper">
          <i @click="goPrev3DSlide" class="mx-icon-chevron-right-light icon-next-3d"></i>
          <i @click="goNext3DSlide" class="mx-icon-chevron-left-light icon-prev-3d"></i>
        </div>
      </div >
      <!--end 3D-->

      <div style="min-height: 1px" class="w-100 recommended-section" v-view.once="onPropertiesSlideEnter" v-if="false">
        <mx-spinner v-if="isLoadingOffer" ></mx-spinner>
        <div class="container-muk-narrow  text-center recommended-container" v-if="!isLoadingOffer">
          <div class="row align-items-center justify-content-center">
            <h4
              class="black-text same-real-title font-weight-bold"
              v-if="offers"
            >
              عقارات موصى بها في المملكة العربية السعودية
            </h4>
            <hooper
              class="recommended-slide"
              v-if="offers"
              :rtl="true"
              :settings="hooperOffers"
              style="height: auto"
            >
              <CustomSlide :key="index" v-for="(item, index) in offers">
                <nuxt-link :to="'/real-estates/' + item.id" class="item-link">
                  <div class="slide-item-wrapper" style="width: 360px;height: 100%">
                    <mx-card-realestate
                      :offerItems="item"
                      class="grid-view"
                      pricePriority
                      :hasDistrict="false"
                    ></mx-card-realestate>

                  </div>
                </nuxt-link>
              </CustomSlide>
              <hooper-navigation slot="hooper-addons">
                <!--<img
                  slot="hooper-next"
                  src="../assets/images/photo_slide_left.png"
                  alt="no-photo"
                />-->

              <i slot="hooper-next" class="mx-icon-chevron-right-light slide-nav-icon next"></i>

              <i slot="hooper-prev" class="mx-icon-chevron-left-light slide-nav-icon prev"></i>
              <!--<img
                slot="hooper-prev"
                src="../assets/images/photo_slide_right.png"
                alt="no-photo"
              />-->

              </hooper-navigation>
            </hooper>
          </div>
        </div>
      </div>
      <!-- End realated realEstate Slider Section -->
      <!--start slider our clients -->
      <div style="min-height: 1px; "
           v-view.once="onClientSectionEnter"
           class="Our-clients container-muk-narrow mb-3 position-relative" v-if="false">
        <template v-if="showClientSection">
          <div
            class="bg-white row align-items-center justify-content-center">
            <h4 class="our-client-title">
              عملاؤنا
            </h4>
            <hooper
              class="agencies-hooper h-100"
              :settings="hooperOurClient"
              :rtl="true"
            >
              <CustomSlide
                           v-for="(_list,i) in clientMenu" :key="i">
                <!--                <div class="container-3-2">-->
                <img
                  :src="_list.imgSrc"
                  class="img-fluid rounded img-item child-3-2"
                  alt="Project Image"
                />
                <!--                </div>-->
              </CustomSlide>
              <!--              <hooper-navigation slot="hooper-addons">-->
              <!--                <i slot="hooper-next" class="mx-icon-chevron-right-light slide-nav-icon next"></i>-->

              <!--                <i slot="hooper-prev" class="mx-icon-chevron-left-light slide-nav-icon prev"></i>-->
              <!--                &lt;!&ndash;<img-->
              <!--                  slot="hooper-next"-->
              <!--                  src="~@/assets/images/photo_slide_left.png"-->
              <!--                  alt="no-photo"-->
              <!--                />&ndash;&gt;-->
              <!--                &lt;!&ndash;<img-->
              <!--                  slot="hooper-prev"-->
              <!--                  src="~@/assets/images/photo_slide_right.png"-->
              <!--                  alt="no-photo"-->
              <!--                />&ndash;&gt;-->
              <!--              </hooper-navigation>-->
              <hooper-pagination slot="hooper-addons" style="direction:ltr"></hooper-pagination>
            </hooper>
          </div>
          <div class="pointer-float pointer-1"><img src="@/assets/images/pointer-float.svg" ></div>
          <div class="pointer-float pointer-2"><img src="@/assets/images/pointer-float.svg" ></div>
          <div class="pointer-float pointer-3"><img src="@/assets/images/pointer-float.svg" ></div>
          <div class="pointer-float pointer-4"><img src="@/assets/images/pointer-float.svg" ></div>
          <div class="pointer-float pointer-5"><img src="@/assets/images/pointer-float.svg" ></div>
          <div class="pointer-float pointer-6"><img src="@/assets/images/pointer-float.svg" ></div>
        </template>

      </div>
      <!--end slider our clients -->

      <!-- Start dropdowns section -->
      <div class="container-muk-narrow dropdowns-section">
        <div class="row align-items-start justify-content-center">
          <div class="col-md-2 col-6" v-for="(menu,i) in footerMenu" :key="'menu-'+i">
            <div class="collapse-wrapper">
              <b-button class="collapse-toggle" v-b-toggle="`collapse1-${i}`" variant="primary">
                <span :style="{'margin-left':menu.ml+'px'}">{{menu.title}}</span>
                <i class="mx-icon-chevron-down collapse-icon"></i>
              </b-button>
              <b-collapse :id="`collapse1-${i}`" class="mt-2">
                <ul class="collapse-list">
                  <li v-for="(submenu,j) in menu.subMenus" :key="`submenu-${i}-${j}`">
                    <nuxt-link class="collapse-link" :to="submenu.link + citymenu.id +'}'" v-for="(citymenu,c) in cityMenu" :key="'citymenu-' +c">{{submenu.title}} {{$t('city.'+ citymenu.id)}} <br> </nuxt-link>
                  </li>
                </ul>
              </b-collapse>
            </div>
          </div>
        </div>
      </div>
      <!-- End dropdowns section -->

    </div>
  </section>
</template>
<script src="./home.js"></script>
<style src="./home.scss" scoped lang="scss"></style>
<style lang="scss">
.v-selector {
  height: 34px;
  &.has-value{
    position: relative;
    &::before {
      content: "\f002";
      font: normal normal 700 11px/14px 'Font Awesome 5 Free';
      color: #0089FE;
      position: absolute;
      left: 6px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .vs__search {
    font-size: 13px !important;
  }
  .vs__dropdown-toggle {
    height: 100%;
    padding: 0;

    .vs__selected{
      line-height: 0;
    }
    .vs__selected-options{
      padding:0
    }
    .vs__open-indicator{
      display: none !important;
    }
  }
  .vs__actions {
    padding:0;
    color: #0089FE;

    .vs__clear{
      line-height: 0;
      fill: #0089FE;
    }
  }
  .vs__search, .vs__search:focus{
    margin: 0 !important;
  }
}
</style>
