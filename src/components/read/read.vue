<template>
    <div class="read" :class="themePage  ? 'light': 'dark'">
      <div id="read" class="read-wrapper">
        <div class="title">{{this.title}}</div>
        <div id="content" class="content" ref="content">
          <p v-for="(item,index) in newBook" :key="index"  @click="showOption()">{{item}}</p>
        </div>
      </div>
      <read-option
        v-show="isShowOption"
        @isShowCatalog="showCatalog"
        @changeTheme="getTheme"
        @prevChapter="prevChapter"
        @nextChapter="nextChapter"
        @changeFont="changeFont"
        :currentChapter="this.currentChapter"
        :totalChapter="this.chapters.length"
      ></read-option>
      <read-catalog v-show="isShowCatalog" @hideCatalog="hideCatalog" @skipChapter="goChapter" :chapters="chapters"></read-catalog>
    </div>
</template>

<script>
import { _getBookSource, _getBookChapters, _getBookRead } from '@/api/request'
import readOption from './read-option'
import readCatalog from './read-catalog'
import util from '@/api/util'

export default {
  name: 'read',
  components: {
    readOption,
    readCatalog
  },
  data () {
    return {
      sourceId: '',
      readlink: {},
      chapters: [],
      book: {},
      title: '',
      newBook: [],
      isShowOption: false,
      isShowCatalog: false,
      themePage: true,
      currentChapter: 0
    }
  },
  beforeRouteLeave (to, from, next) {
    let localShelf = util.getLocalData('mybook')
      ? util.getLocalData('mybook')
      : {}
    if (!localShelf[this.$route.params.id] || localShelf[this.$route.params.id].isTempoary) {
      this.$confirm('是否加入书架', '加入书架').then((result) => {
        if (result.result) {
          localShelf[this.$route.params.id] = {
            cover: this.$store.state.BookInfo.cover,
            title: this.$store.state.BookInfo.title,
            lastChapter: this.currentChapter,
            source: this.$store.state.sourceId,
            isTemporary: false
          }
        }
        util.setLocalData('mybook', localShelf)
        this.$store.commit('SetSourceId', false)
        next()
      }).catch(() => {
        this.$store.commit('SetSourceId', false)
        next()
      })
      // if (localShelf[this.$route.params.id].isTemporary) {
      //   delete localShelf[this.$route.params.id]
      // }
      util.setLocalData('mybook', localShelf)
    } else {
      localShelf[this.$route.params.id] = {
        cover: this.$store.state.BookInfo.cover,
        title: this.$store.state.BookInfo.title,
        lastChapter: this.currentChapter,
        source: this.$store.state.sourceId
      }
      util.setLocalData('mybook', localShelf)
      this.$store.commit('SetSourceId', false)
      next()
    }
  },
  methods: {
    changeFont (val) {
      this.$refs.content.style.fontSize = val + 'px'
      this.$refs.content.style.lineHeight = (val + 16) + 'px'
    },
    isSkipChapter (num) {
      console.log(num)
    },
    goChapter (num) {
      this.currentChapter = num
      this.isShowCatalog = false
      this.getRead(num)
    },
    nextChapter () {
      if (this.currentChapter >= this.chapters.length - 1) {
        this.currentChapter = this.chapters.length - 1
        this.$alert('当前为最后一章')
        return
      }
      this.currentChapter += 1
      this.goChapter(this.currentChapter)
    },
    prevChapter () {
      if (this.currentChapter === 0) {
        this.$alert('当前为第一章')
        return
      }
      this.currentChapter -= 1
      this.goChapter(this.currentChapter)
    },
    getTheme (msg) {
      this.themePage = msg
    },
    showCatalog (msg) {
      this.isShowCatalog = msg
      this.isShowOption = false
    },
    hideCatalog () {
      this.isShowCatalog = false
    },
    showOption () {
      this.isShowOption = !this.isShowOption
      this.isShowCatalog = false
    },
    getRead () {
      let lastChapter =
        this.currentChapter > this.chapters.length - 1
          ? this.chapters.length - 1
          : this.currentChapter
      _getBookRead(encodeURIComponent(this.chapters[lastChapter].link)).then(res => {
        this.book = res.data.chapter.cpContent
        this.title = this.chapters[this.currentChapter].title
        this.newBook = this.book.replace(/(\u3002+\u201d)$|(\u3002)|(\u3002|\u201d|\uff1f)$/, '\n').split('\n')
        this.$nextTick(window.scrollTo(0, 0))
      }).catch(err => {
        console.log(err)
      })
    },
    getChapters () {
      let localShelf = util.getLocalData('mybook')
        ? util.getLocalData('mybook')
        : {}
      let sourceId =
          localShelf[this.$route.params.id] &&
          localShelf[this.$route.params.id].source
            ? localShelf[this.$route.params.id].source
            : this.$store.state.sourceId
      _getBookChapters(sourceId).then(res => {
        this.chapters = res.data.chapters
        this.currentChapter =
          localShelf &&
          localShelf[this.$route.params.id] &&
          localShelf[this.$route.params.id].lastChapter
            ? localShelf[this.$route.params.id].lastChapter
            : 0
        this.getRead()
      })
    },
    getSource () {
      _getBookSource(this.$route.params.id).then(res => {
        this.sourceId = res.data[0]._id
        this.$store.commit('SetSourceId', res.data[0]._id)
        this.getChapters()
      })
    }
  },
  created () {
    this.getSource()
  }
}
</script>

<style lang="scss" scoped>
.read {
  background: #fff;
  line-height: 60px;
  overflow: hidden;
  &.dark {
    background: #222222;
    color: #808080;
  }
  &.light {
    background: #fff;
    color: #666;
  }
  .read-wrapper {
    padding: 40px;
    .title {
      font-size: 36px;
      padding-bottom: 20px;
    }
    .content {
      min-height: 100vh;
      font-size: 28px;
      margin-bottom: 40px;
      p {
        text-indent: 60px;
        margin: 20px 0;
      }
    }
  }
}
</style>
