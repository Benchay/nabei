<template>
    <div class="fillcontain">
        <ul class="menu">
            <li v-if="getMenuAuthFun('userCenter')" class="menuIndex3">
                <router-link :to='{path:"/userCenter"}'>客户管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('companyManagement')">
                <router-link :to='{path:"/companyManagement"}'>公司管理</router-link>
            </li>
        </ul>
        <div class="userCenter">
            <div>
                <div class="userCenterTop">
                    <div class="left" >
                        <el-date-picker
                            size="small"
                            v-model="filters.date.startDate"
                            type="date"
                            placeholder="选择开始日期"
                            :picker-options="startDateBefore"
                            >
                        </el-date-picker>
                        -
                        <el-date-picker
                            size="small"
                            v-model="filters.date.endDate"
                            type="date"
                            placeholder="选择截止日期"
                            :picker-options="startDateAfter"
                            @change="handleIconClickDate"
                        >
                        </el-date-picker>
                    </div>
                    <div class="left usercenter-idsearch">
                        <el-input
                            size="small"
                            placeholder="编号搜索"
                            icon="search"
                            v-model="idSearch"
                            :on-icon-click="handleIconClickId">
                        </el-input>
                    </div>
                    <div class="left usercenter-usersearch">
                        <el-input
                            size="small"
                            placeholder="用户名搜索"
                            icon="search"
                            v-model="userSearch"
                            :on-icon-click="handleIconClickUser">
                        </el-input>
                    </div>
                    <div class="left usercenter-compsearch">
                        <el-input
                            size="small"
                            placeholder="公司名称搜索"
                            icon="search"
                            v-model="compSearch"
                            :on-icon-click="handleIconClickComp">
                        </el-input>
                    </div>
                </div>
                <div class="userInfoTable" id="userDetailVO">
                    <el-table
                        ref="multipleTable"
                        :data="userDetailVO"
                        tooltip-effect="dark"
                        style="width: 100%"
                        >
                        <el-table-column class="selecttd"
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            prop="nickName"
                            label="姓名"
                           >
                        </el-table-column>
                        <el-table-column
                            prop="userName"
                            label="用户名"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="compName"
                            label="公司名称"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="roleName"
                            label="角色"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="mobile"
                            label="联系电话"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="status"
                            label="用户状态"
                            :formatter="preparedData"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="createTime"
                            label="注册时间"
                            :formatter="formatDate"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column :class="optd == isFalse"
                            prop="company"
                            label="操作"
                            show-overflow-tooltip>
                            <template scope="scope">
                                <el-button
                                    size="small"
                                    @click="showEditUser(scope.$index)">编辑</el-button>
                                <!--<el-button-->
                                    <!--size="small"-->
                                    <!--type="danger"-->
                                    <!--@click="delUser(scope.row.userId)">删除</el-button>-->
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
                <a href="javascript:void(0)" class="export_excle">导出excel</a>
                <!--<el-button class="button" type="primary" @click="print" size="small">打印</el-button>-->
                <el-dialog title="编辑" :visible.sync="dialogEditVisible" custom-class="dialogSize" >
                    <div class="edit">
                        <el-col :span="24">
                        </el-col>
                        <el-col :span="24" >
                            <el-col :span="12" class="flex2">
                                <el-col :span="5"><span>用户名：</span></el-col>
                                <el-col :span="14">
                                    <el-input
                                        placeholder="请输入用户名"
                                        v-model="account">
                                    </el-input>
                                </el-col>
                            </el-col>
                        </el-col>

                        <el-col :span="24" style="padding-top: 20px;">
                            <el-col :span="12" class="flex2">
                                <el-col :span="5"><span>用户名称：</span></el-col>
                                <el-col :span="14">
                                    <el-input
                                        placeholder="请输入用户名称"
                                        v-model="name"
                                        >
                                    </el-input>
                                </el-col>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="padding-top: 20px;">
                            <el-col :span="12" class="flex2">
                                <el-col :span="5"><span>用户状态：</span></el-col>
                                <el-col :span="14">
                                    <el-radio class="radio" v-model="radio" :label="1">启用</el-radio>
                                    <el-radio class="radio" v-model="radio" :label="0" style="margin-left:10px;">禁用</el-radio>
                                </el-col>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="padding-top: 20px;">
                            <el-col :span="12" class="flex2">
                                <el-col :span="5"><span>公司名称：</span></el-col>
                                <el-col :span="14">
                                    <el-input
                                        placeholder="请输入公司名称"
                                        v-model="companyName"
                                        :disabled="this.compStatus"
                                    >
                                    </el-input>
                                </el-col>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="padding-top: 20px;">
                            <el-col :span="12" class="flex2">
                                <el-col :span="5"><span>角色名称：</span></el-col>
                                <el-col :span="14">
                                    <el-input
                                        placeholder="请输入角色名称"
                                        :disabled="this.roleStatus"
                                        v-model="roleName"
                                    >
                                    </el-input>
                                </el-col>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="padding-top: 20px;">
                            <el-col :span="12" class="flex2">
                                <el-col :span="5"><span>联系电话：</span></el-col>
                                <el-col :span="14">
                                    <el-input
                                        placeholder="请输入联系电话"
                                        v-model="phone">
                                    </el-input>
                                </el-col>
                            </el-col>
                        </el-col>


                        <div slot="footer" class="dialog-footer flex2" style="overflow: hidden;width:100%;padding-top: 20px;">
                            <el-button type="primary" @click="saveInfo">保存</el-button>
                            <el-button  @click="dialogEditVisible = false">取消</el-button>
                        </div>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {queryUserInfo,delUserInfo,saveUserInfo} from '@/api/getData'
    import {mapActions, mapState} from 'vuex'
    import {formatDate} from '../utils/date.js'
    import {getLodop}   from '../Lodop/LodopFuncs.js'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                filters:{
                    date:{
                        startDate:'',
                        endDate:''
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
                compStatus:'',
                roleStatus:'',
                dialogEditVisible:false,
                dialogDelete:false,
                userDetailVO:[],
                radio:'1',
                startDate:'',
                endDate:'',
                //日期
                dateValue:'',
                //编号搜索
                idSearch:'',
                //用户名搜索
                userSearch:'',
                //公司名称搜索
                compSearch:'',
                //列表数据
                tableData3:[],
                pageSize:8,
                //默认高亮行数据id
                highlightId: -1,

                //当前页码
                currentPage: 1,

                //查询的页码
                start: 1,

                //默认数据总数
                totalCount: 0,
                startDate:'',
                endDate:'',
                multipleSelection: [],
                name:'',
                userStatus:'',
                userId:'',
                compId:'',
                roleId:'',
                companyName:'',
                roleName:'',
                account:'',
                phone:'',
                LODOP:''
            }
        },
        mounted(){
            let param = {
                "startDate":'',
                "endDate":'',
                "userId":'',
                "userName":'',
                "compName":'',
                "page":this.currentPage,
                "pageSize":this.pageSize
            };
            this.loadData(param);
        },
        methods: {
        	getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
            },
            //每页显示总数变换
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                let param = {
                    "startDate":'',
                    "endDate":'',
                    "userId":'',
                    "userName":'',
                    "compName":'',
                    "page":this.currentPage,
                    "pageSize":this.pageSize
                };
                this.loadData(param);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //按日期搜索
            handleIconClickDate(){
                let param = {
                    "startDate":this.filters.date.startDate,
                    "endDate":this.filters.date.endDate,
                    "userId":'',
                    "userName":'',
                    "compName":'',
                    "page":this.currentPage,
                    "pageSize":this.pageSize
                };
                this.loadData(param);
            },
            //页码变换
            handleCurrentChange:function(val) {
                this.currentPage = val;
                let param = {
                    "startDate":this.startDate,
                    "endDate":this.endDate,
                    "userId":this.idSearch,
                    "userName":this.userSearch,
                    "compName":this.compSearch,
                    "page":this.currentPage,
                    "pageSize":this.pageSize
                };
                this.loadData(param);
            },
            //编号搜索
            handleIconClickId(){
                let param = {
                    "startDate":'',
                    "endDate":'',
                    "userId":this.idSearch,
                    "userName":'',
                    "compName":'',
                    "page":this.currentPage,
                    "pageSize":this.pageSize
                };
                this.loadData(param);
            },
            //用户搜索
            handleIconClickUser(){
                let param = {
                    "startDate":'',
                    "endDate":'',
                    "userId":'',
                    "userName":this.userSearch,
                    "compName":'',
                    "page":this.currentPage,
                    "pageSize":this.pageSize
                };
                this.loadData(param);
            },
            //公司编号搜索
            handleIconClickComp(){
                let param = {
                    "startDate":'',
                    "endDate":'',
                    "userId":'',
                    "userName":'',
                    "compName":this.compSearch,
                    "page":this.currentPage,
                    "pageSize":this.pageSize
                };
                this.loadData(param);
            },
            //用户数据加载
            async loadData(param){
                const res = await queryUserInfo(param);
                if(res.isSuccess==true){
                    this.userDetailVO = res.result.user;
                    this.totalCount = res.result.totalCount;
                }
            },
            //编辑用户
            async showEditUser(index){
                this.dialogEditVisible = true;
                this.userId = this.userDetailVO[index].userId;
                this.compId = this.userDetailVO[index].compId;
                this.roleId = this.userDetailVO[index].roleId;
                this.account = this.userDetailVO[index].userName;
                this.name = this.userDetailVO[index].nickName;
                this.radio = this.userDetailVO[index].status ;
                this.companyName = this.userDetailVO[index].compName;
                this.roleName = this.userDetailVO[index].roleName;
                this.phone = this.userDetailVO[index].mobile;

                if(this.compId==null||this.compId ==''){
                    this.compStatus = true;
                    this.companyName = "您当前没加入任何公司";
                }else{
                    this.compStatus = false;
                }
                if(this.roleId==null||this.roleId==''){
                    this.roleStatus = true;
                    this.roleName = "您当前还不具有任何角色";
                } else{
                    this.roleStatus = false;
                }

            },
            //保存信息
            async saveInfo(){
                this.dialogEditVisible = false;
                let param={
                    "userId":this.userId,
                    "compId":this.compId,
                    "roleId":this.roleId,
                    "userName":this.account,
                    "nickName":this.name,
                    "mobile":this.phone,
                    "compName":this.companyName,
                    "roleName":this.roleName,
                    "status":this.radio
                }
                const res = await saveUserInfo(param);
                if(res.isSuccess){
                    //alert("success");
                }else{
                    this.$message({
                        type:'info',
                        message:res.errorMsg
                    });
                }
            },
            preparedData:function(row,column){
                let data = row[column.property];
                if(data==0){
                    data = '禁用';
                }else if(data==1){
                    data = '启用';
                }
                return data;
            },
            //删除用户
            delUser(val){
                this.dialogDelete = true;
                this.$confirm('是否强制删除该用户以及用户的所有关联信息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRow(val);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            async deleteRow(val){
                const res = await delUserInfo({userId:val});
                if(res.isSuccess){
                    this.$message({
                        type:'info',
                        message:res.result.msg
                    });
                }
            },
//            print(){
//                LODOP = getLodop();
//                this.createForm();
//                LODOP.PREVIEW();
//
//            },
//            createForm(){
//                this.LODOP = getLodop();
//                LODOP.PRINT_INIT('打印测试');
//                LODOP.SET_PRINT_PAGESIZE(0, 0, 0, "A4"); //规定纸张大小,第一个参数打印横纵向可自选
//                LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED",1);//横向时的正向显示
//                console.log(document.getElementById("userDetailVO").innerHTML);
//
//                var strStyle = "<style>"
//                               + ".optd{:class='optd':false;}"
//                               + ".selecttd{font-size: 12px;display:none;}"
//                               + "</style>";
//                LODOP.ADD_PRINT_HTM(0,0,200,'100%',strStyle + document.getElementById("userDetailVO").innerHTML);
//            },
            //数据格式化
            formatDate:function(row, column) {
                let data = row[column.property];
                if (data == undefined||data=='') {
                    return "";
                }
                var date2 = new Date(data);
                return formatDate(date2,'yyyy-MM-dd hh:mm:ss');
            }

        },
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/userCenter';
</style>
