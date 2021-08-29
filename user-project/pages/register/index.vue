<template>
  <section class="register">
    <div class="container-muk">
      <div class="row register-body ">
        <div class="col-muk-lg-8 mt-3  hide_responsive ">
          <div class="info px-sm-5 px-3 card-body bg-white custom-shadow">
            <div class="logo">
              <img
                src="@/assets/images/muktamel_logo.png"
                class="d-blok"
                alt="logo"
              />
            </div>

            <h1 class="text-secondary font-size-18px font-weight-bold">
              لماذا عليك التسجيل في ( مكتمل )
            </h1>
            <p class="font-size-13px px-0 about my-0">
              بالاضافة الى تصفح العقارات , المشاريع , الاستراحات , المدارس ,
              والكثير من الانشطة التجارية
            </p>
            <p class="font-size-13px px-0 about">
              فأن ( مكتمل ) سيمكنك من تجربة خدمات فريدة لا تنسى
            </p>

            <!-- <div class="row p-5 features text-primary"> -->
            <div class="row px-3  features text-primary">
              <div class="col-muk-6">
                <img src="@/assets/images/registration/shield.svg" alt="" />
                <h6 class="font-size-13px">الموثوقية</h6>
              </div>
              <div class="col-muk-6">
                <img src="@/assets/images/registration/chat.svg" alt="" />
                <h6 class="font-size-13px">المنتديات<br />العقارية والهندسية</h6>
              </div>
              <div class="col-muk-6">
                <img src="@/assets/images/registration/stamp.svg" alt="" />
                <h6 class="font-size-13px">التمويل العقاري</h6>
                <p class="font-size-11px">
                  لا داعي للذهاب للبنك<br />
                  نحن أحضرنا كل البنوك إليك
                </p>
              </div>
              <div class="col-muk-6">
                <img src="@/assets/images/registration/building.svg" alt="" />
                <h6 class="font-size-13px">حاسبة البناء</h6>
                <p class="font-size-11px">
                  إضافة الى المخططات الهندسية<br />وكل المعلومات المتعلقة بالبناء
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-muk-lg-4 mt-3 ">
          <div class="register h-100">
            <div class="col-sm-12 bg-white custom-shadow register-form h-100">
              <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                <form
                  class=" font-size-13px mb-4"
                  @submit.prevent="handleSubmit(callApiRegister)"
                  @keyup="dataError=false"
                >
                  <div class="form-group">
                    <label for="username"
                    >اسم المستخدم<span class="text-danger">*</span></label
                    >
                    <ValidationProvider
                      name="username"
                      rules="required|min:3|uniqe"
                      v-slot="{errors}"
                    >
                      <input
                        type="text"
                        id="username"
                        autofocus
                        name="username"
                        autocomplete="false"
                        class="rounded-sm form-control"
                        v-model="form.username"
                      />
                      <div class="validation-message ">
                        <span>{{errors[0]}}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div id="show_hide_password" class="form-group ">
                    <label for="password"
                    >كلمة المرور<span class="text-danger">*</span></label
                    >
                    <div class="input-group">
                      <ValidationProvider
                        name="password"
                        rules="required|verify_password|min:8"
                        v-slot="{errors}"
                        class="input-validate-group"
                      >
                        <input
                          :type="fieldType"
                          autocomplete="false"
                          id="password"
                          name="password"
                          v-model="form.password"
                          class="rounded-sm form-control position-relative"
                        />
                        <span
                          class="input-group-prepend show-pass position-absolute"
                          @click.prevent="togglePassword"
                        >
                        <i
                          class="text-color-secondary font-size-16px font-weight-bold"
                          :class="fieldType==='text'?'mx-icon-eye':'mx-icon-eye-slash'"
                          aria-hidden="true"
                        ></i>
                      </span>
                        <div class="validation-message ">
                          <span>{{errors[0]}}</span>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>

                  <div class="form-group mb-2 mt-5 mb-0  ">
                    <label class="text-center">وسيلة التحقق</label>
                    <div class="sw_out mt-2">
                      <div
                        class="email_ch "
                        @click="ChangeEmail"
                        :class="selectedEmail?'active':''"
                      >
                        البريد الالكرتوني
                      </div>
                      <div
                        class="mobile_ch "
                        @click="ChangePhone"
                        :class="selectedPhone?'active':''"
                      >
                        رقم الجوال
                      </div>
                    </div>
                    <div class="input_cont w-100">
                      <div
                        class="form-group email_ch_input mt-3 "
                        v-if="selectedEmail"
                      >
                        <label for="email"
                        >البريد الإلكتروني<span class="text-danger"
                        >*</span
                        ></label
                        >
                        <ValidationProvider
                          name="email"
                          rules="required|email"
                          v-slot="{errors}"
                        >
                          <input
                            type="text"
                            id="email"
                            name="email"
                            class="rounded-sm form-control"
                            v-model="form.email"
                          />
                          <div class="validation-message ">
                            <span>{{errors[0]}}</span>
                            <span v-if="dataError">
                            هذا  البريد الإلكتروني مسجل لدينا إذا نسيت
                            كلمة المرور
                            <a v-b-modal.forgetPassword>أضغط هنا</a></span
                            >
                          </div>
                        </ValidationProvider>
                      </div>
                      <div
                        class="form-group mobile_ch_input mt-3"
                        v-if="selectedPhone"
                      >
                        <label for="telephone"
                        >رقم الجوال<span class="text-danger">*</span></label
                        >
                        <mx-form-phone
                          placeholder="5XXXXXXXX"
                          v-model="form.phone"
                          :dataError="dataError"
                          :link="link"
                          messageError="هذا الرقم  مسجل لدينا إذا نسيت
                            كلمة المرور"
                        >
                        </mx-form-phone>
                      </div>
                    </div>
                  </div>
                  <div class="terms-submit text-center font-size-12px">
                    <p class="mb-3">
                      بمتابعة التسجيل فإنك تؤكد موافقتك على<br />
                      <a
                        href="#"
                        class="text-color-secondary"
                        data-toggle="modal"
                        data-target="#largeModal"
                      >بنود الاتفاقية الخاصة بـ مكتمل</a
                      >
                    </p>
                    <div
                      class="modal fade new-modal-style"
                      id="largeModal"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="defaultModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h4 class="modal-title" id="defaultModalLabel">
                              بنود الاتفاقية
                            </h4>
                            <button
                              type="button"
                              class="close"
                              data-dismiss="modal"
                              aria-hidden="true"
                            >
                              &times;
                            </button>
                          </div>
                          <div class="modal-body text-left">
                            هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء
                            لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي
                            للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك
                            يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ
                            طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد
                            محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي
                            الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي
                            وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل
                            إفتراضي كنموذج عن النص، وإذا قمت بإدخال "lorem ipsum"
                            في أي محرك بحث ستظهر العديد من المواقع الحديثة العهد
                            في نتائج البحث. على مدى السنين ظهرت نسخ جديدة ومختلفة
                            من نص لوريم إيبسوم، أحياناً عن طريق الصدفة، وأحياناً
                            عن عمد كإدخال بعض العبارات الفكاهية إليها.<br /><br />
                            هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء
                            لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي
                            للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك
                            يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ
                            طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد
                            محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي
                            الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي
                            وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل
                            إفتراضي كنموذج عن النص، وإذا قمت بإدخال "lorem ipsum"
                            في أي محرك بحث ستظهر العديد من المواقع الحديثة العهد
                            في نتائج البحث. على مدى السنين ظهرت نسخ جديدة ومختلفة
                            من نص لوريم إيبسوم، أحياناً عن طريق الصدفة، وأحياناً
                            عن عمد كإدخال بعض العبارات الفكاهية إليها.
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-light"
                              data-dismiss="modal"
                            >
                              إغلاق
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <vue-recaptcha
                      @verify="onVerify"
                      size="invisible"
                      ref="Recaptcha"
                      @expired="onExpired"
                      :sitekey="sitekey"
                    >
                    </vue-recaptcha>
                    <input
                      type="submit"
                      value="تسجيل"
                      :disabled="isDisableButton"
                      class=" register_button btn btn-md btn-rounded   rounded-sm  text-white p-2 font-size-14px "
                    />
                  </div>
                </form>
              </ValidationObserver>
              <p class="btn custom-shadow font-size-12px mb-3">
                هل تملك حساباً مسبقاً؟
                <a
                  v-b-modal.login
                  class="new_register rounded-sm font-weight-bold text-color-secondary"
                >تسجيل الدخول</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!----->

    <b-modal id="modal-email-register" cancel-title="موافق">
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="">
            <div class="login">
              <div class="login-form bg-white">
                <form class=" font-size-13px">
                  <div class="mx-4 d-flex justify-content-center">
                    <img src="@/assets/images/registration/email-check.svg" width="150" />
                  </div>

                  <div class="text-center title mx-4">
                    <label
                      class="font-size-16px d-block font-weight-bold mb-2 color-black"
                    >التحقق عن طريق البريد الالكتروني</label
                    >
                  </div>

                  <div
                    class="text-center title-details mx-4"
                    v-show="successTries"
                  >
                    <label class="font-size-13px d-block succes mb-0"
                    >لقد تم ارسال رسالة تحقق الى بريدك الالكتروني</label
                    >
                    <label class="font-size-13px d-block succes mb-0"
                    >ذو العنوان<span id="content_email" class="mx-2">
                      {{form.email}}</span
                    ></label
                    >
                    <label class="font-size-13px d-block succes"
                    >هذه الرسالة تحوي على رابط لاكمال التسجيل</label
                    >
                  </div>

                  <div
                    class="text-center title-details mx-4 failTries"
                    v-show="failTries"
                  >
                    <label class="font-size-13px d-block times-up mb-0"
                    >لقد تم ارسال رسالة تحقق الى بريدك الالكتروني</label
                    >
                    <label class="font-size-13px d-block times-up mb-0">
                      ذو العنوان مسبقا {{form.email}}</label
                    >
                    <label class="font-size-13px d-block times-up"
                    >حاول التسجيل بعد 8 ساعات أو قم بتغيير البريد
                      الالكتروني</label
                    >
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
            @click="$bvModal.hide('modal-email-register')"
          >موافق
          </b-button>
        </div>
      </template>
    </b-modal>
    <!---modal phon component-->
    <mx-modal-phone
      ref="confirmModalPhone1"
      @call-parent="callApiRegister"
      method="confirmPhoneRegister"
      action="R"
      :phone="form.phone"
    ></mx-modal-phone>
  </section>

</template>
<script src="./register.js"></script>
<style   lang="scss">
@import "~@/assets/scss/register-body.scss";
</style>

