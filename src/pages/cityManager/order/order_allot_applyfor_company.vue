<template>
    <div class="_page">
        <div class="filed">装修公司</div>
        <div class="filed" v-for="(item,index) in this.datas" v-if="!(item.corpStatus==0 && item.replaced==1)">
            <span :class="item.corpStatus != 0 ?'decoration' : ''">{{item.corpName}}</span>
            <span class="tag" v-if="item.corpStatus == 1" @click="showReason(item)">删除原因</span>
            <span class="tag" v-if="item.corpStatus == 2" @click="showReason(item)">替换原因</span>
            <span class="tag" v-if="item.corpStatus == 0" @click="allot_company(item)">申请替换</span>
        </div>
        <div class="filed">替换公司</div>
        <div class="filed" v-for="(item,index) in this.datas" :class="item.corpStatus != 0 ?'decoration' : ''"
             v-if="item.corpStatus==0 && item.replaced==1">
            <span>{{item.corpName}}</span>
            <span class="tag" v-if="item.corpStatus == 0" @click="showDelDialog(item)">删除</span>
            <span class="tag" v-if="item.corpStatus == 0" @click="allot_company(item)">申请替换</span>
        </div>
        <mu-dialog :open="dialog.show" :title="dialog.title" @close="closeDialog">
            {{dialog.desc}}
            <i-button slot="actions" type="primary" size="small" @click="closeDialog(true)" style="margin-left: 20px">
                关闭
            </i-button>
        </mu-dialog>
        <mu-dialog :open="dialog_del.show" :title="dialog_del.title" @close="closeDialogDel">
            <mu-text-field class="input_text"
                           hintText="请填写删除原因" v-model="dialog_del.input" multiLine :rows="3" :rowsMax="6"/>
            <i-button slot="actions" size="small" @click="closeDialogDel(false)">取消</i-button>
            <i-button slot="actions" type="primary" size="small" @click="closeDialogDel(true)"
                      style="margin-left: 20px">
                提交
            </i-button>
        </mu-dialog>
    </div>
</template>

<script>
    import {EventBus, Constants, API} from '../../../service/index';
    import Button from "iview/src/components/button";

    let api;

    export default {
        components: {
            'i-button': Button,
        },
        name: 'cm-order-allot-applyfor-company',
        data() {
            return {
                dialog: {
                    show: false,
                    title: '替换原因',
                    desc: ''
                },
                dialog_del: {
                    show: false,
                    title: '替换原因',
                    input: ''
                },
                datas: []
            }
        },
        mounted() {
            api = new API(this);
            this.getdata();
        },
        methods: {
            getdata(){
                api.post(Constants.method.cm_get_corps, {
                    order_no: this.$route.query.orderNo
                }, (result) => {
                    this.datas = result;
                });
            },
            showReason(item) {
                this.dialog.show = true;
                if (item.corpStatus == 1) {
                    this.dialog.title = "删除原因";
                    this.dialog.desc = item.deleteReason;
                } else if (item.corpStatus == 2) {
                    this.dialog.title = "替换原因";
                    this.dialog.desc = item.replaceReason;
                }
            },
            allot_company(item) {
                this.$router.push({
                    name: 'cm_allot_company',
                    query: {orderNo: this.$route.query.orderNo, corpNo: item.corpNo}
                });
            },
            delete_company(item, del_reason) {
                new API(this).post(Constants.method.cm_del_corps, {
                    order_no: this.$route.query.orderNo,
                    corp_no: item.corpNo,
                    del_reason: del_reason
                }, (result) => {
                    EventBus.$emit(Constants.EventBus.showToast, {
                        message: '操作成功'
                    });
                    this.getdata();
                });
            },
            closeDialog() {
                this.dialog.show = false;
            },
            showDelDialog(item) {
                this.dialog_del.show = true;
                this.dialog_del.item = item;
            },
            closeDialogDel(flag) {
                if (flag) {
                    this.delete_company(this.dialog_del.item, this.dialog_del.input)
                }
                this.dialog_del.show = false;
                this.dialog_del.input = '';
                this.dialog_del.item = null;
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

    .filed {
        padding: 10px;
        font-size: 14px;
        width: 100%;
        border-bottom: 1px solid #e4e4e4;
    }

    .decoration {
        text-decoration: line-through #ed3f14;
    }

    .tag {
        color: #ed3f14;
        margin-left: 10px;
    }
</style>
