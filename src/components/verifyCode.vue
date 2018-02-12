<template>
<img :src="picdata" alt="" class="getCode" @click="getVerifyCode"  >
</template>

<script>

    import {getRandomCode} from '@/api/getData'
	
    export default  {
		name:"verifyCode",
        props: {

        },
        data() {
            return {
                picdata:'',
                picVerifyKey:'',
                styles:'getCode'
            }
        },
        methods: {
            async getVerifyCode(){

                const res=await getRandomCode();
                if (res.isSuccess == true) {
                    this.picdata="data:image/jpg;base64," + res.result.randomCode;
                    this.picVerifyKey=res.result.key;
                    this.$emit('getVerifyKey', this.picVerifyKey);
                }
            },
        },
        mounted(){
            this.getVerifyCode();
        },
        computed: {
        }
    }
</script>
<style>
    .getCode{
        width:120px;
        height: 40px;
    }
</style>
