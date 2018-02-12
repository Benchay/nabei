<template>
    <div class="figure">
        <div id="figure" style="width:90%;height: 450px;"></div>
    </div>
</template>
<script>
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/tooltip';
    export default {
        mounted(){
            this.myChart = echarts.init(document.getElementById('figure'));
            this.initData();
        },
        props: ['figureList','figureData','histogramUnit'],
        methods: {
            initData(){
              const option = {
                    color: ['#3398DB'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : this.figureData,
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            name:this.histogramUnit,
                        }
                    ],
                    series : [
                        {
                            name:' ',
                            type:'bar',
                            barWidth: '60%',
                            data:this.figureList
                        }
                    ]
                };
                this.myChart.setOption(option);
            }
        },
        watch: {
            figureList: function (){
                this.initData()
            },
        }
    }
</script>
<style lang="less">
    @import '../style/mixin';
    .figure{
        display: flex;
        justify-content: center;
    }
</style>
