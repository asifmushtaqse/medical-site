<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ["chartData", "options"],
  mounted () {
    var horizonalLinePlugin = {
      id: 'horizontalLine',
      afterDraw: function(chart) {
        if (typeof chart.config.options.lineAt != 'undefined') {
          var lineAtArr = chart.config.options.lineAt;
          lineAtArr.forEach(function (data){
            data.value.forEach(function(lineAt){
              var ctxPlugin = chart.chart.ctx;
              var xAxe = chart.scales[chart.config.options.scales.xAxes[0].id];
              var yAxe = chart.scales[chart.config.options.scales.yAxes[0].id];

              if(yAxe.min != 0) return;

              ctxPlugin.strokeStyle = data.color;
              ctxPlugin.beginPath();
              lineAt = (lineAt - yAxe.min) * (100 / yAxe.max);
              lineAt = (100 - lineAt) / 100 * (yAxe.height) + yAxe.top;
              ctxPlugin.moveTo(xAxe.left, lineAt);
              ctxPlugin.lineTo(xAxe.right, lineAt);
              ctxPlugin.stroke();
            })
          })
        }
      }
    }
    this.addPlugin(horizonalLinePlugin);
    this.renderChart(this.chartData, this.options)
  }
}
</script>