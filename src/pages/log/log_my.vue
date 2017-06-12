<template>
    <div class="page">
        <div class="search_bar">
            <mu-text-field class="search_text" hintText="请输入日志名称" v-model="search_word"/>
            <mu-icon-button icon="search" slot="right" @click="doSearch"/>
        </div>
        <uz-tabs :tabs="tabs" :activeTab="activeTab" @change="handleTabChange"></uz-tabs>
        <uz-list :list="list" :isMore="isMore" :loading="loading" @loadMore="loadMore">
            <template slot="item" scope="props">
                <div class="title">{{props.item.xqmc}}-{{props.item.title}}</div>
                <div class="content">姓名:{{props.item.title}}  &nbsp&nbsp 联系方式:{{props.item.telephone}}</div>
                <div class="content">地址:{{props.item.address}}</div>
                <div class="content">下单时间:{{props.item.addtime}} &nbsp&nbsp 付款状态:{{props.item.ispay ? '已付款' : '未付款'}}
                </div>
                <div class="content" v-if="activeTab == 0">
                    订单进度:{{props.item.nodename}} &nbsp&nbsp 订单编号:{{props.item.order_no}}
                </div>
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
                activeTab: 0,
                tabs: Constants.Log.tabs,
                search_word: '',
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
                    state: this.tabs[this.activeTab].value, //列表类型
                };

                if (this.search_word.trim()) {
                    param.keyWord = this.search_word;
                }

                api.post(api.method.myLoglist, param, (result) => {
                    this.tabs[0].count = result.over;
                    this.tabs[1].count = result.go;
                    this.tabs[2].count = result.yc;

                    if (result.data instanceof Array) {
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
            doSearch(){
                if (this.search_word.trim()) {
                    this.initList();
                    this.getdata();
                } else {
                    EventBus.$emit(Constants.EventBus.showToast, {
                        message: Constants.Tips.search_word_null
                    });
                }
            },
            handleTabChange(val){
                this.activeTab = val;

                this.search_word = '';
                this.initList();
                this.getdata();
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .tabs {
        border-top: 0px;
        border-bottom: 1px solid #CCCCCC;
    }
</style>
