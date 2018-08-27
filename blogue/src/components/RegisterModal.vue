<template>
  <div class="register-modal">
    <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="registerModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary text-light">
            <h5 class="modal-title" id="registerModalLabel">Register</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body col-md-8 offset-md-2">
            Name:
            <br>
            <input type="text" v-model="registerName">
            <br>
            Email:
            <br>
            <input type="email" v-model="registerEmail">
            <br>
            Password:
            <br>
            <input type="password" v-model="registerPwd">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">cancel</button>
            <button type="button" class="btn btn-success" data-dismiss="modal" @click="register">Register</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      registerName: '',
      registerEmail: '',
      registerPwd: ''
    }
  },
  methods: {
    register (){
      this.$axios.post('/signup', {
        name: this.registerName,
        email: this.registerEmail,
        password: this.registerPwd 
      })
        .then(({data}) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('name', this.registerName)
          this.$emit('registered')
        })
        .catch(err => {
          this.$swal(JSON.stringify(err.response.data.message))
        })
    }
  }
}
</script>
