/*
 * @Author: your name
 * @Date: 2022-04-19 11:03:22
 * @LastEditTime: 2022-04-19 11:21:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \learning-summary\js\test\test.js
 */
const crypto = require('./crypto-js');
// console.dir(crypto.SHA256)
var sha256 = crypto.SHA256;
var Base64 = crypto.enc.Base64;
// console.log(Base64)
// var axios = require('axios');
// http://14.18.84.92:43210/api/v1/sys/user/login
// 帐号：411403199112166017
// 密码：258061
function lowerJSONKey(obj) {
	var newObj = {};
	for (let key in obj) {
		newObj[key.toLowerCase()] = obj[key];
	}
	return newObj;
}

function objKeySort(obj) {
	let newKey = Object.keys(obj).sort();
	let newObj = {};
	for (let i of newKey) {
		if (obj[i] == undefined) {
			newObj[i] = 'undefined';
		} else if (obj[i] == null) {
			newObj[i] = '';
		} else {
			newObj[i] = obj[i];
		}
	}
	return newObj;
}
function getSHA256(data) {
	var hash = sha256(data);
    // console.log(hash)
	return Base64.stringify(hash);
	//return encodeURI(Base64.stringify(hash));
}
function handleParams(path, params, method) {
	// 处理查询参数，从options.params.updates拿到查询参数
	var searchParams = {};
	var params = JSON.parse(JSON.stringify(params));
	for (let key in params) {
		searchParams[key] = params[key];
	}

	var appKey = '455F3D65-3761-4EB1-88FD-76087B6D0F4B';
	var appSecret = '455F3D65-3761-4EB1-88FD-76087B6D0F4B';

	let lowerKeyParams = lowerJSONKey(searchParams); //params的key转成小写
	lowerKeyParams['__app_key'] = appKey; //params添加__app_key
	lowerKeyParams['__timestamp'] = new Date().getTime().toString(); //params 添加__timestamp
	// 计算sign
	let sortParams = objKeySort(lowerKeyParams); //params根据key排序
	let paramsString = JSON.stringify(sortParams);
	let input = `${method}${path}${paramsString}${appSecret}`.toLowerCase();
	let str = getSHA256(input);
	sortParams['__sign'] = str;
	return sortParams;
}
var sortParams = handleParams('/api/v1/user',{
    		AppKey: '455F3D65-3761-4EB1-88FD-76087B6D0F4B',
    		UserName: '411403199112166017',
    		Password: '166017',
    	},'get')
        console.log(sortParams)
function request(config) {
	return new Promise((resolve, reject) => {
		const instanse = axios.create({
			baseURL: 'http://139.159.217.30:23410/api',
			timeout: 5000,
		});

		// axios的拦截器
		// 请求拦截
		instanse.interceptors.request.use(
			(config) => {
				let apiPath = `/api${config.url}`;
				config.params = handleParams(apiPath, config.params, config.method);

				// console.log('config.params 类型', config.params instanceof Object);//true
				console.log('config.params', config.params);
				return config;
			},
			(err) => {
				console.log(err); //请求没发出去就会显示这个错误
			}
		);

		// 发送网络请求
		instanse(config)
			.then((res) => {
				// console.log(res);
				resolve(res);
			})
			.catch((err) => {
				// console.log(err);
				reject(err);
			});
	});
}

// request({
// 	url: '/v1/sys/user/login',
// 	params: {
// 		AppKey: '455F3D65-3761-4EB1-88FD-76087B6D0F4B',
// 		UserName: '411403199112166017',
// 		Password: '166017',
// 	},
// }).then((res) => {
// 	console.log(res.data);
// });
