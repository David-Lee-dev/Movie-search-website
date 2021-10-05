<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div v-for="nav in navigations" :key="nav.name" class="nap-item">
        <RouterLink
          :to="nav.href"
          active-class="active"
          class="nav-link"
          :class="{ active: isMatch(nav.path) }"
        >
          {{ nav.name }}
        </RouterLink>
      </div>
      <RouterLink class="user" :to="navigations[2].href"></RouterLink>
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
          href: "/movie/tt4520988",
          path: /^\/movie/,
        },
        {
          name: "About",
          href: "/about",
        },
      ],
    };
  },
  methods: {
    isMatch(path) {
      if (!path) return false;
      return path.test(this.$route.fullPath);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";
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
    background-color: $gray-200;
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
    transition: 0.4s;
    &:hover {
      background-color: darken($gray-200, 10%);
    }
  }
  @include media-breakpoint-down(sm) {
    .nav {
      display: none;
    }
  }
}
</style>