import './style.css';
import { GoodsList } from './src/models/index';

const list = new GoodsList('.goods-list');

list.fetchGoods();
list.render();
