const express = require('express');
const app = express();
const mongoose = require('mongoose');
var cors = require('cors')
// const logger = require('morgan');
const dotenv = require('dotenv');
const api = require('./routes/api');

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', api);
app.use('/', (req, res) => {
    res.status(401).send('Bad request!');
});

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useFindAndModify: false }, () => {
    console.log('Connected to DB');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000')
});