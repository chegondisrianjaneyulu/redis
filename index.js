const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectRedis } = require('./redis');
const { connectDB } = require('./db');
const {redisStringMethods} = require('./strings');
const {redisListMethods} = require('./lists');
const {redisSetMethods} = require('./sets');

const userController = require('./controller');

//express initialization
const app = express();

//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cors
app.use(cors());

//redis
connectRedis();

//db
connectDB();

//redis string methods
// redisStringMethods()


//redis lists methods
// redisListMethods();

//redis sets methods
redisSetMethods()

//routes
app.use(`/api/v1/users`, userController)

//server running
app.listen(8000, () => {
    console.log('server is on port 8000');
})