<template>
  <div>
    <div class="top">
      <el-button type="danger" @click="flag=!flag" v-if="flag">查看</el-button>
      <el-button type="danger" @click="flag=!flag" v-else>返回</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>
    </div>
    <div v-if="flag" class="edit">
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="文章摘要" prop="abstract">
            <el-input v-model="ruleForm.abstract"></el-input>
          </el-form-item>
          <div class="footer">
            <el-form-item label="作者" prop="author">
              <el-input v-model="ruleForm.author"></el-input>
            </el-form-item>
            <el-form-item label="类目" prop="category">
              <el-select v-model="ruleForm.category" placeholder="请选择">
                <el-option label="Vue" value="Vue"></el-option>
                <el-option label="React" value="React"></el-option>
                <el-option label="Node.js" value="Nodejs"></el-option>
                <el-option label="性能优化" value="性能优化"></el-option>
                <el-option label="javascript" value="javascript"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="来源" prop="source">
              <el-select v-model="ruleForm.source" placeholder="请选择">
                <el-option label="原创" value="原创"></el-option>
                <el-option label="转载" value="转载"></el-option>
                <el-option label="与他人合作" value="与他人合作"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="重要性" prop="star">
              <el-select v-model="ruleForm.star" placeholder="请选择">
                <el-option label="1" :value="1"></el-option>
                <el-option label="2" :value="2"></el-option>
                <el-option label="3" :value="3"></el-option>
                <el-option label="4" :value="4"></el-option>
                <el-option label="5" :value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布时间" prop="date">
              <el-date-picker
                v-model="ruleForm.date"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <mavon-editor v-model="ruleForm.text" />
      <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>
    </div>
    <mavon-editor
      v-else
      :subfield="false"
      :boxShadow="false"
      defaultOpen="preview"
      :toolbarsFlag="false"
      v-model="ruleForm.text"
    />
  </div>
</template>
<script>
export default {
  name: "markdown",
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      flag: true,
      ruleForm: {
        title: "",
        abstract: "",
        author: "",
        category: "",
        source: "",
        star: null,
        text: "",
        date: new Date()
      },
      rules: {
        title: [
          { required: true, message: "请输入文章名称", trigger: "blur" },
          { min: 3, message: "长度大于3个字符", trigger: "blur" }
        ],
        abstract: [
          { required: true, message: "请输入文章摘要", trigger: "blur" },
          { min: 3, message: "长度大于3个字符", trigger: "blur" }
        ],
        author: [
          { required: true, message: "请输入作者名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度大于1个字符", trigger: "blur" }
        ],
        category: [{ required: true, message: "必选", trigger: "change" }],
        source: [{ required: true, message: "必选", trigger: "change" }],
        star: [{ required: true, message: "必选", trigger: "change" }]
      }
    };
  },
  components: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/article/create", this.ruleForm).then(res => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "发布成功!"
              });
              this.ruleForm.text = "";
              this.$refs[formName].resetFields();
              this.$router.push("/publish");
            } else {
              this.$message({
                type: "error",
                message: "提交失败!"
              });
            }
          });
        } else {
          this.$message({
            type: "error",
            message: "格式错误!"
          });
          return false;
        }
      });
    }
  },
  mounted() {},
  watch: {
    "ruleForm.date": {
      handler(val) {
        if (val > new Date()) {
          this.ruleForm.date = new Date();
          this.$message({
            type: "error",
            message: "不能超过当前时间!"
          });
        }
      },
      deep: true
    }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
.footer {
  display: flex;
  justify-content: space-between;
}
</style>
