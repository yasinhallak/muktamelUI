<template>
  <section class="n-header m-header py-2">
    <nav v-if="($mq !== 'mobile' && $mq !== 'ipad')" class="top-nav not-display-mobile">
      <ul class="d-flex align-items-center">
        <li class="need-help">
          <nuxt-link to="/help">
            <i class="mx-icon-question-circle-light"></i>
            <span>
                تحتاج إلى مساعدة؟
            </span>
          </nuxt-link>
        </li>
        <li class="mr-auto register-company-item">
          <nuxt-link to="/agencies-request"><span>تسجيل الشركات</span></nuxt-link>
        </li>
        <!--        <li>-->
        <!--          <img-->
        <!--            :src="$i18n.locale === 'ar' ?-->
        <!--          require('@/assets/images/flag_of_ar.png') :-->
        <!--          require('@/assets/images/flag_of_en.png')"-->
        <!--            class="mx-flag"-->
        <!--            alt-->
        <!--          />-->
        <!--        </li>-->
        <!--        <li class="px-1">-->
        <!--          <v-select-->
        <!--            class="mx-language-switch"-->
        <!--            :clearable="false"-->
        <!--            dir="ltr"-->
        <!--            :options="$i18n.locales"-->
        <!--            value="code"-->
        <!--            v-model="currentLanguage"-->
        <!--            @input="$i18n.setLocale(currentLanguage.code)"-->
        <!--          >-->
        <!--            <template #selected-option="option">-->
        <!--              <div style="display: flex; align-items: baseline;">-->
        <!--                <strong>{{ option.code == 'ar' ? 'العربية' : 'English' }}</strong>-->
        <!--              </div>-->
        <!--            </template>-->
        <!--            <template v-slot:option="option">-->
        <!--              <span :class="option.code"></span>-->
        <!--              {{ option.code == 'ar' ? 'العربية' : 'English' }}-->
        <!--            </template>-->
        <!--          </v-select>-->
        <!--        </li>-->
      </ul>
    </nav>
    <!--    <img :src="$route.path === '/mockup-blog' ? require('@/assets/img/blog-logo.png') : require('@/assets/img/logo.png') ">-->
    <div class="separator d-flex align-items-center">
      <div
        :class="{'d-none' : ($mq === 'mobile' || $mq === 'ipad')}"
        class="burger-menu d-block"
        @click="active=! active"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h1 class="logo mx-auto">
        <nuxt-link to="/">
          <img alt class="w-100" src="@/static/logo.svg" />
        </nuxt-link>
      </h1>
      <div :class="{'d-none' : ($mq !== 'mobile' && $mq !== 'ipad')}"  class="login-section mr-auto">
        <b-button
          v-if="!$auth.loggedIn"
          v-b-modal.login
          class="btn-login"
          variant="outline-primary"
        >الدخول</b-button>

        <div v-if="$auth.loggedIn" class="user-box text-center" @click="open=
        !open">
          <div class="user-logo">
            <img
              :src="$auth.user.profile.logo?
                baseUrl + $auth.user.profile.logo + '.jpg':
                require('@/assets/images/svg/user.svg')"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <nav :class="{active:active}" class="main-nav">
      <div v-if="($mq === 'mobile' || $mq === 'ipad')" class="close-menu" @click="active= !active">
        <i class="mx-icon-times"></i>
      </div>
      <div v-if="($mq === 'mobile' || $mq === 'ipad')" class="mobile-nav-logo text-center p-4">
        <a href>
          <img alt src="@/static/logo.svg" />
        </a>
      </div>
      <ul class="d-flex position-relative main-nav-ul">
        <!--        //@click="mortgage"-->
        <div class="grid-item-1">
        <li
          v-for="(navItem,i) in menu"
            v-if="i <= 3"
          :key="i"
            v-b-toggle="($mq === 'mobile' || $mq === 'ipad') ? 'menu-toggle-'+navItem.id : null"
          class="main-nav-item"
          @mouseenter="onMenuEnter"
          @mouseleave="onMenuLeave">
            <span>{{ navItem.name }}</span>
            <b-collapse :id="'menu-toggle-'+navItem.id" class="sub-menu">
              <div class="menu-overlay-border"></div>
              <div class="sub-nav-group" v-for="(subNav,ii) in navItem.children" :key="ii">
                <div class="sub-nav-container">
                  <h2 class="sub-nav-header">{{ subNav.name }}</h2>
                  <ul class="sub-nav-list">
                    <li class="sub-nav-item" v-for="(item,iii) in subNav.children" :key="iii">
                      <a :href="item.path" v-if="item.id == 13 || item.id==14" >{{ item.name }}</a>
                      <a v-if="item.methodName" @click.prevent="callMethod(item.methodName)" >{{ item.name }}</a>
                      <nuxt-link v-else :to="item.path">{{ item.name }}</nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>
            </b-collapse>
        </li>
        </div>
        <div class="grid-item-2"></div>
        <div class="grid-item-3">
          <li class="main-nav-item">
            <nuxt-link to="/decor"><span>الديكور</span></nuxt-link>
        </li>

        <li class="main-nav-item">
            <nuxt-link to="/plans/calcWizard"><span>الحاسبة الهندسية </span></nuxt-link>
        </li>

        <li class="main-nav-item" disabled>
            <a href="#"><span>المنتديات</span></a>
        </li>

        <!-- Start User Login -->
        <div v-if="$auth.loggedIn" class="user-img">
          <b-dropdown ref="menuDrop" :class="{open:open}">
              <div v-if="($mq === 'mobile' || $mq === 'ipad')" class="close-menu" @click="open= !open">
              <i class="mx-icon-times"></i>
            </div>
            <template v-slot:button-content>
              <img
                :src="$auth.user.profile.logo?
                baseUrl+ $auth.user.profile.logo + '.jpg':
                require('@/assets/images/svg/user.svg')"
                alt
              />
            </template>
            <div class="text-center dropdown-img">
              <img
                :src="$auth.user.profile.logo?
                baseUrl + $auth.user.profile.logo + '.jpg':
                require('@/assets/images/svg/user.svg')"
                alt
              />
              <span>{{ $auth.user.profile.name }}</span>
              <p>{{ $auth.user.profile.userName }}</p>
            </div>
            <b-dropdown-item @click="navToProfile('/profile/#list-info')">المعلومات الشخصية</b-dropdown-item>
            <b-dropdown-item @click="navToProfile('/profile/#list-password')">تغير كلمة المرور</b-dropdown-item>
            <b-dropdown-item @click="navToProfile('/profile/#list-favorites')">العناصر المفضلة</b-dropdown-item>
            <li v-b-toggle.my-notifications class="my-company-list" @click.prevent>
              <a class="dropdown-item">تنبيهاتي</a>
              <b-collapse id="my-notifications" class="sub-menu has-alert-count">
                <ul>
                  <li
                    v-for="item in $auth.user.searchQueries.slice(0,2)"
                    :key="item.id"
                    class="has-alert-count"
                  >
                    <a
                      :data-count="item.count"
                      @click="createRealEstateObject(item)"
                      href="javascript:;"
                    >{{ item.title }}</a>
                  </li>
                  <li class="goto-link">
                    <b-dropdown-item @click="navToProfile('/profile/#list-notifications')">إظهار جميع التنبيهات</b-dropdown-item>
                  </li>
                </ul>
              </b-collapse>
            </li>
            <li v-b-toggle.my-company class="my-company-list">
              <a class="dropdown-item">شركاتي</a>
              <b-collapse id="my-company" class="sub-menu">
                <ul>
                  <li v-for="item in $auth.user.agencies" :key="item.id">
                    <a
                      :href="'/agency/'+item.id+'/'+default_routes[item.type]"
                    >{{ item.name }}</a>
                  </li>
                </ul>
              </b-collapse>
            </li>
            <b-dropdown-item
              class="logout"
              href="#"
              @click="$auth.logout();open= !open"
            >تسجيل الخروج</b-dropdown-item>
          </b-dropdown>
        </div>
        <!-- End User Login -->

        <li v-if="($mq !== 'mobile' && $mq !== 'ipad') && !$auth.loggedIn" class="main-nav-item">
          <a v-b-modal.login><span>تسجيل الدخول</span></a>
        </li>
        </div>




        <!--        <li class="main-nav-item" v-if="($mq !== 'mobile' && $mq !== 'ipad') && !$auth.loggedIn">-->
        <!--          <nuxt-link to="/register">-->
        <!--            إنشاء حساب-->
        <!--          </nuxt-link>-->
        <!--        </li>-->

        <li v-if="($mq === 'mobile' || $mq === 'ipad')" class="main-nav-item no-drop">
          <nuxt-link to="/agency-request">تسجيل الشركات</nuxt-link>
        </li>
        <li v-if="($mq === 'mobile' || $mq === 'ipad')" class="main-nav-item no-drop">
          <nuxt-link to="/help">تحتاج الى مساعدة؟</nuxt-link>
        </li>
      </ul>
    </nav>
    <div v-if="(active || open) && ($mq === 'mobile' || $mq === 'ipad')"
         class="overlay"
         @click="closeOverlay"
    ></div>
    <!---Modal-Login--->
    <b-modal
      id="login"
      :title="$store.state.LoginTitle"
      :visible="$store.state.LoginModalShown"
      hide-footer
      modal-class="login-modal"
      @hide="hideModalLogin"
    >
      <div class="login-form bg-white">
        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
          <form id="form_login" class="font-size-13px" @submit.prevent="handleSubmit(callApiLogin)">
            <div class="text-center title">
              <h3 class="font-size-18px">تسجيل الدخول</h3>
            </div>
            <ValidationProvider
              v-slot="{errors}"
              class="form-group"
              name="username"
              rules="required"
              tag="div"
            >
              <div class="input-group">
                <input
                  id="username"
                  v-model="username"
                  autocomplete="false"
                  autofocus
                  class="rounded-sm form-control font-size-12px"
                  name="username"
                  onfocus="this.select()"
                  placeholder="اسم المستخدم أو رقم الجوال أو البريد الإلكتروني"
                  type="text"
                  @keyup="dataError=null"
                />
                <div class="validation-message">
                  <span>{{ errors[0] }}</span>
                  <span>{{ dataError }}</span>
                </div>
              </div>
            </ValidationProvider>
            <ValidationProvider
              id="show_hide_password"
              v-slot="{errors}"
              class="form-group m-0"
              name="password"
              rules="required"
              tag="div"
            >
              <div class="input-group position-relative">
                <input
                  id="password"
                  v-model="password"
                  :type="fieldType"
                  autocomplete="false"
                  autofocus
                  class="font-size-12px rounded-sm form-control"
                  name="password"
                  onfocus="this.select()"
                  placeholder="كلمة المرور"
                  @keyup="dataError=null"
                />
                <span
                  class="input-group-prepend show-pass position-absolute"
                  @click.prevent="togglePassword"
                >
                  <i
                    :class="fieldType==='text'?'mx-icon-eye-slash':'mx-icon-eye'"
                    aria-hidden="true"
                    class="font-size-14px font-weight-bold text-color-secondary"
                  ></i>
                </span>
                <div class="validation-message">
                  <span>{{ errors[0] }}</span>
                </div>
              </div>
            </ValidationProvider>
            <div class="form-group remember-me">
              <div class="row">
                <div class="col-6">
                  <div class="form-check d-flex align-items-center">
                    <input id="exampleCheck1" type="checkbox" />
                    <label for="exampleCheck1">تذكرني</label>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-input text-right">
                    <a
                      class="forget-pass"
                      href="#"
                      @click="showHideModalLoginForget"
                    >نسيت كلمة المرور؟</a>
                  </div>
                </div>
              </div>
            </div>
            <vue-recaptcha
              ref="Recaptcha"
              :sitekey="sitekey"
              class="google-captcha"
              onload="vueRecaptchaApiLoaded"
              size="invisible"
              @expired="onExpired"
              @verify="onVerifyLogin"
            ></vue-recaptcha>
            <button
              id="submit_form"
              :disabled="!username || !password"
              class="btn btn-secondary submit-button d-flex align-items-center justify-content-center mb-5"
              type="submit"
            >
              <i class="mx-icon-login mr-2 font-size-18px"></i>
              <span>تسجيل الدخول</span>
            </button>
            <!--                <div class="social-login text-center">-->
            <!--                  <p>أو قم بتسجيل الدخول بواسطة</p>-->
            <!--                  <a href="#!" class="google-plus-color"-->
            <!--                  ><i class="fab fa-google"></i-->
            <!--                  ></a>-->
            <!--                  <a href="#!" class="twitter-color"-->
            <!--                  ><i class="fab fa-twitter"></i-->
            <!--                  ></a>-->
            <!--                  <a href="#!" class="facebook-color"-->
            <!--                  ><i-->
            <!--                    class="fab-->
            <!--                    fa-facebook-f"-->
            <!--                  ></i-->
            <!--                  ></a>-->
            <!--                </div>-->
            <div class="not-registered p-0 font-size-12px">
              <span>غير مسجل ؟</span>
              <!--   class="font-size-12px mx-auto"-->
              <nuxt-link to="/register">إنشاء حساب جديد</nuxt-link>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </b-modal>

    <!---Modal-forgetPassword--->
    <b-modal id="forgetPassword" hide-footer>
      <div class="container">
        <div class="row justify-content-center align-items-center login-body">
          <div class="login">
            <div class="login-form bg-white">
              <ValidationObserver v-slot="{ handleSubmit }">
                <form
                  class="font-size-13px"
                  @keyup="dataErrorForget=false"
                  @submit.prevent="handleSubmit(callApiForgetPassword)"
                >
                  <div class="mx-4 d-flex justify-content-center">
                    <img src="@/assets/images/registration/password-reset.svg" />
                  </div>

                  <div class="text-center title mx-4">
                    <label class="font-size-16px d-block">أستعادة كلمة المرور</label>
                    <span class="font-size-12px mt-2">اختر وسيلة التحقق لاستعادة كلمة المرور</span>
                  </div>
                  <div class="form-group my-3 mx-auto">
                    <div class="sw_out mt-2">
                      <div
                        :class="selectedEmail?'active ':''"
                        class="email_ch"
                        @click="ChangeEmail"
                      >البريد الالكرتوني</div>
                      <div
                        :class="selectedPhone?'active':''"
                        class="mobile_ch"
                        @click="ChangePhone"
                      >رقم الجوال</div>
                    </div>
                    <div class="input_cont">
                      <div v-if="selectedEmail" class="form-group email_ch_input mt-3">
                        <ValidationProvider v-slot="{errors}" name="email" rules="required|email">
                          <input
                            id="email"
                            v-model="email"
                            class="rounded-sm form-control"
                            name="email"
                            placeholder="exm:muktam@hotmail.com"
                            type="text"
                          />
                          <div class="validation-message">
                            <span>{{ errors[0] }}</span>
                            <span v-if="dataErrorForget">هذا البريد الإلكتروني غير مسجل لدينا</span>
                          </div>
                        </ValidationProvider>
                      </div>
                      <div
                        v-if="selectedPhone"
                        class="form-group mobile_ch_input mt-3"
                        style="width:100% !important;"
                      >
                        <mx-form-phone
                          v-model="phone"
                          :dataError="dataErrorForget"
                          messageError="هذا الجوال  غير مسجل لدينا"
                          placeholder="5XXXXXXXX"
                        ></mx-form-phone>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      id="regist"
                      class="bt_sign_up p-4 font-size-12px w-100 h-100"
                      name="regist"
                    >
                      <vue-recaptcha
                        ref="Recaptcha"
                        :sitekey="sitekey"
                        size="invisible"
                        @expired="onExpired"
                        @verify="onVerifyForget"
                      ></vue-recaptcha>
                      <button
                        id="submit_forgetPassword"
                        :disabled="email==null && phone==null"
                        class="signIn text-center btn btn-md rounded-sm text-white font-size-13px d-flex justify-content-center mx-auto"
                        type="submit"
                      >
                        <span class="send-info">ارسال</span>
                      </button>
                    </div>
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
    <!---Modal-modal email --->

    <b-modal id="modal-email-forget" hide-footer>
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="login">
            <div class="login-form bg-white">
              <form class="font-size-13px">
                <div class="mx-4 d-flex justify-content-center">
                  <img src="@/assets/images/registration/password-reset.svg" />
                </div>

                <div class="text-center title mx-4">
                  <label class="font-size-16px d-block font-weight-bold">أستعادة كلمة المرور</label>
                </div>
                <div v-if="successTriesForget" class="text-center content mx-0 mt-4 pb-5">
                  <label class="font-size-13px d-block details">
                    لقد تم ارسال رسالة الى بريدك الشخصي
                    <span class="email">{{ email }}</span>
                  </label>
                  <label
                    class="font-size-13px d-block details"
                  >تحوي على رابط لاعادة ضبط كلمة المرور الخاصة بك</label>
                </div>
                <div v-show="failTriesForget" class="text-center title-details mx-4">
                  <label
                    class="font-size-14px d-block times-up mb-0"
                  >لقد تم ارسال رسالة تحقق الى بريدك الالكتروني</label>
                  <label class="font-size-14px d-block times-up mb-0">ذو العنوان مسبقا {{ email }}</label>
                  <label class="font-size-14px d-block times-up">
                    حاول إستعادة كلمة المرور بعد 3 ساعات أو قم بتغيير البريد
                    الالكتروني
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            class="float-right"
            size="sm"
            variant="primary"
            @click="$bvModal.hide('modal-email-forget')"
          >Close</b-button>
        </div>
      </template>
    </b-modal>
    <!---modal phon component-->
    <mx-modal-phone
      ref="confirmModalPhone2"
      :phone="phone"
      action="F"
      method="confirmPhoneForgetPassword"
      @call-parent="callApiForgetPassword"
    ></mx-modal-phone>
    <!---Modal Confirm Register Modal-->
    <b-modal id="modal-confirm-register" hide-footer @hide="hideShowModalSuccessLogin">
      <div class="login">
        <div class="login-form bg-white custom-shadow">
          <form class="py-4 font-size-13px">
            <div class="mx-4 d-flex justify-content-center">
              <img src="@/assets/images/registration/success.svg" />
            </div>

            <div class="text-center title mx-4 mt-2">
              <label class="font-size-16px">مبروك .. تم اكمال تسجيلك بنجاح</label>
            </div>
            <div class="text-center title mx-4 wrong-info">
              <label class="font-size-13px d-block mt-2">
                يسعدنا انضمامك لنا .. يمكنك الان الاطلاع على وحداتك
                المفضلة
              </label>
              <span class="font-size-13px d-block">أو اضافة وحدات جديدة خاصة بك</span>
            </div>
            <a
              class="my-4 signIn text-center btn btn-md rounded-sm text-white p-2 font-size-14px d-flex justify-content-center mx-auto"
              @click="hideShowModalSuccessLogin"
            >
              <span>تسجيل الدخول</span>
            </a>
          </form>
        </div>
      </div>
    </b-modal>
  </section>
</template>
<script src="./m-header.js"></script>
<style lang="scss" src="./m-header.scss"></style>
<style lang="scss">
@import "@/assets/n-scss/layouts/_header.scss";
@import "@/assets/scss/login-body.scss";
@import "@/assets/scss/password-check-body.scss";
@import "@/assets/scss/password-check-5-body.scss";

body {
  font-family: sans-serif;
  display: grid;
  height: 100vh;
  place-items: center;
}

.base-timer {
  position: relative;
  width: 80px;
  height: 80px;
}

.base-timer__svg {
  transform: scaleX(-1);
}

.base-timer__circle {
  fill: none;
  stroke: none;
}

.base-timer__path-elapsed {
  stroke-width: 7px;
  stroke: grey;
}

.base-timer__path-remaining {
  stroke-width: 7px;
  stroke-linecap: round;
  transform: rotate(90deg);
  transform-origin: center;
  transition: 1s linear all;
  fill-rule: nonzero;
  stroke: currentColor;
}

.base-timer__path-remaining.green {
  color: rgb(65, 184, 131);
}

.base-timer__path-remaining.orange {
  color: orange;
}

.base-timer__path-remaining.red {
  color: red;
}

.base-timer__label {
  position: absolute;
  width: 80px;
  height: 80px;
  top: -12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: red;
}

.min {
  position: relative;
  top: -2.4rem;
  color: red;
}
</style>
