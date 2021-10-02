import { GoodsItem } from './goods-item';

class GoodsList {
    constructor(selector) {
        this.selector = selector;
        this.goods = [];
    }

    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ].map((good) => new GoodsItem(good.title, good.price, 'goods-item'));
    }

    getSumPrice() {
        return this.goods.reduce((total, good) => {
            return (total += good.price);
        }, 0);
    }

    render() {
        let listHtml = '';

        this.goods.forEach((good) => {
            listHtml += good.render();
        });

        document
            .querySelector(this.selector)
            .insertAdjacentHTML('beforeend', listHtml);
    }
}

export { GoodsList };
