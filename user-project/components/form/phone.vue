<template>
  <div class="telephone-component form-group mb-0" style="width:100% !important;">
    <ValidationProvider tag="div" name="telephone" rules="verify_phone" v-slot="{ errors }">
      <div class="position-relative">
        <input
          type="tel"
          name="telephones"
          maxlength="9"
          :placeholder="placeholder"
          :disabled="disabled"
          v-model="inputValue"
          class="telephone-form rounded-sm telephones text-1"
          @keypress="DigitOnly"
          @input="StratWith5($event);$emit('input', inputValue);dataError=false;$emit('data-error', dataError);"
        />
        <div class="selected-flag">
          <div class="selected-dial-code">+966</div>
          <div class="flag-phone">
            <img src="~@/assets/images/flag_of_ar.png" alt width="20px" />
          </div>
        </div>
      </div>
      <div class="validation-message">
        <span>{{ errors[0] }}</span>
        <span v-if="dataError">
          {{messageError}}
          <a v-if="link"
            v-b-modal.forgetPassword
          >أضغط هنا</a>
        </span>
      </div>
    </ValidationProvider>
  </div>
</template>
<script>
/***
 * Created yassin hallak
 * User: yassin hallak
 * Date: 8/4/2020
 * Time: 2:00 PM
 ***/
import {
  ValidationObserver,
  ValidationProvider,
  validate,
  extend,
} from "vee-validate/dist/vee-validate.full";
extend("verify_phone", {
  validate: (value) => {
    return RegExp(`^[5][0-9]{8}`).test(value);
  },
});
export default {
  name: "phone",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    placeholder: String,
    disabled: Boolean,
    value: String,
    dataError: false,
    messageError:String,
    link: {
      default: false,
      type: Boolean,
    }
  },
  data() {
    return {
      inputValue: null,
    };
  },
  methods: {
    // phone digit only
    DigitOnly(e) {
      var numbers = "0123456789";
      if (numbers.indexOf(e.key) === -1) {
        e.preventDefault();
        
      }
    },
    // phone start with
    StratWith5(e) {
      if (!RegExp(`^[5]`).test(e.target.value)) {
        this.inputValue = "";
      }
    },
  },
  mounted() {},
  watch: {
    value: function (newValue, oldValue) {
      this.inputValue = newValue;
    },
  },
};
</script>

<style scoped lang="scss">
.telephone-form {
  padding-left: 82px !important;
  max-height: 2.2rem;
  min-height: 2.2rem;
  direction: ltr !important;
}
.selected-flag {
  position: absolute;
  left: 0;
  right: auto;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 6px 7px;
  display: flex;
  align-items: center;
}
.flag-phone {
  align-items: center;
  display: flex;
}
.selected-dial-code {
  direction: ltr;
  font-weight: bold;
  font-size: 13px;
  padding-inline-end: 5px;
  line-height: 2.2rem;
}
input{
  width:100%;
  border:1px solid rgb(170, 170, 170);
  &::placeholder{
      text-align: left;
   }
}
</style>
