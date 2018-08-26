<template>
  <div id="app">
    <div id="nav">
      <Nav :isLoggedIn="isLoggedIn" @loggedIn="loginCheck" @registered="loginCheck" @logout="logout"></Nav>
    </div>
    <div style="height:30px"></div>
    <router-view/>
    <div style="height:70px"></div>
    <Footer></Footer>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default {
  components: {
    Nav,
    Footer
  },
  data () {
    return {
      isLoggedIn: null
    }
  },
  methods: {
    loginCheck (){
      if (localStorage.getItem('token')){
        this.isLoggedIn = localStorage.getItem('token')
        this.$router.push('')
      }
    },
    logout (){
      this.isLoggedIn = null
      this.$router.push('/')
    }
  },
  mounted (){
    this.loginCheck()
  },
}
</script>


<style>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: whitesmoke;
}
</style>
