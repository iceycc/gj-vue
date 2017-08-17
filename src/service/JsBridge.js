/**
 * Created by zhangweiwei on 2017/6/12.
 */

const name = 'native';

function setStorage(key, val) {
    val = JSON.stringify(val);

    if (isAppcan() && window.uexLocalStorage) {
        window.uexLocalStorage.setItem(key, val);
    } else if (window && window.localStorage) {
        window.localStorage.setItem(key, val)
    }
}

function getStorage(key) {
    if (isAppcan() && window.uexLocalStorage) {
        return window.uexLocalStorage.getItem(key);
    } else if (window && window.localStorage) {
        return window.localStorage.getItem(key);
    }

    return null;
}

function removeStorage(key) {
    if (key) {
        if (isAppcan() && window.uexLocalStorage) {
            window.uexLocalStorage.removeItem(key);
        } else if (window && window.localStorage) {
            window.localStorage.removeItem(key);
        }
    }
}

function clearStorage() {
    if (isAppcan() && window.uexLocalStorage) {
        window.uexLocalStorage.clear();
    } else if (window && window.localStorage) {
        window.localStorage.clear();
    }
}

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


function isAppcan() {
    return window.__uex
}

/**
 * native模块是否可用
 * @returns {boolean}
 */
function isSupport() {

    if (window[name]) {
        return true;
    }
    alert('设备不支持.');
}

export {seletcAlbum, sendRequest, setStorage, getStorage, removeStorage, clearStorage};