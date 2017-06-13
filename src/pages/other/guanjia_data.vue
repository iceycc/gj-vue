<template>
    <div class="page">
        <div class="select">
            <date-picker class="data-picker" type="month" :value="startDate" placeholder="选择月"
                         @on-change="startChange"></date-picker>
            至
            <date-picker class="data-picker" type="month" :value="endDate" placeholder="选择月"
                         @on-change="endChange"></date-picker>
            <mu-raised-button label="查询" @click="getdata" class="btn" primary/>
        </div>
        <div class="layout">
            <div class="guanjia-data-title">
                <div class="title">管家数据</div>
            </div>
            <div class="guanjia-data">
                <div class="data">本月派单数:{{hkData.allocationHk}}</div>
                <div class="data">见面客户数:{{hkData.meeting}}</div>
                <div class="data">量房客户数:{{hkData.homeSurvey}}</div>
                <div class="data">已交定金的订单数:{{hkData.intentDeposit}}</div>
                <div class="data">已签合同的订单数:{{hkData.schemeSubmit}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {EventBus, Constants, API, mixins} from  '../../service/index';
    import DatePicker from "../../../node_modules/iview/src/components/date-picker/";

    let api;
    export default {
        components: {
            DatePicker,
        },
        name: 'guanjia_data',
        mixins: [mixins],
        data() {
            return {
                startDate: '',
                endDate: '',
                hkData: {}
            }
        },
        computed: {},
        created(){
            this.setTitle('更多数据')
            let date = new Date();
            this.startDate = date.getFullYear() + '-' + (date.getMonth() + 1);
            this.endDate = date.getFullYear() + '-' + (date.getMonth() + 1);
        },
        mounted(){
            this.setTitle('更多数据')
            api = new API(this);

            this.getdata()
        },
        methods: {
            startChange(data){
                this.startDate = data;
            },
            endChange(data){
                this.endDate = data;
            },
            getdata(){
                let date = new Date(this.endDate);
                date.setMonth(date.getMonth() + 1);
                date.setDate(0);

                let param = {
                    page: this.page,
                    start: this.startDate + '-1',
                    end: this.endDate + '-' + date.getDate()
                };
                api.post(Constants.method.hkDataList, param, (result) => {
                    this.hkData = result.data;
                }, (result) => {

                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .select {
        padding: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        .data-picker {
            width: 40%;
        }
        .btn {
            margin-left: 10px;
        }
    }

    .layout {
        padding: 20px;
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

</style>
