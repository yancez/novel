<template>
    <div class="read-wrapper">
        <div class="title">{{this.title}}</div>
        <div class="content">
            <p v-for="(item,index) in Content" :key="index">{{item}}</p>
        </div>
    </div>
</template>

<script>
import _ from "lodash";

export default {
    data () {
        return {
        }
    },
    props: ['title', 'bookContent'],
    computed: {
        Content () {
            if (!_.isEmpty(this.bookContent)) {
                let text =
                this.bookContent && this.bookContent.cpContent ? "cpContent" : "body";
                return this.bookContent.replace(/(\u3002+\u201d)$|(\u3002)|(\u3002|\u201d|\uff1f)$/, '\n').split('\n')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.read-wrapper {
    padding: 40px;
    .title {
      font-size: 36px;
      padding-bottom: 20px;
    }
    .content {
      p {
        text-indent: 60px;
        margin: 20px 0;
      }
    }
  }
</style>