<template>
    <div class="fillcontain">
        <ul class="menu">
            <li class="menuIndex3" v-if="getMenuAuthFun('messageManagement')">
               	<router-link :to='{path:"/messageManagement"}'>消息管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('bulletinManagement')">
                <router-link :to='{path:"/bulletinManagement"}'>公告管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('msgManagement')">
                <router-link :to='{path:"/msgManagement"}'>短信管理</router-link>
            </li>
            <!--<li>-->
                <!--<router-link :to='{path:"/sessionManagement"}'>会话管理</router-link>-->
            <!--</li>-->
        </ul>
        <div class="messageManagement">
            <div class="messageTop">
                <el-date-picker
                    size="small"
                    v-model="modifyTimeStart"
                    type="date"
                    @change="querySession"
                    placeholder="选择会话开始日期">
                </el-date-picker>

                <el-date-picker
                    size="small"
                    v-model="modifyTimeEnd"
                    type="date"
                    @change="querySession"
                    placeholder="选择会话结束日期">
                </el-date-picker>

				<el-select v-model="sessionType" @change="querySession" placeholder="选择消息类型" class="staff-status" size="small">
                	<el-option label="全部" value=""></el-option>
                    <el-option label="单人" value="ONE"></el-option>
                    <el-option label="群聊" value="MANY"></el-option>
                </el-select>

                <el-select v-model="sessionState" @change="querySession" placeholder="选择会话状态" class="staff-status" size="small">
                	<el-option label="全部" value=""></el-option>
                    <el-option label="会话中" value="1"></el-option>
                    <el-option label="已结束" value="0"></el-option>
                </el-select>

                <el-input style="width: 180px;"
                      size="small"
                      placeholder="消息对象过滤"
                      icon="search"
                      v-model="titleLike"
                      :on-icon-click="querySession">
                  </el-input>
            </div>
            <!--<div class="messageButton">
                <el-button type="info" @click="dialogSendForm = true">发送消息</el-button>
            </div>-->
            <div class="messageTable">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="sessionTypeValue"
                        label="消息类型"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="title"
                        label="会话对象"
                        >
                    </el-table-column>
                    </el-table-column>
                    <el-table-column
                        prop="modifyTime"
                        label="最近会话时间"
                        :formatter="mydateFormat">
                    </el-table-column>
                    <el-table-column
                        prop="state"
                        label="状态"
                        :formatter="stateFormat">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        show-overflow-tooltip>
                        <template scope="scope">
                            <el-button
                                size="small"
                                @click="showMessageDetails(tableData[scope.$index])"
                                >查看详情</el-button>
                           <el-button
                                size="small"
                                type="danger"
                                @click.native.prevent="confDelSession(tableData[scope.$index].id)">删除</el-button>
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
                <a href="javascript:void(0)" class="export_excle" @click="exportloadData">导出excle</a>
            </div>
        </div>
        <!--<el-dialog title="发送消息" :visible.sync="dialogSendForm" class="dialogSend">
            <el-form :model="form">
                <el-form-item label="消息标题：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="发送对象：" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="全部">
                        <el-option label="档口" value="shanghai"></el-option>
                        <el-option label="电商卖家" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发送时间：" :label-width="formLabelWidth">
                    <el-input v-model="form.time" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="跳转链接：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="上传图片：" :label-width="formLabelWidth">
                    <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog v-model="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="发送内容：" :label-width="formLabelWidth">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="form.textarea">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogSendForm = false">发 送</el-button>
                <el-button @click="dialogSendForm = false">取 消</el-button>
            </div>
        </el-dialog>-->
        <el-dialog :title="title" :visible.sync="dialogDetails" class="dialogSend">
        	<div class="message">
        		<div class="message-item" v-for="message in messageData">
        			<span class="message-item-user">{{message.sendUserName}}</span><span class="message-item-time">{{message.sendTime}}</span>
        			<div class="message-item-content">
        				{{message.content}}
        			</div>
        		</div>
        	</div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="showMessageDetailsMore">更多历史消息</el-button>
                <el-button @click="dialogDetails = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {querySession,queryClientMessage,delSession} from '@/api/getData'
    import {mydateFormat} from '../utils/dataFormater.js'
    import {formatDate} from '../utils/date.js'
    import {export_json_to_excel} from '../vendor/Export2Excel.js'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'
    
    export default {
        components: {
            headTop,
        },
        data() {
            return{
            	modifyTimeStart:'',
            	modifyTimeEnd:'',
            	sessionType:'',
            	sessionState:'',
            	titleLikeesLike:'',
            	delFlag:0,
            	
            	dialogDetails:false,
            	title:'',
            	sessionIdMore:'',
            	messageData:[],
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
                //默认每页数据量
                messagePagesize: 3,
                messageCurrentPage: 1,
                formLabelWidth: '120px',
                tableData: [],
                multipleSelection: []
            }
        },
        mounted(){
            this.querySession();
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
            	this.pagesize = val;
            	this.querySession();
            },
            handleCurrentChange(val) {
            	this.currentPage = val;
            	this.querySession();
            },
        	async querySession() {
            	let param ={
            		pageIndex:this.currentPage,
            		pageSize:this.pagesize,
            		delFlag:this.delFlag,
            		modifyTimeStart:this.modifyTimeStart,
            		modifyTimeEnd:this.modifyTimeEnd,
            		sessionType:this.sessionType,
            		state:this.sessionState,
            		titleLike:this.titleLike
            	}
                const res = await querySession(param);
                if (res.isSuccess == true) {
                    this.tableData = res.result.results;
                    this.totalCount = res.result.totalCount;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            handleIconClick(ev) {

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            mydateFormat,
			stateFormat(row){
				if(row.state == 0){
					return "会话已结束";
				} else if (row.state == 1) {
					return "会话中";
				}
			},
            async showMessageDetails(row){
            	this.title = row.title;
            	this.messageCurrentPage = 1;
            	let param ={
            		pageIndex:1,
            		pageSize:this.messagePagesize,
            		sessionId:row.id
            	}
            	this.sessionIdMore = row.id;
            	this.messageData = [];
                const res = await queryClientMessage(param);
                if (res.isSuccess == true) {
                    res.result.results.forEach((obj) => {
                    	if(obj.sendTime){
		                	obj.sendTime = formatDate(new Date(obj.sendTime),'yyyy-MM-dd hh:mm:ss');
                    	}
                		if(!obj.sendUserName){
                			obj.sendUserName = obj.sendUserId;
                		}
                		if(!obj.toUserName){
                			obj.receiveUserName = obj.toUserId;
                		}
                    	this.messageData.push(obj);
                    });
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
                this.dialogDetails = true;
            },

            async showMessageDetailsMore(){
            	this.messageCurrentPage = this.messageCurrentPage+1;
            	let param ={
            		pageIndex:this.messageCurrentPage,
            		pageSize:this.messagePagesize,
            		sessionId:this.sessionIdMore
            	}
                const res = await queryClientMessage(param);
                if (res.isSuccess == true) {
                    res.result.results.forEach((obj) => {
                    	if(obj.sendTime){
		                	obj.sendTime = formatDate(new Date(obj.sendTime),'yyyy-MM-dd hh:mm:ss');
                    	}
                		if(!obj.sendUserName){
                			obj.sendUserName = obj.sendUserId;
                		}
                		if(!obj.toUserName){
                			obj.receiveUserName = obj.toUserId;
                		}
                    	this.messageData.push(obj);
                    });
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            async delSession(id) {
        		let param ={
        			id:id
            	}
            	const res = await delSession(param);
            	if (res.isSuccess == true) {
                    this.querySession();
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            confDelSession(id) {
		        this.$confirm('是否确认删除该会话吗?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.delSession(id);
		        }).catch(() => {

		        });
		    },

		    //导出Excel数据
            async exportloadData() {
               let param ={
            		pageIndex:1,
            		pageSize:2000,
            		delFlag:this.delFlag,
            		modifyTimeStart:this.modifyTimeStart,
            		modifyTimeEnd:this.modifyTimeEnd,
            		sessionType:this.sessionType,
            		state:this.sessionState,
            		titleLike:this.titleLike
            	}
                const res = await querySession(param);
                const list = [];
                if (res.isSuccess == true) {
                	res.result.data.results.forEach((obj) => {
		            	if(obj.modifyTime){
		                	modifyTime = formatDate(new Date(obj.modifyTime),'yyyy-MM-dd hh:mm');
		            	}
		            	let row = {
		            		messageTypeValue : messageTypeValue,
							userNames : userNames,
							modifyTime : modifyTime
		            	}
		            	list.push(row);
                	});

                	const tHeader = ['消息类型', '会话对象','最近会话时间'];
				　　　const filterVal = ['messageTypeValue', 'userNames','modifyTime'];
				　　　const data = this.formatJson(filterVal, list);
				　　　export_json_to_excel(tHeader, data, '消息管理表');
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },

            handleCurrentChange:function(val) {
                this.currentPage = val;
                this.querySession();
            },

            formatJson(filterVal, jsonData) {
		　　　　　　return jsonData.map(v => filterVal.map(j => v[j]))
		　　　　},
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/messageManagement';
</style>
