import Vue from 'vue'
import Router from 'vue-router'
import BookMall from 'components/bookmall/bookmall'
import BookList from 'components/bookmall/booklist'
import Search from 'components/search/search'
import Mybook from 'components/mybook/mybook'
import BookDetail from 'components/book-detail/book-detail'
import Category from 'components/category/category'
import CategoryList from 'components/category/categorylist'
import Rank from 'components/rank/rank'
import Tab from 'components/tab/tab'
import Read from 'components/read/read'
import ReadOption from 'components/read/read-option'
import ReadCatalog from 'components/read/read-catalog'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'bookmall'
    },
    {
      path: '/bookmall',
      component: BookMall,
      meta: {
        showTab: true,
        keepAlive: true
      }
    },
    {
      path: '/booklist/:id',
      component: BookList,
      meta: {
        showTab: true,
        keepAlive: true
      }
    },
    {
      path: '/bookDetail/:id',
      component: BookDetail,
      meta: {
        showTab: true,
        keepAlive: false
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showTab: true,
        keepAlive: false
      }
    },
    {
      path: '/mybook',
      component: Mybook,
      meta: {
        showTab: true,
        keepAlive: false
      }
    },
    {
      path: '/category',
      component: Category,
      meta: {
        showTab: true,
        keepAlive: true
      }
    },
    {
      path: '/categorylist',
      component: CategoryList,
      meta: {
        showTab: true
      }
    },
    {
      path: '/rank/:id',
      component: Rank,
      meta: {
        showTab: true,
        keepAlive: true
      }
    },
    {
      path: '/rank',
      component: Rank,
      meta: {
        showTab: true,
        keepAlive: true
      }
    },
    {
      path: '/tab',
      component: Tab
    },
    {
      path: '/read/:id',
      component: Read,
      meta: {
        showTab: false,
        keepAlive: false
      }
    },
    {
      path: '/read-option',
      component: ReadOption
    },
    {
      path: '/read-catalog',
      component: ReadCatalog
    }
  ]
})
