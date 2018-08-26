<template>
  <div class="article-detail">
    <div class="col-md-9">
      <h1 class="mt-4">{{ article.title }}</h1>
      <!-- Author -->
        by:
      <p class="lead">
        <strong>{{ article.author.name }}</strong>
      </p>
      <hr>

      <!-- Date/Time -->
      <p>Posted on {{ article.createdAt.substr(0, 10) }}</p>
      <hr>

      <!-- Preview Image -->
      <img class="img-fluid" :src="article.thumbnail" alt="blog img">
      <hr>

      <!-- Post Content -->
      <p v-html="article.content"></p>
      <br>
      <router-link :to="{ name: 'articleedit', params: { id: id}}" v-if="article.author.name == username"><button class="btn btn-warning"> Edit </button></router-link>
      <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal" v-if="article.author.name == username">
        Delete
      </button>
      <hr>

      <!-- Delete Modal -->
      <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header bg-primary text-light">
              <h5 class="modal-title" id="deleteModalLabel">Are You Sure</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-warning" data-dismiss="modal">cancel</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteArticle(id)">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Comments Form -->
      <div class="card my-4">
        <h5 class="card-header">Leave a Comment:</h5>
        <div class="card-body">
          <form>
            <div class="form-group">
              <textarea class="form-control" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>

      <!-- Single Comment -->
      <div class="media mb-4">
        <img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">
        <div class="media-body">
          <h5 class="mt-0">Commenter Name</h5>
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'id'
  ],
  data () {
    return {
      article: {},
      username: ''
    }
  },
  methods: {
    getArtcileById (id) {
      this.$axios.get('/article/' + id)
        .then(({data})=> {
          this.article = data;
        })
        .catch(err => {
          console.log(err);
        })
    },
    deleteArticle (id) {
      this.$axios({
        method: 'delete',
        url: '/article/' +id,
        headers: {'token': localStorage.getItem('token')},
      })
        .then(({data}) => {
          this.$router.push('/my-articles')
        })
        .catch(err => {
          this.$swal(JSON.stringify(err.response.data.message))
        })
    }
  },
  mounted() {
    this.getArtcileById(this.id)
    this.username = localStorage.getItem('name')
  },
  watch: {
    id: function () {
      this.getArtcileById(this.id)
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
