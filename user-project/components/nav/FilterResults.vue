<template>
  <div v-if="list.length>0" ref="filterBox" :class="{'level-one': centered}" class="mt-2">
    <div :class="{'collapsed': !centered && toggleView}" class="filter_box">
      <div class="container">
        <div class="row">
          <div class="col-11 level-one-container p-0 d-flex flex-wrap result-item-container">
            <div
              v-for="(item,index) in list"
              :key="item.id"
              :style="{'width': width+'px '}"
              class="result-item"
            >

              <input
                :id="'item-'+index+item.id"
                v-model="iData"
                class="d-none"
                type="checkbox"
                :value="item.id"
                @change="$emit('input',  multiSelect? iData : item.id );emmitData();"
                :disabled="!item.id"
              />
              <label
                :for="'item-'+index+item.id"
                class="dist d-flex justify-content-between align-items-center px-2 text-truncate">
                <span class="name font-weight-bold font-size-12px text-truncate">{{ item.label }}</span>
                <span class="number">{{ item.value }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="seeMore"
        class="more-less d-flex justify-content-center align-items-center"
        @click="toggleView = !toggleView"
      >
        <i
          :class="toggleView?'mx-icon-chevron-down-light':'mx-icon-chevron-up-light'"
          class="font-size-15px"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
/***
 * Created Subhi Al Wattar
 * User: Subhi Al Wattar
 * Date: 7/23/2020
 * Time: 4:46 PM
 ***/
export default {
  name: "filter-results",
  props: {
    multiSelect: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 150,
    },
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
    value:{
      type: Array,
      default: function () {
        return [];
      },
    },
    centered: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      iData: [],
      toggleView: true,
      boxWidth: 0,
      x:[]
    };
  },

  methods: {

    getBoxWidth(event) {
      this.boxWidth = this.$el.offsetWidth;
    },

    clear(){
      this.iData = [];
      this.value = [];
    },
    emmitData() {
      if (!this.multiSelect) {
        this.$emit("item-clicked",this.iData.length ? this.iData[0] : null );
      } else {
        this.$emit("item-clicked", this.iData );
      }
    }

  },
  computed: {
    seeMore: function () {
      let maxItemsPreLine = Math.floor(( this.boxWidth - 60) / this.width);
      if (this.list.length > ( maxItemsPreLine * 2)) {
        return true;
      }
    },
  },
  created() {

  },
  watch: {
    multiSelect: function (newValue, oldValue) {
      if (newValue) this.iData = [];
    },
    list: function () {
      if (!this.multiSelect) this.iData = [];
    },

    value: function (newValue) {
      if(newValue !== null)
        this.iData = newValue;
      else
        this.iData = [];
    },

    /*iData: {
      deep: true,
      handler: function () {
        //this.$emit("item-clicked", { item: this.iData });
         if (!this.multiSelect) {
             this.$emit("item-clicked",this.iData.length ? this.iData[0] : null );
         } else {
            this.$emit("item-clicked", this.iData );
        }
      }
    },*/
  },
  mounted() {
    this.$nextTick(function () {
      window.addEventListener("resize", this.getBoxWidth);
      //Init
      this.getBoxWidth();
    });
    if(this.value !== null)
      this.iData = this.value;
    else
      this.iData = [];
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getBoxWidth);
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/n-scss/components/filter-results.scss";
</style>
