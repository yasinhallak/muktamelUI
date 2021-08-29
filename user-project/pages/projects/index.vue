<template>
  <section class="projects-page toggled" :class="toggleMap?'toggled-map':''">
    <div class="nav-filter project-nav-filter d-flex align-items-center">
      <v-select class="nav-filter-input project-filter-selector selectors"
                  :class="{'has-value' : !searchBox.selected}"
                  dir="rtl"
                  placeholder="الموقع او المشروع أو المطور"
                  label="name"
                  v-model="searchBox.selected"
                  :no-drop="searchBox.svalue.length < 1"
                  :filterable="false"
                  @search="onSearch"
                  :options="searchBox.filterdOptions"
                  :selectable="option => !option.hasOwnProperty('group')">
          <template #option="{ group, name,path }">
            <div v-if="group" class="group">
              {{ group }}
            </div>
            <div class="px-4">{{ name }}{{ path }}</div>
          </template>
          <template #selected-option-container="{ option,  disabled }">
            <div v-if="option.name" class="vs__selected">
              <span class="mx-selected-item ">{{ option.name }}</span>
            </div>
          </template>
        </v-select>
      <div class="nav-filter-input more-selector " >
        <button class="btn btn-primary btn-more" ref="button" id="seeMoreButton">
          أكـثـر
        </button>
        <b-popover target="seeMoreButton"
                   placement="bottomleft"
                   boundary-padding="0"
                   offset="-140"
                   custom-class="more-popover"
                   triggers="click blur" >
          <div class="filter-dropdown-menu project-more-filter" tabindex="0" >
            <div class="filter-dropdown-menu-inner">
              <div class="filter-section">
                <ul class="filter-tabs d-flex justify-content-between align-items-center">
                  <li class="filter-tab" @click.prevent="form.IsForRent = null" :class="{ active : form.IsForRent == null }">
                      الجميع
                  </li>
                  <li class="filter-tab" @click.prevent="form.IsForRent = false"
                      :class="{ active : form.IsForRent == false }">
                      للبيع
                  </li>
                  <li class="filter-tab" @click.prevent="form.IsForRent = true" :class="{ active : form.IsForRent == true }">
                      للايجار
                  </li>
                </ul>
                <div class="select-box d-flex align-items-center">
                  <span>تاريخ التسليم:</span>
                  <div class="mx-select">
                    <b-form-select v-model="form.StartYear">
                      <template v-slot:first>
                        <b-form-select-option :value="null">أدنى</b-form-select-option>
                      </template>
                      <option :value="0">جاهز للتسليم</option>
                      <option :value="2020+i" v-for="(n,i) in 11">{{ 2020 + i }}</option>
                    </b-form-select>
                  </div>
                  <div class="mx-select">
                    <b-form-select v-model="form.EndYear">
                      <template v-slot:first>
                        <b-form-select-option :value="null">أعلى</b-form-select-option>
                      </template>
                      <option :value="0">جاهز للتسليم</option>
                      <option :value="2020+i" v-for="(n,i) in 11">{{ 2020 + i }}</option>
                    </b-form-select>
                  </div>
                </div>
                <div class="search-type">
                  <h2 class="text-center"> البحث حسب نوع العقار</h2>
                  <div class="d-flex text-center search-type-content">
                    <div class="search-column">
                      <h4 class="search-type-title">
                        سكني
                      </h4>
                      <div class="search-type-item" v-for="(item,i) in realEstateResidentialList" :key="i"><input
                        v-model="form.ResidentialType" class="d-none" type="radio" :id="'qq'+i" :value="item.id"><label
                        :for="'qq'+i">{{ item.name }}</label></div>

                    </div>
                    <div class="search-column">
                      <h4 class="search-type-title">
                        تجاري
                      </h4>
                      <div class="search-type-item" v-for="(item,i) in realEstateCommercialList" :key="i"><input
                        v-model="form.CommertialType" class="d-none" type="radio" :id="'qqq'+i" :value="item.id"><label
                        :for="'qqq'+i">{{ item.name }}</label></div>

                    </div>
                  </div>
                </div>
                <div class="filter-footer d-flex justify-content-between align-items-center">
                  <div>
                    <b-btn @click="form.ClearMoreSection()" class="btn-filter btn-reset">إعادة تعيين</b-btn>
                  </div>
                  <div class=" text-blue text-center font-size-15px">
                    <span v-if="projects">{{ projects.totalCount }}</span>
                    نتيجة
                  </div>
                  <div class=" text-right">
                    <b-btn @click="onClose" class="btn-filter btn-apply">تطبيق</b-btn>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </b-popover>

      </div>
    </div>

    <div class="d-flex h-100 overflow-hidden" >
      <!-- Projects List View -->
      <div class="ltr-scroll" :class="{'minimized': resizeMap}" id="projectContainer" >
        <div class="projects-row position-relative">
          <div class="inner-box" v-if="projects">
            <div class="spinner-layout" v-show="spinner"></div>
            <!--No results section-->
            <div class="m-2 m-sm-0" v-if="projects &&  projects.totalCount==0">
              <div style="border: solid 1px #70707080;
                        color:#001324;background: #F5F5F5"
                   class="col-12 font-size-14px pb-3 pt-3 pb-sm-1 pt-sm-1">
                <h1 class="font-size-16px font-weight-bold">لا يوجد نتائج مطابقة لبحثك</h1>
                <p class="m-0 pb-2" style="color: #001324">قم بأحد الإجراءات التالية :</p>
                <ul style="list-style: inside">
                  <li style="line-height: 30px"><a href="#" style="color: #001324">تغيير الموقع</a> </li>
                  <li style="line-height: 30px"><a href="#" @click.prevent="resetForm" style="color: #0089FE">إزالة محددات البحث</a> </li>
                </ul>
              </div>
            </div>

            <div class="header d-flex align-items-center">
              <div class="results" v-if="projects.totalCount!=0">
                <span>عدد النتائج :</span>
                <span>{{ projects.totalCount }}</span>
              </div>
              <div class="sort mx-select mr-auto position-relative" v-if="projects.totalCount!=0">
                <select class="form-sort" v-model="sortSelected" @change="onChangeSort()">
                  <option :value="{sortCol :null,sortDir:null }" disabled >الترتيب حسب</option>
                  <option :value="{sortCol :1,sortDir:1 }">السعر ( الاقل )</option>
                  <option :value="{sortCol :1,sortDir:2 }">السعر ( الاعلى )</option>
                  <option :value="{sortCol :2,sortDir:2 }">تاريخ إكتمال المشروع</option>
                </select>
                <i class="mx-icon-sort position-absolute"></i>
              </div>
            </div>
            <div class="row project-row">
              <div class="col-12 project-col">
                <nuxt-link v-for="(project,i) in projects.page" :key="project.id" :to="'/projects/'+project.id"
                           class="item-link">
                  <mx-card-project :project="project"
                                   @mouseover.native="$root.$emit('bv::show::popover', 'marker-circle-'+project.id)"
                                   @mouseleave.native="$root.$emit('bv::hide::popover', 'marker-circle-'+project.id)"
                                   style="margin-bottom:10px"
                                   :class="{active: project.id === selectedProjectId,

                                  'grid-view': $mq === 'tablet' || $mq === 'ipad'|| $mq === 'ipad' ||  $mq === 'mobile'
                                    }">
                  </mx-card-project>
                </nuxt-link>
              </div>
            </div>

            <div class="my-3" v-if="projects.totalCount!=0">

              <b-pagination   class="justify-content-center" v-model="currentPage" :total-rows="projects.totalCount" pills
                            :per-page="projects.perPage" @change="onChangePagination" next-class="btn-pagination" first-number
                            last-number prev-text="السابق" next-text="التالي" prev-class="btn-pagination" last-class="last-page"
                            first-class="first-page">
                <template v-slot:prev-text><span> <i class="mx-icon-chevron-right"></i> السابق</span></template>
                <template v-slot:next-text><span> التالي <i class="mx-icon-chevron-left"> </i></span></template>
              </b-pagination>
            </div>
            <div class="mx-latest-article">
              <div class="article py-3" v-for="(n,i) in 2" :key="i">
                <h2>التمويل العقاري من مكتمل</h2>
                <p>هل تطمح لامتلاك عقار (فيلا دوبلكس شقة او قطعة ارض) وليس لديك السيولة الكفالية لذلك احصل على الحل واقتني
                  الآن عقار احلامك من خلال منتج التمويل العقاري بقسط متغير</p>
              </div>

            </div>
            <m-footer></m-footer>
          </div>
        </div>

      </div>

      <!-- Map -->
      <div class="col map-box p-0 position-relative">
        <div class="mx-additional-map-buttons ">
          <div class="col-12">
            <div class="results-message " v-if="resultsVisible">
              <span>عدد النتائج :</span>
              <span v-if="projects">{{ projects.totalCount }}</span>
            </div>
          </div>
          <div class="col-12 d-flex pt-2">
            <div class="right-section">
              <div class="resize-map d-none d-md-block " @click="resizeMap =! resizeMap">
                <i :class="!resizeMap ? 'mx-icon-chevron-right' :'mx-icon-chevron-left'"></i>
                <span>
          {{ !resizeMap ? 'تكبير الخريطة' : 'تصغير الخريطة' }}
        </span>
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
                <li v-if="this.showPolygonEdit || this.map.singlePolygon.isShown"
                    :class="{'de-active':map.singlePolygon.isShown}">
                  <button @click="updatePolygonState()">
                    <i class="mx-icon-pencil"></i>
                  </button>
                </li>
              </ul>
            </div>
            <div class="left-section mr-auto">
              <button class="btn-layers"><i class="mx-icon-layers"></i></button>
            </div>
          </div>


        </div>


        <GmapMap ref="mmap" class="google-map" :zoom.sync="map.zoom" :center="map.initPosition"
                 @zoom_changed="zoomChanged"  @bounds_changed="updateMapData" @click="resetSelectedElements" style="width: 100%" :options="map.options">
          <template #visible>
            <mx-map-zoom-controller v-if="$mq ==='desktop' || $mq === 'desktopWide' || $mq === 'tablet'"></mx-map-zoom-controller>
          </template>
          <!--Offer Markers-->
          <template v-if="projects && !showRegion">
            <div v-for="(offer,index) in projects.data.mapData" :key="`offers-${offer.id}-${index}`" >
              <mx-map-gmap-custom-marker :marker="offer.location" :zIndex="-1" :class="{'z-index-10': selectedProjectId == offer.id}">
                <button class="marker-circle background-red"
                        :id="'marker-circle-'+offer.id"
                        :class="{active: selectedProjectId == offer.id}"
                        @click="selectedProjectId = offer.id ;$root.$emit('bv::show::popover', 'marker-circle-'+offer.id)"
                        @mouseover="selectedProjectId = offer.id ;$root.$emit('bv::show::popover', 'marker-circle-'+offer.id)"
                        @mouseleave="selectedProjectId = null">
                  <b-popover :target="'marker-circle-'+offer.id"
                             placement="top"
                             triggers="click blur hover">
                    <nuxt-link :to="'projects/'+offer.id">
                           <mx-card-project :project="offer" class="grid-view info-window"></mx-card-project>
                    </nuxt-link>
                  </b-popover>
                </button>
              </mx-map-gmap-custom-marker>
            </div>
<!--            <gmap-marker v-for="(offer,index) in projects.data.mapData" :key="`offers-${offer.id}-${index}`"-->
<!--                         :clickable="true" :icon="getOfferIcon(offer)" :position="offer.location"-->
<!--                         @click="selectedProjectId = offer.id">-->
<!--              <gmap-info-window v-if="$mq != 'mobile'" :opened="offer.id === selectedProjectId"-->
<!--                                :options="map.info.options" @closeclick="selectedProjectId=null">-->
<!--                <nuxt-link :to="'projects/'+offer.id" class="item-link">-->
<!--                  <mx-card-project :project="offer" class="grid-view info-window">-->
<!--                  </mx-card-project>-->
<!--                </nuxt-link>-->
<!--              </gmap-info-window>-->
<!--            </gmap-marker>-->
          </template>
          <!--ALL Region Polygons-->
          <template v-else-if="regionPolygons">
            <gmap-polygon @click="polygonClicked(address.id)" :options="map.polygon.options"
                          :paths="formatPolygon(address.addressPolygon)" v-for="(address,index) in regionPolygons"
                          :key="`polygons-${address.id}-${index}`">
            </gmap-polygon>
            <mx-map-gmap-custom-marker v-for="(address,index) in regionPolygons" :key="`polygonsCount-${address.id}-${index}`"
                                :marker="regionsCenters[address.id]" :zIndex="10">
              <div class="mx-map-count">{{ polygonCount(address.id) }}</div>
            </mx-map-gmap-custom-marker>
          </template>
          <div v-if="showExtras">
            <!--Schools Markers-->
            <div v-if="map.extra.schools.isShown">
              <div  v-for="(school,i) in map.extra.schools.markers" :key="`schools-${school.id}-${i}`">
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
              <div  v-for="(hospital,i) in map.extra.hospitals.markers" :key="`hospitals-${hospital.id}-${i}`">
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
              <div  v-for="(mosque,i) in map.extra.mosques.markers" :key="`mosque-${mosque.id}-${i}`">
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
                                        mosque.type === 1 ? '/markers/mosque-green.svg' : '/markers/mosque-blue.svg' "
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


          <!--Selected Polygon-->
          <gmap-polygon v-if="!showRegion && selectedPolygon && map.singlePolygon.isShown && !map.zoomDelay"
                        :options="map.singlePolygon.options" :paths="formatPolygon(selectedPolygon.addressPolygon)">
          </gmap-polygon>

        </GmapMap>

        <transition name="slide" v-if="projects">
          <mx-card-project v-if="$mq === 'mobile' && selectedProjectId"
                           :project="projects.data.mapData.find(p => p.id == selectedProjectId)" class="list-info-window-fixed">
          </mx-card-project>
        </transition>

      </div>
    </div>
    <div class="absolute-footer-buttons d-flex justify-content-center">
    <div @click="toggleMap = !toggleMap" class="toggle-map d-flex align-items-center justify-content-center" v-if="$mq === 'mobile'">
      <i :class="!toggleMap? 'mx-icon-location-arrow': 'mx-icon-list'"></i>
      <span>{{ !toggleMap ? 'البحث بالخريطة' : 'البحث بالقائمة' }}</span>
    </div>
    </div>
  </section>

</template>
<script src="./projects.js"></script>
<style  lang="scss">
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
