/**
 * Created by zhangweiwei on 2017/6/12.
 */

const name = 'native';

/**
 * 选择图片数量
 * @param count
 */
function seletcAlbum(count, callback) {
    if (window[name]) {
        window[name].seletcAlbum(count);

        window.onSelectAlbum = function (data) {
            if (callback) {
                callback(JSON.parse(data));
            }
        }
    } else {
        noSupport();
    }
};


function noSupport() {
    alert('设备不支持.');
}

export {seletcAlbum};