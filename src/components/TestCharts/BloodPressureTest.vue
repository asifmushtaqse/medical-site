<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card shadow mb-4">
        <a href="#bloodpressuretest" class="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="collapseCardExample">
          <h6 class="m-0 font-weight-bold text-primary">Blood Pressure Test</h6>
        </a>
        <div class="collapse show" id="bloodpressuretest">
          <div class="card-body">
            <div>
              <BarChart v-if="bloodPressureData" :chart-data="bloodPressureData" :options="chartOptions" />
            </div>
            <p class="text-center mb-0" v-if="!bloodPressureData">No record found!</p>
          </div>
          <hr />
          <p class="text-center">
            <router-link :to="{name: 'AllBloodPressureTests', params: {id : userId}}" class="btn btn-secondary">
              <span class="text">View All</span>
            </router-link>
            <router-link v-if="!isAdminOrStaff" :to="{name: 'AddBloodPressureTest', params: {id : userId}}" class="btn btn-primary ml-4">
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
import {mapGetters} from 'vuex'
export default {
  components: {
    BarChart
  },
  props: ["userId"],
  data(){
    return {
      bloodPressureData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: null,
        lineAt: null,
      },
    }
  },
  mounted() {
    this.getBloodPressureNormalValues()
    this.getBloodPressureData()
  },
  methods: {
    getBloodPressureNormalValues(){
      this.$store.dispatch("list_request", {
        endpoint: "bloodpressure/normal-values/",
      })
      .then(res => {
        console.log(res.data)

        this.chartOptions.lineAt = [
          {
            value: [res.data.min_diastolic, res.data.max_diastolic],
            color: "red"
          },
          {
            value: [res.data.min_systolic,res.data.max_systolic],
            color: "blue"
          }
        ]

      });
    },
    getBloodPressureData(){
      const months = this.$store.getters.getMonthNames
      this.$store.dispatch("list_request", {
        endpoint: "bloodpressure/tests/?userid="+this.userId,
      })
      .then(res => {
        const labels = []
        const systolic = []
        const diastolic = []
        res.data.forEach(function(item){
          const date = new Date(item.test_date)
          labels.push(date.getDate() + " " + months[date.getMonth()])
          systolic.push(item.systolic)
          diastolic.push(item.diastolic)
        })
        let max = Math.max(...systolic)
        if(max < Math.max(...diastolic)){
          max = Math.max(...diastolic)
        }
        let min = Math.min(...systolic)
        if(min > Math.min(...diastolic)){
          min = Math.min(...diastolic)
        }
        if(min >= 20){
          min -= 20;
        }else{
          min = 0;
        }

        if(labels.length > 0){
          this.bloodPressureData = {
            labels: labels,
            datasets: [
              {
                label: "Systolic",
                backgroundColor: "blue",
                data: systolic
              },
              {
                label: "Disystolic",
                backgroundColor: "red",
                data: diastolic
              },

            ]
          }
          this.chartOptions.scales = {
            yAxes: [{
              display: true,
              ticks: {
                min: min,
                max: max,
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