import { GoodsItem } from './goods-item';

class BasketItem extends GoodsItem {
    constructor(title, price, selector) {
        super(title, price, selector);
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
        throw Error('Not implemented');
    }
}

export { BasketItem };
