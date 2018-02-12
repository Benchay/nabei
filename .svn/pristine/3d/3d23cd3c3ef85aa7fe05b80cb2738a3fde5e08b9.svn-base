<template>

    <el-button @click="checkSend" :class='[styles]' :disabled="time > 0">
        {{ text }}
    </el-button>
</template>

<script>

    import {getMobileCode, getAdminInfo} from '@/api/getData'
	import {mapActions, mapState} from 'vuex'
    import {setStore} from  '../config/mUtils'
    import ElButton from "../../node_modules/element-ui/packages/button/src/button";

    export default  {
        components: {ElButton},
        props: {
            mobilehpne:'',
            second: {
                type: Number,
                default: 60
            }
        },
        data() {
            return {
                time: 0,
                mobilehpne:'',
                styles:'getCode'
            }
        },
        methods: {
            checkSend(){
                this.$emit('refCheckmobile', this.mobilehpne);
            },
           async send(sendPhone) {
            	if(sendPhone && sendPhone != ''){
            		this.mobilehpne = sendPhone;
            	}
                var pattern = /^1[3|4|5|7|8][0-9]{9}$/
                if (this.mobilehpne === '') {
				this.$message.error({
							title: 'error',
							message: '手机号不能为空',
							offset: 100
						});
                    return false;
                } else if (!pattern.test(this.mobilehpne)) {
                    this.$message.error({
							title: 'error',
							message: '请输入正确的手机号',
							offset: 100
						});
                    return false;
                }

              const res = await getMobileCode({mobile:this.mobilehpne})
                if (res.isSuccess == true) {
                    this.styles='waitingGetCode';
				/*
                    this.$message({
                        type: 'success',
                        message: '验证码已发出'
                    });*/
                    this.time = this.second
                    this.timer()
                    this.$emit('send')
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }

            },
            timer() {
                if (this.time > 0) {
                    this.time = this.time - 1
                    setTimeout(this.timer, 1000)
                }
            }
        },
        computed: {
            text() {
                if(this.time > 0){
                   return (this.time + " s") ;
                }else{
                    this.styles='getCode';
                    return "获取验证码";
                }
                //return this.time > 0 ? this.time + 's' : '获取验证码'
            }
        }
    }
</script>
<style>
    .getCode{
        width:100px;
        height: 40px;
        background: #1883e5;
        color: white;
    }
    .waitingGetCode
    {
        width:100px;
        height: 40px;
        background:#bbbbbb;
        color: white;
    }
</style>
