import axios from './token';

export default {
    login(parm) {
        return axios.post('/med/dezhou/auth/coreUser/login.do?t=' + new Date().getTime(), parm)
    },
    logout(parm) {
        return axios.post('/med/dezhou/auth/coreUser/logout.do?t=' + new Date().getTime(), parm)
    },
    updatePassword: function (parm) {
        return axios.post('/med/dezhou/auth/coreUser/updatePassword.do?t=' + new Date().getTime(), parm)
    },
    //获取菜单
    menuNavigate: function (parm) {
        return axios.post('/med/dezhou/auth/resource/menuNavigate.do?t=' + new Date().getTime(), parm)
    },
    //获取按钮权限
    getFunctionsByMenu: function (parm) {
        return axios.post('/med/dezhou/auth/resource/getFunctionsByMenu.do?t=' + new Date().getTime(), parm)
    },

    //首页模块
    //历史医废总量
    fpAll: function (parm) {
        return axios.post('/med/dezhou/company/web/hwStatIndex/totalWeight/all.do?t=' + new Date().getTime(), parm)
    },
    //今日新增量
    fpUpload: function (parm) {
        return axios.post('/med/dezhou/company/web/hwStatIndex/totalWeight/upload.do?t=' + new Date().getTime(), parm)
    },
    //今日入库量
    fpCompanyIn: function (parm) {
        return axios.post('/med/dezhou/company/web/hwStatIndex/totalWeight/companyIn.do?t=' + new Date().getTime(), parm)
    },
    //今日销毁量
    fpDestroy: function (parm) {
        return axios.post('/med/dezhou/company/web/hwStatIndex/totalWeight/destroy.do?t=' + new Date().getTime(), parm)
    },
    //近30天医废类型占比
    fpTypeWeight: function (parm) {
        return axios.post('/med/dezhou/company/web/hwStatIndex/typeWeight.do?t=' + new Date().getTime(), parm)
    },
    //近30天新增总量趋势
    fpUploadTrend: function (parm) {
        return axios.post('/med/dezhou/company/web/hwStatIndex/uploadTrend.do?t=' + new Date().getTime(), parm)
    },
    //各月医废回收量
    fpCompanyInByMonth: function (parm) {
        return axios.post('/med/dezhou/company/web/hwStatIndex/companyInByMonth.do?t=' + new Date().getTime(), parm)
    },
    //医废重量区域占比
    fpCompanyInByInstType: function (parm) {
        return axios.post('/med/dezhou/company/web/hwStatIndex/companyInByInstType.do?t=' + new Date().getTime(), parm)
    },

}