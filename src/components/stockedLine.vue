<template>
    <div class="line">
        <div id="line" class="" style="width: 95%;height:295px;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    // 引入
    import 'echarts/lib/chart/line';
    import 'echarts/lib/component/title';
//    import 'echarts/lib/component/legend';
    import 'echarts/lib/component/tooltip';

    export default {
        mounted(){
            this.myChart = echarts.init(document.getElementById('line'));
            this.initData();

        },
        props: ['lineData','lineUnit','numData','typeName','lineColor'],
        methods: {
            initData(){
                const option = {
                    title: {
                        text: ' '
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data:''
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
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
                            boundaryGap : false,
                            data : this.lineData
                        }
                    ],
                    yAxis : [
                        {
                            name:this.lineUnit,
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:this.typeName,
                            type:'line',
                            stack: '总量',
                            itemStyle: {
                            normal: {
                                color:this.lineColor
                            }
                        },
                            data:this.numData
                        }
                    ]
                };

                this.myChart.setOption(option);
            }
        },
        watch: {
            lineData: function (){
                this.initData()
            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    .line{
        display: flex;
        justify-content: center;
    }
</style>
