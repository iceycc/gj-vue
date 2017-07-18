<template>
    <div class="_page">
        <div class="search_bar">
            <mu-text-field class="search_text" hintText="请输入管家姓名"
                           type="text"
                           v-model="search_word"/>
            <mu-icon-button icon="search" slot="right" @click="doSearch"/>
        </div>
        <!--   @loadMore="loadMore" @itemOnClick="itemOnClick"-->
        <uz-auto-list ref="listview" :parent="this" :url="url" :handleparam="handleparam">
            <template slot="item" scope="props">
                <div class="filed title">
                    <div class="name">管家姓名:{{props.item.smName}}</div>
                    <mu-raised-button label="分配" @click="action(props.item)" primary/>
                    <!--<i-button type="primary" size="small" @click="action(props.item)">分配</i-button>-->
                </div>
            </template>
        </uz-auto-list>
    </div>
</template>

<script>
    import {EventBus, Constants, API} from  '../../../service/index';
    import UzGrid from "../../../components/Grid";
    import UzTabs from "../../../components/Tabs";
    import UzAutoList from "../../../components/AutoList";
    import Button from "iview/src/components/button";

    let api;

    export default {
        components: {
            UzAutoList,
            'i-button': Button,
            UzTabs,
            UzGrid
        },
        name: 'cm-order-allot-manager',
        data() {
            return {
                search_word: '',
                url: Constants.method.cm_stewardJList,
            }
        },
        computed: {
            listview: function () {
                return this.$refs.listview;
            }
        },
        mounted () {
            api = new API(this);
        },
        methods: {
            doSearch(){
                this.listview.initList();
                this.listview.getdata();
            },
            handleparam(){//处理参数
                let param = {};
                if (this.search_word.trim()) {
                    param.keyword = this.search_word.trim()
                }
                return param;
            },
            action(item){
                let param = {};
                param.smNo = item.smNo;
                param.orderNo = this.$route.query.orderNo;
                this.allot_manager(param);
            },
            allot_manager(param){
                api.post(Constants.method.cm_fpjl, param, (result) => {
                    console.log(result);
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../style/px2rem";

    ._page {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .tabs {
        border-top: 0;
    }

    .filed {
        padding: px2rem(10);
        font-size: px2rem(14);
        width: 100%;
        font-size: px2rem(16);
        display: flex;
        flex-direction: row;
        align-items: center;
        .name {
            flex-grow: 1;
        }
    }
</style>
