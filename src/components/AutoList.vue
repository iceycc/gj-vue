<template>
    <div class="list">
        <mu-list>
            <template v-for="(item,index) in list">
                <mu-list-item class="item" @click="itemOnClick(index)">
                    <slot name="item" :item="item" :index="index"></slot>
                </mu-list-item>
                <mu-divider/>
            </template>
        </mu-list>
        <mu-infinite-scroll v-if="isMore" :scroller="scroller" :loading="loading" @load="loadMore"/>
        <div v-if="list.length <= 0" style="width: 100%;text-align: center;color: #9e9e9e;text-decoration:underline">
            数据为空
        </div>
    </div>
</template>

<script>
    import {API} from '../service/index';

    let api;

    export default {
        name: 'uz-auto-list',
        props: {
            parent: {},
            url: {},       //
            notify: {
                type: [Object, String],
                default: null
            }
        },
        data() {
            return {
                scroller: null,
                page: 1,
                list: [],
                isMore: true,
                loading: false
            }
        },
        watch: {
            notify: function (val, oldVal) {
                if (val) {
                    this.rest();
                } else {
                    this.initList();
                }
            }
        },
        mounted() {
            api = new API(parent);
            this.scroller = this.$el;
            this.getdata();
        },
        methods: {
            rest() {
                this.initList();
                this.getdata();
            },
            initList() {
                //初始化
                this.list = [];
                this.page = 1;
                this.isMore = true;
                this.loading = false;
            },
            getdata() {
                this.loading = true;
                let param = {
                    page: this.page,
                };

                if (this.$parent.handleParam) {
                    param = Object.assign(this.$parent.handleParam(), param)
                }

                api.post(this.url, param, (result) => {
                    let datas = [];
                    if ('handleResult' in this.$parent) {
                        datas = this.$parent.handleResult(result);
                    } else {
                        datas = result;
                    }
                    this.list = this.list.concat(datas);

                    if (datas.length == 0) {
                        this.isMore = false;
                    } else {
                        this.page = this.page + 1;
                    }

                }, null, () => {
                    this.loading = false;
                })
            },
            getCheckList() {
                let temp = [];
                this.list.forEach((item) => {
                    if (item.checked) {
                        temp.push(item);
                    }
                });
                return temp;
            },
            loadMore() {
                this.getdata();
            },
            itemOnClick(index) {
                this.$emit('itemOnClick', this.list[index], index);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .grid {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .grid-item {
            width: 33vw;
            height: 33vw;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #FFFFFF;
            .grid-item-img {
                height: 50px;
                width: 50px;
                margin-bottom: 10px;
            }
        }
        .grid-item:active {
            background-color: #cccccc;
        }
    }
</style>
