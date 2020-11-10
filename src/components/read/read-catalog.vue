<template>
  <div class="catalog">
    <div class="catalog-wrapper" ref="wrapper">
      <ul class="chapters-wrapper" @mousewheel.prevent>
        <h1 class="catalog-title">目录</h1>
        <li class="chapter" v-for="(item, index) in chapters" :key="index" @click="skipChapter(index)">{{item.title}}</li>
      </ul>
    </div>
    <div class="mask" @click="hideCatalog()" @touchmove.prevent></div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'readCatalog',
  props: {
    isShowCatalog: Boolean,
    chapters: Array
  },
  methods: {
    skipChapter (index) {
      this.$emit('skipChapter', index)
    },
    hideCatalog () {
      this.$emit('hideCatalog')
    }
  },
  mounted () {
    const options = {
      click: true,
      tap: false
    }
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, options)
    })
  }
}
</script>

<style lang="scss" scoped>
.catalog {
  .catalog-wrapper {
    width: 75%;
    background: #fff;
    height: 100%;
    padding-left: 30px;
    z-index: 200;
    position: absolute;
    bottom: 0;
    left: 0;
    .catalog-title {
      font-size: 36px;
      border-bottom: 1px solid #f2f2f2;
      padding: 20px 0;
    }
    .chapters-wrapper {
      overflow: scroll;
      .chapter {
        color: #666;
        border-bottom: 1px solid #f2f2f2;
      }
    }
  }
  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 101;
  }
}
</style>
