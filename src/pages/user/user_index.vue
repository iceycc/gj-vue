<template>
    <div class="page">
        <div class="userinfo">
            <mu-avatar class="user-image" :src="user.personalphoto"/>
            <div>
                <div class="user-text">昵称:{{user.nickname}}</div>
                <div class="user-text">账号:{{user.username}}</div>
            </div>
        </div>

        <mu-raised-button label="退出" @click="doLogout" fullWidth secondary/>
    </div>
</template>

<script>
    import {EventBus, Constants ,mixins} from  '../../service/index';

    export default {
        name: 'user_index',
        mixins: [mixins],
        data() {
            return {
                user: {}
            }
        },
        created(){
            this.user = this.getUser();
        },
        methods: {
            doLogout(){
                this.logout();
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .page {
        padding: 10px 0;

        .userinfo {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 20px;
            border-bottom: 10px solid #CCCCCC;
            .user-image {
                width: 60px;
                height: 60px;
                margin-right: 20px;
            }
            .user-text {
                font-size: 14px;
            }
            .user-text:first-child {
                padding-bottom: 10px;
            }
        }
    }


</style>
