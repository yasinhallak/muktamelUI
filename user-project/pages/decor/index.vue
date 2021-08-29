<template>
  <section class="decor">

    <main class="container-muk">
      <div class="wrapper-grid">
        <div class="filter-col d-none d-md-block">
          <decor-filter
          :primary-specification.sync="primarySpecification"
          :selected-primary.sync="selectedPrimary"
          :selected-secondary.sync="selectedSecondary"
          :secondary-specification.sync="secondarySpecification"
          :selected-color.sync="selectedColor"
          :colors.sync="colors"
          :is-in-muktamel.sync="IsOnMuktamel"
          @reloadData="reloadData"
          @resetData="resetData"
          ></decor-filter>
        </div>

        <section id="gallery" :class="[photoShows.length===0 ? 'empty-gallery' : '']">

          <!--no results-->
          <template v-if="photoShows.length===0">
            <div style="height: calc(100vh - 426px);" class="container">
              <div style="border: solid 1px #70707080;
                          min-height:200px;
                        color:#001324;background: #F5F5F5"
                   class="col-12 font-size-14px pb-3 pt-3 pb-sm-1 pt-sm-1">
                <h1 class="font-size-16px font-weight-bold">لا يوجد نتائج مطابقة لبحثك</h1>
                <p class="m-0 pb-2" style="color: #001324">قم بأحد الإجراءات التالية :</p>
                <ul style="list-style: inside">
                  <li style="line-height: 30px">
                    <a href="#"
                       style="color: #0089FE"
                       @click.prevent="resetData">إزالة محددات البحث</a> </li>
                </ul>
              </div>
            </div>
          </template>

          <!--has results-->
          <template v-if="photoShows.length>0">
            <!--grid-->
            <div class="w-100" v-show="!isActiveDetail">
              <header id="countSort" class="count-sort px-3">
                <div id="countDiv" key="result-count">
                  <span id="pictureNumSpan">عدد النتائج: </span>
                  <span id="countSpan">{{photoShows.length}}</span>
                </div>
                <div id="sortDiv">
                  <label for="sort" key="sort-by">فرز حسب</label>
                  <select name="sort" id="sort" @change="sortSelect($event)">
                    <option v-for="(item,index) in decorSort" :value="item"
                    >{{$t(`decorSort.${item}`)}}</option
                    >
                  </select>
                </div>
                <div id="headerSeenCount" key="header-seen-count">789</div>
              </header>
              <div class="row w-100 m-0">
                <div
                  class="smallCard mb-3 col-12 col-sm-6 col-muk-lg-4 px-3"
                  v-for="(item,index) in photoShows"
                >
                  <div :key="index"
                       class="lightbox-wrapper">
                    <div class="w-100"
                         @click="showDetail(item,index)">
                      <mx-img
                        :img-src="item.path"
                        max-size="sd"
                        ratio="3/2">
                      </mx-img>
                    </div>
                    <div class="d-flex justify-content-between">
                      <div class="seenCount">
                        المشاهدات<span class="count"> {{item.showCount}}</span>
                      </div>
                      <div class="inMuktamel" v-if="item.isOnMuktamel == true">
                        <a :href="'/real-estates/'+item.offerID">معروض في مكتمل</a>
                      </div>
                    </div>
                  </div>
                </div>
                <template>
                  <client-only>
                    <infinite-loading
                      v-if="hasMorePages"
                      @infinite="nextPage"
                    ></infinite-loading>
                  </client-only>
                </template>
              </div>
            </div>
            <!--end gird-->

            <!--detail-->
            <div class="w-100" v-show="isActiveDetail">
              <header  class="count-sort px-3">
                <div id="countDiv" key="result-count">
                  <span id="pictureNumSpan">عدد النتائج: </span>
                  <span id="countSpan">{{photoShows.length}}</span>
                </div>
                <div class="seenCount detail-seen-count">
                  المشاهدات<span class="count">: {{itemDetail.showCount}}</span>
                </div>
              </header>
              <template>
                <div class="px-3 w-100">
                  <b-carousel
                    ref="detailSlider"
                    id="carousel-1"
                    :controls="photoShows.length > 1"
                    :interval="null"
                    @sliding-start="onSlideStart"
                  >
                    <b-carousel-slide v-for="(item,index) in photoShows">
                      <template #img>
                        <mx-img
                          :img-src="item.path"
                          max-size="sd"
                          ratio="3/2">
                        </mx-img>
                      </template>
                    </b-carousel-slide>

                  </b-carousel>

                </div>
                <div class="px-3 w-100 item-detail-content">
                  <div class="wrapper-1">
                    <nuxt-link v-if="itemDetail.offerTitle" :to="'/real-estates/' + itemDetail.offerID"
                               class="item-link">
                    <h2
                        class="detail-title">{{itemDetail.offerTitle}}</h2>
                    </nuxt-link>
                    <nuxt-link v-if="itemDetail.agencyName" :to="'/agencies/' + itemDetail.agencyID"
                               class="item-link">
                    <span
                          class="detail-desc">{{itemDetail.agencyName}}</span>
                    </nuxt-link>
                  </div>
                  <div
                    :class="[!itemDetail.offerTitle && !itemDetail.offerTitle ? 'mt-0 is-first' : '']"
                    class="wrapper-2">
                    <span v-if="itemDetail.description">{{itemDetail.description}}</span>
                  </div>
                  <div class="social-wrapper">
                    <div class="text-center social_share">
                      <a
                        class="twitter_share"
                        :href="twitterShare()"
                        target="_blank"
                        title="Twitter"
                      >
                        <i class="mx-icon-twitter"></i>
                      </a>
                      <a
                        class="whats_share"
                        :href="whatsShare()"
                        target="_blank"
                        title="Whatsapp"
                      >
                        <i class="mx-icon-whatsapp"></i>
                      </a>
                      <a
                        class="facebook_share"
                        :href="shareFacebook()"
                        target="_blank"
                        title="Facebook"
                      >
                        <i class="mx-icon-facebook"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </template>

            </div>
            <!--end detail-->
          </template>

        </section>
      </div>
    </main>
    <br /><br />


    <div v-b-toggle.filter-sidebar class="mobile-filter-toggle">
      <i class="mx-icon-filter"></i>
    </div>

    <b-sidebar v-model="isVisibleSidebar" ref="filterSidebar" width="auto" id="filter-sidebar"
               backdrop class="d-block d-md-none" shadow>
      <div class="px-3 py-2">
        <decor-filter
          :primary-specification.sync="primarySpecification"
          :selected-primary.sync="selectedPrimary"
          :selected-secondary.sync="selectedSecondary"
          :secondary-specification.sync="secondarySpecification"
          :selected-color.sync="selectedColor"
          :colors.sync="colors"
          :is-in-muktamel.sync="IsOnMuktamel"
          :is-sidebar="true"
          @reloadData="reloadData"
          @resetData="resetData"
        ></decor-filter>
      </div>
    </b-sidebar>

  </section>

</template>
<script src="./decor.js"></script>
<style src="./decor.scss" lang="scss"></style>
