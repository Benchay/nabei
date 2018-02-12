<template>
    <div class="fillcontain">
        <ul class="startsMenu">
            <li>
                <router-link :to='{path:"/startProcurement"}'>销售订单</router-link>
            </li>
            <li>
                <router-link :to='{path:"/startProcurement2"}'>采购需求</router-link>
            </li>
            <li class="change">采购订单</li>
        </ul>
        <div style="overflow: hidden;" class="startProcurement">
            <div class="purchasingAll">
                <div class="pm21Top">
                    <div class="left">
                        <el-button type="info" size="small" v-if="state == 1" @click="dialogVisible2 = true">取消订单</el-button>
                        <el-button type="info" size="small" v-if="state == 1" @click="dialogVisible = true">催单</el-button>
                        <el-button type="info" size="small">联系档口</el-button>
                        <el-button type="info" size="small">打印</el-button>
                    </div>
                    <router-link :to='{path:"/startProcurement3"}' class="right">返回</router-link>
                </div>
                <div class="purTable1">
                    <ul class="purTableTit">
                        <li>2017-08-10</li>
                        <li><img src="../image/rindent.png" alt="">订单号：20170810091109</li>
                        <li>下单时间：2017-04-14 10：12：22</li>
                    </ul>
                    <ul class="purTableContent2 flex">
                        <li><img src="../image/head11.jpg" alt=""></li>
                        <li>我是档口名称</li>
                        <li class="moneyColor1">￥1580</li>
                        <li>总商品：<span class="numberColor">3</span></li>
                        <li>总数量：<span class="numberColor">78</span></li>
                        <li class="purcolor1">{{state==1?'待确认':state==2?'已确认':''}}</li>
                    </ul>
                </div>
                <el-table
                    class="table33"
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        label="主图"
                        width="180">
                        <template scope="scope">
                            <img src="../image/head11.jpg" alt="">
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="货号"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="color"
                        label="颜色">
                    </el-table-column>
                    <el-table-column
                        prop="size"
                        label="尺码">
                    </el-table-column>
                    <el-table-column
                        prop="supplyrice"
                        label="供货价">
                    </el-table-column>
                    <el-table-column
                    prop="planumbers"
                    label="计划数">
                </el-table-column>
                    <el-table-column
                    prop="actualNumber"
                    label="实际数">
                </el-table-column>
                </el-table>
                <el-pagination
                    small
                    class="right"
                    style="margin-top: 20px;"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount">
                </el-pagination>
            </div>
        </div>
        <el-dialog
            :visible.sync="dialogVisible"
            size="tiny"
            :before-close="handleClose">
            <div class="dialogCD flex2">
                <img src="../image/confirm.png" alt="">
                <p>催单成功！</p>
            </div>
        </el-dialog>
        <el-dialog
            title="取消订单"
            :visible.sync="dialogVisible2"
            size="tiny"
            :before-close="handleClose">
            <span>是否确定取消此订单？</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>
<script>
    import headTop from '../components/headTop'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                dialogVisible2:false,
                dialogVisible:false,
                state:1,
                tableData:[{
                    num:'JN6726',
                    color:'白色',
                    size:'L',
                    supplyrice:10,
                    planumbers:20,
                    actualNumber:100,
                },
                    {
                        num:'JN6726',
                        color:'白色',
                        size:'L',
                        supplyrice:10,
                        planumbers:20,
                        actualNumber:100,
                    },{
                        num:'JN6726',
                        color:'白色',
                        size:'L',
                        supplyrice:10,
                        planumbers:20,
                        actualNumber:100,
                    },{
                        num:'JN6726',
                        color:'白色',
                        size:'L',
                        supplyrice:10,
                        planumbers:20,
                        actualNumber:100,
                    },],
                currentPage:4,
                pagesize:4,

            }
        },
        watch:{
            '$route':function (route) {
                this.state = this.$route.query.state;
                console.log(this.state)
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/startProcurement';
</style>
