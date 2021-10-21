const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const port = 3030;
const static_dir = '../public';

const app = express();

app.use(express.static(static_dir));
app.use(bodyParser.json());
app.use(cors());

app.get('/catalogData', (req, res) => {
    fs.readFile('data/catalog.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.get('/getBasket', (req, res) => {
    fs.readFile('data/cart.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.post('/addToCart', (req, res) => {
    fs.readFile('data/cart.json', 'utf8', (err, data) => {
        const cart = JSON.parse(data);
        const item = req.body;

        const index = cart.findIndex(
            (good) => item.id_product == good.id_product,
        );

        if (index > -1) {
            cart[index].quantity++;
        } else {
            item.quantity = 1;
            cart.push(item);
        }

        fs.writeFile('data/cart.json', JSON.stringify(cart), (err) => {
            res.end();
        });

        addLog('POST', item.product_name);
    });
});

app.post('/removeFromCart', (req, res) => {
    fs.readFile('data/cart.json', 'utf8', (err, data) => {
        const cart = JSON.parse(data);
        const item = req.body;

        const result = cart.filter(
            (good) => item.id_product != good.id_product,
        );

        fs.writeFile('data/cart.json', JSON.stringify(result), (err) => {
            res.end();
        });

        addLog('DELETE', item.product_name);
    });
});

app.listen(port, () => {
    console.log(`server is running on port ${port}!`);
});

function addLog(userAction, itemTitle) {
    fs.readFile('data/log.json', 'utf8', (err, data) => {
        const stats = JSON.parse(data);

        const action = {
            action: userAction,
            item: itemTitle,
            date: new Date().toLocaleDateString(),
        };

        stats.push(action);

        fs.writeFile(
            'data/log.json',
            JSON.stringify(stats, null, '\t'),
            (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            },
        );
    });
}
