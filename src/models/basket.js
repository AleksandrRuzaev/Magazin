class Basket {
    constructor(selector) {
        // super(selector);
        this.basketGoods = [];
    }

    addItem(good) {
        // push to array
        throw Error('Not implemented');
    }

    // pass item or id to specify removed item
    removeItem() {
        // filter
        throw Error('Not implemented');
    }

    getSumPrice() {
        throw Error('Not implemented');
    }

    render() {
        throw Error('Not implemented');
    }
}

export { Basket };
