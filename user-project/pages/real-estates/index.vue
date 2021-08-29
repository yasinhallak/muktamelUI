<template>
  <section :class="toggleMap?'toggled-map':''" class="projects-page realestate-page toggled">
    <!--Nav Bar-->
    <div class="nav-filter d-flex align-items-center "  >
      <div class="d-flex flex-wrap w-100">
        <!--Address input-->
        <style>
          .vs__dropdown-menu{
            max-height: 270px !important;
          }
        </style>
          <v-select class="nav-filter-input first-input selectors"
                    :class="{'has-value' : !form.addressId}"
                    dir="rtl"
                     placeholder="المنطقة او المدينة أو الحي"
                    :filterable="false"
                    v-model.number="form.addressId"
                    @input="onSelectAddress"
                    @search="onSearchAddress"
                    :reduce="option=> option.id"
                    :options="searchBoxAddress.filterdOptions" :no-drop="searchBoxAddress.svalue.length < 1"
                    label="name">
            <template #option="{ name,path }">
              <div class="px-4">{{ name }}{{ path }}</div>
            </template>
            <template #selected-option-container="{ option,  disabled }">
              <div v-if="option.name" class="vs__selected">
                <span class="mx-selected-item ">{{ getAddressName(option.id || option.name) }}</span>
              </div>
            </template>
          </v-select>

        <!--Deal Type Input-->
          <mx-form-select-deal-type class="nav-filter-input second-input" :rent-type-selected.sync="form.rentType" totalCount="realestates.totalCount"
                                    :sale-type-selected.sync="form.saleType" :deal-type-selected.sync="form.dealType" >
          </mx-form-select-deal-type>

        <!--Offer Type Input-->
          <mx-form-select-multi-column class="nav-filter-input third-input" rightTitle="سكني" leftTitle="تجاري"
                                       :leftSelected.sync="form.commertialRealstateType" :rightSelected.sync="form.residentialRealstateType"
                                       :leftList="sampleListCommercial" :rightList="sampleListResidence" title="نوع العقار" refName="realestateType">
          </mx-form-select-multi-column>

        <!--Price Input-->
          <mx-form-select-range v-if="form.dealType != dealType.auction "
                                class="nav-filter-input fourth-input"
                                :list="listPrice"
                                :hasExt="hasExtPrice"
                                fromTitle="السعر الأدنى"
                                refName="price"
                                 :rangeFromSelected.sync="form.priceFrom"
                                :rangeToSelected.sync="form.priceTo"
                                variable="1"
                                 toTitle="السعر الأعلى"
                                 rangeFromTitle="ادنى سعر"
                                rangeToTitle="اعلى سعر"
                                sub-title="السعر :"
                                title="سعر العقار">
          </mx-form-select-range>

        <!--Rooms Input-->
          <mx-form-select-range v-if="hasProp('otherRooms')" v-show="$mq != 'ipad' && $mq != 'mobile'"  class="nav-filter-input fifth-input" :list="sampleListRooms" fromTitle="العدد الأدنى" toTitle="العدد الأعلى" refName="rooms"
                                 :rangeFromSelected.sync="form.roomsCountFrom" :rangeToSelected.sync="form.roomsCountTo"
                                 rangeFromTitle="أقل عدد" rangeToTitle="اعلى عدد" sub-title="عدد الغرف :" title="عدد الغرف" variable="2" :pop-offset="-130">
          </mx-form-select-range>

        <!--More Input-->
        <div  class="nav-filter-input more-selector d-flex  " >
          <button  class="btn-more" ref="seeMoreButton" id="seeMoreButton">
            أكـثــر
          </button>
          <b-popover target="seeMoreButton"
                     boundary-padding="0"
                     offset="-140"
                     placement="bottomleft"
                     custom-class="more-popover"
                     triggers="click blur" >
            <div class="filter-dropdown-menu" tabindex="0">
              <div class="filter-dropdown-menu-inner d-flex flex-wrap flex-column">
                <div class="filter-section">
                  <div class="more-filter-table w-100">
                    <div class="filter-row d-lg-none d-flex">
                      <div class="more-filter-table-title">عدد الغرف :</div>
                      <div class="mx-select mr-auto">
                        <select v-model="form.roomsCountFrom" :class="{'is-placeholder' :!form.roomsCountFrom }" >
                          <option :value="null" >ادنى</option>
                          <option :value="item" v-for="item in roomsList">{{ item }}</option>
                        </select>
                      </div>
                      <div class="mx-select ">
                        <select v-model="form.roomsCountTo" :class="{'is-placeholder' :!form.roomsCountTo }">
                          <option :value="null">اعلى</option>
                          <option :value="item" v-for="item in roomsList">{{ item }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="filter-row d-flex align-items-center" v-if="hasProp('bathrooms')">
                      <div class="more-filter-table-title">عدد الحمامات :</div>
                        <div class="mx-select mr-auto">
                          <select v-model="form.bathRoomsCountFrom" :class="{'is-placeholder' :!form.bathRoomsCountFrom }">
                            <option :value="null">ادنى</option>
                            <option :value="item" v-for="item in roomsList">{{ item }}</option>
                          </select>
                        </div>
                        <div class="mx-select">
                          <select v-model="form.bathRoomsCountTo" :class="{'is-placeholder' :!form.bathRoomsCountTo }">
                            <option :value="null">اعلى</option>
                            <option :value="item" v-for="item in roomsList">{{ item }}</option>
                          </select>
                        </div>
                    </div>
                    <div class="filter-row d-flex align-items-center" v-if="hasProp('landArea')">
                      <div class="more-filter-table-title">مساحة العقار :</div>
                        <div class="mx-select mr-auto"><select v-model="form.landAreaFrom" :class="{'is-placeholder' :!form.landAreaFrom }">
                          <option :value="null">ادنى</option>
                          <option :value="item" v-for="item in areaList">{{ item }}</option>
                        </select></div>
                        <div class="mx-select"><select v-model="form.landAreaTo" :class="{'is-placeholder' :!form.landAreaTo }">
                          <option :value="null">اعلى</option>
                          <option :value="item" v-for="item in areaList">{{ item }}</option>
                        </select></div>
                    </div>
                    <div class="filter-row d-flex align-items-center" v-if="hasProp('buildingArea')">
                      <div class="more-filter-table-title">مساحة البناء :</div>
                        <div class="mx-select mr-auto"><select v-model="form.buildingAreaFrom" :class="{'is-placeholder' :!form.buildingAreaFrom }">
                          <option :value="null">ادنى</option>
                          <option :value="item" v-for="item in areaList">{{ item }}</option>
                        </select></div>
                        <div class="mx-select"><select v-model="form.buildingAreaTo" :class="{'is-placeholder' :!form.buildingAreaTo }">
                          <option :value="null">اعلى</option>
                          <option :value="item" v-for="item in areaList">{{ item }}</option>
                        </select></div>
                    </div>
                    <div class="filter-row d-flex align-items-center" v-if="!hasProp('noStreet')">
                      <div class="more-filter-table-title">الشوارع المحيطة :</div>
                        <div class="mx-select mr-auto"><select v-model="form.streetsCountFrom" :class="{'is-placeholder' :!form.streetsCountFrom }">
                          <option :value="null">ادنى</option>
                          <option :value="item" v-for="item in streetList">{{ item }}</option>
                        </select></div>
                        <div class="mx-select"><select v-model="form.streetsCountTo" :class="{'is-placeholder' :!form.streetsCountTo }">
                          <option :value="null">اعلى</option>
                          <option :value="item" v-for="item in streetList">{{ item }}</option>
                        </select></div>
                    </div>
                    <div class="filter-row d-flex align-items-center" v-if="hasProp('buildingOld')">
                      <div class="more-filter-table-title"> عمر العقار :</div>
                        <div class="mx-select mr-auto text-truncate"><select v-model="form.realEstateAgeFrom" :class="{'is-placeholder' :!form.realEstateAgeFrom }">
                          <option :value="null">ادنى</option>
                          <option :value="item" v-for="(item, index) in ageList"> {{ $t('building_age.' + item) }}</option>
                        </select></div>
                        <div class="mx-select"><select v-model="form.realEstateAgeTo" :class="{'is-placeholder' :!form.realEstateAgeTo }">
                          <option :value="null">اعلى</option>
                          <option :value="item" v-for="(item, index) in ageList"> {{ $t('building_age.' + item) }}</option>
                        </select></div>
                    </div>
                    <div class="filter-row d-flex align-items-center" v-if="hasProp('buildingFinish')">
                      <div class="more-filter-table-title">تشطيب العقار :</div>
                        <div class="mx-select mr-auto" style="width: 190px !important;"><select class="w-100" v-model="form.finishingRealEstate" :class="{'is-placeholder' :!form.finishingRealEstate }">
                          <option :value="null">جميع أنواع التشطيب</option>
                          <option :value="item" v-for="(item, index) in building_finishList">
                            {{ $t('building_finish.' + item) }}
                          </option>
                        </select></div>

                    </div>
                  </div>
                  <label class="has-virtual font-size-12px  text-black" for="has-virtual">
                    <input id="has-virtual" name="" type="checkbox" v-model="form.hasVirtualTour">
                    العقارات التي تحوي جولة افتراضية او صور بانورامية فقط
                  </label>
                  <div class="mb-2">
                    <h2 class="text-blue feature-title">المميزات</h2>
                    <ul class="features d-flex flex-wrap px-3">
                      <li :key="index" class="w-50 mb-1 font-size-12px text-black" v-for="(item,index) in featuresList">
                        <label :for="'feature-'+index" class="d-flex align-items-center ">
                          <input :id="'feature-'+index" :value="item" type="checkbox" v-model="form.featuresRealEstates">
                          {{ $t('features.' + item) }}
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div class="more-filter-table w-100">
                    <div class="more-filter-row d-flex align-items-center">
                      <div class="more-filter-table-title">بحث بكلمة</div>
                        <div class="mx-input-search clickable mr-auto"
                             style="width: 190px; height: 30px"
                             @click="ClickSearchKeyWord">
                          <button><i class="mx-icon-magnifier"></i></button>
                          <input type="search" v-model="searchKeyword" @keyup.enter="ClickSearchKeyWord">
                        </div>
                    </div>
                    <div class="more-filter-row d-flex align-items-center">
                      <div class="more-filter-table-title">اسم الشركة العقارية</div>
                        <div class="mx-v-select mr-auto">

                          <v-select dir="rtl"
                                    :class="{'has-value' : !form.agencyId}"
                                    style="width: 190px; height: 30px"
                                    :no-drop="searchBoxAgency.svalue.length < 1"
                                    :filterable="false"
                                    @search="onSearchAgency"
                                    :options="filteredAgenciesRealEstate"
                                    :reduce="option=> option.id"
                                    v-model.number="form.agencyId"
                                    label="name">
                            <template #option="{ name,path }">
                              <div class="px-4">{{ name }}{{ path }}</div>
                            </template>
                            <template #selected-option-container="{ option,  disabled }">
                              <div class="vs__selected " style="width:150px">
                                <span class="mx-selected-item text-truncate">{{ option.name}}</span>
                              </div>
                            </template>
                          </v-select>
                        </div>
                    </div>
                  </div>
                </div>
                <div class="filter-footer d-flex justify-content-between align-items-center">
                  <div>
                    <b-btn class="btn-filter btn-reset"
                           @click="form.ClearMoreSection();searchBoxAgency.selected=null;searchKeyword=null">إعادة
                      تعيين
                    </b-btn>
                  </div>

                  <div class="btn-result text-blue " v-if="realestates && realestates.totalCount">
                    <span>{{ realestates.totalCount }}</span>
                    نتيجة
                  </div>
                  <div class=" text-right">
                    <b-btn class="btn-filter btn-apply" @click="onClose();ClickSearchKeyWord()">تطبيق</b-btn>
                  </div>
                </div>
              </div>

            </div>
          </b-popover>

        </div>

        <!--Add Notification-->
        <div  class=" add-notification d-flex dropdown">
<!--          v-b-modal="!form.addressId?'modal-request-address':'modal-notify-1'"-->
        <a href="" @click.prevent="onClickNotify" v-if="$mq !== 'mobile'" class="p-1 text-decoration-none text-blue font-size-13px d-flex align-items-center">
          <i class="mx-icon-bell pl-1"></i>
          إضافة تنبيه
        </a>
        </div>
      </div>
    </div>
    <!--Main Section-->
    <div class="d-flex  overflow-hidden map-search-box" >

      <!--Right section [Cards] -->
      <div class="ltr-scroll" :class="{'minimized': resizeMap}" id="reaEstateContainer" >
        <div class="projects-row position-relative">

          <!--No results section-->
          <div class="m-2 m-sm-0" v-if="realestates && realestates.totalCount === 0">
            <div style="border: solid 1px #70707080;
                        color:#001324;background: #F5F5F5"
                 class="col-12 font-size-14px pb-3 pt-3 pb-sm-1 pt-sm-1">
              <h1 class="font-size-16px font-weight-bold">لا يوجد عقارات مطابقة لبحثك</h1>
              <p class="m-0 pb-2" style="color: #001324">قم بأحد الإجراءات التالية :</p>
              <ul style="list-style: inside">
                <li style="line-height: 30px"><a href="#" style="color: #001324">تغيير الموقع</a> </li>
                <li style="line-height: 30px"><a href="#" @click.prevent="resetForm" style="color: #0089FE">إزالة محددات البحث</a> </li>
                <li style="line-height: 30px"><a href="#" @click.prevent="onClickNotify" style="color:#0089FE"> إضافة تنبيه </a>
                  <span class="font-size-12px">ليصلك إشعار في حال تم الإعلان عن عقار مطابق لرغباتك </span></li>
              </ul>
            </div>
          </div>

          <!--results section-->
          <div class="inner-box" v-if="realestates && realestates.totalCount !== 0 ">
            <div class="spinner-layout" v-show="spinner"></div>
            <div class="header d-flex align-items-center" >
              <div class="results">
                <span>عدد النتائج :</span>
                <span>{{ realestates.totalCount }}</span>
              </div>
              <div class="sort mx-select mr-auto position-relative" >
                <select class="form-sort" v-model="sortSelected" @change="onChangeSort()">
                  <option :value="{sortCol:null,sortDir:null}" disabled selected>الترتيب حسب</option>
                  <option v-for="op in SortType[form.dealType]" :value="op" >{{$t(`SortColumnRealEstateFilter.${form.dealType}.${op.sortCol}${op.sortDir}`)}}
                  </option>
                </select>
                <i class="mx-icon-sort position-absolute"></i>
              </div>
            </div>
            <mx-nav-filter-results v-if="$mq != 'mobile'"
                                   :list="filterResultsSampleData"
                                   @item-clicked="onClickStatistic"
                                   :multiSelect="isMultiSelect"
                                   v-model="selectedNavFilter"
                                   :width="150"
                                   class="mb-2">
            </mx-nav-filter-results>
            <div class="container">
              <div class="row real-estate-row justify-content-between">
                <div class="col-12 col-md-12 real-estate-col  p-0 " :class="{'col-lg-6': $mq === 'desktop' }" :key="index" v-for="(item,index) in realestates.page"
                     :style="{flexBasis: $mq === 'desktop' || $mq === 'desktopWide' ?'360px': ''}">
                  <nuxt-link :to="'real-estates/'+item.id " class="item-link">
                    <mx-card-realestate :offerItems="item" :class="{active: item.id === selectedOfferId}"
                                        @mouseover.native="selectedOfferId = item.id;$root.$emit('bv::show::popover', 'marker-circle-'+index)"
                                        @mouseleave.native="selectedOfferId = null ;$root.$emit('bv::hide::popover', 'marker-circle-'+index)"
                                        class="grid-view" style="margin-bottom:10px" price-priority :hasCallButtons="false">
                    </mx-card-realestate>
                  </nuxt-link>
                </div>
              </div>
            </div>
            <div class="my-3" v-if="realestates.totalCount">
              <b-pagination class="justify-content-center"
                            v-model="currentPage"
                            :total-rows="realestates.totalCount"
                            pills
                            :limit="4"
                            first-number
                            last-number
                            :per-page="realestates.perPage"
                            @change="onChangePagination"
                            next-class="btn-pagination"
                            prev-class="btn-pagination">
                <template v-slot:prev-text><span> <i class="mx-icon-chevron-right"></i>السابق</span></template>
                <template v-slot:next-text><span> التالي <i class="mx-icon-chevron-left"> </i></span></template>
              </b-pagination>
            </div>
          </div>
          <div class="mx-latest-article">
            <div :key="i" class="article py-3" v-for="(n,i) in 2">
              <h2>التمويل العقاري من مكتمل</h2>
              <p>هل تطمح لامتلاك عقار (فيلا دوبلكس شقة او قطعة ارض) وليس لديك السيولة الكفالية لذلك احصل على الحل واقتني
                الآن عقار احلامك من خلال منتج التمويل العقاري بقسط متغير</p>
            </div>
          </div>
          <m-footer></m-footer>
        </div>
      </div>
      <!--Left section [MAP]-->
      <div class="col map-box p-0">
        <GmapMap ref="mmap"
                 id="gmap-map"
                 class="google-map map-noscroll"
                 :zoom.sync="map.zoom"
                 :center="map.initPosition"
                 @bounds_changed="updateMapData"
                 @click="resetSelectedElements"
                 @zoom_changed="zoomChanged"
                 style="width: 100%"
                 :options="map.options">

          <!-- Fixed items on map port -->
          <template #visible>
            <mx-map-zoom-controller v-if="$mq ==='desktop' || $mq === 'desktopWide' || $mq === 'tablet'"></mx-map-zoom-controller>

            <mx-map-gmap-free-hand-draw v-if="drawingMode"
                                        @canceled="freeDrawCancel"
                                        @applied="freeDrawApplied">
            </mx-map-gmap-free-hand-draw>

            <!-- Map Controls -->
            <div class="mx-additional-map-buttons" v-else>
              <div class="col-12">
                <div class="results-message" v-show="resultsVisible">
                  <span>عدد النتائج :</span>
                  <span v-if="realestates">{{ realestates.totalCount }}</span>
                </div>
              </div>
              <div class="col-12 d-flex pt-2" >
                <div class="right-section">
                  <div @click="resizeMap =! resizeMap" class="resize-map d-none d-md-block mb-2">
                    <i :class="!resizeMap ? 'mx-icon-chevron-right' :'mx-icon-chevron-left'"></i>
                    <span>{{ !resizeMap ? 'تكبير الخريطة' : 'تصغير الخريطة' }}</span>
                  </div>
                  <ul class="filter-btns">
                    <li v-if="showExtras" :class="{'active':map.extra.schools.isShown}">
                      <button @click="changeSchoolsState">
                        <i class="mx-icon-graduation-cap"></i>
                      </button>
                    </li>
                    <li v-if="showExtras" :class="{'active':map.extra.hospitals.isShown}">
                      <button @click="changeHospitalsState">
                        <i class="mx-icon-h-square"></i>
                      </button>
                    </li>
                    <li v-if="showExtras" :class="{'active':map.extra.mosques.isShown}">
                      <button @click="changeMosquesState">
                        <i class="mx-icon-mosque"></i>
                      </button>
                    </li>
                    <li v-if="showPolygonEdit || map.singlePolygon.isShown"
                        :class="{'de-active':map.singlePolygon.isShown && selectedPolygon}">
                      <button @click="updatePolygonState()">
                        <i class="mx-icon-pencil"></i>
                      </button>
                    </li>
                  </ul>
                </div>
                <div class="left-section mr-auto">
                  <mx-map-type-controller></mx-map-type-controller>
                </div>
              </div>
            </div>
          </template>


          <div v-if="realestates && !drawingMode">
            <div v-if="!showRegion">
              <div>
                <!--Offer Markers-->
                <!--:key="`NJEIF-${index}-${reOffer.id}`"-->
                <div v-for="(reOffer,index) in this.comparedArray.offers" :key="`NJEIF-${reOffer.id}-${reOffer.id}`" >
                  <mx-map-gmap-custom-marker :marker="reOffer.location" :zIndex="-1" :class="{'z-index-10': selectedOfferId == reOffer.id}">
                    <button class="marker-circle"
                          :id="'marker-circle-'+index"
                       :class="[getOfferIconClass(reOffer),{active: selectedOfferId == reOffer.id}]"
                       @click="selectedOfferId = reOffer.id ;$root.$emit('bv::show::popover', 'marker-circle-'+index)"
                       @mouseover="selectedOfferId = reOffer.id ;$root.$emit('bv::show::popover', 'marker-circle-'+index)"
                       @mouseleave="selectedOfferId = null">
                    <span v-if="map.zoom > 15" class="marker-circle-price">{{priceLabel(reOffer.price)}}</span>
                    <b-popover :target="'marker-circle-'+index"
                               container="gmap-map"
                               placement="topleft"
                               triggers="click blur hover" >
                      <nuxt-link :to="'real-estates/'+reOffer.id">
                        <mx-card-realestate pricePriority :offer-items="reOffer" class="item-link info-map-view grid-view" ></mx-card-realestate>
                      </nuxt-link>
                    </b-popover>
<!--                    <div class="popup-item" v-if="($mq !== 'mobile') && (reOffer.id === selectedOfferId )" >-->
<!--                      <nuxt-link :to="'real-estates/'+reOffer.id">-->
<!--                        <mx-card-realestate pricePriority :offer-items="reOffer" class="item-link info-map-view grid-view" ></mx-card-realestate>-->
<!--                      </nuxt-link>-->
<!--                    </div>-->
                  </button>
                </mx-map-gmap-custom-marker>
              </div>
              </div>
              <!--Selected Polygon-->
              <gmap-polygon v-if="selectedPolygon && map.singlePolygon.isShown && !map.zoomDelay"
                            :key="`selected-polygon-${selectedPolygon.id}`" :options="map.singlePolygon.options"
                            :paths="selectedPolygon.addressPolygon">
              </gmap-polygon>

              <!--Extras-->
              <div v-if="showExtras">
                <!--Schools Markers-->
                <div v-if="map.extra.schools.isShown">
                  <div  v-for="(school,i) in comparedArray.schools" :key="`schools-${school.id}-${school.id}`">
                    <mx-map-gmap-custom-marker
                      :marker="school.location"
                    >
                      <button
                        class="mx-map-marker-icon"
                        :id="`schools-${school.id}-${i}`"
                        @click="$root.$emit('bv::show::popover', `schools-${school.id}-${i}`);selectedSchoolId = school.id"
                        @mouseover="$root.$emit('bv::show::popover', `schools-${school.id}-${i}`)"
                        @mouseleave="$root.$emit('bv::hide::popover', `schools-${school.id}-${i}`);selectedSchoolId=null">
                        <img :src="school.sex ===1 ? '/markers/school-blue.svg' :  '/markers/school-pink.svg'"
                             alt="">
                        <b-popover :target="`schools-${school.id}-${i}`"
                                   placement="topleft"
                                   triggers="click blur hover">
                          <mx-card-school :school="school"></mx-card-school>
                        </b-popover>
                      </button>
                    </mx-map-gmap-custom-marker>
                  </div>
                </div>
                <!--Hospitals Markers-->
                <div v-if="map.extra.hospitals.isShown">
                  <div  v-for="(hospital,i) in comparedArray.hospitals" :key="`hospitals-${hospital.id}-${hospital.id}`">
                    <mx-map-gmap-custom-marker
                      :marker="hospital.location"
                    >
                      <button
                        class="mx-map-marker-icon"
                        :id="`hospitals-${hospital.id}-${i}`"
                        @click="$root.$emit('bv::show::popover', `hospitals-${hospital.id}-${i}`);selectedHospitalId = hospital.id"
                        @mouseover="$root.$emit('bv::show::popover', `hospitals-${hospital.id}-${i}`)"
                        @mouseleave="$root.$emit('bv::hide::popover', `hospitals-${hospital.id}-${i}`);selectedHospitalId = null">
                        <img :src="hospital.isPrivate ? '/markers/hospital-green.svg': '/markers/hospital-blue.svg'"
                             alt="">
                        <b-popover :target="`hospitals-${hospital.id}-${i}`"
                                   placement="topleft"
                                   triggers="click blur hover">
                          <mx-card-hospital :hospital="hospital"></mx-card-hospital>
                        </b-popover>
                      </button>
                    </mx-map-gmap-custom-marker>
                  </div>
                </div>
                <!--Mosques Markers-->
                <div v-if="map.extra.mosques.isShown">
                  <div  v-for="(mosque,i) in comparedArray.mosques" :key="`mosque-${mosque.id}-${mosque.id}`">
                    <mx-map-gmap-custom-marker
                      :marker="mosque.location"
                    >
                      <button
                        class="mx-map-marker-icon"
                        :id="`mosque-${mosque.id}-${i}`"
                        @click="$root.$emit('bv::show::popover', `mosque-${mosque.id}-${i}`);selectedMosqueId = mosque.id"
                        @mouseover="$root.$emit('bv::show::popover', `mosque-${mosque.id}-${i}`)"
                        @mouseleave="$root.$emit('bv::hide::popover', `mosque-${mosque.id}-${i}`);selectedMosqueId = null">
                        <img :src="
                                        mosque.type === 1 ? '/markers/mosque-green.svg' : '/markers/mosque-blue.svg'"
                             alt="">
                        <b-popover :target="`mosque-${mosque.id}-${i}`"
                                   placement="topleft"
                                   triggers="click blur hover">
                          <mx-card-mosque :mosque="mosque"></mx-card-mosque>
                        </b-popover>
                      </button>
                    </mx-map-gmap-custom-marker>
                  </div>
                </div>

              </div>
            </div>
            <!--ALL Region Polygons-->
            <div v-else-if="regionPolygons">
              <div>
                <gmap-polygon @click="polygonClicked(address.id)" :options="map.polygon.options"
                              :paths="address.addressPolygon"
                              v-for="(address,i) in regionPolygons"
                              :key="`region-${address.id}-${i}`">
                </gmap-polygon>
              </div>
              <div v-for="(address,i) in regionPolygons" :key="`info-${address.id}-${i}`">
                <mx-map-gmap-custom-marker :marker="regionsCenters[address.id]" :zIndex="10">
                  <div class="mx-map-count">{{ polygonCount(address.id) }}</div>
                </mx-map-gmap-custom-marker>
              </div>
            </div>
          </div>



        </GmapMap>

        <div v-if="selectedOffer && ($mq === 'mobile')" >
          <nuxt-link :to="'real-estates/'+selectedOfferId">
            <mx-card-realestate class="info-map-view-fixed" :offer-items="selectedOffer" pricePriority></mx-card-realestate>
          </nuxt-link>
        </div>

      </div>
    </div>

    <!--Buttons On Mobile-->
    <div class="absolute-footer-buttons d-flex justify-content-center">
      <div @click="toggleMap = !toggleMap" class="toggle-map d-flex align-items-center justify-content-center" v-if="$mq === 'mobile'">
        <i :class="!toggleMap? 'mx-icon-location-arrow': 'mx-icon-list'"></i>
      <span>{{ !toggleMap ? 'البحث بالخريطة' : 'البحث بالقائمة' }}</span>
      </div>
      <!--v-b-modal="!form.addressId?'modal-request-address':'modal-notify-1'"-->
      <div  class="toggle-map d-flex align-items-center justify-content-center" v-if="$mq === 'mobile'">
        <a href="" @click.prevent="onClickNotify"
           class="text-decoration-none">
          <i class="mx-icon-bell"></i>
          إضافة تنبيه
        </a>
      </div>
    </div>


    <mx-modal-search-notification modal-id="1" :form="form"></mx-modal-search-notification>

    <mx-modal-request-messages
      title="تنبيه"
      subTitle=""
      msg="يرجى تحديد نطاق المنطقة اللتي ترغبون في وصول التنبيه حولها"
      :hasOkButton="true"
      status="fail"
      modal-id="modal-request-address"
    >
    </mx-modal-request-messages>

  </section>

</template>


<script src="./real-estates.js">
</script>

<style lang="scss">
@import "~@/assets/n-scss/pages/projects.scss";
.projects-row{
  .spinner-layout{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    opacity: .6;
    background-color: #FFF;
  }
}
</style>
