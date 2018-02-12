/**
 * Created by Administrator on 2017/9/2.
 */
export function isJson(obj) {
	var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
	return isjson;
};
export function isArray(arr) {
	return Object.prototype.toString.call(arr) === "[object Array]";
};

export function isNullObject(obj) {
    if(null==obj) return true;
    if(typeof(obj)=="undefined"){
        return true;
    }
    if(obj=='') return true;
    if(obj==undefined)return true;
    //getStore()返回的是undefined字符串
    if(obj=='undefined') return true;
	return false;
}

export function getCompanyType(currentComp) {
    if (typeof(currentComp) == "undefined") {
        return -1;
    }
    try{
    	var vcom = JSON.parse(currentComp);
    	//新注册的用户没有给type属性
    	if(vcom.type){
			return vcom.type;
    	}
    	return -1;
    }catch(e){
    	return -1;
    }
//  if(!isJSON(currentComp)) return -1;
//  if(currentComp != null && currentComp !='') {
//		var vcom = JSON.parse(currentComp);
//		return vcom.type;
//	}
//	return -1;
}
export function isJSON (value) {
        try{
            eval('('+value+')');
            return angular.fromJson(value);
        }
        catch(er){
            return false;
        }
}
/*
*  将数组形式的转换为字符分隔
*
**/
export function linkArrayFormatId(seleRoleIdData){
    var linkstr='';
    if(seleRoleIdData instanceof Array){
        for(var i=0;i<seleRoleIdData.length;i++){
            // var tt=seleRoleIdData + "";
            if(i== seleRoleIdData.length-1){
                linkstr+=seleRoleIdData[i];
            }else{
                linkstr+=seleRoleIdData[i] + ",";
            }
        }
    }else{
        return seleRoleIdData;
    }
    return linkstr;
}
/*
 * 排序
 */
export function compare(propertyName) {
    return function(object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        if (value2 < value1) {
            // return -1;
            return 1;
        } else if (value2 > value1) {
            // return 1;
            return -1;
        } else {
            return 0;
        }
    }
}

/**
 * 获取两位小数
 */
export function getRoundNumbers(propertyName){
    if(propertyName==undefined||propertyName==''){
        return 0.00;
    }
    var result = Number(propertyName).toFixed(3);
    result = result.substring(0,result.lastIndexOf(".")+3);
    return result;
}
