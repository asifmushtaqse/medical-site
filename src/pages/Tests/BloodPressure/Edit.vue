<template>
  <div class="container-fluid">

    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800">Edit Blood Pressure Test</h1>

    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">New Blood Test</h6>
      </div>
      <div class="card-body">
        <form @submit.prevent="updateRecord">
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
          <button type="submit" class="btn btn-primary">Update Test</button>
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
    // this.form.user = this.$route.params.id
    this.getRecord(this.$route.params.testId)
  },
  methods: {
    getRecord(id){
      this.$store.dispatch("view_request", {
        endpoint: "bloodpressure/tests",
        id: id + "/",
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
      const data = this.form
      console.log(data)
      this.$store.dispatch("update_request", {
        endpoint: "bloodpressure/tests/" + this.form.id + "/",
        payload: this.form
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