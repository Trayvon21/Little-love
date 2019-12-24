<template>
  <div>
    <div class="top">
      <div class="box">
        <!-- 计数器 -->
        <img src="../../../assets/index/people.svg" alt />
        <div class="desc">
          <div>New Visits</div>
          <countTo :startVal="0" :endVal="Number(homedate.visits)" :duration="3000"></countTo>
        </div>
      </div>
      <div class="box">
        <img src="../../../assets/index/news.svg" alt />
        <div class="desc">
          <div>Messages</div>
          <countTo :startVal="0" :endVal="Number(homedate.messages)" :duration="3000"></countTo>
        </div>
      </div>
      <div class="box">
        <img src="../../../assets/index/money.svg" alt />
        <div class="desc">
          <div>Purchases</div>
          <countTo :startVal="0" :endVal="Number(homedate.purchases)" :duration="3000"></countTo>
        </div>
      </div>
      <div class="box">
        <img src="../../../assets/index/car.svg" alt />
        <div class="desc">
          <div>Shoppings</div>
          <countTo :startVal="0" :endVal="Number(homedate.shopping)" :duration="3000"></countTo>
        </div>
      </div>
    </div>
    <!-- 条形图 -->
    <div class="chart">
      <ve-line :data="homeChat" :colors="homeColor"></ve-line>
    </div>
    <div class="chart chart-group">
      <div class="chartbox">
        <ve-radar :data="radarChat" :settings="radarSettings"></ve-radar>
      </div>
      <div class="chartbox">
        <ve-pie :data="ringChat" :settings="ringSettings"></ve-pie>
      </div>
      <div class="chartbox">
        <ve-histogram :data="homeChat" :settings="histogramSettings"></ve-histogram>
      </div>
    </div>
    <div class="chart-group">
      <div class="chart1">
        <el-table :data="orderData" style="width: 100%" class="chart">
          <el-table-column prop="num" label="num" width="300"></el-table-column>
          <el-table-column prop="price" label="price"></el-table-column>
          <el-table-column prop="status" label="Status" align="center">
            <template slot-scope="scope">
              <div>
                <el-tag type="danger" v-if="scope.row.status === 0">pending</el-tag>
                <el-tag type="success" v-if="scope.row.status === 1">success</el-tag>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="chart2 chart">
        <todolist :todos="todoList"></todolist>
      </div>
      <div class="chart3 chart">
        <img src="../../../assets/s1.png" alt />
        <div v-for="item in progress" :key="item.id" class="progress">
          <div>{{item.name}}</div>
          <el-progress :percentage="item.progress*100" :status="format(item.progress)"></el-progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";
import todolist from "../../../components/control/index/Todolist";
export default {
  data() {
    return {
      homedate: {},
      //条形图数据
      homeChat: {
        columns: ["date", "expected", "actual"],
        rows: []
      },
      homeColor: ["skyblue", "pink"],
      //雷达图数据
      radarChat: {
        columns: [
          "sales",
          "ministration",
          "techology",
          "delelopmer",
          "marketing"
        ],
        rows: []
      },
      //雷达图设置
      radarSettings: {
        dimension: ["name"],
        metrics: [
          "sales",
          "ministration",
          "techology",
          "delelopmer",
          "marketing"
        ],
        dataType: { sales: "percent" }
      },
      //饼图数据
      ringChat: {
        columns: ["name", "data"],
        rows: []
      },
      //饼图设置
      ringSettings: {
        limitShowNum: 500
      },
      //柱状图设置
      histogramSettings: {
        metrics: ["expected", "actual"]
      },
      orderData: [],
      progress: [],
      todoList: []
    };
  },
  components: {
    todolist,
    countTo
  },
  methods: {
    format(percentage) {
      if (percentage === 1) {
        return "success";
      } else {
        return;
      }
    },
    //获取计数器
    gethomeData() {
      this.$axios.req("/homeData").then(res => {
        if (res.code === 0) {
          this.homedate = res.data;
        }
      });
    },
    //获取条形图与柱状图数据
    gethomeChat() {
      this.$axios.req("/homeChat").then(res => {
        if (res.code === 0) {
          this.homeChat.rows = res.data;
        }
      });
    },
    getradarChat() {
      this.$axios.req("/radarChat").then(res => {
        if (res.code === 0) {
          this.radarChat.rows = res.data;
        }
      });
    },
    getringChat() {
      this.$axios.req("/ringChat").then(res => {
        if (res.code === 0) {
          this.ringChat.rows = res.data;
        }
      });
    },
    getorderData() {
      this.$axios.req("/orderData").then(res => {
        if (res.code === 0) {
          this.orderData = res.data;
        }
      });
    },
    gettodoList() {
      this.$axios.req("/todoList").then(res => {
        if (res.code === 0) {
          this.todoList = res.data;
        }
      });
    },
    getprogress() {
      this.$axios.req("/progress").then(res => {
        if (res.code === 0) {
          this.progress = res.data;
        }
      });
    }
  },
  created() {},
  mounted() {
    this.gethomeData();
    this.gethomeChat();
    this.getradarChat();
    this.getringChat();
    this.getorderData();
    this.gettodoList();
    this.getprogress();
  },
  watch: {},
  filters: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.top {
  display: flex;
  justify-content: space-between;
  .box {
    background: white;
    height: 100px;
    width: 24%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    border-radius: 8px;
    position: relative;
    img {
      position: absolute;
      left: 30px;
      height: 50px;
      top: 25px;
    }
    .desc {
      position: absolute;
      right: 20px;
      line-height: 30px;
      top: 20px;
      :nth-child(1) {
        color: gray;
      }
    }
  }
}
.chart {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  margin-top: 20px;
}
.chart-group {
  display: flex;
  justify-content: space-around;
  .chartbox {
    margin-top: 20px;
    width: 28%;
  }
  .chart1 {
    width: 40%;
  }
  .chart2 {
    width: 25%;
    text-align: left;

    padding: 10px 20px;
  }
  .chart3 {
    width: 30%;
    img {
      margin-top: 10px;
      width: 95%;
    }
  }
}
.progress{
  text-align: left;
  margin: 20px;
}
</style>