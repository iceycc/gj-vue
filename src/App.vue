<template>
    <div id="app">
        <mu-appbar :title="title">
            <mu-icon-button :icon="icon_left" slot="left" @click="back"/>
            <!-- 占位,标题不居中-->
            <mu-icon-button icon="" slot="right"/>
        </mu-appbar>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>

        <mu-toast v-if="toast" :message="toast_message"/>
    </div>
</template>

<script>
    import {EventBus, Constants} from  './service/index';
    export default {
        name: 'app',
        data(){
            return {
                title: '城市经理',
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
    @import "style/base";
</style>