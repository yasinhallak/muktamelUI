<template>
  <b-modal :id="method" hide-footer @hide="StopInterval()">

    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class>
          <div class="login">
            <div class="login-form bg-white">
              <form class="font-size-13px">
                <div class="mx-4 mt-2 mb-1 d-flex justify-content-center">
                  <img src="@/assets/images/registration/phone-check.svg" width="150" />
                </div>
                <div class="text-center title mx-4">
                  <label class="font-size-16px d-block font-weight-bold">التحقق عن طريق الجوال</label>
                </div>
                <div v-if="successTries">
                  <div
                    class="form-group mt-2 mb-2 mx-auto d-flex justify-content-center w-50 ConfirmSms"
                  >
                    <div class="input_cont w-auto d-flex" style="direction:ltr;">
                      <input
                        type="text"

                        class="rounded-sm form-control text-center font-weight-bold sms_input email__input mt-0 validation-number digitOnly"
                        maxlength="1"
                        tabindex="1"
                        v-model="code.num1"
                        @keyup="tabIndex($event)"
                        @keydown="DigitOnly($event)"
                      />
                      <input
                        type="text"

                        class="rounded-sm form-control text-center font-weight-bold sms_input email__input mt-0 validation-number digitOnly"
                        maxlength="1"
                        tabindex="2"
                        v-model="code.num2"
                        @keyup="tabIndex($event)"
                        @keydown="DigitOnly($event)"
                      />
                      <input
                        type="text"

                        class="rounded-sm form-control text-center font-weight-bold sms_input email__input mt-0 validation-number digitOnly"
                        maxlength="1"
                        tabindex="3"
                        v-model="code.num3"
                        @keyup="tabIndex($event)"
                        @keydown="DigitOnly($event)"
                      />
                      <input
                        type="text"

                        class="rounded-sm form-control text-center font-weight-bold sms_input email__input mt-0 validation-number digitOnly"
                        maxlength="1"
                        tabindex="4"
                        v-model="code.num4"
                        @keydown="DigitOnly($event)"
                      />
                    </div>
                  </div>
                  <div class="wrong-info">
                    <div class="text-center title mx-4" v-if="wrongInfo">
                      <label class="font-size-14px d-block">الرمز المدخل غير صحيح</label>
                    </div>
                  </div>
                  <div
                    class="text-center title-details py-2 px-3 mx-2 d-flex justify-content-between align-items-center"
                  >
                    <div id="confirm_code" v-if="confirmCode">
                      <span
                        class="font-size-13px mt-2 d-block"
                      >يرجى ادخال رمز التحقق المكون من 4 أرقام</span>
                      <span class="font-size-13px mt-2">
                        المرسل لجوالك رقم
                        <span class="number">{{ phone }}</span>
                      </span>
                    </div>

                    <div id="RegisterTries" v-if="RegisterTries">
                      <span
                        class="font-size-13px mt-2 d-block times-up"
                      >لقد استفذت محاولات التسجيل , يرجى استخدام</span>
                      <span
                        class="font-size-14px mt-2 times-up"
                      >رقم اخر أو اعادةالتسجيل بعد مرور 2 ساعة</span>
                    </div>

                    <div id="RegisterTimes" v-if="RegisterTimes">
                      <span
                        class="font-size-13px mt-2 d-block times-up"
                      >استنفذت الوقت المخصص للعملية</span>
                      <span
                        class="font-size-13px mt-2 times-up"
                      >الرجاء الضغط على إعادة إرسال رمز التحقق</span>
                    </div>

                    <div class="vl"></div>
                    <div id="timer">
                      <div class="base-timer">
                        <svg
                          class="base-timer__svg"
                          viewBox="0 0 100 100"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g class="base-timer__circle">
                            <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
                            <path
                              id="base-timer-path-remaining"
                              stroke-dasharray="283"
                              class="base-timer__path-remaining red"
                              d="
                                                                M 50, 50
                                                                m -45, 0
                                                                a 45,45 0 1,0 90,0
                                                                a 45,45 0 1,0 -90,0
                                                              "
                            />
                          </g>
                        </svg>
                        <span id="base-timer-label" class="base-timer__label">0</span>
                        <span class="min">ثانية</span>
                      </div>
                    </div>
                  </div>
                  <div class="text-center mx-4" id="restart" v-if="restart">
                    <label class="my-1 font-size-12px d-block">
                      اذا لم يصلك الكود خلال 120 ثانية, يمكنك أعادة ارساله أو
                      تغيير الرقم
                    </label>
                  </div>
                </div>
                <div v-if="failTries">
                  <div id="RegisterTries" class="register-tries">
                    <span
                      class="font-size-13px mt-2 d-block times-up"
                    >لقد استفذت محاولات التسجيل , يرجى استخدام</span>
                    <span
                      class="font-size-13px mt-2 times-up"
                    >رقم اخر أو اعادةالتسجيل بعد مرور 2 ساعة</span>
                  </div>
                </div>
                <div class="w-100">
                  <div class="modal-footer p-0">
                    <div
                      class="py-3 bt_sign_up p-0 font-size-12px w-100 h-100 d-flex justify-content-center"
                      id="regist"
                      name="regist"
                    >
                      <div class="w-100 d-flex justify-content-center">
                        <template v-if="!failTries">
                          <button
                            type="button"
                            @click="callApiConfirmSms"
                            class="btn btn-secondary"
                            :disabled="
                            !(
                              code.num1 &&
                              code.num2 &&
                              code.num3 &&
                              code.num4 &&
                              timer != 0
                            )
                          "
                          >
                            <span>تحقق</span>
                          </button>
                          <button
                            type="button"
                            @click="callParent"
                            :disabled="isRestartDisable"
                            class="btn btn-secondary"
                          >
                            <span>اعادةارسال</span>
                          </button>
                        </template>
                        <template v-if="failTries">
                          <button
                            style="width: 90px;border-radius: 0!important;"
                            type="button"
                            @click="$bvModal.hide(`${method}`);"
                            class="btn btn-secondary"
                          >
                            <span>موافق</span>
                          </button>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
/***
 * Created yassin hallak
 * User: yassin hallak
 * Date: 8/8/2020
 * Time: 16:30 PM
 ***/

import {
  ValidationObserver,
  ValidationProvider,
  validate,
} from "vee-validate/dist/vee-validate.full";
class Form {
  constructor() {
    this.num1 = null;
    this.num2 = null;
    this.num3 = null;
    this.num4 = null;
  }
}
export default {
  //name: "modal-phone",
  components: {
    ValidationObserver,
    ValidationProvider,
    validate,
  },
  props: {
    phone: String,
    method: String,
    action: String,
    isConfirmed: false,
  },
  data() {
    return {
      timerInterval: null,
      timer: null,
      isRestartDisable: true,
      confirmCode: true, // message content
      RegisterTries: false, //messge content
      RegisterTimes: false, //messge content
      wrongInfo: false, //messge content
      restart: true, // message content
      code: new Form(),
      successTries: true,
      failTries: false,
    };
  },
  methods: {
    // cal api confirm sms
    callApiConfirmSms() {
      let payload = {
        Phone: this.phone,
        Code: `${this.code.num1}${this.code.num2}${this.code.num3}${this.code.num4}`,
      };
      this.$axios.post(`/identity/${this.method}`, payload).then((response) => {
        // correct code
        let result = response.data;


        if (result.token !== null) {
          this.$bvModal.hide(`${this.method}`);
          this.$bvModal.hide("forgetPassword");
          this.StopInterval(this.timerInterval);
          if (this.action === "R") {
            //  in case register
            this.$router.push(
              `/?token=${result.token}&userId=${result.userId}&method=p`
            );
            return;
          }
          if (this.action === "F") {
            // in case forget Password
            this.$router.push(
              `/resetPassword?token=${result.token}&userId=${result.userId}`
            );
            return;
          }
          if (this.action === "P") {
            this.$bvToast.toast("تمت عملية تغير  رقم الجوال بنجاح", {
              variant: "success",
              autoHideDelay: 3000,
              solid: true,
            });
            return;
          }
        }
        // wrong sms code and has more tries
        if (result.confirmSmsCount <= 3) {

          this.wrongInfo = true;
          this.isRestartDisable = true;
          // reset form
          this.code = new Form();
          this.UpdateModale(result.confirmSmsCount);
          return;
        }
        // wrong sms code and does not have more tries
        this.UpdateModale(result.confirmSmsCount);
      });
    },

    UpdateModale(countTries, timeLeft = null) {
     // console.log("updateModale",countTries)
      if (timeLeft !== null) {
        // in case of user gets all his tries
        if (timeLeft === 0 && countTries === 3) {
          this.timer = timeLeft;
          this.StopInterval(this.timerInterval);
          this.isRestartDisable = true;
          this.RegisterTries = true;
          this.confirmCode = false;
          this.RegisterTimes = false;
          return;
        }
        // user has more tries
        if (timeLeft === 0 && countTries < 3) {

          this.timer = timeLeft;
          this.StopInterval(this.timerInterval);
          this.isRestartDisable = false;
          this.RegisterTries = false;
          this.confirmCode = false;
          this.RegisterTimes = true;
          return;
        }
        if (timeLeft !== 0 && countTries <= 3) {
          this.timer = timeLeft;

          this.isRestartDisable = true;
          this.RegisterTries = false;
          this.confirmCode = true;
          this.RegisterTimes = false;
          return;
        }
        return;
      }
      if (countTries === 3) {
        this.StopInterval(this.timerInterval);
        this.wrongInfo = false;
        this.restart = false;
        this.isRestartDisable = true;
        this.RegisterTries = true;
        this.confirmCode = false;
        this.RegisterTimes = false;
        this.successTries = false;
        this.failTries = true;
        return;
      }
    },
    // Timer
    StartTimer(time_limit, countTries) {
     // console.log("StartTimer",time_limit)
      let timePassed = 0;
      let timeLeft = time_limit;
      this.timerInterval = setInterval(() => {
        timePassed += 1;
        timeLeft = time_limit - timePassed;
       // console.log("timeLeft",timeLeft)
        document.getElementById("base-timer-label").innerHTML = timeLeft;
        this.setCircleDasharray(timeLeft, time_limit);
        this.UpdateModale(countTries, timeLeft);
      }, 1000);
    },
    // helper method for timer
    calculateTimeFraction(timeLeft, TIME_LIMIT) {
      const rawTimeFraction = timeLeft / TIME_LIMIT;
      return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    },

    setCircleDasharray(timeLeft, TIME_LIMIT) {
      const FULL_DASH_ARRAY = 283;
      const circleDasharray = `${(
        this.calculateTimeFraction(timeLeft, TIME_LIMIT) * FULL_DASH_ARRAY
      ).toFixed(0)} 283`;
      document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
    },
    // Clear Interval
    StopInterval() {
      clearInterval(this.timerInterval);
      if (this.failTries) {

        this.successTries = true;
        this.failTries = false;
      }
    },
    // tabIndex
    tabIndex($event) {
      this.wrongInfo = false;
      if ($event.target.value != "") {
        $event.target.nextElementSibling.focus();
        // $event.target.parentElement.nextElementSibling.firstChild.focus();
      }
    },
    // phone digit only
    DigitOnly(e) {

      var numbers = "0123456789";
      var Backspace = "Backspace";
      var Delete = "Delete";
      if (
        (numbers.indexOf(e.key) === -1 &&
          e.which != 46 &&
          e.which != 8 &&
          e.which != 46) ||
        e.target.value.length > 9
      ) {
        e.preventDefault();
      }
    },
    // callParent
    callParent() {
      this.wrongInfo = false;
      this.$emit("call-parent");
    },
  },

  mounted() {},
};
</script>

<style scoped>
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
  stroke-width: 10px;
  stroke: grey;
}
.base-timer__path-remaining {
  stroke-width: 10px;
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

<style lang="scss">
#confirmPhoneForgetPassword,
#confirmChangePhone {
  .modal-header button {
    right: -1px;
    top: -1px;
    position: absolute;
    background: red;
    padding: 0;
    margin: 0;
    width: 27px;
    min-width: 27px;
    height: 27px;
    opacity: 1;
    color: #fff;
    font-size: 25px;
    z-index: 1;
    cursor: pointer;
    border: 0;
    line-height: 26px;
    font-weight: bold;
  }
  .modal-body {
    background: #fff;
    //box-shadow: 0 -0.2rem 1rem 0.4rem rgba(0, 0, 0, 0.2);
    border-radius: 0;
    padding: 0;
  }
  .modal-dialog {
    height: 100%;
    padding: 0;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30.938rem;
  }
  .login {
    padding: 10px 45px;
  }
  .title {
    label {
      color: #001324;
    }
  }
  span.validation-number {
    margin: 0 4px;
    width: 45px;
    input {
      background: #f0f5f7;
      border: 1px solid #cacaca !important;
      font-size: 18px;
      &:focus {
        outline: none;
        box-shadow: none;
      }
    }
    span {
      height: 2rem;
      display: block;
    }
  }
  .title-details {
    background: #f0f5f7;
    border-radius: 5px;
  }
  #RegisterTimes,
  #confirm_code {
    padding-left: 18px !important;
    border-left: 1px solid #d8d8d8 !important;
    margin-left: 18px !important;
    padding: 10px 0;
    .number {
      color: #0089fe;
    }
  }

  .base-timer {
    position: relative;
    width: 70px;
    height: 70px;
    #base-timer-label {
      right: -5px;
    }
  }
  .min {
    font-size: 12px;
    top: -2.3rem;
  }
  #restart {
    label {
      color: #7095b2;
    }
  }
  .modal-footer {
    border: none;
  }
  button[disabled] {
    background: #f0f5f7 !important;
    color: #85929f !important;
  }
  button {
    background: #0089fe;
    font-family: inherit;
    box-shadow: none;
    border-radius: 0;
    margin: 0 10px;
    min-width: 140px;
  }
  .modal-header {
    border-bottom: 1px solid transparent !important;
    padding: 0;
  }
  button.close {
    right: 0;
    position: absolute;
    background: red;
    padding: 0;
    margin: 0;
    width: 27px;
    min-width: 27px;
    height: 27px;
    opacity: 1;
    color: #fff;
    font-size: 25px;
    z-index: 1;
    cursor: pointer;
  }
  .register-tries {
    text-align: center;
    background-color: #f0f5f7;
    color: red;
    padding: 20px 30px;
    margin: 20px 0;
  }
}

#RegisterTimes,
#RegisterTries {
  span {
    color: red !important;
  }
}
</style>
