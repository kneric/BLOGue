<template>
  <div class="nav">  
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          Blogue
        </router-link>  
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav">
            <router-link to="/articles">
            <li class="nav-item">
              <a class="nav-link">Articles</a>
            </li>
            </router-link>
          </ul>
          <ul class="navbar-nav ml-auto">
            <router-link to="/" v-if="!isLoggedIn">
            <li class="nav-item">
              <a class="nav-link" @click="$emit('register')">Register</a>
            </li>
            </router-link>
            <router-link to="/" v-else>
            <li class="nav-item">
              <a class="nav-link">My Articles</a>
            </li>
            </router-link>

            <button type="button" class="btn btn-success nav-item" data-toggle="modal" data-target="#loginModal" v-if="!isLoggedIn">
              Login
            </button>
            <router-link to="/" v-else>
            <li class="nav-item">
              <a class="nav-link">Logout</a>
            </li>
            </router-link>
          </ul>
        </div>
      </div>
    </nav>
    <LoginModal @loggedIn="$emit('loggedIn')"></LoginModal>
  </div>
</template>

<script>
import LoginModal from '@/components/LoginModal'
export default {
  props: [
    'isLoggedIn'
  ],
  components: {
    LoginModal,
    
  },
}
</script>


<style scoped>
  body {
  padding-top: 54px;
  }

  @media (min-width: 992px) {
    body {
      padding-top: 56px;
    }
  }
</style>
