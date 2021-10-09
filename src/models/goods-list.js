import { GoodsItem } from './goods-item';
import { API_URL } from '../utils/constants';
import { makeGETRequest } from '../utils/helpers';

class GoodsList {
    constructor(selector, onAdd) {
        this.selector = selector;
        this.goods = [];

        this.onAdd = onAdd;
    }

    fetchGoods() {
        return (
            makeGETRequest(`${API_URL}/catalogData.json`)
                .then((goods) => {
                    this.goods = goods.map(
                        (good) =>
                            new GoodsItem(
                                good.id_product,
                                good.product_name,
                                good.price,
                                'goods-item',
                                this.addItem.bind(this),
                            ),
                    );
                })
                // .then((_) => {
                //     this.render();
                // })
                .catch((err) => console.error(err))
        );
    }

    addItem(good) {
        this.onAdd(good);
    }

    getSumPrice() {
        return this.goods.reduce((total, good) => {
            return (total += good.price);
        }, 0);
    }

    render() {
        const items = [];

        this.goods.forEach((good) => {
            items.push(good.render());
        });

        const basket = document.querySelector(this.selector);
        basket.innerHTML = '';

        items.forEach((item) => {
            basket.appendChild(item);
        });
    }
}

export { GoodsList };
