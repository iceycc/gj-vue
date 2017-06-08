<template>
    <div class="page">
    </div>
</template>

<script>
    import {EventBus, Constants} from  '../../service/index';

    export default {
        name: 'Index',
        data() {
            return {
                activeTab: '0'
            }
        },
        created(){
            EventBus.$emit(Constants.EventBus.update_main_tab_index, 3);
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
