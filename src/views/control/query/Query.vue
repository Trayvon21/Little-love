<template>
  <div>
    <div>
      <el-table :data="show" style="width: 100%">
        <el-table-column prop="NAME" label="名称"></el-table-column>
        <el-table-column prop="GOODS_SERIAL_NUMBER" label="商品编号"></el-table-column>
        <el-table-column prop="ORI_PRICE" label="原价"></el-table-column>
        <el-table-column prop="PRESENT_PRICE" label="现价"></el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <!-- 分页组件 -->
      <pagination :arr="tableDate" :paging="paging"></pagination>
      <!-- 导出组件 -->
      <exports class="btn-group" :json_data="show"></exports>
    </div>
  </div>
</template>

<script>
import pagination from "../../../components/control/table/Pagination";
import exports from "../../../components/control/table/Export";
export default {
  data() {
    return {
      tableDate: [],
      paging: {
        currentPage: 1,
        handleSize: 20
      }
    };
  },
  components: {
    pagination,
    exports
  },
  methods: {
    gettableData() {
      if (sessionStorage.getItem("table")) {
        this.tableDate = JSON.parse(sessionStorage.getItem("table"));
      } else {
        this.$axios.req("/tableData").then(res => {
          if (res.code === 0) {
            this.tableDate = res.data;
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
      return this.tableDate.slice(
        this.paging.handleSize * (this.paging.currentPage - 1),
        this.paging.handleSize * this.paging.currentPage
      );
    }
  }
};
</script>

<style scoped lang='scss'>
.btn-group {
  display: flex;
}
</style>