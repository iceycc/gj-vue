<template>
    <div class="_page">
        <collapse v-model="state">
            <panel name="base">
                基本信息
                <div slot="content">
                    <div>
                        <div class="filed">
                            订单编号:{{data.orderShow}}
                        </div>
                        <div class="filed">
                            姓名:{{data.customersName}} | 订单来源:{{data.orderFrom}}|  订单状态:{{data.orderStatus}}
                        </div>
                        <div class="filed">
                            房屋面积:{{data.houseArea}}平 | 管家经理:{{data.smName}}
                        </div>
                        <div class="filed">
                            装修预算:{{data.budget}}万元 装修方式:{{data.decorateType}} 装修风格:{{data.decorateStyle}}
                        </div>
                        <div class="filed">下单时间:{{data.orderGeneratedTime}}<br>分单时间:{{data.orderAssignTime}}
                        </div>

                        <div v-if="data.baseCorpList">
                            <div class="filed">装修公司</div>
                            <div class="filed" v-for="(item,index) in data.baseCorpList" v-if="(item.corpStatus==0 && item.replaced==0) || item.corpStatus != 0">
                                <span :class="item.corpStatus != 0 ?'del-line' : ''">{{item.corpName}}</span>
                                <span class="tag" v-if="item.corpStatus == 1" @click="showDialog(1,item)">删除原因</span>
                                <span class="tag" v-if="item.corpStatus == 2" @click="showDialog(2,item)">替换原因</span>
                            </div>
                            <div class="filed">替换公司</div>
                            <div class="filed" v-for="(item,index) in data.baseCorpList" :class="item.corpStatus != 0 ?'del-line' : ''"
                                 v-if="item.corpStatus==0 && item.replaced==1">
                                <span>{{item.corpName}}</span>
                            </div>
                        </div>

                        <div class="filed" @click="showDialog(0)" v-if="data.serviceRemark">客服备注:{{data.serviceRemark}}</div>
                        <div class="filed">城市经理备注:{{data.cityManagerRemark}}</div>
                        <div class="filed">城市区域:{{data.addr}}</div>
                        <div class="filed">详细地址:{{data.detailAddr}}</div>
                    </div>
                </div>
            </panel>
            <panel name="company">
                装修公司
                <div slot="content">
                    <div class="filed" v-for="(item,index) in data.corpList">
                        <div>装修公司:{{item.corpName}}</div>
                        <div v-if="tab == 1 || tab == 2">
                            {{item.pic_name ? '负责人:' + item.pic_name : ''}}  {{item.pic_phone ? '手机号:' + item.pic_phone : ''}}
                        </div>
                        <div v-if="tab == 2 ">{{item.visited ? '已量房' : '未量房'}} 量房日期：{{item.visitDate}}</div>
                        <div v-if="tab == 1 ">{{item.meet ? '已见面' : '未见面'}} 见面日期：{{item.meetDate}}</div>
                    </div>
                </div>
            </panel>
            <panel name="payinfo" v-if="data.payment">
                支付信息
                <div slot="content">
                    <div class="filed" v-if="data.payment.signatureInfo">签署情况
                        <div>签署情况：{{data.payment.signatureInfo}}</div>
                        <div>备注信息：{{data.payment.depositRemark}}</div>
                    </div>
                    <div class="filed" v-if="data.payment.contractNo">合同编号及金额
                        <div>三方合同编号：{{data.payment.contractNo}}</div>
                        <div>三方总金额：{{data.payment.contractTotalMoney}}元</div>
                        <div>凭证照片：
                            <img class="photo" v-for="item in data.payment.receiptPhoto" :src="item">
                        </div>
                        <div>备注：{{data.payment.contractRemark}}</div>
                    </div>
                    <div class="filed">支付信息录入
                        <div>实收金额: {{data.payment.paidIn}}元</div>
                        <div>支付方式：{{data.payment.paymentMethod}}</div>
                        <div>支付凭证: {{data.payment.receipt}}</div>
                        <div>支付凭证图片:
                            <img class="photo" v-for="item in data.payment.receiptPhoto" :src="item">
                        </div>
                        <div>付款人: {{data.payment.payer}}</div>
                    </div>
                </div>
            </panel>
        </collapse>
        <mu-dialog :open="dialog.isShow" :title="dialog.title" @close="closeDialog">
            <div>{{dialog.msg}}</div>
            <i-button slot="actions" type="primary" size="small" @click="closeDialog(true)" style="margin-left: 20px">
                关闭
            </i-button>
        </mu-dialog>
    </div>
</template>

<script>
    import {EventBus, Constants, API} from '../../../service/index';
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
                state: ['base', 'company'],
                tab: 0,
                data: {},
                dialog: {
                    isShow: false,
                    title: '',
                    msg: ''
                }
            }
        },
        mounted() {
            api = new API(this);
            this.getdata();
        },
        created() {
            this.tab = this.$route.query.tab;
        },
        methods: {
            getdata() {
                api.post(Constants.method.cm_get_month_info, {
                    order_no: this.$route.query.orderNo,
                    tab: this.$route.query.tab,
                }, (result) => {
                    console.log(result);
                    this.data = result;
                });
            },
            showDialog(type,item) {
                if (type === 0) {
                    this.dialog.title = '客服备注';
                    this.dialog.msg = this.data.serviceRemark;
                    this.dialog.isShow = true;
                }else if (type === 1){
                    this.dialog.title = '删除原因';
                    this.dialog.msg = item.deleteReason;
                    this.dialog.isShow = true;
                }else if (type === 2){
                    this.dialog.title = '替换原因';
                    this.dialog.msg = item.replaceReason;
                    this.dialog.isShow = true;
                }
            },
            closeDialog() {
                this.dialog.title = '';
                this.dialog.msg = '';
                this.dialog.isShow = false;
            }
        }
    }
</script>

<style lang="scss" scoped>

    ._page {
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow-x: auto;
    }

    .filed {
        padding: 10px;
        font-size: 14px;
        width: 100%;
        border-bottom: 1px solid #e4e4e4;
    }

    .filed:first-child {
        padding-top: 0;
    }

    .filed:last-child {
        border-bottom: 0;
    }

    .tag {
        color: #ed3f14;
        margin-left: 10px;
    }

    .photo {
        width: 100px;
        height: 100px;
    }
</style>
