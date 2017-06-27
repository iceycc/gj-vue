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
        <uz-auto-list ref="listview" :parent="this" :url="url" :handleparam="handleparam">
            <template slot="item" scope="props">
                <div class="filed title">订单编号:{{props.item.order_no}}</div>
                <div class="filed">
                    <i-button v-if="activeTab == 0" type="primary" size="small">分配经理</i-button>
                    <i-button v-if="props.item.managername && props.item.company.length <3" type="primary" size="small">
                        分配公司
                    </i-button>
                    <i-button type="primary" size="small" @click="openDialog('unable')">无法承接</i-button>
                    <i-button type="primary" size="small" @click="openDialog('charge')">收费单</i-button>
                    <i-button v-if="activeTab == 0" type="primary" size="small" @click="openDialog('info')">信息费
                    </i-button>
                </div>
                <div class="filed">
                    用户名:{{props.item.title}}  订单来源:{{props.item.source}}  订单状态:{{props.item.orderstatus}}
                </div>
                <div class="filed">房屋面积:{{props.item.area}}平  管家经理:{{props.item.managername}}</div>

                <div class="filed">装修公司：<br><span v-for="(name,index) in props.item.company">{{name}}<br></span></div>

                <div class="filed">下单时间:{{props.item.addtime}}<br>分单时间:{{props.item.fdtime}}</div>
                <div class="filed">装修预算:{{props.item.budget}}万元 装修方式:{{props.item.way}} 装修风格:{{props.item.style}}</div>
                <div class="filed">客服备注:</div>
                <div class="filed">城市经理备注:</div>
                <div class="filed">城市区域:{{props.item.cityName}}</div>
                <div class="filed">详细地址:{{props.item.address}}</div>
            </template>
        </uz-auto-list>
        <mu-dialog :open="dialog[dialog.type]" :title="dialog.title" @close="closeDialog">
            此订单为信息费订单：
            <i-button slot="actions" size="small" @click="closeDialog(false)">取消</i-button>
            <i-button slot="actions" type="primary" size="small" @click="closeDialog(true)" style="margin-left: 20px">
                确定
            </i-button>
        </mu-dialog>
    </div>
</template>

<script>
    import {EventBus, Constants, API} from  '../../../service/index';
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
                    note: false,
                    unable: false,
                    charge: false,
                    info: false,
                    type: '',
                    title: ''
                },
                activeTab: 0,
                tabs: Constants.CM_Order.tabs,
                activeTab1: 0,
                tabs1: [{
                    name: '无法承接',
                    value: '1'
                }, {
                    name: '信息费',
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
                search_field: Constants.CM_Order.search_field,
                url: Constants.method.cm_orderList
            }
        },
        computed: {
            listview: function () {
                return this.$refs.listview;
            }
        },
        mounted () {
            api = new API(this);
        },
        methods: {
            doSearch(){
                if (this.search_word.trim()) {
                    this.listview.initList();
                    this.listview.getdata();
                } else {
                    EventBus.$emit(Constants.EventBus.showToast, {
                        message: Constants.Tips.search_word_null
                    });
                }
            },
            handleparam(){
                let param = {};
                if (this.search_word.trim()) {
                    param.keyword = this.search_word;
                }

                param.type = this.activeTab;
                return param;
            },
            closeDialog(){
                this.dialog[this.dialog.type] = false;
            },
            openDialog(type){
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
                        this.dialog.title = '此订单是否确定为收费订单';
                        break;
                    case 'info':
                        this.dialog.title = '信息费';
                        this.dialog.title = '此订单是否确定为信息费订单';
                        break;
                }

                this.dialog[type] = true;
                this.dialog.type = type;
            },
            handleTabChange(val)
            {
                this.activeTab = val;

                this.search_word = '';
                this.listview.initList();
                this.listview.getdata();
            },
            handleTabChange1(val)
            {
                if (this.activeTab == 2) {
                    this.activeTab1 = val;
                } else if (this.activeTab == 3) {
                    this.activeTab2 = val;
                }

                this.search_word = '';
                this.listview.initList();
                this.listview.getdata();
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../style/px2rem";

    ._page {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .tabs {
        border-top: 0px;
    }

    .search_bar {
        margin-top: 0;
    }

    .filed {
        padding: px2rem(10);
        font-size: px2rem(8);
        width: 100%;
        border-bottom: 1px solid #a7aec2;
    }

    .filed:first-child {
        padding-top: 0;
    }

    .filed:last-child {
        border-bottom: 0;
    }
</style>
