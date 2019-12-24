<template>
  <div>
    <el-button type="" @click="$router.go(-1)">返回</el-button>
    <div>{{list.title}}</div>
    <div>{{list.abstract}}</div>
    <div>发表于：{{format(list.date)}}</div>
    <mavon-editor
      :subfield="false"
      :boxShadow="true"
      defaultOpen="preview"
      :toolbarsFlag="false"
      v-model="list.text"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: {}
    };
  },
  components: {},
  methods: {
    format(val){
      return this.$dayjs(val).format('YYYY年MM月DD日HH时mm分ss秒')
    }
  },
  mounted() {
    this.list = this.$route.params.detail;
    console.log(this.list);
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>