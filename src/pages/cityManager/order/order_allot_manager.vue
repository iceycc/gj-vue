<template>
    <div class="_page">
        <div class="search_bar">
            <mu-text-field class="search_text" hintText="请输入管家姓名"
                           type="text"
                           v-model="search_word"/>
            <mu-icon-button icon="search" slot="right" @click="doSearch"/>
        </div>
        <!--   @loadMore="loadMore" @itemOnClick="itemOnClick"-->
        <uz-auto-list ref="listview" :parent="this" :url="url" :handleparam="handleparam">
            <template slot="item" scope="props">
                <div class="filed title">
                    <div class="name">管家姓名:{{props.item.gjname}}</div>
                    <i-button type="primary" size="small" @click="openDialog(props.item.gjname.uid)">分配</i-button>
                </div>
            </template>
        </uz-auto-list>
    </div>
</template>

<script>
    import {EventBus, Constants, API} from  '../../../service/index';
    import UzGrid from "../../../components/Grid";
    import UzTabs from "../../../components/Tabs";
    import UzAutoList from "../../../components/AutoList";
    import Button from "iview/src/components/button/button";

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
                search_word: '',
                search_type: 0,
                url: Constants.method.cm_stewardJList,
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
            handleparam(){//处理参数
                let param = {};
                if (this.search_word.trim()) {
                    param.keyWord = this.search_word
                }
                return param;
            },
            itemOnClick(index){
                let temp = this.list[index];
                temp.spread = !temp.spread;
                this.list[index] = temp;
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
                this.initList();
                this.getdata();
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
            flex-grow: 1;
        }
    }
</style>
