import request from '@/api/http.js'
import qs from 'querystring'
// 获取带书籍数量的父分类
export function _getCategory () {
  return request({
    url: '/api/cats/lv2/statistics'
  })
}

// 获取排名分类
export function _getRank () {
  return request({
    url: '/api/ranking/gender'
  })
}

// 获取排行详情
export function _getRankDetail (rankid) {
  return request({
    url: '/api/ranking/' + rankid
  })
}
// https://api.zhuishushenqi.com/book/by-categories?gender=male&type=hot&major=%E5%A5%87%E5%B9%BB&minor=&start=0&limit=20
// 获取分类详情
export function _getCategoryList (categoryType) {
  let query = qs.stringify(categoryType)
  return request({
    url: '/api/book/by-categories?' + query
  })
}

// 获取书籍详情
export function _getBookDetail (id) {
  return request({
    url: '/api/book/' + id
  })
}

// 获取搜索热词
export function _getHotWords () {
  return request({
    url: '/api/book/search-hotwords'
  })
}

// 获取搜索结果
export function _getSearchResult (name) {
  return request({
    url: '/api/book/fuzzy-search?query=' + name
  })
}

// 获取书籍源
// http://localhost:8080/#/chapter/http://vip.zhuishushenqi.com/chapter/5885ddbb3bf8ae96650b4feb?cv=1555925116209
// http://novel.kele8.cn/book-sources?view=summary&book=567d2cb9ee0e56bc713cb2c0
export function _getBookSource (bookid) {
  // let bookSource = qs.stringify(bookid)
  return request({
    url: '/api/atoc?view=summary&book=' + bookid
  })
}
// 获取章节目录
export function _getBookChapters (id) {
  return request({
    url: '/api/atoc/' + id + '?view=chapters'
  })
}
// http://novel.kele8.cn/chapters/:link
// 获取章节内容
export function _getBookRead (link) {
  return request({
    url: '/content/chapter/' + link
  })
}
