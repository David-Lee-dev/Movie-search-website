import axios from "axios";
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'

export default {
  namespaced: true,
  state: () => ({
    movies: [],
    message: _defaultMessage,
    // loading: false,
    theMovie: {}
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
      state.message = _defaultMessage
      // state.loading = false
    }
  },
  actions: {
    async searchMovies(context, payload) {
      // if (context.state.loading) return
      context.commit('updateState', {
        message: '',
        // loading: true
      })
      try {
        const res = await _fetchMovie({
          ...payload,
          page: 1
        })
        const {
          Search,
          totalResults
        } = res.data
        context.commit('updateState', {
          movies: _uniqBy(Search, 'imdbID'),
        })
        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10)
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page += 1) {
            if (page > (payload.number / 10)) break
            const res = await _fetchMovie({
              ...payload,
              page
            })
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
      } catch (error) {
        context.commit('updateState', {
          movies: [],
          message: error.message
        })
      } finally {
        context.commit('updateState', {
          // loading: false
        })
      }
    },
    async searchMovieWithId(context, payload) {
      // if (context.state.loading) return
      context.commit('updateState', {
        theMovie: {},
        // loading: true
      })
      try {
        const res = await _fetchMovie(payload)
        context.commit('updateState', {
          theMovie: res.data
        })
      } catch (error) {
        context.commit('updateState', {
          theMovie: {}
        })
      } finally {
        context.commit('updateState', {
          // loading: false
        })
      }
    }
  }
}
async function _fetchMovie(payload) {
  return await axios.post('/.netlify/functions/movie', payload)
}

// function _fetchMovie(payload) {
//   const {
//     title,
//     type,
//     year,
//     page,
//     id
//   } = payload
//   const OMDB_API_KEY = "7035c60c";
//   const url = id ?
//     `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` :
//     `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
//   return new Promise((resolve, reject) => {
//     axios.get(url)
//       .then(res => {
//         if (res.data.Error) {
//           reject(err.data.Error)
//         }
//         resolve(res)
//       })
//       .catch(() => {
//         reject("Request failed with status code 400")
//       })
//   })
// }