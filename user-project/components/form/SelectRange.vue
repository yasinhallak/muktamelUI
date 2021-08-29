<template>
  <div class="select-range" :id="'cont-'+refName">
    <button :id="refName" class="input-group" :ref="refName">
      <div class="form-control text-truncate">
        <span class="placeholder">{{ rangeFrom || rangeTo ? subTitle : title }}</span>
        <span
          class="text-blue"
          v-if="rangeFrom"
        >{{rangeFrom}}</span>
        <span class="text-blue" v-if="rangeTo">
          <i v-if="rangeFrom">-</i>
          {{rangeTo}}
        </span>
      </div>
    </button>
    <b-popover :target="refName"
               placement="bottomleft"
               boundary-padding="0"
               custom-class="popup-force-bottom"
               :container="'cont-'+refName"
               :offset="popOffset"
               triggers="click blur">
      <div class="select-range-dropdown-menu" tabindex="0" >
      <div class="filter-dropdown-menu-inner">
        <div class="filter-section">
          <div class="search-type">
            <div class="d-flex text-center search-type-content">
              <div class="col-6 p-1">
                <h3 class="text-blue font-weight-bold text-center mb-1">{{fromTitle}}</h3>
                <b-form-input
                  class="mb-2 text-center"
                  :placeholder="rangeFromTitle"
                  v-model="rangeFrom"
                ></b-form-input>
                <div class="search-type-content-column">
                  <div class="search-type-item font-weight-bold" v-if="rangeFromTitle">
                    <input
                      :id="'default-from'+variable"
                      :value="null"
                      class="d-none"
                      type="radio"
                      v-model="rangeFrom"
                      :checked="rangeFrom == null"
                      @change="$emit('update:rangeFromSelected', rangeFrom)"
                    />
                    <label :for="'default-from'+variable">{{rangeFromTitle}}</label>
                  </div>
                  <div :key="'qq'+i" class="search-type-item" v-for="(item,i) in list">
                    <input
                      :id="'qq'+item"
                      :value="item"
                      class="d-none"
                      type="radio"
                      v-model="rangeFrom"
                      @change="$emit('update:rangeFromSelected', rangeFrom)"
                    />
                    <label class="direction-rtl" :for="'qq'+item">
                      <span class="currency-amount">{{item | toComma}}</span>
                      <span v-if="hasExt">{{hasExt}}</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="col-6 p-1">
                <h3 class="text-blue font-weight-bold text-center mb-1">{{toTitle}}</h3>
                <b-form-input class="mb-2 text-center" :placeholder="rangeToTitle" v-model="rangeTo"></b-form-input>
                <div class="search-type-content-column">
                  <div class="search-type-item font-weight-bold" v-if="rangeToTitle">
                    <input
                      :id="'default-to' +variable+1"
                      :value="null"
                      class="d-none"
                      type="radio"
                      v-model="rangeTo"
                      :checked="rangeTo == null"
                      @change="$emit('update:rangeToSelected', rangeTo)"
                    />
                    <label :for="'default-to' +variable+1">{{rangeToTitle}}</label>
                  </div>
                  <div :key="'qqq'+i" class="search-type-item" v-for="(item,i) in list">
                    <input
                      :disabled="item < rangeFrom"
                      :id="'qqq'+item"
                      :value="item"
                      class="d-none"
                      type="radio"
                      v-model="rangeTo"
                      :checked="item < rangeFrom"
                      @change="$emit('update:rangeToSelected', rangeTo)"
                    />
                    <label :for="'qqq'+item">
                      <span class="currency-amount">{{ item | toComma }}</span>
                      <span class="d-inline " v-if="hasExt">
                        {{hasExt}}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="filter-footer row align-items-center">
            <div class="col">
              <b-btn class="btn-filter btn-reset" @click="resetFields">إعادة تعيين</b-btn>
            </div>
            <div class="col ml-auto text-right">
              <b-btn class="btn-filter btn-apply" @click="onCloseModal">تطبيق</b-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
    </b-popover>
  </div>
</template>

<script>
/***
 * Created Subhi Al Wattar
 * User: Subhi Al Wattar
 * Date: 8/8/2020
 * Time: 1:02 PM
 ***/
export default {
  name: "select-range",
  props: {
    list: {
      type: Array,
    },
    popOffset: {
      type: Number,
      default: -110,
    },
    title: {
      type: String,
    },
    subTitle: {
      type: String,
    },
    hasExt: {
      type: String,
    },
    fromTitle: {
      type: String,
      default: "من",
    },
    toTitle: {
      type: String,
      default: "إلى",
    },
    rangeFromTitle: {
      type: String,
    },
    rangeToTitle: {
      type: String,
    },
    rangeFromSelected: {
      type: Number,
    },
    rangeToSelected: {
      type: Number,
      default: null,
    },
    refName: {
      type: String,
      default: null,
    },
    variable: String,
  },
  data() {
    return {
      openList3: false,
      rangeFrom: null,
      rangeTo: null,
    };
  },
  watch: {
    rangeFromSelected: function () {
      if (this.rangeTo < this.rangeFrom) this.rangeTo = null;
      this.rangeFrom = this.rangeFromSelected;
    },
    rangeToSelected: function () {
      this.rangeTo = this.rangeToSelected;
    },
  },
  methods: {

    onCloseModal() {
      this.$root.$emit('bv::hide::popover', this.refName)
    },
    resetFields() {
      this.rangeFrom = this.rangeTo = null;
      this.$emit("update:rangeFromSelected", this.rangeFrom);
      this.$emit("update:rangeToSelected", this.rangeTo);
    },
  },
  events: {
    close22: function () {
      this.openList3 = false;
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/n-scss/components/_select-range.scss";
@media (min-width: 990px) and (max-height: 875px) {
  .select-range{
    .popup-force-bottom{
      transform: translate3d(73px, 60px, 0px) !important;
    }
  }


}
</style>
