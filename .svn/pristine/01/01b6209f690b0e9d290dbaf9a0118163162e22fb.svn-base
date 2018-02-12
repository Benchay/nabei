<template>
    <div class="fillcontain">
        <ul class="menu">
            <li>
                <a href="javascript:void(0);">个人中心</a>
            </li>
        </ul>
        <div class="userSet">
            <div>
                <el-button type="info">基本设置</el-button>
            </div>
            <div class="userInfo">
                <div class="userTop">
                    <p class="title">头像设置</p>
                    <div class="flex topList">
                        <el-upload
                            class="avatar-uploader"
                            :action="baseUrl + '/admin/update/avatar/' + adminInfo.id"
                            :show-file-list="false"
                            :on-success="uploadImg"
                            :before-upload="beforeImgUpload">
                            <img v-if="adminInfo.avatar" :src="baseImgPath + adminInfo.avatar" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div>
                            <p>选择您喜欢的图片作为您的头像</p>
                            <p>只可以上传jpg、jpeg、png、gif(静态)格式的图片，且文件小于2M</p>
                        </div>
                    </div>
                </div>
                <div class="userList">
                    <div>
                        <p class="title">基本信息</p>
                        <ul>
                            <li>
                                <span>用户名：</span>
                                <div>
                                    <p v-show="inputBlock1">{{adminInfo.user_name}}</p>
                                    <el-input v-show="inputBlock" v-model="input" placeholder="" size="mini"></el-input>
                                </div>
                            </li>
                            <li>
                                <span>性别：</span>
                                <div>
                                    <p  v-show="inputBlock1">{{adminInfo.create_time}}</p>
                                    <el-input v-show="inputBlock"  v-model="input" placeholder="" size="mini"></el-input>
                                </div>
                            </li>
                            <li>
                                <span>生日：</span>
                                <div>
                                    <p  v-show="inputBlock1">{{adminInfo.admin}}</p>
                                    <el-input v-show="inputBlock"  v-model="input" placeholder="" size="mini"></el-input>
                                </div>
                            </li>
                            <li>
                                <span>地区：</span>
                                <div>
                                    <p  v-show="inputBlock1">{{adminInfo.id}}</p>
                                    <el-input v-show="inputBlock"  v-model="input" placeholder="" size="mini"></el-input>
                                </div>
                            </li>
                            <li>
                                <span>所属企业：</span>
                                <div class="flex">
                                    <p>{{radio}}</p>
                                    <a href="javascript:void(0);" class="switch" @click="dialogVisible = true">切换企业</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <img @click="amend" src="../image/rcompile.png" alt="">
                    </div>
                </div>
                <div class="userSubmit">
                    <el-button type="info" size="small">保存</el-button>
                    <el-button size="small">取消</el-button>
                </div>
            </div>
        </div>
        <div>
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                size="tiny"
                >
                <div>所属企业：</div>
                <div class="radioList">
                    <el-radio-group v-model="radio" v-for="item in radioList" class="radio" @click="change(item)">
                        <el-radio :label="item.label">{{item.name}}</el-radio>
                    </el-radio-group>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    <el-button @click="dialogVisible = false">取 消</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {mapState} from 'vuex'
    import {baseUrl, baseImgPath} from '@/config/env'

    export default {
        data(){
            return {
                baseUrl,
                baseImgPath,
                input:'',
                inputBlock:false,
                inputBlock1:true,
                dialogVisible:false,
                radio:'1',
                radioList:[
                    {
                        name:'胖胖哥大码男装90',
                        label:'1'
                    },{
                        name:'胖胖哥大码男装80',
                        label:'2'
                    },{
                        name:'胖胖哥大码男装00',
                        label:'3'
                    },{
                        name:'胖胖哥大码男装10',
                        label:'4'
                    }
                ],
            }
        },
        components: {
            headTop,
        },
        computed: {
            ...mapState(['adminInfo']),
        },
        methods: {
            uploadImg(res, file) {
                if (res.status == 1) {
                    this.adminInfo.avatar = res.image_path;
                }else{
                    this.$message.error('上传图片失败！');
                }
            },
            beforeImgUpload(file) {
                const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isRightType) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isRightType && isLt2M;
            },
            amend(){
                this.inputBlock=true;
                this.inputBlock1=false;
            },
            change(item){
                console.log(item)
            }
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import "../style/common";
    @import "../style/user";

</style>
