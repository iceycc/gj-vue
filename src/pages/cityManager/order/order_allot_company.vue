<template>
    <div class="_page">
        <div class="search_bar">
            <mu-text-field class="search_text" hintText="请输入装修公司名称"
                           type="text" v-model="search_word"/>
            <mu-icon-button icon="search" slot="right" @click="doSearch"/>
        </div>
        <uz-auto-list ref="listview" :url="url">
            <template slot="item" scope="props">
                <div class="filed title" :class="props.item.corp_status == 2 ?'ed' : ''">
                    <div class="name">
                        <span class="tag"
                              v-if="props.item.like_corp || props.item.promp_corp">{{props.item.like_corp ? '意向' : ''}} {{props.item.promp_corp ? '活动' : ''}} </span>{{props.item.corpName}}
                    </div>
                    <i-checkbox v-model="props.item.checked"></i-checkbox>
                </div>
            </template>
        </uz-auto-list>
        <i-button class="sub-btn" type="primary" size="small" @click="action">{{isReplace ? '替换' : '提交'}}</i-button>
        <mu-dialog :open="dialog.show" title="替换原因" @close="closeDialog">
            <mu-text-field class="input_text"
                           hintText="请填写替换原因" v-model="dialog.input" multiLine :rows="3" :rowsMax="6"/>
            <i-button slot="actions" size="small" @click="closeDialog(false)">取消</i-button>
            <i-button slot="actions" type="primary" size="small" @click="closeDialog(true)"
                      style="margin-left: 20px">
                提交
            </i-button>
        </mu-dialog>
    </div>
</template>

<script>
    import {EventBus, Constants, API, mixins} from '../../../service/index';
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
        mixins: [mixins],
        data() {
            return {
                dialog: {
                    show: false,
                    input: ''
                },
                search_word: '',
                isReplace: false,
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
            if (this.$route.query.corpNo) {
                this.setTitle('申请替换');
                this.isReplace = true;
            }
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
                if (list.length == 0) {
                    EventBus.$emit(Constants.EventBus.showToast, {
                        message: "至少选择1家装修公司"
                    });
                } else if (list.length > 1 && this.isReplace) {
                    EventBus.$emit(Constants.EventBus.showToast, {
                        message: "替换模式 只能选择一家公司"
                    });
                }
                else if (list.length > 3) {
                    EventBus.$emit(Constants.EventBus.showToast, {
                        message: "最多选择3家装修公司"
                    });
                }
                else {
                    let param = {};
                    param.order_no = this.order_no;

                    let company = '';
                    list.forEach((item) => {
                        company = company + item.corpNo + ',';
                    });
                    param.corp_no = company.substring(0, company.length - 1);

                    if (this.isReplace) {
                        param.corp_no_replaced = this.$route.query.corpNo;
                        this.showDialog(param);
                    } else {
                        this.allot_company(param);
                    }

                }
            },
            allot_company(param) {
                let url = Constants.method.cm_assign_corp;
                if (this.isReplace) {
                    url = Constants.method.cm_replace_corp;
                }
                api.post(url, param, (result) => {
                    EventBus.$emit(Constants.EventBus.showToast, {
                        message: '操作成功'
                    });
                    this.$router.go(-1);
                });
            },
            showDialog(param) {
                this.dialog.show = true;
                this.dialog.param = param;
            },
            closeDialog(flag) {
                if (flag) {
                    if(this.dialog.input){
                        this.dialog.param.replace_reason = this.dialog.input;
                        this.allot_company(this.dialog.param);
                    }else{
                        EventBus.$emit(Constants.EventBus.showToast, {
                            message: '请填写替换原因'
                        });
                    }
                }
                this.dialog.show = false;
                this.dialog.input = '';
                this.dialog.param = null;
            }
        }
    }
</script>

<style lang="scss" scoped>

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

    .ed {
        background: #e8e8e8;
    }
</style>
