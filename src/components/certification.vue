<template>
    <div class="certification"  style="height: 560px;overflow-y: auto">
        <div>
            <div>
                <p class="bigFont"><b>合格证</b></p>
                <p class="smallFont">商品名称：冬装羽绒服</p>
                <p class="smallFont">档口：很牛很牛的档口</p>
                <p class="smallFont">货号：HMN123</p>
                <p class="smallFont">规格：红色；165/88A(M)</p>
                <p class="smallFont">成分：纯棉</p>
                <p class="smallFont">执行标准：FZ/F 2984-2017</p>
                <p class="smallFont">商品等级：合格品</p>
                <p><img src="../image/certification001.png" alt=""></p>
                <p>------------------------------</p>
                <p class="superFont">单价：￥9988</p>
            </div>
        </div>
        <div class="print" style="width:100%;">
            <el-button>打印</el-button> <el-button>打印设计</el-button>
        </div>
    </div>
</template>

<script>


    export default {
        data(){
            return {

            }
        },
        mounted(){

        },

    }
</script>

<style lang="less">
    .certification{
        background: #525659;
        width:100%;
        height:100%;
        display: flex;
        align-content:flex-start;
        flex-wrap:wrap;
        &.certification>div{
            width:23%;
        }
        &.certification>div>div{
            border-radius: 10px;
            box-sizing: border-box;
            background: #fff;
            width:245px;
            height: 350px;
            padding: 10px 30px;
            margin: 10px;
            img{
                width:100%;
            }
            p{
                font-size: 14px;
            }
            .smallFont{
                height: 23px;
                line-height: 23px;
            }
            .bigFont{
                text-align: center;
                font-size: 18px;
                margin: 5px 0 10px;
            }
            .superFont{
                font-size: 22px;
                font-weight: bold;
                text-align: center;
            }
        }
        .print{
            width:100%;
            margin-top: 20px;
            padding-left: 15px;
        }
    }

</style>
