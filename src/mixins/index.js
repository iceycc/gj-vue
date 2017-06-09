import {EventBus, Constants} from  '../service/index';

export default {
    methods: {
        setTitle(title){
            EventBus.$emit(Constants.EventBus.setTitle, title);
        },
        getUser(){
            let str = this.$localStorage.get('user') ;
            if(!str)
                return ;
            return JSON.parse(this.$localStorage.get('user'));
        },
        router_push(action){
            let rou = {
                name: action.path
            };

            if(action.query){
                rou.query = action.query;
            }
            this.$router.push(rou);
        },
        logout(){
            this.$localStorage.remove('user');
            this.$router.push({name: 'user_login'});
        }
    }
}
