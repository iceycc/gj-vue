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
            }
        },
        mounted () {
            api = new API(this);
        },
        created(){
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
