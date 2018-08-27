<template>
  <div class="container">
    <div class="row">
      <div class="col-md-10">
        Title:
        <br>
        <div class="form-group">
          <input class="form-control" type="text" v-model="postTitle">
        </div>
        Image URL:
        <br>
        <div class="form-group">
          <input class="form-control" type="text" v-model="postThumb">
        </div>
        Content:
        <div class="form-group">
          <wysiwyg v-model="postContent" />
        </div>
        <button class="btn-primary" @click="post">Post!</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name:'post',
  data () {
    return {
      postTitle: '',
      postContent: '',
      postThumb: ''
    }
  },
  methods: {
    post () {
      this.$axios({
        method: 'post',
        url: '/article',
        headers: {'token': localStorage.getItem('token')},
        data: {
          title: this.postTitle,
          content: this.postContent,
          thumbnail: this.postThumb
        }
      })
        .then(({data}) => {
        })
        .catch(err => {
          this.$swal(JSON.stringify(err.response.data.message))
        })
    }
  }
}
</script>

<style scoped>
  @import "~vue-wysiwyg/dist/vueWysiwyg.css"

</style>

