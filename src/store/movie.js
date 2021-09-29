import axios from "axios";
import _uniqBy from 'lodash/uniqBy'

export default {
  namespaced: true,
  state: () => ({
    movies: [],
  }),
  getters: {},
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMoives(state) {
      state.movies = []
    }
  },
  actions: {
    async searchMovies(context, payload) {
      const {
        title,
        type,
        number,
        year
      } = payload
      const OMDB_API_KEY = "7035C60C";
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`
      );
      const {
        Search,
        totalResults
      } = res.data
      context.commit('updateState', {
        movies: _uniqBy(Search, 'imdbID'),
      })
      const total = parseInt(totalResults, 10)
      const pageLength = Math.ceil(total / 10)

      console.log(total, pageLength)

      if (pageLength > 1) {
        for (let page = 2; page <= pageLength; page += 1) {
          if (page > (number / 10)) break
          const res = await axios.get(
            `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
          const {
            Search
          } = res.data
          context.commit('updateState', {
            movies: [
              ...context.state.movies,
              ..._uniqBy(Search, 'imdbID')
            ],
          })
        }
      }
    },
  }
}