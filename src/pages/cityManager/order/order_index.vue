<template>
    <div class="_page">
        <uz-tabs :tabs="tabs" :activeTab="activeTab" :border="true" @change="handleTabChange"></uz-tabs>
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
                    <i-button type="primary" size="small">分配公司</i-button>
                    <i-button type="primary" size="small">分配经理</i-button>
                    <i-button type="primary" size="small" @click="openDialog('unable')">无法承接</i-button>
                    <i-button type="primary" size="small" @click="openDialog('charge')">收费单</i-button>
                    <i-button type="primary" size="small" @click="openDialog('info')">信息费</i-button>
                </div>
                <div class="filed">
                    用户名:{{props.item.title}}  订单来源:{{props.item.source}}  订单状态:{{props.item.orderstatus}}
                </div>
                <div class="filed">房屋面积:{{props.item.area}}平  管家经理:{{props.item.managername}}</div>

                <div class="filed">装修公司：<span v-for="(name,index) in props.item.company">{{name}}<br></span></div>

                <div class="filed">下单时间:{{props.item.addtime}} 分单时间:{{props.item.fdtime}}</div>
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
    import Button from "iview/src/components/button/button";
    import UzAutoList from "../../../components/AutoList";

    let api;

    export default {
        components: {
            UzAutoList,
            'i-button': Button,
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
                    param.keyword = this.search_word
                }
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
            }
        }
    }
</script>

<style lang="scss" scoped>

    ._page {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .tabs {
        border-top: 0px;
    }

    .filed {
        padding: 10px;
        font-size: 14px;
        width: 100%;
        border-bottom: 1px #cccccc solid;
    }

    .title {
        font-size: 16px;
    }

    .filed:first-child {
        padding-top: 0;
    }

    .filed:last-child {
        border-bottom: 0px;
    }
</style>
