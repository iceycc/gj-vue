<template>
    <div class="page">
        <collapse v-model="value">
            <panel name="before">
                当前节点
                <div class="tag-div" slot="content">
                    <div @click="checknode(current_node.node_id)">
                        <tag>{{current_node.node_name}}</tag>
                    </div>
                </div>
            </panel>
            <panel name="before">
                装修前
                <div class="tag-div" slot="content">
                    <tag v-for="item in node.before">{{item.name}}</tag>
                </div>
            </panel>
            <panel name="going">
                装修中
                <div class="tag-div" slot="content">
                    <tag v-for="item in node.going">{{item.name}}</tag>
                </div>
            </panel>
            <panel name="after">
                装修后
                <div class="tag-div" slot="content">
                    <tag v-for="item in node.after">{{item.name}}</tag>
                </div>
            </panel>
            <panel name="other">
                其他功能
                <div class="tag-div" slot="content">
                    <tag v-for="item in node.other">{{item.name}}</tag>
                </div>
            </panel>
        </collapse>
        <br>
        <br>
        <br>
        <br>
        <br>
        <mu-dialog :open="dialog.isShow" title="节点跳过提示" @close="dialogclose">
            <pre>{{dialog.message}}</pre>
            <mu-flat-button slot="actions" primary label="取消" @click="dialogclose"/>
            <mu-flat-button slot="actions" primary label="确定" @click="dialogclose"/>
        </mu-dialog>
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
        name: 'order_node',
        data() {
            return {
                dialog: {
                    isShow: false,
                    message: ''
                },
                node: Constants.Order.node,
                value: ['before', 'after', 'going', 'other'],
                current_node: {}
            }

        },
        mounted(){
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
                api.post(Constants.method.getNowNode, {
                    orderId: orderId
                }).then((response) => {
                    let result = response.data;
                    this.current_node = result.data;
                });
            },
            checknode(node_id){
                api.post(Constants.method.checkUnadd, {
                    orderid: this.$route.query.orderId,
                    nodeid: node_id
                }).then((response) => {
                    let result = response.data;
                    this.dialog.isShow = true;
                    this.dialog.message = `您将跳过:\n${result.data}\n节点` + '';
                });
            },
            dialogclose(){
                this.dialog.isShow = false;
                this.dialog.message = '';
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .page {
        overflow: scroll;
    }

    .tag-div {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .ivu-collapse-content-box {
        padding-bottom: 0px;
    }

    .ivu-tag {
        margin-bottom: 16px;
        margin-right: 15px;
    }
</style>
