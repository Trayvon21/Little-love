<template>
  <el-container class="container">
    <el-header>
      <top />
    </el-header>
    <el-container class="main">
      <el-aside width="240px">
        <asides class="aside" />
      </el-aside>
      <el-main>
        <keep-alive include="markdown">
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import asides from "../components/control/Aside";
import top from "../components/top";
export default {
  data() {
    return {};
  },
  components: {
    asides,
    top
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.container {
  position: absolute;
  min-width: 1200px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.aside {
  height: 100%;
}
.top-container {
  height: 60px;
}
.el-header {
  background-color: rgb(84, 92, 100);
  color: #333;
}
.el-aside {
  background-color: rgb(84, 92, 100);
  color: #333;
  height: 100%;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
</style>