<template>
  <div class="container-fluid">

    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800">Add New Cholesterol Test</h1>

    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">New Cholesterol Test</h6>
      </div>
      <div class="card-body">
        <form @submit.prevent="updateRecord">
          <div class="form-group">
            <label for="hdl">HDL Value</label>
            <input type="number" v-model="form.hdl" class="form-control" id="hdl">
          </div>
          <div class="form-group">
            <label for="ldl">LDL Value</label>
            <input type="number" v-model="form.ldl" class="form-control" id="ldl">
          </div>
          <div class="form-group">
            <label for="total_cholesterol">Total Cholesterol Value</label>
            <input type="number" v-model="form.total_cholestrol" class="form-control" id="total_cholesterol">
          </div>
          <div class="form-group">
            <label for="triglycerides">Total Triglycerides Value</label>
            <input type="number" v-model="form.triglycerides" class="form-control" id="triglycerides">
          </div>
          <div class="form-group">
            <label for="vldl">VLDL Value</label>
            <input type="number" v-model="form.vldl" class="form-control" id="vldl">
          </div>
          <!--          <div class="form-group">-->
          <!--            <label for="unit">Unit</label>-->
          <!--            <input type="text" v-model="form.unit" class="form-control" id="unit">-->
          <!--          </div>-->
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
        hdl: 0,
        ldl: 0,
        total_cholestrol: 0,
        triglycerides: 0,
        vldl: 0,
        test_date: new Date(),
        // unit: '',
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
        endpoint: "cholestrol/tests",
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
        endpoint: "cholestrol/tests/" + this.form.id + "/",
        payload: this.form
      })
      .then(res => {
        console.log(res.data)
        this.$toast.success("Test Added!")
        this.$router.push({name: 'AllCholesterolTests', params: {id : this.$route.params.id}})
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