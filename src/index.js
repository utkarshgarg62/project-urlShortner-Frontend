const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const mongoose = require('mongoose');
const cors = require("cors")



const app = express();

app.use(cors())

app.use(bodyParser.json());

//===================================================[Data-Base Connection]=================================================================

mongoose.connect("mongodb+srv://functionup-radon-cohort:radon123@cluster0.zbsotuc.mongodb.net/group23Database?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected succsessfully"))
    .catch(err => console.log(err))


//===================================================[Data-Base Connection]=================================================================


app.use('/', route);


app.listen(process.env.PORT || 5000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 5000))
});