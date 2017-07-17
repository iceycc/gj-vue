<template>
    <div class="page">
        <div><span>业主:{{data.customersName}}</span><span>{{data.commentDate}}</span></div>
        <div><span>节点:{{data.node}}</span></div>
        <div>对{{data.node}}的服务评分</div>
        <div>给装修公司评分:</div>
        <div>施工质量:{{data.commentCorp.quality}}</div>
        <div>服务态度:{{data.commentCorp.attitude}}</div>
        <div>施工时效:{{data.commentCorp.efficiency}}</div>
        <div>给装修管家评分:</div>
        <div>专业技能:{{data.commentUZ.professional}}</div>
        <div>服务态度:{{data.commentUZ.attitude}}</div>
        <div>协调能力:{{data.commentUZ.harmony}}</div>
        <div>业主评价</div>
        <div>{{data.comment}}</div>
    </div>
</template>

<script>
    import {EventBus, Constants, API, mixins} from  '../../service/index';
    import UzList from "../../components/List";
    import UzTabs from "../../components/Tabs";

    let api;
    export default {
        components: {
            UzTabs,
            UzList
        },
        mixins: [mixins],
        name: 'evaluate_detail',
        data() {
            return {
                data: {},
                order_no: 0,
                node_no: 0
            }
        },
        mounted(){
            this.setTitle('业主评价');
            api = new API(this);

            if (this.$route.query && this.$route.query.order_no && this.$route.query.node_no) {
                this.order_no = this.$route.query.order_no;
                this.node_no = this.$route.query.node_no;
                this.getdata()
            } else {
                console.log('参数异常');
            }

        },
        methods: {
            getdata(){
                let param = {
                    order_no: this.order_no,
                    node_no: this.node_no,
                };

                let url = '';
                if (this.isCSJL) {
                    url = Constants.method.cm_evaluateDetail;
                }

                api.post(url, param, (result) => {
                    this.data = result;
                }, (result) => {
                    EventBus.$emit(Constants.EventBus.showToast, {
                        message: result.message
                    });
                    this.loading = false;
                    this.isMore = false;
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .sub-point {
        background: #e13c13;
        border-radius: 50%;
        min-height: 12px;
        min-width: 12px;
        margin: 0 20px;
    }

    .sub-item {
        flex-grow: 1;
    }

    .sub-more {
        padding-right: 20px;
    }
</style>
