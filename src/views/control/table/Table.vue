<template>
  <div class="main">
    <!-- 搜索组件 -->
    <search :desc="desc"></search>
    <!-- 表格 -->
    <div>
      <el-table :data="show" style="width: 100%">
        <el-table-column prop="NAME" label="名称"></el-table-column>
        <el-table-column prop="GOODS_SERIAL_NUMBER" label="商品编号"></el-table-column>
        <el-table-column prop="ORI_PRICE" label="原价"></el-table-column>
        <el-table-column prop="PRESENT_PRICE" label="现价"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="godialog(scope.row)">修改</el-button>
            <el-button type="danger" @click="del(scope.row)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- dialog组件 -->
    <dialogs :flag="dialogVisible" :obj="obj"></dialogs>
    <div class="footer">
      <!-- 分页组件 -->
      <pagination :arr="showDate" :paging="paging"></pagination>
    </div>
  </div>
</template>
<script>
//分页组件
import pagination from "../../../components/control/table/Pagination";
import search from "../../../components/control/table/Search";
import dialogs from "../../../components/control/table/Dialog";
export default {
  data() {
    return {
      obj: {},
      dialogVisible: false,
      showDate: [],
      desc: "",
      oldobj: {},
      tableDate: [],
      paging: {
        currentPage: 1,
        handleSize: 20
      }
    };
  },
  components: {
    pagination,
    search,
    dialogs
  },
  methods: {
    //dialog弹出
    godialog(scope) {
      this.dialogVisible = true;
      console.log(this.dialogVisible);
      this.obj = JSON.parse(JSON.stringify(scope));
      this.oldobj = JSON.parse(JSON.stringify(scope));
    },
    //删除
    del(val) {
      this.tableDate = this.tableDate.filter(item => item !== val);
      this.showDate = this.showDate.filter(item => item !== val);
      sessionStorage.setItem("table", JSON.stringify(this.tableDate));
    },
    gettableData() {
      if (sessionStorage.getItem("table")) {
        this.tableDate = JSON.parse(sessionStorage.getItem("table"));
        this.showDate = this.tableDate;
      } else {
        this.$axios.req("/tableData").then(res => {
          if (res.code === 0) {
            sessionStorage.setItem("table", JSON.stringify(res.data));
            this.tableDate = res.data;
            this.showDate = this.tableDate;
          }
        });
      }
    }
  },
  mounted() {
    this.gettableData();
  },
  watch: {},
  computed: {
    show() {
      console.log(this.showDate);
      return this.showDate.slice(
        this.paging.handleSize * (this.paging.currentPage - 1),
        this.paging.handleSize * this.paging.currentPage
      );
    }
  }
};
</script>

<style scoped lang='scss'>
.footer {
  text-align: left;
}
.footer-pagination {
  width: 100%;
}
</style>