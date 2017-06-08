<template>
    <div class="tabs">
        <template v-for="(tab , index) in tabs">
            <div class="tab-item" @click="handleTabChange(index)">
                <img v-if="tab.img" class="tab-img" :src="currentIndex == index ? tab.act_img : tab.img" alt="">
                <div :class="currentIndex == index ? 'tab-title tab-title-act' : 'tab-title'">{{tab.name}}{{tab.count}}</div>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'uz-tabs',
        props: {
            tabs: {},
            activeTab: {
                type: Number,
                default: 0
            }
        },
        data () {
            return {
                currentIndex: this.activeTab
            }
        },
        watch: {
            activeTab(val){
                this.currentIndex = val;
            }
        },
        updated () {

        },
        methods: {
            handleTabChange(index){
                if (this.currentIndex != index) {
                    this.currentIndex = index;
                    this.$emit('change', index);
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import './scss/variable.scss';

    .tabs {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        background: $default-color;
        border-top: 1px solid $divideline-color;
        padding-top: 8px;
        padding-bottom: 8px;
        .tab-item {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .tab-img {
                width: 25px;
                height: 25px;
                margin-bottom: 5px;
            }
            .tab-title {
                font-size: 14px;
                color: #333333;
            }
            .tab-title-act {
                color: $primary-color;
            }
        }
    }
</style>
