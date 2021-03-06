import { baseUrl } from './env'
import {setStore,getStore,userInfo} from  '../config/mUtils'
import {_fetch} from "../utils/_fetch"

export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
	type = type.toUpperCase();
	//console.log("===========baseurl:"+baseUrl)
    //console.log("===========url:"+url)
    let token = getStore("token")
	url = baseUrl + url;
	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
		if(url.indexOf('?')>-1){
			url = url + '&time='+new Date();
		}else{
			url = url + '?time='+new Date();
		}
	}
	if (window.fetch && method == 'fetch') {
		let requestConfig = {
			credentials: 'include',
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'token':token
			},
			mode: "cors",
			cache: "force-cache"
		}

		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(data)
			})
		}
		try {
			const response = await _fetch(fetch(url, requestConfig),6000);
			let responseJson = await response.json();
			if(responseJson.errorCode =='402'){
	/* 			alert(url)
				alert(url)
				alert(token);
				alert(JSON.stringify(responseJson)) */
				responseJson.errorMsg ='会话已过期，请重新登录，3S后将进行登录跳转';
					setTimeout(()=>{
						setStore("token","");
						setStore("userInfo","");
						setStore("user_info_user","");
						setStore("curCompany","");
						window.location="/";
					} 
					,3000);
				   
			}
			return responseJson
		} catch (error) {
            return  {isSuccess:false,errorMsg:'服务暂不可用，请稍后再试!'};
			throw new Error(error)
		}
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			let sendData = '';
			if (type == 'POST') {
				sendData = JSON.stringify(data);
			}

			requestObj.open(type, url, true);
			requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            requestObj.setRequestHeader("token", token);
			requestObj.send(sendData);


			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		})
	}
}
