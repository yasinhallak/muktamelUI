const base = "https://test.muktamel.com"
const baseUrl2 = `${process.env.baseUrl}`;



const vRoute = new class vRoute {
  constructor() {
    this.base = base;
    this.apiBase = this.base + "/api/v1";
  }

  //1:realEstate
  //2:plane
  //3:project
  //4:agency
  getUrlLink(_typeId){
    if(_typeId === 1){
      return 'real-estates/'
    }
    else if(_typeId === 2){
      return 'plans/'
    }
    else if(_typeId === 3){
      return 'projects/'
    }
    else{
      return 'agencies/'
    }
  }

  createShareUrl(offer,type){
    return `${baseUrl2+'/'+ this.getUrlLink(type)+offer.id}`;
  }

  // create url
  CreateQueryString(object) {
    var newObj = {};
    Object.keys(object).forEach(item => {
      if (typeof object[item] === "Object") {
        let nestedObject = object[item];
       // console.log("newsteobject", nestedObject)
        Object.keys(nestedObject).forEach(nestItem => {
          if (nestedObject[nestItem] !== null && nestedObject[nestItem] !== "" && !(Array.isArray(nestedObject[nestItem]) && nestedObject[nestItem].length === 0))
            newObj[key] = nestedObject[nestItem];
        })
      }
      if (object[item] !== null && object[item] !== "" && !(Array.isArray(object[item]) && object[item].length === 0))
        newObj[item] = object[item];

    })
    let searchQuery = JSON.stringify(newObj);
    //console.log("searchquery:",searchQuery)
    let query= _.isEmpty({searchQuery}) ? '':`?searchQuery=${searchQuery}`;
    return query;
  }
  // get url
  GetQueryString() {
    let data={}
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    let searchQuery = params.get("searchQuery");
    if (searchQuery == null) return;
    try {
       data = JSON.parse(searchQuery);
       //console.log("GetQueryString:",data)
    } catch (error) {

    }
    return data;

  }

  imageUrl(path,size, type = 'jpg') {
    // if (!path)
    //   return `${base}/Images/default_ppt.jpg`;
    // TODO : Return sd back
    if (type && size !== undefined) return `${process.env.imgUrl}${path}-${size}.${type}`;
    return `${process.env.imgUrl}${path}.${type}`;
  }

  logoUrl(path) {
    if (!path)
      return `/_nuxt/assets/images/default-user-placeholder.png`
    return `${base}${path}.jpg`;
  }

  videoLink(path) {
    return `${base}/${path}`;
  }

  whatsAppMsg(msg) {
    let url = encodeURI(msg);
    return `https://api.whatsapp.com/send?text=${url}`;
  }
  twitterMsg(msg) {
    let link = `${process.env.baseUrl}/${msg}`
    let url = encodeURI(link);
    return `https://twitter.com/intent/tweet?text=${url}`;
  }
  facebookMsg(msg) {
    let link = `${process.env.baseUrl}/${msg}`
    let url = encodeURI(link);
    return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  }
  ShareWhatsApp(offer,_type) {
    if (!offer) return;
    let realestatetype = "" //$nuxt.$t("realEstateType." + offer.type);
    let dealType = "" //$nuxt.$t("dealType." + offer.dealType);
    let url = encodeURI(`${realestatetype} ${dealType}
                          ${baseUrl2}${offer.id}`);
    return `https://api.whatsapp.com/send?text=${this.createShareUrl(offer,_type)}`;
  }
  ShareWhatsAppMobile(offer,_type) {
    if (!offer) return;
    let realestatetype = "" //$nuxt.$t("realEstateType." + offer.type);
    let dealType = "" //$nuxt.$t("dealType." + offer.dealType);
    return `whatsapp://send?text==${this.createShareUrl(offer,_type)}`;
  }
  ShareTwitter(offer,_type) {
    if (!offer) return;
    let realestatetype = "" //$nuxt.$t("realEstateType." + offer.type);
    let dealType = "" //$nuxt.$t("dealType." + offer.dealType);
    let url = encodeURI(`${realestatetype} ${dealType}
        ${baseUrl2}${offer.id}`);
    return `https://twitter.com/intent/tweet?text=${this.createShareUrl(offer,_type)}`;
  }

  ShareFacebook(offer,_type) {
    if (!offer) return;
    // console.log(this)
    let realestatetype = "" //$nuxt.$t("realEstateType." + offer.type);
    let dealType = "" //$nuxt.$t("dealType." + offer.dealType);
      // `fb://facewebmodal/sharer/sharer.php?u= ${baseUrl2}${offer.id}`;
    return `https://www.facebook.com/sharer/sharer.php?u=${this.createShareUrl(offer,_type)}`;
  }

  GetOfferLink(offerType, offerId) {
    offerType = "realestate";
    return `${base}/offer/${offerType}/${offerId}`;
  }



}

const vConfig = Object.freeze({
  sa_location: {
    lng: 46.738586,
    lat: 24.774265
  },

  sa_bounds: [32.155635, 16.383766, 55.636082, 34.573349], //North South East West
});

const AgencyType = Object.freeze({
  realestate: 1,
  estatedev: 2,
  engineering: 3,
  financing: 4,
  photography: 5,
  estimator: 6,
  constructor: 7,
  chalet: 8,
  weddingHall: 9,
  playground: 10,
  school: 11,
  hospital: 12,
  trading: 13,
  service: 14,
  auction: 15
});

const vRealEstateType = Object.freeze({
        None :0,
        Villa : 1,
        Duplex : 2,
        House : 3,
        Chalet : 4,
        Palace : 5,
        IndependentFloor : 6,
        Apartment : 7,
        Room : 8,
        Building : 9,
        Compound : 10,
        Land : 11,
        RawLand : 12,
        Office : 13,
        Shop : 14,
        Show : 15,
        Store : 16,
        Mall : 17,
        Hotel : 18,
        Factory : 19,
        Farm : 20
});

const vDealType = Object.freeze({
  forSell: 5,
  forRent: 6,
  auction: 11
});

const vStatistics =Object.freeze({
  SearchAppearCount: 1,
    DetailsShowCount: 2,
    PhoneCount: 3,
    WhatsAppCount: 4,
    MessageCount: 5,
});

const vDefaultAgencyImg= "/_nuxt/assets/images/default_offerPhoto.jpg";
const vDefaultProjectImg="/_nuxt/assets/images/default_offerPhoto.jpg";
const vDefaultRealEstateImg="/_nuxt/assets/images/default_offerPhoto.jpg";
const vDefaultPlanImg="/_nuxt/assets/images/default_offerPhoto.jpg";

export default (context, inject) => {
  inject('vRoute', vRoute)
  inject('vConfig', vConfig)
  inject('AgencyType', AgencyType)
  inject('vDealType', vDealType)
  inject('vRealEstateType', vRealEstateType)
  inject('vStatistics', vStatistics)
  inject('vDefaultAgencyImg', vDefaultAgencyImg)
  inject('vDefaultProjectImg', vDefaultProjectImg)
  inject('vDefaultRealEstateImg', vDefaultRealEstateImg)
  inject('vDefaultPlanImg', vDefaultPlanImg)
}
