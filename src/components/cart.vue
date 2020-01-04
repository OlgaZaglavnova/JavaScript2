<template>
    <div class="cart-bck" v-if="isCartVisible">
        <div class="cart">
            <a href="#" @click="hideCart"><div class="cart-close">&#10052;</div></a>
            <div class="cart-inner">
                <div class="cart-good">
                    <div class="cart-img-title"></div>
                    <div class="cart-name bold">Наименование</div>
                    <div class="cart-price bold">Цена</div>
                    <div class="cart-count bold">Количество</div>
                    <div></div>
                </div>
                <div class="cart-good" v-for="cartgood in cartGoods" :key="cartgood.product_name">
                    <img :src="cartgood.goodImg" alt="img" class="cart-img">
                    <div class="cart-name">{{cartgood.product_name}}</div>
                    <div class="cart-price">{{cartgood.price}} ₽</div>
                    <div class="cart-count">{{cartgood.count}}</div>
                    <button class="inc-good" @click="incrementCartGood(cartgood)">+</button>
                    <button class="dec-good" @click="decrementCartGood(cartgood)">-</button>
                </div>
                <div class="cart-sum bold">ИТОГО: {{cartSumm}} ₽</div>
            </div>
        </div>
    </div>
</template>
<script>
    import LocalStorage from '@/services/storage.service';
    export default {
        name: 'Cart',
        props: ['isCartVisible'],
        data: () =>({
            cartGoods: [],
        }),
        methods: {
            hideCart(){
                this.$emit('hide-cart');
            },
            incrementCartGood(good){
                this.$emit('increment-cart', good);
            },
            decrementCartGood(good){
                this.$emit('decrement-cart', good);
            },
        },
        computed:{
            cartSumm(){
                let csum=0;
                this.cartGoods.forEach(elem => csum += elem.price * elem.count);
                return csum;
            },
        },
        mounted(){
            this.cartGoods = LocalStorage.getItem('cartGoods');
        },
    }
</script>
<style scoped>
    .cart-bck{
        position: absolute;
        top: 0px;
        left: 0px;
        background: rgba(128, 128, 128, 0.5);
        min-height: 100%;
        height: 130%;
        width: 100%;
    }
    .cart{
        position: relative;
        padding: 10%;
        background-color: white;
        top: 10%;
        left: 5%;
        width: 70%;
        border: 1px solid #999;
    }
    .cart-close{
        width: 20px;
        height: 20px;
        font-size: 18px;
        line-height: 20px;
        position: absolute;
        top: -7px;
        right: -7px;
        border-radius: 50%;
        background-color: gray;
        color: white;
        text-align: center;
    }
    .cart-inner{
        width: 100%;
        height: 100%;
        padding: 10px;
    }
    .cart-good{
        width: 100%;
        display: block;
    }
    .cart-img-title{
        width: 50px;
        display: inline-block;
    }
    .cart-name{
        display: inline-block;
        width: 30%;
    }
    .cart-price{
        display: inline-block;
        width: 20%;
    }
    .cart-count{
        display: inline-block;
        width: 20%;
    }
    .bold{
        font-weight: bold;
    }
    .cart-img{
        width: 40px;
        height: 40px;
        margin: 5px;
    }
    .inc-good, .dec-good{
        width: 15px;
        height: 15px;
        font-size: 15px;
        text-align: center;
        padding: 0px;
        border-radius: 1px;
        line-height: 8px;
    }
    .cart-sum{
        display: block;
        width: 100%;
        margin: 20px 0px;
        text-align: right;
    }
</style>
