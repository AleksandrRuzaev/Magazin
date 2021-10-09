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
                            this.removeItem.bind(this),
                        ),
                );
            })
            .then((_) => {
                this.render();
            })
            .catch((err) => console.warn(err));
    }

    addItem(good) {
        return makeGETRequest(`${API_URL}/addToBasket.json`)
            .then((_) => {
                this.countGoods++;
                this.amount += good.price;

                const basketGood = this.basketGoods.find(
                    (item) => item.id == good.id,
                );

                if (Boolean(basketGood)) {
                    basketGood.quantity++;
                }
            })
            .then((_) => {
                this.render();
            })
            .catch((err) => console.error(err));
    }

    removeItem(id) {
        return makeGETRequest(`${API_URL}/deleteFromBasket.json`)
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
        const items = [];

        this.basketGoods.forEach((good) => {
            items.push(good.render());
        });

        const basket = document.querySelector(this.selector);
        basket.innerHTML = '';

        items.forEach((item) => {
            basket.appendChild(item);
        });
    }
}

export { Basket };
