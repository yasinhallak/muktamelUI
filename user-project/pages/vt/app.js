export default {
  layout: 'mx-empty',

  head() {
    let title = this.getMetaTitle();
    let description = this.getMetaDescription();
    let image;
    if (this.image) {
      image = this.$vRoute.imageUrl(this.image);
    } else {
      let firstSceneId = this.vt.scenes[0].id;
      image = `${this.tilesDomain}/${this.vtId}/${firstSceneId}/thumbnail.jpg`;
    }

    let author = `${this.agency.name} - @muktamel`;
    let link = `${this.$vRoute.base}${this.$route.path}`;

    return {
      title: title,
      bodyAttrs: {
        class: [
          this.vt.scenes.length > 1 ? 'multiple-scenes' : 'single-scene',
          'mx-vt-tour',
          this.$mq === 'mobile' ? 'mobile' : 'desktop',
          this.isTouchable ? 'touch' : 'no-touch'
        ],
        id: "muktamel-body"
      },
      link: [
        {rel: 'stylesheet', href: '/vtv/vendor/reset.min.css'},
      ],
      script: [
        {src: '/vtv/vendor/screenfull.min.js'},
        {src: '/vtv/vendor/marzipano.js'},
        {src: '/vtv/vendor/qrcode.min.js'},
      ],
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {hid: 'description', name: 'description', content: description},
        {name: 'author', content: author},
        {hid: 'robots', name: 'robots', content: 'index,follow'},
        {hid: 'keywords', name: 'keywords', content: ''},
        {name: 'theme-color', content: '#007bff'},
        {name: 'mobile-web-app-capable', content: 'yes'},
        {hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: title},

        {hid: 'og:image', property: 'og:image', content: image},
        {hid: 'og:image:secure_url', property: 'og:image:secure_url', content: image},
        {hid: 'og:image:width', property: 'og:image:width', content: '300'},
        {hid: 'og:image:height', property: 'og:image:height', content: '200'},
        {hid: 'og:title', property: 'og:title', content: title},
        {hid: 'og:description', property: 'og:description', content: description},
        {hid: 'og:url', property: 'og:url', content: link},
        {hid: 'og:site_name', property: 'og:site_name', content: 'muktamel'},
        {hid: 'og:type', property: 'og:type', content: 'product'},

        {name: 'twitter:card', content: description},
        {name: 'twitter:creator', content: author},
        {name: 'twitter:site', content: 'muktamel'},
        {hid: 'twitter:image:src', name: 'twitter:image:src', content: image},
        {hid: 'twitter:title', name: 'twitter:title', content: title},
        {hid: 'twitter:description', name: 'twitter:description', content: description},
        {hid: 'twitter:url', name: 'twitter:url', content: link}
      ]
    }
  },

   asyncData({ redirect,params, $axios}) {
    return $axios.get(`${process.env.apiBaseUrl}offer/virtual-tour?fid=${params.id}`).then((res) => {
      return {agency: res.data.agency,
        offer: res.data.realEstate,
        t: res.data.t,
        vt: res.data.vtData,
        image: res.data.image,
        selectedSceneId:res.data.vtData.scenes[0].id}
    }).catch((e) => {
      redirect('/404')
    })
  },


  data() {
    return {
      agency: null,
      domain: process.env.baseUrl,
      mapKey: process.env.mapEmbedKey,
      apiDomain: process.env.apiBaseUrl,
      imageDomain: process.env.imgUrl,
      tilesDomain: process.env.vtTilesUrl,
      settings: {
        "mouseViewMode": "drag",
        "autorotateEnabled": true,
        "fullscreenButton": true,
        "shareButton": true,
        "agencyInfoButton": true,
        "locationButton": true,
        "offerInfoButton": true,
      },
      selectedFloor: "جميع الطوابق",
      sceneListToggle: true,
      isFullScreen: false,
      isTouchable: false
    }
  },

  computed: {
    vtId() {
      return this.$route.params.id;
    },
    location() {
      // fet offer location if exists
      if (this.offer && this.offer.location)
        return this.offer.location;

      // Get Virtual Tour location from images
      //if (this.vt && this.vt.gpsLat && this.vt.gpsLng)
      //  return {lat: this.vt.gpsLat, lng:this.vt.gpsLng};

      return null;
    },
    url() {
      return `${this.domain}${this.$route.fullPath}`;
    },

    floors() {
      let oldFloors = this.vt.scenes.map(obj => (obj.sceneFloor));
      return oldFloors.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
    },
    hasOneFloor() {
      return this.floors.length === 1;
    },
    viewer() {
      let panoramaElement = document.querySelector('#pano');
      let viewerOpts = {
        controls: {
          mouseViewMode: this.settings.mouseViewMode
        }
      };
      return new this.Marzipano.Viewer(panoramaElement, viewerOpts)
    },
    scenes() {
      return this.vt.scenes.map((scene) => {
        let domain = this.tilesDomain;

        let source = this.Marzipano.ImageUrlSource.fromString(
          `${domain}/${this.vtId}/${scene.id}/{z}/{f}/{y}/{x}.jpg`,
          {cubeMapPreviewUrl: `${domain}/${this.vtId}/${scene.id}/preview.jpg`});
        let geometry = new this.Marzipano.CubeGeometry(scene.levels);

        let limiter = this.Marzipano.RectilinearView.limit.traditional(scene.faceSize, 100 * Math.PI / 180, 120 * Math.PI / 180);
        let view = new this.Marzipano.RectilinearView(scene.initialViewParameters, limiter);

        let mScene = this.viewer.createScene({
          source: source,
          geometry: geometry,
          view: view,
          pinFirstLevel: true
        });

        // Create link hotspots.
        scene.linkHotspots.forEach((hotspot) => {
          let element = this.createLinkHotspotElement(hotspot);
          mScene.hotspotContainer().createHotspot(element, {yaw: hotspot.yaw, pitch: hotspot.pitch});
        });

        // Create info hotspots.
        scene.infoHotspots.forEach((hotspot) => {
          let element = this.createInfoHotspotElement(hotspot);
          mScene.hotspotContainer().createHotspot(element, {yaw: hotspot.yaw, pitch: hotspot.pitch});
        });

        return {
          data: scene,
          scene: mScene,
          view: view
        };
      });
    },
    selectedScene(){
      return this.vt.scenes.find(s => s.id === this.selectedSceneId);
    },

    Marzipano: () => window.Marzipano,
    screenFull: () => window.screenfull,
  },

  methods: {

    getMetaTitle() {
      if (!this.offer) {
        return this.vt.realEstateType + ' | مكتمل';
      }
      let offerType = this.$t(`realEstateType.${this.offer.type}`);
      let dealType = this.$t(`dealType.${this.offer.dealType}`);
      let city = this.$t(`city.${this.offer.address.city}`)
      let district = this.$t(`district.${this.offer.address.district}`)
      let extPrice = this.GetDealType() === this.$vDealType.forSell ? `ريال سعودي` : this.GetDealType() === this.$vDealType.forRent ? `ريال سنوي` : ``;
      return `  مكتمل | ${offerType} ${dealType} في ${district},${city},${this.offer.title}, بسعر ${this.offer.price} ${extPrice}`;
    },
    getMetaDescription() {
      if (!this.offer) {
        return this.vt.realEstateType;
      }
      let allRoomsCount = this.offer.bedroomsCount + this.offer.otherRoomsCount;
      /*let finishingType= this.$t(`building_finish.${this.offer.finishing}`);
      let street='';
      this.offer.streets.forEach(item=>{
        street = street + ' شارع ' +item.width  + ' م2,';
      })*/
      return `الغرف: ${allRoomsCount}, حمام: ${this.offer.bathroomsCount}, المساحة:${this.offer.area}`
      //return `الغرف: ${allRoomsCount}, حمام: ${this.offer.bathroomsCount}, المساحة:${this.offer.area} م2 ,${finishingType} ${street} `
    },

    GetDealType() {
      let dealType = this.offer.dealType;
      if (dealType === 1 || dealType === 3) return 5;
      if (dealType === 2 || dealType === 4) return 6;
      return dealType;
    },

    createLinkHotspotElement: function (hotspot) {
      // Create wrapper element to hold icon and tooltip.
      let wrapper = document.createElement('div');
      wrapper.classList.add('hotspot');
      wrapper.classList.add('link-hotspot');

      // Create image element.
      let icon = document.createElement('img');
      icon.src = '/vtv/' + hotspot.iconSrc;
      icon.classList.add('link-hotspot-icon');

      // Set rotation transform.
      let transformProperties = ['-ms-transform', '-webkit-transform', 'transform'];
      for (let i = 0; i < transformProperties.length; i++) {
        let property = transformProperties[i];
        icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
      }


      // Add click event handler.
      wrapper.addEventListener('click', () => {
        let targetScene = this.scenes.find(s => s.data.id === hotspot.target);
        this.switchScene(targetScene.data);
      });

      // Prevent touch and scroll events from reaching the parent element.
      // This prevents the view control logic from interfering with the hotspot.
      this.stopTouchAndScrollEventPropagation(wrapper);

      // Create tooltip element.
      let tooltip = document.createElement('div');
      tooltip.classList.add('hotspot-tooltip');
      tooltip.classList.add('link-hotspot-tooltip');

      let targetSceneData = this.vt.scenes.find(s => s.id === hotspot.target);
      tooltip.innerHTML = targetSceneData.sceneType;

      wrapper.appendChild(icon);
      wrapper.appendChild(tooltip);

      return wrapper;
    },
    createInfoHotspotElement: function (hotspot) {
      // Create wrapper element to hold icon and tooltip.
      let wrapper = document.createElement('div');
      wrapper.classList.add('hotspot');
      wrapper.classList.add('info-hotspot');

      // Prevent touch and scroll events from reaching the parent element.
      // This prevents the view control logic from interfering with the hotspot.
      this.stopTouchAndScrollEventPropagation(wrapper);
      wrapper.innerHTML = `
        <div class="hotspot mx-info-hotspot">
            <div class="hotspot mx-info-icon">
                    <img src="/vtv/${hotspot.iconSrc}">
                <div class="hotspot mx-info-box">
                    <div class="hotspot mx-info-title">
                        ${hotspot.title}
                    </div>
                    <div class="hotspot mx-info-desc">
                        ${hotspot.text.replace(/<[^>]*>/g, "")}
                    </div>
                </div>
            </div>
        </div>`;
      wrapper.querySelector('.mx-info-hotspot').addEventListener('click', function () {
        wrapper.querySelector('.mx-info-hotspot').classList.toggle('visible')
      });
      wrapper.querySelector('.mx-info-hotspot').addEventListener('mouseenter', function () {
        wrapper.querySelector('.mx-info-hotspot').classList.add('visible')
      });
      wrapper.querySelector('.mx-info-hotspot').addEventListener('mouseleave', function () {
        wrapper.querySelector('.mx-info-hotspot').classList.remove('visible')
      });
      return wrapper;
    },
    stopTouchAndScrollEventPropagation: function (element) {
      // Prevent touch and scroll events from reaching the parent element.
      let eventList = ['touchstart', 'touchmove', 'touchend', 'touchcancel',
        'wheel', 'mousewheel'];
      for (let i = 0; i < eventList.length; i++) {
        element.addEventListener(eventList[i], function (event) {
          event.stopPropagation();
        });
      }
    },
    switchScene: function (sceneData) {
      this.selectedSceneId = sceneData.id;
      let scene = this.scenes.find(s => s.data.id === sceneData.id);

      this.stopAutorotate();
      scene.view.setParameters(scene.data.initialViewParameters);
      scene.scene.switchTo();
      this.startAutorotate();

      // On mobile, hide scene list after selecting a scene.
      if (document.body.classList.contains('mobile')) {
        this.sceneListToggle = false;
      }

    },
    startAutorotate: function () {
      if (!this.settings.autorotateEnabled) {
        return;
      }

      let autorotate = this.Marzipano.autorotate({
        yawSpeed: 0.03,
        targetPitch: 0,
        targetFov: Math.PI / 2
      });
      this.viewer.startMovement(autorotate);
      this.viewer.setIdleMovement(3000, autorotate);
    },
    stopAutorotate: function () {
      this.viewer.stopMovement();
      this.viewer.setIdleMovement(Infinity);
    },

    initQRCode: function () {
      // Create QrCode
      let el = this.$refs.qrcode;
      new QRCode(el, this.url);
    },
    copyToClipboard: function (value) {
      navigator.clipboard.writeText(value).then(
        function () {
        },
        function (err) {
        }
      );

      let el = this.$el.querySelector('#copy-title')
      // change label
      el.innerHTML = 'تم النسخ';
      setTimeout(function () {
        el.innerHTML = 'نسخ الرابط';
      }, 2000);
    },
    toggleFullscreen: function () {
      if (!window || !window.screenfull) {
        return;
      }
      let screenFull = window.screenfull;
      screenFull.toggle(document.documentElement);
    },
    disableRightClick: function () {
      document.oncontextmenu = new Function("return false;");
    },
    disableF12: function () {
      document.onkeypress = function (event) {
        event = (event || window.event);
        if (event.keyCode == 123) {
          return false;
        }
      }
      document.onmousedown = function (event) {
        event = (event || window.event);
        if (event.keyCode == 123) {
          return false;
        }
      }
      document.onkeydown = function (event) {
        event = (event || window.event);
        if (event.keyCode == 123) {
          return false;
        }
      }
    },
    registerFullScreenWatcher: function (){
      // update full screen value
      this.screenFull.on('change', () => {
        this.isFullScreen = this.screenFull.isFullscreen;
      });
    },
    registerTouchableWatcher: function (){
      // update is touchable value
      window.addEventListener('touchstart', () => {
        this.isTouchable = true;
      });
    }
  },

  created() {

  },

  mounted() {
    this.registerFullScreenWatcher();
    this.registerTouchableWatcher();
    this.disableRightClick();
    this.disableF12();
    this.initQRCode();

    // Display the initial scene.
    this.switchScene(this.selectedScene);
  }
}
