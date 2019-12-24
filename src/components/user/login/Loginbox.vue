<template>
  <div>
    <div></div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="用  户" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密  码" prop="passwd">
        <el-input type="password" v-model="ruleForm.passwd"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="check">
        <div class="code">
          <el-input
            type="text"
            v-model="ruleForm.check"
            class="check"
            @keyup.enter="login('ruleForm')"
          ></el-input>
          <div v-html="captcha" @click="getcaptcha()"></div>
        </div>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="login('ruleForm')">登录</el-button>
        <el-button type="warning" @click="cancel('ruleForm')">重置</el-button>
        <el-button @click="$router.push('/register')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      captcha: "",
      ruleForm: {
        username: "",
        passwd: "",
        check: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { pattern: /^[^\u4e00-\u9fa5]+$/, message: "用户名只能为英文" },
          { min: 3, max: 10, message: "账号输入错误", trigger: "blur" }
        ],
        passwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 20, message: "密码输入错误", trigger: "blur" }
        ],
        check: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码长度不正确", trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  methods: {
    //获取code
    getcaptcha() {
      this.$axios.req("/captcha").then(res => {
        this.captcha = res;
        sessionStorage.setItem("captcha", res);
      });
    },
    //登录验证
    login(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.$axios
            .post("/user/login", {
              username: this.ruleForm.username,
              password: this.ruleForm.passwd,
              code: this.ruleForm.check
            })
            .then(res => {
              console.log(res);
              if (res.code === 200) {
                localStorage.setItem("username", this.ruleForm.username);
                console.log(res.data[0].date);
                localStorage.setItem("loginTime", res.data[0].date);
                this.$store.state.username = this.ruleForm.username;
                this.$router.push("/");
                this.$message({
                  showClose: true,
                  message: res.message,
                  type: "success"
                });
              } else {
                this.$message({
                  showClose: true,
                  message: res.message,
                  type: "error"
                });
                this.getcaptcha();
                this.$refs[ruleForm].resetFields();
              }
            });
        } else {
          this.getcaptcha();
          this.$message({
            showClose: true,
            message: "输入有误",
            type: "error"
          });
          return false;
        }
      });
    },
    cancel(ruleForm) {
      this.$refs[ruleForm].resetFields();
    }
  },
  mounted() {
    this.getcaptcha();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.demo-ruleForm {
  width: 80%;
  margin-left: 20px;
  margin-top: 30px;
}
.check {
  width: 30%;
}
.code {
  display: flex;
  div {
    height: 18px;
  }
}
</style>