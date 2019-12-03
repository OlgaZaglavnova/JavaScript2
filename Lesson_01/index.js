const goods = [
    { title: 'Shirt', price: 150},
    { title: 'Socks', price: 150},
    { title: 'Jacket', price: 150},
    { title: 'Shoes', price: 150},
];

const renderGoodsItem = (title, price, index, prodImage = "img/prod4.jpg") => `<div class="goods-item">
                                                                                <img src=${prodImage} class="goods-img" alt="goods img">
                                                                                <h3>${title}</h3>
                                                                                <p>${price}</p>
                                                                                <button id="good-${index}" class="goods-btn">Добавить</button>
                                                                             </div>`;

const renderGoodsList = (list) => {
    const goodsList = list.map((item, index) => renderGoodsItem(item.title, item.price, index));
    document.querySelector('.goods-list').innerHTML = goodsList.join("");
};

renderGoodsList(goods);
