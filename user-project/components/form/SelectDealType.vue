<template>
  <div class="select-deal-type dropdown" >
    <button  class="input-group" ref="dealTypeButton" id="dealTypePopover">
      <div class="form-control text-truncate d-flex align-items-center">
        <span
          class="circle w-10-px height-10-px ml-1"
          :class="[{'background-green': dealType===11},{'background-red': dealType===5},{'background-blue': dealType===6}]"
        ></span>
        <span v-if=" dealType===5">للبيع</span>
        <span v-if=" dealType===6">للايجار</span>
        <span v-if=" dealType===11">مزادات</span>
      </div>
    </button>
    <b-popover target="dealTypePopover"
               placement="bottomleft"
               boundary-padding="0"
               offset="-75"
               triggers="click "
    >
      <div class="select-deal-type-dropdown-menu" tabindex="0" >
        <div class="filter-dropdown-menu-inner">
          <div class="filter-section">
            <ul class="deal-type-list">
              <li class="mb-2" :class="{'collapsed':dealType === 5}">
                <div class="deal-type-head">
                  <input
                  type="radio"
                  id="deal-buy"
                  v-model="dealType"
                  class="deal-type-checkbox"
                  :value="5"
                  @change="$emit('update:dealTypeSelected', dealType)"
                />
                  <label for="deal-buy" class="deal-type-label ">
                    <span class="checkbox-circle" ></span>
                    <span class="deal-type-title font-weight-bold" >للبيع</span>
                    <span class="deal-type-circle background-red"></span>
                  </label>
                  <div class="collapse-button flex-grow-1" v-b-toggle.collapse-sale></div>
                </div>
                <b-collapse accordion="my-accordion" id="collapse-sale" >
                  <div class="search-type-item">
                    <input
                      id="qqq1"
                      :value="1"
                      class="d-none"
                      type="checkbox"
                      v-model="saleType"
                      @change="$emit('update:saleTypeSelected', saleType)"
                    />
                    <label for="qqq1">مكتب عقاري</label>
                  </div>
                  <div class="search-type-item">
                    <input
                      id="qqq2"
                      :value="2"
                      class="d-none"
                      type="checkbox"
                      v-model="saleType"
                      @change="$emit('update:saleTypeSelected', saleType)"
                    />
                    <label for="qqq2">مشاريع جديدة</label>
                  </div>
                </b-collapse>
              </li>
              <li class="mb-2" :class="{'collapsed':dealType === 6}">
                <div class="deal-type-head">
                  <input
                  type="radio"
                  class="deal-type-checkbox"
                  id="deal-rent"
                  v-model="dealType"
                  :value="6"
                  @change="$emit('update:dealTypeSelected', dealType)"
                />
                  <label for="deal-rent" class="deal-type-label mb-1 w-100" v-b-toggle.collapse-rent>
                    <span class="checkbox-circle"></span>
                    <span class="deal-type-title font-weight-bold">للإيجار</span>
                    <span class="deal-type-circle background-blue"></span>
                  </label>
                </div>
                <b-collapse accordion="my-accordion" id="collapse-rent" :visible="dealType === 6">
                  <div class="search-type-item">
                    <input
                      id="qqqq2"
                      :value="1"
                      class="d-none"
                      type="radio"
                      v-model="rentType"
                      @change="$emit('update:rentTypeSelected', rentType)"
                    />
                    <label for="qqqq2">شهري</label>
                  </div>
                  <div class="search-type-item">
                    <input
                      id="qqqq3"
                      :value="2"
                      class="d-none"
                      type="radio"
                      v-model="rentType"
                      @change="$emit('update:rentTypeSelected', rentType)"
                    />
                    <label for="qqqq3">سنوي</label>
                  </div>
                </b-collapse>
              </li>
              <li class="mb-2 d-flex align-items-center">
                <div class="deal-type-head">
                  <input
                  type="radio"
                  id="deal-auction"
                  :disabled="auctionsCount==0"
                  v-model="dealType"
                  :value="11"
                  class="deal-type-checkbox"
                  @change="$emit('update:dealTypeSelected', dealType)"
                />
                  <label for="deal-auction" class="deal-type-label d-flex align-items-center mb-1 w-100">
                    <span class="checkbox-circle"></span>
                    <span class="mx-1 deal-type-title font-weight-bold">مزادات</span>
                    <span class="deal-type-circle background-green"></span>
                    <span class="auction-results mr-auto ">
                                المزادات القائمة:
                                <span>{{ auctionsCount }}</span>
                              </span>
                  </label>

                </div>
              </li>
            </ul>
            <div class="filter-footer row">
              <div class="col ml-auto text-right">
                <b-btn class="btn-filter btn-apply" @click="onCloseDealType">تطبيق</b-btn>
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
  name: "select-deal-type",
  props: {
    dealTypeSelected: {
      default: null,
    },
    saleTypeSelected: {
      type: Array,
      default: [],
    },
    rentTypeSelected: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      openList1: false,
      dealType: this.$vDealType.forSell,
      saleType: [1,2],
      rentType: 2,
      auctionsCount: null,
    };
  },
  methods: {
    GetAllAcutions() {
      this.$axios
        .get(`/offer/auction/count`)
        .then((response) => {
          this.auctionsCount = response.data.count;
          //console.log("this.auction;", this.auctionsCount);
        })
        .catch(function (error) {
          console.log(error);
          alert("حدث خطأ");
        });
    },
    onCloseDealType() {
      this.$root.$emit('bv::hide::popover', 'dealTypePopover')
    },
  },
  watch: {
    dealTypeSelected: function () {
      this.dealType = this.dealTypeSelected;
    },
    saleTypeSelected: function () {
      this.saleType = this.saleTypeSelected;
    },
    rentTypeSelected: function () {
      this.rentType = this.rentTypeSelected;
    },
  },
  mounted() {
    this.GetAllAcutions();
  },
};
</script>

<style lang="scss">
@import "~@/assets/n-scss/components/_select-deal-type.scss";
</style>
