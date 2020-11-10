<template>
    <div class="search-bar-wrapper">
      <router-link tag="div" class="search-bar" to="/search">
        <i class="iconfont icon-search"></i>
        <span class="search-title">搜索书名、作者</span>
      </router-link>
    </div>
</template>

<script>
export default {
  name: 'SearchBar'
}
</script>

<style lang="scss" scoped>
.search-bar-wrapper{
  width: 80%;
  height: 60px;
  margin:5px 10%;
  .search-bar {
    height: 60px;
    line-height: 60px;
    display: flex;
    background: #efefef;
    border-radius: 30px;
    padding: 0 20%;
    color: #999;
    .icon-search {
      font-size: 36px;
      margin: 0 20px;
    }
  }
}

</style>
