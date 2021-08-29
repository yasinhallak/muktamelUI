<template>
  <!--template-->
  <div class="body _id_page main-detail-section" v-if="offer">
    <!--breadNav-->
    <mx-nav-breadcrumb
      class=""
      pageType="real-estates"
      :address="offer.address"
      :offerType="offer.type"
      :dealTypeOffer="dealType"
      :project="offer.realEstateDev"
      v-if="$mq!=='mobile'"
    ></mx-nav-breadcrumb>
    <!--End breadNav-->

    <!--real-estate info section-->
    <section v-if="true"
             class="page-header page-header-modern page-header-sm add_shadow pt-3 pb-2 d-muk-none d-muk-sm-block"
    >
      <div class="container-muk">
        <!--offer row-->
        <div class="row">
          <template v-if="offerLoaded">
            <div class="col-muk-8  align-self-center p-static">
              <!--offer type-->
              <h5 class="pb-2 font-size-14px" :class="GetClass">
                <i class="icons mx-icon-home"></i>
                <strong>
                  <span v-text="$t('realEstateType.'+offer.type)"></span>
                  <span v-text="$t('dealTypeOperation.'+ dealType)"></span>
                </strong>
              </h5>

              <!--title-->
              <h4
                class="text-dark mb-2 font-size-18px font-weight-bold"
                style="font-family: 'Droid Arabic Kufi'"
                v-text="offer.title"
              ></h4>
            </div>
            <div class="col-muk-4 d-muk-block d-muk-lg-none">
              <div class="text-right mb-2">
                اخر تحديث
                <span
                  v-text="$moment(offer.lastUpdateDate).locale('en').format('DD/MM/YYYY')"
                ></span>
              </div>
            </div>
          </template>
        </div>

        <!--features row-->
        <div class="row">
          <!--full address + rooms info-->
          <div class="col-muk-6 col-muk-lg-5 main_item_inner">
            <template v-if="offerLoaded">
              <h5 class="text-blue d-muk-flex align-items-center font-size-12px m-0">
                <ul class="location main-location d-muk-flex align-items-center">
                  <i class="icons mx-icon-map-marker ml-1 font-size-16px"> </i>
                  <li :key="index"
                      v-for="(item,index) in listAddress(offer.address) ">{{ item }}
                  </li>
                </ul>
              </h5>

              <div class="row pt-2">
                <div class="col-muk-auto d-muk-flex align-items-center font-size-13px"
                     v-if="hasBedRooms || offer.otherRoomsCount">
                  <div v-if="hasBedRooms">
                    <i class="icons mx-icon-bed text-5 ml-2 font-size-16px"></i>
                  </div>
                  <div v-else>
                    <i class="icons mx-icon-home text-5 ml-2 font-size-16px"></i>
                  </div>
                  <span class="font-size-13px" v-if="hasBedRooms" v-text="$t('bedrooms.' +offer.bedRoomsCount)"></span>
                  <span class="font-size-13px"
                        v-if="hasBedRooms && (offer.otherRoomsCount || offer.otherRoomsCount===0) ">+</span>
                  <span class="font-size-13px" v-text="$t('total_rooms.'+ offer.otherRoomsCount)"></span>
                </div>
                <div class="col-muk-auto d-muk-flex align-items-center" v-if="offer.bathroomsCount">
                  <div>
                    <i class="icons mx-icon-bath text-5 ml-2 font-size-16px"></i>
                  </div>
                  <span class="font-size-13px" v-text="$t('bathrooms.' +offer.bathroomsCount)"></span>
                </div>
                <template v-if="offer.type ===20 || offer.type ===11 || offer.type ===12">
                  <div class="col-muk-auto d-muk-flex align-items-center" v-if="offer.landArea">
                    <div>
                      <i class="icons mx-icon-area text-5 ml-2 font-size-16px"></i>
                    </div>
                    <span class="isLand font-size-13px" v-text="offer.landArea"></span>&nbsp; م²
                  </div>
                </template>
                <template v-else>
                  <div class="col-muk-auto d-muk-flex align-items-center" v-if="offer.buildingArea">
                    <div>
                      <i class="icons mx-icon-area text-5 ml-2 font-size-16px"></i>
                    </div>
                    <span class="isBuild font-size-13px" v-text="offer.buildingArea"></span>&nbsp;م²
                  </div>
                </template>

              </div>
            </template>
          </div>
          <!--price row-->
          <template v-if="offerLoaded">
            <div class="col-muk-3 col-muk-lg-4">
            <div class="col-muk-auto main_item_price text-center" v-if="!isAuction">
              <h2
                class="text-red font-size-32px mb-0 font-weight-bold mt-0 fixed_height pt-1"
                v-text="formatNumber(offer.price)"
              ></h2>
              <h4 class="text-blue font-size-12px mb-0 text-3 pt-3 pb-2">ريال سعودي</h4>

            </div>
            <div class="main_item_price text-center auction-date" v-if="isAuction">
              <h2 class="text-blue font-size-14px mb-0 d-flex align-items-end justify-content-center font-weight-bold mt-0 fixed_height pt-1">
                تاريخ
                المزاد
              </h2>
              <h4
                class="text-red font-size-30px font-weight-normal mb-0 text-3"
                v-text="$moment(offer.auction.date).locale('en').format('YYYY/MM/DD')"
              ></h4>
            </div>
            </div>
            <div class="col-muk-3 d-flex">
            <div class="share-now mr-auto d-muk-flex align-items-center d-muk-lg-none">
              <div
                class="share-box d-muk-flex align-items-center justify-content-center"
                id="dropdownMenuButton3"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="mx-icon-share"></i>
                شارك
              </div>
              <div class="dropdown-menu popup-share-box" aria-labelledby="dropdownMenuButton1">
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
            </div>
            </div>
          </template>


        </div>
      </div>
    </section>
    <!--End real-estate info section-->

    <!-- content of the page -->
    <div class="container-muk pb-2 realEstate-container">
      <div class="row">
        <div class="col-muk-lg-8 big-col">
          <!-- Start gallery box -->
          <div class="gallery_box add_shadow_2 slider-home" v-if="offer.photos.length>0">
            <!-- all photo show with button-->
            <div class="all_photo_cont" v-if="$mq != 'mobile'">
              <template v-if="offerLoaded">
                <template v-for="photo in offer.photos">

                  <mx-img
                    :img-src="photo.path"
                    ratio="3/2"
                    alt="Project Image"
                    max-size="md"
                    :errorImageUrl="$vDefaultRealEstateImg">>
                  </mx-img>
                </template>
              </template>

              <div class="close_all_photo">اغلاق جميع الصور</div>
            </div>
            <!--end all photo show with button-->

            <!--TODO: favorite icon-->
            <div class="show_all_photo" v-if="offer.photos.length>1">جميع الصور</div>

            <div class="thumb-gallery fav-mobile">
              <div
                class="add-favorite d-muk-flex justify-content-center align-items-center added_to_favorite d-muk-lg-none"
                @click="addFavorite()"
              >
                <a href="javascript:;" style="text-decoration: none">
                  <i :class="offer.isFavorite ? 'mx-icon-heart' : 'mx-icon-heart-light'"></i>
                </a>
              </div>
              <div
                id="OfferPhotos"
                class="owl-carousel owl-theme manual thumb-gallery-detail owl-height nav-squared nav-with-transparency real_estate_gallery owl-rtl owl-loaded owl-drag"
              ></div>
            </div>

            <!--main slide-->
            <hooper
              class="main-slider"
              :settings="hooperGallery"
              :wheel-control="false"
              v-if="hasPhotos"
            >
              <CustomSlide :key="index" v-for="(item, index) in offer.photos">
                <mx-img :img-src="item.path" ratio="3/2" max-size="md" :errorImageUrl="$vDefaultRealEstateImg">
                </mx-img>
              </CustomSlide>
              <hooper-navigation v-if="offer.photos.length>1" slot="hooper-addons">
                <img slot="hooper-prev" src="~@/assets/images/photo_slide_left.png" alt="no-photo"/>
                <img slot="hooper-next" src="~@/assets/images/photo_slide_right.png" alt="no-photo"/>
              </hooper-navigation>
              <hooper-pagination
                v-if="offer.photos.length>1"
                class="all_photo"
                slot="hooper-addons"
                :mode="$mq==='mobile'?'indicator':'fraction'"
              ></hooper-pagination>
            </hooper>
          </div>
          <!-- end galley box -->
          <div class="mobile-container">
            <template v-if="offerLoaded">
              <!-- Start sub header -->
              <div class="d-muk-sm-none" style="padding:0 15px">
                <div class="sub-header d-muk-flex pt-2">
                  <div :class="GetClass">
                    <h4 class="sub-title font-size-14px m-0" :class="GetClass">
                      <i class="mx-icon-home font-size-14px"></i>
                      <span v-text="$t('realEstateType.'+offer.type)"></span>
                      <span v-text="$t('dealTypeOperation.'+ dealType)"></span>
                    </h4>
                    <div v-if="offer.price" class="d-muk-flex text-red align-items-center mt-2">
                      <h3 class="sub-price text-red m-0" v-text="formatNumber(offer.price)"></h3>
                      <span class="font-size-20px pr-2" v-text="'ر.س'"></span>
                    </div>
                    <div class="py-2" v-if="isAuction">
                      <h3
                        class="sub-auction-date blue-text font-size-12px font-weight-bold d-muk-flex align-items-baseline"
                      >
                        <span class="text-red font-size-20px px-1">مزاد</span> بتاريخ&nbsp;
                        <span
                          v-text="$moment(offer.auction.date).locale('en').format('YYYY/MM/DD')"
                        ></span>
                      </h3>
                    </div>
                  </div>

                  <div class="share-now mr-auto">
                    <div
                      class="share-box d-muk-flex align-items-center font-size-14px justify-content-center"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="mx-icon-share"></i>
                      شارك
                    </div>
                    <div class="dropdown-menu popup-share-box" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item d-muk-flex align-items-center" :href="$vRoute.ShareFacebook(offer,1)">
                        <i class="mx-icon-facebook-square facebook"></i>
                        مشاركة على فيسبوك
                      </a>
                      <a class="dropdown-item d-muk-flex align-items-center" :href="$vRoute.ShareTwitter(offer,1)">
                        <i class="mx-icon-twitter twitter"></i>
                        مشاركة على تويتر
                      </a>
                      <a class="dropdown-item d-muk-flex align-items-center"
                         :href="$vRoute.ShareWhatsAppMobile(offer,1)">
                        <i class="mx-icon-whatsapp whatsapp"></i>
                        مشاركة على واتس اب
                      </a>
                      <a
                        class="dropdown-item"
                        href="#modalShareMail"
                        data-toggle="modal"
                        data-target="#modalShareMail"
                        title="Send Email"
                      >
                        <i class="mx-icon-envelope envelope"></i>
                        إرسال عبر البريد الإلكتروني
                      </a>
                    </div>
                  </div>
                </div>
                <div class="sub-header d-block">
                  <h5 class="text-blue pb-2 d-muk-flex align-items-center font-size-13px m-0">
                    <ul class="location d-muk-flex align-items-center">
                      <i style="font-size:16px" class="icons mx-icon-map-marker ml-1"> </i>
                      <li :key="index"
                          v-for="(item,index) in listAddress(offer.address) ">{{ item }}
                      </li>
                    </ul>
                  </h5>

                  <template>
                    <div class="d-muk-flex features mb-3">
                      <div v-if="hasBedRooms || hasRomms">
                        <i class="icons mx-icon-bed ml-2"></i>
                        <span v-if="hasBedRooms" v-text="$t('bedrooms.' +offer.bedRoomsCount)"></span>
                        <span v-if="hasBedRooms && hasRomms">+</span>
                        <span v-if="hasRomms" v-text="$t('total_rooms.'+ offer.otherRoomsCount)"></span>
                      </div>
                      <div v-if="offer.bathroomsCount || offer.bathroomsCount===0">
                        <i class="icons mx-icon-bath ml-2"></i>
                        <span v-text="$t('bathrooms.' +offer.bathroomsCount)"></span>
                      </div>
                      <template v-if="offer.type ===20 || offer.type ===11 || offer.type ===12">
                        <div v-if="offer.landArea">
                          <i class="icons mx-icon-area ml-2"></i>
                          <span v-text="offer.landArea"></span> م²
                        </div>
                      </template>
                      <template v-else>
                        <div v-if="offer.buildingArea">
                          <i class="icons mx-icon-area ml-2"></i>
                          <span v-text="offer.buildingArea"></span> م²
                        </div>
                      </template>

                    </div>
                  </template>
                </div>
              </div>
              <!-- End sub header -->
            </template>

            <!-- TODO: check each if must be viewed -->
            <hooper
              id="slide-map"
              :trimWhiteSpace="true"
              :rtl="true"
              class="slide-map"
              :settings="hooperSettingsProps"
              :wheel-control="false"
              :style="$mq!=='mobile'?{'height': '145px','margin-top':'15px'}:{'height': '125px','margin-top':'15px'}"
            >
              <CustomSlide style="margin-left: 14px;width: 110px">
                <div
                  class="prop_main"
                  @click="currentTab = 'tab-location';propsPopup=true"
                  v-b-modal.props_popup
                >
                  <div class="prop_box" style="background: url('/img/props/1.jpg') no-repeat top center"></div>
                  <div class="prop_title">الموقع على الخريطة</div>
                </div>
              </CustomSlide>
              <CustomSlide style="margin-left: 14px;width: 110px" v-if="offer.auction">
                <div
                  class="prop_main"
                  @click="currentTab = 'tab-auction';propsPopup=true"
                  v-b-modal.props_popup
                >
                  <div class="prop_box" style="background: url('/img/props/2.jpg') no-repeat top center"></div>
                  <div class="prop_title">موقع المزاد</div>
                </div>
              </CustomSlide>
              <CustomSlide style="margin-left: 14px;width: 110px" class="margin" v-if="offer.vTourLink !== null">
                <div
                  @click="currentTab = 'tab-vTour';propsPopup=true"
                  class="prop_main"
                  v-b-modal.props_popup
                >
                  <div class="prop_box" style="background: url('/img/props/3.jpg') no-repeat top center"></div>
                  <div class="prop_title">الجولة الافتراضية</div>
                </div>
              </CustomSlide>
              <CustomSlide style="margin-left: 14px;width: 110px" v-if="offer.photos360.length>0">
                <div
                  @click="currentTab = 'tab-360';propsPopup=true"
                  class="prop_main"
                  v-b-modal.props_popup
                >
                  <div class="prop_box" style="background: url('/img/props/3.jpg') no-repeat top center"></div>
                  <div class="prop_title">صور 360</div>
                </div>
              </CustomSlide>
              <CustomSlide style="margin-left: 14px;width: 110px" v-if="offer.designs.length>0">
                <div
                  @click="currentTab = 'tab-plans';propsPopup=true"
                  class="prop_main"
                  v-b-modal.props_popup
                >
                  <div class="prop_box" style="background: url('/img/props/5.jpg') no-repeat top center"></div>
                  <div class="prop_title">مخططات المشروع</div>
                </div>
              </CustomSlide>
              <CustomSlide style="margin-left: 14px;width: 110px"
                           v-if="isAuction && (offer.auction.brochureUrl !== null && offer.auction.brochureUrl.length>0)">
                <div
                  @click="currentTab = 'tab-pdf';propsPopup=true"
                  class="prop_main"
                  v-b-modal.props_popup
                >
                  <div class="prop_box" style="background: url('/img/props/pdf.png') no-repeat top center"></div>
                  <div class="prop_title">كتيب المشروع</div>
                </div>
              </CustomSlide>
              <CustomSlide style="margin-left: 14px;width: 110px" v-if="offer.videoLink !== null">
                <div
                  @click="currentTab = 'tab-video';propsPopup=true"
                  class="prop_main"
                  v-b-modal.props_popup
                >
                  <div class="prop_box" style="background: url('/img/props/6.jpg') no-repeat top center"></div>
                  <div class="prop_title">فيديو المشروع</div>
                </div>
              </CustomSlide>
              <CustomSlide style="margin-left: 14px;width: 110px">
                <div
                  @click="currentTab = 'tab-school';propsPopup=true"
                  class="prop_main"
                  v-b-modal.props_popup

                >
                  <div class="prop_box" style="background: url('/img/props/8.jpg') no-repeat top center"></div>
                  <div class="prop_title">المدارس المحيطة</div>
                </div>
              </CustomSlide>
              <CustomSlide style="margin-left: 14px;width: 110px">
                <div
                  @click="currentTab = 'tab-hospital';propsPopup=true"
                  class="prop_main"
                  v-b-modal.props_popup
                >
                  <div
                    class="prop_box" style="background: url('/img/props/9.jpg') no-repeat top center"
                  ></div>
                  <div class="prop_title">المراكز الصحية</div>
                </div>
              </CustomSlide>
              <CustomSlide style="margin-left: 14px;width: 110px">
                <div
                  @click="currentTab = 'tab-mosque';propsPopup=true"
                  class="prop_main"
                  v-b-modal.props_popup
                >
                  <div class="prop_box" style="background: url('/img/props/10.jpg') no-repeat top center"></div>
                  <div class="prop_title">المساجد المحيطة</div>
                </div>
              </CustomSlide>
              <CustomSlide style="margin-left: 14px;width: 110px" v-if="false">
                <div
                  @click="currentTab = 'tab-marketing';propsPopup=true"
                  class="prop_main"
                  v-b-modal.props_popup
                >
                  <div class="prop_box position-relative"
                       style="background: url('/img/props/6.jpg') no-repeat top center"></div>
                  <div class="prop_title">التسويق والترفيه</div>
                </div>
              </CustomSlide>
              <hooper-navigation
                v-if="
                (($mq==='desktopWide' || $mq==='desktop') && slide_map_count>6)
                || (($mq ==='tablet' || $mq==='ipad') && slide_map_count>5) ||
                ($mq==='mobile' && slide_map_count>3)"
                slot="hooper-addons"
              >
                <img
                  style="margin-top: -10px"
                  slot="hooper-prev"
                  src="../../assets/images/photo_slide_left.png"
                  alt="no-photo"
                />
                <img
                  style="margin-top: -10px"
                  slot="hooper-next"
                  src="../../assets/images/photo_slide_right.png"
                  alt="no-photo"
                />
              </hooper-navigation>
            </hooper>
            <!-- End prop boxes -->

            <!-- start Mobile Contact section -->
            <template v-if="offerLoaded">
              <ul
                id="app22"
                class="contact-us mobile-device sticky-p d-flex d-muk-sm-none justify-content-center"
              >
                <li class="background-red"
                    data-target="#formModalCallOffice"
                    data-toggle="modal" href="#formModalCallOffice">
                  <a>
                    <i class="mx-icon-phone"></i>
                    اتصل بنا
                  </a>
                </li>
                <li data-toggle="modal" data-target="#modalEmail" class="background-blue">
                  <a>
                    <i class="mx-icon-envelope"></i>
                    إيميل
                  </a>
                </li>
                <li class="background-green"
                    data-toggle="modal" data-target="#modalWhatsApp">
                  <a>
                    <i class="mx-icon-whatsapp whatsapp"></i>
                    واتساب
                  </a>
                </li>
              </ul>
            </template>
            <!-- end Mobile Contact section -->

            <!-- start tabs -->
            <div class="row d-muk-none d-muk-sm-block">
              <div class="col-muk-lg-12">
                <div class="tabs">
                  <ul class="nav nav-tabs">
                    <li class="nav-item">
                      <a class="nav-link active" href="#popular7" data-toggle="tab">التفاصيل</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#recent7" data-toggle="tab">المميزات</a>
                    </li>
                    <div v-if="offer.id" style="position:absolute; left:13px; top:5px;">
                      رقم المرجع :
                      <span v-text="offer.id"></span>
                    </div>
                  </ul>
                  <div class="tab-content bg-white hard-shadow py-3 px-3" v-if="offer">
                    <div id="popular7" class="tab-pane active">
                      <div class="row">

                        <!------------------------------------------------------->
                        <div class="p-0 col-muk-6 col-muk-sm-2 text-center mb-2" v-if="offer.type">
                          <h6 class="text-black mb-0 font-size-14px">نوع العقار</h6>
                          <h5 class="text-red mb-0 py-1 font-weight-bold"
                              v-text="$t(`realEstateType.`+offer.type)">
                          </h5>
                          <h6 v-if="offer.category" class="text-black mt-0 mb-0"
                              v-text="$t(`category.`+offer.category)">
                          </h6>
                        </div>

                        <!------------------------------------------------------->
                        <div
                          class="p-0 col-muk-6 col-muk-sm-2 text-center mb-2"
                          v-if="offer.price"
                        >
                          <h6 class="text-black mb-0 font-size-14px">سعر العقار</h6>
                          <h4
                            class="pb-0 pt-0 text-red font-weight-bold mb-0"
                            v-text="formatNumber(offer.price)"
                          ></h4>
                          <h6 class="text-black my-0">ريال سعودي</h6>
                        </div>

                        <!------------------------------------------------------->
                        <div
                          class="p-0 col-muk-6 col-muk-sm-2 text-center mb-2"
                          v-if="offer.landArea"
                        >
                          <h6 class="text-black mb-0 font-size-14px">مساحة العقار</h6>
                          <h4
                            class="pb-0 pt-0 font-weight-bold text-red mb-0"
                            v-text="offer.landArea"
                          ></h4>
                          <h6 class="text-black my-0">متر مربع</h6>
                        </div>

                        <!------------------------------------------------------->
                        <div
                          class="p-0 col-muk-6 col-muk-sm-2 text-center mb-2"
                          v-if="offer.buildingArea"
                        >
                          <h6 class="text-black mb-0 font-size-14px">
                            {{ offer.type === 16 ? 'مساحة المستودع' : 'مساحة البناء' }}
                          </h6>
                          <h4 class="pb-0 pt-0 text-red font-weight-bold mb-0" v-text="offer.buildingArea"></h4>
                          <h6 class="text-black my-0">متر مربع</h6>
                        </div>

                        <!------------------------------------------------------->
                        <div
                          class="p-0 col-muk-6 col-muk-sm-2 text-center mb-2"
                          v-if="offer.age"
                        >
                          <h6 class="text-black mb-0 font-size-14px">عمر العقار</h6>
                          <h5 class="py-1 text-red font-weight-bold mb-0">
                            <span v-text="offer.age"></span>
                            <span v-if="offer.age!==-1 || offer.age!==0">سنة</span>
                            <span v-else>شهر</span>
                          </h5>
                        </div>

                        <!------------------------------------------------------->
                        <div
                          class="p-0 col-muk-6 col-muk-sm-2 text-center mb-2"
                          v-if="offer.finishing"
                        >
                          <h6 class="text-black mb-0 font-size-14px">تشطيب العقار</h6>
                          <h5
                            class="py-1 text-red font-weight-bold my-0"
                            v-text="$t(`building_finish.`+offer.finishing)"
                          ></h5>
                        </div>
                      </div>
                      <!---------------------------------------------------------------------------------->

                      <hr class="my-2"/>

                      <div class="row">
                        <div :class="hasStreats?'col-muk-6':'col-muk-12'" v-if="hasInternalContent">
                          <h5 class="text-blue mb-2">المكونات الداخلية :</h5>
                          <div class="row font-size-14px text-black">

                            <!----------------------------------------------------->
                            <div class="col-muk-6 d-muk-flex" v-if="hasBedRooms">
                              <label for style="flex:.75">غرف النوم :</label>
                              <span v-text="$t('bedrooms.'+ offer.bedRoomsCount)"></span>
                            </div>

                            <!----------------------------------------------------->
                            <div class="col-muk-6 d-muk-flex" v-if="hasRomms">
                              <label for style="flex:.75">{{ hasTotalRooms ? 'جميع الغرف :' : 'غرف أخرى : ' }}</label>
                              <span v-text="$t('total_rooms.'+ offer.otherRoomsCount)"></span>
                            </div>

                            <!----------------------------------------------------->
                            <div class="col-muk-6 d-muk-flex" v-if="hasHalls">
                              <label for style="flex:.75">
                                الصالات :
                              </label>
                              <span v-text="$t('halls.'+offer.hallsCount)"></span>
                            </div>

                            <!----------------------------------------------------->
                            <div class="col-muk-6 d-muk-flex" v-if="hasBathRomms">
                              <label for style="flex:.75">
                                الحمامات :
                              </label>
                              <span v-text="$t('bathrooms.' +offer.bathroomsCount)"></span>
                            </div>

                            <!----------------------------------------------------->
                            <div class="col-muk-6 d-muk-flex" v-if="hasFloorNo">
                              <label for style="flex:.75">
                                رقم الدور :
                              </label>
                              <span v-text="offer.floorNo"></span>
                            </div>

                            <!----------------------------------------------------->
                            <div class="col-muk-6 d-muk-flex" v-if="hasFloor">
                              <label for style="flex:.75">
                                عدد الادوار :
                              </label>
                              <span v-text="offer.floorsCount"></span>
                            </div>

                            <!----------------------------------------------------->
                            <div class="col-muk-6 d-muk-flex" v-if="hasApartments">
                              <label for style="flex:.75">
                                عدد الشقق :
                              </label>
                              <span v-text="offer.apartmentsCount"></span>
                            </div>

                            <!----------------------------------------------------->
                            <div class="col-muk-6 d-muk-flex" v-if="hasApartmentUnits">
                              <label for style="flex:.75">
                                الوحدات السكنية :
                              </label>
                              <span v-text="offer.apartmentsCount"></span>
                            </div>

                            <!----------------------------------------------------->
                            <div class="col-muk-6 d-muk-flex" v-if="offer.shopsCount">
                              <label style="flex:.75">
                                عدد المحلات :
                              </label>
                              <span v-text="offer.shopsCount"></span>
                            </div>

                            <!----------------------------------------------------->

                          </div>
                        </div>
                        <div :class="hasInternalContent?'col-muk-6':'col-muk-12'" v-if="hasStreats">
                          <h5 class="text-blue mb-2">الشوارع المحيطة :</h5>
                          <table class="font-size-14px table table-sm table-hover text-black">
                            <tbody>
                            <template v-if="offerLoaded">
                              <template v-for="street in offer.streets">
                                <tr class="street-table">
                                  <td>
                                    {{
                                      $t(`street_sides.${street.direction}`)
                                    }}
                                    بعرض (
                                    <span v-text="street.width"></span> م
                                    )
                                  </td>

                                  <td v-if="isLand">
                                    الواجهة :
                                    (
                                    <span
                                      v-text="offer.width"
                                    ></span> م )
                                  </td>
                                </tr>
                              </template>
                            </template>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div id="recent7" class="tab-pane">
                      <ul class="features-list list list-icons list-secondary collapse show px-3">
                        <template v-if="offerLoaded">
                          <template v-for="feature in offer.features">
                            <li v-text="$t(`features.`+ feature)"></li>
                          </template>
                        </template>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- end tabs -->

            <!-- start offer details -->
            <template v-if="offerLoaded">
              <div class="offer-details d-muk-sm-none">
                <div
                  class="offer-title font-weight-bold font-size-14px px-0"
                  v-text="offer.title"
                >دوبلكس جديد للبيع في حي المقبل
                </div>
                <div class="offer-table">
                  <table>
                    <tbody>
                    <tr v-if="offer.type">
                      <td>نوع العقار</td>
                      <td class="font-size-13px font-weight-bold" v-text="$t(`realEstateType.`+offer.type)">دوبلكس سكني</td>
                    </tr>
                    <tr v-if="isAuction">
                      <td>تاريخ المزاد</td>
                      <td class="info">
                        <b
                          class="ml-2"
                          v-text="$moment(offer.auction.date).locale('en').format('YYYY/MM/DD')"
                        ></b>
                      </td>
                    </tr>
                    <tr v-if="!isAuction">
                      <td>سعر العقار</td>
                      <td class="info">
                        <b class="ml-2" v-text="formatNumber(offer.price)"></b>
                        ريال سعودي
                      </td>
                    </tr>
                    <tr v-if="offer.landArea">
                      <td>مساحة العقار</td>
                      <td class="info">
                        <b class="ml-2">{{offer.landArea | toComma}}</b>
                        <span class="font-size-11px">متر مربع</span>
                      </td>
                    </tr>
                    <tr v-if="offer.buildingArea">
                      <td>مساحة البناء</td>
                      <td class="info">
                        <b class="ml-2">{{offer.buildingArea | toComma}}</b>
                        <span class="font-size-11px">متر مربع</span>
                      </td>
                    </tr>
                    <tr v-if="offer.age">
                      <td>عمر العقار</td>
                      <td class="info">
                        <b class="ml-2" v-text="offer.age"></b>
                        <span v-show="offer.age!=-1 || offer.age!=0">سنة</span>
                      </td>
                    </tr>
                    <tr v-if="offer.finishing">
                      <td>تشطيب العقار</td>
                      <td class="info ml-2" v-text="$t(`building_finish.`+offer.finishing)"></td>
                    </tr>
                    <tr>
                      <td class="font-size-13px" style="color:#777777">رقم المرجع</td>
                      <td style="color:#777777" class="info ml-2 font-size-14px" v-text="offer.id"></td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </template>
            <!-- End offer details -->

            <!-- start details -->
            <div class="box-collapse d-muk-sm-none" v-show="hasInternalContent">
              <div
                class="box-title d-muk-flex align-items-center blue-text"
                data-toggle="collapse"
                data-target="#collapse1"
                aria-expanded="false"
                aria-controls="collapse1"
              >
                <h2 class="blue-text">المكونات الداخلية</h2>
                <i class="mr-auto mx-icon-chevron-down-light"></i>
                <i class="mr-auto mx-icon-chevron-up-light"></i>
              </div>
              <div class="collapse show" id="collapse1">
                <table>
                  <tbody>

                  <!----------------------------------------------------->
                  <tr>
                    <td v-if="hasBedRooms">
                      <label for>غرف نوم:</label>
                      <span v-text="$t('total_rooms.'+ offer.bedRoomsCount)"></span>
                    </td>
                    <td v-if="hasRomms">
                      <label for>{{ hasTotalRooms ? 'إجمالي الغرف :' : 'غرف أخرى : ' }}</label>
                      <span v-text="$t('total_rooms.'+ offer.otherRoomsCount)"></span>
                    </td>
                  </tr>

                  <!----------------------------------------------------->
                  <tr>
                    <td v-if="hasHalls">
                      <label for>الصالات:</label>
                      <span v-text="$t('halls.'+offer.hallsCount)"></span>
                    </td>
                    <td v-if="hasBathRomms">
                      <label for>الحمامات:</label>
                      <span v-text="$t('bathrooms.' +offer.bathroomsCount)">2</span>
                    </td>
                  </tr>

                  <!----------------------------------------------------->
                  <tr>
                    <td v-if="hasFloorNo">
                      <label for>رقم الدور:</label>
                      <span v-text="offer.floorNo"></span>
                    </td>
                    <td v-if="hasFloor">
                      <label for>الأدوار:</label>
                      <span v-text="offer.floorsCount"></span>
                    </td>
                  </tr>

                  <!----------------------------------------------------->
                  <tr v-if="hasApartments">
                    <td v-if="hasApartments">
                      <label for>عدد الشقق:</label>
                      <span v-text="offer.apartmentsCount"></span>
                    </td>
                    <td v-if="hasApartmentUnits">
                      <label for>عدد الوحدات السكنية:</label>
                      <span v-text="offer.apartmentsCount"></span>
                    </td>
                  </tr>

                  <!----------------------------------------------------->
                  <tr v-if="offer.shopsCount">
                    <td v-if="offer.shopsCount">
                      <label for>عدد المحلات:</label>
                      <span v-text="offer.shopsCount"></span>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- End details -->

            <!-- Start Streets -->
            <div class="box-collapse d-muk-sm-none" v-show="hasStreats">
              <div
                class="box-title d-muk-flex align-items-center blue-text"
                data-toggle="collapse"
                data-target="#collapse2"
                aria-expanded="false"
                aria-controls="collapse2"
              >
                <h2 class="blue-text">الشوارع المحيطة</h2>
                <i class="mr-auto mx-icon-chevron-down-light"></i>
                <i class="mr-auto mx-icon-chevron-up-light"></i>
              </div>
              <div class="collapse show" id="collapse2">
                <table>
                  <tbody>
                  <template v-if="offerLoaded">
                    <template v-for="street in offer.streets">
                      <tr class="font-size-12px">
                        <td>
                          <label>
                            شمالي شرقي بعرض (
                            <span v-text="street.width">20</span>
                            م)
                          </label>
                        </td>
                        <td v-show="isLand">
                          <label>
                            الواجهة : (
                            <span v-text="offer.width">16</span>
                            م)
                          </label>
                        </td>
                      </tr>
                    </template>
                  </template>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- end Streets -->
            <!--<template v-if="offerLoaded">
              <div
                class="mobile-box auction-location row align-items-center"
                v-if="isAuction && offer.auction.addressText"
              >
                <div>
                  <h2 class="title">موقع المزاد:</h2>
                  <span v-text="offer.auction.addressText">
                    فندق هوليداي إن الرياض - القاعة
                    الذهبية
                  </span>
                </div>
                <button
                  class="mr-auto"
                  v-b-modal.modal-auction-address
                >
                  الموقع على الخريطة
                  <i class="mx-icon-map-marker"></i>
                </button>
                <b-modal
                  id="modal-auction-address"
                  centered
                  hide-footer
                >
                  <GmapMap :center="offer.auction.location"
                           :zoom="zoom"
                           :options="map.options"
                           style="width: 100%; height: 100%">
                    <template #visible>
                      <mx-map-type-controller></mx-map-type-controller>
                      <mx-map-zoom-controller
                        v-if="$mq ==='desktop' || $mq === 'desktopWide' || $mq === 'tablet'"></mx-map-zoom-controller>
                    </template>
                    <GmapMarker
                      :clickable="true"
                      :icon="{url:require('@/assets/images/markers/offer.png')}"
                      :position="offer.auction.location"
                    ></GmapMarker>
                  </GmapMap>
                </b-modal>
              </div>
            </template>-->

            <!-- Start details -->
            <div class="row" :class="$mq==='mobile'?'box-collapse2':''" v-show="offer.description">
              <div class="col-muk-lg-12">
                <div class="bg-white hard-shadow mt-1 py-2 px-3">
                  <h4 class="mb-1 blue-text font-weight-bold">الوصف</h4>
                  <div class="sidebar-box black read-close">
                    <p
                      :style="[readmore ? {'max-height': 9999 + 'px'} : {'max-height': 100 + 'px'}]"
                      class="text-dark desc-text font-size-16px"
                    >{{ offer.description }}</p>
                    <p
                      :style="offer.description.length<300?'flex-direction:row-reverse':''"
                      :class="{ 'bg_white': !readmore && offer.description.length>300 }"
                      class="read-more custom-readMore d-muk-flex align-items-center justify-content-between w-100"
                    >
                      <button
                        v-if="offer.description.length>300"
                        @click="readmore = !readmore"
                        class="button_more text-blue btn btn-outline btn-light rounded-0 mb-2 text-secondary no-border"
                        type="button"
                      >
                        <span class="more_ font-size-13px" v-if="!readmore">قراءة المزيد</span>
                        <span class="less_ font-size-13px" v-if="readmore">أقل</span>
                        <span class="icon-wrapper">
                          <i :class="readmore?'mx-icon-chevron-up-light ml-1 font-size-16px':'mx-icon-chevron-down-light ml-1 font-size-16px'"></i>
                        </span>
                      </button>
                      <button
                        class="realEstate-button button_report text-blue btn btn-outline btn-light bg-white rounded-0 mb-2 text-secondary"
                        data-target="#modalproblem"
                        data-toggle="modal"
                        href="#modalproblem"
                        type="button"
                      >
                        <span class="icon-wrapper">
                          <i class="mx-icon-warning-light text-red"></i>
                        </span>
                        <span v-if="$mq !== 'mobile'">ابلغنا عن مشكلة في هذا العقار</span>
                        <span v-if="$mq === 'mobile'">إبلاغ عن العقار</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- end details -->

            <!-- Start Auction details -->
            <template v-if="offerLoaded">
              <div class="collapse-box mobile-box px-2" v-if="isAuction && offer.auction.requirements">
                <div class="title">
                  <h4 class="mb-1 blue-text font-weight-bold">شروط المزاد</h4>
                </div>
                <div class="sidebar-box black">
                  <p
                    class="text-dark desc-text font-size-16px font-weight-normal"
                    :style="[readMoreAuction ? {'max-height': 9999 + 'px'} : {'max-height': 100 + 'px'}]"
                    v-text="offer.auction.requirements"
                  ></p>
                  <p
                    :class="{ 'bg_white': !readMoreAuction && offer.auction.requirements.length>250 }"
                    class="read-more d-muk-flex align-items-center justify-content-between w-100"
                  >
                    <button
                      v-if="offer.auction.requirements.length>250"
                      @click="readMoreAuction = !readMoreAuction"
                      class="button_more text-blue btn btn-outline btn-light rounded-0 mb-2 text-secondary no-border"
                      type="button"
                    >
                      <span class="more_ font-size-13px" v-if="!readMoreAuction">قراءة المزيد</span>
                      <span class="less_ font-size-13px" v-if="readMoreAuction">أقل</span>
                      <span class="icon-wrapper">
                        <i :class="readMoreAuction?'mx-icon-chevron-up-light':'mx-icon-chevron-down-light'"></i>
                      </span>
                    </button>
                  </p>
                  <!--<div class="footer">
                    <span class="read read-more">قراء المزيد</span>
                    <span class="read read-less">قراء أقل</span>
                    <i class="fas fa-angle-down"></i>
                  </div>-->
                </div>
              </div>
            </template>

            <!-- end Auction details -->

            <!-- Start Features -->
            <div class="box-collapse d-muk-sm-none" v-if="hasFeature">
              <div
                class="box-title d-muk-flex align-items-center blue-text"
                data-toggle="collapse"
                data-target="#collapse3"
                aria-expanded="false"
                aria-controls="collapse3"
              >
                <h2 class="blue-text">المميزات</h2>
                <i class="mr-auto mx-icon-chevron-down-light"></i>
                <i class="mr-auto mx-icon-chevron-up-light"></i>
              </div>
              <div id="collapse3" class="collapse show">
                <ul class="features-list list list-icons list-secondary px-3">
                  <template v-if="offerLoaded">
                    <template v-for="feature in offer.features">
                      <li v-text="$t(`features.`+ feature)"></li>
                    </template>
                  </template>
                </ul>
              </div>
            </div>
            <!-- End Features -->

            <!-- Start company information -->
            <template v-if="offerLoaded">
              <div class="company-information mobile-box text-center">
                <div class="sub-title">
                  تمت اضافته بواسطة
                </div>
                <div class="logo">
                  <mx-img
                    :img-src="offer.agency.logo"
                    :noResponsive="true"
                    ratio="3/2"
                    :errorImageUrl="$vDefaultAgencyImg">
                  </mx-img>

                </div>
                <div class="title">
                  {{ offer.agency.name }}
                </div>
                <div class="location">
                  <span class="main-office">المكتب الرئيسي:</span>
                  <span>{{ $t(`district.${offer.agency.address.district}`) }} -
                {{ $t(`city.${offer.agency.address.city}`) }}</span>
                </div>
                <div class="show-link">
                  <a class="d-flex align-items-center justify-content-center" :href="`/agencies/${offer.agency.id}`">
                    شاهد جميع عقاراتنا
                    <i class="mx-icon-chevron-left"></i>
                  </a>
                </div>
                <ul class="contact-us d-flex justify-content-between m-0">
                  <li>
                    <a data-target="#formModalCallOffice"
                       data-toggle="modal" href="#formModalCallOffice">
                      <i class="mx-icon-phone"></i>
                      اتصل بنا
                    </a>
                  </li>
                  <li>
                    <a data-target="#modalEmail" data-toggle="modal" href="">
                      <i class="mx-icon-envelope"></i>
                      إيميل
                    </a>
                  </li>
                  <li>
                    <a data-target="#modalWhatsApp" data-toggle="modal" href="">
                      <i class="mx-icon-whatsapp"></i>
                      واتساب
                    </a>
                  </li>
                </ul>
                <ul class="contact-us-768 big-screen-buttons m-0">
                  <li>
                    <a class="font-size-16px" data-target="#formModalCallOffice"
                       data-toggle="modal" href="#formModalCallOffice">
                      <i class="mx-icon-phone"></i>
                      اتصل بنا
                    </a>
                  </li>
                  <li>
                    <a class="font-size-16px" href="javascript:;" data-toggle="modal" data-target="#modalEmail">
                      <i class="mx-icon-envelope envelope"></i>
                      راسلنا
                    </a>
                  </li>
                </ul>
              </div>
            </template>

            <!-- End company information -->

            <!-- start calculater -->
            <!-- v-if="offer.hasMortgage"-->
            <client-only v-if="offer.hasMortgage">
              <div class="row d-muk-none d-muk-sm-block">
                <div class="col-muk-lg-12">
                  <div class="bg-white hard-shadow mt-3 pt-3 px-3 rest_calculater">
                    <div class="row calculator-row">
                      <div class="col-muk-lg-6 control-col">
                        <h4 class="mt-1 mb-4 text-blue font-size-18px font-weight-bold">حاسبة التمويل العقاري</h4>
                        <h6 class="mb-2 font-size-14px text-black">قيمة العقار :</h6>
                        <div class="mb-3 calc_row">
                          <button type="button" class="calc_left_button am_btn calc_add_p">
                            <i class="mx-icon-chevron-left text-blue" style="font-size: 12px;"></i>
                          </button>
                          <input
                            type="text"
                            :value="offer.price + 'ريال'"
                            placeholder
                            class="calc_inp calc_p"
                            style="width:80%;"
                          />
                          <button type="button" class="calc_right_button am_btn calc_minus_p">
                            <i class="mx-icon-chevron-right text-blue" style="font-size: 12px;"></i>
                          </button>
                        </div>

                        <h6 class="mb-2 font-size-14px text-black">مدة القرض :</h6>
                        <div class="mb-3 calc_row">
                          <button type="button" class="mb-2 calc_left_button am_btn calc_add_t">
                            <i class="mx-icon-chevron-left text-blue" style="font-size: 12px;"></i>
                          </button>
                          <input
                            readonly
                            type="text"
                            value="10 سنة"
                            class="calc_inp calc_t"
                            style="width:80%;"
                          />
                          <button type="button" class="mb-2 calc_right_button am_btn calc_minus_t">
                            <i class="mx-icon-chevron-right text-blue" style="font-size: 12px;"></i>
                          </button>
                        </div>

                        <h6 class="mb-2 font-size-14px text-black">الدفعة المقدمة :</h6>
                        <div class="mb-3 calc_row">
                          <button type="button" class="mb-2 calc_left_button am_btn calc_add_k">
                            <i class="mx-icon-chevron-left text-blue" style="font-size: 12px;"></i>
                          </button>
                          <input
                            readonly
                            type="text"
                            value="10%"
                            class="calc_inp calc_k"
                            style="width:30%;"
                          />
                          <input
                            readonly
                            type="text"
                            value="100000 ريال"
                            class="calc_inp calc_k_m"
                            style="width:48%;"
                          />
                          <button type="button" class="mb-2 calc_right_button am_btn calc_minus_k">
                            <i class="mx-icon-chevron-right text-blue" style="font-size: 12px;"></i>
                          </button>
                        </div>

                        <h6 class="mb-2 font-size-14px text-black">هامش الربح :</h6>
                        <div class="mb-3 calc_row">
                          <button type="button" class="mb-2 calc_left_button am_btn calc_add_r">
                            <i class="mx-icon-chevron-left text-blue" style="font-size: 12px;"></i>
                          </button>
                          <input
                            readonly
                            type="text"
                            value="% 3.5"
                            class="calc_inp calc_r"
                            style="width:80%;"
                          />
                          <button type="button" class="mb-2 calc_right_button am_btn calc_minus_r">
                            <i class="mx-icon-chevron-right text-blue" style="font-size: 12px;"></i>
                          </button>
                        </div>
                      </div>
                      <div class="col-muk-lg-6 board-col">
                        <div class="calc_resault_box">
                          <h6 class="mb-1 font-size-12px">القسط الشهري</h6>
                          <h1 class="mb-0 text-red">
                            <span class="calc_pm font-size-36px font-weight-bold">12,750</span>
                            <span style="font-size:14px">ريال</span>
                          </h1>
                          <h6 class="mb-1 font-size-12px">اجمالي مبلغ السداد</h6>
                          <h4 class="mb-0 text-blue d-flex align-items-center justify-content-center">
                            <span class="calc_v font-size-20px font-weight-bold pl-2">900,000</span>
                            <span class="font-size-14px font-weight-normal">ريال</span>
                          </h4>
                        </div>
                        <div class="d-muk-none d-muk-sm-block">
                          <h6
                            style="font-size:14px"
                            class="mt-3 mb-0 text-red font-weight-bold text-center"
                          >
                            نبحث لك عن أفضل تمويل لهذا العقار
                          </h6>
                          <h6
                            class="mt-3 text-blue font-weight-bold text-center font-size-14px"
                          >
                            رحلة
                            ممتعة
                          </h6>
                          <p style="font-size:12px;width:256px;line-height:22px"
                             class="text-center mb-0 text-black py-2">
                            تتيح لك الاطلاع على جميع برامج التمويل المناسبة المقدمة من البنوك وشركات التمويل العقاري
                          </p>
                        </div>

                        <button
                          @click="onClickMortgage"
                          type="button"
                          class="btn btn-3d btn-danger btn-block font-size-14px text-4"
                        >ابحث عن تمويل مناسب لهذا العقار
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </client-only>
            <template v-if="offer.hasMortgage">
              <div class="box-collapse d-muk-sm-none rest_calculater">
                <!--<div
                  class="box-title d-muk-flex align-items-center blue-text"
                  data-toggle="collapse"
                  data-target="#collapse4"
                  aria-expanded="false"
                  aria-controls="collapse4"
                >-->
                <h2 class="blue-text text-center font-size-18px font-weight-bold">حاسبة التمويل العقاري</h2>
                <!--<i class="mr-auto mx-icon-chevron-down-light"></i>
                <i class="mr-auto mx-icon-chevron-up-light"></i>-->
                <!--              </div>-->
                <div class="px-1 pb-3" id="collapse4">
                  <div class="calc_resault_box">
                    <h6 class="mb-1 font-size-12px">القسط الشهري</h6>
                    <h1 class="mb-0 text-red">
                      <span class="calc_pm font-size-36px font-weight-bold">12,750</span>
                      <span style="font-size:14px">ريال</span>
                    </h1>
                    <h6 class="mb-1 font-size-12px">اجمالي مبلغ السداد</h6>
                    <h4 class="mb-0 text-blue d-flex align-items-center justify-content-center">
                      <span class="calc_v font-size-20px font-weight-bold pl-2">900,000</span>
                      <span class="font-size-14px font-weight-normal">ريال</span>
                    </h4>
                  </div>
                  <br/>
                  <div class="col-muk-lg-6 text-center control-sm-section">
                    <h6 class="mb-2 font-size-14px text-black">قيمة العقار</h6>
                    <div class="mb-3 calc_row">
                      <button type="button" class="calc_left_button am_btn calc_add_p">
                        <i class="mx-icon-chevron-left text-blue" style="font-size: 12px;"></i>
                      </button>
                      <input
                        type="text"
                        :value="offer.price + 'ريال'"
                        placeholder
                        class="calc_inp calc_p"
                        style="width:80%;"
                      />
                      <button type="button" class="calc_right_button am_btn calc_minus_p">
                        <i class="mx-icon-chevron-right text-blue" style="font-size: 12px;"></i>
                      </button>
                    </div>

                    <h6 class="mb-2 font-size-14px text-black">مدة القرض</h6>
                    <div class="mb-3 calc_row">
                      <button type="button" class="mb-2 calc_left_button am_btn calc_add_t">
                        <i class="mx-icon-chevron-left text-blue" style="font-size: 12px;"></i>
                      </button>
                      <input
                        readonly
                        type="text"
                        value="10 سنة"
                        class="calc_inp calc_t"
                        style="width:80%;"
                      />
                      <button type="button" class="mb-2 calc_right_button am_btn calc_minus_t">
                        <i class="mx-icon-chevron-right text-blue" style="font-size: 12px;"></i>
                      </button>
                    </div>

                    <h6 class="mb-2 font-size-14px text-black">الدفعة المقدمة</h6>
                    <div class="mb-3 calc_row">
                      <button type="button" class="mb-2 calc_left_button am_btn calc_add_k">
                        <i class="mx-icon-chevron-left text-blue" style="font-size: 12px;"></i>
                      </button>
                      <input
                        readonly
                        type="text"
                        value="10%"
                        class="calc_inp calc_k"
                        style="width:30%;"
                      />
                      <input
                        readonly
                        type="text"
                        value="100000 ريال"
                        class="calc_inp calc_k_m"
                        style="width:48%;"
                      />
                      <button type="button" class="mb-2 calc_right_button am_btn calc_minus_k">
                        <i class="mx-icon-chevron-right text-blue" style="font-size: 12px;"></i>
                      </button>
                    </div>

                    <h6 class="mb-2 font-size-14px text-black">هامش الربح</h6>
                    <div class="mb-3 calc_row">
                      <button type="button" class="mb-2 calc_left_button am_btn calc_add_r">
                        <i class="mx-icon-chevron-left text-blue" style="font-size: 12px;"></i>
                      </button>
                      <input
                        readonly
                        type="text"
                        value="% 3.5"
                        class="calc_inp calc_r"
                        style="width:80%;"
                      />
                      <button type="button" class="mb-2 calc_right_button am_btn calc_minus_r">
                        <i class="mx-icon-chevron-right text-blue" style="font-size: 12px;"></i>
                      </button>
                    </div>
                  </div>

                  <br/>
                  <button
                    type="button"
                    class="btn search-finance btn-3d btn-danger btn-block rounded-0 mb-2 text-4">
                    ابحث عن تمويل مناسب لهذا العقار
                  </button>
                </div>
              </div>
            </template>

            <!-- End calculater -->

            <!-- start bread crumb -->
            <template v-if="offerLoaded">
              <ul class="mobile-box bread-crumb row align-items-center d-muk-md-none">
                <li>
                  <a href class="font-size-12px">
                    <span>
                      دوبلكسات
                      <span v-text="$t('dealTypeOperation.'+ dealType)"></span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href class="font-size-12px">
                    <span v-text="$t('region.'+ offer.address.region)">
                      منطقة
                      الرياض
                    </span>
                  </a>
                </li>
                <li>
                  <a href class="font-size-12px">
                    <span v-text="$t('city.'+ offer.address.city)">المجمعة</span>
                  </a>
                </li>
                <li v-if="offer.address.district">
                  <a href class="font-size-12px">
                    <span v-text="$t('district.'+ offer.address.district)">المطار</span>
                  </a>
                </li>
              </ul>
            </template>

            <!-- End bread crumb -->

            <!-- start Need Land -->
            <div v-if="isLand && plansCount" class="bg-white hard-shadow mt-3 py-3 px-3">

              <!--for big devices-->
              <div class="row d-muk-none d-muk-sm-flex">
                <div class="col-muk-sm-7 pl-1 label-area-col">
                  <h4 class="mt-1 mb-1 blue-text font-size-18px font-weight-bold">عاجبتك الأرض ؟</h4>
                  <h4 class="mt-0 mb-1 text-red font-size-18px font-weight-bold">أبشر... بعزّك</h4>
                  <div class="font-size-13px mb-1 texts-row">
                    <span class="text-blue font-size-13px font-weight-bold">يقدم لك مكتمل :</span>
                    <span class="text-black font-size-13px font-weight-normal">                    أحدث مخططات الفلل السكنية بجميع أنواعها من أرقى المكاتب الهندسية في
                      المملكة</span>
                    <br/>
                    <span class="text-blue font-size-13px font-weight-bold">يحسب لك مكتمل :</span>
                    <span class="text-black font-size-13px font-weight-normal">                    جميع تكاليف البناء و التشطيب بأدق التفاصيل</span>
                    <br/>
                    <span class="text-blue font-size-13px font-weight-bold">يؤمن لك مكتمل :</span>
                    <span class="text-black font-size-13px font-weight-normal">أكثر المقاولين خبرة لبناء منزل أحلامك</span>
                    <br/>
                    <span class="text-blue font-size-13px font-weight-bold">يبحث لك مكتمل :</span>
                    <span class="text-black font-size-13px font-weight-normal">                       عن محلات مواد البناء والمفروشات لاستكمال منزلك السعيد</span>
                    <h4 class="mt-2 mb-1 text-red font-size-18px font-weight-bold">
                      وأكثر... بس أنت تدلل
                    </h4>
                  </div>
                </div>
                <div class="col-muk-sm-5 calc-area-col">
                  <div class="calc_resault_box my-3 py-4 ml-0 mr-0">
                    <h6 class="mb-1 font-size-14px">أكثر من</h6>
                    <h1 class="mb-0 text-primary font-weight-bold">
                      <span class="calc_pm1 text-red font-size-28px font-weight-bold">{{ plansCount | toComma }}</span>
                    </h1>

                    <h6 style="line-height: 24px" class="mb-0 text-black font-size-14px">
                      مخطط هندسي
                      <br/>مناسب
                      لهذه
                      الأرض
                    </h6>
                  </div>
                  <nuxt-link :to="searchPlan">
                    <button
                      type="button"
                      class="btn btn-3d btn-danger btn-block rounded-0 font-weight-bold text-4"
                    >ابحث عن مخطط هندسي
                    </button>
                  </nuxt-link>

                </div>
              </div>

              <!--for small devices-->
              <div class="row d-muk-flex d-muk-sm-none">
                <div class="col-muk-12 calc-area-col label-area-col mobile-area-col">
                  <h4 class="mt-1 mb-1 blue-text text-center font-size-18px font-weight-bold">عاجبتك الأرض ؟</h4>
                  <h4 class="mt-0 mb-1 text-red text-center font-size-18px font-weight-bold">أبشر... بعزّك</h4>

                  <div class="calc_resault_box my-3 py-4 ml-0 mr-0">
                    <h6 class="mb-1 font-size-14px">أكثر من</h6>
                    <h1 class="mb-0 text-primary font-weight-bold">
                      <span class="calc_pm1 text-red font-size-28px font-weight-bold">{{ plansCount | toComma }}</span>
                    </h1>

                    <h6 style="line-height: 24px" class="mb-0 text-black font-size-14px">
                      مخطط هندسي
                      <br/>مناسب
                      لهذه
                      الأرض
                    </h6>
                  </div>

                  <div class="font-size-13px mb-1 texts-row">
                    <span class="text-blue font-size-13px font-weight-bold">يقدم لك مكتمل :</span>
                    <span class="text-black font-size-13px font-weight-normal">                    أحدث مخططات الفلل السكنية بجميع أنواعها من أرقى المكاتب الهندسية في
                      المملكة</span>
                    <br/>
                    <span class="text-blue font-size-13px font-weight-bold">يحسب لك مكتمل :</span>
                    <span class="text-black font-size-13px font-weight-normal">                    جميع تكاليف البناء و التشطيب بأدق التفاصيل</span>
                    <br/>
                    <span class="text-blue font-size-13px font-weight-bold">يؤمن لك مكتمل :</span>
                    <span class="text-black font-size-13px font-weight-normal">أكثر المقاولين خبرة لبناء منزل أحلامك</span>
                    <br/>
                    <span class="text-blue font-size-13px font-weight-bold">يبحث لك مكتمل :</span>
                    <span class="text-black font-size-13px font-weight-normal">                       عن محلات مواد البناء والمفروشات لاستكمال منزلك السعيد</span>
                    <h4 class="mt-2 mb-1 text-red font-size-18px font-weight-bold">
                      وأكثر... بس أنت تدلل
                    </h4>
                  </div>

                  <nuxt-link :to="searchPlan">
                    <button
                      type="button"
                      class="btn btn-3d btn-danger btn-block rounded-0 font-weight-bold text-4"
                    >ابحث عن مخطط هندسي
                    </button>
                  </nuxt-link>
                </div>
              </div>

            </div>
            <!-- End Need Land -->


          </div>
        </div>
        <template v-if="offerLoaded">
          <div class="col-muk-lg-4 order-2 order-lg-1 margint_muk_top_m d-none d-muk-lg-block sidebar-wrapper"
               style="height: auto;z-index:55"
          >
            <div class="text-right mb-2">
              اخر تحديث
              <span
                v-text="$moment(offer.lastUpdateDate).locale('en').format('DD/MM/YYYY')"
              ></span>
            </div>
            <aside
              class="sidebar"
              id="sidebar"
              data-plugin-options="{'minWidth': 960, 'containerSelector': '.container',
						'padding': {'top': 110}}"
              style="min-width: 255px; width:100%;"
            >
              <div class="agent_box">
                <mx-img
                  :img-src="offer.agency.logo"
                  :noResponsive="true"
                  ratio="3/2"
                  alt="Lorem ipsum"
                  :errorImageUrl="$vDefaultAgencyImg">
                </mx-img>
                <h4 class="mb-0 mt-2 text-black font-weight-bold agency-title" v-text="offer.agency.name"></h4>
                <div class="address-wrapper">
                  <p class="title-1">المكتب الرئيسي:</p>
                  <span v-text="$t('region.'+ offer.agency.address.region)"></span> -
                  <span v-text="$t('city.'+ offer.agency.address.city)"></span>
                </div>

                <div class="ml-3 mr-3 font-size-12px">
                  <button
                    style="padding: 0.533rem 0.933rem;"
                    type="button"
                    @click="Statistic(StatisticsEnum.PhoneCount)"
                    class="btn com-btn btn-block rounded-0 mb-3 text-4 text-left border-0 hard-shadow call-btn btn-danger"
                    href="#formModalCallOffice"
                    data-toggle="modal"
                    data-target="#formModalCallOffice"
                  >
                    <i class="mx-icon-phone ml-1"></i>
                    إتصل بنا الان
                  </button>

                  <button
                    style="padding: 0.533rem 0.933rem;margin-bottom:2px"
                    type="button"
                    class="btn com-btn btn-block btn-danger rounded-0 mb-2 text-left border-0 hard-shadow text-4"
                    href="#modalProject"
                    data-toggle="modal"
                    data-target="#modalProject"
                  >
                    <i class="mx-icon-envelope ml-1"></i>
                    راسلنا الان
                  </button>
                  <a :href="`/agencies/${offer.agency.id}`" class="text-blue font-size-12px decoration view-more">
                    شاهد جميع عقاراتنا
                    <i class="mx-icon-chevron-left position-relative top-1 ml-1"></i>
                  </a>
                </div>
              </div>

              <!--  -->
              <div class="row pl-3 pr-3 d-muk-md-flex  d-muk-sm-none social-fav-row">
                <div style="margin-top:12px" class="col-muk-xl-5 col-muk-md-5 col-muk-sm-12 pr-0 fav-col">
                  <div class="add_shadow add_to_favorit">
                    <a href="javascript:;" @click="addFavorite()" class="text-decoration-none">
                      <span class="box-content px-1 py-2 text-center d-muk-block">
                        <span class="text-gray text-8 position-relative top-2 mt-2">
                          <i
                            class="added_to_favorit"
                            style="font-size: 66px;"
                            :class="offer.isFavorite ? 'mx-icon-heart' : 'mx-icon-heart-light'"
                          ></i>
                        </span>
                        <span
                          class="add_to_favorit_text font-weight-bold font-size-12px d-muk-block text-dark pt-0"
                        >
                          أضف
                          الى المفضلة
                        </span>
                      </span>
                    </a>
                  </div>
                </div>

                <div style="margin-top:12px" class="col-muk-xl-7 col-muk-md-7 col-muk-sm-12 pl-0 pr-0 social-col">
                  <div class="add_shadow bg_white pb-4 pt-4">
                    <h4 class="text-center text-black text-3 font-size-14px font-weight-bold">شارك هذا العقار</h4>
                    <div class="text-center social_share">
                      <a
                        class="send_email"
                        href="#modalShareMail"
                        data-toggle="modal"
                        data-target="#modalShareMail"
                        title="Send Email"
                      >
                        <i class="mx-icon-envelope"></i>
                      </a>
                      <a
                        class="whats_share"
                        :href="$vRoute.ShareWhatsApp(offer,1)"
                        target="_blank"
                        title="Whatsapp"
                      >
                        <i class="mx-icon-whatsapp"></i>
                      </a>
                      <a
                        class="twitter_share"
                        :href="$vRoute.ShareTwitter(offer,1)"
                        target="_blank"
                        title="Twitter"
                      >
                        <i class="mx-icon-twitter"></i>
                      </a>
                      <a
                        class="facebook_share"
                        :href="$vRoute.ShareFacebook(offer,1)"
                        target="_blank"
                        title="Facebook"
                      >
                        <i class="mx-icon-facebook"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </template>
      </div>
    </div>
    <!-- end content of the page -->

    <!-- near real estate -->
    <client-only>
      <div class="p-0 py-muk-sm-4 same-realestate-container" :class="$mq==='desktop'?'container-muk':''"
           v-if="hasNearOffer">
        <h4 class="mr-0 mr-sm-3 mb-3 black-text same-real-title font-size-16px font-weight-bold">
          عـقـارات مـشـابـهـة فـي
          نـفـس الـمـنـطـقـة
        </h4>

        <hooper
          class="my-2 mb-5 p-sm-0"
          v-if="hasNearOffer"
          :settings="hooperOtherOffers"
          style="height: auto"
        >
          <CustomSlide
            :key="index"
            class="bg-white"
            style="margin-left: 15px;width: 214px"
            v-for="(ph, index) in NearOffer"
          >
            <nuxt-link :to="'./'+ph.id" class="item-link">
              <mx-card-realestate
                :offerItems="ph"
                class="grid-view grid-view-small real-estate-card"
                pricePriority
                :hasDistrict="false"
              ></mx-card-realestate>
            </nuxt-link>
          </CustomSlide>
          <hooper-navigation
            slot="hooper-addons"
            v-if="($mq=='mobile'&& NearOffer.length > 2) || ($mq!=='mobile' && NearOffer.length > 5)"
          >
            <img slot="hooper-next" src="../../assets/images/photo_slide_right.png" alt="no-photo"/>

            <img slot="hooper-prev" src="../../assets/images/photo_slide_left.png" alt="no-photo"/>
          </hooper-navigation>
        </hooper>

        <!--<div id="NearOfferPhotos" class="list_realestate owl-carousel owl-theme dots-morphing nav-squared
        nav-with-transparency real_estate_gallery" data-plugin-options="{'responsive': {'0': {'items': 2}, '479': {'items': 2},
        '768': {'items': 2}, '979': {'items': 5}, '1199': {'items': 5}}, 'loop':
        false, 'autoHeight': true, 'margin': 10 , 'nav': true, 'dots':
        false,'padding':10 }">

        </div>-->
      </div>
    </client-only>
    <!-- end real estate -->

    <!-- Main Modal Start -->
    <mx-modal-props-popup :offer="offer" :offer-id="offerId" :currentTab="currentTab"
                          v-if="propsPopup"></mx-modal-props-popup>

    <mx-modal-contacts-card
      :offer22="offer"
      :realEstateType="true"
      :isMessage="true"
      :isAuction="isAuction"
    ></mx-modal-contacts-card>

    <mx-modal-contacts-card
      :offer22="offer"
      :isCall="true"
      :realEstateType="true"
      :isAuction="isAuction"
    ></mx-modal-contacts-card>

    <!-- Start The sixth Modal For The shareModal Bottom if There is any problem -->
    <div
      class="modal fade"
      id="modalproblem"
      tabindex="-1"
      role="dialog"
      aria-labelledby="formModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog basic-modal modalProject">
        <!--modalProject isn't used-->
        <template v-if="offerLoaded">
          <div class="modal-content">
            <button
              type="button"
              class="close position-absolute left-8 top-8"
              data-dismiss="modal"
              aria-hidden="true"
              style="z-index: 2;"
            >×
            </button>
            <div class="modal-body">
              <div class="project-details">
                <div class="text-center">
                  <p class="title mb-2 text-3 text-center font-weight-bold">ابلغنا عن مشكلة</p>
                  <div class="row mt-2">
                    <div class="col-muk-lg-2"></div>
                    <div class="col-muk-lg-8" v-if="hasPhotos">
                      <mx-img
                        class="rounded"
                        :img-src="offer.photos[0].path"
                        ratio="3/2"
                        alt="Project Image"
                        :errorImageUrl="$vDefaultRealEstateImg">>
                      </mx-img>

                    </div>
                    <div class="col-muk-lg-2"></div>
                  </div>
                  <div class="details">
                    <h6 class="project-title font-weight-bold my-1 text-2" v-text="offer.title">
                      دوبلكس
                      جديد للبيع
                      في حي المقبل في
                      مدينة المجمعة
                    </h6>
                    <ul class="location text-blue my-0 text-1 d-muk-flex flex-wrap justify-content-center">
                      <li :key="index" v-for="(item,index) in listAddress(offer.address) ">{{ item }}</li>
                    </ul>
                    <div
                      v-if="!isAuction"
                      class="item_price py-2 text-red text-center item_price text-3"
                    >
                      <span v-text="formatNumber(offer.price)"></span>
                      <span class="text_font text-1">ريال</span>
                    </div>
                    <div
                      v-if="isAuction"
                      class="item_price text-primary text-center item_price text-3 text-center direction-ltr"
                    >
                      <span v-text="$moment(offer.auction.data).locale('en').format('YYYY-MM-DD') "></span>
                    </div>
                  </div>
                </div>
              </div>
              <ValidationObserver v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(reportForm)" novalidate="novalidate">
                  <div class="container-fluid align-items-center mb-0">
                    <div class="row">
                      <div class="col-muk-md-12 form-group">
                        <ValidationProvider name="name" rules="required" v-slot="{errors}">
                          <input
                            type="text"
                            name="name"
                            v-model="form.name"
                            class="form-control"
                            placeholder="إسمك"
                            required
                          />
                          <div class="validation-message">
                            <span>{{ errors[0] }}</span>
                          </div>
                        </ValidationProvider>
                      </div>

                      <div class="col-muk-md-12 form-group">
                        <ValidationProvider name="mail" rules="required" v-slot="{errors}">
                          <input
                            type="text"
                            name="mail"
                            v-model="form.email"
                            class="form-control"
                            placeholder="البريد الإلكتروني"
                            required
                          />
                          <div class="validation-message">
                            <span>{{ errors[0] }}</span>
                          </div>
                        </ValidationProvider>
                      </div>

                      <div class="col-muk-md-12 form-group">
                        <ValidationProvider name="reason" rules="required" v-slot="{errors}">

                          <select
                            name="reason"
                            v-model="form.reason"
                            id="reason"
                            placeholder="السبب"
                            class="form-control custom-select text-1"
                            required
                          >
                            <option :value="null" disabled>السبب</option>
                            <option value="1">العقار غير متوافر</option>
                            <option value="2">السعر غير دقيق</option>
                            <option value="3">لم أتسلم رد من الوسيط العقاري</option>
                            <option value="5">لا توجد تفاصيل للعقار</option>
                            <option value="6">نوعية الصور رديئة</option>
                            <option value="8">نص الوصف ضعيف جداً</option>
                            <option value="9">الموقع غير صحيح</option>
                            <option value="10">العقار المدرج غير موجود فعلياً</option>
                            <option value="11">خطأ في نوع العقار المدرج</option>
                          </select>
                          <div class="validation-message">
                            <span>{{ errors[0] }}</span>
                          </div>
                        </ValidationProvider>
                      </div>

                      <div class="col-muk-12 p-only-sm-0 mt-0 mb-2">
                        <ValidationProvider name="message" rules="required" v-slot="{errors}">
                          <textarea
                            maxlength="5000"
                            v-model="form.notes"
                            data-msg-required="Please enter your message."
                            placeholder="ملاحظات اضافية"
                            rows="3"
                            class="form-control text-1"
                            name="message"
                            required
                          ></textarea>
                          <div class="form-group">
                            <div class="validation-message">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </div>
                        </ValidationProvider>
                      </div>
                    </div>
                    <div class="footer d-muk-flex justify-content-end mt-0">
                      <button
                        type="submit"
                        class="btn btn-secondary background-blue no-border background-blue no-border btn-sm px-4 text-1"
                        id="button2"
                        name="button"
                      >إرسال
                      </button>
                    </div>
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- End The sixth Modal For The shareModal Bottom if There is any problem -->

    <!--share Email modal-->
    <div
      aria-hidden="true"
      aria-labelledby="formModalLabel"
      class="modal fade"
      id="modalShareMail"
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
          >×
          </button>
          <div class="modal-body">
            <div class="project-details">
              <div class="text-center">
                <p class="title mb-2 text-3 text-center font-weight-bold">مشاركة العقار</p>
                <div class="row mt-2">
                  <div class="col-muk-lg-2"></div>
                  <div class="col-muk-lg-8" v-if="hasPhotos">
                    <mx-img
                      :img-src="offer.photos[0].path"
                      ratio="3/2"
                      max-size="sd"
                      :errorImageUrl="$vDefaultRealEstateImg">>
                    </mx-img>
                  </div>
                  <div class="col-muk-lg-2"></div>
                </div>
                <div class="details">
                  <h6
                    class="project-title font-weight-bold text-secondary my-1 text-2"
                  >{{ offer.title }}</h6>
                  <ul class="location text-blue my-0 text-1 d-muk-flex justify-content-center">
                    <li :key="index" v-for="(item,index) in listAddress(offer.address) ">{{ item }}</li>
                  </ul>
                  <p class="mb-0 text-1 main-font color-gry-blue">فلل - شقق - محلات تجارية</p>
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
                    <div class="col-muk-12 p-only-sm-0 mt-0 mb-2">
                      <ValidationProvider name="message" rules="required" v-slot="{errors}">
                        <textarea
                          v-model="form.friendNote"
                          class="form-control text-1"
                          data-msg-required="Please enter your message."
                          maxlength="5000"
                          name="message"
                          placeholder="اكتب الرسالة"
                          required
                          rows="3"
                        >مرحبا , لقد وجدت هذا العقار على موقع مكتمل .  أرجو أن تتحقق منه و تخبرني برأيك فيه</textarea>
                        <div class="form-group">
                          <div class="validation-message">
                            <span>{{ errors[0] }}</span>
                          </div>
                        </div>
                      </ValidationProvider>
                    </div>

                    <div class="col-muk-md-12 form-group">
                      <ValidationProvider name="name" rules="required" v-slot="{errors}">
                        <input
                          v-model="form.name"
                          class="form-control text-2"
                          name="name"
                          placeholder="إسمك"
                          required
                          type="text"
                        />
                        <div class="validation-message">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>

                    <div class="col-muk-md-6 pl-md-1 form-group">
                      <ValidationProvider name="yourMail" rules="required" v-slot="{errors}">
                        <input
                          v-model="form.email"
                          class="rounded-sm form-control text-2"
                          name="yourMail"
                          placeholder="بريدك الالكتروني"
                          type="email"
                        />
                        <div class="validation-message">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>

                    <div class="col-muk-md-6 pr-md-1 form-group">
                      <ValidationProvider name="friendMail" rules="required" v-slot="{errors}">
                        <input
                          v-model="form.friendEmail"
                          class="form-control text-2"
                          name="friendMail"
                          placeholder="بريد صديقك الالكرتوني"
                          type="email"
                        />
                        <div class="validation-message">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>

                  <div class="footer d-muk-flex justify-content-end mt-0">
                    <button
                      type="submit"
                      class="btn btn-secondary background-blue btn-modern btn-sm px-4 text-1"
                      id="button"
                      name="button"
                    >إرسال
                    </button>
                  </div>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
    <!--End share Email modal-->

    <!--modalProject isn't used-->
    <mx-modal-contacts-card
      :offer22="offer"
      :isMobileWhatsApp="true"
      :realEstateType="true"
      :isAuction="isAuction"
    ></mx-modal-contacts-card>

    <!--modalProject isn't used-->
    <mx-modal-contacts-card
      :offer22="offer"
      :realEstateType="true"
      :isMobileMail="true"
      :isAuction="isAuction"
    ></mx-modal-contacts-card>

  </div>
</template>

<script>
import {
  Hooper,
  Slide as CustomSlide,
  Pagination as HooperPagination,
  Navigation as HooperNavigation,
} from "hooper";
import {
  validate,
  ValidationObserver,
  ValidationProvider,
} from "vee-validate/dist/vee-validate.full";

/***
 * Created Subhi Al Wattar
 * User: Subhi Al Wattar
 * Date: 7/29/2020
 * Time: 5:01 PM
 ***/


export default {
  scrollToTop: true,
  //middleware:'realEstateId',
  async validate({store, params, redirect}) {
    try {
      // Must be a number
      if (/^\d+$/.test(params.id) && params.id.length <= 10) {
        return true;
      }
      redirect('/404')
    } catch (e) {
      console.log(e);
    }

  },


  async asyncData({redirect, store, params}) {
    //console.log("params",params)
    await store.dispatch("getRealEstateDetail", params.id)
      .then(response => console.log('response'))
      .catch(error => {
        if (error.response.status === 404) {
          redirect('/404')
        }
      });
  },

  name: "real-estates",

  components: {
    Hooper,
    CustomSlide,
    HooperNavigation,
    HooperPagination,
    ValidationObserver,
    ValidationProvider,
    validate,
  },

  head() {
    return {
      title: `${this.getTitleMetaData()}`,
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {hid: 'description', name: 'description', content: `${this.getDescriptionMetaData()}`},
        {name: 'author', content: `${this.offer.title}- @muktamel`},
        {hid: 'robots', name: 'robots', content: 'index,follow'},
        {hid: 'keywords', name: 'keywords', content: ''},
        {name: 'theme-color', content: '#007bff'},
        {name: 'mobile-web-app-capable', content: 'yes'},
        {hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: `${this.offer.title}`},
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.hasPhotos ? this.$vRoute.imageUrl(this.offer.photos[0].path) : ''
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: this.hasPhotos ? this.$vRoute.imageUrl(this.offer.photos[0].path) : ''
        },
        {hid: 'og:image:width', property: 'og:image:width', content: '300'},
        {hid: 'og:image:height', property: 'og:image:height', content: '200'},
        {hid: 'og:title', property: 'og:title', content: `${this.getTitleMetaData()}`},
        {hid: 'og:description', property: 'og:description', content: `${this.getDescriptionMetaData()}`},
        {hid: 'og:url', property: 'og:url', content: `${this.$vRoute.base}${this.$route.path}`},
        {hid: 'og:site_name', property: 'og:site_name', content: 'muktamel'},
        {hid: 'og:type', property: 'og:type', content: 'product'},
        {name: 'twitter:card', content: `${this.getTitleMetaData()}`},
        {name: 'twitter:creator', content: `${this.offer.title}- @muktamel`},
        {name: 'twitter:site', content: 'muktamel'},
        {
          hid: 'twitter:image:src',
          name: 'twitter:image:src',
          content: this.hasPhotos ? this.$vRoute.imageUrl(this.offer.photos[0].path) : ''
        },
        {hid: 'twitter:title', name: 'twitter:title', content: `${this.getTitleMetaData()}`},
        {hid: 'twitter:description', name: 'twitter:description', content: `${this.getDescriptionMetaData()}`},
        {hid: 'twitter:url', name: 'twitter:url', content: `${this.$vRoute.base}${this.$route.path}`}
      ]
    }
  },
  data() {
    return {
      // props Modal
      msg: 'Lorem ipsum dolor sit amet',
      propsPopup: false,
      slide_map_count: null,
      readmore: null,
      readMoreAuction: null,
      modalProject: "email",
      scrollCase: 0,
      docUrl: process.env.docUrl,
      //TODO: Move to project structure
      StatisticsEnum: {
        SearchAppearCount: 1,
        DetailsShowCount: 2,
        PhoneCount: 3,
        WhatsAppCount: 4,
        MessageCount: 5,
      },
      hooperSettingsProps: {
        breakpoints: {
          1200: { // 2400px ~
            itemsToShow: 6
          },
          960: { // 600px ~ 1100px
            itemsToShow: 5
          },
          850: {
            itemsToShow: 7
          },
          720: {
            itemsToShow: 6
          },
          550: {
            itemsToShow: 4
          },
          430: {
            itemsToShow: 3
          },
          350: {
            itemsToShow: 3
          },
          0: { // 0px ~ 600px
            itemsToShow: 2
          }
        },
        trimWhiteSpace: true,
      },
      hooperOtherOffers: {
        trimWhiteSpace: true,
        wheelControl: false,
        autoPlay: false,
        itemsToSlide: 1,
        rtl: true,
        breakpoints: {
          1400: {
            // 2400px ~
            itemsToShow: 5,
          },
          900: {
            itemsToShow: 4,
          },
          600: {
            itemsToShow: 3,
          },
          0: {
            // 0px ~ 600px
            trimWhiteSpace: false,
            itemsToShow: 2,
          },
        },
      },
      hooperGallery: {
        itemsToShow: 1,
        autoPlay: true,
        rtl: true
      },
      zoom: 15,
      markers: [
        {
          position: {
            lat: 11.0,
            lng: 11.0,
          },
          icon: {url: "~@/assets/images/markers/offer.png"},
        },
      ],
      offerId: null,
      offer: null,
      _reAuction: null,
      offerLoaded: false,
      isAuction: false,
      isForRent: false,
      isForSeal: false,
      hasPhotos: false,
      hasFeature: false,
      hasStreats: false,
      hasRomms: false,
      hasTotalRooms: false,
      hasBathRomms: false,
      hasBedRooms: false,
      hasHalls: false,
      hasFloor: false,
      hasFloorNo: false,
      hasApartmentUnits: false,
      hasApartments: false,
      hasInternalContent: false,
      hasNearOffer: false,
      dealType: 0,
      GetClass: " ",
      isLand: false,
      NearOffer: [],
      form: {
        interested: null,
        name: null,
        phone: null,
        email: null,
        reason: null,
        notes: null,
        friendEmail: null,
        friendNote:
          "مرحبا , لقد وجدت هذا العقار على موقع مكتمل .  أرجو أن تتحقق منه و تخبرني برأيك فيه",
      },
      calculator: {
        price: 1100000,
        duration: 10,
        price2: 10,
      },
      hasBuildingArea: false,
      plansCount: null,
      map: {
        location: null,
        options: {
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
              featureType: 'poi.business',
              stylers: [{visibility: 'off'}]
            },
            {
              featureType: 'poi.medical',
              stylers: [{visibility: 'off'}]
            },
            {
              featureType: 'poi.place_of_worship',
              stylers: [{visibility: 'off'}]
            },
            {
              featureType: 'poi.school',
              stylers: [{visibility: 'off'}]
            }
          ],
        }
      },
      currentTab: null
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    this.onLoadOffer();
    if (this.isLand) {
      this.loadPlansCount();
    }

    if (this.$mq === 'ipad' || this.$mq === 'mobile') {
      this.zoom = 15
    }
  },

  computed: {
    searchPlan: function () {
      let objs = {
        Land: {
          Width: this.offer.width,
          Length: this.offer.length,
          Streets: this.offer.streets
        }
      };
      let url = this.$vRoute.CreateQueryString(objs);
      return `/plans?${url}`
    }
  },
  methods: {

    onLoadOffer() {
      try {
        this.offer = {...this.$store.state.realEstateDetail};
        this.offerLoaded = true;
        this.isAuction = this.offer.auction != null;
        /*if (!this.isAuction) {
          this.offer.auction = {
            date: "2020-06-05T00:00:00",
            requirements: "dsfsdfsdfsdfsdfsdfsdfsdfsdsdfdsf",
            addressText: "sdfdsfsdfsdfsdtkoytrjygtrjyhrtheerrjtret",
          };
        }*/
        this.dealType = this.DealType();
        this.hasPhotos = this.offer.photos.length != 0;
        this.hasFeature = this.offer.features.length != 0;
        this.hasStreats = this.offer.streets.length != 0;
        this.hasRomms = this.offer.otherRoomsCount != null;
        this.hasTotalRooms = (this.offer.otherRoomsCount != null
          && (this.offer.type > 12 && this.offer.type < 17)
        );
        this.hasBathRomms = this.offer.bathroomsCount != null;
        this.hasBedRooms = this.offer.bedRoomsCount != null;
        this.hasHalls = this.offer.hallsCount != null;
        this.hasFloor = this.offer.floorsCount != null;
        this.hasFloorNo = this.offer.floorNo != null;
        this.hasInternalContent = this.InternalContent();
        this.GetClass = this.GetStyle();
        this.hasApartments = (
          this.offer.apartmentsCount
          && (this.offer.type === 9 || this.offer.type === 18)
        );
        this.hasApartmentUnits = (
          this.offer.apartmentsCount && this.offer.type === 10
        );
        this.isLand = this.offer.type === 11 || this.offer.type === 12;
        this.isForRent = this.offer.dealType == 2 || this.offer.dealType == 4;
        this.isForSeal = this.offer.dealType == 1 || this.offer.dealType == 3;
        this.email = this.offer.agency.contact.email;
      } catch (e) {
        console.log(e);
      }

    },
    // suggestions near real estate
    getNearOffer() {
      this.$axios.get(
        `/offer/realestate/${this.offerId}/Suggestions`
      )
        .then((data) => {
          this.NearOffer = data.data.data;
          this.hasNearOffer = this.NearOffer.length != 0;
        });
    },

    getTitleMetaData() {
      let offerType = this.$t(`realEstateType.${this.offer.type}`);
      let dealType = this.$t(`dealTypeOperation.${this.offer.dealType}`);
      let category = this.$t(`category.${this.offer.category}`)
      let city = this.$t(`city.${this.offer.agency.address.city}`)
      let district = this.$t(`district.${this.offer.agency.address.district}`)
      let extPrice = this.GetDealType() === this.$vDealType.forSell ? `ريال سعودي` : this.GetDealType() === this.$vDealType.forRent ? `ريال سنوي` : ``;
      return `  مكتمل | ${offerType} ${category} ${dealType} في ${district},${city},${this.offer.title}, بسعر ${this.offer.price} ${extPrice}`;
    },

    getDescriptionMetaData() {

      let finishingType = this.$t(`building_finish.${this.offer.finishing}`);
      let allRoomsCount = this.offer.bedRoomsCount + this.offer.otherRoomsCount;
      let street = '';
      this.offer.streets.forEach(item => {
        street = street + ' شارع ' + item.width + ' م2,';
      })
      return `الغرف: ${allRoomsCount}, حمام: ${this.offer.bathroomsCount}, المساحة:${this.offer.landArea} م2 ,${finishingType} ${street} `
    },

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

    InternalContent() {
      let data = this.offer;
      if (
        data.bedRoomsCount != null ||
        data.otherRoomsCount != null ||
        data.hallsCount != null ||
        data.bathroomsCount != null ||
        data.floorsCount != null ||
        data.apartmentsCount != null ||
        data.floorNo != null ||
        data.shopsCount != null
      ) {
        return true;
      }
      return false;
    },

    DealType() {
      return this.offer.dealType;
    },

    GetDealType() {
      let dealType = this.DealType();
      if (dealType == 1 || dealType == 3) return 5;
      if (dealType == 2 || dealType == 4) return 6;
      if (dealType == 11) return 11;
    },

    GetStyle() {
      let dealType = this.DealType();
      if (dealType == 1 || dealType == 3) return "text-red";
      if (dealType == 2 || dealType == 4) return "text-blue";
      if (dealType == 11) return "text-green";
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

    // Contact
    Contact() {
      //TODO: remove jquery
      var model = {
        name: $(".name_popup").val(),
        EmailText: $(".message_popup").val(),
        Email: $(".email_popup").val(),
        MobileNO: $(".telephone_popup").val(),
      };

      // TODO: use axios
      this.$axios
        .post(
          `/offer/${this.offerId}/contact`,
          model
        )
        .then((response) => {
          if (response.data.isSent) {
            $("#modalProject").modal("hide");
            $("#modalEmail").modal("hide");
          }
        })
        .catch(function (error) {
          console.log(error);
          //  alert("حدث خطأ");
        });
    },

    // OfferReport
    OfferReport() {
      var model = {
        name: $("#name").val(),
        Email: this.email,
        Reason: $("#reason").val(),
        ReasonText: $("#message_Reason").val(),
      };
      this.$axios
        .post(
          `/offer/${this.offerId}/report`,
          model
        )
        .then((response) => {
          if (response.data.isSent) {
            $("#modalproblem").modal("hide");
          }
        })
        .catch(function (error) {
          console.log(error);
          //alert("حدث خطأ");
        });
    },

    // Contact
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

    // Share with email
    ShareOffer() {
      var model = {
        name: $("#share_name").val(),
        EmailText: $("#share_message").val(),
        SenderEmail: $("#sender").val(),
        ReceiverEmail: $("#receiver").val(),
      };
      this.$axios
        .post(
          `/offer/${this.offerId}/shareoffer`,
          model
        )
        .then((response) => {
          if (response.data.isSent) {
            $("#modalShareMail").modal("hide");
          }
        })
        .catch(function (error) {
          console.log(error);
          // alert("حدث خطأ");
        });
    },

    //share friend mail
    inviteForm() {
      let payload = {
        name: this.form.name,
        EmailText: this.form.friendNote,
        SenderEmail: this.form.email,
        ReceiverEmail: this.form.friendEmail,
      };
      this.$axios
        .post(
          `/offer/${this.offerId}/shareoffer`,
          payload
        )
        .then((response) => {
          this.$bvToast.toast("تمت مشاركة المنشور مع صديقك", {
            variant: "success",
            autoHideDelay: 3000,
            solid: true
          });
          $('#modalShareMail').modal('hide');
        })
        .catch(function (error) {
          console.log(error);
          this.$bvToast.toast("حدث خطأ", {
            variant: "danger",
            autoHideDelay: 3000,
            solid: true
          });
        });
    },

    initCalculator() {
      // TODO : Remove jquery
      if (!this.offerLoaded) return;
      // Calculator
      $.fn.digits = function () {
        return this.each(function () {
          $(this).text(
            $(this)
              .text()
              .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
          );
        });
      };


      function calc_main() {
        var s_ =
          parseInt($(".calc_p").val().match(/\d+/)) -
          parseInt($(".calc_k_m").val().match(/\d+/));
        var r_ =
          parseFloat(
            $(".calc_r")
              .val()
              .match(/[-+]?([0-9]*\.[0-9]+|[0-9]+)/)
          ) / 100;
        var t_ = parseInt($(".calc_t").val().match(/\d+/));
        var v_ = s_ * r_ * t_ + s_;

        var pm_ = v_ / (t_ * 12);
        $(".calc_v").html(parseInt(v_.toFixed(2)));
        $(".calc_pm").html(parseInt(pm_.toFixed(2)));

        $(".calc_v").digits();
        $(".calc_pm").digits();
        //alert('s='+s_+'  r='+r_+'    t='+t_+'     v='+v_);
      }


      if (this.offer.hasMortgage) {
        calc_main();
      }

      $(".calc_p").focusout(function () {
        var p_ = parseInt($(".calc_p").val().match(/\d+/));
        if (p_ >= 200000 && p_ <= 5000000) {
          $(".calc_k_m").val(
            (p_ * parseInt($(".calc_k").val().match(/\d+/))) / 100 + " ريال"
          );
          calc_main();
        } else {
          $(".calc_p").val(1000000 + " ريال");
          calc_main();
          alert(
            "يجب ان تكون قيمة العقار لا تقل عنا 200,000 , وليس اكثر من 5,000,000"
          );
        }
      });
      ///////////////p
      $(function () {
        $(".calc_add_p").on("click", function () {
          var $qty = $(this).closest(".calc_row").find(".calc_p");
          var currentVal = parseInt($qty.val().match(/\d+/));

          if (currentVal < 5000000) {
            currentVal = currentVal + 1000;
            $qty.val(currentVal + " ريال");
            $qty.attr("value", currentVal + " ريال");

            var $qty_p = parseInt($(".calc_k").val().match(/\d+/));
            $(".calc_k_m").val(($qty_p * currentVal) / 100 + " ريال");
          }
          calc_main();
        });
        $(".calc_minus_p").on("click", function () {
          var $qty = $(this).closest(".calc_row").find(".calc_p");
          var currentVal = parseInt($qty.val().match(/\d+/));

          if (currentVal > 200000) {
            currentVal = currentVal - 1000;
            $qty.val(currentVal + " ريال");
            $qty.attr("value", currentVal + " ريال");

            var $qty_p = parseInt($(".calc_k").val().match(/\d+/));
            $(".calc_k_m").val(($qty_p * currentVal) / 100 + " ريال");
          }
          calc_main();
        });
      });

      ///////////////////t
      $(function () {
        $(".calc_add_t").on("click", function () {
          var $qty = $(this).closest(".calc_row").find(".calc_t");
          var currentVal = parseInt($qty.val().match(/\d+/));

          if (currentVal < 30) {
            currentVal = currentVal + 1;
            $qty.val(currentVal + " سنة");
            $qty.attr("value", currentVal + " سنة");
          }
          calc_main();
        });
        $(".calc_minus_t").on("click", function () {
          var $qty = $(this).closest(".calc_row").find(".calc_t");
          var currentVal = parseInt($qty.val().match(/\d+/));

          if (currentVal > 5) {
            currentVal = currentVal - 1;
            $qty.val(currentVal + " سنة");
            $qty.attr("value", currentVal + " سنة");
          }
          calc_main();
        });
      });

      ///////////////////k
      $(function () {
        //var $qty=$(this).closest('.calc_row').find('.calc_k');

        $(".calc_add_k").on("click", function () {
          var $qty_p = parseInt($(".calc_p").val().match(/\d+/));
          var currentVal = parseInt($(".calc_k").val().match(/\d+/));

          if (currentVal < 50) {
            currentVal = currentVal + 1;
            $(".calc_k").val(currentVal + " %");

            $(".calc_k_m").val(($qty_p * currentVal) / 100 + " ريال");

            $(".calc_k").attr("value", currentVal + " %");
            $(".calc_k_m").attr("value", ($qty_p * currentVal) / 100);
          }
          calc_main();
        });
        $(".calc_minus_k").on("click", function () {
          var $qty_p = parseInt($(".calc_p").val().match(/\d+/));
          var currentVal = parseInt($(".calc_k").val().match(/\d+/));

          if (currentVal > 10) {
            currentVal = currentVal - 1;
            $(".calc_k_m").val(($qty_p * currentVal) / 100 + " ريال");
            $(".calc_k").val(currentVal + " %");

            $(".calc_k").attr("value", currentVal + " %");
            $(".calc_k_m").attr("value", ($qty_p * currentVal) / 100 + " ريال");
          }
          calc_main();
        });
      });

      ///////////////////r
      $(function () {
        //var $qty=$(this).closest('.calc_row').find('.calc_k');

        $(".calc_add_r").on("click", function () {
          var currentVal = parseFloat(
            $(".calc_r")
              .val()
              .match(/[-+]?([0-9]*\.[0-9]+|[0-9]+)/)
          );
          if (currentVal < 25) {
            currentVal = (currentVal + 0.05).toFixed(2);
            $(".calc_r").val(currentVal + " %");
            $(".calc_r").attr("value", currentVal + " %");
          }
          calc_main();
        });
        $(".calc_minus_r").on("click", function () {
          var currentVal = parseFloat(
            $(".calc_r")
              .val()
              .match(/[-+]?([0-9]*\.[0-9]+|[0-9]+)/)
          );

          if (currentVal > 1) {
            currentVal = (currentVal - 0.05).toFixed(2);

            $(".calc_r").val(currentVal + " %");
            $(".calc_r").attr("value", currentVal + " %");
          }
          calc_main();
        });
      });
    },

    reportForm() {
      let payload = {
        name: this.form.name,
        Email: this.form.email,
        Reason: this.form.reason,
        ReasonText: this.form.notes,
      };
      this.$axios
        .post(`/offer/${this.offerId}/report`, payload)
        .then((response) => {
          //  console.log("this", this);
          this.$bvToast.toast("تم ارسال إبلاغكم بنجاح", {
            variant: "success",
            autoHideDelay: 3000,
            solid: true
          });
          $("#modalproblem").modal("hide");

        })
        .catch(function (error) {
          console.log(error);
          this.$bvToast.toast("حدث خطأ", {
            variant: "danger",
            autoHideDelay: 3000,
            solid: true
          });
        });
    },
    // on click mortgage button
    onClickMortgage() {
      if (this.$auth.loggedIn) {
        this.$router.push(`/Mortgage?offerId=${this.offer.id}`)
      } else {
        this.$store.commit('updateTitle', 'للإستفادة من خدمة التمويل العقاري يجب عليك  أن تسجل الدخول أولا ');
        let url = this.$route.fullPath;
        console.log("url:", url)
        if (!this.$route.query.redirectUrl) {
          this.$router.push(`${url}?redirectUrl=Mortgage`)
        }
        this.$bvModal.show("login");
      }


    },

    loadPlansCount() {
      this.$axios.post(
        `/offer/engineering/Filter?PageNumber=1&PageSize=1`,
        {
          land: {
            "length": this.offer.length,
            "width": this.offer.width,
            "streets": this.offer.streets
          }
        }
      )
        .then(response => {
          this.plansCount = response.data.totalCount;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    this.onLoadOffer();
    this.offerId = this.$route.params.id;
    if (process.client) {
      this.getNearOffer();
    }
  },
  updated() {
    $(".show_all_photo").click(function () {
      $(".main-slider").hide();
      $(".show_all_photo").hide();
      $(".all_photo").hide();
      $(".thumb-gallery").hide();
      $(".all_photo_cont").slideDown();
    });
    $(".close_all_photo").click(function () {
      $(".all_photo_cont").slideUp();
      $(".main-slider").show();
      $("html").animate({scrollTop: 100}, "slow").fadeIn();
      $(".show_all_photo").show();
      $(".all_photo").show();
      $(".thumb-gallery").show();
    });

    /*getting the number of slide map element*/
    this.$nextTick(function () {
      this.slide_map_count = this.$el.querySelector(
        "#slide-map ul"
      ).childElementCount;
    });

    this.initCalculator();
    /*if ($('.contact-us').scrollY() > 10) {
          alert('ok');
          $(this).addClass("fixed");
        }
        else {$(this).removeClass("fixed");}*/
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/n-scss/old/Rest_details.css";
@import "~@/assets/scss/pages/details.scss";
@import "./real-estates-id.scss";

</style>

<style lang="scss">
#props_popup .popover {
  background: none !important;
}

#props_popup .popover .arrow {
  display: none !important;
}

.map-noscroll {
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
