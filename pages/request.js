
// const baseURL = 'http://lfs.086soft.cn/upload/goods/20200323/dec9cf4aa496e5d71bb2284dfd9b1e66.png';
// const baseURL = 'http://192.168.110.233/'
const baseURL = "http://sh.086soft.cn/"
export function request (options){
	return new Promise((resolve,reject) => {
		let token = Token();
		if (token !== -1){
			if(options.data !== undefined){
				options.data["token"]=token;
			}
		}

		uni.request({
			url: baseURL + options.url,
			method:options.method || 'GET',
			data: options.data || {token:token},
			header:{
				'content-type':'application/x-www-form-urlencoded',
				// 'cookie:PHPSESSID': + token
			},
			success:(res) => {
				if(res.statusCode != 200) {
					uni.showToast({
						title:'数据加载失败',
						icon: 'none'
					})
				}
				resolve(res)
			},
			fail:(error) => {
				reject(error.errMsg)
			}, 
		})
	})
}

// 获取token
function Token() {
	let startTime = new Date().getTime();
	let token;
	// 查看本地是否有token
	uni.getStorage({
		key: 'token',
		fail: res => {
			token = getToken();
		},
		success:res =>{
			let data = res.data;
			let nowTime = new Date().getTime();
			if (data[1]<nowTime) {
				token =getToken();
			}else{
				token = data[0];
			}
		}
	});
	return token
}
export function  getToken() {
	let token = ''
	uni.request({
		url: baseURL + 'index.php?s=wap/captchac/getUserToken',
		header:{
			'content-type':'application/x-www-form-urlencoded'
		},
	}).then(res => {
		token = res[1].data.token;
		let endTime = new Date().getTime() + 86400000;
		 uni.setStorage({
		 	key: 'token',
			data: Array(token,endTime)
		 })
	})
	return token;
}