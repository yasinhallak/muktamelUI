<template>
  <validation-observer ref="streetForm">

    <li id="select-street"
        class="mx-2 dropdown__Props __Land__Info select-street"
    >
      <button id="selectStreetButton"
              ref="selectStreetButton"
              class="Prop__Land__Info p-0">
        <div style="cursor: pointer"
             class=" input-group px-0">
          <div class="form-control bg-white text-truncate"
               id="Prop__Land__Info__Num">
            <span>معلومات الأرض</span>
          </div>
          <div class="input-group-append arrow-down">
          <span class="input-group-text"
                id="arrow-Prop_Land__Info_Num">
            <i class="mx-icon-chevron-down-light font-weight-bold font-size-10px"></i>
          </span>
          </div>
        </div>
      </button>
      <b-popover target="selectStreetButton"
                 placement="bottomleft"
                 offset="10"
                 container="select-street"
                 triggers="focus"
      >
        <ul
          class="inside_type Prop__More__Menu dropdown__Menu__Props p-3"
        >
          <div class="accordion accordion-modern without-bg">
            <div class="Prop__Details__Container">
              <div class="card card-default border-0 Prop__Details__Info">
                <div class="card-header p-1">
                  <h4 class="card-title m-0">
                    <div class="Prop__Data">
                      <div class="d-flex justify-content-between align-items-center">
                        <h5 class="Prop__Details mb-0 font-size-16px font-weight-bold">أبعاد الأرض</h5>
                      </div>
                      <hr class="mb-1 mt-2"/>
                    </div>
                  </h4>
                </div>
                <div id="Prop__Details__Collapse">
                  <div class="card-body px-0 py-1">
                    <div class="container-fluid p-0">
                      <form action
                            id="hidden-wizard">
                        <!-- the Height of the original land    1-->
                        <input id="l"
                               name="l"
                               type="hidden"
                               value="0"/>

                        <!-- the Width of the original land    2-->
                        <input id="w"
                               name="w"
                               type="hidden"
                               value="0"/>

                        <!-- the Area of the original land    3-->
                        <input id="a"
                               name="a"
                               type="hidden"
                               value="0"/>
                      </form>

                      <section class="land-axes"
                               id="1">
                        <div class="content">
                          <div class="row">
                            <div class="col-12">
                              <div class="parent mb-3">
                                <div class="row no-gutters">
                                  <div class="col-5">
                                    <p class="text font-size-12px">
                                      طول الأرض
                                      (م)
                                    </p>
                                  </div>
                                  <div class="col-7">

                                    <div class="input">
                                  <span
                                    @click="increaseLength"
                                    v-hammer:press="(e)=>increaseLength(e,true)"
                                    v-hammer:pressup="onPressUp"
                                    class="plus"
                                    id="plus1"
                                  >+</span>
                                      <validation-provider
                                        vid="vLength"
                                        name="vLength"
                                        :rules="`required|min_value:${maskLength.min}|max_value:${maskLength.max}`"
                                      >
                                        <input
                                          name="vLength"
                                          v-imask="maskLength"
                                          id="vLength"
                                          ref="vLength"
                                          :value="land.length"
                                          @accept="acceptMask($event,'length')"
                                          class="text-center"
                                        />
                                      </validation-provider>
                                      <span class="metre">م</span>
                                      <span
                                        @click="decreaseLength"
                                        v-hammer:press="(e)=>decreaseLength(e,true)"
                                        v-hammer:pressup="onPressUp"
                                        class="minus"
                                        id="minus1"
                                      >-</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-12">
                              <div class="parent mb-0">
                                <div class="row no-gutters">
                                  <div class="col-5">
                                    <p class="text font-size-12px">
                                      عرض الأرض
                                      (م)
                                    </p>
                                  </div>
                                  <div class="col-7">

                                    <div class="input">
                                  <span
                                    @click="increaseWidth"
                                    v-hammer:press="(e)=>increaseWidth(e,true)"
                                    v-hammer:pressup="onPressUp"
                                    class="plus"
                                    id="plus2"
                                  >+</span>
                                      <validation-provider
                                        vid="vWidth"
                                        name="vWidth"
                                        :rules="`required|min_value:${maskWidth.min}|max_value:${maskWidth.max}`"
                                      >
                                        <input
                                          name="vWidth"
                                          v-imask="maskWidth"
                                          id="vWidth"
                                          ref="vWidth"
                                          :value="land.width"
                                          @accept="acceptMask($event,'width')"
                                          class="text-center"
                                        />
                                      </validation-provider>
                                      <span class="metre">م</span>
                                      <span
                                        @click="decreaseWidth"
                                        v-hammer:press="(e)=>decreaseWidth(e,true)"
                                        v-hammer:pressup="onPressUp"
                                        class="minus"
                                        id="minus2"
                                      >-</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="row no-gutters justify-content-end">
                          <div class="col-7">
                            <ul class="result d-flex list-unstyled mt-2">
                              <li class="px-1 mx-0">
                                المساحة
                                =
                              </li>
                              <li class="px-1 mx-0"
                                  id="area">{{ landArea }}
                              </li>
                              <li class="px-1 mx-0">
                                متر
                                مربع
                              </li>
                            </ul>
                          </div>
                        </div>
                      </section>
                      <div class="align-items-center Streets__Around mt-2">
                        <div
                          class="col-12 px-0 d-flex justify-content-between align-items-center mt-2 mb-1"
                        >
                          <h5 class="Prop__Details mb-2 font-size-16px font-weight-bold">الشوارع المحيطة</h5>
                        </div>

                        <div class="col SA_Content px-0"
                             v-if="land.width > 0 && land.length > 0">
                          <div
                            class="btn-group-toggle d-flex justify-content-between align-items-center"
                          >
                            <label
                              :class="{ 'active__Select': street_number == 4 }"
                              class="btn btn-outline w-25"
                              id="STR_4"
                            >
                              <input :value="4"
                                     autocomplete="off"
                                     type="radio"
                                     v-model="street_number"/> 4
                            </label>
                            <label
                              :class="{ 'active__Select': street_number == 3 }"
                              class="btn btn-outline w-25"
                              id="STR_3"
                            >
                              <input :value="3"
                                     autocomplete="off"
                                     type="radio"
                                     v-model="street_number"/> 3
                            </label>
                            <label
                              :class="{ 'active__Select': street_number == 2 }"
                              class="btn btn-outline w-25"
                              id="STR_2"
                            >
                              <input :value="2"
                                     autocomplete="off"
                                     type="radio"
                                     v-model="street_number"/> 2
                            </label>
                            <label
                              :class="{ 'active__Select': street_number == 1 }"
                              class="btn btn-outline w-25"
                              id="STR_1"
                            >
                              <input :value="1"
                                     autocomplete="off"
                                     type="radio"
                                     v-model="street_number"/> 1
                            </label>
                          </div>
                          <hr class="mb-2 mt-2"/>

                          <div class="mx-1 px-2">
                            <div class="row text-center">
                              <label class="col pr-2">
                                جهة
                                الشارع
                              </label>
                              <label class="col pr-0">
                                عرض
                                الشارع (م)
                              </label>
                              <label class="col pr-0">
                                طول
                                الواجهة (م)
                              </label>
                            </div>
                            <div
                              :key="index"
                              class="row STR_AR STR_1 mb-2 font-size-12px"
                              v-for="(n,index) in street_number"
                            >
                              <div class="col px-1">
                                <validation-provider
                                  :vid="`vStreetSide${index}`"
                                  :name="`vStreetSide${index}`"
                                  :rules="`required`"
                                >
                                <b-form-select
                                  class="form-control font-size-12px p-0 px-2"
                                  :ref="`vStreetSide${index}`"
                                  :id="`vStreetSide${index}`"
                                  v-model.number="streetsA[index].direction"
                                  @change="onStreetSideChange(`vStreetSide${index}`,streetsA[index].direction)"
                                >
                                  <template #first>
                                    <b-form-select-option :value="null"
                                                          disabled>جهة الشارع
                                    </b-form-select-option>
                                  </template>
                                  <option
                                    :key="item.id"
                                    :value="item.id"
                                    v-for="item in streetList(index)"
                                  >{{ item.name }}
                                  </option>
                                </b-form-select>
                                </validation-provider>
                              </div>
                              <div class="col px-1">
                                <section class="land-axes"
                                         id="20">
                                  <div class="content">
                                    <div class="parent mb-0">
                                      <div class="no-gutters">
                                        <div class="input"
                                             :id="`vStreetWidth${index}`"
                                        >
                                      <span
                                        @click="increaseStreetWidth(index)"
                                        v-hammer:press="(e)=>increaseStreetWidth(index,e,true)"
                                        v-hammer:pressup="onPressUp"
                                        class="plus px-2"
                                        id="plus3"
                                      >+</span>
                                          <validation-provider
                                            :vid="`vStreetWidth${index}`"
                                            :name="`vStreetWidth${index}`"
                                            :rules="`required|min_value:${maskStreetWidth.min}|max_value:${maskStreetWidth.max}`"
                                          >
                                          <input
                                            :name="`vStreetWidth${index}`"
                                            v-imask="maskStreetWidth"
                                            :ref="`vStreetWidth${index}`"
                                            :value="streetsA[index].width"
                                            @accept="acceptStreetWidth($event,index,streetsA[index].direction)"
                                            class="text-center w-75 mr-2"
                                          />
                                          </validation-provider>
                                          <span class="Sub_metre px-0">م</span>
                                          <span
                                            @click="decreaseStreetWidth(index)"
                                            v-hammer:press="(e)=>decreaseStreetWidth(index,e,true)"
                                            v-hammer:pressup="onPressUp"
                                            class="minus px-2"
                                            id="minus3"
                                          >-</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </div>
                              <div class="col px-1">
                                <validation-provider
                                  :vid="`vStreetLength${index}`"
                                  :name="`vStreetLength${index}`"
                                  :rules="`required`"
                                >
                                <b-form-select
                                  class="form-control font-size-12px p-0 px-2"
                                  :ref="`vStreetLength${index}`"
                                  :id="`vStreetLength${index}`"
                                  type="text"
                                  v-model.number="streetsA[index].isLength"
                                  @input="onStreetLenghtChange(`vStreetLength${index}`,streetsA[index].direction)"
                                >
                                  <template #first>
                                    <b-form-select-option :value="null"
                                                          disabled>اختر الطول
                                    </b-form-select-option>
                                  </template>
                                  <b-form-select-option
                                    :value="false"
                                    v-show="land.width"
                                  >{{ land.width }}
                                  </b-form-select-option>
                                  <b-form-select-option :value="true"
                                                        v-show="land.length">
                                    {{
                                      land.length
                                    }}
                                  </b-form-select-option>
                                </b-form-select>
                                </validation-provider>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="mb-1 mt-0"/>
            </div>

            <div class="d-flex justify-content-between align-items-center w-100">
              <button
                @click="clear"
                class="btn btn-filter btn-reset my-1 px-2"
                type="button"
              >إعادة تعيين
              </button>
              <button
                aria-label="Close"
                class="btn btn-apply my-1 px-2"
                data-dismiss="modal"
                type="button"
                @click="callParent"
              >تطبيق
              </button>
<!--                            <button class="zz" @click="isValidForm">test</button>-->
            </div>
          </div>
        </ul>
      </b-popover>
    </li>
  </validation-observer>
</template>

<script>
import {
  ValidationObserver,
  ValidationProvider,
  validate,
  extend,
} from "vee-validate/dist/vee-validate.full";

const lengthMin = 20;
const widthMin = 15;

const lengthMax = 100;
const widthMax = 100;

const inputStep = 0.5;
const streetWidthStep = 1;

const streetWidthMin = 4;
const streetWidthMax = 60;

const holdSpeed = 150;

class MaskOption {
  constructor(min, max, scale = 2) {
    this.mask = Number;
    this.scale = scale;
    this.signed = true;
    this.thousandsSeparator = '';
    this.padFractionalZeros = false;
    this.normalizeZeros = false;
    this.radix = ',';
    this.mapToRadix = ['.'];
    this.min = min;
    this.max = max;
  }
}

/***
 * Created Subhi Al Wattar
 * User: Subhi Al Wattar
 * Date: 7/23/2020
 * Time: 5:38 PM
 ***/
export default {
  name: "select-street",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    // streets: {
    //   type: Array,
    // },
    streetNumber: {
      type: Number,
    },
    width: {
      type: Number,
      default: 0
    },
    length: {
      type: Number,
      default: 0
    },
    isLand: {
      type: Boolean,
    },
  },
  data() {
    return {
      inputInterval: null,
      maskLength: new MaskOption(lengthMin, lengthMax),
      maskWidth: new MaskOption(widthMin, widthMax),
      maskStreetWidth: new MaskOption(streetWidthMin, streetWidthMax, 0),
      toggleView: false,
      realEstateType: 11,
      lists: {
        newStreetSides: [
          {
            id: 1,
            name: "شمال",
            group: 1,
            cat: 1,
          },
          {
            id: 2,
            name: "جنوب",
            group: 1,
            cat: 1,
          },
          {
            id: 3,
            name: "شرق",
            group: 2,
            cat: 1,
          },
          {
            id: 4,
            name: "غرب",
            group: 2,
            cat: 1,
          },
          {
            id: 5,
            name: "شمال شرقي",
            group: 3,
            cat: 2,
          },
          {
            id: 6,
            name: "شمال غربي",
            group: 4,
            cat: 2,
          },
          {
            id: 7,
            name: "جنوب شرقي",
            group: 4,
            cat: 2,
          },
          {
            id: 8,
            name: "جنوب غربي",
            group: 3,
            cat: 2,
          },
        ],
        streetWidth: [
          6,
          8,
          10,
          12,
          15,
          18,
          20,
          25,
          28,
          30,
          36,
          40,
          50,
          60,
          80,
          100,
        ],
      },
      land: {
        length: lengthMin,
        width: widthMin,
      },
      street_number: 1,
      streetsA: [
        {
          id: null,
          realEstateOfferId: null,
          direction: 4,
          width: 15,
          isLength: false,
        },
        {
          id: null,
          realEstateOfferId: null,
          direction: null,
          width: null,
          isLength: null,
        },
        {
          id: null,
          realEstateOfferId: null,
          direction: null,
          width: null,
          isLength: null,
        },
        {
          id: null,
          realEstateOfferId: null,
          direction: null,
          width: null,
          isLength: null,
        },
      ],
    };
  },
  methods: {
    onPressUp() {
      clearInterval(this.inputInterval);
      this.inputInterval = null;
    },
    increaseLength(hammerEvent, isPress) {
      const increase = () => {
        if (this.land.length < lengthMax) {
          this.land.length = this.land.length + inputStep;
        }
      }
      if (!isPress) {
        increase();
      } else {
        this.inputInterval = setInterval(() => {
          increase();
        }, holdSpeed);
      }
    },
    decreaseLength(hammerEvent, isPress) {
      const decrease = () => {
        if (this.land.length > lengthMin) {
          this.land.length = this.land.length - inputStep;
        }
      }
      if (!isPress) {
        decrease();
      } else {
        this.inputInterval = setInterval(() => {
          decrease();
        }, holdSpeed);
      }
    },
    increaseWidth(hammerEvent, isPress) {
      const increase = () => {
        if (this.land.width < widthMax) {
          this.land.width = this.land.width + inputStep;
        }
      }
      if (!isPress) {
        increase();
      } else {
        this.inputInterval = setInterval(() => {
          increase();
        }, holdSpeed);
      }
    },
    decreaseWidth(hammerEvent, isPress) {
      const decrease = () => {
        if (this.land.width > widthMin) {
          this.land.width = this.land.width - inputStep;
        }
      }
      if (!isPress) {
        decrease();
      } else {
        this.inputInterval = setInterval(() => {
          decrease();
        }, holdSpeed);
      }
    },
    async isValidForm() {
      let valid1 = await this.$refs.streetForm.validate();
      await new Promise(resolve => setTimeout(resolve,300));
       valid1 = await this.$refs.streetForm.validate();
      console.log(this.$refs.streetForm.errors);
      if(!valid1) {
        let elErrors = Object.values(this.$refs.streetForm.fields).filter(x => x.invalid);
        elErrors.forEach((el)=>{
          document.getElementById(el.name).classList.add('invalid-state');
        });
      }
      return valid1;
    },
    acceptMask(e, target) {
      const maskRef = e.detail;
      if (target == 'length') {
        this.land.length = (maskRef.value != null && maskRef.value !== '' && maskRef.value !== ',') ?
          parseFloat(maskRef.value.replace(/,/g, '.')) : null;
      }
      if (target == 'width') {
        this.land.width = (maskRef.value != null && maskRef.value !== '' && maskRef.value !== ',') ?
          parseFloat(maskRef.value.replace(/,/g, '.')) : null;
      }
    },
    increaseStreetWidth(index, hammerEvent, isPress) {
      const increase = () => {
        const streetWidth = this.streetsA[index].width ? parseInt(this.streetsA[index].width) : 0;
        if (streetWidth < streetWidthMax) {
          this.streetsA[index].width = streetWidth + streetWidthStep;
        }
      }
      if (!isPress) {
        increase();
      } else {
        this.inputInterval = setInterval(() => {
          increase();
        }, holdSpeed);
      }
    },
    decreaseStreetWidth(index, hammerEvent, isPress) {
      const decrease = () => {
        const streetWidth = this.streetsA[index].width ? parseInt(this.streetsA[index].width) : 0;
        if (streetWidth > streetWidthMin) {
          this.streetsA[index].width = streetWidth - streetWidthStep;
        }
      }
      if (!isPress) {
        decrease();
      } else {
        this.inputInterval = setInterval(() => {
          decrease();
        }, holdSpeed);
      }
    },
    acceptStreetWidth(e, index,dir) {
      const maskRef = e.detail;
      this.streetsA[index].width = maskRef.value;
      document.getElementById(`vStreetWidth${index}`)
        .classList.remove('invalid-state');
    },
    onStreetLenghtChange(elId,dir){
      this.updateOppositeValues(dir);
      document.getElementById(elId).classList.remove('invalid-state');
    },

   async onStreetSideChange(elId,dir){
      this.inheritOppositeValues(dir);
      //add error class
      document.getElementById(elId).classList.remove('invalid-state');
    },
    inheritOppositeValues(dir){
      let currentValue = this.streetsA.find(x => x.direction == dir);
      const oppositeDir = this.getOpposite(dir);
      let oppositeValue = this.streetsA.find(x=> x.direction == oppositeDir);

      if(!this.streetsA.find(x=> x.direction == 4)){
        this.streetsA.push({
          id: null,
          realEstateOfferId: null,
          direction: 4,
          width: 15,
          isLength: false,
        }) ;
      }

      //set the new added row value from previous opposite
      if(oppositeValue){
        currentValue = {...oppositeValue,width:null,direction: dir};
        const currentIndex = this.streetsA.findIndex(x=> x.direction == dir);
        this.streetsA[currentIndex] = {...currentValue};
      }

      this.streetsA = [...this.streetsA];
    },
    updateOppositeValues(dir){
      let currentValue = this.streetsA.find(x => x.direction == dir);
      const oppositeDir = this.getOpposite(dir);
      let oppositeValue = this.streetsA.find(x=> x.direction == oppositeDir);

      //update opposite
      if(oppositeValue){
        oppositeValue = {...currentValue,width: oppositeValue.width,direction: oppositeDir} ;
        const oppositeIndex = this.streetsA.findIndex(x=> x.direction == oppositeDir);
        this.streetsA[oppositeIndex] = {...oppositeValue,};
      }

      this.streetsA = [...this.streetsA];
    },
    getOpposite(dir){
      if(dir == 1)
        return 2;
      if(dir == 2)
        return 1;

      if(dir == 3)
        return 4;
      if(dir == 4)
        return 3;

      if(dir == 5)
        return 8;
      if(dir == 8)
        return 5;

      if(dir == 6)
        return 7;
      if(dir == 7)
        return 6;

    },
    clear() {
      this.land = {
        length: lengthMin,
          width: widthMin,
      };
      this.street_number = 1;
      this.streetsA = [
        {
          id: null,
          realEstateOfferId: null,
          direction: 4,
          width: 15,
          isLength: false,
        },
        {
          id: null,
          realEstateOfferId: null,
          direction: null,
          width: null,
          isLength: null,
        },
        {
          id: null,
          realEstateOfferId: null,
          direction: null,
          width: null,
          isLength: null,
        },
        {
          id: null,
          realEstateOfferId: null,
          direction: null,
          width: null,
          isLength: null,
        },
      ];
      this.$emit("data-changed", {land: this.land, streets: []});
    },

    // lengthChanged(index) {
    //   console.log("lengthChanged :", index);
    //   console.log("streetA :", this.streetsA);
    //   // check if any street has length
    //   let hasLength = this.streetsA.filter((s) => s.isLength !== null).length;
    //   console.log("hasLength :", this.streetsA);
    //   if (hasLength === 0) return;
    //   let street = this.streetsA[index];
    //   console.log("street :", street);
    //   let changedStreetDirection = this.lists.newStreetSides.find(
    //     (s) => s.id === street.direction
    //   );
    //
    //   if (street.isLength !== null) {
    //     this.streetsA.forEach((s, i) => {
    //       if (i === index) return;
    //
    //       if (!s.direction) {
    //         console.log("changedStreetDirection")
    //         // s.isLength = null;
    //         return;
    //       }
    //       console.log("changedStreetDirection",changedStreetDirection)
    //       let streetDirection = this.lists.newStreetSides.find(
    //         (d) => d.id === s.direction);
    //       console.log("streetDirection",streetDirection)
    //
    //       if (changedStreetDirection.group === streetDirection.group)
    //         s.isLength = street.isLength;
    //       else s.isLength = !street.isLength;
    //     });
    //   } else {
    //     let other = this.streetsA.filter(
    //       (s, i) => i !== index && s.isLength !== null
    //     )[0];
    //     let otherDirection = this.lists.newStreetSides.find(
    //       (d) => d.id === other.direction
    //     );
    //     this.streetsA[index].isLength =
    //       changedStreetDirection.group !== otherDirection.group;
    //   }
    // },

    streetList(index) {
      let allOptions = this.lists.newStreetSides;
      if (index === 0) {
        return allOptions;
      }
      let type = this.realEstateType;
      // Change Direction Category
      if (type === 11) {
        let street = this.streetsA[0];
        if (!street.direction) {
          let OtherStreets = this.streetsA.filter((s) => s.direction !== null);
          if (OtherStreets.length > 0) {
            street = OtherStreets[0];
          }
        }
        if (street.direction) {
          let StreetDirection = allOptions.find(
            (s) => s.id === street.direction
          );
          allOptions = allOptions.filter((o) => o.cat === StreetDirection.cat);
        }
      }
      // Get Other Selected Directions
      let selectedDirections = this.streetsA
        .filter((s, i) => i !== index && s.direction !== null)
        .map((s) => s.direction);
      allOptions = allOptions.filter((o) => !selectedDirections.includes(o.id));
      // Reset field value if it's not in the same category
      let hasValue = this.streetsA[index].direction !== null;
      let isValidValue =
        allOptions.filter((o) => o.id === this.streetsA[index].direction)
          .length > 0;
      if (hasValue && !isValidValue) {
        this.streetsA[index].direction = null;
      }
      // Auto set last choice
      // if (allOptions.length === 1) {
      //   this.streetsA[index].direction = allOptions[0].id;
      // }
      return allOptions;
    },

    resetHiddenField() {
      for (let i = this.street_number; i < 4; i++) {
        this.streetsA[i].direction = null;
      }
    },

    async callParent() {
      if(await this.isValidForm()){
        this.$root.$emit('bv::hide::popover', 'selectStreetButton')
        this.toggleView = false;
        let SelectedStreets = this.streetsA.slice(0, this.street_number);
        this.$emit("data-changed", {land: this.land, streets: SelectedStreets});
      }
    },

    fillStreet(val, val2) {
      this.street_number = val2;
      this.streetsA = [...val];
      let init = this.streetsA.length;
      // add objects to  streetsA to complete to 4 object
      for (let i = init; i < 4; i++) {
        this.streetsA.push({
          id: null,
          realEstateOfferId: null,
          direction: null,
          width: null,
          isLength: null,
        })
      }
    },

    onClose() {
      this.toggleView = false;
    },
  },
  watch: {
    street_number: function () {
      this.resetHiddenField();
    },

    width: function () {
      this.land.width = this.width;
    },
    length: function () {
      this.land.length = this.length;
    },
    streetsA:{
      deep:true,
      handler(val){
      },
    },
  },
  computed: {
    landArea: function () {
      // (Math.round((this.land.length * this.land.width) * 100) / 100).toFixed(2);
      return (this.land.length * this.land.width).toFixed(2);
    }
  }
};
</script>

<style lang="scss">
@import "~@/assets/n-scss/components/_select-street.scss";
</style>
