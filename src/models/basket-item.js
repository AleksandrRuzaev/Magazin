import { GoodsItem } from './goods-item';

class BasketItem extends GoodsItem {
    constructor(id, title, price, selector, quantity) {
        super(id, title, price, selector);

        this.quantity = quantity;
    }

    remove() {
        throw Error('Not implemented');
    }

    increaseCount() {
        throw Error('Not implemented');
    }

    decreaseCount() {
        throw Error('Not implemented');
    }

    render() {
        return `<div class="${this.selector}"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

export { BasketItem };
