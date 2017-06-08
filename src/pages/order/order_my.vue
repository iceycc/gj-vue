<template>
    <div class="page">
        <div class="search_bar">
            <mu-select-field v-model="search_type" class="search_type">
                <template v-for="item in search_field">
                    <mu-menu-item :value="item.value" :title="item.title"/>
                </template>
            </mu-select-field>
            <mu-text-field :hintText="search_field[search_type].hintText" :type="search_field[search_type].type"
                           v-model="search_word"/>
            <mu-icon-button icon="search" slot="right" @click="doSearch"/>
        </div>
        <uz-tabs :tabs="tabs" :activeTab="activeTab" @change="handleTabChange"></uz-tabs>
        <div class="list">
            <mu-list>
                <template v-for="(item,index) in list">
                    <div class="item" @click="itemOnClick(index)">
                        <div class="content title">{{item.xqmc}}-{{item.title}}</div>
                        <div class="content">联系方式:{{item.telephone}}
                            <mu-icon-button v-if="item.spread" icon="smartphone" @click="delPhone(item.telephone)"/>
                        </div>
                        <div class="content">地址:{{item.address}}</div>
                        <div class="content">订单编号:{{item.order_no}} 订单进度:{{item.nodename}}</div>
                        <div class="content" v-if="item.spread">下单时间:{{item.addtime}} 付款状态:{{item.ispay ? '已付款' : '未付款'}}</div>
                        <div class="btns" v-if="item.spread">
                            <mu-raised-button label="详细信息" class="demo-raised-button" @click="toInfo(item.id)"/>
                            <mu-raised-button label="订单跟踪" class="demo-raised-button"/>
                            <mu-raised-button label="节点信息" class="demo-raised-button"/>
                        </div>
                    </div>
                    <mu-divider/>
                </template>
            </mu-list>
            <mu-infinite-scroll v-if="isMore" :scroller="scroller" :loading="loading" @load="loadMore"/>
        </div>

    </div>
</template>

<script>
    import {EventBus, Constants, API} from  '../../service/index';
    import UzGrid from "../../components/Grid";
    import UzTabs from "../../components/Tabs";

    let api;

    export default {
        components: {
            UzTabs,
            UzGrid
        },
        name: 'my-order',
        data() {
            return {
                activeTab: 0,
                tabs:[],
                search_word: '',
                search_type: 0,
                search_field: Constants.Order.search_field,
                list: [],
                page: 1,
                loading: false,
                scroller: null,
                isMore: true
            }
        },
        mounted () {
            console.log('mounted');
            this.scroller = this.$el.getElementsByClassName('list')[0];

            EventBus.$emit(Constants.EventBus.setTitle, '我的订单');
            this.tabs = Constants.Order.tabs;
            api = new API(this);

            this.getdata();
        },
        created(){
            console.log('created');
        },
        methods: {
            initList(){
                //初始化
                this.list = [];
                this.page = 1;
                this.isMore = true;
                this.loading = false;
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
            getdata(){
                this.loading = true;
                let param = {
                    page: this.page,
                    state: this.tabs[this.activeTab].value, //列表类型
                };

                if (this.search_word.trim()) {
                    param.searchType = this.search_field[this.search_type].key
                    param.keyWord = this.search_word
                }

                api.post(api.method.orderlist, param).then((response) => {
                    let result = response.data;

                    if (result.orderNum) {
                        this.tabs[0].count = result.orderNum.wating;
                        this.tabs[1].count = result.orderNum.going;
                        this.tabs[2].count = result.orderNum.complete;
                        this.tabs[3].count = result.orderNum.over;
                        this.tabs[4].count = result.orderNum.stop;
                    }

                    if (result.data instanceof Array) {
                        result.data.forEach((item, index) => {
                            result.data[index].spread = false;
                        });

                        this.list = this.list.concat(result.data);
                    } else {
                        this.isMore = false;
                    }
                    this.loading = false;
                });
            },
            loadMore(){
                this.page = this.page + 1;

                this.getdata();
            },
            itemOnClick(index){
                let temp = this.list[index];
                temp.spread = !temp.spread;
                this.list[index] = temp;
            },
            delPhone(phone){
                window.location.href = 'tel://' + phone;
            },
            toInfo(id){
                this.$router.push({path: '/order_info', query: {orderId: id}});
            },
            handleTabChange(val)
            {
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
    .search_bar {
        display: flex;
        flex-direction: row;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 10px;
        .search_type {
            width: 30vw;
            margin-right: 10px;
        }

        .search_icon {
            width: 40px;
            height: 40px;
        }
    }

    .tabs {
        border-top: 0px;
    }

</style>
