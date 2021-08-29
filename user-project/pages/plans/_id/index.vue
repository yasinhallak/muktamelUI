<template>
  <div class="id">
    <section class="_id_plan main-detail-section">
      <div class="body" v-if="offer">
        <!--share Email modal-->
        <div aria-hidden="true" aria-labelledby="formModalLabel" class="modal fade" id="modalShareMail" role="dialog"
             tabindex="-1">
          <div class="modal-dialog basic-modal modalProject">
            <!--modalProject isn't used-->
            <div class="modal-content">
              <button aria-hidden="true" class="close position-absolute left-8 top-8" data-dismiss="modal"
                      style="z-index: 2;" type="button">×
              </button>
              <div class="modal-body">
                <div class="project-details">
                  <div class="  text-center">
                    <p class="title mb-2 text-3 text-center font-weight-bold">مشاركة المخطط</p>
                    <div class="row mt-2">
                      <div class="col-muk-lg-2"></div>
                      <div class="col-muk-lg-8">
                        <mx-img :img-src="offer.flat0Photo" ratio="3/2"  max-size="sd" :errorImageUrl="$vDefaultPlanImg"></mx-img>
                      </div>
                      <div class="col-muk-lg-2"></div>
                    </div>
                    <div class="details">
                      <h6 class="project-title  font-weight-bold text-secondary  my-1 text-2  ">{{offer.title}}</h6>
                      <div class="details p-2">

                        <div>نوع المخطط: {{ $t(`diagramType.${offer.type}`) }}</div>
                        <div class="d-flex justify-content-center">
                          <span> أبعاد الطابق الأرضي:</span>
                          <span>{{ offer.maxWidth+'م'}}</span>
                          <span> x </span>
                          <span>{{ offer.maxLength+ 'م' }}</span>
                        </div>
                        <div>المساحة: {{totalArea | toComma}} م²</div>
                      </div>
                    </div>
                  </div>
                </div>

                <ValidationObserver v-slot="{ handleSubmit }">
                  <form @submit.prevent="handleSubmit(inviteForm)" id="demo-form" novalidate="novalidate">
                    <div class="container-fluid align-items-center mb-0">
                      <div class="row">

                        <div class="col-muk-12 p-only-sm-0 mt-0 mb-2">
                          <ValidationProvider name="message" rules="required" v-slot="{errors}">
                          <textarea v-model="form.friendNote" class="form-control text-1"
                                    data-msg-required="Please enter your message." maxlength="5000" name="message"
                                    placeholder="اكتب الرسالة" required=""
                                    rows="3">مرحبا , لقد وجدت هذا العقار على موقع مكتمل .  أرجو أن تتحقق منه و تخبرني برأيك فيه</textarea>
                            <div class="form-group">
                              <div class="validation-message">
                                <span>{{errors[0]}}</span>
                              </div>
                            </div>
                          </ValidationProvider>
                        </div>

                        <div class="col-muk-md-12 form-group">
                          <ValidationProvider name="name" rules="required" v-slot="{errors}">
                            <input v-model="form.name" class="form-control  text-2" name="name" placeholder="إسمك"
                                   required type="text">
                            <div class="validation-message ">
                              <span>{{errors[0]}}</span>
                            </div>
                          </ValidationProvider>
                        </div>

                        <div class="col-muk-md-6 pl-muk-md-1 form-group">
                          <ValidationProvider name="yourMail" rules="required" v-slot="{errors}">
                            <input v-model="form.email" class="rounded-sm form-control text-2" name="yourMail"
                                   placeholder="بريدك الالكتروني" type="email">
                            <div class="validation-message ">
                              <span>{{errors[0]}}</span>
                            </div>
                          </ValidationProvider>
                        </div>

                        <div class="col-muk-md-6 pr-muk-md-1 form-group">
                          <ValidationProvider name="friendMail" rules="required" v-slot="{errors}">
                            <input v-model="form.friendEmail" class="form-control  text-2" name="friendMail"
                                   placeholder="بريد صديقك الالكرتوني" type="email">
                            <div class="validation-message ">
                              <span>{{errors[0]}}</span>
                            </div>
                          </ValidationProvider>
                        </div>
                      </div>

                      <div class="footer d-flex justify-content-end mt-0">
                        <button type="submit" class="btn btn-secondary background-blue btn-modern btn-sm px-4 text-1"
                                id="button" name="button">
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
        <!--End share Email modal-->

        <!--breadNav-->
        <mx-nav-breadcrumb  class=""
                            pageType="plans"
                            title="المخططات الهندسية"
                            :name="offer.agency.officialName"
                            v-if="$mq!=='mobile'"
        ></mx-nav-breadcrumb>
        <!--End breadNav-->

        <section class="page-header d-muk-none d-muk-sm-block page-header-modern page-header-sm add_shadow px-2 pt-2 pb-2">
          <div class="container-muk">
            <div class="row">
              <div class="col-muk-8 order-muk-md-1 align-self-center p-static">
                <div class="d-flex justify-content-between">

                  <h5 class="text-red d-flex align-items-center font-size-14px py-1">
                    <i class="font-size-14px icons mx-icon-plan pl-1"></i>
                    <strong>مخطط هندسي</strong>
                  </h5>
                </div>
                <h4 class="text-dark font-size-16px my-2" style="font-family: 'Droid Arabic Kufi'">
                  {{ $t(`diagramType.${offer.type}`) }} </h4>
              </div>
              <div class="col-muk-4 order-1 order-muk-md-2 align-self-baseline">
                <div class="text-right mb-2">اخر تحديث <span
                  v-text="$moment(offer.lastUpdateDate).locale('en').format('DD/MM/YYYY')"></span></div>
              </div>
            </div>

            <div class="row">
              <div class="col-muk-6 main_item_inner">
                <h5 class="text-blue d-flex py-2 font-size-12px">
                  <i class="text-blue icons mx-icon-area text-4  ml-1 font-size-14px"></i>أبعاد الطابق الأرضي :
                  {{offer.maxWidth}}&nbspم
                  <span>&nbsp<i class="icons mx-icon-times text-3"></i>&nbsp</span>
                  <span>{{offer.maxLength}}&nbspم</span>
                </h5>
                <div class="row w-100 my-2">
                  <div class="col-muk-auto d-flex align-items-center">
                    <i class="icons mx-icon-bed text-5  ml-2 font-size-16px"></i>
                    <span class="font-size-13px">{{totalRoomsCount}}</span>
                  </div>
                  <div class="col-muk-auto d-flex align-items-center">
                    <i class="icons mx-icon-bath text-5  ml-2 font-size-16px"></i>
                    <span class="font-size-13px">{{totalBathroomsCount }}</span>
                  </div>
                  <div class="col-muk-auto d-flex align-items-center">
                    <i class="icons mx-icon-area text-5  ml-2 font-size-16px"></i>
                    <span class="font-size-13px">{{ totalArea | toComma}} م² </span>
                  </div>
                </div>
              </div>

              <div style="flex-direction: column" class="col-muk-3 price-section d-flex align-items-center">
                <p v-if="offer.price !== null && offer.price !== 0" class="font-size-30px m-0 text-red font-weight-bold"
                   v-text="formatNumber(offer.price)">
                </p>
                <p v-if="offer.price === null || offer.price === 0" class="font-size-24px m-0 text-red font-weight-bold">
                  مجانا
                </p>
                <p v-if="offer.price !== null && offer.price !== 0" class="font-size-14px text-blue font-weight-bold">ريال سعودي</p>
              </div>

              <div class=" col-muk-3 d-flex">
                <div class="share-now mr-auto d-muk-sm-block d-muk-lg-none">
                  <div class="share-box d-flex align-items-center justify-content-center" id="dropdownMenuButton1"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="mx-icon-share"></i>
                    شارك
                  </div>
                  <div class="dropdown-menu popup-share-box" aria-labelledby="dropdownMenuButton1">
                    <a class="dropdown-item d-flex align-items-center" :href="$vRoute.ShareFacebook(offer,2)">
                      <i class="mx-icon-facebook-square facebook"></i>
                      مشاركة على فيسبوك
                    </a>
                    <a class="dropdown-item d-flex align-items-center" :href="$vRoute.ShareTwitter(offer,2)">
                      <i class="mx-icon-twitter twitter"></i>
                      مشاركة على تويتر
                    </a>
                    <a class="dropdown-item d-flex align-items-center" :href="$vRoute.ShareWhatsAppMobile(offer,2)">
                      <i class="mx-icon-whatsapp whatsapp"></i>
                      مشاركة على واتس اب
                    </a>
                    <a class="dropdown-item d-flex align-items-center" href="#modalShareMail" data-toggle="modal" data-target="#modalShareMail"
                       title="Send Email">
                      <i class="mx-icon-envelope envelope"></i>
                      إرسال عبر البريد الإلكتروني
                    </a>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
        <!-- content of the page -->

        <div class="container-muk py-3">

          <div class="row">
            <div class="col-muk-lg-8 big-col">


              <!-- gallery box -->
              <div class="gallery_box  add_shadow_2 slider-home" v-if="photos.length>0">
                <!-- all photo show with button-->
                <div class="all_photo_cont">
                  <template v-for="(item,index) in photos">
                    <mx-img
                            :img-src="item.path" ratio="3/2"
                            :errorImageUrl="$vDefaultPlanImg">

                    </mx-img>
                  </template>
                  <div class="close_all_photo">اغلاق جميع الصور</div>
                </div>
                <!--end all photo show with button-->
                <div class="show_all_photo"> جميع الصور</div>

                <div class="thumb-gallery fav-mobile">
                  <div class="add-favorite d-flex justify-content-center align-items-center
								added_to_favorite d-muk-lg-none" @click="addFavorite()">
                    <a href="javascript:;">
                      <i :class="offer.isFavorite ? 'mx-icon-heart' :'mx-icon-heart-light'"></i>
                    </a>
                  </div>
                  <div id="OfferPhotos" class="owl-carousel owl-theme manual thumb-gallery-detail owl-height nav-squared
						  		   nav-with-transparency real_estate_gallery owl-rtl owl-loaded owl-drag">
                  </div>
                </div>

                <div class="thumb-gallery">

                  <hooper class="main-slider" :rtl="true" :settings="hooperGallery" :wheel-control="false" v-if="photos">
                    <CustomSlide :key="index" v-for="(item, index) in photos">
                      <mx-img
                              :img-src="item.path" ratio="3/2"
                              :errorImageUrl="$vDefaultPlanImg">

                      </mx-img>
                    </CustomSlide>
                    <!--TODO : fix pagination count style-->
                    <hooper-navigation v-if="photos.length>1" slot="hooper-addons">
                      <img slot="hooper-next" src="~@/assets/images/photo_slide_right.png" alt="no-photo" />
                      <img slot="hooper-prev" src="~@/assets/images/photo_slide_left.png" alt="no-photo" />
                    </hooper-navigation>
                    <hooper-pagination v-if="photos.length>1" class="all_photo" slot="hooper-addons"
                                       :mode="$mq=='mobile'?'indicator':'fraction'"></hooper-pagination>
                  </hooper>
                </div>


              </div>
              <!-- end galley box -->

              <section style="background: none"
                       class="d-muk-block d-muk-sm-none page-header-modern page-header-sm px-2 pt-3 pb-0">
                <div class="container-muk">
                  <div class="row">
                    <div class="col-muk-md-12 col-muk-lg-8 col-muk-sm-12 order-muk-md-1 align-self-center p-static">
                      <div class="d-flex justify-content-between">

                        <h5 class="text-red d-flex align-items-center font-size-14px py-1"><i class="font-size-14px icons mx-icon-plan pl-1"></i> <strong>مخطط
                          هندسي</strong></h5>
                        <div class="share-now tablet-only mr-auto d-muk-sm-block d-muk-md-none">
                          <div class="share-box d-flex align-items-center justify-content-center" id="dropdownMenuButton1"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="mx-icon-share"></i>
                            شارك
                          </div>
                          <div class="dropdown-menu popup-share-box" aria-labelledby="dropdownMenuButton1">
                            <a class="dropdown-item d-flex align-items-center" :href="$vRoute.ShareFacebook(offer,2)">
                              <i class="mx-icon-facebook-square facebook"></i>
                              مشاركة على فيسبوك
                            </a>
                            <a class="dropdown-item d-flex align-items-center" :href="$vRoute.ShareTwitter(offer,2)">
                              <i class="mx-icon-twitter twitter"></i>
                              مشاركة على تويتر
                            </a>
                            <a class="dropdown-item d-flex align-items-center" :href="$vRoute.ShareWhatsAppMobile(offer,2)">
                              <i class="mx-icon-whatsapp whatsapp"></i>
                              مشاركة على واتس اب
                            </a>
                            <a class="dropdown-item d-flex align-items-center" href="#modalShareMail" data-toggle="modal" data-target="#modalShareMail"
                               title="Send Email">
                              <i class="mx-icon-envelope envelope"></i>
                              إرسال عبر البريد الإلكتروني
                            </a>

                          </div>
                        </div>
                      </div>

                      <div class="col-muk-3 price-section d-flex align-items-end p-0">
                        <p v-if="offer.price" class="font-size-30px m-0 text-red font-weight-bold" v-text="formatNumber(offer.price)"></p>
                        <span v-if="offer.price" class="font-size-14px text-red">&nbspر.س</span>
                        <span v-if="!offer.price" class="font-size-14px text-red">مجانا</span>
                      </div>

                      <!--<h4 class="text-dark font-size-16px my-2" style="font-family: 'Droid Arabic Kufi'">
                        {{ $t(`diagramType.${offer.type}`) }} </h4>-->
                    </div>
                    <div class="col-muk-md-4 d-none d-muk-md-block order-1 order-muk-md-2 align-self-center"></div>
                  </div>

                  <div class="row">
                    <div class="col-muk-lg-6 main_item_inner">
                      <h5 class="text-black d-flex py-2 font-size-13px">
                        <i class="icons text-blue mx-icon-area text-4  ml-1 font-size-18px"></i>أبعاد الطابق الأرضي :
                        {{offer.maxWidth}}&nbspم
                        <span>&nbsp<i class="icons mx-icon-times text-3"></i>&nbsp</span>
                        <span>{{offer.maxLength}}&nbspم</span>
                      </h5>
                      <div class="row w-100 my-1">
                        <div class="col-muk-auto d-flex align-items-center"><i class="icons mx-icon-bed text-5 ml-2 font-size-16px"></i>
                          <span class="font-size-13px">{{totalRoomsCount}}</span>
                        </div>
                        <div class="col-muk-auto d-flex align-items-center"><i class="icons mx-icon-bath text-5 ml-2 font-size-16px"></i>
                          <span class="font-size-13px"> {{totalBathroomsCount}}</span>
                        </div>
                        <div class="col-muk-auto d-flex align-items-center">
                          <i class="icons mx-icon-area text-5  ml-2  font-size-16px"></i>
                          <span class="font-size-13px">{{ totalArea | toComma}} م² </span>
                        </div>
                      </div>
                    </div>

                    <div class=" col-muk-lg-6 ">
                    </div>
                  </div>

                </div>
              </section>

              <!-- Start sub header -->
              <div class="container-0-15">

                <!--sticky-->
                <ul
                  id="app22"
                  class="contact-us mobile-device sticky-p d-flex d-muk-sm-none justify-content-center"
                >
                  <li class="background-red">
                    <a class="d-flex align-items-center" data-target="#formModalCallOffice"
                       data-toggle="modal" href="#formModalCallOffice">
                      <i class="mx-icon-phone pl-1"></i>
                      اتصل بنا
                    </a>
                  </li>
                  <li class="background-blue">
                    <a class="d-flex align-items-center" href data-toggle="modal" data-target="#modalEmail">
                      <i class="mx-icon-envelope pl-1"></i>
                      إيميل
                    </a>
                  </li>
                  <li class="background-green">
                    <a class="d-flex align-items-center" href data-toggle="modal" data-target="#modalWhatsApp">
                      <i class="mx-icon-whatsapp whatsapp pl-1"></i>
                      واتساب
                    </a>
                  </li>
                </ul>
                <div class="p-3 p-muk-sm-0">

                  <!-- End sub header -->

                  <!-- start tabs -->
                  <div class="row pt-4">
                    <div class="col-muk-lg-12 p-0">
                      <div class="tabs">
                        <ul class="nav nav-tabs">
                          <li class="nav-item active d-muk-none d-muk-sm-block">
                            <a class="nav-link active" href="#popular7" data-toggle="tab">التفاصيل</a>
                          </li>

                          <div class="d-muk-none d-muk-sm-block" style="position:absolute; left:13px; top:5px;">رقم المرجع : {{offer.id}}</div>

                        </ul>
                        <div class="tab-content  bg-white hard-shadow py-3 px-3">
                          <div id="popular7" class="tab-pane active">

                            <h4 class="text-dark font-size-14px font-weight-bold pb-2 d-muk-block d-muk-sm-none" style="font-family: 'Droid Arabic Kufi'">
                              {{ $t(`diagramType.${offer.type}`) }}
                            </h4>

                            <table class="table mobile-table table-sm table-hover d-muk-sm-none">
                              <tbody>
                              <tr v-if="totalRoomsCount">
                                <th class="font-size-13px">عدد الغرف</th>
                                <td class="text-5 font-size-20px font-weight-bold">{{totalRoomsCount}}</td>
                              </tr>
                              <tr v-if="totalHallsCount">
                                <th class="font-size-13px">عدد الصالات</th>
                                <td class="text-5 font-size-20px font-weight-bold">{{totalHallsCount}}</td>
                              </tr>
                              <tr v-if="totalKitchenCount">
                                <th class="font-size-13px">عدد المجالس</th>
                                <td class="text-5 font-size-20px font-weight-bold">{{totalKitchenCount}}</td>
                              </tr>
                              <tr v-if="totalBathroomsCount">
                                <th class="font-size-13px">عدد الحمامات</th>
                                <td class="text-5 font-size-20px font-weight-bold">{{totalBathroomsCount}}</td>
                              </tr>
                              <tr v-if="totalArea">
                                <th class="font-size-13px">مساحة البناء</th>
                                <td class="text-5 font-size-20px font-weight-bold"> {{totalArea | toComma}}
                                  <span class="text-1 font-size-12px">متر مربع</span></td>
                              </tr>
                              <tr>
                                <th style="color:#777777" class="font-size-13px">رقم المرجع</th>
                                <td style="color:#777777" class="text-5 font-size-14px text-gray-light">{{offer.id}}</td>
                              </tr>
                              </tbody>
                            </table>


                            <div class="row d-none d-muk-sm-flex">
                              <div class="  col-muk-sm-2  text-center mb-2 p-0" v-if="totalRoomsCount">
                                <h5 class="text-black mb-0 font-size-14px font-weight-normal">عدد الغرف</h5>
                                <h4 class="pb-0 pt-2 text-red mb-0 text-6 font-size-20px">{{totalRoomsCount}}</h4>


                              </div>
                              <div class="col-muk-sm-2  text-center mb-2 p-0" v-if="totalHallsCount">
                                <h5 class="text-black mb-0 font-size-14px font-weight-normal">عدد الصالات</h5>
                                <h4 class="pb-0 pt-2 text-red mb-0 text-6 font-size-20px">{{totalHallsCount}}</h4>

                              </div>
                              <div class="col-muk-sm-2  text-center mb-2 p-0" v-if="totalKitchenCount">
                                <h5 class="text-black mb-0 font-size-14px font-weight-normal">عدد المجالس</h5>
                                <h4 class="pb-0 pt-2 text-red mb-0 text-6 font-size-20px">
                                  {{totalKitchenCount}}</h4>


                              </div>
                              <div class="col-muk-sm-2  text-center mb-2 p-0" v-if="totalBathroomsCount">
                                <h5 class="text-black mb-0 font-size-14px font-weight-normal">عدد الحمامات</h5>
                                <h4 class="pb-0 pt-2 text-red mb-0 text-6 font-size-20px">
                                  {{totalBathroomsCount}}</h4>


                              </div>
                              <div class="col-muk-sm-4 text-center mb-2   p-0" v-if="totalArea">
                                <h5 class="text-black mb-0 font-size-14px font-weight-normal">مساحة البناء</h5>
                                <h6 class="pb-0 pt-2 text-red mb-0 text-6 font-size-20px font-size-20px font-weight-bold">{{totalArea | toComma}}</h6>
                                <h6 class="pb-0 pt-2 text-black mb-0 text-1 font-size-12px">متر مربع</h6>


                              </div>


                            </div>


                            <hr class="my-2 d-none d-muk-md-flex" />

                            <div class="plan_details_mobile toggle d-muk-sm-none">
                              <section class="toggle">
                                <label class=" text-blue font-size-13px font-weight-bold" v-b-toggle.my-collapse1>الطابق الأرضي
                                  :</label>
                                <b-collapse id="my-collapse1">

                                  <table class="table table-sm table-hover font-size-14px">
                                    <tbody>
                                    <tr>
                                      <td>الغرف :
                                        <strong> {{$t(`diagramRooms.${offer.flat0RoomsCount}`) }}</strong>
                                      </td>
                                      <td>الصالات:
                                        <strong>{{$t(`diagramHalls.${offer.flat0HallsCount}`) }}</strong>
                                      </td>

                                    </tr>
                                    <tr>
                                      <td>المجالس :
                                        <strong> {{$t(`diagramKitchens.${offer.flat0KitchensCount}`)}}</strong>
                                      </td>
                                      <td>الحمامات :
                                        <strong>{{$t(`diagramBathrooms.${offer.flat0BathroomsCount}`)}}</strong>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="td-big">المساحة : <strong> {{offer.flat0Area | toComma}}</strong>
                                        <span class="font-size-10px">متر مربع</span>
                                      </td>
                                    </tr>
                                    </tbody>
                                  </table>

                                </b-collapse>
                              </section>
                              <section class="toggle  ">
                                <label class="text-blue font-size-13px font-weight-bold" v-b-toggle.my-collapse2>الطابق الأول
                                  :</label>
                                <b-collapse id="my-collapse2">

                                  <table class="table table-sm table-hover font-size-14px">
                                    <tbody>
                                    <tr>
                                      <td>الغرف :<strong> {{
                                          $t(`diagramRooms.${offer.flat1RoomsCount}`) }}</strong>
                                      </td>
                                      <td>الصالات :<strong>{{
                                          $t(`diagramHalls.${offer.flat1HallsCount}`) }}</strong>
                                      </td>

                                    </tr>
                                    <tr>
                                      <td>المجالس :<strong> {{
                                          $t(`diagramKitchens.${offer.flat1KitchensCount}`)
                                        }}</strong>
                                      </td>
                                      <td>الحمامات :<strong>
                                        {{ $t(`diagramBathrooms.${offer.flat1BathroomsCount}`)
                                        }}</strong>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="td-big">المساحة :<strong> {{offer.flat1Area | toComma}}
                                        </strong>
                                        <span class="font-size-10px">متر مربع</span>
                                      </td>
                                    </tr>
                                    </tbody>
                                  </table>


                                </b-collapse>
                              </section>
                              <section class="toggle" v-if="offer.hasExt">
                                <label class=" text-blue font-size-13px font-weight-bold" v-b-toggle.my-collapse3>الملحق :</label>
                                <b-collapse id="my-collapse3">

                                  <table class="table table-sm table-hover font-size-14px">
                                    <tbody>
                                    <tr>
                                      <td>الغرف :<strong> {{
                                          $t(`diagramRooms.${offer.flatExtRoomsCount}`) }}</strong>
                                      </td>
                                      <td>الصالات :<strong>{{
                                          $t(`diagramHalls.${offer.flatExtHallsCount}`) }}</strong>
                                      </td>

                                    </tr>
                                    <tr>
                                      <td>المجالس :<strong>
                                        {{
                                          $t(`diagramKitchens.${offer.flatExtKitchensCount}`)
                                        }}</strong>
                                      </td>
                                      <td>الحمامات :<strong>
                                        {{ $t(`diagramBathrooms.${offer.flatExtBathroomsCount}`)
                                        }}</strong>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="td-big">المساحة :<strong> {{offer.flatExtArea}} م2</strong>
                                      </td>
                                    </tr>
                                    </tbody>
                                  </table>


                                </b-collapse>
                              </section>
                            </div>

                            <div class="row d-muk-sm-flex table-big d-none">
                              <div class="col-muk-sm-4 p-0 pr-3">
                                <h4 class="text-blue mb-2 text-4 font-size-16px font-weight-bold">الطابق الأرضي</h4>
                                <table class="table table-sm table-hover">
                                  <tbody class="font-size-14px">
                                  <tr>
                                    <td>الغرف :<strong> {{offer.flat0RoomsCount}}</strong></td>
                                    <td>الصالات :<strong> {{offer.flat0HallsCount}}</strong></td>

                                  </tr>
                                  <tr>
                                    <td>المجالس :<strong> {{offer.flat0KitchensCount}}</strong></td>
                                    <td>الحمامات :<strong> {{offer.flat0BathroomsCount}}</strong>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colspan="2">المساحة : <strong> {{offer.flat0Area | toComma}}</strong>
                                      <span class="font-size-10px">متر مربع</span>
                                    </td>
                                  </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div class="col-muk-sm-4 p-0 pr-3">
                                <h4 class="text-blue mb-2 text-4 font-size-16px font-weight-bold">الطابق الأول</h4>
                                <table class="table table-sm table-hover">
                                  <tbody class="font-size-14px">
                                  <tr>
                                    <td>الغرف :<strong> {{offer.flat1RoomsCount}}</strong></td>
                                    <td>الصالات :<strong> {{offer.flat1HallsCount}}</strong></td>

                                  </tr>
                                  <tr>
                                    <td>المجالس :<strong> {{offer.flat1KitchensCount}}</strong></td>
                                    <td>الحمامات :<strong> {{offer.flat1BathroomsCount}}</strong>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colspan="2">المساحة : <strong>{{offer.flat1Area | toComma}}</strong>
                                      <span class="font-size-10px">متر مربع</span>
                                    </td>
                                  </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div class="col-muk-sm-4 p-0 pr-3" v-if="offer.hasExt">
                                <h4 class="text-blue mb-2 text-4 font-size-16px font-weight-bold">الملحق</h4>
                                <table class="table table-sm table-hover">
                                  <tbody class="font-size-14px">
                                  <tr>
                                    <td>الغرف :<strong> {{offer.flatExtRoomsCount}}</strong></td>
                                    <td>الصالات :<strong> {{offer.flatExtHallsCount}}</strong></td>

                                  </tr>
                                  <tr>
                                    <td>المجالس :<strong> {{offer.flatExtKitchensCount}}</strong>
                                    </td>
                                    <td>الحمامات :<strong> {{offer.flatExtBathroomsCount}}</strong>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colspan="2">المساحة : <strong> {{offer.flatExtArea | toComma}}</strong>
                                      <span class="font-size-10px">متر مربع</span>
                                    </td>
                                  </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            <div class="row">
                              <div class="col-muk-12 text-left">
                                <button type="button"
                                        class=" align-self-start button_report font-size-10px btn btn-outline btn-light rounded-0 mb-2 text-blue"
                                        href="#modalproblem" data-toggle="modal" data-target="#modalproblem">
                                  <span class="icon-wrapper"><i class="mx-icon-warning-light text-red"></i></span>
                                  ابلغنا عن مشكلة في هذا المخطط </button>
                              </div>
                            </div>

                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- end tabs -->
                  <div class="row ">

                    <div class="col-muk-lg-12 p-0 build_calc">


                      <div class="bg-white hard-shadow mt-3 py-3 px-3 cost-section">

                        <div class="row cost-row">

                          <div class="col-12">
                          <h4 class="mt-1 text-left font-size-18px font-weight-bold">التكاليف التقديرية</h4>
                          </div>

                          <div class="col-muk-12 col-muk-sm-6 cost-col">

                            <!--street form calc-->
                            <div class="mb-2">
                              <mx-form-select-street @data-changed="landInfoChanged" :streets.sync="streetsLand"
                                                     :width.sync="width" :length.sync="length" :streetNumber.sync="streetNumber">
                              </mx-form-select-street>
                            </div>

                            <!-- price section only mobile-->
                            <div class="calc_resault_box mt-0 d-muk-block d-muk-sm-none">
                              <h5 class="my-0 text-1 font-size-12px">تكاليف </h5>
                              <h6 class="mb-1 mt-1 text-5 font-weight-bold text-blue font-size-16px">
                                {{$t(`building_finish.${calculatorForm.Finishing}`)}}</h6>
                              <h1 class="mt-1 mb-0 text-red font-weight-bold font-size-36px"><span
                                class="calc_pm number_font">{{calculator.totalResult | toComma}}</span>
                              </h1>
                              <h5 class="my-0 text-1 font-size-12px">ريال سعودي </h5>
                              <h6 class="mb-0 color-gry-blue text-1 mt-0 py-2 px-2 text-left font-size-9px">
                                التكاليف الواردة أدناه هي تكاليف تقريبية للاسترشاد فقط وقد تختلف من مقاول لآخر ومن مدينة لأخرى
                              </h6>

                            </div>

                            <!--building type-->
                            <div class="mb-1 mt-2 inside_type ">
                              <div class="d-flex">
                                <div class="col-muk-4 _button_in">
                                  <label for="finishing1" class="inner_type " :class="{'in_selected':calculatorForm.Finishing === 1}">
                                    <input id="finishing1" type="radio" v-model="calculatorForm.Finishing" :value="1" class="d-none">
                                    <h5 class="my-0 mt-1 font-size-12px">بناء</h5>
                                    <h4 class="mt-2 mb-2 font-size-14px">عظم</h4>
                                  </label>
                                </div>
                                <div class="col-muk-4 _button_in">
                                  <label for="finishing2" class="inner_type" :class="{'in_selected':calculatorForm.Finishing === 2}">
                                    <input id="finishing2" type="radio" v-model="calculatorForm.Finishing" :value="2" class="d-none">
                                    <h5 class="my-0 mt-1 font-size-12px">تشطيب</h5>
                                    <h4 class="mt-2 mb-2 font-size-14px">تجاري</h4>
                                  </label>
                                </div>
                                <div class="col-muk-4 _button_in">
                                  <label for="finishing3" class="inner_type" :class="{'in_selected':calculatorForm.Finishing === 3}">
                                    <input id="finishing3" type="radio" v-model="calculatorForm.Finishing" :value="3" class="d-none">
                                    <h5 class="my-0 mt-1 font-size-12px">تشطيب</h5>
                                    <h4 class="mt-2 mb-2 font-size-14px">عادي</h4>
                                  </label>
                                </div>
                              </div>
                              <div class="d-flex">
                                <div class="col-muk-4 _button_in">
                                  <label for="finishing4" class="inner_type" :class="{'in_selected':calculatorForm.Finishing === 4}">
                                    <input id="finishing4" type="radio" v-model="calculatorForm.Finishing" :value="4" class="d-none">
                                    <h5 class="my-0 mt-1 font-size-12px">تشطيب</h5>
                                    <h4 class="mt-2 mb-2 font-size-14px">لوكس</h4>
                                  </label>
                                </div>
                                <div class="col-muk-4 _button_in">
                                  <label for="finishing5" class="inner_type" :class="{'in_selected':calculatorForm.Finishing === 5}">
                                    <input id="finishing5" type="radio" v-model="calculatorForm.Finishing" :value="5" class="d-none">
                                    <h5 class="my-0 mt-1 font-size-12px">تشطيب</h5>
                                    <h4 class="my-0 mt-1 font-size-14px">سوبر لوكس</h4>
                                  </label>
                                </div>
                                <div class="col-muk-4 _button_in">
                                  <label for="finishing6" class="inner_type" :class="{'in_selected':calculatorForm.Finishing === 6}">
                                    <input id="finishing6" type="radio" v-model="calculatorForm.Finishing" :value="6" class="d-none">
                                    <h5 class="my-0 mt-1 font-size-12px">تشطيب</h5>
                                    <h4 class="my-0 mt-1 font-size-14px">هاي كلاس</h4>
                                  </label>
                                </div>
                              </div>
                            </div>


                            <!--for big screen-->
                            <a class="show_hide_details font-weight-bold font-size-14px d-muk-none d-muk-sm-flex justify-content-center align-items-center show_hide_details text-blue pt-0"
                               v-b-toggle.price-details>
                              <i class="mx-icon-chevron-down pl-1"></i>
                              <span class="feature-show">إظهار تفاصيل الأسعار ومواصفات التشطيب</span>
                              <i class="mx-icon-chevron-up pl-1"></i>
                              <span class="feature-hide">إخفاء تفاصيل الأسعار ومواصفات التشطيب</span>
                            </a>

                          </div>

                          <!--costs and feature section -->
                          <div class="col-muk-12 col-muk-sm-6 text-center cost-big">

                            <!--price section only big screens-->
                            <div class="calc_resault_box mt-0 d-none d-muk-sm-block">
                              <h5 class="my-0 text-1 font-size-12px">تكاليف </h5>
                              <h6 class="mb-1 mt-1 font-size-16px font-weight-bold text-5 text-blue">
                                {{$t(`building_finish.${calculatorForm.Finishing}`)}}</h6>
                              <h1 class="mt-1 mb-0 text-red font-size-36px font-weight-bold"><span
                                class="calc_pm number_font">{{calculator.totalResult | toComma}}</span>
                              </h1>
                              <h5 class="my-0 text-1 font-size-12px">ريال سعودي </h5>
                              <h6 class="mb-0 px-3 py-1 color-gry-blue text-1 mt-0 font-size-9px text-left">
                                التكاليف الواردة أدناه هي تكاليف تقريبية للاسترشاد فقط وقد تختلف من مقاول لآخر ومن مدينة لأخرى
                              </h6>

                            </div>
                            <div class="d-none d-muk-sm-block">
                              <h6 class="mt-3 mb-0 text-red font-weight-semibold text-center font-size: 12px;">هل تحتاج
                                مقاول ؟</h6>
                              <h6 class="mt-1 mb-2 text-blue font-weight-semibold text-center font-size: 12px;">
                                لا تهتم!
                              </h6>
                              <h6 class="text-center text-black font-size-12px mb-2 text-1">
                                يوفر لك مكتمل عشرات المقاولين المؤهلين لتنفيذ منزلك بأفضل الكفاءات وأنسب الأسعار
                              </h6>
                            </div>

                            <!--looking for a contractor button only big screens-->
                            <nuxt-link :to="setAgencyType">
                              <button type="button"
                                      style="background-color: #dc3646 !important;
                                      border-color: #BD2231;
                                      border-width:0;
                                      border-bottom-width: 3px !important;
                                      max-height:31px"
                                      class="btn btn-3d btn-danger btn-block rounded-0 mb-2 font-weight-bold text-4 font-weight-bold font-size-14px">
                                ابحث عن مقاول
                              </button>
                            </nuxt-link>

                          </div>

                          <!--toggle link hide show features for mobile-->
                          <a class="w-100 font-weight-bold font-size-14px justify-content-center d-muk-flex d-muk-sm-none align-items-center jus show_hide_details text-blue pt-0"
                             v-b-toggle.price-details>
                            <i class="mx-icon-chevron-down pl-1"></i>
                            <span class="feature-show">إظهار تفاصيل الأسعار ومواصفات التشطيب</span>
                            <i class="mx-icon-chevron-up pl-1"></i>
                            <span class="feature-hide">إخفاء تفاصيل الأسعار ومواصفات التشطيب</span>
                          </a>

                        </div>
                        <b-collapse id="price-details">


                          <div class="toggle_content_details">


                            <div class="deails_block_payments px-3 px-muk-md-2 py-2 mt-4">
                              <h4 class="text-blue font-size-18px font-weight-bold">تفاصيل الأسعار</h4>
                              <div class="row">
                                <div class="col-muk-md-6">
                                  <table class="table price-table table-sm mb-0 table-hover">
                                    <tbody>
                                    <tr>
                                      <th>تكاليف الطابق الأرضي</th>
                                      <td>
                                        <span class="mx-1">:</span>
                                        <span class="font-size-16px">{{calculator.landFloor | toComma}}</span>
                                       <span class="font-size-12px">ريال</span>
                                      </td>

                                    </tr>
                                    <tr>
                                      <th>تكاليف الطابق الأول</th>
                                      <td>
                                        <span class="mx-1">:</span>
                                        <span class="font-size-16px">{{calculator.firstFloor | toComma}}</span>
                                        <span class="font-size-12px">ريال</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>تكاليف الملحق</th>
                                      <td>
                                        <span class="mx-1">:</span>
                                        <span class="font-size-16px">{{calculator.extention | toComma}}</span>
                                        <span class="font-size-12px">ريال</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>تكاليف القبو</th>
                                      <td>
                                        <span class=" mx-1">:</span>
                                        <span class="font-size-16px">{{calculator.wareHouse | toComma}}</span>
                                        <span class="font-size-12px">ريال</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>تكاليف الفناء الخارجي</th>
                                      <td>
                                        <span class="mx-1">:</span>
                                        <span class="font-size-14px" v-if="!hasDimension">أدخل معلومات الأرض</span>
                                        <span class="font-size-16px" v-if="hasDimension">{{calculator.exteriorSquare | toComma}}</span>
                                        <span v-if="hasDimension" class="font-size-12px">ريال</span>
                                      </td>
                                    </tr>

                                    </tbody>
                                  </table>
                                </div>

                                <div class="col-muk-md-6">
                                  <table class="table price-table table-sm mb-0 table-hover">
                                    <tbody>
                                    <tr>
                                      <th>تكاليف السور</th>
                                      <td>
                                        <span class="mx-1">:</span>
                                        <span class="font-size-16px" v-if="hasDimension">{{calculator.landFence | toComma}}</span>
                                        <span v-if="hasDimension" class="font-size-12px">ريال</span>
                                        <span class="font-size-14px" v-if="!hasDimension">أدخل معلومات الأرض</span>
                                      </td>

                                    </tr>
                                    <tr>
                                      <th>تكاليف سور السطح</th>
                                      <td><span class="mx-1">:</span>
                                        <span class="font-size-16px">{{calculator.surfaceFence| toComma}}</span>
                                        <span class="font-size-12px">ريال</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>تكاليف خزان المياه</th>
                                      <td>
                                        <span class="mx-1">:</span>
                                        <span class="font-size-16px">{{calculator.waterTank| toComma}}</span>
                                        <span class="font-size-12px">ريال</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>تكاليف بيارة الصرف</th>
                                      <td><span class="mx-1">:</span>
                                        <span class="font-size-16px">{{calculator.spendTank| toComma}}</span>
                                        <span class="font-size-12px">ريال</span>
                                      </td>
                                    </tr>

                                    </tbody>
                                  </table>
                                </div>

                              </div>
                            </div>


                            <div class="deails_block_payments px-2 py-2 mt-4">
                              <h4 class="text-blue text-center font-size-16px">مواصفات التشطيب العادي</h4>
                              <p v-html="calculator.finishingDescription">
                              </p>
                            </div>

                          </div>
                        </b-collapse>

                      </div>


                    </div>

                  </div>
                  <!-- Start company information -->
                  <div class="row">
                    <div class="company-information mobile-box text-center">
                      <div class="sub-title">
                        تصميم
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
                        {{ offer.agency.officialName }}
                      </div>
                      <div class="location">
                        <span class="main-office">المكتب الرئيسي:</span> <span>{{ $t(`district.${offer.agency.address.district}`) }} -
                {{ $t(`city.${offer.agency.address.city}`) }}</span>
                      </div>
                      <div class="show-link">
                        <a class="d-flex align-items-center justify-content-center" :href="`/agencies/${offer.agency.id}`">
                          شاهد جميع مخططاتنا
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
                  </div>
                </div>
              </div>
              <!-- End company information -->

              <!-- end plan box -->

            </div>


            <div class="col-muk-lg-4 order-2 margint_top_m order-muk-lg-1 d-none d-muk-lg-block sidebar-wrapper" style="height: 675px;">
              <aside class="sidebar" id="sidebar"
                     data-plugin-options="{'minWidth': 991, 'containerSelector': '.container', 'padding': {'top': 110}}"
                     style="min-width: 255px; width:100%;">
                <div class="agent_box">
                  <mx-img
                          :img-src="offer.agency.logo"
                          :noResponsive="true"
                          ratio="3/2"
                          alt="Lorem ipsum"
                          :errorImageUrl="$vDefaultPlanImg">

                  </mx-img>
                  <h4 class="mb-0 agency-title">{{offer.agency.officialName}}</h4>
                  <div class="address-wrapper">
                    <p class="title-1">المكتب الرئيسي:</p>
                    <span v-text="$t('district.'+ offer.agency.address.district)"></span> -
                    <span v-text="$t('city.'+ offer.agency.address.city)"></span>
                  </div>

                  <div class="ml-3 mr-3">
                    <button type="button" @click="updateStatistic(StatisticsEnum.PhoneCount)"
                            class="btn com-btn btn-block rounded-0 mb-3 text-4 text-left border-0 hard-shadow call-btn btn-danger"
                            href="#formModalCallOffice" data-toggle="modal" data-target="#formModalCallOffice">
                      <i class="mx-icon-phone ml-1"></i> إتصل بنا الان
                    </button>
                    <button type="button" data-dismiss="modal" aria-label="Close"
                            class="btn com-btn btn-block btn-danger rounded-0 mb-2   text-left border-0 hard-shadow text-4"
                            href="#modalProject" data-toggle="modal" data-target="#modalProject"><i
                      class="mx-icon-envelope ml-1"></i> راسلنا الان
                    </button>
                    <a :href="`/agencies/${offer.agency.id}`" class="text-blue font-size-12px decoration view-more">شاهد جميع مخططاتنا <i
                      class="mx-icon-chevron-left position-relative top-1 ml-1"></i> </a>
                  </div>


                </div>


                <div class="row pl-3 pr-3 d-muk-md-flex d-none social-fav-row">

                  <div class="col-muk-xl-5 col-muk-md-5 fav-col col-muk-sm-12 mt-3 pr-0">
                    <div class="add_shadow  add_to_favorit">
                      <a href="javascript:;" @click="addFavorite()" class="text-decoration-none">
                      <span class="box-content px-1 py-2 text-center d-block">
                        <span class="text-gray text-8 position-relative top-2 mt-2">
                          <i
                            class="added_to_favorit"
                            style="font-size: 70px;"
                            :class="offer.isFavorite ? 'mx-icon-heart' : 'mx-icon-heart-light'"
                          ></i>
                        </span>
                        <span
                          class="add_to_favorit_text font-weight-bold font-size-12px d-block text-dark pt-0"
                        >
                          أضف
                          الى المفضلة
                        </span>
                      </span>
                      </a>
                    </div>
                  </div>

                  <div class="col-muk-xl-7 col-muk-md-7 social-col col-muk-sm-12 mt-3 pl-0 pr-0">
                    <div class="add_shadow bg_white pb-4 pt-4  ">
                      <h4 class="text-center text-black text-3 font-size-14px font-weight-bold">شارك هذا المخطط</h4>
                      <div class="text-center social_share">
                        <a style="line-height: 32.5px" class="send_email" href="#modalShareMail" data-toggle="modal" data-target="#modalShareMail"
                           title="Send Email"><i class="mx-icon-envelope"></i></a>
                        <a style="line-height: 32.5px" class="whats_share" :href="$vRoute.ShareWhatsApp(offer,2)" target="_blank" title="Linkedin"><i
                          class="mx-icon-whatsapp"></i></a>
                        <a style="line-height: 32.5px" class="twitter_share" :href="$vRoute.ShareTwitter(offer,2)" target="_blank" title="Twitter"><i
                          class="mx-icon-twitter"></i></a>
                        <a style="line-height: 32.5px" class="facebook_share" :href="$vRoute.ShareFacebook(offer,2)" target="_blank"
                           title="Facebook"><i class="mx-icon-facebook"></i></a>

                      </div>
                    </div>
                  </div>

                </div>

              </aside>
            </div>

          </div>

        </div>
        <!-- end content of the page -->
        <!-- near real estate -->
        <div class="p-0 pb-3 py-muk-sm-4  same-realestate-container" :class="$mq==='desktop'?'container-muk':''" v-if="relatedOffers && relatedOffers.length>0">

          <h4 class="mr-3 mr-sm-3 mb-3 black-text font-size-16px font-weight-bold">مخططات هندسية مشابهة</h4>
          <hooper class="my-2 p-0 pr-muk-sm-3 pr-muk-md-3" :rtl="true"
                  :settings="hooperOtherProject" :style="$mq=='mobile'?'height:auto':'height: 285px'">
            <CustomSlide style="margin-left: 15px;width: 214px" v-for="(item, i) in relatedOffers" :key="i">
              <nuxt-link :to="'./'+item.id" class="item-link">
                <mx-card-plan class="grid-view-small" :plan="item"></mx-card-plan>
              </nuxt-link>
            </CustomSlide>
            <hooper-navigation slot="hooper-addons" v-if="($mq=='mobile'&& relatedOffers.length > 1) ||
                             ($mq=='tablet'&& relatedOffers.length > 3) ||
                             ($mq!=='mobile' && relatedOffers.length > 5)">
              <img slot="hooper-next" src="~@/assets/images/photo_slide_right.png" alt="no-photo" />

              <img slot="hooper-prev" src="~@/assets/images/photo_slide_left.png" alt="no-photo" />
            </hooper-navigation>

          </hooper>

        </div>

        <!-- end real estate -->


        <!-- Start The modal  call us office -->
        <mx-modal-contacts-card :offer22="offer" :isCall="true" :planType="true"></mx-modal-contacts-card>
        <!-- End The modal Broker -->

        <!-- Start The modal Broker -->

        <!--modalProject isn't used-->
        <mx-modal-contacts-card :offer22="offer" :isMessage="true" :planType="true"></mx-modal-contacts-card>
        <!-- End The modal Broker -->

        <!-- Start The sixth Modal For The shareModal Bottom if There is any problem -->
        <div class="modal fade" id="modalproblem" tabindex="-1" role="dialog" aria-labelledby="formModalLabel"
             aria-hidden="true">
          <div class="modal-dialog basic-modal modalProject">
            <!--modalProject isn't used-->
            <div class="modal-content">
              <button type="button" class="close position-absolute left-8 top-8" data-dismiss="modal" aria-hidden="true"
                      style="z-index: 2;">×
              </button>
              <div class="modal-body">
                <div class="project-details">
                  <div class="  text-center">
                    <p class="title mb-2 text-3 text-center font-weight-bold">ابلغنا عن مشكلة</p>
                    <div class="row mt-2">
                      <div class="col-muk-lg-2"></div>
                      <div class="col-muk-lg-8">
                        <mx-img
                                :img-src="offer.flat0Photo"
                                ratio="3/2"
                                alt="Lorem ipsum"
                                max-size="sd"
                                :errorImageUrl="$vDefaultPlanImg">

                        </mx-img>

                      </div>
                      <div class="col-muk-lg-2"></div>
                    </div>
                    <div class="details p-2">

                      <div class="text-black pt-0 pb-1 font-size-12px">نوع المخطط: {{ $t(`diagramType.${offer.type}`) }}</div>
                      <div class="d-flex justify-content-center text-blue py-1 font-size-12px">
                        <span> أبعاد الطابق الأرضي:</span>
                        <span>{{ offer.maxWidth+'م'}}</span>
                        <span> x </span>
                        <span>{{ offer.maxLength+ 'م' }}</span>

                      </div>
                      <div class="font-size-12px font-weight-bold text-red py-1">المساحة: {{totalArea | toComma}} م²</div>

                    </div>
                  </div>
                </div>

                <ValidationObserver v-slot="{ handleSubmit }">
                  <form @submit.prevent="handleSubmit(reportForm)" novalidate="novalidate">
                    <div class="container-fluid align-items-center mb-0">
                      <div class="row">

                        <div class="col-muk-md-12 form-group">
                          <ValidationProvider name="name" rules="required" v-slot="{errors}">
                            <input type="text" name="name" v-model="form.name" class="form-control" placeholder="إسمك"
                                   required>
                            <div class="validation-message ">
                              <span>{{errors[0]}}</span>
                            </div>
                          </ValidationProvider>
                        </div>

                        <div class="col-muk-md-12 form-group">
                          <ValidationProvider name="mail" rules="required" v-slot="{errors}">
                            <input type="text" name="mail" v-model="form.email" class="form-control"
                                   placeholder="البريد الإلكتروني" required>
                            <div class="validation-message ">
                              <span>{{errors[0]}}</span>
                            </div>
                          </ValidationProvider>
                        </div>

                        <div class="col-muk-md-12   form-group">
                          <ValidationProvider name="reason" rules="required" v-slot="{errors}">
                            <select name="reason"
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
                            <div class="validation-message ">
                              <span>{{errors[0]}}</span>
                            </div>
                          </ValidationProvider>
                        </div>

                        <div class="col-muk-12 p-only-sm-0 mt-0 mb-2">
                          <ValidationProvider name="message" rules="required" v-slot="{errors}">
                          <textarea maxlength="5000" v-model="form.notes" data-msg-required="Please enter your message."
                                    placeholder="ملاحظات اضافية" rows="3" class="form-control text-1" name="message"
                                    required=""></textarea>
                            <div class="form-group">
                              <div class="validation-message ">
                                <span>{{errors[0]}}</span>
                              </div>
                            </div>
                          </ValidationProvider>
                        </div>

                      </div>
                      <div class="footer d-flex justify-content-end mt-0">
                        <button type="submit"
                                class="btn btn-secondary background-blue no-border background-blue no-border btn-sm px-4 text-1"
                                id="button2" name="button">
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
        <!-- End The sixth Modal For The shareModal Bottom if There is any problem -->

        <!-- Start The Fivth Modal For The Fivth Bottom if There is any problem -->
        <div class="modal fade" id="modalShare" tabindex="-1" role="dialog" aria-labelledby="formModalLabel"
             aria-hidden="true">
          <div class="modal-dialog basic-modal modalProject">
            <!--modalProject isn't used-->
            <div class="modal-content">
              <button type="button" class="close position-absolute left-8 top-8" data-dismiss="modal" aria-hidden="true"
                      style="z-index: 2;">×
              </button>
              <div class="modal-body">
                <div class="project-details">
                  <div class="  text-center">
                    <p class="title mb-2 text-3 text-center font-weight-bold">مشاركة العقار</p>
                    <div class="row mt-2">
                      <div class="col-muk-lg-2"></div>
                      <div class="col-muk-lg-8">
                        <mx-img class="rounded"
                                :img-src="offer.flat0Photo"
                                ratio="3/2"
                                alt="Lorem ipsum"
                                max-size="sd"
                                :errorImageUrl="$vDefaultPlanImg">

                        </mx-img>
                      </div>
                      <div class="col-muk-lg-2"></div>
                    </div>
                    <div class="details p-2">

                      <div>نوع المخطط: {{ $t(`diagramType.${offer.type}`) }}</div>
                      <div class="d-flex justify-content-center">
                        <span> أبعاد الطابق الأرضي:</span>
                        <span>{{ offer.maxWidth+'م'}}</span>
                        <span> x </span>
                        <span>{{ offer.maxLength+ 'م' }}</span>

                      </div>
                      <div>المساحة: {{totalArea | toComma}} م²</div>

                    </div>
                  </div>
                </div>
                <form novalidate="novalidate" @submit.prevent>
                  <div class="container-fluid align-items-center mb-0">
                    <div class="row">
                      <div class="col-muk-12 mt-2 mb-2">
                      <textarea v-model="form.friendNote" maxlength="5000"
                                data-msg-required="Please enter your message." placeholder="اكتب الرسالة" rows="3"
                                class="form-control text-1" name="message" required=""></textarea>
                      </div>
                      <div class="col-muk-md-12 form-group">
                        <input type="text" name="name" v-model="form.name" class="form-control  text-2" placeholder="إسمك"
                               required>
                      </div>
                      <div class="col-muk-md-6 pl-muk-md-1 form-group">
                        <input type="tel" name="telephones" v-model="form.email" placeholder="بريدك الالكتروني"
                               class="iti-flag rounded-sm form-control telephones  text-2">
                        <div class="validation-message"></div>
                      </div>
                      <div class="col-muk-md-6 pr-muk-md-1 form-group">
                        <input type="email" name="name" v-model="form.friendEmail" class="form-control  text-2"
                               placeholder="بريد صديقك الالكرتوني" required>
                      </div>
                    </div>
                    <div class="footer d-flex justify-content-end mt-0">
                      <input type="submit" value="إرسال" @click="inviteForm " data-dismiss="modal" aria-label="Close"
                             class="btn btn-secondary btn-modern btn-sm px-4 text-1" data-loading-text="Loading...">
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!-- End The Fivth Modal For The Fivth Bottom if There is any problem -->


        <!--modalProject isn't used-->
        <mx-modal-contacts-card :offer22="offer" :isMobileWhatsApp="true" :planType="true"></mx-modal-contacts-card>



        <!--modalProject isn't used-->
        <mx-modal-contacts-card :offer22="offer" :planType="true" :isMobileMail="true"></mx-modal-contacts-card>

      </div>
    </section>
  </div>

</template>
<script src="./plan_id.js"></script>
<style src="./plan_id.scss" scoped lang="scss"></style>

