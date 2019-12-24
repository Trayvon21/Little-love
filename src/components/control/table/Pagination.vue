<template>
  <div>
    <el-pagination
      class="footer-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="paging.currentPage"
      :page-sizes="[20, 30, 50, 100]"
      :page-size="paging.handleSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="arr.length"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    arr: {
      type: Array,
      default: () => []
    },
    paging: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  methods: {
    handleSizeChange(val) {
      this.$parent.paging.handleSize = val;
      this.$parent.paging.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.$parent.paging.currentPage = val;
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>