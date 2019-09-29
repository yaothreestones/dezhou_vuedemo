import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

var store = new Vuex.Store({
    state: {
        count: 1,
        menuLists: [],
        selected: []
    },
    getters: {

    },
    mutations: {
        getLists(state, n) {
            state.menuLists = n
            state.selected = new Array(n.length).fill(false);
            var pathname = location.pathname.split('/backStage/')[1];
            n.forEach((item, index) => {
                if (item.url.indexOf(pathname) != -1) {
                    state.selected[index] = true
                }
            })
        },
        changeSelceted(state, payload) {
            state.selected = new Array(state.selected.length).fill(false);
            state.selected[payload] = true
        }
    },
    actions: {
        addFun(context, n) {
            context.commit('getLists', n)
        }
    }
})
export default store