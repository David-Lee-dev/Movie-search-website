<template>
  <div class="about">
    <div class="photo">
      <div></div>
    </div>
    <div class="name">{{ name }}</div>
    <div>{{ email }}</div>
    <div>{{ blog }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("about", ["name", "email", "blog", "phone"]),
  },
};
</script>

<style lang="scss" scoped>
.about {
  text-align: center;
  .photo {
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 30px;
    border: 10px solid #dee2e6;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: #e9ecef;
    position: relative;
    .img {
      width: 100%;
    }
  }
  .name {
    font-size: 40px;
    font-family: "Oswald", sans-serif;
    margin-bottom: 20px;
  }
  div {
    box-sizing: border-box;
  }
}
</style>