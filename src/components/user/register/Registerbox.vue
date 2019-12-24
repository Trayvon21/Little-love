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
      <el-form-item label="确  认" prop="repasswd">
        <el-input type="password" v-model="ruleForm.repasswd"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="login('ruleForm')">注册</el-button>
        <el-button type="warning" @click="cancel('ruleForm')">重置</el-button>
        <el-button @click="$router.go(-1)">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var flag = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.passwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        passwd: "",
        repasswd: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 10, message: "账号输入不正确", trigger: "blur" },
           {pattern: /^[^\u4e00-\u9fa5]+$/,message: '用户名只能为英文'}
        ],
        passwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 20, message: "密码输入不正确", trigger: "blur" }
        ],
        repasswd: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: flag, trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  methods: {
    login(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.$axios
            .post("/user/register", {
              username: this.ruleForm.username,
              password: this.ruleForm.passwd
            })
            .then(res => {
              console.log(res);
              if (res.code === 200) {
                this.$router.push("/login");
                this.$message({
                  showClose: true,
                  message: "恭喜你，注册成功",
                  type: "success"
                });
              } else {
                this.$message({
                  showClose: true,
                  message: "错了哦，这是一条错误消息",
                  type: "error"
                });
                this.$refs[ruleForm].resetFields();
              }
            });
        } else {
          this.$message({
            showClose: true,
            message: "错了哦，这是一条错误消息",
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
  mounted() {},
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
</style>