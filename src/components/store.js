import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

var store = new Vuex.Store({
    state: {
        count: 1,
        menuLists: []
    },
    getters: {
        getStateCount(state) {
            return state.count + 1
        }
    },
    mutations: {
        getLists(state, n) {
            state.menuLists = n
        }
    },
    actions: {
        addFun(context, n) {
            context.commit('getLists', n)
        }
    }
})
export default store