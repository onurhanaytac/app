const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const api = require('./routes/api.route');

dotenv.config();

app.use(cors({ exposedHeaders: ['access_token'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', api);
app.use('/', (req, res) => {
    res.status(401).send('Bad request!');
});

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useFindAndModify: false }, (err, db) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Database connection on ${process.env.MONGODB_URL}`);
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});