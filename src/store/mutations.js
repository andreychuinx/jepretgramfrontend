import * as types from './mutation_types'
import router from '@/router'
import axios from 'axios'

export default {
  [types.LOGIN](state) {
    router.push('/home')
  },
  [types.SIGNUP](state){
    router.push('/')
  },
  [types.SAVE_TOKEN](state, { token, user }){
    let dataUser = JSON.stringify(user)
    localStorage.setItem('token', token)
    localStorage.setItem('user', dataUser)
    axios.defaults.headers.common['authorization'] = token
  },
  [types.GET_USER](state, {user}){
    state.user = user
  },
  [types.GET_TIMELINE](state, { data }){
    state.timeline = data
  },
  [types.CREATE_POST](state, { data }){
    let newTimeline = [data, ...state.timeline]
    state.timeline = newTimeline
    router.push('/home')
  },
  [types.EDIT_POST](state, { data }){
    state.timeline = state.timeline.map(photo => {
      if(photo._id == data._id){
        return data
      }else{
        return photo
      }
    })
  },
  [types.DELETE_POST](state, { data }){
    state.timeline = state.timeline.filter(photo => {
      return photo._id !== data._id
    })
  },
  [types.CREATE_COMMENT](state, { data }){
    console.log(data)
    state.timeline = state.timeline.map(photo => {
      if(photo._id == data._id){
        return data
      }else{
        return photo
      }
    })
    console.log(state.timeline)
  },
  [types.LIKE](state, { data }){
    state.timeline = state.timeline.map(photo => {
      if(photo._id == data._id){
        return data
      }else{
        return photo
      }
    })
  },
  [types.SEARCH](state, { user, photo }){
    state.search.user = user,
    state.search.photo = photo,
    state.searchActive = true
  },
  [types.FOLLOW_USER](state, {data}){
    state.user = data
  }
}