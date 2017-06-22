<template>
    <div class="page">
        <div class="layout userinfo">
            <mu-avatar class="user-image" :src="user.personalphoto"/>
            <div>
                <div class="user-text">昵称:{{user.truename}}</div>
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
                <div class="data">本月派单数:{{hkData.allocationHk}}</div>
                <div class="data">见面客户数:{{hkData.meeting}}</div>
                <div class="data">量房客户数:{{hkData.homeSurvey}}</div>
                <div class="data">已交定金总数据:{{hkData.intentDeposit}}</div>
                <div class="data">已签合同平台单数据:{{hkData.intentDeposit}}</div>
                <div class="data">已签合同反推单数据:{{hkData.schemeSubmit}}</div>
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
        computed: {
            isCSJL: function () {
                return this.user.role == '38';
            }
        },
        created(){
            this.user = this.getUser();
            api = new API(this);

            this.getGuanjiaData();
            this.getScheduleData();
        },
        methods: {
            doLogout(){
                this.logout();
            },
            getGuanjiaData(){
                let url = Constants.method.hkDataList;

                if (this.isCSJL)
                    url = Constants.method.hkDataList;

                api.post(url, null, (result) => {
                    this.hkData = result.data;
                });
            },
            getScheduleData(){
                api.post(Constants.method.schedule, null, (result) => {
                    console.log(result.data);
                });
            },
            //
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
    .page {
        padding: 10px 0;

        .layout {
            padding: 20px;
            border-bottom: 10px solid #CCCCCC;
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
                width: 60px;
                height: 60px;
                margin-right: 20px;
            }
            .user-text {
                font-size: 14px;
            }
            .user-text:first-child {
                padding-bottom: 10px;
            }
        }

        .guanjia-data-title {
            display: flex;
            font-size: 14px;
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
                margin-top: 10px;
            }
        }
    }


</style>
