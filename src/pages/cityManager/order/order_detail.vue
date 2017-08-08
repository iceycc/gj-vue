<template>
    <div class="_page">
        <collapse v-model="state">
            <panel name="base">
                基本信息
                <div slot="content">
                    <div>
                        <div class="filed">
                            用户名:{{data.customersName}} | 订单来源:{{data.orderFrom}}|  订单状态:{{data.orderStatus}}
                        </div>
                        <div class="filed">
                            房屋面积:{{data.houseArea}}平 | 管家经理:{{data.smName}}
                        </div>
                        <div class="filed">下单时间:{{data.orderGeneratedTime}}<br>分单时间:{{data.orderAssignTime}}
                        </div>
                        <div class="filed">
                            装修预算:{{data.budget}}万元 装修方式:{{data.decorateType}} 装修风格:{{data.decorateStyle}}
                        </div>
                        <div class="filed">客服备注:{{data.serviceRemark}}</div>
                        <div class="filed"
                             @click="addCityManagerRemark(data.orderNo,data.cityManagerRemark)">
                            城市经理备注:{{data.cityManagerRemark}}
                        </div>
                        <div class="filed">城市区域:{{data.addr}}</div>
                        <div class="filed">详细地址:{{data.detailAddr}}</div>
                    </div>
                </div>
            </panel>
            <panel name="company">
                装修公司
                <div slot="content">
                    <div class="filed">
                        <span v-for="(item,index) in data.corpList"
                              :class="('corpStatus' in item && item.corpStatus != 0) ?'decoration' : ''">{{item.corpName}}<br></span>
                    </div>
                </div>
            </panel>
            <panel name="payinfo" v-if="data.deposit">
                支付信息
                <div slot="content">
                    <div class="filed">签署情况</div>
                    <div class="filed">签署情况：{{data.deposit.signatureInfo}}</div>
                    <div class="filed">支付方式：{{data.deposit.paymentMethod}}</div>
                    <div class="filed">备注信息：{{data.deposit.depositRemark}}</div>
                    <div class="filed">支付信息录入</div>
                    <div class="filed">实收金额: {{data.deposit.paidIn}}元</div>
                    <div class="filed">支付凭证: {{data.deposit.receipt}}</div>
                    <div class="filed">支付凭证:
                        <img :src="data.deposit.receiptPhoto">
                    </div>
                    <div class="filed">付款人: {{data.deposit.payer}}</div>
                </div>
            </panel>
        </collapse>
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
                data: {}
            }
        },
        mounted() {
            api = new API(this);
            this.getdata();
        },
        created() {
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

    .decoration {
        text-decoration: line-through #ed3f14;
    }

    .photo {
        width: 100px;
        height: 100px;
    }
</style>
