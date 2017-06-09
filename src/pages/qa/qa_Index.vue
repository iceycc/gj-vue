<template>
    <div class="page">
        <uz-grid :grids="menus"></uz-grid>
    </div>
</template>
<script>
    import {EventBus, Constants, mixins} from  '../../service/index';
    import UzGrid from "../../components/Grid";

    export default {
        components: {UzGrid},
        name: 'qa',
        data() {
            return {
                activeTab: '0'
            }
        },
        created(){
            this.menus = Constants.QA.menu;

            EventBus.$emit(Constants.EventBus.update_main_tab_index, 1);
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
