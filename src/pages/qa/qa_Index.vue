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
        name: 'qa',
        data() {
            return {
                activeTab: '0'
            }
        },
        created(){
            this.menus = [{
                img: require('../../assets/image/icon_qa_myquest.png'),
                title: '我的问答',
                path: '',
                role: 0,
            }, {
                img: require('../../assets/image/icon_qa_questlist.png'),
                title: '问题列表',
                path: '',
                role: 1,
            }, {
                img: require('../../assets/image/icon_qa_knowledge.png'),
                title: '知识库',
                path: '',
                role: 1
            }];

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
