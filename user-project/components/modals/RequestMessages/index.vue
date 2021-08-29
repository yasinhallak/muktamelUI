<template>
  <b-modal
    centered
    v-bind="modalAttribute"
    modal-class="_modal_style_1"
  >
    <template v-slot:modal-header="{ close }">
      <div class=" d-flex justify-content-between align-items-center">

        <h2 :class="status==='fail'?'isFail':
                status==='warning'?'isWarning':
                status==='success'?'isSuccess':
                'text-blue'"
            class="_modal_title text-center">{{title}}</h2>

        <button
          type="button"
          class="close"
          @click="close()"
        >
          <span class="text-blue" aria-hidden="true">&times;</span>
        </button>
      </div>
    </template>


    <!--modal contain-->
    <div class="_modal_contain py-2">
      <p class="_sub_title" v-if="subTitle!==''"
         :class="status==='fail'?'isFail':
                status==='warning'?'isWarning':
                status==='success'?'isSuccess':
                'text-blue'"
      >{{subTitle}}
      </p>
      <p class="_text text-center m-0">
        {{msg}}
      </p>
    </div>

    <!--modal footer-->

    <template v-slot:modal-footer="{ ok, cancel, hide }">
      <div>
        <button v-if="hasCancelButton" data-dismiss="modal" type="button" class="btn btn-outline-primary"
                @click="cancel()">إلغاء
        </button>
        <button v-if="hasOkButton" type="button" data-dismiss="modal" class="btn btn-outline-primary" @click="ok()">
          موافق
        </button>
      </div>
    </template>
  </b-modal>

</template>
<script src="./modalRequestMessages.js"></script>
<style src="./modalRequestMessages.scss"  lang="scss"></style>

