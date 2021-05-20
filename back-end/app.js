const express = require("express");
const app = express();
require('dotenv/config');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.options('*', cors())

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

const api = process.env.API_URL;

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

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

//Server
app.listen(3000, () => {

    console.log('server is running http://localhost:3000');
})