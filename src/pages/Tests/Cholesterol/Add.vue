<template>
  <div class="container-fluid">

    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800">Add New Cholesterol Test</h1>

    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">New Cholesterol Test</h6>
      </div>
      <div class="card-body">
        <form @submit.prevent="addRecord">
          <div class="form-group">
            <label for="systolic">Systolic Value</label>
            <input type="number" v-model="form.systolic" class="form-control" id="systolic">
          </div>
          <div class="form-group">
            <label for="diastolic">Diastolic Value</label>
            <input type="number" v-model="form.diastolic" class="form-control" id="diastolic">
          </div>
          <div class="form-group">
            <label for="date">Date</label>
            <datepicker id="date" :format="dateformat" v-model="form.test_date" input-class="form-control"></datepicker>
          </div>
          <button type="submit" class="btn btn-primary">Add Test</button>
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
        systolic: 0,
        diastolic: 0,
        test_date: new Date(),
        user: 0
      },
      dateformat: "yyyy-MM-dd",
    }
  },
  mounted() {
    this.form.user = this.$route.params.id
  },
  methods: {
    addRecord(){
      const data = this.form
      console.log(data)
      this.$store.dispatch("add_request", {
        endpoint: "bloodpressure/tests/",
        payload: data
      })
          .then(res => {
            console.log(res.data)
            this.$toast.success("Test Added!")
            this.$router.push({name: 'AllBloodPressureTests', params: {id : this.$route.params.id}})
          })
          .catch(err => {
            console.log(err.response)
          });
    }
  }

}
</script>

<style scoped>

</style>