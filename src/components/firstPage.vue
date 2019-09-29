<template>
  <div>
    <div class="fp_top">
      <div class="fp_tl">
        <div class="fp_tl_title">医废收集统计</div>
        <div class="fp_tl_box" style="
">
          <div class="fp_tl_content box1">
            <div class="fp_numbox">
              <span class="fp_num" id="fpAll">{{all}}</span>
              <span>kg</span>
            </div>
            <div style="text-align:center">历史医废总重量</div>
          </div>
          <div class="fp_tl_content box2">
            <div class="fp_numbox">
              <span class="fp_num" id="fpUpload">{{upload}}</span>
              <span>kg</span>
            </div>
            <div style="text-align:center">今日回收量</div>
          </div>
          <div class="fp_tl_content box3">
            <div class="fp_numbox">
              <span class="fp_num" id="fpCompanyIn">{{companyIn}}</span>
              <span>kg</span>
            </div>
            <div style="text-align:center">今日入库量</div>
          </div>
          <div class="fp_tl_content box4">
            <div class="fp_numbox">
              <span class="fp_num" id="fpDestroy">{{destroy}}</span>
              <span>kg</span>
            </div>
            <div style="text-align:center">今日销毁量</div>
          </div>
        </div>
      </div>
      <div style="width:5px;height: 390px;
        background: #e6f8f7;"></div>
      <div class="fp_tr">
        <div class="fp_tr_title">近30天医废回收类型占比</div>
        <div class="fp_tr_content" id="fpTypeWeight"></div>
        <chart :id="typeWeight" :option="fpTypeWeightOption" :fn="typeWeightFn"></chart>
      </div>
    </div>
    <div style="width:100%;height:10px;background:#e6f8f7"></div>
    <div class="fp_m_box">
      <div>
        <div class="fp_m_title">近30天回收总量趋势</div>
        <chart :id="id" :option="option"></chart>
      </div>
    </div>
    <div style="width:100%;height:10px;background:#e6f8f7"></div>
    <div class="fp_b_box">
      <div class="fp_bl">
        <div class="fp_bl_tile">各月医废总回收量</div>
        <chart :id="companyInByMonth" :option="ByMonth" :fn="setchart"></chart>
      </div>
      <div style="width:5px;height: 443px;
        background: #e6f8f7;"></div>
      <div class="fp_br" style="position:relative">
        <div class="fp_br_tile">医废回收来源占比</div>
        <div
          class="fp_br_content"
          style="display:flex;height:400px;width:96%;margin:auto;
            box-sizing: border-box;"
        >
          <chart :id="zszsWeight" :option="zszsWeightOption" style="flex:1"></chart>
          <chart :id="notZszsWeight" :option="notZszsWeightOption" style="flex:1"></chart>
        </div>
        <div
          style="
    height: 20px;
    width:100%;
    display: flex;    position: absolute;
    bottom: 50px;
    "
        >
          <span style="
    display: flex;
    flex: 1;
    justify-content: center;
">
            <span
              style="
    width: 20px;
    border-radius: 10000px;
    background: #5ce5c9;
    margin-right: 10px
    "
            ></span>
            <span>诊所</span>
          </span>
          <span style="
    display: flex;
    flex: 1;
    justify-content: center;
">
            <span
              style="
    width: 20px;
    border-radius: 10000px;
    background: #ffbb72;
    margin-right: 10px
    "
            ></span>
            <span style="
">医院</span>
          </span>
        </div>
      </div>
    </div>
    <div style="height:20px;background: #e6f8f7;"></div>
  </div>
</template>
<script>
import Ajax from "@/components/ajax/ajax";
import chart from "@/components/highchart";
export default {
  data() {
    return {
      all: 0,
      companyIn: 0,
      upload: 0,
      destroy: 0,
      option: {},
      id: "fpUploadTrend",
      companyInByMonth: "fpCompanyInByMonth",
      ByMonth: {},
      setchart: function() {},
      zszsWeight: "zszsWeight",
      notZszsWeight: "notZszsWeight",
      zszsWeightOption: {},
      notZszsWeightOption: {},
      typeWeight: "fpTypeWeight",
      fpTypeWeightOption: {},
      typeWeightFn: function() {}
    };
  },
  components: { chart },
  methods: {
    fpUploadTrend() {
      Ajax.fpUploadTrend({}).then(res => {
        const info = res.data.data;
        let series = [],
          categories = [];
        if (info && info.length) {
          info.forEach(function(item, index) {
            categories.push(item.date);
            series.push([item.date, Number(item.weight)]);
          });
        }
        this.option = {
          chart: {
            type: "area"
          },
          title: {
            text: ""
          },
          xAxis: {
            title: {
              text: "时间",
              align: "high",
              style: {
                color: "#000"
              }
            },
            categories: categories,
            tickInterval: 5
          },
          yAxis: {
            title: {
              text: "重量",
              align: "high",
              rotation: 0,
              style: {
                color: "#000"
              }
            },
            gridLineDashStyle: "Dot",
            gridLineDashColor: "#dcdcdc",
            gridLineWidth: 2,
            lineWidth: 1
          },
          legend: {
            enabled: false
          },
          tooltip: {
            pointFormat: "{series.x} 回收 <b>{point.y}</b>kg医废"
          },
          plotOptions: {
            area: {
              //pointStart: 1940,
              marker: {
                fillColor: "#FFFFFF",
                lineWidth: 2,
                lineColor: "#9ad6cc" // inherit from series
              }
            }
          },
          series: [
            {
              data: series,
              color: "#f0f9f7",
              lineColor: "#9ad6cc"
            }
          ]
        };
      });
    },
    fpCompanyInByMonth() {
      Ajax.fpCompanyInByMonth({}).then(res => {
        let info = res.data.data,
          categories = [],
          series = [];
        if (info && info.length) {
          info.forEach(function(item, index) {
            categories.push(item.month);
            series.push(Number(item.weight));
          });
          this.ByMonth = {
            chart: {
              type: "column",
              borderWidth: 0,
              plotBorderWidth: 0
            },
            title: {
              text: ""
            },
            legend: {
              enabled: false
            },
            xAxis: {
              title: {
                text: "月份",
                align: "high",
                style: {
                  color: "#000"
                }
              },
              categories: categories,
              lineWidth: 1,
              tickInterval: 3,
              gridLineWidth: 0
            },
            yAxis: {
              title: {
                text: "重量",
                align: "high",
                rotation: 0,
                style: {
                  color: "#000"
                }
              },
              gridLineDashStyle: "Dot",
              gridLineDashColor: "#dcdcdc",
              gridLineWidth: 2,
              lineWidth: 1
            },
            tooltip: {
              pointFormat: "{series.x}回收<b>{point.y}</b>kg医废"
            },
            plotOptions: {
              column: {
                pointPadding: 0.3,
                borderWidth: 1,
                pointWidth: 25
              }
            },
            series: [
              {
                name: " ",
                data: series
              }
            ]
          };
          this.setchart =
            //设置每一个数据点的颜色值
            function(chart) {
              //获得第一个序列的所有数据点
              var pointsList = chart.series[0].points;
              //遍历设置每一个数据点颜色
              for (var i = 0; i < pointsList.length; i++) {
                chart.series[0].points[i].update({
                  color: {
                    linearGradient: {
                      x1: 0,
                      y1: 1,
                      x2: 0,
                      y2: 0
                    }, //横向渐变效果 如果将x2和y2值交换将会变成纵向渐变效果
                    stops: [[0, "#08a1ab"], [1, "#63ebcc"]]
                  }
                });
              }
            };
        }
      });
    },
    fpCompanyInByInstType() {
      Ajax.fpCompanyInByInstType({}).then(res => {
        let info = res.data.data,
          zszsWeight = info.zszsWeight,
          notZszsWeight = info.notZszsWeight;
        this.zszsWeightOption = {
          chart: {
            type: "solidgauge",
            marginTop: 0,
            backgroundColor: "#eef7f6"
          },
          title: {
            text:
              '<span style="font-size:40px; color: #bfd5e5; font-weight: bold">' +
              name +
              '</span><br/><span style="font-size:40px; color: #bfd5e5; font-weight: bold">' +
              (!notZszsWeight && !zszsWeight
                ? 0
                : Number(
                    ((zszsWeight * 100) / (zszsWeight + notZszsWeight)).toFixed(
                      0
                    )
                  )) +
              "%</span>",
            style: {
              fontSize: "44px"
            },
            y: 200
          },
          tooltip: {
            enabled: false
          },
          legend: {
            align: "right",
            verticalAlign: "top",
            x: 0,
            y: 100
          },
          pane: {
            startAngle: 0,
            endAngle: 360,
            background: [
              {
                // Track for Move
                outerRadius: "106%",
                innerRadius: "94%",
                backgroundColor: "#e8e8e8",
                //Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.3).get(),
                borderWidth: 2,
                borderColor: "#fff"
              }
            ]
          },
          yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
          },
          plotOptions: {
            solidgauge: {
              borderWidth: "15px",
              dataLabels: {
                enabled: false
              },
              linecap: "round",
              stickyTracking: false
            }
          },
          series: [
            {
              name: "123",
              color: "#fff",
              borderColor: "#5ce5c9",
              data: [
                {
                  color: "#fff",
                  radius: "100%",
                  innerRadius: "100%",
                  y:
                    !notZszsWeight && !zszsWeight
                      ? 0
                      : Number(
                          (
                            (zszsWeight * 100) /
                            (zszsWeight + notZszsWeight)
                          ).toFixed(0)
                        )
                }
              ]
            }
          ]
        };
        this.notZszsWeightOption = {
          chart: {
            type: "solidgauge",
            marginTop: 0,
            backgroundColor: "#eef7f6"
          },
          title: {
            text:
              '<span style="font-size:40px; color: #bfd5e5; font-weight: bold">' +
              name +
              '</span><br/><span style="font-size:40px; color: #bfd5e5; font-weight: bold">' +
              (!notZszsWeight && !zszsWeight
                ? 0
                : Number(
                    (
                      (notZszsWeight * 100) /
                      (zszsWeight + notZszsWeight)
                    ).toFixed(0)
                  )) +
              "%</span>",
            style: {
              fontSize: "44px"
            },
            y: 200
          },
          tooltip: {
            enabled: false
          },
          legend: {
            align: "right",
            verticalAlign: "top",
            x: 0,
            y: 100
          },
          pane: {
            startAngle: 0,
            endAngle: 360,
            background: [
              {
                // Track for Move
                outerRadius: "106%",
                innerRadius: "94%",
                backgroundColor: "#e8e8e8",
                //Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.3).get(),
                borderWidth: 2,
                borderColor: "#fff"
              }
            ]
          },
          yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
          },
          plotOptions: {
            solidgauge: {
              borderWidth: "15px",
              dataLabels: {
                enabled: false
              },
              linecap: "round",
              stickyTracking: false
            }
          },
          series: [
            {
              name: "123",
              color: "#fff",
              borderColor: "#ffbb72",
              data: [
                {
                  color: "#fff",
                  radius: "100%",
                  innerRadius: "100%",
                  y:
                    !notZszsWeight && !zszsWeight
                      ? 0
                      : Number(
                          (
                            (zszsWeight * 100) /
                            (zszsWeight + notZszsWeight)
                          ).toFixed(0)
                        )
                }
              ]
            }
          ]
        };
      });
    },
    fpTypeWeight() {
      Ajax.fpTypeWeight({}).then(res => {
        var series = res.data.data;
        this.fpTypeWeightOption = {
          chart: {
            spacing: [40, 0, 40, 0],
            backgroundColor: "#eef7f6"
          },
          colors: ["#0754a0", "#33c4d3", "#25a1c7", "#65eccd", "#6dc4b4"],
          title: {
            floating: true,
            text: "医废类型占比"
          },
          tooltip: {
            pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: "pointer",
              dataLabels: {
                enabled: false,
                format: "<b>{point.name}</b>: {point.percentage:.1f} %",
                style: {
                  color: "black"
                }
              },
              point: {
                events: {
                  mouseOver: function(e) {
                    chart.setTitle({
                      text:
                        e.target.name +
                        "\t" +
                        e.target.percentage.toFixed(1) +
                        " %"
                    });
                  }
                }
              }
            }
          },
          legend: {
            align: "right"
          },
          series: [
            {
              type: "pie",
              innerSize: "80%",
              name: "重量占比",
              data: series
            }
          ]
        };
        this.typeWeightFn = function(c) {
          var centerY = c.series[0].center[1],
            titleHeight = parseInt(c.title.styles.fontSize);
          c.setTitle({
            y: centerY + titleHeight / 2
          });
        };
      });
    }
  },
  mounted() {
    Ajax.fpAll({}).then(res => {
      this.all = res.data.data.totalWeight;
    });
    Ajax.fpUpload({}).then(res => {
      this.upload = res.data.data.totalWeight;
    });
    Ajax.fpCompanyIn({}).then(res => {
      this.companyIn = res.data.data.totalWeight;
    });
    Ajax.fpDestroy({}).then(res => {
      this.destroy = res.data.data.totalWeight;
    });
    this.fpUploadTrend();
    this.fpCompanyInByMonth();
    this.fpCompanyInByInstType();
    this.fpTypeWeight();
  }
};
</script>
<style scoped>
.fp_top {
  height: 390px;
  display: flex;
}
.fp_tl {
  flex: 7;
}
.fp_tl_title {
  height: 40px;
  line-height: 40px;
  margin-left: 12px;
}
.fp_tl_box {
  height: 332px;
  display: flex;
  justify-content: space-around;
  height: 344px;
}
.fp_tl_content {
  width: 22%;
  background-color: #eef7f6 !important;
  height: 330px;
}
.fp_numbox {
  text-align: center;
  margin-top: 5vh;
  margin-bottom: 10px;
}
span.fp_num {
  font-size: 25px;
}
.fp_tr {
  flex: 5;
}
.fp_tr_title {
  height: 40px;
  line-height: 40px;
  margin-left: 12px;
}
.fp_tr_content {
  height: 330px;
  width: 96%;
  margin: auto;
}
.fp_m_title {
  height: 40px;
  line-height: 40px;
  margin-left: 12px;
}
.fp_m_content {
  height: 389px;
  width: 98%;
  margin: auto;
}
.fp_b_box {
  display: flex;
  height: 443px;
}
.fp_bl {
  flex: 7;
}
.fp_bl_tile {
  height: 40px;
  line-height: 40px;
  margin-left: 12px;
}
.fp_br {
  flex: 5;
}
.fp_br_tile {
  height: 40px;
  line-height: 40px;
  margin-left: 12px;
}
.box1 {
  background: url(../assets/img/firstpage/total.png) no-repeat center 55%;
}
.box2 {
  background: url(../assets/img/firstpage/new.png) no-repeat center 55%;
}
.box3 {
  background: url(../assets/img/firstpage/in.png) no-repeat center 55%;
}
.box4 {
  background: url(../assets/img/firstpage/destory.png) no-repeat center 55%;
}
</style>