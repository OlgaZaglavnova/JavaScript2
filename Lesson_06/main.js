'use strict';
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const cartGoods = [];

const searchForm = {
    name: 'search-form',
    data: () => ({
        searchLine: '',
    }),
    template: `
        <form class="search-form" @input.prevent="filterGoods">
            <input type="text" class="good-search" v-model="searchLine"/>
        </form>
    `,
    methods: {
        filterGoods(){
            this.$emit('filter-goods', this.searchLine);
        }
    },
};

const goodsItem = {
    name: 'goods-item',
    props: ['good'],
    template: `<div class="goods-item">
                    <img :src="good.goodImg" alt="img" class="goods-img">
                    <h3 class="title goods-title">{{good.product_name}}</h3>
                    <p>{{good.price}} ₽</p>
                    <button class="goods-btn" @click="addGoodToCart(good)">В корзину</button>
                </div>`,
    methods:{
        addGoodToCart(good) {
            let goodPos = this.findGoodPos(good.id_product);
            if ( goodPos >= 0){
                cartGoods[goodPos].count++;
            } else {
                //Тут нужно создать новый объект класса CartItem, копируя свойства соответствующего объекта GoodsItem
                const cartItem = Object.assign({}, good, {count: 1});
                cartGoods.push(cartItem);
            }
        },
        findGoodPos(id_product){
            // Ищем по артикулу
            let goodIdx = -1;
            cartGoods.forEach((item, index) => {
                if (item.id_product == id_product) {
                    goodIdx = index;
                }
            });
            return goodIdx;
        },
    }
};

const goodsList = {
    name: 'goods-list',
    props: ['goods'],
    components: {
        goodsItem,
    },
    template: `<div class="goods-list" v-if="!isGoodsEmpty">
                <goods-item v-for="good in goods" :good="good" :key="good.id_product"></goods-item>
        </div>
        <div class="goods-not-found" v-else><h2>Нет данных</h2></div>`,
    computed: {
        isGoodsEmpty(){
            return this.goods.length === 0;
        },
    },
};

const cart = {
    name: 'cart',
    props: ['isCartVisible'],
    data: () =>({
        cartGoods: cartGoods,
    }),
    template: `
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
                    <div class="cart-good" v-for="cartgood in cartGoods" :key="cartgood.id_product">
                        <img :src="cartgood.goodImg" alt="img" class="cart-img">
                        <div class="cart-name">{{cartgood.product_name}}</div>
                        <div class="cart-price">{{cartgood.price}} ₽</div>
                        <div class="cart-count">{{cartgood.count}}</div>
                        <button class="inc-good" @click="incrementCartGood(cartgood.id_product)">+</button>
                        <button class="dec-good" @click="decrementCartGood(cartgood.id_product)">-</button>
                    </div>
                    <div class="cart-sum bold">ИТОГО: {{cartSumm}} ₽</div>
                </div>
            </div>
        </div>
    `,
    methods: {
        hideCart(){
            this.$emit('hide-cart');
        },
        incrementCartGood(idProd){
            this.cartGoods[this.findGoodPos(idProd)].count++;
        },
        decrementCartGood(idProd){
            const goodPos = this.findGoodPos(idProd);
            if (this.cartGoods[goodPos].count > 0) {
                this.cartGoods[goodPos].count--;
            }
            if (this.cartGoods[goodPos].count === 0){
                this.cartGoods.splice(goodPos, 1);
            }
        },
        findGoodPos(id_product){
            // Ищем по артикулу
            let goodIdx = -1;
            this.cartGoods.forEach((item, index) => {
                if (item.id_product == id_product) {
                    goodIdx = index;
                }
            });
            return goodIdx;
        },
    },
    computed:{
        cartSumm(){
            let csum=0;
            this.cartGoods.forEach(elem => csum += elem.price * elem.count);
            return csum;
        },
    },
};

const queryNotSuccess = {
    name: 'query-not-success',
    props:['queryError'],
    template: `
           <div class="queryNotSuccess">
                <p>Запрос к серверу не выполнен</p>
                <p>{{queryError}}</p>
            </div>
    `,
};

const app = new Vue({
    el: '#app',
    data:{
        goods:[],
        searcAllRegExp: /\w*/,
        filterLine: '',
        goodPicture: 'img/lesson3_prod.jpg',
        isCartVisible: false,
        chatMessages:[{author:'admin', text:'Здравствуйте! Я могу Вам чем-то помочь?', time:''}],
        isChatVisible: false,
        consultantName: 'Ольга',
        isQuerySuccess: false,
        queryError: '',
    },
    components:{
        goodsList,
        searchForm,
        cart,
        queryNotSuccess,
    },
    methods:{
        makeGETRequest(url){
            return new Promise((resolve, reject) => {
                let xhr;
                if (window.XMLHttpRequest) {
                    xhr = new window.XMLHttpRequest();
                } else {
                    xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
                }

                xhr.onreadystatechange=function(){
                    console.log(xhr.readyState);
                    console.log(xhr.status);
                    if (xhr.readyState === 4){
                        if (xhr.status === 200) {
                            const body = JSON.parse(xhr.responseText);
                            resolve(body);
                        } else{
                            reject({error: xhr.status});
                        }
                    }
                };
                xhr.onerror=(err)=>{reject(err)};
                xhr.open('GET', url);
                xhr.send();
            });
        },
         /*searchGood(id_product){
            let foundGood = {};
            this.goods.forEach(elem => {
                if (elem.id_product === id_product){
                    foundGood = elem;
                }
            });
            return foundGood;
        },*/
        /*searchGood(id_product){
            return this.goods.filter(item => item.id_product === id_product)[0]
        },*/
         toggleCart(){
            this.isCartVisible = !this.isCartVisible;
        },

       /* openChat(){
            this.chatMessages[0].time = this.getTimeString();
            this.isChatVisible = true;
        },
        closeChat(){
            this.isChatVisible = false;
        },*/
       toggleChat(){
           this.isChatVisible = !this.isChatVisible;
        },
        getTimeString(){
            let currentTime = new Date();
            let hours = `${currentTime.getHours()}`;
            if (hours.length < 2) {
                hours = '0' + hours;
            }
            let minutes = `${currentTime.getMinutes()}`;
            if (minutes.length < 2) {
                minutes = '0' + minutes;
            }
            return hours + ':' + minutes;
        },
        filterGoods(srchL){
           this.filterLine = srchL;
        }
    },
    async mounted(){
        try {
            this.goods = await this.makeGETRequest(`${API_URL}/catalogData.json`);
            this.goods.forEach(good => {good.goodImg = this.goodPicture});
            console.log(this.goods);
            this.isQuerySuccess = true;
        } catch (e) {
            this.isQuerySuccess = false;
            this.queryError = e.name + ":" + e.message;
            console.error(e);
        };
    },
    computed:{
        /*lowerSearchLine(){
            return this.searchLine.toLowerCase();
        },*/
        filteredGoods(){
            let filterRegExp;
            this.searcAllRegExp.lastIndex = 0;
            const regStars = /\*+/gi;
            const regPluses = /\++/gi;
            if (this.searcAllRegExp.test(this.filterLine) && !regStars.test(this.filterLine) && !regPluses.test(this.filterLine)) {
                filterRegExp = new RegExp(`${this.filterLine}`, 'gi');
            }else {
                filterRegExp = this.searcAllRegExp;
            }
            return this.goods.filter(good => filterRegExp.test(good.product_name));
        }
    }
});