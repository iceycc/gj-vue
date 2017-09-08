<template>
    <div class="list">
        <mu-list>
            <template v-for="(item,index) in list">
                <div class="item" @click="itemOnClick(index)">
                    <slot name="item" :item="item" :index="index"></slot>
                </div>
                <mu-divider/>
            </template>
        </mu-list>
        <mu-infinite-scroll v-if="isMore" :scroller="scroller" :loading="loading" @load="loadMore"/>
    </div>
</template>

<script>
    export default {
         name: 'uz-list',
        props: {
            list: {
                type: Array,
                default: []
            },
            isMore: {
                default: false
            },
            loading: {
                default: false
            },
        },
        data () {
            return {
                scroller: null,
                scrollTop: 0
            }
        },
        updated () {
        },
        mounted () {
            this.scroller = this.$el;
        },
        mounted () {
            this.scroller = this.$el;
            this.scroller.onscroll = () => {
                this.scrollTop = this.scroller.scrollTop;
            }
        },
        activated(){
            if (this.scrollTop !== 0) {
                this.scroller.scrollTop = this.scrollTop;
            }
        },
        methods: {
            loadMore(){
                this.$emit('loadMore');
            },
            itemOnClick(index){
                this.$emit('itemOnClick', index);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
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

    .list {
        .item {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 10px;
            font-size: 14px;
        }
        .item:active {
            background-color: #cccccc;
        }
    }
</style>
