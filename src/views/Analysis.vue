<template>
  <div id='showorders' style='width:100%; height:100%'></div>
</template>


<script setup>
import * as echarts from 'echarts';
import {onMounted, reactive, ref} from "vue";
import {apiAnalysis} from "../apis/api";



function analysis(){
  // 基于准备好的dom，初始化echarts实例
  let chartDom = document.getElementById('showorders');
  let myChart = echarts.init(chartDom);

  apiAnalysis().then((res)=>{
    myChart.setOption({
      title: {
        text: '全球接口调用次数统计',
        subtext: '空梦API',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data:res.data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
  })
}

  onMounted(()=>{
    analysis()
  })

</script>


<style scoped>

</style>
