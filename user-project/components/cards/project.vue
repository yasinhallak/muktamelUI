<!--

Project card Cases:
1-	default   no Class required
2-	Agency View [ agency-view ]
3-	Grid View  [ grid-view ]
4-	Grid view info window  [ grid-view  + info-windows ]
5-	List info window [ list-info-window ]
-->
<template>
  <div class="project-card d-flex" v-if="project">
    <div class="card-header p-0 position-relative">
      <mx-img :img-src="projectImage" ratio="3/2"   :alt="project.title"  :errorImageUrl="$vDefaultProjectImg" max-size="sd">
        <ul class="d-flex align-items-center features position-absolute z-index-3">
          <li class="d-flex align-items-center" v-if="project.photosCount!=0">
            <i class="mx-icon-camera"></i>
           <span class="mr-1">{{ project.photosCount }}</span>
          </li>

          <li v-if="project.hasYouTube">
            <i class="mx-icon-youtube"></i>
          </li>
          <li class="icon-deg360" v-if="project.hasPhotos360">
            <i class="mx-icon-panorama"></i>
          </li>
          <li v-if="project.hasVirtualTour">
            <i class="mx-icon-virtual-tour"></i>
          </li>
          <li v-if="project.hasDesigns">
            <i class="mx-icon-plan"></i>
          </li>
          <li v-if="project.hasBrochur">
            <i class="mx-icon-file-pdf"></i>
          </li>
        </ul>
        <div class="author_logo mr-auto position-absolute z-index-3 bottom-7 left-7">
          <mx-img :img-src="agencyImage" ratio="3/2" :noResponsive="true" :alt="project.title" :errorImageUrl="$vDefaultAgencyImg" ></mx-img>
        </div>
      </mx-img>
      <h4
        v-if="project.state"
        class="project-type"
      >{{ $t(`projectState.${project.state}`) }}</h4>
    </div>
    <div class="card-body overflow-hidden">
      <div class="inner-box">
        <h2 class="title mb-0 text-truncate">{{project.title}}</h2>
        <ul class="location d-flex align-items-center mb-1 text-truncate">
          <i class="text-blue icons mx-icon-map-marker ml-1"></i>
          <li :class="{'text-truncate': listAddress(project.address).length - 1 === index}" v-for="(item,index) in listAddress(project.address) " :key="index">{{item}}</li>
        </ul>
        <div class="d-flex release-date">
          <div>تاريخ التسليم :</div>
          <div class="date" v-if="project.finishDate">
            <span>{{ $t(`projectDeliveryDate.${project.finishYearQuarter}`) }}</span>
            <span>{{project.finishDate}}</span>
          </div>
          <div class="date" v-if="!project.finishDate">
            <span>جاهز التسليم</span>
          </div>
        </div>
        <div class="d-flex starting-price">
          <div class="start-price-normal">تبدأ الأسعار من :</div>
          <div class="start-price">ابتداءً من :</div>
          <div class="price">
            <i>{{project.price | toComma}}</i>
            <span class="text-truncate">ريال سعودي</span>
          </div>
        </div>
        <div class="project-types d-flex flex-wrap text-truncate ">
            <div v-for="(realtype,i) in project.realEstatesGroup.slice(0,3)"
                 :key="i"
                 class="project-types-item d-flex justify-content-between align-items-center"
            >
              <b>
                <span>{{ $t(`realEstateType.${realtype.type}`) }}</span>
                <span >{{ $t(`projectDealType.${realtype.dealType}`) }}</span>
              </b>
              <span class="count">({{ realtype.realEstatesCount }})</span>
            </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="inner-box">
          <div class="author d-flex align-items-center justify-content-between">
            <div class="author_title">
                       <span>المالك <br>
                         أو المطور</span>
            </div>
            <div class="author_name col text-center ">
              <h4>
              {{ project.agencyName || project.agency.name }}
              </h4></div>
            <div class="author_logo mr-auto">
              <mx-img :img-src="agencyImage" ratio="3/2" :noResponsive="true" :alt="project.title"
                      :errorImageUrl="$vDefaultAgencyImg"></mx-img>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/***
 * Created Subhi Al Wattar
 * User: Subhi Al Wattar
 * Date: 7/29/2020
 * Time: 5:15 PM
 ***/
export default {
  name: "project",
  props: {
    project: Object,
    hasDistrict: {
      default: false,
      type: Boolean,
    },
  },
  methods:{
    /*for create address list*/
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
  },
  computed:{
    agencyImage:function (){
      return this.project?.agency?.logo
    },
    projectImage:function (){
      return this.project?.image
    }
  }
};

</script>

<style scoped lang="scss">
@import "~@/assets/n-scss/components/_project-card.scss";
</style>
