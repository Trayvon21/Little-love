<template>
  <div>
    <div>
      <img src="../../../assets/exit.gif" alt />
      <div class="title">期待您的下次登录</div>
      <el-button type="warning" @click="exit()">退出</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    exit() {
      this.$axios.req("/user/logout").then(res => {
        if (res.code === 0) {
          localStorage.removeItem("username");
          localStorage.removeItem("loginTime");
          sessionStorage.removeItem("table");
          this.$store.state.username = "";
          this.$router.push("/login");
          this.$message({
            showClose: true,
            message: res.message,
            type: "success"
          });
        }
      });
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.title {
  font-size: 24px;
  font-weight: bolder;
  margin: 20px auto;
}
</style>