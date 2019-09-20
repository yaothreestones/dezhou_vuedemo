import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login'
import backStage from '@/components/backStage'
import firstPage from '@/components/firstPage'
import mainbody from '@/components/mainbody'
import home from '@/components/home'
Vue.use(Router)
var router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'login',
            component: Login
        }, {
            path: '/backStage',
            component: backStage,
            children: [{
                    path: '',
                    name: 'backStage',
                    component: mainbody,
                },
                {
                    path: 'firstPage',
                    name: 'firstPage',
                    component: firstPage
                },
                {
                    path: 'home',
                    name: 'home',
                    component: home
                }
            ]
        },
        // {
        //     redirect: '/',
        //     path: '/*',
        //     component: Login
        // },
    ]
})
export default router