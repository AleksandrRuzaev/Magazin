import { GoodsItem } from './goods-item';
import { API_URL } from '../utils/constants';
import { makeGETRequest } from '../utils/helpers';

class GoodsList {
    constructor(selector) {
        this.selector = selector;
        this.goods = [];
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
                            ),
                    );
                })
                // .then((_) => {
                //     this.render();
                // })
                .catch((err) => console.error(err))
        );
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
