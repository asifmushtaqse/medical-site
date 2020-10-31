<template>
  <div class="container-fluid">

    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800">Users</h1>

    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Edit User</h6>
      </div>
      <div class="card-body">
        <form @submit.prevent="updateRecord">
          <div>
            <ul v-if="errors">
              <li v-for="(error, key) in errors" :key="key" class="text-danger">
                {{key}} {{error}}
              </li>
            </ul>
          </div>
          <div class="row">
            <div class="col-md-6 col-xl-6 col-lg-6">
              <div class="form-group">
                <label for="username">Username</label>
                <input type="text" v-model="form.username" class="form-control" id="username">
              </div>
              <div class="form-group">
                <label for="first_name">First Name</label>
                <input type="text" v-model="form.first_name" class="form-control" id="first_name">
              </div>
              <div class="form-group">
                <label for="gender">Gender</label>
                <select class="browser-default custom-select" v-model="form.gender" id="gender">
                  <option selected value>Select gender</option>
                  <option value="ML">Male</option>
                  <option value="FM">Female</option>
                </select>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="text" v-model="form.password" class="form-control" id="password">
              </div>
            </div>
            <div class="col-md-6 col-xl-6 col-lg-6">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="text" v-model="form.email" class="form-control" id="email">
              </div>
              <div class="form-group">
                <label for="last_name">Last Name</label>
                <input type="text" v-model="form.last_name" class="form-control" id="last_name">
              </div>
              <div class="form-group">
                <label for="date">Date of Birth</label>
                <datepicker id="date" v-model="form.dob" :format="dateformat" input-class="form-control"></datepicker>
              </div>
              <div class="form-group mt-5">
                <div class="form-check float-left">
                  <input type="checkbox" v-model="form.is_superuser" class="form-check-input" id="super-user">
                  <label class="form-check-label" for="super-user">Super User</label>
                </div>
                <div class="form-check float-left ml-2">
                  <input type="checkbox" v-model="form.is_staff" class="form-check-input" id="staff-user">
                  <label class="form-check-label" for="staff-user">Staff User</label>
                </div>
              </div>
            </div>
          </div>
          <hr class="mt-4">
          <button type="submit" class="btn btn-primary">Update User</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
export default {
  components: {
    Datepicker
  },
  data(){
    return {
      form: {
        password: '',
        is_superuser: false,
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        is_staff: false,
        is_active: true,
        dob: null,
        gender: ''
      },
      errors: null,
      dateformat: "yyyy-MM-dd",
    }
  },
  methods: {
    getRecord(id){
      this.$store.dispatch("view_request", {
        endpoint: "users",
        id: id+"/",
      })
      .then(res => {
        console.log(res)
        this.form = res.data
      })
      .catch(err => {
        console.log(err);
      });
    },
    updateRecord(){
      this.$store.dispatch("update_request", {
        endpoint: "users/" + this.$route.params.id + "/",
        payload: this.form
      })
      .then(res => {
        this.form = res.data
        this.$toast.success('User Updated');
        this.$router.push({ name: 'AllUsers'})
      })
      .catch(err => {
        if(err.response.data){
          this.errors = err.response.data
        }
      });
    }
  },
  mounted() {
    this.getRecord(this.$route.params.id)
    this.form.dob = new Date()
  }
}
</script>

<style scoped>

</style>