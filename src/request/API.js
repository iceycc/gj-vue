/**
 * Created by zhangweiwei on 2017/04/10.
 */

import axios from 'axios'
import config from './config'
import Qs from 'qs'

let test = 'http://10.1.40.42/bang/www/';
let test1 = 'http://bpre.uz.com/';
let test2 = 'http://bang.uz.com/';

class API {

    constructor(view) {
        this.that = view;
    }
    //http://bang.uz.com/
    method = {
        baseURL: test2 + 'index.php',
        login: "m=bang&f=memberSt&v=login",
        orderlist: 'm=hkapp&f=order2&v=orderList',
        nodelist:'m=hkapp&f=order&v=nodeList',
    }

    post(url, param) {
        let _url = this.method.baseURL + '?' + url;
        return this._request(_url, 'post', param)
    }

    get(url, param) {
        // config.params = param;
        //return axios.get("", config);

        let _url = url;
        if (param)
            _url = _url + '?' + Qs.stringify(param)

        return this._request(_url, 'get')
    }

    _request(url, type, param) {
        if (param) {
            param.uid = "25416";
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
        }).catch((error) => {
        })
        return request;
    }

}
export default API;