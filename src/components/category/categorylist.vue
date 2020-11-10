<template>
    <div class="list-wrapper">
      <header-bar :title="title"></header-bar>
      <list-view :List="list" class="categorylist"></list-view>
    </div>
</template>

<script>
import { _getCategoryList } from '@/api/request'
import HeaderBar from 'components/header/header-bar'
import ListView from 'components/listview/listview'

export default {
  name: 'list',
  components: {
    HeaderBar,
    ListView
  },
  data () {
    return {
      list: {},
      'title': '分类详情'
    }
  },
  methods: {
  },
  created () {
    _getCategoryList(this.$route.query).then(res => {
      this.list = res.data.books
    })
  }
}
</script>

<style lang="scss" scoped>
.categorylist {
  margin-top: 80px;
}
</style>
