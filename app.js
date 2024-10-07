const express = require('express');
const cors = require('cors');
const Review = require('./models/review');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const formRoutes = require('./routes/form');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/', formRoutes);

sequelize.sync()
    .then(response => {
        app.listen(3000);
    })
    .catch(error => {
        console.log(error);
    });