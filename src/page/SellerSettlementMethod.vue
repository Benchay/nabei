<template>
    <div class="fillcontain">
        <ul class="menu">
            <!--<li>-->
                <!--<router-link :to='{path:"/logTools"}'>日志查看</router-link>-->
            <!--</li>-->
            <!--<li>-->
                <!--<router-link :to='{path:"/MSConfig"}'>系统配置</router-link>-->
            <!--</li>-->
            <li class="menuIndex" v-if="getMenuAuthFun('SellerSettlementMethod')">
                <router-link :to='{path:"/SellerSettlementMethod"}'>卖家结算方式</router-link>
            </li>
        </ul>
        <div class="SellerSettlement">
            <div>
                <a href="javascript:void(0)" class="buttonColor" @click="handleBatchDel">批量删除</a>
                <a href="javascript:void(0)" class="buttonColor" @click="dialogVisible = true">添加</a>
            </div>
            <div class="shopList">
                <el-table
                    ref="multipleTable"
                    :data="tableData3"
                    @selection-change="handleSelectionChange"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="companyName"
                        label="卖家名称">
                    </el-table-column>
                    <el-table-column
                        prop="method"
                        label="结算方式">
                        <template scope="scope">
                            <div>
                                <p :class="[scope.row.settlementType ==1?'style4':scope.row.settlementType ==2?'style3':'']">{{scope.row.settlementType == 1?'周结':scope.row.settlementType == 2?'月结':''}}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="settlementDay"
                        label="结算时间">
                        <template scope="scope">
                              {{scope.row.settlementType == 1?"周"+scope.row.settlementDay:scope.row.settlementType == 2?scope.row.settlementDay+"号":''}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        show-overflow-tooltip>
                        <template scope="scope">
                            <a href="javascript:void(0);" class="blue2" @click="dialogVisible = true">修改结算方式</a>
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
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount">
                </el-pagination>
            </div>
        </div>
        <el-dialog
            title="卖家结算"
            :visible.sync="dialogVisible"
            size="tiny">
            <div class="sellerDialog">
                <el-form ref="form" :model="form" label-width="110px">
                    <el-form-item label="电商卖家：">
                        <div class="flex">
                            <el-select
                                v-model="form.settlementCompanyId"
                                filterable
                                remote
                                reserve-keyword
                                placeholder="请输入电商名称"
                                :remote-method="remoteMethod"
                                :loading="loading">
                                <el-option
                                    v-for="item in options4"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-form-item label="结算方式：">
                        <!--<el-select v-model="form.settlementType" @change="changeValue">-->
                            <!--<el-option label="现结" value="3"></el-option>-->
                            <!--<el-option label="周结" value="1"></el-option>-->
                            <!--<el-option label="月结" value="2"></el-option>-->
                        <!--</el-select>-->
                        <el-select v-model="form.settlementType" @change="changeValue">
                            <el-option label="现结" value="3"></el-option>
                            <el-option label="周结" value="1"></el-option>
                            <el-option label="月结" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="结算日期：" v-show="cash">
                        <el-select v-model="form.settlementDay">
                            <el-option
                                v-if="changeWeek"
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                            <el-option
                                v-if="changeMonth"
                                v-for="item in options3"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer flex2">
                <a href="javascript:void(0)" @click="handleAdd" class="buttonColor">确 定</a>
                <a href="javascript:void(0)" @click="dialogVisible = false" class="buttonColor2">取 消</a>
              </span>
        </el-dialog>
        <el-dialog
            title="所有卖家"
            :visible.sync="dialogVisible1"
            size="tiny">
            <div style="margin-top: 20px">
                <el-input
                    class="startInput"
                    placeholder="卖家名称"
                    icon="search"
                    v-model="settlementCompanyName">
                </el-input>
                <div class="startRadio">
                    <el-radio class="radio" :ref='list.id' v-model="radio" :label="list.id" v-for="list in supplierList">{{list.name}}</el-radio>
                </div>
            </div>
            <span slot="footer" class="dialog-footer flex2">
                <a href="javascript:void(0)" class="buttonColor" @click="dialogVisible1 = false">确 定</a>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import visitorPie from '../components/visitorPie'
    import {userInfo} from  '../config/mUtils'
    import {formatDate} from '../utils/date.js'
    import {mydateFormat} from '../utils/dataFormater.js'
    import {querySettlementDay,delSettlementDay,saveSettlementDay,queryCompany} from '@/api/getData'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'

    export default {
        components: {
            headTop,
            visitorPie
        },
        computed: {
        },
        data() {
            return {
                ChangeModel:'',
                cash:false,
                dialogVisible:false,
                dialogVisible1:false,
                changeWeek:true,
                changeMonth:false,
                supplierList:[{
                    id:1,
                    name:'供应商1'
                },{
                    id:2,
                    name:'供应商2'
                },{
                    id:3,
                    name:'供应商3'
                }],
                radio:1,
                form: {
                    "companyId": userInfo().companyId,
                    "settlementCompanyId": "",
                    "settlementDay": '',
                    "settlementType": '',
                    "type": 1
                },
                options2: [{
                    value: '1',
                    label: '周一'
                }, {
                    value: '2',
                    label: '周二',
                }, {
                    value: '3',
                    label: '周三'
                }, {
                    value: '4',
                    label: '周四'
                }, {
                    value: '5',
                    label: '周五'
                }, {
                    value: '6',
                    label: '周六'
                }, {
                    value: '7',
                    label: '周日'
                }],
                options3: [{
                    value: '1',
                    label: '1号'
                }, {
                    value: '2',
                    label: '2号',
                }, {
                    value: '3',
                    label: '3号'
                }, {
                    value: '4',
                    label: '4号'
                }, {
                    value: '5',
                    label: '5号'
                }, {
                    value: '6',
                    label: '6号'
                }, {
                    value: '7',
                    label: '7号'
                }, {
                    value: '8',
                    label: '8号'
                }, {
                    value: '9',
                    label: '9号'
                }, {
                    value: '10',
                    label: '10号'
                }, {
                    value: '11',
                    label: '11号'
                }, {
                    value: '12',
                    label: '12号'
                }, {
                    value: '13',
                    label: '13号'
                }, {
                    value: '14',
                    label: '14号'
                }, {
                    value: '15',
                    label: '15号'
                }, {
                    value: '16',
                    label: '16号'
                }, {
                    value: '17',
                    label: '17号'
                }, {
                    value: '18',
                    label: '18号'
                }, {
                    value: '19',
                    label: '19号'
                }, {
                    value: '20',
                    label: '20号'
                }, {
                    value: '21',
                    label: '21号'
                }, {
                    value: '22',
                    label: '22号'
                }, {
                    value: '23',
                    label: '23号'
                }, {
                    value: '24',
                    label: '24号'
                }, {
                    value: '25',
                    label: '25号'
                }, {
                    value: '26',
                    label: '26号'
                }, {
                    value: '27',
                    label: '27号'
                }, {
                    value: '28',
                    label: '28号'
                }],

                tableData3: [],
                supplierName:'',
                initData: {
                    "params":{
                        "companyId":userInfo().companyId
                    },
                    "pageIndex":1,
                    "pageSize":10
                },
                //多选数组
                multipleSelection: [],
                delSucNum:0,
                //默认每页数据量
                pageSize: 6,
                //默认高亮行数据id
                highlightId: -1,
                //当前页码
                currentPage: 1,
                //查询的页码
                start: 1,
                //默认数据总数
                totalCount: 0,
                options4:'',
                loading: false
            }
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
            changeValue(){
//                if(this.form.region == 1){
//                    this.cash = true;
//                    this.changeWeek = true;
//                    this.changeMonth = false;
//                }else if(this.form.region == 2){
//                    this.cash = true;
//                    this.changeWeek = false;
//                    this.changeMonth = true;
//                }else if(this.form.region == 3){
//                    this.cash = false;
//                }

                if(this.form.settlementType == 3){
                    this.cash = false;
                }else if(this.form.settlementType == 1){
                    this.cash = true;
                    this.changeWeek = true;
                    this.changeMonth = false;
                }else if(this.form.settlementType == 2){
                    this.cash = true;
                    this.changeWeek = false;
                    this.changeMonth = true;
                }

            },
            handleAdd(){
                this.add(this.form);
                this.dialogVisible = false
            },

            handleBatchDel(){
                if(this.multipleSelection.length==0){
                    this.$message({
                        type:'error',
                        message:'您没有选择要删除的数据!'
                    })
                    return
                }
                this.$confirm('确认删除这几项数据？')
                    .then(_ => {
                        this.batchDel()
                    }).then(_=>{
//                    if(this.delSucNum>0){
//                        this.$message({
//                            type:'success',
//                            message:'成功删除'+this.delSucNum+'条数据!'
//                        })
                        this.loadData(this.initData)
//                    }else{
//                        this.$message({
//                            type:'error',
//                            message:'删除失败!'
//                        })
//                    }

                })
                    .catch(_ => {});
            },

            async add(param){
                const  res = await  saveSettlementDay(param);
                if(res.isSuccess==true){
                    this.$message({
                        type:'success',
                        message:'添加成功!'
                    })
                    this.loadData(this.initData)
                }else{

                }
            },

            batchDel(){
                this.delSucNum =0;
                this.multipleSelection.forEach((obj)=>this.del(obj.id))
            },

            async del(param){
                let requestParam = {
                    id:param
                }
                const  res = await  delSettlementDay(requestParam);
                if(res.isSuccess==true){
                    this.delSucNum++;
                }else{

                }
            },
           async loadData(param){
                const  res = await  querySettlementDay(param);
                if(res.isSuccess==true){
                    this.$message({
                        type:'success',
                        message:'数据加载成功!'
                    })
                    this.tableData3 = res.result.results;
                    this.totalCount = res.result.totalCount
                }else{

                }

            },
            //页码变更
            handleCurrentChange: function(val) {
                this.currentPage = val;
                let  param =  {
                    "params":{
                        "companyId":userInfo().companyId
                    },
                    "pageIndex":val,
                    "pageSize":this.pageSize
                }
                this.loadData(param);
            },
            //多选响应
            handleSelectionChange: function(val) {
                this.multipleSelection = val;
            },
            async  remoteMethod(){
                    //this.loading = true;
                let param ={
                    "company":{"name":this.form.settlementCompanyId,"type":2},
                    "pageSize": 10,
                    "pageIndex": 1
                }
              //  const  res = await  queryCompany(param);
                let  res = "{\"result\":{\"totalCount\":4,\"data\":[{\"compCode\":\"hmj001\",\"id\":\"1\",\"name\":\"武汉海麦金科技有限公司\",\"ownerId\":\"402880fb5e36a4b8015e36a6f5090001\",\"status\":true,\"type\":0},{\"compCode\":\"HMJ\",\"compScale\":\"20人以下\",\"createUserId\":\"402880fb5e3b1dd9015e3b1fa5250000\",\"id\":\"402880fb5e4167dd015e41737a020004\",\"location\":\"北京东城区\",\"name\":\"海麦金\",\"ownerId\":\"402880fb5e3b1dd9015e3b1fa5250000\",\"status\":false,\"type\":0},{\"compCode\":\"mom\",\"compScale\":\"50-150人\",\"companyBindingId\":\"\",\"createUserId\":\"402880fb5e4ab9fb015e4bbb7c86000c\",\"id\":\"402880fb5e555d24015e55e6dced0000\",\"location\":\"福建/厦门/思明区\",\"name\":\"海麦金科技\",\"ownerId\":\"402880fb5e4ab9fb015e4bbb7c86000c\",\"status\":false,\"type\":0},{\"compCode\":\"WHHMJDDK\",\"compScale\":\"2\",\"companyBindingId\":\"1\",\"createTime\":1510217129000,\"createUserId\":\"402880fb5f9ec927015f9ff4038b00e0\",\"id\":\"402880fb5f9ec927015f9ff49f4d00e2\",\"location\":\"湖北武汉\",\"name\":\"武汉海麦金的档口\",\"ownerId\":\"402880fb5f9ec927015f9ff4038b00e0\",\"status\":true,\"type\":1}],\"pageSize\":20,\"pageIndex\":1},\"isSuccess\":true}"
                res = JSON.parse(res)
                this.options4 = res.result.data;
            }
        },






        mounted(){
            this.loadData(this.initData);
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/stallAssess';
</style>
