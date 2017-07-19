/**
 * Created by zhangweiwei on 2017/04/10.
 * https://ykloveyxk.github.io/2017/02/25/axios%E5%85%A8%E6%94%BB%E7%95%A5/ axios全攻略
 */

import axios from 'axios'
import config from './config'
import Qs from 'qs'
import {EventBus, Constants, JsBridge} from  '../service/index';

class API {

    constructor(view) {
        this.that = view;
    }

    post(url, param, success, fail, finish) {
        let _url = config.baseURL + '?' + url;
        return this._request(_url, 'post', param, success, fail, finish)
    }

    get(url, param, success, fail, finish) {
        let _url = url;
        if (param)
            _url = config.baseURL + '?' + url + '&' + Qs.stringify(param);
        return this._request(_url, 'get', success, fail, finish)
    }

    _request(url, type, param, success, fail, finish) {
        config.method = type;

        //添加请求参数
        if (!param) {
            param = {};
        }
        let userStr = JsBridge.getStorage('user');
        if (userStr) {
            let user = JSON.parse(userStr);
            param.uid = user.uid;
            param.app_env = '' + process.env.NODE_ENV;
            param.app_version = process.env.NODE_VERSION;
            param.app_model = navigator.userAgent;
        }

        if (url.indexOf('10.1.40.81') != -1) {//测试数据
            param.mid = 21922;
            param.m_city = 3360;
        }

        let request;
        switch (config.method) {
            case 'get':
                config.params = param;
                request = axios.get(url, config);
                break;
            default:
                config.data = param;
                request = axios[type](url, null, config)
        }

        request.then((response) => {
            let result = response.data;
            if (response.code === 0) {
                if (success) {
                    success(result, response);
                }
            } else {
                if (fail) {
                    fail(result);
                }
                EventBus.$emit(Constants.EventBus.showToast, {
                    message: result.message
                });
            }

            if (finish)
                finish();
        }).catch((error) => {

            if (finish)
                finish();
        });

        return request;
    }

}
export default API;