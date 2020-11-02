<template>
  <!-- Begin Page Content -->
  <div class="container-fluid">

    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800">
      Cholesterol Tests
      <router-link :to="{name: 'AddCholesterolTest'}" class="btn btn-primary ml-2 mb-2 mr-2">
        <span class="text">Add Test</span>
      </router-link>
    </h1>

    <!-- DataTales Example -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Tests</h6>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <data-table v-bind="bindings" class="table table-bordered" @actionTriggered="handleAction"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return {
      tests: []
    }
  },
  methods:{
    getItems(){
      this.$store.dispatch("list_request", {
        endpoint: "cholestrol/tests/?userid="+this.$route.params.id,
      })
      .then(res => {
        console.log(res.data)
        this.tests = res.data
      })
      .catch(err => {
        console.log(err);
      });
    },
    deleteRecord(id){
      this.$store.dispatch("delete_request", {
        endpoint: "cholestrol/tests",
        id: id + "/"
      })
        .then(res => {
          console.log(res)
          this.$toast.success("Test deleted!")
          this.getItems()
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleAction(actionName, data) {
      console.log(actionName, data);
      if(actionName === 'delete'){
        this.deleteRecord(data.id);
      }
      if(actionName === 'edit'){
        this.$router.push({ name: 'EditBloodPressureTest', params: { id: data.user, testId: data.id } })
      }
    }
  },
  mounted(){
    this.getItems();
  },
  computed: {
    bindings() {
      return {
        columns: [
          {
            key: 'id',
          },
          {
            key: 'hdl',
            title: 'HDL',
            sortable: false,
          },
          {
            key: 'ldl',
            title: 'LDL',
            sortable: false,
          },
          {
            key: 'total_cholestrol',
            title: 'Total Cholesterol',
            sortable: false,
          },
          {
            key: 'triglycerides',
            title: 'Triglycerides',
            sortable: false,
          },
          {
            key: 'vldl',
            title: 'VLDL',
            sortable: false,
          }
        ],
        data: this.tests,
        actionMode: "single",
        actions: ["delete", "edit"],
        showDownloadButton: false
      }
    }
  },
}
</script>

<style scoped>
@import '../../../assets/css/datatable.css';
</style>