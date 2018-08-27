<template>
  <div class="article-detail">
    <div class="col-md-9">
      <h1 class="mt-4">{{ article.title }}</h1>
      <!-- Author -->
        by:
      <p class="lead">
        <strong>{{ authorName }}</strong>
      </p>
      <hr>

      <!-- Date/Time -->
      <p>Posted on {{ createdAt }}</p>
      <hr>

      <!-- Preview Image -->
      <img class="img-fluid" :src="article.thumbnail" alt="blog img">
      <hr>

      <!-- Post Content -->
      <p v-html="article.content"></p>
      <br>
      <router-link :to="{ name: 'articleedit', params: { id: id}}" v-if="authorName == username"><button class="btn btn-warning"> Edit </button></router-link>
      <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal" v-if="authorName == username">
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
              <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteArticle()">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Comments Form -->
      <div class="card my-4" v-if="username">
        <h5 class="card-header">Leave a Comment:</h5>
        <div class="card-body">
          <form>
            <div class="form-group">
              <wysiwyg v-model="postComment" />
            </div>
            <button @click="addComment()" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>

      <!-- Comments -->
      <div v-for="(comment, index) in article.comments" :key="index">
        <div class="media mb-4">
          <img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">
          <div class="media-body">
            <h5 class="mt-0">{{ comment.name }} says:</h5>
            <p v-html="comment.comment"></p>
            <button type="button" class="btn btn-danger" v-if="comment.name == username || authorName == username" @click="deleteComment(comment._id)">
              Delete
            </button>
          </div>
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
      authorName: '',
      username: null,
      postComment: '',
      comments: [],
      createdAt : '',
      token: ''
    }
  },
  methods: {
    addComment (){
      this.$axios({
        method: 'post',
        url: `/article/${this.id}/comment`,
        headers: {'token': localStorage.getItem('token')},
        data: {
          name: this.username,
          comment: this.postComment
        }
      })
        .then(({data}) => {
          this.getArtcileById(this.id)
        })
        .catch(err => {
          this.$swal(JSON.stringify(err.response.data.message))
        })
    },
    deleteComment (commentId) {
      this.$axios({
        method: 'delete',
        url: `/article/${this.id}/comment`,
        headers: {
          'token': localStorage.getItem('token'),
          'commentId': commentId
          },
      })
        .then(({data}) => {
          this.getArtcileById(this.id)
        })
        .catch(err => {
          this.$swal(JSON.stringify(err.data.message))
        })
    },
    getArtcileById () {
      this.$axios.get('/article/' + this.id)
        .then(({data})=> {
          this.article = data;
          this.authorName = data.author.name
          this.createdAt = data.createdAt.substr(0, 10)
        })
        .catch(err => {
          console.log(err);
        })
    },
    deleteArticle () {
      this.$axios({
        method: 'delete',
        url: '/article/' + this.id,
        headers: {'token': this.token},
      })
        .then(({data}) => {
          this.$router.replace('/my-articles')
        })
        .catch(err => {
          this.$swal(JSON.stringify(err.response.data.message))
        })
    }
  },
  mounted() {
    this.getArtcileById(this.id)
    this.username = localStorage.getItem('name')
    this.token = localStorage.getItem('token')
  },
  watch: {
    id: function () {
      this.getArtcileById(this.id)
    },
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
  @import "~vue-wysiwyg/dist/vueWysiwyg.css"
</style>
