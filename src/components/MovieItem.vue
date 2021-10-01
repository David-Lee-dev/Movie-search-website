<template>
  <div class="movie" :style="{ backgroundImage: `url(${movie.Poster})` }">
    <div class="after"></div>
    <div class="info">
      <div class="year">
        {{ movie.Year }}
      </div>
      <div class="title">
        {{ movie.Title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";
.movie {
  $width: 200px;
  width: $width;
  height: $width * 3/ 2;
  margin: 10px;
  border-radius: 4px;
  background-color: $gray-400;
  background-size: cover;
  overflow: hidden;
  position: relative;
  .after {
    opacity: 0;
    z-index: 1;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 6px solid $primary;
    transition: opacity 0.25s;
    &:hover {
      opacity: 1;
    }
  }

  .info {
    background-color: rgba($black, 0.3);
    color: white;
    width: 100%;
    padding: 14px;
    font-size: 14px;
    text-align: center;
    position: absolute;
    left: 0px;
    bottom: 0px;
    backdrop-filter: blur(10px);
    .year {
      color: $primary;
    }
    .title {
      color: $white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>