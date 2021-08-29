<template>
  <div class="diagram-box" v-if="plan">
    <div class="diagram-box_header">
      <mx-img :img-src="plan.photo" ratio="3/2" :alt="plan.title" max-size="sd" :errorImageUrl="$vDefaultPlanImg">
        <ul class="d-flex align-items-center features position-absolute z-index-3">
          <li class="d-flex align-items-center ml-2" v-if="plan.photosCount !== 0">
            <i class="mx-icon-camera"></i>
            <span class="mr-1">{{plan.photosCount}}</span>
          </li>
        </ul>
        <div class="special-icon position-absolute top-0 left-0" v-if="plan.isSpecial">
          <img src="@/assets/images/Special__Prop.png" alt />
        </div>
        <div
          class="heart-icon position-absolute top-5 left-5 z-index-3"
          :class="{'isFavorite':plan.isFavorite}"
          @click.prevent="AddFavorite()"
        >
          <i :class="plan.isFavorite ? 'mx-icon-heart' : 'mx-icon-heart-light'"></i>
        </div>
      </mx-img>
    </div>
    <div class="diagram-box_body px-2">
      <h3
        class="diagram-type"
      >{{$t(`diagramType.${plan.type}`)}} {{plan.hasExtenstion ? "+ ملحق": ""}}</h3>
      <table class="diagram-dimension my-2">
        <tr>
          <td class="pl-2">أبعاد الطابق الأرضي:</td>
          <td dir="ltr">
            <span>{{plan.maxLength}}</span>
            <b class="mx-1">x</b>
            <span>{{plan.maxWidth}}</span>
          </td>
        </tr>
      </table>
      <ul class="diagram-props d-flex align-items-center">
        <li class="ml-3" v-if="plan.roomsCount">
          <i class="mx-icon-bed"></i>
          <span>{{plan.roomsCount}}</span>
        </li>
        <li class="ml-3">
          <i class="mx-icon-bath"></i>
          <span>{{plan.bathRoomsCount}}</span>
        </li>
        <li class="ml-3" v-if="plan.area">
          <i class="mx-icon-area"></i>
          <span>{{plan.area}}</span>
        </li>
        <li class="views mr-auto" v-if="plan.detailShowCount">
          <i>المشاهدات :</i>
          <span>{{plan.detailShowCount}}</span>
        </li>
      </ul>
      <ul class="contact-us d-flex">
        <li class="call-us-btn">
          <a :href="`tel:00966`">
            <i class="fas fa-phone-square-alt"></i>
            اتصل بنا
          </a>
        </li>
        <li class="email-btn">
          <a href="#" data-toggle="modal" data-target="#modalEmail">
            <i class="mx-icon-envelope envelope"></i>
            إيميل
          </a>
        </li>
        <li class="whatsapp-btn">
          <a href="#" data-toggle="modal" data-target="#modalWhatsApp">
            <i class="mx-icon-whatsapp whatsapp"></i>
            واتساب
          </a>
        </li>
      </ul>
    </div>
    <div class="diagram-box_footer pr-2">
      <a href="#" class="d-block">
        <div class="diagram-author d-flex align-items-stretch">
          <div class="diagram-author_title d-flex align-items-center">
            <span>المصمم</span>
            <h4 class="m-0">{{plan.agency.name}}</h4>
          </div>
          <div class="diagram-author_logo mr-auto">
            <mx-img
              :img-src="plan.agency.logo"
              :noResponsive="true"
              ratio="3/2"
              :errorImageUrl="$vDefaultAgencyImg">
            </mx-img>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
/***
 * Created Subhi Al Wattar
 * User: Subhi Al Wattar
 * Date: 7/23/2020
 * Time: 3:07 PM
 ***/
export default {
  name: "plan-card",
  props: {
    plan: {},
  },
  methods: {
    // add to favorite
    AddFavorite() {
      let payload = {
        offerId: this.plan.id,
        isFavorite: this.plan.isFavorite,
      };
      this.$store.dispatch("AddFavorite", payload).then((r) => {
        this.plan.isFavorite = r;
        this.$emit("favoriteChanged", this.plan.isFavorite);
      });
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/n-scss/components/diagram-box";
</style>
