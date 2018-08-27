<template>
  <div class="login-modal">
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary text-light">
            <h5 class="modal-title" id="loginModalLabel">Login</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body col-md-8 offset-md-2">
            Email:
            <br>
            <input type="email" v-model="loginEmail">
            <br>
            Password:
            <br>
            <input type="password" v-model="loginPwd">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">cancel</button>
            <button type="button" class="btn btn-success" data-dismiss="modal" @click="login">Login</button>
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
      loginEmail: '',
      loginPwd: ''
    }
  },
  methods: {
    login (){
      this.$axios.post('/signin', {
        email: this.loginEmail,
        password: this.loginPwd 
      })
        .then(({data}) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('name', data.name)
          this.$emit('loggedIn')
        })
        .catch(err => {
          this.$swal(JSON.stringify(err.response.data.message))
        })
    }
  }
}
</script>
