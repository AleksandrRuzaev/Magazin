class GoodsItem {
    constructor(id, title, price, selector, onAdd) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.selector = selector;
        this.onAdd = onAdd;
    }

    add() {
        this.onAdd(this);
    }

    render() {
        const item = document.createElement('div');
        item.classList.add(this.selector);

        const itemTitle = document.createElement('h3');
        itemTitle.textContent = this.title;

        const itemPrice = document.createElement('p');
        itemPrice.textContent = this.price;

        const itemAddBtn = document.createElement('button');
        itemAddBtn.textContent = 'Add';
        itemAddBtn.onclick = this.add.bind(this);

        item.appendChild(itemTitle);
        item.appendChild(itemPrice);
        item.appendChild(itemAddBtn);

        return item;
    }
}

export { GoodsItem };
