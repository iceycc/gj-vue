<template>
    <div class="_page">
        <div class="date-class">
            <mu-select-field v-model="start_year" class="select-class">
                <template v-for="item in year_field">
                    <mu-menu-item :value="item" :title="item+''"/>
                </template>
            </mu-select-field>
            <div class="str">年</div>
            <mu-select-field v-model="start_month" class="select-class">
                <template v-for="item in start_field">
                    <mu-menu-item :value="item" :title="item+''"/>
                </template>
            </mu-select-field>
            <div class="str">月</div>
            <div class="str divider">至</div>
            <mu-select-field v-model="end_year" class="select-class">
                <template v-for="item in year_field">
                    <mu-menu-item :value="item" :title="item+''"/>
                </template>
            </mu-select-field>
            <div class="str">年</div>
            <mu-select-field v-model="end_month" class="select-class">
                <template v-for="item in start_field">
                    <mu-menu-item :value="item" :title="item+''"/>
                </template>
            </mu-select-field>
            <div class="str">月</div>
        </div>
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
        <uz-auto-list ref="listview" :parent="this" :url="url" :handleparam="handleparam">
            <template slot="item" scope="props">
                <div class="filed title">
                    <div class="name">管家姓名:{{props.item.gjname}}</div>
                    <i-button type="primary" size="small" @click="action(props.item)">分配</i-button>
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
        name: 'cm-user-allot-list',
        data() {
            return {
                start_year: new Date().getFullYear(),
                end_year: new Date().getFullYear(),
                start_month: new Date().getMonth() + 1,
                end_month: new Date().getMonth() + 1,
                search_word: '',
                search_type: 0,
                search_field: Constants.CM_Order.search_field,
                url: Constants.method.cm_stewardJList,
            }
        },
        computed: {
            year_field: function () {
                let temp = [];
                for (let i = 0; i < 5; i++) {
                    temp.push(this.start_year - i);
                }
                return temp;
            },
            start_field: function () {
                let temp = [];
                for (let i = 0; i < 12; i++) {
                    temp.push(i + 1);
                }
                return temp;
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
                return param;
            },
            action(item){
                let param = {};
                param.uid = item.uid;
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
    ._page {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .date-class {
        display: flex;
        flex-direction: row;
        align-items: baseline;
        margin: 10px 10px 0 10px;
        .select-class {
            width: 17%;
        }
        .str {
            margin: 0 5px;
        }
        .divider {
            font-size: 14px;
            margin: 0 10px;
        }
    }

    .search_bar {
        margin: 0;
    }
</style>
<style>
    .mu-menu-item {
        padding: 0 4px !important;
    }
</style>