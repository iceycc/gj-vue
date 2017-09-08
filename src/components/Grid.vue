<template>
    <div class="grid">
        <template v-for="item, index in grids">
            <div class="grid-item" :style="griditemStyle" @click="itmeClick(index)"
                 v-if="item.role.indexOf(role) > -1">
                <img class="grid-item-img" :src="item.img" v-if="item.img"/>
                <span>{{item.title}}</span>
                <span class="badge" v-show="item.count > 0">{{item.count}}</span>
            </div>
        </template>

    </div>
</template>

<script>
    export default {
        name: 'uz-grid',
        props: {
            cols: {
                type: Number,
                default: 3
            },
            role: {
                type: [String],
                default: '21'
            },
            grids: {}
        },
        data() {
            return {
                griditemStyle: {
                    width: '33vw',
                    height: '33vw'
                }
            }
        },
        updated() {
        },
        created() {
        },
        mounted() {
            this.griditemStyle.width = 100 / this.cols + 'vw';
            this.griditemStyle.height = 100 / this.cols + 'vw';
        },
        methods: {
            itmeClick(index) {
                this.$emit('change', index);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .grid {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .grid-item {
            width: 33vw;
            height: 33vw;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #FFFFFF;
            position: relative;
            border: 1px solid #CCCCCC;
            margin: 5px;
            .grid-item-img {
                height: 50px;
                width: 50px;
                margin-bottom: 10px;
            }
            .badge {
                min-width: 24px;
                min-height: 24px;
                line-height: 1;
                text-align: center;
                color: #FFFFFF;
                position: absolute;
                top: 5px;
                font-weight: 500;
                right: 5px;
                background: #e13c13;
                padding: 5px;
                border-radius: 50%;
            }
        }
        .grid-item:active {
            background-color: #cccccc;
        }
    }
</style>
