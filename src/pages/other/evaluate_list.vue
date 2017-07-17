<template>
    <div class="page">
        <uz-list :list="list" :isMore="isMore" :loading="loading" @loadMore="loadMore" @itemOnClick="itemOnClick">
            <template slot="item" scope="props">
                <div class="sub-point" :style="{background:props.item.readStatus == 0 ? '#e13c13':'#FFFFFF'}"></div>
                <div class="sub-item">
                    <div class="content">业主:{{props.item.customersName}}</div>
                    <div class="content">节点:{{props.item.nodename}}</div>
                    <div class="content">日期:{{props.item.commentDate}}</div>
                </div>
                <div class="sub-more">
                    查看详情>
                </div>
            </template>
        </uz-list>
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
        name: 'evaluate_list',
        data() {
            return {
                list: [],
                page: 1,
                loading: false,
                isMore: true
            }
        },
        mounted(){
            this.setTitle('评价列表');
            api = new API(this);

            if (this.$route.query && this.$route.query.tab) {
                this.activeTab = this.$route.query.tab;
            }
            this.getdata()
        },
        methods: {
            itemOnClick(index){
                this.router_push({
                    path: 'evaluate_detail',
                    query: {
                        order_no: this.list[index].orderNo,
                        node_no: this.list[index].node
                    }
                });
            },
            initList(){
                this.list = [];
                this.page = 1;
                this.isMore = true;
                this.loading = false;
            },
            getdata(){
                this.loading = true;
                let param = {
                    page: this.page,
                };

                let url = Constants.method.evaluateList;
                if (this.isCSJL) {
                    url = Constants.method.cm_evaluateList;
                }

                api.post(url, param, (result) => {
                    if (result instanceof Array) {
                        this.list = this.list.concat(result);
                    } else {
                        this.isMore = false;
                    }
                    this.loading = false;
                }, (result) => {
                    EventBus.$emit(Constants.EventBus.showToast, {
                        message: result.message
                    });
                    this.loading = false;
                    this.isMore = false;
                });
            },
            loadMore(){
                this.page = this.page + 1;

                this.getdata();
            },
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
