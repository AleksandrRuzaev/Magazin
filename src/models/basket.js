import { makeGETRequest, makePOSTRequest } from '../utils/helpers';
import { BasketItem } from '../models/basket-item';
import { API_URL } from '../utils/constants';

class Basket {
    constructor(selector) {
        this.selector = selector;
        this.basketGoods = [];
    }

    fetchGoods() {
        return makeGETRequest(`${API_URL}/getBasket.json`)
            .then((data) => {
                this.amount = data.amount;
                this.countGoods = data.countGoods;
                this.basketGoods = data.contents.map(
                    (good) =>
                        new BasketItem(
                            good.id_product,
                            good.product_name,
                            good.price,
                            'goods-item',
                            good.quantity,
                        ),
                );
            })
            .then((_) => {
                this.render();
            })
            .catch((err) => console.warn(err));
    }

    addItem(good) {
        return makePOSTRequest(
            `${API_URL}/addToBasket.json`,
            (good = {
                product_name: good.title,
                price: good.price,
                quantity: 1,
            }),
        )
            .then((data) => {
                good.id = data.result;
                this.basketGoods.push(good);
            })
            .then((_) => {
                this.render();
            })
            .catch((err) => console.error(err));
    }

    // pass id into query string or body request
    removeItem(id) {
        return makePOSTRequest(`${API_URL}/deleteFromBasket.json`)
            .then((_) => {
                this.basketGoods = this.basketGoods.filter(
                    (good) => good.id != id,
                );
            })
            .then((_) => {
                this.render();
            })
            .catch((err) => console.error(err));
    }

    getSumPrice() {
        return this.basketGoods.reduce((total, item) => {
            return (total += item.price * item.quantity);
        }, 0);
    }

    render() {
        let listHtml = '';

        this.basketGoods.forEach((good) => {
            listHtml += good.render();
        });

        document
            .querySelector(this.selector)
            .insertAdjacentHTML('beforeend', listHtml);
    }
}

export { Basket };
