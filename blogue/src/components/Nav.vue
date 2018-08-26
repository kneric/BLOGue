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
            <button type="button" class="btn btn-warning nav-item mr-2" data-toggle="modal" data-target="#registerModal" v-if="!isLoggedIn">
              Register
            </button>
            <router-link to="/my-articles" v-else>
            <li class="nav-item">
              <a class="nav-link">My Articles</a>
            </li>
            </router-link>
            <router-link to="/post" v-if="isLoggedIn">
            <li class="nav-item">
              <a class="nav-link">Post Article</a>
            </li>
            </router-link>
            <button type="button" class="btn btn-success nav-item" data-toggle="modal" data-target="#loginModal" v-if="!isLoggedIn">
              Login
            </button>
            <button class="btn btn-danger nav-item" @click="logout" v-else>Logout</button>
          </ul>
        </div>
      </div>
    </nav>
    <LoginModal @loggedIn="$emit('loggedIn')"></LoginModal>
    <RegisterModal @registered="$emit('registered')"></RegisterModal>
  </div>
</template>

<script>
import LoginModal from '@/components/LoginModal'
import RegisterModal from '@/components/RegisterModal'
export default {
  props: [
    'isLoggedIn'
  ],
  components: {
    LoginModal,
    RegisterModal
  },
  methods: {
    logout (){
      localStorage.removeItem('token')
      this.$emit('logout')
    }
  }
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
