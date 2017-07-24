<template>
    <div class="_page">
        <div class="search_bar">
            <mu-text-field class="search_text" hintText="请输入装修公司名称"
                           type="text" v-model="search_word"/>
            <mu-icon-button icon="search" slot="right" @click="doSearch"/>
        </div>
        <uz-auto-list ref="listview" :url="url">
            <template slot="item" scope="props">
                <div class="filed title">
                    <div class="name">
                        <span class="tag"
                              v-if="props.item.like_corp || props.item.promp_corp">{{props.item.like_corp ? '意向' : ''}} {{props.item.promp_corp ? '活动' : ''}} </span>{{props.item.corpName}}
                    </div>
                    <i-checkbox v-model="props.item.checked"></i-checkbox>
                </div>
            </template>
        </uz-auto-list>
        <i-button class="sub-btn" type="primary" size="small" @click="action">提交</i-button>
    </div>
</template>

<script>
    import {EventBus, Constants, API} from '../../../service/index';
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
                search_word: '',
                url: Constants.method.cm_corp_list,
            }
        },
        computed: {
            listview: function () {
                return this.$refs.listview;
            },
            order_no: function () {
                return this.$route.query.orderNo;
            }
        },
        mounted() {
            api = new API(this);
        },
        created() {
        },
        methods: {
            doSearch() {
                this.listview.rest();
            },
            handleParam() {
                let param = {};
                if (this.search_word.trim()) {
                    param.keyword = this.search_word.trim()
                }
                param.order_no = this.order_no;

                return param;
            },
            action() {
                let list = this.listview.getCheckList();
                console.log(list);
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
                    param.order_no = this.order_no;

                    let company = '';
                    list.forEach((item) => {
                        company = company + item.corpNo + ',';
                    });
                    param.corp_no = company.substring(0, company.length - 1);

                    this.allot_company(param);
                }
            },
            allot_company(param) {
                api.post(Constants.method.cm_assign_corp, param, (result) => {
                    console.log(result);
                });
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

    .filed {
        padding: 10px;
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
            .tag {
                background: #ed3f14;
                color: #FFFFFF;
                padding: 3px;
                margin-right: 5px;
            }
        }
    }

    .sub-btn {
        padding: 10px;
        margin: 10px;
    }
</style>
