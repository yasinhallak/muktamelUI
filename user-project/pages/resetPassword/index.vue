<template>
  <section class="reset-password">
    <div class="container">
      <div class="row justify-content-center align-items-center login-body">

        <div class="">
          <div class="login">
            <div class="login-form bg-white custom-shadow">
              <ValidationObserver v-slot="{ handleSubmit }">
                <form class=" font-size-13px" @submit.prevent="handleSubmit(callApiResetPassword)">
                  <div class="mx-4 d-flex justify-content-center">
                    <img src="@/assets/images/registration/password-reset.svg" />
                  </div>

                  <div class="text-center title mx-4">
                    <label class="font-size-16px">اعادة تعين كلمة المرور</label>
                  </div>

                  <div class="text-center title mx-4 wrong-info">
                    <label class="font-size-12px">ادخل كلمة المرور الجديدة مع التأكيد</label>
                  </div>
                  <div class="form-group mb-2 mx-auto mt-3">
                    <div class="input-group">
                      <ValidationProvider name="password" rules="required|verify_password|min:8" vid="confirmPassword"
                                          v-slot="{errors}">
                        <input :type="fieldType1" autocomplete="false" id="password" name="password"
                               class="font-size-12px rounded-sm form-control position-relative"
                               placeholder="كلمة المرور الجديدة" v-model="password">
                        <span class="input-group-prepend mr-0 show-pass" @click="togglePassword1"><i
                          class="text-color-secondary font-size-14px font-weight-bold"
                          :class="fieldType1==='text'?'mx-icon-eye':'mx-icon-eye-slash'" aria-hidden="true"></i></span>
                        <div class="validation-message">
                          <span>{{errors[0]}}</span>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="form-group mb-4 pb-2 mx-auto">
                    <div>
                      <div class="input-group">
                        <ValidationProvider name="confirmpassword" rules="required|confirmed:confirmPassword"  v-slot="{errors}">
                          <input :type="fieldType2" autocomplete="false" id="password_confirm" name="password_confirm"
                                 class="font-size-12px rounded-sm form-control position-relative"
                                 placeholder="تأكيد كلمة المرور الجديدة" v-model="confirmPassword">
                          <span class="input-group-prepend mr-0 show-pass" @click="togglePassword2"><i
                            class="text-color-secondary font-size-14px font-weight-bold"
                            :class="fieldType2==='text'?'mx-icon-eye':'mx-icon-eye-slash'" aria-hidden="true"></i></span>
                          <div class="validation-message">
                            <span>{{errors[0]}}</span>
                          </div>
                        </ValidationProvider>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="p-4 bt_sign_up p-0 font-size-12px w-100 h-100" id="regist" name="regist">
                      <button type="submit" :disabled="!password || !confirmPassword" id="submit_password"
                              class="signIn text-center btn btn-md rounded-sm text-white p-2 font-size-14px d-flex justify-content-center mx-auto">
                        <span>حفظ</span>
                      </button>
                    </div>
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

</template>
<script src="./resetPassword.js"></script>
<style  scoped lang="scss">
@import "~assets/scss/password-check-4-body.scss";
</style>

