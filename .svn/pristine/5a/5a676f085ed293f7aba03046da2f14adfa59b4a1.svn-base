<template>
    <div class="fillcontain">
        <ul class="menu">
            <horizontal-Menu  :menuParams ='this.menuParams' :exeptArray = "this.exeptArray" :routerPath="this.$route.path"></horizontal-Menu>
            <!--
            <li v-if="getMenuAuthFun('logTools')">
                <router-link :to='{path:"/logTools"}'>日志查看</router-link>
            </li>
            <li class="menuIndex" v-if="getMenuAuthFun('MSConfig')">
                <router-link :to='{path:"/MSConfig"}'>系统配置</router-link>
            </li>-->
        </ul>
        <div class="MSConfig">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="卖家结算方式设置" name="first">
                    <div class="firstContent">
                            <div style="margin-bottom: 15px">
                                <!--<a href="javascript:void(0)" class="buttonColor" @click="handleBatchDel">批量删除</a>-->
                                <a href="javascript:void(0)" class="buttonColor" @click="addSettlementType">添加</a>
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
                                        prop="settlementCompanyName"
                                        label="卖家名称">
                                    </el-table-column>
                                    <el-table-column
                                        prop="method"
                                        label="结算方式">
                                        <template scope="scope">
                                            <div>
                                                <p :class="[scope.row.settlementType ==0?'style4':scope.row.settlementType ==1?'style4':scope.row.settlementType ==2?'style3':'']">{{scope.row.settlementType == 0?'现结':scope.row.settlementType == 1?'周结':scope.row.settlementType == 2?'月结':''}}</p>
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
                                            <a href="javascript:void(0);" class="blue2" @click="toModify(scope.row)">修改结算方式</a>
                                        </template>
                                    </el-table-column>
                                </el-table>

                                <el-pagination
                                    small
                                    class="right"
                                    style="margin-top: 20px;"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage"
                                    :page-size="pageSize"
                                    layout="total, prev, pager, next, jumper"
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
                                                    :key="item.sellId"
                                                    :label="item.sellName"
                                                    :value="item.sellId">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </el-form-item>
                                    <el-form-item label="结算方式：">
                                        <el-select v-model="form.settlementType"  @change="changeValue">
                                            <el-option
                                                v-for="item in typeList"
                                                :key="item.type"
                                                :label="item.label"
                                                :value="item.type">
                                            </el-option>
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
                                <el-label class="MCtips" v-if="this.optType==1">提示：修改后的结算方式或日期，到了该时间点时，对新的订单生效</el-label>
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

                </el-tab-pane>
                <el-tab-pane label="商品货号编码规则设置" name="second">
                    <div class="secondContent" style="padding-left: 80px;">
                        <div class="secondTop flex2" style="justify-content: flex-start;">
                            <p style="margin-right: 15px;">货号规则（单品）:</p>
                            <!-- <el-input placeholder="其他" class="secondInput" style="margin-right: 10px;"></el-input>
                            <el-input value="档口编码" class="secondInput"></el-input>
                            <span>——</span> -->
                            <el-input value="档口商品货号" class="secondInput tc" disabled=""></el-input>
                        </div>
                        <p style="padding-left: 135px; margin: 20px 0 30px;">例子：C001</p>
                        <div class="secondTop flex2" style="justify-content: flex-start;">
                            <p style="margin-right: 15px;">货号规则（SKU）:</p>
                            <!-- <el-input placeholder="其他" class="secondInput" style="margin-right: 10px;"></el-input> -->
                            <el-input value="档口编码" class="secondInput tc" disabled=""></el-input>
                            <span>——</span>
                            <el-input value="档口商品货号" class="secondInput tc" disabled=""></el-input>
                            <span>——</span>
                            <el-input value="颜色" class="secondInput tc" disabled=""></el-input>
                            <span>——</span>
                            <el-input value="尺码" class="secondInput tc" disabled=""></el-input>
                        </div>
                        <p style="padding-left: 135px; margin: 20px 0 30px;">例子：A000-C001-HEi-2Xl</p>
                        <div class="flex2 secondButton">
                            <!-- <a href="javascript:void(0)" class="buttonColor2" style="border: 1px solid #000; background-color: #fff;">返  回</a>
                            <a href="javascript:void(0)" class="buttonColor">保  存</a> -->
                        </div>
                    <div class="secondTips">
                        <div>
                            <el-col :span="24"><el-col :span="2">说明：</el-col>(默认以上商品编码规则，该规则适用所有商品，如需在档口编码上加前缀的在添加后保存即可)</el-col>
                            <el-col :span="24"><el-col :span="2">&nbsp;</el-col>1.单品的货号规则系统默认为淘宝同步下来的商品编码中货号为准；</el-col>
                            <el-col :span="24"><el-col :span="2">&nbsp;</el-col>2.SKU编码规则系统默认在单品的编码规则上加颜色和尺码，自动生成；</el-col>
                            <!-- <el-col :span="24"><el-col :span="2">&nbsp;</el-col>3.第三段为固定值，默认用档口的商品货号为准；</el-col>
                            <el-col :span="24"><el-col :span="2">&nbsp;</el-col>4.SKU编码规则系统默认在单品的编码规则上加颜色和尺码，自动生成；</el-col>
                            <el-col :span="24"><el-col :span="2">&nbsp;</el-col>5.如果档口的编码有更换，系统会自动更新为新档口的编码。</el-col> -->
                        </div>
                    </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="卖家取货方式设置" name="third">
                    <div class="firstContent">
                        <div style="margin-bottom: 15px">
                            <a href="javascript:void(0)" class="buttonColor" @click="addBusiAddress">添加</a>
                        </div>
                        <div class="shopList">
                            <el-table
                                ref="multipleTable"
                                :data="tableData"
                                style="width: 100%">
                                <el-table-column
                                    prop="busiCompanyName"
                                    label="卖家名称">
                                </el-table-column>
                                <el-table-column
                                    prop="getPackageMethd"
                                    label="取货方式">
                                    <template scope="scope">{{scope.row.getPackageMethd==0?'自取':scope.row.getPackageMethd==1?'送货上门':''}}</template>
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="收货地址">
                                    <template scope="scope">
                                        <el-popover
                                            ref="popover1"
                                            placement="top"
                                            width="200"
                                            trigger="hover"
                                            :content=scope.row.address>
                                        </el-popover>
                                        <p style="display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" v-popover:popover1>{{scope.row.address}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="wareHouseName"
                                    label="出货仓库">
                                </el-table-column>
                                <el-table-column
                                    prop="memo"
                                    label="备注">
                                    <template scope="scope">
                                        <el-popover
                                            ref="popover1"
                                            placement="top"
                                            width="200"
                                            trigger="hover"
                                            :content=scope.row.memo>
                                        </el-popover>
                                        <p style="display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" v-popover:popover1>{{scope.row.memo}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="操作"
                                    show-overflow-tooltip>
                                    <template scope="scope">
                                        <a href="javascript:void(0);" class="blue2" @click="modifyBusiAddress(scope.$index)">修改</a>
                                        <a href="javascript:void(0);" class="blue2" @click="delAddress(scope.row.id)">删除</a>
                                    </template>
                                </el-table-column>
                            </el-table>

                            <el-pagination
                                small
                                class="right"
                                style="margin-top: 20px;"
                                @current-change="handleCurrentChange"
                                :page-sizes="[10, 20, 30, 40,50]"
                                :current-page="currentPage"
                                :page-size="pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="totalCount">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog title="添加卖家取货方式" :visible.sync="dialogVisible2" size="tiny">
            <el-form ref="form3" :model="form3" label-width="80px">
                <el-form-item label="卖家名称" required="true">
                    <el-select
                        v-model="form3.busiCompanyId"
                        filterable
                        remote
                        reserve-keyword
                        placeholder="请输入卖家名称"
                        :remote-method="remoteMethod2"
                        :loading="loading"
                        @change="queryAllBusiAddress">
                        <el-option
                            v-for="item in options5"
                            :key="item.sellId"
                            :label="item.sellName"
                            :value="item.sellId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="取货方式" required="true">
                    <el-select
                        style="width: 280px;"
                        placeholder="请选择取货方式"
                        v-model="form3.getPackageMethd">
                        <el-option
                            v-for="item in deliveryTypes" :key="item.tId" :label="item.tVal" :value="item.tId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出货仓库" required="true">
                    <el-select
                        v-model="form3.wareHouseId"
                        style="width: 280px;"
                        placeholder="请选择出货仓库">
                        <el-option
                            v-for="item in warehouses"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收货地址">
                    <el-select
                        style="width: 359px;"
                        v-model="form3.address"
                        placeholder="请选择收货地址"
                        :disabled="form3.getPackageMethd=='0'">
                        <el-option
                            v-for="item in addresses"
                            :key="item.addr"
                            :label="item.addr"
                            :value="item.addr">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" >
                   <el-input type="textarea" maxlength="50" v-model="form3.memo" placeholder="请输入需要备注的信息"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer flex2">
                    <el-button class="buttonColor" @click="addAddress">确 定</el-button>
                    <el-button class="buttonColor2" @click="dialogVisible2 = false">取 消</el-button>
                </span>
        </el-dialog>
        <el-dialog title="修改卖家取货方式" :visible.sync="dialogVisible3" size="tiny">
            <el-form ref="form3" :model="form3" label-width="80px" >
                <el-form-item label="卖家名称" required="true">
                    <el-select
                        v-model="form3.busiCompanyId"
                        filterable
                        remote
                        reserve-keyword
                        placeholder="请输入卖家名称"
                        :remote-method="remoteMethod2"
                        :loading="loading"
                        @change="queryAllBusiAddress">
                        <el-option
                            v-for="item in options5"
                            :key="item.sellId"
                            :label="item.sellName"
                            :value="item.sellId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="取货方式" required="true">
                    <el-select
                        style="width: 280px;"
                        placeholder="请选择取货方式"
                        v-model="form3.getPackageMethd">
                        <el-option
                            v-for="item in deliveryTypes" :key="item.tId" :label="item.tVal" :value="item.tId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出货仓库" required="true">
                    <el-select
                        v-model="form3.wareHouseId"
                        style="width: 280px;"
                        placeholder="请选择出货仓库">
                        <el-option
                            v-for="item in warehouses"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收货地址" >
                    <el-select
                        style="width: 359px;"
                        v-model="form3.address"
                        placeholder="请选择收货地址"
                        :disabled="form3.getPackageMethd=='0'">
                        <el-option
                            v-for="item in addresses"
                            :key="item.addr"
                            :label="item.addr"
                            :value="item.addr"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" maxlength="50" v-model="form3.memo" placeholder="请输入需要备注的信息"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer flex2">
                    <el-button class="buttonColor" @click="modifyAddressInfo">确 定</el-button>
                    <el-button class="buttonColor2" @click="dialogVisible3 = false">取 消</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
    //import headTop from '../components/headTop'
    import visitorPie from '../components/visitorPie'
    import {userInfo} from  '../config/mUtils'
    import {formatDate} from '../utils/date.js'
    import {mydateFormat} from '../utils/dataFormater.js'
    import {querySettlementDay,delSettlementDay,saveSettlementDay,queryStallCustomer,queryWarehouse,queryDeliveryAddress,saveReciveMethodSetting,queryReciveMethodSetting,deleteAddressInfo} from '@/api/getData'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'
    import horizontalMenu from '../components/horizontalMenu'

    export default {
        components: {
            horizontalMenu,
            visitorPie
        },
        data() {
            return {
                menuParams:{"parentMethod":'munu_dk_007',"companyType":1},
                exeptArray:[],
                input21:'',
                activeName: 'first',
                ChangeModel:'',
                cash:false,
                dialogVisible:false,
                dialogVisible1:false,
                dialogVisible2:false,
                dialogVisible3:false,
                form2: {
                    name:'',
                    region: '',
                    warehouse: '',
                    pickupWay:'',
                    address:'',
                },
                form3:{
                    id:'',
                    companyId:'',
                    busiCompanyId:'',
                    wareHouseId:'',
                    getPackageMethd:'',
                    address:'',
                    memo:''
                },
                input:'',
                warehouses:[],
                addresses:[],
                addressInfo:'',
                deliveryTypes:[{tId:'0',tVal:'自取'},{tId:'1',tVal:'送货上门'}],
                rules:{
                    busiCompanyId: [
                        { required: true, message:"请选择卖家", trigger: 'blur'}
                       ],
                    wareHouseId:[
                        {required: true, message:"请选择出货仓库", trigger: 'blur'}
                    ],
                    getPackageMethd:[
                        {required: true, message:"请选择出货方式", trigger: 'blur'}
                    ]
                },
                changeWeek:true,
                changeMonth:false,
                typeList:[{label:'现结',type:0},{label:'周结',type:1},{label:'月结',type:2}],
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
                busiCompId:'',
                form: {
                    "id":'',
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
                tableData:[{}],
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
                pageSize: 10,
                //默认高亮行数据id
                highlightId: -1,
                //当前页码
                currentPage: 1,
                //查询的页码
                start: 1,
                //默认数据总数
                totalCount: 0,
                options4:[],
                options5:[],
                loading: false,
                toSave:'',
                optType:0,
                settlementCompanyName:''
            }
        },
        mounted(){
            this.loadData(this.initData);
            //查询收货地址
            this.queryReciveAddress();
        },

        methods: {
        	getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },

            changeValue(){
                if(this.form.settlementType === 0){
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

            addSettlementType(){
                this.optType = 0;
                this.dialogVisible = true;
            },

            handleAdd(){
                if(this.toSave!=undefined&&this.toSave!=''){
                    this.add(this.form);
                }else{
                    this.addNewInfo(this.form);
                }

                this.dialogVisible = false
            },

            async addNewInfo(param){
                if(param.companyId == undefined||param.companyId==''){
                    param.companyId = userInfo().companyId;
                }
                if(param.settlementCompanyId==undefined||param.settlementCompanyId==''){
                    this.$message({type:'error', message:'信息未填写完成，请继续填写!'
                    })
                    return ;
                }
                let info = {
                    "companyId": userInfo().companyId,
                    "settlementCompanyId":param.settlementCompanyId,
                    "settlementDay": param.settlementDay,
                    "settlementType": param.settlementType,
                    "type":1
                };
                const  res = await  saveSettlementDay(info);
                if(res.isSuccess==true){
                    this.$message({
                        type:'success',
                        message:'操作成功!'
                    });
                    this.loadData(this.initData);
                }else{
                    this.$message({
                        type:'error',
                        message:'操作失败!'
                    })
                }
            },

//            handleBatchDel(){
//                if(this.multipleSelection.length==0){
//                    this.$message({
//                        type:'error',
//                        message:'您没有选择要删除的数据!'
//                    })
//                    return
//                }
//                this.$confirm('确认删除这几项数据？')
//                    .then(_ => {
//                        this.batchDel()
//                    }).then(_=>{
//                    this.loadData(this.initData)
//
//                })
//                    .catch(_ => {});
//            },

            toModify(val){
                this.optType = 1;
                this.toSave = val;
                this.busiCompId = val.settlementCompanyId;
                this.options4=[{name:val.settlementCompanyName,id:val.settlementCompanyId}]
                this.form.settlementCompanyId = this.options4[0].name;
                this.dialogVisible = true;
                this.settlementCompanyName = val.settlementCompanyName;

                this.form.settlementType = val.settlementType;
                if(val.settlementType!=0){
                    this.cash = true;
                    this.form.settlementDay = val.settlementDay;
                }else{
                    this.cash = false;
                }

            },

            async add(param){
                if(this.toSave.id!=undefined||this.toSave.id!=''){
                    param.id = this.toSave.id;
                }
                if(this.toSave!=''&&param.settlementDay==this.toSave.settlementDay&&param.settlementType==this.toSave.settlementType&&this.busiCompId==this.toSave.settlementCompanyId){
                    this.$message({type:'success', message:'数据未修改!'
                    })
                    return ;
                }
                if(param.companyId == undefined||param.companyId==''){
                    param.companyId = userInfo().companyId;
                }
                if(param.settlementCompanyId==undefined){
                    this.$message({type:'error', message:'信息未填写完成，请继续填写!'
                    })
                    return ;
                }
                if(param.settlementType==0){
                    param.settlementDay = '';
                }
                param.settlementCompanyId = this.busiCompId;
                param.type = 1;
                const  res = await  saveSettlementDay(param);
                if(res.isSuccess==true){
                    this.$message({
                        type:'success',
                        message:'操作成功!'
                    });
                    this.toSave='';
                    this.loadData(this.initData);
                }else{
                    this.$message({
                        type:'error',
                        message:'操作失败!'
                    })
                }
            },

            batchDel(){
                this.delSucNum =0;
                this.multipleSelection.forEach((obj)=>this.del(obj.id));
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

            //查询收货地址
            async queryReciveAddress(){
                let param ={
                    "companyId":userInfo().companyId,
                    "pageIndex":this.currentPage,
                    "pageSize":this.pageSize
                };
                const res = await queryReciveMethodSetting(param);
                if(res.isSuccess){
                    this.tableData = res.result.results;
                }else{
                    this.$message({type:'error',message:'获取地址配置信息失败'});
                }
            },

            //添加卖家收货地址
            addBusiAddress(){
                this.form3 = {
                    id:'',
                    companyId:'',
                    busiCompanyId:'',
                    wareHouseId:'',
                    getPackageMethd:'',
                    address:'',
                    memo:''
                };
                this.addresses = [];
                this.options5 = [];

                this.queryWarehouseInfo();//查询仓库
                this.dialogVisible2 = true;

            },

            async queryWarehouseInfo(){
                let param = {
                    "params":{"companyId":userInfo().companyId},
                    "pageIndex":1,
                    "pageSize":100
                };
                const res = await  queryWarehouse(param);
                if(res.isSuccess){
                    this.warehouses = [];
                    var vos = res.result.results;
                    vos.forEach((obj)=>{
                        let pa = {
                            name:obj.name,
                            id:obj.id
                        }
                        this.warehouses.push(pa);
                    });
                }else{
                    this.$message({
                        type:'error',
                        message:'获取仓库数据失败'
                    });
                }
            },

            //查询卖家收货地址
            async queryAllBusiAddress(){
                this.addresses = [];
                if(this.form3.busiCompanyId==undefined||this.form3.busiCompanyId==''){
                    return;
                }
                let addrParam = {
                    "deliveryAddress":{
                        "companyId": this.form3.busiCompanyId
                    },
                    "pageIndex":1,
                    "pageSize":20
                };
                const addrRes = await queryDeliveryAddress(addrParam);
                if(addrRes.isSuccess){
                    var table = addrRes.result.results;
                    table.forEach((obj)=>{
                        var parameters = '';
                        if(obj.bdefault==1){
                            parameters = {
                                addr:obj.area + "/" + obj.detailAddress + "(默认收货地址)",
                                vo:obj
                            };
                        }else{
                            parameters = {
                                addr:obj.area + "/" + obj.detailAddress,
                                vo:obj
                            };
                        }
                        this.addresses.push(parameters);
                    });
                }
            },

            //确定添加卖家收货地址
            async addAddress(){
                if(this.form3.busiCompanyId==undefined||this.form3.busiCompanyId==''){
                    this.$message({
                        type:'error',
                        message:'请选择卖家'
                    });
                    return;
                }

                if(this.form3.getPackageMethd===0||this.form3.getPackageMethd==1){

                }else if(this.form3.getPackageMethd===''){
                    this.$message({
                        type:'error',
                        message:'请选择取货方式'
                    });
                    return;
                }

                if(this.form3.wareHouseId==undefined||this.form3.wareHouseId==''){
                    this.$message({
                        type:'error',
                        message:'请选择出货仓库'
                    });
                    return;
                }

                if(this.form3.getPackageMethd==1&&((this.form3.address==undefined||this.form3.address=='')&&(this.form3.memo==undefined||this.form3.memo==''))){
                    this.$message({
                        type:'error',
                        message:'请选择地址或者填写备注的形式添加地址'
                    });
                    return;
                }

                this.form3.companyId = userInfo().companyId;
                if(this.form3!=undefined){
                    const res = await saveReciveMethodSetting(this.form3);
                    if(res.isSuccess){
                        this.$message({
                            type:'info',
                            message:'添加成功'
                        });
                        this.dialogVisible2 = false;
                        this.queryReciveAddress();
                    }else{
                        this.$message({
                            type:'error',
                            message:res.errorMsg
                        });
                    }
                }
            },

            //修改地址
            modifyBusiAddress(index){
                this.mIndex = index;
                this.addressInfo = this.tableData[index];
                this.form3 = {
                    id:'',
                    companyId:'',
                    busiCompanyId:'',
                    wareHouseId:'',
                    getPackageMethd:'',
                    address:'',
                    memo:''
                };
                this.form3.id = this.addressInfo.id;
                this.options5=[{sellName:this.addressInfo.busiCompanyName,sellId:this.addressInfo.busiCompanyId}]
                this.form3.busiCompanyId = this.options5[0].sellId;
                this.queryAllBusiAddress();//获取所有收货地址

                var index = 0;
                if(this.addressInfo.getPackageMethd==0){
                    index = 0;
                }else if(this.addressInfo.getPackageMethd==1){
                    index = 1;
                }
                this.form3.getPackageMethd = this.deliveryTypes[index].tId;

                this.warehouses = [{id:this.addressInfo.wareHouseId,name:this.addressInfo.wareHouseName}];
                this.form3.wareHouseId = this.warehouses[0].id;

                this.queryWarehouseInfo();//查询仓库

                this.form3.address = this.addressInfo.address;
                this.form3.memo = this.addressInfo.memo;
                this.dialogVisible3 = true;
            },

            //确认修改收货地址
            async modifyAddressInfo(){
                if(this.addressInfo.busiCompanyId==this.form3.busiCompanyId&&this.addressInfo.wareHouseId==this.form3.wareHouseId&&this.addressInfo.getPackageMethd==this.form3.getPackageMethd&&this.addressInfo.address==this.form3.address&&this.addressInfo.memo==this.form3.memo){
                    this.$message({
                        type:'info',
                        message:'数据没有改变'
                    });
                    return;
                }

                if(this.form3.busiCompanyId==undefined||this.form3.busiCompanyId==''){
                    this.$message({
                        type:'error',
                        message:'请选择卖家'
                    });
                    return;
                }

                if((this.form3.getPackageMethd===0||this.form3.getPackageMethd==1)){

                }else if(this.form3.getPackageMethd===''){
                    this.$message({
                        type:'error',
                        message:'请选择取货方式'
                    });
                    return;
                }

                if(this.form3.wareHouseId==undefined||this.form3.wareHouseId==''){
                    this.$message({
                        type:'error',
                        message:'请选择出货仓库'
                    });
                    return;
                }

                if(this.form3.getPackageMethd==1&&((this.form3.address==undefined||this.form3.address=='')&&(this.form3.memo==undefined||this.form3.memo==''))){
                    this.$message({
                        type:'error',
                        message:'请选择地址或者填写备注的形式添加地址'
                    });
                    return;
                }



                this.form3.companyId = userInfo().companyId;
                const res = await saveReciveMethodSetting(this.form3);
                if(res.isSuccess){
                    this.$message({
                        type:'info',
                        message:'修改成功'
                    });
                    this.dialogVisible3 = false;
                    this.queryReciveAddress();
                }else{
                    this.$message({
                        type:'error',
                        message:'修改失败'
                    });
                }

            },

            //删除收货地址
            async delAddress(id){
                this.$confirm('确认删除对该卖家设置的收货地址信息？')
                    .then(_ => {
                        this.delInfo(id);
                    })
                    .catch(_ => {});

            },

            async delInfo(id){
                let param = {
                    id:id
                };
                const res = await deleteAddressInfo(param);
                if(res.isSuccess){
                    this.$message({
                        type:'info',
                        message:'删除成功'
                    });
                    this.queryReciveAddress();//获取所有收货地址
                }else{
                    this.$message({
                        type:'error',
                        message:'删除失败'
                    });
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

            async  remoteMethod(query){
                if(query!=''){
                    this.loading = true;
                    let param = {
                        "sellName":query,
                        "companyId":userInfo().companyId,
                        "pageIndex":1,
                        "pageSize":10
                    };
                    const res = await queryStallCustomer(param);
                    setTimeout(()=>{
                        this.options4 = [];
                        this.loading = false;
                        var table = res.result.results;
                        table.forEach((obj)=>{
                            if(obj.sellId!=undefined&&obj.sellId!=''){
                                this.options4.push(obj);
                            }
                        });
                        //this.options4 = res.result.results;
                    },200);
                }else{
                    this.options4 = [];
                }
            },

            async  remoteMethod2(query){
                if(query!=undefined&&query!=''){
                    this.options5 = [];
                    this.loading = true;
                    let param = {
                        "sellName":query,
                        "companyId":userInfo().companyId,
                        "pageIndex":1,
                        "pageSize":10
                    };
                    const res = await queryStallCustomer(param);
                    setTimeout(()=>{
                        this.loading = false;
                        var table = res.result.results;
                        table.forEach((obj)=>{
                            if(obj.sellId!=undefined&&obj.sellId!=''){
                                this.options5.push(obj);
                            }
                        });
                        //this.options5 = res.result.results;
                    },200);
                }else{
                    this.options5 = [];
                }
            },

        },

        computed : {
            spanValue : function() {
                return this.inputValue + '.00';
            }
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/MSConfig';
</style>
