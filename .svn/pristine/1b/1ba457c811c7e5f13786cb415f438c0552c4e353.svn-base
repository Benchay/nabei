<template>
    <div class="fillcontain">
        <ul :class="[identity ==1 ?'stallShareMenu':identity ==2 ?'sellerShareMenu':'']">
            <li v-if="getMenuAuthFun('financialManagement')">
                <router-link :to='{path:"/financialManagement"}'>账户总览</router-link>
            </li>
            <li class="ListMenu" v-if="getMenuAuthFun('financialManagement2')">
                <router-link :to='{path:"/financialManagement2"}'>财务交易记录</router-link>
            </li>
            <li v-if="getMenuAuthFun('accountSetting')">
                <router-link :to='{path:"/accountSetting"}'>账户设置</router-link>
            </li>
            <!--<li>-->
                <!--<router-link :to='{path:"/financialManagement3"}'>金币交易记录</router-link>-->
            <!--</li>-->
        </ul>
        <div class="financialManagement" :class="[identity ==1 ?'stallContent':identity ==2 ?'sellerContent':'']">
            <div class="tradingRecord">
                <div>
                    <!--<el-date-picker-->
                        <!--v-model="dateRange"-->
                        <!--type="daterange"-->
                        <!--@change="handleIconClick"-->
                        <!--placeholder="选择日期范围"-->
                        <!--:picker-options="pickerOptions2">-->
                    <!--</el-date-picker>-->

                    <!--<el-input-->
                        <!--class="dinanciaSearch right"-->
                        <!--placeholder="搜索"-->
                        <!--v-model="criteria"-->
                        <!--icon="search"-->
                        <!--@change="handleIconClick"-->
                    <!--&gt;</el-input>-->
                    <el-date-picker
                        size="middle"
                        v-model="filters.date.startDate"
                        type="date"
                        placeholder="选择开始日期"
                        :picker-options="startDateBefore"
                        @change="handleIconClick"
                    >
                    </el-date-picker>
                    -
                    <el-date-picker
                        size="middle"
                        v-model="filters.date.endDate"
                        type="date"
                        placeholder="选择截止日期"
                        :picker-options="startDateAfter"
                        @change="handleIconClick"
                    >
                    </el-date-picker>
                    <el-input
                        class="dinanciaSearch"
                        placeholder="请输入流水号"
                        v-model="orderCode"
                        icon="search"
                        :on-icon-click="handleIconClick"
                    ></el-input>

                    <el-select
                        class="dinanciaSearch"
                        placeholder="请选择交易类型"
                        v-model="type"
                        icon="search"
                        @change="handleIconClick"
                       >
                        <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>

                    <el-select
                        class="dinanciaSearch"
                        placeholder="请选择状态"
                        v-model="status"
                        icon="search"
                        @change="handleIconClick">
                        <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>


                </div>
                <div class="incomingsAndOutgoings">
                    <ul>
                        <li class="incomings flex">
                            <p>总收入<span>{{changedFee.inFee.toFixed(2)}}</span>元</p>
                        </li>
                        <li class="outgoings flex">
                            <p>总支出<span>{{changedFee.outFee<0?Math.abs(changedFee.outFee).toFixed(2):changedFee.outFee.toFixed(2)}}</span>元</p>
                        </li>

                        <!--<li class="TouchBalance">-->
                            <!--<el-select class="TouchBalance1 right" v-model="value" size="mini" placeholder="余额收支明细">-->
                                <!--<el-option-->
                                    <!--v-for="item in options"-->
                                    <!--:key="item.value"-->
                                    <!--:label="item.label"-->
                                    <!--:value="item.value">-->
                                <!--</el-option>-->
                            <!--</el-select>-->
                        <!--</li>-->
                    </ul>

                </div>
                <div class="daybook">
                    <el-table
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            width="150"
                            label="流水">
                            <template scope="scope">{{scope.row.orderCode==undefined?scope.row.flowNo:scope.row.orderCode}}</template>
                        </el-table-column>
                        <el-table-column
                            prop="createTime"
                            label="日期"
                            width="150"
                            :formatter="mydateFormat"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="financeItemCode"
                            label="类型名称">
                            <template scope="scope">{{scope.row.financeItemCode=='00'?'其他':scope.row.financeItemCode=='01'?'充值':scope.row.financeItemCode=='02'?'提现':scope.row.financeItemCode=='03'?'转账':scope.row.financeItemCode=='31'?'销售收入':scope.row.financeItemCode=='32'?'销售退货':scope.row.financeItemCode=='33'?'采购支出':scope.row.financeItemCode=='34'?'采购退货':scope.row.financeItemCode=='99'?'平台操作':''}}</template>
                        </el-table-column>
                        <el-table-column
                            prop="accountType"
                            label="交易账户">
                            <template scope="scope">{{scope.row.accountType=='1'?'账户余额':scope.row.accountType=='3'?'支付宝':scope.row.accountType=='4'?'微信':scope.row.accountType=='5'?'银行卡':scope.row.accountType=='6'?'其他':scope.row.accountType=='7'?'收银':''}}</template>
                        </el-table-column>
                        <el-table-column
                            prop="changeFee"
                            label="金额变化">
                            <template scope="scope">{{scope.row.changeFee!=undefined&&scope.row.changeFee!=''?Number(scope.row.changeFee).toFixed(2):''}}</template>
                        </el-table-column>
                        <el-table-column
                            prop="freezed"
                            label="冻结金额">
                            <template scope="scope">{{scope.row.freezed==undefined||scope.row.freezed==''?0:Number(scope.row.freezed).toFixed(2)}}</template>
                        </el-table-column>
                        <el-table-column
                            prop="stutas"
                            label="状态"
                            :formatter="stutasFormat"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="memo"
                            label="描述">
                            <template scope="scope">
                                <el-popover
                                    ref="popover1"
                                    placement="top"
                                    width="200"
                                    trigger="hover"
                                    :content=scope.row.memo>
                                </el-popover>
                                <div class="overflow" v-popover:popover1>
                                    {{scope.row.memo}}
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button
                                    class="buttonColorFM"
                                    size="small"
                                    type="primary"
                                    @click="viewDetail(scope.$index, scope.row)">查看凭证详情</el-button>
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
                    :page-sizes="[10, 20, 30, 40,50]"
                    :current-page="currentPage"
                    :page-size="pagesize"
                    layout="total,sizes, prev, pager, next, jumper"
                    :total="totalCount">
                </el-pagination>
                <a href="javascript:void(0)" class="export_excleFM" @click="exportTableData">导出excel</a>
                <div style="height:160px;">
                    &nbsp;
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {queryRangeChanged,queryRangeCondition} from '@/api/getData'
    import {mapActions, mapState} from 'vuex'
    import {formatDate} from '../utils/date.js'
    import {stutasFormat,accountFormat,flowTypeFormat,mydateFormat} from '../utils/dataFormater.js'
    import {userInfo,getStore,setStore} from  '../config/mUtils'
    import {isNullObject,getCompanyType} from  '../utils/common'
    import {export_json_to_excel} from '../vendor/Export2Excel.js'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                filters:{
                    date:{
                        startDate:new Date(),
                        endDate:new Date()
                    }
                },
                startDateBefore:{
                    disabledDate: (time) => {
                        let beginDateVal = this.filters.date.endDate;
                        if (beginDateVal) {
                            return time.getTime() > beginDateVal;
                        }
                    }
                },
                startDateAfter:{
                    disabledDate: (time) => {
                        let beginDateVal = this.filters.date.startDate;
                        if (beginDateVal) {
                            return time.getTime() < beginDateVal;
                        }
                    }
                },
//              1为档口、2为卖家身份
                identity:1,

                input2: '',
				dateRange:'',
                warningalue:true,
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },

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

                platformAccountVO: {
                    name: '',
                    blance: '',
                    freezed: '',
                    companyId: '',
                    status: '',
                    balanceNotice:'',
                    threshold: '',
                    goldBalance:'',
                    financeAccounts:[]

                },
                criteria:'',
				changedFee :{
				inFee:0.00,
				outFee:0.00
				},

                financeAccount:{
                    "accType":"",
                    "blance":0,
                    "defaultAcc":false,
                    "id":"",
                    "platformAccountId":"",
                    "status":0
                },
                options: [{
                    value: '选项1',
                    label: '支付宝明细'
                }, {
                    value: '选项2',
                    label: '微信明细'
                }, {
                    value: '选项3',
                    label: '网银明细'
                }],
                value: '选项1',

                tableData: [],
                orderCode:'',
                value: '',
                type:'',
                types:[{value:'00',label:'其他'},{value:'01',label:'充值'},{value:'02',label:'提现'},{value:'31',label:'销售收入'},{value:'32',label:'销售退货'},{value:'33',label:'采购支出'},{value:'34',label:'采购退货'}],
                status:'',
                states:[{value:1,label:'待审核'},{value:2,label:'审核中'},{value:3,label:'已完成'},{value:4,label:'审核失败'}]
            }
        },

        watch:{
            '$route':function(route){
                this.identity =getCompanyType(getStore("curCompany"));
                this.loadData2();

                const s = document.createElement('script');
                s.type = 'text/javascript';
                s.src = 'http://oss.sheetjs.com/js-xlsx/xlsx.full.min.js';
                document.body.appendChild(s);
            }
        },

        mounted(){
        	this.identity =getCompanyType(getStore("curCompany"));
            this.loadData2();

            const s = document.createElement('script');
			s.type = 'text/javascript';
			s.src = 'http://oss.sheetjs.com/js-xlsx/xlsx.full.min.js';
			document.body.appendChild(s);
        },

        computed: {
            financeAccounts: function () {
               if(this.financeAccounts.length()>0){

               }
            },

            defFee:function(){
                if(this.changedFee){
                    this.changedFee={
                        inFee:0.00,
                        outFee:0.00
                    }
                }
            }

        },
        methods: {
        	getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
            },
            handleIconClick() {
//                let start='',end='';
//                if(this.dateRange==''||this.dateRange[0]==null){
//
//                }else{
//                    start = formatDate(this.dateRange[0],'yyyy-MM-dd hh:mm');
//                    end = formatDate(this.dateRange[1],'yyyy-MM-dd hh:mm');
//                }
//
//                let  param = {
//                    "companyId": userInfo().companyId,
//                    "financeAccountId":"1",
//                    "params": this.criteria,
//
//                    "pageSize": this.pagesize,
//                    "pageIndex": this.currentPage,
//                    "start":start,
//                    "end":end
//                };
                var start = '';
                var end = '';
                var list = [];
                if(this.filters.date.startDate!=undefined&&this.filters.date.startDate!=''){
                    start = formatDate(this.filters.date.startDate,'yyyy-MM-dd 00:00:00');
                    var param1 = {label:"start",value:start};
                    list.push(param1);
                }
                if(this.filters.date.endDate!=undefined&&this.filters.date.endDate!=''){
                    end = formatDate(this.filters.date.endDate,'yyyy-MM-dd 23:59:59');
                    var param2 = {label:"end",value:end};
                    list.push(param2);
                }
                if(this.orderCode!=undefined&&this.orderCode!=''){
                    var param3 = {label:"flowNo",value:this.orderCode};
                    list.push(param3);
                }
                if(this.type!=undefined&&this.type!=''){
                    var param4 = {label:"financeItemCode",value:this.type};
                    list.push(param4);
                }
                if(this.status!=undefined&&this.status!=''){
                    var param5 = {label:"status",value:this.status};
                    list.push(param5);
                }
                var str = '{';
                list.forEach((obj)=>{
                    str = str + '"' + obj.label + '":"' + obj.value + '",';
                });
                str = str + '"companyId":"' + userInfo().companyId + '",' + '"financeAccountId":"1",' + '"pageIndex":' + this.currentPage + ',"pageSize":' + this.pagesize;
                str = str + '}';

                var params = JSON.parse(str);
//                let  param = {
//                    "companyId": userInfo().companyId,
//                    "financeAccountId":"1",
//
//                    "pageSize": this.pagesize,
//                    "pageIndex": this.currentPage,
//                    "start":startDate,
//                    "end":endDate
//                };

                this.loadDataWithCondition(params);

            },
            ...mapActions(['queryRangeChanged']),
            //从服务器读取数据

            async loadData2() {
                let  param = {
                    "companyId":userInfo().companyId,
                    "start":formatDate(new Date(),'yyyy-MM-dd 00:00:00'),
                    "end":formatDate(new Date(),'yyyy-MM-dd 23:59:59'),
                    "financeAccountId":"1",
                    "pageSize": this.pagesize,
                    "pageIndex": this.currentPage
                };
                this.loadDataWithCondition(param);
            },

            async loadDataWithCondition(param) {

                const res = await queryRangeCondition(param);
                if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: '加载数据成功'
                    });

                    this.tableData = res.result.results;
                    this.totalCount = res.result.totalCount;
                    this.changedFee =  res.result.groupData;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },



                viewDetail: function(index, row) {
        	    if(this.identity==1){
                    this.$router.push({path:"stallfinancialManagementDetail",query:{backPath:"/financialManagement2",financeRecordId:row.id,orderId:row.orderId}})
                }else if(this.identity==2){
                    this.$router.push({path:"financialManagementDetail",query:{backPath:"/financialManagement2",financeRecordId:row.id,orderId:row.orderId}})
                }
                },



				 //页码变更
            handleSizeChange(val) {
                this.pagesize = val;
//                let start='',end='';
//                if(this.dateRange!=''){
//                    start = formatDate(this.dateRange[0],'yyyy-MM-dd hh:mm');
//                    end = formatDate(this.dateRange[1],'yyyy-MM-dd hh:mm');
//                }
//                if(start!=''||this.criteria!=''){
//                    let  param = {
//                        "companyId":userInfo().companyId,
//                        "accountType":"1",
//                        "params": this.criteria,
//
//                        "pageSize": this.pagesize,
//                        "pageIndex": this.currentPage,
//                        "start":start,
//                        "end":end
//                    };
//                    this.loadDataWithCondition(param);
//                }else{
//                    this.loadData2(this.criteria, this.currentPage, this.pagesize);
//                }
                this.handleIconClick();

            },
                handleCurrentChange: function(val) {
                    this.currentPage = val;
                    this.handleIconClick();

//                    let start='',end='';
//                    if(this.dateRange!=''){
//                        start = formatDate(this.dateRange[0],'yyyy-MM-dd hh:mm');
//                        end = formatDate(this.dateRange[1],'yyyy-MM-dd hh:mm');
//                    }
//                    if(start!=''||this.criteria!=''){
//                        let  param = {
//                            "companyId":userInfo().companyId,
//                            "accountType":"1",
//                            "params": this.criteria,
//
//                            "pageSize": this.pagesize,
//                            "pageIndex": this.currentPage,
//                            "start":start,
//                            "end":end
//                        };
//                        this.loadDataWithCondition(param);
//                    }else{
//                        this.loadData2(this.criteria, this.currentPage, this.pagesize);
//                    }

                },

            async exportTableData() {
            	let start='',end='';
                if(this.dateRange!=''){
                    start = formatDate(this.dateRange[0],'yyyy-MM-dd hh:mm');
                    end = formatDate(this.dateRange[1],'yyyy-MM-dd hh:mm');
                }
                let  param = {};
                if(start!=''||this.criteria!=''){
                    param = {
                        "companyId":userInfo().companyId,
                        "accountType":"1",
                        "params": this.criteria,

                        "pageSize": this.pagesize*this.totalCount,
                        "pageIndex": 1,
                        "start":start,
                        "end":end
                    };
                }else{
                	param = {
	                    "companyId":userInfo().companyId,
	                    "financeAccountId":"1",
	                    "pageSize": this.pagesize*this.totalCount,
	                    "pageIndex": 1,

	                };
                }
                const res = await queryRangeCondition(param);
                const list = [];
                if (res.isSuccess == true) {
                	for(let i=0;i<res.result.results.length;i++){
						let data1 = res.result.results[i];
						let flowNo = '';
						let createTime = '';
						let recordType = '';
						let accountType = '';
						let changeFee = 0;
						let freezed = 0;
						let status = '';
						let memo = '';

						if(data1.flowNo){
							flowNo = data1.flowNo;
						}
						if(data1.createTime){
							var date2 = new Date(data1.createTime);
		                	createTime = formatDate(date2,'yyyy-MM-dd hh:mm');
						}

						if(data1.recordType && data1.recordType =='1'){
					        recordType = '充值';
					    }else if(data1.recordType && data1.recordType=='2'){
					        recordType = '提现'
					    }else if(data1.recordType && data1.recordType=='3'){
					        recordType = '转账'
					    }else{
					        recordType = '其他'
					    }

					    if(data1.accountType && data1.accountType =='1'){
					        accountType = '账户余额';
					    }else if(data1.accountType && data1.accountType =='2'){
					        accountType = '金币'
					    }else if(data1.accountType && data1.accountType =='3'){
					        accountType = '支付宝'
					    }else if(data1.accountType && data1.accountType =='4'){
					        accountType = '微信'
					    }else if(data1.accountType && data1.accountType =='5'){
					        accountType = '银行卡'
					    }

					    if(data1.changeFee){
					    	changeFee = data1.changeFee;
					    }
					    if(data1.freezed){
					    	freezed = data1.freezed;
					    }

					    if(data1.stutas && data1.stutas =='1'){
					        status = '待审核';
					    }else if(data1.stutas && data1.stutas =='2'){
					        status = '审核中'
					    }else if(data1.stutas && data1.stutas =='3'){
					        status = '已完成'
					    }
					    if(data1.memo){
					    	memo = data1.memo;
					    }

						let row = {
		            		flowNo : flowNo,
							createTime : createTime,
							recordType : recordType,
							accountType : accountType,
							changeFee : changeFee,
							freezed : freezed,
							status : status,
							memo : memo
		            	}
		            	list.push(row);
                	}
                	const tHeader = ['流水', '日期','类型名称','交易账户','金额变化','冻结金额','状态','描述'];
			　　　　const filterVal = ['flowNo', 'createTime','recordType','accountType','changeFee','freezed','status','memo'];
			　　　　const data = this.formatJson(filterVal, list);
			　　　　export_json_to_excel(tHeader, data, '余额交易记录表');
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            formatJson(filterVal, jsonData) {
	　　　　　　return jsonData.map(v => filterVal.map(j => v[j]))
	　　　　},
            accountFormat,
            stutasFormat,
            flowTypeFormat,
            mydateFormat


        }

    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/financialManagement';
</style>
