import Vue from 'vue'
import Router from 'vue-router'

import {EventBus, Constants, JsBridge} from  '../service/index';
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
                component: pages.Order_Index,
                meta: {title: '订单管理', notKeepAlive: false}
            }, {
                path: 'zhuge',
                name: 'zhuge',
                component: pages.QA_Index,
                meta: {title: '诸葛装修', notKeepAlive: false}
            }, {
                path: 'log',
                name: 'log',
                component: pages.Log_Index,
                meta: {title: '日志管理', notKeepAlive: false}
            }, {
                path: '/user_info',
                name: 'user_info',
                component: pages.User_Index,
                meta: {title: '个人中心', notKeepAlive: true}
            }, {
                path: '/cm_order_index',
                name: 'cm_order_index',
                component: pages.CM_Order_Index,
                meta: {title: '订单管理'}
            }]
        },
        {
            path: '/user_login',
            name: 'user_login',
            component: pages.User_Login,
            meta: {title: '登录'}
        },
        {
            path: '/my_log',
            name: 'my_log',
            component: pages.Log_My,
            meta: {title: '我的日志'}
        },
        {
            path: '/my_order',
            name: 'my_order',
            component: pages.Order_My,
            meta: {title: '我的订单'}
        },
        {
            path: '/order_info',
            name: 'order_info',
            component: pages.Order_Info,
            meta: {title: '订单信息'}
        },
        {
            path: '/order_node',
            name: 'order_node',
            component: pages.Order_Node,
            meta: {title: '节点导航'}
        },
        {
            path: '/evaluate_list',
            name: 'evaluate_list',
            component: pages.Evaluate_List,
            meta: {title: '业主评价'}
        },
        {
            path: '/evaluate_detail',
            name: 'evaluate_detail',
            component: pages.Evaluate_Detail,
            meta: {title: '业主评价'}
        },
        {
            path: '/guanjia_data',
            name: 'guanjia_data',
            component: pages.Guanjia_Data,
            meta: {title: '更多数据'}
        },
        {
            path: '/cm_allot_manager',
            name: 'cm_allot_manager',
            component: pages.CM_Order_Allot_Manager,
            meta: {title: '管家列表'}
        },
        {
            path: '/cm_allot_company',
            name: 'cm_allot_company',
            component: pages.CM_Order_Allot_Company,
            meta: {title: '装修公司列表'}
        },
        {
            path: '/cm_order_detail',
            name: 'cm_order_detail',
            component: pages.CM_Order_Detail,
            meta: {title: '订单详情页'}
        },
        {
            path: '/cm_user_allot_list',
            name: 'cm_user_allot_list',
            component: pages.CM_User_Allot_List,
            meta: {title: '本月派单列表页'}
        },
        {
            path: '/order_test',
            name: 'order_test',
            component: pages.order_test,
            meta: {title: '测试'}
        }
    ]
})

router.beforeEach((to, from, next) => {

    let user = JsBridge.getStorage('user');

    if (!user && to.name != 'user_login') {
        console.log('用户未登录');
        next({name: 'user_login'});
        return;
    }

    let tabs = ['/', '/log', '/zhuge', '/order', '/userinfo'];

    if (tabs.indexOf(to.path) != -1) { //控制返回箭头
        EventBus.$emit(Constants.EventBus.setTitleLeftIcon, '');
    } else {
        EventBus.$emit(Constants.EventBus.setTitleLeftIcon, 'arrow_back');
    }


    if (to.meta && to.meta.title) {
        EventBus.$emit(Constants.EventBus.setTitle, to.meta.title);
    }
    next();
})

export default router ;