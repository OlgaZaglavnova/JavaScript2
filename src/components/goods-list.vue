<template>
    <div class="goods-list" v-if="!isGoodsEmpty">
        <goods-item v-for="good in goods" :good="good" :key="good.product_name" @add-cart="addCart"></goods-item>
    </div>
    <div class="goods-not-found" v-else><h2>Нет данных</h2></div>
</template>
<script>
    import GoodsItem from './goods-item.vue';
    export default {
        name: 'GoodsList',
        components:{
            GoodsItem,
        },
        props: ['goods'],
        methods: {
            addCart(good) {
                this.$emit('add-cart', good);
            }
        },
        computed: {
            isGoodsEmpty() {
                return this.goods.length === 0;
            }
        }
    }
</script>
<style scoped>
    .goods-list {
        display: flex;
        flex-wrap: wrap;
        max-width: 1280px;
        margin: 0 auto;
    }
    .goods-not-found{
        width: 100%;
        text-align: center;
    }
</style>