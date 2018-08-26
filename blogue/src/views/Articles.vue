<template>
  <div class="articles">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <div class="list-group">
            <p class="list-group-item">Articles Archive:</p>
            <ArticlesDrawer :articles="articles"></ArticlesDrawer>
          </div>
        </div>
        <div class="col-md-9">
          <router-view :articles="articles"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ArticlesDrawer from '@/components/ArticlesDrawer'

export default {
  name: 'articles',
  components: {
    ArticlesDrawer
  },
  data () {
    return {
      articles: []
    }
  },
  methods: {
    getArticles () {
      this.$axios.get('/article')
        .then(({data}) => {
          this.articles = data;
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  mounted () {
    this.getArticles()
  }
}
</script>