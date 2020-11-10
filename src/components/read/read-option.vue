<template>
  <div class="read-option">
    <div class="read-header" :class="theme ? 'light' : 'dark'">
      <router-link tag="div" class="back" to>
        <i class="iconfont icon-arrow-left-bold" @click="back()"></i>
        <span class="back-text">返回</span>
      </router-link>
      <div class="title"></div>
      <div class="icons">
        <router-link to="/bookmall">
          <i class="iconfont icon-home"></i>
        </router-link>
        <router-link to="/mybook">
          <i class="iconfont icon-bookshelf"></i>
        </router-link>
      </div>
    </div>
    <div class="read-footer" :class="theme ? 'light' : 'dark'">
      <div class="read-top">
        <div class="prev" @click="prev()">
          <i class="iconfont icon-arrow-left-bold"></i>
          <span>上一章</span>
        </div>
        <div class="split">{{currentChapter + 1}}/{{totalChapter}}章</div>
        <div class="next" @click="next()">
          <span>下一章</span>
          <i class="iconfont icon-arrow-right-bold"></i>
        </div>
      </div>
      <div class="read-font" :class="theme ? 'light' : 'dark'" v-show="show">
        <i class="iconfont icon-text small-font"></i>
        <mu-container>
          <mu-slider class="slider" v-model="fontsize" :step="2" :min="12" :max="24" @change="fontController(fontsize)"></mu-slider>
        </mu-container>
        <i class="iconfont icon-text big-font"></i>
      </div>
      <div class="read-bottom">
        <div class="item" @click="showCatalog()">
          <i class="iconfont icon-catalog"></i>
        </div>
        <div class="item" @click="changeThemes()">
          <i class="iconfont icon-guangzhao"></i>
        </div>
        <div class="item" @click="showFont()">
          <i class="iconfont icon-text"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'readOption',
  data () {
    return {
      catalog: true,
      show: false,
      changeTheme: true,
      fontsize: 14,
      chapters: 888,
      theme: true
    }
  },
  props: ['currentChapter', 'totalChapter'],
  methods: {
    fontController (val) {
      this.$emit('changeFont', val)
    },
    back () {
      this.$router.go(-1)
    },
    prev () {
      this.$emit('prevChapter')
    },
    next () {
      this.$emit('nextChapter')
    },
    showFont () {
      this.show = !this.show
    },
    changeThemes () {
      this.changeTheme = !this.changeTheme
      this.theme = !this.theme
      this.$emit('changeTheme', this.changeTheme)
    },
    showCatalog () {
      this.$emit('isShowCatalog', this.catalog)
    }
  }
}
</script>

<style lang="scss" scoped>
.read-option {
  .dark {
    background: #222222;
    color: #808080;
  }
  .light {
    background: #fff;
    color: #666;
  }
  .read-header {
    position: fixed;
    left: 0;
    top: 0;
    // background: #fff;
    // color: #000;
    width: 100%;
    height: 80px;
    line-height: 80px;
    display: flex;
    .back {
      flex: 0 0 150px;
      position: relative;
      left: 10px;
      .icon-arrow-left-bold {
        font-size: 38px;
      }
      .back-text {
        font-size: 28px;
        vertical-align: top;
      }
    }
    .title {
      flex: 1;
      text-align: center;
      line-height: 80px;
    }
    .icons {
      flex: 0 0 150px;
      i {
        font-size: 48px;
        line-height: 80px;
        vertical-align: middle;
        margin: 0 5px;
        color: #42a5f5;
      }
    }
  }
  .read-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    // color: #000;
    // background: #fff;
    width: 100%;
    height: 120px;
    z-index: 101;
    .read-top {
      display: flex;
      text-align: center;
      // position: relative;
      .prev {
        flex: 0 0 150px;
      }
      .split {
        flex: 1;
      }
      .slider {
        width: 100%;
        margin: 28px 0;
      }
      .next {
        flex: 0 0 150px;
      }
    }
    .read-bottom {
      width: 100%;
      display: flex;
      // position: relative;
      .item {
        width: 33%;
        display: flex;
        flex-direction: column;
        text-align: center;
        font-size: 28px;
        i::before {
          font-size: 32px;
        }
      }
    }
    .read-font {
      width: 100%;
      height: 60px;
      // background: rgba($color: #000000, $alpha: 0.5);
      // background: #fff;
      position: absolute;
      top: -60px;
      display: flex;
      text-align: center;
      .small-font {
        flex: 0 0 150px;
        font-size: 24px;
      }
      .slider {
        width: 100%;
        height: 10px;
        margin: 28px 0;
      }
      .big-font {
        flex: 0 0 150px;
        font-size: 48px;
      }
    }
  }
}
</style>
