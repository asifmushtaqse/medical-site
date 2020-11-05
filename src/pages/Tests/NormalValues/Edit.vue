<template>
  <div class="container-fluid">

    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800 text-capitalize">Edit {{this.test}} Values</h1>

    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Edit Values</h6>
      </div>
      <div class="card-body">
        <form v-if="form" @submit.prevent="updateRecord">
          <div v-for="(value, key) in form" v-if="key !== 'id'" class="form-group">
            <label :for="key" class="text-capitalize">{{key}}</label>
            <input v-if="key === 'unit'" type="text" v-model="form[key]" class="form-control" :id="key">
            <input v-else type="number" v-model="form[key]" class="form-control" :id="key">
          </div>
          <button type="submit" class="btn btn-primary">Update</button>
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
  data() {
    return {
      dateformat: "yyyy-MM-dd",
      test: this.$route.params.test,
      form: null
    }
  },
  mounted() {
    this.getRecord(this.$route.params.id)
  },
  methods: {
    getRecord(id){
      this.$store.dispatch("view_request", {
        endpoint: this.test + "/normal-values",
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
    updateRecord() {
      const data = this.form
      console.log(data)
      this.$store.dispatch("update_request", {
        endpoint: this.test + "/normal-values/" + this.form.id + "/",
        payload: this.form
      })
      .then(res => {
        console.log(res.data)
        this.$toast.success("Values Updated")
        this.$router.push({name: 'NormalValues', params: {test: this.$route.params.test}})
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