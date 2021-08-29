<template>
  <div class="page-holder">

    <div class="container">
      <div class="wizard-holder">
        <div class="wizard">
          <form action="" id="hidden-wizard">
            <!-- the Height of the original land    1-->
            <input type="hidden" name="l" id="l"  value="0" >

            <!-- the Width of the original land    2-->
            <input type="hidden" name="w" id="w"  value="0">

            <!-- the Area of the original land    3-->
            <input type="hidden" name="a" id="a"  value="0">

            <!-- the number of the serounded streets    4-->
            <input type="hidden" name="rn0" id="rn0" value="0">

            <!-- the Height of the street1    5-->
            <input type="hidden" name="vl1" id="vl1"  value="0">

            <!-- the Height of the street2    6-->
            <input type="hidden" name="vl2" id="vl2"  value="0">

            <!-- the Height of the street3    7-->
            <input type="hidden" name="vl3" id="vl3"  value="0">

            <!-- the Height of the street4    8-->
            <input type="hidden" name="vl4" id="vl4" value="0">

            <!-- the Area of the land floor    9-->
            <input type="hidden" name="a0" id="a0"  value="0">

            <!-- the Area of the first floor    10-->
            <input type="hidden" name="a1" id="a1"  value="0">

            <!-- the Area of the upper floor    11-->
            <input type="hidden" name="a2" id="a2"   value="0">

            <!-- the Area of the down floor    12-->
            <input type="hidden" name="a3" id="a3"   value="0">

            <!-- the height of water stor    13-->
            <input type="hidden" name="lw" id="lw"  value="0">

            <!-- the width of water stor    14-->
            <input type="hidden" name="ww" id="ww"  value="0">

            <!-- the height of water out    15-->
            <input type="hidden" name="ls" id="ls"  value="0">

            <!-- the width of water out    16-->
            <input type="hidden" name="ws" id="ws"  value="0">
          </form>

          <section class="land-axes" id="1">
            <header class="header">
              <h3>من فضلك قم بإدخال </h3>
              <h3>أبعاد الارض</h3>
            </header>
            <div class="content">
              <div class="row">
                <div class="col-12">
                  <div class="parent">
                    <div class="row no-gutters">
                      <div class="col-3"><p class="text">  الطول :  </p></div>
                      <div class="col-9">
                        <div class="input">
                          <span class="plus" id="plus1">+</span>
                          <input type="number" id="height" max=50 min=20 step=.5 value=20>
                          <span class="metre">م</span>
                          <span class="minus" id="minus1">-</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="parent mb-0">
                    <div class="row no-gutters">
                      <div class="col-3"><p class="text">  العرض :  </p></div>
                      <div class="col-9">
                        <div class="input">
                          <span class="plus" id="plus2">+</span>
                          <input type="number" id="width" max="50" min="15" step=".5" value="15">
                          <span class="metre">م</span>
                          <span class="minus" id="minus2">-</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row no-gutters justify-content-end">
              <div class="col-9">
                <ul class="result list-unstyled mt-0">
                  <li>مساحة الارض = </li>
                  <li id="area">300</li>
                  <li>متر مربع</li>
                </ul>
              </div>
            </div>


            <div class="arrows justify-content-end">
              <!-- <div class="prev d-none">
                  <div class="img-holder">
                      <img src="images/Icons/prev.png" class="img-fluid" alt="السابق">
                  </div>
                  <p class="text">
                      السابق
                  </p>
              </div> -->
              <div class="next" @click="wizardStep(1,2)">
                <p class="text">
                  التالي
                </p>
                <div class="img-holder">
                  <img src="@/assets/images/Icons/next.png" class="img-fluid" alt="التالي">
                </div>
              </div>
            </div>
          </section>

          <section class="streets-width d-none" id="2">
            <header class="header">
              <h3>ما هي أطوال الجهات التي</h3>
              <h3>تطل على الشارع في أرضك ؟</h3>
            </header>
            <div class="content">
              <div class="full-box">
                <div class="street-box width">
                  <p class="text">
                    <!-- the value coming from js -->
                    15
                  </p>
                </div>
                <div class="street-box width">
                  <p class="text">
                    <!-- the value coming from js -->
                    15
                  </p>
                </div>
                <div class="street-box height">
                  <p class="text">
                    <!-- the value coming from js -->
                    20
                  </p>
                </div>
                <div class="street-box height">
                  <p class="text">
                    <!-- the value coming from js -->
                    20
                  </p>
                </div>
              </div>
            </div>
            <ul class="result-all list-unstyled mt-0">
              <ul class="header list-unstyled mb-2 d-none">
                <li>الأرض تطل على </li>
                <li id="str-num">شارع واحد</li>
              </ul>
              <ul class="result list-unstyled d-none">
                <li>طول الواجهة الأولى  = </li>
                <li class="str-width">0</li>
                <li>متر</li>
              </ul>
              <ul class="result list-unstyled d-none">
                <li>طول الواجهة الثانية = </li>
                <li class="str-width">0</li>
                <li>متر</li>
              </ul>
              <ul class="result list-unstyled d-none">
                <li>طول الواجهة الثالثة = </li>
                <li class="str-width">0</li>
                <li>متر</li>
              </ul>
              <p class="all d-none" id="all"> الأرض تطل على <span>أربع شوارع</span></p>
            </ul>
            <div class="arrows">
              <div class="prev" @click="wizardStep(2,1)">
                <div class="img-holder">
                  <img src="@/assets/images/Icons/prev.png" class="img-fluid" alt="السابق">
                </div>
                <p class="text">
                  السابق
                </p>
              </div>
              <div class="next d-none" @click="wizardStep(2,3)">
                <p class="text">
                  التالي
                </p>
                <div class="img-holder">
                  <img src="@/assets/images/Icons/next.png" class="img-fluid" alt="التالي">
                </div>
              </div>
            </div>
          </section>

          <section class="floor basic d-none" id="3">
            <header class="header mb-5">
              <h3>ما نوع الفيلا</h3>
              <h3>التي تريد بناءها ؟</h3>
            </header>
            <div class="img-container">
              <div class="choise">
                <div class="img-holder" data-row="1turn" @click="wizardStep(3,4)">
                  <img src="@/assets/images/1turn.png" class="img-fluid" alt="فيلا دور" >
                </div>
                <p class="text green"> فيلا دور واحد</p>
              </div>
              <div class="choise">
                <div class="img-holder" data-row="2turn" @click="wizardStep(3,4)">
                  <img src="@/assets/images/2turn.png" class="img-fluid" alt="فيلا دورين" >
                </div>
                <p class="text green">فيلا دورين</p>
              </div>
            </div>
            <div class="arrows">
              <div class="prev" @click="wizardStep(3,2)">
                <div class="img-holder">
                  <img src="@/assets/images/Icons/prev.png" class="img-fluid" alt="السابق">
                </div>
                <p class="text">
                  السابق
                </p>
              </div>
              <!-- <div class="next">
                  <p class="text">
                      التالي
                  </p>
                  <div class="img-holder">
                      <img src="images/Icons/next.png" class="img-fluid" alt="التالي">
                  </div>
              </div> -->
            </div>
          </section>

          <section class="land-area d-none" id="4">
            <header class="header mb-5">
              <h3>من فضلك </h3>
              <h3>أدخل مساحة الدور الارضي</h3>

            </header>
            <div class="content">
              <div class="row">
                <div class="col-12">
                  <div class="parent">
                    <div class="row no-gutters justify-content-center">
                      <div class="col-9">
                        <div class="input">
                          <span class="plus" id="plus3">+</span>
                          <input type="number" id="newArea" step="1" min="100" value="100">
                          <span class="metre">م2</span>
                          <span class="minus" id="minus3">-</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="note">
              <p class="text">
                يجب ألا تزيد مساحة الدور الأرضي عن 70%
                <br>
                من مساحة العقار <span class="all_space"></span>
              </p>
            </div>
            <div class="arrows">
              <div class="prev" @click="wizardStep(4,3)">
                <div class="img-holder">
                  <img src="@/assets/images/Icons/prev.png" class="img-fluid" alt="السابق">
                </div>
                <p class="text">
                  السابق
                </p>
              </div>
              <!-- special step -->
              <div class="next">
                <p class="text">
                  التالي
                </p>
                <div class="img-holder">
                  <img src="@/assets/images/Icons/next.png" class="img-fluid" alt="التالي">
                </div>
              </div>
            </div>
          </section>

          <section class="upper-area d-none" id="5">
            <header class="header mb-5">
              <h3>من فضلك </h3>
              <h3>أدخل مساحة الدور الأول</h3>

            </header>
            <div class="content">
              <div class="row">
                <div class="col-12">
                  <div class="parent">
                    <div class="row no-gutters justify-content-center">
                      <div class="col-9">
                        <div class="input">
                          <span class="plus" id="plus4">+</span>
                          <input type="number" id="upprtArea" step="1" min="100" value="100">
                          <span class="metre">م2</span>
                          <span class="minus" id="minus4">-</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="note">
              <p class="text">
                يجب ألا تزيد مساحة الدور الأول عن 70%
                <br>
                من مساحة العقار <span class="all_space"></span>
              </p>
            </div>
            <div class="arrows">
              <div class="prev" @click="wizardStep(5,4)">
                <div class="img-holder">
                  <img src="@/assets/images/Icons/prev.png" class="img-fluid" alt="السابق">
                </div>
                <p class="text">
                  السابق
                </p>
              </div>
              <div class="next" @click="wizardStep(5,6)">
                <p class="text">
                  التالي
                </p>
                <div class="img-holder">
                  <img src="@/assets/images/Icons/next.png" class="img-fluid" alt="التالي">
                </div>
              </div>
            </div>
          </section>

          <section class="upper appendix-agree basic d-none" id="6">
            <header class="header mb-5">
              <h3> هل ترغب ببناء ملحق علوي ؟</h3>
            </header>
            <div class="content">
              <div class="img-container">
                <div class="choise">
                  <div class="img-holder" @click="wizardStep(6,7)" data-row="yes">
                    <img src="@/assets/images/true.png" class="img-fluid" id="true" alt="موافق">
                  </div>
                  <p class="text green">نعم</p>
                </div>
                <div class="choise">
                  <div class="img-holder" @click="wizardStep(6,8)" data-row="no">
                    <img src="@/assets/images/false.png" class="img-fluid" id="false" alt="غير موافق">
                  </div>
                  <p class="text red">لا</p>
                </div>
              </div>
            </div>
            <div class="arrows">
              <!-- special prev -->
              <div class="prev">
                <div class="img-holder">
                  <img src="@/assets/images/Icons/prev.png" class="img-fluid" alt="السابق">
                </div>
                <p class="text">
                  السابق
                </p>
              </div>
              <div class="next d-none">
                <p class="text">
                  التالي
                </p>
                <div class="img-holder">
                  <img src="@/assets/images/Icons/next.png" class="img-fluid" alt="التالي">
                </div>
              </div>
            </div>
          </section>

          <section class="upupper-area appendix d-none" id="7">
            <header class="header">
              <h3>من فضلك </h3>
              <h3>أدخل مساحة الدور العلوي</h3>
            </header>
            <div class="content">
              <div class="row">
                <div class="col-12">
                  <div class="parent">
                    <div class="row no-gutters justify-content-center">
                      <div class="col-9">
                        <div class="input">
                          <span class="plus" id="plus5">+</span>
                          <input type="number" id="upprtArea" step="1" min="50" value="50">
                          <span class="metre">م2</span>
                          <span class="minus" id="minus5">-</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="note">
              <p class="text">
                يجب ألا تزيد مساحة الملحق العلوي
                <br>
                عن 50% من مساحة الدور الأرضي <span class="all_space"></span>
              </p>
            </div>
            <div class="arrows">
              <div class="prev" @click="wizardStep(7,6)">
                <div class="img-holder">
                  <img src="@/assets/images/Icons/prev.png" class="img-fluid" alt="السابق">
                </div>
                <p class="text">
                  السابق
                </p>
              </div>
              <div class="next" @click="wizardStep(7,8)">
                <p class="text">
                  التالي
                </p>
                <div class="img-holder">
                  <img src="@/assets/images/Icons/next.png" class="img-fluid" alt="التالي">
                </div>
              </div>
            </div>
          </section>

          <section class="down basement-agree basic d-none" id="8">
            <header class="header mb-5">
              <h3> هل ترغب ببناء قبو ؟</h3>
              <h3> (بدروم) </h3>

            </header>
            <div class="content">
              <div class="img-container">
                <div class="choise">
                  <div class="img-holder" @click="wizardStep(8,10)" data-row="yes">
                    <img src="@/assets/images/true.png" class="img-fluid" id="true" alt="موافق">
                  </div>
                  <p class="text green">نعم</p>
                </div>
                <div class="choise">
                  <div class="img-holder" @click="wizardStep(8,11)" data-row="no">
                    <img src="@/assets/images/false.png" class="img-fluid" id="false" alt="غير موافق">
                  </div>
                  <p class="text red">لا</p>
                </div>
              </div>
            </div>
            <div class="arrows">
              <!-- special prev -->
              <div class="prev">
                <div class="img-holder">
                  <img src="@/assets/images/Icons/prev.png" class="img-fluid" alt="السابق">
                </div>
                <p class="text">
                  السابق
                </p>
              </div>
              <div class="next d-none">
                <p class="text">
                  التالي
                </p>
                <div class="img-holder">
                  <img src="@/assets/images/Icons/next.png" class="img-fluid" alt="التالي">
                </div>
              </div>
            </div>
          </section>

          <section class="upupper-area basement d-none" id="10">
            <header class="header mb-5">
              <h3>من فضلك </h3>
              <h3>أدخل مساحة القبو</h3>
            </header>
            <div class="content">
              <div class="row">
                <div class="col-12">
                  <div class="parent">
                    <div class="row no-gutters justify-content-center">
                      <div class="col-9">
                        <div class="input">
                          <span class="plus" id="plus6">+</span>
                          <input type="number" id="upprtArea" step="1" min="50" value="50">
                          <span class="metre">م2</span>
                          <span class="minus" id="minus6">-</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="note">
              <p class="text">
                يسمح بإنشاء القبو
                <br>
                على كامل مسطح الأرض <span class="all_space"></span>
              </p>
            </div>

            <div class="arrows">
              <div class="prev" @click="wizardStep(10,8)">
                <div class="img-holder">
                  <img src="@/assets/images/Icons/prev.png" class="img-fluid" alt="السابق">
                </div>
                <p class="text">
                  السابق
                </p>
              </div>
              <div class="next" @click="wizardStep(10,11)">
                <p class="text">
                  التالي
                </p>
                <div class="img-holder">
                  <img src="@/assets/images/Icons/next.png" class="img-fluid" alt="التالي">
                </div>
              </div>
            </div>
          </section>

          <section class="land-axes tank d-none" id="11">
            <header class="header mb-4">
              <h3>من فضلك</h3>
              <h3>أدخل أبعاد خزان المياه الأرضي</h3>

            </header>
            <div class="content">
              <div class="row">
                <div class="col-12">
                  <div class="parent">
                    <div class="row no-gutters">
                      <div class="col-3"><p class="text">  الطول :  </p></div>
                      <div class="col-9">
                        <div class="input">
                          <span class="plus" id="plus7">+</span>
                          <input type="number" id="height" max="15" min="3" step=".5" value="6" data-minus="true">
                          <span class="metre">م</span>
                          <span class="minus" id="minus7">-</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="parent mb-0">
                    <div class="row no-gutters">
                      <div class="col-3"><p class="text">  العرض :  </p></div>
                      <div class="col-9">
                        <div class="input">
                          <span class="plus" id="plus8">+</span>
                          <input type="number" id="width" max="8" min="2" step=".5" value="4" data-minus="true">
                          <span class="metre">م</span>
                          <span class="minus" id="minus8">-</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row justify-content-end no-gutters">
              <div class="col-12 col-sm-10">
                <div class="note">
                  <div class="yes">
                    <p class="text text-center mb-0">
                      يحسب ارتفاع الخزان (3) متر
                    </p>
                    <ul class="result list-unstyled">
                      <li>حجم خزان المياه الاراضي = </li>
                      <li id="area">72</li>
                      <li>متر مكعب</li>
                    </ul>
                  </div>
                  <div class="no d-none">
                    <p class="text text-center mb-0">
                      لا يوجد خزان مياه
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="arrows">
              <!-- special prev -->
              <div class="prev" @click="wizardStep(11,11)">
                <div class="img-holder">
                  <img src="@/assets/images/Icons/prev.png" class="img-fluid" alt="السابق">
                </div>
                <p class="text">
                  السابق
                </p>
              </div>
              <div class="next" @click="wizardStep(11,12)">
                <p class="text">
                  التالي
                </p>
                <div class="img-holder">
                  <img src="@/assets/images/Icons/next.png" class="img-fluid" alt="التالي">
                </div>
              </div>
            </div>
          </section>

          <section class="land-axes plantation d-none" id="12">
            <header class="header mb-4">
              <h3>من فضلك</h3>
              <h3>أدخل أبعاد بيارة الصرف</h3>

            </header>
            <div class="content">
              <div class="row">
                <div class="col-12">
                  <div class="parent">
                    <div class="row no-gutters">
                      <div class="col-3"><p class="text">  الطول :  </p></div>
                      <div class="col-9">
                        <div class="input">
                          <span class="plus" id="plus9">+</span>
                          <input type="number" id="height" max="15" min="3" value="6" step=".5" data-minus="true">
                          <span class="metre">م</span>
                          <span class="minus" id="minus9">-</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="parent mb-0">
                    <div class="row no-gutters">
                      <div class="col-3"><p class="text">  العرض :  </p></div>
                      <div class="col-9">
                        <div class="input">
                          <span class="plus" id="plus10">+</span>
                          <input type="number" id="width" max="8" min="2" value="4" step=".5" data-minus="true">
                          <span class="metre">م</span>
                          <span class="minus" id="minus10">-</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row no-gutters justify-content-end">
              <div class="col-10">
                <div class="note">
                  <div class="yes">
                    <p class="text text-center mb-0">
                      يحسب ارتفاع  بيارة  الصرف (3) متر
                    </p>
                    <ul class="result list-unstyled">
                      <li>حجم  بيارة  الصرف  = </li>
                      <li id="area">72</li>
                      <li>متر مكعب</li>
                    </ul>
                  </div>
                  <div class="no d-none">
                    <p class="text text-center mb-0">
                      لا يوجد   بيارة  الصرف
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="arrows">
              <div class="prev" @click="wizardStep(12,11)">
                <div class="img-holder">
                  <img src="@/assets/images/Icons/prev.png" class="img-fluid" alt="السابق">
                </div>
                <p class="text">
                  السابق
                </p>
              </div>
              <div class="next" @click="wizardStep(12,13)">
                <p class="text">
                  التالي
                </p>
                <div class="img-holder">
                  <img src="@/assets/images/Icons/next.png" class="img-fluid" alt="التالي">
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- start calculater -->

        <div class="row calc-result d-none no-gutters" id="13" >

          <div class="col-lg-8">

            <div class=" bg-white add_shadow mt-3 py-3 px-3">

              <div class="row texts-div">
                <div class="col-md-6 pl-lg-0 types-con">
                  <div class="row">
                    <div class="col-12">
                      <div class="mb-1 calc_row">
                        <h4 class="mt-1 mb-2">اختر نوع التشطيب</h4>
                      </div>
                    </div>
                  </div>
                  <div class="mb-2 allTypes" id="allTypes1">
                    <div class="type active" id="setActive1" @click="callApi(1)" ><h5 class="mb-1">بناء</h5><h3 class="my-3">عظم</h3></div>
                    <div class="type" @click="callApi(2)"><h5 class="mb-1" >تشطيب</h5><h3 class="my-3">تجاري</h3></div>
                    <div class="type" @click="callApi(3)"><h5 class="mb-1">تشطيب</h5><h3 class="my-3">عادي</h3></div>
                    <div class="type" @click="callApi(4)"><h5 class="mb-1">تشطيب</h5><h3 class="my-3">لوكس</h3></div>
                    <div class="type" @click="callApi(5)"><h5 class="mb-1">تشطيب</h5><h3 class="mt-1 mb-2">سوبر لوكس</h3></div>
                    <div class="type" @click="callApi(6)"><h5 class="mb-1">تشطيب</h5><h3 class="mt-1 mb-2">هاي كلاس</h3></div>
                  </div>

                </div>
                <div class="col-md-6 pr-lg-0  " data-appear-animation="zoomIn" data-appear-animation-delay="1" data-appear-animation-duration="1s">
                  <div class="calc_resault_box mt-0">
                    <h5 class="my-0 text-1">تكاليف </h5>
                    <h6 class="mb-1 mt-2 text-5 text-secondary"> {{$t(`building_finish.${calculatorForm.Finishing}`)}}</h6>
                    <h1 class="mt-1 mb-0 text-primary font-weight-bold"><span class="calc_pm number_font">{{ calculator.totalResult | toComma}}</span> </h1>
                    <h5 class="my-0 text-1">ريال سعودي </h5>
                    <h6 class="mb-1 text-gray text-2 mt-1">هذه التكاليف تقديرية للاسترشاد فقط  <br/>
                      <!-- فقد تختلف الأسعار من مدينة لأخرى ومن مقاول لاخر-->
                    </h6>
                  </div>
                  <div class="mb-2 allTypes mt-3 d-none" id="allTypes2">
                    <div class="type active" id="setActive2" @click="callApi(1)"  :value="1"><h5 class="mb-1">بناء</h5><h3 class="my-3">عظم</h3></div>
                    <div class="type" @click="callApi(2)" :value="2"><h5 class="mb-1">تشطيب</h5><h3 class="my-3">تجاري</h3></div>
                    <div class="type" @click="callApi(3)" :value="3"><h5 class="mb-1">تشطيب</h5><h3 class="my-3">عادي</h3></div>
                    <div class="type" @click="callApi(4)" :value="4"><h5 class="mb-1">تشطيب</h5><h3 class="my-3">لوكس</h3></div>
                    <div class="type" @click="callApi(5)" :value="5"><h5 class="mb-1">تشطيب</h5><h3 class="mt-1 mb-2">سوبر لوكس</h3></div>
                    <div class="type" @click="callApi(6)" :value="6"><h5 class="mb-1">تشطيب</h5><h3 class="mt-1 mb-2">هاي كلاس</h3></div>
                  </div>

                  <h6 class="mt-3 mb-0 text-primary font-weight-semibold text-center">هل تحتاج مقاول ؟</h6>
                  <!--<h6 class="mt-1 mb-2 text-secondary font-weight-semibold text-center">لا تهتم</h6>-->
                  <p class="text-center mb-2">يوفر لك الموقع عشرات المقاولين المؤهلين لتنفيذ منزل أحلامك بأفضل الكفاءات وأنسب الأسعار</p>
                  <nuxt-link :to="setAgencyType">
                     <button type="button" class="btn btn-3d btn-danger btn-block rounded-0 mb-2 font-weight-bold text-4 search">ابحث عن مقاول</button>
                  </nuxt-link>
                </div>

                <p href="#" class="hide_small show_hide text-secondary" data-content="toggle-text">
                  <span>إظهار مواصفات و اشتراطات  التشطيب <i class=" fas fa-angle-down"></i></span>
                  <span class="d-none">إخفاء مواصفات و اشتراطات  التشطيب <i class=" fas fa-angle-up"></i></span>
                </p>
              </div>
              <div>
                <div class="toggle_content">
                  <div class="deails_block_payments px-2 py-2 mt-4">
                    <h4 class="text-secondary">تفاصيل الأسعار</h4>
                    <div class="row justify-content-between no-gutters">
                      <div class="col-12 col-lg-6">
                        <table class="table del-table table-sm">
                          <tbody>
                          <tr class="tab-row" v-if="calculator.landFloor!=0">
                            <th class="text">تكاليف الطابق الأرضي</th>
                            <td class="coloms"> <span> : </span> </td>
                            <td class="number"> {{calculator.landFloor | toComma}} ريال</td>
                          </tr>

                          <tr class="tab-row" v-if="calculator.firstFloor!=0">
                            <th class="text">تكاليف الطابق الأول</th>
                            <td class="coloms"> <span> : </span> </td>
                            <td class="number">{{calculator.firstFloor | toComma}} ريال</td>
                          </tr>

                          <tr class="tab-row" v-if="calculator.extention!=0">
                            <th class="text">تكاليف الملحق</th>
                            <td class="coloms"> <span> : </span> </td>
                            <td class="number">{{calculator.extention | toComma}} ريال</td>
                          </tr>

                          <tr class="tab-row" v-if="calculator.surfaceFence!=0">
                            <th class="text">تكاليف سترة السطح</th>
                            <td class="coloms"> <span> : </span> </td>
                            <td class="number">{{calculator.surfaceFence | toComma}} ريال</td>
                          </tr>

                          <tr class="tab-row" v-if="calculator.spendTank !=0">
                            <th class="text">تكاليف بيارة الصرف</th>
                            <td class="coloms"> <span> : </span> </td>
                            <td class="number">{{calculator.spendTank | toComma}} ريال</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="col-12 col-lg-6">
                        <table class="table table-sm del-table">
                          <tbody>
                          <tr class="tab-row" v-if="calculator.landFence !=0">
                            <th class="text">تكاليف السور</th>
                            <td class="coloms"> <span> : </span> </td>
                            <td class="number">{{calculator.landFence | toComma}} ريال</td>

                          </tr>

                          <tr class="tab-row" v-if="calculator.waterTank!=0">
                            <th class="text">تكاليف خزان المياه</th>
                            <td class="coloms"> <span> : </span> </td>
                            <td class="number">{{calculator.waterTank| toComma}} ريال</td>
                          </tr>

                          <tr class="tab-row" v-if="calculator.exteriorSquare!=0">
                            <th class="text">تكاليف الفناء الخارجي</th>
                            <td class="coloms"> <span> : </span> </td>
                            <td class="number">{{calculator.exteriorSquare | toComma}} ريال</td>
                          </tr>

                          <tr class="tab-row" v-if="calculator.wareHouse !=0">
                            <th class="text">تكاليف القبو</th>
                            <td class="coloms"> <span> : </span> </td>
                            <td class="number"> {{calculator.wareHouse | toComma}} ريال</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="deails_block_payments px-2 py-3 mt-4">
                    <p class="details" v-html="calculator.finishingDescription"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="arrows">
            <div class="prev" >
              <div class="img-holder">
                <img src="@/assets/images/Icons/prev.png" class="img-fluid" alt="السابق">
              </div>
              <p class="text">
                السابق
              </p>
            </div>
          </div>
        </div>

        <!-- end calculater -->
      </div>
    </div>




  </div>
</template>

<script src="./calcWizard.js"></script>
<style src="./calcWizard.css" scoped lang="css">

</style>


