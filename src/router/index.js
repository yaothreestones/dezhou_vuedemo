import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import backStage from '@/components/backStage'
import firstPage from '@/components/firstPage'
import mainbody from '@/components/mainbody'
import home from '@/components/home'
import destroy from '@/components/destroy'
import clinic from '@/components/clinic'
import companyPerson from '@/components/companyPerson'
import instManagement from '@/components/instManagement'
import password from '@/components/password'
import systemSet from '@/components/systemSet'
import traceSource from '@/components/traceSource'
import vehicleManagement from '@/components/vehicleManagement'
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
                }, {
                    path: 'destroy',
                    name: 'destroy',
                    component: destroy
                }, {
                    path: 'clinic',
                    name: 'clinic',
                    component: clinic
                }, {
                    path: 'companyPerson',
                    name: 'companyPerson',
                    component: companyPerson
                }, {
                    path: 'instManagement',
                    name: 'instManagement',
                    component: instManagement
                }, {
                    path: 'password',
                    name: 'password',
                    component: password
                }, {
                    path: 'systemSet',
                    name: 'systemSet',
                    component: systemSet
                }, {
                    path: 'traceSource',
                    name: 'traceSource',
                    component: traceSource
                }, {
                    path: 'vehicleManagement',
                    name: 'vehicleManagement',
                    component: vehicleManagement
                }
            ]
        },
        {
            redirect: '/',
            path: '/*',
            component: Login
        },
    ]
})
export default router