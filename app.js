const express = require('express');
const cors = require('cors');
const Comment = require('./models/comment');
const Blog = require('./models/blog');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const commentRoutes = require('./routes/comment');
const blogRoutes = require('./routes/blog');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/', blogRoutes);
app.use('/', commentRoutes);



Comment.belongsTo(Blog, {constraints: true, onDelete: 'CASCADE'});
Blog.hasMany(Comment);

sequelize.sync()
    .then(response => {
        app.listen(3000);
    })
    .catch(error => {
        console.log(error);
    });