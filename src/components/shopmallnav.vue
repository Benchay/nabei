<template>
    <ul class="menu">
        <li class="menuIndex">
            <router-link :to='{path:"/stallProductManagement"}'>商品管理</router-link>
        </li>
        <li>
            <router-link :to='{path:"/classificationGoods"}'>商品分类</router-link>
        </li>
        <li>
            <router-link :to='{path:"/commodityStatistics"}'>商品统计</router-link>
        </li>
        <li>
            <router-link :to='{path:"/commodityStatistics"}'>绑定店铺</router-link>
        </li>
    </ul>
</template>
<script>
    export default{
        props: {
            food: {
                type: Object
            }
        },
    }
</script>
<style>

</style>
