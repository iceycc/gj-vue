<template>
    <div class="_page">
        <uz-tabs :tabs="tabs" :activeTab="activeTab" :border="true" @change="handleTabChange"></uz-tabs>
        <uz-tabs :tabs="tabs1" v-if="activeTab ==2" :activeTab="activeTab1" :border="true"
                 @change="handleTabChange1"></uz-tabs>
        <uz-tabs :tabs="tabs2" v-if="activeTab ==3" :activeTab="activeTab2" :border="true"
                 @change="handleTabChange1"></uz-tabs>

        <div class="search_bar">
            <mu-select-field v-model="search_type" class="search_type">
                <template v-for="item in search_field">
                    <mu-menu-item :value="item.value" :title="item.title"/>
                </template>
            </mu-select-field>
            <mu-text-field class="search_text" :hintText="search_field[search_type].hintText"
                           :type="search_field[search_type].type"
                           v-model="search_word"/>
            <mu-icon-button icon="search" slot="right" @click="doSearch"/>
        </div>
        <uz-auto-list ref="listview" :url="url">
            <template slot="item" scope="props">
                <div class="filed title"><span class="tag" v-if="props.item.orderMsgFee">外销单</span>
                    <span class="tag"
                          v-if="props.item.orderCharge">收费单</span><span>({{props.item.orderType == 0 ? '平台单' : props.item.orderType == 1 ? '反推单' : '订单类型异常'}})</span>订单编号:{{props.item.orderShow}}
                </div>
                <div class="filed" v-if="props.item.buttons.length > 0">
                    <i-button v-if="props.item.buttons.indexOf(0) > -1" type="primary" size="small"
                              @click="allot_manager(props.item.orderNo)">{{props.item.status === 1 ? '重新分配经理' : '分配经理'}}
                    </i-button>
                    <i-button v-if="props.item.buttons.indexOf(1) > -1" type="primary" size="small"
                              @click="allot_company(props.item.orderNo)">分配公司
                    </i-button>
                    <i-button v-if="props.item.buttons.indexOf(2) > -1" type="info" size="small"
                              @click="openDialog('unable',props.item.orderNo)">无法承接
                    </i-button>
                    <!-- 隐藏收费单按钮-->
<!--                    <i-button v-if="props.item.buttons.indexOf(3) > -1" type="info" size="small"
                              @click="openDialog('charge',props.item.orderNo)">收费单
                    </i-button>-->
                    <i-button v-if="props.item.buttons.indexOf(4) > -1" type="info"
                              size="small"
                              @click="openDialog('info',props.item.orderNo)">外销单
                    </i-button>
                    <i-button v-if="props.item.buttons.indexOf(5) > -1" type="info" size="small"
                              @click="openDialog('uncharge',props.item.orderNo)">取消收费单
                    </i-button>
                </div>
                <div class="filed">
                    用户名:{{props.item.customersName}}  订单来源:{{props.item.orderFrom}}  订单状态:{{props.item.orderStatus}}
                </div>
                <div class="filed">
                    房屋面积:{{props.item.houseArea}}平  管家经理:{{props.item.smName}}
                </div>

                <div class="filed" v-if="props.item.corpList.length > 0">
                    <div class="company_name"><span>装修公司：</span><span v-if="props.item.corpList.length > 0 && props.item.status != 0"
                                                                      @click="allot_applyfor_company(props.item.orderNo)">申请替换</span>
                    </div>
                    <span v-for="(item,index) in props.item.corpList"
                          :class="item.corpStatus != 0 ?'del-line' : ''">{{item.corpName}}<br></span>
                </div>
                <div class="filed" v-if="props.item.sellToCorp" >出售公司: <span style="margin-left: 10px">{{props.item.sellToCorp}}</span></div>
                <div class="filed">
                    下单时间:{{props.item.orderGeneratedTime}}<br>{{props.item.orderAssignTime ? '分单时间:' + props.item.orderAssignTime : ''}}
                </div>
                <div class="filed">
                    装修预算:{{props.item.budget}}万元 装修方式:{{props.item.decorateType}} 装修风格:{{props.item.decorateStyle}}
                </div>
                <div class="filed single" @click="showRemark(props.item,1)">装修需求:{{props.item.content}}</div>
                <div class="filed single" @click="showRemark(props.item,0)">客服备注:{{props.item.serviceRemark}}</div>
                <div class="filed" @click="addCityManagerRemark(props.item.orderNo,props.item.cityManagerRemark)">
                    城市经理备注:{{props.item.cityManagerRemark}}
                </div>
                <div class="filed">城市区域:{{props.item.addr}}</div>
                <div class="filed">详细地址:{{props.item.detailAddr}}</div>
                <div class="filed" v-if="props.item.cantDealReason && props.item.cantDealTime">
                    无法承接原因:{{props.item.cantDealReason}}<br>
                    无法承接操作时间:{{props.item.cantDealTime}}
                </div>
            </template>
        </uz-auto-list>
        <mu-dialog :open="isShowRemark" title="城市经理备注" @close="closeDialog(false)">
            <mu-text-field class="input_text" v-model="cityManagerRemark" multiLine :rows="3" :rowsMax="6"/>
            <i-button slot="actions" size="small" @click="closeDialogManagerRemark(false)">取消</i-button>
            <i-button slot="actions" type="primary" size="small" @click="closeDialogManagerRemark(true)"
                      style="margin-left: 20px">
                编辑
            </i-button>
        </mu-dialog>
        <mu-dialog :open="dialog.show" :title="dialog.title" @close="closeDialog(false)">
            <div v-if="dialog.type != 'unable'">{{dialog.desc}}</div>
            <mu-text-field v-if="dialog.type == 'unable'" class="input_text"
                           :hintText="dialog.desc" v-model="dialog.input" multiLine :rows="3" :rowsMax="6"/>
            <mu-text-field v-if="dialog.type == 'info'" class="input_text"
                           hintText="请填写公司名称" v-model="dialog.input"/>
            <i-button slot="actions" size="small" @click="closeDialog(false)">取消</i-button>
            <i-button slot="actions" type="primary" size="small" @click="closeDialog(true)" style="margin-left: 20px">
                确定
            </i-button>
        </mu-dialog>
        <mu-dialog :open="dialog.show1" :title="dialog.title" @close="closeDialog(false)">
            <div>{{dialog.desc}}</div>
            <i-button slot="actions" type="primary" size="small" @click="closeDialog(false)" style="margin-left: 20px">
                关闭
            </i-button>
        </mu-dialog>
    </div>
</template>

<script>
    import {EventBus, Constants, API, Util} from '../../../service/index';
    import UzGrid from "../../../components/Grid";
    import UzTabs from "../../../components/Tabs";
    import Button from "iview/src/components/button";
    import UzAutoList from "../../../components/AutoList";

    let api;

    export default {
        components: {
            UzAutoList,
            'i-button': Button,
            'i-buttongroup': Button.Group,
            UzTabs,
            UzGrid
        },
        name: 'cm-order-index',
        data() {
            return {
                dialog: {
                    show: false,
                    show1: false,
                    note: false,
                    unable: false,
                    charge: false,
                    info: false,
                    uninfo: false,
                    type: '',
                    title: '',
                    input: ''
                },
                isShowRemark: false,    //城市经理备注对话框
                cityManagerRemark: '',  //城市经理备注内容
                orderNo: '',            //操作中的订单号
                activeTab: 0,
                tabs: Constants.CM_Order.tabs,
                activeTab1: 0,
                tabs1: [{
                    name: '无法承接',
                    value: '1'
                }, {
                    name: '外销单',
                    value: '2'
                }],
                activeTab2: 0,
                tabs2: [{
                    name: '全部订单',
                    value: '1'
                }, {
                    name: '收费单',
                    value: '2'
                }],
                search_word: '',
                search_type: 0,
                needRefresh: false,
                search_field: Constants.CM_Order.search_field_index,
                url: Constants.method.cm_orderList
            }
        },
        computed: {
            listview: function () {
                return this.$refs.listview;
            }
        },
        mounted() {
            api = new API(this);
        },
        activated() {
            EventBus.$emit(Constants.EventBus.update_main_tab_index, 0);
            if ('tab' in this.$route.params) {
                this.handleTabChange(this.$route.params.tab);
            } else {
                if (this.needRefresh) {
                    this.handleTabChange(this.activeTab);
                }
            }
        },
        methods: {
            doSearch() {
                if (this.search_word.trim()) {
                    this.listview.rest();
                } else {
                    EventBus.$emit(Constants.EventBus.showToast, {
                        message: Constants.Tips.search_word_null
                    });
                }
            },
            handleParam() {
                let param = {};
                if (this.search_word.trim()) {
                    param.keyword = this.search_word;
                    param.search_type = this.search_type;
                }

                param.tab = this.activeTab;
                if (this.activeTab === 2 && this.activeTab1 === 1) {
                    param.tab = 4;
                } else if (this.activeTab === 3 && this.activeTab2 === 1) {
                    param.tab = 5;
                }
                return param;
            },
            handleResult(datas) {
                datas.forEach((item, index) => {
                    datas[index].buttons = Util.handleOrderButton(item);
                });
                return datas;
            },
            handleTabChange(val) {
                this.activeTab = val;

                this.search_word = '';
                this.listview.rest();
            },
            handleTabChange1(val) {
                if (this.activeTab == 2) {
                    this.activeTab1 = val;
                } else if (this.activeTab == 3) {
                    this.activeTab2 = val;
                }

                this.search_word = '';
                this.listview.rest();
            },
            allot_manager(order_id) {
                this.needRefresh = true;
                this.$router.push({name: 'cm_allot_manager', query: {orderNo: order_id}});
            },
            allot_company(order_id) {
                this.needRefresh = true;
                this.$router.push({name: 'cm_allot_company', query: {orderNo: order_id}});
            },
            allot_applyfor_company(order_id) {
                this.$router.push({name: 'cm_allot_applyfor_company', query: {orderNo: order_id}});
            },
            addCityManagerRemark(orderNo, cityManagerRemark) {
                this.orderNo = orderNo;
                this.cityManagerRemark = cityManagerRemark;
                this.isShowRemark = true;
            },
            closeDialogManagerRemark(flag) {
                if (flag) {
                    api.post(Constants.method.cm_add_remark, {
                        order_no: this.orderNo,
                        remark: this.cityManagerRemark
                    }, (result) => {
                        this.showToast('备注添加成功');
                        this.listview.rest();
                    }, null, () => {
                        this.orderNo = '';
                        this.cityManagerRemark = '';
                        this.isShowRemark = false;
                    })
                } else {
                    this.orderNo = '';
                    this.cityManagerRemark = '';
                    this.isShowRemark = false;
                }
            },
            showRemark(item, type) {
                this.dialog.show1 = true;
                if (type === 0) {
                    this.dialog.title = '客服备注';
                    this.dialog.desc = item.serviceRemark;
                } else if (type === 1) {
                    this.dialog.title = '装修需求';
                    this.dialog.desc = item.content;
                }
            },
            closeDialog(flag) {
                this.dialog.show = false;
                this.dialog.show1 = false;

                console.log(flag);

                if (flag) {
                    if (this.dialog.type === 'unable' || this.dialog.type === 'info' || this.dialog.type === 'charge' || this.dialog.type === 'uncharge') {//无法承接
                        let url = Constants.method.cm_set_order_status;
                        let param = {
                            order_no: this.orderNo
                        };

                        if (this.dialog.type === 'unable') {
                            url = Constants.method.cm_wfcj;
                            param.remark = this.dialog.input;
                        } else if (this.dialog.type === 'info') {
                            param.sell_to_corp = this.dialog.input;
                            param.set_type = 1;
                        } else if (this.dialog.type === 'charge') {
                            param.set_type = 0;
                        } else if (this.dialog.type === 'uncharge') {
                            param.set_type = 2;
                        }

                        api.post(url, param, () => {
                            this.showToast('设置成功');
                            this.listview.rest();
                        }, null, () => {
                            this.dialog.input = '';
                            this.orderNo = '';
                        })
                    }
                }
            },
            openDialog(type, orderNo) {
                switch (type) {
                    case 'note':
                        this.dialog.title = '城市经理备注';
                        this.dialog.desc = '城市经理备注';
                        break;
                    case 'unable':
                        this.dialog.title = '无法承接';
                        this.dialog.desc = '请添加无法承接原因';
                        break;
                    case 'charge':
                        this.dialog.title = '设置';
                        this.dialog.desc = '此订单是否确定为收费订单';
                        break;
                    case 'uncharge':
                        this.dialog.title = '取消收费单';
                        this.dialog.desc = '取消收费单设置';
                        break;
                    case 'info':
                        this.dialog.title = '外销单';
                        this.dialog.desc = '此订单是否确定为外销单';
                        break;
                }

                this.orderNo = orderNo;
                this.dialog.type = type;
                this.dialog.show = true;
            },
            showToast(message) {
                EventBus.$emit(Constants.EventBus.showToast, {
                    message: message
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../style/px2rem";

    .tabs {
        border-top: 0px;
    }

    .search_bar {
        margin-top: 0;
    }

    //dialog 内输入框
    .input_text {
        width: 100%;
    }

    .single {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .filed {
        padding: px2rem(10);
        font-size: px2rem(14);
        width: 100%;
        border-bottom: 1px solid #e8e8e8;

        .company_name {
            display: flex;
            flex-direction: row;
            span:nth-child(1) {
                flex-grow: 1;
            }
            span:nth-child(2) {
                color: #2b85e4;
            }
        }
    }

    .filed:first-child {
        padding-top: 0;
    }

    .filed:last-child {
        border-bottom: 0;
    }

    .tag {
        background: #2d8cf0;
        color: #FFFFFF;
        padding: 2px 5px;
        margin-right: 10px;
    }

</style>
