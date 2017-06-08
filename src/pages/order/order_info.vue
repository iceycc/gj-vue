<template>
    <div class="page">
        <mu-list class="list">
            <template v-for="(item,index) in list">
                <div class="item">
                    <div>{{item.nodename}}</div>
                    <div>时间:{{item.date1}}</div>
                </div>
                <mu-divider/>
            </template>

        </mu-list>
    </div>
</template>

<script>
    import {EventBus, Constants, API} from  '../../service/index';
    let api;
    export default {

        name: 'order_info',
        data() {
            return {
                list: []
            }

        },
        created(){
            EventBus.$emit(Constants.EventBus.setTitle, '订单信息');
            api = new API(this);

            if (this.$route.query.orderId) {
                this.getdata(this.$route.query.orderId)
            } else {
                EventBus.$emit(Constants.EventBus.showToast, Constants.Tips.params_null);
            }
        },
        methods: {
            getdata(orderId){
                api.post(api.method.nodelist, {
                    orderId: orderId
                }).then((response) => {
                    let result = response.data;
                    this.list = result;
                    this.list = this.list.concat(result);
                    this.list = this.list.concat(result);

                });
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
