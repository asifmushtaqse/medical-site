<template>
  <!-- Outer Row -->
  <div class="row justify-content-center">

    <div class="col-xl-4 col-lg-4 col-md-9">

      <div class="card o-hidden border-0 shadow-lg my-5">
        <div class="card-body p-0">
          <!-- Nested Row within Card Body -->
          <div class="row">
            <div class="col-lg-12">
              <div class="p-5">
                <div class="text-center">
                  <h1 class="h4 text-gray-900 mb-4">Login!</h1>
                </div>
                <form class="user" @submit.prevent="login">
                  <div class="form-group">
                    <input type="text" v-model="form.username" class="form-control form-control-user" placeholder="Enter user name">
                  </div>
                  <div class="form-group">
                    <input type="password" v-model="form.password" class="form-control form-control-user" id="exampleInputPassword" placeholder="Password">
                  </div>
                  <button type="submit" class="btn btn-primary btn-user btn-block">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login(){
      this.$store.dispatch('login', {
        username: this.form.username,
        password: this.form.password
      })
      .then(token => {
        this.$router.push({name: "Dashboard"})
        console.log(token)
      })
      .catch(e => {
        console.log(e.response);
      })
    }
  }
}
</script>

<style scoped>

</style>