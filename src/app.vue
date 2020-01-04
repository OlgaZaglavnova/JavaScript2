<template>
    <div id="hello">
        <header class="header">
            <search-form @filter-goods = "filterGoods"></search-form>
            <button class="cart-button" @click="toggleCart">Корзина</button>
        </header>
        <main>
            <goods-list :goods="filteredGoods" v-if="isQuerySuccess" @add-cart="addGoodToCart"></goods-list>
            <div class="queryNotSuccess" v-else>Запрос не выполнен</div>
            <cart :is-cart-visible="isCartVisible" @hide-cart="toggleCart" @increment-cart="addGoodToCart" @decrement-cart="removeGoodFromCart"></cart>
            <chat @add-user-message="addUserMessage"></chat>
        </main>
    </div>
</template>
<script>
    import SearchForm from '@/components/search-form';
    import GoodsList from '@/components/goods-list';
    import Cart from '@/components/cart';
    import Chat from '@/components/chat';
    import LocalStorage from '@/services/storage.service';

    export default {
        name: 'app',
        components:{
            SearchForm,
            GoodsList,
            Cart,
            Chat,
        },
        data() {
            return {
                goods: [],
                searcAllRegExp: /\w*/,
                filterLine: '',
                goodPicture: 'img/lesson3_prod.jpg',
                isCartVisible: false,
                isQuerySuccess: false,
                queryError: '',
                cartGoods:[],
                chatMessages:[]
            }
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
            makePOSTRequest(url, data){
                return new Promise((resolve, reject) => {
                    let xhr;
                    if (window.XMLHttpRequest) {
                        xhr = new window.XMLHttpRequest();
                    } else {
                        xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
                    }

                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4) {
                            resolve(xhr.responseText);
                        }
                    };
                    xhr.open('POST', url);
                    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                    xhr.send(data);
                });
            },
            toggleCart(){
                this.isCartVisible = !this.isCartVisible;
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
            },
            findGoodPos(product_name){
                // Ищем по названию
                let goodIdx = -1;
                this.cartGoods.forEach((item, index) => {
                    if (item.product_name === product_name) {
                        goodIdx = index;
                    }
                });
                return goodIdx;
            },
            async addGoodToCart(good){
                this.cartGoods = LocalStorage.getItem('cartGoods');
                let goodPos = this.findGoodPos(good.product_name);
                if ( goodPos >= 0){
                    this.cartGoods[goodPos].count++;
                } else {
                    //Тут нужно создать новый объект класса CartItem, копируя свойства соответствующего объекта GoodsItem
                    const cartItem = Object.assign({}, good, {count: 1});
                    this.cartGoods.push(cartItem);
                }
                await this.makePOSTRequest('/addCart', JSON.stringify(cartGoods));
                this.addCartState('add', good.product_name, this.getTimeString());
                LocalStorage.setItem('cartGoods', this.cartGoods);
            },
            async removeGoodFromCart(good){
                const goodPos = this.findGoodPos(good.product_name);
                this.cartGoods = LocalStorage.getItem('cartGoods');
                if (this.cartGoods[goodPos].count > 1) {
                    this.cartGoods[goodPos].count--;
                }else{
                    this.cartGoods.splice(goodPos, 1);
                };
                await this.makePOSTRequest('/removeCart', JSON.stringify(cartGoods));
                this.addCartState('remove', good.product_name, this.getTimeString());
                LocalStorage.setItem('cartGoods', this.cartGoods);
            },
            async addCartState(action, product_name, action_time){
                let cartState = {action: action,
                    product_name: product_name,
                    time: action_time};
                await this.makePOSTRequest('/addStats', JSON.stringify(cartState));
            },
            async addUserMessage(newUserMsg){
                this.chatMessages = LocalStorage.getItem('chatMessages');
                let newMsg = {author: 'user', text: newUserMsg, time: this.getTimeString()};
                this.chatMessages.push(newMsg);
                await this.makePOSTRequest('/addChat', JSON.stringify(chatMessages));
                LocalStorage.setItem('chatMessages', this.chatMessages);
            }
        },
        async mounted(){
            Promise.all([this.makeGETRequest(`/catalog`),
                this.makeGETRequest(`/getCart`),
                this.makeGETRequest(`/getChat`)
            ]).then(([catalogData, cartData, chatData])=>{
                this.goods = catalogData;
                this.goods.forEach((elem) => {
                    elem.goodImg = this.goodPicture
                });
                LocalStorage.setItem('cartGoods', cartData);
                //cartGoods.push(...cartData);
                if (chatData.length ===1){
                    chatData[0].time = this.getTimeString();
                };
                LocalStorage.setItem('chatMessages', chatData);
                //chatMessages.push(...chatData);
                this.isQuerySuccess = true;
            }).catch((err)=>{
                console.error(err);
            });
        },
        computed:{
            filteredGoods(){
                let filterRegExp;
                this.searcAllRegExp.lastIndex = 0;
                const regStars = /\*+/gi;
                const regPluses = /\++/gi;
                if ((this.filterLine ==="") || !this.searcAllRegExp.test(this.filterLine) && regStars.test(this.filterLine) && regPluses.test(this.filterLine)){
                    filterRegExp = this.searcAllRegExp;
                } else {
                    const searchValue = this.filterLine.replace(/[\*]/gi, '');
                    filterRegExp = new RegExp(`^${searchValue}`, 'i');
                }
                return this.goods.filter(good => filterRegExp.test(good.product_name));
            }
        }
    }
</script>
<style scoped>
    .header {
        padding: 10px 20px;
        border-bottom: 1px solid #c0c0c0;
        display: inline-block;
        justify-content: flex-end;
        margin-bottom: 40px;
        width: calc(100% - 40px);
    }
    .cart-button {
        -webkit-appearance: none;
        border: none;
        background-color: #46a5fc;
        color: #fff;
        border-radius: 4px;
        padding: 5px 10px;
        box-shadow: 0 3px 5px rgba(0,0,0,0.25), 0 3px 5px rgba(0,0,0,0.22);
        float: right;
    }
    .cart-button:active{
        box-shadow: none;
    }
    .queryNotSuccess{
        position: absolute;
        width: 50%;
        top: 100px;
        left: 25%;
        color: red;
        text-align: center;
        border: 1px solid black;
        box-shadow: 0 3px 5px rgba(0,0,0,0.25), 0 3px 5px rgba(0,0,0,0.22);
    }
</style>