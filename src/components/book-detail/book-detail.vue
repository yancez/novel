<template>
  <div class="book-detail-wrapper" v-if="bookDetail">
    <header-bar :title="title"></header-bar>
    <div class="book">
      <div class="book-detail">
        <div class="book-img">
          <img :src="Imgurl()" />
        </div>
        <div class="book-desc">
          <div class="title">{{bookDetail.title}}</div>
          <div class="author">
            <span>{{bookDetail.author}}</span>
            <span class="split">|</span>
            <span>{{bookDetail.minorCate}}</span>
            <span class="split">|</span>
            <span v-html="wordTotal(wordCount)"></span>
          </div>
          <div class="tags">
            <span class="tag" v-for="(tag,index) in tags.slice(0,3)" :key="index">{{tag}}</span>
          </div>
          <div class="update" v-html="'最后更新:' + formateDate(updated)"></div>
        </div>
      </div>
      <div class="read-link">
        <a class="button" v-html="isfollowed ? '已在书架': '加入书架'" @click="followAction"></a>
        <a class="button read" @click="getItem(bookId)">开始阅读</a>
      </div>
      <div class="reader-data">
        <div class="item">
          <span class="follower">追人气</span>
          <span class="total" v-html="follower(latelyFollower)"></span>
        </div>
        <div class="item">
          <span class="retention">读者留存率</span>
          <span class="total">{{bookDetail.retentionRatio}}%</span>
        </div>
        <div class="item">
          <span class="serialize ">日更字数</span>
          <span class="total">{{bookDetail.serializeWordCount}}</span>
        </div>
      </div>
      <div class="introduction">
        <p class="text">{{bookDetail.longIntro}}</p>
      </div>
      <div class="catalogue">
        <span class="text">目录</span>
        <div class="title" @click="quickRead">
          <span>{{bookDetail.lastChapter}}</span>
          <i class="iconfont icon-back">></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from 'components/header/header-bar'
import { _getBookDetail, _getBookSource } from '@/api/request'
import { staticPath } from '@/api/config'
import util from '@/api/util'

export default {
  data () {
    return {
      bookDetail: [],
      bookId: '',
      cover: '',
      updated: '',
      wordCount: '',
      latelyFollower: '',
      tags: [],
      'title': '书籍详情',
      isfollowed: false
    }
  },
  components: {
    HeaderBar
  },
  methods: {
    quickRead () {
      let localShelf = util.getLocalData('mybook')
      if (localShelf[this.bookId]) {
        localShelf[this.bookId].lastChapter = this.bookDetail.chaptersCount - 1
      } else {
        localShelf[this.bookId] = {
          title: this.bookDetail.title,
          cover: this.bookDetail.cover,
          source: this.$store.state.sourceId,
          lastChapter: this.bookDetail.chaptersCount - 1,
          isTemporary: true
        }
      }
      if (localShelf[this.bookId].source) {
        this.$store.commit('SetSourceId', localShelf[this.bookId].source)
        util.setLocalData('mybook', localShelf)
        this.$router.push('/read/' + this.bookId)
      }
    },
    isFollow () {
      let localShelf = util.getLocalData('mybook')
      this.isfollowed = !!(localShelf && localShelf[this.bookId])
    },
    followAction () {
      let localShelf = util.getLocalData('mybook') ? util.getLocalData('mybook') : {}
      if (this.isfollowed) {
        delete localShelf[this.bookId]
        util.setLocalData('mybook', localShelf)
        this.isfollowed = !this.isfollowed
      } else {
        localShelf[this.bookId] = {
          title: this.bookDetail.title,
          cover: this.bookDetail.cover,
          source: this.$store.state.sourceId,
          lastChapter: this.bookDetail.chaptersCount - 1,
          isTemporary: false
        }
        util.setLocalData('mybook', localShelf)
        this.isfollowed = !this.isfollowed
      }
    },
    getItem () {
      this.$router.push('/read/' + this.bookId)
    },
    follower (count) {
      if (count / 10000 > 0) {
        return parseFloat((count / 10000).toFixed(2)) + '万'
      }
    },
    wordTotal (count) {
      if (count / 10000 > 0) {
        return parseInt(count / 10000) + '万字'
      }
    },
    formateDate (datetime) {
      function addDateZero (num) {
        return (num < 10 ? '0' + num : num)
      }
      let d = new Date(datetime)
      let formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds())
      return formatdatetime
    },
    Imgurl () {
      return staticPath + this.cover
    }
  },
  created () {
    _getBookDetail(this.$route.params.id).then(res => {
      this.tags = res.data.tags
      this.latelyFollower = res.data.latelyFollower
      this.wordCount = res.data.wordCount
      this.updated = res.data.updated
      this.cover = res.data.cover
      this.bookId = res.data._id
      this.bookDetail = res.data
      this.isFollow()
      this.$store.commit('SetBookInfo', res.data)
    })
    _getBookSource(this.$route.params.id).then(res => {
      this.sourceId = res.data[0]._id
      this.$store.commit('SetSourceId', res.data[0]._id)
    })
    this.Imgurl()
  }
}
</script>

<style lang="scss" scoped>
.book-detail-wrapper {
  background: #fff;
  .book {
    margin-bottom: 80px;
    .book-detail {
      margin-top: 80px;
      padding: 30px 30px;
      display: flex;
      .book-img {
        width: 150px;
        height: 200px;
        flex: 0 0 150px;
      }
      .book-desc {
        flex: 1;
        margin-left: 20px;
        line-height: 50px;
        .title {
          height: 50px;
          font-size: 30px;
        }
        .author {
          height: 50px;
          span:first-child {
            color: red;
          }
        }
        .tags {
          height: 50px;
          .tag {
            display: inline-block;
            padding: 5px 10px ;
            border: 1px solid skyblue;
            border-radius: 10px;
            margin: 0 5px;
            height: 40px;
            vertical-align: middle;
            line-height: 30px;
          }
        }
        .update {
          height: 50px;
        }
      }
    }
    .read-link {
      margin-top: 40px;
      display: flex;
      justify-content: center;
      padding-bottom: 40px;
      .button {
        padding: 40px 80px;
        text-align: center;
        margin: 0 40px;
        border: 1px solid salmon;
        font-size: 30px;
      }
      .read {
        background: red;
        color: #fff;
      }
    }
    .reader-data {
      display: flex;
      justify-content: center;
      border-bottom: 1px solid #ebebeb;
      border-top: 1px solid #ebebeb;
      .item {
        width: 33%;
        height: 120px;
        line-height: 60px;
        text-align: center;
        display: flex;
        flex-direction: column;
        color: #999;
        .total {
          color: #000;
          font-size: 32px;
        }
      }
    }
    .introduction {
      padding: 40px;
      .text {
        font-size: 26px;
        line-height: 40px;
      }
    }
    .catalogue {
      padding: 0 20px;
      height: 80px;
      line-height: 80px;
      border-bottom: 1px solid #ebebeb;
      border-top: 1px solid #ebebeb;
      .text {
        float: left;
      }
      .title {
        float: right;
        color: #bbb;
      }
    }
  }
}
</style>
