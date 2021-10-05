//스토어 구성
import {
  createStore
} from 'vuex'
import movie from './movie'
import about from './about'
// import about from './about'
export default createStore({
  modules: {
    movie,
    about
    // about
  }
})