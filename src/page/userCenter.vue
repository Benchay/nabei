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
                    <div class="left usercenter-idsearch">
                        <el-input
                            size="small"
                            placeholder="用户名搜索"
                            icon="search"
                            v-model="searchUserName"
                            :on-icon-click="loadFirstPage">
                        </el-input>
                    </div>
                    <div class="left usercenter-usersearch">
                        <el-input
                            size="small"
                            placeholder="联系电话搜索"
                            icon="search"
                            v-model="searchMobile"
                            :on-icon-click="loadFirstPage">
                        </el-input>
                    </div>
                    <div class="left usercenter-compsearch">
                        <el-select v-model="searchUserStatus"
		                	placeholder="选择用户状态"
		                	size="small"
		                	@change="loadFirstPage"
		                	style="width:150px;">
						    <el-option
						        v-for="item in userStatusData"
						        :key="item.value"
						        :label="item.name"
						        :value="item.value">
						    </el-option>
						</el-select>
                    </div>
                    <div class="left usercenter-compsearch">
                        <el-input
                            size="small"
                            placeholder="邀请人搜索"
                            icon="search"
                            v-model="searchInvitorUserMobile"
                            :on-icon-click="loadFirstPage">
                        </el-input>
                    </div>
                    <div class="left usercenter-compsearch">
                        <el-select v-model="searchInviteType"
		                	placeholder="选择邀请类型"
		                	size="small"
		                	@change="loadFirstPage"
		                	style="width:150px;">
						    <el-option
						        v-for="item in inviteTypeData"
						        :key="item.value"
						        :label="item.name"
						        :value="item.value">
						    </el-option>
						</el-select>
                    </div>
                    <div class="left usercenter-compsearch">
                        <el-select v-model="searchInviteStatus"
		                	placeholder="选择邀请有效状态"
		                	size="small"
		                	@change="loadFirstPage"
		                	style="width:150px;">
						    <el-option
						        v-for="item in inviteStatusData"
						        :key="item.value"
						        :label="item.name"
						        :value="item.value">
						    </el-option>
						</el-select>
                    </div>
                </div>
                <div class="userInfoTable" id="userDetailVO">
                    <el-table
                        ref="multipleTable"
                        :data="userData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        >
                        <el-table-column class="selecttd"
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            prop="userName"
                            label="用户名"
                            >
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
                            label="注册时间">
                            <template scope="scope">
                                <el-popover
                                    ref="popover1"
                                    placement="top"
                                    width="200"
                                    trigger="hover"
                                    :content="formatDateTime(scope.row.createTime)">
                                </el-popover>
                                <p style="display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" v-popover:popover1>{{formatDateTime(scope.row.createTime)}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="inviteUserMobile"
                            label="邀请人"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="inviteType"
                            label="邀请类型"
                            :formatter="formatInviteType"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="inviteValid"
                            label="是否有效"
                            :formatter="formatInviteValid"
                            show-overflow-tooltip>
                    </el-table-column>
                        <el-table-column
                            :class="optd == isFalse"
                            prop="company"
                            label="操作"
                            show-overflow-tooltip>
                            <template scope="scope">
                                <el-button
                                    class="blue"
                                    type="text"
                                    size="small"
                                    @click="editUser(userData[scope.$index])">编辑</el-button>
                                
                                <router-link :to='{path:"/userDetail",query:{userId:userData[scope.$index].id,userName:userData[scope.$index].userName,mobile:userData[scope.$index].mobile}}' class="blue">详情</router-link>
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
                                        :disabled="true"
                                        v-model="editUserForm.userName">
                                    </el-input>
                                </el-col>
                            </el-col>
                        </el-col>

                        <el-col :span="24" style="padding-top: 20px;">
                            <el-col :span="12" class="flex2">
                                <el-col :span="5"><span>用户状态：</span></el-col>
                                <el-col :span="14">
                                    <el-radio class="radio" v-model="editUserForm.status" :label="1">启用</el-radio>
                                    <el-radio class="radio" v-model="editUserForm.status" :label="2" style="margin-left:10px;">禁用</el-radio>
                                </el-col>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="padding-top: 20px;">
                            <el-col :span="12" class="flex2">
                                <el-col :span="5"><span>联系电话：</span></el-col>
                                <el-col :span="14">
                                    <el-input
                                        placeholder="请输入联系电话"
                                        v-model="editUserForm.mobile">
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
    import {queryUserInfo,delUserInfo,saveUserInfo,queryUser,saveUser} from '@/api/getData'
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
                dialogEditVisible:false,
                searchUserName:'',
                searchMobile:'',
                searchUserStatus:null,
                searchInviteStatus:null,
                searchInviteType:null,
                searchInvitorUserMobile:'',
                userData:[],//用户数据
                userStatusData:[
                	{
                		name:'未激活',
                		value:0
                	},
                	{
                		name:'启用',
                		value:1
                	},
                	{
                		name:'禁用',
                		value:2
                	}
                ],
                inviteTypeData:[
                	{
                		name:'PC端',
                		value:1
                	},
                	{
                		name:'微信小程序',
                		value:2
                	}
                ],
                inviteStatusData:[
                	{
                		name:'有效',
                		value:1
                	},
                	{
                		name:'无效',
                		value:2
                	}
                ],
                editUserForm:{},

                pageSize:10,
                //默认高亮行数据id
                highlightId: -1,

                //当前页码
                currentPage: 1,

                //查询的页码
                start: 1,

                //默认数据总数
                totalCount: 0,
                multipleSelection: [],
                LODOP:''
            }
        },
        mounted(){
            this.loadData();
        },
        methods: {
        	getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
            },
            //每页显示总数变换
            handleSizeChange(val) {
                this.pageSize = val;
                this.loadFirstPage();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            //页码变换
            handleCurrentChange:function(val) {
                this.currentPage = val;
                this.loadData();
            },

            
            async loadFirstPage(){
            	this.currentPage = 1;
            	this.loadData();
            },

            //用户数据加载
            async loadData(){
            	this.userData = [];
            	let param = {
            		userName:this.searchUserName,
            		mobile:this.searchMobile,
            		inviteUserMobile:this.searchInvitorUserMobile,
            		status:this.searchUserStatus,
            		inviteType:this.searchInviteType,
            		inviteValid:this.searchInviteStatus,
            		pageIndex:this.currentPage,
            		pageSize:this.pageSize
            	}
                const res = await queryUser(param);
                if(res.isSuccess==true){
                    this.userData = res.result.data.results;
                    this.totalCount = res.result.data.totalCount;
                }
            },
            //编辑用户
            async editUser(row){
                this.dialogEditVisible = true;
                this.editUserForm = {
                	id:row.id,
                	status:row.status,
                	userName:row.userName,
                	mobile:row.mobile
                }
            },
            //保存信息
            async saveInfo(){
                this.dialogEditVisible = false;
                const res = await saveUser(this.editUserForm);
                if(res.isSuccess){
                    this.loadData();
                }else{
                    this.$message({
                        type:'info',
                        message:res.errorMsg
                    });
                }
            },
            preparedData:function(row,column){
                let data = row[column.property];
                if(data==2){
                    data = '禁用';
                }else if(data==1){
                    data = '启用';
                }else if(data==0){
                	data = '未激活';
                }
                return data;
            },
            formatInviteType:function(row,column){
            	if(row.inviteType && row.inviteType == 1){
            		return "PC";
            	}else if(row.inviteType && row.inviteType == 2){
            		return "微信小程序";
            	}else{
            		return "";
            	}
            },
            formatInviteValid:function(row,column){
            	if(row.inviteValid && row.inviteValid == 1){
            		return "有效";
            	}else if(row.inviteUserId && row.inviteUserId != ''){
            		return "无效";
            	}else{
            		return "";
            	}
            },

            //数据格式化
            formatDate:function(row, column) {
                let data = row[column.property];
                if (data == undefined||data=='') {
                    return "";
                }
                var date2 = new Date(data);
                return formatDate(date2,'yyyy-MM-dd hh:mm:ss');
            },
            formatDateTime(val) {
                if(val==undefined||val==''){
                    return '';
                }else{
                    return formatDate(val,'yyyy-MM-dd hh:mm:ss');
                }
            }

        },
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/userCenter';
</style>
