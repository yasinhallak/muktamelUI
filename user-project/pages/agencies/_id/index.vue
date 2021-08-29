<template >
  <section class="agency"  v-if="agency">
    <div class="container-muk py-2 py-muk-md-0">
      <!-- Start Office Show -->
      <div class="offshow">
        <div class="row">
          <div class="col-muk-md-8 mt-0 mt-muk-md-3 custom-padding">
            <!-- Start The First Section Ever -->
            <div
              class="bg-white hard-shadow rightSide box_offic_info"
              id="rightSide">
              <div class="container-fluid">
                <!-- Start The First Section Image The Main Info -->
                <div class="row pt-0 pb-2">
                  <div class="right-side" >
                    <mx-img class="agency-logo"
                            :img-src="agency.logo"
                            :noResponsive="true"
                            ratio="3/2"
                            :alt="agency.name"
                            :errorImageUrl="$vDefaultAgencyImg">

                    </mx-img>

                  </div>
                  <div class="  left-side pr-3 ">
                    <p
                      class=" text-4 text-center text-md-left   mb-0 mt-2 mt-muk-md-0 "
                    >
                      شركة :
                    </p>
                    <h2 class="mb-0 text-center font-size-20px font-weight-bold text-md-left colored title">
                      {{ agency.name }}
                    </h2>
                    <div class="contianer-fluid ">
                      <p
                        class="font-size-14px px-0 m-0 pt-0  text-center text-md-left"
                      >
                        المكتب الرئيسي :
                        <span class="px-0 m-0 pt-2 colored"
                          ><span>{{ $t(`city.${agency.address.city}`) }}</span>
                          - حي
                          <span>{{
                            $t(`district.${agency.address.district}`)
                          }}</span></span
                        >
                      </p>
                      <p
                        class="font-size-14px px-0 m-0 pt-0  text-center text-md-left"
                      >
                        السـجل التجاري &nbsp;&nbsp;:
                        <span class="px-0 m-0 pt-2 colored">{{
                          agency.crNo
                        }}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <!-- End The First Section Image The Main Info -->
              </div>

              <!--مناطق الاختصاص-->
              <!-- Start The Second Section Show More And Less Text Places of Control -->
              <hr class="custom-line" />
              <div
                class="general-info pb-0 "
                v-if="agency.agencyOffersCities.length > 0"
              >
                <div class="container-fluid pr-0  position-relative">
                  <p
                    class="mb-0 text-black"
                    :class="readmore2 ? 'haveMoreArea' : ''"
                  >
                    <span class="text-black_imp ">مناطق الإختصاص : </span>
                    <span v-for="(item,index) in agency.agencyOffersCities">
                      {{ $t(`city.${item}`) }}
                      <span v-if="agency.agencyOffersCities.length-1>index">,</span>
                    </span>
                  </p>
                  <a
                    class="text-2 moremoreArea"
                    data-more="toggle-0"
                    v-if="agency.agencyOffersCities.length > 8"
                    @click="readmore2 = !readmore2"
                  >
                    <span
                      v-if="readmore2"
                      class="colored font-weight-bold text-decoration-none more"
                      >أكثر<i class="mx-icon-chevron-down-light mx-1"></i
                    ></span>
                    <span
                      v-if="!readmore2"
                      class="colored font-weight-bold text-decoration-none less"
                      >أقل<i class="mx-icon-chevron-up-light mx-1"></i
                    ></span>
                  </a>
                </div>
              </div>
              <hr v-if="agency.agencyOffersCities.length > 0" class="custom-line"/>
              <!-- End The Second Section Show More And Less Text Places of Control -->

              <!--نبذة عن-->
              <!-- Start The General Info -->
              <div
                class="general-info pb-0 "
                v-if="agency.description !== null"
              >
                <div class="container-fluid pr-0  position-relative pb-4">
                  <h4 class="info_box_title info_box_title mt-2 pb-1">
                    نبذة عنا :
                  </h4>
                  <p
                    :class="
                      readmore && agency.description.length > 300
                        ? 'haveMore'
                        : ''
                    "
                    class="mb-0 PMore text-black"
                    data-paragraph="info-0"
                    id="toggle-0"
                  >
                    {{ agency.description }}
                  </p>
                  <a
                    class="text-2"
                    id="info-0"
                    data-more="toggle-0"
                    v-if="agency.description.length > 300"
                    @click="readmore = !readmore"
                  >
                    <span
                      v-if="readmore"
                      class="colored font-weight-bold text-decoration-none more"
                    >إقرأ المزيد<i class="mx-icon-chevron-down-light mx-1"></i
                    ></span>
                    <span
                      v-if="!readmore"
                      class="colored font-weight-bold text-decoration-none less"
                    >أقل<i class="mx-icon-chevron-up-light mx-1"></i
                    ></span>
                  </a>
                </div>
              </div>
              <!-- End The General Info -->
            </div>
            <!-- End The First Section Ever -->

            <!--contact us part-->
            <div class="row d-muk-md-none d-block sticky-p">
              <div class="col-12 col-muk-md-12 mt-3 row-stick">
                <div class="agent_box agent_box_res m-0">
                  <div class="ml-0 mr-0 row">
                    <div class="col-6 col-muk-md-4 p-1">
                      <button
                        type="button"
                        class="small d-flex align-items-center btn com-btn font-size-12px btn-block rounded-0 mb-0 text-4 text-left border-0   call-btn btn-primary"
                        @click="updateStatistic(StatisticsEnum.PhoneCount)"
                        href="#formModalCallOffice"
                        data-toggle="modal"
                        data-target="#formModalCallOffice"
                      >
                        <i class="mx-icon-phone ml-1 font-size-16px"></i> إتصل بنا الان
                      </button>
                    </div>
                    <div class="col-6 col-muk-md-4 p-1">
                      <button
                        type="button"
                        class="small d-flex align-items-center btn font-size-12px com-btn btn-block rounded-0 mb-0 text-4 text-left border-0   call-btn btn-primary"
                        href="#modalProject"
                        data-toggle="modal"
                        data-target="#modalProject"
                      >
                        <i class="mx-icon-envelope ml-1 font-size-16px"></i> راسلنا الان
                      </button>
                    </div>
                    <div class="col-12 col-muk-md-4 p-1">
                      <button
                        type="button"
                        class="big d-flex align-items-center btn font-size-12px com-btn btn-block rounded-0 mb-0 text-4 text-left border-0   call-btn btn-primary"
                        v-b-modal.props_popup
                      >
                        <i class="mx-icon-search-map-marker ml-1 font-size-16px"></i> المكتب
                        الرئيسي و الفروع
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!--image slider-->
            <!--معرض الصور-->
            <div
              class="bg-white hard-shadow mt-3 pb-1 slider_box_office_show"
              style="max-height: 165px"
              v-if="
                dynamicContentMainFooterContains(0) &&
                  agency.dynamicData.length > 0
              "
            >
              <p class="text-center info_box_title slider_title_office_show">
                معرض الصور
              </p>

              <hooper
                class="customers-slider"
                style="padding: 0 15px;"
                :settings="hooperOtherProject"
                :rtl="true"
              >
                <CustomSlide
                  data-target="#props_popup"
                  data-toggle="modal"
                  :key="index"
                  style="margin-left: 10px;width: 165px;cursor: pointer"
                  v-for="(item, index) in agency.dynamicData[
                    agency.dynamicData
                      .map(function(e) {
                        return e.order;
                      })
                      .indexOf(0)
                  ].images"
                >
                  <mx-img class="rounded" :img-src="item.path" ratio="3/2" :alt="item.path" max-size="sd"
                          :errorImageUrl="$vDefaultRealEstateImg"></mx-img>
                </CustomSlide>
                <hooper-navigation
                  slot="hooper-addons"
                  v-if="
                    ($mq == 'mobile' &&
                      agency.dynamicData[0].images.length > 2) ||
                      ($mq !== 'mobile' &
                        agency.dynamicData[0].images.length > 5)
                  "
                >
                  <img
                    slot="hooper-next"
                    src="~@/assets/images/photo_slide_left.png"
                    alt="no-photo"
                  />

                  <img
                    slot="hooper-prev"
                    src="~@/assets/images/photo_slide_right.png"
                    alt="no-photo"
                  />
                </hooper-navigation>
              </hooper>
            </div>
            <!-- End the Second Section First Slieder  -->
            <!-- Start The Thired Section Right Image -->

            <!--الكروت النوع 2 + 3-->
            <div
              v-if="dynamicContentBody.length > 0"
              class="right-img bg-white hard-shadow card-toggle  mt-3 box_offic_info"
              v-for="(item, index) in dynamicContentBody"
              :ref="`dynamicContentBody-${index}`"
            >
              <div
                :ref="`card-${index}`"
                :class="item.text.length > 300 ? 'haveMore2' : ''"
                class="container-fluid position-relative"
              >
                <div class="row">
                  <div
                    class="col-muk-md-4 text-center text-muk-md-left   px-0 box_offic_col_img text-align-right "
                    v-if="item.type == 2"
                  >
                    <mx-img width="300"
                            :img-src="item.image"
                            ratio="3/2"
                            :alt="'This is the logo of the main office'"
                            max-size="sd"
                            :errorImageUrl="$vDefaultRealEstateImg">

                    </mx-img>
                  </div>
                  <div
                    :class="item.type == 2 ? 'col-muk-md-8' : 'col-muk-md-12'"
                    class="pr-0 pr-muk-md-2 box_offic_col_text pb-1  "
                  >
                    <p class="info_box_title mt-2 mt-muk-md-0 ">{{ item.title }}</p>
                    <p
                      class="mb-0 text-black PMore"
                      :data-paragraph="'info-' + index"
                      :id="'toggle-' + index"
                    >
                      {{ item.text }}
                    </p>
                    <a
                      v-if="item.text.length > 300"
                      class="text-2"
                      :id="'info-' + index"
                      :data-more="'toggle-' + index"
                    >
                      <span
                        @click="showMoreCard(`card-${index}`)"
                        class="colored text-decoration-none more"
                      >إقرأ المزيد<i class="mx-icon-chevron-down-light mx-1"></i
                      ></span>
                      <span
                        @click="hideMoreCard(`card-${index}`)"
                        class="colored text-decoration-none less"
                      >أقل<i class="mx-icon-chevron-up-light mx-1"></i
                      ></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="col-muk-lg-12 col-muk-md-12 d-block d-muk-md-none  mt-3 pl-0 pr-0   "
            >
              <div
                v-if="!hideSocialSection()"
                class="add_shadow bg_white pb-2 pt-2 followus_box_office_show "
              >
                <h4 class="text-center font-size-18px text-blue mb-1">
                  تابعنا عبر
                </h4>
                <div class="text-center social_links">
                  <a
                    class="site_link"
                    v-if="agency.contact.website"
                    :href="agency.contact.website"
                    target="_blank"
                    data-placement="bottom"
                    title="الموقع الالكتروني"
                  ><img src="@/assets/images/website_icon.png"
                  /></a>
                  <a
                    class="youtube_link"
                    v-if="agency.contact.yotube"
                    :href="agency.contact.yotube"
                    target="_blank"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="يوتيوب"
                  ><i class="mx-icon-youtube"></i
                  ></a>
                  <a
                    class="snapshat_link"
                    v-if="agency.contact.snapchat"
                    :href="agency.contact.snapchat"
                    target="_blank"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="سناب شات"
                  ><i class="mx-icon-snapchat"></i
                  ></a>

                  <a
                    class="instagram_link"
                    v-if="agency.contact.instagram"
                    :href="agency.contact.instagram"
                    target="_blank"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="انستغرام"
                  >
                    <img src="@/assets/images/instagram_icon.png" width="35"/>
                  </a>
                  <a
                    class="twitter_link"
                    v-if="agency.contact.twitter"
                    :href="agency.contact.twitter"
                    target="_blank"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="تويتر"
                  ><i class="mx-icon-twitter"></i
                  ></a>

                  <a
                    class="facebook_link"
                    v-if="agency.contact.facebook"
                    :href="agency.contact.facebook"
                    target="_blank"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="فيس بوك"
                  ><i class="mx-icon-facebook"></i
                  ></a>
                </div>
              </div>
            </div>


            <!--our services-->
            <div v-if="agency.activities.length > 0 "
                 class="right-img bg-white hard-shadow card-toggle  mt-3 box_offic_info"
            >
              <p class="info_box_title mt-2 my-3 mt-muk-md-0 text-center">خدماتنا</p>
              <div
                class="row mb-0 text-black PMore"
              >
                <div v-for="(item,i) in agency.activities"
                     :ref="`serviceOption${i}`"
                     @mouseover="checkTooltip(`serviceOption${i}`)"
                     v-b-tooltip.left.hover="{
                      variant: 'success',
                      title:activeTooltip?
                       $t(`activityType.${item.type}.${item.activityId}`):''}"
                     class="col-6 service-col col-muk-md-3 py-2 pl-0">
                  <span style="color:#1CD847" class="mx-icon-check"></span>
                  <span style="color:#000" class="text-black font-size-13px">{{$t(`activityType.${item.type}.${item.activityId}`)}}</span>
                </div>
              </div>

              <p class="info_box_title my-3 text-center" v-if="agency.additionalData">حدود السعر</p>
              <div class="row px-0 px-muk-md-5" v-if="agency.additionalData">
                <div class="col-12 col-muk-md-6 text-center">
                  <p class="text-black font-size-13px m-0 mb-2">الوحدات الصغيرة (شقة)</p>
                  <p class="text-red">
                    <span class="font-size-26px font-weight-bold">{{agency.additionalData.small}}</span>
                    <span class="font-size-13px">ريال</span>
                  </p>
                </div>
                <div class="col-12 col-muk-md-6 text-center">
                  <p class="text-black font-size-13px m-0 mb-2">الوحدات المتوسطة (فيلا)</p>
                  <p class="text-red">
                    <span class="font-size-26px font-weight-bold">{{agency.additionalData.middle}}</span>
                    <span class="font-size-13px">ريال</span>
                  </p>
                </div>
              </div>
            </div>
            <!--عقاراتنا-->
            <div
              class="bg-white p-0 pb-2 hard-shadow hello mt-3 p-muk-md-1 p-muk-md-3"
              v-if="resultsCount > 0 && isFoundRealEstateSection()"
              id="agencyContainer"
            >
              <div class="d-flex align-items-center">
                <button
                  type="button"
                  style="position:absolute"
                  class="back_page background-blue text-white no-border"
                  @click="reset()"
                  v-show="!isLevelOne && (agency.type==1 || agency.type==15)"
                >

                  <i class="mx-icon-back"></i> الرجوع
                </button>
                <h1
                  style="flex:1"
                  class="title text-center text-blue font-weight-bold font-size-18px"
                >
                  {{$t(`agencyOfferName.${agency.type}`)}} <span>({{ totalCount }})</span>
                </h1>
              </div>
              <div class="header d-flex align-items-center">
                <div class="results">
                  <span>عدد النتائج :</span>
                  <span>{{ resultsCount }}</span>
                </div>

                <div class="mx-select sort mr-auto position-relative">
                  <span
                    class="font-weight-bold font-size-14px d-none d-muk-md-inline-block"
                    style="color:#707070"
                  >الترتيب حسب :</span
                  >
                  <select
                    class="form-sort"
                    v-model="sortSelected"
                    @change="onChangeSort()"
                  >

                    <option v-for="op in SortType[agency.type]" :value="op" >{{$t(`SortColumnFilter.${agency.type}.${op.sortCol}${op.sortDir}`)}}
                    </option>
<!--                    <optgroup v-if="agency.type == 1">-->
<!--                      <option :value="{sortCol :2,sortDir:2 }">الأحدث</option>-->
<!--                      <option :value="{sortCol :1,sortDir:1 }" >السعر ( الاقل )</option>-->
<!--                      <option :value="{sortCol :1,sortDir:2 }">السعر ( الاعلى )</option>-->

<!--                    </optgroup>-->
<!--                    <optgroup v-if="agency.type == 2">-->
<!--                      <option :value="{sortCol :2,sortDir:2 }">اكتمال المشروع</option>-->
<!--                      <option :value="{sortCol :1,sortDir:1 }" >السعر ( الاقل )</option>-->
<!--                      <option :value="{sortCol :1,sortDir:2 }">السعر ( الاعلى )</option>-->
<!--                    </optgroup>-->
<!--                    <optgroup v-if="agency.type == 3 ">-->
<!--                      <option :value="{sortCol :3,sortDir:1 }" >المساحة من الأدنى للأعلى</option>-->
<!--                      <option :value="{sortCol :4,sortDir:1 }">عدد الحمامات</option>-->
<!--                      <option :value="{sortCol :5,sortDir:1 }">عدد الغرف</option>-->
<!--                      <option :value="{sortCol :6,sortDir:1 }">عدد المشاهدات</option>-->
<!--                    </optgroup>-->
<!--                    <optgroup v-if="agency.type == 15">-->
<!--                      <option :value="{sortCol :2,sortDir:2 }">الأحدث</option>-->
<!--                    </optgroup>-->

                  </select>
                </div>
              </div>
              <mx-nav-filter-results
                :lg="3"
                :md="2"
                :list="filterResultsSampleData"
                class="real-estate-result-nav  mb-4"
                :centered="isLevelOne && agency.type === 1"
                :multiSelect="isLastLevel"
                @item-clicked="onClickStatistic"
              >
              </mx-nav-filter-results>
              <div class="container-muk">
                <div class="row" v-if="(agency.type === 1 || agency.type === 15)  && realEstatesSampleData">
                  <div
                    class="col-12 col-muk-md-12 col-muk-lg-12 p-0 p-muk-md-1"
                    :key="i"
                    v-for="(item, i) in realEstatesSampleData.page"
                    :offerItems="item"
                  >
                    <nuxt-link @click.self :to="'/real-estates/' + item.id" class="item-link">
                      <mx-card-realestate
                        :class="{ 'grid-view': $mq === 'mobile' }"
                        class=" mb-3"
                        :hasCallButtons="true"
                        :offerItems="item"
                      ></mx-card-realestate>
                    </nuxt-link>
                  </div>
                  <div
                    class="w-100 justify-content-center"
                    v-if="realEstatesSampleData.totalCount"
                  >
                    <b-pagination
                      class="w-100 justify-content-center"
                      v-model="realCurrentPage"
                      :total-rows="realEstatesSampleData.totalCount"
                      pills
                      :per-page="realEstatesSampleData.perPage"
                      @change="onChangePaginationReals"
                      next-class="btn-pagination"
                      prev-text="السابق"
                      next-text="التالي"
                      prev-class="btn-pagination"
                      last-class="last-page"
                      first-class="first-page"
                    >
                      <template v-slot:prev-text
                      ><span>
                          <i class="mx-icon-chevron-right"></i>السابق</span
                      ></template
                      >
                      <template v-slot:next-text
                      ><span> التالي <i class="mx-icon-chevron-left"> </i></span
                      ></template>
                    </b-pagination>
                  </div>
                </div>
                <div class="row" v-if="agency.type === 3 && plansSampleData">
                  <div
                    class="col-12 col-muk-md-12 col-muk-lg-12 p-1"
                    :key="i"
                    v-for="(item, i) in plansSampleData.page"
                    :offerItems="item"
                  >
                    <nuxt-link :to="'/plans/' + item.id" class="item-link">
                      <mx-card-plan
                        :plan="item"
                        class="list-view mb-3"
                        @item-clicked="AddFavorite"
                      ></mx-card-plan>
                    </nuxt-link>
                  </div>
                  <div
                    class="w-100 justify-content-center"
                    v-if="plansSampleData.totalCount"
                  >
                    <b-pagination
                      class="w-100 justify-content-center"
                      v-model="realCurrentPage"
                      :total-rows="plansSampleData.totalCount"
                      pills
                      :per-page="plansSampleData.perPage"
                      @change="onChangePaginationPlans"
                      next-class="btn-pagination"
                      prev-text="السابق"
                      next-text="التالي"
                      prev-class="btn-pagination"
                      last-class="last-page"
                      first-class="first-page"
                    >
                      <template v-slot:prev-text
                      ><span>
                          <i class="mx-icon-chevron-right"></i>السابق</span
                      ></template
                      >
                      <template v-slot:next-text
                      ><span> التالي <i class="mx-icon-chevron-left"> </i></span
                      ></template>
                    </b-pagination>
                  </div>
                </div>
                <div class="row" v-if="agency.type === 2 && realEstatesDevSampleData" >
                  <div
                    class="col-12 col-muk-md-12 col-muk-lg-12 p-1"
                    :key="i"
                    v-for="(item, i) in realEstatesDevSampleData.page"
                    :offerItems="item"
                  >
                    <nuxt-link :to="'/projects/' + item.id" class="item-link">
                      <mx-card-project
                        :project="item"
                        :class="{
                          'grid-view': $mq === 'tablet' || $mq === 'mobile'
                        }"
                      >
                      </mx-card-project>
                    </nuxt-link>
                  </div>
                  <div
                    class="w-100 justify-content-center"
                    v-if="realEstatesDevSampleData.totalCount"
                  >
                    <b-pagination
                      class="w-100 justify-content-center"
                      v-model="devCurrentPage"
                      :total-rows="realEstatesDevSampleData.totalCount"
                      pills
                      :per-page="realEstatesDevSampleData.perPage"
                      @change="onChangePaginationDevs"
                      next-class="btn-pagination"
                      prev-text="السابق"
                      next-text="التالي"
                      prev-class="btn-pagination"
                      last-class="last-page"
                      first-class="first-page"
                    >
                      <template v-slot:prev-text
                      ><span>
                          <i class="mx-icon-chevron-right"></i>السابق</span
                      ></template
                      >
                      <template v-slot:next-text
                      ><span> التالي <i class="mx-icon-chevron-left"> </i></span
                      ></template>
                    </b-pagination>
                  </div>
                </div>
              </div>
            </div>


            <!-- End The Thired Section Right Image -->
          </div>
          <div class="col-muk-md-4 mt-muk-md-3 mt-0 custom-padding">
            <div class="agent_box d-none d-muk-md-block">
              <h4 class="my-2 font-size-18px text-blue pb-3">تواصل معنا</h4>
              <div class="ml-3 mr-3">
                <button
                  type="button"
                  @click="updateStatistic(StatisticsEnum.PhoneCount)"
                  class="d-flex align-items-center btn com-btn btn-block font-size-16px rounded-0 mb-3 text-4 text-left border-0 hard-shadow call-btn btn-primary"
                  href="#formModalCallOffice"
                  data-toggle="modal"
                  data-target="#formModalCallOffice"
                >
                  <i class="mx-icon-phone ml-4 ml-muk-lg-2 font-size-24px"></i> إتصل بنا الان
                </button>
                <button
                  type="button"
                  class="d-flex align-items-center btn com-btn btn-block rounded-0 mb-3 font-size-16px text-4 text-left border-0 hard-shadow call-btn btn-primary"
                  href="#modalProject"
                  data-toggle="modal"
                  data-target="#modalProject"
                >
                  <i class="mx-icon-envelope ml-4 ml-muk-lg-2 font-size-24px"></i> راسلنا
                  الان
                </button>
                <button
                  type="button"
                  class="d-flex align-items-center btn com-btn btn-block rounded-0 mb-3 text-4 font-size-16px text-left border-0 hard-shadow call-btn btn-primary"
                  v-b-modal.props_popup
                >
                  <i class="mx-icon-search-map-marker ml-4 ml-muk-lg-2 font-size-24px"></i>
                  المكتب الرئيسي و الفروع
                </button>
              </div>
            </div>
              <div
                v-if="!hideSocialSection()"
                class="add_shadow bg_white mb-2 mt-2 followus_box_office_show d-none d-muk-md-block "
              >
                <h4 class="text-center font-size-18px text-blue mb-1">
                  تابعنا عبر
                </h4>
                <div class="text-center social_links">
                  <a
                    v-if="agency.contact.website"
                    class="site_link"
                    :href="agency.contact.website"
                    target="_blank"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="الموقع الالكتروني"
                  ><img src="@/assets/images/website_icon.png"
                  /></a>
                  <a
                    class="youtube_link"
                    v-if="agency.contact.yotube"
                    :href="agency.contact.yotube"
                    target="_blank"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="يوتيوب"
                  ><i class="mx-icon-youtube"></i
                  ></a>
                  <a
                    class="snapshat_link"
                    v-if="agency.contact.snapchat"
                    :href="agency.contact.snapchat"
                    target="_blank"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="سناب شات"
                  ><i class="mx-icon-snapchat"></i
                  ></a>

                  <a
                    class="instagram_link"
                    v-if="agency.contact.instagram"
                    :href="agency.contact.instagram"
                    target="_blank"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="انستغرام"
                  >
                    <img src="@/assets/images/instagram_icon.png" width="35"/>
                  </a>
                  <a
                    class="twitter_link"
                    v-if="agency.contact.twitter"
                    :href="agency.contact.twitter"
                    target="_blank"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="تويتر"
                  ><i class="mx-icon-twitter"></i
                  ></a>

                  <a
                    class="facebook_link"
                    v-if="agency.contact.facebook"
                    :href="agency.contact.facebook"
                    target="_blank"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="فيس بوك"
                  ><i class="mx-icon-facebook"></i
                  ></a>
                </div>
              </div>
          </div>
          <!-- Start The latest section -->

          <!--عملائنا-->
          <div
            class="container-fluid custom-padding"
            v-if="dynamicContentMainFooterContains(100)"
          >
            <div class="row">
              <div class="col-12 custom-padding">
                <div
                  style="max-height: 165px"
                  class="bg-white hard-shadow mt-3 pb-1 slider_box_office_show office_clients"
                >
                  <p
                    class="text-center  info_box_title  slider_title_office_show"
                  >
                    عملاؤنا
                  </p>
                  <hooper
                    class="customers-slider"
                    style="padding: 0 15px;"
                    :settings="hooperClients"
                    :rtl="true"
                  >
                    <CustomSlide
                      :key="index"
                      style="margin-left: 10px;width: 165px"
                      v-for="(item, index) in agency.dynamicData[
                        agency.dynamicData
                          .map(function(e) {
                            return e.order;
                          })
                          .indexOf(100)
                      ].images"
                    >
                      <mx-img class="rounded" :img-src="item.path" ratio="3/2" alt="'agency.title'" max-size="sd"
                              :errorImageUrl="$vDefaultRealEstateImg"></mx-img>
                    </CustomSlide>
                    <hooper-navigation
                      slot="hooper-addons"
                      v-if="
                        ($mq == 'mobile' &&
                          agency.dynamicData[
                            agency.dynamicData
                              .map(function(e) {
                                return e.order;
                              })
                              .indexOf(100)
                          ].images.length > 2) ||
                          ($mq !== 'mobile' &&
                            agency.dynamicData[
                              agency.dynamicData
                                .map(function(e) {
                                  return e.order;
                                })
                                .indexOf(100)
                            ].images.length > 7)
                      "
                    >
                      <img
                        slot="hooper-next"
                        src="~@/assets/images/photo_slide_right.png"
                        alt="no-photo"
                      />

                      <img
                        slot="hooper-prev"
                        src="~@/assets/images/photo_slide_left.png"
                        alt="no-photo"
                      />
                    </hooper-navigation>
                  </hooper>
                </div>
              </div>
            </div>
          </div>
          <!-- End The latest section -->
        </div>
      </div>
      <!-- End Office Show -->
    </div>

    <!-- Photo Modal-->
    <div
      aria-hidden="true"
      aria-labelledby="myLargeModalLabel"
      class="modal fade bd-example-modal-lg props_popup"
      hide-footer="true"
      hide-header="true"
      id="props_popup"
      modal-class="props_popup"
      role="dialog"
      tabindex="-1"
    >
      <div class="modal-dialog modal-lg modal-dialog-mobile">
        <div class="modal-content modal-content-mobile">
          <div class="modal-header align-items-center">
            <h5 class="modal-title" id="myTab">
              <ul class="nav nav-tabs d-flex align-items-center" role="tablist">
                <li class="nav-item">
                  <h3
                    aria-controls="photos"
                    aria-selected="true"
                    data-toggle="tab"
                    class="text-black font-size-11px"
                    id="photos-tab"
                    role="tab"
                  >
                    معرض الصور
                  </h3>
                </li>
              </ul>
            </h5>
            <button
              aria-label="Close"
              class="close text-blue"
              data-dismiss="modal"
              type="button"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div
            class="modal-body p-0"
            v-if="dynamicContentMainFooterContains(0)"
          >
            <div class="tab-content  p-0">
              <div
                aria-labelledby="projectPhotos-tab"
                class="tab-pane  container-fluid active"
                id="projectPhotos"
                role="tabpanel"
              >
                <div class="row gallery-box carousel slide" id="myCarousel">
                  <div class="col-muk-12 col-muk-md-4 control-section">
                    <div class="carousel-indicators-container">
                      <ul
                        class="d-flex carousel-indicators flex-wrap thumbnails-list p-3"
                      >
                        <li
                          :class="{ active: index === 0 }"
                          :key="index"
                          class="thumbnail-item"
                          v-for="(item, index) in agency.dynamicData[
                            agency.dynamicData
                              .map(function(e) {
                                return e.order;
                              })
                              .indexOf(0)
                          ].images"
                        >
                          <a
                            :data-slide-to="index"
                            :id="'carousel-selector-' + index"
                            class="selected"
                            data-target="#myCarousel"
                          >
                            <mx-img :img-src="item.path" ratio="3/2" alt="agency.name" max-size="sd"
                                    :errorImageUrl="$vDefaultRealEstateImg"></mx-img>
                          </a>
                        </li>
                      </ul>
                      <div
                        class="slider-arrow indicators-controls to-top"
                        @click="scrollSlideChange('top')"
                        v-if="($mq!=='tablet' &&
                            agency.dynamicData[
                            agency.dynamicData
                              .map(function(e) {
                                return e.order;
                              })
                              .indexOf(0)
                          ].images.length > 8)
                          ||
                          ($mq==='tablet' &&
                            agency.dynamicData[
                            agency.dynamicData
                              .map(function(e) {
                                return e.order;
                              })
                              .indexOf(0)
                          ].images.length > 2
                          )"
                      >
                        <i class="mx-icon-chevron-up font-size-20px"></i>
                      </div>
                      <div
                        class="slider-arrow indicators-controls to-bottom"
                        @click="scrollSlideChange('bottom')"
                        v-if="($mq!=='tablet' &&
                            agency.dynamicData[
                            agency.dynamicData
                              .map(function(e) {
                                return e.order;
                              })
                              .indexOf(0)
                          ].images.length > 8)
                          ||
                          ($mq==='tablet' &&
                            agency.dynamicData[
                            agency.dynamicData
                              .map(function(e) {
                                return e.order;
                              })
                              .indexOf(0)
                          ].images.length > 2
                          )"
                      >
                        <i class="mx-icon-chevron-down font-size-20px"></i>
                      </div>
                    </div>
                  </div>
                  <div class="col-muk-12 col-muk-md-8 photo-section carousel-inner p-3">
                    <div
                      :class="{ active: index === 0 }"
                      :data-slide-number="index"
                      :key="index"
                      class="carousel-item"
                      v-for="(item, index) in agency.dynamicData[
                        agency.dynamicData
                          .map(function(e) {
                            return e.order;
                          })
                          .indexOf(0)
                      ].images"
                    >
                      <mx-img :img-src="item.path" ratio="3/2" :alt="'agency.name'"
                              :errorImageUrl="$vDefaultRealEstateImg"></mx-img>

                    </div>
                    <a
                      class="carousel-control-prev"
                      data-slide="next"
                      href="#myCarousel"
                      role="button"
                    >
                      <i
                        class="circle-icon mx-icon-circle-chevron-left icon-with-circle"
                        aria-hidden="true"
                      ></i>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a
                      class="carousel-control-next"
                      data-slide="prev"
                      href="#myCarousel"
                      role="button"
                    >
                      <i
                        class="circle-icon mx-icon-circle-chevron-right icon-with-circle"
                        aria-hidden="true"
                      ></i>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Photo Modal-->

    <!-- Branches Modal -->
    <mx-modal-props-popup :agency-id="agencyId" :offer="agency" :currentTab="'tab-branches'" ></mx-modal-props-popup>

    <!-- Office Modal-->

    <!-- Start The modal Send us -->
    <mx-modal-contacts-card
      :offer22="agency"
      :isMessage="true"
      :agencyType="true"
    ></mx-modal-contacts-card>
    <!-- End The modal Send us -->

    <!--modalProject isn't used-->
    <mx-modal-contacts-card :offer22="agency" :isCall="true" :agencyType="true">
    </mx-modal-contacts-card>
    <!-- End The modal call us office -->

    <!-- Start The Fivth Modal For The Fivth Bottom if There is any problem -->
    <div
      aria-hidden="true"
      aria-labelledby="formModalLabel"
      class="modal fade"
      id="modalShare"
      role="dialog"
      tabindex="-1"
    >
      <div class="modal-dialog basic-modal modalProject">
        <!--modalProject isn't used-->
        <div class="modal-content">
          <button
            aria-hidden="true"
            class="close position-absolute left-8 top-8"
            data-dismiss="modal"
            style="z-index: 2;"
            type="button"
          >
            ×
          </button>
          <div class="modal-body">
            <div class="project-details">
              <div class="text-center">
                <p class="title mb-2 text-3 text-center font-weight-bold">
                  مشاركة معلومات الوكيل
                </p>
                <div class="row mt-2">
                  <div class="col-muk-lg-2"></div>
                  <div class="col-muk-lg-8">
                    <img
                      alt="Project Image"
                      class="img-fluid rounded  "
                      src="~@/assets/images/slider/4.jpg"
                    />
                  </div>
                  <div class="col-muk-lg-2"></div>
                </div>
                <div class="details">
                  <h6
                    class="project-title  font-weight-bold text-secondary  my-1 text-2  "
                  >
                    {{ agency.name }}
                  </h6>
                  <ul
                    class="location text-blue my-0 text-1 d-flex justify-content-center"
                  >
                    <li
                      :key="index"
                      v-for="(item, index) in listAddress(agency.address)"
                    >
                      {{ item }}
                    </li>
                  </ul>
                  <p class="mb-0 text-1 main-font color-gry-blue">
                    فلل - شقق - محلات تجارية
                  </p>
                </div>
              </div>
            </div>
            <ValidationObserver v-slot="{ handleSubmit }">
              <form
                @submit.prevent="handleSubmit(inviteForm)"
                id="demo-form"
                novalidate="novalidate"
              >
                <div class="container-fluid align-items-center mb-0">
                  <div class="row">
                    <div class="col-12 p-only-sm-0 mt-0 mb-2">
                      <ValidationProvider
                        name="message"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <textarea
                          v-model="form.friendNote"
                          class="form-control text-1"
                          data-msg-required="Please enter your message."
                          maxlength="5000"
                          name="message"
                          placeholder="اكتب الرسالة"
                          required=""
                          rows="3"
                        >
مرحبا , لقد وجدت هذا العقار على موقع مكتمل .  أرجو أن تتحقق منه و تخبرني برأيك فيه</textarea
                        >
                        <div class="form-group">
                          <div class="validation-message">
                            <span>{{ errors[0] }}</span>
                          </div>
                        </div>
                      </ValidationProvider>
                    </div>

                    <div class="col-muk-md-12 form-group">
                      <ValidationProvider
                        name="name"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <input
                          v-model="form.name"
                          class="form-control  text-2"
                          name="name"
                          placeholder="إسمك"
                          required
                          type="text"
                        />
                        <div class="validation-message ">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>

                    <div class="col-muk-md-6 pl-muk-md-1 form-group">
                      <ValidationProvider
                        name="yourMail"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <input
                          v-model="form.email"
                          class="rounded-sm form-control text-2"
                          name="yourMail"
                          placeholder="بريدك الالكتروني"
                          type="email"
                        />
                        <div class="validation-message ">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>

                    <div class="col-muk-md-6 pr-muk-md-1 form-group">
                      <ValidationProvider
                        name="friendMail"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <input
                          v-model="form.friendEmail"
                          class="form-control  text-2"
                          name="friendMail"
                          placeholder="بريد صديقك الالكرتوني"
                          type="email"
                        />
                        <div class="validation-message ">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>

                  <div class="footer d-flex justify-content-end mt-0">
                    <button
                      type="submit"
                      class="btn btn-secondary background-blue btn-modern btn-sm px-4 text-1"
                      id="button"
                      name="button"
                    >
                      إرسال
                    </button>
                  </div>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
    <!-- End The Fivth Modal For The Fivth Bottom if There is any problem -->
  </section>
</template>
<script src="./agency.js"></script>
<style src="./agency.scss" scoped lang="scss"></style>
