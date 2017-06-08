<template>
    <div class="page">
        <collapse v-model="value">
            <panel name="before">
                装修前
                <div slot="content">
                    <tag v-for="item in node.before">{{item.name}}</tag>
                </div>
            </panel>
            <panel name="going">
                装修中
                <div slot="content">
                    <tag v-for="item in node.going">{{item.name}}</tag>
                </div>
            </panel>
            <panel name="after">
                装修后
                <div slot="content">
                    <tag v-for="item in node.after">{{item.name}}</tag>
                </div>
            </panel>
        </collapse>
    </div>
</template>

<script>
    import {EventBus, Constants, API} from  '../../service/index';
    import Collapse from "../../../node_modules/iview/src/components/collapse/collapse";
    import Panel from "../../../node_modules/iview/src/components/collapse/panel";
    import Tag from "../../../node_modules/iview/src/components/tag/tag";
    let api;
    export default {

        components: {
            Tag,
            Panel,
            Collapse
        },
        name: 'order_info',
        data() {
            return {
                node: Constants.Order.node,
                value: ['before','after','going']
            }

        },
        mounted(){
            EventBus.$emit(Constants.EventBus.setTitle, '节点导航');
            api = new API(this);

            /*            if (this.$route.query.orderId) {
             this.getdata(this.$route.query.orderId)
             } else {
             EventBus.$emit(Constants.EventBus.showToast, {
             message:Constants.Tips.params_null
             });
             }*/
        },
        methods: {
            getdata(orderId){
                api.post(api.method.nodelist, {
                    orderId: orderId
                }).then((response) => {
                    let result = response.data;
                    this.list = result;
                });
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
