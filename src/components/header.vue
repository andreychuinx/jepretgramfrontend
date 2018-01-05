<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <a class="navbar-brand" href="/home">JepretGram</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/home">Home
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/post">Post</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/search">Search</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="methodLogout()">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import router from '@/router'
export default {
  name: "header",
  data() {
    return {};
  },
  methods: {
    methodLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/");
    }
  }
};
</script>

