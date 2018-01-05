
export default {
  getTimeline : state =>{
    return state.timeline
  },
  getDate : (state) => (date) => {
    return new Date(date).toDateString()
  },
  getSearch : (state) =>{
    return state.search
  },
  getSearchActive : (state) => {
    return state.searchActive
  },
  getUser : (state) => {
    return state.user
  }
}