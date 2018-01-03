<template>
    <div class="_page">
        <div class="list">
            <mu-list>
                <template v-for="(item,index) in datas">
                    <mu-list-item class="item" @click="itemOnClick(index)">
                        <div>{{item.title}}</div>
                        <div>申诉原因：{{item.conditionone}}</div>
                        <div>派单时间：{{item.addtime}}</div>
                        <div>申诉时间：{{item.add_time}}</div>
                        <div>客服处理时间：{{item.service_time}}</div>
                        <div>客服经理处理时间：{{item.manager_time}}</div>
                        <div>客服处理人：{{item.truename}}</div>
                        <div>客服回访记录 ：{{item.remark}}</div>
                    </mu-list-item>
                    <mu-divider/>
                </template>
            </mu-list>
        </div>
    </div>
</template>

<script>
    import {EventBus, Constants, API} from '../../../service/index';

    export default {
        components: {},
        name: 'cm-order-appeal-reason',
        data() {
            return {
                datas: []
            };
        },
        created() {
            if ('data' in this.$route.params) {
                this.datas = this.$route.params.data;
            }
        },
        methods: {}
    };
</script>

<style lang="scss" scoped>
    @import "../../../style/px2rem";

    .tabs {
        border-top: 0;
    }

    .filed {
        padding: px2rem(10);
        font-size: px2rem(14);
        width: 100%;
        font-size: px2rem(16);
        display: flex;
        flex-direction: row;
        align-items: center;
        .name {
            flex-grow: 1;
        }
    }
</style>
