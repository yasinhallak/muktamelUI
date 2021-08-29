<template>
  <section class="virtual-tour">

    <!--<header id="second_navbar">
      <div class="container">
        <div class="row">
          <div class="col-3"></div>
          <div class="col-9">
            <h1 key="main-title">معرض الجولة الإفتراضية 360</h1>
          </div>
        </div>
      </div>
    </header>-->

    <main class="container py-3">
      <div class="row">
        <!--filter section-->
        <nav id="filter" class="col-12 col-md-4 col-lg-3 my-3 my-sm-0">
          <section id="secondaryTypes">
            <h2 key="secondary-types-title">محرك البحث</h2>
            <div class="mb-3">
              <select name="secondarySelector" id="secondarySelector" v-model="form.offerType">
                <option :value="null" selected>أختر النوع</option>
                <option v-for="item in agencyType" :value="item">{{$t(`agencyType.${item}`)}}</option>
              </select>
            </div>
            <div>
              <select name="secondarySelector" id="secondarySelector"
                      v-model="form.photographerId">
                <option :value="null" selected>أختر المصور</option>
                <option v-for="item in photographersList" :value="item.id">{{item.name}}</option>
              </select>
            </div>
          </section>
          <section id="otherOptions">
            <input type="checkbox" name="onlyInMuktamel" id="onlyInMuktamel" v-model="form.isOnMuktamel"/>
            <label for="onlyInMuktamel" key="only-in-Muktamel">صور من عقارات مكتمل فقط</label>
            <br/>
          </section>
        </nav>



        <!--gallery section-->
        <section id="gallery" class="col-12 col-md-8 col-lg-9">

          <!--no result-->
          <template v-if="virtualTourList.length === 0">
            <div style="height: calc(100vh - 426px)" class="container">
              <div style="border: solid 1px #70707080;
                          min-height:200px;
                        color:#001324;background: #F5F5F5"
                   class="col-12 font-size-14px pb-3 pt-3 pb-sm-1 pt-sm-1">
                <h1 class="font-size-16px font-weight-bold">لا يوجد نتائج مطابقة لبحثك</h1>
                <p class="m-0 pb-2" style="color: #001324">قم بأحد الإجراءات التالية :</p>
                <ul style="list-style: inside">
                  <li style="line-height: 30px"><a href="#" @click.prevent="resetForm" style="color: #0089FE">إزالة محددات البحث</a> </li>
                </ul>
              </div>
            </div>
          </template>

          <!--filter header-->
          <header v-else id="countSort" class="px-2">
            <div id="countDiv" key="result-count">
              عدد النتائج: <span id="pictureNumSpan"></span>
              <span id="countSpan">{{totalCount}}</span>
            </div>
            <div id="sortDiv" class="m-0">
              <label for="sort" key="sort-by">فرز حسب</label>
              <select name="sort" id="sort" @change="sortSelect($event)">
                <option v-for="item in vtSort" :value="item">{{$t(`vtSort.${item}`)}}</option>
              </select>
            </div>
          </header>

          <!--cards section-->
          <div v-if="virtualTourList.length > 0"  class="row w-100 m-0">

            <!--card-->
            <template v-for="item in virtualTourList">

                <div class="smallCard mb-3 pb-2 col-12 col-md-12 col-lg-6 col-xl-4 px-2">

                  <div class="position-absolute View__Icon py-1 px-2">
                    <a :href="item.url" target="_blank">
                      <img src="@/assets/images/Cub_Photo.png" />
                    </a>
                  </div>

                  <div class="bg-white">
                    <div class="iconContain">
                      <div class="position-relative">
                        <div class="position-absolute Calender__Icon py-1 px-2">
                          <span class="text-white font-size-10px mx-2">المشاهدات: {{item.showCount}}</span>
                        </div>
                        <!--<div class="position-absolute Heart__Icon py-1 px-2">
                          <i class="fas fa-heart font-size-23px"></i>
                        </div>-->
                        <!--virtual icon-->

                        <!--<div class="Img__Overlay"></div>-->
                      </div>
                      <mx-img
                        class="rounded"
                        :img-src="item.photoId"
                        ratio="3/2"
                        :noResponsive="true"
                        alt="Project Image"
                        :errorImageUrl="require('@/assets/images/default_offerPhoto.jpg')">
                      </mx-img>

                    </div>
                    <!--containet section-->
                    <div class="d-flex text-content justify-content-between align-items-center py-1 mt-2">
                      <div class="seenCount p-0 col-auto" v-if="item.offerTitle">
                        <span class="count"
                              v-if="(item.offerTitle.length>15 && item.isOnMuktamel)"

                        >
                          {{item.offerTitle.substring(0,15)+ '...'}}
                        </span>
                        <span class="count"
                              v-if="(item.offerTitle.length>40 && !item.isOnMuktamel)"
                        >
                          {{item.offerTitle.substring(0,40)+ '...'}}
                        </span>
                        <span class="count"
                              v-if="(item.offerTitle.length<=15 && item.isOnMuktamel)||
                                    (item.offerTitle.length<=40 && !item.isOnMuktamel)"
                        >{{item.offerTitle}}
                        </span>

                        <template v-if="photographersList.length>0">
                          <template v-for="(item2,index) in photographersList">
                            <template v-if="item2.id ===item.photographerId">
                              <span class="d-block studio"
                                    v-if="(item2.name.length>15 && item.isOnMuktamel)"

                              >
                                تصوير -
                          {{item2.name.substring(0,15)+ '...'}}
                        </span>
                              <span class="d-block studio"
                                    v-if="(item2.name.length>40 && !item.isOnMuktamel)"
                              >
                                تصوير -
                          {{item2.name.substring(0,40)+ '...'}}
                        </span>
                              <span class="d-block studio"
                                    v-if="(item2.name.length<=15 && item.isOnMuktamel)||
                                    (item2.name.length<=40 && !item.isOnMuktamel)"
                              >
                                تصوير -
                                {{item2.name}}
                        </span>
                            </template>
                          </template>
                        </template>
                      </div>
                      <nuxt-link v-if="item.isOnMuktamel" :to="'./real-estates/'+item.offerId"
                                 class="item-link">
                      <div class="inMuktamel p-1">
                        معروض في مكتمل
                      </div>
                      </nuxt-link>
                    </div>
                  </div>
                </div>

            </template>

            <!--End card-->

            <template>
              <client-only>
                <infinite-loading v-if="hasMorePages" @infinite="nextPage"></infinite-loading>
              </client-only>
            </template>

          </div>
        </section>

      </div>
    </main>
    <br/><br/>
  </section>

</template>
<script src="./virtualTour.js"></script>
<style src="./virtualTour.scss" scoped lang="scss"></style>

