<template>
  <div>
    <div class="top">
      <div class="top-box">
        <i class="el-icon-edit"></i>
        <div>今日发布</div>
        <div>{{today}}</div>
      </div>
      <div class="top-box">
        <i class="el-icon-reading"></i>
        <div>原创文章</div>
        <div>{{sourceNum}}</div>
      </div>
      <div class="top-box">
        <i class="el-icon-s-promotion"></i>
        <div>新留言</div>
        <div>0</div>
      </div>
      <div class="top-box">
        <i class="el-icon-message-solid"></i>
        <div>新消息</div>
        <div>0</div>
      </div>
    </div>
    <div class="chart">
      <div>
        <ve-pie :data="categoryData"></ve-pie>
      </div>
      <div>
        <ve-pie :data="sourceData" :settings="chartSettings"></ve-pie>
      </div>
    </div>
    <div>
      <ve-waterfall :data="dateData"></ve-waterfall>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    this.chartSettings = {
      roseType: "radius"
    };
    return {
      today: 0,
      sourceNum: 0,
      obj_category: {},
      obj_source: {},
      obj_date: {},
      categoryData: {
        columns: ["category", "num"],
        rows: []
      },
      sourceData: {
        columns: ["source", "num"],
        rows: []
      },
      dateData: {
        columns: ["时间", "数量"],
        rows: []
      }
    };
  },
  components: {},
  methods: {
    get() {
      this.$axios.req("/article/allArticle").then(res => {
        if (res.code === 200) {
          res.data.map(item => {
            //类目
            this.obj_source[item.source] =
              this.obj_source[item.source] + 1 || 1;
            //来源
            this.obj_category[item.category] =
              this.obj_category[item.category] + 1 || 1;
            //时间
            this.obj_date[this.$dayjs(item.date).format("YYYY年MM月DD日")] =
              this.obj_date[this.$dayjs(item.date).format("YYYY年MM月DD日")] +
                1 || 1;
            //今日发布计数
            if (
              this.$dayjs(item.date).format("YYYY年MM月DD日") ===
              this.$dayjs().format("YYYY年MM月DD日")
            ) {
              this.today++;
            }
            //原创计数
            if (item.source === "原创") {
              this.sourceNum++;
            }
          });
          //获取类目
          this.categoryData.rows = Object.keys(this.obj_category).map(item => {
            return { category: item, num: this.obj_category[item] };
          });
          //获取来源
          this.sourceData.rows = Object.keys(this.obj_source).map(item => {
            return { source: item, num: this.obj_source[item] };
          });
        }
        //获取时间
        this.dateData.rows = Object.keys(this.obj_date).map(item => {
          return { 时间: item, 数量: this.obj_date[item] };
        });
      });
    }
  },
  mounted() {
    this.get();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.top {
  display: flex;
  text-align: center;
  border-radius: 20px;
  >div:nth-child(1) {
    background: #7CCABF;
  }
  >div:nth-child(2) {
    background: #E88A87;
  }
  >div:nth-child(3) {
    background: #8375A3;
  }
  >div:nth-child(4) {
    background: #9FCEC1;
  }
  .top-box {
    width: 25%;
    position: relative;
    height: 60px;
    line-height: 30px;
    color: white;
    i {
      position: absolute;
      right: 10%;
      font-size: 30px;
      top: 15px;
    }
  }
}
.chart {
  display: flex;
  justify-content: space-between;
  div {
    width: 50%;
  }
}
</style>