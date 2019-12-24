<template>
  <div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item
        v-for="(item,index) in arr"
        :key="index"
        :index="item.path"
        @click="goto(item.path)"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      actived: "0",
      arr: [
        { name: "首页", path: "/", icon: "el-icon-s-home" },
        { name: "分页表格", path: "/table", icon: "el-icon-date" },
        { name: "标签页", path: "/tag", icon: "el-icon-document" },
        { name: "图片上传", path: "/upload", icon: "el-icon-upload" },
        { name: "已发表", path: "/publish", icon: "el-icon-upload" },
        { name: "发布文章", path: "/markdown", icon: "el-icon-edit-outline" },
        { name: "统计", path: "/stat", icon: "el-icon-s-marketing" },
        { name: "导出Excel", path: "/query", icon: "el-icon-download" },
        { name: "退出系统", path: "/logout", icon: "el-icon-setting" }
      ]
    };
  },
  components: {},
  methods: {
    goto(path) {
      if (this.$route.path !== path) {
        this.$router.push(path);
      }
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.el-menu-vertical-demo {
  height: 100%;
  text-align: left;
}
</style>