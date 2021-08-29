<template>
  <b-modal
    :load="log(offer)"
    v-bind="modalAttribute"
    size="lg"
    hide-footer
    hide-header
    modal-class="props_popup"
    dialog-class="modal-dialog-mobile"
    content-class="modal-content-mobile"
    body-class="p-0"
  >
    <b-tabs nav-class="align-items-center">
      <b-tab v-if="offerId" :active="tab === 'tab-location'" title="الموقع على الخريطة" id="mapLocation"  @click="tab = 'tab-location'">
        <GmapMap :center="offer.location"
                 :zoom="zoom"
                 :options="map.options"
                 style="width: 100%; height: 100%">
          <template #visible>
            <mx-map-type-controller></mx-map-type-controller>
            <mx-map-zoom-controller v-if="$mq ==='desktop' || $mq === 'desktopWide' || $mq === 'tablet'"></mx-map-zoom-controller>
          </template>
          <GmapMarker
            :clickable="true"
            :icon="{url: offerMarker()}"
            :position="offer.location"
          ></GmapMarker>
        </GmapMap>
        <div class="box-collapse offer-details-box">
          <div
            class="box-title d-flex align-items-center green-text collapsed"
            data-toggle="collapse"
            data-target="#odb0"
            aria-expanded="false"
            aria-controls="collapse1"
          >
            <h2 :class="GetStyle()" class="card-title-type">
              <i class="mr-auto mx-icon-home"></i>
              <span v-if="isProject" >مشروع {{offer.title}}</span>
              <span v-if="!isProject" v-text="$t('realEstateType.' + offer.type)"></span>
              <span v-if="!isProject" v-text="$t('dealTypeOperation.'+ offer.dealType)"></span>
            </h2>
            <i class="mr-auto mx-icon-chevron-up-light collapse-icon"></i>
            <i class="mr-auto mx-icon-chevron-down-light collapse-icon"></i>
          </div>

          <div class="collapse" id="odb0">
            <p v-text="offer.title"></p>
            <div class="offer-price text-red" v-if="!isAuction && offer.price">
              <span class="price-starting-from " v-if="isProject">تبدأ الأسعار من </span>
              <span >{{formatNumber(offer.price)}}</span>
              <b class="font-size-10px"> {{hasExtPrice()}} </b>
            </div>
            <div class="auction-date text-red" v-if="isAuction">
              <span class="date-title">تاريخ المزاد: </span>
              <span class="the-date">{{$moment(offer.auction.date).locale('en').format('YYYY-MM-DD')}}</span>
            </div>

          </div>
          <div class="footer">
            <div class="offer-title">{{offer.agency.name}}</div>
            <div class="action-buttons d-muk-flex justify-content-between">
              <!-- for web site -->
              <button
                class="btn d-muk-md-block d-muk-none"
                v-if="$mq!=='mobile'"
                href="#formModalCallOffice"
                data-toggle="modal"
                data-target="#formModalCallOffice"
                @click="Statistic(StatisticsEnum.PhoneCount)"
              >
                <i class="mx-icon-phone"></i>
                اتصل بنا
              </button>
              <button
                class="btn d-muk-md-block d-muk-none"
                href="#modalProject"
                data-toggle="modal"
                data-target="#modalProject"
              >
                <i class="mx-icon-envelope"></i>
                راسلتا الآن
              </button>
              <!-- for mobile -->
              <button
                class="btn d-muk-md-none"
                :href="'tel:00966'+ offer.employee.user.phone"
                @click="Statistic(StatisticsEnum.PhoneCount)"
              >
                <i class="mx-icon-phone"></i>
                اتصل بنا
              </button>
              <button
                class="btn d-muk-md-none"
                href="#modalEmail"
                data-toggle="modal"
                data-target="#modalEmail"
              >
                <i class="mx-icon-envelope"></i>
                إيميل
              </button>
              <button
                class="btn d-muk-md-none whatsapp"
                href="#modalWhatsApp"
                data-toggle="modal"
                data-target="#modalWhatsApp"
              >
                <i class="mx-icon-whatsapp whatsapp"></i>
                واتس اب
              </button>
            </div>
          </div>
        </div>
      </b-tab>
      <b-tab :active="tab === 'tab-auction'" title="موقع المزاد" id="mapAuctionLocation"  @click="tab = 'tab-auction'" v-if="offer.auction && offerId">
        <GmapMap :center="offer.auction.location"
                 :zoom="zoom"
                 :options="map.options"
                 style="width: 100%; height: 100%">
          <template #visible>
            <mx-map-type-controller></mx-map-type-controller>
            <mx-map-zoom-controller v-if="$mq ==='desktop' || $mq === 'desktopWide' || $mq === 'tablet'"></mx-map-zoom-controller>
          </template>
          <GmapMarker
            :clickable="true"
            :icon="{url: '/markers/auction.svg'}"
            :position="offer.auction.location"
          ></GmapMarker>
        </GmapMap>
        <div class="box-collapse offer-details-box">
          <div
            class="box-title d-flex align-items-center green-text collapsed"
            data-toggle="collapse"
            data-target="#odb6"
            aria-expanded="false"
            aria-controls="collapse1"
          >
            <h2 :class="GetStyle()" class="card-title-type">
              <i class="mr-auto mx-icon-map-marker"></i>
              <span v-text="$t('realEstateType.' + offer.type)"></span>
              <span v-text="$t('dealTypeOperation.'+ offer.dealType)"></span>
            </h2>
            <i class="mr-auto mx-icon-chevron-up-light collapse-icon"></i>
            <i class="mr-auto mx-icon-chevron-down-light collapse-icon"></i>
          </div>

          <div class="collapse" id="odb6">
            <p v-text="offer.title"></p>
            <div class="offer-price text-red" v-if="!isAuction">

                      <span
                        v-text="formatNumber(offer.price)"
                      ></span>
              <b class="font-size-10px"> {{hasExtPrice()}} </b>
            </div>
            <div class="auction-location text-red">
              <span v-if="offer.auction.isSameLocation">في نفس موقع العقار</span>
              <span v-else>{{offer.auction.addressText}}</span>
            </div>


          </div>
          <div class="footer">
            <div class="offer-title" v-text="offer.agency.name">مكتب الغيث للعقارات</div>
            <div class="action-buttons d-muk-flex justify-content-between">
              <!-- for web site -->
              <button
                class="btn d-muk-md-block d-muk-none"
                v-if="$mq!=='mobile'"
                href="#formModalCallOffice"
                data-toggle="modal"
                data-target="#formModalCallOffice"
                @click="Statistic(StatisticsEnum.PhoneCount)"
              >
                <i class="mx-icon-phone"></i>
                اتصل بنا
              </button>
              <button
                class="btn d-muk-md-block d-muk-none"
                href="#modalProject"
                data-toggle="modal"
                data-target="#modalProject"
              >
                <i class="mx-icon-envelope"></i>
                إيميل
              </button>
              <!-- for mobile -->
              <button
                class="btn d-muk-md-none"
                :href="'tel:00966'+ offer.employee.user.phone"
                @click="Statistic(StatisticsEnum.PhoneCount)"
              >
                <i class="mx-icon-phone"></i>
                اتصل بنا
              </button>
              <button
                class="btn d-muk-md-none"
                href="#modalEmail"
                data-toggle="modal"
                data-target="#modalEmail"
              >
                <i class="mx-icon-envelope"></i>
                إيميل
              </button>
              <button
                class="btn d-muk-md-none whatsapp"
                href="#modalWhatsApp"
                data-toggle="modal"
                data-target="#modalWhatsApp"
              >
                <i class="mx-icon-whatsapp whatsapp"></i>
                واتس اب
              </button>
            </div>
          </div>
        </div>
      </b-tab>
      <b-tab :active="tab === 'tab-vTour'" v-if="offer.vTourLink && offerId" id="vrTour" title="الجولة الافتراضية" @click="tab = 'tab-vTour'">
        <iframe
          :src="offer.vTourLink.path?offer.vTourLink.path:''"
          :title="offer.title"
        ></iframe>
      </b-tab>
      <b-tab :active="tab === 'tab-plans'" title="المخططات الهندسية" id="projectDiagram" v-if="hasdesigns && offerId" @click="tab = 'tab-plans'">
        <div class="d-flex flex-wrap gallery-box carousel slide"  id="planCarousel">
          <div class="col-muk-12 col-muk-lg-4 control-section">
            <div class="carousel-indicators-container">
              <ul @wheel="checkScroll($event,'carousel-indicators-diagram')" ref="carousel-indicators-diagram" class="d-muk-flex carousel-indicators flex-wrap thumbnails-list p-3">
                <li
                  :class="{active: index===0}"
                  :key="index"
                  class="thumbnail-item"
                  v-for="(item,index) in offer.designs"
                >
                  <a
                    :data-slide-to="index"
                    :id="'carousel-selector-'+index"
                    class="selected"
                    data-target="#planCarousel"
                  >
                    <mx-img
                      :img-src="item.path"
                      ratio="3/2"
                      alt="..."
                      max-size="xs"
                      :errorImageUrl="$vDefaultRealEstateImg">
                    </mx-img>
                  </a>
                </li>
              </ul>
              <div
                class="slider-arrow indicators-controls to-top"
                ref="to-top"
                style="display:none"
                @click="scrollSlide('top')"
                v-if="($mq!=='tablet' && offer.designs.length >4) || ($mq==='tablet' && offer.designs.length >1)"
              >
                <i class="mx-icon-chevron-up-light"></i>
              </div>
              <div
                class="slider-arrow indicators-controls to-bottom"
                @click="scrollSlide('bottom')"
                v-if="($mq!=='tablet' && offer.designs.length >4) || ($mq==='tablet' && offer.designs.length >1)"
              >
                <i class="mx-icon-chevron-down-light"></i>
              </div>
            </div>
          </div>

          <div class="col-muk-12 col-muk-lg-8 photo-section carousel-inner p-3">
            <div
              :class="{active:index===0}"
              :data-slide-number="index"
              :key="index"
              class="carousel-item"
              v-for="(item,index) in offer.designs"
            >
              <mx-img
                :img-src="item.path"
                ratio="3/2"
                alt="..."
                :errorImageUrl="$vDefaultRealEstateImg">>
              </mx-img>
            </div>
            <a
              v-if="offer.designs.length>1"
              class="carousel-control-prev"
              data-slide="prev"
              href="#planCarousel"
              role="button"
            >
              <i
                class="circle-icon mx-icon-circle-chevron-left icon-with-circle"
                aria-hidden="true"
              ></i>
              <span class="sr-only">Previous</span>
            </a>
            <a
              v-if="offer.designs.length>1"
              class="carousel-control-next"
              data-slide="next"
              href="#planCarousel"
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
      </b-tab>
      <b-tab :active="tab === 'tab-photos'"  title="الصور" id="projectPhotos" v-if="hasPhotos && offerId" @click="tab = 'tab-photos'">
        <div class="d-flex flex-wrap gallery-box carousel slide" id="myCarousel">
          <div class="col-muk-12 col-muk-lg-4 control-section">
            <div class="carousel-indicators-container">
              <ul @wheel="checkScroll($event,'carousel-indicators-photo')" ref="carousel-indicators-photo" class="d-muk-flex carousel-indicators flex-wrap thumbnails-list p-3">
                <li
                  :class="{active: index===0}"
                  :key="index"
                  class="thumbnail-item"
                  v-for="(item,index) in offer.photos"
                >
                  <a
                    :data-slide-to="index"
                    :id="'carousel-selector-'+index"
                    class="selected"
                    data-target="#myCarousel"
                  >
                    <mx-img
                      :img-src="item.path"
                      ratio="3/2"
                      alt="..."
                      max-size="xs"
                      :errorImageUrl="$vDefaultRealEstateImg">
                    </mx-img>
                  </a>
                </li>
              </ul>
              <div
                ref="slider-arrow-top"
                class="slider-arrow indicators-controls to-top"
                style="display:none"
                @click="scrollSlide('top')"
                v-if="($mq!=='tablet' && offer.photos.length >6) || ($mq==='tablet' && offer.photos.length >1)"
              >
                <i class="mx-icon-chevron-up-light"></i>
              </div>
              <div
                ref="slider-arrow-bottom"
                class="slider-arrow indicators-controls to-bottom"
                @click="scrollSlide('bottom')"
                v-if="($mq!=='tablet' && offer.photos.length >6) || ($mq==='tablet' && offer.photos.length >1)"
              >
                <i class="mx-icon-chevron-down-light"></i>
              </div>

            </div>
          </div>
          <div class="col-muk-12 col-muk-lg-8 photo-section carousel-inner p-3">
            <div
              :class="{active:index===0}"
              :data-slide-number="index"
              :key="index"
              class="carousel-item"
              v-for="(item,index) in offer.photos"
            >
              <mx-img
                :img-src="item.path"
                ratio="3/2"
                alt="..."
                :errorImageUrl="$vDefaultRealEstateImg">
              </mx-img>
            </div>
            <a
              v-if="offer.photos.length>1"
              class="carousel-control-next"
              data-slide="prev"
              href="#myCarousel"
              role="button"
            >
              <i
                class="circle-icon mx-icon-circle-chevron-right icon-with-circle"
                aria-hidden="true"
              ></i>
              <span class="sr-only">Previous</span>
            </a>
            <a
              v-if="offer.photos.length>1"
              class="carousel-control-prev"
              data-slide="next"
              href="#myCarousel"
              role="button"
            >
              <i
                class="circle-icon mx-icon-circle-chevron-left icon-with-circle"
                aria-hidden="true"
              ></i>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>

      </b-tab>
      <b-tab :active="tab === 'tab-360'" title="الصور 360" id="photo360" v-if="hasphotos360 && offerId" @click="tab = 'tab-360',selected360 = 0">
        <div class="d-flex flex-wrap gallery-box carousel slide m-0" id="myCarousel1">
          <div class="col-muk-12 col-muk-lg-4 control-section">
            <div class="carousel-indicators-container">
              <ul class="d-muk-flex carousel-indicators flex-wrap thumbnails-list p-3">
                <li
                  :class="{active : selected360 === index}"
                  :key="index"
                  @click="selected360 = index"
                  class="thumbnail-item"
                  v-for="(item,index) in offer.photos360"
                >
                  <mx-img
                    :img-src="item.path"
                    ratio="2/1"
                    :noResponsive="true"
                    :errorImageUrl="$vDefaultRealEstateImg">
                  </mx-img>
                </li>
              </ul>
              <div
                class="indicators-controls to-top d-muk-none d-muk-lg-block"
                style="display:none"
                @click="scrollSlide('top')"
                v-if="offer.photos360.length > 3"
              >
                <i class="mx-icon-chevron-up-light"></i>
              </div>
              <div
                class="indicators-controls to-bottom d-muk-none d-muk-lg-block"
                @click="scrollSlide('bottom')"
                v-if="offer.photos360.length > 3"
              >
                <i class="mx-icon-chevron-down-light"></i>
              </div>
            </div>
          </div>
          <div class="col-muk-12 col-muk-lg-8 photo-section v-tour carousel-inner p-3">
            <mx-pano
              v-if="selected360 !== null"
              :src="selected360 !== null ? $vRoute.imageUrl(offer.photos360[selected360].path+'-original') : null"
            >
            </mx-pano>
          </div>
        </div>

      </b-tab>
      <b-tab :active="tab === 'tab-video'" title="فيديو العقار" v-if="offer.videoLink!==null && offerId" id="projectVideo" @click="tab = 'tab-video'">
        <iframe
          :src="getYoutubeLink(offer.videoLink.path)"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope;
								picture-in-picture"
          allowfullscreen
        ></iframe>
      </b-tab>
      <b-tab v-if="offerId" :active="tab === 'tab-school'" title="المدارس المحيطة" id="school" @click="tab = 'tab-school';defaultMapValue('mapSchool')">
        <GmapMap
          :center="map.location"
          id="school-map"
          ref="mapSchool"
          class="map-noscroll"
          @bounds_changed="getZoom('mapSchool')"
          :zoom="zoom"
          :options="map.options"
           style="width: 100%"
           :style=" $mq === 'mobile' ? 'height: calc(100% - '+collapseHeight.school+'px)' : 'height:100%'"
                 >
          <template #visible>
            <mx-map-type-controller></mx-map-type-controller>
            <mx-map-zoom-controller v-if="$mq ==='desktop' || $mq === 'desktopWide' || $mq === 'tablet'"></mx-map-zoom-controller>
          </template>
          <GmapMarker
            :clickable="true"
            :icon="{url:offerMarker()}"
            :position="offer.location"
          ></GmapMarker>
          <div class="school-markers">
            <div v-for="(item,index) in filteredSchools" :key="`school-${item.id}`">
              <mx-map-gmap-custom-marker :marker="item.location" :zIndex="-1"
                                         :class="{'z-index-10': school.active == item.id}">
                <button
                  class="mx-map-marker mx-map-marker-icon"
                  :id="'school-marker-'+item.id"
                  :class="[{active: school.active == item.id}]"
                  @click="school.active = item.id ;$root.$emit('bv::show::popover', 'school-marker-'+item.id)"
                  @mouseover="school.active = item.id ;$root.$emit('bv::show::popover', 'school-marker-'+item.id)"
                  @mouseleave="school.active = null;$root.$emit('bv::hide::popover')"
                >
                  <img
                    :data-scroll="'school-item-'+item.id"
                    @click="scrollElementIntroView($event)"
                    :src="item.sex == 1 ? '/markers/school-blue.svg' :  '/markers/school-pink.svg' "
                    alt="">
                  <b-popover :target="'school-marker-'+item.id"
                             placement="topleft"
                             custom-class="popover-mobile"
                             :container="'school-marker-'+item.id"
                             offset="0"
                             triggers="click blur hover">
                    <nuxt-link to="#">
                      <mx-card-school :school="item"></mx-card-school>
                    </nuxt-link>
                  </b-popover>
                </button>
              </mx-map-gmap-custom-marker>
            </div>
          </div>
        </GmapMap>
        <div class="box-collapse item-list-box school" id="school-collapse" >
          <div
            aria-controls="collapse1"
            aria-expanded="false"
            class="box-title d-muk-flex align-items-center"
            data-target="#odb1"
            data-toggle="collapse"
          >
            <h2 class="blue-text"> المدارس المحيطة</h2>
            <i class="mr-auto mx-icon-chevron-down-light collapse-icon"></i>
            <i class="mr-auto mx-icon-chevron-up-light collapse-icon"></i>
          </div>
          <div class="filter-section">
            <ul class="filter-tabs d-muk-flex justify-content-between">
              <li
                :class="{ active:school.sex === null }"
                @click="school.sex = null"
                class="filter-tab"
              >
                <a href="#">الجميع</a>
              </li>
              <li
                :class="{ active:school.sex === 1 }"
                @click="school.sex = 1"
                class="filter-tab"
              >
                <a href="#">بنين</a>
              </li>
              <li
                :class="{ active:school.sex === 2 }"
                @click="school.sex = 2"
                class="filter-tab"
              >
                <a href="#">بنات</a>
              </li>
            </ul>
            <div class="select-box d-muk-flex justify-content-between">
              <select v-model="school.stage">
                <option :value="1">روضة</option>
                <option :value="2">إبتدائي</option>
                <option :value="3">متوسط</option>
                <option :value="4">ثانوي</option>
              </select>
              <select v-model="school.type">
                <option :value="null">الجميع</option>
                <option :value="1">حكومي</option>
                <option :value="2">أهلية</option>
                <option :value="3">عالمية</option>
              </select>
            </div>
          </div>
          <div class="collapse show content-box" id="odb1">
            <div class="lists">
              <div class="text-center" v-if="filteredSchools.length <= 0">لا توجد نتائج</div>
              <div
                :class=" [item.sex === 1?'gender-male':'gender-female', school.active === item.id ? 'active': '']"
                :id="'school-item-'+item.id"
                @click="moveSmoothly('mapSchool',item,'school');school.active = item.id; infoContent = item;"
                @mouseleave="school.active = null;$root.$emit('bv::hide::popover')"
                :key="index"
                class="item-box d-muk-flex align-items-center"
                v-for="(item,index) in filteredSchools"
              >
                <div class="logo">
                  <img
                    :src="'/images/'+item.logo+'.jpg'"
                    onerror="this.src='/images/defaults/school.png'; this.onerror = null"
                    alt="item.title"
                  />
                  <!--                          @error="$event.target.src=$vRoute.imageUrl('/defaults/school',undefined, 'png')"-->
                </div>
                <div class="details">
                  <div class="title overflow-hidden w-100">
                    <h2 class="blue-text text-truncate overflow-hidden">{{item.title}}</h2>
                  </div>
                  <ul class="tags d-muk-flex">
                    <li>{{ $t('schoolStage.'+ item.stage) }}</li>
                    <li>{{ $t('schoolType.' + item.type) }}</li>
                    <li>{{ $t(`schoolCurriculum.${item.curriculum}`) }}</li>
                  </ul>
                  <div class="types d-muk-flex">
                    <div class="type-item">
                      <i :class="item.sex === 1?'mx-icon-male':'mx-icon-female'"></i>
                      {{ $t(`schoolSex.${item.sex}`) }}
                    </div>
                    <div class="type-item">
                      <span><i class="mx-icon-running"></i></span>
                      <span>{{ item.distance }}كم</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-tab>
      <b-tab v-if="offerId" :active="tab === 'tab-hospital'" title="المراكز الصحية" id="health" @click="tab = 'tab-hospital';defaultMapValue('mapHealth')">
        <GmapMap
          :center="map.location"
          id="hospital-map"
          ref="mapHealth"
          class="map-noscroll"
          @bounds_changed="getZoom('mapHealth')"
          :zoom="zoom"
          :options="map.options"
          style="width: 100%"
          :style=" $mq === 'mobile' ? 'height: calc(100% - '+collapseHeight.hospital+'px)' : 'height:100%'"
        >
          <template #visible>
            <mx-map-type-controller></mx-map-type-controller>
            <mx-map-zoom-controller v-if="$mq ==='desktop' || $mq === 'desktopWide' || $mq === 'tablet'"></mx-map-zoom-controller>
          </template>
          <gmap-marker
            :clickable="true"
            :icon="{url: offerMarker() }"
            :position="offer.location"
          ></gmap-marker>
          <div v-for="(item,index) in filteredHospitals" :key="`hospital-${item.id}`" >
            <mx-map-gmap-custom-marker :marker="item.location" :zIndex="-1" :class="{'z-index-10': hospital.active == item.id}">
              <button
                class="mx-map-marker mx-map-marker-icon"
                :id="'hospital-marker-'+item.id"
                :class="[{active: hospital.active == item.id}]"
                @click="hospital.active = item.id ;$root.$emit('bv::show::popover', 'hospital-marker-'+item.id)"
                @mouseover="hospital.active = item.id ;$root.$emit('bv::show::popover', 'hospital-marker-'+item.id)"
                @mouseleave="hospital.active = null;$root.$emit('bv::hide::popover')">
                <img
                  :data-scroll="'hospital-item-'+item.id"
                  @click="scrollElementIntroView($event)"
                  :src="item.isPrivate === false ? '/markers/hospital-green.svg': '/markers/hospital-blue.svg' " alt="">
                <b-popover :target="'hospital-marker-'+item.id"
                           placement="topleft"
                           :container="'hospital-marker-'+item.id"
                           custom-class="popover-mobile"
                           triggers="click blur hover" >
                  <mx-card-hospital :hospital="item"></mx-card-hospital>
                </b-popover>
              </button>
            </mx-map-gmap-custom-marker>
          </div>
        </GmapMap>
        <div class="box-collapse item-list-box health" id="health-collapse">
          <div
            aria-controls="collapse1"
            aria-expanded="false"
            class="box-title d-muk-flex align-items-center"
            data-target="#odb4"
            data-toggle="collapse"
          >
            <h2 class="blue-text ">المراكز الصحية</h2>
            <i class="mr-auto mx-icon-chevron-down-light collapse-icon"></i>
            <i class="mr-auto mx-icon-chevron-up-light collapse-icon"></i>
          </div>
          <div class="filter-section">
            <ul class="filter-tabs d-muk-flex justify-content-between">
              <li
                :class="{active:hospital.belong === null}"
                @click="hospital.belong = null"
                class="filter-tab"
              >
                <a href="#">الجميع</a>
              </li>
              <li
                :class="{active:hospital.belong === false}"
                @click="hospital.belong = false"
                class="filter-tab"
              >
                <a href="#">حكومي</a>
              </li>
              <li
                :class="{active:hospital.belong === true}"
                @click="hospital.belong = true"
                class="filter-tab"
              >
                <a href="#">خاص</a>
              </li>
            </ul>
            <div class="select-box d-muk-flex">
              <select class="flex-grow-1 w-100" v-model="hospital.type">
                <option :value="null">الكل</option>
                <option :value="t" v-for="t in 3">{{$t(`HospitalType.${t}`) }} </option>
              </select>
            </div>
          </div>
          <div class="collapse show content-box" id="odb4">
            <div class="lists">
              <div class="text-center" v-if="filteredHospitals.length <= 0">لا يوجد نتائج</div>
              <div
                :class="[item.isPrivate === false ? 'hospital-goverment' : 'hospital-private',hospital.active === item.id?'active':'']"
                :key="index"
                :id="'hospital-item-'+item.id"
                @click="hospital.active = item.id;moveSmoothly('mapHealth',item,'hospital')"
                @mouseleave="hospital.active = null ;$root.$emit('bv::hide::popover')"
                class="item-box d-muk-flex align-items-center"
                v-for="(item,index) in filteredHospitals"
              >
                <div class="logo">
                  <img
                    :src="'/images/'+item.logo+'.jpg'"
                    onerror="this.src='/images/defaults/hospital.png'; this.onerror = null"

                    alt="item.title"
                  />
                </div>
                <div class="details">
                  <div class="title overflow-hidden w-100">
                    <h2 class="blue-text text-truncate overflow-hidden">{{item.title}}</h2>
                  </div>
                  <ul class="tags d-muk-flex flex-wrap">
                    <template v-for="(s,i) in item.hospitalSpecialties">
                      <li v-if="i<4" :key="i">{{$t(`hospitalSpecialties.${s}`)}}</li>
                    </template>
                    <li
                      v-if="item.hospitalSpecialties.length>4"
                      data-toggle="tooltip"
                      data-placement="right"
                      title
                    >
                      <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                    </li>
                  </ul>
                  <div class="types d-muk-flex">
                    <div class="type-item">
                      <i class="mx-icon-phone"></i>
                      <span>{{ item.phone }}</span>
                    </div>
                    <div class="type-item">
                      <span><i class="mx-icon-running"></i></span>
                      <span>{{ item.distance }}كم</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-tab>
      <b-tab v-if="offerId" :active="tab === 'tab-mosque'" title="المساجد المحيطة" id="mosque" @click="tab = 'tab-mosque';defaultMapValue('mapMosque')">
        <GmapMap :center.sync="map.location"
                 class="map-noscroll"
                 :zoom.sync="zoom"
                 @bounds_changed="getZoom('mapMosque')"
                 style="width: 100%"
                 ref="mapMosque"
                 :options="map.options"
                 :style=" $mq === 'mobile' ? 'height: calc(100% - '+collapseHeight.mosque+'px)' : 'height:100%'"
        >
          <template #visible>
            <mx-map-type-controller></mx-map-type-controller>
            <mx-map-zoom-controller v-if="$mq ==='desktop' || $mq === 'desktopWide' || $mq === 'tablet'"></mx-map-zoom-controller>
          </template>
          <gmap-marker
            :clickable="true"
            :icon="{url:offerMarker()}"
            :position="offer.location"
          ></gmap-marker>
          <div v-for="(item,index) in mosques" :key="`mosque-${item.id}`" >
            <mx-map-gmap-custom-marker :marker="item.location" :zIndex="-1" :class="{'z-index-10': mosque.active == item.id}">
              <button
                class="mx-map-marker mx-map-marker-icon"
                :id="'mosque-marker-'+item.id"
                :class="[{active: mosque.active == item.id}]"
                @click="mosque.active = item.id ;$root.$emit('bv::show::popover', 'mosque-marker-'+item.id)"
                @mouseover="mosque.active = item.id ;$root.$emit('bv::show::popover', 'mosque-marker-'+item.id)"
                @mouseleave="mosque.active = null;$root.$emit('bv::hide::popover')">
                <img
                  :data-scroll="'mosque-item-'+item.id"
                  @click="scrollElementIntroView($event)"
                  :src="
                        item.type === 1 ? '/markers/mosque-green.svg' : '/markers/mosque-blue.svg'" alt="">
                <b-popover :target="'mosque-marker-'+item.id"
                           placement="topleft"
                           :container="'mosque-marker-'+item.id"
                           custom-class="popover-mobile"
                           triggers="click blur hover" >
                  <mx-card-mosque :mosque="item"></mx-card-mosque>
                </b-popover>
              </button>
            </mx-map-gmap-custom-marker>
          </div>

        </GmapMap>
        <div class="box-collapse item-list-box mosque" id="mosque-collapse">
          <div
            aria-controls="collapse1"
            aria-expanded="false"
            class="box-title d-muk-flex align-items-center"
            data-target="#odb3"
            data-toggle="collapse"
          >
            <h2 class="blue-text">المساجد المحيطة</h2>
            <i class="mr-auto mx-icon-chevron-down-light collapse-icon"></i>
            <i class="mr-auto mx-icon-chevron-up-light collapse-icon"></i>
          </div>
          <div class="collapse show content-box" id="odb3">
            <div class="lists">
              <div
                :class="[item.type === 1?'mosque-jamii':
                                    item.type === 2?'mosque-masjid':
                                    item.type === 3?'mosque-musalla':'',mosque.active===item.id?'active':'']"
                :key="item.id"

                @click="moveSmoothly('mapMosque',item,'mosque');mosque.active = item.id; infoContent = item"
                @mouseleave="mosque.active = null;$root.$emit('bv::hide::popover')"
                class="item-box d-muk-flex align-items-center"
                :id="'mosque-item-'+item.id"
                v-for="(item,index) in mosques"
              >
                <div class="logo">
                  <img
                    :src="item.type === 1? '/images/defaults/jamii.png' :
                          item.type === 2? '/images/defaults/masjid.png' :
                          item.type === 3? '/images/defaults/musalla.png' :''
                                        "
                    onerror="this.src='/images/defaults/masjid.png'; this.onerror = null"
                    alt="">
                </div>
                <div class="details">
                  <div class="title overflow-hidden w-100">
                    <h2 class="blue-text " style="min-height: 40px;">{{item.title}}</h2>
                  </div>
                  <div class="types d-muk-flex">
                    <div class="type-item d-flex">
                      <span><i class="mx-icon-running"></i></span>
                      <span>{{ item.distance }}كم</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-tab>

      <b-tab v-if="!offerId && agencyId" :active="tab === 'tab-branches'" title="الفروع" id="mapLocation"  @click="tab = 'tab-branches'">
        <GmapMap
          ref="agencyMap"
          :center="offer.location"
          :zoom="zoom"
          :options="map.options"
          style="width:100%"
          :style=" $mq === 'mobile' ? 'height: calc(100% - '+collapseHeight.branches+'px)' : 'height:100%'"
        >
          <template #visible>
            <mx-map-type-controller></mx-map-type-controller>
            <mx-map-zoom-controller v-if="$mq ==='desktop' || $mq === 'desktopWide' || $mq === 'tablet'"></mx-map-zoom-controller>
          </template>
          <mx-map-gmap-custom-marker
            :marker="offer.location" :zIndex="-1"
            :class="{'z-index-10': branch.active === 'main'}">
            <button
              class="mx-map-marker mx-map-marker-icon"
              :id="'branch-marker-main'"
              :class="[{active: branch.active === 'main'}]"
              @click="branch.active = 'main' ;$root.$emit('bv::show::popover', 'branch-marker-main')"
              @mouseover="branch.active === 'main' ;$root.$emit('bv::show::popover', 'branch-marker-main')"
             >
              <img
                :src="require('@/assets/images/markers/branch-red.png')"
                alt="">
              <b-popover :target="'branch-marker-main'"
                         placement="topleft"
                         :container="'branch-marker-main'"
                         custom-class="popover-mobile"
                         triggers="click blur hover">
                <mx-card-branch is-main
                                :branch="branch ={
                                  name: offer.name,
                                  phone: offer.contact.phone,
                                  email: offer.contact.email,
                                  address: offer.address
                                }
                                "
                ></mx-card-branch>
              </b-popover>
            </button>
          </mx-map-gmap-custom-marker>
          <mx-map-gmap-custom-marker
            v-for="(item, index) in branches"
            :key="index"
            :marker="item.location" :zIndex="-1"
            :class="{'z-index-10': branch.active == item.id}">
            <button
              class="mx-map-marker mx-map-marker-icon"
              :id="'branch-marker-'+item.id"
              :class="[{active: branch.active == item.id}]"
              @click="branch.active = item.id ;$root.$emit('bv::show::popover', 'branch-marker-'+item.id)"
              @mouseover="branch.active == item.id ;$root.$emit('bv::show::popover', 'branch-marker-'+item.id)"
              @mouseleave="branch.active = null;$root.$emit('bv::hide::popover')">
              <img
                :src="require('@/assets/images/markers/branch-blue.png')"
                alt="">
              <b-popover :target="'branch-marker-'+item.id"
                         placement="topleft"
                         :container="'branch-marker-'+item.id"
                         custom-class="popover-mobile"
                         triggers="click blur hover">
                <mx-card-branch  :branch="item"></mx-card-branch>
              </b-popover>
            </button>
          </mx-map-gmap-custom-marker>
        </GmapMap>
        <div class="box-collapse item-list-box offer-details-box mosque" id="box-collapse-branches">
          <div
            @click="listToggle = !listToggle"
            aria-controls="collapse1"
            aria-expanded="false"
            class="box-title d-flex align-items-center"
            data-target="#odb7"
            data-toggle="collapse"
          >
            <h2 class="text-blue font-size-14px font-weight-bold">
              المكتب الرئيسي والفروع
            </h2>
            <i
              v-if="listToggle"
              class="mr-auto mx-icon-chevron-up collapse-icon"
            ></i>
            <i
              v-if="!listToggle"
              class="mr-auto mx-icon-chevron-down collapse-icon"
            ></i>
          </div>
          <div class="collapse show content-box" id="odb7">
            <div class="lists p-0">
              <div
                :class="{active: branch.active === 'main'}"
                @click="moveSmoothly('agencyMap',offer,'branch')"
                @mouseleave="branch.active = null;$root.$emit('bv::hide::popover')"
                class="item-box item-branch-box main-branch d-flex align-items-center "
              >
                <div
                  class="logo  font-size-14px d-flex justify-content-center align-items-center "
                >
                  <div class="branch-city-title ">
                    {{$t("city." + offer.address.city)}}
                  </div>

                </div>
                <div class="details">
                  <div class="title">
                    <h3
                      style="line-height: 1rem;"
                      class="text-blue text-truncate font-size-12px"
                    >
                      {{ offer.name }}
                    </h3>
                  </div>
                  <ul class="location d-flex align-items-center m-0">
                    <i class="icons mx-icon-map-marker ml-1"> </i>
                    <li
                      v-for="(item, index) in listAddress(
                                offer.address
                              )"
                      :key="index"
                      class="font-size-9px"
                    >
                      {{ item }}
                    </li>
                  </ul>
                  <div class="types d-flex align-items-center">
                    <div class="type-item d-flex align-items-center">
                      <i class="mx-icon-phone"></i>
                      <a
                        class="font-size-9px"
                        :href="'tel:' + offer.contact.phone"
                        style="color:#818C95"
                      >{{ offer.contact.phone }}</a
                      >
                    </div>
                    <div class="type-item d-flex align-items-center">
                      <i class="mx-icon-envelope"></i>
                      <a
                        class="font-size-9px"
                        style="color:#818C95"
                        :href="'mailto:' + offer.contact.email"
                      >{{ offer.contact.phone }}</a
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div
                :class="{active: branch.active === item.id}"
                @click="moveSmoothly('agencyMap',item,'branch');branch.active = item.id"
                :key="'branch-marker-'+item.id"
                @mouseleave="branch.active = null;$root.$emit('bv::hide::popover')"
                class="item-box item-branch other-branch d-flex align-items-center"
                v-for="(item, index) in branches"
              >
                <div
                  class="logo font-size-14px d-flex justify-content-center align-items-center "
                >
                  <div class="branch-city-title ">
                    {{ $t("city." + item.address.city) }}
                  </div>
                </div>
                <div class="details overflow-hidden">
                  <div class="title">
                    <h3 style="line-height: 1rem;"
                        class="text-blue text-truncate font-size-12px"
                    >
                      {{ item.name }}
                    </h3>
                  </div>
                  <ul
                    class="location d-flex align-items-center m-0 overflow-hidden text-truncate"
                  >
                    <i class="icons mx-icon-map-marker ml-1"></i>
                    <li
                      v-for="(item, index) in listAddress(item.address)"
                      :key="index"
                      class="font-size-9px"
                    >
                      {{ item }}
                    </li>
                  </ul>
                  <div class="types d-flex">
                    <div class="type-item">
                      <i class="mx-icon-phone"></i>
                      <a
                        class="font-size-9px"
                        style="color:#818C95"
                        :href="'tel:' + item.phone"
                      >{{ item.phone }}</a
                      >
                    </div>
                    <div class="type-item">
                      <i class="mx-icon-envelope"></i>
                      <a
                        class="font-size-9px"
                        style="color:#818C95"
                        :href="'mailto:' + item.email"
                      >{{ item.email }}</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-tab>
      <b-tab :active="tab === 'tab-pdf'" v-if="offer.auction&& offer.auction.brochureUrl && offerId" title="كتيب المشروع" id="pdfProject" @click="tab = 'tab-pdf'">
        <iframe
          :src="offer.auction.brochureUrl ?docUrl+offer.auction.brochureUrl+'.pdf':''"
          :title="offer.title"
        ></iframe>
      </b-tab>
      <template #tabs-end>
        <div class="mr-auto actions">
          <ul class="d-muk-flex align-items-center">
            <li @click="addFavorite()">
              <a href="#" style="text-decoration: none">
                <i
                  class="circle-icon-gray-bg"
                  :class="offer.isFavorite ? 'mx-icon-heart' : 'mx-icon-heart-light'"
                ></i>
              </a>
            </li>
            <li
              id="dropdownMenuButton2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <a href="#" style="text-decoration: none">
                <i class="mx-icon-share circle-icon-gray-bg"></i>
              </a>
            </li>
            <div
              class="dropdown-menu popup-share-box"
              style="margin-left: -50px"
              aria-labelledby="dropdownMenuButton2"
            >
              <a class="dropdown-item d-muk-flex align-items-center" :href="$vRoute.ShareFacebook(offer,1)">
                <i class="mx-icon-facebook-square facebook"></i>
                مشاركة على فيسبوك
              </a>
              <a class="dropdown-item d-muk-flex align-items-center" :href="$vRoute.ShareTwitter(offer,1)">
                <i class="mx-icon-twitter twitter"></i>
                مشاركة على تويتر
              </a>
              <a class="dropdown-item d-muk-flex align-items-center" :href="$vRoute.ShareWhatsApp(offer,1)">
                <i class="mx-icon-whatsapp whatsapp"></i>
                مشاركة على واتس اب
              </a>
              <a
                class="dropdown-item d-muk-flex align-items-center"
                href="#modalShareMail"
                data-toggle="modal"
                data-target="#modalShareMail"
                title="Send Email"
              >
                <i class="mx-icon-envelope envelope"></i>
                إرسال عبر البريد الإلكتروني
              </a>
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="$bvModal.hide('props_popup')">
              <span aria-hidden="true">&times;</span>
            </button>
          </ul>
        </div>
      </template>
    </b-tabs>
  </b-modal>
</template>

<script>
import Vue from "vue";
import {gmapApi} from "gmap-vue";
const dealType = Object.freeze({
  residentialSell: 1,
  residentialRent: 2,
  commercialSell: 3,
  commercialRent: 4,
  forSell: 5,
  forRent: 6,
  auction: 11
});

const rentType = Object.freeze({
  monthly: 1,
  yearly: 2
});

export default {
  name: "props-popup",
  props:{
    modalId:{
      default:'props_popup',
      type: String
    },
    currentTab:{
      default: null,
      type: String
    },
    offer:{
      default: {},
      type:Object
    },
    offerId:{
      default:null,
      type:String
    },
    agencyId:{
      default:null,
      type:String
    }

  },
  data() {
    return {
      tab: null,
      zoom: 15,
      hospitals: [],
      hospital: {
        type: null,
        belong: null,
        active: null,
      },
      schools: [],
      school: {
        stage: 1,
        type: null,
        sex: null,
        active: null,
      },
      mosques: [],
      mosque: {
        active: null,
      },
      branches: [],
      branch: {
        active: null,
      },
      listToggle: false,
      collapseHeight:{
        school: null,
        mosque: null,
        hospital : null,
        branches: null,
      },
      StatisticsEnum: {
        SearchAppearCount: 1,
        DetailsShowCount: 2,
        PhoneCount: 3,
        WhatsAppCount: 4,
        MessageCount: 5,
      },
      docUrl:process.env.docUrl,
      map:{
        location:null,
        options:{
          minZoom: 15,
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: false,
          scaleControl: true,
          draggable: true,
          draggableCursor: null,
          disableDefaultUI: true,
          styles: [
            {
              featureType: 'poi',
              stylers: [{visibility: 'off'}]
            }
          ],
        }
      },
      hasdesigns: false,
      hasPhotos: false,
      hasphotos360: false,
      selected360: null,
      isAuction: null,
      isProject: null,
    }
  },
  methods:{
    getBranches() {
      this.$axios
        .get(`/agency/${this.agencyId}/branch`)
        .then(response => {
          this.branches = response.data.data;
        })
        .catch(function(error) {
          alert("حدث خطأ23");
        });
    },
    log(data) {
      console.log('load data',data)
    },
    hasExtPrice: function () {
      if (this.offer.dealType === dealType.residentialSell || this.offer.dealType === dealType.commercialSell || this.offer.dealType === dealType.forSell) return "ريال سعودي";
      if (this.offer.dealType === dealType.forRent || this.offer.dealType === dealType.commercialRent || this.offer.dealType === dealType.residentialRent){
        if (this.offer.rentType === rentType.monthly) return "ريال شهرياً";
        if (this.offer.rentType === rentType.yearly) return "ريال سنوياً";
      }

    },
    defaultMapValue(ref){
      this.$refs[ref].$mapObject.panTo(this.offer.location);
      this.$refs[ref].$mapObject.setZoom(15);
    },

    // add to favorite
    addFavorite() {
      let payload = {
        offerId: this.offer.id,
        isFavorite: this.offer.isFavorite,
      };
      this.$store.dispatch("AddFavorite", payload).then((r) => {
        this.offer.isFavorite = r;
      });
    },

    // Scroll Element Into View
    scrollElementIntroView(e){
      let elementId = e.target.dataset.scroll;
      let element =  document.getElementById(elementId);
      element.scrollIntoView()
    },


    // Move Map Smoothly
    moveSmoothly(ref,item,type){
      let that = this;
      that.$root.$emit('bv::hide::popover');
      let thisMap = that.$refs[ref].$mapObject;
      thisMap.panTo(item.location);
      function popupItem(){
        that.$root.$emit('bv::show::popover', type+'-marker-'+item.id);
        google.maps.event.removeListener(listenerHandle);
      }
      let listenerHandle = google.maps.event.addListener(thisMap, 'idle', popupItem);


    },

    // Get Current Map Zoom level
    getZoom(ref){
      this.zoom = this.$refs[ref].$mapObject.getZoom();
    },

    // Observe Element Height to change map height based on collapse height
    observeHeight(id,element) {
      let resizeObserver = new ResizeObserver((e) =>{
        this.collapseHeight[element] = e[0].contentRect.height;
      });
      resizeObserver.observe(document.getElementById(id));
      return element ;
    },

    // Get Statistic
    Statistic(statists) {
      this.$axios
        .post(
          `/offer/${this.offerId}/updateStatistics`,
          {
            StatusStatistics: statists,
          }
        )
        .then((response) => {
          if (statists === 4) {
            let whats_message = this.form.notes;
            let link = `${this.$vRoute.apiBase}/offer/realestate/${this.offer.id}`;
            location.replace(
              `https://api.whatsapp.com/send?phone=00966${this.offer.employee.user.phone}&text=${link} ${whats_message}`
            );
          }
        })
        .catch(function (error) {
          console.log(error);
          // alert("حدث خطأ");
        });
    },

    // Get Address list
    listAddress(payload) {
      if (!payload) return [];
      let address = [];
      if (payload.region != null)
        address.push(this.$t(`region.${payload.region}`));
      if (payload.city) address.push(this.$t(`city.${payload.city}`));
      if (payload.district)
        address.push(this.$t(`district.${payload.district}`));
      return address;
    },
    //format number
    formatNumber(num) {
      if (num != null)
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    // calc distance between offer and item then sort by distance
    sortByDistanceArray(data){
      data.map(x=>{
        x.distance = this.calcDist(this.offer.location,x.location)
      })
      let newData = _.orderBy(data, ['distance'],['asc'])
      return newData;
    },

    // Get Mosques List
    getMosques(Lat, lng) {
      if (this.mosques.length != 0) {
        return false;
      }
      var model = {
        location: {
          Lat: Lat,
          lng: lng,
        }
      };
      //  console.log("model:", model);
      // TODO: use axios
      this.$axios
        .post(
          `/mosques/filter`,
          model
        )
        .then((response) => {
          this.mosques = this.sortByDistanceArray(response.data);
        })
        .catch(function (error) {
          console.log(error);
          //  alert("حدث خطأ");
        });

    },

    // Get Hospitals List
    getHospitals(Lat, lng) {
      if (this.hospitals.length != 0) {
        return false;
      }
      var model = {
        location: {
          Lat: Lat,
          lng: lng,
        }
      };

      this.$axios
        .post(
          `/offer/hospital/filter`,
          model
        )
        .then((response) => {
          this.hospitals = this.sortByDistanceArray(response.data);
        })
        .catch(function (error) {
          console.log(error);
          // alert("حدث خطأ");
        });
    },

    // Get Schools List
    getSchools(Lat, lng) {
      if (this.schools.length != 0) {
        return false;
      }
      var model = {
        location: {
          Lat: Lat,
          lng: lng,
        }
      };

      this.$axios
        .post(
          `/offer/school/filter`,
          model
        )
        .then((response) => {
          this.schools = this.sortByDistanceArray(response.data);
        })
        .catch(function (error) {
          console.log(error);
          //  alert("حدث خطأ");
        });

    },

    // Calculate distance between tow points
    calcDist(offerLocation, itemLocation) {
      function degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
      }
      let lat1 = offerLocation.lat;
      let lon1 = offerLocation.lng;
      let lat2 = itemLocation.lat;
      let lon2 = itemLocation.lng;
      let earthRadiusKm = 6378.16;
      let dLat = degreesToRadians(lat2-lat1);
      let dLon = degreesToRadians(lon2-lon1);
      lat1 = degreesToRadians(lat1);
      lat2 = degreesToRadians(lat2);
      let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return (earthRadiusKm * c).toFixed(2);
    },

    checkScroll(_event,ref){
      let selector= this.$refs[ref]

      if(_event.deltaY > 0) {
        selector.scrollTop = selector.scrollTop +300
      }
      else{
        selector.scrollTop = selector.scrollTop -300
      }
      console.log(_event.deltaY)
      if(_event.deltaY<0){
        $('.to-top').hide();
      }
      else{
        $('.to-top').show();
      }

      if(_event.deltaY % 3 !== 0 && _event.deltaY>0){
        $('.to-bottom').hide();
      }
      else{
        $('.to-bottom').show();
      }

      if(selector.scrollTop === this.scrollCase){
        if(_event.deltaY > 0) {
          //selector.style.height = '340px';
        }
      }
      else {
        this.scrollCase = selector.scrollTop;
        if(_event.deltaY < 0) {
          //selector.style.height = '550px';
        }
      }
    },
    scrollSlide(position) {
      let x = 300;
      let thisElement = event.target;

      // TODO: remove jquery
      let selector = $(thisElement).siblings(".carousel-indicators")[0];

      let scroll =
        position === "top" || position === "bottom"
          ? selector.scrollTop
          : selector.scrollLeft;
      scroll =
        position === "top" || position === "left" ? scroll - x : scroll + x;

      console.log(scroll);

      if(scroll > 0){
        $('.to-top').show();
      }
      else{
        $('.to-top').hide();
      }

      if(scroll % 3 !== 0 && scroll>0){
        $('.to-bottom').hide();
      }
      else{
        $('.to-bottom').show();
      }



      console.log(scroll)
      if(scroll === this.scrollCase){
        if(position === 'bottom') {
          //selector.style.height = '340px';
        }
      }
      else {
        this.scrollCase = scroll;
        if(position === 'top') {
          //selector.style.height = '550px';
        }
      }
      selector.scroll({
        top: position === "top" || position === "bottom" ? scroll : 0,
        left: position === "top" || position === "bottom" ? 0 : scroll,
        behavior: "smooth",
      });
    },

    // Validate Youtube Like
    getYoutubeLink(youtupeLink) {
      const regex = /(?:http(?:s?):\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/gm;
      let m = regex.exec(youtupeLink);
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      // The result can be accessed through the `m`-variable.
      return `https://www.youtube.com/embed/${m[1]}`;
    },

    // Get class style base one dealtype
    GetStyle() {
      let dt = this.offer.dealType;
      if (dt == dealType.residentialSell || dt == dealType.commercialSell || dt == dealType.forSell || this.isProject) return "text-red";
      if (dt == dealType.residentialRent || dt == dealType.commercialRent || dt == dealType.forRent) return "text-blue";
      if (dt == 11) return "text-green";
    },
    offerMarker(){
      let dt = this.offer.dealType;
      let icon ;
      if (dt == dealType.residentialSell || dt == dealType.commercialSell || dt == dealType.forSell || this.isProject) icon = "home-red";
      if (dt == dealType.residentialRent || dt == dealType.commercialRent || dt == dealType.forRent) icon = "home-blue";
      if (dt == 11) icon = "home-green";

      return '/markers/'+icon+'.svg'
    }
  },
  computed: {
    google: gmapApi,
    // Filter Schools list
    filteredSchools: function () {
      if (!this.schools) return [];
      let data = this.schools;
      if (this.school.sex !== null) {
        data = data.filter((x) => x.sex == this.school.sex || x.sex == 3);
      }
      if (this.school.type !== null) {
        data = data.filter((x) => x.type == this.school.type);
      }

      if (this.school.stage !== 0) {
        data = data.filter((x) => x.stage == this.school.stage);
      }
      return data;
    },

    // Filter Hospital list
    filteredHospitals: function () {
      if (!this.hospitals) return [];
      let data = this.hospitals;
      if (this.hospital.type !== null) {
        data = data.filter((x) => x.type ===this.hospital.type);
      }
      if (this.hospital.belong !== null) {
        data = data.filter((x) => x.isPrivate == this.hospital.belong);
      }
      return data;
    },

    // Modal Attributes (id - etc..)
    modalAttribute() {
      return {
        ['id']: this.modalId,
      }
    },
  },
  watch:{
    // Watch Current active tab to call API
    currentTab: function (newValue){
      this.tab = newValue;
    },
    tab : function (newValue){
      switch (newValue) {
        case "tab-branches":
          this.getBranches()
          break;
        case "tab-mosque":
          this.getMosques(this.offer.location.lat,this.offer.location.lng)
          break;
        case "tab-hospital":
          this.getHospitals(this.offer.location.lat,this.offer.location.lng)
          break;
        case "tab-school":
          this.getSchools(this.offer.location.lat,this.offer.location.lng)
          break;
        case "tab-360":
          setTimeout(()=>{
            this.selected360 = null
            this.selected360 = 0
          },250)
          break;

      }
    }
  },
  mounted() {
    this.tab = this.currentTab;
    this.map.location = this.offer.location;
    this.hasPhotos = this.offer.photos?.length != 0;
    this.hasdesigns = this.offer.designs?.length != 0;
    this.hasphotos360 = this.offer.photos360?.length != 0;
    this.isAuction = this.offer?.auction != null;
    this.isProject = this.offer?.state != null;
    document.addEventListener('DOMNodeInserted',  ()=> {
      let schoolElement = document.getElementById('school-collapse');
      let healthElement = document.getElementById('health-collapse');
      let mosqueElement = document.getElementById('mosque-collapse');
      if(schoolElement){
        this.observeHeight('school-collapse','school')
      }
      if(healthElement){
        this.observeHeight('health-collapse','hospital')
      }
      if(mosqueElement){
        this.observeHeight('mosque-collapse','mosque')
      }
    });
  }
}
</script>

<style  lang="scss">
@import "~@/assets/n-scss/components/_popup_props.scss";
</style>
