<template>
    <div class="page">
        <br>
        <br>
        <br>
        <mu-raised-button label="选择图片" @click="selectAlbum" fullWidth primary/>
        <br>
        <br>
        <br>
        <mu-raised-button label="上传图片" @click="uploadFiles" fullWidth primary/>
        <br>
        <br>
        <br>
        <div class="image-list">
            <!-- :style="{backgroundImage: 'url(' + image + ')'}"  :src="image"  -->
            <img v-for="image in images" class="image" :src="image">
        </div>
    </div>
</template>

<script>
    import {EventBus, Constants, mixins, API} from  '../../service/index';
    import * as JsBridge from '../../service/JsBridge'

    export default {
        mixins: [mixins],
        name: 'order',
        data() {
            return {
                grid_cols: 3,
                images: []
            }
        },
        created(){
            this.menus = Constants.Order.menu;

            this.user = this.getUser();

            EventBus.$emit(Constants.EventBus.update_main_tab_index, 0);
        },
        methods: {
            selectAlbum(){
                JsBridge.seletcAlbum(1, (data) => {
                    this.images = data;
                });
            },
            uploadFiles(){
                JsBridge.sendRequest(Constants.method.baseURL + '?' + Constants.method.save_photo, null, {
                    inputName: this.images[0]
                }, ((result) => {
                    try {
                        let fileName = result.data.saveName;
                        EventBus.$emit(Constants.EventBus.showToast, {
                            message: '上传成功:' + fileName
                        });
                    }
                    catch (err) {
                        EventBus.$emit(Constants.EventBus.showToast, {
                            message: '上传失败:' + result
                        });
                    }
                }))
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
