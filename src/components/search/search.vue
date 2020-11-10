<template>
    <div class="search-wrapper">
      <header-bar :title="title"></header-bar>
      <div class="search-input">
        <div class="search-left">
          <i class="iconfont icon-search"></i>
          <input class="input" type="text" placeholder="请输入搜索的内容" v-model="text">
        </div>
        <div class="search-right">
          <span class="search-confirm" @click="getList(text)">确定</span>
        </div>
      </div>
      <div class="other-search" v-if="search === '0'">
        <div class="hot-search">
          <div class="hot-title">热门搜索</div>
          <div class="hot-tags">
              <div class="tag"  v-for="(item, index) in hotWords" :key="index" @click="getItem(item.book)">{{item.word}}</div>
          </div>
        </div>
        <!-- <div class="history">
          <div class="history-title">搜索历史</div>
        </div> -->
      </div>
      <div class="search-result" v-if="search === '1'">
        <list-view :List="result"></list-view>
      </div>
      <div class="no-result" v-if="search === '2'">暂无结果</div>
    </div>
</template>

<script>
import HeaderBar from 'components/header/header-bar'
import ListView from 'components/listview/listview'
import { _getHotWords, _getSearchResult } from '@/api/request'

export default {
  name: 'search',
  components: {
    HeaderBar,
    ListView
  },
  data () {
    return {
      hotWords: [],
      text: '',
      result: [],
      'title': '搜索',
      search: '0'
    }
  },
  methods: {
    getItem (id) {
      this.$router.push({
        path: '/bookDetail/' + id
      })
    },
    getList (value) {
      if (value.length === 0) {
        console.log('搜索内容为空')
        this.search = '0'
      } else {
        _getSearchResult(value).then(res => {
          if (res.data.total) {
            this.result = res.data.books
            // console.log(res)
            this.search = '1'
          } else {
            this.search = '2'
          }
        })
      }
    }
  },
  created () {
    _getHotWords().then(res => {
      this.hotWords = res.data.newHotWords
      // console.log(res.data.newHotWords)
    })
  }
}
</script>

<style lang="scss" scoped>
.search-wrapper {
  margin-top: 80px;
  width: 100%;
  height: 100%;
  min-height: 1000px;
  background: #fff;
  .search-input {
    width: 100%;
    padding: 20px;
    display: flex;
    .search-left {
      width: 85%;
      height: 100px;
      line-height: 100px;
      font-size: 24px;
      background: #ebebf0;
      border-radius: 50px;
      .icon-search {
        font-size: 36px;
        margin: 0 20px;
      }
      .input {
        outline:none;
        border: none;
        background: #ebebf0;
        width: 70%;
        height: 90%;
      }
    }
    .search-right {
      width: 14%;
      margin-left: 1%;
      line-height: 100px;
      text-align: center;
      .search-confirm {
        font-size: 30px;
        display: inline-block;
        color: #748389;
      }
    }
  }
  .other-search {
    .hot-search {
      font-size: 0;
      padding: 0 20px;
      .hot-title {
        font-size: 36px;
        margin-bottom: 40px;
      }
      .hot-tags {
        display: flex;
        flex-wrap: wrap;
        .tag {
          width: auto;
          height: 50px;
          line-height: 50px;
          padding: 0 20px;
          margin: 0 30px 30px 0;
          border-radius: 20px;
          font-size: 32px;
          background: #efeff4;
          color: #9b9ba3;
        }
      }
    }
    .history {
      padding: 0 20px;
      .history-title {
        font-size: 36px;
      }
    }
  }
  .no-result {
    margin: 150px 0;
    color: #999;
    text-align: center;
    font-size: 32px;
  }
}
</style>
