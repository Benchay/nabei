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
                <div class="userInfoTable" id="userDetailVO">
                	<div>用户名：{{userName}}</div>
                    <div style="line-height: 40px;">电话：{{mobile}}</div>
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
                            prop="compName"
                            label="公司名称"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="roleName"
                            label="所属角色"
                            show-overflow-tooltip>
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
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {queryUserInfo} from '@/api/getData'
    import {mapActions, mapState} from 'vuex'
    import {getLodop}   from '../Lodop/LodopFuncs.js'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
            	userId:'',
                userName:'',
                mobile:'',
                //列表数据
                userData:[],
                pageSize:10,
                //默认高亮行数据id
                highlightId: -1,

                //当前页码
                currentPage: 1,

                //查询的页码
                start: 1,

                //默认数据总数
                totalCount: 0,
            }
        },
        watch:{
        	'$route':function (route) {
        		this.userId = this.$route.query.userId;
        		this.mobile = this.$route.query.mobile;
        		this.userName = this.$route.query.userName;
        		this.loadData();
        	}
        },
        mounted(){
         	this.userId = this.$route.query.userId;
    		this.mobile = this.$route.query.mobile;
    		this.userName = this.$route.query.userName;
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
            //页码变换
            handleCurrentChange:function(val) {
                this.currentPage = val;
                this.loadData();
            },
            async loadFirstPage(){
            	this.loadData();
            },
            //用户数据加载
            async loadData(){
                this.userData = [];
            	let param = {
            		userId:this.userId,
            		page:this.currentPage,
            		pageSize:this.pageSize
            	}
                const res = await queryUserInfo(param);
                if(res.isSuccess==true){
                    this.userData = res.result.user;
                    this.totalCount = res.result.totalCount;
                }
            },
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/userCenter';
</style>
