<template>
  <div class="container-fluid">

    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800">My All Tests</h1>

    <BloodPressureTest :user-id="this.$route.params.id" />
    <CholesterolTest :user-id="this.$route.params.id" />

  </div>
</template>

<script>
import BloodPressureTest from "@/components/TestCharts/BloodPressureTest";
import CholesterolTest from "@/components/TestCharts/CholesterolTest";

export default {
  components: {
    BloodPressureTest,
    CholesterolTest
  }
}
</script>

<style scoped>

</style>