const express = require('express');
const cors = require('cors');
const fs = require('fs');

const port = 3030;
const static_dir = '../public';

const app = express();

app.use(express.static(static_dir));
app.use(cors());

app.get('/catalogData', (req, res) => {
    fs.readFile('data/catalog.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.listen(port, () => {
    console.log(`server is running on port ${port}!`);
});
