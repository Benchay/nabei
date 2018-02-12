<template>
    <div class="fillcontain">
        <ul class="menu">
            <div v-for="(authitem,index) in authMenu">
                <li :class='authitem.css'>
                    <router-link :to='authitem.method'>{{authitem.name}}</router-link>
                </li>
            </div>
            <!--
            <li v-if="getMenuAuthFun('sellerCarConfig')">
                <router-link :to='{path:"/sellerCarConfig"}'>车辆配置</router-link>
            </li>
            <li class="menuIndex2" v-if="getMenuAuthFun('transportDetail')">
                <router-link :to='{path:"/transportDetail"}'>运输明细</router-link>
            </li>-->
        </ul>
       <div class="siteConfig">
       		<div class="siteTop" style="float: left;">
       			<span>包裹详情</span>
           </div>
           <div class="siteTop" style="float: right;">
           		<router-link :to='{path:"/transportDetail"}'>返回</router-link>
           </div>
           <div class="siteTable">
               <el-table
                   :data="tableData"
                   style="width: 100%"
                   max-height="500">
                   <el-table-column
                       prop="packageCode"
                       label="包裹编号"
                       width="160">
                   </el-table-column>
                   <el-table-column
                       prop="takeUsrName"
                       label="拿货人"
                       width="90">
                   </el-table-column>
                   <el-table-column
                       prop="takeTime"
                       label="拿货时间"
                       width="100"
                       :formatter="mydateFormat2">
                   </el-table-column>
                   <el-table-column
                       prop="companyName"
                       width="130"
                       label="档口">
                   </el-table-column>
                   <el-table-column
                       prop="takeNum"
                       width="80"
                       label="拿货数">
                   </el-table-column>
                   <el-table-column
                       prop="incarUsrName"
                       width="100"
                       label="装车人">
                   </el-table-column>
                   <el-table-column
                       prop="inCarTime"
                       label="装车时间"
                       width="100"
                       :formatter="mydateFormat2">
                   </el-table-column>
                   <el-table-column
                       prop="outcarUsrName"
                       width="100"
                       label="卸车人">
                   </el-table-column>
                   <el-table-column
                       prop="outCarTime"
                       label="卸车时间"
                       width="100"
                       :formatter="mydateFormat2">
                   </el-table-column>
                   <el-table-column
                       prop="stockUsrName"
                       width="100"
                       label="入库人">
                   </el-table-column>
                   <el-table-column
                       prop="stockInTime"
                       label="入库时间"
                       width="100"
                       :formatter="mydateFormat2">
                   </el-table-column>
                   <el-table-column
                       prop="inStockNum"
                       width="120"
                       label="入库数">
                   </el-table-column>
               </el-table>
               <el-pagination
                   small
                   class="right"
                   style="margin-top: 20px;"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[10, 20, 30, 40,50]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="totalCount">
               </el-pagination>
           </div>
       </div>
    </div>
</template>

<script>
    import {queryPackage} from '@/api/getData'
    import {mapActions, mapState} from 'vuex'
    import {formatDate} from '../utils/date.js'
    import {mydateFormat,mydateFormat2} from '../utils/dataFormater.js'
    import {getMenuAuth,haveMenuAuth,getSubMenuByMothod} from  '../utils/AuthMenu.js'
    import { regionData ,CodeToText,TextToCode} from 'element-china-area-data'
    import {userInfo} from '../config/mUtils.js'

    export default {
        components: {
        },
        data() {
            return {
                tableData:[],

                transportDetailId:'',

                currentPage:1,
                pageSize:10,
                totalCount:0,
                authMenu:[],
                routerPath:'transportDetail',
            }
        },
        watch:{
            '$route':function (route) {
            	this.tableData = [];
                this.routerPath=route.path;
            	if(this.$route.query.transportDetailId){
            		this.transportDetailId = this.$route.query.transportDetailId;
                	this.initloadData();
            	}
            }
        },
        mounted(){
            this.authMenu=getSubMenuByMothod('munu_mj_008',new Array("drawingOut"),this.routerPath);
        	this.transportDetailId = this.$route.query.transportDetailId;
        	this.initloadData();
        },
        methods:{
            getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
            },

            handleSizeChange(val){
                this.pageSize = val;
                this.currentPage = 1;
                this.initloadData();
            },

            handleCurrentChange(val){
                this.currentPage = val;
                this.initloadData();
            },


			//从服务器获取数据
            async initloadData() {
            	this.tableData = [];
            	if(this.transportDetailId == '' || this.transportDetailId == undefined){return;}
            	let param ={
            		ownerCompanyId:userInfo().companyId,
            		transportDetailId:this.transportDetailId,
            		pageIndex:this.currentPage,
            		pageSize:this.pageSize
            	}
                const res = await queryPackage(param);
                if (res.isSuccess == true) {
                	this.tableData = res.result.results;
                	this.totalCount =  res.result.totalCount;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            mydateFormat,

            mydateFormat2,

        },
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/siteConfig';
</style>
