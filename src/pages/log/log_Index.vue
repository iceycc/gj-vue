<template>
    <div class="page">
        <uz-grid :grids="menus" :role="user.role" @change="handleGridChange"></uz-grid>
    </div>
</template>

<script>
    import {EventBus, Constants, mixins} from  '../../service/index';
    import UzGrid from "../../components/Grid";
    export default {
        components: {UzGrid},
        mixins: [mixins],
        name: 'log',
        data() {
            return {
                activeTab: '0'
            }
        },
        created(){
            this.menus = Constants.Log.menu;
            this.user = this.getUser();

            EventBus.$emit(Constants.EventBus.update_main_tab_index, 2);
        },
        methods: {
            handleGridChange(val)
            {
                this.$router.push({name: this.menus[val].path});
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
