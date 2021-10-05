<template>
  <Header />
  <!-- 라우터에서 랜더링해주는 페이지를 보여주는 컴포넌트 -->
  <RouterView />
  <Footer />
</template>

<script>
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang='scss'>
</style>