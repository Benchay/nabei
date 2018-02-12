<template>
           <ul class="menu">
            <li class="menuIndex">
                <router-link :to='{path:"/fastShipping2"}'>快速出货</router-link>
            </li>
            <li>
                <router-link :to='{path:"/indentManagement"}'>订单管理</router-link>
            </li>
            <li>
                <router-link :to='{path:"/takeGoods"}'>卖家拿货</router-link>
            </li>
            <li>
                <router-link :to='{path:"/sellerSettlement"}'>客户结算</router-link>
            </li>
            <li>
                <router-link :to='{path:"/customerManagement"}'>客户管理</router-link>
            </li>
            <li>
                <router-link :to='{path:"/statisticalStatement"}'>销售统计</router-link>
            </li>
        </ul>
</template>

<script>
	import {signout} from '@/api/getData'
	import {baseImgPath} from '@/config/env'
	import {mapActions, mapState} from 'vuex'

    export default {
    	data(){
    		return {
    			baseImgPath,
    		}
    	},
    	computed: {
    		...mapState(['adminInfo']),
    	},


    }
</script>

<style lang="less">
	@import '../style/mixin';
	.header_container{
		background-color: #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
</style>
