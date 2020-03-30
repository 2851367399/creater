import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		cartList: [],
	},
	mutations: {
		// 储存从购物车过来的数据
		cart(state,payload) {
			if(state.cartList.length > 0) {
				// 如果商品id相同则不添加只叠加数量(规格);
				for(let i = 0;i < state.cartList.length;i++) {
					if(payload.id != state.cartList[i].id) {
						this.state.cartList.push(payload);
					}
					else {
						state.cartList[i].amount = state.cartList[i].amount + payload.amount
					}
				}
			}
			else {
				this.state.cartList.push(payload);
			}
			// 储存到本地
			uni.setStorage({
				key: 'cartList',
				data: state.cartList
			})
			console.log(state.cartList)
		}
	},
	getters:{

    },
	actions: {

		
	}
})

export default store
