/**
 * Created by zhangweiwei on 2017/6/12.
 */

const name = 'native';

/**
 * 选择图片数量
 * @param count
 */
function seletcAlbum(count, callback) {
    if (isSupport()) {
        window[name].seletcAlbum(count);
        window.onSelectAlbum = function (data) {
            if (callback) {
                callback(JSON.parse(data));
            }
        }
    }
};


/**
 * 发起请求
 * @param count
 */
function sendRequest(url, values, files, callback) {
    if (isSupport()) {
        window[name].sendRequest(url, values ? JSON.stringify(values) : '', files ? JSON.stringify(files) : '');
        window.onResult = function (data) {
            if (callback) {
                callback(JSON.parse(data));
            }
        }
    }
};

function isSupport() {

    if (window[name]) {
        return true;
    }
    alert('设备不支持.');
}

export {seletcAlbum, sendRequest};