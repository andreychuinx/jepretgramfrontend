<template>
  <div>
    <header-template>
    </header-template>
    <div class="container">
      <div class="row text-center text-lg-left">
        <div class="col-xl-12 col-md-6 col-xs-6">
          <div v-for="data in getTimeline" class="col-lg-12 col-md-6 col-xs-6">
            <div class="header">
              <span class="prf-pic"><img src="http://image.mp3.zdn.vn/thumb/165_165/avatars/f/3/f3ccdd27d2000e3f9255a7e3e2c48800_1349926257.jpg"></span>
              <span class="account-name">{{data.userId.username}}</span>
              <span class="timestamp">{{getDate(data.createdAt)}}</span>
            </div>
            <img :src=data.link class="feed-img">
            <div class="img-footer">
              <div class="comments">
                <div class="comments-content">
                  <span class="comment-name">
                    <b>{{data.userId.username}}</b>
                  </span>
                  <span class="posted-comment">{{data.caption}}</span>
                  <br>
                  <div class="col-md-12 float-left">
                    <div class="float-left text-left">
                      <icon name="heart" :style="{color : heartColor(data)}" @click.native="methodLike(data)">

                      </icon>
                      &nbsp {{data.likes.length}} Like
                    </div>
                    <div class="float-right text-right" v-if="methodButtonModal(data)">
                    <b-button size="sm" variant="warning" v-b-modal.modalEdit @click="methodEditModal(data)">
                      <icon name="edit"></icon>
                    </b-button>
                    <b-button size="sm" variant="danger" v-b-modal.modalDelete @click="methodDeleteModal(data)">
                      <icon name="trash" scale="1" paths.style="fill:#8ED6FB"></icon>
                    </b-button>
                  </div>
                  </div>
                  <br>

                </div>
                <div class="comments-field">
                  <div v-for="comments in data.comments" class="col-md-12">
                    <span class="comment-name">
                      <b>{{comments._id.username}}</b>
                    </span>
                    <span class="posted-comment">{{comments.comment}}</span><br>
                  </div>

                  <input v-on:keyup.enter="addComment(data._id)" v-model="comment" type="text" class="text-box" placeholder="Add a comment...">
                </div>
              </div>
            </div>

          </div>
          <b-modal id="modalDelete" ref="modal" title="Delete Photo?" @ok="handleOk">

          </b-modal>
          <b-modal id="modalEdit" ref="modal" title="Edit Caption" @ok="handleEditOk">
            <form @submit.stop.prevent="handleEdit">
              <b-form-input type="text" v-model="caption"></b-form-input>
            </form>
          </b-modal>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import headerTemplate from "./header";
import modalDelete from "./modalDelete";
import { mapActions, mapMutations, mapStates, mapGetters } from "vuex";

export default {
  name: "homePage",
  data() {
    return {
      comment: "",
      showModal: false,
      dataPhoto: null,
      caption: ""
    };
  },
  components: {
    headerTemplate,
    modalDelete
  },
  computed: {
    ...mapGetters(["getTimeline", "getDate"]),
    
  },
  mounted() {
    this.$store.dispatch("dataTimeline");
  },
  methods: {
    methodButtonModal(data){
      let userObject = JSON.parse(localStorage.getItem('user'))
      if(data.userId._id == userObject.userId){
        return true
      }else{
        return false
      }
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
      let userObject = JSON.parse(localStorage.getItem('user'))
      if(userObject.userId !== data.userId._id){
        this.$store.dispatch("like", {
        data : data
      })
      }
      
    },
    addComment(photoId) {
      this.$store.dispatch("addComment", {
        photoId: photoId,
        comment: this.comment
      });
      this.comment = "";
    },
    methodDeleteModal(data) {
      this.showModal = true;
      this.dataPhoto = data;
    },
    methodEditModal(data) {
      this.showModal = true;
      this.caption = data.caption;
      this.dataPhoto = data;
    },
    handleOk(evt) {
      this.$store.dispatch("deletePhoto", {
        id: this.dataPhoto._id
      });
      this.dataPhoto = null;
    },
    handleEditOk(){
      this.handleEdit()
    },
    handleEdit(){
      this.$store.dispatch("editPhoto", {
        id : this.dataPhoto._id,
        caption : this.caption
      })
      this.dataPhoto = null
      this.caption = ""
      this.$refs.modal.hide()
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}

#nav-container {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #e3e3e3;
  margin-bottom: 70px;
  background: white;
}

#navbar {
  min-width: 500px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 25px 0 25px 0;
}

#left {
  float: left;
  width: 200px;
  height: 20px;
}

#right {
  float: right;
  width: 200px;
  height: 20px;
}

#input-field {
  width: 200px;
  border-radius: 3px;
  border: 1px solid #cccccc;
  height: 25px;
  padding-left: 5px;
  background-image: url("http://downloadicons.net/sites/default/files/system-of--magnifying-glass-icon-73291.png");
}

/* ::-webkit-input-placeholder input-field{
   text-align: center;
} */

#logo-icon {
  width: 30px;
  padding-right: 20px;
  padding-top: 3px;
  border-right: 1px solid black;
  float: left;
}

#logo-name {
  float: left;
  width: 120px;
  padding-left: 15px;
}

.nav-icon {
  float: right;
  width: 26px;
  padding: 0 15px 0 15px;
}

.header {
  width: 600px;
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

.timestamp {
  font-family: Arial;
  color: #a2a2a2;
  float: right;
  line-height: 55px;
  margin-right: 15px;
}

.img-footer {
  width: 600px;
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
  width: 600px;
  margin: 0 auto;
  border-style: solid;
  border-color: grey;
  border-width: 0 1px 0 1px;
}

.text-box {
  /*the place where comments are typed*/
  width: 510px;
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

.main-body {
  clear: both;
  width: 700px;
  margin: 0 auto;
  text-align: center;
  padding: 0px;
}

.feed-img {
  position: relative;
  display: block;
  margin: 0 auto;
  width: 600px;
  border-style: solid;
  border-color: #efefef;
  border-width: 0 1px 0 1px;
}

#footer {
  clear: both;
  width: 1000px;
  text-align: left;
  margin: 0 auto;
  font-family: Arial;
  font-size: 11px;
  font-weight: 700;
}

#footer a {
  margin-right: 1.2em;
}

#copyright {
  float: right;
}
</style>

