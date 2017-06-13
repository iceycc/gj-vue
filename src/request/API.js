/**
 * Created by zhangweiwei on 2017/04/10.
 */

import Vue from 'vue'
import axios from 'axios'
import config from './config'
import Qs from 'qs'
import {EventBus, Constants} from  '../service/index';

class API {

    constructor(view) {
        this.that = view;
    }

    post(url, param, success, fail, finish) {
        let _url = Constants.method.baseURL + '?' + url;
        return this._request(_url, 'post', param, success, fail, finish)
    }

    get(url, param) {
        // config.params = param;
        //return axios.get("", config);

        let _url = url;
        if (param)
            _url = _url + '?' + Qs.stringify(param)

        return this._request(_url, 'get')
    }

    _request(url, type, param, success, fail, finish) {

        if (!param) {
            param = {};
        }

        //默认添加登录参数
        let userStr = Vue.localStorage.get('user');
        if (userStr) {
            let user = JSON.parse(userStr);
            param.uid = user.uid;
        }

        if (type === 'get') {
            config.params = param;
        } else {
            config.data = param;
        }

        config.method = type;

        let request;
        if (type === 'get') {
            request = axios.get(url, config)
        } else {
            request = axios[type](url, null, config)
        }

        request.then((response) => {
            let result = response.data;

            if (!('code' in result)) {
                success(result);
                return;
            }
            if (result.code == 1) {
                if (success) {
                    success(result);
                }
            } else {
                if (fail) {
                    fail(result);
                }
                EventBus.$emit(Constants.EventBus.showToast, {
                    message: result.message
                });
            }
        }).catch((error) => {
        })

        return request;
    }

}
export default API;