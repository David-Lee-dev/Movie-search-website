<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div v-for="nav in navigations" :key="nav.name" class="nap-item">
        <RouterLink :to="nav.href" active-class="active" class="nav-link">
          {{ nav.name }}
        </RouterLink>
      </div>
      <div class="user">aa</div>
    </div>
  </header>
</template>

<script>
import Logo from "~/components/Logo";
export default {
  components: {
    Logo,
  },
  data() {
    return {
      navigations: [
        {
          name: "Search",
          href: "/",
        },
        {
          name: "Movie",
          href: "/movie",
        },
        {
          name: "About",
          href: "/about",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
header {
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 40px;
  position: relative;
  a {
    &.logo {
      margin-right: 40px;
    }
    box-sizing: border-box;
  }
  .user {
    background-color: #000;
    width: 40px;
    height: 40px;
    padding: 6px;
    border-radius: 50%;
    box-sizing: border-box;
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    margin: auto;
    transition: 0.4s;
  }
}
</style>