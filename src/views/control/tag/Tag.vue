<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1" @click="n=1">未读消息({{unReadNum}})</el-menu-item>
      <el-menu-item index="2" @click="n=2">已读消息({{readedNum}})</el-menu-item>
      <el-menu-item index="3" @click="n=3">回收站({{recycleNum}})</el-menu-item>
    </el-menu>
    <div class="mian">
      <div v-for="item in show(n)" :key="item.id" class="box">
        <div>{{item.type}}{{item.msg}}</div>
        <div class="right">
          <div>{{item.date}}</div>
          <div>
            <el-button v-if="n===1" @click="btn(item)">标为已读</el-button>
            <el-button v-if="n===2" @click="btn(item)">删除</el-button>
            <el-button v-if="n===3" type="warning" @click="btn(item)">还原</el-button>
          </div>
        </div>
      </div>
      <div v-if="show(n).length===0" class="box">暂无数据</div>
      <div class="footer">
        <div v-if="n===1&&show(n).length!==0">
          <el-button type="primary" @click="footer()">全部标为已读</el-button>
        </div>
        <div v-if="n===2&&show(n).length!==0">
          <el-button type="danger" @click="footer()">删除全部</el-button>
        </div>
        <div v-if="n===3&&show(n).length!==0">
          <el-button type="info" @click="footer()">清空回收站</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      n: 1,
      activeIndex: "1",
      unRead: [
        {
          type: "[系统通知]",
          msg: "该系统将于今晚凌晨2点到5点进行升级维护",
          date: "2018-04-19 20:00:00"
        },
        {
          type: "",
          msg: "今晚12点整发大红包",
          date: "2018-04-19 21:00:00"
        }
      ],
      readed: [],
      recycle: [
        {
          type: "[系统通知]",
          msg: "您的优惠券已经过期",
          date: "2018-04-19 20:00:00"
        }
      ]
    };
  },
  components: {},
  methods: {
    show(n) {
      if (n === 1) {
        return this.unRead;
      }
      if (n === 2) {
        return this.readed;
      }
      if (n === 3) {
        return this.recycle;
      }
    },
    btn(detail) {
      if (this.n === 1) {
        this.unRead = this.unRead.filter(item => item !== detail);
        this.readed.unshift(detail);
      }
      if (this.n === 2) {
        this.readed = this.readed.filter(item => item !== detail);
        this.recycle.unshift(detail);
      }
      if (this.n === 3) {
        this.recycle = this.recycle.filter(item => item !== detail);
        this.unRead.unshift(detail);
      }
    },
    footer() {
      if (this.n === 1) {
        this.readed = this.readed.concat(this.unRead);
        this.unRead = [];
      }
      if (this.n === 2) {
        this.recycle = this.recycle.concat(this.readed);
        this.readed = [];
      }
      if (this.n === 3) {
        this.recycle = [];
      }
    }
  },
  mounted() {},
  watch: {},
  computed: {
    unReadNum() {
      return this.unRead.length;
    },
    readedNum() {
      return this.readed.length;
    },
    recycleNum() {
      return this.recycle.length;
    }
  }
};
</script>

<style scoped lang='scss'>
.mian {
  background: white;
  .box {
    display: flex;
    height: 40px;
    line-height: 40px;
    padding: 20px;
    border-bottom: 1px solid lightgray;
    position: relative;
    .right {
      display: flex;
      position: absolute;
      right: 20px;
      div {
        margin-right: 10px;
      }
    }
  }
  .footer{
    text-align: left;
    padding: 20px;
  }
}
</style>