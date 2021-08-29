<template>
  <div class="mx-loader text-center">
    <div class="p-2">يرجى الإنتظار</div>
    <div class="p-2">جاري جلب المعلومات المطلوبة</div>
    <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
  </div>
</template>

<script>
export default {
  name: "Spinner",
  data() {
    return {};
  },
};
</script>



