import './style.css';
import { GoodsList, Basket } from './src/models/index';

const basket = new Basket('.basket-list');
const list = new GoodsList('.goods-list', basket.addItem.bind(basket));

const modal = document.querySelector('.basket-modal');
const basketBtn = document.querySelector('.cart-button');
const closeBtn = document.querySelector('.close');

basketBtn.onclick = function () {
    modal.style.display = 'flex';
};

closeBtn.onclick = function () {
    modal.style.display = 'none';
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

list.fetchGoods().then((_) => {
    list.render();
});

basket.fetchGoods();
