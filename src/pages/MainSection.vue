<template>
  <div id="wrapper">
    <LeftMenuBar />
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <TopBar />
        <router-view :key="$route.fullPath"></router-view>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import LeftMenuBar from "@/components/LeftMenuBar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
export default {
  components: {
    LeftMenuBar,
    TopBar,
    Footer
  }
}
</script>
