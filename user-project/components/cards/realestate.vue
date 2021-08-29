<!--
Classes: without class => List View card
         grid-view => Vertical card
         grid-view-small => Related Realestate View
         grid-view + info-map-view => on hover map vertical card
         info-map-view-fixed => horizontal on marker click

  hasCallButtons = true ? 'has-call-buttons'
  pricePriority =  true ? Price Will be first
  hasDistrict = Default is True
  grid-view + grid-view-popup => use in contact card
  grid-view + grid-view-small => use in related Offer

-->

<template>

  <div class="real-estate-card d-flex"
             :class="{ 'has-call-buttons': hasCallButtons, 'grid-view': isGridView, 'price-first' :pricePriority }">
      <!--card section-->
      <div class="card-header p-0 position-relative flex-shrink-0">
        <mx-img :img-src="offerItems.image"
                ratio="isGridView ?2/1 : 3/2"
                :alt="offerItems.title" max-size="sd"
                :errorImageUrl="$vDefaultRealEstateImg " >
          <ul v-if="hasOfferItems()" class="d-flex align-items-center features position-absolute z-index-3">
            <li class="d-flex align-items-center" v-if="offerItems.imagesCount !== 0">
              <i class="mx-icon-camera"></i>
              <span class="mr-1">{{ offerItems.imagesCount }}</span>
            </li>
            <li v-if="offerItems.hasYouTube">
              <i class="mx-icon-youtube"></i>
            </li>
            <li v-if="offerItems.hasPhotos360">
              <i class="mx-icon-panorama"></i>
            <!--<img alt src="@/assets/images/icons/360.png"/>-->
            </li>
            <li v-if="offerItems.hasVTour">
              <i class="mx-icon-virtual-tour"></i>
            <!--<img alt src="@/assets/images/icons/cube.png"/>-->
            </li>
            <li v-if="offerItems.hasDesigns">
              <i class="mx-icon-plan"></i>
            </li>
            <li v-if="offerItems.hasFile">
              <i class="mx-icon-file-pdf"></i>
            </li>
          </ul>
        </mx-img>
        <div class="add-to-favorite position-absolute left-0 top-0"
             :class="{'isFavorite':offerItems.isFavorite}"
             @click.prevent="AddFavorite()">
          <i :class="offerItems.isFavorite ? 'mx-icon-heart' : 'mx-icon-heart-light'"></i>
        </div>
        <h4 class="real-estate-date position-absolute">
          <i class="mx-icon-calendar"></i>
          <span v-text="$moment(offerItems.publishedDate).fromNow()"></span>
        </h4>
      </div>
      <div class="card-body">
        <div class="d-flex flex-column">
          <!-- Set Order Based on card type order-0 order-1 order-2  -->
          <h1
            class="title text-truncate"
            :class="{ 'order-1': pricePriority }"
          >{{ offerItems.title }}</h1>
          <ul class="location d-flex align-items-center text-truncate " :class="{ 'order-2': pricePriority }">
            <i class="icons mx-icon-map-marker pl-1 text-blue"></i>
            <li :class="{'text-truncate': listAddress(offerItems.address).length - 1 === index}"
                v-for="(item, index) in listAddress(offerItems.address)" :key="index">{{ item }}
            </li>
          </ul>
          <h2
            class="price text-red d-flex align-items-end "
            v-if="offerItems.dealType != 11"
            :class="{ 'order-0': pricePriority }"
          >
            {{ offerItems.price | toComma }}
            <span class="mr-1">ريال <span class="price-in-map">سعودي</span></span>
          </h2>
          <h2
            class="auction-date text-red "
            v-if="offerItems.dealType == 11"
            :class="{ 'order-0': pricePriority }"
          >
            <span class="font-size-16px" v-if="offerItems.auctionDate">تاريخ المزاد :</span>
            <i class="d-inline-block" v-if="offerItems.auctionDate">{{$moment(offerItems.auctionDate).locale('en').format('YYYY-MM-DD')}}</i>
          </h2>
        </div>
        <ul class="specs-list d-flex text-2 color-gry-blue ">
          <li class="spec-item"
                v-if="
              offerItems.bedroomsCount !== null ||
              offerItems.otherRoomsCount !== null
            "
          >
            <i class="mx-icon-bed"></i>
            <span v-if="offerItems.bedroomsCount !== null">{{ offerItems.bedroomsCount }}</span>
            <span
              v-if="
                offerItems.bedroomsCount !== null &&
                offerItems.otherRoomsCount !== null
              "
            >+</span>
            <span v-if="offerItems.bathroomsCount !== null">{{ offerItems.otherRoomsCount }}</span>
          </li>
          <li class="spec-item" v-if="offerItems.bathroomsCount !== null">
            <i class="mx-icon-bath"></i>
          {{ offerItems.bathroomsCount }}
        </li>
          <li class="spec-item" v-if="offerItems.buildingArea !== null || offerItems.area !== null">
            <i class="mx-icon-area"></i>
            {{ offerItems.buildingArea || offerItems.area }}
          م2
          </li>
        </ul>
        <div class="real-estate-type text-1 text-black">
          <i class="mx-icon-circle "
             :class="getClass()"></i>
          {{ $t(`realEstateType.${offerItems.type}`) }}
          {{ $t(`dealTypeOperation.${offerItems.dealType}`) }}
        </div>
        <ul class="contact-us d-flex " v-if="hasCallButtons" @click.prevent>
          <li class="call-us-btn" :style="offerItems.employee.phone?'':'pointer-events: none;background: #ccc;'">
            <a @click="isModalRender=true,updateStatistics()"
               :href="`tel:00966${offerItems.employee.phone}`"
               data-toggle="modal"
               :data-target="`#modalCall-${offerItems.id}`"
            >
              <i class="mx-icon-phone"></i>
              اتصل بنا
            </a>
          </li>
          <li class="email-btn" :style="offerItems.employee.email?'':'pointer-events: none;background: #ccc;'">
            <a
              @click="isModalRender=true"
              :href="`mailto:${offerItems.employee.email}`"
              data-toggle="modal"
              :data-target="`#modalEmail-${offerItems.id}`"
            >
              <i class="mx-icon-envelope"></i>
              إيميل
            </a>
          </li>
          <li :style="offerItems.employee.phone?'':'pointer-events: none;background: #ccc;'"
              class="whatsapp-btn">
            <a @click="isModalRender=true"
              :href="$mq !== 'mobile'?
            `https://wa.me/00966${offerItems.employee.phone}?text=${offerItems.employee.name}`:
            `whatsapp://send?phone=00966${offerItems.employee.phone}&text=${offerItems.employee.name}`
            "
              :data-toggle="$mq !== 'mobile' ? 'modal' : ''"
              :data-target="$mq !== 'mobile' ? `#modalWhatsApp-${offerItems.id}` : ''"
            >
              <i class="mx-icon-whatsapp"></i>
              واتساب
            </a>

          </li>
        </ul>
        <div v-if="offerItems.agency" class="card-footer">
          <a class="d-block" href="#">
            <div class="author d-flex align-items-stretch">
              <!--            <div class="author_title d-flex align-items-center">-->
              <!--              <span>المالك أو المطور</span>-->
              <!--              <h4 class="m-0">شركة دار الأركان للاستثمار والتطوير العقاري</h4>-->
              <!--            </div>-->
              <div class="author_logo mr-auto">
                <mx-img :img-src="offerItems.agency.logo"
                        ratio="3/2"
                        :alt="offerItems.agency.name"
                        :noResponsive="true"
                        :errorImageUrl="$vDefaultAgencyImg" >
                </mx-img>
              </div>
            </div>
          </a>
        </div>

      </div>


          <!--modals section-->
          <template v-if="isModalRender">
            <div>
              <mx-modal-contacts-card
                :offer22="offerItems"
                :projectRealType="true"
                :isCall="true"
                :id='`modalCall-${offerItems.id}`'
              >
              </mx-modal-contacts-card>

              <mx-modal-contacts-card
                :offer22="offerItems"
                :projectRealType="true"
                :isMobileMail="true"
                :id='`modalEmail-${offerItems.id}`'
              ></mx-modal-contacts-card>

              <mx-modal-contacts-card
                :offer22="offerItems"
                :projectRealType="true"
                :isMobileWhatsApp="true"
                :id='`modalWhatsApp-${offerItems.id}`'
              >
              </mx-modal-contacts-card>
            </div>
          </template>
  </div>

</template>


<script>

  /***
   * Created Subhi Al Wattar
   * User: Subhi Al Wattar
   * Date: 7/29/2020
   * Time: 5:15 PM
   ***/
  import axios from "axios";

  export default {
    name: "realestate",
    props: {
      hasDistrict: {
        default: false,
        type: Boolean,
      },
      hasCallButtons: {
        default: false,
        type: Boolean,
      },
      offerItems: Object,
      pricePriority: {
        default: false,
        type: Boolean,
      },
      isGridView: false,
      type: Boolean,
      card_id: String
    },
    data() {
      return {
        isfavoriteRespone: null,
        isModalRender: false,
        hasPhoneNumber:false
      };
    },
    methods: {
      // add to favorite
      AddFavorite() {
        let payload = {
          offerId: this.offerItems.id,
          isFavorite: this.offerItems.isFavorite,
        };
        this.$store.dispatch("AddFavorite", payload).then((r) => {
          this.offerItems.isFavorite = r;
          this.$emit("favoriteChanged", this.offerItems.isFavorite);
        });
      },

      //  update statistics
      updateStatistics(){
        let payload={
          offerId: this.offerItems.id,
          statistics: this.$vStatistics.PhoneCount,
        }
        this.$store.dispatch("updateStatistics",payload)
      },
      AddFavorite() {
        let payload = {
          offerId: this.offerItems.id,
          isFavorite: this.offerItems.isFavorite,
        };
        this.$store.dispatch("AddFavorite", payload).then((r) => {
          this.offerItems.isFavorite = r;
          this.$emit("favoriteChanged", this.offerItems.isFavorite);
        });
      },

      listAddress(payload) {
        if (!payload) return [];
        let address = [];
        if (payload.region != null)
          address.push(this.$t(`region.${payload.region}`));
        if (payload.city) address.push(this.$t(`city.${payload.city}`));
        if (payload.district && this.hasDistrict)
          address.push(this.$t(`district.${payload.district}`));
        return address;
      },

      hasOfferItems(){
        return this.offerItems.imagesCount !== 0 ||
          this.offerItems.hasYouTube ||
          this.offerItems.hasPhotos360 ||
          this.offerItems.hasVTour ||
          this.offerItems.hasDesigns ||
          this.offerItems.hasFile;
      },

      getClass() {
        if (this.offerItems.dealType === 1 || this.offerItems.dealType === 3) {
          return 'text-red'
        }
        if (this.offerItems.dealType === 2 || this.offerItems.dealType === 4) {
          return 'text-blue'
        }
        return 'text-green'

      },

      goLink(_id) {
        this.$router.push(`/real-estates/${_id}`);
      },

    },
    mounted() {

    }

  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/n-scss/components/_realestate-card.scss";
</style>
