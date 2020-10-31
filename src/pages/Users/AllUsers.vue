<template>
  <!-- Begin Page Content -->
  <div class="container-fluid">

    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800">
      Users
      <router-link :to="{name: 'AddUser'}" class="btn btn-primary ml-2 mb-2 mr-2">
        <span class="text">Add User</span>
      </router-link>
    </h1>

    <!-- DataTales Example -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Users</h6>
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
      users: []
    }
  },
  methods:{
    getItems(){
      this.$store.dispatch("list_request", {
        endpoint: "users/",
      })
      .then(res => {
        console.log(res.data)
        this.users = res.data
      })
      .catch(err => {
        console.log(err);
      });
    },
    deleteRecord(id){
      this.$store.dispatch("delete_request", {
        endpoint: "users",
        id: id+"/"
      })
      .then(res => {
        console.log(res)
        this.$toast.success("User deleted!")
        this.getItems()
      })
      .catch(err => {
        console.log(err);
      });
    },
    handleAction(actionName, data) {
      console.log(actionName, data);
      if(actionName === 'view'){
        this.$router.push({ name: 'UserDetail', params: { id: data.id } })
      }
      if(actionName === 'delete'){
        this.deleteRecord(data.id);
      }
      if(actionName === 'edit'){
        this.$router.push({ name: 'EditUser', params: { id: data.id } })
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
            key: 'username',
            title: 'Username',
            sortable: false,
          },
          {
            key: 'first_name',
            title: 'First Name',
            sortable: false,
          },
          {
            key: 'email',
            title: 'User Email',
            sortable: false
          }
        ],
        data: this.users,
        actionMode: "single",
        actions: ["view", "delete", "edit"],
        showDownloadButton: false
      }
    }
  },
}
</script>

<style scoped>
@import '../../assets/css/datatable.css';
</style>