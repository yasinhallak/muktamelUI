<template>
  <section class="upload-logo">
    <div class="example-avatar">
      <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
        <h3>Drop files to upload</h3>
      </div>
      <div class="avatar-upload">
        <div class="text-center">
          <!--suppress XmlInvalidId -->
          <label for="file">
            <span class="user_change_photo d-flex align-items-center">
              <i class="mx-icon-camera ml-1 font-size-15px"></i> تغيير الصورة
            </span>

            <img alt="user profile image" :src="imageSrc" class="rounded-circle"/>

          </label>
        </div>
        <div class="text-center p-2">
          <file-upload

            class="d-none"
            :extensions="photosExtensions"
            :accept="photosAccept"
            name="file"
            :post-action="apiBase+postAction"
            :custom-action="uploadImage"
            :drop="!edit"
            v-model="files"
            :headers="{
              authorization: this.$auth.strategy.token.get()
            }"
            @input-filter="inputFilter"
            @input-file="inputFile"
            ref="upload"
          ></file-upload>
        </div>
      </div>
      <b-modal
        @hidden="edit=false"
        title="تعديل الشعار"
        :visible="files.length > 0 && edit"
        hide-footer
      >
        <div class="modal-body">
          <div class="avatar-edit" v-if="files.length && edit">
            <div
              class="avatar-edit-image"
              v-if="files.length"
              style="max-height: 400px; width: 100%"
            >
              <img alt ref="editImage" :src="files[0].url"/>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn background-blue"
            @click.prevent="$refs.upload.clear"
          >
            الغاء
          </button>
          <button
            type="submit"
            class="btn background-blue"
            @click.prevent="editSave"
          >
            حفظ
          </button>
        </div>
      </b-modal>

    </div>
  </section>
</template>

<script>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import FileUpload from "vue-upload-component/dist/vue-upload-component.part.js";

export default {
  name: "uploadLogo",
  components: {
    FileUpload
  },
  props: {
    parentphotos: String,
    maximumFiles: Number,
    photosExtensions: String,
    photosAccept: String,
    name: String,
    postAction: {
      type: String,
      default: "/media/upload"
    }
  },
  data() {
    return {
      files: [],
      edit: false,
      cropper: false,
      apiBase: process.env.apiBaseUrl,
      baseUrl: process.env.imgUrl
    };
  },
  watch: {
    files: function (newVal) {
      this.$emit(
        "update:parentphotos",
        newVal.map(x => x.response.id).toString()
      );
    },
    edit(value) {
      if (value) {
        this.$nextTick(function () {
          if (!this.$refs.editImage) {
            return;
          }
          this.cropper = new Cropper(this.$refs.editImage, {
            aspectRatio: 1,
            viewMode: 1
          });
        });
      } else {
        if (this.cropper) {
          this.cropper.destroy();
          this.cropper = false;
        }
      }
    }
  },
  methods: {
    uploadImage(file,component) {
      let formData = new FormData()
      formData.append("file", file.file)
        this.$axios.post(this.apiBase+ this.postAction,formData, {headers: { 'Content-Type': 'multipart/form-data' }})
          .then(response => {
            this.$auth.fetchUser();
          })
      .catch(e=>{
        console.error(e)
      })
    },
    editSave() {
      this.edit = false;
      let oldFile = this.files[0];
      let binStr = atob(
        this.cropper
          .getCroppedCanvas()
          .toDataURL(oldFile.type)
          .split(",")[1]
      );
      let arr = new Uint8Array(binStr.length);
      for (let i = 0; i < binStr.length; i++) {
        arr[i] = binStr.charCodeAt(i);
      }
      let file = new File([arr], oldFile.name, {type: oldFile.type});
      this.$refs.upload.update(oldFile.id, {
        file,
        type: file.type,
        size: file.size,
        active: true
      });


    },
    inputFile(newFile, oldFile) {
      //new image added
      if (newFile && !oldFile) {
        this.$nextTick(function () {
          this.edit = true;

        });
      }

      //image deleted
      if (!newFile && oldFile) {
        this.edit = false;
      }

      // image updated
      if (newFile && oldFile) {
        if (newFile.success) {
          this.$auth.fetchUser();
        }
      }
    },
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
          this.alert("Your choice is not a picture");
          return prevent();
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        newFile.url = "";
        let URL = window.URL || window.webkitURL;
        if (URL && URL.createObjectURL) {
          newFile.url = URL.createObjectURL(newFile.file);
        }
      }
    },
  },
  computed: {
    imageSrc() {
      if (!this.parentphotos)
        return require("@/assets/images/svg/user.svg")
      return this.baseUrl + this.$auth.user.profile.logo + '.jpg'
    },
  }
};
</script>

<style scoped lang="scss">
.user_change_photo {
  position: absolute;
  bottom: 18px;
  color: #000000;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 2px 7px 2px 7px;
  z-index: 5;
  left: 24px;
  font-size: 12px;
  border-radius: 200px 200px 200px 200px;
  -moz-border-radius: 200px 200px 200px 200px;
  -webkit-border-radius: 200px 200px 200px 200px;
}

@media (max-width: 767.98px) {
  .user_change_photo {
    position: absolute;
    bottom: 18px;
    color: #000000;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 2px 7px 2px 7px;
    z-index: 5;
    left: 24px;
    font-size: 12px;
    border-radius: 200px 200px 200px 200px;
    -moz-border-radius: 200px 200px 200px 200px;
    -webkit-border-radius: 200px 200px 200px 200px;
  }
}

.upload-logo {
  cursor: pointer;

  label {
    cursor: pointer;
  }

  .example-avatar .avatar-upload .rounded-circle {
    width: 100%;
    //height: auto;
    border-radius: 50% !important;
  }

  .example-avatar .text-center .btn {
    margin: 0 0.5rem;
  }

  .example-avatar .avatar-edit-image {
    max-width: 100%;

    img {
      width: 100%;
    }
  }

  .example-avatar .drop-active {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 9999;
    opacity: 0.6;
    text-align: center;
    background: #000;
  }

  .example-avatar .drop-active h3 {
    margin: -0.5em 0 0;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: 40px;
    color: #fff;
    padding: 0;
  }

  .image-drop-box {
    cursor: pointer;
    border: 2px solid #d5d5d5;
    width: 300px;
    height: 200px;
    padding: 15px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    h4 {
      font-size: 17px;
    }

    .icon {
      color: #999;
      font-size: 3rem;
    }
  }

  .upload-box-group {
    display: grid;
    grid-template-columns: repeat(4, 150px);
    grid-auto-rows: 100px;
    grid-gap: 10px;
    padding: 0;

    .upload-box-group-item {
      overflow: hidden;
      margin: 0 5px 5px 5px;
      position: relative;
      border-radius: 8px;
      box-shadow: 0 0 8px 5px #ebebeb;

      .header {
        position: absolute;
        background: #1f74ff;
        color: white;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100%;
        padding: 5px;
        display: none;
      }

      &:first-child {
        border: 1px solid #1f74ff;
        grid-row-start: 1;
        grid-row-end: 3;
        grid-column-start: 1;
        grid-column-end: 3;
        z-index: 0;
        text-align: center;

        .header {
          display: block;
        }
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &:hover {
        .footer {
          opacity: 1;
        }

        .remove {
          opacity: 1;
        }
      }

      .footer {
        opacity: 0;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 30px;
        background: #393939;
        transition: all ease 0.3s;
        text-align: center;

        a {
          color: white;
        }
      }

      .remove {
        position: absolute;
        background: #ffffff;
        color: #5f5f5f;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 5px;
        left: 5px;
        z-index: 9999999;
        transition: all ease 0.3s;
        opacity: 0;
      }
    }
  }
}
</style>
