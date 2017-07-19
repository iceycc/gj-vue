<template>
    <div class="page">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <uz-tabs :tabs="tabs" :activeTab="activeTab" @change="handleTabChange" class="tab"></uz-tabs>
    </div>
</template>

<script>
    import {EventBus, Constants} from  '../service/index';

    import UzTabs from "../components/Tabs";

    export default {
        components: {UzTabs},
        name: 'Index',
        data() {
            return {
                activeTab: 0,
                tabs: []
            }
        },
        created(){
            if (this.tabs.length == 0) {
                EventBus.$on(Constants.EventBus.update_main_tab_index, value => {
                    this.activeTab = value;
                });

                this.tabs = Constants.Tabs.csjl;
                //this.handleTabChange(this.activeTab);
            }
        },
        methods: {
            handleTabChange(val){
                this.$router.push({path: this.tabs[val].url});
                this.activeTab = val
            },
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>