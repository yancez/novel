<template>
  <div id="app">
    <tab v-if="$route.meta.showTab"></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import Tab from 'components/tab/tab'

export default {
  components: {
    Tab
  }
}
</script>

<style lang="scss" scoped>
</style>
