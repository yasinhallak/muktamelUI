<template>

    <div v-if="enabled" class="col-12 col-md-6 mx-auto">
      <div class="results-message d-flex" >
        <span>أرسم شكلا حول المنطقة التي ترغب أن تعيش فيها</span>
        <span class="clickable px-2 mr-auto" @click="apply">تطبيق</span>
        <span class="clickable px-2" @click="cancel" >إغلاق</span>
      </div>
    </div>

</template>

<script>
import * as VueGoogleMaps from "gmap-vue";

let defaultPolygonOptions = {
  fillColor: '#0099FF',
  fillOpacity: 0.7,
  strokeColor: '#AA2143',
  strokeWeight: 2,
  clickable: false,
  zIndex: 1,
  editable: false
};

export default {
  mixins: [VueGoogleMaps.MapElementMixin],
  props: {
    // to reduce polygon points count
    applyReduce: {
      type: Boolean,
      default: true
    },
    // to join polygons together
    applyUnion: {
      type: Boolean,
      default: true
    },
    // polygon default
    polygonOptions:{
      type: Object,
      default: null
    },
    // kink for polygon reduce
    kink: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      enabled:true,
      polygons:[],
      map:null
    };
  },
  methods: {
    drawFreeHand(map){
      //the polygon
      let poly = new google.maps.Polyline({map:map,clickable:false});

      //mouse move-listener
      let move = google.maps.event.addListener(map,'mousemove',function(e){
        poly.getPath().push(e.latLng);
      });

      //mouseup-listener
      google.maps.event.addListenerOnce(map,'mouseup',(e)=>{
        google.maps.event.removeListener(move);
        let path = poly.getPath();
        poly.setMap(null);

        let theArrayofLatLng = path.getArray();

        if(this.applyReduce){
          let ArrayforPolygontoUse= this.pathReduce(theArrayofLatLng,this.kink);
          path = new google.maps.MVCArray(ArrayforPolygontoUse);
        }else{
          path = new google.maps.MVCArray(theArrayofLatLng);
        }

        /*if(this.applyUnion){
          let p = path.getArray().map(point => [point.lat(),point.lng()]);
          console.log('polygons:',this.polygons);
          let ps = this.polygons.map(poly2 => poly2.getPath().toArray().map(point => [point.lat(),point.lng()] ) );
          console.log('ps:',ps);
          path = pt.union(...ps,p);
        }*/


        let polyOptions ;
        if(this.polygonOptions){
          polyOptions = Object.assign({},defaultPolygonOptions,this.polygonOptions);
        }else{
          polyOptions = Object.assign({},defaultPolygonOptions);
        }

        polyOptions.map = map;
        polyOptions.path = path;

        poly = new google.maps.Polygon(polyOptions);

        this.polygons.push(poly);

      });
    },
    disable(map){
      map.setOptions({
        draggable: false,
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true
      });
    },
    enable(map){
      map.setOptions({
        draggable: true,
        zoomControl: true,
        scrollwheel: true,
        disableDoubleClickZoom: false
      });
    },
    pathReduce (source, kink){
      /* Algorithm based on Ramer–Douglas–Peucker algorithm */
      /* source[] Input coordinates in GLatLngs 	*/
      /* kink	in metres, kinks above this depth kept  */
      /* kink depth is the height of the triangle abc where a-b and b-c are two consecutive line segments */

      let	n_source, n_stack, n_dest, start, end, i, sig;
      let dev_sqr, max_dev_sqr, band_sqr;
      let x12, y12, d12, x13, y13, d13, x23, y23, d23;
      let F = ((Math.PI / 180.0) * 0.5 );
      let index = []; /* aray of indexes of source points to include in the reduced line */
      let sig_start = []; /* indices of start & end of working section */
      let sig_end = [];

      /* check for simple cases */

      if ( source.length < 3 )
        return(source);    /* one or two points */

      /* more complex case. initialize stack */

      n_source = source.length;
      band_sqr = kink * 360.0 / (2.0 * Math.PI * 6378137.0);	/* Now in degrees */
      band_sqr *= band_sqr;
      n_dest = 0;
      sig_start[0] = 0;
      sig_end[0] = n_source-1;
      n_stack = 1;

      /* while the stack is not empty  ... */
      while ( n_stack > 0 ){

        /* ... pop the top-most entries off the stacks */

        start = sig_start[n_stack-1];
        end = sig_end[n_stack-1];
        n_stack--;

        if ( (end - start) > 1 ){  /* any intermediate points ? */

          /* ... yes, so find most deviant intermediate point to
                 either side of line joining start & end points */

          x12 = (source[end].lng() - source[start].lng());
          y12 = (source[end].lat() - source[start].lat());
          if (Math.abs(x12) > 180.0)
            x12 = 360.0 - Math.abs(x12);
          x12 *= Math.cos(F * (source[end].lat() + source[start].lat()));/* use avg lat to reduce lng */
          d12 = (x12*x12) + (y12*y12);

          for ( i = start + 1, sig = start, max_dev_sqr = -1.0; i < end; i++ ){

            x13 = (source[i].lng() - source[start].lng());
            y13 = (source[i].lat() - source[start].lat());
            if (Math.abs(x13) > 180.0)
              x13 = 360.0 - Math.abs(x13);
            x13 *= Math.cos (F * (source[i].lat() + source[start].lat()));
            d13 = (x13*x13) + (y13*y13);

            x23 = (source[i].lng() - source[end].lng());
            y23 = (source[i].lat() - source[end].lat());
            if (Math.abs(x23) > 180.0)
              x23 = 360.0 - Math.abs(x23);
            x23 *= Math.cos(F * (source[i].lat() + source[end].lat()));
            d23 = (x23*x23) + (y23*y23);

            if ( d13 >= ( d12 + d23 ) )
              dev_sqr = d23;
            else if ( d23 >= ( d12 + d13 ) )
              dev_sqr = d13;
            else
              dev_sqr = (x13 * y12 - y13 * x12) * (x13 * y12 - y13 * x12) / d12;// solve triangle

            if ( dev_sqr > max_dev_sqr  ){
              sig = i;
              max_dev_sqr = dev_sqr;
            }
          }

          if ( max_dev_sqr < band_sqr ){   /* is there a sig. intermediate point ? */
            /* ... no, so transfer current start point */
            index[n_dest] = start;
            n_dest++;
          }
          else{
            /* ... yes, so push two sub-sections on stack for further processing */
            n_stack++;
            sig_start[n_stack-1] = sig;
            sig_end[n_stack-1] = end;
            n_stack++;
            sig_start[n_stack-1] = start;
            sig_end[n_stack-1] = sig;
          }
        }
        else{
          /* ... no intermediate points, so transfer current start point */
          index[n_dest] = start;
          n_dest++;
        }
      }

      /* transfer last point */
      index[n_dest] = n_source-1;
      n_dest++;

      /* make return array */
      let r = [];
      for(let i=0; i < n_dest; i++)
        r.push(source[index[i]]);
      return r;

    },

    clear(){
      google.maps.event.clearListeners(this.map.getDiv(), 'mousedown');
      this.polygons.forEach(p => p.setMap(null));
      this.enabled = false;
      this.enable(this.map);
    },
    apply(){
      this.clear();
      this.$emit('applied',this.polygons);
    },
    cancel(){
      this.clear();
      this.$emit('canceled');
    }
},
  created() {
    this.enabled= true;
    this.$mapPromise.then(map => {
      this.map = map;
      this.disable(map)
      google.maps.event.addDomListener(map.getDiv(),'mousedown',(e)=>{
        this.drawFreeHand(map)
      });
    });
  }
};
</script>

<style scoped lang="scss">
.clickable{
  cursor:pointer;
  &:hover{
    background: #2a4a6b;
  }
}
</style>
