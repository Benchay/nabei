<template>
    <div class="fillcontain">
        <ul class="menu">
            <li class="menuIndex" v-if="getMenuAuthFun('currentInventory')">
                <router-link :to='{path:"/currentInventory"}'>当前库存</router-link>
            </li>
            <li v-if="getMenuAuthFun('inventoryDetail')">
                <router-link :to='{path:"/inventoryDetail"}'>库存变动</router-link>
            </li>
            <li v-if="getMenuAuthFun('stocktaking')">
                <router-link :to='{path:"/stocktaking"}'>库存盘点</router-link>
            </li>
            <li v-if="getMenuAuthFun('stockTransshipment')">
                <router-link :to='{path:"/stockTransshipment"}'>库存调拨</router-link>
            </li>
            <li v-if="getMenuAuthFun('inventoryWarning')">
                <router-link :to='{path:"/inventoryWarning"}'>库存预警</router-link>
            </li>
            <li v-if="getMenuAuthFun('storeManagement')">
                <router-link :to='{path:"/storeManagement"}'>多仓管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('inventoryInitialize')">
                <router-link :to='{path:"/inventoryInitialize"}'>库存初始化</router-link>
            </li>
        </ul>
        <div class="currentInventory">
            <div class="inventoryTop">
                <div class="left">
                    <el-input placeholder="商品名称搜索" size="small" icon="search" v-model="productName" :on-icon-click="handleIconClick">
                    </el-input>
                    <el-input placeholder="商品货号搜索" size="small" icon="search" v-model="productCode" :on-icon-click="handleIconClick">
                    </el-input>
<!--                     <el-input placeholder="库存位置搜索" size="small" icon="search" v-model="name" :on-icon-click="handleIconClick">
                    </el-input> -->
                </div>
            </div>
            <div class="fastTable">
                <el-table 
                	:data="tableData"
                	max-height="490"
                	style="width: 100%">
                    <el-table-column prop="CommodityFigure" width="200" label="主图/货号">
                        <template scope="scope">
                            <div>
                                <el-popover
                                    v-if="scope.row.imgUrl_main != ''"
                                    ref="popover1"
                                    placement="right"
                                    width="210"
                                    trigger="hover">
                                    <div class="flex2">
                                    	<img v-if="scope.row.imgUrl_main != ''" :src="scope.row.imgUrl_main" alt=""  style="width:200px;height: 200px;">
                                        <img v-else src="../image/product_default.png" alt=""  style="width:200px;height: 200px;">
                                    </div>
                                </el-popover>
                            </div>
                            <div class="flex CommodityFigure" style="padding: 3px;">
                            	<img v-if="scope.row.imgUrl_main != ''" :src="scope.row.imgUrl_main" alt="" v-popover:popover1>
                                <img v-else src="../image/product_default.png" alt="" v-popover:popover1>
                                <p>{{scope.row.productCode}}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="title" label="商品名称" width="220">
                    </el-table-column>
                    <el-table-column prop="stockNum" sortable label="当前库存">
                    </el-table-column>
       <!--              <el-table-column prop="" label="在途数">
                    </el-table-column> -->
                    <el-table-column  label="当前库存金额">
                        <template scope="scope">
                            {{scope.row.purchasePrice?(scope.row.purchasePrice*scope.row.stockNum).toFixed(2):'--'}}
                        </template>
                    </el-table-column>
                    <el-table-column width="200" label="库存位置">
                        <template scope="scope">
                            <div class="flex2" style="justify-content: flex-start;">
                                <p>{{scope.row.warehouseSeatName}}</p>
                                <img src="../image/kicon01.png" alt="" class="chooseDepot" @click="getWarehouseData(tableData[scope.$index])">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="220">
                        <template scope="scope">
                            <a href="javascript:void(0);" class="blue2" @click="showDialogDetail(tableData[scope.$index])">查看详情</a>
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
                :page-size="pageSize"
                layout="total,sizes, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>

            <a href="javascript:void(0)" class="export_excle" @click="exportDataForExcel">导出excel</a>
            <div style="height:160px;">
                &nbsp;
            </div>
        </div>
        <el-dialog title="查看详情" :visible.sync="dialogDetails" size="small">
            <div class="flex detailsContent">
                <img v-if="imgUrl_main != ''" :src="imgUrl_main" alt="">
                <img v-else src="../image/product_default.png" alt="">
                <div class="detailsContent-1">
                    <p>商品货号：{{produceDetailCode}}</p>
                    <p style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;width: 550px;">商品名称：{{produceDetailName}}</p>
                    <p>成本价：{{purchasePrice}}</p>
                </div>
            </div>
            <div style="margin-top: 20px;padding-bottom: 40px">
                <!--<el-table :data="tableData1" border style="width: 100%" max-height="300">
                    <el-table-column prop="colour" label="颜色">
                    </el-table-column>
                    <el-table-column prop="size" label="尺码">
                    </el-table-column>
                    <el-table-column prop="stockNum" label="数量">
                    </el-table-column>
                </el-table>-->

                <div class="currentTable">
                    <el-col :span="24">
                        <el-col :span="2">&nbsp;</el-col>
                        <div class="currentFlex">
                            <div  v-for="item in size">{{item}}</div>
                        </div>
                    </el-col>

                    <el-col v-for="(item,index) in colors" :span="24" class="flex gunDong">
                        <el-col :span="2" class="flex3">
                            <div>{{colorName[index]}}</div>
                        </el-col>
                        <el-col :span="22" class="currentFlex currentFlex1">
                            <div  v-for="(obj,nIndex) in item">{{
                                obj.stockNum
                                }}</div>
                        </el-col>
                    </el-col>
                </div>
            </div>
        </el-dialog>
        <el-dialog title="选择仓位" :visible.sync="dialogChoose" size="tiny">
            <div class="chooseRadio radioGreen">
                <el-col :span="5" v-model="radioGreen" class="radioGreen">
                    <!-- <el-radio v-for="seat in stockSeats" class="radio" v-model="seatRadio" :label="seat.name"  :key="seat.id" :value="seat.id"></el-radio>-->
                    <el-radio v-for="list in stockSeats" class="radio" v-model="seatRadio" :label="list.id"><span>{{list.name}}</span></el-radio>
                </el-col>
                <el-col :span="15" style="text-align: center; margin-top: 15px;" v-if="stockSeats.length==0">
                	无数据
                </el-col>
            </div>
            <div slot="footer" class="dialog-footer flex2">
                <a href="javascript:void(0)" @click="updateWarehouseSeat(seatRadio)" class="buttonColor">确 定</a>
                <a href="javascript:void(0)" @click="dialogChoose = false" class="buttonColor2">取 消</a>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import { queryProductStock, queryProductInfo, queryWarehouseSeat, updateStockWareHouseSeatInfo} from '@/api/getData'
    import { export_json_to_excel } from '../vendor/Export2Excel.js'
    import { userInfo, getStore, setStore } from '../config/mUtils'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                imgUrl_main:'',
                radio: '',
                input1: '',
                radioGreen: '',
                productCode: '',
                productName: '',
                name: '',
                dialogChoose: false,
                dialogDetails: false,
                dialogLocation: false,
                produceDetailName: '',
                produceDetailCode: '',
                tableData: [{
                    location: '【档口仓库】男装区域'
                }],
                tableData1: [],
                datalist: [],
                purchasePrice:'',
                warehouseSeatId: '',
                seatRadio: '',
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
                stockSeats: [],
				initData: {
					"companyId": userInfo().companyId,
					"warehouseId": userInfo().warehouseId,
					"pageIndex": this.currentPage,
					"pageSize": this.pageSize
				},
                param: {

                        "companyId": userInfo().companyId,
                        "warehouseId": userInfo().warehouseId,
                        "pageIndex":1,
                        "pageSize": 10
                },
                colors:[],
                size:[],
                colorName:[]
            }
        },
        mounted() {
            this.initloadData(this.param);
			this.param.params = {"companyId": userInfo().companyId, "warehouseId": userInfo().warehouseId};
            this.queryWarehouseSeat(this.param);
        },
        watch: {
            '$route': function (route) {
                if(route.path=='/currentInventory'){
                    this.initloadData(this.param);
                }
            }
        },
        methods: {
            getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.initloadData()
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.initloadData()
            },
            //从服务器获取数据
            async initloadData(initData) {
				if(initData==''){
					initData = this.param;
				}
                const res = await queryProductStock(initData);
                if(res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: '数据加载成功！'
                    });
                    this.tableData = res.result.results;
                    this.totalCount = res.result.totalCount;
                    //this.rechangeData();
                } else {
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            async queryWarehouseSeat(param) {
                const res = await queryWarehouseSeat(param);
                if(res.isSuccess == true) {
                    let warehouseList = res.result.results;
                    for(let i=0;i<warehouseList.length;i++){
                        if(warehouseList[i].name != null){
                            this.stockSeats.push(warehouseList[i]);
                        }
                    }
                } else {
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            async updateWarehouseSeat(name) {
                let WarehouseSeat = {
                    "companyId": userInfo().companyId,
                    "productCode": this.productCode,
                    "warehouseSeatId": this.seatRadio,
                    "warehouseId": userInfo().warehouseId
                }
                const res = await updateStockWareHouseSeatInfo(WarehouseSeat);
                if(res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: res.result.msg
                    });
                    this.dialogChoose = false;
                    let params = {
						"companyId": userInfo().companyId,
						"warehouseId": userInfo().warehouseId,
						"pageIndex": this.currentPage,
						"pageSize": this.pageSize
					};
                    this.initloadData(params);
                } else {
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },

            getWarehouseData(param) {
            	this.dialogChoose = true;
                this.warehouseSeatId = param.warehouseSeatId;
                this.seatRadio = param.warehouseSeatId;
                this.productCode = param.productCode;
                
            },
            handleIconClick(ev) {
                let param = {
                    companyId: userInfo().companyId,
                    warehouseId: userInfo().warehouseId,
                    pageIndex: this.currentPage,
                    pageSize: this.pageSize
                }
                if(this.productCode != '') {
                    param.productCode = this.productCode
                }
                if(this.productName != '') {
                    param.productName = this.productName
                }
                if(this.name != '') {
                    param.wareHouseSeatName = this.name
                }
                this.initloadData(param);
            },
            //页码变更
            handleCurrentChange: function(val) {
                this.currentPage = val;
                let param = {
                    "companyId": userInfo().companyId,
                    "warehouseId": userInfo().warehouseId,
                    "pageSize": this.pageSize,
                    "pageIndex": this.currentPage,
                };
                this.initloadData(param);

            },

            checkColors(val){
                for(var i = 0;i<this.colors.length;i++){
                    if(this.colors[i].value==val){
                        return true;
                    }
                }
                return false;
            },

            checkSizes(val){
                for(var i = 0;i<this.sizes.length;i++){
                    if(this.sizes[i].value==val){
                        return true;
                    }
                }
                return false;
            },

            async showDialogDetail(rows) {

                let param = {
                    companyId: userInfo().companyId,
                    warehouseId: userInfo().warehouseId,
                    productCode: rows.productCode
                }
                const res = await queryProductInfo(param);
                if(res.isSuccess == true) {
                    this.colors = [];
                    this.size =[];
                    this.colorName=[];
                    this.tableData1 = [];


                    this.tableData1 = res.result;
                    this.produceDetailName = rows.title;
                    this.produceDetailCode = rows.productCode;
                    this.purchasePrice = rows.purchasePrice;

                    this.imgUrl_main = rows.imgUrl_main;

                    let len = this.tableData1.length;
                    // 尺码分类
                    for (let i = 0; i < len; i ++ ) {
                        var item = this.tableData1[i];
                        if(this.size.indexOf(item.size)<0) {// 如果尺码数组中不存在
                            this.size.push(item.size);
                        }
                    }

                    // size排序
                    this.size.sort();
                    console.log(this.size);

                    // 颜色分类
                    for (let i = 0; i < len; i ++ ) {
                        var item = this.tableData1[i];
                        if(this.colorName.indexOf(item.colour)<0) {// 如果颜色数组中不存在
                            this.colorName.push(item.colour);
                        }
                    }
                    console.log(this.colorName);

                    // 创建二维数组,外层为颜色个数
                    for (var i = 0; i < this.colorName.length; i++) {
                        var arr1 = [];
                        var colour = this.colorName[i];
                        for (var j = 0; j < this.size.length; j++) {
                            var size = this.size[j];
                            // 修改个数直接改数组中的item.stockNum
                            var item = {
                                size:size,
                                colour:colour,
                                stockNum:""
                            }

                            for (var k = 0; k < this.tableData1.length; k++) {
                                var item1 = this.tableData1[k];
                                if (item1.colour == colour && item1.size == size) {
                                    item = item1;
                                    break;
                                }
                            }
                            arr1.push(item);
                        }
                        this.colors.push(arr1);
                    }

                    console.log(this.colors);

                    this.dialogDetails = true;

                } else {
                    this.$message({
                        type: 'error',
                        message: '数据加载出错，请联系管理员！'
                    });
                }
            },
            rechangeData() {
                this.tableData = [];
                for(let i = 0; i < this.datalist.length; i++) {
                    let data = this.datalist[i];
                    let obj = [];
                    for(let j = 0; j < this.datalist[i].productVariants.length; j++) {
                        let o = this.datalist[i].productVariants[j];
                        let color = "";
                        let tempsize = "";
                        let stockNum = "";
                        if(o.colour) {
                            color = o.colour;
                        }
                        if(o.size) {
                            tempsize = o.size;
                        }
                        if(o.stockNum) {
                            stockNum = o.stockNum;
                        }
                        let variant = {
                            colour: color,
                            size: tempsize,
                            num: stockNum
                        };
                        obj.push(variant);
                    }
                    let element = {
                        numbers: data.productCode,
                        name: data.title,
                        money: '',
                        inventory: data.stockNum,
                        location: data.name,
                        variantValue: obj,
                        stockPrice: data.stockPrice
                    }
                    this.tableData.push(element);
                }
            },
            exportDataForExcel() {
                var  list = this.tableData;
				list.forEach((obj)=>{
					obj.stockPrice = obj.sellPrice?obj.sellPrice*obj.stockNum.toFixed(2):'--'
					//obj.onWay = '--' //TODO
				});

                const tHeader = ['商品货号','商品名称','当前库存','当前库存金额', '库存位置'];
                const filterVal = [ 'productCode','title', 'stockNum', 'stockPrice', 'name'];
                const data = this.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, '当前库存列表');
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/currentInventory';
</style>
