<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div id="main" style="width: 750px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
import _ from "lodash";

export default {
  data() {
    return {
      options: {
        title: {
          text: "用户来源"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#E9EEF3"
            }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false,
            data: [
              "2019-12-27",
        "2019-12-28",
        "2019-12-29",
        "2019-12-30",
        "2019-12-31",
        "2020-1-1"
            ],
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ]
      }
    };
  },
  created() {},
  async mounted() {
    var myChart = echarts.init(document.getElementById("main"));

    const { data: res } = await this.$http.get("reports/type/1");
    console.log(res.data.xAxis);
    if (res.meta.status !== 200) {
      return this.$message.error("获取折线图数据失败！");
    }
    // res.data.xAxis = [
        
    // ]
    console.log(res.data);
    const result = _.merge(res.data, this.options);
    myChart.setOption(result);
  },
  methods: {}
};
</script>

<style lang="less" scoped>
</style>
