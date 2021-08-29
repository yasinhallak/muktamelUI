<template>
  <div>
    <div class="list-menu">
      <input type="checkbox" id="showMenu" name="showMenu" value="1">
      <label class="icon collapsed" for="showMenu">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars"
             class="svg-inline--fa fa-bars fa-w-14" role="img" viewBox="0 0 448 512">
          <path fill="#fff"
                d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"/>
        </svg>
      </label>
      <label class="icon collapse" for="showMenu">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas"
             data-icon="angle-right" class="svg-inline--fa fa-angle-right fa-w-8" role="img" viewBox="0 0 256 512">
          <path fill="#fff"
                d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"/>
        </svg>
      </label>

      <div v-if="settings.fullscreenButton" id="toggle-fullscreen" class="icon" @click="toggleFullscreen">
        <i :class="['fas', isFullScreen?'fa-compress':'fa-expand']"></i>
      </div>

      <div v-if="settings.shareButton" class="icon" data-toggle="modal" data-target="#qrModal">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas"
             data-icon="share-alt" class="svg-inline--fa fa-share-alt fa-w-14" role="img" viewBox="0 0 448 512">
          <path fill="currentColor"
                d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"/>
        </svg>
      </div>
      <div v-if="settings.agencyInfoButton" class="icon" data-toggle="modal" data-target="#agencyModal">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="far"
             data-icon="address-card" class="svg-inline--fa fa-address-card fa-w-18" role="img" viewBox="0 0 576 512">
          <path fill="#fff"
                d="M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 400H48V80h480v352zM208 256c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm-89.6 128h179.2c12.4 0 22.4-8.6 22.4-19.2v-19.2c0-31.8-30.1-57.6-67.2-57.6-10.8 0-18.7 8-44.8 8-26.9 0-33.4-8-44.8-8-37.1 0-67.2 25.8-67.2 57.6v19.2c0 10.6 10 19.2 22.4 19.2zM360 320h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8zm0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8zm0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8z"/>
        </svg>
      </div>
      <div v-if="settings.offerInfoButton && offer" class="icon" data-toggle="modal" data-target="#realEstateModal">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info"
             class="svg-inline--fa fa-info fa-w-6" role="img" viewBox="0 0 192 512">
          <path fill="#fff"
                d="M20 424.229h20V279.771H20c-11.046 0-20-8.954-20-20V212c0-11.046 8.954-20 20-20h112c11.046 0 20 8.954 20 20v212.229h20c11.046 0 20 8.954 20 20V492c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20v-47.771c0-11.046 8.954-20 20-20zM96 0C56.235 0 24 32.235 24 72s32.235 72 72 72 72-32.235 72-72S135.764 0 96 0z"/>
        </svg>
      </div>
      <div v-if="settings.locationButton && location" class="icon" data-toggle="modal" data-target="#mapModal">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas"
             data-icon="map-marker-alt" class="svg-inline--fa fa-map-marker-alt fa-w-12" role="img"
             viewBox="0 0 384 512">
          <path fill="#fff"
                d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
        </svg>
      </div>
    </div>

    <div id="pano">
      <div class="scene-info">
        <div v-if="!hasOneFloor" id="scene-floor">{{selectedScene.sceneFloor}}</div>
        <div id="scene-type" :style=" hasOneFloor ? 'margin:15px 10px': ''">{{selectedScene.sceneType}}</div>
      </div>
    </div>

    <div class="logo">
      <a :href="domain" target="_blank">
        <img src="/vtv/img/logo.svg" alt="Muktamel"/>
      </a>
    </div>

    <div id="sceneList" :class="{enabled:sceneListToggle}">

      <a href="#" id="sceneListToggle" :class="{enabled:sceneListToggle}" @click="sceneListToggle = !sceneListToggle">
        <svg fill="#fff" width="9" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"
             data-prefix="fas" data-icon="angle-left" class="svg-inline--fa fa-angle-left fa-w-8" role="img"
             viewBox="0 0 256 512">
          <path
            d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path>
        </svg>
      </a>
      <h1 class="scenes-title" :class="{'no-floor': hasOneFloor}">{{ vt.realEstateType }}</h1>


      <div v-if="!hasOneFloor" class="select-floor" id="selectFloorElement">
        <select name="selectedFloor" id="selectedFloor" v-model="selectedFloor">
          <option value="جميع الطوابق">
            جميع الطوابق
          </option>
          <option v-for="(floor,i) in floors" :key="i" :value="floor">{{ floor }}</option>
        </select>
      </div>

      <div class="floors-container">
        <template v-for="(floor, index) in floors">
          <div :key="index" v-if="selectedFloor === floor || selectedFloor === 'جميع الطوابق'"
               :class="['floor-box', `floor-${index}`]" :data-floor="floor">
            <div v-if="!hasOneFloor" class="floor-title mt-3">
              <span>{{ floor }}</span>
            </div>
            <ul class="scenes">
              <a v-for="(scene,index2) in vt.scenes.filter(x=>x.sceneFloor === floor )" :key="index2"
                 href="#"
                 class="scene"
                 :class="{current: selectedSceneId === scene.id }"
                 @click="switchScene(scene)"
                 :data-id="scene.id">
                <img :src="`${tilesDomain}/${vtId}/${scene.id}/thumbnail.jpg`">
                <div class="text">{{ scene.sceneType }}</div>
              </a>
            </ul>
          </div>
        </template>
      </div>

    </div>


    <a href="#" id="autorotateToggle">
      <img class="icon off" src="/vtv/img/play.png">
      <img class="icon on" src="/vtv/img/pause.png">
    </a>

    <a href="#" id="fullscreenToggle">
      <img class="icon off" src="/vtv/img/fullscreen.png">
      <img class="icon on" src="/vtv/img/windowed.png">
    </a>


    <a href="#" id="viewUp" class="viewControlButton viewControlButton-1">
      <img class="icon" src="/vtv/img/up.png">
    </a>
    <a href="#" id="viewDown" class="viewControlButton viewControlButton-2">
      <img class="icon" src="/vtv/img/down.png">
    </a>
    <a href="#" id="viewLeft" class="viewControlButton viewControlButton-3">
      <img class="icon" src="/vtv/img/left.png">
    </a>
    <a href="#" id="viewRight" class="viewControlButton viewControlButton-4">
      <img class="icon" src="/vtv/img/right.png">
    </a>
    <a href="#" id="viewIn" class="viewControlButton viewControlButton-5">
      <img class="icon" src="/vtv/img/plus.png">
    </a>
    <a href="#" id="viewOut" class="viewControlButton viewControlButton-6">
      <img class="icon" src="/vtv/img/minus.png">
    </a>


    <!-- AGENCY Modal -->
    <div v-if="agency" class="modal fade" id="agencyModal" tabindex="-1" role="dialog" aria-labelledby="agencyModal"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">تم التصوير بواسطة</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"><i class="fas fa-times"></i></span>
            </button>
          </div>
          <div class="modal-body agency-box text-center">
            <div class="agency-logo  mx-auto">
              <img :src="`${imageDomain}${agency.logo}.jpg`">
            </div>

            <h2 class="agency-name">{{ agency.name }}</h2>

            <div class="agency-office">
              المكتب الرئيسي:

              <ul class="agency-address">
                <li class="agency-address-region">{{ t['region.' + agency.address.region] }}</li>
                -
                <li class="agency-address-city">{{ t['city.' + agency.address.city] }}</li>
              </ul>
            </div>

            <div class="agency-phone">
              رقم الهاتف:
              <a :href="`tel:${agency.contact.phone}`">{{ agency.contact.phone }}</a>
            </div>
            <div class="d-flex justify-content-center">
              <a class="browse-button" :href="`${domain}/agencies/${agency.id}`" target="_blank"> استعراض</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Qr Modal -->
    <div class="modal fade" id="qrModal" tabindex="-1" role="dialog" aria-labelledby="qrModal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">شارك الجولة الافتراضية</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"><i class="fas fa-times"></i></span>
            </button>
          </div>
          <div class="modal-body">
            <div ref="qrcode" id="qrcode"></div>
            <div class="social d-flex align-items-center justify-content-between">
              <a id="facebook" :href="`https://www.facebook.com/sharer/sharer.php?u=${url}`"
                 target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fab"
                     data-icon="facebook-square" class="svg-inline--fa fa-facebook-square fa-w-14" role="img"
                     viewBox="0 0 448 512">
                  <path fill="#3B5998"
                        d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"/>
                </svg>
              </a>
              <a id="twitter" :href="`https://twitter.com/intent/tweet?text=${url}`" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fab"
                     data-icon="twitter-square" class="svg-inline--fa fa-twitter-square fa-w-14" role="img"
                     viewBox="0 0 448 512">
                  <path fill="#1DA1F2"
                        d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z"/>
                </svg>
              </a>
              <a id="whatsapp" :href="`https://api.whatsapp.com/send?text=${url}`" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fab"
                     data-icon="whatsapp-square" class="svg-inline--fa fa-whatsapp-square fa-w-14" role="img"
                     viewBox="0 0 448 512">
                  <path fill="#25D366"
                        d="M224 122.8c-72.7 0-131.8 59.1-131.9 131.8 0 24.9 7 49.2 20.2 70.1l3.1 5-13.3 48.6 49.9-13.1 4.8 2.9c20.2 12 43.4 18.4 67.1 18.4h.1c72.6 0 133.3-59.1 133.3-131.8 0-35.2-15.2-68.3-40.1-93.2-25-25-58-38.7-93.2-38.7zm77.5 188.4c-3.3 9.3-19.1 17.7-26.7 18.8-12.6 1.9-22.4.9-47.5-9.9-39.7-17.2-65.7-57.2-67.7-59.8-2-2.6-16.2-21.5-16.2-41s10.2-29.1 13.9-33.1c3.6-4 7.9-5 10.6-5 2.6 0 5.3 0 7.6.1 2.4.1 5.7-.9 8.9 6.8 3.3 7.9 11.2 27.4 12.2 29.4s1.7 4.3.3 6.9c-7.6 15.2-15.7 14.6-11.6 21.6 15.3 26.3 30.6 35.4 53.9 47.1 4 2 6.3 1.7 8.6-1 2.3-2.6 9.9-11.6 12.5-15.5 2.6-4 5.3-3.3 8.9-2 3.6 1.3 23.1 10.9 27.1 12.9s6.6 3 7.6 4.6c.9 1.9.9 9.9-2.4 19.1zM400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM223.9 413.2c-26.6 0-52.7-6.7-75.8-19.3L64 416l22.5-82.2c-13.9-24-21.2-51.3-21.2-79.3C65.4 167.1 136.5 96 223.9 96c42.4 0 82.2 16.5 112.2 46.5 29.9 30 47.9 69.8 47.9 112.2 0 87.4-72.7 158.5-160.1 158.5z"/>
                </svg>
              </a>
            </div>
            <div class="copy-to-clipboard d-flex justify-content-center">
              <div class="d-flex justify-content-center">
                <button class="view-btn" @click="copyToClipboard(url)">
                  <img src="/vtv/img/link-solid.svg" alt="">
                  <span id="copy-title">نسخ الرابط</span>
                </button>
              </div>
              <input disabled class="vr-url" :value="url" type="text" id="vt-link-text"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- RealEstate Modal -->
    <div v-if="offer" class="modal fade" id="realEstateModal" tabindex="-1" role="dialog"
         aria-labelledby="realEstateModal"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content realestate-card">
          <div class="modal-header">
            <h5 class="modal-title text-truncate"
                :class="{
                  'red-dot':[1,3].includes(offer.dealType),
                  'blue-dot':[2,4].includes(offer.dealType),
                  'green-dot':[11].includes(offer.dealType),
            }">
              <span>{{ t['type.' + offer.type] }}</span>
              <span>{{ t['dealType.' + offer.dealType] }}</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"><i class="fas fa-times"></i></span>
            </button>
          </div>
          <div class="modal-body p-0">
            <div class="image-container">
              <img :src="`${imageDomain}${offer.image}.jpg`">
              <div class="realestate-owner">
                <img :src="`${imageDomain}${offer.agency.logo}.jpg`">
              </div>
            </div>
            <div class="realestate-card-content">
              <h2 class="realestate-price">
                <span>{{ Number(offer.price).toLocaleString() }}</span>
                ريال سعودي
              </h2>
              <h1 class="realestate-title">{{ offer.title }}</h1>
              <ul v-if="offer.address" class="location d-flex align-items-center text-truncate ">
                <i class="icons fas fa-map-marker-alt pl-1"></i>
                <li v-if="offer.address.region">{{ t['region.' + offer.address.region] }}</li>
                <li v-if="offer.address.city">{{ t['city.' + offer.address.city] }}</li>
                <li v-if="offer.address.district">{{ t['district.' + offer.address.district] }}</li>
              </ul>
              <div class="specs-list ">
                <span v-if="offer.bedroomsCount" class="specs-ml">
                  <i class="fas fa-bed"></i>
                  <span> {{ offer.bedroomsCount }}</span>
                  <span>+</span>
                  <span>{{ offer.otherRoomsCount }}</span>
                </span>
                <span v-if="offer.bathroomsCount" class="specs-ml">
                  <i class="fas fa-bath "></i>
                  {{ offer.bathroomsCount }}
                </span>
                <span v-if="offer.buildingArea || offer.area" class="specs-ml">
                  <i class="icons fas fa-expand"></i>
                  {{ offer.buildingArea || offer.area }} م<sup>2</sup>
                </span>
              </div>
              <a class="browse-realestate mx-auto" :href="`${domain}/real-estates/${offer.id}`">شاهد تفاصيل العقار</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Map Modal -->
    <div v-if="location" class="modal fade" id="mapModal" tabindex="-1" role="dialog" aria-labelledby="mapModal"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">موقع العقار</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"><i class="fas fa-times"></i></span>
            </button>
          </div>
          <div class="modal-body p-0">
            <div id="map">
              <iframe width="320"
                      height="320"
                      frameborder="0"
                      style="border:0"
                      :src="`https://www.google.com/maps/embed/v1/place?key=${mapKey}&q=${location.lat},${location.lng}`"
                      allowfullscreen>

              </iframe>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>


<script src="./app.js"></script>
<style src="./style.scss" lang="scss" ></style>

