<template>
    <div class="listview">
        <div class="list" v-for="(item, index) in List" :key="index" @click="getItem(item._id)">
          <div class="list-img"><img :src="imgUrl(List, index)" ></div>
          <div class="list-detail">
            <div class="title">{{item.title}}</div>
            <div class="author">
              <span class="author">{{item.author}}</span>
              <span class="split">|</span>
              <span class="type">{{item.majorCate}}</span>
              <span class="split">|</span>
              <span class="sub-type">{{item.minorCate}}</span>
            </div>
            <div class="desc">{{item.shortIntro}}</div>
            <div class="other">
              <div class="reader">{{item.latelyFollower}}在读</div>
              <span class="split">|</span>
              <div class="retention">{{item.retentionRatio}}%读者留存</div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import {staticPath} from '../../api/config'

export default {
  name: 'listview',
  data () {
    return {
    }
  },
  props: ['List'],
  methods: {
    getItem (id) {
      this.$router.push({
        path: '/bookDetail/' + id
      })
    },
    imgUrl (data, index) {
      return staticPath + data[index].cover
    }
  }
}
</script>

<style lang="scss" scoped>
.listview {
    background: #fff;
    margin-bottom: 90px;
   .list {
       display: flex;
       margin: 20px 0;
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
        }
        .desc {
          height: 80px;
          color: #bbbbbb;
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .other {
          display: flex;
          .reader {
            color: red;
          }
          .newword {
            background: #eee;
            border-radius: 20px;
            padding:0 10px;
          }
        }
      }
    }
}
</style>
