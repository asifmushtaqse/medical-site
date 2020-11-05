<template>
  <!-- Begin Page Content -->
  <div class="container-fluid">

    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800 text-capitalize">
      {{test}} Normal Values
    </h1>

    <!-- DataTales Example -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Values</h6>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <data-table v-if="keys" v-bind="bindings" class="table table-bordered" @actionTriggered="handleAction"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return {
      tests: [],
      test: this.$route.params.test,
      keys: null,
    }
  },
  methods:{
    getItems(){
      this.$store.dispatch("list_request", {
        endpoint: this.test + "/normal-values/"
      })
      .then(res => {
        console.log(res.data)
        if(res.data){
          this.keys = Object.keys(res.data[0])
          this.tests = res.data
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    handleAction(actionName, data) {
      console.log(actionName, data);
      if(actionName === 'edit'){
        this.$router.push({ name: 'EditNormalValues', params: { test: this.$route.params.test, id: data.id } })
      }
    }
  },
  mounted(){
    this.getItems();
  },
  computed: {
    bindings() {
      return {
        columnKeys: this.keys,
        data: this.tests,
        actionMode: "single",
        actions: ["edit"],
        showDownloadButton: false
      }
    }
  },
}
</script>

<style scoped>
@import '../../../assets/css/datatable.css';
</style>