import VRuntimeTemplate from "v-runtime-template";

export default {
  name: "datePicker",
  methods: {
    convertDates: function(a, e, t) {
      var r,
        n,
        i = null;
      try {
        var c = a;
        "ummalqura" == e
          ? ((r = c.split("/")),
            (n =
              "jd" == e
                ? parseFloat($("#jDate").val(), 10)
                : $.calendars
                    .instance(e)
                    .newDate(
                      parseInt(r[0], 10),
                      parseInt(r[1], 10),
                      parseInt(r[2], 10)
                    )
                    .toJD()))
          : "gregorian" == e &&
            ((r = c.split("/")),
            (n =
              "jd" == e
                ? parseFloat($("#jDate").val(), 10)
                : $.calendars
                    .instance(e)
                    .newDate(
                      parseInt(r[0], 10),
                      parseInt(r[1], 10),
                      parseInt(r[2], 10)
                    )
                    .toJD()),
            (i = "ummalqura"));
      } catch (d) {
        return;
      }
      $("#jDate").val(n), showDate(i, n, t);
    },
    validateConvertDate: function(a, e, t) {
      try {
        this.convertDates(a, e, t);
      } catch (r) {}
    },
    showDate: function(a, e, t) {
      var r = "";
      r = t.indexOf("#") > -1 ? t : "." + t;
      try {
        $("#convert *:input[id^=" + a + "]").val("");
        var n = $.calendars.instance(a).fromJD(e),
          i = n.month();
        (n.month() < 10) & (n.month() > 0) && (i = "0" + n.month());
        var c = n.day();
        (n.day() < 10) & (n.day() > 0) && (c = "0" + n.day());
        var d = n.formatYear() + "/" + i + "/" + c;
        $(r).val(d);
      } catch (o) {
        return new Date();
      }
    }
  },
  mounted() {
    this.init();
  }
};
