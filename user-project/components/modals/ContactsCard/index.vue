<template>


  <!--Web Call Modal-->

  <div
    @click.prevent
    v-if="isCall"
    class="modal contact-card-modal fade"
    :id="id? id:'formModalCallOffice'"
    tabindex="-1"
    role="dialog"
    aria-labelledby="formModalCallOffice"
    aria-hidden="true"
  >
    <div class="modal-dialog basic-modal modalProject">
      <div class="modal-content">
        <button type="button" class="close position-absolute left-8 top-8" data-dismiss="modal"
                aria-hidden="true" style="z-index: 2;">×
        </button>
        <div class="modal-body">
          <p v-if="!projectType && !agencyType" class="title mb-2 text-3 text-center font-weight-bold">الاتصال
            بالوسيط</p>
          <p v-if="projectType" class="title mb-2 text-3 text-center font-weight-bold">الاتصال بالوسيط</p>
          <p v-if="agencyType" class="title mb-2 text-3 text-center font-weight-bold">الاتصال بالشركة</p>
          <div class="row">
            <div class="col">
              <div class="project-details">
                <div class="container-fluid text-center">
                  <div class="row">
                    <div class="col-lg-2"></div>
                    <div class="col-lg-8">
                      <mx-img
                        v-if="planType"
                        :img-src="offer22.flat0Photo"
                        ratio="3/2"
                        max-size="sd"
                        alt="plan Image"
                        :errorImageUrl="$vDefaultPlanImg">
                      </mx-img>
                      <mx-img
                        v-if="!planType && !agencyType && !projectRealType && offer22.photos.length>0"
                        :img-src="offer22.photos[0].path"
                        ratio="3/2"
                        max-size="sd"
                        alt="Project Image"
                        :errorImageUrl="$vDefaultRealEstateImg">
                      </mx-img>
                      <mx-img
                        v-if="agencyType"
                        :img-src="offer22.logo"
                        ratio="3/2"
                        :noResponsive="true"
                        alt="agency logo"
                        :errorImageUrl="$vDefaultAgencyImg">
                      </mx-img>
                      <mx-img
                        v-if="projectRealType"
                        :img-src="offer22.image"
                        ratio="3/2"
                        max-size="sd"
                        alt="Project Image"
                        :errorImageUrl="$vDefaultProjectImg">
                      </mx-img>
                    </div>
                    <div class="col-lg-2"></div>
                  </div>
                  <div class="details">
                    <h6 class="project-title font-weight-bold text-2 my-1"
                        v-text="!agencyType?offer22.title:offer22.name">
                      دوبلكس جديد
                      للبيع في حي
                      المقبل في مدينة المجمعة</h6>
                    <ul class="location text-blue my-0 text-1 d-flex justify-content-center">
                      <li :key="index"
                          v-for="(item,index) in listAddress(offer22.address) ">
                        {{item}}
                      </li>
                    </ul>
                    <p v-if="realEstateType && offer22.price" class="text-red font-size-12px font-weight-bold">
                      {{formatNumber(offer22.price)}}<span>ريال</span></p>
                    <h5 class="text-center text-1 font-weight-normal my-1 mt-3">رقم
                      الاتصال
                    </h5>
                    <h5 class="text-red text-center item_price text-5 direction-ltr">
                      <span>+</span>966
                      <span v-if="!agencyType && !projectRealType" v-text="offer22.employee.user.phone"></span>
                      <span v-if="agencyType" v-text="offer22.contact.phone"></span>
                      <span v-if="projectRealType" v-text="offer22.employee.phone"></span>
                    </h5>
                    <div v-if="!projectType && !agencyType"
                         class="text-primary text-dark text-center font-weight-normal text-1 my-3">
                      قد يطلب منك الوسيط رقم المرجع
                      <div class="direction-ltr text-5" v-text="offer22.id">
                      </div>
                    </div>
                  </div>

                  <div class="text-center mt-2">
                    <a @click.stop
                      :href="`${!agencyType && !projectRealType?'tel:00966'+ offer22.employee.user.phone
                              :projectRealType?'tel:00966'+ offer22.agency.phone
                              :'tel:00966'+ offer22.contact.phone}`
                              "
                      value="اتصال"

                      class="btn btn-secondary background-blue no-border btn-modern btn-sm px-5 text-2 direction-ltr telephone">اتصال</a>
                  </div>
                </div>
              </div>


            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

  <!--Web Message Modal WhatsApp And Mail-->
  <div
    v-else-if="isMessage"
    class="modal contact-card-modal fade"
    :id="id? id:'modalProject'"
    tabindex="-1"
    role="dialog"
    aria-labelledby="formModalLabel"
    style="display: none;"
    aria-hidden="true"
  >
    <div class="modal-dialog basic-modal modalProject">

      <div class="modal-content">
        <button aria-hidden="true" class="close position-absolute left-8 top-8" data-dismiss="modal"
                style="z-index: 2;"
                type="button">×
        </button>
        <div class="modal-body">
          <p v-if="!agencyType" class="title mb-2 text-3 font-weight-bold">{{offer22.agency.name}}</p>
          <p v-if="agencyType" class="title mb-2 text-3 font-weight-bold">{{offer22.name}}</p>
          <div class="row">
            <div class="col">

              <div class="mt-1">
                <h5 :hidden="agencyType && !offer22.contact.whatsApp" class="text-center text-1 font-weight-bold my-1">راسلنا عبر</h5>
                <ul :hidden="agencyType && !offer22.contact.whatsApp"  class="nav nav-pills sw_out mt-0" id="pills-tab" role="tablist">
                  <li class="nav-item email_ch  text-1">
                    <a aria-controls="pills-email" aria-selected="true" class="nav-link active" data-toggle="pill"
                       href="#pills-email"
                       id="pills-email-tab" role="tab">البريد الالكرتوني</a>
                  </li>
                  <li  class="nav-item mobile_ch text-1">
                    <a aria-controls="pills-whatsapp" aria-selected="false" class="nav-link" data-toggle="pill"
                       href="#pills-whatsapp"
                       id="pills-whatsapp-tab" role="tab">واتساب</a>
                  </li>
                </ul>
                <div class="tab-content no-border" id="pills-tabContent">

                  <!--send by email-->
                  <div aria-labelledby="pills-email-tab" class=" tab-pane fade show active email_ch_input mt-2 "
                       id="pills-email"
                       role="tabpanel">

                    <div class="project-details">
                      <div class="container-fluid text-center">

                        <div class="row">
                          <div class="col-lg-12">
                            <mx-img
                              v-if="planType"
                              class="rounded"
                              :img-src="offer22.flat0Photo"
                              ratio="3/2"
                              max-size="sd"
                              alt="Project Image"
                              :errorImageUrl="require('@/assets/images/default_offerPhoto.jpg')">
                            </mx-img>
                            <mx-img
                              v-if="!planType && !agencyType && offer22.photos.length>0"
                              :img-src="offer22.photos[0].path"
                              ratio="3/2"
                              max-size="sd"
                              alt="Project Image"
                              :errorImageUrl="require('@/assets/images/default_offerPhoto.jpg')">
                            </mx-img>
                            <mx-img
                              v-if="agencyType"
                              class="rounded"
                              :img-src="offer22.logo"
                              ratio="3/2"
                              :noResponsive="true"
                              alt="Project Image"
                              :errorImageUrl="require('@/assets/images/default_offerPhoto.jpg')">
                            </mx-img>
                          </div>
                        </div>
                        <div class="details p-2">
                          <h4 class="title mb-0" v-if="!agencyType">
                            {{ offer22.title }}
                          </h4>
                          <h4 class="title mb-0" v-if="agencyType">
                            {{ offer22.name }}
                          </h4>
                          <div>
                            <ul class="location text-blue my-0 text-1 d-flex justify-content-center">
                              <li :key="index" v-if="!planType"
                                  v-for="(item,index) in listAddress(offer22.address) ">
                                {{item}}
                              </li>
                              <li :key="index" v-else-if="planType"
                                  v-for="(item,index) in listAddress(offer22.agency.address) ">
                                {{item}}
                              </li>
                            </ul>


                            <div v-if="planType" class="details p-2">

                              <div>نوع المخطط: {{ $t(`diagramType.${offer22.type}`) }}</div>
                              <div class="d-flex justify-content-center">
                                <span> أبعاد الطابق الأرضي:</span>
                                <span>{{ offer22.maxWidth+'م'}}</span>
                                <span> x </span>
                                <span>{{ offer22.maxLength+ 'م' }}</span>

                              </div>
                              <div>المساحة: {{totalArea | toComma}} م²</div>

                            </div>
                          </div>
                          <!--only realEstate Type-->
                          <div v-if="realEstateType" class="item_price text-red  text-center item_price text-3 ">
                            <template v-if="!isAuction && offer22.price">
                              <span v-text="formatNumber(offer22.price)"></span>
                              <span class="text_font text-1">ريال</span>
                            </template>
                          </div>
                          <!--only realEstate Type-->
                          <div v-if="realEstateType" class="item_price text-primary text-center item_price text-3">
                            <template v-if="isAuction">
                              <span v-text="$moment(offer22.auction.date).calendar() "></span>
                            </template>
                          </div>
                          <!--only Project Type-->
                          <p v-if="projectType" class="text-primary text-small font-weight-normal">( {{
                            $t(`projectState.${offer22.state}`) }} )</p>
                        </div>
                      </div>
                    </div>

                    <ValidationObserver v-slot="{ handleSubmit }">
                      <form  @submit.prevent="handleSubmit(contactForm)" novalidate="novalidate">
                        <div class="container-fluid align-items-center mb-0">
                          <div class="row">

                            <!--message field-->
                            <div class="col-12 mt-2 mb-2 text-area">
                              <ValidationProvider name="message" rules="required" v-slot="{errors}">
														<textarea maxlength="5000"
                                      v-model="form.notes"
                                      data-msg-required="Please enter your message."
                                      placeholder="ملاحظاتك" rows="3"
                                      class="form-control text-1" name="message"
                                      required="">"'مرحباً , أنا مهتم بعقارك ( {{offer22.id}} ) في موقع مكتمل .الرجاء التواصل معي , شكرا'"
                            </textarea>
                                <div class="form-group">
                                  <div class="validation-message ">
                                    <span>{{errors[0]}}</span>
                                  </div>
                                </div>
                              </ValidationProvider>
                            </div>

                            <!--name field-->
                            <div class="col-md-12 form-group">
                              <ValidationProvider name="name" rules="required" v-slot="{errors}">
                                <input class="form-control  text-1" name="name" placeholder="إسمك"
                                       required
                                       type="text" v-model="form.name">
                                <div class="validation-message ">
                                  <span>{{errors[0]}}</span>
                                </div>
                              </ValidationProvider>
                            </div>

                            <!--phone field-->
                            <div class="col-md-12 form-group">
                              <ValidationProvider name="telephones" rules="required" v-slot="{errors}">
                                <mx-form-phone placeholder="5XXXXXXXX" v-model="form.phone"
                                               :disabled="false"></mx-form-phone>
                                <div class="validation-message ">
                                  <span>{{errors[0]}}</span>
                                </div>
                              </ValidationProvider>
                            </div>

                            <!--email field-->
                            <div class="col-md-12 form-group">
                              <ValidationProvider name="email"
                                                  rules="required|email"
                                                  v-slot="{errors}"
                              >
                                <input class="form-control text-1" name="email" placeholder="بريدك الإلكترونى"
                                       required
                                       type="email"
                                       v-model="form.email"
                                >
                                <div class="validation-message ">
                                  <span>{{errors[0]}}</span>
                                </div>
                              </ValidationProvider>
                            </div>

                          </div>
                          <div class="footer d-flex justify-content-end mt-0">
                            <button
                              type="submit"
                              class="btn btn-secondary background-blue no-border btn-modern btn-sm px-4 text-1"

                              name="button"
                            >
                              إرسال
                            </button>

                          </div>
                        </div>
                      </form>
                    </ValidationObserver>


                  </div>

                  <!--send by whatsapp-->
                  <div aria-labelledby="pills-whatsapp-tab" class=" tab-pane fade   mobile_ch_input mt-2 "
                       id="pills-whatsapp"
                       role="tabpanel"
                  >
                    <div class="project-details">
                      <div class="container-fluid text-center">

                        <div class="row">

                          <div class="col-lg-12">
                            <mx-img
                              v-if="planType"
                              class="rounded"
                              :img-src="offer22.flat0Photo"
                              ratio="3/2"
                              max-size="sd"
                              alt="Project Image"
                              :errorImageUrl="require('@/assets/images/default_offerPhoto.jpg')">
                            </mx-img>
                            <mx-img
                              v-if="!planType && !agencyType && offer22.photos.length>0"
                              :img-src="offer22.photos[0].path"
                              ratio="3/2"
                              max-size="sd"
                              alt="Project Image"
                              :errorImageUrl="require('@/assets/images/default_offerPhoto.jpg')">
                            </mx-img>
                            <mx-img
                              v-if="agencyType"
                              :img-src="offer22.logo"
                              class="rounded"
                              ratio="3/2"
                              :noResponsive="true"
                              alt="Project Image"
                              :errorImageUrl="require('@/assets/images/default_offerPhoto.jpg')">
                            </mx-img>
                          </div>
                        </div>
                        <div class="details">
                          <h4 class="title mb-0" v-if="!agencyType"
                              v-text="offer22.title">دوبلكس
                            جديد
                            للبيع في حي المقبل في مدينة المجمعة
                          </h4>
                          <h4 class="title mb-0" v-if="agencyType"
                              v-text="offer22.name">دوبلكس
                            جديد
                            للبيع في حي المقبل في مدينة المجمعة
                          </h4>
                          <ul class="location text-blue my-0 text-1 d-flex justify-content-center">
                            <li :key="index" v-if="!planType"
                                v-for="(item,index) in listAddress(offer22.address) ">
                              {{item}}
                            </li>
                            <li :key="index" v-else-if="planType"
                                v-for="(item,index) in listAddress(offer22.agency.address) ">
                              {{item}}
                            </li>
                          </ul>
                          <!--only RealEstate Type-->
                          <div v-if="realEstateType" class="item_price text-red text-center item_price text-3">
                            <template v-if="!isAuction && offer22.price">
                              <span v-text="formatNumber(offer22.price)"></span>
                              <span class="text_font text-1">ريال</span>
                            </template>
                            <template v-if="isAuction">
                              <span v-text="$moment(offer22.auction.date).calendar()"></span>
                            </template>
                          </div>

                          <!--only RealEstate Type-->
                          <div v-if="false" class="item_price text-primary text-center item_price text-3">
                            <template v-if="isAuction">
                              <span v-text="$moment(offer22.auction.date).calendar()"></span>
                            </template>
                          </div>

                          <!--only Project Type-->
                          <p v-if="projectType" class="text-primary text-small font-weight-normal">( {{
                            $t(`projectState.${offer22.state}`) }} )</p>

                        </div>
                      </div>
                    </div>
                    <form novalidate="novalidate">
                      <div class="container-fluid align-items-center mb-0">
                        <div class="row">
                          <div class="col-12 mt-2 mb-2">
                        <textarea maxlength="5000"
                                  data-msg-required="Please enter your message."
                                  placeholder="ملاحظاتك"
                                  rows="3"
                                  v-model="form.notes"
                                  class="form-control text-1 message_popup" name="message"
                                  required="">
                            </textarea>
                          </div>
                        </div>
                        <div class="footer d-flex justify-content-end mt-0">
                          <input type="button"
                                 :disabled="!form.notes"
                                 @click="Statistic(4)"
                                 target="_blank"
                                 class="btn btn-secondary background-blue no-border btn-modern btn-sm px-4 text-1"
                                 value="إرسال" data-loading-text="Loading...">
                        </div>
                      </div>
                    </form>

                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!--Mobile Mail Modal-->
  <div @click.prevent
    v-else-if="isMobileMail"
    class="modal contact-card-modal fade"
    :id="id?id:'modalEmail'"
    tabindex="-1"
    role="dialog"
    aria-labelledby="formModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog basic-modal modalProject">
      <div class="modal-content">
        <button aria-hidden="true" class="close position-absolute left-8 top-8" data-dismiss="modal"
                style="z-index: 2;" type="button">×
        </button>
        <div class="modal-body">
          <p v-if="realEstateType" class="title mb-2 text-3 font-weight-bold" v-text="offer22.agency.name">مكتب الغيث
            للعقارات</p>
          <div class="project-details">
            <div class="  text-center">
              <p class="title mb-2 text-3 text-center font-weight-bold">راسلنا عبر البريد الالكتروني</p>
              <div class="row mt-2">
                <div class="col-lg-2"></div>
                <div class="col-lg-8 n-not-p">
                  <mx-img
                    v-if="planType"
                    :img-src="offer22.flat0Photo"
                    class="rounded"
                    ratio="3/2"
                    max-size="sd"
                    alt="Project Image"
                    :errorImageUrl="$vDefaultPlanImg">>
                  </mx-img>
                  <mx-img
                    v-if="!planType && !agencyType && !projectRealType && offer22.photos.length>0"
                    :img-src="offer22.photos[0].path"
                    class="rounded"
                    ratio="3/2"
                    max-size="sd"
                    alt="Project Image"
                    :errorImageUrl="$vDefaultRealEstateImg">>
                  </mx-img>
                  <mx-img
                    v-if="agencyType"
                    :img-src="offer22.page.image"
                    class="rounded"
                    ratio="3/2"
                    :noResponsive="true"
                    alt="Project Image"
                    :errorImageUrl="$vDefaultAgencyImg">
                  </mx-img>
                  <mx-img
                    v-if="projectRealType"
                    :img-src="offer22.image"
                    class="rounded"
                    ratio="3/2"
                    max-size="sd"
                    alt="Project Image"
                    :errorImageUrl="$vDefaultProjectImg">
                  </mx-img>
                </div>
                <div class="col-lg-2"></div>
              </div>
              <div class="details">
                <h6 class="project-title  font-weight-bold text-secondary  my-1 text-2  ">{{offer22.title}}</h6>
                <ul class="location text-blue my-0 text-1 d-flex justify-content-center">
                  <li :key="index"
                      v-for="(item,index) in listAddress(offer22.address) ">
                    {{item}}
                  </li>
                </ul>
                <!--only RealEstate Type-->
                <div v-if="realEstateType" class="item_price text-red text-center item_price text-3">
                  <template v-if="!isAuction && offer22.price">
                    <span v-text="formatNumber(offer22.price)"></span>
                    <span class="text_font text-1">ريال</span>
                  </template>
                </div>
                <!--only RealEstate Type-->
                <div v-if="realEstateType" class="item_price text-primary text-center item_price text-3">
                  <template v-if="isAuction">
                    <span v-text="$moment(offer22.auction.date).calendar() "></span>
                  </template>
                </div>
                <!--only Project Type-->
                <p v-if="projectType" class="text-primary text-small font-weight-normal">( {{
                  $t(`projectState.${offer22.state}`) }} )</p>

              </div>
            </div>
          </div>
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(contactForm)" novalidate="novalidate">
              <div class="container-fluid align-items-center mb-0">
                <div class="row">

                  <!--message field-->
                  <div class="col-12 mt-2 mb-2 padding-0-mobile">
                    <ValidationProvider name="message" rules="required" v-slot="{errors}">
														<textarea maxlength="5000"
                                      v-model="form.notes"
                                      data-msg-required="Please enter your message."
                                      placeholder="ملاحظاتك" rows="3"
                                      class="form-control text-1" name="message"
                                      required="">"'مرحباً , أنا مهتم بعقارك ( {{offer22.id}} ) في موقع مكتمل .الرجاء التواصل معي , شكرا'"
                            </textarea>
                      <div class="form-group">
                        <div class="validation-message ">
                          <span>{{errors[0]}}</span>
                        </div>
                      </div>
                    </ValidationProvider>
                  </div>

                  <!--name field-->
                  <div class="col-md-12 form-group">
                    <ValidationProvider name="name" rules="required" v-slot="{errors}">
                      <input class="form-control  text-1" name="name" placeholder="إسمك"
                             required
                             type="text" v-model="form.name">
                      <div class="validation-message ">
                        <span>{{errors[0]}}</span>
                      </div>
                    </ValidationProvider>
                  </div>

                  <!--phone field-->
                  <div class="col-md-12 form-group">
                    <ValidationProvider name="telephones" rules="required" v-slot="{errors}">
                      <mx-form-phone placeholder="5XXXXXXXX" v-model="form.phone" :disabled="false"></mx-form-phone>
                      <div class="validation-message ">
                        <span>{{errors[0]}}</span>
                      </div>
                    </ValidationProvider>
                  </div>

                  <!--email field-->
                  <div class="col-md-12 form-group">
                    <ValidationProvider name="email"
                                        rules="required|email"
                                        v-slot="{errors}"
                    >
                      <input class="form-control text-1" name="email" placeholder="بريدك الإلكترونى"
                             required
                             type="email"
                             v-model="form.email"
                      >
                      <div class="validation-message ">
                        <span>{{errors[0]}}</span>
                      </div>
                    </ValidationProvider>
                  </div>

                </div>
                <div class="footer d-flex justify-content-end mt-0">
                  <button
                    type="submit"
                    class="btn btn-secondary background-blue no-border btn-modern btn-sm px-4 text-1"
                    @click.prevent="handleSubmit(contactForm)"
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


  <!--Mobile WhatsApp Modal-->
  <div
    @click.prevent
    v-else-if="isMobileWhatsApp"
    class="modal contact-card-modal fade"
    :id="id?id:'modalWhatsApp'"
    tabindex="-1"
    role="dialog"
    aria-labelledby="formModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog basic-modal modalProject">
      <div class="modal-content">
        <button type="button" class="close position-absolute left-8 top-8" data-dismiss="modal"
                aria-hidden="true" style="z-index: 2;">×
        </button>
        <div class="modal-body">
          <p class="title mb-2 text-3 font-weight-bold" v-text="offer22.title">مكتب الغيث للعقارات</p>
          <div class="row">
            <div class="col">
              <div class="mt-1">
                <h5 class="text-center text-1 font-weight-bold my-1">راسلنا عبر واتس اب</h5>
                <div class="no-border">
                  <!--send by whatsapp-->
                  <div class="mobile_ch_input mt-2">
                    <div class="project-details">
                      <div class="container-fluid text-center">

                        <div class="row">
                          <div class="col-lg-2"></div>
                          <div class="col-lg-8">
                            <mx-img
                              v-if="planType"
                              :img-src="offer22.flat0Photo"
                              class="rounded"
                              ratio="3/2"
                              max-size="sd"
                              alt="plan Image"
                              :errorImageUrl="$vDefaultPlanImg">>
                            </mx-img>
                            <mx-img
                              v-if="projectRealType"
                              :img-src="offer22.image"
                              class="rounded"
                              ratio="3/2"
                              max-size="sd"
                              alt="Project Image"
                              :errorImageUrl="$vDefaultRealEstateImg">>
                            </mx-img>
                            <mx-img
                              v-if="!planType && !projectRealType && offer22.photos.length>0"
                              :img-src="offer22.photos[0].path"
                              class="rounded"
                              ratio="3/2"
                              max-size="sd"
                              alt="Project Image"
                              :errorImageUrl="$vDefaultProjectImg">
                            </mx-img>
                          </div>
                          <div class="col-lg-2"></div>
                        </div>
                        <div class="details">
                          <h6 class="project-title font-weight-bold text-2 my-1"
                              v-text="offer22.title">دوبلكس
                            جديد
                            للبيع في حي المقبل في مدينة المجمعة</h6>
                          <ul class="location text-blue my-0 text-1 d-flex justify-content-center">
                            <li :key="index"
                                v-for="(item,index) in listAddress(offer22.address) ">
                              {{item}}
                            </li>
                          </ul>
                          <!--only realEstate Type-->
                          <div v-if="realEstateType" class="item_price text-red text-center item_price text-3">
                            <template v-if="!isAuction && offer22.price">
                              <span v-text="formatNumber(offer22.price)"></span>
                              <span class="text_font text-1">ريال</span>
                            </template>
                          </div>
                          <!--only realEstate Type-->
                          <div v-if="realEstateType" class="item_price text-primary text-center item_price text-3">
                            <template v-if="isAuction">
                          <span
                            v-text="$moment(offer22.auction.date).calendar() ">
                          </span>
                            </template>
                          </div>
                          <!--only Project Type-->
                          <p v-if="projectType" class="text-primary text-small font-weight-normal">( {{
                            $t(`projectState.${offer22.state}`) }} )</p>

                        </div>
                      </div>
                    </div>

                    <form id="demo-form22" novalidate="novalidate">
                      <div class="container-fluid align-items-center mb-0">
                        <div class="row">
                          <div class="col-12 mt-2 mb-2">
                        <textarea maxlength="5000"
                                  data-msg-required="Please enter your message."
                                  placeholder="ملاحظاتك"
                                  rows="3"
                                  v-model="form.notes"
                                  class="form-control text-1 message_popup" name="message"
                                  required="">
                            </textarea>
                          </div>
                        </div>
                        <div class="footer d-flex justify-content-end mt-0">
                          <input type="button"
                                 :disabled="!form.notes"
                                 @click.prevent="Statistic(3)"
                                 target="_blank"
                                 class="btn btn-secondary background-blue no-border btn-modern btn-sm px-4 text-1"
                                 value="إرسال" data-loading-text="Loading...">
                        </div>
                      </div>
                    </form>
                  </div>


                </div>

              </div>


            </div>
          </div>


        </div>
      </div>
    </div>
  </div>


</template>
<script src="./contactsCardModal.js"></script>
<style src="./contactsCardModal.scss" lang="scss"></style>

