<template>
    <div class="page">
        <div class="title"><span>业主:{{data.customersName}}</span><span class="date">{{data.commentDate}}</span></div>
        <div class="node-title">对<span style="color: #2b85e4">{{data.node}}</span>的服务评分</div>
        <mu-divider></mu-divider>
        <!--<div class="node"><span>节点:{{data.node}}</span></div>-->
        <div v-if="data.commentCorp">
            <div class="rate-title">给装修公司评分:</div>
            <div class="rate-line">施工质量:
                <rate v-model="data.commentCorp.quality" :disabled="true"/>
            </div>
            <div class="rate-line">服务态度:
                <rate v-model="data.commentCorp.attitude" :disabled="true"/>
            </div>
            <div class="rate-line">施工时效:
                <rate v-model="data.commentCorp.efficiency" :disabled="true"/>
            </div>
        </div>
        <mu-divider></mu-divider>
        <div v-if="data.commentUZ">
            <div class="rate-title">给装修管家评分:</div>
            <div class="rate-line">专业技能:
                <rate v-model="data.commentUZ.professional" :disabled="true"/>
            </div>
            <div class="rate-line">服务态度:
                <rate v-model="data.commentUZ.attitude" :disabled="true"/>
            </div>
            <div class="rate-line">协调能力:
                <rate v-model="data.commentUZ.harmony" :disabled="true"/>
            </div>
        </div>
        <mu-divider></mu-divider>
        <div v-if="data.comment">
            <div class="rate-title">业主评价</div>
            <div class="comment">{{data.comment}}</div>
        </div>
        <div style="margin-top: 40px" @click="openlog">查看装修日志></div>
    </div>
</template>

<script>
    import {EventBus, Constants, API, mixins} from '../../service/index';
    import UzList from "../../components/List";
    import UzTabs from "../../components/Tabs";
    import rate from "iview/src/components/rate/";
    import MuDivider from "../../../node_modules/muse-ui/src/divider/divider";

    let api;
    export default {
        components: {
            MuDivider,
            UzTabs,
            UzList,
            rate
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
        mounted() {
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
        activated() {
            if (this.order_no != this.$route.query.order_no || this.node_no != this.$route.query.node_no) {
                this.order_no = this.$route.query.order_no;
                this.node_no = this.$route.query.node_no;
                this.getdata()
            }
        },
        methods: {
            getdata() {
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
                });
            },
            openlog() {
                let url = 'http://m.uzhuang.com/mobile-live_detail.html?live_id=' + this.data.orderNo;

                window.open(url);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .page {
        padding: 16px;
        font-size: 16px;

        .node-title {
            padding-bottom: 8px;
        }

        .title {
            padding: 16px 0;
            width: 100%;
            display: flex;
            flex-direction: row;
            .date {
                flex-grow: 1;
                text-align: right;
            }
        }

        .node {
            padding-top: 10px;
        }

        .rate-title {
            padding: 8px 0 8px 0;
        }
        .rate-line {
            padding: 2px 0;
        }

        .comment {
            background: #ebebeb;
            padding: 10px;
            min-height: 30px;
        }
    }
</style>
