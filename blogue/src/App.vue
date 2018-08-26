<template>
  <div id="app">
    <div id="nav">
      <Nav></Nav>
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
  }
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
