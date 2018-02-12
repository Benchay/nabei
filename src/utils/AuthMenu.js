import {setStore,getStore,userInfo,getSessionStore} from  '../config/mUtils'
import {isJSON,compare} from  '../utils/common'
import * as types from '../store/types'

/*
*  是否有菜单权限
*  @params   menuKey  菜单的method 属性值
*  @return   true  有权限
*/
export function getMenuAuth(menuKey) {
   var userId=userInfo().id;
   var key= "AUTH_" + userId;
   var sjson=getStore(key);
    if(sjson == null || sjson == undefined) return;
   var json = JSON.parse(sjson);
   for(var i=0; i<json.length; i++){
	   if(json[i].type== 1 && json[i].parentAuthId !=null){
		   if(json[i].method== menuKey) return true;
	   }
   }
   //return true;
   return false;
};

Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}
/*
*  检查router权限
*  @params   menuKey  菜单的method 属性值
*  @return   true  有权限
*/
export function checkRouterAuth(menuKey) {
   if(getSessionStore(types.SESSION_ADIN)=='true')return true;
   var checkArray=new Array("manage","basicInformation","manageRole","manageStaff","inviteFriends","messageCenter","homeSeller","homeStall");
   if(checkArray.contains(menuKey)) return true;
   return getMenuAuth(menuKey);
};
/*
*  得到主菜单下第一子菜单
*  @params   menuKey  菜单的method 属性值
*  @return   菜单的method
*/
export function getMenuAuthSort(menuKey,parentsId,subMenu){
	if(getSessionStore(types.SESSION_ADIN)=='true')return menuKey;
	if(getMenuAuth(menuKey)) return menuKey;
	var children2 = [];
	for (var j = 0; j < subMenu.length; j++) {
		 var result2 = subMenu[j];
		 if(result2.parentAuthId==parentsId){
			var jt3 = new Object;
            jt3.id = result2.id;
			jt3.serialNum = result2.serialNum;
            jt3.label = result2.name;
            jt3.method = result2.method;
            children2.push(jt3);
		 }
		 children2.sort(compare("serialNum"));
	}
	for (var i = 0; i < children2.length; i++) {
		var temp = children2[i];
		if(getMenuAuth(temp.method)) return temp.method;
	}
}
/*
*  找出授权的id
*/
export function getMenuAuthId(menuKey) {
   var userId=userInfo().id;
   //var compId=userInfo().companyId;
   var key= "AUTH_" + userId;
   var sjson=getStore(key);
   var json = JSON.parse(sjson);
   for(var i=0; i<json.length; i++){
	   if(json[i].type== 1 && json[i].parentAuthId !=null){
		   if(json[i].method== menuKey) return json[i].id;
		}
   }
   return false;
};

/*
*  是否有菜单权限的查看权限或者编辑权限
*  @params   menuKey  菜单的method 属性值
*  @mode     0:查看   1：编辑
*  @return   true  有权限  false:无权限
*/
export function haveMenuAuth(menuKey,mode) {
   var userId=userInfo().id;
   var key= "AUTH_" + userId;
   var sjson=getStore(key);
   var json = JSON.parse(sjson);
   var authId='';
   var method="readonly_";
   if(mode==0){
	   method="readonly_";
   }else if(mode==1){
	   method="editall_";
   }else{
   		method = mode;
   }
   for(var i=0; i<json.length; i++){
	   if(json[i].type== 1 && json[i].parentAuthId !=null){
		   if(json[i].method== menuKey){
			   authId=json[i].id;
			   break;
		   }
		}
   }
    if(authId=='') return false;
    for(var i=0;i<json.length;i++){
	    if(json[i].type== 2 && json[i].parentAuthId !=null&&json[i].parentAuthId==authId){
		    if(json[i].method.startsWith(method)||json[i].method==method){
			    return true;
		    }
	    }
    }
   return false;
};
/*
*   得到二级菜单
*   @params methodParent 一级菜单
*   @params exceptArray  排除不显示的菜单
*   @params selectMenu   当前要显示的
*   @params companyType  公司类型（决定css样式）
*/
export function getSubMenuByMothod(methodParent,exceptArray,selectMenu,companyType){
	var selectCSS='menuIndex2';//被选中样式
    if(companyType==1){
        selectCSS='menuIndex'
    }else if(companyType==2){
        selectCSS='menuIndex2';
    }
	var userId=userInfo().id;
	var key= "AUTH_" + userId;
	var sjson=getStore(key);
	var json = JSON.parse(sjson);
	var parentAuthId='';
	for(var i=0; i<json.length; i++){
	   if(json[i].type== 1 && json[i].parentAuthId ==null){
		   if(json[i].method== methodParent){
			  parentAuthId=json[i].id;
		   }
	   }
	}
	if(parentAuthId=='') return '';
	var jsonArray1 = [];
	if(selectMenu!=null){
		selectMenu=selectMenu.replace("/","");
	}
	for(var i=0; i<json.length; i++){
	   if(json[i].type== 1 && json[i].parentAuthId !=null){
		   if(json[i].parentAuthId== parentAuthId){
			   var menuKey=json[i].method;
			   if(exceptArray!=null && exceptArray.length >0){
				   if(exceptArray.contains(menuKey)) continue;
			   }
			   if(json[i].method==selectMenu){
				  json[i].css=selectCSS; //tf
			   }else{
				   json[i].css='';
			   }
			   json[i].topath='{path:"/'+json[i].method +'"}'; //transportDetail"}
			   jsonArray1.push(json[i]);
		   }
	   }
	}
	jsonArray1.sort(compare("serialNum"));
	return jsonArray1;
}

