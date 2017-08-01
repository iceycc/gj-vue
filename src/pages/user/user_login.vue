<template>
    <div class="page">
        <div class="login">
            <mu-text-field v-model="username" label="用户名" hintText="请输入用户名" icon="verified_user" :errorText="error_user"
                           labelFloat fullWidth/>
            <mu-text-field v-model="pass" label="密码" hintText="请输入密码" icon="lock" :errorText="error_pass"
                           type="password" labelFloat
                           fullWidth/>
            <br/>
            <br/>
            <mu-raised-button label="登录" @click="doLogin" fullWidth primary/>
        </div>

    </div>
</template>

<script>
    import {EventBus, Constants, API, mixins, JsBridge} from '../../service/index';

    let api;

    export default {
        name: 'user_login',
        mixins: [mixins],
        data() {
            /*
             username: 'guanjia02',
             pass: '123456'
             */
            return {
                username: 'csjl',
                pass: '123456',
                error_user: '',
                error_pass: ''
            }
        },
        created() {
            api = new API(this);
        },
        methods: {
            doLogin() {
                if (!this.username.trim()) {
                    this.error_user = '用户名不能为空';
                    return;
                }
                this.error_user = '';

                if (!this.pass.trim()) {
                    this.error_pass = '密码不能为空';
                    return;
                }
                this.error_pass = '';

                api.get('http://bpre.uz.com/index.php?' + Constants.method.login, {
                    username: this.username,
                    password: this.pass
                }, (result) => {
                    if (result.role != 38) {
                        alert('账户角色异常:' + result.role);
                    } else {
                        JsBridge.setStorage('user', result);
                        this.$router.push({name: 'cm_order_index'});
                    }
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .login {
        padding: 10px 30px;
    }
</style>
