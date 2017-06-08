/**
 * Created by zhangweiwei on 16/9/7.
 */

export const EventBus = {
    userLogin: 'userLogin',
    setTitle: 'setTitle',
    showToast: 'showToast',
    setTitleLeftIcon: 'setTitleLeftIcon',
    update_main_tab_index: 'update_main_tab_index'
};

//主页tab数据
export const Tabs = [{
    url: '/order',
    img: require('../assets/image/icon_tab_order.png'),
    act_img: require('../assets/image/icon_tab_order_act.png'),
    name: '订单管理',
    index: 0
}, {
    url: '/zhuge',
    img: require('../assets/image/icon_tab_zgzxb.png'),
    act_img: require('../assets/image/icon_tab_zgzxl_act.png'),
    name: '诸葛装修',
    index: 1
}, {
    url: '/log',
    img: require('../assets/image/icon_tab_log.png'),
    act_img: require('../assets/image/icon_tab_log_act.png'),
    name: '日志',
    title: '日志管理',
    index: 2
}, {
    url: '/userinfo',
    img: require('../assets/image/icon_tab_userb.png'),
    act_img: require('../assets/image/icon_tab_userl_act.png'),
    name: '个人中心',
    index: 3
}];

/**
 *  订单列表页 查询选项
 */
export const Order = {
    search_field: [{
        title: '小区地址',
        value: 0,
        key: 'address',
        hintText: '请输入小区地址',
        type: 'text'
    }, {
        title: '用户名称',
        value: 1,
        key: 'title',
        hintText: '请输入用户名称',
        type: 'text'
    }, {
        title: '手机号码',
        value: 2,
        key: 'telephone',
        hintText: '请输入手机号码',
        type: 'number'
    }, {
        title: '订单编号',
        value: 3,
        key: 'order_no',
        hintText: '请输入订单编号',
        type: 'number'
    }],
    tabs: [{
        name: '待处理',
        count: 0,
        value: '1'
    }, {
        name: '进行中',
        count: 0,
        value: '2'
    }, {
        name: '已竣工',
        count: 0,
        value: '3'
    }, {
        name: '已完成',
        value: '4'
    }, {
        name: '已终止',
        count: 0,
        value: '5'
    }]
}

export const Tips = {
    input_null: '输入内容为空',
    search_word_null: '输入内容为空',
    params_null:'参数为空'
}