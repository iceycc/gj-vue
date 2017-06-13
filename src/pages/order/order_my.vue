<template>
    <div class="page">
        <div class="search_bar">
            <mu-select-field v-model="search_type" class="search_type">
                <template v-for="item in search_field">
                    <mu-menu-item :value="item.value" :title="item.title"/>
                </template>
            </mu-select-field>
            <mu-text-field class="search_text" :hintText="search_field[search_type].hintText"
                           :type="search_field[search_type].type"
                           v-model="search_word"/>
            <mu-icon-button icon="search" slot="right" @click="doSearch"/>
        </div>
        <uz-tabs :tabs="tabs" :activeTab="activeTab" @change="handleTabChange"></uz-tabs>
        <uz-list :list="list" :isMore="isMore" :loading="loading" @loadMore="loadMore" @itemOnClick="itemOnClick">
            <template slot="item" scope="props">
                <div class="content title">{{props.item.xqmc}}-{{props.item.title}}</div>
                <div class="content">联系方式:{{props.item.telephone}}
                    <mu-icon-button v-if="props.item.spread" icon="smartphone" @click="delPhone(props.item.telephone)"/>
                </div>
                <div class="content">地址:{{props.item.address}}</div>
                <div class="content">订单编号:{{props.item.order_no}} 订单进度:{{props.item.nodename}}</div>
                <div class="content" v-if="props.item.spread">
                    下单时间:{{props.item.addtime}} 付款状态:{{props.item.ispay ? '已付款' : '未付款'}}
                </div>
                <div class="btns" v-if="props.item.spread">
                    <mu-raised-button label="详细信息" class="demo-raised-button" @click="toInfo(props.item.id)"/>
                    <mu-raised-button label="订单跟踪" class="demo-raised-button" @click="toNode(props.item.id)"/>
                    <mu-raised-button label="节点信息" class="demo-raised-button"/>
                </div>
            </template>
        </uz-list>
    </div>
</template>

<script>
    import {EventBus, Constants, API} from  '../../service/index';
    import UzGrid from "../../components/Grid";
    import UzTabs from "../../components/Tabs";
    import UzList from "../../components/List";

    let api;

    export default {
        components: {
            UzList,
            UzTabs,
            UzGrid
        },
        name: 'my-order',
        data() {
            return {
                activeTab: 0,
                tabs: Constants.Order.tabs,
                search_word: '',
                search_type: 0,
                search_field: Constants.Order.search_field,
                list: [],
                page: 1,
                loading: false,
                isMore: true
            }
        },
        mounted () {
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

                api.post(Constants.method.orderlist, param, (result) => {
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
            toInfo(id){//订单信息
                this.$router.push({path: '/order_info', query: {orderId: id}});
            },
            toNode(id){
                this.$router.push({path: '/order_node', query: {orderId: id}});
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

    .tabs {
        border-top: 0px;
    }

</style>
