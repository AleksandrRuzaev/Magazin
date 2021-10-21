import './style.css';

const API_URL = 'http://127.0.0.1:3030';

Vue.component('good-item', {
    template: `<div class="goods-item">
        <h3>{{title}}</h3>
        <p>{{price}}</p>
        <button v-on:click="onAdd">Add</button>
    </div>`,
    props: {
        id: Number,
        title: String,
        price: Number,
    },
    methods: {
        onAdd() {
            fetch(`${API_URL}/addToCart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/JSON',
                },
                body: JSON.stringify({
                    id_product: this.id,
                    product_name: this.title,
                    price: this.price,
                }),
            });
            // this.$emit('add', this.id);
        },
    },
});

Vue.component('goods-list', {
    template: `<div class="goods-list">
        <empty-message v-if="list.length == 0"></empty-message>
        <good-item
            v-for="good of list"
            v-bind:key="good.id_product"
            v-bind:id="good.id_product"
            v-bind:title="good.product_name"
            v-bind:price="good.price"
            v-on:add="onAdd"
        ></good-item>
    </div>`,
    props: {
        list: Array,
    },
    methods: {
        onAdd(id) {
            const good = this.list.find((item) => item.id_product == id);

            if (good) {
                this.$emit('add', good);
            }
        },
    },
});

Vue.component('search', {
    template: `<div class="search">
        <input type="text" name="search" v-model="searchLine" />
        <button class="search-button" type="button" v-on:click="onClick">Искать</button>
    </div>`,
    data() {
        return {
            searchLine: '',
        };
    },
    methods: {
        onClick() {
            this.$emit('search', this.searchLine);
        },
    },
});

Vue.component('basket-item', {
    template: `<div class="goods-item goods-item-basket">
        <h3>{{title}}</h3>
        <p>Price: {{price}}</p>
        <p>Quantity: {{quantity}}</p>
        <button v-on:click="onDelete">Remove</button>
    </div>`,
    props: {
        id: Number,
        title: String,
        price: Number,
        quantity: Number,
    },
    methods: {
        onDelete() {
            fetch(`${API_URL}/removeFromCart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/JSON',
                },
                body: JSON.stringify({
                    id_product: this.id,
                    product_name: this.title,
                    price: this.price,
                }),
            });
            this.$emit('delete', this.id);
        },
    },
});

Vue.component('basket-list', {
    template: `
    <div>
        <div class="basket-list">
            <basket-item
                v-for="good of goods"
                v-bind:key="good.id_product"
                v-bind:id="good.id_product"
                v-bind:title="good.product_name"
                v-bind:price="good.price"
                v-bind:quantity="good.quantity"
                v-on:delete="onDelete"
            ></basket-item>
        </div>
        <div class="basket-price">All price: {{getSumPrice()}}</div>
    </div>`,
    props: {
        list: Array,
    },
    data() {
        return {
            goods: [],
        };
    },
    methods: {
        onDelete(id) {
            this.goods = this.goods.filter((item) => item.id_product !== id);
        },
        getSumPrice() {
            if (this.goods) {
                return this.goods.reduce((total, item) => {
                    return (total += item.price * item.quantity);
                }, 0);
            }

            return 0;
        },
    },
    mounted() {
        fetch(`${API_URL}/getBasket`)
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    this.goods = data;
                } else {
                    this.goods = [];
                }
            })
            .catch(this.setError);
    },
});

Vue.component('basket-modal', {
    template: `<div class="basket-modal" v-on:click="onClick">
        <div class="basket">
            <h2 class="basket-header">Basket</h2>
            <span class="close" v-on:click="onClick">&times;</span>
            <slot></slot>
        </div>
    </div>`,
    methods: {
        onClick(event) {
            if (
                event.target.classList.contains('close') ||
                event.target.classList.contains('basket-modal')
            ) {
                this.$emit('close', false);
            }
        },
    },
});

Vue.component('empty-message', {
    template: `<div class="empty-message">
        No elements according to your search.
    </div>`,
    props: {
        list: Array,
    },
});

Vue.component('error-message', {
    template: `<div class="error-message">
        something went wrong.
    </div>`,
    props: {
        list: Array,
    },
});

new Vue({
    el: '#app',
    data: {
        goods: [],
        basketGoods: [],
        filteredGoods: [],
        searchLine: '',
        isAnyError: false,
        isModalShown: false,
        timeoutId: 0,
    },
    methods: {
        loadGoods() {
            fetch(`${API_URL}/catalogData`)
                .then((response) => response.json())
                .then((goods) => {
                    this.goods = goods;
                    this.filteredGoods = goods;
                })
                .catch(this.setError);
        },
        loadBasketGoods() {
            fetch(`${API_URL}/getBasket`)
                .then((response) => response.json())
                .then((data) => {
                    if (data) {
                        this.basketGoods = data.contents;
                    } else {
                        this.basketGoods = [];
                    }
                })
                .catch(this.setError);
        },
        onSearch(searchLine) {
            const regex = new RegExp(searchLine, 'i');

            this.filteredGoods = this.goods.filter((good) =>
                regex.test(good.product_name),
            );
        },
        onClose(value) {
            this.isModalShown = value;
        },
        setError() {
            this.isAnyError = true;
            this.timeoutId = setTimeout(() => {
                this.isAnyError = false;
            }, 3000);
        },
        openBasket() {
            this.isModalShown = true;
        },
        onAdd(good) {
            const index = this.basketGoods.findIndex(
                (item) => item.id_product == good.id_product,
            );

            if (index > -1) {
                this.basketGoods[index].quantity++;
            }
        },
    },
    mounted() {
        this.loadGoods();
        this.loadBasketGoods();
    },
    unmounted() {
        clearTimeout(timeoutId);
    },
});
