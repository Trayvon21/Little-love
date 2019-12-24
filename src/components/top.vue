<template>
  <div class="top">
    <div class="top-logo">
      <img src="../assets/logo/logo.jpg" alt />
    </div>
    <div>小爱后台管理系统</div>
    <div v-if="!!username" class="top-user">{{sayHello}}，亲爱的 {{username}}  账号注册时间：{{loginTime}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {
    sayHello() {
      let h = this.$dayjs().format("HH");
      if (h >= 0 && h < 6) return "该睡觉了";
      if (h >= 6 && h < 12) return "早上好";
      if (h >= 12 && h < 14) return "中午好";
      if (h >= 14 && h < 18) return "下午好";
      if (h >= 18 && h < 24) return "晚上好";
    },
    username() {
      return localStorage.getItem("username");
    },
    loginTime() {
      return this.$dayjs(localStorage.getItem("loginTime")).format(
        "YYYY年MM月DD日HH时mm分ss秒"
      );
    }
  }
};
</script>

<style scoped lang='scss'>
.top {
  height: 60px;
  display: flex;
  font-size: 18px;
  color: white;
  line-height: 40px;
  margin-top: 10px;
  position: relative;
  .top-logo {
    img {
      width: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
  .top-user {
    position: absolute;
    right: 20px;
  }
}
</style>