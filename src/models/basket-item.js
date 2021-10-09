import { GoodsItem } from './goods-item';

class BasketItem extends GoodsItem {
    constructor(id, title, price, selector, quantity, onDelete, onAdd) {
        super(id, title, price, selector, onAdd);

        this.quantity = quantity;
        this.onDelete = onDelete;
    }

    remove() {
        this.onDelete(this.id);
    }

    increaseCount() {
        throw Error('Not implemented');
    }

    decreaseCount() {
        throw Error('Not implemented');
    }

    render() {
        const basketItem = document.createElement('div');
        basketItem.classList.add(this.selector, `${this.selector}-basket`);

        const basketItemTitle = document.createElement('h3');
        basketItemTitle.textContent = this.title;

        const basketItemPrice = document.createElement('p');
        basketItemPrice.textContent = this.price;

        const basketItemQuantity = document.createElement('p');
        basketItemQuantity.textContent = this.quantity;

        const basketItemRemoveBtn = document.createElement('button');
        basketItemRemoveBtn.textContent = 'Remove';
        basketItemRemoveBtn.onclick = this.remove.bind(this);

        basketItem.appendChild(basketItemTitle);
        basketItem.appendChild(basketItemPrice);
        basketItem.appendChild(basketItemQuantity);
        basketItem.appendChild(basketItemRemoveBtn);

        return basketItem;
    }
}

export { BasketItem };
