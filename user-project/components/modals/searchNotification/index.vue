<template>
    <b-modal   @show="getAddress" modal-class="notificationsModal"  entrance-transition="animated bounceIn" leave-transition="animated bounceOut" centered
            hide-footer hide-header v-bind="modalAttribute" >
    <template v-slot:default="{ close }">
      <div class="modal-dialog2 basic-modal modalProject">
        <div class="modal-content">

          <!--***********************************************modal header ************************************-->
          <p class="text-blue text-center font-size-20px py-2 mb-1 font-weight-bold"><span><i
            class="mx-icon-bell pl-1"></i></span>إضافة تنبيه</p>
          <button type="button" @click="close" class="close position-absolute left-8 top-8" data-dismiss="modal"
                  aria-hidden="true" style="z-index: 2;">×
          </button>
          <p class="main-title mb-1">تنبيهي عند الإعلان في الموقع عن أي عقار بالمواصفات التالية</p>
          <hr>

          <!--***********************************************modal body ************************************-->
          <div class="modal-body">
            <div class="container-fluid notification-content">

              <ValidationObserver v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit()" novalidate="novalidate">
                  <!--row 0-->
                  <div class="row m-0">
                    <div class="col-3 col-sm-3 p-0"><p class="item-title text-black">عنوان التنبيه</p></div>
                    <div class="col-9 col-sm-9 p-0">
                      <ValidationProvider name="title" rules="required" v-slot="{errors}">
                        <input style="color:#7D858C"
                               v-model="innerForm.title"
                               name="title"
                               type="text"
                               class="item-content"
                        />
                        <div class="form-group">
                          <div class="validation-message ">
                            <span>{{errors[0]}}</span>
                          </div>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>

                  <!--row 1-->
                  <div class="row item-row">
                    <div class="col-3 col-sm-3 p-0"><p class="item-title">الموقع</p></div>
                    <div class="col-9 col-sm-9 p-0">
                      <ValidationProvider name="title" rules="required" v-slot="{errors}">
                        <p class="item-content" v-if="!innerForm.addressId">

                        </p>
                        <p class="item-content" v-if="innerForm.addressId">
                          <!--region case-->
                          <template v-if="innerForm.addressId<99">
                            {{$t('region.'+ innerForm.addressId)}}
                          </template>
                          <!--city case-->
                          <template v-else-if="innerForm.addressId>99 && innerForm.addressId<9999">
                            {{$t('city.'+ innerForm.addressId)}}
                          </template>
                          <!--district case-->
                          <template v-else-if="innerForm.addressId>9999">
                            {{$t('district.'+ innerForm.addressId)}}
                          </template>
                        </p>
                      </ValidationProvider>
                    </div>
                  </div>

                  <!--row 2-->
                  <div class="row item-row">
                    <div class="col-3 col-sm-3 p-0"><p class="item-title">نوع العقار</p></div>
                    <div class="col-9 col-sm-9 p-0">
                      <p class="item-content">
                   <span v-for="item in propertyTypes" :key="item.id">
                          {{ $t('realEstateType.' + item) }}
                        </span>
                        <span v-if="!propertyTypes.length">جميع العقارات</span>
                      </p>
                    </div>
                  </div>

                  <!--row 3-->
                  <div class="row item-row" v-if="innerForm.dealType">
                    <div class="col-3 col-sm-3 p-0"><p class="item-title">نوع العملية</p></div>
                    <!--sale-->

                      <div class="col-9 col-sm-9 p-0">
                        <p class="item-content">
                          {{ deal_(innerForm.dealType, innerForm.rentType) }} - {{ address_(innerForm.addressId) }}
                        </p>
                      </div>

                  </div>

                  <!--row 4-->
                  <div class="row item-row" v-if="innerForm.priceFrom || innerForm.priceTo">
                    <div class="col-3 col-sm-3 p-0"><p class="item-title">حدود السعر</p></div>
                    <div class="col-9 col-sm-9 p-0">
                      <p class="item-content">
                        <span class="min-price">{{innerForm.priceFrom?innerForm.priceFrom:'ادنى سعر'}}</span>
                        -
                        <span class="max-price">{{innerForm.priceFrom?innerForm.priceTo:'اعلى سعر'}}</span>
                      </p>
                    </div>
                  </div>

                  <!--row 5-->
                  <div class="row item-row"
                       v-if="innerForm.roomsCountFrom || innerForm.roomsCountTo ||
                             innerForm.bathRoomsCountFrom || innerForm.bathRoomsCountTo"
                  >

                    <!--rooms count-->
                    <template v-if="innerForm.roomsCountFrom || innerForm.roomsCountTo">
                      <div class="col-3 col-sm-3 p-0"><p class="item-title">عدد الغرف</p></div>
                      <div class="col-3 col-sm-3 p-0">
                        <p class="item-content">
                          <span class="min-room">{{innerForm.roomsCountFrom?innerForm.roomsCountFrom:'0'}}</span>
                          -
                          <span class="max-room">{{innerForm.roomsCountTo?innerForm.roomsCountTo:'∞'}}</span>
                        </p>
                      </div>
                    </template>

                    <!--bathrooms count-->
                    <template v-if="innerForm.bathRoomsCountFrom || innerForm.bathRoomsCountTo">
                      <div class="col-3 col-sm-3 p-0"><p class="item-title">عدد الحمامات</p></div>
                      <div class="col-3 col-sm-3 p-0">
                        <p class="item-content">
                          <span class="min-bathroom">{{innerForm.bathRoomsCountFrom?innerForm.bathRoomsCountFrom:'0'}}</span>
                          -
                          <span class="max-bathroom">{{innerForm.bathRoomsCountTo?innerForm.bathRoomsCountTo:'∞'}}</span>
                        </p>
                      </div>
                    </template>

                  </div>

                  <!--row 6-->
                  <div class="row item-row"
                       v-if="innerForm.landAreaFrom || innerForm.landAreaTo ||
                             innerForm.buildingAreaFrom || innerForm.buildingAreaTo"
                  >

                    <!--land Area-->
                    <template v-if="innerForm.landAreaFrom || innerForm.landAreaTo">
                      <div class="col-3 col-sm-3 p-0"><p class="item-title">مساحة العقار</p></div>
                      <div class="col-3 col-sm-3 p-0">
                        <p class="item-content">
                          <span class="min-area">{{innerForm.landAreaFrom?innerForm.landAreaFrom:'0'}}</span>
                          -
                          <span class="max-area">{{innerForm.landAreaFrom?innerForm.landAreaTo:'∞'}}</span>
                          <span>م<sub lang="ar-sa">2</sub></span>
                        </p>
                      </div>
                    </template>

                    <!--build Area-->
                    <template v-if="innerForm.buildingAreaFrom || innerForm.buildingAreaTo">
                      <div class="col-3 col-sm-3 p-0"><p class="item-title">مساحة البناء</p></div>
                      <div class="col-3 col-sm-3 p-0">
                        <p class="item-content">
                          <span class="min-area">{{innerForm.buildingAreaFrom?innerForm.buildingAreaFrom:'0'}}</span>
                          -
                          <span class="max-area">{{innerForm.buildingAreaTo?innerForm.buildingAreaTo:'∞'}}</span>
                          <span>م<sub lang="ar-sa">2</sub></span>
                        </p>
                      </div>
                    </template>

                  </div>

                  <!--row 7-->
                  <div class="row item-row"
                       v-if="innerForm.streetsCountFrom || innerForm.streetsCountTo ||
                             innerForm.finishingRealEstate"
                  >

                    <!--streets-->
                    <template v-if="innerForm.streetsCountFrom || innerForm.streetsCountTo">
                      <div class="col-3 col-sm-3 p-0"><p class="item-title">الشوارع المحيطة</p></div>
                      <div class="col-9 col-sm-3 p-0">
                        <p class="item-content">
                          <span class="min-street">{{innerForm.streetsCountFrom?innerForm.streetsCountFrom:'0'}}</span>
                          -
                          <span class="max-street">{{innerForm.streetsCountTo?innerForm.streetsCountTo:'∞'}}</span>
                        </p>
                      </div>
                    </template>

                    <!--finish RealEstate-->
                    <template v-if="innerForm.finishingRealEstate">
                      <div class="col-3 col-sm-3 p-0"><p class="item-title">تشطيب العقار</p></div>
                      <div class="col-9 col-sm-3 p-0">
                        <p class="item-content">
                          {{innerForm.finishingRealEstate?$t('building_finish.'+ innerForm.finishingRealEstate):'غير محدد'}}
                        </p>
                      </div>
                    </template>

                  </div>

                  <!--row 8-->
                  <div class="row item-row"
                       v-if="innerForm.realEstateAgeFrom || innerForm.realEstateAgeTo"
                  >
                    <div class="col-3 col-sm-3 p-0"><p class="item-title">عمر العقار</p></div>
                    <div class="col-9 col-sm-9 p-0">
                      <p class="item-content">
                    <span
                      class="min-age">{{innerForm.realEstateAgeFrom?$t('building_old.'+ innerForm.realEstateAgeFrom):'ادنى'}}</span>
                        -
                        <span
                          class="max-age">{{innerForm.realEstateAgeTo?$t('building_old.'+ innerForm.realEstateAgeTo):'اعلى'}}</span>
                      </p>
                    </div>
                  </div>

                  <!--row 9-->
                  <div class="row item-row"
                       v-if="innerForm.keyWord"
                  >
                    <div class="col-3 col-sm-3 p-0"><p class="item-title">يحتوي كلمة</p></div>
                    <div class="col-9 col-sm-9 p-0"><p class="item-content">{{innerForm.keyWord?innerForm.keyWord:'غير محدد'}}</p>
                    </div>
                  </div>

                  <!--row 10-->
                  <div class="row item-row"
                       v-if="innerForm.agencyId"
                  >
                    <div class="col-3 col-sm-3 p-0"><p class="item-title">جهة العرض</p></div>
                    <div class="col-9 col-sm-9 p-0" v-if="!innerForm.agencyId"><p class="item-content">غير محدد</p></div>
                    <template v-if="innerForm.agencyId" v-for="item in AgenciesRealEstate">
                      <template v-if="innerForm.agencyId == item.id">
                        <div class="col-9 col-sm-9 p-0"><p class="item-content">{{item.name}}</p></div>
                      </template>
                    </template>
                  </div>

                  <!--features row-->
                  <div class="row item-row features-row"
                       v-if="innerForm.featuresRealEstates.length !== 0 || innerForm.hasVirtualTour"
                  >
                    <div class="col-3 col-sm-3 p-0">
                      <p class="item-title">
                        ميزات إضافية
                      </p>
                    </div>
                    <div class="col-9 col-sm-9">
                      <p class="item-content"
                         v-if="innerForm.featuresRealEstates.length === 0 && !innerForm.hasVirtualTour"
                      >
                        غير محدد
                      </p>
                    </div>
                    <!--virtual Tour-->
                    <div class="col-12 col-sm-12 p-0" v-if="innerForm.hasVirtualTour">
                      <p class="item-content">
                        <i class="mx-icon-check pl-1"></i>
                        يحتوي جولة افتراضية أو صور بانورامية
                      </p>
                    </div>
                    <!--features option-->
                    <div class="col-12 p-0" v-if="innerForm.featuresRealEstates.length>0">
                      <div class="row mb-1">
                        <div class="col-4 col-sm-3" v-for="(item,index) in innerForm.featuresRealEstates">
                          <p class="item-content">
                            <i class="mx-icon-check pl-1"></i>
                            {{$t('features.'+ item)}}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!--buttons row-->
                  <div class="row item-row mt-1 no-border">
                    <div class="col-12 col-sm-8 p-0">
                      <p class="text-black font-size-11px font-weight-bold m-0"> تنبيه عبر :</p>
                      <ul class="d-flex justify-content-start align-items-center row px-3">
                        <li class="mb-1 font-size-12px text-black p-1">
                          <label @click="checkConfirmedTool('الهاتف المحمول',$auth.user.profile.isPhoneConfirm)" for="whatsapp" class="d-flex align-items-center">
                            <input :disabled="!$auth.user.profile.isPhoneConfirm"   id="whatsapp" class="ml-1"  type="checkbox" v-model="innerForm.byWhatsApp">
                            <i class="mx-icon-whatsapp ml-1" aria-hidden="true"></i>
                            واتس اب
                          </label>
                        </li>
                        <li class="mb-1 font-size-12px text-black p-1">
                          <label for="mail" class="d-flex align-items-center">
                            <input @click="checkConfirmedTool('البريد الإلكتروني',$auth.user.profile.isEmailConfirm)" :disabled="!$auth.user.profile.isEmailConfirm" id="mail" class="ml-1" type="checkbox" v-model="innerForm.byEmail">
                            <i class="mx-icon-envelope ml-1" aria-hidden="true"></i>
                            الإيميل
                          </label>
                        </li>
                      </ul>
                    </div>
                    <div class="col-12 col-sm-4 p-sm-0 pt-3 pb-1 search-button-col d-flex
                    align-items-center justify-content-center justify-content-sm-end">
                      <button type="submit" class="btn btn-primary" @click="postSearchQuery();close()">
                        حفظ البحث
                      </button>
                    </div>
                  </div>

                </form>
              </ValidationObserver>

            </div>
          </div>
          <!--********************************************end modal body ************************************-->

        </div>
      </div>
    </template>
  </b-modal>
</template>
<script src="./searchNotification.js"></script>
<style src="./searchNotification.scss" lang="scss"></style>

