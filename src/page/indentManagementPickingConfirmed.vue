<template>
    <div class="fillcontain">
        <ul class="menu">
            <li v-if="getMenuAuthFun('fastShipping2')">
                <router-link :to='{path:"/fastShipping2"}'>快速出货</router-link>
            </li>
            <li class="menuIndex" v-if="getMenuAuthFun('indentManagement')">
                <router-link :to='{path:"/indentManagement"}'>订单管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('sellerSettlement')">
                <router-link :to='{path:"/sellerSettlement"}'>客户结算</router-link>
            </li>
            <li v-if="getMenuAuthFun('customerManagement')">
                <router-link :to='{path:"/customerManagement"}'>客户管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('statisticalStatement')">
                <router-link :to='{path:"/statisticalStatement"}'>销售统计</router-link>
            </li>
        </ul>
        <div class="purchasing-content">
            <div class="purchasingAll">
                <div class="right">
                    <router-link :to='{path:"/indentManagement"}'  class="comeBack">返回</router-link>
                </div>
                <div class="purPendingButton">
                    <a href="javascript:void(0)" class="buttonColor" @click="dialogVisible = true">确 认</a>
                </div>
                <div class="sumTotal flex" style="padding-top: 20px;padding-bottom: 20px;">
                    <p style="margin-right: 20px;">订单编号：123</p>
                    <p style="margin-right: 20px;">电商卖家名称：1</p>
                    <p>下单时间：1</p>
                </div>

                <div class="stocktakingTable">
                    <el-table
                        :data="tableData"
                        @selection-change="handleSelectionChange"
                        style="width: 100%">
                        <el-table-column
                            width="200"
                            label="主图/货号">
                            <template scope="scope">
                                <div class="flex">
                                    <img src="../image/111.png" alt=""  class="tableImg">
                                    <p class="titleNone">122222222222222222222</p>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="productName"
                            label="商品名称">
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
                            prop="unitPrice"
                            label="单价">
                        </el-table-column>
                        <el-table-column
                            prop="unitPrice"
                            label="下单数量">
                        </el-table-column>
                        <el-table-column
                            prop="unitPrice"
                            label="库存数量">
                        </el-table-column>
                        <el-table-column
                            prop="unitPrice"
                            label="确认数量">
                            <template scope="scope">
                                <el-input v-model="input"></el-input>
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
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount">
                </el-pagination>
                <a href="javascript:void(0)" class="export_excle" @click="exportTableData">导出excel</a>
            </div>
        </div>
        <el-dialog
            title="确认订单"
            :visible.sync="dialogVisible"
            size="tiny"
            :before-close="handleClose">
            <div class="flex2">
                是否确认此次操作的<span>58</span>件商品？
            </div>
            <span slot="footer" class="dialog-footer flex2">
                <a href="javascript:void(0)" class="buttonColor" @click="confirm">确 定</a>
                <a href="javascript:void(0)" class="buttonColor2" @click="dialogVisible = false">取 消</a>
              </span>
        </el-dialog>
    </div>
</template>
<script>
    import headTop from '../components/headTop'
    import {signOrder,queryOrderInfo,querySalesOrderDetail,confirmSalesReturnInfo,confirmWholeReturnOrder} from '@/api/getData'
    import {formatDate} from '../utils/date.js'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                currentPage:4,
                pageSize:10,
                totalCount:0,
                tableData:[{}],
                input:'',
                dialogVisible:false,
            }
        },
        mounted(){

        },
        methods: {
        	getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            confirm(){
                this.dialogVisible = false;
                this.$router.push('/indentManagementReturnDetails2');

            }
        }
    }
</script>
<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/purchasingManagement';
    @import "../style/indentManagement";
</style>
