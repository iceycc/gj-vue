/**
 * Created by zhangweiwei on 2017/04/10.
 * https://ykloveyxk.github.io/2017/02/25/axios%E5%85%A8%E6%94%BB%E7%95%A5/ axios全攻略
 */

import axios from 'axios'
import config from './config'
import Qs from 'qs'
import {EventBus, Constants, JsBridge} from '../service/index';

class API {

    constructor(view) {
        this.that = view;
    }

    post(url, param, success, fail, finish) {
        return this._request(url, 'post', param, success, fail, finish)
    }

    get(url, param, success, fail, finish) {
        return this._request(url, 'get', param, success, fail, finish)
    }

    isHasHttp(url) {
        return url.indexOf('http') === 0
    }

    _request(url, type, param, success, fail, finish) {
        url = this.isHasHttp(url) ? url : config.baseURL + '?' + url;

        config.method = type;

        //添加请求参数
        if (!param) {
            param = {};
        }
        let userStr = JsBridge.getStorage('user');
        if (userStr) {
            let user = JSON.parse(userStr);
            param.mid = user.uid;
            param.m_city = user.cityarea;
            param.app_env = '' + process.env.NODE_ENV;
            param.app_version = process.env.NODE_VERSION;
            param.app_model = navigator.userAgent;
        }

        /*        param.mid = 21922;
                param.m_city = 3360;*/

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
            console.log(response);
            let result = response.data;

            success(result, response);

            /*            if (response.code === 0) {
                            if (success) {

                            }
                        } else {
                            if (fail) {
                                fail(result);
                            }
                            EventBus.$emit(Constants.EventBus.showToast, {
                                message: result.message
                            });
                        }*/

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