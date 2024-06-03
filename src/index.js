require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const mongoose = require('mongoose');
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || process.env.PORT_DEV

app.use(cors())
app.use(bodyParser.json());

mongoose.connect(`mongodb+srv://${process.env.MONGODB_DATABASE_USERNAME}:${process.env.MONGODB_DATABASE_PASSWORD}@${process.env.MONGODB_CLUSTER_NAME}.cxmnrjm.mongodb.net/${process.env.MONGODB_DATABASE_NAME}`, {
    useNewUrlParser: true
}).then(() => console.log('Connected to MongoDb => ' + process.env.MONGODB_CLUSTER_NAME))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(PORT, function () {
    console.log('Express Running on Port => ' + PORT)
});