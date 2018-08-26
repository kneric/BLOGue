<template>
  <div class="summary">
    <div v-for="(article, index) in articles" :key="index">
      <div class="card mb-4 col-md-8 offset-md-2">
        <img class="card-img-top" :src="article.thumbnail" alt="thumbnail">
        <div class="card-body">
          <h2 class="card-title">{{ article.title }}</h2>
          <p class="card-text">{{ article.content.substr(0, 70) }} ...</p>
          <router-link :to="{ name: 'articledetail', params: { id: article._id}}">Read more</router-link>
        </div>
        <div class="card-footer text-muted">
          Posted on {{ article.createdAt.substr(0, 10) }} by {{ article.author.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'articles'
  ]
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

