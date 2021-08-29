<template>
  <footer class="website_footer">
    <div class="container-muk w-100 position-relative ">
<!--      <img src="~@/static/Saudi_Buildings_transparent.svg" alt="" class="footer-cover position-absolute bottom-0">-->
      <hr />
      <div :class="$mq<='tablet'?'m-muk-0':''" class="row">
        <!-- Start Logo Section -->
        <div
          class="col-12 col-lg-12 logo align-items-center d-flex justify-content-center"
        >
          <img src="~@/static/logo.svg" />
        </div>
        <!-- Start Logo Section -->

        <div
          class="col-12 col-lg-12 socials align-items-center d-flex justify-content-center"
        >
          <div class="row">
            <div class="col-xs-12 col-sm-12 social_media">
              <ul class="list-group list-group-horizontal">
                <li class="list-group-item border-0">
                  <a href="#"
                  ><span
                    class="d-flex justify-content-center align-items-center rounded-circle"
                  ><i class="mx-icon-instagram"></i></span
                  ></a>
                </li>
                <li class="list-group-item border-0">
                  <a href="#"
                    ><span
                      class="d-flex justify-content-center align-items-center rounded-circle"
                      ><i class="mx-icon-youtube"></i></span
                  ></a>
                </li>

                <li class="list-group-item border-0">
                  <a href="#"
                    ><span
                      class="d-flex justify-content-center align-items-center rounded-circle"
                      ><i class="mx-icon-twitter"></i></span
                  ></a>
                </li>
                <li class="list-group-item border-0">
                  <a href="#"
                    ><span
                      class="d-flex justify-content-center align-items-center rounded-circle"
                      ><i class="mx-icon-facebook"></i></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        class="col-12 col-lg-12 about_us d-flex justify-content-center align-items-center"
      >
        <div class="row">
          <ul class="list-group list-group-horizontal font-size-13px">
            <li class="list-group-item"><nuxt-link to="/about-us">من نحن</nuxt-link></li>
            <li class="list-group-item"><nuxt-link to="/conditions"> شروط الاستخدام</nuxt-link></li>
            <li class="list-group-item"><nuxt-link to="/privacy">سياسة الخصوصية</nuxt-link></li>
            <li class="list-group-item d-muk-none d-muk-md-block"><nuxt-link to="/help">المساعدة</nuxt-link></li>
            <li class="list-group-item d-muk-none d-muk-md-block"><nuxt-link to="/agency-request">تسجيل الشركات</nuxt-link></li>
            <li class="list-group-item "><nuxt-link to="/contact">اتصل بنا</nuxt-link></li>
          </ul>
        </div>
      </div>
      <hr />
      <div class="text-center copyright py-2 direction-ltr">
        <p> جميع الحقوق محفوظة © ٢٠٢٠</p>
      </div>
    </div>
  </footer>
</template>

<script>
/***
 * Created Subhi Al Wattar
 * User: Subhi Al Wattar
 * Date: 7/23/2020
 * Time: 4:18 PM
 ***/
export default {
  name: "m-footer"
};
</script>

<style scoped lang="scss">
@import "@/assets/n-scss/layouts/_footer.scss";
</style>
