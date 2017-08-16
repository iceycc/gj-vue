<template>
    <div class="_page">
        <div class="date-class">
            <mu-select-field v-model="start_year" class="select-class" @change="updateDate">
                <template v-for="item in year_field">
                    <mu-menu-item :value="item" :title="item+''"/>
                </template>
            </mu-select-field>
            <div class="str">年</div>
            <mu-select-field v-model="start_month" class="select-class" @change="updateDate">
                <template v-for="item in month_field">
                    <mu-menu-item :value="item" :title="item+''"/>
                </template>
            </mu-select-field>
            <div class="str">月</div>
            <div class="str divider">至</div>
            <mu-select-field v-model="end_year" class="select-class" @change="updateDate">
                <template v-for="item in year_field">
                    <mu-menu-item :value="item" :title="item+''"/>
                </template>
            </mu-select-field>
            <div class="str">年</div>
            <mu-select-field v-model="end_month" class="select-class" @change="updateDate">
                <template v-for="item in month_field">
                    <mu-menu-item :value="item" :title="item+''"/>
                </template>
            </mu-select-field>
            <div class="str">月</div>
        </div>
        <div class="search_bar">
            <mu-select-field v-model="search_type" class="search_type">
                <template v-for="item in search_field">
                    <mu-menu-item :value="item.value" :title="item.title"
                                  v-if="item.types.indexOf(parseInt(type)) > -1"/>
                </template>
            </mu-select-field>
            <mu-text-field class="search_text" :hintText="search_field[search_type].hintText"
                           :type="search_field[search_type].type"
                           v-model="search_word"/>
            <mu-icon-button icon="search" slot="right" @click="doSearch"/>
        </div>
        <div class="count">共{{orderQty}}单订单</div>
        <div style="padding: 0 16px">
            <div class="tr" v-if="type ==0">
                <div class="cell">订单编号</div>
                <div class="cell">分配装修公司</div>
                <div class="cell">管家经理</div>
                <div class="cell"></div>
            </div>
            <div class="tr" v-if="type ==1">
                <div class="cell">订单编号</div>
                <div class="cell">已见面</div>
                <div class="cell">管家经理</div>
                <div class="cell"></div>
            </div>
            <div class="tr" v-if="type ==2">
                <div class="cell">订单编号</div>
                <div class="cell">已量房</div>
                <div class="cell">管家经理</div>
                <div class="cell"></div>
            </div>
            <div class="tr" v-if="type ==3">
                <div class="cell">订单编号</div>
                <div class="cell">业主姓名</div>
                <div class="cell">已交定金</div>
                <div class="cell"></div>
            </div>
            <div class="tr" v-if="type ==4">
                <div class="cell-5">订单编号</div>
                <div class="cell-5">业主姓名</div>
                <div class="cell-5">合同金额</div>
                <div class="cell-5">订单来源</div>
                <div class="cell-5"></div>
            </div>
            <div class="tr" v-if="type ==5">
                <div class="cell">装修公司</div>
                <div class="cell">业主姓名</div>
                <div class="cell">合同金额</div>
                <div class="cell"></div>
            </div>
        </div>
        <uz-auto-list ref="listview" v-if="url.length > 0" :url="url" :notify="url+tab" @itemOnClick="itemOnClick">
            <template slot="item" scope="props">
                <div class="tr" v-if="type == 0">
                    <span class="cell">{{props.item.orderShow}}</span>
                    <span class="cell">{{props.item.corpQty}}家</span>
                    <span class="cell">{{props.item.smName}}</span>
                    <div class="cell"> > </div>
                </div>
                <div class="tr" v-if="type == 1">
                    <span class="cell">{{props.item.orderShow}}</span>
                    <span class="cell">{{props.item.meetQty}}家</span>
                    <span class="cell">{{props.item.smName}}</span>
                    <div class="cell"> > </div>
                </div>

                <div class="tr" v-if="type == 2">
                    <span class="cell">{{props.item.orderShow}}</span>
                    <span class="cell">{{props.item.measureQty}}家</span>
                    <span class="cell">{{props.item.smName}}</span>
                    <div class="cell"> > </div>
                </div>

                <div class="tr" v-if="type == 3 ">
                    <span class="cell">{{props.item.orderShow}}</span>
                    <span class="cell">{{props.item.customersName}}</span>
                    <span class="cell">{{props.item.deposit}}</span>
                    <div class="cell"> > </div>
                </div>
                <div class="tr" v-if="type == 4 ">
                    <span class="cell-5">{{props.item.orderShow}}</span>
                    <span class="cell-5">{{props.item.customersName}}</span>
                    <span class="cell-5">{{props.item.contractMoney}}</span>
                    <span class="cell-5">{{props.item.orderFrom}}</span>
                    <div class="cell-5"> > </div>
                </div>
                <div class="tr" v-if="type == 5">
                    <span class="cell">{{props.item.corpName}}</span>
                    <span class="cell">{{props.item.customersName}}</span>
                    <span class="cell">{{props.item.contractMoney}}</span>
                    <div class="cell"> > </div>
                </div>
            </template>
        </uz-auto-list>
    </div>
</template>

<script>
    import {EventBus, Constants, API, mixins} from '../../../service/index';
    import UzGrid from "../../../components/Grid";
    import UzTabs from "../../../components/Tabs";
    import UzAutoList from "../../../components/AutoList";
    import Button from "iview/src/components/button";

    let api;
    let year = new Date().getFullYear();

    export default {
        components: {
            UzAutoList,
            'i-button': Button,
            UzTabs,
            UzGrid
        },
        name: 'cm-user-allot-list',
        mixins: [mixins],
        data() {
            return {
                start_year: year,
                end_year: year,
                start_month: new Date().getMonth() + 1,
                end_month: new Date().getMonth() + 1,
                search_word: '',
                search_type: 0,
                search_field: Constants.CM_Order.search_field,
                url: '',
                type: 0,
                tab: 0,
                orderQty: 0
            }
        },
        computed: {
            year_field: function () {
                let temp = [];
                for (let i = 0; i < 5; i++) {
                    temp.push(year - i);
                }
                return temp;
            },
            month_field: function () {
                let temp = [];
                for (let i = 0; i < 12; i++) {
                    temp.push(i + 1);
                }
                return temp;
            }
        },
        mounted() {
            api = new API(this);
            if (this.$route.query && 'type' in this.$route.query) {
                this.type = this.$route.query.type;
                switch (parseInt(this.type)) {
                    case 0:
                        this.setTitle('本月派单列表');
                        this.tab = 0;
                        this.url = Constants.method.cm_month_info;
                        break;
                    case 1:
                        this.setTitle('见面客户列表');
                        this.tab = 1;
                        this.url = Constants.method.cm_month_info;
                        break;
                    case 2:
                        this.setTitle('量房客户列表');
                        this.tab = 2;
                        this.url = Constants.method.cm_month_info;
                        break;
                    case 3:
                        this.setTitle('已交定金列表');
                        this.tab = 0;
                        this.url = Constants.method.cm_month_money;
                        break;
                    case 4:
                        this.setTitle('平台单列表');
                        this.tab = 1;
                        this.url = Constants.method.cm_month_money;
                        break;
                    case 5:
                        this.setTitle('已签合同反推单列表');
                        this.tab = 2;
                        this.url = Constants.method.cm_month_money;
                        break;
                }
            } else {
                console.log('参数异常');
            }
        },
        activated() {
        },
        methods: {
            updateDate() {
                setTimeout(() => {
                    this.$refs.listview.rest();
                }, 1);
            },
            doSearch() {
                if (this.search_word) {
                    this.$refs.listview.rest();
                } else {
                    EventBus.$emit(Constants.EventBus.showToast, {
                        message: Constants.Tips.params_null
                    });
                }
            },
            handleParam() {//处理参数
                let param = {
                    tab: this.tab
                };

                if (this.search_word) {
                    param.keyword = this.search_word;
                    param.search_type = this.search_type;
                }

                param.start_date = this.start_year + '-' + this.start_month;
                param.end_date = this.end_year + '-' + this.end_month;
                return param;
            },
            itemOnClick(item) {
                this.router_push({path: 'cm_order_detail', query: {orderNo: item.orderNo, tab: this.type}});
                console.log(item.orderNo, this.tab);
            },
            handleResult(result) {
                this.orderQty = result.orderQty;
                return result.orderList;
            },
            action(item) {
                let param = {};
                param.uid = item.uid;
                this.allot_manager(param);
            },
            allot_manager(param) {
                api.post(Constants.method.cm_fpjl, param, (result) => {
                    console.log(result);
                });
            },
        }
    }
</script>

<style lang="scss" scoped>

    .date-class {
        display: flex;
        flex-direction: row;
        align-items: baseline;
        margin: 10px 10px 0 10px;
        .select-class {
            width: 17%;
        }
        .str {
            margin: 0 5px;
        }
        .divider {
            font-size: 14px;
            margin: 0 10px;
        }
    }

    .search_bar {
        margin: 0;
    }

    .count {
        padding: 10px 16px;
    }

    .tr {
        .cell {
            width: 24%;
            display: inline-block;
            text-align: center;
        }
        .cell-5 {
            width: 19%;
            display: inline-block;
            text-align: center;
        }
    }
</style>
<style>
    .mu-menu-item {
        padding: 0 0px !important;
    }
</style>