
class CalculatorFrom{
  constructor(){
    this.Finishing=1;
    this.L=null; // Land Length
    this.W=null; // Land width
    this.A=null; // Land Area
    this.VL1=null; // the length of land that face the street 1
    this.VL2=null; // the length of land that face the street 2
    this.VL3=null; // the length of land that face the street 3
    this.VL4=null; // the length of land that face the street 4
    this.A0=null; // the area of land floor
    this.A1=null; // the area of first floor
    this.A2=null; // the area of second floor
    this.A3=null; // the area of warehouse
    this.Lp=null; // design Length
    this.Wp=null; // design width
    this.Lw=null; // water tank width
    this.Ww=null; // water tank width
    this.Ls=null; // saref bayara Length
    this.Ws=null;  // saref bayara width

  }
}



export default {
  name: "calcWizard",
  data() {
    return {
      calculatorForm:new CalculatorFrom(),
      calculator: {
        totalResult: 0
      },
    };
  },
  methods:{

      // the main function of wizard to show the (next or prev) step and hide the current one
      wizardStep(curStep, reqStep) {
        $("#" + curStep).addClass("d-none");
        $("#" + reqStep).removeClass("d-none");
      },

      // call api calc wizard
      callApi(finishingType){
            this.$axios.post('/offer/engineering/calculator', this.getDate(finishingType))
            .then(
            response => {
              this.calculator= response.data;

              // $(".wizard").addClass("d-none");
              // $(".calc-result").removeClass("d-none");
            }
            ).catch(function (error) {
            console.log(error);
            alert('حدث خطأ')
            })
       },

      getDate(finishingType){
       this.calculatorForm.Finishing=finishingType;
       this.calculatorForm.L=$("#l").val();
       this.calculatorForm.W=$("#w").val();
       this.calculatorForm.A=$("#a").val();
       this.calculatorForm.VL1=$("#vl1").val();
       this.calculatorForm.VL2=$("#vl2").val();
       this.calculatorForm.VL3=$("#vl3").val();
       this.calculatorForm.VL4=$("#vl4").val();
       this.calculatorForm.A0=$("#a0").val();
       this.calculatorForm.A1=$("#a1").val();
       this.calculatorForm.A2=$("#a2").val();
       this.calculatorForm.A3=$("#a3").val();
       this.calculatorForm.Lw=$("#lw").val();
       this.calculatorForm.Ww=$("#ww").val();
       this.calculatorForm.Ls=$("#ls").val();
       this.calculatorForm.Ws=$("#ws").val();
       return this.calculatorForm;
     },

  },

  computed:{
    setAgencyType(){
      let object={
        "type":7,
      };
      let url=  this.$vRoute.CreateQueryString(object);
      return  `/agencies${url}`;
    }
  },

  mounted() {

    var wizard = $(window).height() - $("#header").height() - $(".website_footer").outerHeight(true);

    $(".page-holder").css({
      "padding-bottom": $(".website_footer").outerHeight(true)
    });

    // set the min height of wizard to fill the screen
    $(".wizard-holder").css({
      "min-height": wizard
    });


    $(window).resize(function () {
      var wizard = $(window).height() - $("#header").height() - $(".website_footer").outerHeight(true);

      $(".page-holder").css({
        "padding-bottom": $(".website_footer").outerHeight(true)
      });

      // set the min height of wizard to fill the screen
      $(".wizard-holder").css({
        "min-height": wizard
      });
    })


    // using the row to specify where the user must go in the special cases
    var row = [];


    $(".parent").each(function () {

      $(this).find(".input .plus").on("click", plus);
      $(this).find(".input .minus").on("click", minus);
      $(this).find(".input input").on("blur", blur);

    })

    $(".streets-width .full-box .street-box").each(function () {
      var str = ["شارع واحد", "شارعين", "ثلاث شوارع", "...."];

      $(this).on("click", function () {

        $(this).toggleClass("active");
        $(".streets-width .arrows .next").removeClass("d-none");
        $(".result-all .header").removeClass("d-none");
        var x = 0;
        var num = [];
        $(".full-box .active").each(function () {

          num.push($(this).children(".text").text());

          x++;
          if (x <= 3) {

            $(".streets-width .result-all .header").removeClass("d-none");
            $(".streets-width .result-all .all").addClass("d-none");
            $(".streets-width .result-all .header #str-num").text(str[x - 1]);
            $(".streets-width .result-all .result").each(function () {
              $(this).addClass("d-none");
            })
            for (var i = 0; i <= x - 1; i++) {
              $(".streets-width .result-all .result").eq(i).removeClass("d-none");
              $(".streets-width .result-all .result").eq(i).find(".str-width").text(num[i]);
              $("#hidden-wizard #vl" + (i + 1) + "").val(num[i]);
            }

          } else if (x == 4) {
            $(".streets-width .result-all .all").removeClass("d-none").siblings().addClass("d-none");
            $(".streets-width .result-all .result").each(function () {
              $(this).addClass("d-none");
            })

            for (var i = 0; i <= x - 1; i++) {
              $(".streets-width .result-all .result").eq(i).find(".str-width").text(num[i]);
              $("#hidden-wizard #vl" + (i + 1) + "").val(num[i]);
            }

          }
        })

        $("#hidden-wizard #rn0").val(num.length);

        // good
        if (x == 0) {
          $(".streets-width .full-box .street-box").eq(0).addClass("active");
          $(".streets-width .result-all .result .str-width").eq(0).text($(".streets-width .full-box .street-box.active .text").text());
          $("#hidden-wizard #vl1").val($(".streets-width .full-box .street-box.active .text").text());
          $("#hidden-wizard #rn0").val(1);
        }



      })
    })

    // Special Steps for Wizard Next and Prev
    $("#3 .choise").each(function () {
      $(this).find(".img-holder").on("click", function () {
        row[0] = $(this).data("row");
      })
    })

    $("#4 .next").on("click", function () {

      if (row[0] == "1turn") {
       wizardStep(4, 6);
      }

      if (row[0] == "2turn") {
        wizardStep(4, 5);
      }

    })

    $("#6 .prev").on("click", function () {

      if (row[0] == "1turn") {
        wizardStep(6, 4);

      }

      if (row[0] == "2turn") {
        wizardStep(6, 5);
      }

    })

    $("#6 .choise").each(function () {
      $(this).find(".img-holder").on("click", function () {
        row[1] = $(this).data("row");
      })
    })

    $("#8 .prev").on("click", function () {

      if (row[1] == "yes") {
        wizardStep(8, 7);
      }

      if (row[1] == "no") {
        wizardStep(8, 6);
      }

    })

    $("#8 .choise").each(function () {
      $(this).find(".img-holder").on("click", function () {
        row[2] = $(this).data("row");
      })
    })

    $("#11 .prev").on("click", function () {

      if (row[2] == "yes") {
        wizardStep(11, 10);
      }

      if (row[2] == "no") {
        wizardStep(11, 8);
      }

    })


    // only last step
    $("#12 .next").on("click",  ()=>{
      this.callApi(1)
      $(".wizard").addClass("d-none");
    })

    // only last step
    $("#13 .prev").on("click",  ()=>{
      // in case  descktop
      $("#allTypes1 .type").removeClass('active')
      $("#setActive1").addClass('active')
      // in case taplet
      $("#allTypes2 .type").removeClass('active')
      $("#setActive2").addClass('active')
      $(".wizard").removeClass("d-none");
      $(".calc-result").addClass("d-none");
    })


    // when the has focus event it's remove the focus form it and set focus on it's parent
    $("input").on("focus", function () {
      $(this).parent(".input").css({
        outline: "-webkit-focus-ring-color auto 1px"
      });
      $(this).css({
        outline: "-webkit-focus-ring-color auto 0px"
      })

    })
    // when the has blur event it's remove the focus it's parent
    $("input").on("blur", function () {
      $(this).parent(".input").css({
        outline: "-webkit-focus-ring-color auto 0px"
      });
      $(this).css({
        outline: "-webkit-focus-ring-color auto 0px"
      })
      Inputs()
    })

    // to Change the location of the result wizard section According to the window width on resize
    $(window).resize(function () {

      if ($(window).width() < 768) {
        $("#allTypes2").removeClass("d-none");
        $("#allTypes1").addClass("d-none");
      } else {
        $("#allTypes2").addClass("d-none");
        $("#allTypes1").removeClass("d-none");
      }
    })
    // to Change the location of the result wizard section According to the window width
    if ($(window).width() < 768) {
      $("#allTypes2").removeClass("d-none");
      $("#allTypes1").addClass("d-none");
    } else {
      $("#allTypes2").addClass("d-none");
      $("#allTypes1").removeClass("d-none");
    }

    // when click on plus
    function plus() {
      console.log("plus")
      var $input = $(this).siblings("input");
      var val = parseFloat($input.val());
      var maxVal = parseFloat($input.attr("max"));
      var minVal = parseFloat($input.attr("min"));
      var step = parseFloat($input.attr("step"));

      if (val < minVal) {
        $input.val(minVal.toFixed(2));
      } else if (val < maxVal) {
        val = parseFloat(val) + step;
        $input.val(val.toFixed(2));
      } else {
        $input.val(val.toFixed(2));
      }

      Inputs();
    }

    // when click on minus
    function minus() {
      var $input = $(this).siblings("input");
      var val = parseFloat($input.val());
      var maxVal = parseFloat($input.attr("max"));
      var minVal = parseFloat($input.attr("min"));
      var step = parseFloat($input.attr("step"));

      if ($input.data("minus") == true && val == minVal) {
        $input.val(0);
      }

      if (val > minVal) {
        val = parseFloat(val) - step;
        $input.val(val.toFixed(2));
      }

      Inputs();
    }

    // the diffrence between blur it takes the min value if it's val min than applicable min value or take 0 in special case
    function blur() {
      var minVal = parseInt($(this).attr("min"));
      var maxVal = parseInt($(this).attr("max"));

      if ($(this).val() > maxVal) {
        $(this).val(maxVal.toFixed(2));
      } else if ($(this).val() < minVal) {
        // special case
        if ($(this).data("minus") == true) {
          $(this).val(0);
        } else {
          // normal case
          $(this).val(minVal.toFixed(2));
        }
      } else {
        var newVal = parseFloat($(this).val());
        newVal = parseFloat(newVal.toFixed(2));
        $(this).val(newVal.toFixed(2));
      }
      Inputs();
    }

    // Filling All Inputs For Backend
    function  Inputs() {

    //  console.log("Inputs")

      var height = $("#1 #height").val();
      var width = $("#1 #width").val();


      if (height > width) {
        $("#hidden-wizard #l").val(height);
        $("#hidden-wizard #w").val(width);
      } else {
        $("#hidden-wizard #l").val(width);
        $("#hidden-wizard #w").val(height);
      }

      //  area of land

      $("#hidden-wizard #a").val(($("#1 #height").val() * $("#1 #width").val()).toFixed(2));
      $(".land-axes .result #area").text($("#hidden-wizard #a").val());
      if ($("#hidden-wizard #a").val() != 0) {
        $("#1 .arrows .next").removeClass("d-none");
      }
      // sreets
      $(".streets-width .full-box .street-box.height").each(function () {
        $(this).find(".text").text($("#hidden-wizard #l").val())
      })

      $(".streets-width .full-box .street-box.width").each(function () {
        $(this).find(".text").text($("#hidden-wizard #w").val())
      })

      // area of land floor
      $("#4 .parent .input input").attr("max", ($("#hidden-wizard #a").val() * 70) / 100);
      $("#4 .all_space").html('('+$("#hidden-wizard #a").val() +'م2)');
      $("#hidden-wizard #a0").val($("#4 .parent .input input").val());

      if ($("#hidden-wizard #a0").val() != 0) {
        $("#4 .arrows .next").removeClass("d-none");
      }

      // area of first floor
      $("#5 .parent .input input").attr("max", ($("#hidden-wizard #a").val() * 70) / 100);
      $("#5 .all_space").html('('+$("#hidden-wizard #a").val() +'م2)');
      $("#hidden-wizard #a1").val($("#5 .parent .input input").val());
      if ($("#hidden-wizard #a1").val() != 0) {
        $("#5 .arrows .next").removeClass("d-none");
      }
      // area of extension floor
      $("#7 .parent .input input").attr("max", ($("#hidden-wizard #a0").val() * 50) / 100);
      $("#7 .all_space").html('('+$("#hidden-wizard #a0").val() +'م2)');
      $("#hidden-wizard #a2").val($("#7 .parent .input input").val());
      if ($("#hidden-wizard #a2").val() != 0) {
        $("#7 .arrows .next").removeClass("d-none");
      }
       // مساحة القبو
      $("#10 .parent .input input").attr("max", $("#hidden-wizard #a").val());
      $("#10 .all_space").html('('+$("#hidden-wizard #a").val() +'م2)');
      $("#hidden-wizard #a3").val($("#10 .parent .input input").val());
      if ($("#hidden-wizard #a3").val() != 0) {
        $("#10 .arrows .next").removeClass("d-none");
      }

      // مساحة الخزان الأرضي
      $("#11 .note .no").addClass("d-none");
      $("#11 .note .yes").removeClass("d-none");
      $("#hidden-wizard #lw").val($("#11 .parent .input input#height").val());
      $("#hidden-wizard #ww").val($("#11 .parent .input input#width").val());
      $("#11 .result #area").text(($("#hidden-wizard #lw").val() * $("#hidden-wizard #ww").val() * 3).toFixed(2))
      if ($("#hidden-wizard #lw").val() == 0 || $("#hidden-wizard #ww").val() == 0) {
        $("#11 .note .yes").addClass("d-none");
        $("#11 .note .no").removeClass("d-none");
        $("#12 .arrows .next").removeClass("d-none");
      }
      $("#11 .arrows .next").removeClass("d-none");


      // مساحة بيارة الصرف
      $("#12 .note .no").addClass("d-none");
      $("#12 .note .yes").removeClass("d-none");
      $("#hidden-wizard #ls").val($("#12 .parent .input input#height").val());
      $("#hidden-wizard #ws").val($("#12 .parent .input input#width").val());
      $("#12 .result #area").text(($("#hidden-wizard #ls").val() * $("#hidden-wizard #ws").val() * 3).toFixed(2))
      if ($("#hidden-wizard #ls").val() == 0 || $("#hidden-wizard #ws").val() == 0) {
        $("#12 .note .yes").addClass("d-none");
        $("#12 .note .no").removeClass("d-none");
        $("#12 .arrows .next").removeClass("d-none");
      }

      if (row[0] == "1turn") {
        $("#hidden-wizard #a1").val(0);
      }

      if (row[1] == "no") {
        $("#hidden-wizard #a2").val(0);
      }

      if (row[2] == "no") {
        $("#hidden-wizard #a3").val(0);
      }

    }


    // When hit Enter the focus will change from the first input to the all next.
    $(document).on('keydown', function (e) {
      if (e.keyCode === 13) { // Enter
        $(this).find("input").focus();
      }
    });

    // When hit next icon will remove the foucus from all input
    $(".next").each(function () {
      $(this).on("click", function () {
        $(document).find("input").blur();
      })
    })

    // to hide and  show the detaild table.
    $(".toggle_content").hide();
    $(".show_hide").on("click", function () {
      $(this).children().toggleClass("d-none");
      $('.toggle_content').slideToggle(450);
    });

    $(".allTypes .type").each(function () {
      $(this).on("click", function () {
        // to change the active class when the button clicked
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        // to hide and  show the detaild table when click on any button
        if ($(".toggle_content").is(':visible')) {
          $('.toggle_content').slideToggle(450);
          $(".show_hide").children().toggleClass("d-none");
        }
      })
    })

    // to hide and  show the detaild table when click on search button
    $(".search").on("click", function () {
      if ($(".toggle_content").is(':visible')) {
        $('.toggle_content').slideToggle(450);
        $(".show_hide").children().toggleClass("d-none");
      }
    })
    $("#13 .prev").on("click", function () {

      if ($(".toggle_content").is(':visible')) {
        $('.toggle_content').slideToggle(450);
        $(".show_hide").children().toggleClass("d-none");
      }
      wizardStep(13,12);
    })

    // the main function of wizard to show the (next or prev) step and hide the current one
    function wizardStep(curStep, reqStep) {
      $("#" + curStep).addClass("d-none");
      $("#" + reqStep).removeClass("d-none");
    }

    function holdMousePlus(Add) {


      var $input = $(Add).siblings("input");
      var val = parseFloat($input.val());
      var maxVal = parseInt($input.attr("max"));
      var minVal = parseInt($input.attr("min"));
      var step = parseFloat($input.attr("step"));



      var setint = '';

      $(Add).on('mousedown', function (e) {
        clearInterval(setint);

        val = parseFloat($input.val());

        setint = setInterval(function(){

          if (val < minVal) {
            $input.val(minVal.toFixed(2));
            console.log("One");
          } else if (val < maxVal) {
            val = parseFloat(val) + step;
            $input.val(val.toFixed(2));
            console.log("Two");
          } else {
            $input.val(val.toFixed(2));
            console.log("Three");
          }
        } , 250);
      });

      $(Add).on("mouseleave mouseup", function () {
        val = parseFloat($input.val());
        $input.val(val.toFixed(2));
        clearInterval(setint);
        Inputs();
      });

    }

    function holdMouseMinus(Add) {


      var $input = $(Add).siblings("input");
      var val = parseFloat($input.val());
      var maxVal = parseInt($input.attr("max"));
      var minVal = parseInt($input.attr("min"));
      var step = parseFloat($input.attr("step"));



      var setint = '';

      $(Add).on('mousedown', function (e) {
        clearInterval(setint);

        val = parseFloat($input.val());

        setint = setInterval( function(){

          if ($input.data("minus") == true && val == minVal) {
            $input.val(0);
          }

          if (val > minVal) {
            val = parseFloat(val) - step;
            $input.val(val.toFixed(2));
          }

        } , 250);
      });

      $(Add).on("mouseleave mouseup", function () {
        val = parseFloat($input.val());
        $input.val(val.toFixed(2));
        clearInterval(setint);
        Inputs();
      });

    }

    holdMousePlus("#plus1");
    holdMousePlus("#plus2");
    holdMousePlus("#plus3");
    holdMousePlus("#plus4");
    holdMousePlus("#plus5");
    holdMousePlus("#plus6");

    holdMouseMinus("#minus1");
    holdMouseMinus("#minus2");
    holdMouseMinus("#minus3");
    holdMouseMinus("#minus4");
    holdMouseMinus("#minus5");
    holdMouseMinus("#minus6");

    $("#1 .next").on("click", function () {
      for(var i = 3 ; i < 11 ; i++){
        holdMousePlus("#plus" + i);
        holdMouseMinus("#minus" + i);
        console.log(i);
      }
    })
  },



}







