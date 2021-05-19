const express = require("express");
const app = express();
require('dotenv/config');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    }
})

const Product = mongoose.model('product', productSchema);
const api = process.env.API_URL;

app.get(`${api}/products`, async (res, req) => {
    const productList = await Product.find();
    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send(productList);
})
app.post(`${api}/products`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })
    product.save().then((createdProduct => {
        res.status(201).json(createdProduct)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})
mongoose.connect(`${process.env.CONNECT_STRING}`,
    {
        useUnifiedTopology: true,
        dbName: 'eshope-database',
        useNewUrlParser: true
    }
)
    .then(() => {
        console.log("database success")
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(3000, () => {
    console.log(api)
    console.log("hi backend")
})