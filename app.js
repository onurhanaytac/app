const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const logger = require('morgan');
const dotenv = require('dotenv');
const api = require('./routes/api');


dotenv.config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', api);


mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useFindAndModify: false }, () => {
    console.log('Connected to DB');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000')
});