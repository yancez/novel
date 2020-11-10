<template>
  <div>
    <header-bar :title="title"></header-bar>
    <div class="category-wrapper">
      <div class="category" v-for='(item,index) in category' :key='item.index' @click="getlist(item)">
        <div class="item">
          <span class="item-title">{{item.name}}</span>
          <span class="item-count">{{item.bookCount}}本</span>
        </div>
        <img class="item-img" :src='imgUrl(index)' />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from 'components/header/header-bar'
import { _getCategory } from '@/api/request'
import {staticPath} from '@/api/config'

export default {
  data () {
    return {
      category: [],
      title: '分类'
    }
  },
  components: {
    HeaderBar
  },
  methods: {
    getlist (item) {
      this.$router.push({
        path: 'categorylist',
        query: { gender: 'male', type: 'hot', major: item.name, start: 0, limit: 20 }
      })
    },
    imgUrl (index) {
      return staticPath + this.category[index].bookCover[2]
    }
  },
  created () {
    _getCategory().then(res => {
      this.category = res.data.male
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="scss" scoped>
.category-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 100px 5px;
  background: #fff;
  .category {
    width: 330px;
    height: 180px;
    border-radius: 20px;
    background: #eee;
    margin: 10px 20px;
    display: flex;
    .item {
      display: flex;
      flex-direction: column;
      text-align: center;
      flex: 1;
      justify-content: center;
      font-size: 24px;
      .item-title {
        font-size: 26px;
        margin: 10px 0;
        font-weight: bold;
      }
    }
    .item-img {
      width: 120px;
      height: 180px;
      flex: 0 0 140px;
      padding: 10px;
      border-radius: 10px;
    }
  }
}
</style>
