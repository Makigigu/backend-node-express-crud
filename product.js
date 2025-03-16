var express = require('express');
var cors = require('cors');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'myproduct-flook'
});

var app = express();
app.use(cors());
app.use(express.json());

app.listen(5000, function() {
    console.log('CORS-enabled web server listening on port 5000');
});

app.get('/product-flook', function(req, res, next) {
    connection.query(
        'SELECT * FROM products',
        function(err, results, fields) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
});

app.get('/product-flook/:id', function(req, res, next) {
    const id = req.params.id;
    connection.query(
        'SELECT * FROM products WHERE id = ?',
        [id],
        function(err, results, fields) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
});

app.post('/product-flook/create', function(req, res, next) {
    const product_name = req.body.product_name;
    const product_price = req.body.product_price;
    const product_cost = req.body.product_cost;
    const product_image = req.body.product_image;
    connection.query(
        'INSERT INTO products (product_name, product_price, product_cost, product_image) VALUES (?, ?, ?, ?)',
        [product_name, product_price, product_cost, product_image],
        function(err, results, fields) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
});

app.put('/product-flook/update', function(req, res, next) {
    const product_name = req.body.product_name;
    const product_price = req.body.product_price;
    const product_cost = req.body.product_cost;
    const product_image = req.body.product_image;
    const id = req.body.id;
    connection.query(
        'UPDATE products SET product_name = ?, product_price = ?, product_cost = ?, product_image = ? WHERE id = ?', 
        [product_name, product_price, product_cost, product_image, id],
        function(err, results, fields) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({
                status: '200',
                message: 'Updated',
                results: results.length,
                data: { results: results }
            });
        });
});

app.delete('/product-flook/delete', function(req, res, next) {
    const id = req.body.id;
    connection.query(
        'DELETE FROM products WHERE id = ?',
        [id],
        function(err, results, fields) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({
                status: '200',
                message: 'Deleted',
                results: results.length,
                data: { results: results }
            });
        });
});
