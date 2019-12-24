<template >
  <div class="background">
    <div class="frame">
      <div class="title">小爱后台管理系统</div>
      <router-view></router-view>
    </div>
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
  computed: {}
};
</script>

<style scoped lang='scss'>
.background {
  min-width: 1300px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../../assets/background.jpg");
//   background: black;
  background-size: cover;
  .frame {
    width: 500px;
    height: 400px;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5), 0 0 8px rgba(0, 0, 0, 0.5);
    position: absolute;
    border-radius: 0 0 20px 20px;
    top: 30%;
    left: 50%;
    margin-left: -200px;
    .title {
      width: 100%;
      color: white;
      line-height: 50px;
      font-size: 20px;
      background-color: #545c64;
      border-bottom: 1px solid gray;
      text-align: center;
      font-weight: bolder;
      height: 50px;
    }
  }
}
</style>