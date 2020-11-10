// import _ from 'loadsh'
const localStorage = window.localStorage
export default {
  getLocalData (item) {
    return JSON.parse(localStorage.getItem(item))
  },
  setLocalData (item, obj) {
    localStorage.setItem(item, JSON.stringify(obj))
  }
}
