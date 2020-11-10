<template>
    <div class="list-wrapper">
      <header-bar :title="title"></header-bar>
      <list-view :List="list"></list-view>
    </div>
</template>

<script>
import { _getRankDetail } from '@/api/request'
import HeaderBar from 'components/header/header-bar'
import ListView from 'components/listview/listview'

export default {
  name: 'booklist',
  components: {
    HeaderBar,
    ListView
  },
  data () {
    return {
      list: {}
    }
  },
  props: {
    'title': String
  },
  created () {
    _getRankDetail(this.$store.state.RankList).then(res => {
      this.list = res.data.ranking.books.slice(0, 20)
    })
  }
}
</script>

<style lang="scss" scoped>
.list-wrapper {
  background: #fff;
  margin-top: 80px;
   .list {
    width: 100%;
    margin-top: 80px;
    padding-top: 10px;
    .list-wrapper {
      display: flex;
      margin: 20px;
      position: relative;
      .list-img {
        width: 160px;
        height: 200px;
        flex: 0 0 160px;
      }
      .list-detail {
        flex: 1;
        margin-left: 20px;
        line-height: 40px;
        font-size: 24px;
        .title {
          font-weight: bold;
          height: 40px;
        }
        .author {
          height: 40px;
        }
        .desc {
          height: 40px;
          color: #bbbbbb;
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .other {
          display: flex;
          height: 40px;
          .reader {
            color: black;
          }
          .retention {
            flex: 0 0 150px;
            font-size: 20px;
            color: red;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
