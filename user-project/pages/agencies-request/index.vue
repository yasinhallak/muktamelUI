<template>
  <section class="company-registration">
    <style>
      .zulns-datepicker {
        z-index: 9999999999999999999999999999 !important;
      }
      .disabled {
        cursor: not-allowed;
      }
      /* span {
        color: red;
      } */
    </style>

    <div class="CompanyRegistartion-body">
      <div class="background-photo">
        <div class="background-overlay">
          <div class="container-modified h-100">
            <div class="row h-100 align-items-center">
              <div class="col-12 col-muk-lg-6 col-muk-md-5 right-side">
                <div class="py-muk-lg-0 mt-0 mt-muk-md-3 mt-muk-lg-0 content">
                  <div class="text-center pb-1">
                    <p
                      class="font-weight-bold text-title my-0 my-muk-sm-3 text-white"
                    >
                      العقار
                    </p>
                    <p
                      class="font-weight-bold my-0 text-sub-title  my-muk-sm-3 text-white pt-3"
                    >
                      من الألف الى الياء
                    </p>
                  </div>

                  <div class="text-center cover-1 py-muk-xl-1">
                    <p class="text-white text-caption mb-0">
                      أكبر تجمع لأهل الاختصاص
                    </p>
                    <p class="text-white text-caption">
                      في النشاط العقاري والإسكان
                    </p>
                  </div>

                  <div
                    class="d-flex justify-content-center text-center join"
                  >
                    <a @click="agencyRequest"
                      class="d-none d-muk-md-block register-button justify-content-center btn m-0 text-decoration-none  px-3 px-muk-md-4 px-muk-xl-5 datepicker-show"
                      href="#"
                      data-toggle="modal"
                    >سجل نشاطك</a
                    >
                  </div>
                </div>
              </div>

              <!--picture over slider-->
              <div
                class="col-12 img-style col-muk-lg-6 col-muk-md-7 left-side my-0 my-muk-md-4 my-muk-lg-0 px-0 text-center"
              >
                <img
                  src="@/assets/images/companyRegistration.png"
                  alt="no-photo"
                />
              </div>

              <div
                class="d-flex w-100 justify-content-center text-center py-muk-md-3 join"
              >
                <a
                @click="agencyRequest"
                  class="d-block d-muk-md-none register-button justify-content-center btn m-0 text-decoration-none  px-3 px-muk-md-4 px-muk-xl-5 datepicker-show"
                  href="#"
                  data-toggle="modal"
                >سجل نشاطك</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="Benfits">
        <div class="bg-white custom-shadow">
          <div class="py-4">
            <h4 class="font-weight-bold text-primary text-center font-size-22px">
              مزايا الاشتراك
            </h4>
          </div>
          <div class="container-fluid pb-4">
            <div class="row">
              <div class="col-12 mt-1 my-muk-md-2">
                <div class="row">
                  <div class="col-12 col-muk-sm-6 my-2 my-muk-md-0 d-flex">
                    <div class="d-flex justify-content-center align-items-center">
                      <img src="@/assets/images/profile.png" alt="profile" />
                    </div>
                    <div class="d-flex justify-content-center align-items-center">
                    <span class="font-weight-bold font-size-20px mr-2"
                    >صفحة تعريف خاصة لكل نشاط</span
                    >
                    </div>
                  </div>
                  <div class="col-12 col-muk-sm-6 my-2 my-muk-md-0 d-flex">
                    <div class="d-flex justify-content-center align-items-center">
                      <img src="@/assets/images/employees.png" alt="profile" />
                    </div>
                    <div class="d-flex justify-content-center align-items-center">
                    <span class="font-weight-bold font-size-20px mr-2"
                    >إمكانية إضافة الموظفين وإدارتهم</span
                    >
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 mt-1 my-muk-md-2">
                <div class="row">
                  <div class="col-12 col-muk-sm-6 my-2 my-muk-md-0 d-flex">
                    <div class="d-flex justify-content-center align-items-center">
                      <img src="@/assets/images/activity.png" alt="profile" />
                    </div>
                    <div class="d-flex justify-content-center align-items-center">
                    <span class="font-weight-bold font-size-20px mr-2"
                    >إمكانية إضافة أكثر من نشاط</span
                    >
                    </div>
                  </div>
                  <div class="col-12 col-muk-sm-6 my-2 my-muk-md-0 d-flex">
                    <div class="d-flex justify-content-center align-items-center">
                      <img src="@/assets/images/stats.png" alt="profile" />
                    </div>
                    <div class="d-flex justify-content-center align-items-center">
                    <span class="font-weight-bold font-size-20px mr-2"
                    >إحصائيات متعددة لزوار النشاط</span
                    >
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 mt-1 mt-muk-md-2">
                <div class="row">
                  <div class="col-12 col-muk-sm-6 my-2 my-muk-md-0 d-flex">
                    <div class="d-flex justify-content-center align-items-center">
                      <img src="@/assets/images/support.png" alt="profile" />
                    </div>
                    <div class="d-flex justify-content-center align-items-center">
                    <span class="font-weight-bold font-size-20px mr-2"
                    >دعم فني مستمر وأمان عالي</span
                    >
                    </div>
                  </div>
                  <div class="col-12 col-muk-sm-6 my-2 my-muk-md-0 d-flex">
                    <div class="d-flex justify-content-center align-items-center">
                      <img src="@/assets/images/gift.png" alt="profile" />
                    </div>
                    <div class="d-flex justify-content-center align-items-center">
                    <span class="font-weight-bold font-size-20px mr-2"
                    >هدايا وجوائز قيمة للمشتركين</span
                    >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="Registration-mechanism">
        <div class="bg-white custom-shadow">
          <div class="py-4">
            <h4 class="font-weight-bold text-primary text-center font-size-22px">
              ألية التسجيل
            </h4>
          </div>

          <div class="container pb-4">
            <div class="row">
              <div class="col">
                <div class="d-flex justify-content-center">
                  <img src="@/assets/images/first.png" />
                </div>
                <div class="d-flex justify-content-center mt-2 mx-auto w-50 ">
                <span class="font-weight-bold text-center"
                >سيقوم فريق الدعم بالاتصال بكم</span
                >
                </div>
              </div>

              <div class="col">
                <div class="d-flex justify-content-center">
                  <img src="@/assets/images/second.png" />
                </div>
                <div class="d-flex justify-content-center mt-2 mx-auto w-50">
                <span class="font-weight-bold text-center"
                >التحقق من النشاط المطلوب والمستندات</span
                >
                </div>
              </div>

              <div class="col">
                <div class="d-flex justify-content-center">
                  <img src="@/assets/images/third.png" />
                </div>
                <div class="d-flex justify-content-center mt-2 mx-auto w-50">
                <span class="font-weight-bold text-center"
                >الموافقة على الطلب وبدء النشاط</span
                >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="Our-clients">
        <div class="bg-white custom-shadow">
          <div class="py-4">
            <h4 class="font-weight-bold text-primary text-center font-size-22px">
              عملاؤنا
            </h4>
          </div>

          <hooper
            class="agencies-hooper h-100 py-3"
            :settings="hooperSetting"
            :rtl="true"
          >
            <CustomSlide>
              <div class="container-3-2">
                <img
                  src="https://image.freepik.com/free-vector/luxury-letter-e-logo-design_1017-8903.jpg"
                  class="img-fluid rounded img-item child-3-2"
                  alt="Project Image"
                />
              </div>
            </CustomSlide>
            <CustomSlide>
              <div class="container-3-2">
                <img
                  src="https://image.freepik.com/free-vector/3d-box-logo_1103-876.jpg"
                  class="img-fluid rounded img-item child-3-2"
                  alt="Project Image"
                />
              </div>
            </CustomSlide>
            <CustomSlide>
              <div class="container-3-2">
                <img
                  src="https://image.freepik.com/free-vector/blue-tech-logo_1103-822.jpg"
                  class="img-fluid rounded img-item child-3-2"
                  alt="Project Image"
                />
              </div>
            </CustomSlide>
            <CustomSlide>
              <div class="container-3-2">
                <img
                  src="https://image.freepik.com/free-vector/colors-curl-logo-template_23-2147536125.jpg"
                  class="img-fluid rounded img-item child-3-2"
                  alt="Project Image"
                />
              </div>
            </CustomSlide>
            <CustomSlide>
              <div class="container-3-2">
                <img
                  src="https://image.freepik.com/free-vector/abstract-cross-logo_23-2147536124.jpg"
                  class="img-fluid rounded img-item child-3-2"
                  alt="Project Image"
                />
              </div>
            </CustomSlide>
            <CustomSlide>
              <div class="container-3-2">
                <img
                  src="https://image.freepik.com/free-vector/football-logo-background_1195-244.jpg"
                  class="img-fluid rounded img-item child-3-2"
                  alt="Project Image"
                />
              </div>
            </CustomSlide>
            <CustomSlide>
              <div class="container-3-2">
                <img
                  src="https://image.freepik.com/free-vector/background-of-spots-halftone_1035-3847.jpg"
                  class="img-fluid rounded img-item child-3-2"
                  alt="Project Image"
                />
              </div>
            </CustomSlide>
            <CustomSlide>
              <div class="container-3-2">
                <img
                  src="https://image.freepik.com/free-vector/retro-label-on-rustic-background_82147503374.jpg"
                  class="img-fluid rounded img-item child-3-2"
                  alt="Project Image"
                />
              </div>
            </CustomSlide>
            <hooper-navigation slot="hooper-addons">
              <img
                slot="hooper-next"
                src="~@/assets/images/photo_slide_right.png"
                alt="no-photo"
              />
              <img
                slot="hooper-prev"
                src="~@/assets/images/photo_slide_left.png"
                alt="no-photo"
              />
            </hooper-navigation>
          </hooper>
        </div>
      </div>

      <div class="Join-us">
        <div class="bg-white custom-shadow">
          <div class="pt-4">
            <h4 class="font-weight-bold text-primary text-center font-size-22px">
              اختر نشاطك وانظم إلينا الآن!
            </h4>
          </div>

          <div class="container-muk d-flex justify-content-center pb-1">
            <a
            @click="agencyRequest"
              class="px-muk-md-5 px-4 rounded-sm d-flex justify-content-center btn m-4 text-decoration-none font-weight-bold font-size-25px datepicker-show"
              href="#"
              data-toggle="modal"
            >إنضم إلينا الآن!</a
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <input type="hidden" id="date_now" />
    <div
      class="modal fade registrationFormModal"
      id="registrationFormModal"
      name="registrationFormModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="position-absolute w-100 h-100"></div>
          <div class="modal-header no-border">
            <div class="w-100">
              <h5
                class="modal-title font-weight-bold text-center"
                id="exampleModalLongTitle"
                name="exampleModalLongTitle"
              >
                تسجيل نشاط جديد
              </h5>
            </div>
            <button
              type="button"
              class="close text-blue font-weight-bold"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span class="text-blue" aria-hidden="true">&times;</span>
            </button>
          </div>
          <ValidationObserver v-slot="{ handleSubmit }">
            <div class="modal-body p-0">
              <form
                class="font-size-13px"
                @submit.prevent="handleSubmit(submitForm)"
              >
                <div class="custom-border">
                  <div style="margin: 4px 9px !important;">
                    <p
                      class="text-blue m-0 font-weight-bold font-size-14px text-left"
                    >
                      معلومات النشاط
                    </p>
                    <div style="margin-top: 8px !important;" class="form-group">
                      <label class="text-black" for="chooseActivity"
                      >نوع النشاط<span class="text-danger mx-1">*</span></label
                      >
                      <div class="col px-0">
                          <select
                            @change="selectChangeColor('select3')"
                            ref="select3"
                            class="chooseActivity form-control input-shadow font-size-13px"
                            id="chooseActivity"
                            name="chooseActivity"
                            v-model="form.agencyType"
                          >
                            <option :value="null" disabled selected hidden
                            >اختر نوع النشاط</option
                            >
                            <option v-for="item in agenciesList" :value="item"
                            >{{$t(`agencyType.${item}`)}}</option>
                          </select>
                      </div>
                    </div>
                    <div class="form-group mb-3 mt-3 text-black">
                      <label for="facilityName"
                      >أسم المنشأة<span class="text-danger mx-1">*</span></label
                      >
                      <ValidationProvider
                        name="facilityName"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <input
                          v-model="form.agencyName"
                          type="text"
                          class="rounded-sm form-control font-size-13px"
                          id="facilityName"
                          name="facilityName"
                          placeholder="أسم المنشأة المسجلة"
                          autocomplete="false"
                        />
                        <span style="color:red">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div style="margin-bottom: -3px !important;"
                      class="form-group mb-3 mt-3 text-black tradingActivities"
                    >
                      <label class="text-black mb-2" for="registrationNumber"
                      >رقم السجل التجاري<span class="text-danger mx-1"
                      >*</span
                      ></label
                      >
                      <ValidationProvider
                        name="registrationNumber"
                        rules="required|min:10|max:10"
                        v-slot="{ errors }"
                      >
                        <input
                          type="number"
                          class="rounded-sm text-black mb-2 form-control font-size-13px"
                          id="registrationNumber"
                          v-model="form.cRNo"
                          name="registrationNumber"
                          value="رقم السجل التجاري"
                        />
                        <span style="color:red">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>

                  <div class="px-2 custom-bg-input">
                    <div style="padding:4px 0">
                      <div class="px-0 col">
                        <label
                          for="document"
                          class="text-black font-size-8px text-center w-100 font-weight-bold mb-1"
                        >للموثوقية يتطلب معلومات نشاطك في مكتمل إرفاق الملفات
                          التالية<span class="text-danger mx-1">*</span></label
                        >
                        <ValidationProvider
                          name="document"
                          rules="required"
                          v-slot="{ validate, errors }"
                        >
                          <div class="input-group">
                            <div class="custom-file">
                              <input
                                type="file"
                                name="file"
                                class="custom-file-input"
                                id="inputGroupFile01"
                                @change="validate"
                                v-on:input="handleFileUpload1($event)"
                                aria-describedby="inputGroupFileAddon01"
                              />
                              <label
                                class="custom-file-label text-center"
                                style="padding-inline-start: 140px"
                                for="inputGroupFile01"
                              >{{file1Name!==null?file1Name:'لم يتم اختيار اي ملف'}}</label
                              >
                            </div>
                          </div>
                          <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </div>
                    <div class="mb-3 mt-3" v-if="hasSecondaryDoc()">
                      <div class="px-0 col">
                        <label for="document2"
                               class="text-black font-size-10px text-center w-100 font-weight-bold mb-1"
                        >{{$t(`inputFileTypeTrans.${form.agencyType}`)}}<span
                          class="text-red"
                          v-if="form.agencyType != 15"
                        >*</span
                        ></label
                        >
                        <ValidationProvider
                          name="document2"
                          rules="required_if:agencySelected,6,11,12"
                          v-slot="{ validate, errors }"
                        >
                          <div class="input-group">
                            <div class="custom-file">
                              <input
                                type="file"
                                class="rounded-sm form-control font-size-13px"
                                id="document2"
                                name="document2"
                                @change="validate"
                                v-on:input="handleFileUpload2($event)"
                              />
                              <label
                                :class="$mq==='mobile'?'text-right':'text-center'"
                                class="custom-file-label text-center"
                                for="document2"
                              >{{file2Name!==null?file2Name:'لم يتم اختيار اي ملف'}}</label
                              >
                            </div>
                          </div>
                          <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="p-2 m-2 custom-border">
                  <p class="text-blue m-0 font-weight-bold font-size-14px text-left">
                    مقدم الطلب
                  </p>
                  <div class="form-group f-2 m-0">
                    <div class="row">
                      <div class="col-6 form-col"
                           style="padding-inline-end: 5px !important;"
                      >
                        <div class="px-0 col">
                          <label for="firstName" class="text-black m-0"
                          >الأسم الأول<span class="text-danger mx-1"
                          >*</span
                          ></label
                          >
                          <ValidationProvider
                            name="firstName"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <input
                              type="text"
                              class="rounded-sm form-control font-size-13px"
                              id="firstName"
                              name="firstName"
                              v-model="form.firstName"
                              placeholder="الأسم الأول"
                            />
                            <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                      </div>

                      <div class="col-6 form-col"
                           style="padding-inline-start: 5px !important;"
                      >
                        <div class="px-0 col">
                          <label for="lastName" class="text-black m-0"
                          >أسم العائلة<span class="text-danger mx-1"
                          >*</span
                          ></label
                          >
                          <ValidationProvider
                            name="lastName"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <input
                              type="text"
                              class="rounded-sm form-control font-size-13px"
                              id="lastName"
                              v-model="form.lastName"
                              name="lastName"
                              placeholder="أسم العائلة"
                            />
                            <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                      </div>

                      <div class="w-100"></div>

                      <div class="col-12 col-muk-md-6 form-col"
                           style="padding-inline-end: 5px !important;"
                      >
                        <div class="px-0 col">
                          <label for="telephone" class="text-black m-0"
                          >رقم الجوال<span class="text-danger mx-1"
                          >*</span
                          ></label
                          >
                          <!-- <ValidationProvider
                            name="phone"
                            rules="required"
                            v-slot="{ errors }"
                          > -->
                          <mx-form-phone
                            placeholder="رقم الجوال"
                            v-model="form.phone"
                            :disabled="true"
                          ></mx-form-phone>

                          <!-- <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider> -->

                          <div
                            class="validation-message"
                            id="validation-message"
                          ></div>
                        </div>
                      </div>

                      <div :style="$mq !== 'ipad' || $mq !== 'mobile'?'padding-inline-start: 5px !important':''" class="col-12 col-muk-md-6 form-col">
                        <div class="px-0 col">
                          <label for="lastName" class="text-black m-0"
                          >البريد الإلكتروني<span class="text-danger mx-1"
                          >*</span
                          ></label
                          >
                          <!-- <ValidationProvider
                            name="email"
                            rules="required|email"
                            v-slot="{ errors }"
                          > -->
                          <input
                            type="text"
                            class="rounded-sm form-control font-size-13px"
                            id="email"
                            name="email"
                            v-model="form.email"
                            :disabled="true"
                            placeholder="البريد الإلكتروني"
                          />
                          <!-- <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider> -->
                        </div>
                      </div>

                      <div class="col-12 form-col pb-0">
                        <label for="identity" class="text-black m-0"
                        >صفة مقدم الطلب<span class="text-danger mx-1"
                        >*</span
                        ></label
                        >
                        <div class="px-0 col">
                          <ValidationProvider
                            name="identity"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <select
                              @change="selectChangeColor('select2')"
                              ref="select2"
                              class="identity form-control input-shadow font-size-13px"
                              id="identity"
                              name="identity"
                              v-model="form.employeePosition"
                            >
                              <option :value="null" disabled selected hidden
                              >اختر الصفة</option
                              >
                              <option
                                v-for="item in descriptionOfRequest"
                                :value="item"
                              >{{$t(`descriptionOfRequest.${item}`)}}</option
                              >
                            </select>
                            <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                      </div>

                      <!--<div class="w-100"></div>
                      <br />-->

                    </div>
                  </div>
                </div>
                <!--last row-->
                <div class="d-flex">
                <div
                  style="margin-bottom: 7px;"
                  :class="form.findUsMethod == 1?'col-6 col-muk-md-8 mb-3' :'col-6 col-muk-md-12' "
                  :style="form.findUsMethod == 1 && ($mq !== 'ipad' || $mq !== 'mobile')?'padding-inline-end: 0':''"
                  >
                  <div class="px-0 col">
                    <select
                      :style="form.findUsMethod == 1 && ($mq === 'ipad' || $mq === 'mobile')?'max-width:155px':''"
                      @change="selectChangeColor('select1')"
                      ref="select1"
                      class="details form-control input-shadow font-size-13px"
                      id="details"
                      name="details"
                      v-model="form.findUsMethod"
                    >
                      <option :value="null" disabled selected hidden
                      >كيف تعرفت على مكتمل؟ (اختياري)</option
                      >
                      <option v-for="item in findUsMethods" :value="item"
                      >{{$t(`findUsMethods.${item}`)}}</option
                      >
                    </select>
                  </div>
                </div>
                <div
                  class="col-6 col-muk-md-4 agentNumber mb-3"
                  v-if="form.findUsMethod == 1"
                  :style="($mq !== 'ipad' || $mq !== 'mobile')?'padding-inline-start: 10px':'padding:0 4px'"
                >
                  <div class="px-0 col">
                    <ValidationProvider
                      name="code"
                      rules="min:6|max:6"
                      v-slot="{ errors }"
                    >
                      <input
                        required
                        :style="form.findUsMethod == 1 && ($mq === 'ipad' || $mq === 'mobile')?'max-width:150px;margin-inline-start:0':''"
                        style="min-width:140px;min-height:35.19px"
                        type="number"
                        v-model="form.epresentativeCode"
                        class="rounded-sm form-control font-size-10px"
                        id="agentNumber"
                        name="agentNumber"
                        placeholder="أدخل كود المندوب"
                      />
                      <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>
                </div>

                <div class="modal-footer p-0" style="padding-bottom: 5px !important;">
                  <button
                    style="margin-top: 3px"
                    type="submit"
                    class="register-now background-blue btn rounded-sm font-weight-bold font-size-16px w-100 p-2 btn-md btn-block mx-auto text-white"
                    id="button"
                    name="button"
                    :disabled="!isComplete"
                  >
                    سجل الآن
                  </button>
                </div>
              </form>
            </div>
          </ValidationObserver>
        </div>
      </div>
    </div>

    <!-- Modal Successfull Request -->
    <!-- Modal-Success -->

    <mx-modal-request-messages
                    title="رسالة نجاح"
                    subTitle=""
                    msg="تم استلام طلبكم بنجاح"
                    :hasOkButton="hasOkButton"
                    status="success"
                    modal-id="requst_success"
    >
    </mx-modal-request-messages>

    <!---Modal Failed-->


    <mx-modal-request-messages
                    title="رسالة خطأ"
                    subTitle="عذراً !!!!"
                    msg="لديكم طلب مسبق مسجل لدينا في الانتظار"
                    :hasCancelButton="hasCancelButton"
                    status="fail"
                    modal-id="request_fail"
    >
    </mx-modal-request-messages>


  </section>

</template>
<script src="./companyRegistration.js"></script>
<style scoped lang="scss">
@import "~assets/scss/CompanyRegistartion-body";
  @import "companyRegistration";
</style>

