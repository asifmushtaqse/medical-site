<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800">User Detail</h1>
    <!-- Content Row -->

    <div class="row">
      <div class="col-md-12">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">User Profile</h6>
          </div>
          <div class="card-body">
            <div class="chart-area" v-if="userProfile">
              <p><strong>UserName:</strong> {{userProfile.username}}</p>
              <p><strong>First Name:</strong> {{userProfile.first_name}}</p>
              <p><strong>Last Name:</strong> {{userProfile.last_name}}</p>
              <p><strong>Full Name:</strong> {{userProfile.first_name}} {{userProfile.last_name}}</p>
              <p><strong>Email:</strong> {{userProfile.email}}</p>
              <p><strong>Date of Birth:</strong> {{userProfile.dob}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <BloodPressureTest :user-id="this.$route.params.id" />

  </div>
</template>

<script>
import BloodPressureTest from "@/components/TestCharts/BloodPressureTest";
export default {
  components: {
    BloodPressureTest
  },
  data(){
    return {
      userProfile: null,
    }
  },
  mounted() {
    this.getUserProfile()
  },
  methods: {
    getUserProfile(){
      this.$store.dispatch("list_request", {
        endpoint: "users/"+this.$route.params.id+"/",
      })
      .then(res => {
        console.log(res.data)
        this.userProfile = res.data
      })
      .catch(err => {
        console.log(err);
      });
    },
  }
}
</script>

<style scoped>

</style>