<template>
  <div class="articles-drawer">
    <router-link class="list-group-item" v-for="(article, index) in articles" :key="index" :to="{ name: 'articledetail', params: { id: article._id } }"> {{ article.title}}
    </router-link>
  </div>
</template>

<script>
export default {
  props: [
    'articles'
  ]
}
</script>
