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
    <li v-if="isAdminOrStaff" class="nav-item">
      <router-link class="nav-link" :to="{ name: 'AllUsers'}"><i class="fas fa-fw fa-users"></i> Users</router-link>
    </li>

<!--    <hr class="sidebar-divider">-->

<!--    <div class="text-center d-none d-md-inline">-->
<!--      <button class="rounded-circle border-0" id="sidebarToggle"></button>-->
<!--    </div>-->

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
.router-link-exact-active, .router-link-exact-active .fas{
  color: white !important;
}
</style>