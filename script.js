class Basket {
  constructor(selector) {
    super(selector);
    this.basketGoods = [];
  }

  addItem(good) {
    // push to array
    throw Error("Not implemented");
  }

  // pass item or id to specify removed item
  removeItem() {
    // filter
    throw Error("Not implemented");
  }

  getSumPrice() {
    throw Error("Not implemented");
  }

  render() {
    throw Error("Not implemented");
  }
}

class BasketItem extends GoodsItem {
  constructor(title, price, selector) {
    super(title, price, selector);
  }

  remove() {
    throw Error("Not implemented");
  }

  increaseCount() {
    throw Error("Not implemented");
  }

  decreaseCount() {
    throw Error("Not implemented");
  }

  render() {
    throw Error("Not implemented");
  }
}

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

class GoodsList {
  constructor(selector) {
    this.selector = selector;
    this.goods = [];
  }

  fetchGoods() {
    this.goods = [
      { title: "Shirt", price: 150 },
      { title: "Socks", price: 50 },
      { title: "Jacket", price: 350 },
      { title: "Shoes", price: 250 },
    ].map((good) => new GoodsItem(good.title, good.price, "goods-item"));
  }

  getSumPrice() {
    return this.goods.reduce((total, good) => {
      return (total += good.price);
    }, 0);
  }

  render() {
    let listHtml = "";

    this.goods.forEach((good) => {
      listHtml += good.render();
    });

    document
      .querySelector(this.selector)
      .insertAdjacentHTML("beforeend", listHtml);
  }
}

const list = new GoodsList(".goods-list");

list.fetchGoods();
list.render();
console.log(list.getSumPrice());
