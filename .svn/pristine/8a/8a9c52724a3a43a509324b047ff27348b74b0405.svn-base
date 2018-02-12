<template>
    <div class="fillcontain">
        <ul class="menu">
            <li class="menuIndex3" v-if="getMenuAuthFun('bindWebstoreForPlatform')">
                <router-link :to='{path:"/bindWebstoreForPlatform"}'>绑定店铺管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('webStoreOrderForPlatform')">
                <router-link :to='{path:"/webStoreOrderForPlatform"}'>网店订单</router-link>
            </li>
            <li v-if="getMenuAuthFun('orderForPlatform')">
                <router-link :to='{path:"/orderForPlatform"}'>采购订单</router-link>
            </li>
            <li v-if="getMenuAuthFun('productManagement')">
                <router-link :to='{path:"/productManagement"}'>商品管理</router-link>
            </li>
             <li v-if="getMenuAuthFun('reportquery')">
                <router-link :to='{path:"/reportquery"}'>报表查询</router-link>
            </li>
        </ul>
        <div class="orderMenu">
            <div class="block left">
                <el-date-picker
                    size="small"
                    v-model="searchValidStartDate"
                    type="date"
                    placeholder="选择授权开始日期"
                    @change="initParamsData">
                </el-date-picker>
            </div>
            <div class="block left" style="padding-top: 5px;">
                &nbsp;-&nbsp;
            </div>
            <div class="block left">
                <el-date-picker
                    size="small"
                    v-model="searchOrderEndDate"
                    type="date"
                    placeholder="选择授权结束日期"
                    @change="initParamsData">
                </el-date-picker>
                <el-select v-model="searchValidStatus" @change="initParamsData" placeholder="选择授权状态" class="dropdown-menu" size="small">
                    <el-option label="全部" value="null"></el-option>
                    <el-option label="已授权" value="1"></el-option>
                    <el-option label="未授权" value="0"></el-option>
                </el-select>
                <el-input
                    style="width: 200px;"
                    size="small"
                    class="topInput dropdown-menu"
                    placeholder="店铺过滤"
                    icon="search"
                    v-model="searchWebStoreName"
                    :on-icon-click="initParamsData">
                </el-input>
                <el-input
                    size="small"
                    style="width: 200px;"
                    class="topInput dropdown-menu"
                    placeholder="公司过滤"
                    icon="search"
                    v-model="searchCompanyName"
                    :on-icon-click="initParamsData">
                </el-input>
            </div>
        </div>
        <div class="addShop" style="margin-top: 0;">
            <div class="shopList" style="padding-bottom: 80px;">
                <el-table
                    ref="multipleTable"
                    :data="tableData3"
                    tooltip-effect="dark"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="companyName"
                        label="公司名称"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="platform"
                        label="平台"
                        width="120"
                        :formatter="storeSysTypeFormat">
                    </el-table-column>
                    <el-table-column label="店铺">
                        <template scope="scope">
                            <div class="flex2">
                                <img class="headImg" src="../image/head11.jpg" alt="">
                                <span>{{tableData[scope.$index].name}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="state"
                        label="状态"
                        :formatter="statusFormat">
                    </el-table-column>
                    <el-table-column
                        label="授权开始时间"
                        prop="validStartTime"
                        show-overflow-tooltip
                        :formatter="mydateFormat">
                    </el-table-column>
                    <el-table-column
                        label="授权过期时间"
                        prop="validEndTime"
                        show-overflow-tooltip
                        :formatter="mydateFormat">
                    </el-table-column>
                    <el-table-column
                        prop="number"
                        label="同步订单"
                        show-overflow-tooltip>
                        <template scope="scope">
                            <div class="trefresh flex2" @click="clickRotate(scope.$index)" v-bind:class="{'xz':scope.row.member,'xz-2':!scope.row.member}">
                                <img class="xz" src="../image/trefresh.png" alt="">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="money"
                        label="操作"
                        show-overflow-tooltip>
                        <template scope="scope">
                            <el-button
                                size="small"
                                type="danger"
                                @click.native.prevent="deleteRow(tableData3[scope.$index].id)">删除</el-button>
                        </template>
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
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getBindWebStoreUrl,findWebStoreRecord,deleteWebStoreRecord,batchDeleteWebStoreRecord,queryPurchaserInfo,findCompanysByName} from '@/api/getData'
    import {userInfo} from  '../config/mUtils'
    import {mydateFormat} from '../utils/dataFormater.js'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'

    export default {
        components: {
            headTop,
        },
        computed: {
            classObject: function () {
                return {
                    active: this.isActive && !this.error,
                    'text-danger': this.error && this.error.type === 'fatal',
                }
            }
        },
        data() {
            return {
                rotate:false,
                bindWebStoreUrl:'www.bai',
                tableData3: [],
                //默认每页数据量
                pagesize: 8,

                //默认高亮行数据id
                highlightId: -1,

                //当前页码
                currentPage: 1,

                //查询的页码
                start: 1,

                //默认数据总数
                totalCount: 0,

                searchValidStartDate:'',
				searchValidEndDate:'',
				searchValidStatus:'',
				searchWebStoreName:'',
				searchCompanyName:''
            }
        },
        async mounted(){
        	let companyId = userInfo().companyId;
        	if(!companyId){
        		this.$message({
                    type: 'error',
                    message: "请先选择公司"
                });
        	}
            this.initloadUrl();
            this.initParamsData();
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

            //从服务器获取数据
            async initloadUrl() {
            	let param ={
            		companyId:userInfo().companyId
            	}
                const res = await getBindWebStoreUrl(param);
                if (res.isSuccess == true) {
                    this.bindWebStoreUrl = res.result.url;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            //从服务器获取数据
            async initParamsData(){
            	let searchCompanyIds = [];
            	if(this.searchCompanyName != ''){
            		const res1 = await findCompanysByName({companyName:this.searchCompanyName});
            		if (res1.isSuccess == true) {
            			for(let i=0;i<res1.result.result.length;i++){
            				let data1 = res1.result.result[i];
            				if(data1.id){
            					searchCompanyIds.push(searchCompanyIds);
            				}
            			}
            			this.initloadData(searchCompanyIds);
            		}else{
            			this.initloadData(searchCompanyIds);
            		}
            	}else{
            		this.initloadData(searchCompanyIds);
            	}

            },

            //从服务器获取数据
            async initParamsData2(){
            	let searchCompanyIds = [];
            	if(this.searchCompanyName != ''){
            		const res1 = await findCompanysByName({companyName:this.searchCompanyName});
            		if (res1.isSuccess == true) {
            			for(let i=0;i<res1.result.result.length;i++){
            				let data1 = res1.result.result[i];
            				if(data1.id){
            					searchCompanyIds.push(searchCompanyIds);
            				}
            			}
            			this.initloadData2(searchCompanyIds);
            		}else{
            			this.initloadData2(searchCompanyIds);
            		}
            	}else{
            		this.initloadData2(searchCompanyIds);
            	}

            },
            async initloadData(searchCompanyIds) {
            	let param ={
            		pageIndex:1,
            		pageSize:this.pagesize,
            		searchValidStartDate:this.searchValidStartDate,
            		searchValidEndDate:this.searchValidEndDate,
            		searchValidStatus:this.searchValidStatus,
            		searchWebStoreName:this.searchWebStoreName,
            		searchCompanyIds:this.searchCompanyIds
            	}
            	this.tableData3 = [];
                const res = await findWebStoreRecord(param);
                if (res.isSuccess == true) {
                    this.tableData3 = res.result.data.results;
                    this.totalCount = res.result.data.totalCount;
                    this.checkCompany();
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            async checkCompany(){
            	let companyIds = [];
                for(let i=0;i<this.tableData3.length;i++){
                	if(this.tableData3[i].companyId){
                		companyIds.push(this.tableData3[i].companyId);
                	}
                }
                if(companyIds.length>0){
                	let params = {
                		compIds : companyIds
                	}
                	const res = await queryPurchaserInfo(params);
                	if (res.isSuccess == true) {
                		for(let i=0;i<this.tableData3.length;i++){
                			let data1 = this.tableData3[i];
                			for(let j=0;j<res.result.result.length;j++){
                				let data2 = res.result.result[j];
                				if(data2.id == data1.companyId){
                					data1.companyName = data2.name;
                				}
                			}
	                    }
                	}else{
	                    this.$message({
	                        type: 'error',
	                        message: res.errorMsg
	                    });
	                }
                }
            //    alert(this.tableData3[0].companyName);
            },
            async initloadData2(searchCompanyIds) {
            	let param ={
            		pageIndex:this.currentPage,
            		pageSize:this.pagesize,
            		companyId:userInfo().companyId
            	}
                const res = await findWebStoreRecord(param);
                if (res.isSuccess == true) {
                    this.tableData3 = res.result.data.results;
                    this.checkCompany();

                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            async deleteRow(id) {
            	let param ={
            		id:id
            	}
            	const res = await deleteWebStoreRecord(param);
            	if (res.isSuccess == true) {
                    this.initloadData();
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            gotobindwebstore(){
            	window.open(this.bindWebStoreUrl);
            },
            //多选响应
            handleSelectionChange: function(val) {
                this.multipleSelection = val;
            },
            async batchDelete(){
				if(this.multipleSelection.length==0)
                    return;
                var array = [];
                this.multipleSelection.forEach((item) => {
                    array.push(item.id);
                })
                let param = {
                	ids:array
                }
                const res = await batchDeleteWebStoreRecord(param);
            	if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: res.result.msg
                    });
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
                this.initloadData();
            },
            storeSysTypeFormat:function(row, column) {
                let data = row.storeSysType;
                if (data == undefined||data=='') {
                    return "";
                }
                if(data =="TaoBao" ){
                    return '淘宝';
                }else if(data == "JingDong"){
                    return '京东';
                }else{
                	return '';
                }
            },
            statusFormat:function(row, column) {
                let data = row.status;
                if (data == undefined||data=='') {
                    return "";
                }
                if(data =="2" ){
                    return '未授权';
                }else if(data == "1"){
                    return '已授权';
                }else{
                	return '';
                }
            },
            handleCurrentChange:function(val) {
                this.currentPage = val;
                this.initParamsData2();
            },
            mydateFormat,
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/addShop';
</style>
