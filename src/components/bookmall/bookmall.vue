<template>
    <div class="bookmall-wrapper">
      <search-tab></search-tab>
      <banner></banner>
      <div class="hot">
        <div class="title-wrapper">
          <div class="title">热门推荐</div>
          <div class="more" @click="getList(hotId)">
            <span>更多</span>
            <i class="iconfont icon-arrow-right-bold"></i>
            <!-- <mu-icon class="more-icon" value="keyboard_arrow_right" size="24"></mu-icon> -->
          </div>
        </div>
        <div class="hot-wrapper">
          <div class="hot-item" v-for="(item,index) in hot" :key="index" @click="getItem(item._id)">
            <div class="hot-img"><img :src="imgUrl(hot,index)"></div>
            <div class="hot-title">{{item.title}}</div>
          </div>
        </div>
      </div>
      <div class="good">
        <div class="title-wrapper">
          <div class="title">书友好评</div>
          <div class="more" @click="getList(goodId)">
            <span>更多</span>
            <i class="iconfont icon-arrow-right-bold"></i>
          </div>
        </div>
        <div class="good-wrapper" v-for="(item,index) in good" :key="index"  @click="getItem(item._id)">
          <div class="good-img"><img :src="imgUrl(good,index)" ></div>
          <div class="good-detail">
            <div class="title">{{item.title}}</div>
            <div class="desc">{{item.shortIntro}}</div>
            <div class="other">
              <div class="author">{{item.author}}</div>
              <div class="reader">{{item.latelyFollower}}人在读</div>
            </div>
          </div>
        </div>
      </div>
      <div class="over">
        <div class="title-wrapper">
          <div class="title">大神完本</div>
          <div class="more" @click="getList(overId)">
            <span>更多</span>
            <i class="iconfont icon-arrow-right-bold"></i>
          </div>
        </div>
        <div class="over-wrapper">
          <div class="over-item" v-for="(item,index) in over" :key="index"  @click="getItem(item._id)">
            <div class="over-img"><img :src="imgUrl(over,index)"></div>
            <div class="over-title">{{item.title}}</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import SearchTab from 'components/search-bar/search-bar'
import Banner from 'components/banner/banner'
import {staticPath} from '../../api/config'
import { _getRank, _getRankDetail } from '@/api/request'

export default {
  name: 'bookmall',
  components: {
    SearchTab,
    Banner
  },
  data () {
    return {
      hot: [],
      good: [],
      over: [],
      hotId: '',
      goodId: '',
      overId: '',
      rankList: []
    }
  },
  methods: {
    getList (id) {
      this.$store.commit('SetRankList', id)
      this.$router.push('/bookList/' + id)
    },
    getItem (id) {
      this.$store.commit('SetBookId', id)
      this.$router.push({
        path: '/bookDetail/' + id
      })
    },
    imgUrl (data, index) {
      return staticPath + data[index].cover
    }
  },
  created () {
    _getRank().then(res => {
      this.hotId = res.data.male[0]._id
      this.goodId = res.data.male[1]._id
      this.overId = res.data.male[6]._id
      _getRankDetail(this.hotId).then(res => {
        this.hot = res.data.ranking.books.splice(0, 3)
      })
      _getRankDetail(this.goodId).then(res => {
        this.good = res.data.ranking.books.splice(0, 3)
      })
      _getRankDetail(this.overId).then(res => {
        this.over = res.data.ranking.books.splice(0, 6)
      })
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="scss" scoped>
.bookmall-wrapper {
  width: 100%;
  height: auto;
  background: #fff;
  .hot {
    width: 100%;
    .title-wrapper {
      display: flex;
      margin: 20px 0;
      padding-left: 20px;
      position: relative;
      font-size: 28px;
      .title {
        flex: 1;
        &::after{
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 30px;
          border-radius: 20px;
          border-left: 6px solid red;
        }
      }
      .more {
        flex: 0 0 100px;
        font-size: 24px;
        color: #999999;
      }
    }
    .hot-wrapper {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      flex-direction: row;
      margin: 20px;
      font-size: 20px;
      .hot-item {
        .hot-img {
          width: 160px;
          height: 200px;
        }
        .hot-title {
          width: 160px;
          margin-top: 15px;
          text-align: center;
          overflow : hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .good {
    width: 100%;
    .title-wrapper {
      display: flex;
      margin: 20px 0;
      position: relative;
      padding-left: 20px;
      font-size: 28px;
      .title {
        flex: 1;
        &::after{
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 30px;
          border-radius: 20px;
          border-left: 6px solid red;
        }
      }
      .more {
        flex: 0 0 100px;
        font-size: 24px;
        color: #999999;
      }
    }
    .good-wrapper {
      display: flex;
      margin: 20px;
      position: relative;
      .good-img {
        width: 160px;
        height: 200px;
        flex: 0 0 160px;
      }
      .good-detail {
        flex: 1;
        margin-left: 20px;
        line-height: 30px;
        font-size: 24px;
        color: #bbb;
        .title {
          color: black;
        }
        .desc {
          height: 120px;
          overflow : hidden;
          text-overflow: ellipsis;
          padding: 8px 0;
        }
        .other {
          display: flex;
          padding-top: 20px;
          .author {
            flex: 1;
            color: black;
          }
          .reader {
            flex: 0 0 140px;
            font-size: 20px;
            color: red;
            text-align: center;
          }
        }
      }
    }
  }
  .over {
    width: 100%;
    .title-wrapper {
      display: flex;
      margin: 20px 0;
      position: relative;
      padding-left: 20px;
      font-size: 28px;
      .title {
        flex: 1;
        &::after{
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 30px;
          border-radius: 20px;
          border-left: 6px solid red;
        }
      }
      .more {
        flex: 0 0 100px;
        font-size: 24px;
        color: #999999;
      }
    }
    .over-wrapper {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      flex-direction: row;
      margin:20px 20px 75px 20px;
      font-size: 24px;
      .over-item {
        margin:0 20px 20px 20px;
        .over-img {
          width: 160px;
          height: 200px;
        }
        .over-title {
          width: 160px;
          margin-top: 10px;
          text-align: center;
          overflow : hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
