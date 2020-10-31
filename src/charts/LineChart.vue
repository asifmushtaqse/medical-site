<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
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