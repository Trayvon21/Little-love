<template>
  <div>
    <download-excel
      class="export-excel-wrapper"
      :data="json_data"
      :fields="json_fields"
      name="filename.xls"
    >
      <el-button type="primary" size="small">导出EXCEL</el-button>
    </download-excel>
    <download-excel
      class="export-excel-wrapper"
      :data="json_data"
      :fields="json_fields"
      name="filename.csv"
      type="csv"
    >
      <el-button type="danger" size="small">导出csv</el-button>
    </download-excel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      json_fields: {
        名称: "NAME",
        商品编号: "GOODS_SERIAL_NUMBER",
        原价: "ORI_PRICE",
        现价: "PRESENT_PRICE"
      },
      json_meta: [
        [
          {
            " key ": " charset ",
            " value ": " utf- 8 "
          }
        ]
      ]
    };
  },
  props: {
    json_data: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>