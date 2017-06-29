<template>
    <div class="page">
        <uz-list :list="list" :isMore="isMore" :loading="loading" @loadMore="loadMore">
            <template slot="item" scope="props">
                <div class="content">业主:{{props.item.title}}</div>
                <div class="content">节点:{{props.item.nodename}}</div>
            </template>
        </uz-list>
    </div>
</template>

<script>
    import {EventBus, Constants, API} from  '../../service/index';
    import UzList from "../../components/List";
    import UzTabs from "../../components/Tabs";

    let api;
    export default {
        components: {
            UzTabs,
            UzList
        },
        name: 'order_info',
        data() {
            return {
                list: [],
                page: 1,
                loading: false,
                isMore: true
            }
        },
        mounted(){
            api = new API(this);

            if (this.$route.query && this.$route.query.tab) {
                this.activeTab = this.$route.query.tab;
            }
            this.getdata()
        },
        methods: {
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

                api.post(Constants.method.evaluateList, param, (result) => {

                    if (result instanceof Array) {
                        let tempArray = [];
                        result.data.forEach((item, index) => {
                            if (item != null) {
                                tempArray.push(item)
                            }
                        });

                        this.list = this.list.concat(tempArray);
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
</style>
