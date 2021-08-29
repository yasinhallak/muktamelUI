<template>
  <li class="dropdown__Props __Type" id="multiSelectContainer">
    <button ref="multiSelectButton" id="multiSelectButton" class="Prop__Type w-100 p-0">
      <div class="input-group" >
        <div id="Prop__Type" class="form-control bg-white text-truncate">
          <span
            class="mx-1 item-separator"
            v-for="p in selectedInner"
            :key="p"
          >{{list.find(o => o.value == p).label}}</span>
          <span v-if="selectedInner.length <= 0">{{label}}</span>
        </div>
        <div class="input-group-append arrow-down">
          <span class="input-group-text" id="arrow-Prop_Type">
            <i class="mx-icon-chevron-down-light font-weight-bold font-size-10px"></i>
          </span>
        </div>
      </div>
    </button>
    <b-popover target="multiSelectButton"
               placement="bottomleft"
               offset="10"
               container="multiSelectContainer"
               triggers="click blur"
    >
      <ul class="dropdown__Menu__Props pt-3">
        <div class="container-fluid">
          <div class="d-flex">
            <div class="w-100 For__Live">
              <div>
                <label
                  :for="'dd-'+i"
                  class="btn w-100 mb-1 font-size-14px"
                  :class="{'Active__Prop__Type': isChecked(item.value) }"
                  v-for="(item,i) in list"
                  :key="item.value"
                >
                  {{item.label}}
                  <input
                    type="checkbox"
                    :id="'dd-'+i"
                    :value="item.value"
                    class="d-none"
                    v-model="selectedInner"
                    @change="$emit('update:listSelected', selectedInner)"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <hr class="my-2" />
        <div v-if="checkLabel" class="custom-control custom-checkbox">
          <input
            type="checkbox"
            class="custom-control-input"
            id="customCheck1"
            v-model="checkV"
            @change="$emit('update:checkValue', checkV)"
          />
          <label class="custom-control-label font-size-12px" for="customCheck1">{{checkLabel}}</label>
        </div>

        <hr class="my-2" />

        <div class="d-flex justify-content-between align-items-center px-1 w-100">
          <button type="button" class="btn btn-filter btn-reset my-1 px-2" @click="clear">إعادة تعيين</button>
          <button
            type="button"
            @click="callParent"
            class="btn btn-done my-1 font-size-12px px-2"
          >تطبيق</button>
        </div>
      </ul>
    </b-popover>


  </li>
</template>

<script>
/***
 * Created Subhi Al Wattar
 * User: Subhi Al Wattar
 * Date: 7/24/2020
 * Time: 3:57 PM
 ***/
export default {
  name: "multi-select",
  props: {
    label: String,
    checkLabel: {
      default: null,
      type: String,
    },
    checkValue: {
      default: false,
      type: Boolean,
    },
    list: Array,
    listSelected: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      checkV: this.checkValue,
      selectedInner: [],
    };
  },
  computed: {
    selectedOptions: function () {
      return this.options.filter((o) => o.isSelected);
    },
  },
  methods: {
    async callParent(){
      this.toggleView = !this.toggleView
      this.$emit("data-changed", {checkValue: this.checkValue, listSelected: this.listSelected});
    },
    isChecked(value) {
      return this.selectedInner.includes(value);
    },
    clear() {
      this.checkV = false;
      this.selectedInner = [];
      this.$emit("update:listSelected", this.selectedInner);
      this.$emit('update:checkValue', this.checkV);
    },
  },
  watch: {
    listSelected: function () {
      this.selectedInner = this.listSelected;
    },
    checkValue: function () {
      this.checkV = this.checkValue;
    },
  },
  mounted() {},
};
</script>

<style  lang="scss">
@import "~@/assets/n-scss/components/_multi-select.scss";


</style>
