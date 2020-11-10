<template>
  <div class="header-bar-wrapper">
    <router-link tag="div" class="header-bar" to>
      <i class="iconfont icon-arrow-left-bold" @click="$router.back(-1)"></i>
      <span class="header-back">返回</span>
    </router-link>
    <div class="title">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: 'HeaderBar',
  props: {
    title: String
  }
}
</script>

<style lang='scss' scoped>
.header-bar-wrapper {
  width: 100%;
  height: 80px;
  line-height: 80px;
  background: #42a5f5;
  color: #fff;
  position: absolute;
  top: 0;
  .header-bar {
    position: absolute;
    margin-left: 10px;
    .icon-arrow-left-bold {
      font-size: 38px;
    }
    .header-back {
      font-size: 28px;
      vertical-align: top;
    }
  }
  .title {
    font-weight: bold;
    text-align: center;
  }
}
</style>
