import {EventBus, Constants, JsBridge} from '../service/index';

export default {
    computed: {
        isCSJL: function () {
            return this.user.role == '38';
        }
    },
    methods: {
        setTitle(title) {
            EventBus.$emit(Constants.EventBus.setTitle, title);
        },
        getUser() {
            let str = JsBridge.getStorage('user');
            if (!str)
                return;
            return JSON.parse(str);
        },
        router_push(action) {
            let rou = {
                name: action.path
            };

            if (action.query) {
                rou.query = action.query;
            }

            if (action.params) {
                rou.params = action.params;
            }
            this.$router.push(rou);
        },
        logout() {
            JsBridge.removeStorage('user');
            if(window.__uex){
                window.uexWindow.open({name:'login','data':'login.html'});
            }else{
                this.$router.push({name: 'user_login'});
            }
        }
    },
    created() {
        this.user = this.getUser();
    }
}
