<template>
  <div class="rank">
    <header-bar :title="title"></header-bar>
    <mu-container class="rank-wrapper">
      <mu-tabs :value.sync="active" inverse color="#f00" full-width indicator-color="#f00" class="tabs">
        <mu-tab class="male" v-for="(item, index) in male" :key="index" @click="getList(item._id)" >{{item.shortTitle}}</mu-tab>
      </mu-tabs>
      <div class="list-wrapper" v-for="(length,index) in male.length" :key="index">
        <div class="list" v-if="active === length-1">
          <list-view :List="books"></list-view>
        </div>
      </div>
    </mu-container>
  </div>
</template>

<script>
import HeaderBar from 'components/header/header-bar'
import {staticPath} from '@/api/config'
import { _getRank, _getRankDetail } from '@/api/request'
import ListView from 'components/listview/listview'
// import BScroll from 'better-scroll'

export default {
  data () {
    return {
      active: 0,
      male: [],
      books: [],
      rankid: '',
      title: '排行榜',
      actId: ''
    }
  },
  components: {
    HeaderBar,
    ListView
  },
  methods: {
    getItem (list) {
      this.$store.commit('SetRankList', list)
      this.$router.push({
        path: '/bookDetail/' + list
      })
    },
    getList (id) {
      this.rankid = id
      this.$store.commit('SetRankId', id)
      this.$router.push({path: '/rank/' + this.rankid})
      this.getRankDetail()
    },
    getRankDetail () {
      _getRankDetail(this.rankid).then(res => {
        this.books = res.data.ranking.books.slice(0, 20)
      }).catch(err => {
        console.log(err)
      })
    },
    imgUrl (index) {
      return staticPath + this.books[index].cover
    }
  },
  mounted () {
  },
  created () {
    _getRank().then(res => {
      this.male = res.data.male.slice(0, 6)
      this.actId = res.data.male[this.active]._id
      this.getList(this.actId)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="scss" scoped>
.rank {
  margin-top: 80px;
  .rank-wrapper {
    padding:0;
    background: #fff;
    .tabs {
      height: 80px;
      overflow: scroll;
      &.active {
        background: #fff;
      }
    }
  }
}
</style>
