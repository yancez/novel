<template>
    <div class="tab-wrapper">
      <keep-alive>
        <div class="tab">
          <router-link tag="div" class="tab-item" to="/bookmall">
            <i class="iconfont icon-home"></i>
            <span class="text">首页</span>
          </router-link>
          <router-link tag="div" class="tab-item" to="/category">
            <i class="iconfont icon-modular"></i>
            <span class="text">分类</span>
          </router-link>
          <router-link tag="div" class="tab-item" to="/rank">
            <i class="iconfont icon-data-view"></i>
            <span class="text">排行榜</span>
          </router-link>
          <router-link tag="div" class="tab-item" to="/mybook">
            <i class="iconfont icon-bookshelf"></i>
            <span class="text">书架</span>
          </router-link>
        </div>
      </keep-alive>
    </div>
</template>

<script>
export default {
  'name': 'tab',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-wrapper {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 100;
  padding: 0;
  text-align: center;
  background: #fff;
  .tab {
    height: 80px;
    display: flex;
    border-top: 1px solid #f2f2f2;
    .tab-item {
      flex: 1;
      color: rgba(0,0,0,.6);
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      &.router-link-active {
        color: #4c9ef5;
      }
    }
  }
}
</style>
