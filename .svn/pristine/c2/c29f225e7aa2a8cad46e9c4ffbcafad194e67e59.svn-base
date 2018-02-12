<template>
    <div class="fillcontain">
        <ul class="menu">
            <li v-if="getMenuAuthFun('stallManage')">
                <router-link :to='{path:"/stallManage"}'>档口管理</router-link>
            </li>
            <li class="menuIndex2" v-if="getMenuAuthFun('stallSettlement')">
                <router-link :to='{path:"/stallSettlement"}'>档口结算</router-link>
            </li>
            <li v-if="getMenuAuthFun('SettlementRecords')">
                <router-link :to='{path:"/SettlementRecords"}'>结算单</router-link>
            </li>
        </ul>
        <div class="sellerSettlement">
            <div class="sellerTop">
                <el-select
                    v-model="otherSideCompanyName"
                    clearable
                    filterable
                    remote
                    reserve-keyword
                    placeholder="请输入档口名称"
                    :remote-method="remoteMethod"
                    :loading="loading"
                    @change="handleIconClick">
                    <el-option
                        v-for="item in options4"
                        :key="item.stallCompanyId"
                        :label="item.name"
                        :value="item.stallCompanyId">
                    </el-option>
                </el-select>
                <el-select v-model="value" placeholder="结算方式" @change="handleIconClick">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="sellerTable">
                <el-table
                    :data="tableData3">
                    <el-table-column
                        prop="otherSideCompanyName"
                        label="档口名称"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        label="结算日期">
                        <template scope="scope">
                            <div class="flex">
                                <p v-if="scope.row.settlementDay" v-bind:class="[scope.row.settlementDay.settlementType ==1?'style1':scope.row.settlementDay.settlementType==2?'style2':'']">{{scope.row.settlementDay.settlementType == 1?'周结':scope.row.settlementDay.settlementType == 2?'月结':''}}</p>
                                <p v-if="scope.row.settlementDay">{{scope.row.settlementDay.settlementType==1&&scope.row.settlementDay.settlementDay==1?'周一':scope.row.settlementDay.settlementType==1&&scope.row.settlementDay.settlementDay==2?'周二':scope.row.settlementDay.settlementType==1&&scope.row.settlementDay.settlementDay==3?'周三':scope.row.settlementDay.settlementType==1&&scope.row.settlementDay.settlementDay==4?'周四':scope.row.settlementDay.settlementType==1&&scope.row.settlementDay.settlementDay==5?'周五':scope.row.settlementDay.settlementType==1&&scope.row.settlementDay.settlementDay==6?'周六':scope.row.settlementDay.settlementType==1&&scope.row.settlementDay.settlementDay==7?'周日':scope.row.settlementDay.settlementDay + '号'}}</p>
                                <p v-else="scope.row.settlementDay">未设置</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="unClosedFee"
                        label="订单总欠款">
                        <template scope="scope">{{scope.row.unClosedFee.toFixed(2)}}</template>
                    </el-table-column>
                    <el-table-column
                        prop="toReviceFee"
                        label="到期订单欠款">
                        <template scope="scope">{{scope.row.toReviceFee.toFixed(2)}}</template>
                    </el-table-column>
                    <el-table-column
                        prop="ordersNum"
                        label="未结订单总数">
                    </el-table-column>
                    <el-table-column
                        width="280"
                        label="操作">
                        <template scope="scope">
                            <div class="flex stallOperation">
                                <router-link :to='{path:"/stallSettlementDetails",query:{backPath:"/stallSettlement?type=1"+"&otherSideCompanyName=" + scope.row.otherSideCompanyName + "&otherSideCompanyId="+ scope.row.otherSideCompanyId +"&unClosedFee="+ scope.row.unClosedFee + "&toReviceFee="+ (Number(scope.row.toReviceFee) - Number(scope.row.backFeeDue)),type:1,otherSideCompanyName:scope.row.otherSideCompanyName,otherSideCompanyId:scope.row.otherSideCompanyId,unClosedFee:scope.row.unClosedFee,toReviceFee:(Number(scope.row.toReviceFee) - Number(scope.row.backFeeDue))}}'>查看详情</router-link>
                                <el-button type="text" class="red" style="margin-right: 10px;" @click="saleReturnClick(scope.row.otherSideCompanyName,scope.row.otherSideCompanyId,scope.row.backFee,scope.row.backFeeDue)">退货结算</el-button>
                                <router-link :to='{path:"/stallSettlementImmediately",query:{backPath:"/stallSettlement",otherSideCompanyName:scope.row.otherSideCompanyName,saleCompanyId:scope.row.otherSideCompanyId,type:22,unClosedFee:scope.row.unClosedFee}}'>立即付款</router-link>
                                <router-link :to='{path:"/stallSettlementRecord",query:{otherSideCompanyName:scope.row.otherSideCompanyName,otherSideCompanyId:scope.row.otherSideCompanyId,unClosedFee:scope.row.unClosedFee,toReviceFee:scope.row.toReviceFee}}'>结算记录</router-link>
                            </div>
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
                :page-sizes="[10, 20, 30, 40,50]"
                :page-size="pageSize"
                layout="total,sizes, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
            <a href="javascript:void(0)" class="export_excle1" @click="exportTableData">导出excel</a>
            <div style="height:160px;">
                &nbsp;
            </div>
        </div>
    </div>
</template>

<script>
    import {loadDebtsBusiness,queryVmStall} from '@/api/getData'
    import {userInfo} from '../config/mUtils.js'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'

    export default {
        data() {
            return {
                input:'',
                options: [{
                    value: '1',
                    label: '周结'
                }, {
                    value: '2',
                    label: '月结'
                }],
                value: '',
                tableData3:[],
                currentPage:1,
                pageSize:10,
                totalCount:0,
                otherSideCompanyId:'',
                options4:[],
                loading:false,
                otherSideCompanyName:'',
                str:''

            }
        },
        watch:{
            '$route': function (route) {
                let param = {
                    "companyId":userInfo().companyId,
                    "pageIndex":this.currentPage,
                    "pageSize":this.pageSize,
                    "orderType":1
                };
                this.loadStallOrder(param);
            }
        },
        mounted(){
            let param = {
                "companyId":userInfo().companyId,
                "pageIndex":this.currentPage,
                "pageSize":this.pageSize,
                "orderType":1
            };
            this.loadStallOrder(param);
        },
        methods: {
        	getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
            },
            //加载欠款商家列表
            async loadStallOrder(param){
                const  res = await loadDebtsBusiness(param);
                if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message:'数据加载成功!'
                    });
                    this.tableData3 = res.result.results;
                    this.totalCount = res.result.totalCount;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },

            checkNull(val){
                if(val!=undefined&&val!=''){
                    return true;
                }
                return false;
            },

            //组合搜索
            handleIconClick(){
                this.str = '';
                var list = [];
                if(this.checkNull(this.otherSideCompanyName)){
                    var id = {name:"otherCompanyId",value:this.otherSideCompanyName};
                    list.push(id);
                }
                if(this.checkNull(this.value)){
                    var sType = {name:"settlementType",value:this.value};
                    list.push(sType);
                }

                this.str = '{';
                list.forEach((obj)=>{
                    this.str = this.str + '"' + obj.name + '":"' + obj.value + '",'
                });
                this.str = this.str + '"pageIndex":"' + this.currentPage + '",' + '"pageSize":"' + this.pageSize + '",' + '"orderType":' + 1 +',' + '"companyId":"' + userInfo().companyId + '"}';
                var param = JSON.parse(this.str);
                this.loadStallOrder(param);
            },

            handleSizeChange(val){
                this.pageSize = val;
                this.handleIconClick();
            },

            handleCurrentChange(val) {
                this.currentPage = val;
                this.handleIconClick();
            },


            //远程搜索模糊查询档口名称
            async remoteMethod(query){
                if(query!=''){
                    this.loading = true;
                    let param = {
                        "companyId":userInfo().companyId,
                        "stallName":query,
                        "pageIndex":1,
                        "pageSize":100
                    };
                    const res = await queryVmStall(param);
                    setTimeout(() => {
                        this.loading = false;
                        this.options4 = res.result.results;
                    }, 200);
                } else {
                    this.options4 = [];
                }

            },

            //退货结算
            saleReturnClick(otherSideCompanyName,otherSideCompanyId,backFee,backFeeDue){
                if(backFeeDue==undefined){
                    backFeeDue = 0;
                }
                if(backFee!=undefined&&backFee!=''&&backFee!=0){
                    this.$router.push({path:"/stallSettlementDetails",query:{backPath:"/stallSettlement",type:3,otherSideCompanyName:otherSideCompanyName,otherSideCompanyId:otherSideCompanyId,unClosedFee:backFee,toReviceFee:backFeeDue}});
                }else{
                    this.$message({
                        type:'error',
                        message:'当前无退货订单'
                    });
                }
            },


            exportTableData(){

            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/sellerSettlement';
</style>
