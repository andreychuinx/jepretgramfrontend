<template>
  <b-container>
    <b-row>
      <b-col>
      </b-col>
      <b-col sm="12" md="4">
        <h1 class="text-center login-title">Jepret GRAM</h1>
        <div class="account-wall">
          <img class="profile-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120" alt="">
          <form class="form-signin">
            <input type="text" v-model="name" class="form-control" placeholder="name" required autofocus>
            <input type="text" v-model="username" class="form-control" placeholder="username" required autofocus>
            <input type="text" v-model="email" class="form-control" placeholder="Email" required autofocus>
            <input type="password" v-model="password" class="form-control" placeholder="Password" required>
            <a @click="signup()" class="btn btn-lg btn-primary btn-block" type="submit">
              Sign in</a>
          </form>
        </div>
        <a href="#" class="text-center new-account">Back to Login</a>
      </b-col>
      <b-col>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "signup",
  data() {
    return {
      name: null,
      username: null,
      email: null,
      password: null
    };
  },
  methods: {
    signup() {
      this.$store.dispatch("signup", {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>
<style scoped>
.form-signin {
  max-width: 500px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  font-size: 16px;
  height: auto;
  padding: 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="text"] {
  margin-bottom: -1px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.account-wall {
  margin-top: 20px;
  padding: 40px 0px 20px 0px;
  background-color: #f7f7f7;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.login-title {
  color: #555;
  font-size: 18px;
  font-weight: 400;
  display: block;
}
.profile-img {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
.need-help {
  margin-top: 10px;
}
.new-account {
  display: block;
  margin-top: 10px;
}
</style>

