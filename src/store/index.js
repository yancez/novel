import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let state = {
  CategoryList: {},
  RankList: {},
  BookInfo: {},
  bookId: '',
  rankId: '',
  sourceId: ''
}
let mutations = {
  SetCategoryList (state, list) {
    state.CategoryList = list
  },
  SetRankList (state, list) {
    state.RankList = list
  },
  SetBookInfo (state, book) {
    state.BookInfo = book
  },
  SetBookId (state, index) {
    state.bookId = index
  },
  SetRankId (state, index) {
    state.rankId = index
  },
  SetSourceId (state, index) {
    state.sourceId = index
  }
}

export default new Vuex.Store({
  state,
  mutations
})
