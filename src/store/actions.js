import axios from 'axios'
import router from '@/router'
import * as types from './mutation_types'

export default {
  signin(context, { email, password}) {
    axios.post('/signin', {
      email,
      password
    })
    .then(result =>{
      context.commit(types.SAVE_TOKEN, {
        token: result.data.data.authorization,
        user: result.data.data.user
      })
      context.commit(types.LOGIN)
    })
  },
  signup(context, {name, username, email, password}){
    axios.post('/signup', {
      name,
      username,
      email,
      password
    })
    .then(result => {
      context.commit(types.SIGNUP)
    })
  },
  dataTimeline(context){
    axios.get('/photos')
    .then(result =>{
      console.log(result.data.data)
      context.commit(types.GET_TIMELINE, {
        data : result.data.data
      })
    })
  },
  postPhoto(context, {image, caption}){
    const data = new FormData()
    data.append('image', image)
    data.append('caption', caption)
    axios.post('/photos', data)
    .then(result =>{
      console.log(result)
      context.commit(types.CREATE_POST, {
        data : result.data.data
      })
    })
  },
  editPhoto(context, {id, caption}){
    axios.put(`/photos/${id}`,{
      caption : caption
    })
    .then(result => {
      context.commit(types.EDIT_POST, {
        data : result.data.data
      })
    })
  },
  deletePhoto(context, {id}){
    axios.delete(`/photos/${id}`)
    .then(result =>{
      context.commit(types.DELETE_POST, {
        data : result.data.data
      })
      console.log(result)
    })
  },
  addComment(context, {photoId, comment}){
    axios.post(`/photos/comment/${photoId}`,{
      comment : comment
    })
    .then(result => {
      console.log(result.data.data)
      context.commit(types.CREATE_COMMENT, {
        data : result.data.data
      })
    })
  },
  like(context, {data}){
    axios.put(`/photos/like/${data._id}`)
    .then(result => {
      context.commit(types.LIKE, {
        data : result.data.data
      })
    })
  },
  search(context, {query}){
    axios.get(`/search/${query}`)
    .then(result => {
      context.commit(types.SEARCH, {
        user : result.data.data.user,
        photo : result.data.data.photo
      })
    })
  },
  follow(context, {follow, user}){
    axios.put(`/users/follow/${user}`, {
      follow : follow
    })
    .then(result => {
      context.commit(types.FOLLOW_USER, {
        data: result.data.data
      })
    })
  },
  getUser(context, {user}){
    axios.get(`/users/${user}`)
    .then(result => {
      console.log(result)
      context.commit(types.GET_USER, {
        user : result.data.data
      })
    })
  }

}