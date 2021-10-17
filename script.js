import './style.css';
import { GoodsList, Basket } from './src/models/index';

const API_URL =
    'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('good-item', {
    template: `<div class="goods-item">
        <h3>{{title}}</h3>
        <p>{{price}}</p>
        <button>Add</button>
    </div>`,
    props: {
        title: String,
        price: Number,
    },
});

Vue.component('goods-list', {
    template: `<div class="goods-list">
        <good-item
            v-for="good of list"
            v-bind:key="good.id_product"
            v-bind:title="good.product_name"
            v-bind:price="good.price"
        ></good-item>
    </div>`,
    props: {
        list: Array,
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

new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
    },
    methods: {
        loadGoods() {
            fetch(`${API_URL}/catalogData.json`)
                .then(response => response.json())
                .then(goods => {
                    this.goods = goods;
                    this.filteredGoods = goods;
                })
                .catch(err => console.error(err));
        },
        onSearch(searchLine) {
            const regex = new RegExp(searchLine, 'i');

            this.filteredGoods = this.goods.filter(good =>
                regex.test(good.product_name),
            );
        },
    },
    mounted() {
        this.loadGoods();
    },
});

const basket = new Basket('.basket-list');
// const list = new GoodsList('.goods-list', basket.addItem.bind(basket));

const modal = document.querySelector('.basket-modal');
const basketBtn = document.querySelector('.cart-button');
const closeBtn = document.querySelector('.close');

basketBtn.onclick = function() {
    modal.style.display = 'flex';
};

closeBtn.onclick = function() {
    modal.style.display = 'none';
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

list.fetchGoods().then(_ => {
    list.render();
});

basket.fetchGoods();
