export default {
  name:"decor-filter",
  props:[
    "primarySpecification",
    "selectedPrimary",
    "selectedSecondary",
    "secondarySpecification",
    "selectedColor",
    "colors",
    "isInMuktamel",
    "isSidebar",
  ],
  data(){
    return{

    }
  },
  mounted() {
  },
  methods:{
    onReloadData(val){
      if(val == 0 ){
        this.$emit("resetData")
      }else{
        this.$emit("reloadData")
      }
    }
  },
  components:{}
}
