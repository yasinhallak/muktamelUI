<template>
  <section class="profile">
    <div class="container-muk">
      <div class="row justify-content-between userpage-body pb-0 pb-muk-lg-2 px-muk-md-3">
        <!--Start userPage Controlside -->
        <div
          class="col-muk-lg-4 col-muk-md-4 col-muk-sm-12 pr-0 mt-0 mt-muk-sm-3 mb-0 mb-muk-sm-2 control d-none d-muk-md-block"
        >
          <div class="bg-white userpage_sidemenu">
            <div class="user-con-box">
              <div v-if="$mq !=='mobile'" class="user-img" >
                <mx-form-upload-logo :parentphotos="form.logo" postAction="profile/upload"></mx-form-upload-logo>
              </div>
              <label
                class="col text-center main_username font-size-18px mb-0"
              >{{$auth.user.profile.name}}</label>
              <label class="col text-center font-size-14px mt-1 user-role">{{$auth.user.profile.userName}}</label>
              <div class="card-body m-0 p-0">
                <div class="change-photo w-75 mx-auto rounded-sm">
                  <input
                    type="file"
                    accept="image/*"
                    class="filestyle w-100 d-none"
                    id="imageFile"
                    name="imageFile"
                  />
                </div>
                <div class="user-buttons-row">
                  <div class="list-group user_menu" id="list-tab" role="tablist">
                    <a
                      class="list-group-item list-group-item-action mt-2 active info"
                      id="list-info-list"
                      data-toggle="list"
                      @click="$router.push(`/profile/#list-info`)"
                      href="#list-info"
                      role="tab"
                      aria-controls="info"
                    >
                      <i class="mx-icon-id-card"></i> المعلومات الشخصية
                      <i class="mt-1 float-right mx-icon-chevron-left left-icon"></i>
                    </a>
                    <a
                      class="list-group-item list-group-item-action password"
                      id="list-password-list"
                      data-toggle="list"
                      @click="$router.push(`/profile/#list-password`)"
                      href="#list-password"
                      role="tab"
                      aria-controls="password"
                    >
                      <i class="mx-icon-lock"></i> تغيير كلمة السر
                      <i class="mt-1 float-right mx-icon-chevron-left left-icon"></i>
                    </a>
                    <a
                      class="list-group-item list-group-item-action favorites"
                      id="list-favorites-list"
                      data-toggle="list"
                      @click="$router.push(`/profile/#list-favorites`), reset()"
                      href="#list-favorites"
                      role="tab"
                      aria-controls="favorites"
                    >
                      <i class="mx-icon-heart"></i>العناصر المفضلة
                      <i class="mt-1 float-right mx-icon-chevron-left left-icon"></i>
                    </a>
                    <a
                      class="list-group-item list-group-item-action available"
                      id="list-notifications-list"
                      data-toggle="list"
                      @click="$router.push(`/profile/#list-notifications`)"
                      href="#list-notifications"
                      role="tab"
                      aria-controls="notifications"
                    >
                      <i class="mx-icon-bell"></i> تنبيهاتي
                      <i class="mt-1 float-right mx-icon-chevron-left left-icon"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--End userPage Controlside -->
        <div class="col-muk-lg-8 col-muk-md-8 col-muk-sm-12 mt-0 mt-muk-md-3 mb-0 mb-muk-md-2
            d-flex justify-content-center settings bg-white userpage_container">
          <div class="user-info-box w-100">
            <div class="form-group">
              <div class="tab-content" id="nav-tabContent">
                <!--Start personal information -->
                <div
                  class="tab-pane fade show active mt-muk-md-5 pt-muk-md-5 pt-1 mt-1"
                  id="list-info"
                  name="list-info"
                  role="tabpanel"
                  aria-labelledby="list-info-list"
                >
                  <div class="row justify-content-center">
                    <div class="col-muk-md-7 col-12 list-info-col px-muk-sm-0">
                      <div class="d-block d-muk-md-none">
                          <!--<span class="user_change_photo d-none">
                            <i class="fas fa-camera"></i> تغيير الصورة
                          </span>-->
                        <div class="user-con-box">
                          <div class="user-img" >
                            <mx-form-upload-logo :parentphotos="$auth.user.profile.logo" postAction="profile/upload"></mx-form-upload-logo>
                          </div>
                        </div>
                        <label
                          class="col text-center main_username font-size-18px mb-0 color-secondary"
                        >{{$auth.user.profile.name}}</label>
                        <div class="change-photo w-75 mx-auto rounded-sm">
                          <input
                            type="file"
                            accept="image/*"
                            class="filestyle w-100 d-none"
                            id="imageFile"
                            name="imageFile"
                          />
                        </div>
                        <label
                          class="col text-center font-size-14px userRole"
                        >{{$auth.user.profile.userName}}</label>
                      </div>
                      <ValidationObserver v-slot="{ handleSubmit }">
                        <form
                          id="personal_form"
                          class="pr-0 pr-muk-sm-1 pr-muk-md-0"
                          name="personal_form"
                          @submit.prevent="handleSubmit(EditUserProfile)"
                        >
                          <div
                            :class="$mq==='mobil' || $mq==='ipad'?'pr-muk-sm-5 mr-muk-sm-3':''"
                            class="pr-0"
                          >
                            <div class="row">
                              <div class="col-muk-lg-5 col-muk-md-5 col-12 form-group">
                                <ValidationProvider
                                  name="FirstName"
                                  rules="required"
                                  v-slot="{ errors }"
                                >
                                  <label for="firstname">الاسم الأول</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="firstname"
                                    aria-describedby="firstnameHelp"
                                    v-model="form.firstName"
                                  />
                                  <div class="validation-message">
                                    <small
                                      id="firstnameHelp"
                                      class="form-text text-muted error"
                                    >{{ errors[0] }}</small>
                                  </div>
                                </ValidationProvider>
                              </div>

                              <div class="col-muk-lg-5 col-muk-md-5 col-12 form-group">
                                <ValidationProvider
                                  name="LastName"
                                  rules="required"
                                  v-slot="{ errors }"
                                >
                                  <label for="secondname">اسم العائلة</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="secondname"
                                    aria-describedby="secondnameHelp"
                                    v-model="form.lastName"
                                  />
                                  <div class="validation-message">
                                    <small
                                      id="secondnameHelp"
                                      class="form-text text-muted error"
                                    >{{ errors[0] }}</small>
                                  </div>
                                </ValidationProvider>
                              </div>
                              <div class="col-muk-md-2 d-none d-muk-md-block form-group"></div>
                            </div>

                            <div class="row align-items-center">
                              <div class="col-muk-lg-10 col-muk-md-10 col-9 input-with-verify form-group">
                                <label for="telephone">رقم الجوال</label>
                                <mx-form-phone :placeholder="'5XXXXXXXXX'" v-model="form.phone" :dataError="checkPhoneError" :messageError="'رقم الجوال مسجل لدينا سابقاً'" :keyup="isbuttonDisablePhone=false"></mx-form-phone>
                              </div>
                              <vue-recaptcha
                                @verify="onVerify"
                                size="invisible"
                                ref="Recaptcha"
                                @expired="onExpired"
                                :sitekey="sitekey"
                              ></vue-recaptcha>

                              <div class="col-muk-lg-2 col-muk-md-2 col-3 form-group pr-muk-lg-0 pt-0 save-info-row">
                                <button
                                  type="button"
                                  @click="callApiChangePhone()"
                                  class="btn mt-0 save_info"
                                  :disabled="isbuttonDisablePhone || isPhoneConfirmed() || !phoneCheck() || form.phone == null"
                                >{{isPhoneConfirmed()?'محقق':'التحقق'}}</button>
                              </div>
                            </div>

                            <div class="row align-items-center">
                              <div class="col-muk-lg-10 col-muk-md-10 col-9 input-with-verify form-group">
                                <label for="email">البريد الألكتروني</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="email"
                                  aria-describedby="emailHelp"
                                  v-model="form.email"
                                />
                                <div class="validation-message">
                                  <small
                                    id="emailHelp"
                                    class="form-text text-muted error"
                                    v-show="!emailCheck()"
                                  >
                                    صيغة
                                    الايميل
                                    خاطئة
                                  </small>
                                  <small class="form-text text-muted error" v-if="checkEmailError">
                            هذا البريد الإلكتروني مسجل لدينا </small>
                                </div>

                              </div>

                              <div class="col-muk-lg-2 col-muk-md-2 col-3 form-group pr-muk-lg-0 pt-0 save-info-row">
                                <button
                                  type="button"
                                  @click="callApiChangeEmail()"
                                  class="btn mt-0 save_info"
                                  :disabled="isbuttonDisableEmail || isMailConfirmed() || !emailCheck() || form.email == null"
                                >{{isMailConfirmed()?'محقق':'التحقق'}}</button>
                              </div>
                            </div>
                          </div>

                          <div class="row save-row">
                            <div class="col-muk-md-12 col-12 text-center">
                              <button
                                type="submit"
                                :class="$mq==='mobile'?'w-100':''"
                                class="btn px-5 save_button"
                              >حفظ</button>
                            </div>
                          </div>
                        </form>
                      </ValidationObserver>
                    </div>
                  </div>
                </div>
                <b-modal id="modal-email-profile" cancel-title="موافق">
                  <div class="container">
                    <div class="row justify-content-center align-items-center">
                      <div class>
                        <div class="login">
                          <div class="login-form bg-white">
                            <form class="font-size-13px">
                              <div class="mx-4 d-flex justify-content-center">
                                <img src="@/assets/images/registration/email-check.svg" width="150" />
                              </div>

                              <div class="text-center title mx-4">
                                <label
                                  class="font-size-16px d-block font-weight-bold mb-2 color-black"
                                >
                                  التحقق عن طريق
                                  البريد الالكتروني
                                </label>
                              </div>

                              <div class="text-center title-details mx-4" v-show="successTries">
                                <label class="font-size-13px d-block succes mb-0">
                                  لقد تم ارسال رسالة تحقق الى بريدك
                                  الالكتروني
                                </label>
                                <label class="font-size-13px d-block succes mb-0">
                                  ذو العنوان
                                  <span id="content_email" class="mx-2">{{form.email}}</span>
                                </label>
                                <label class="font-size-13px d-block succes">
                                  هذه الرسالة تحوي على رابط لاكمال
                                  التحقق من تغير البريدالإلكتروني
                                </label>
                              </div>

                              <div
                                class="text-center title-details mx-4 failTries"
                                v-show="failTries"
                              >
                                <label class="font-size-13px d-block times-up mb-0">
                                  لقد تم ارسال رسالة تحقق الى بريدك
                                  الالكتروني
                                </label>
                                <label
                                  class="font-size-13px d-block times-up mb-0"
                                >ذو العنوان مسبقا {{form.email}}</label>
                                <label class="font-size-13px d-block times-up">
                                  حاول التغير بعد 8 ساعات أو قم بتغيير
                                  البريد
                                  الالكتروني
                                </label>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <template v-slot:modal-footer>
                    <div class="w-100">
                      <b-button
                        style="width: 90px;border-radius: 0!important;"
                        variant="primary"
                        size="sm"
                        class="float-right"
                        @click="$bvModal.hide('modal-email-profile')"
                      >موافق</b-button>
                    </div>
                  </template>
                </b-modal>
                <!---modal phon component-->
                <mx-modal-phone
                  ref="confirmModalPhone3"
                  @call-parent="callApiChangePhone"
                  method="confirmChangePhone"
                  action="P"
                  :phone="form.phone"
                ></mx-modal-phone>
                <!--End personal information -->

                <!--Start change password -->
                <div
                  class="tab-pane fade mt-muk-md-5 pt-muk-md-4 pt-1 mt-1"
                  id="list-password"
                  name="list-password"
                  role="tabpanel"
                  aria-labelledby="list-password-list"
                >
                  <div class="row justify-content-center">
                    <div class="col-muk-md-12 col-muk-lg-12 col-12">
                      <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                        <form
                          id="form_changePassword"
                          name="form_changePassword"
                          @submit.prevent="handleSubmit(ChangePassword)"
                        >
                          <div class="d-block d-muk-md-none">
                            <div class="user-img" >
                              <span class="user_change_photo d-none">
                                <i class="mx-icon-camera"></i> تغيير الصورة
                              </span>
                              <mx-form-upload-logo
                                :parentphotos="$auth.user.profile.logo"
                                postAction="profile/upload"
                              ></mx-form-upload-logo>
                            </div>
                            <label
                              class="col text-center main_username font-size-18px mb-0 color-secondary"
                            >{{$auth.user.profile.name}}</label>
                            <label
                              class="col text-center font-size-14px user-pass-role"
                            >{{$auth.user.profile.userName}}</label>
                          </div>
                          <div class="row px-2 px-muk-sm-0 d-flex password-form justify-content-center">
                            <div class="col-muk-md-8 col-12 form-group">
                              <ValidationProvider
                                name="oldPassword"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <label for="old-password">كلمة المرور القديمة</label>

                                <input
                                  type="password"
                                  class="form-control"
                                  id="old-password"
                                  aria-describedby="oldpasswordHelp"
                                  v-model="password.oldPassword"
                                />
                                <div class="validation-message">
                                  <small
                                    id="oldpasswordHelp"
                                    class="form-text error text-muted"
                                  >{{ errors[0] }}</small>
                                </div>
                              </ValidationProvider>
                            </div>

                            <div class="col-muk-md-8 col-12 form-group">
                              <ValidationProvider
                                name="newPassword"
                                v-slot="{ errors }"
                                rules="required|verify_password|min:8"
                                vid="checkPassword"
                              >
                                <label for="new-password">كلمة المرور الجديدة</label>

                                <input
                                  type="password"
                                  class="form-control"
                                  id="new-password"
                                  aria-describedby="newpasswordHelp"
                                  v-model="password.newPassword"
                                />
                                <div class="validation-message">
                                  <small
                                    id="newpasswordHelp"
                                    class="form-text text-muted error"
                                  >{{ errors[0] }}</small>
                                </div>
                              </ValidationProvider>
                            </div>

                            <div class="col-muk-md-8 col-12 form-group">
                              <ValidationProvider
                                name="confirmNewPassword"
                                v-slot="{ errors }"
                                rules="required|confirmed:checkPassword"
                              >
                                <label for="rnewpassword">تأكيد كلمة المرور الجديدة</label>

                                <input
                                  type="password"
                                  class="form-control"
                                  id="rnewpassword"
                                  aria-describedby="rnewpasswordHelp"
                                  v-model="password.newPasswordConfirm"
                                />
                                <div class="validation-message">
                                  <small
                                    id="rnewpasswordHelp"
                                    class="form-text text-muted error"
                                  >{{ errors[0] }}</small>
                                </div>
                              </ValidationProvider>
                            </div>
                          </div>

                          <div class="row save_button_row">
                            <div class="col-muk-md-12 col-12 p-0 text-center">
                              <button class="btn px-5 save_button" type="submit">حفظ</button>
                            </div>
                          </div>
                        </form>
                      </ValidationObserver>
                    </div>
                  </div>
                </div>
                <!--End change password -->

                <!-- Start favorites -->
                <div
                  class="tab-pane fade mb-4"
                  id="list-favorites"
                  name="list-favorites"
                  role="tabpanel"
                  aria-labelledby="list-favorites-list"
                >
                  <div :class="favoriteTitleSelected===1?'font-size-24px':''" class="page_title mt-muk-3 mt-muk-sm-1 mb-3">
                    <span>{{$t(`favoriteTitle.${favoriteTitleSelected}`)}}</span>
                    <button
                      type="button"
                      class="back_page"
                      v-if="offerSelected != null"
                      @click="reset()"
                    >
                      <i class="mx-icon-back"></i> رجوع
                    </button>
                  </div>
                  <div class="header d-flex align-items-center pb-2" v-if="resultsCount!=0">
                    <div class="results">
                      <span class="font-size-16px font-weight-bold">عدد النتائج :</span>
                      <span class="font-size-16px font-weight-bold">{{resultsCount}}</span>
                    </div>
                    <div class="sort mx-select mr-auto position-relative">
                      <select class="form-sort" v-model="sortSelected" @change="onChangeSort()">
                        <option :value="null" disabled>الترتيب حسب</option>
                        <option :value="{sortCol :3,sortDir:1 }">تاريخ التفضيل ( الاقرب )</option>
                        <option :value="{sortCol :3,sortDir:2 }">تاريخ التفضيل ( الابعد )</option>
                      </select>
                      <i class="fas mx-icon-sort position-absolute"></i>
                    </div>
                  </div>

                  <!--fav items section-->
                  <div class="pt-4 fav-selection-container" v-if="offerSelected == null">
                    <div class="row fav-selection-row">
                      <div class="col-muk-md-6 px-muk-md-3 px-0">
                        <div
                          class="favorite_button d-flex align-items-center justify-content-between"
                          @click="offerSelected = 1; FilterRealEstate()"
                        >
                          <div class="favorite_icon real-color-text">
                            <i class="mx-icon-home"></i>
                          </div>

                          <div class="favorite_title real-color-text">العقارات</div>
                          <div class="favorite_count real-color">{{userFavorites.realEstateStatistics}}</div>
                        </div>
                      </div>

                      <div class="col-muk-md-6 px-muk-md-3 px-0">
                        <div
                          class="favorite_button d-flex align-items-center justify-content-between"
                          @click="offerSelected = 2; FilterPlan()"
                        >
                          <div class="favorite_icon plan-color-text">
                            <i class="mx-icon-plan"></i>
                          </div>
                          <div class="favorite_title plan-color-text">المخططات الهندسية</div>
                          <div
                            class="favorite_count plan-color"
                          >{{userFavorites.engineeringStatistics}}</div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-muk-md-6 px-muk-md-3 px-0">
                        <div
                          class="favorite_button d-flex align-items-center justify-content-between"
                        >
                          <div class="favorite_icon sch-color-text">
                            <i class="mx-icon-graduation-cap"></i>
                          </div>
                          <div class="favorite_title sch-color-text">المدارس</div>
                          <div class="favorite_count sch-color">5</div>
                        </div>
                      </div>

                      <div class="col-muk-md-6 px-muk-md-3 px-0">
                        <div
                          class="favorite_button d-flex align-items-center justify-content-between"
                        >
                          <div class="favorite_icon hos-color-text">
                            <i class="mx-icon-h-square"></i>
                          </div>
                          <div class="favorite_title hos-color-text">المراكز الصحية</div>
                          <div class="favorite_count hos-color">38</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="real-estate-container" v-if="realestates && offerSelected == 1">
                    <div class="container-muk">
                      <div v-if="realestates && realestates.totalCount==0">
                        <div class="m-2 m-muk-sm-0">
                          <div class="col-12 no-contains font-size-14px pb-3 pt-3 pb-muk-sm-1 pt-muk-sm-1">
                            <h1 class="font-size-16px font-weight-bold">لا يوجد عقارات في القائمة المفضلة لديكم</h1>

                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div
                          class="col-muk-md-12 col-muk-lg-12 mt-2 p-0"
                          :key="index"
                          v-for="(item,index) in realestates.page"
                        >
                          <nuxt-link class="item-link" :to="'/real-estates/'+item.id">
                            <mx-card-realestate
                              :offerItems="item"
                              class="mb-3"
                              :class="{'grid-view':$mq === 'mobile'}"
                              :hasCallButtons="true"
                              @favoriteChanged="FilterRealEstate"
                            ></mx-card-realestate>
                          </nuxt-link>
                        </div>
                      </div>
                    </div>
                    <div class="my-3" v-if="realestates.totalCount">
                      <b-pagination
                        class="justify-content-center"
                        v-model="currentPageReal"
                        :total-rows="realestates.totalCount"
                        pills
                        :per-page="realestates.perPage"
                        @change="onChangePagination"
                        next-class="btn-pagination"
                        prev-text="السابق"
                        next-text="التالي"
                        prev-class="btn-pagination"
                        last-class="last-page"
                        first-class="first-page"
                      >
                        <template v-slot:prev-text>
                          <span>
                            <i class="mx-icon-chevron-right"></i>السابق
                          </span>
                        </template>
                        <template v-slot:next-text>
                          <span>
                            التالي
                            <i class="mx-icon-chevron-left"></i>
                          </span>
                        </template>
                      </b-pagination>
                    </div>
                  </div>

                  <div class="plan-container" v-if="plans && offerSelected == 2">
                    <div class="container-muk">
                      <div v-if="plans.totalCount==0">
                        <div class="m-2 m-muk-sm-0">
                          <div class="col-12 no-contains font-size-14px pb-3 pt-3 pb-muk-sm-1 pt-muk-sm-1">
                            <h1 class="font-size-16px font-weight-bold">لا يوجد مخططات في القائمة المفضلة لديكم</h1>

                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12 p-0" v-for="plan in plans.page">
                          <nuxt-link :to="'/plans/'+plan.id" class="item-link">
                            <mx-card-plan
                              :plan="plan"
                              class="mb-3"
                              :class="{'grid-view':$mq === 'mobile', 'list-view': $mq !== 'mobile'}"
                              @favoriteChanged="FilterPlan"
                            ></mx-card-plan>
                          </nuxt-link>
                        </div>
                      </div>
                    </div>
                    <template v-if="plans.totalCount">
                      <b-pagination
                        class="justify-content-center"
                        v-model="currentPagePlans"
                        :total-rows="plans.totalCount"
                        pills
                        :per-page="plans.perPage"
                        @change="onChangePaginationPlans"
                        next-class="btn-pagination"
                        prev-text="السابق"
                        next-text="التالي"
                        prev-class="btn-pagination"
                        last-class="last-page"
                        first-class="first-page"
                      >
                        <template v-slot:prev-text>
                          <span>
                            <i class="mx-icon-chevron-right"></i> السابق
                          </span>
                        </template>
                        <template v-slot:next-text>
                          <span>
                            التالي
                            <i class="mx-icon-chevron-left"></i>
                          </span>
                        </template>
                      </b-pagination>
                    </template>
                  </div>
                </div>
                <!-- End favorites -->

                <!-- Start Notifications -->
                <div
                  class="tab-pane fade"
                  id="list-notifications"
                  name="list-notifications"
                  role="tabpanel"
                  aria-labelledby="list-available-list"
                >
                  <h1 class="text-center text-blue title">تنبيهاتي</h1>
                  <div class="notifications-list">
                    <div class="row m-0">
                      <div class="col-12" v-if="$auth.user.searchQueries==''">
                        <div class="m-2 m-muk-sm-0">
                          <div class="col-12 no-contains font-size-14px pb-3 pt-3 pb-muk-sm-1 pt-muk-sm-1">
                            <h1 class="font-size-16px font-weight-bold">لا يوجد تنبيهات في القائمة لديكم</h1>

                          </div>
                        </div>
                      </div>
                      <template v-else>
                        <mx-card-notification
                          class="col-12"
                          v-for="item in $auth.user.searchQueries"
                          :key="item.id"
                          :item-data="item"
                        ></mx-card-notification>
                      </template>
                    </div>
                  </div>
                </div>
                <!-- End Notifications -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="./profile.js"></script>
<style lang="scss">
  @import "./profile.scss";
  @import "@/assets/n-scss/pages/profile.scss";
</style>
