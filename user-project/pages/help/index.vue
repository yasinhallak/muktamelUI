<template>
  <section class="help-page">
    <div class="container">

      <!--title row-->
      <div class="row">
        <div class="col-12">
          <h1 class="page-title text-center pt-3">هل تواجهك مشكلة في موقعنا؟</h1>
        </div>
      </div>

      <!--form row -->
      <div class="row d-flex justify-content-center align-items-center py-4">
        <div class="col-md-12 d-flex justify-content-center col-12 order-md-0 order-1">

          <!--form section-->
          <ValidationObserver class="w-100-mobile w-50" v-slot="{ handleSubmit }">
            <form  action="" class="help-form d-flex flex-wrap" @submit.prevent="handleSubmit(sendProblemForm)">
              <!--Message box-->
              <b-form-group
                class="col-12"
                label="ما هي المشكلة التي تواجهك في موقعنا؟"
                label-for="input-message"
              >
                <ValidationProvider rules="required"
                                    v-slot="{errors}">
                  <b-form-textarea rows="3" id="input-message" v-model="problemForm.message"></b-form-textarea>
                  <div class="validation-message ">
                    <span>{{errors[0]}}</span>
                  </div>
                </ValidationProvider>
              </b-form-group>
              <!--Name input-->
              <b-form-group
                class="col-12"
                label="الاسم"
                label-for="input-name"
              >
                <ValidationProvider rules="required"
                                    v-slot="{errors}">
                  <b-form-input id="input-name" v-model="problemForm.name"></b-form-input>
                  <div class="validation-message ">
                    <span>{{errors[0]}}</span>
                  </div>
                </ValidationProvider>
              </b-form-group>
              <!--Email input-->
              <b-form-group
                class="col-12"
                label="البريد الإلكتروني"
                label-for="input-email"
              >
                <ValidationProvider rules="required"
                                    ref="observer"
                                    v-slot="{errors}">
                  <b-form-input id="input-email" v-model="problemForm.email" type="email"></b-form-input>
                  <div class="validation-message ">
                    <span>{{errors[0]}}</span>
                  </div>
                </ValidationProvider>
              </b-form-group>
              <!--submit button-->
              <div class="col-12 d-flex justify-content-center">
                <button>إرسال</button>
              </div>
              <!--recaptcha section-->
              <div class="google-recaptcha"><vue-recaptcha
                @verify="onVerify"
                size="invisible"
                ref="Recaptcha"
                :sitekey="sitekey"
              >
              </vue-recaptcha>
              </div>
              <!--end recaptcha section-->
            </form>
          </ValidationObserver>
          <!--end form section-->

        </div>
      </div>

    </div>
  </section>
</template>

<script src="./help.js"></script>
<style src="./help.scss" scoped lang="scss"></style>

