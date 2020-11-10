<template>
  <div class="banner">
    <mu-carousel transition="fade" class="banner-img" interval=5000>
      <mu-carousel-item>
        <img :src="carouselImg1" />
      </mu-carousel-item>
      <mu-carousel-item>
        <img :src="carouselImg2" />
      </mu-carousel-item>
      <mu-carousel-item>
        <img :src="carouselImg3" />
      </mu-carousel-item>
      <mu-carousel-item>
        <img :src="carouselImg4" />
      </mu-carousel-item>
    </mu-carousel>
  </div>
</template>

<script>
import carouselImg1 from '@/assets/img/banner-1.jpg'
import carouselImg2 from '@/assets/img/banner-2.jpg'
import carouselImg3 from '@/assets/img/banner-3.jpg'
import carouselImg4 from '@/assets/img/banner-4.jpg'
export default {
  name: 'banner',
  data () {
    return {
      carouselImg1,
      carouselImg2,
      carouselImg3,
      carouselImg4
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 300px;
  .banner-img {
    width: 100%;
    height: 300px !important
  }
}
</style>
