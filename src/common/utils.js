export default {
    install(Vue) {
        Vue.prototype.filedownload = function (obj) {
            console.log(typeof obj)
            if (typeof obj != 'object') {
                throw '请传入一个对象';
                return;
            }
            if (obj.dom) {
                document.getElementsByClassName(obj.dom).innerHtml = '导出中...'
            }
            var xhr = new XMLHttpRequest();
            xhr.open('post', obj.url, true);
            xhr.responseType = 'blob';
            xhr.setRequestHeader('X-Auth-Token', window.localStorage.getItem("token"));
            xhr.setRequestHeader('content-type', 'application/json');
            var parm = JSON.stringify(obj.data)
            xhr.send(parm);
            xhr.onload = function (e) {
                if (this.status == 200 || this.status == 304) {
                    var filename = xhr.getResponseHeader('content-disposition').split(';')[1].split('=')[1]
                    var blob = new Blob([xhr.response], {
                        type: "application/vnd.ms-excel"
                    });

                    var objectUrl = URL.createObjectURL(blob);
                    if ('msSaveOrOpenBlob' in navigator) {
                        window.navigator.msSaveOrOpenBlob(blob, window.decodeURI(filename));
                        if (obj.dom) {
                            document.getElementsByClassName(obj.dom).innerHtml = '导出'
                        }
                    } else {
                        var a = document.createElement('a');
                        a.download = window.decodeURI(filename);
                        a.href = objectUrl;
                        a.click();
                        a.remove();
                        if (obj.dom) {
                            document.getElementsByClassName(obj.dom).innerHtml = '导出'
                        }
                    }

                }
            }
        }
    }
}