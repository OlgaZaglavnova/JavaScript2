'use strict';
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const app = new Vue({
    el: '#app',
    data:{
        goods:[],
        filteredGoods:[],
        searcAllRegExp: /\w*/,
        searchLine: '',
        goodPicture: 'img/lesson3_prod.jpg',
        cartGoods:[],
        isCartVisible: false,
        chatMessages:[{author:'admin', text:'Здравствуйте! Я могу Вам чем-то помочь?', time:''}],
        isChatVisible: false,
        consultantName: 'Ольга',
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
        searchBtnClick(){
            let filterRegExp;
            this.searcAllRegExp.lastIndex = 0;
            const regStars = /\*+/;
            const regPluses = /\++/;
            if (this.searcAllRegExp.test(this.lowerSearchLine) && !regStars.test(this.lowerSearchLine) && !regPluses.test(this.lowerSearchLine)) {
                filterRegExp = new RegExp(`${this.lowerSearchLine}`);
            }else {
                filterRegExp = this.searcAllRegExp;
            }
            this.filteredGoods = this.goods.filter(good => filterRegExp.test(good.product_name.toLowerCase()));
        },
        searchGood(id_product){
            let foundGood = {};
            this.goods.forEach(elem => {
                if (elem.id_product === id_product){
                    foundGood = elem;
                }
            });
            return foundGood;
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
        putGoodToCart(id_product) {
            let goodPos = this.findGoodPos(id_product);
            if ( goodPos >= 0){
                this.cartGoods[goodPos].count++;
            } else {
                //Тут нужно создать новый объект класса CartItem, копируя свойства соответствующего объекта GoodsItem
                let cartItem = {};
                let goodI = this.searchGood(id_product);
                cartItem.id_product = goodI.id_product;
                cartItem.product_name = goodI.product_name;
                cartItem.price = goodI.price;
                cartItem.count = 1;
                this.cartGoods.push(cartItem);
            }
            console.log(this.cartGoods);
        },
        showCart(){
            this.isCartVisible = true;
        },
        hideCart(){
            this.isCartVisible = false;
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
        openChat(){
            this.chatMessages[0].time = this.getTimeString();
            this.isChatVisible = true;
        },
        closeChat(){
            this.isChatVisible = false;
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
    },
    async mounted(){
        try {
            this.goods = await this.makeGETRequest(`${API_URL}/catalogData.json`);
            this.filteredGoods = [...this.goods];
        } catch (e) {
            console.error(e);
        }
    },
    computed:{
        lowerSearchLine(){
            return this.searchLine.toLowerCase();
        },
        cartSumm(){
            let csum=0;
            this.cartGoods.forEach(elem => csum += elem.price * elem.count);
            return csum;
        }
    }
});