<template>
  <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="/">
      <div class="sidebar-brand-icon rotate-n-15">
        <i class="fas fa-laugh-wink"></i>
      </div>
      <div class="sidebar-brand-text mx-3">Medical Site</div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0">

    <!-- Nav Item - Dashboard -->
    <li class="nav-item">
      <router-link class="nav-link" :to="{ name: 'Dashboard'}"><i class="fas fa-fw fa-tachometer-alt"></i> Dashboard</router-link>
    </li>
    <li v-if="!isAdminOrStaff" class="nav-item">
      <router-link class="nav-link" :to="{ name: 'AllTests', params: { id: currentUser.id }}"><i class="fas fa-fw fa-ambulance"></i> Tests</router-link>
    </li>
<!--    <li v-if="isAdminOrStaff" class="nav-item">-->
<!--      <router-link class="nav-link" :to="{ name: 'AllNormalValues'}"><i class="fas fa-fw fa-adjust"></i> Normal Values</router-link>-->
<!--    </li>-->

    <!-- Nav Item - Utilities Collapse Menu -->
    <li v-if="isAdminOrStaff" class="nav-item">
      <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
        <i class="fas fa-fw fa-adjust"></i>
        Normal Values
      </a>
      <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">Normal Values</h6>
          <router-link class="nav-link text-gray-900" :to="{ name: 'NormalValues', params: {test: 'bloodpressure'}}">BloodPressure</router-link>
          <router-link class="nav-link text-gray-900" :to="{ name: 'NormalValues', params: {test: 'cholestrol'}}">Cholesterol</router-link>
        </div>
      </div>
    </li>

    <li v-if="isAdminOrStaff" class="nav-item">
      <router-link class="nav-link" :to="{ name: 'AllUsers'}"><i class="fas fa-fw fa-users"></i> Users</router-link>
    </li>

  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
        'isAdminOrStaff',
        'currentUser'
    ]),
  },
}
</script>

<style scoped>
.nav-link  .nav-link.router-link-exact-active {
  color: blue !important;
}
.router-link-exact-active, .router-link-exact-active .fas{
  color: white;
}
</style>