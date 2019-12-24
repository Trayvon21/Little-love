<template>
  <div>
    <el-table
      stripe
      :data="list.slice(
        this.handleSize * (this.currentPage - 1),
        this.handleSize * this.currentPage
      )"
      style="width: 100%"
    >
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="author" label="作者"></el-table-column>
      <el-table-column prop="category" label="类目"></el-table-column>
      <el-table-column prop="source" label="来源"></el-table-column>
      <el-table-column label="重要性">
        <template slot-scope="scope">
          <el-rate :value="scope.row.star*1" disabled text-color="#ff9900"></el-rate>
        </template>
      </el-table-column>
      <el-table-column label="发布时间">
        <template slot-scope="scope">
          <div>{{date(scope.row)}}</div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="240">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="goto(scope.row)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row)" size="small">删除</el-button>
          <el-button type="success" @click="check(scope.row)" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="footer-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 30]"
      :page-size="handleSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="list.length"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      handleSize: 20,
      currentPage: 1,
      list: []
    };
  },
  components: {},
  methods: {
    del(val) {
      console.log(val._id);
      this.$axios.req("/article/delete", { _id: val._id }).then(res => {
        if (res.data.n === 1) {
          this.list = this.list.filter(item => item !== val);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        } else {
          this.$message({
            type: "error",
            message: "删除失败!"
          });
        }
      });
    },
    check(item) {
      this.$router.push({name:'check', params: {detail: item}})
    },
    goto(item) {
      this.$router.push({name:'detail', params: {ruleForm: item}});
    },
    handleSizeChange(val) {
      this.handleSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    date(item) {
      console.log(item.date);
      return this.$dayjs(item.date).format("YYYY年MM月DD日HH时mm分ss秒");
    }
  },
  mounted() {
    this.$axios.req("/article/allArticle").then(res => {
      this.list = res.data;
    });
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>