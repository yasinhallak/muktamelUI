<template>
  <section class="agencies py-2 py-sm-0" >
    <section class="selectors">
      <div class="container" >
        <div class="row group py-2 nav-main " id="agenciesContainer">
          <div class="col-md-3 col-6 ">
            <select class="form-control custom-select text-3 px-2 " v-model="form.type" id="office" name="office">
              <option value="1">المكاتب العقارية</option>
              <option value="2">المطورون العقاريون</option>
              <option value="15">المزادات العقارية</option>
              <option value="3">المكاتب الهندسية</option>
              <option value="7">المقاولون العقاريون</option>
              <option value="6">المقيمون العقاريون</option>
              <option value="14">التنظيف والصيانة والنقل</option>
              <option value="5">المصورون العقاريون</option>
            </select>
          </div>
          <div class="col-md-3 col-6">
            <v-select class="v-selector"
                      dir="rtl"
                      v-model="selected"
                      :class="{'has-value' : !selected}"
                      placeholder="أدخل اسم المدينة او الشركة"
                      :no-drop="svalue.length < 1"
                      label="name"
                      :filterable="false"
                      @search="onSearch"
                      :options="filterdOptions" :selectable="option => !option.hasOwnProperty('group')">
              <template #option="{ group, name,path }">
                <div v-if="group" class="group">
                  {{ group }}
                </div>
                <div class="px-4">{{ name }}{{path}}</div>
              </template>
            </v-select>
          </div>
        </div>
      </div>
    </section>
    <div class="container" v-if="agencies && agencies.totalCount===0">
      <!--No results section-->
      <div class="m-2 m-sm-0 py-2">
        <div style="border: solid 1px #70707080;
                    color:#001324;background: #F5F5F5"
             class="col-12 font-size-14px pb-3 pt-3 pb-sm-1 pt-sm-1">
          <h1 class="font-size-16px font-weight-bold">لا يوجد شركات مطابقة لبحثك</h1>
          <p class="m-0 pb-2" style="color: #001324">قم بأحد الإجراءات التالية :</p>
          <ul style="list-style: inside">
            <li style="line-height: 30px">تغيير الموقع </li>
            <li style="line-height: 30px"><a href="#" @click.prevent="reset()" style="color: #0089FE">إزالة محددات البحث</a> </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container">


      <!-- imported from Html Compontents -->
      <div class="total-table" v-if="agencies && agencies.totalCount!=0">

        <div class="mt-1 page_resault_bar row">
          <div class="  d-flex justify-content-between align-items-center col-12">
            <div class="d-flex">
              <span class="mx-0 text-1">{{agencies.totalCount}} نتيجة</span>
            </div>
            <div class="d-flex   justify-content-between align-items-center">
              <label for="inputState" class="text-1 text-nowrap   mb-0 ml-1 ">الترتيب حسب</label>
              <select id="inputState"
                      class="sort_items_list form-control custom-select my-1 mr-sm-2 custom-select-sm bg-transparent text-1 pl-5"
                      v-model="form.sortColumn" @change="onChangeSort()">
                <option v-for="op in SortType[form.type]" :value="op" selected>{{$t(`sortColumn.${op}`)}}
                </option>
              </select>
            </div>
          </div>
        </div>
        <!-- End the sort selection -->
        <!-- Start Statistecs Table -->
        <!--  -->
        <div class="table rounded-lg mt-1 mb-0 py-0 filter_box" v-if="agencies.data.length != 0">
          <div class="container-fluid py-2">
            <div class="row">
              <div class="col-10 col-sm-11 ">
                <div class="  row resultTable @@changeable" id="resultTable">

                  <!-- class="col-6 col-sm-4 col-md-3 col-lg-2" -->
                  <!-- This partial requir an {"class":""} -->
                  <div class="col-6 col-sm-4 col-md-3 col-lg-2 px-2 compact-list" v-for="item in agencies.data">
                    <a href="" @click.prevent="onClickStatistics(item)"
                       class="dist d-flex justify-content-between px-2 py-1">
                    <span class="name">
                      {{ $t(`${item.type}.${item.id}`) }}
                    </span>
                      <span class="number">{{item.count}}
                    </span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-2 col-sm-1">
                <div class="more-less">
                  <i class="fas mx-icon-double-chevron-down"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End Statistecs Table -->
      </div>
      <!-- Start the result Table -->

      <div class="all-kind" v-if="agencies">
        <!-- Start Real_estate_offices -->
        <div class="real_estate_offices basic position-relative">
          <!--cards row-->
          <mx-spinner v-if="spinner" class="spinner-layout"></mx-spinner>
          <div class="row">
<!--            <div class="loader-layout" v-if="spinner">-->
<!--              <mx-spinner ></mx-spinner>-->
<!--            </div>-->

            <div class="card-container justify-content-center justify-content-sm-start d-flex flex-wrap "
                >
              <!--cards-->
              <div class="new-card" v-for="agency in agencies.page">
                <nuxt-link :to="'/agencies/' + agency.id">
                  <div class="card text-center rounded-0 border-0 h-100"  :class="{'card-eng': agency.type == AgencyType.auction || agency.type == AgencyType.engineering || agency.type == AgencyType.estatedev}">
                    <mx-img :img-src="agency.logo"
                            ratio="3/2"
                            alt="..."
                            :noResponsive="true"
                            :errorImageUrl="$vDefaultAgencyImg">

                    </mx-img>
                    <div class="card-body pt-0 px-1 pb-1"
                         v-if="agency.type==AgencyType.realestate || agency.type== AgencyType.financing ">
                      <h5 class="card-title mb-0">{{agency.name}}</h5>
                      <div class="card-text" v-if="agency.offersAddresses && agency.offersAddresses.length!=0">
                        <p class="title mb-0 text-secondary"> مناطق الإختصاص </p>
                        <div class="special " data-toggle="tooltip" data-placement="bottom" title="">
                          <ul class="location d-flex flex-wrap justify-content-center">
                            <li v-for="city in agency.offersAddresses.slice(0, 14)">{{ $t(`city.${city}`) }}</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div class="card-body pt-0 px-1 pb-1"
                         v-if="agency.type!=AgencyType.realestate &&agency.type!= AgencyType.financing ">
                      <h5 class="card-title  mb-0">{{agency.name}}</h5>
                      <div class="card-text">
                        <p class="title mb-0 text-secondary">المكتب الرئيسي</p>
                        <div class="special">
                          <div class=" mb-0  font-size-10px ">
                            <span> {{ $t(`city.${agency.address.city}`) }} </span>
                            <span v-if="agency.address.district">{{$t(`district.${agency.address.district}`)}}</span>
                          </div>
                          <div class="mb-0 mt-1">
                            <strong v-if="agency.branchesAddresses.length!=0"> الفروع :</strong>
                          <strong v-if="agency.branchesAddresses.length==0"> لا يوجد فروع</strong>
                            <ul class="location d-flex flex-wrap justify-content-center">
                              <li v-for="branch in agency.branchesAddresses.slice(0,14)">{{$t(`city.${branch}`)}}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card-footer py-0 bg-white" v-if="agency.type==AgencyType.realestate">
                      <div class=" row">
                        <div class="col-4 p-0 d-flex align-items-center justify-content-center">
                          <ul class="list-unstyled mb-0 special">
                            <li class="name"><span>للبيع</span></li>
                            <li class="number"><span>{{agency.sellCount}}</span></li>
                          </ul>
                        </div>
                        <div class="col-4 p-0 d-flex align-items-center justify-content-center">
                          <ul class="list-unstyled mb-0 special">
                            <li class="name"><span>للإيجار</span></li>
                            <li class="number"><span>{{agency.rentCount}}</span></li>
                          </ul>
                        </div>
                        <div class="col-4 p-0 d-flex align-items-center justify-content-center">
                          <ul class="list-unstyled mb-0 special">
                            <li class="name"><span>تجاري</span></li>
                            <li class="number"><span>{{agency.commercialCount}}</span></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="card-footer py-0 bg-white"
                         v-if="agency.type == AgencyType.auction || agency.type == AgencyType.engineering || agency.type == AgencyType.estatedev  ">
                      <div class="row">
                        <div class="col-12  plan_count d-flex align-items-center justify-content-center">
                          <h5 class="mb-0 font-weight-normal text-2"> {{$t(`footerCard.${agency.type}`)}}
                            : <span class="font-weight-bold">{{agency.publishedOfferCount ==null ? 0 :agency.publishedOfferCount}}</span></h5>
                        </div>
                      </div>
                    </div>
                    <div class="card-footer py-0 bg-white" v-if="agency.type==AgencyType.photography">
                      <div class="row">
                        <div class="col-4 p-0 d-flex align-items-center justify-content-center" v-for="item in agency.activities" >
                          <ul class="list-unstyled mb-0 special">
                            <li class="name"><i class="mx-icon-camera text-5 mt-1 color-gry-blue"></i>
                            </li>
                            <li class="number mt-minus"><span class="text-1 font-weight-normal ">{{$t(`activityType.${item.type}.${item.activityId}`)}}</span></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </nuxt-link>
              </div>
            </div>
          </div>
          <!-- End the page body -->
        </div>
      </div>
      <!---start pagination -->
      <template v-if="agencies && agencies.totalCount>3">
        <b-pagination  class="justify-content-center my-2" v-model="currentPage" :total-rows="agencies.totalCount" pills
                      first-number last-number :per-page="agencies.perPage" @change="onChangePagination" next-class="btn-pagination"
                      prev-text="السابق" next-text="التالي" prev-class="btn-pagination" last-class="last-page"
                      first-class="first-page">
          <template v-slot:prev-text><span> <i class="mx-icon-chevron-right-light"></i>السابق</span></template>
          <template v-slot:next-text><span> التالي <i class="mx-icon-chevron-left-light"> </i></span></template>
        </b-pagination>

      </template>
      <!---end pagination -->
    </div>

  </section>

</template>
<script src="./agencies.js"></script>
<style src="./agencies.scss"  lang="scss"></style>

