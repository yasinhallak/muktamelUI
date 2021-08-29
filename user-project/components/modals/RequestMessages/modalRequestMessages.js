
export default {
  name: 'modal-request-messages',
  props: {

    title: {
      default: '',
      type: String
    },

    msg:{
      default: '',
      type:String
    },

    subTitle:{
      default: '',
      type:String
    },

    hasCancelButton:{
      default:false,
      type:Boolean
    },

    hasOkButton:{
      default:false,
      type:Boolean
    },

    status:{
      default:'normal',
      type:String
    },

    modalId : String
  },
  computed: {
    modalAttribute() {
      return {
        ['id']: this.modalId,
      }
    },
  }
}


