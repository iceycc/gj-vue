import Vue from 'vue'
import Router from 'vue-router'

import {EventBus, Constants} from  '../service/index';
import pages from '../pages/index.js'

Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'index',
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
                component: pages.User_Index
            }]
        },
        {
            path: '/user_login',
            name: 'user_login',
            component: pages.User_Login
        },
        {
            path: '/my_order',
            name: 'my_order',
            component: pages.Order_My
        },
        {
            path: '/order_info',
            name: 'order_info',
            component: pages.Order_Info
        },
        {
            path: '/order_node',
            name: 'order_node',
            component: pages.Order_Node
        }
    ]
})

router.beforeEach((to, from, next) => {

    let user = Vue.localStorage.get('user');
    console.log(user);

    if (!user && to.name != 'user_login') {
        console.log('用户未登录');
        next({name: 'user_login'});
        return;
    }

    let tabs = ['/', '/log', '/zhuge', '/order', '/userinfo'];

    console.log(tabs.indexOf(to.path));
    if (tabs.indexOf(to.path) != -1) { //控制返回箭头
        console.log(1);
        EventBus.$emit(Constants.EventBus.setTitleLeftIcon, '');
    } else {
        console.log(2);
        EventBus.$emit(Constants.EventBus.setTitleLeftIcon, 'arrow_back');
    }

    console.log(to, from);
    next();
})

export default router ;