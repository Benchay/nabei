<template>
    <div class="fillcontain">
        <ul class="menu">
            <li v-if="getMenuAuthFun('verifyManage')">
                <router-link :to='{path:"/verifyManage"}'>审核管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('rechangeConfig')">
                <router-link :to='{path:"/rechangeConfig"}'>财务账户配置</router-link>
            </li>
            <li class="menuIndex3" v-if="getMenuAuthFun('financeSerial')">
                <router-link :to='{path:"/financeSerial"}'>财务流水</router-link>
            </li>
            <li v-if="getMenuAuthFun('walletInit')">
                <router-link :to='{path:"/walletInit"}'>钱包初始化</router-link>
            </li>
            <!--<li>-->
            <!--<router-link :to='{path:"/setmealConfig"}'>套餐配置</router-link>-->
            <!--</li>-->
        </ul>

        <div class="verify-menu-search">
            <div class="block left">
                <el-date-picker
                    size="small"
                    v-model="startDate"
                    type="date"
                    placeholder="选择开始日期"
                    :picker-options="startDateBefore"
                    format="yyyy-MM-dd"
					value-format="yyyy-MM-dd"
                    @change="initloadData">
                </el-date-picker>
            </div>
            <div class="block left" style="padding-top: 5px;">
              &nbsp;-&nbsp;
            </div>
            <div class="block left">
                <el-date-picker
                    size="small"
                    v-model="endDate"
                    type="date"
                    placeholder="选择结束日期"
                    :picker-options="startDateAfter"
                    format="yyyy-MM-dd"
					value-format="yyyy-MM-dd"
                    @change="initloadData">
                </el-date-picker>
                <el-select v-model="verifyType" @change="initloadData" placeholder="选择审核状态" class="staff-status" size="small">
                	<el-option label="全部" value="null"></el-option>
                    <el-option label="待审核" value="1"></el-option>
                    <el-option label="审核成功" value="3"></el-option>
                    <el-option label="审核失败" value="4"></el-option>
                </el-select>
                <el-select v-model="tradeType" @change="initloadData" placeholder="交易类型过滤" class="staff-status" size="small">
                	<el-option label="全部" value="null"></el-option>
                    <el-option label="转账" value="3"></el-option>
                    <el-option label="充值" value="1"></el-option>
                    <el-option label="提现" value="2"></el-option>
                    <el-option label="管理员操作" value="4"></el-option>
                </el-select>
                <el-input style="width: 180px;"
                          size="small"
                      placeholder="客户名过滤"
                      icon="search"
                      v-model="companyName"
                      :on-icon-click="initloadData">
                  </el-input>

            </div>
        </div>

        <div class="financeSerial" v-show="tableData3.length>0">

            <div class="shopList">
                <el-table
                    ref="multipleTable"
                    :data="tableData3"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        label="编号"
                        width="80">
                        <template scope="scope">
                        	<div class="flex2" v-show="tableData3[scope.$index].id.length<8">
                                <a>{{tableData3[scope.$index].id}}</a>
                            </div>
                            <div class="flex2" v-show="tableData3[scope.$index].id.length>=8">
                                <el-tooltip placement="top">
								  <div slot="content">{{tableData3[scope.$index].id}}</div>
								  <a>{{tableData3[scope.$index].id.substring(0,8)}}...</a>
								</el-tooltip>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="companyName"
                        label="客户名称"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="recordType"
                        label="交易类型"
                        width="100"
                        :formatter="formatRecordType">
                    </el-table-column>
                    <el-table-column
                        prop="changeFee"
                        label="金额变化"
                        width="80"
                        :formatter="formatMoney">
                    </el-table-column>
                    <el-table-column
                        prop="freezed"
                        label="冻结金额"
                        width="80"
                        :formatter="formatFrozenMoney">
                    </el-table-column>
                    <el-table-column
                        prop="changeFee"
                        label="金币变化"
                        width="80"
                        :formatter="formatBean">
                    </el-table-column>
                    <el-table-column
                        prop="freezed"
                        label="冻结金币"
                        width="80"
                        :formatter="formatFrozenBean">
                    </el-table-column>
                    <el-table-column
                        prop="verifyState"
                        label="审核状态"
                        :formatter="formatVerifyState">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="创建时间"
                        :formatter="mydateFormat">
                    </el-table-column>
                    <el-table-column
                        prop="operate"
                        label="操作"
                        show-overflow-tooltip>
                        <template scope="scope">
                            <a href="javascript:void(0);" class="blue" @click="showDialogDetail(tableData3[scope.$index])">查看详情</a>
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
            <a href="javascript:void(0)" class="export_excle" @click="exportExcel">导出excel</a>
        </div>

        <el-dialog title="审核详情" :visible.sync="verifyDialogDetail">
            <el-form :model="verifyDetailform" ref="verifyDetailform">
            	<el-row :gutter="20">
            		<el-col :span="20">
            			<div class="grid-content bg-purple">
		                    <el-form-item label="编号：" :label-width="formLabelWidth">
			                    <p auto-complete="off">{{verifyDetailform.id}}</p>
			                </el-form-item>
            			</div>
            		</el-col>
            	</el-row>
            	<el-row :gutter="20">
            		<el-col :span="10">
            			<div class="grid-content bg-purple">
		                    <el-form-item label="客户名称：" :label-width="formLabelWidth">
			                    <p auto-complete="off">{{verifyDetailform.companyName}}</p>
			                </el-form-item>
            			</div>
            		</el-col>
            		<el-col :span="10">
            			<div class="grid-content bg-purple">
            				<el-form-item label="交易类型：" :label-width="formLabelWidth">
			                    <p auto-complete="off">{{verifyDetailform.recordType}}</p>
			               </el-form-item>
            			</div>
            		</el-col>
            	</el-row>

            	<el-row :gutter="20">
            		<el-col :span="10">
            			<div class="grid-content bg-purple">
		                    <el-form-item label="金额变动：" :label-width="formLabelWidth">
			                    <p auto-complete="off">{{verifyDetailform.money}}</p>
			                </el-form-item>
            			</div>
            		</el-col>
            		<el-col :span="10">
            			<div class="grid-content bg-purple">
		                    <el-form-item label="冻结金额变动：" :label-width="formLabelWidth">
			                    <p auto-complete="off">{{verifyDetailform.frozenMoney}}</p>
			                </el-form-item>
            			</div>
            		</el-col>
            	</el-row>
            	<el-row :gutter="20">
            		<el-col :span="10">
            			<div class="grid-content bg-purple">
		                    <el-form-item label="金币变动：" :label-width="formLabelWidth">
			                    <p auto-complete="off">{{verifyDetailform.bean}}</p>
			                </el-form-item>
            			</div>
            		</el-col>
            		<el-col :span="10">
            			<div class="grid-content bg-purple">
		                    <el-form-item label="冻结金币变动：" :label-width="formLabelWidth">
			                    <p auto-complete="off">{{verifyDetailform.frozenBean}}</p>
			                </el-form-item>
            			</div>
            		</el-col>
            	</el-row>

            	<el-row :gutter="20">
            		<el-col :span="10">
            			<div class="grid-content bg-purple">
		                    <el-form-item label="流水号：" :label-width="formLabelWidth">
			                    <p auto-complete="off">{{verifyDetailform.flowNo}}</p>
			                </el-form-item>
            			</div>
            		</el-col>
            		<el-col :span="10">
            			<div class="grid-content bg-purple">
		                    <el-form-item label="审核状态：" :label-width="formLabelWidth">
			                    <p auto-complete="off">{{verifyDetailform.verifyState}}</p>
			                </el-form-item>
            			</div>
            		</el-col>
            	</el-row>

                <el-row :gutter="20">
            		<el-col :span="10">
            			<div class="grid-content bg-purple">
		                    <el-form-item label="财务账户类型：" :label-width="formLabelWidth">
			                    <p auto-complete="off">{{verifyDetailform.accountType}}</p>
			                </el-form-item>
            			</div>
            		</el-col>
            		<el-col :span="10">
            			<div class="grid-content bg-purple">
		                    <el-form-item label="财务账户：" :label-width="formLabelWidth">
			                    <p auto-complete="off">{{verifyDetailform.financeAccountId}}</p>
			                </el-form-item>
            			</div>
            		</el-col>
            	</el-row>

            	<el-row :gutter="20">
            		<el-col :span="10">
            			<div class="grid-content bg-purple">
		                    <el-form-item label="交易时间：" :label-width="formLabelWidth">
			                    <p auto-complete="off">{{verifyDetailform.createTime}}</p>
			                </el-form-item>
            			</div>
            		</el-col>
            		<el-col :span="10">
            			<div class="grid-content bg-purple">
		                    <el-form-item label="审核人：" :label-width="formLabelWidth">
			                    <p auto-complete="off"></p>
			                </el-form-item>
            			</div>
            		</el-col>
            	</el-row>

            	<el-row :gutter="20">
            		<el-col :span="10">
            			<div class="grid-content bg-purple">
		                    <el-form-item label="审核时间：" :label-width="formLabelWidth">
			                    <p auto-complete="off">{{verifyDetailform.updateTime}}</p>
			                </el-form-item>
            			</div>
            		</el-col>
            	</el-row>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {queryRangeConditionForCustomer,exportRangeConditionForCustomer} from '@/api/getData'
    import {formatDate} from '../utils/date.js'
    import {mydateFormat} from '../utils/dataFormater.js'
    import {export_json_to_excel} from '../vendor/Export2Excel.js'
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
                activeIndex: '1',
                verifyType:'',
                tradeType:'',
                rotate:false,
                companyName:'',
                verifyDialogDetail:false,
                tableData3: [],

                //默认每页数据量
                pagesize: 10,

                //默认高亮行数据id
                highlightId: -1,

                //当前页码
                currentPage: 1,

                //查询的页码
                start: 1,

                //默认数据总数
                totalCount: 0,
                startDate:'',
                endDate: '',

                verifyDetailform: {
                    companyName: '',
                    recordType: '',
                    changeFee:'',
                    verifyState:'',
                    flowNo:'',
                    accType: '',
                    financeAccountId: '',
                    createTime:'',
                    updateTime:'',
                    freezed:''
                },
                tableDataExport:[],
                
                startDateBefore:{
                    disabledDate: (time) => {
                        let beginDateVal = this.endDate;
                        if (beginDateVal) {
                            return time.getTime() > beginDateVal;
                        }
                    }
                },
                startDateAfter:{
                    disabledDate: (time) => {
                        let beginDateVal = this.startDate;
                        if (beginDateVal) {
                            return time.getTime() < beginDateVal;
                        }
                    }
                },
            }
        },
        mounted(){
            this.initloadData();
            const s = document.createElement('script');
			s.type = 'text/javascript';
			s.src = 'http://oss.sheetjs.com/js-xlsx/xlsx.full.min.js';
			document.body.appendChild(s);
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
            async initloadData() {
            	this.tableData3 = [];
            	let q_startDate = '';
            	let q_endDate = '';
            	if(this.startDate != ''){
            		q_startDate = formatDate(new Date(this.startDate),'yyyy-MM-dd')
            	}
            	if(this.endDate != ''){
            		q_endDate = formatDate(new Date(this.endDate),'yyyy-MM-dd')
            	}
                let param ={
                    "pageSize":this.pagesize,
                    "pageIndex":1,
                    "start":q_startDate,
                    "end":q_endDate,
                    "accountType":this.accountType,
                    "verifyState":this.verifyType,
                    "tradeType":this.tradeType,
                    "flowNo":this.flowNo,
                    "companyName":this.companyName
                }
                const res = await queryRangeConditionForCustomer(param);
                if (res.isSuccess == true) {
                    this.tableData3 = res.result.results;
                    this.totalCount = res.result.totalCount;
                    this.changedFee =  res.result.groupData;
                    this.currentPage = res.result.pageNo;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },

             async initloadData2() {
             	let q_startDate = '';
            	let q_endDate = '';
            	if(this.startDate != ''){
            		q_startDate = formatDate(new Date(this.startDate),'yyyy-MM-dd')
            	}
            	if(this.endDate != ''){
            		q_endDate = formatDate(new Date(this.endDate),'yyyy-MM-dd')
            	}
                let param ={
                    "pageSize":this.pagesize,
                    "pageIndex":this.currentPage,
                    "start":q_startDate,
                    "end":q_endDate,
                    "accountType":this.accountType,
                    "verifyState":this.verifyType,
                    "tradeType":this.tradeType,
                    "flowNo":this.flowNo,
                    "companyName":this.companyName
                }
                const res = await queryRangeConditionForCustomer(param);
                if (res.isSuccess == true) {
                    this.tableData3 = res.result.results;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            async initloadexportData() {
            	let q_startDate = '';
            	let q_endDate = '';
            	if(this.startDate != ''){
            		q_startDate = formatDate(new Date(this.startDate),'yyyy-MM-dd')
            	}
            	if(this.endDate != ''){
            		q_endDate = formatDate(new Date(this.endDate),'yyyy-MM-dd')
            	}
                let param ={
                    "pageSize":this.pagesize*this.totalCount,
                    "pageIndex":1,
                    "start":q_startDate,
                    "end":q_endDate,
                    "accountType":this.accountType,
                    "verifyState":this.verifyType,
                    "tradeType":this.tradeType,
                    "flowNo":this.flowNo,
                    "companyName":this.companyName
                }
                const res = await queryRangeConditionForCustomer(param);
                const list = [];
                if (res.isSuccess == true) {
					this.tableDataExport = res.result.results;
					for(let i=0;i<this.tableDataExport.length;i++){
						let data1 = this.tableDataExport[i];
						let companyName = '';
						let tradeType = '';
						let moneyChange = 0;
						let frozenMoneyChange = 0;
						let beanChange = 0;
						let frozenBeanChange = 0;
						let verifyType = '';
						let flowNum = '';
						let tradeTime = '';
						let checkUserName = '';
						let accountType = '';
						let account = '';
						let checkTime = '';

						if(data1.companyName){
							companyName = data1.companyName;
						}
						if(data1.recordType && data1.recordType == "1"){
							tradeType = '充值';
						}else if(data1.recordType && data1.recordType == "2"){
							tradeType = '提现';
						}else if(data1.recordType && data1.recordType == "3"){
							tradeType = '转账';
						}else if(data1.recordType && data1.recordType == "4"){
							tradeType = '管理员操作';
						}

						if(data1.accountType && data1.accountType == "1" && data1.changeFee){
							moneyChange = data1.changeFee;
						}
						if(data1.accountType && data1.accountType == "1" && data1.freezed){
							frozenMoneyChange = data1.freezed;
						}
						if(data1.accountType && data1.accountType == "2" && data1.changeFee){
							beanChange = data1.changeFee;
						}
						if(data1.accountType && data1.accountType == "2" && data1.freezed){
							frozenBeanChange = data1.freezed;
						}

						if(data1.verifyState && data1.verifyState == "1"){
		            		verifyType = "待审核";
		            	}else if(data1.verifyState && data1.verifyState == "2"){
		            		verifyType = "审核中";
		            	}else if(data1.verifyState && data1.verifyState == "3"){
		            		verifyType = "审核成功";
		            	}else if(data1.verifyState && data1.verifyState == "4"){
		            		verifyType = "审核失败";
		            	}else if(data1.verifyState && data1.verifyState == "5"){
		            		verifyType = "状态未知，异常";
		            	}

		            	if(data1.flowNo){
		            		flowNum = data1.flowNo;
		            	}

						if(data1.createTime){
		            		var date2 = new Date(data1.createTime);
		                	tradeTime = formatDate(date2,'yyyy-MM-dd hh:mm');
		            	}
		            	if(data1.updateTime){
		            		var date3 = new Date(data1.updateTime);
		                	checkTime = formatDate(date3,'yyyy-MM-dd hh:mm');
		            	}
		            	if(data1.checkUserName){
		            		checkUserName = data1.checkUserName;
		            	}

		            	if(data1.accountType && data1.accountType == "1"){
		            		accountType = '金额';
		            	}else if(data1.accountType && data1.accountType == "2"){
		            		accountType = '金币';
		            	}else if(data1.accountType && data1.accountType == "3"){
		            		accountType = "支付宝";
		            	}else if(data1.accountType && data1.accountType == "4"){
		            		accountType = "微信";
		            	}else if(data1.accountType && data1.accountType == "5"){
		            		accountType = "银行卡";
		            	}
		            	if(data1.accType && data1.accType == "1"){
		            		account = data1.seller_id;
		            		accountType = "支付宝";
		            	}else if(data1.accType && data1.accType == "2"){
		            		account = data1.mchID;
		            		accountType = "微信";
		            	}else if(data1.accType && data1.accType == "3"){
		            		account = data1.accoutNumber;
		            		accountType = "网银";
		            	}else if(data1.accType && data1.accType == "4"){
		            		account = data1.business;
		            		accountType = "paypal";
		            	}else if(data1.accType && data1.accType == "5"){
		            		account = data1.alibabaAccount;
		            		accountType = "及时到账";
		            	};
		            	let row = {
		            		companyName : companyName,
							tradeType : tradeType,
							moneyChange : moneyChange,
							frozenMoneyChange : frozenMoneyChange,
							beanChange : beanChange,
							frozenBeanChange : frozenBeanChange,
							verifyType : verifyType,
							flowNum : flowNum,
							tradeTime : tradeTime,
							checkUserName : checkUserName,
							accountType : accountType,
							account : account,
							checkTime : checkTime
		            	}
		            	list.push(row);
					}
			　　　　const tHeader = ['客户名称', '交易类型','金额变动','冻结金额变动','金币变动','冻结金币变动','审核状态','流水号','财务账户类型','财务账户','交易时间','审核人','审核时间'];
			　　　　const filterVal = ['companyName', 'tradeType','moneyChange','frozenMoneyChange','beanChange','frozenBeanChange','verifyType','flowNum','accountType','account','tradeTime','checkUserName','checkTime'];
			　　　　const data = this.formatJson(filterVal, list);
			　　　　export_json_to_excel(tHeader, data, '流水审核表');
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },
            clickRotate(index){
                console.log(index);
                this.tableData3[index].member = !this.tableData3[index].member ;
            },
            handleCurrentChange:function(val) {
                this.currentPage = val;
                this.initloadData2();
            },
            formatRecordType:function(row, column){
            	let data = row.recordType;
            	if(data == "1"){
            		return "充值";
            	}else if(data == "2"){
            		return "提现";
            	}else if(data == "3"){
            		return "转账";
            	}else if(data == "4"){
            		return "管理员操作";
            	}else {
            		return "";
            	}
            },
            formatVerifyState:function(row, column){
            	let data = row.verifyState;
            	if(data == "1"){
            		return "待审核";
            	}else if(data == "2"){
            		return "审核中";
            	}else if(data == "3"){
            		return "审核成功";
            	}else if(data == "4"){
            		return "审核失败";
            	}else if(data == "5"){
            		return "状态未知，异常";
            	}else {
            		return "";
            	}
            },
            showDialogDetail(rows){
            	let recordTypeShow = "";
            	let verifyStateShow = "";
            	let accountTypeShow = "";
            	let createTimeShow = "";
            	let updateTimeShow = "";
            	let accountType = rows.accountType;
            	let money = 0;
            	let frozenMoney = 0;
            	let bean = 0;
            	let frozenBean = 0;
            	let accountShow = '';
            	if(rows.createTime){
            		var date2 = new Date(rows.createTime);
                	createTimeShow = formatDate(date2,'yyyy-MM-dd hh:mm');
            	}
            	if(rows.updateTime){
            		var date3 = new Date(rows.updateTime);
                	updateTimeShow = formatDate(date3,'yyyy-MM-dd hh:mm');
            	}
                if(accountType == "1"){
                	if(rows.changeFee){
                		money = rows.changeFee;
                	}
                	if(rows.freezed){
                		frozenMoney = rows.freezed;
                	}
                }else if(accountType == "2"){
                	if(rows.changeFee){
                		bean = rows.changeFee;
                	}
                	if(rows.freezed){
                		frozenBean = rows.freezed;
                	}
                }
            	if(rows.recordType == "1"){
            		recordTypeShow = "充值";
            	}else if(rows.recordType == "2"){
            		recordTypeShow = "提现";
            	}else if(rows.recordType == "3"){
            		recordTypeShow = "转账";
            	}else if(rows.recordType == "4"){
            		recordTypeShow = "管理员操作";
            	}
            	if(rows.verifyState == "1"){
            		verifyStateShow = "待审核";
            	}else if(rows.verifyState == "2"){
            		verifyStateShow = "审核中";
            	}else if(rows.verifyState == "3"){
            		verifyStateShow = "审核成功";
            	}else if(rows.verifyState == "4"){
            		verifyStateShow = "审核失败";
            	}else if(rows.verifyState == "5"){
            		verifyStateShow = "状态未知，异常";
            	};
            	if(rows.accType == "1"){
            		accountShow = rows.seller_id;
            		accountTypeShow = "支付宝";
            	}else if(rows.accType == "2"){
            		accountShow = rows.mchID;
            		accountTypeShow = "微信";
            	}else if(rows.accType == "3"){
            		accountShow = rows.accoutNumber;
            		accountTypeShow = "网银";
            	}else if(rows.accType == "4"){
            		accountShow = rows.business;
            		accountTypeShow = "paypal";
            	}else if(rows.accType == "5"){
            		accountShow = rows.alibabaAccount;
            		accountTypeShow = "及时到账";
            	};
            	this.verifyDetailform = {
            		id:rows.id,
                    companyName: rows.companyName,
                    recordType: recordTypeShow,
                    money:money,
                    frozenMoney:frozenMoney,
                    bean:bean,
                    frozenBean:frozenBean,
                    verifyState:verifyStateShow,
                    flowNo:rows.flowNo,
                    accountType: accountTypeShow,
                    financeAccountId: accountShow,
                    createTime:createTimeShow,
                    updateTime:updateTimeShow
              	};
              	this.verifyDialogDetail = true;

            },
            exportExcel() {
            	this.initloadexportData();
	　　　　},
	　　　　formatJson(filterVal, jsonData) {
	　　　　　　return jsonData.map(v => filterVal.map(j => v[j]))
	　　　　},
            mydateFormat,
            formatMoney:function(row, column){
            	let accountType = row.accountType;
            	if(accountType == "1"){
            		return row.changeFee;
            	}else{
            		return "0";
            	}
            },
            formatFrozenMoney:function(row, column){
            	let accountType = row.accountType;
            	if(accountType == "1"){
            		return row.freezed;
            	}else{
            		return "0";
            	}
            },
            formatBean:function(row, column){
            	let accountType = row.accountType;
            	if(accountType == "2"){
            		return row.changeFee;
            	}else{
            		return "0";
            	}
            },
            formatFrozenBean:function(row, column){
            	let accountType = row.accountType;
            	if(accountType == "2"){
            		return row.freezed;
            	}else{
            		return "0";
            	}
            },
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/financeSerial';
</style>
