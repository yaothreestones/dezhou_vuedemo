<template>
  <div>
    <div
      style="
		height: 34px;
		line-height: 34px;
		position:  relative;
		border-radius: 5px;
		"
    >
      <div style="
    height: 18px;
    background: #26becc;
    border-radius: 5px 3px 0 0;
"></div>
      <div style="
    height: 16px;
    background: #06a0b1;
"></div>
      <div :class="[choose_first?'bg left':'bg right']"></div>
      <span
        @click="select(1)"
        :class="[choose_first?'topnav topnav_selected':'topnav']"
        style="
    position:  absolute;
    left: 0px;
    top: 1px;
    background-size: cover;
    height: 38px;
    border-radius: 4px 0 0 0;
"
      >医院</span>
      <span
        @click="select(2)"
        :class="[!choose_first?'topnav topnav_selected':'topnav']"
        style="
    position:  absolute;
    left: 100px;
    top: 1px;
"
      >诊所</span>
    </div>
    <div
      class="home_searchbox"
      style="
    display: flex;
    align-items: center;
	position: relative;
	margin: 10px 0;
"
    >
      <span class="home_search_title">时间</span>
      <form
        autocomplete="off"
        onkeypress="if(event.keyCode == 13)return false"
        style="display: flex;
			align-items: center;"
      >
        <input class="home_search_time" id="start" type="text" placeholder="开始时间" />
        <div class="home_search_gang"></div>
        <input class="home_search_time" id="end" type="text" placeholder="结束时间" />
      </form>

      <span class="home_search_title">机构</span>
      <form
        autocomplete="off"
        onkeypress="if(event.keyCode == 13)return false"
        style="display: flex;
			align-items: center;"
      >
        <input class="home_search_time" id="name" />
      </form>
      <div class="home_search_button1" @click="search()">查询</div>
      <div class="home_search_button2 home_export" @click="exportfile()">导出</div>
    </div>
    <div style="
    height: 5px;
    background: #e6f8f7;
"></div>
    <div class="chartdiv monthdayicon" style="height: 443px;">
      <div class="titlebox" id="thirtyDays">
        <div>医废回收总重量</div>
      </div>
      <div class="chartbox shadow">
        <chart :id="clumnbox" :option="clumnOption" :fn="clumnFn"></chart>
      </div>
    </div>
    <div style="
    height: 5px;
    background: #e6f8f7;
	"></div>
    <div class="listdiv newdayicon">
      <div class="titlebox">各机构医废重量统计</div>
      <div class="listbox shadow" id="baginfolist">
        <table class="tablelist" cellpadding="0" cellspacing="0">
          <thead>
            <th id="selectAll" style="cursor:pointer" @click="selectAll()">全选</th>
            <th>序号</th>
            <th>机构名称</th>
            <th>总重量</th>
            <th>感染类</th>
            <th>损伤类</th>
            <th>病理类</th>
            <th>化学类</th>
            <th>药物类</th>
            <th>操作</th>
          </thead>
          <tbody>
            <tr v-for="(item,index) in info" :key="index">
              <td>
                <input type="checkbox" />
              </td>
              <td>{{index+1}}</td>
              <td>{{item.instName}}</td>
              <td>{{item.totalWeight}}kg</td>
              <td>{{item.type1Weight}}kg</td>
              <td>{{item.type2Weight}}kg</td>
              <td>{{item.type3Weight}}kg</td>
              <td>{{item.type5Weight}}kg</td>
              <td>{{item.type4Weight}}kg</td>
              <td>
                <a>详情</a>
              </td>
            </tr>
          </tbody>
        </table>
        <page :pages="pages" @currentPage="currentPage"></page>
        <div class="bottompage">
          <span class="totalrows"></span>
          <div class="tcdPageCode" style="float: right;"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Ajax from "@/components/ajax/ajax";
import chart from "@/components/highchart";
import page from "@/components/pageNation";
export default {
  data() {
    return {
      choose_first: true,
      name: "",
      clumnbox: "clumnbox",
      clumnOption: {},
      clumnFn: function() {},
      info: [],
      pages: 0,
      current: 1,
      ids: []
    };
  },
  components: { chart, page },
  mounted() {
    this.hsNearly();
    this.hsList(1);
    window.laydate.render({
      elem: "#start"
    });
    window.laydate.render({
      elem: "#end"
    });
  },
  methods: {
    select(x) {
      x == 1 ? (this.choose_first = true) : (this.choose_first = false);
    },
    currentPage(x) {
      this.current = x;
      this.hsList(x);
    },
    hsNearly() {
      let parm = {
        end: document.getElementById("end").value,
        name: this.name,
        start: document.getElementById("start").value
      };
      Ajax.hsNearly(parm).then(res => {
        let categories = [],
          series = [];
        const info = res.data.data;

        if (info && info.length) {
          info.forEach(function(item, index) {
            categories.push(item.name);
            series.push(Number(item.weight));
          });
          this.clumnOption = {
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
                text: "机构"
              },
              categories: categories,
              lineWidth: 1,
              gridLineWidth: 0
            },
            yAxis: {
              title: {
                text: "重量"
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
                pointPadding: 0.4,
                borderWidth: 1,
                pointWidth: 25
              }
            },
            series: [
              {
                name: " ",
                data: series,
                lineWidth: 10
              }
            ]
          };
          this.clumnFn = function(chart) {
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
    hsList(page) {
      let parm = {
        end: document.getElementById("end").value,
        name: this.name,
        start: document.getElementById("start").value,
        page: page,
        size: 10
      };
      Ajax.hsList(parm).then(res => {
        this.info = res.data.data.list;
        this.pages = res.data.data.pages;
      });
    },
    selectAll() {},
    search() {
      this.hsNearly();
      this.hsList(1);
    },
    exportfile() {
      let url;
      if (this.choose_first) {
        url =
          "/med/dezhou/company/web/hwStatInst/list/export.do?t=" +
          new Date().getTime();
      } else {
        url =
          "/med/dezhou/company/web/hwStatZszs/list/export.do?t=" +
          new Date().getTime();
      }
      this.filedownload({
        dom: ".home_export",
        url: url,
        data: {
          ids: this.ids,
          start: document.getElementById("start").value,
          end: document.getElementById("end").value
        }
      });
    }
  }
};
</script>
<style scoped>
.topnav {
  cursor: pointer;
  width: 115px;
  display: inline-block;
  text-align: center;
  font-weight: 700;
  color: #fff;
}
.topnav_selected {
  color: #27bfcd;
}
.bg {
  background: url(../assets/img/home/tab.png) -2px -3px / cover no-repeat;
  position: absolute;
  left: 0px;
  top: 1px;
  height: 38px;
  border-radius: 4px 0px 0px;
  width: 121px;
}
.left {
  left: 0px;
}
.right {
  left: 105px;
}
.home_search_title {
  margin-left: 40px;
  margin-right: 10px;
}
.home_search_time {
  width: 164px;
  height: 30px;
  outline: none;
  border: 1px solid #dce4eb;
  box-sizing: border-box;
}
.home_search_gang {
  width: 10px;
  margin: 0px 5px;
  height: 0px;
  border-bottom: 1px solid #dce4eb;
}
.home_search_time {
  width: 164px;
  height: 30px;
  outline: none;
  border: 1px solid #dce4eb;
  box-sizing: border-box;
}
.home_search_title {
  margin-left: 40px;
  margin-right: 10px;
}
.home_search_time {
  width: 164px;
  height: 30px;
  outline: none;
  border: 1px solid #dce4eb;
  box-sizing: border-box;
}
.home_search_button1 {
  color: #fff;
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 3px;
  margin-left: 40px;
  cursor: pointer;
  background: url(../assets/img/common/search.png) no-repeat 20px center;
  background-color: #019aaa;
  padding-left: 10px;
  box-sizing: border-box;
}
.home_search_button2 {
  color: #fff;
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 3px;
  position: absolute;
  right: 40px;
  top: 0;
  cursor: pointer;
  background: url(../assets/img/common/export.png) 20px center no-repeat
    rgb(1, 154, 170);
  padding-left: 10px;
  box-sizing: border-box;
  display: block;
}
.chartdiv {
  width: 100%;
  box-sizing: border-box;
}
.monthdayicon {
  padding-top: 5px;
}
.titlebox {
  height: 30px;
  line-height: 30px;
  margin-left: 30px;
  position: relative;
}
.chartbox,
.listbox,
.videobox {
  width: 100%;
  height: calc(100% - 30px);
  background: #ffffff;
}
#clumnbox {
  width: 100%;
  height: 100%;
}
.listdiv {
  box-sizing: border-box;
}
.titlebox {
  height: 30px;
  line-height: 30px;
  margin-left: 30px;
  position: relative;
}
.chartbox,
.listbox,
.videobox {
  width: 100%;
  height: calc(100% - 30px);
  background: #ffffff;
}
</style>