<template>
    <div class="page">
        <uz-grid :grids="menus"></uz-grid>
    </div>
</template>

<script>
    import {EventBus, Constants} from  '../../service/index';
    import UzGrid from "../../components/Grid";
    export default {
        components: {UzGrid},
        name: 'log',
        data() {
            return {
                activeTab: '0'
            }
        },
        created(){
            this.menus = [{
                img: require('../../assets/image/icon_log_dailyrecord.png'),
                title: '我的日志',
                path: '',
                role: 0,
            }, {
                img: require('../../assets/image/icon_log_dailymanage.png'),
                title: '日志管理',
                path: '',
                role: 1,
            }];

            EventBus.$emit(Constants.EventBus.update_main_tab_index, 2);
        },
        methods: {
            handleTabChange(val)
            {
                this.activeTab = val
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
