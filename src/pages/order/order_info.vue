<template>
    <div class="page">
        <uz-list :list="list">
            <template slot="item" scope="props">
                <div>{{props.item.nodename}}</div>
                <div>时间:{{props.item.date1}}</div>
            </template>
        </uz-list>
    </div>
</template>

<script>
    import {EventBus, Constants, API} from  '../../service/index';
    import UzList from "../../components/List";
    let api;
    export default {

        components: {UzList},
        name: 'order_info',
        data() {
            return {
                list: []
            }

        },
        mounted(){
            EventBus.$emit(Constants.EventBus.setTitle, '订单信息');
            api = new API(this);

            if (this.$route.query.orderId) {
                this.getdata(this.$route.query.orderId)
            } else {
                EventBus.$emit(Constants.EventBus.showToast, {
                    message: Constants.Tips.params_null
                });
            }
        },
        methods: {
            getdata(orderId){
                api.post(api.method.nodelist, {
                    orderId: orderId
                }, (response) => {
                    let result = response;
                    this.list = result;
                })
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
