<template>
    <div class="page">
        <uz-grid :grids="menus" @change="handleGridChange"></uz-grid>
    </div>
</template>

<script>
    import {EventBus, Constants} from  '../../service/index';
    import UzGrid from "../../components/Grid";

    export default {
        components: {UzGrid},
        name: 'order',
        data() {
            return {
                grid_cols: 3,
                grids: []
            }

        },
        created(){
            this.menus = [{
                img: require('../../assets/image/icon_order_apply_manage.png'),
                title: '我的订单',
                path: '/my_order',
                role: 0,
            }, {
                img: require('../../assets/image/icon_order_myorder.png'),
                title: '分配订单',
                path: '',
                role: 1,
            }, {
                img: require('../../assets/image/icon_order_orderallot.png'),
                title: '申请管理',
                path: '',
                role: 1
            }];

            EventBus.$emit(Constants.EventBus.update_main_tab_index, 0);
        },
        methods: {
            handleGridChange(val)
            {
                this.$router.push({path: this.menus[val].path});
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
