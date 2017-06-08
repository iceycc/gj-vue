<template>
    <div id="app">
        <mu-appbar :title="title">
            <mu-icon-button :icon="icon_left" slot="left" @click="back"/>
            <!-- 占位,标题不居中-->
            <mu-icon-button icon="" slot="right"/>
        </mu-appbar>
        <router-view></router-view>
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
            console.log('mounted');
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
        text-align: center;
        color: #2c3e50;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .page {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        height: 100%;
    }

    .content {
        flex-grow: 1;
    }

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
</style>
