<template>
    <div class="tabs">
        <template v-for="(tab , index) in tabs">
            <div class="tab-item" @click="handleTabChange(index)">
                <img v-if="tab.img" class="tab-img" :src="currentIndex == index ? tab.act_img : tab.img" alt="">
                <div :class="currentIndex == index ? actClass : 'tab-title'">
                    {{tab.name}}{{tab.count}}
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'uz-tabs',
        props: {
            border: {
                type: Boolean,
                default: false
            },
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
        computed: {
            actClass: function () {
                return this.border ? 'tab-title tab-title-act tab-title-border-act' : 'tab-title tab-title-act';
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
    @import "../style/px2rem";
    @import './scss/variable.scss';

    .tabs {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        background: $default-color;
        border-top: 1px solid $divideline-color;
        padding: px2rem(10) 0;
        .tab-item {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .tab-img {
                width: px2rem(25);
                height: px2rem(25);
                margin-bottom: 5px;
            }
            .tab-title {
                font-size: px2rem(14);
                color: #333333;
            }
            .tab-title-act {
                color: $primary-color;
            }
            .tab-title-border-act {
                border-bottom: px2rem(1) solid $primary-color;
            }

        }
    }
</style>
