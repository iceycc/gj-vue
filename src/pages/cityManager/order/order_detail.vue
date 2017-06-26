<template>
    <div class="_page">
        <collapse>
            <panel name="base">
                基本信息
                <div slot="content">
                    <div></div>
                </div>
            </panel>
            <panel name="company">
                装修公司
                <div slot="content">
                    wahahahah
                </div>
            </panel>
            <panel name="payinfo">
                支付信息
                <div slot="content">
                    wahahahah
                </div>
            </panel>
            <panel name="payinfo1">
                支付信息录入
                <div slot="content">
                    wahahahah
                </div>
            </panel>
        </collapse>
    </div>
</template>

<script>
    import {EventBus, Constants, API} from  '../../../service/index';
    import Button from "iview/src/components/button";
    import Collapse from "iview/src/components/collapse";

    let api;

    export default {
        components: {
            Collapse,
            'Panel': Collapse.Panel,
            'i-button': Button,
        },
        name: 'cm-order-detail',
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
