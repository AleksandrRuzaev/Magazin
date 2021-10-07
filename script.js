import './style.css';
import { GoodsList, Basket } from './src/models/index';

const list = new GoodsList('.goods-list');
const basket = new Basket('.basket-list');

list.fetchGoods().then((_) => {
    list.render();
});

basket.fetchGoods();
