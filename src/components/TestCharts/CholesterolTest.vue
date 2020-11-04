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
              <BarChart v-if="testData" :chart-data="testData" :options="chartOptions" />
            </div>
            <p class="text-center mb-0" v-if="!testData">No record found!</p>
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
import BarChart from "@/charts/BarChart";
import {mapGetters} from "vuex";
export default {
  components: {
    BarChart
  },
  props: ["userId"],
  data(){
    return {
      testData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        barValueSpacing: 20,
        scales: null
      },
    }
  },
  mounted() {
    this.getCholesterolTest()
  },
  methods: {
    getCholesterolTest() {
      const months = this.$store.getters.getMonthNames
      this.$store.dispatch("list_request", {
        endpoint: "cholestrol/tests/?userid="+this.userId,
      })
      .then(res => {
        const labels = []
        const ldl = []
        const hdl = []
        const total_cholesterol = []
        const triglycerides = []
        const vldl = []
        res.data.forEach(function(item){
          const date = new Date(item.test_date)
          labels.push(date.getDate() + " " + months[date.getMonth()])
          ldl.push(item.ldl)
          hdl.push(item.hdl)
          total_cholesterol.push(item.total_cholestrol)
          triglycerides.push(item.triglycerides)
          vldl.push(item.vldl)
        })
        const allvalues = ldl.concat(hdl).concat(total_cholesterol).concat(triglycerides).concat(vldl)
        let max = Math.max(...allvalues)
        let min = Math.min(...allvalues)
        if(min >= 20){
          min -= 20;
        }else{
          min = 0;
        }
        if(labels.length > 0){
          this.testData = {
            labels: labels,
            datasets: [
              {
                label: "LDL",
                backgroundColor: "blue",
                data: ldl
              },
              {
                label: "HDL",
                backgroundColor: "red",
                data: hdl
              },
              {
                label: "Cholesterol",
                backgroundColor: "orange",
                data: total_cholesterol
              },
              {
                label: "Triglycerides",
                backgroundColor: "yellow",
                data: triglycerides
              },
              {
                label: "VLDL",
                backgroundColor: "green",
                data: vldl
              }
            ]
          }
          this.chartOptions.scales = {
            yAxes: [{
              display: true,
              ticks: {
                min: min,
                max: max + 10,
              }
            }]
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
  computed: mapGetters(['isAdminOrStaff'])
}
</script>

<style scoped>

</style>