<template>
    <div class="goods-item">
        <img :src="good.goodImg" alt="img" class="goods-img">
        <h3 class="title goods-title">{{good.product_name}}</h3>
        <p>{{good.price}} ₽</p>
        <button class="goods-btn" @click="addGoodToCart(good)">В корзину</button>
    </div>
</template>
<script>
    export default{
        name: 'goods-item',
        props: ['good'],
        methods:{
            addGoodToCart(good) {
                this.$emit('add-cart', good);
            },
        }
    }
</script>
<style>
    .goods-item {
        padding: 20px;
        margin-left: 20px;
        margin-bottom: 20px;
        width: calc(100% / 2 - 60px);
        background-color: #f1f1f1;
        text-align: center;
        height: fit-content;
        flex-basis: 200px;
    }
    .goods-img{
        width: 60%;
        height: 70%;
        margin-bottom: 20px;
    }
    .title {
        font-size: 18px;
        font-weight: bold;
    }
    .goods-title {
        margin-bottom: 20px;
    }
    .goods-btn{
        -webkit-appearance: none;
        border: none;
        background-color: #c6c6c6;
        color: black;
        border-radius: 4px;
        padding: 5px 10px;
        margin-top: 10px;
        font-size: 12px;
        box-shadow: 0 3px 5px rgba(0,0,0,0.25), 0 3px 5px rgba(0,0,0,0.22);
    }
    .goods-btn:active{
        box-shadow: none;
    }
</style>
