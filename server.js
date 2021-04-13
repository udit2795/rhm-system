const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
var cors = require('cors')



const routers = require('./routes/index');


const app = express();
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views');
app.use(express.static(`${__dirname}/public`));


app.use('/', routers);

mongoose.connect("mongodb+srv://user:sleepapp@cluster0.55hqc.mongodb.net/user?retryWrites=true&w=majority", {useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log('connected to db');
}).on('error', (err) => {
    console.log("Error in connecting DB. Error::", err)
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});

module.exports.app = app;

