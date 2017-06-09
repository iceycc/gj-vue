<template>
    <div class="page">
        <div class="content">
            <router-view></router-view>
        </div>
        <uz-tabs :tabs="tabs" :activeTab="activeTab" @change="handleTabChange"></uz-tabs>
    </div>
</template>

<script>
    import {EventBus, Constants, API} from  '../service/index';

    import UzTabs from "../components/Tabs";
    let api;

    export default {
        components: {UzTabs},
        name: 'Index',
        data() {
            return {
                activeTab: 0,
                tabs:[]
            }
        },
        created(){
            if(this.tabs.length == 0){
                EventBus.$on(Constants.EventBus.update_main_tab_index, value => {
                    this.activeTab = value;
                });

                this.tabs = Constants.Tabs;

                this.handleTabChange(this.activeTab);
            }

        },
        methods: {
            handleTabChange(val){
                this.$router.push({path: this.tabs[val].url});
                EventBus.$emit(Constants.EventBus.setTitle, this.tabs[val].title || this.tabs[val].name);
                this.activeTab = val
            },
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
