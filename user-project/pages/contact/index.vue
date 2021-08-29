<template>
  <section class="contact-page">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 class="page-title text-center">اتصل بنا</h1>
          <p class="page-subtitle  text-center">نرحب بكافة رسائلكم ويسعدنا تلقي استفساراتكم وآراءكم
            <br>
            لا تترددوا بالتواصل معنا.
          </p>
        </div>
      </div>
      <div class="row align-items-center py-5">
        <div class="col-md-6 col-12 order-md-0 order-1 border-left-md">
          <ValidationObserver v-slot="{ handleSubmit }">
          <form  action="" class="contact-form d-flex flex-wrap" @submit.prevent="handleSubmit(sendForm)">
            <b-form-group
              class="col-12"
              label="الاسم"
              label-for="input-name"
            >
              <ValidationProvider rules="required"
                                  v-slot="{errors}">
                <b-form-input id="input-name" v-model="form.name"></b-form-input>
                <div class="validation-message ">
                  <span>{{errors[0]}}</span>
                </div>
              </ValidationProvider>
            </b-form-group>
            <b-form-group
              class="col-12 col-md-6"
              label="البريد الإلكتروني"
              label-for="input-email"
            >
              <ValidationProvider rules="required"
                                  ref="observer"
                                  v-slot="{errors}">
              <b-form-input id="input-email" v-model="form.email" type="email"></b-form-input>
                <div class="validation-message ">
                  <span>{{errors[0]}}</span>
                </div>
              </ValidationProvider>
            </b-form-group>
            <b-form-group
              class="col-12 col-md-6"
              label="رقم الجوال"
              label-for="input-phone"
            >
              <ValidationProvider rules="required"
                                  v-slot="{errors}">
              <mx-form-phone v-model="form.phone"></mx-form-phone>
                <div class="validation-message ">
                  <span>{{errors[0]}}</span>
                </div>
              </ValidationProvider>
            </b-form-group>
            <b-form-group
              class="col-12"
              label="عنوان الرسالة"
              label-for="input-title"
            >
              <ValidationProvider rules="required"
                                  v-slot="{errors}">
              <b-form-input id="input-title" v-model="form.title"></b-form-input>
                <div class="validation-message ">
                  <span>{{errors[0]}}</span>
                </div>
              </ValidationProvider>
            </b-form-group>
            <b-form-group
              class="col-12"
              label="نص الرسالة"
              label-for="input-message"
            >
              <ValidationProvider rules="required"
                                  v-slot="{errors}">
              <b-form-textarea rows="3" id="input-message" v-model="form.message"></b-form-textarea>
                <div class="validation-message ">
                  <span>{{errors[0]}}</span>
                </div>
              </ValidationProvider>
            </b-form-group>
            <div class="col-12 d-flex">
              <div class="google-recaptcha"><vue-recaptcha
                @verify="onVerify"
                size="invisible"
                ref="Recaptcha"
                @expired="onExpired"
                :sitekey="sitekey"
              >
              </vue-recaptcha></div>
              <button class="mr-auto">إرسال</button>
            </div>
          </form>
          </ValidationObserver>
        </div>
        <div class="col-md-6 col-12 order-md-1 order-0 ">
          <ul class="contact-now">
            <li class="py-1">
              <a class="d-flex align-items-center" :href="'tel:'+ 123456789">
                <i class="mx-icon-phone"></i>
                <span>1234567890</span>
              </a>
            </li>
            <li class="py-1">
              <a class="d-flex align-items-center" :href="'email:'+ 123456789">
                <i class="mx-icon-envelope"></i>
                <span>info@muktamel.com</span>
              </a>
            </li>
          </ul>
          <ul class="follow-us d-flex align-items-center">
            تابعنا عبر
            <li><a href=""><i class="mx-icon-facebook-square"></i></a></li>
            <li><a href=""><i class="mx-icon-twitter-square"></i></a></li>
            <li><a href=""><i class="mx-icon-youtube-square"></i></a></li>
            <li><a href=""><i class="mx-icon-instagram-square"></i></a></li>
            <li><a href=""><i class="mx-icon-linkedin-square"></i></a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script src="./contact.js"></script>
<style scoped lang="scss">
  @import "@/assets/n-scss/pages/contact.scss";
</style>

