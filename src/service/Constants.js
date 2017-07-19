/**
 * Created by zhangweiwei on 16/9/7.
 */

export const method = {
    login: "m=bang&f=memberSt&v=login",
    orderlist: 'm=hkapp&f=order2&v=orderList',
    nodelist: 'm=hkapp&f=order&v=nodeList',
    getNowNode: 'm=hkapp&f=order&v=getNowNode',                             //获取订单当前节点
    checkUnadd: 'm=hkapp&f=order&v=checkUnadd',                             //检测节点
    myLoglist: 'm=hkapp&f=orderLog&v=myLoglist',
    hkDataList: 'm=hkapp&f=evaluate&v=hkDataList',                          //个人中心-管家数据
    schedule: 'm=hkapp&f=evaluate&v=schedule',                              //个人中心-badge
    evaluateList: 'm=hkapp&f=evaluate&v=evaluateList',                      //业主评价列表
    save_photo: 'm=hkapp&f=uploadImage&v=save_photo',                       //上传图片
    cm_profile: 'r=order/profile',                                          //城市经理-个人中心页面
    cm_evaluateList: 'r=owner/owner-comment-list',                          //城市经理-评价列表
    cm_evaluateDetail: 'r=owner/owner-comment',                             //城市经理-评价详情
    cm_month_info: 'r=order/month-info',                                    //城市经理-本月派单/见面/量房
    cm_month_money: 'r=order/month-money',                                  //城市经理-定金列表/合同列表/反推单列表
    cm_orderList: 'r=order/get-order-base-info',                            //城市经理订单列表
    cm_add_remark: 'r=order/add-city-manager-remark',                       //城市经理订单列表-添加管家备注
    cm_stewardJList: 'r=order/steward-manager-list ',                       //城市经理-管家列表
    cm_fpjl: 'r=order/add-steward-manager',                                 //城市经理-分配管家操作
    cm_wfcj: 'r=order/cant-deal-remark',                                    //城市经理-无法承接
    cm_set_order_status :'r=order/set-order-status',                        //城市经理-设置收费单和信息费接口

    cm_fpComp: 'm=hkapp&f=allotOrder&v=fpComp',                             //城市经理-分配公司操作
    cm_companyList: 'm=hkapp&f=allotOrder&v=companyList'                    //城市经理-装修公司列表
}

export const EventBus = {
    userLogin: 'userLogin',
    setTitle: 'setTitle',
    showToast: 'showToast',
    setTitleLeftIcon: 'setTitleLeftIcon',
    update_main_tab_index: 'update_main_tab_index'
};

//主页tab数据

export const Tabs = {
    gj: [{
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
        url: '/user_info',
        img: require('../assets/image/icon_tab_userb.png'),
        act_img: require('../assets/image/icon_tab_userl_act.png'),
        name: '个人中心',
        index: 3
    }],
    csjl: [{
        url: '/cm_order_index',
        img: require('../assets/image/icon_tab_order.png'),
        act_img: require('../assets/image/icon_tab_order_act.png'),
        name: '订单管理',
        index: 0
    }, {
        url: '/user_info',
        img: require('../assets/image/icon_tab_userb.png'),
        act_img: require('../assets/image/icon_tab_userl_act.png'),
        name: '个人中心',
        index: 3
    }]
}

const role_gj = '22';
const role_gjjl = '21';
export const role_csjl = '38';

export const User = {
    menus: [{
        title: '工作日程',
        path: '',
        role: [role_gj, role_gjjl],
        count: 0
    }, {
        title: '待处理订单',
        path: 'cm_order_index',//my_order
        role: [role_gj, role_gjjl, role_csjl],
        count: 0
    }, {
        title: '业主评价',
        path: 'evaluate_list',
        role: [role_gj, role_gjjl, role_csjl],
        count: 0
    }, {
        title: '异常日志',
        path: 'my_log',
        query: {tab: 2},
        role: [role_gj, role_gjjl],
        count: 0
    }]
}

/**
 *  订单列表页 查询选项
 */
export const Order = {
    menu: [{
        img: require('../assets/image/icon_order_apply_manage.png'),
        title: '测试',
        path: 'order_test',
        role: [role_gj, role_gjjl],
    }, {
        img: require('../assets/image/icon_order_apply_manage.png'),
        title: '我的订单',
        path: 'my_order',
        role: [role_gj, role_gjjl],
    }, {
        img: require('../assets/image/icon_order_myorder.png'),
        title: '分配订单',
        path: '',
        role: [role_gjjl],
    }, {
        img: require('../assets/image/icon_order_orderallot.png'),
        title: '申请管理',
        path: '',
        role: [role_gjjl]
    }, {
        img: require('../assets/image/icon_order_orderallot.png'),
        title: '我的申请',
        path: '',
        role: [role_gj]
    }],
    search_field: [{
        title: '订单编号',
        value: 0,
        key: 'order_no',
        hintText: '请输入订单编号',
        type: 'number'
    }, {
        title: '用户名称',
        value: 1,
        key: 'title',
        hintText: '请输入用户名称',
        type: 'text'
    }, {
        title: '小区地址',
        value: 2,
        key: 'address',
        hintText: '请输入小区地址',
        type: 'text'
    },],
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
    }],
    node: {
        before: [{
            name: '预约见面'
        }, {
            name: '见面'
        }, {
            name: '预约量房'
        }, {
            name: '上面量房'
        }, {
            name: '报价审核'
        }, {
            name: '签订意向定金'
        }, {
            name: '预交底'
        }, {
            name: '签订三方合同'
        }],
        going: [{
            name: '开工仪式'
        }, {
            name: '水电材料验收'
        }, {
            name: '水电工程验收'
        }, {
            name: '防水工程验收'
        }, {
            name: '瓦木材料验收'
        }, {
            name: '瓦木工程验收'
        }, {
            name: '油漆材料验收'
        }, {
            name: '油漆工程验收'
        }, {
            name: '安装工程验收'
        }, {
            name: '竣工验收'
        }],
        after: [{
            name: '第一次环保监测'
        }, {
            name: '第二次环保监测'
        }, {
            name: '维保'
        }, {
            name: '环保治理'
        }, {
            name: '环保治理后复测'
        }],
        other: [{
            name: '日志封面'
        }, {
            name: '上门服务'
        }, {
            name: '装修对比图'
        }, {
            name: '添加日程'
        }, {
            name: '编辑订单信息'
        }]
    }
}

export const QA = {
    menu: [{
        img: require('../assets/image/icon_qa_myquest.png'),
        title: '我的问答',
        path: '',
        role: [role_gj, role_gjjl],
    }, {
        img: require('../assets/image/icon_qa_questlist.png'),
        title: '问题列表',
        path: '',
        role: [role_gj, role_gjjl],
    }, {
        img: require('../assets/image/icon_qa_knowledge.png'),
        title: '知识库',
        path: '',
        role: [role_gj, role_gjjl],
    }]
}

export const Log = {
    menu: [{
        img: require('../assets/image/icon_log_dailyrecord.png'),
        title: '我的日志',
        path: 'my_log',
        role: [role_gj, role_gjjl],
    }, {
        img: require('../assets/image/icon_log_dailymanage.png'),
        title: '日志管理',
        path: '',
        role: [role_gjjl],
    }],
    tabs: [{
        name: '已完成',
        count: 0,
        value: '0'
    }, {
        name: '进行中',
        count: 0,
        value: '1'
    }, {
        name: '异常',
        count: 0,
        value: '2'
    }]
}

//////////////////////////////////////// 城市经理
/**
 *  订单列表页 查询选项
 */
export const CM_Order = {
    tabs: [{
        name: '待处理',
        value: '1'
    }, {
        name: '已分配',
        value: '2'
    }, {
        name: '无法承接',
        value: '3'
    }, {
        name: '全部订单',
        value: '4'
    }],
    search_field: Order.search_field,
    node: {
        before: [{
            name: '预约见面'
        }, {
            name: '见面'
        }, {
            name: '预约量房'
        }, {
            name: '上面量房'
        }, {
            name: '报价审核'
        }, {
            name: '签订意向定金'
        }, {
            name: '预交底'
        }, {
            name: '签订三方合同'
        }],
        going: [{
            name: '开工仪式'
        }, {
            name: '水电材料验收'
        }, {
            name: '水电工程验收'
        }, {
            name: '防水工程验收'
        }, {
            name: '瓦木材料验收'
        }, {
            name: '瓦木工程验收'
        }, {
            name: '油漆材料验收'
        }, {
            name: '油漆工程验收'
        }, {
            name: '安装工程验收'
        }, {
            name: '竣工验收'
        }],
        after: [{
            name: '第一次环保监测'
        }, {
            name: '第二次环保监测'
        }, {
            name: '维保'
        }, {
            name: '环保治理'
        }, {
            name: '环保治理后复测'
        }],
        other: [{
            name: '日志封面'
        }, {
            name: '上门服务'
        }, {
            name: '装修对比图'
        }, {
            name: '添加日程'
        }, {
            name: '编辑订单信息'
        }]
    }
}


export const Tips = {
    input_null: '输入内容为空',
    search_word_null: '输入内容为空',
    params_null: '参数为空'
}