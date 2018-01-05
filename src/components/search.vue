<template>

  <div class="container">
    <header-template>
    </header-template>
    <div class="col-lg-12 col-md-12 col-xs-6">
      <b-form @submit="onSubmit">
        <b-form-group label-size="lg" label="search">
          <b-form-input id="input" v-model="search" placeholder="Enter something" label="search">
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>

    </div><br>
    <div class="col-lg-12 col-md-12 col-xs-6">
      <b-card no-body>
        <b-tabs pills card vertical>
          <b-tab title="User" active>
            <div v-if="getSearchActive">
              <div v-for="user in getSearch.user" class="header col-lg-12 text-center">
                <span class="prf-pic"><img src="http://image.mp3.zdn.vn/thumb/165_165/avatars/f/3/f3ccdd27d2000e3f9255a7e3e2c48800_1349926257.jpg"></span>
                <span class="account-name">{{user.username}}</span>
                <div class="account-follow">
                  <b-button :variant="followColor(user._id).color" @click="follow(user._id)">
                    {{followColor(user._id).name}}
                  </b-button>
                </div>
              </div>
            </div>
          </b-tab>
          <b-tab title="Caption">
            <div v-if="getSearchActive" v-for="photo in getSearch.photo" class="col-lg-12">
              <div class="header col-lg-12 text-center">
                <span class="prf-pic"><img src="http://image.mp3.zdn.vn/thumb/165_165/avatars/f/3/f3ccdd27d2000e3f9255a7e3e2c48800_1349926257.jpg"></span>
                <span class="account-name">{{photo.userId.username}}</span>
                <span class="account-follow">{{getDate(photo.createdAt)}}</span>
              </div>
              <img :src=photo.link class="feed-img col-lg-12">
              <div class="img-footer">
                <div class="comments">
                  <div class="comments-content">
                    <span class="comment-name">
                      <b>{{photo.userId.username}}</b>
                    </span>
                    <span class="posted-comment">{{photo.caption}}</span>
                    <br>
                    <div class="col-md-12 float-left">
                      <div class="float-left text-left">
                        <icon name="heart" :style="{color : heartColor(photo)}" @click.native="methodLike(photo)">

                        </icon>
                        &nbsp {{photo.likes.length}} Like
                      </div>
                    </div>
                    <br>

                  </div>
                  <div class="comments-field">
                    <div v-for="comments in photo.comments" class="col-md-12">
                      <span class="comment-name">
                        <b>{{comments._id.username}}</b>
                      </span>
                      <span class="posted-comment">{{comments.comment}}</span><br>
                    </div>

                    <input v-on:keyup.enter="addComment(photo._id)" v-model="comment" type="text" class="text-box" placeholder="Add a comment...">
                  </div>
                </div>
              </div>

            </div>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>

  </div>
</template>

<script>
import headerTemplate from "./header";
import { mapGetters, mapActions, mapMutations} from "vuex";
export default {
  name: "searchPage",
  components: {
    headerTemplate
  },
  data() {
    return {
      search: "",
      comment : '',

    };
  },
  computed: {
    ...mapGetters(["getSearch", "getSearchActive", "getDate", "getUser"])
  },
  mounted(){
    let userObject = JSON.parse(localStorage.getItem('user'))
    this.$store.dispatch("getUser", {
      user : userObject.userId
    })
  },
  methods: {
    followColor(id){

      let userObject = this.getUser
      console.log(userObject, 'getuser')
      let findFollowUser = -1
      if(userObject.follows.length !== 0){
        findFollowUser = userObject.follows.findIndex(foll => foll._id == id)
      }
      console.log(findFollowUser)
      if(findFollowUser >= 0){
        return {
          color: 'success',
          name : 'following'
        }
      }else{
        return {
          color : 'primary',
          name : 'follow'
        }
      }
      // let findFollowUser = -1
      // if(follow.length !== 0){
      //   findFollowUser = follow.findIndex(foll => foll._id == userObject.userId)
      // }
      // if(findFollowUser >= 0){
      //   return {
      //     color : 'success',
      //     name : 'following'
      //   }
      // }else{
      //   return {
      //     color : 'primary',
      //     name : 'follow'
      //   }
      // }
    },
    follow(follow){
      let userObject = JSON.parse(localStorage.getItem('user'))
      this.$store.dispatch('follow', {
        follow : follow,
        user : userObject.userId
      })
    },
    onSubmit(evt) {
      
      this.$store.dispatch("search", {
        query: this.search
      });
      this.search =""
      evt.preventDefault()
      // console.log(this.photo)
    },
    heartColor(data){
      let userObject = JSON.parse(localStorage.getItem('user'))
      let findLikeUser = -1
      if(data.likes.length !== 0){
        findLikeUser = data.likes.findIndex(likes => likes._id == userObject.userId)
      }
      if(findLikeUser >= 0){
        return 'red'
      }else{
        return 'black'
      }
    },
    methodLike(data){
      this.$store.dispatch("like", {
        data : data
      })
    },
    addComment(photoId) {
      this.$store.dispatch("addComment", {
        photoId: photoId,
        comment: this.comment
      });
      this.comment = "";
    }
  }
};
</script>
<style scoped>
.header {
  height: 55px;
  margin: 0 auto;
  border: 1px solid #efefef;
  border-radius: 3px 3px 0 0;
  background: white;
}

.prf-pic img {
  float: left;
  border-radius: 50%;
  margin: 12px 0 0 12px;
  width: 30px;
}

.account-name {
  font-family: Arial;
  font-weight: 700;
  font-size: 14px;
  float: left;
  line-height: 55px;
  margin-left: 10px;
}

.account-follow {
  float: right;
  font-weight: 700;
  font-size: 14px;
  line-height: 55px;
  margin-left: 10px;
}
.img-footer {
  margin: 0 auto;
  border: 1px solid #efefef;
  margin-bottom: 70px;
  margin-top: 0px;
  border-radius: 0 0 3px 3px;
  background: white;
}

.comments-content {
  /*the place where comments show up*/
  margin: 20px;
  min-height: 30px;
  padding-bottom: 15px;
  /*   background: red; */
  border-bottom: 1px solid #efefef;
}

.comments-field {
  /*styling for the text-box*/
  margin: 20px;
  /*   background: green; */
}

.comment-text {
  margin: 0 auto;
  border-style: solid;
  border-color: grey;
  border-width: 0 1px 0 1px;
}

.text-box {
  /*the place where comments are typed*/
  border: none;
}

.text-box:focus {
  outline: none;
}

.comment-name {
  /*the name that shows up when you write a comment*/
  font-family: Arial;
  float: left;
  margin-right: 5px;
}

.posted-comment {
  /*comment that shows up after you hit enter*/
  float: left;
}

.heart-pic img {
  /*the small, permanent heart*/
  width: 20px;
  float: left;
}

.like-heart {
  /*the heart that occurs when you click*/
  position: absolute;
  top: 50%;
  left: 50%;
}


.feed-img {
  position: relative;
  display: block;
  margin: 0 auto;
  border-style: solid;
  border-color: #efefef;
  border-width: 0 1px 0 1px;
}
</style>

<!-- b-form-1.vue -->