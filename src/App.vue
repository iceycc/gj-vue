<template>
    <div id="app">
        <mu-appbar :title="title">
            <mu-icon-button :icon="icon_left" slot="left" @click="back"/>
            <!-- 占位,标题不居中-->
            <mu-icon-button icon="" slot="right"/>
        </mu-appbar>
        <!--<transition name="fade"></transition>-->
<!--        <keep-alive>
            <router-view v-if="!$route.meta.notKeepAlive"></router-view>
        </keep-alive>
        <router-view v-if="$route.meta.notKeepAlive"></router-view>-->
        <router-view ></router-view>

        <mu-toast v-if="toast" :message="toast_message"/>
    </div>
</template>

<script>
    import {EventBus, Constants} from  './service/index';

    export default {
        name: 'app',
        data(){
            return {
                title: '管家端',
                icon_left: 'arrow_back',
                toast: false,
                toast_message: '',
                toastTimer: null
            }
        },
        created(){
            EventBus.$on(Constants.EventBus.setTitle, value => {
                console.log(value);
                this.title = value;
            });

            EventBus.$on(Constants.EventBus.showToast, value => {
                this.toast = true;
                this.toast_message = value.message;

                if (this.toastTimer) clearTimeout(this.toastTimer)
                this.toastTimer = setTimeout(() => {
                    this.toast = false
                }, 2000)
            });

            EventBus.$on(Constants.EventBus.setTitleLeftIcon, value => {
                this.icon_left = value;
            });
        },
        mounted(){
        },
        methods: {
            back(){
                this.$router.back();
            }
        }
    }
</script>

<style lang="scss">
    html, body {
        height: 100%;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        display: flex;
        flex-direction: column;
        height: 100%;
        .page {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: 100%;
            overflow: scroll;
            .content {
                flex-grow: 1;
            }
        }
    }

    //list基础样式
    .list {
        overflow: auto;
        height: 100%;
        .item {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 10px 20px;
            .title {
                font-size: 18px;
            }
            .content {
                margin-bottom: 5px;
            }
            .btns {
                width: 100%;
                display: flex;
                justify-content: flex-end;
            }
        }
    }

    //搜索条
    .search_bar {
        display: flex;
        flex-direction: row;
        margin: 10px;
        .search_type {
            width: 30vw;
            margin-left: 10px;
        }
        .search_text {
            flex-grow: 1;
            margin-left: 10px;
        }
        .search_icon {
            width: 40px;
            height: 40px;
        }
    }

    //iview-折叠控件样式
    .ivu-collapse {
        border: 0px;
        .ivu-collapse-content-box {
            padding-bottom: 0;
        }
    }

    //dialog 样式
    .mu-dialog-title {
        font-size: 16px;
    }

    .mu-dialog-body {
        font-size: 14px;
    }

</style>
<docs>
    ### 程序入口文件
    测试A
</docs>