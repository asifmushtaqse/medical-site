<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ["chartData"],
  data(){
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        barValueSpacing: 20,
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
            }
          }]
        }
      },
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>