<template>
    <div class="fillcontain">
        <ul class="menu">
            <li>
                <a href="javascript:void(0);">快速退货</a>
            </li>
        </ul>
        <div class="fastShippingDetails">
            <div class="left" style="margin-bottom: 10px">
                <el-button type="info"  size="small">打印二维码</el-button>
            </div>
            <router-link class="back right" :to='{path:"/returnManagement"}'>返回</router-link>
            <div class="detailsTop">
                <el-col :span="24" >
                    <el-col :span="8" >采购商家：{{this.orderTable.purchaserName}}</el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="8" >订单编号：{{this.orderTable.orderId}}</el-col>
                    <el-col :span="8">状态：{{(this.orderTable.status==0)?'未支付':'已支付'}}</el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="8">退货时间：{{formatDateInfo(this.orderTable.orderTime)}}</el-col>
                    <el-col :span="8">退货人：{{this.orderTable.operator}}</el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="8">总退货数：{{this.orderTable.totalNum}}</el-col>
                    <el-col :span="8">总退货金额：{{this.orderTable.totalFee}}</el-col>
                </el-col>
            </div>

            <div class="fastTable">
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        prop="imgUrl_main"
                        width="180"
                        label="商品主图">
                        <template scope="scope">
                            <div class="flex CommodityFigure">
                                <img src="../image/head11.jpg" alt="">
                                <p>名称名称名称</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="productCode"
                        label="商品货号">
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
                        prop="orderNum"
                        label="数量">
                    </el-table-column>
                    <el-table-column
                        prop="closeFee"
                        label="金额">
                    </el-table-column>
                    <el-table-column
                        prop="payType"
                        label="结算方式"
                        :formatter="initData"
                    >
                    </el-table-column>
                    <el-table-column label="操作" v-if="state == 2">
                        <template scope="scope">
                            <el-button
                                size="small"
                                type="danger"
                                @click="dialogDelete = true">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination
                small
                class="right"
                style="margin-top: 20px;"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
            <el-button class="export_excle">导出excle</el-button>
        </div>
        <el-dialog
            title="删除"
            :visible.sync="dialogDelete"
            size="tiny"
        >
            <div class="flex2">是否确认删除此信息？</div>
            <span slot="footer" class="dialog-footer flex2">
                <el-button @click="dialogDelete = false">取 消</el-button>
                <el-button type="primary" @click="dialogDelete = false">确 定</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {querySalesReturnOrderInfo,querySalesReturnDetail} from '@/api/getData'
    import {formatDate} from '../utils/date.js'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                state:1,
                orderId:'',
                dialogDelete:false,
                tableData: [],
                orderTable:[],
                colors:[],
                sizes:[],
                //当前页码
                currentPage: 1,

                //查询的页码
                start: 1,
                //每页显示的总条数
                pageSize:8,
                //默认数据总数
                totalCount: 0,
            }
        },
        watch:{
            '$route':function (route) {
                this.state = this.$route.query.state;
                this.orderId = this.$route.query.orderId;
                this.loadData();
            }
        },
        mounted(){
            this.orderId = this.$route.query.orderId;
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            formatDateInfo(time){
                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm');
            },
            handleIconClick(ev) {

            },
            initData:function(row, column) {
                let data = row[column.property];
                if(data==0 || data =="0"){
                    return "现结";
                }else{
                    return "";
                }
            },
            async loadData(){
                const data = await querySalesReturnOrderInfo({orderId:this.orderId});
                if(data.isSuccess){
                    this.orderTable = data.result.data;
                }
                let param = {orderId:this.orderId,pageIndex:this.currentPage,pageSize:this.pageSize};
                const res = await querySalesReturnDetail(param);
                if(res.isSuccess){
                    this.tableData = res.result.salesReturnDetail;
                    this.totalCount = res.result.totalCount;
                    this.currentPage = res.result.pageIndex;
                }
            },
            handleCurrentChange:function(val) {
                this.currentPage = val;
                let param = {
                    orderId:this.orderId,
                    pageIndex:this.currentPage,
                    pageSize:this.pageSize
                };
                this.loadData(param);
            },

        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/fastShipping';
</style>
