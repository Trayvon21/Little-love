<template>
  <div>
    <el-input @input="search" v-model="desc" placeholder="请输入您想搜索的商品名称"></el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
        desc:""
    };
  },
  props: { },
  components: {},
  methods: {
    search() {
      this.desc = this.desc.trim();
      console.log(this.desc);
      this.$parent.showDate = this.$parent.tableDate.filter(item =>
        JSON.stringify(item).includes(this.desc)
      );
    }
  },
  mounted() {},
  watch: {
      desc(){
          this.$parent.paging.currentPage=1
      }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>