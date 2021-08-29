<template>
  <section class="plans" id="plansContainer">
    <mx-nav-filter >
        <mx-form-multi-select label="أنواع المخططات"
                              :list="listTypes"
                              :checkValue.sync="form.HasExt"
                              :listSelected.sync="form.Types"
                              @data-changed="checkListChange"
                              checkLabel="يحتوي على ملحق علوي">
        </mx-form-multi-select>

        <mx-form-select-street @data-changed="landInfoChanged" ref="landStreets" :width="width" :length="length">
        </mx-form-select-street>
        <li id="more-btn-container" class="dropdown__Props __More" >
              <button ref="morePlanFilter" id="morePlanFilter" class="btn btn-primary btn-more _custom font-size-13px font-weight-bold">أكثر</button>
          <b-popover target="morePlanFilter"
                     placement="bottomleft"
                     offset="10"
                     container="more-btn-container"
                     triggers="click blur"
          >
            <ul class="Prop__More__Menu  dropdown__Menu__Props py-2 px-1 " >
              <div class="accordion accordion-modern without-bg px-1 py-1">
                <div class="Prop__Details__Container">
                  <div class="card card-default border-0 Prop__Details__Info">
                    <div class="card-header p-1">
                      <h4 class="card-title m-0">
                        <div class="Prop__Data accordion-toggle collapsed" href="#Prop__Details__Collapse"
                             aria-expanded="false">
                          <div class="text-center">
                            <h5 class="Prop__Details mb-0 font-size-14px font-weight-bold">البحث بتفاصيل أكثر</h5>
                          </div>
                          <hr class="mb-1 mt-2" />
                        </div>
                      </h4>
                    </div>
                    <div id="Prop__Details__Collapse" class="coll">
                      <div class="card-body px-0 py-1">
                        <div class="container-fluid">
                          <div style="margin-right: -15px" class="row align-items-center Prop__Area">
                            <div class="col-4 d-flex px-1">
                              <label class="mb-0 font-size-12px">مساحة البناء</label>
                            </div>
                            <div class="col-4 d-flex px-1">
                              <select id="Prop__Area__Down" v-model="form.BuildingAreaFrom"
                                      class="Prop__Area__Down py-0 px-2 form-control font-size-12px custom-select custom-select-sm">
                                <option value="" selected>ادنى</option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                                <option value="300">300</option>
                                <option value="400">400</option>
                                <option value="500">500</option>
                                <option value="750">750</option>
                                <option value="1000">1000</option>
                                <option value="1500">1500</option>
                                <option value="2000">2000</option>
                                <option value="2500">2500</option>
                                <option value="3000">3000</option>
                              </select>
                            </div>
                            <div class="col-4 d-flex px-1">
                              <select id="Prop__Area__Up" v-model="form.BuildingAreaTo"
                                      class="Prop__Area__Up py-0 px-2 form-control font-size-12px custom-select custom-select-sm">
                                <option value="" selected>اعلى</option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                                <option value="300">300</option>
                                <option value="400">400</option>
                                <option value="500">500</option>
                                <option value="750">750</option>
                                <option value="1000">1000</option>
                                <option value="1500">1500</option>
                                <option value="2000">2000</option>
                                <option value="2500">2500</option>
                                <option value="3000">3000</option>
                              </select>
                            </div>
                          </div>
                          <div class="row align-items-center Streets__Around my-2">
                            <div class="col-4 d-flex px-1">
                              <label class="mb-0 font-size-12px">عدد الغرف</label>
                            </div>
                            <div class="col-4 d-flex px-1">
                              <select v-model="form.RoomsCountFrom"
                                      class="Streets__Around__Down py-0 px-2 form-control font-size-12px custom-select custom-select-sm">
                                <option value="" selected>ادنى</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="7">7</option>
                              </select>
                            </div>
                            <div class="col-4 d-flex px-1">
                              <select v-model="form.RoomsCountTo"
                                      class="Streets__Around__Up py-0 px-2 form-control font-size-12px custom-select custom-select-sm">
                                <option value="" selected>اعلى</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="7">7</option>
                              </select>
                            </div>
                          </div>
                          <div class="row align-items-center Streets__Around my-2">
                            <div class="col-4 d-flex px-1">
                              <label class="mb-0 font-size-12px">عدد الحمامات</label>
                            </div>
                            <div class="col-4 d-flex px-1">
                              <select v-model="form.BathroomsCountFrom"
                                      class="Streets__Around__Down py-0 px-2 form-control font-size-12px custom-select custom-select-sm">
                                <option value="" selected>ادنى</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="7">7</option>
                              </select>
                            </div>
                            <div class="col-4 d-flex px-1">
                              <select v-model="form.BathroomsCountTo"
                                      class="Streets__Around__Up py-0 px-2 form-control font-size-12px custom-select custom-select-sm">
                                <option value="" selected>اعلى</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="7">7</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="Prop__Search__Container">
                  <div class="Search__In__Details">
                    <h5 class="mb-1 font-weight-bold font-size-16px font-weight-bold">بحث باسم المكتب المصمم</h5>
                    <hr class="mb-3 mt-0" />
                    <div class="search-input">
                      <input type="text" v-model="form.AgencyName" name="Search__Details" id="Search__Details"
                             class="form-control Search__Details" />
                      <i class="mx-icon-magnifier"></i>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-between align-items-center w-100 mt-2">
                  <button type="button" class="btn btn-filter btn-reset my-1 px-2" @click="form.ClearMoreSection()">إعادة
                    تعيين</button>
                  <button type="button" @click="toggleView = !toggleView" class="btn btn-apply my-1 px-2">تطبيق</button>
                </div>
              </div>
            </ul>
          </b-popover>
          <!--  -->

        </li>
    </mx-nav-filter>


    <!--No results section-->
    <div style="height: calc(100vh - 426px);"
         class="container no-result-section"
         v-if="plans &&  plans.totalCount==0">
      <div style="border: solid 1px #70707080;
                        color:#001324;background: #F5F5F5"
           class="col-12 font-size-14px pb-3 pt-3 pb-sm-1 pt-sm-1">
        <h1 class="font-size-16px font-weight-bold">لا يوجد مخططات هندسية مطابقة لبحثك</h1>
        <p class="m-0 pb-2" style="color: #001324">قم بأحد الإجراءات التالية :</p>
        <ul style="list-style: inside">
          <li style="line-height: 30px">تغيير الموقع</li>
          <li style="line-height: 30px"><a href="#" @click.prevent="resetForm" style="color: #0089FE">إزالة محددات البحث</a> </li>
        </ul>
      </div>
    </div>

    <div class="container mb-3" v-if="plans.totalCount" >

      <div class="mt-1 page_resault_bar row">
        <div class="  d-flex justify-content-between align-items-center col-12">
          <div class="d-flex">
            <span class="mx-0 text-1 font-size-1 4px">{{plans.totalCount}} نتيجة</span>
          </div>
          <div class="d-flex   justify-content-between align-items-center">
            <label for="inputState" class="text-1 text-nowrap   mb-0 ml-1 ">الترتيب حسب</label>
            <select id="inputState" v-model="sortSelected" @change="onChangeSort"
                    class="sort_items_list form-control custom-select my-1 mr-sm-2 pr-2 custom-select-sm bg-transparent text-1">
              <option v-for="op in SortType[$AgencyType.engineering]" :value="op">{{$t(`SortColumnFilter.3.${op.sortCol}${op.sortDir}`)}}
              </option>
            </select>
          </div>
        </div>
      </div>
      <mx-nav-filter-results class="plan-filter-results" :width="230" v-model="form.Types" :multiSelect="true" :list="navStatitics" ></mx-nav-filter-results>
    </div>
    <div class="container position-relative" v-if="plans" :style="spinner? 'min-height:600px':''">
         <!--<div class="spinner-layout" v-show="spinner"></div>-->
      <mx-spinner v-if="spinner" class="spinner-layout"></mx-spinner>
      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-12" v-for="plan in plans.page">
          <nuxt-link :to="'/plans/'+plan.id" class="item-link">
            <mx-card-plan :plan="plan" class="grid-view without-contact mb-3"></mx-card-plan>
          </nuxt-link>
        </div>
      </div>
    </div>

    <template v-if="plans.totalCount">
      <b-pagination
        class="w-100 py-2 justify-content-center"
        v-model="currentPage"
        :total-rows="plans.totalCount"
        pills
        :per-page="plans.perPage"
        @change="onChangePagination"
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


    </template>
  </section>

</template>
<script src="./plans.js"></script>
<style src="./plans.scss" scoped lang="scss">

</style>


