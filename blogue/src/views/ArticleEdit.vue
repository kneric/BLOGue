<template>
  <div class="container">
    <div class="row">
      <div class="col-md-10">
        Title:
        <br>
        <div class="form-group">
          <input class="form-control" type="text" v-model="editTitle">
        </div>
        Image URL:
        <br>
        <div class="form-group">
          <input class="form-control" type="text" v-model="editThumb">
        </div>
        Content:
        <div class="form-group">
          <wysiwyg v-model="editContent"/>
        </div>
        <button class="btn-primary" @click="updateArticle()">Edit!</button>
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
      editTitle: '',
      editContent: '',
      editThumb: ''
    }
  },
  methods: {
    getArtcileById () {
      this.$axios.get('/article/' + this.id)
        .then(({data})=> {
          this.editTitle = data.title,
          this.editContent = data.content,
          this.editThumb = data.thumbnail
        })
        .catch(err => {
          console.log(err);
        })
    },
    updateArticle () {
      this.$axios({
        method: 'put',
        url: '/article/' + this.id,
        headers: {'token': localStorage.getItem('token')},
        data: {
          title: this.editTitle,
          content: this.editContent,
          thumbnail: this.editThumb
        }
      })
        .then(({data}) => {
          this.getArtcileById(this.id)
        })
        .catch(err => {
          this.$swal(JSON.stringify(err.response.data.message))
        })
    }
  },
  created(){
    this.getArtcileById(this.id)
  },
  mounted (){
    this.getArtcileById(this.id)
  },
  watch: {
    id: function () {
      this.getArtcileById(this.id)
    }
  }
}
</script>

<style scoped>
  @import "~vue-wysiwyg/dist/vueWysiwyg.css"

</style>