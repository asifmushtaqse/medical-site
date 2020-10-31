<template>
  <div>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import './assets/vendor/jquery/jquery.min.js'
import './assets/vendor/bootstrap/js/bootstrap.bundle.min.js'
import './assets/vendor/jquery-easing/jquery.easing.min.js'
// import './assets/js/sb-admin-2.min.js'
export default {

}
</script>

<style scoped>
@import './assets/vendor/fontawesome-free/css/all.min.css';
@import './assets/css/sb-admin-2.min.css';

.chart-area {
  flex-grow: 1;
  min-height: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
