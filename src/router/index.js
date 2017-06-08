import Vue from 'vue'
import Router from 'vue-router'

import {EventBus, Constants} from  '../service/index';
import pages from '../pages/index.js'

Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: pages.Index,
            children: [{
                path: 'order',
                name: 'order',
                component: pages.Order_Index
            }, {
                path: 'zhuge',
                name: 'zhuge',
                component: pages.QA_Index
            }, {
                path: 'log',
                name: 'log',
                component: pages.Log_Index
            }, {
                path: 'userinfo',
                name: 'userinfo',
                component: pages.UserInfo_Index
            }]
        },
        {
            path: '/my_order',
            name: 'my_order',
            component: pages.Order_My
        },
        {
            path:'/order_info',
            name:'order_info',
            component: pages.Order_Info
        }
    ]
})

router.beforeEach((to, from, next) => {

    let tabs = ['/log', '/zhuge', '/order', '/userinfo'];
    if (tabs.indexOf(to.path) != -1) { //控制返回箭头
        EventBus.$emit(Constants.EventBus.setTitleLeftIcon, '');
    } else {
        EventBus.$emit(Constants.EventBus.setTitleLeftIcon, 'arrow_back');
    }

    console.log(to, from);
    next();
})

export default router ;