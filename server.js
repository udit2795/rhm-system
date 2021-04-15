const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const routers = require('./routes/index');
const db = require('./models/db').DB;

const app = express();
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', routers);
db.DBConnection()

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});

module.exports.app = app;

