<template>
    <div class="fillcontain">
        <ul class="menu">
            <li v-if="getMenuAuthFun('currentInventory')">
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
            <li class="menuIndex" v-if="getMenuAuthFun('inventoryInitialize')">
                <router-link :to='{path:"/inventoryInitialize"}'>库存初始化</router-link>
            </li>
        </ul>
        <div class="inventoryInitialize">

            <div class="initializeButton">
                <a href="javascript:void(0)" class="buttonColor" @click="dialogImport = true" v-if="initend">导入库存表</a>
                <!--<input type="file" id="uploatfile" @change="importf" >-->
                <a href="javascript:void(0)" class="buttonColor" @click="toAddProduct" v-if="initend">添加商品</a>
                <a href="javascript:void(0)" :class="{'buttonColor':isA,'colorend': !isA}" :style="{color:'colorend'}" @click="dialogVisiblechu">初始化完成</a>
                <sup>(注意：库存初始化只能操作一次，初始化后，不能再次初始化)</sup>
            </div>
            <div class="initializeTable">
                <el-table
                :data="alltableData"
                style="width: 100%">
                <el-table-column
                    label="主图/货号">
                    <template scope="scope">
                        <div class="flex2">
                        	<img v-if="scope.row.imgUrl_main != ''" :src="scope.row.imgUrl_main" alt="">
                            <img v-else src="../image/product_default.png" alt="">
                            <p>{{scope.row.productCode}}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="商品名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="colour"
                    label="颜色"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="size"
                    label="尺码"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="stockNum"
                    label="初始库存数量">
                </el-table-column>
                <el-table-column
                    prop="purchasePrice"
                    label="初始化单价">
                </el-table-column>
                <el-table-column
                    prop="stockPrice"
                    label="当前库存总金额">
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
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
            <a href="javascript:void(0)" class="export_excle" @click="exportDataForExcel">导出excel</a>
        </div>
        <el-dialog
            title="库存初始化确认"
            :visible.sync="dialogVisible"
            size="tiny">
            <span>确认完成初始化？</span>
            <p>完成后，不能再次操作初始化</p>
            <span slot="footer" class="dialog-footer flex2">
                <a href="javascript:void(0)" class="buttonColor" @click="initStock">确 定</a>
                <a href="javascript:void(0)" class="buttonColor2" @click="dialogVisible = false">取 消</a>
              </span>
        </el-dialog>
        <el-dialog
            title="添加新商品"
            :visible.sync="dialogNewCommodity"
            size="small" :close-on-click-modal="false">
            <div class="newCommodity">
                <el-form ref="form" :model="form" label-width="210px">
                    <el-form-item label="商品货号：">
                        <el-input v-model="form.productCode" class="newInput"></el-input>
                    </el-form-item>
                    <el-form-item label="商品名称：">
                        <el-input v-model="form.productName" class="newInput"></el-input>
                    </el-form-item>
                    <el-form-item label="商品主图：">
                        <el-upload v-model="form.imgUrl_main"
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <el-table
                    height="160"
                    :data="tableData2"
                    style="width: 100%">
                    <el-table-column
                        prop="colour"
                        label="颜色">
                        <template scope="scope">
                            <el-input v-model="scope.row.colour"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="size"
                        label="尺码">
                        <template scope="scope">
                            <el-input v-model="scope.row.size"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="stockNum"
                        label="初始库存数量">
                        <template scope="scope">
                            <el-input v-model="scope.row.stockNum"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="purchasePrice"
                        label="初始化单价">
                        <template scope="scope">
                            <el-input v-model="scope.row.purchasePrice"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template scope="scope">
                            <img src="../image/delete03.png" alt=""  @click="delVariant(scope.$index, scope.row)">
                        </template>
                    </el-table-column>
                </el-table>
                <a href="javascript:void(0)" class="blue2 right" @click="addVariant">+添加规格</a>
            </div>
            <span slot="footer" class="dialog-footer flex2">
                <a href="javascript:void(0)" class="buttonColor" @click="addProduct">确认添加</a>
                <a href="javascript:void(0)" class="buttonColor2" @click="dialogNewCommodity = false">取 消</a>
              </span>
        </el-dialog>
        <el-dialog
            title="导入库存表"
            :visible.sync="dialogImport"
            size="tiny">
            <div class="dialogImport">
                <div class="importFirst">
                    <div class="flex">
                        <p>选择文件上传：</p>

                    </div>
                    <div class="flex3" style="align-items: flex-start">
                        <div class="uploatName flex">
                        </div>
                    </div>
                    <div class="uploatButton">
                        <input type="file" id="uploatfile" @change="importf" >
                        <div class="flex2 importUploat">
                            <img src="../image/Download01.png" alt="">
                            <p>上传文件</p>
                        </div>
                    </div>
                </div>
                <div class="importTips">
                    支持扩展名：.xlsx,.xls,.exe
                </div>
                <div class="importDownload">
                    <a href="http://cws.nabei.net:8103/stock/fileTemplate/initStock.xlsx" class="flex2">下载模版</a>
                </div>
            </div>
            <span slot="footer" class="dialog-footer flex2">
                <a href="javascript:void(0)" class="buttonColor" @click="dialogImport = false">确 定</a>
                <a href="javascript:void(0)" class="buttonColor2" @click="dialogImport = false">取 消</a>
              </span>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {initStocksByVariants} from '@/api/getData'
    import {export_json_to_excel} from '../vendor/Export2Excel.js'
    import {userInfo,getStore,setStore} from  '../config/mUtils'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'

    const _XLSX = require('xlsx')
    const X = typeof XLSX !== 'undefined' ? XLSX : _XLSX;

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                form: {
                    name: '',
                    table:[{
                        color:'白色',
                    }]
                },
                input:'',
                imageUrl: '',
                isA:true,
                initend: true,
                dialogNewCommodity:false,
                dialogVisible:false,
                dialogImport:false,
                tableData: [],
                tableData2:[],
                alltableData:[],
                 //默认每页数据量
                pageSize: 10,
                //默认高亮行数据id
                highlightId: -1,
                //当前页码
                currentPage: 1,
                //查询的页码
                start: 1,
                //默认数据总数
                totalCount: 1

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
                // console.log(`当前页: ${val}`);
                this.currentPage=val;
                this.alltableData=[];
               for(var i=(this.currentPage-1)*this.pageSize;i<(this.currentPage-1)*this.pageSize+this.pageSize;i++){
                 if(!this.tableData[i].productCode){
                     this.alltableData.push(this.tableData[i]);
                 }

               }
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            async importf(){
                var newObj;
                this.dialogImport = false;
                let importExcelData = [];
                let obj = document.getElementById("uploatfile");
                var wb;//读取完成的数据
                var rABS = false; //是否将文件读取为二进制字符串
                if(!obj.files) {
                    return;
                }
                var f = obj.files[0];
                var reader = new FileReader();
                reader.onload =(e) =>{
                    var data = e.target.result;
                    if(rABS) {
                        wb = X.read(btoa(fixdata(data)), {//手动转化
                            type: 'base64'
                        });
                    } else {
                        wb = X.read(data, {
                            type: 'binary'
                        });
                    }

                    //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
                    //wb.Sheets[Sheet名]获取第一个Sheet的数据
                    importExcelData =  X.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                    console.log(importExcelData);
                    importExcelData.forEach((obj)=>{
                        // 主图 货号  商品名称  颜色  尺码  初始化库存 初始化单价 当前库存总金额
                      newObj={
                        productCode : obj.货号,
                        title : obj.商品名称,
                        colour : obj.颜色,
                        size : obj.尺码,
                        stockNum : obj.初始库存数量,
                        purchasePrice : obj.初始化单价,
                        stockPrice : obj.初始化单价*obj.初始库存数量,
                        companyId : userInfo().companyId,
                        warehouseId : userInfo().warehouseId,
                        }
                        this.tableData.push(newObj);
                        this.totalCount = this.tableData.length;
                    });
                        if(this.tableData.length>this.pageSize){
                            for(var i =0;i<this.pageSize;i++){
                                this.alltableData.push(this.tableData[i]);
                            }
                        }else{
                            for(var i=0;i<this.tableData.length;i++){
                                this.alltableData.push(this.tableData[i]);
                            }
                        }
                    if(this.tableData.length == 0){
                        this.$message({type:'error',message:'没有数据!'})
                    };

                };

                if(rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                };

            },

            fixdata(){ //文件流转BinaryString
                var o = "",
                    l = 0,
                    w = 10240;
                for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
                o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
                return o;
            },
             addProduct(){
                if(this.form.productCode&&this.form.productName&& this.tableData2.length>0){
                    let stockInfo =  [];
                    this.tableData2.forEach((obj)=>{
                        if(JSON.stringify(obj) == "{}"){
                            this.$message({type:'error',message:'规格填写不正确,请检查！'})
                            return ;
                        }
                        obj.productCode =this.form.productCode;
                        obj.imgUrl_main = this.form.imgUrl_main;
                        obj.title = this.form.productName;
                        obj.stockPrice = obj.stockNum*obj.purchasePrice
                        obj.companyId = userInfo().companyId;
                        obj.warehouseId = userInfo().warehouseId;
                        stockInfo.push(obj);
                    })
                    this.alltableData = this.alltableData.concat(stockInfo)
                    this.dialogNewCommodity = false
                }else{
                    this.$message({type:'error',message:'填写不正确！'})
                }


            },
            delVariant(index, row){
               this.tableData2.splice(index,1,)
            },
            addVariant(){
                this.tableData2.push({})
            },
            toAddProduct(){
                this.form={};
                this.tableData2=[{}];
                this.dialogNewCommodity = true
            },
            dialogVisiblechu(){
                if(this.isA == false){
                    this.dialogVisible = false;
                }else{
                    this.dialogVisible = true;
                    }
            },
            async initStock(){
                this.dialogVisible = false;
                this.initend = false;
                this.isA = false;
                let param = this.alltableData;
                const res = await initStocksByVariants(param);
                if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: '初始化完成！'
                    });
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },

            exportDataForExcel() {
                const list = this.tableData;
                const tHeader = ['货号', '商品名称', '颜色', '尺码', '初始库存数量', '初始化单价', '当前库存总金额'];
                const filterVal = ['productCode', 'title', 'colour', 'size', 'stockNum', 'purchasePrice', 'stockPrice'];
                const data = this.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, '库存初始化列表');
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
    @import '../style/inventoryInitialize';
</style>
