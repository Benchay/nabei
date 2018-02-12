<template>
    <ul class="menu">
		<div v-for="(authitem,index) in authMenu">
            <li :class='authitem.css'>
                 <router-link :to='authitem.method'>{{authitem.name}}</router-link>
            </li>
        </div>
    </ul>
</template>

<script>
	import {getSubMenuByMothod} from  '../utils/AuthMenu.js'
    export default  {
		name:"horizontalMenu",
        props: {
            menuParams:{
                type:Object,
                require:true
            },
            exeptArray: {
                type: Array
            },
            routerPath:{
                type:String,
                require:true
            }
        },
        data() {
            return {
				authMenu:[],
            }
        },
		mounted(){
			this.authMenu=getSubMenuByMothod(this.menuParams.parentMethod,this.exeptArray,this.routerPath,this.menuParams.companyType);
        },
    }
</script>
