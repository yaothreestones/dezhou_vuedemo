<template>
  <div>
    <div :id="id" :option="option" :fn="fn"></div>
  </div>
</template>
<script>
import HighCharts from "highcharts";
// 这个一定要引入 不然报错
import HighchartsMore from "highcharts/highcharts-more";

import SolidGauge from "highcharts/modules/solid-gauge.js";
HighchartsMore(HighCharts);
SolidGauge(HighCharts);
export default {
  props: {
    id: {
      type: String
    },
    option: {
      type: Object
    },
    fn: {
      type: Function
    }
  },
  watch: {
    option(newVal, oldVal) {
      HighCharts.chart(this.id, this.option, this.fn);
    }
  },
  mounted() {
    HighCharts.chart(this.id, this.option, this.fn);
  }
};
</script>