<template>
    <div class="_page">
        <div class="search_bar">
            <mu-text-field class="search_text" hintText="请输入装修公司名称"
                           type="text"
                           v-model="search_word"/>
            <mu-icon-button icon="search" slot="right" @click="doSearch"/>
        </div>
        <uz-auto-list ref="listview" :parent="this" :url="url" :handleparam="handleparam">
            <template slot="item" scope="props">
                <div class="filed title">
                    <div class="name">公司名称:{{props.item.companyname}}</div>
                    <i-checkbox v-model="props.item.checked"></i-checkbox>
                </div>
            </template>
        </uz-auto-list>
        <i-button class="sub-btn" type="primary" size="small" @click="action">提交</i-button>
    </div>
</template>

<script>
    import {EventBus, Constants, API} from  '../../../service/index';
    import UzGrid from "../../../components/Grid";
    import UzTabs from "../../../components/Tabs";
    import UzAutoList from "../../../components/AutoList";
    import Button from "iview/src/components/button";
    import Checkbox from "iview/src/components/checkbox/checkbox";

    let api;

    export default {
        components: {
            'i-checkbox': Checkbox,
            'i-button': Button,
            UzAutoList,
            UzTabs,
            UzGrid
        },
        name: 'cm-order-allot-company',
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
                search_word: '',
                search_type: 0,
                url: Constants.method.cm_companyList,
            }
        },
        computed: {
            listview: function () {
                return this.$refs.listview;
            },
            order_id: function () {
                return this.$route.query.order_id;
            }
        },
        mounted () {
            api = new API(this);
        },
        created(){
        },
        methods: {
            doSearch(){
                this.listview.initList();
                this.listview.getdata();
            },
            handleparam(){
                let param = {};
                if (this.search_word.trim()) {
                    param.keyWord = this.search_word.trim()
                }
                param.orderid = this.order_id;

                return param;
            },
            action(){
                let list = this.listview.getCheckList();
                if (list.length == 0) {
                    EventBus.$emit(Constants.EventBus.showToast, {
                        message: "至少选择1家装修公司"
                    });
                } else if (list.length > 3) {
                    EventBus.$emit(Constants.EventBus.showToast, {
                        message: "最多选择3家装修公司"
                    });
                } else {
                    let param = {};
                    param.orderid = this.order_id;

                    let company = '';
                    list.forEach((item) => {
                        company = company + item.uid + ',';
                    })
                    param.compid = company;

                    this.allot_company(param);
                }
            },
            allot_company(param){
                api.post(Constants.method.cm_fpComp, param, (result) => {
                    console.log(result);
                });
            },
            closeDialog(){
                this.dialog[this.dialog.type] = false;
            },
            openDialog(type){

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
        font-size: 16px;
        display: flex;
        flex-direction: row;
        .name {
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            flex-grow: 1;
        }
    }

    .sub-btn {
        padding: 10px;
        margin: 10px;
    }
</style>
