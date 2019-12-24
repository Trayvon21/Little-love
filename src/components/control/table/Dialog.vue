<template>
  <div>
    <el-dialog align="center" :visible.sync="$parent.dialogVisible" width="500px">
      <div>
        <span>名称：</span>
        <input type="text" v-model="obj.NAME" />
      </div>
      <div>
        <span>原价：</span>
        <input type="text" v-model="obj.ORI_PRICE" />
      </div>
      <div>
        <span>现价：</span>
        <input type="text" v-model="obj.PRESENT_PRICE" />
      </div>
      <div>
        <el-button type="primary" @click="save">提交</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    obj: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  methods: {
    //保存dialog修改
    save() {
      this.obj.ORI_PRICE === "" ? (this.obj.ORI_PRICE = 0) : this.obj.ORI_PRICE;
      this.obj.PRESENT_PRICE === ""
        ? (this.obj.PRESENT_PRICE = 0)
        : this.obj.PRESENT_PRICE;
      this.obj.NAME === "" ? (this.obj.NAME = "空") : this.obj.NAME;
      if (
        String(Number(this.obj.ORI_PRICE)) === "NaN" ||
        String(Number(this.obj.PRESENT_PRICE)) === "NaN"
      ) {
        this.$message({
          type: "error",
          message: "价格只能输入数字"
        });
      } else {
        this.$parent.showDate = this.$parent.showDate.map(item =>
          item.GOODS_SERIAL_NUMBER === this.obj.GOODS_SERIAL_NUMBER
            ? this.obj
            : item
        );
        this.$parent.dialogVisible = false;
        this.$message({
          type: "success",
          message: "修改成功!"
        });
      }
    },
    //取消修改
    cancel() {
      this.$parent.showDate = this.$parent.showDate.map(item =>
        item === this.$parent.obj ? this.$parent.oldobj : item
      );
      this.$parent.dialogVisible = false;
      this.$message({
        type: "error",
        message: "取消修改!"
      });
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.dialog {
  width: 350px;
}
.el-dialog {
  .title {
    font-size: 24px;
  }
  div {
    margin: 40px 0;
    span {
      font-size: 20px;
    }
  }
  input {
    height: 20px;
    width: 300px;
    font-size: 16px;
  }
}
</style>