<template>
    <div class="doughnut">
        <div id="doughnut" class="" style="width: 90%;height:500px;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    // 引入
    import 'echarts/lib/chart/pie';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
        import 'echarts/lib/component/tooltip';

    export default {
        mounted(){
            this.myChart = echarts.init(document.getElementById('doughnut'));
            this.initData();
        },
        props: ['doughnutData'],
        methods: {
            initData(){
                const option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:this.doughnutData
                    },
                    series: [
                        {
                            name:' ',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: true,
//                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true
                                }
                            },
                            data:this.doughnutData
                        }
                    ]
                };


                this.myChart.setOption(option);
            }
        },
        watch: {
            pieData: function (){
                this.initData()
            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    .doughnut{
        display: flex;
        justify-content: center;
    }
</style>
