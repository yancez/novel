<template>
  <div class="mybook-wrapper">
    <header-bar :title="title"></header-bar>
    <div class="mybook">
      <ul class="mybook-list">
        <li class="mybook-item"
          v-for="(book, key) in followbook" :key="key"
          @click="readbook(key)">
          <img :src="book.cover"
          @touchstart="ontouchStart(key)"
          @touchmove="ontouchmove()"
          @touchend="ontouchend()"
          />
          <p class="title">{{book.title}}</p>
        </li>
        <li class="mybook-item add" @click="$router.push('/')">
          <i class="iconfont icon-add"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import HeaderBar from 'components/header/header-bar'
import { staticPath } from '@/api/config'
import { _getBookSource } from '@/api/request'
import util from '@/api/util'

export default {
  data () {
    return {
      title: '我的书架',
      followbook: {},
      timer: null
    }
  },
  components: {
    HeaderBar
  },
  methods: {
    ontouchStart (id) {
      this.timer = setTimeout(() => {
        this.$confirm('是否移除书架', '移除书架').then((result) => {
          if (result.result) {
            let localShelf = util.getLocalData('mybook')
              ? util.getLocalData('mybook')
              : {}
            delete localShelf[id]
            util.setLocalData('mybook', localShelf)
            this.getFollowBook()
          }
        }).catch(err => {
          console.log(err)
        })
      }, 1500)
    },
    ontouchmove () {
      clearTimeout(this.timer)
    },
    ontouchend () {
      clearTimeout(this.timer)
    },
    readbook (id) {
      let localShelf = util.getLocalData('mybook') ? util.getLocalData('mybook') : {}
      if (!localShelf[id].source) {
        _getBookSource(this.followbook[id].followId).then(res => {
          this.$store.commit('SetSourceId', res.data[0]._id)
        })
      } else {
        this.$store.commit('SetSourceId', localShelf[id].source)
      }
      this.$store.commit('SetBookInfo', localShelf[id])
      this.$router.push('/read/' + id)
    },
    getFollowBook () {
      let localShelf = util.getLocalData('mybook')
        ? util.getLocalData('mybook')
        : {}
      if (localShelf) {
        for (let id in localShelf) {
          localShelf[id].cover = staticPath + localShelf[id].cover
          this.followbook = localShelf
        }
        // console.log(localShelf)
      }
    }
  },
  created () {
    this.getFollowBook()
  }
}
</script>

<style lang="scss" scoped>
.mybook-wrapper {
  width: 100%;
  height: auto;
  min-height: 1000px;
  margin-top: 80px;
  background: #fff;
  color: #000;
  .mybook {
    padding: 20px 15px;
    .mybook-list {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 60px;
      .mybook-item {
        width: 200px;
        height: 250px;
        margin: 20px 20px 50px;
        border-radius: 5px;
        box-shadow: 0 0 8px #ccc;
        &.add {
          background: #fff;
          line-height: 250px;
          text-align: center;
          color: #ccc;
          i {
            font-weight: 400;
            font-size: 48px;
          }
        }
        .title {
          margin-top: 10px;
          font-size: 28px;
        }
      }
    }
  }
}
</style>
