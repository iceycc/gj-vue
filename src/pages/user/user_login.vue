<template>
    <div class="page">
        <div class="login">
            <mu-text-field v-model="username" label="用户名" hintText="请输入用户名" :errorText="error_user"
                           labelFloat fullWidth/>
            <mu-text-field v-model="pass" label="密码" hintText="请输入密码" :errorText="error_pass"
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
                username: '',
                pass: '',
                error_user: '',
                error_pass: ''
            }
        },
        created() {
            EventBus.$emit(Constants.EventBus.setTitleLeftIcon, '');
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

                let loginUrl = 'http://bang.uzhuang.com';

                api.get(loginUrl + '/index.php?' + Constants.method.login, {
                    username: this.username,
                    password: this.pass
                }, (result, response) => {
                    if (!result) {
                        EventBus.$emit(Constants.EventBus.showToast, {
                            message: response.message
                        });
                    }

                    if (result.role == 41) {
                        result.role = '38';
                    }

                    if (result.role != 38) {
                        EventBus.$emit(Constants.EventBus.showToast, {
                            message: '账户角色异常:' + result.role
                        });
                    } else {
                        JsBridge.setStorage('user', result);
                        this.$router.push({name: 'user_info'});
                    }
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .login {
        padding: 40px 40px;
    }
</style>
