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
    </div>
</template>

<script>
    import {API} from  '../service/index';
    let api;

    export default {
        name: 'uz-auto-list',
        props: {
            parent: {},
            url: {},       //
            handleparam: {} //请求时参数处理方法
        },
        data () {
            return {
                scroller: null,
                page: 1,
                list: [],
                isMore: true,
                loading: false
            }
        },
        updated () {
        },
        mounted () {
            api = new API(parent);
            this.scroller = this.$el;

            this.getdata();
        },
        methods: {
            initList(){
                //初始化
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

                Object.assign(param, this.handleparam());

                api.post(this.url, param, (result) => {
                    if (result instanceof Array) {
                        this.list = this.list.concat(result);
                    } else {
                        this.isMore = false;
                    }
                    this.loading = false;
                });
            },
            getCheckList(){
                let temp = [];
                this.list.forEach((item) => {
                    if (item.checked) {
                        temp.push(item);
                    }
                });
                return temp;
            },
            loadMore(){
                this.page = this.page + 1;
                this.getdata();

                this.$emit('loadMore');
            },
            itemOnClick(index){
                this.$emit('itemOnClick', index);
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
