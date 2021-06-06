const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();
// const _ = require('lodash');
const PORT = 3000;
const dbUrl = "mongodb+srv://hr-db:hr-db-chillax-mamu@hrcluster.p9a2i.mongodb.net/nodeTask"

const rCategory = require('./routes/rCategory');
const rBook = require('./routes/rBook');

app.get('/', (req, res) => {
    res.send("Hello")
})
app.use((req, res, next) => {
    console.log(`=> ${req.method} ${req.path}`);
    next();
});

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

// app.use(tokenMiddleware);
app.use('/category',rCategory)
app.use('/book',rBook);

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err, succ) => {
    if (err) {
        console.log("Db not connected");
        console.log(err);
    } else {
        console.log("MongoDB Atlas connected");
    }
});

const server = app.listen(PORT, () => {
    console.log("Server started at", PORT);
});