<template>
    <div class="page">
        <mu-raised-button label="选择图片" @click="selectAlbum" fullWidth primary/>
        <div class="image-list">
            <!-- :style="{backgroundImage: 'url(' + image + ')'}"  :src="image"  -->
            <img v-for="image in images" class="image" :src="image" >
        </div>
    </div>
</template>

<script>
    import {EventBus, Constants, mixins} from  '../../service/index';
    import * as JsBridge from '../../service/JsBridge'

    export default {
        mixins: [mixins],
        name: 'order',
        data() {
            return {
                grid_cols: 3,
                images: ['abc.png']
            }
        },
        created(){
            this.menus = Constants.Order.menu;

            this.user = this.getUser();

            EventBus.$emit(Constants.EventBus.update_main_tab_index, 0);
        },
        methods: {
            selectAlbum(){
                JsBridge.seletcAlbum(2, (data) => {
                    this.images = data;
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .image-list {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
    }

    .image {
        width: 150px;
        height: 150px;
        margin-right: 10px;
        margin-bottom: 10px;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
    }
</style>
