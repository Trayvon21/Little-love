<template>
  <div>
    <div class="title">element-UI上传</div>
    <el-upload class="upload-demo" drag action="/api/upload" multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <div class="title">vue-image-crop-upload上传</div>
    <div>
      <div>
        <el-button class="btn" @click="toggleShow">点击上传</el-button>
      </div>
      <my-upload
        field="file"
        @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
        v-model="show"
        :width="300"
        :height="300"
        url="/api/upload"
        img-format="png"
      ></my-upload>
      <img v-if="imgDataUrl" :src="imgDataUrl" />
    </div>
  </div>
</template>

<script>
import myUpload from "vue-image-crop-upload";
export default {
  data() {
    return {
      show: false,
      imgDataUrl: ""
      // fileList: []
    };
  },
  components: {
    "my-upload": myUpload
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------");
      this.imgDataUrl = imgDataUrl;
    },
    /**
     * upload success
     *
     * [param] jsonData   服务器返回数据，已进行json转码
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData);
      console.log("field: " + field);
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
    }
  }
};
</script>

<style scoped lang='scss'>
.title{
  width: 400px;
  font-size: 20px;
  line-height: 30px;
  background: skyblue;
  margin: 10px auto;
}
</style>