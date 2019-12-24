<template>
  <div class="container-fluid">
    <div class="modal-header">
      <div class="top" @click="clickAll"></div>
      <div>Todo List</div>
    </div>
    <div
      v-for="item in show(n)"
      :key="item.id"
      class="desc"
      @mouseleave="count=null"
      @mouseenter="count=item"
    >
      <div :class="item.checked?img1:img2" @click="item.checked=!item.checked"></div>
      {{item.name}}
      <span @click="Del(item)" class="remove" v-if="item===count">X</span>
    </div>
    <div v-if="show(n).length===0">暂无数据</div>
    <div class="modal-footer">
      <div class="footer-nav">{{show(n).length}} items left</div>
      <div class="footer-nav">
        <div :class="{'actived':n===0}" @click="show(0)">All</div>
        <div :class="{'actived':n===1}" @click="show(1)">Active</div>
        <div :class="{'actived':n===2}" @click="show(2)">Completed</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    todos:{
      type:Array,
      default:()=>[]
    }
  },
  data() {
    return {
      list:[],
      n: 0,
      count: null,
      img1: "img1",
      img2: "circle",
      changeAll: false
    };
  },
  methods: {
    clickAll() {
      this.changeAll = !this.changeAll;
      if (this.n === 0) this.list.map(item => (item.checked = this.changeAll));
    },
    //分屏显示
    show(x) {
      this.list = this.todos;
      this.n = x;
      if (x === 0) {
        return this.list;
      } else if (x === 1) {
        return this.list.filter(item => !item.checked);
      } else if (x === 2) {
        return this.list.filter(item => item.checked);
      }
    },
    //删除
    Del(n) {
      this.todos = this.todos.filter(item => item !== n);
    }
  },
  watch: {},
  mounted() {
    this.show(0);
  },
  created() {},
  filters: {},
  computed: {
    finish() {
      return this.todos.filter(item => item.checked === true).length;
    },
    unfinished() {
      return this.todos.length - this.finish;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.top {
  background: url("../../../assets/check.png");
  background-size: 20px;
  position: absolute;
  width: 20px;
  height: 20px;
  left: 0;
}
.container-fluid {
  width: 100%;
  height: 100%;
  position: relative;

  .modal-header {
    display: flex;
    margin: 0 auto;
    position: relative;
    height: 40px;
    border-bottom: 1px solid lightgray;
    div {
      position: absolute;
      right: 0;
      top: 15px;
    }
  }

  .desc {
    text-align: left;
    height: 36px;
    line-height: 36px;
    margin-left: 20px;
    position: relative;
    display: flex;

    div {
      line-height: 36px;
      width: 14px;
      height: 14px;
      margin-right: 10px;
      font-size: 16px;
    }
    .img1 {
      background: url("../../../assets/true.png");
      background-size: 14px;
      border: 1px solid black;
      border-radius: 50%;
      margin-top: 12px;
    }
    .circle {
      border: 1px solid black;
      border-radius: 50%;
      margin-top: 12px;
    }

    .remove {
      position: absolute;
      color: red;
      cursor: pointer;
      right: 0;
      line-height: 35px;
      font-size: 20px;
    }
  }

  .modal-footer {
    width: 100%;
    border-top: 1px solid lightgray;
    display: flex;
    font-size: 12px;
    position: absolute;
    bottom: 0;
    line-height: 30px;
    margin-top: 10px;
    .footer-nav {
      margin-top: 10px;
      display: flex;
      div {
        width: 75px;
        text-align: center;
        height: 30px;
        border: 1px solid white;
        margin: 0 2px;
        cursor: pointer;
      }
      .actived {
        border: 1px solid #e5e5e5;
      }
    }
  }
}
</style>