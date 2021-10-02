class GoodsItem {
    constructor(title, price, selector) {
        this.title = title;
        this.price = price;
        this.selector = selector;
    }

    render() {
        return `<div class="${this.selector}"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

export { GoodsItem };
