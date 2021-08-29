<template>
  <div class="select-multi-columns"  :id="'cont-'+refName">
    <button class="input-group " :ref="refName" :id="refName">
      <div class="form-control d-flex text-truncate">
        <span class="placeholder" v-if="!rightSelected.length > 0 && !leftSelected.length > 0">{{ title }}</span>
        <ul class="text-blue d-flex text-truncate">

          <li :key="'r-'+item" class="ml-1" v-for="(item,i) in unionSelectedItem">
            <!-- TODO : i18n -->
            {{getLabel(item,i)}}
          </li>
        </ul>
      </div>
    </button>
    <b-popover :target="refName"
               placement="bottomleft"
               fallback-placement="flip"
               boundary="body"
               custom-class="popup-force-bottom"
               :container="'cont-'+refName"
               boundary-padding="0"
               :offset="popOffset"
               triggers="click "
    >
      <div class="select-multi-dropdown-menu" tabindex="0">
        <div class="filter-dropdown-menu-inner">
          <div class="filter-section">
            <div class="search-type">
              <div class="d-flex text-center search-type-content">
                <div class="col-6 p-0">
                  <h2 class="text-blue font-weight-bold text-center mb-1">{{ rightTitle }}</h2>
                  <div class="search-type-content-column">
                    <div :key="'rightMe-'+i" class="search-type-item" v-for="(item,i) in rightList">
                      <input
                        :id="'rightMenu-'+i"
                        :value="item.value"
                        class="d-none"
                        type="checkbox"
                        v-model="rightSelectedInner"
                        @change="$emit('update:rightSelected', rightSelectedInner)"
                      />
                      <label :for="'rightMenu-'+i">{{ item.label }}</label>
                    </div>
                  </div>
                </div>
                <div class="col-6 p-0">
                  <h2 class="text-blue font-weight-bold text-center mb-1">{{ leftTitle }}</h2>
                  <div class="search-type-content-column">
                    <div :key="'leftMe-'+i" class="search-type-item" v-for="(item,i) in leftList">
                      <input
                        :id="'leftMenu-'+i"
                        :value="item.value"
                        class="d-none"
                        type="checkbox"
                        v-model="leftSelectedInner"
                        @change="$emit('update:leftSelected', leftSelectedInner)"
                      />
                      <label :for="'leftMenu-'+i">{{ item.label }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="filter-footer row align-items-center">
              <div class="col">
                <b-btn @click="resetFields" class="btn-filter btn-reset">إعادة تعيين</b-btn>
              </div>
              <div class="col ml-auto text-right">
                <b-btn class="btn-filter btn-apply" @click="onCloseRealEstateType">تطبيق</b-btn>
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
    title: {
      type: String,
    },

    refName: {
      type: String,
      default: null,
    },
    popOffset: {
      type: Number,
      default: -100,
    },

    rightList: {
      type: Array,
      default: [],
    },
    rightSelected: {
      type: Array,
      default: [],
    },
    rightTitle: {
      type: String,
    },

    leftList: {
      type: Array,
      default: [],
    },
    leftSelected: {
      type: Array,
      default: [],
    },
    leftTitle: {
      type: String,
    },
  },
  data() {
    return {
      leftSelectedInner: [],
      rightSelectedInner: [],
    };
  },
  methods: {
    onCloseRealEstateType() {
      this.$root.$emit('bv::hide::popover', this.refName)
    },
    resetFields() {
      this.leftSelectedInner = [];
      this.rightSelectedInner = [];
      this.$emit("update:leftSelected", this.leftSelectedInner);
      this.$emit("update:rightSelected", this.rightSelectedInner);
    },

    getLabel(item,_index){
      let rightListItem=this.rightList.find(o=>o.value==item);
      if(rightListItem)
      {
        if(_index !== 0) {
          return ' , ' + rightListItem.label;
        }
        else {
          return rightListItem.label;
        }
      }
      let leftListItem=this.leftList.find(o=>o.value==item);
      if(leftListItem){
        if(_index !== 0) {
          return ' , ' + leftListItem.label;
        }
        else{
          return leftListItem.label;
        }
      }
    }
  },
  watch: {
    leftSelected:  {
      deep: true,
        handler() {
          this.leftSelectedInner = this.leftSelected;
        }
    },
    rightSelected:{
      deep: true,
      handler() {
        this.rightSelectedInner = this.rightSelected;
      }
    },
  },
  computed:{
   unionSelectedItem:function () {
     return  _.union(this.rightSelected, this.leftSelected);
   }
  }
};
</script>

<style lang="scss">
@import "~@/assets/n-scss/components/_select-multi-column.scss";
@media (min-width: 990px) and (max-height: 875px) {
  .select-multi-columns{
    .popup-force-bottom{
      transform: translate3d(353px, 60px, 0px) !important;
    }
  }


}
</style>
