<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card shadow mb-4">
        <a href="#cholesterol" class="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="collapseCardExample">
          <h6 class="m-0 font-weight-bold text-primary">Cholesterol Test</h6>
        </a>
        <div class="collapse show" id="cholesterol">
          <div class="card-body">
            <div>
              <LineChart v-if="bloodPressureData" :chart-data="bloodPressureData" />
            </div>
            <p class="text-center mb-0" v-if="!bloodPressureData">No record found!</p>
          </div>
          <hr />
          <p class="text-center">
            <router-link :to="{name: 'AllCholesterolTests', params: {id : userId}}" class="btn btn-secondary">
              <span class="text">View All</span>
            </router-link>
            <router-link v-if="!isAdminOrStaff" :to="{name: 'AddCholesterolTest', params: {id : userId}}" class="btn btn-primary ml-4">
              <span class="text">Add Test</span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "@/charts/LineChart";
import {mapGetters} from "vuex";
export default {
  components: {
    LineChart
  },
  props: ["userId"],
  data(){
    return {
      bloodPressureData: {
        labels: ["12 January", "14 January", "15 January", "16 January", " 17 January"],
        datasets: [
          {
            label: "Systolic",
            backgroundColor: "blue",
            data: [2,3,6,8,9]
          },
          {
            label: "Disystolic",
            backgroundColor: "orange",
            data: [5,6,8,6,2]
          },
          {
            label: "Alostic",
            backgroundColor: "red",
            data: [10,8,11, 14, 13]
          }
        ]
      }
    }
  },
  mounted() {
    // this.getCholesterolTest()
  },
  methods: {
    getCholesterolTest() {

    }
  },
  computed: mapGetters(['isAdminOrStaff'])
}
</script>

<style scoped>

</style>