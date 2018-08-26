<template>
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
          <router-link to="/">
          <li class="nav-item">
            <a class="nav-link">Articles</a>
          </li>
          </router-link>
        </ul>
        <ul class="navbar-nav ml-auto">
          <router-link to="/" v-if="!isLoggedIn">
          <li class="nav-item">
            <a class="nav-link">Register</a>
          </li>
          </router-link>
          <router-link to="/" v-else>
          <li class="nav-item">
            <a class="nav-link">My Articles</a>
          </li>
          </router-link>

          <router-link to="/about" v-if="!isLoggedIn">
          <li class="nav-item">
            <a class="nav-link">Login</a>
          </li>
          </router-link>
          <router-link to="/" v-else>
          <li class="nav-item">
            <a class="nav-link">Logout</a>
          </li>
          </router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>

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
