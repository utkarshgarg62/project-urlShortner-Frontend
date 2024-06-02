const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const mongoose = require('mongoose');
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || 5500

app.use(cors())
app.use(bodyParser.json());

// MONGODB CONFIGURATION - 
const MONGODB_CLUSTER_NAME = 'utkarshhgarg';
const MONGODB_DATABASE_USERNAME = 'utkarshhgarg09';
const MONGODB_DATABASE_PASSWORD = 'utkarshhgarg_password';
const MONGODB_DATABASE_NAME = 'url@shortner';
const CLUSTER_URL = `mongodb+srv://${MONGODB_DATABASE_USERNAME}:${MONGODB_DATABASE_PASSWORD}@${MONGODB_CLUSTER_NAME}.cxmnrjm.mongodb.net/${MONGODB_DATABASE_NAME}`

mongoose.connect(CLUSTER_URL, {
    useNewUrlParser: true
}).then(() => console.log('Connected to MongoDb => ' + MONGODB_CLUSTER_NAME))
    .catch(err => console.log(err))

app.use('/', route);


app.listen(PORT, function () {
    console.log('Express Running on Port => ' + PORT)
});