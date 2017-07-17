<template>
    <div class="page">
        <div class="layout userinfo">
            <mu-avatar class="user-image" :src="user.personalphoto"/>
            <div>
                <div class="user-text">昵称:{{hkData.mName}}</div>
                <div class="user-text">账号:{{user.username}}</div>
            </div>
        </div>
        <div class="layout">
            <uz-grid :grids="menus" :cols="col" :role="user.role" @change="handleGridChange"></uz-grid>
        </div>
        <div class="layout" v-if="!isCSJL">
            <div class="guanjia-data-title">
                <div class="title">管家数据(本月)</div>
                <div @click="toGuanjiaData">更多</div>
            </div>
            <div class="guanjia-data">
                <div class="data">本月派单数:{{hkData.allocationHk}}</div>
                <div class="data">见面客户数:{{hkData.meeting}}</div>
                <div class="data">量房客户数:{{hkData.homeSurvey}}</div>
                <div class="data">已交定金的订单数:{{hkData.intentDeposit}}</div>
                <div class="data">已签合同的订单数:{{hkData.schemeSubmit}}</div>
            </div>
        </div>
        <div class="layout" v-else>
            <div class="guanjia-data-title">
                <div class="title">城市经理数据(本月)</div>
                <div @click="toGuanjiaData">更多</div>
            </div>
            <div class="guanjia-data">
                <div class="data">本月派单数:{{hkData.orderQty}}</div>
                <div class="data">见面客户数:{{hkData.meetQty}}</div>
                <div class="data data-full">量房客户数:{{hkData.measureQty}}</div>
                <div class="data data-full">定金总数据:{{hkData.depositMoney}}元({{hkData.despositQty}}单)</div>
                <div class="data data-full">平台单合同总数据:{{hkData.customersContractMoney}}元({{hkData.customersContractQty}}单)</div>
                <div class="data data-full">工地托管单合同数据:{{hkData.corpContractMoney}}元({{hkData.corpContractQty}}单)</div>
            </div>
        </div>
        <br/>
        <br/>
        <br/>
        <mu-raised-button label="退出" @click="doLogout" fullWidth secondary/>
    </div>
</template>

<script>
    import {EventBus, Constants, mixins, API} from  '../../service/index';
    import UzGrid from "../../components/Grid";
    let api;

    export default {
        components: {UzGrid},
        name: 'user_index',
        mixins: [mixins],
        data() {
            return {
                user: {},
                hkData: {},
                col: 4,
                menus: Constants.User.menus
            }
        },
        created(){
            EventBus.$emit(Constants.EventBus.update_main_tab_index, 1);

            api = new API(this);

            this.getGuanjiaData();
            //this.getScheduleData();
        },
        methods: {
            doLogout(){
                this.logout();
            },
            getGuanjiaData(){
                let url = Constants.method.hkDataList;

                if (this.isCSJL)
                    url = Constants.method.cm_profile;

                api.post(url, null, (result) => {
                    this.hkData = result;

                    this.menus.forEach((item, index) => {

                        if(this.menus[index].path == 'my_order'){
                            this.menus[index].count = result.unhandledQty;
                        }

                        if(this.menus[index].path == 'evaluate_list'){
                            this.menus[index].count = result.commentQty;
                        }
                    });
                });
            },
            getScheduleData(){
                api.post(Constants.method.schedule, null, (result) => {
                });
            },
            toGuanjiaData(){
                this.router_push({path: 'guanjia_data'});
            },
            handleGridChange(val)
            {
                this.router_push(this.menus[val])
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import "../../style/px2rem";

    .page {
        padding: px2rem(5) 0;

        .layout {
            padding: px2rem(15);
            border-bottom: px2rem(10) solid #CCCCCC;
        }
        .layout:nth-child(2) {
            padding: 0;
        }
        .layout:nth-child(3) {
            border-bottom: 0;
        }

        .userinfo {
            display: flex;
            flex-direction: row;
            align-items: center;
            .user-image {
                width: px2rem(60);
                height: px2rem(60);
                margin-right: px2rem(20);
            }
            .user-text {
                font-size: px2rem(14);
            }
            .user-text:first-child {
                padding-bottom: px2rem(5);
            }
        }

        .guanjia-data-title {
            display: flex;
            font-size: px2rem(14);
            .title {
                flex-grow: 1;
                text-align: left;
            }
        }

        .guanjia-data {
            display: flex;
            flex-wrap: wrap;
            .data {
                width: 50%;
                text-align: left;
                margin-top: px2rem(10);
            }
            .data-full {
                width: 100%;
            }
        }
    }


</style>
